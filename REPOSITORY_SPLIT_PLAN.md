# Repository Split Plan

Status: active plan for the `VeoveoAI` organization. Decisions marked done under
[Tasks](#tasks) are accepted, and repositories are created from it as work lands. The
Veoveo monorepo's contracts, layout and release process apply to each component until
it moves.

Baseline: Veoveo main `0c33cf8a7` on 2026-10-11.

Current push: M9, then M10, then M6, then M12, under [Artifact And Media](#artifact-and-media).

This plan moves Veoveo from one repository into a `VeoveoAI` GitHub organization.
`veoveo-core` holds the protocol-independent platform: types, the database kernel,
identity, Tasks and the audit envelope. `veoveo-sdk-rust` builds MCP on top of it, and
each MCP server publishes its own contract. Each running service, MCP server, runtime
and application becomes its own repository and releases on its own schedule.
Installations compose released components instead of forking the platform.

The goal is that a change to one component rebuilds, qualifies and deploys that
component alone. Today a change to a shared crate rebuilds every Rust image family,
and the Gateway binary rebuilds whenever one of ten domain servers changes.

## Standards And Protocols

| Standard or protocol | Use in this plan |
|---|---|
| Git and GitHub organizations | One repository per component under `VeoveoAI`; installation repositories in the installation owner's organization |
| Cargo | Components consume `veoveo-core` and other contract crates as GitHub Git dependencies pinned by Git revision until the first release tags (E1); nothing is published to a registry |
| Semantic Versioning 2.0.0 | `veoveo-core` versions; `cargo-semver-checks` blocks unplanned breaking changes |
| OCI images | Each host builds component images locally; a registry for distributing them is an open decision (D15) |
| Dockerfile multi-stage builds with BuildKit | `dev`, `check`, `build` and `runtime` stages in every component repository |
| OpenShell 0.1.3 | Component environment runtime: sandboxes from our images, `version: 1` policies, providers, service exposure and port forwarding |
| Compose specification | Launch of PostgreSQL and other upstream infrastructure that runs outside OpenShell |
| Helm 3 | One application chart per component, built on a shared library chart |
| Flux | One HelmRelease per component in the installation repository, ordered with `dependsOn` |
| MCP `2026-07-28` | Extension identifiers and `_meta` keys use the `ai.veoveo/` namespace; every name and format follows the [naming and format conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md) |
| Veoveo MCP extensions `ai.veoveo/registration` and `ai.veoveo/authorization` | Repository-owned declarations a server sends when it registers with the Gateway |
| OAuth 2.0 private-key JWT client authentication, RFC 7523 | Server and agent identities |
| OAuth 2.0 Token Exchange, RFC 8693 | Delegation when a server or agent calls another server for a caller, narrowed to the permissions the calling server declares |
| Cedar | Authorization conditions; the version is pinned when adopted |
| `veoveo.ai/deployment/v9` and `veoveo.ai/deployment-lock/v8` | Current profile and lock formats; the component lock below extends them |
| PostgreSQL 18.6 | One database per installation; core owns the kernel schemas, and each server owns one schema and applies its own sqlx migrations ([database design](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/DATABASE.md)) |

## Principles

1. `veoveo-core` holds protocol-independent platform libraries: types and macros, the
   database kernel, identity, the Task runtime and the audit envelope. It names no MCP
   method, server or domain, runs no service and depends on no component repository.
2. `veoveo-sdk-rust` holds the Rust MCP layer on top of core: hosting, the client that
   servers use to call each other, registration, the MCP extensions, the Task MCP
   adapter and MCP conformance. The Gateway and every Rust server depend on it.
3. A server publishes its contract through its crate's `contract` feature, which builds
   without the server's runtime dependencies. A component that uses another server
   depends on that feature by Git revision, never by path and never in a cycle, and
   declares the permissions it uses when it registers.
4. A server's acceptance suite lives in its repository and runs over MCP against any
   server address, so another implementation of Artifact, Knowledge, Embedding or
   Recording qualifies against the same suite.
5. A component keeps one name for its repository, primary crate, binary, image and
   chart.
6. A component owns its image, toolchain and gate configuration. Repositories couple
   only through contracts, conformance suites and the `rust-version` floor of the
   crates they compile from other repositories, so differing images and toolchains
   need no coordination.

## Naming

Repository names follow `veoveo-<kind>[-<name>]`. The kind comes first so a clone
directory never collides with another project and related repositories sort
together. Third parties follow the same pattern in their own organizations, for
example `acme/veoveo-mcp-inventory`, and add the matching GitHub topic.

| Kind | Meaning | Example |
|---|---|---|
| `core` | Protocol-independent platform libraries | `veoveo-core` |
| `service` | Platform process that is not an MCP server | `veoveo-service-gateway` |
| `mcp` | MCP server, which publishes its contract through its crate's `contract` feature | `veoveo-mcp-time` |
| `runtime` | Native or GPU runtime used by a service | `veoveo-runtime-embedding` |
| `app` | User-facing application | `veoveo-app-console` |
| `sdk` | Library for building Veoveo servers, clients and apps in one language | `veoveo-sdk-rust` |
| `template` | GitHub template repository | `veoveo-template-mcp-rust` |
| `showcase` | Demonstration workload | `veoveo-showcase-uav` |
| `qualify` | Qualification suite for a third-party runtime | `veoveo-qualify-openshell` |
| none | Organization singletons | `veoveo-docs`, `veoveo-website` |

`veoveo-template-installation` is the template every installation starts from,
including Veoveo's own local development installation and `BiomaAI/veoveo-bioma`. Its
defaults run a local installation on one workstation. `veoveo-docs` holds this plan and
other organization documents.

An installation repository lives in its owner's organization and is named
`veoveo-<installation>`. The reference installation is `BiomaAI/veoveo-bioma`, which
shows what a real Veoveo user creates. Every repository in this plan is public.
Installation repositories hold configuration and GitOps state; Secret values are
created out of band and never committed.

Each component uses its repository name for every artifact it produces:

| Artifact | Example for Time |
|---|---|
| Repository | `VeoveoAI/veoveo-mcp-time` |
| Primary crate and binary | `veoveo-mcp-time` |
| Image | `veoveo-mcp-time` |
| Chart | `veoveo-mcp-time` |

Today these differ. Time's crate is `veoveo-time-mcp`, its image is `veoveo/time-mcp`
and the Gateway image is `veoveo/mcp-gateway`. The rename happens when each component
is extracted. No Veoveo crate, wire name or format has been released, so renames have
no external consumers. Wire names, format identifiers and other identifiers follow the
[naming and format conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md).

### Runtime Names

OpenShell 0.1.3 rejects sandbox names longer than 19 characters, and container and
Kubernetes resource names carry their own limits. Runtime names therefore use
`vv-<kind>-<name>`, with a short code for each kind, while repositories, crates,
binaries and images keep their full `veoveo-<kind>-<name>` names. Kinds without a code
use `vv-<name>`. Extension keys, format identifiers and every other wire name follow
the [naming and format conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md).

| Kind | Code | Example runtime name |
|---|---|---|
| `service` | `srv` | `vv-srv-gateway` |
| `mcp` | `mcp` | `vv-mcp-time` |
| `runtime` | `rt` | `vv-rt-embedding` |
| `app` | `app` | `vv-app-console` |
| `sdk` | `sdk` | `vv-sdk-python` |
| `template` | `tpl` | `vv-tpl-mcp-rust` |
| `showcase` | `demo` | `vv-demo-uav` |
| `qualify` | `qual` | `vv-qual-openshell` |
| none | none | `vv-core`, `vv-local`, `vv-postgres` |

Every current catalog name fits. The longest, `vv-mcp-optimization`, uses all 19
characters, so a new MCP server name stays within 12 characters after `vv-mcp-`.
Running several versions of one component, as
[Session Version Selection](#session-version-selection) requires, needs a variant
suffix that this rule has no room for in the longest names (D19).

## Repository Catalog

| Repository | Source today | Publishes |
|---|---|---|
| `veoveo-core` | `platform/{types,macros,http,oauth,store,task-runtime,audit,installation/contract}` without their MCP, Gateway and domain items, `testing/fixtures` (see [Core Contents](#core-contents)) | crates |
| `veoveo-sdk-rust` | `mcp/{contract,ext-registration,ext-apps,conformance}`, the Task runtime's MCP adapter, `testing/fixtures/modular-mcp`, and the client servers use to call each other | crates, conformance CLI |
| `veoveo-service-gateway` | `platform/gateway/{src,catalog,composition,queries,contract}`, `platform/policy`, the store's Gateway module and the `gateway` schema | image, chart |
| `veoveo-service-agents` | `agents/{kernel,manager,runtime}` | images, chart, agent templates |
| `veoveo-service-knowledge` | `platform/knowledge` with its contract, the `ai.veoveo/knowledge-source` extension, `servers/knowledge-mcp` | image, chart |
| `veoveo-service-recording` | `platform/recordings/{hub,forwarder,store,reader,rrd,video}`, `servers/recording-mcp` | images, chart |
| `veoveo-service-computers` | `platform/computers/*`, `platform/runtimes/computers`, `servers/computers-mcp` | Host, template and MCP images, chart |
| `veoveo-service-factory` | new; see [Factory](#factory) | images, chart |
| `veoveo-runtime-embedding` | `platform/runtimes/embedding` with its contract and client | GPU image, chart |
| `veoveo-runtime-simulation` | `platform/runtimes/simulation` without its contract | GPU image |
| `veoveo-mcp-time` | `servers/time-mcp` | contract crate, image, chart |
| `veoveo-mcp-artifact` | `servers/artifact-mcp` and the Artifact contract from `platform/artifacts/contract`; the HTTP service in `platform/artifacts/service` is retired | contract feature, image, chart |
| `veoveo-mcp-map` | `servers/map-mcp` | same set |
| `veoveo-mcp-frames` | `servers/frames-mcp` and the Frames implementation in `platform/frames` | same set |
| `veoveo-mcp-chart` | `servers/chart-mcp` | same set |
| `veoveo-mcp-media` | `servers/media-mcp` | same set |
| `veoveo-mcp-timeseries` | `servers/timeseries-mcp` | same set |
| `veoveo-mcp-duckdb` | `servers/duckdb-mcp`, `platform/runtimes/duckdb` | same set |
| `veoveo-mcp-optimization` | `servers/optimization-mcp` and the cuOpt executor image | same set plus the executor image |
| `veoveo-mcp-reason` | `servers/reason-mcp` | same set, GPU |
| `veoveo-mcp-speech` | `servers/speech-mcp`, including its contract crate | same set, GPU |
| `veoveo-mcp-stream` | `servers/stream-mcp` | same set, GPU |
| `veoveo-mcp-view` | `servers/view-mcp` | same set, GPU |
| `veoveo-mcp-datasheet` | the deployed Datasheet server, separated from the Python template | Python image, chart |
| `veoveo-mcp-bridges` | `mcp/bridges/{stdio,legacy}`; Rerun is a configured legacy bridge | images, chart |
| `veoveo-app-console` | `apps/console` web and BFF, `tools/vendor-three` | image, chart |
| `veoveo-app-workspace` | `apps/workspace` and the Workspace services in `platform/workspace` | image, chart |
| `veoveo-website` | `apps/website` | site |
| `veoveo-sdk-python` | `sdk/python` | PyPI package |
| `veoveo-sdk-typescript` | the generated client bundles used by Console and MCP Apps, and the MCP Apps browser runtime from `mcp/apps-extension/browser` with its tests | npm package |
| `veoveo-template-mcp-rust` | `templates/rust-mcp` | template repository |
| `veoveo-template-mcp-python` | `templates/python-mcp` | template repository |
| `veoveo-template-installation` | new; renamed from `veoveo-deploy` | template repository whose defaults run a local installation: Compose file for PostgreSQL and RustFS, installation configuration, roles and grants, and component lock |
| `veoveo-docs` | repository-wide documents in `docs/`, `tools/screenshots` | documentation site |
| `veoveo-showcase-uav` | `showcase/uav-sim`, `servers/uav-sim-mcp` | images, charts |
| `veoveo-showcase-sumo` | `showcase/sumo` | images, charts |
| `veoveo-qualify-openshell` | the OpenShell spike probes and policies | qualification results per OpenShell release and host |
| `.github` | new | organization profile and reusable workflows |

The catalog lists 38 repositories. Each installation adds one public
repository in its owner's organization. The reference is `BiomaAI/veoveo-bioma`,
built from `examples/bioma`.

### Core Contents

`veoveo-core` keeps its protocol-independent crates, with every MCP, Gateway and domain
item removed:

| Crate | Keeps |
|---|---|
| `veoveo-types`, `veoveo-macros` | IDs, names, resource addresses and vocabularies, without MCP tool, prompt and Task route names, Gateway profile and authentication types, agent IDs or Artifact access rules |
| `veoveo-http`, `veoveo-oauth-client` | Request body admission and RS256 client assertions |
| `veoveo-platform-store` | The `kernel`, `identity`, `tasks` and `audit` schemas, process instances, change notification and paging |
| `veoveo-task-contract`, `veoveo-task-runtime` | Durable Tasks with claims, recovery and subscriptions; durable steps arrive with M4 |
| `veoveo-audit-contract`, `veoveo-audit` | The record envelope, append, sealing and export. Each owner declares its audit classes and details when it registers |
| `veoveo-installation-contract` | The component lock |
| `veoveo-test-fixtures` | The PostgreSQL fixture and the database checks |

Everything else leaves core:

| Today in core | Moves to |
|---|---|
| `veoveo-mcp-contract` hosting, protocol, transport, subscriptions, docs resources and forwarded identity; `veoveo-mcp-ext-registration`; `veoveo-mcp-ext-apps`; `veoveo-mcp-conformance`; `veoveo-modular-fixture-mcp`; the Task runtime's MCP adapter; the tool-input fixtures; the MCP audit details for discovery and tool admission and completion | `veoveo-sdk-rust` |
| `veoveo-policy`; `veoveo-gateway-contract`; the control plane, OAuth, profile and policy types in `veoveo-mcp-contract`; the store's Gateway module; the `gateway` schema with its Task routes; the Gateway's audit details for registration, administration, profiles and clients | `veoveo-service-gateway` (D30) |
| `veoveo-artifact-contract` | `veoveo-mcp-artifact`'s `contract` feature, trimmed to signed transfers |
| `veoveo-artifact-client`, the upload grant in internal authentication, the Artifact service trait and access module, the Artifact policy targets, Gateway actions and profile section, `gateway.artifact_upload_authority` with its two digest functions, and the Artifact audit vocabulary | Deleted with the old byte path |
| `veoveo-knowledge-contract`, `veoveo-embedding-contract`, `veoveo-mcp-ext-knowledge`, the Knowledge audit details and the `audit.indexing_*` objects | Deleted. Knowledge and Embedding bring their own when they are ported, and Time and the Gateway drop their Knowledge source declarations until then |
| The LiveView, Computers, Recording, Dictation, Agents and Console audit vocabularies and types | Deleted. Each owner declares its own when it is ported |
| `provider.rs`, `usage.rs`, `waiters.rs`, `bootstrap.rs`, `fixture_client.rs`, `policy::internal_clients` and other items no consumer uses | Deleted |

## Cross-Repository Contracts

### Component Packaging

Every `service` and `mcp` repository publishes these artifacts under one version
tag:

| Artifact | Today | After the split |
|---|---|---|
| Contract | path dependency through the `contract` feature | the server crate's `contract` feature, consumed by Git revision |
| Image | built inside shared Rust families | built by the component's repository |
| Helm chart on `veoveo-chart-common` | templates inside the 38-template `deploy/helm/veoveo` chart | one chart per component |
| Catalog declaration | the server's entry written by hand in the installation's `gateway.json` | declared by the running server when it [registers](#server-registration) |
| Permissions and roles | per-profile scopes and the rule list in `gateway.json` | declared by the running server through `ai.veoveo/authorization` |
| Module schema | owned per module, compiled into the Gateway's module registry | submitted by the running server through `ai.veoveo/module` |

Registration lets an installation add a server by deploying it. Today every server
change requires an edit to the installation's central Gateway configuration, which
declares all 19 servers in `examples/bioma/gateway.json`.

### Installation Composition

An installation repository contains:

- installation configuration: domain, identity providers, tenants, work contexts, OAuth clients, role bindings and Cedar policies;
- namespace bindings that say which server identities may register which namespaces;
- a component lock with each component's version, image digest and chart version;
- one Flux HelmRelease per component, ordered with `dependsOn`;
- installed acceptance for that installation.

The Gateway catalog is the installation configuration plus the current
registrations. Catalog publication Jobs, module plan and migration Jobs and the
Gateway's compiled module registry are retired.

### Compatibility

Each component declares the `veoveo-core` range and Gateway protocol versions it
supports. Installation validation rejects a lock that combines incompatible
versions. A breaking `veoveo-core` change follows the versioned adapter and support
window rules in [`CONTRACT_EVOLUTION.md`](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/docs/CONTRACT_EVOLUTION.md).

### Layers

```text
installation     composes released components
app              depends on its language's sdk and reaches servers through the Gateway
mcp              depends on veoveo-sdk-rust and on other servers' contract features
service          depends on veoveo-sdk-rust or veoveo-core
runtime          depends on veoveo-core
veoveo-sdk-rust  depends on veoveo-core and rmcp
veoveo-core      depends on third-party crates only
```

## Server Registration

The Gateway knows no server in its code or its configuration. A Gateway starts with
an empty catalog, and every server reaches it only by registering. The installation
configuration names no server either.

### Registration

Each installation has one registration secret. OpenShell holds it as a provider, so
an environment receives only a placeholder, and the proxy substitutes the real value
only on requests to the Gateway's registration endpoint. No agent inside an
environment can read it.

Registration follows open standards, and every Veoveo addition uses the extension
mechanism of the standard it extends. Its URIs, paths and identifiers carry no version
segment such as `/v1`.

| Concern | Standard | Veoveo extension |
|---|---|---|
| Registering a server | OAuth 2.0 Dynamic Client Registration, RFC 7591 | Client metadata with collision-resistant names carries the three declarations below |
| Reading, renewing and removing a registration | RFC 7592 | Renewal is an ordinary update; the lease is documented server-side policy |
| Proving the server's key | RFC 7523 private-key JWT | none |
| The identity forwarded to a server | JWT access token, RFC 9068, with `aud` naming the server | Granted permissions travel in RFC 9396 `authorization_details` with a collision-resistant `type` |
| Discovery metadata | RFC 8414, RFC 9728 | none |
| Declarations in MCP | MCP `capabilities.extensions` | the `ai.veoveo/` namespace |
| Declaration schemas | JSON Schema 2020-12 | none |

A server generates its own key pair in its environment on first start and registers at
the Gateway's RFC 7591 registration endpoint. The installation's registration secret is
the RFC 7591 initial access token, and the key travels as the `jwks` client metadata.
Its three declarations, whose types live in `veoveo-sdk-rust`, travel as client metadata:

| Extension | Declares |
|---|---|
| `ai.veoveo/registration` | slug, URI scheme, server version and endpoint |
| `ai.veoveo/authorization` | permissions, the permission each tool, resource template and prompt requires, and the permissions the server uses on other servers |
| `ai.veoveo/module` | the module manifest: ownership claims, requirements, SQL API, observation tables and migrations |

The registration response returns the client identifier, the RFC 7592 registration
access token, the server's database credentials and the keys that sign forwarded
identities. `veoveo-sdk-rust` holds the normative protocol document and a registration
client that every server uses.

The server advertises the same declarations under `extensions` in its MCP discovery
result, so they have one source. Tools, resources and prompts are not declared twice:
the Gateway reads them through MCP discovery, as it does today.

The first registration of a namespace claims it. The Gateway pins the server's public
key to its slug, URI scheme, database schema and permission prefix, such as `time`,
`time://`, the schema `time` and `time.*`. Later registrations of that namespace, including new
versions, must be signed by the pinned key, and a claim by another key is rejected.
Releasing a namespace is an explicit administrative action. A declaration outside the
pinned namespace is rejected with the exact reason.

The Gateway gives each registration its own PostgreSQL login, a member of the
server's group role, which owns the server's schema. The server applies its own
migrations in that schema at startup. PostgreSQL grants and row-level security confine
a server to its schema and to its own rows in shared kernel tables, and a server never
holds administrator credentials.

A registration has no lease and the server renews nothing. The Gateway keeps a
registration while the server's login holds a live kernel instance, a session advisory
lock on the server's database connection, and removes the registration and its login
after a 60-second grace period otherwise. Every Gateway replica follows registrations
through PostgreSQL notifications and builds a new immutable catalog snapshot on each
change, and requests in flight finish on the snapshot they started with. A removed
server leaves routing, and its Tasks stay bound to the version that created them.
Every registration, claim and expiry enters the audit chain.

Several versions of one server may register at the same time, and a builder's session
selects among them as described in [Session Version Selection](#session-version-selection).
A server first registers a reachable address. A later step lets a server dial in over
an authenticated connection and receive MCP requests on it, so a build on a laptop or
in a factory sandbox joins a shared Gateway without inbound networking.

Destructive schema changes run as expand and contract. A version adds the new shape
first. The contract step runs only when no registered version declares reads of the
removed shape, and a snapshot precedes the drop.

Artifact storage belongs to the Artifact server, which registers like any other server.
Clients move bytes directly to and from object storage through URLs the Artifact server
signs, and the Gateway has no byte routes.

## Authorization Model

A server declares permissions. The installation declares roles and grants. The
Gateway evaluates them, and the server checks the result again.

### Permissions

Each permission names one action in the server's namespace, the resource type it acts
on, one access kind and zero or more risks:

```json
{ "permission": "time.events.write", "resource": "time.event", "access": "write", "risks": [] }
```

| Field | Values |
|---|---|
| `access` | exactly one of `read` or `write` |
| `risks` | any of `sensitive` (reads secrets or personal data), `destructive`, `billed`, `physical` (acts on the real world) and `administer` |

A server's permissions form a closed enum with one wire spelling per variant, and one
typed requirement table drives both the declaration and every handler check. A tool
annotated `destructiveHint` cannot require a permission without the `destructive` risk,
and a tool annotated `readOnlyHint` cannot require a `write` permission.

### Roles And Grants

Roles belong to the installation. A role selects permissions by access kind and risk,
and it grants a permission only when it allows that permission's access and every one
of its risks. A risk the role does not name is never granted, so a new risk kind fails
closed. Grants give roles to groups or principals within a tenant.

```toml
[[roles]]
name   = "member"
access = ["read", "write"]
risks  = []

[[roles]]
name   = "admin"
access = ["read", "write"]
risks  = ["sensitive", "destructive", "billed", "physical", "administer"]

[[grants]]
group = "tenant-members"
role  = "member"

[[grants]]
group = "installation-admins"
role  = "admin"
```

An installation may add a risk to a permission or deny a permission by name when a
server labels an action wrongly. The default configuration needs neither, and it names
no server.

### Evaluation

For each request the Gateway resolves the caller's roles from grants, selects the
permissions those roles allow and checks the permission that the target tool, resource
template or prompt requires. Anything the server did not declare is denied. The signed
identity the Gateway forwards carries only the granted permissions in the target
server's namespace, together with the caller's tenant, Work Context and membership.
The server checks the permission again through its typed enum.

Per-object rules, such as Time's owner-only events, stay with the server. The resource
type on each permission lets shared relationship checks, such as Work Context membership
and Artifact sharing, attach later in the style of Google Zanzibar without changing the
server declaration. Cedar conditions, custom roles, bindings scoped to a Work Context
or a single resource and token-exchange delegation extend the evaluation in the
Gateway; none of them changes what a server declares.

### Calls Between Servers

A server that uses another server declares the permissions it uses in
`ai.veoveo/authorization`. Media, for example, declares `artifact.artifacts.read` and
`artifact.artifacts.write`. When no registered server provides a declared permission,
the Gateway refuses the call with a message that names the missing permission.

The calling server reaches the other server through the Gateway with a token from RFC
8693 token exchange. The token names the original caller and an `act` chain of the
calling server and the Gateway, and it carries only the declared permissions that the
caller holds. The target server authorizes the call as it would any other, and it
records the acting server as provenance. A Task keeps its delegation while it is live,
so work that finishes after the request returned, such as Media storing a provider's
output from its webhook, still acts for the Task's caller.

`veoveo-sdk-rust` gives each handler and Task a client, `ctx.client()`, that performs the
exchange, caches the token until it expires and sends typed calls. A provider's
`contract` feature supplies the request and result types and its permission constants,
and its optional `client` feature supplies helpers for flows of several calls, such as
an Artifact upload. Calls are builders that run when awaited, and a tool that runs as a
Task returns a typed handle that resolves when the Task completes. A Task that must not
repeat a step, such as a billed provider call, wraps it in `ctx.step`, which stores the
step's typed result on the Task so a restarted Task resumes at its first unfinished step.

### Time

| Permission | Resource | Access | Risks | Required by |
|---|---|---|---|---|
| `time.authorities.read` | `time.authority` | read | | `resolve_time`, `convert_time`, `assess_clock`, resources, completions and prompts |
| `time.schedules.expand` | `time.schedule` | read | | `evaluate_windows`, `expand_schedule` |
| `time.timelines.validate` | `time.timeline` | read | | `validate_timeline` |
| `time.events.write` | `time.event` | write | | `create_event`, `cancel_event` |
| `time.authorities.inspect` | `time.authority` | read | administer | administrative listings of sources, acquisitions and releases |
| `time.authorities.administer` | `time.authority` | write | administer | registering sources, acquisitions and release activation |
| `time.calendars.write` | `time.calendar` | write | administer | publishing operational calendars |
| `time.epochs.write` | `time.epoch` | write | administer | publishing mission epochs |
| `time.clock-policies.write` | `time.clock-policy` | write | administer | setting the clock quality policy |

Time's administration is a set of MCP tools, so the Gateway authorizes it like any
other call. Acquisition is a job tool with its own idempotency key, phases and
cancellation, and releases, calendars, epochs and the clock policy are read through
resources.

## Component Environments

Each component repository defines its own environment: one long-running container
that holds the component's source, toolchain, gates, acceptance tests, a coding agent
and an identity limited to the component's namespace. The environment builds, runs
and verifies its component, and the agent inside it fixes what fails. Nothing outside
an environment builds, tests or repairs that component.

### Image Stages

Each repository has one Dockerfile and an `openshell/policy.yaml`. The `dev` stage is
the image an OpenShell sandbox runs, and editors attach through OpenShell's SSH and
`--editor` support.

| Stage | Contents | Purpose |
|---|---|---|
| `dev` | the base toolchain, the component's source and coding agent CLIs | the running environment |
| `check` | `dev` plus formatting, clippy, cargo-deny, cargo-hack and unit tests executed during the build | the single gate, `docker build --target check .`, cached by BuildKit |
| `build` | release compilation with the same toolchain layer | input to `runtime` |
| `runtime` | the minimal image that runs the component | deployment |

Each repository's Dockerfile installs its own toolchain and tools from pinned
upstream images and releases: for a Rust component, Rust with clippy and rustfmt,
cargo-nextest, cargo-deny, cargo-hack, cargo-semver-checks, cargo-insta, clang,
cmake and pkg-config. The repository also owns its `rust-toolchain.toml`,
`rustfmt.toml`, `clippy.toml`, `deny.toml`, nextest profiles and OpenShell policy.
`veoveo-template-mcp-rust` provides the starting copy of these files, and a new
repository owns them after it is created. Images and toolchains may differ between
repositories, because components interact only through contracts. A crate that other
repositories compile declares its minimum toolchain with `rust-version`, so an older
toolchain fails at once with a clear message. Each repository keeps its own pins
current as ordinary maintenance.

Every build runs in a Linux container. That removes the macOS failures of the current
repository: `veoveo-testing-support` uses Linux-only process calls, and macOS lacks
the `leap-seconds.list` that Debian's `tzdata` package provides. Images set their
environment variables in `/etc/profile.d`, because OpenShell passes only `PATH` from
an image's `ENV` to sandbox processes and login shells reset it.

An environment is a working development machine. The sandbox user owns the Rust
toolchain and Cargo home, and the environment policy lists both as writable and
allows `static.rust-lang.org`, `index.crates.io`, `static.crates.io`, `crates.io`
and Git fetches from `github.com`. Developers and agents install toolchains,
components, targets and crates as they need them, and the image only pre-seeds its
pinned toolchain so the first start is fast. The qualification installed clippy and
rustfmt from a `rust-toolchain.toml`, added a `wasm32` target, ran `cargo install`
and built a Cargo Git dependency inside a sandbox. Pushing stays impossible, because
the sandbox holds no GitHub credential and its policy allows only `git-upload-pack`.

### Environment Loop

```text
pull -> build -> check -> run -> register with the Gateway -> verify through the Gateway
  ^                                                                  |
  +------- on failure the agent inside diagnoses, fixes, commits <---+
```

An environment verifies its component the way a real client uses it. Time's
environment calls Time's tools and runs a Task and a subscription through the
Gateway. The Gateway's environment registers the Observatory test server from
`veoveo-sdk-rust-fixture` as its test peer. Acceptance tests live in the component's repository
and run inside its environment.

The Gateway returns the exact reason for a rejected registration or migration to the
server that attempted it. An environment's identity can read its own namespace's
logs, health and audit records. An agent that finds a fault in another component
files an issue on that component's `VeoveoAI` repository, and that component's
environment takes it up. The factory MCP server replaces the issue channel once it
exists.

### Environment Runtime

OpenShell 0.1.3 runs every environment as a sandbox created from the component's
`dev` image and its committed policy. The OpenShell gateway, its supervisor images
and PostgreSQL are unmodified upstream releases that run outside the sandboxes. On
macOS the runtime needs Docker Desktop 4.94 or newer, whose Linux kernel enables
Landlock. Docker Desktop 4.54 lacks Landlock, and every sandbox fails OpenShell's
Landlock probe there. Docker Desktop also needs host networking enabled and Enhanced
Container Isolation disabled. Both hosts run the OpenShell gateway with
`OPENSHELL_TELEMETRY_ENABLED=false`, and images disable Rerun's usage analytics.

The October 11 qualification ran the same probes on macOS (arm64, Docker Desktop
4.94) and on the Ubuntu 24.04 RTX 4090 host (amd64).

| Path | Works | Fails |
|---|---|---|
| Outbound from a sandbox | HTTP, SSE, WebSocket, native gRPC over HTTP/2, PostgreSQL queries, advisory locks and notifications, Cargo through the TLS-inspecting proxy; 30-minute runs complete with p99 latency of 1 to 3 ms on Linux and 3 to 9 ms on macOS | WebSocket upgrades to endpoints inspected as `mcp`, `json-rpc` or `graphql`, and plain requests to endpoints inspected as `websocket` |
| Inbound through service exposure | HTTP/1.1, SSE, WebSocket, chunked and length-framed streams, gRPC-Web and one passed-through Bearer header; 30-minute runs complete with p99 latency of 1 to 2 ms on Linux and 10 to 14 ms on macOS | native gRPC, because the relay speaks HTTP/1.1 to the service; Basic authentication; more than 32 relay setups pending at once for one sandbox |
| Inbound through port forwarding | any TCP, including native gRPC and native Rerun Catalog SDK reads | nothing observed; a forward lives as long as the process that started it |

These results set the transport design:

- MCP servers dial out to the Veoveo Gateway and need no inbound path.
- The Veoveo Gateway serves MCP traffic through service exposure. Remote clients reach an exposed service through the OpenShell gateway listener's TLS, so remote installations run the OpenShell gateway with OIDC authentication instead of client certificates.
- Native gRPC endpoints, such as Recording's Redap service for native Rerun clients, use dial-in or a port forward. Rerun's WebViewer uses gRPC-Web, which passes exposure.
- Clients retry relay setup after a `502`, because OpenShell refuses relay setups beyond 32 pending for one sandbox.
- OpenShell inspects MCP `2026-07-28` requests and enforces tool-level allow and deny rules, so each environment's policy names the tools it may call.

`/sandbox` lives in the sandbox container's writable layer. It survives stop and
start and restart-policy replacement, which the qualification verified with an 8 GiB
cache and Cargo output, and deleting the sandbox removes it. OpenShell sets
`SSL_CERT_FILE`, `CURL_CA_BUNDLE`, `GIT_SSL_CAINFO` and `NODE_EXTRA_CA_CERTS` for its
TLS-inspecting proxy, and Rust HTTPS clients must trust that bundle. The probes,
policies and results move into `veoveo-qualify-openshell`, which reruns on both hosts
for every OpenShell release.

### Boundaries

Environments follow the author-sandbox rules in
[`FACTORY_ISOLATION.md`](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/docs/FACTORY_ISOLATION.md). No Docker or Podman socket,
kubeconfig, registry credential or signing key enters an environment. Dependencies
such as PostgreSQL run outside OpenShell as plain containers, and each environment's
policy names the address it may reach. Images are built outside the environment, by
the bootstrap operator now and by the factory's build broker later. Each environment
pushes through an OpenShell GitHub provider whose policy allows `git-receive-pack`
only for the component's own repository, and the agent never sees the token. The
factory's source broker replaces that provider, because `FACTORY_ISOLATION.md` keeps
push authority with brokers. The provider, created from OpenShell's GitHub example
profile, grants fetch. The environment's own policy adds `git-receive-pack` for its
repository, so one installation-wide token serves every environment while each pushes
only where its policy allows. The sandbox receives the token as an `openshell:resolve:`
placeholder, and the image configures a Git credential helper that sends the placeholder
as the password. The proxy substitutes the real token only on requests to GitHub.

`veoveo-qualify-openshell` is the one component that runs on the host. Its suite
creates, stops and deletes sandboxes, builds its probe image with Docker and measures
traffic between the host and sandboxes, which no sandbox can do. Its sandboxes live
for one run and take `q<run>-<role>` names instead of runtime names.

An environment on one machine reaches a Gateway on another by dialing in, so the
dial-in connection (A7) comes before environments span machines.

On macOS the environments run as `linux/arm64`, and on the Linux host as
`linux/amd64`. Each machine builds natively. Build output and the Cargo cache live
under `/sandbox`. GPU components get sandboxes with `--gpu` on the Linux host, where
the qualification reached the RTX 4090 through NVIDIA CDI. A change that spans
repositories clones the sibling repository into `/sandbox` and points a `[patch]` in
an uncommitted `.cargo/config.toml` at that clone.

### Tooling

No repository uses a task runner or shell scripts that hold test logic. Behavior
lives in Rust tests or in each tool's own configuration, and Cargo aliases provide
short commands.

| Need | Tool |
|---|---|
| Test execution, timeouts, process-group cleanup and machine-readable results | cargo-nextest with per-repository profiles |
| Code rules | `[workspace.lints]`, `clippy.toml` and rustfmt |
| Dependencies | cargo-deny for licenses, advisories, bans and sources limited to crates.io and `github.com/VeoveoAI` |
| Feature isolation | cargo-hack, proving that each `contract` feature builds alone, and `cargo tree`, proving that it pulls in no server runtime dependency |
| Public API | cargo-semver-checks for `veoveo-core` and `veoveo-sdk-rust` against their previous tags |
| Wire formats and schemas | insta snapshots |
| Parsers, IDs and URIs | proptest |
| Store tests | a private PostgreSQL 18 cluster per test process from the PGDG packages in the `dev` image, with a fresh database cloned from a migrated template for each test |
| Launching | OpenShell sandboxes for environments, Docker Compose for PostgreSQL, Kubernetes later |
| Deployment gates, later | Conftest or Kyverno CLI, kubeconform and `helm lint` |

## First Slice

The first slice is the smallest installation that represents Veoveo end to end.

| Component | Runs as |
|---|---|
| OpenShell gateway 0.1.3 | the official package, outside the sandboxes |
| PostgreSQL 18.6 | the official image, outside the sandboxes, with a non-superuser installation owner |
| Gateway environment | an OpenShell sandbox from `veoveo-service-gateway` |
| Time environment | an OpenShell sandbox from `veoveo-mcp-time` |

`veoveo-template-installation` provides the local installation. It holds the Compose file for PostgreSQL and RustFS,
the installation configuration, the namespace bindings and a component lock that names
each component's Git revision. Each component repository describes its own launch:
its policy, providers, GPU use and exposure under `openshell/`. Installation
configuration uses the same core contract that production installation repositories
use. The Gateway environment fetches its installation repository and applies its bindings at first
start, so a binding changes through a commit. Starting PostgreSQL and creating the
sandboxes are the only steps taken outside an environment, and each environment
generates its own private key. The slice is up when every environment reports itself
registered and verified on macOS. The Linux host repeats it from a fresh `git pull`
after macOS passes.

Core tests that use the database start a private PostgreSQL cluster per test process
inside the environment, because no container runtime enters a sandbox. The dev images
install the PGDG `postgresql-18` 18.6 packages.

Documents move under the same rule. A monorepo document moves only when a change
touches what it describes, and until then references link to the monorepo at the
baseline commit. A moving document is rewritten for its new repository: it keeps only
current, relevant content, drops plan status, history, `xtask` commands, monorepo paths
and other components' details, and every link resolves. Design documents that arrived
with their crates are cleaned in the change that next touches their component, and
before the repository is first pushed when they describe code that was cut.

Code moves by copying, cutting and solving. One crate or concern at a time is copied
into its new repository, stripped of everything outside the slice, made to pass every
gate on both machines and committed with a message that names its source commit. The
slice leaves behind `xtask`, the `testing-support` process supervisor, the installed
acceptance harnesses (including Time's eleven test files built on `testing-support`),
the Gateway's compiled optional-module registry and server-specific integrations,
and every core crate the slice does not use.

## Bootstrap

Bootstrap creates the first repositories by hand and hands them to their
environments as soon as the environments can work.

| Step | Work | Done when |
|---|---|---|
| 1 | Hosts: Docker Desktop 4.94 or newer with host networking on macOS, Docker on Linux, OpenShell 0.1.3 with telemetry off on both, the `VeoveoAI` organization | Done on October 11, except a persistent macOS telemetry setting |
| 2 | Apache-2.0 (D14) | Every first commit carries `LICENSE` and Cargo `license = "Apache-2.0"` metadata |
| 3 | `veoveo-qualify-openshell` from the spike, with its probes turned into Rust scenarios | The suite reproduces the October 11 results on both hosts |
| 4 | `veoveo-template-mcp-rust`: the starting Dockerfile stages, `/etc/profile.d` variables, `rust-toolchain.toml`, `rustfmt.toml`, `clippy.toml`, `deny.toml`, nextest profiles and an OpenShell policy that allows rustup, crates.io, GitHub fetches and model providers | An environment created from the template builds and checks a crate on both hosts |
| 5 | Qualify Git push through a GitHub provider (T4) and Claude Code with an API-key provider (T5) | Push succeeds for the environment's own repository only, and the agent completes an edit |
| 6 | Skeletons for `veoveo-core`, `veoveo-mcp-time`, `veoveo-service-gateway` and `veoveo-template-installation`: README, AGENTS.md, LICENSE, workspace manifest with lint tables, toolchain pin, Dockerfile stages and `openshell/policy.yaml` | `docker build --target check` passes and each environment starts on both hosts |
| 7 | Port the slice into the skeletons by copying, cutting and solving | First slice tasks S2 to S7 |

Until step 5 passes, work runs in outside-author mode. A coding agent on the host,
such as an interactive Claude Code session, edits the local checkout with its own
tools and pushes commits into the environment's Git working tree at `/sandbox/src`
over OpenShell SSH. That tree sets `receive.denyCurrentBranch=updateInstead`, so a
push updates the files in place. The agent then builds, tests, runs, registers and
verifies the component inside the environment through `ssh` or
`openshell sandbox exec`, which cost about 60 ms per command in the qualification.
The environment needs no model API key or GitHub credential in this mode, and pushes
to GitHub happen from the host. Editors attach to the same SSH entry through
OpenShell's `--editor` support. The bootstrap operator copies code from the current
repository in this mode. After step 5, agents inside the
environments copy, cut, solve and push through their providers. The Linux host
verifies every push from a fresh `git pull`. Each host builds its own images locally.

## Related Tracks

These tracks came out of the same review. They stay in this plan until each one has
an owning document.

### Session Version Selection

A builder's Veoveo session selects which version of each MCP server it sees. The
Gateway identifies the session from the signed `session_family` claim it already
verifies ([Gateway authentication](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/platform/gateway/src/auth/DESIGN.md)). The
selection is stored server-side, so clients send nothing extra.

- The Gateway resolves the session's selection on each request and routes that server's traffic to the selected upstream; other sessions keep the stable version.
- Agents started by the builder inherit the selection through their managed-agent execution metadata.
- A Task route records the version that created the Task. `CanonicalTaskRoute` in [`authorization.rs`](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/platform/gateway/src/mcp/authorization.rs) records only the server today.
- A selected version declares its own tools through registration, since it may add tools.
- Selection changes routing only. It never widens permissions.

Selected versions run against live data. Additive-only schema changes while a version
is under test, origin tags on every write, audit records for reversal, a
snapshot before write access, a kill switch that clears the selection, shadow
comparison for read paths, canary sessions with automatic rollback when an error
budget is spent and per-version telemetry contain that risk. The
[authorization model](#authorization-model) decides which of these checks a change
requires.

### Factory

[`FACTORY_ISOLATION.md`](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/docs/FACTORY_ISOLATION.md) defines the factory's author, verifier
and broker architecture and proposes `tools/factory/` for it. Under this plan its
control plane, brokers, verifier and console live in `veoveo-service-factory`.
[Component environments](#component-environments) are the factory's author
sandboxes. A coding agent changes, builds and deploys code only through the factory's MCP server,
which declares these permissions:

| Permission | Capability |
|---|---|
| `factory.sources.read` | read source, `CODEMAP.md` and designs |
| `factory.workspaces.create` | create a sandbox and edit a feature branch |
| `factory.checks.run` | run lints, contract checks and tests |
| `factory.images.build` | build and sign images for a commit |
| `factory.previews.create` | register a version and select it in the caller's session |
| `factory.previews.write` | let a selected version write live data |
| `factory.verdicts.sign` | sign an independent verification verdict |
| `factory.branches.merge` | merge a verified branch |
| `factory.installations.deploy` | change an installation's stable component lock |

The factory ships three predefined roles. `factory.author` covers sources,
workspaces, checks, images and previews. `factory.verifier` covers sources, checks
and verdicts. `factory.deployer` covers merges and deployments. Cedar conditions
decide when each permission applies. For example, `factory.branches.merge` requires
verdicts from a quorum of verifiers running harnesses and models other than the
author's, and a version becomes stable only after its staged rollout passes. The
factory mints a short-lived server identity for each build, bound to the image digest
and to the component's namespace.

The factory recovers without depending on itself. A watchdog outside the factory
reverts the installation to its last known-good component lock when health checks
or error budgets fail after a deployment, and Flux applies the revert. Changes to the
factory, Gateway authentication and the protected hosting files carry the strictest
conditions.

### Agent Experience In Console And Workspace

Console and Workspace show agent work as it happens: the branch, checks, preview
selection, deployment and Task progress. The journeys to design first are agent
creation and tool selection, live Task progress, wake from Time events and result
review in Workspace. Agents need a Chat Completions model for this work; the choice
between Reason on the Linux GPU host and a hosted provider is open.

## Tasks

### Decisions

- [x] D1. The naming spec applies from each repository's first commit, including crate and image renames.
- [x] D2. Every repository is public. The reference installation is `BiomaAI/veoveo-bioma`.
- [x] D3. No crate is published to a registry. Repositories consume crates as GitHub Git dependencies pinned by tag, and every repository built together uses one `veoveo-core` tag.
- [x] D4. Each component repository defines its own container environment with `dev`, `check`, `build` and `runtime` stages, and owns its toolchain and gate configuration. No Nix dev shell and no host toolchain requirement beyond Docker and Git.
- [ ] D5. CI placement for per-repository CPU checks. Taken up before the first release tag (E1) or the first outside contribution.
- [ ] D6. Agent model for Console and Workspace work. Taken up with the agents (E4).
- [ ] D7. Reconcile the factory permissions and roles with the brokers in `FACTORY_ISOLATION.md`. Taken up with the factory service.
- [x] D8. Authorization uses permissions, roles and bindings, relationship-based sharing, Cedar conditions, coarse OAuth scopes and narrowed delegation, declared by servers through `ai.veoveo/authorization`. No change waits for a person.
- [x] D9. New repositories are pushed to `VeoveoAI` as work lands, and the Linux host verifies each step from a fresh `git pull`.
- [x] D10. No task runner. Tools keep their own configuration, Cargo aliases provide short commands and test logic lives in Rust.
- [x] D11. Each environment builds, verifies and repairs its own component. Outside an environment, people and tools only launch environments and perform the bootstrap step.
- [x] D12. OpenShell 0.1.3 is the environment runtime on macOS and Linux, with telemetry disabled.
- [x] D13. MCP servers dial out to the Veoveo Gateway. Native gRPC endpoints use dial-in or port forwarding, never service exposure.
- [x] D14. Every repository is licensed under Apache-2.0. Its Section 6 grants no trademark rights, and it carries an explicit patent grant. The current repository has no `LICENSE` file and no Cargo `license` metadata, so every new repository's first commit adds both.
- [ ] D15. Image distribution: whether and where images are published, decided when an installation needs images it did not build. Taken up with E6.
- [ ] D16. Register the Veoveo name and logo as trademarks, and publish a `TRADEMARKS.md` policy that covers forks and `veoveo-*` names. Taken up before the first public release.
- [ ] D17. Choose the contribution model: a DCO sign-off, or a Contributor License Agreement if relicensing must stay possible. Taken up before the first outside contribution.
- [x] D18. Runtime names use `vv-<kind>-<name>` with the kind codes in [Runtime Names](#runtime-names).
- [ ] D19. A variant suffix for runtime names when several versions of one component run at once. Taken up with S7.
- [x] D20. Every name and format follows a published standard or the conventions in `veoveo-core` `docs/CONVENTIONS.md`. URIs, paths and identifiers carry no version segment such as `/v1`; releases, tags and crates carry versions.
- [x] D21. `veoveo-template-installation` is the starting point for every installation, including Veoveo's local one and `BiomaAI/veoveo-bioma`.
- [x] D22. Registration is an RFC 7591/7592 profile and the forwarded identity an RFC 9068 access token with RFC 9396 grants; plain HTTP is allowed only on local hosts.
- [x] D23. PostgreSQL 18 replaces SurrealDB as the database of every installation, decided on October 12 as a hard cut. SurrealDB Community runs as one node, and its multi-node failover and cross-node LIVE queries require Enterprise with online licence validation; PostgreSQL provides replication, advisory locks, `SKIP LOCKED` claims, `LISTEN`/`NOTIFY` and row-level security in its open-source release. Leases and renewals are gone: process liveness is a session advisory lock, released work moves to recovery through a foreign-key cascade, and registrations renew nothing. Every static query is checked at compile time by sqlx.
- [x] D24. `veoveo-core` holds no MCP and no server or domain vocabulary, audit included. The Rust MCP layer moves to `veoveo-sdk-rust`, and Knowledge and Embedding leave core with Artifact. Decided on October 12.
- [x] D25. A server that uses another server declares the permissions it uses at registration and calls through the Gateway with an RFC 8693 token narrowed to the declared permissions the caller holds. Typed consumers depend on the provider's `contract` feature by Git revision. Decided on October 12.
- [x] D26. The rmcp fork `VeoveoAI/rust-sdk` at `917e791` stays as it is. It is rmcp 3.5.0 plus Task status subscriptions, a typed HTTP rejection and a quieter drain log, and upstream 3.5.1 has none of the three. `veoveo-sdk-rust` records that reason beside its pin. Decided on October 12.
- [ ] D27. Whether a model without a sandbox may write a small artifact inline through a `write_artifact` tool, and the size limit. Programs and sandboxed agents upload through signed URLs. Taken up with the agents (E4), when an agent and a chat client exist to qualify it; nothing before them needs it.
- [x] D28. An owner declares each audit detail as a JSON Schema at registration, and the audit writer checks details against it. Decided on October 12.
- [ ] D29. The repository names of Knowledge, Recording, Computers and Agents, each of which contains an MCP server. Taken up with their extraction (E4).
- [x] D30. The Gateway's schema, migrations, policy evaluator and contract move into `veoveo-service-gateway`, since only the Gateway uses them. Decided on October 12.
- [x] D31. The kernel migrations change in place for the core cut, and every local installation resets, because no installation has a release to preserve. Decided on October 12.
- [x] D32. Clients reach RustFS directly at one address the installation configures. Artifact records each authorization, and an installation that must prove each transfer adds RustFS's audit feed. Release states are private and released. The Artifact server owns each tenant's upload limits. RustFS is accepted while it stays private behind the server's credential, current, and used only through standard S3 calls. Decided on October 12.
- [x] D33. `veoveo-sdk-rust` has one library crate, `veoveo-sdk-rust`, that absorbs the hosted server contract, hosting, the client, registration, MCP Apps and the Task adapter behind `contract`, `client` and `server` features. The conformance CLI `veoveo-sdk-rust-conformance` and the test server `veoveo-sdk-rust-fixture` are separate crates because they are binaries. Decided on October 12.
- [x] D34. Outside results are operations on a Task in core's Task runtime: a waiting Task holds no worker, a webhook or a declared status check wakes it, the first final result wins, and a restart leaves it waiting. Each server writes only its provider's calls and event parser. Decided on October 13.
- [x] D35. Cost and usage records live in a `usage` ledger in core, separate from audit, shaped by FOCUS 1.4 with ISO 4217 currencies. Servers declare their usage kinds under their own prefix, an estimate is a reservation that a later budget can refuse, each Task carries its totals and the Gateway serves totals across servers. Spending limits follow the Media port. Decided on October 13.
- [x] D36. Core's audit record is the minimal envelope NIST SP 800-53 Rev. 5 AU-3 asks for, mapped to OCSF 1.9: source from the writer's login, an owner-declared class with its OCSF class, a four-value outcome, an owner-defined reason, actor, acting server and Task, target URI, request and details of at most 16 KiB. The writer checks details against the owner's schema; core keeps the hash chain, sealing and export. This revises D28's write-time check. Decided on October 13.
- [x] D37. Revoking a caller's session for a replayed refresh token ends the delegation of that caller's running Tasks; a logout does not. Decided on October 13.

### Registration And Authorization

- [x] N1. Qualify the networking the first slice needs on macOS: one sandbox reaching another sandbox's service through exposure and through a port forward, and a custom endpointless provider whose placeholder resolves only on requests to a bound endpoint. Done on macOS (`veoveo-qualify-openshell`): port forwards reach between sandboxes, exposure does not, and a policy-bound provider secret resolves only on its endpoint.
- [x] A1. In `veoveo-core`: the normative protocol document, typed RFC 7591/7592 registration requests and responses, the `ai.veoveo/registration`, `ai.veoveo/authorization` and `ai.veoveo/module` declarations, the registration client for servers, the installation configuration without servers (roles, grants, overrides and the registration secret), and the forwarded identity as an RFC 9068 access token carrying granted permissions in RFC 9396 `authorization_details`. Done in `veoveo-core` (`veoveo-mcp-ext-registration`).
- [x] A2. Load module manifests in `veoveo-modules` through the same admission as Rust declarations. Done in `veoveo-core`.
- [x] A3. Gateway registration: the registration endpoint, namespace pinning, leases in SurrealDB with LIVE distribution, catalog snapshots, migrations through the core runner and per-server database users. Every call site that reads a configured server list reads the registration catalog. Done in `veoveo-service-gateway` `92d8a25`; the newest registration of a slug routes until session version selection exists.
- [x] A4. Gateway authorization by roles over access and risks, overrides, and granted permissions in the signed identity, replacing policy rules and profile server lists. Done in `veoveo-service-gateway` `92d8a25`.
- [x] A5. Token exchange (RFC 8693) for calls between servers and from an agent to a sub-agent. The Gateway issues a token for the target server that names the caller and the acting server, carries the declared permissions the caller holds, and stays available to a live Task (D25). Done for calls between servers in `veoveo-service-gateway` `6548d71` on `veoveo-sdk-rust` `4f2773f`: a registered server exchanges its forwarded token, or one of its live Tasks, at `/oauth/token` with an RFC 7523 assertion, and receives a token for its profile whose permissions are the requested uses the caller holds, re-evaluated at each exchange. An exchanged identity is never exchanged again, and a Task's delegation ends with the Task. A running Task's delegation does not end when the caller logs out. Agent to sub-agent delegation returns with the agents.
- [x] A9. A server declares the permissions it uses on other servers, and the Gateway refuses a call when no registered server provides one, naming the missing permission (D25). Done in the same revisions: `uses` in `ai.veoveo/authorization`, `invalid_authorization_details` for an undeclared use and `invalid_target` naming each permission no registered server provides.
- [x] A6. Time declares its permissions, checks granted permissions through one typed requirement table, registers at startup and verifies itself through the Gateway. Done in `veoveo-mcp-time` `fa049c3`: nine permissions from one requirement table, administration as MCP tools, and six acceptance tests through the Gateway on macOS and Linux.
- [ ] A7. Let a server dial in to the Gateway over an authenticated connection.
- [x] A8. Limit each server's database user to its own table prefix. Done by the PostgreSQL cut (S9): each server owns one schema through its group role, and row-level security confines it to its own rows in kernel tables.

### OpenShell Qualification

- [x] Q1. Inbound exposure, outbound transports, SurrealDB, MCP `2026-07-28` inspection, Redap through forwarding and gRPC-Web, persistence, restart policy and GPU on both hosts.
- [x] Q2. Thirty-minute endurance runs on macOS and Linux: every stream completes, except four of fifty simultaneous SSE opens on Linux that hit the 32 pending-relay limit.
- [ ] Q3. Large transfers of several GiB in both directions (R4).
- [x] Q4. HTTPS from a Rust rustls client through the TLS-inspecting proxy, on both hosts.
- [x] Q5. Git push through a GitHub provider, limited by sandbox policy to one repository, with the token visible only as a placeholder, on both hosts (T4).
- [ ] Q6. Claude Code with an API-key provider (T5).
- [ ] Q7. A macOS telemetry setting that persists across logins.
- [x] Q8. `veoveo-qualify-openshell` (`100545a`) turns the probes into 29 Rust scenarios with machine-readable results; macOS and Linux pass with no failures.
- [x] Q9. Environments install toolchain components, targets, crates and Git dependencies inside the sandbox.
- [x] Q10. Add a `limit` scenario for loopback ports: inside a sandbox, a closed loopback listener keeps completing TCP handshakes and never answers, while a plain container refuses the connection. Added as `sandbox.loopback_close`.
- [ ] Q11. Add a scenario for synthetic DNS address expiry: a long-running process that resolves a host early, such as Cargo fetching Git dependencies before the crates.io index, is denied with `transparent_tcp_mapping_denied` when it connects after the mapping expires.
- [ ] Q12. Add a lifecycle scenario for a Docker daemon restart: OpenShell 0.1.3 marks running sandboxes Error, refuses both stop and start, and only delete recovers, losing `/sandbox`. Environments keep source in Git and treat `/sandbox` as a cache.
- [ ] Q13. Add a scenario for binary pinning: a policy binary path is pinned to the SHA-256 of the first binary it sees, so a rebuilt binary at the same path is denied; environments run services from content-addressed paths.
- [ ] Q14. Add a scenario for `openshell sandbox exec` with a background child: the call does not return while the child runs, so services start in their own session.
- [x] Q16. Replace the SurrealDB scenario with PostgreSQL 18.6: queries, a session advisory lock and `LISTEN`/`NOTIFY` delivery through inspected and `tcp` endpoints. Done at `d99b915`; 33 scenarios pass on both hosts with no failure.
- [ ] Q15. Add a scenario for `openshell forward start -d`: the detached forward keeps the caller's standard streams open, so a caller that captures output waits until the forward stops, and stopping that caller kills the forward. Scripted callers redirect all three streams.

### First Slice Tasks

- [x] S1. `veoveo-template-mcp-rust` (`1167397`), a GitHub template repository, passes its check stage, runtime image and in-sandbox gates on macOS and Linux. Skeletons for `veoveo-core` (`2eb7d48`), `veoveo-mcp-time` (`0cd9273`) and `veoveo-service-gateway` (`213e257`) are created from it and pass the same gates on both hosts. `veoveo-deploy` (`35446d9`) starts SurrealDB 3.3.0 from an image pinned by digest.
- [x] S2. `veoveo-core`: its environment and the slice's crates, plus A1 and A2. Done: `veoveo-core` `75c05e6`, which the Gateway and Time pin. The store fixture accepts only a `surreal` child it started and that signs in with the fixture's credentials, and knowledge member replacement retries SurrealDB write conflicts; with both, the suite passes 823 of 823 tests in five consecutive environment runs and in three Linux image checks.
- [x] S3. `veoveo-mcp-time`: its environment, self-registration, migration and self-verification through the Gateway (A6). Done at `fe08624`.
- [x] S4. `veoveo-service-gateway`: its environment, registration (A3), dial-in (A7) and self-verification with the `modular-mcp` fixture. The first slice leaves out managed-agent token admission, which returns through registration, and the Console's snapshot, stream, artifact summary and cluster authorization endpoints, which return with the Console's repository. Registration and self-verification done at `b69f16f`; dial-in remains A7.
- [x] S5. `veoveo-template-installation` (renamed from `veoveo-deploy`, marked as a template at `c0eec52`): the installation configuration with roles, grants and the registration secret, the component lock and launch descriptions, so the local installation runs from the template's defaults. Done at `798e030`: the `vv-local` Compose project, the provider profile, and bootstrap, stop and reset instructions. The installation configuration is generated because it embeds per-run key thumbprints. The component lock is S8.
- [x] S6. The slice is up: every environment reports itself registered and verified on macOS and on the Linux host after a fresh `git pull`. Done on October 12 with core `75c05e6`, Gateway `b69f16f` and Time `fe08624`. The README bootstrap from a reset passes Time's six acceptance tests and the Gateway's registration test on macOS. On Linux, it passes the acceptance tests from fresh clones, and the reset leaves no sandbox, forward, container, volume or registration provider. On macOS, SIGTERM removes Time's registration row and a restart registers again within 6 seconds.
- [x] S9. The PostgreSQL cut (D23): core, the Gateway, Time, the installation template, the server template and the qualification harness carry no SurrealDB code, dependency, image or document. Done on October 12 with core `61f913e` (640 tests), Gateway `2e1daba` (123 tests), Time `6079b6a` (144 tests), `veoveo-template-installation` `9c115c4`, `veoveo-template-mcp-rust` `2c25a8b` and `veoveo-qualify-openshell` `d99b915`; every image check passes on macOS and Linux. The slice runs on PostgreSQL 18.6 on both hosts and passes Time's six acceptance tests. On macOS, SIGTERM deletes Time's registration, login and instance at once, and after SIGKILL the Gateway removes the registration and drops the login 64 seconds later.
- [ ] S7. A second Time version registers and one session selects it.
- [x] S8. A component lock in `veoveo-template-installation` that names each component's repository and Git revision, with a format URI and JSON Schema under the conventions, read by the bootstrap instead of cloning `main`. Done at `5fae4b3`, which locks Gateway `36cdec8` and Time `f4f1b1b`; the core cut (C6) qualifies the next lock on both hosts.

### Cuts During Porting

These cuts happen in the new repositories while code is copied, not in the current repository.

- [x] P1. Remove the Gateway's compiled module registry and the twelve optional module declarations it links: Reason, Stream, Computers, agents, Workspace, Recording, Map, Time, UAV, Frames, Media and Optimization. Kernel modules stay compiled in, and every other module arrives through registration. Done in `veoveo-service-gateway`.
- [x] P2. Move server-specific Gateway code to its owners: agent runtime authentication, bindings and catalog import; the Console stream over Recording and agent tables; Computers routes; Workspace modules; Speech routes; and the Gateway catalog's direct agent runtime, Computers and Recording dependencies. Done in `veoveo-service-gateway`; managed-agent admission returns through registration and the Console endpoints return with the Console's repository.
- [ ] P3. Port Media onto Artifact's `client` feature (M6). Its write-capability table, the `media://artifact` proxy, in-memory output buffering and the public `/media/files` directory are cut.
- [ ] P4. Remove the Knowledge and Reason dev-dependency cycle.
- [ ] P5. Split `platform/workspace` into a contract and services.
- [ ] P6. Split the agent runtime contract from `agents/runtime`.
- [ ] P7. Give Artifact, Knowledge, Embedding and Recording acceptance suites in their own repositories that run over MCP against any implementation.
- [x] P8. Replace the hand-written server entries in `gateway.json` with registration. Done: the Gateway and the installation name no server.
- [ ] P9. Split `deploy/helm/veoveo` into per-component charts and a platform chart.
- [ ] P10. Leave `cargo xtask` and the `testing-support` process supervisor behind; nextest and environment self-verification replace them.
- [x] P11. Owners declare their audit classes and details at registration (D28), and core's audit contract keeps only the envelope (C3). Done with C5: a registered server declares its classes through `audit.declare_server_classes`, confined to its own prefix.
- [ ] P12. Remove the Artifact and Knowledge sections of the Gateway configuration contract, and take its Audit section from registration data.
- [x] P13. Remove the Knowledge and Artifact schemas, queries and service contract from core (C3). Done with C3.
- [ ] P14. Move each server's contract-document conformance check into that server's repository; `veoveo-sdk-rust` provides the check as a library.
- [x] P15. Remove `mcp/apps-extension/browser` and its `image-asset-inputs` metadata from `veoveo-core`; the browser runtime and its Node tests move to `veoveo-sdk-typescript` when the App-shipping servers are extracted. Done in `veoveo-core`.

### Core Cut

- [x] C1. Create `veoveo-sdk-rust` from the server template with the crates of D33: the MCP crates, the Task runtime's MCP adapter and the MCP audit details merge into `veoveo-sdk-rust`, `veoveo-mcp-conformance` becomes `veoveo-sdk-rust-conformance`, and the `modular-mcp` fixture with the tool-input fixtures becomes `veoveo-sdk-rust-fixture`. The Gateway and Time pin it. Done in `veoveo-sdk-rust` `5c6e1ba`, pinned to core `7a6c210` and the rmcp fork with its reason beside the pin; the check stage passes 216 tests on macOS and Linux. The forwarded-token verifier accepts only its own server's audience, and the resource-token path of the old byte routes is gone.
- [x] C2. Move the Gateway's schema and migrations, the store's Gateway module, `veoveo-policy` and `veoveo-gateway-contract` into `veoveo-service-gateway` (D30). Done in `veoveo-service-gateway` `72bbd6a` on core `dd7394e` and the SDK `3524b83`: the Gateway migrates its own `gateway` schema with its own history, refuses a server registering `gateway`, declares its audit classes, reads other owners' records through the stored declarations, and passes core's database checks through `Conformance::owner`. Time `708d689` and the server template `1cf9b6c` run on the same core.
- [x] C3. Delete the Artifact, Knowledge, Embedding, Computers, Recording, Dictation, LiveView, Agents and Console items and the unused modules from core, as [Core Contents](#core-contents) lists. Time and the Gateway drop their Knowledge source declarations. Done in `veoveo-core` `7a6c210`: 19 commits remove 67,895 lines and leave 11 crates; Time and the Gateway follow in C2.
- [x] C4. Replace the Gateway profile and the MCP input method in the `tasks` schema with protocol-neutral owner data. Done in `7a6c210`: `task.surface` is an opaque key the creating adapter fills, and `task_input.kind` an opaque input name.
- [x] C5. Core's check stage fails when a core crate depends on rmcp or on an MCP crate, or when the audit vocabulary names a server. Done in `7a6c210`: a Rust test reads core's lock file, audit classes are owner-declared with a JSON Schema stored in `audit.detail_type`, and core declares only Task and audit classes. The check stage passes 299 tests on macOS and Linux.
- [x] C6. Every repository passes its image check on macOS and Linux, and the local installation passes Time's acceptance tests after a reset (D31). Done on October 13 with core `f685fbf`, the SDK `c9742c0`, Gateway `8ea3e5d`, Time `bc6b8be`, Artifact `cd4445b`, the server template `1a7b734` and `veoveo-template-installation` `ff883ee`. After a reset from the README on macOS and Linux, the Gateway's registration test, Time's six acceptance tests and Artifact's five pass on both hosts, and SIGTERM removes Time's and Artifact's registrations, logins and instances at once.

### Artifact And Media

- [x] M1. `veoveo-mcp-artifact` foundation: the repository from the server template, the `artifact` schema, RustFS in the installation, single and multipart uploads, downloads, metadata, lists and paging, grants, deletion and retention, quotas, audit and notifications. Size and SHA-256 are optional on `create_upload`; RustFS checks them during the write when given, and the server computes the SHA-256 at completion otherwise. `create_upload` carries labels, retention, metadata and an idempotency key, and objects are stored by artifact ID. Acceptance passes through the Gateway on macOS and Linux. Done in `veoveo-mcp-artifact` `cd4445b`: the `artifact` schema with `artifact.effective_level`, quota reservation under a locked usage row, idempotent creates, keyset listings and the sweep; nine tools, their resources and subscriptions, signed RustFS transfers through aws-sdk-s3, inline or Task digest verification, and an audit record in each decision's transaction through core's server audit functions, with 75 tests on both hosts. Artifact's five acceptance tests pass through the Gateway and RustFS on both hosts, including 1 GiB of unknown size uploaded in parallel parts through OpenShell's TCP pass-through (44 s on macOS, 87 s on Linux), a ranged download, grants, a quota refusal and deletion releasing the bytes. A read refused across tenants is covered by database tests, because the local installation has one tenant.
- [x] M2. The server uses aws-sdk-s3 1.152.0 without default features, with rustls on ring and without aws-config. It is the only Rust S3 crate that signs Content-Length, Content-Type, the SHA-256 checksum and `If-None-Match` into a URL, completes a multipart upload create-only, and sets bucket CORS and lifecycle rules. Done in M1.
- [x] M3. `ctx.client()` in `veoveo-sdk-rust`: calls through the Gateway for the current caller or Task with token exchange (A5), typed calls from a provider's `contract` feature, builders that run when awaited, and a typed handle for tools that run as Tasks. Done in `veoveo-sdk-rust` `4f2773f`: the `client` feature's `GatewayClient`, `ToolCall` and `TaskHandle`, which waits on Task status subscriptions, `ctx.client()` and Task bindings in `server`, and `TestMesh` in `testing`; the Gateway's tests and the SDK's own pass on macOS and Linux. Time `16f150d` and the server template `4ecd9b3` follow.
- [x] M4. Durable steps in core's Task runtime: `ctx.step` stores each finished step's typed result on the Task, and a restarted Task resumes at its first unfinished step. Done in `veoveo-core` `6898a77`: `tasks.task_step`, steps that record their operation ID before they run, and an unsettled step reported with the same ID.
- [x] M5. Artifact's `client` feature: `ArtifactClient` uploads a stream of unknown size and downloads, built on `ctx.client()`. Done in `veoveo-mcp-artifact` `92d38e1`: typed calls for every tool, streamed uploads whose memory stays at part size times parallelism (64 MiB by default), ranged downloads, and the acting server recorded on each artifact and audit record; 82 tests pass on macOS and Linux.
- [ ] M6. `veoveo-mcp-media` on PostgreSQL with `ArtifactClient` (P3), on operations and the usage ledger (M9, M10). The provider address is required configuration, so every test names a fake provider and none reaches the real one.
- [x] M7. Artifact sharing: release states, share links and their route, and access requests. Done in `veoveo-mcp-artifact` `c2e541c`: release and private states, share links for released artifacts without data labels that live up to 30 days with an optional redemption limit, the public `GET /artifact/shares/{token}` route answering a live link with a five-minute signed GET and every refusal with the same 404, access requests whose approval writes the grant in the same transaction, and the two review prompts; 101 tests pass on macOS and Linux. The SDK's request span must stop recording raw paths before share links run in an installation.
- [ ] M8. The Artifact library App, delivered with the Console port.
- [x] M9. Operations, the usage ledger and the minimal audit record in `veoveo-core` (D34, D35, D36), with durable steps (M4). Done in `veoveo-core` `50e72a3`: Tasks park on operations that settle through events, checks and deadlines; the `usage` ledger in FOCUS 1.4 columns with Task costs and daily totals; the audit record cut to an envelope with owner reason codes, URI targets and the acting server, mapped to OCSF 1.9. 328 tests pass on macOS and Linux. Migration `0503` requires a reset of every installation's database.
- [x] M10. The SDK, the Gateway, Time and Artifact adopt M9: `ctx.step`, `ctx.operation`, `ctx.usage` and the callback route in the SDK; the Gateway's own reason codes, the session rule of D37 and its cost views. Done with `veoveo-sdk-rust` `25d9ea5` (`TaskWorker` with a shutdown drain, steps, operations with the callback route, usage with per-Task costs), Gateway `a8843f2` (its own reason codes, D37, usage partitions and cost views at `/admin/{profile}/usage/daily`), Time `ffeec94` on `TaskWorker`, Artifact `128fe01` and the server template `399da40`; every check stage passes on macOS and Linux.
- [ ] M11. Spending limits over the usage ledger, and the OCSF audit export and FOCUS usage export checked by their projects' validators.
- [ ] M12. Reset the local installation from the README on macOS and Linux with a new component lock, and pass the acceptance tests of the Gateway, Time, Artifact with sharing, and Media with a fake provider. Media's real provider is qualified once in the same run, with one generation of its cheapest image model, completed through bounded status checks and through its webhook, which reaches the local installation through the template's optional `tunnel` Compose profile: a named Cloudflare tunnel per host (`vv-local-macos.veoveo.ai`, `vv-local-linux.veoveo.ai`) whose remote ingress passes only Media's callback route and Artifact's share route and answers 404 to everything else; the API key reaches Media's environment only as an OpenShell provider placeholder.

### Extraction

- [ ] E1. Tag `veoveo-core` `v0.1.0` once the first slice is up.
- [ ] E2. Bring each further component in with its own environment, one at a time, after the first slice is up.
- [ ] E3. Extract the leaf servers: Datasheet, DuckDB, Timeseries, Chart, Map and Frames.
- [ ] E4. Extract Knowledge, Recording, Agents and Computers, deciding their repository names (D29) first and, with the agents, inline artifact writes for a model without a sandbox (D27).
- [ ] E5. Extract the GPU servers, runtimes and showcases.
- [ ] E6. Create `BiomaAI/veoveo-bioma` from `veoveo-template-installation` the way any organization would, add a Kubernetes target to the template, and move the Bioma reference installation there.

### Documentation

- [ ] W1. Replace `FORK_DEVELOPMENT.md` with installation-template and component-fork guidance.
- [ ] W2. Turn `CODEMAP.md` into an organization map in `veoveo-docs`.
- [ ] W3. Update the AGENTS.md naming, repository command and CI sections.
