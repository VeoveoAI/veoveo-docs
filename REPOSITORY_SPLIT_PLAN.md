# Repository Split Plan

Status: active plan for the `VeoveoAI` organization. Decisions marked done under
[Tasks](#tasks) are accepted, and repositories are created from it as work lands. The
Veoveo monorepo's contracts, layout and release process apply to each component until
it moves.

Baseline: Veoveo main `0c33cf8a7` on 2026-10-11.

Current push: the macOS native OpenShell foundation, Lore clone/edit/push, branch hook and direct-IdP credential lifecycle pass. The Desktop adapter and signer are retired. Deployed Hub → Time integration now passes, including Tasks, credential renewal and restart recovery. Its checked source is published to Git and verified identical in Lore. Factory preflight, the bounded model build and Time deployment from that same revision also pass under [the execution checklist](OPENSHELL_HARDCUT_PLAN.md#subsequent-adoption). Linux replacement is separate.

Infrastructure direction: [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md)
and [Lore/OpenShell Integration](LORE_OPENSHELL_INTEGRATION.md) make OpenShell the
execution authority for factory work and deployed services. Lore carries source
and arbitrary environment definitions. Native templates, service endpoints,
restarts, policy workflows, sessions and credential drivers replace duplicated
Veoveo or external machinery. Kubernetes, k3d, K3s, Helm and Flux are removed from
the candidate, including optional paths. Use OpenShell's Docker driver on Mac and
Linux, with native NVIDIA CDI for Linux GPU requests. The trusted integration uses
the existing version-pinned Rust clients for Lore and OpenShell.
Maintained forks may close verified gaps while preserving extension/security
contracts. This supersedes D49's hosting split. Historical Compose factory records
below do not describe the current runtime. Shared human secret distribution is outside this
focused plan; runtime custody uses OpenShell.

The [OpenShell hard-cut plan](OPENSHELL_HARDCUT_PLAN.md) records the requested
execution order: preserve work and durable data, remove old launchers and workloads,
then implement and run focused checks on the selected native path. Runtime deletion and the direct-IdP
Lore credential lifecycle are recorded there as complete on macOS; Hub/Time and
remaining infrastructure migration are open. [D55](#decisions) withdraws Desktop acceptance
and selects [direct Lore OIDC](LORE_DIRECT_OIDC_PLAN.md), with no Veoveo token broker.

This plan moves Veoveo from one repository into a `VeoveoAI` GitHub organization.
`veoveo-core` holds the protocol-independent platform: types, the database kernel,
identity, Tasks and the audit envelope. `veoveo-hub-sdk` builds MCP on top of it, and
each MCP server publishes its own contract. Each running service, MCP server, runtime
and application becomes its own repository and releases on its own schedule.
Installations compose released components instead of forking the platform.

The goal is that a change to one component rebuilds, qualifies and deploys that
component alone. In the 2026-10-11 monorepo baseline, a change to a shared crate
rebuilt every Rust image family, and the Gateway binary rebuilt whenever one of ten
domain servers changed. This describes the extraction starting point, not the
current component repositories.

## Standards And Protocols

| Standard or protocol | Use in this plan |
|---|---|
| Git and GitHub organizations | One repository per component under `VeoveoAI`; installation repositories in the installation owner's organization |
| Cargo | Components consume `veoveo-core` and other contract crates as GitHub Git dependencies pinned by Git revision until the first release tags (E1); nothing is published to a registry |
| Semantic Versioning 2.0.0 | `veoveo-core` versions; `cargo-semver-checks` blocks unplanned breaking changes |
| OCI images | Each host builds component images locally; a registry for distributing them is an open decision (D15) |
| Dockerfile multi-stage builds with BuildKit | `dev`, `check`, `build` and `runtime` stages in every component repository |
| Docker Engine and the Compose specification | Remaining trusted bootstrap/data services; factory and managed MCP execution uses native OpenShell (D52/D54) |
| Envoy 1.40.0 | Retained `vv-identity-edge` HTTPS for local Keycloak and its restricted public JWKS alias. Hub ingress and private service forwarding use native OpenShell; Desktop and application Envoy routes are retired |
| Lore v0.10.1 extension build | Existing CLI auth patches and small native push hook; native authorization/transport unchanged. Direct IdP grants and local credential lifecycle are qualified (D55) |
| OpenShell native workloads | Native Docker execution, templates/specs, policy, providers, restart and forwarding; focused macOS path accepted, general adoption pending |
| MCP `2026-07-28` | Extension identifiers and `_meta` keys use the `ai.veoveo/` namespace; every name and format follows the [naming and format conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md) |
| Veoveo MCP extensions `ai.veoveo/registration` and `ai.veoveo/authorization` | Repository-owned declarations a server sends when it registers with the Hub |
| OAuth 2.0 private-key JWT client authentication, RFC 7523 | Existing MCP application identities; not a requirement for the native Lore client-credentials provider |
| OAuth 2.0 Token Exchange, RFC 8693 | Delegation when a server or agent calls another server for a caller, narrowed to the permissions the calling server declares |
| Cedar | Authorization conditions; the version is pinned when adopted |
| `veoveo.ai/deployment/v9` and `veoveo.ai/deployment-lock/v8` | Current profile and lock formats; the component lock below extends them |
| PostgreSQL 18.6 | One database per installation; core owns the kernel schemas, and each server owns one schema and applies its own sqlx migrations ([database design](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/DATABASE.md)) |

## Principles

1. `veoveo-core` holds protocol-independent platform libraries: types and macros, the
   database kernel, identity, the Task runtime and the audit envelope. It names no MCP
   method, server or domain, runs no service and depends on no component repository.
2. `veoveo-hub-sdk` holds the Rust MCP layer on top of core: hosting, the client that
   servers use to call each other, registration, the MCP extensions, the Task MCP
   adapter and MCP conformance. The Hub and every Rust server depend on it.
3. A server publishes its contract through its crate's `contract` feature, which builds
   without the server's runtime dependencies. A component that uses another server
   depends on that feature by Git revision, never by path and never in a cycle, and
   declares the permissions it uses when it registers.
4. A server's acceptance suite lives in its repository and runs over MCP against any
   server address, so another implementation of Artifact, Knowledge, Embedding or
   Recording qualifies against the same suite.
5. A component keeps one name for its repository, primary crate, binary, image and
   native workload definition.
6. A component owns its image, toolchain and gate configuration. Repositories couple
   only through contracts, conformance suites and the `rust-version` floor of the
   crates they compile from other repositories, so differing images and toolchains
   need no coordination.

## Naming

Repository names follow `veoveo-<kind>[-<name>]`. The kind comes first so a clone
directory never collides with another project and related repositories sort
together. Third parties follow the same pattern in their own organizations, for
example `acme/veoveo-mcp-inventory`, and add the matching GitHub topic.
The named Hub family is an explicit role-naming exception: `veoveo-hub`,
`veoveo-hub-sdk` and its SDK companion crates keep those accepted names.

| Kind | Meaning | Example |
|---|---|---|
| `core` | Protocol-independent platform libraries | `veoveo-core` |
| `service` | Platform process that is not an MCP server | `veoveo-service-lore` |
| `mcp` | MCP server, which publishes its contract through its crate's `contract` feature | `veoveo-mcp-time` |
| `runtime` | Native or GPU runtime used by a service | `veoveo-runtime-embedding` |
| `app` | User-facing application | `veoveo-app-console` |
| `hub` (named family) | Application Hub and its shared SDK; explicit role-naming exception | `veoveo-hub`, `veoveo-hub-sdk` |
| `template` | GitHub template repository | `veoveo-template-mcp-rust` |
| `showcase` | Demonstration workload | `veoveo-showcase-uav` |
| `qualify` | Qualification suite for a third-party runtime | `veoveo-qualify-openshell`, reactivated for native qualification under D52–D55 after D40 |
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

In the 2026-10-11 monorepo baseline these differed: Time's crate was
`veoveo-time-mcp`, its image was `veoveo/time-mcp`, and the Gateway image was
`veoveo/mcp-gateway`. These are historical names; extraction and the naming
preparation recorded in the execution checklist establish the current names. No Veoveo crate, wire name or format has been released, so renames have
no external consumers. Wire names, format identifiers and other identifiers follow the
[naming and format conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md).

### Runtime Names

Runtime resource names carry their own limits, and short names read
well in commands. Runtime names therefore use `vv-<kind>-<name>`, with a short code for
each kind, while repositories, crates, binaries and images keep their full
`veoveo-<kind>-<name>` names. Kinds without a code use `vv-<name>`. On a local
installation's network each container also answers under `.internal`, such as
`vv-mcp-time.internal`. Extension keys, format identifiers and every other wire name follow
the [naming and format conventions](https://github.com/VeoveoAI/veoveo-core/blob/main/docs/CONVENTIONS.md).

| Kind | Code | Example runtime name |
|---|---|---|
| `service` | `srv` | `vv-hub` |
| `mcp` | `mcp` | `vv-mcp-time` |
| `runtime` | `rt` | `vv-rt-embedding` |
| `app` | `app` | `vv-app-console` |
| `sdk` | `sdk` | `vv-sdk-python` |
| `template` | `tpl` | `vv-tpl-mcp-rust` |
| `showcase` | `demo` | `vv-demo-uav` |
| `qualify` | `qual` | `vv-qual-<suite>` |
| none | none | `vv-core`, `vv-local`, `vv-postgres` |

Running several versions of one component, as
[Session Version Selection](#session-version-selection) requires, needs a variant
suffix (D19).

## Repository Catalog

| Repository | Source today | Publishes |
|---|---|---|
| `veoveo-core` | `platform/{types,macros,http,oauth,store,task-runtime,audit,installation/contract}` without their MCP, Hub and domain items, `testing/fixtures` (see [Core Contents](#core-contents)) | crates |
| `veoveo-hub-sdk` | `mcp/{contract,ext-registration,ext-apps,conformance}`, the Task runtime's MCP adapter, `testing/fixtures/modular-mcp`, and the client servers use to call each other | crates, conformance CLI |
| `veoveo-hub` | `platform/gateway/{src,catalog,composition,queries,contract}`, `platform/policy`, the store's Hub module and the `hub` schema | image, OpenShell workload definitions |
| `veoveo-service-agents` | Agent reasoning and application Task behavior from `agents/{kernel,manager,runtime}`; execution/session responsibilities move to OpenShell | images, OpenShell workload definitions, agent templates |
| `veoveo-service-knowledge` | `platform/knowledge` with its contract, the `ai.veoveo/knowledge-source` extension, `servers/knowledge-mcp` | image, OpenShell workload definitions |
| `veoveo-service-recording` | `platform/recordings/{hub,forwarder,store,reader,rrd,video}`, `servers/recording-mcp` | images, OpenShell workload definitions |
| `veoveo-service-computers` | `platform/computers/*`, `platform/runtimes/computers`, `servers/computers-mcp` | Host, template and MCP images, OpenShell workload definitions |
| `veoveo-runtime-embedding` | `platform/runtimes/embedding` with its contract and client | GPU image, OpenShell workload definitions |
| `veoveo-runtime-simulation` | `platform/runtimes/simulation` without its contract | GPU image |
| `veoveo-mcp-time` | `servers/time-mcp` | contract crate, image, OpenShell workload definitions |
| `veoveo-mcp-artifact` | `servers/artifact-mcp` and the Artifact contract from `platform/artifacts/contract`; the HTTP service in `platform/artifacts/service` is retired | contract feature, image, OpenShell workload definitions |
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
| `veoveo-mcp-datasheet` | the deployed Datasheet server, separated from the Python template | Python image, OpenShell workload definitions |
| `veoveo-mcp-bridges` | `mcp/bridges/{stdio,legacy}`; Rerun is a configured legacy bridge | images, OpenShell workload definitions |
| `veoveo-app-console` | `apps/console` web and BFF, `tools/vendor-three` | image, OpenShell workload definitions |
| `veoveo-app-workspace` | `apps/workspace` and the Workspace services in `platform/workspace` | image, OpenShell workload definitions |
| `veoveo-website` | `apps/website` | site |
| `veoveo-sdk-python` | `sdk/python` | PyPI package |
| `veoveo-sdk-typescript` | the generated client bundles used by Console and MCP Apps, and the MCP Apps browser runtime from `mcp/apps-extension/browser` with its tests | npm package |
| `veoveo-template-mcp-rust` | `templates/rust-mcp` | template repository |
| `veoveo-template-mcp-python` | `templates/python-mcp` | template repository |
| `veoveo-template-installation` | new; renamed from `veoveo-deploy` | template repository whose defaults run a local installation: Compose file for PostgreSQL, SeaweedFS, the Envoy edge, Lore and the environments, installation configuration, roles and grants, and component lock |
| `veoveo-docs` | repository-wide documents in `docs/`, `tools/screenshots` | documentation site |
| `veoveo-showcase-uav` | `showcase/uav-sim`, `servers/uav-sim-mcp` | images, OpenShell workload definitions |
| `veoveo-showcase-sumo` | `showcase/sumo` | images, OpenShell workload definitions |
| `veoveo-qualify-openshell` | the OpenShell spike probes and policies | archived with D40 |
| `.github` | new | organization profile and reusable workflows |

The catalog lists 37 repositories; a separate factory service is no longer required.
Runtime outputs in this catalog are migration targets, not claims that the repositories
already publish native OpenShell definitions. Each installation adds one public
repository in its owner's organization. The reference is `BiomaAI/veoveo-bioma`,
built from `examples/bioma`.

### Core Contents

`veoveo-core` keeps its protocol-independent crates, with every MCP, Hub and domain
item removed:

| Crate | Keeps |
|---|---|
| `veoveo-types`, `veoveo-macros` | IDs, names, resource addresses and vocabularies, without MCP tool, prompt and Task route names, Hub profile and authentication types, agent IDs or Artifact access rules |
| `veoveo-http`, `veoveo-oauth` | Request body admission and RS256 client assertions |
| `veoveo-store` | The `kernel`, `identity`, `tasks` and `audit` schemas, process instances, change notification and paging |
| `veoveo-task-contract`, `veoveo-task` | Durable Tasks with claims, recovery and subscriptions; durable steps arrive with M4 |
| `veoveo-audit-contract`, `veoveo-audit` | The record envelope, append, sealing and export. Each owner declares its audit classes and details when it registers |
| `veoveo-installation-contract` | The component lock |
| `veoveo-fixtures` | The PostgreSQL fixture and the database checks |

Everything else leaves core:

| Today in core | Moves to |
|---|---|
| `veoveo-mcp-contract` hosting, protocol, transport, subscriptions, docs resources and forwarded identity; `veoveo-mcp-ext-registration`; `veoveo-mcp-ext-apps`; `veoveo-mcp-conformance`; `veoveo-modular-fixture-mcp`; the Task runtime's MCP adapter; the tool-input fixtures; the MCP audit details for discovery and tool admission and completion | `veoveo-hub-sdk` |
| `veoveo-policy`; `veoveo-gateway-contract`; the control plane, OAuth, profile and policy types in `veoveo-mcp-contract`; the store's Hub module; the `hub` schema with its Task routes; the Hub's audit details for registration, administration, profiles and clients | `veoveo-hub` (D30) |
| `veoveo-artifact-contract` | `veoveo-mcp-artifact`'s `contract` feature, trimmed to signed transfers |
| `veoveo-artifact-client`, the upload grant in internal authentication, the Artifact service trait and access module, the Artifact policy targets, Hub actions and profile section, `gateway.artifact_upload_authority` with its two digest functions, and the Artifact audit vocabulary | Deleted with the old byte path |
| `veoveo-knowledge-contract`, `veoveo-embedding-contract`, `veoveo-mcp-ext-knowledge`, the Knowledge audit details and the `audit.indexing_*` objects | Deleted. Knowledge and Embedding bring their own when they are ported, and Time and the Hub drop their Knowledge source declarations until then |
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
| Runtime definition | shared Helm templates and current Compose configuration | native OpenShell workload/template, policy/provider references and service exposure; no per-component chart requirement |
| Catalog declaration | the server's entry written by hand in the installation's `hub.json` | declared by the running server when it [registers](#server-registration) |
| Permissions and roles | per-profile scopes and the rule list in `hub.json` | declared by the running server through `ai.veoveo/authorization` |
| Module schema | owned per module, compiled into the Hub's module registry | submitted by the running server through `ai.veoveo/module` |

Registration lets an installation add a server by deploying it. Today every server
change requires an edit to the installation's central Hub configuration, which
declares all 19 servers in `examples/bioma/hub.json`.

### Installation Composition

An installation repository contains:

- installation configuration: domain, identity providers, tenants, work contexts, OAuth clients, role bindings and Cedar policies;
- namespace bindings that say which server identities may register which namespaces;
- a component lock with exact source revision, image digest and native OpenShell workload/template, policy and binding provenance;
- Lore environment definitions mapped to admitted OpenShell resources through the native SDK;
- installed acceptance for that installation.

The Hub catalog is the installation configuration plus the current
registrations. Catalog publication Jobs, module plan and migration Jobs and the
Hub's compiled module registry are retired.

### Compatibility

Each component declares the `veoveo-core` range and Hub protocol versions it
supports. Installation validation rejects a lock that combines incompatible
versions. A breaking `veoveo-core` change follows the versioned adapter and support
window rules in [`CONTRACT_EVOLUTION.md`](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/docs/CONTRACT_EVOLUTION.md).

### Layers

```text
installation     composes released components
app              depends on its language's sdk and reaches servers through the Hub
mcp              depends on veoveo-hub-sdk and on other servers' contract features
service          depends on veoveo-hub-sdk or veoveo-core
runtime          depends on veoveo-core
veoveo-hub-sdk  depends on veoveo-core and rmcp
veoveo-core      depends on third-party crates only
```

## Server Registration

The Hub contains no server-specific code. Its application catalog is populated
through registration. The installation separately configures approved logical
endpoint bindings to native workspace, sandbox and port coordinates; these authorize
transport placement without replacing service registration.

### Registration

Each installation has one registration secret. The native OpenShell provider owns
its custody and binds it only to the initial `POST /oauth/register` at the approved
Hub origin. The Time sandbox receives an opaque reference. Subsequent registration
management uses the SDK's existing service credentials. This supersedes the D42
Envoy injection path.

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
the Hub's RFC 7591 registration endpoint. The installation's registration secret is
the RFC 7591 initial access token, and the key travels as the `jwks` client metadata.
Its three declarations, whose types live in `veoveo-hub-sdk`, travel as client metadata:

| Extension | Declares |
|---|---|
| `ai.veoveo/registration` | slug, URI scheme, server version and endpoint |
| `ai.veoveo/authorization` | permissions, the permission each tool, resource template and prompt requires, and the permissions the server uses on other servers |
| `ai.veoveo/module` | the module manifest: ownership claims, requirements, SQL API, observation tables and migrations |

The registration response returns the client identifier, the RFC 7592 registration
access token, the server's database credentials and the keys that sign forwarded
identities. `veoveo-hub-sdk` holds the normative protocol document and a registration
client that every server uses.

The server advertises the same declarations under `extensions` in its MCP discovery
result, so they have one source. Tools, resources and prompts are not declared twice:
the Hub reads them through MCP discovery, as it does today.

The first registration of a namespace claims it. The Hub pins the server's public
key to its slug, URI scheme, database schema and permission prefix, such as `time`,
`time://`, the schema `time` and `time.*`. Later registrations of that namespace, including new
versions, must be signed by the pinned key, and a claim by another key is rejected.
Releasing a namespace is an explicit administrative action. A declaration outside the
pinned namespace is rejected with the exact reason.

The Hub gives each registration its own PostgreSQL login, a member of the
server's group role, which owns the server's schema. The server applies its own
migrations in that schema at startup. PostgreSQL grants and row-level security confine
a server to its schema and to its own rows in shared kernel tables, and a server never
holds administrator credentials.

A registration has no lease and the server renews nothing. The Hub keeps a
registration while the server's login holds a live kernel instance, a session advisory
lock on the server's database connection, and removes the registration and its login
after a 60-second grace period otherwise. Every Hub replica follows registrations
through PostgreSQL notifications and builds a new immutable catalog snapshot on each
change, and requests in flight finish on the snapshot they started with. A removed
server leaves routing, and its Tasks stay bound to the version that created them.
Every registration, claim and expiry enters the audit chain.

Several versions of one server may register at the same time, and a builder's session
selects among them as described in [Session Version Selection](#session-version-selection).
A server first registers a reachable address. A later step lets a server dial in over
an authenticated connection and receive MCP requests on it, so a build on a laptop or
in a factory sandbox joins a shared Hub without inbound networking.

Destructive schema changes run as expand and contract. A version adds the new shape
first. The contract step runs only when no registered version declares reads of the
removed shape, and a snapshot precedes the drop.

Artifact storage belongs to the Artifact server, which registers like any other server.
Clients move bytes directly to and from object storage through URLs the Artifact server
signs, and the Hub has no byte routes.

## Authorization Model

A server declares permissions. The installation declares roles and grants. The
Hub evaluates them, and the server checks the result again.

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

For each request the Hub resolves the caller's roles from grants, selects the
permissions those roles allow and checks the permission that the target tool, resource
template or prompt requires. Anything the server did not declare is denied. The signed
identity the Hub forwards carries only the granted permissions in the target
server's namespace, together with the caller's tenant, Work Context and membership.
The server checks the permission again through its typed enum.

Per-object rules, such as Time's owner-only events, stay with the server. The resource
type on each permission lets shared relationship checks, such as Work Context membership
and Artifact sharing, attach later in the style of Google Zanzibar without changing the
server declaration. Cedar conditions, custom roles, bindings scoped to a Work Context
or a single resource and token-exchange delegation extend the evaluation in the
Hub; none of them changes what a server declares.

### Calls Between Servers

A server that uses another server declares the permissions it uses in
`ai.veoveo/authorization`. Media, for example, declares `artifact.artifacts.read` and
`artifact.artifacts.write`. When no registered server provides a declared permission,
the Hub refuses the call with a message that names the missing permission.

The calling server reaches the other server through the Hub with a token from RFC
8693 token exchange. The token names the original caller and an `act` chain of the
calling server and the Hub, and it carries only the declared permissions that the
caller holds. The target server authorizes the call as it would any other, and it
records the acting server as provenance. A Task keeps its delegation while it is live,
so work that finishes after the request returned, such as Media storing a provider's
output from its webhook, still acts for the Task's caller.

`veoveo-hub-sdk` gives each handler and Task a client, `ctx.client()`, that performs the
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

Time's administration is a set of MCP tools, so the Hub authorizes it like any
other call. Acquisition is a job tool with its own idempotency key, phases and
cancellation, and releases, calendars, epochs and the clock policy are read through
resources.

## Component Environments

The authoring containers are called **factory sandboxes**, distinct from deployed
service environments such as dev, staging and stable. Each component repository
defines its source, toolchain, gates, acceptance tests and coding-agent image. The
current installation runs one authoring container per component, with a restricted
identity. It builds and tests the component, and the agent inside fixes what fails.
The [infrastructure candidate](INFRASTRUCTURE_CANDIDATE.md#factory-sandboxes-and-service-deployments)
allocates factory sandboxes per active workspace or isolated job, with additional
authorized repositories when a change spans components. Runtime service deployments
remain separate from these authoring workspaces.

### Image Stages

Each repository has one Dockerfile. Its `dev` stage supplies the component toolchain;
the shared factory layer uses it as `BASE` in a native OpenShell sandbox. Use native
OpenShell exec/attach for that workload. The earlier Compose attachment described by
D40 is superseded by the [current execution plan](OPENSHELL_HARDCUT_PLAN.md#subsequent-adoption).

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
`rustfmt.toml`, `clippy.toml`, `deny.toml` and nextest profiles.
`veoveo-template-mcp-rust` provides the starting copy of these files, and a new
repository owns them after it is created. Images and toolchains may differ between
repositories, because components interact only through contracts. A crate that other
repositories compile declares its minimum toolchain with `rust-version`, so an older
toolchain fails at once with a clear message. Each repository keeps its own pins
current as ordinary maintenance.

Every build runs in a Linux container. That removes the macOS failures of the current
repository: `veoveo-testing-support` uses Linux-only process calls, and macOS lacks
the `leap-seconds.list` that Debian's `tzdata` package provides. Images set their
environment variables in `/etc/profile.d` as well as in `ENV`, because login shells
reset `PATH`.

An environment is a working development machine. The sandbox user owns the Rust
toolchain and Cargo home, and the installation's edge lets the environment reach
`static.rust-lang.org`, `index.crates.io`, `static.crates.io`, `crates.io`,
`github.com` and `api.github.com` through its HTTPS proxy. Developers and agents
install toolchains, components, targets and crates as they need them, and the image
only pre-seeds its pinned toolchain so the first start is fast. The environment holds
no GitHub credential. Its source lives in the installation's Lore repository for its
component (D41).

### Environment Loop

```text
pull -> build -> check -> run -> register with the Hub -> verify through the Hub
  ^                                                                  |
  +------- on failure the agent inside diagnoses, fixes, commits <---+
```

An environment verifies its component the way a real client uses it. Time's
environment calls Time's tools and runs a Task and a subscription through the
Hub. The Hub's environment registers the Observatory test server from
`veoveo-hub-sdk-fixture` as its test peer. Acceptance tests live in the component's repository
and run inside its environment.

The Hub returns the exact reason for a rejected registration or migration to the
server that attempted it. An environment's identity can read its own namespace's
logs, health and audit records. An agent that finds a fault in another component
files an issue on that component's `VeoveoAI` repository, and that component's
environment takes it up. The factory MCP server replaces the issue channel once it
exists.

### Environment Runtime

**Historical Compose baseline (D40–D44), superseded by D52–D55.** The runtime,
credential issuer, broker and Envoy paths below record the earlier split design.
Use the native placement and ordered remaining gates in
[the execution checklist](OPENSHELL_HARDCUT_PLAN.md#subsequent-adoption) for current
work; these paragraphs are not native installation instructions.

That earlier local installation ran on Docker Compose (D40, revised by D44). Trusted runtime
containers keep approved source snapshots and service state, with no Lore client or
credential mounts. Separate `vv-dev-*` containers hold source, test fixtures and caches;
OpenCode v2 is their preconfigured coding agent and starts only when invoked. Both
profiles use non-root users, drop all capabilities and enable `no-new-privileges`.
Each dev has its own internal network and reaches Lore, DeepInfra inference and
allowlisted dependency downloads only through Envoy.

PostgreSQL, SeaweedFS and Lore share that network, which no route leaves. The Envoy edge
is the environments' only other path (D42): it publishes the Hub and the servers on
the host's loopback interface, serves an HTTPS proxy to the hosts environments fetch
from, adds the registration secret to `POST /oauth/register`, and adds the media
provider's key on a network only Media's environment joins. Secrets an environment
uses this way never enter it. A component that signs with a secret itself, such as
Artifact with the object store's credential, receives that secret as an owner-only
file.

Lore builds directly from unmodified upstream `EpicGames/lore` v0.10.1 (D44).
The Hub issues repository-scoped tokens; a trusted refresher writes only Envoy
SDS responses. The proxy selects credentials from each listener's private network
and actual TCP peer. Clients never read a token. The isolated reviewer has a separate
admin listener and never runs repository code. QUIC and the setgid token loader are
not used; all Lore client operations go through `grpcs://lore-proxy.internal:7443`.
The earlier macOS qualification on October 14 showed:

- the Hub, Time, Artifact and Media register through the edge and pass their
  acceptance tests, Artifact's gibibyte upload and share route included;
- each environment clones its own repository and gets "Not found" for another, a push
  to protected `main` is refused, a branch push and the admin's merge succeed;
- no environment can read its Lore token, the registration secret or the provider key,
  and the egress proxy refuses every host outside its allowlist.

An MCP server needs no inbound path beyond the edge's published port, and the Hub
reaches servers on the internal network. A coding agent in an environment that
sandboxes its own commands with `no-new-privileges` keeps `lore` outside that sandbox.

### Boundaries

Environments follow the author-sandbox rules in
[`FACTORY_ISOLATION.md`](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/docs/FACTORY_ISOLATION.md). No Docker or Podman socket,
kubeconfig, registry credential or signing key enters an environment. Images are built
outside the environment, by the operator now and by the factory's build broker later.
An environment pushes branches to its component's Lore repository, and the
installation's Lore admin, a Lore service account, merges into the protected `main`
(D41). Nothing in Lore returns to GitHub; a component update arrives as a snapshot
commit on `main`. The factory's source broker takes over the admin's merges once it
exists, because `FACTORY_ISOLATION.md` keeps push authority with brokers.

An environment on one machine reaches a Hub on another by dialing in, so the
dial-in connection (A7) comes before environments span machines.

On macOS the environments run as `linux/arm64`, and on the Linux host as
`linux/amd64`. Each machine builds natively. Build output and the Cargo cache live
under `/sandbox`. GPU environments use the NVIDIA Container Toolkit on the Linux host,
taken up with the GPU components. A change that spans repositories clones the sibling
repository into `/sandbox` and points a `[patch]` in an uncommitted
`.cargo/config.toml` at that clone.

### Tooling

No repository uses a task runner or shell scripts that hold test logic. Behavior
lives in Rust tests or in each tool's own configuration, and Cargo aliases provide
short commands.

| Need | Tool |
|---|---|
| Test execution, timeouts, process-group cleanup and machine-readable results | cargo-nextest with per-repository profiles |
| Code rules | `[workspace.lints]`, `clippy.toml` and rustfmt |
| Dependencies | cargo-deny for licenses, advisories, bans and sources limited to crates.io, `github.com/VeoveoAI` and explicitly approved revision-pinned upstream Lore/OpenShell client dependencies (D54) |
| Feature isolation | cargo-hack, proving that each `contract` feature builds alone, and `cargo tree`, proving that it pulls in no server runtime dependency |
| Public API | cargo-semver-checks for `veoveo-core` and `veoveo-hub-sdk` against their previous tags |
| Wire formats and schemas | insta snapshots |
| Parsers, IDs and URIs | proptest |
| Store tests | a private PostgreSQL 18 cluster per test process from the PGDG packages in the `dev` image, with a fresh database cloned from a migrated template for each test |
| Launching | Docker Compose is the recorded baseline; the target is OpenShell's native Docker driver on Mac/Linux (D54), pending qualification and migration |
| Deployment gates | Native OpenShell schema/admission and policy checks, verified revision/artifact provenance, and Veoveo application readiness; no chart or cluster validation toolchain |

## First Slice

The first slice is the smallest installation that represents Veoveo end to end. This
section records the slice as it ran on OpenShell before D40;
[Environment Runtime](#environment-runtime) describes the installation now.

| Component | Runs as |
|---|---|
| OpenShell gateway 0.1.3 | the official package, outside the sandboxes |
| PostgreSQL 18.6 | the official image, outside the sandboxes, with a non-superuser installation owner |
| Hub environment | an OpenShell sandbox from `veoveo-hub` |
| Time environment | an OpenShell sandbox from `veoveo-mcp-time` |

`veoveo-template-installation` provides the local installation. It holds the Compose file for PostgreSQL and SeaweedFS,
the installation configuration, the namespace bindings and a component lock that names
each component's Git revision. Each component repository describes its own launch:
its policy, providers, GPU use and exposure under `openshell/`. Installation
configuration uses the same core contract that production installation repositories
use. The Hub environment fetches its installation repository and applies its bindings at first
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
the Hub's compiled optional-module registry and server-specific integrations,
and every core crate the slice does not use.

## Bootstrap

Bootstrap created the first repositories by hand and handed them to their environments
as soon as the environments could work. This record predates D40.

| Step | Work | Done when |
|---|---|---|
| 1 | Hosts: Docker Desktop 4.94 or newer with host networking on macOS, Docker on Linux, OpenShell 0.1.3 with telemetry off on both, the `VeoveoAI` organization | Done on October 11, except a persistent macOS telemetry setting |
| 2 | Apache-2.0 (D14) | Every first commit carries `LICENSE` and Cargo `license = "Apache-2.0"` metadata |
| 3 | `veoveo-qualify-openshell` from the spike, with its probes turned into Rust scenarios | The suite reproduces the October 11 results on both hosts |
| 4 | `veoveo-template-mcp-rust`: the starting Dockerfile stages, `/etc/profile.d` variables, `rust-toolchain.toml`, `rustfmt.toml`, `clippy.toml`, `deny.toml`, nextest profiles and an OpenShell policy that allows rustup, crates.io, GitHub fetches and model providers | An environment created from the template builds and checks a crate on both hosts |
| 5 | Qualify Git push through a GitHub provider (T4) and Claude Code with an API-key provider (T5) | Push succeeds for the environment's own repository only, and the agent completes an edit |
| 6 | Skeletons for `veoveo-core`, `veoveo-mcp-time`, `veoveo-hub` and `veoveo-template-installation`: README, AGENTS.md, LICENSE, workspace manifest with lint tables, toolchain pin, Dockerfile stages and `openshell/policy.yaml` | `docker build --target check` passes and each environment starts on both hosts |
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

The leading model is now [personal overrides of a shared environment](INFRASTRUCTURE_CANDIDATE.md#personal-overrides-and-hub-routing).
A workspace selects any authorized configured environment and explicitly replaces
individual service deployments. Names do not determine policy or a fixed promotion
sequence; Lore configuration defines optional inheritance, bindings and lifecycle.
Unchanged services come from that base; other people's previews do not enter the
selection automatically. This refines the earlier
single selection per login session so one user can run multiple experiments.

The gateway validates the context and preserves it through discovery, calls,
delegation and Tasks. A selected deployment that fails does not silently fall back.
Long-lived Tasks remain associated with the deployment version that created them.
Selection never widens permissions. The current newest-registration-per-slug routing
does not implement this model.

Data bindings are explicit and separate from version selection. Preview-owned state
is disposable or retained according to policy; use of shared live data requires an
authorized binding. This replaces live data as an automatic assumption of a preview.
The [candidate](INFRASTRUCTURE_CANDIDATE.md#data-and-infrastructure-bindings) describes
the constraints imposed by shared services, core state and object metadata.

### Factory

The older [factory design](https://github.com/BiomaAI/veoveo/blob/0c33cf8a7e5a1d46f953702553ac6643f99c1363/docs/FACTORY_ISOLATION.md)
is superseded where it proposes runtime control planes, brokers, consoles or
supervisors that OpenShell already supplies. There is no required standalone
`veoveo-service-factory` in the candidate. Use the native SDK/CLI/TUI, workspace
access, templates, providers, policies/advisor/prover, execution, service exposure,
restart handling and observation APIs.

The [remaining integration](LORE_OPENSHELL_INTEGRATION.md#native-responsibilities)
binds Lore repository/branch/revision authority to native resources, runs existing
component checks in fresh workers, records immutable verdict/artifact provenance,
and updates authorized environment selection. Keep it in an existing trusted
process unless a concrete need justifies a separate service. Hooks only trigger
bounded checks or reconciliation; they never run untrusted build scripts in Lore.

Use native OpenShell membership for runtime access and Lore grants for source.
Veoveo retains product-specific permission to promote a revision, select a
composition or bind application data. It does not recreate native workspace roles,
policy approvals, credentials or process lifecycle under factory-specific APIs.
Fresh verification and trusted artifact publication stay separate from the author.
Application checks and Task drain govern version selection; OpenShell owns runtime
restarts. Do not add a custom watchdog or Flux reconciliation loop for that job.

The [identity and MCP boundary](LORE_OPENSHELL_INTEGRATION.md#identity-and-mcp-enforcement)
delegates factory login and outbound tool limits to OpenShell, and ordinary user
OAuth/refresh to the configured provider after qualification. Veoveo keeps
application/data permissions, version routing and constrained Task/server delegation.
All environment names and promotion destinations remain configuration.

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
- [ ] D7. Map Lore source/promotion authority to native OpenShell workspace and provider access. Retain only application-specific grants; the old factory broker/role plan is superseded by D52.
- [x] D8. Authorization uses permissions, roles and bindings, relationship-based sharing, Cedar conditions, coarse OAuth scopes and narrowed delegation, declared by servers through `ai.veoveo/authorization`. No change waits for a person.
- [x] D9. New repositories are pushed to `VeoveoAI` as work lands, and the Linux host verifies each step from a fresh `git pull`.
- [x] D10. No task runner. Tools keep their own configuration, Cargo aliases provide short commands and test logic lives in Rust.
- [x] D11. Each environment builds, verifies and repairs its own component. Outside an environment, people and tools only launch environments and perform the bootstrap step.
- [x] D12. OpenShell 0.1.3 is the environment runtime on macOS and Linux, with telemetry disabled. Replaced by D40.
- [x] D13. MCP servers dial out to the Veoveo Hub. Native gRPC endpoints use dial-in or port forwarding, never service exposure.
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
- [x] D24. `veoveo-core` holds no MCP and no server or domain vocabulary, audit included. The Rust MCP layer moves to `veoveo-hub-sdk`, and Knowledge and Embedding leave core with Artifact. Decided on October 12.
- [x] D25. A server that uses another server declares the permissions it uses at registration and calls through the Hub with an RFC 8693 token narrowed to the declared permissions the caller holds. Typed consumers depend on the provider's `contract` feature by Git revision. Decided on October 12.
- [x] D26. The rmcp fork `VeoveoAI/rust-sdk` at `917e791` stays as it is. It is rmcp 3.5.0 plus Task status subscriptions, a typed HTTP rejection and a quieter drain log, and upstream 3.5.1 has none of the three. `veoveo-hub-sdk` records that reason beside its pin. Decided on October 12.
- [ ] D27. Whether a model without a sandbox may write a small artifact inline through a `write_artifact` tool, and the size limit. Programs and sandboxed agents upload through signed URLs. Taken up with the agents (E4), when an agent and a chat client exist to qualify it; nothing before them needs it.
- [x] D28. An owner declares each audit detail as a JSON Schema at registration, and the audit writer checks details against it. Decided on October 12.
- [ ] D29. The repository names of Knowledge, Recording, Computers and Agents, each of which contains an MCP server. Taken up with their extraction (E4).
- [x] D30. The Hub's schema, migrations, policy evaluator and contract move into `veoveo-hub`, since only the Hub uses them. Decided on October 12.
- [x] D31. The kernel migrations change in place for the core cut, and every local installation resets, because no installation has a release to preserve. Decided on October 12.
- [x] D32. Clients reach RustFS directly at one address the installation configures. Artifact records each authorization, and an installation that must prove each transfer adds RustFS's audit feed. Release states are private and released. The Artifact server owns each tenant's upload limits. RustFS is accepted while it stays private behind the server's credential, current, and used only through standard S3 calls. Decided on October 12.
- [x] D33. `veoveo-hub-sdk` has one library crate, `veoveo-hub-sdk`, that absorbs the hosted server contract, hosting, the client, registration, MCP Apps and the Task adapter behind `contract`, `client` and `server` features. The conformance CLI `veoveo-hub-sdk-conformance` and the test server `veoveo-hub-sdk-fixture` are separate crates because they are binaries. Decided on October 12.
- [x] D34. Outside results are operations on a Task in core's Task runtime: a waiting Task holds no worker, a webhook or a declared status check wakes it, the first final result wins, and a restart leaves it waiting. Each server writes only its provider's calls and event parser. Decided on October 13.
- [x] D35. Cost and usage records live in a `usage` ledger in core, separate from audit, shaped by FOCUS 1.4 with ISO 4217 currencies. Servers declare their usage kinds under their own prefix, an estimate is a reservation that a later budget can refuse, each Task carries its totals and the Hub serves totals across servers. Spending limits follow the Media port. Decided on October 13.
- [x] D36. Core's audit record is the minimal envelope NIST SP 800-53 Rev. 5 AU-3 asks for, mapped to OCSF 1.9: source from the writer's login, an owner-declared class with its OCSF class, a four-value outcome, an owner-defined reason, actor, acting server and Task, target URI, request and details of at most 16 KiB. The writer checks details against the owner's schema; core keeps the hash chain, sealing and export. This revises D28's write-time check. Decided on October 13.
- [x] D37. Revoking a caller's session for a replayed refresh token ends the delegation of that caller's running Tasks; a logout does not. Decided on October 13.
- [x] D38. An installation keeps one PostgreSQL database, and server logins keep their row-filtered table access to core's schemas, so core and the Hub can still join across servers' data. Server code reaches core state only through the SDK and core's runtime API: a server's SQL names only its own schema, and each server's tests run the SDK's confinement check. When the API lacks something a server needs, core or the SDK gains it as a general feature. Decided on October 14.
- [x] D39. SeaweedFS replaces RustFS as the installation's object store, revising the store D32 accepted: SeaweedFS 4.48, unmodified and pinned by digest, in its `weed mini` mode for the local installation, on the same loopback port and credential. Artifact's object-storage tests pass against it unchanged, including size and SHA-256 checks while it writes, create-only multipart completion, attachment downloads with ranges, CORS and the lifecycle rule for abandoned uploads. Clients still reach the store directly at the one address the installation configures, and an installation that must prove each transfer adds SeaweedFS's S3 audit log. Decided on October 14.
- [x] D40. Plain Docker replaces OpenShell as the environment runtime, replacing D12, so environments can use transports OpenShell's proxy does not carry, such as Lore's QUIC. An environment is a Compose service built from its component's `dev` image and an installation layer. It runs as its non-root user with every capability dropped, on an internal network, and reaches anything else only through the installation's Envoy edge (D42). Environments run without `no-new-privileges` so the setgid Lore client can read its token, and their images carry no other setuid or setgid program. Decided on October 14; the privilege and transport choices are superseded by D44.
- [x] D41. Lore is the version control environments use inside an installation. The installation builds the Lore server and client from `VeoveoAI/lore`, which is Lore v0.10.1 with two patches: the client presents its token on QUIC sessions when the server has no separate auth service, and a client installed setgid reads an installation token the agent cannot read and sends it only to the installation's Lore server. Lore otherwise runs as Epic ships it, storing on disk. A component's Lore repository starts from a snapshot of its locked GitHub revision, and later revisions arrive as snapshot commits on `main`; nothing returns to GitHub. Agents push branches, and the installation's admin client merges into the protected `main`. Decided on October 14; the fork and credential mechanism are superseded by D44.
- [x] D42. One Envoy edge per installation is the only path into and out of environments. It publishes the environments' ports on the host's loopback interface, serves environments an HTTPS proxy that opens tunnels only to the hosts they fetch from, and adds each secret on its own route under an `.internal` name: the registration secret on `POST /oauth/register` at the Hub's name, and the media provider key at the provider's. A secret's route admits only the network of the environments entitled to it, and the edge terminates TLS for those routes with a certificate from the installation's CA. Decided on October 14.
- [x] D43. **Historical; Lore issuance/refresh superseded by D55 and the native hard cut.** The Hub issues Lore tokens. Lore is a protected resource in the installation configuration, with grants per client: repository IDs or `*`, Lore actions and the service-account flag. A client-credentials request for that resource returns an RFC 9068 access token whose `lore_resources` claim carries the grants, and stock Lore enforces them. An installation service refreshes each environment's token file before the token expires; it holds the environments' client keys, so no environment does. Decided on October 14.

- [x] D44. Remove all legacy Lore authentication paths. Build the client and server directly from upstream EpicGames/lore v0.10.1, commit `95a9a834`, with no source patches. Lore clients run only in isolated development/review containers and use Envoy-authenticated gRPC; disable QUIC. Replace setgid loaders and raw token volumes with trusted Envoy SDS storage. Runtime containers contain no Lore client, keep approved snapshots and service state, and enable `no-new-privileges`. OpenCode v2.0.29 is installed in every dev, using DeepInfra MiMo through Envoy; no agent starts automatically. Supersedes the fork and privilege exceptions in D40/D41 and the client token files in D43. Decided on October 15.

- [x] D45. **Withdrawn on October 17 by D55; retained as decision history.** Use official Lore Desktop as a live acceptance client that puts pressure on Veoveo's design. A human adds one remote, authenticates once, discovers authorized repositories and browses current branches, revision graphs and diffs, with session renewal and reconnect handled by the integration. Local checkout exports, snapshots and manual token copying do not satisfy this requirement. The host's human client is an explicit extension to D44's container-only client placement; its identity and permissions remain separate from development agents and the administrative reviewer. Preserve upstream Lore and the Envoy boundary. Decide completeness from the actual Desktop experience, not from a successful CLI probe. Decided on October 15.
- [x] D46. Identity is an installation choice: the macOS development installation runs permanent Keycloak, the remote Linux reference at `veoveo.bioma.ai` will use Microsoft Entra ID, and customers configure their own OIDC provider, optionally retaining bundled Keycloak. Generic deployment and runtime authentication must not require Keycloak administration or detect providers by name. Keycloak state has its own operator-owned PostgreSQL volume, separate from disposable component state; the installation CA and credentials also survive component resets. Provider credentials belong only to trusted services. Envoy remains the network boundary, and human sign-in does not give development agents credentials or repository administration. Decided on October 15; live reference Entra qualification remains L10.
- [x] D47. Record [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md) as the leading infrastructure direction on October 16: Lore-managed environment configuration, shared environments with personal service overrides, Kubernetes/Helm/Flux orchestration, OpenShell sandbox qualification, Envoy credential protection and a shared development-secret service (withdrawn by D53). Acceptance is of the candidate for further design and qualification, not a completed migration; D40/D44 remain the recorded runtime baseline.
- [x] D48. Lean on OpenShell as the factory foundation and integrate it deeply with Lore through native SDKs, templates, workspace access, providers, governance extensions, Lore hooks and reconciliation. Maintained VeoveoAI forks of Lore and OpenShell are permitted when a verified gap requires a patch, respecting their extension, security and design contracts. This supersedes an unconditional no-source-patches constraint for future integration builds; D44's protected credentials and privilege restrictions remain. The first qualification is normal Lore operations in an OpenShell sandbox, including branch/repository confinement, credential custody, renewal and reconnect. Source inspection found an HTTP/2 inspection gap and no general external UDP mediation in OpenShell v0.1.4; optional Lore QUIC must preserve credentials and policy and show measured value. Accepted on October 16; [the integration design](LORE_OPENSHELL_INTEGRATION.md) records the source evidence, boundaries and gates. No fork or runtime migration is claimed.
- [x] D49. Use one MCP service hosting path for personal previews, shared dev, staging and stable: each component's runtime image and Helm chart, reconciled by Flux on Kubernetes. OpenShell owns author/build/check factory execution, with its Kubernetes backend on k3d for Mac and K3s for Linux. Remove native OpenShell preview hosting from the candidate rather than maintain a second launcher, ingress path and lifecycle implementation. Apply the same service packaging and runtime contracts across environments, changing ownership, revisions, bindings and gateway selection. Accepted on October 16; migration remains pending. Superseded by D52: one native OpenShell service execution path replaces this Helm/Flux split.
- [x] D50. Environment names are arbitrary labels, with no built-in preview/dev/stage/release categories or promotion ordering. Lore stores one small composition schema with optional authorized base inheritance, explicit pin/follow selection, component revisions, approved bindings and lifecycle/retention policy. Stable controller identities and immutable resolved compositions govern ownership and routing; branch names do not grant authority. Admission policy lives outside author-controlled configuration. This refines D47/D49's illustrative environment names, not their single deployment path. Accepted on October 16; schema implementation and routing remain pending.
- [x] D51. Reduce Veoveo identity scope: use the configured OAuth/OIDC provider for standard user login, grants, refresh and identity sessions; use native OpenShell OIDC/workspace authorization for factories and native MCP egress policy for agent method/tool limits. OpenShell is an OIDC consumer, not the general MCP authorization server. Veoveo retains application permissions, context routing, short-lived narrowed delegation and Task authority. Qualify issuer token formats, MCP clients, revocation and Task compromise semantics before removing hosted login/refresh routes and storage; no permanent parallel legacy mode. Explicitly qualify MCP `2026-07-28` with native OpenShell policy and rejection diagnostics. Accepted design direction on October 16, not a completed authentication migration.

- [x] D52. OpenShell owns all capabilities it already provides, for factory work and deployed services. Use native templates/specs, long-running service execution and authenticated native forwarding, main-process restarts, workspace access, policy advisor/prover, providers/credential drivers, sessions and diagnostics. Remove Flux, per-component Helm deployment and the mandatory Kubernetes/k3d/K3s layer. The first single-host candidate uses OpenShell's Docker driver on Mac/Linux with native NVIDIA CDI on Linux; the originally optional Kubernetes backend is withdrawn by D54. Generic execution gaps belong in supported OpenShell extensions or a narrow upstreamable fork before adding Veoveo/external machinery. Keep only source-to-runtime integration and application-specific authority/routing/Tasks in Veoveo; a standalone factory service is not required. Accepted on October 16; supersedes the hosting portions of D47–D49, with qualification and runtime migration pending.
- [x] D53. Remove OpenBao entirely from the active candidate and qualification sequence. Use OpenShell's native provider/credential-driver capabilities for runtime custody. Shared human `.env` distribution is outside the focused plan. Accepted on October 16; no runtime change is implied.
- [x] D54. Remove Kubernetes, k3d, K3s, Helm and Flux completely from the candidate, including optional installation paths. Select OpenShell's native Docker driver on both Mac and Linux, using native NVIDIA CDI for Linux CUDA. No alternate backend menu or cluster orchestration is in scope. Use the official source-pinned OpenShell Rust SDK and version-pinned Lore Rust client interfaces across authenticated service boundaries; keep source-to-runtime integration in an existing trusted process. This withdraws D52's optional Kubernetes clause and the earlier cluster direction, without changing the single workload path or data-driven environments. Accepted on October 16; runtime qualification and migration remain pending. See [Rust interfaces and component flow](LORE_OPENSHELL_INTEGRATION.md#rust-interfaces-and-component-flow).

- [x] D55. Withdraw official Lore Desktop as a product/acceptance requirement and retire its authentication adapter after the direct factory path qualifies. The configured IdP issues ordinary native Lore repository grants; OpenShell owns client-secret custody, OAuth client-credentials renewal and injection; Lore validates issuer/audience/expiry and repository authority. Keep the existing small BranchPush assignment hook and native branch protection. No new Veoveo machine-token endpoint, signer, refresh worker or Lore authorization/transport patch. Desktop graph/diff and automatic sign-in recovery are withdrawn, not passed. This supersedes D45/L8, the old Lore issuer/worker portions of D43, and any component instruction making Desktop completion a blocker. Accepted October 17; [the direct credential plan](LORE_DIRECT_OIDC_PLAN.md) defines configuration, cutover, proof and retirement. The local direct-IdP path, native renewal/reconnect, withdrawal, applied detach, termination and recovery are now qualified as recorded in the execution checklist; the adapter/signer/ingress are retired. Hub/Time application and management-credential acceptance now passes locally; the execution checklist records the prepared-source factory milestone separately.

### Registration And Authorization

- [x] N1. Qualify the networking the first slice needs on macOS: one sandbox reaching another sandbox's service through exposure and through a port forward, and a custom endpointless provider whose placeholder resolves only on requests to a bound endpoint. Done on macOS (`veoveo-qualify-openshell`): port forwards reach between sandboxes, exposure does not, and a policy-bound provider secret resolves only on its endpoint.
- [x] A1. In `veoveo-core`: the normative protocol document, typed RFC 7591/7592 registration requests and responses, the `ai.veoveo/registration`, `ai.veoveo/authorization` and `ai.veoveo/module` declarations, the registration client for servers, the installation configuration without servers (roles, grants, overrides and the registration secret), and the forwarded identity as an RFC 9068 access token carrying granted permissions in RFC 9396 `authorization_details`. Done in `veoveo-core` (`veoveo-mcp-ext-registration`).
- [x] A2. Load module manifests in `veoveo-modules` through the same admission as Rust declarations. Done in `veoveo-core`.
- [x] A3. Hub registration: the registration endpoint, namespace pinning, leases in SurrealDB with LIVE distribution, catalog snapshots, migrations through the core runner and per-server database users. Every call site that reads a configured server list reads the registration catalog. Done in `veoveo-hub` `92d8a25`; the newest registration of a slug routes until session version selection exists.
- [x] A4. Hub authorization by roles over access and risks, overrides, and granted permissions in the signed identity, replacing policy rules and profile server lists. Done in `veoveo-hub` `92d8a25`.
- [x] A5. Token exchange (RFC 8693) for calls between servers and from an agent to a sub-agent. The Hub issues a token for the target server that names the caller and the acting server, carries the declared permissions the caller holds, and stays available to a live Task (D25). Done for calls between servers in `veoveo-hub` `6548d71` on `veoveo-hub-sdk` `4f2773f`: a registered server exchanges its forwarded token, or one of its live Tasks, at `/oauth/token` with an RFC 7523 assertion, and receives a token for its profile whose permissions are the requested uses the caller holds, re-evaluated at each exchange. An exchanged identity is never exchanged again, and a Task's delegation ends with the Task. A running Task's delegation does not end when the caller logs out. Agent to sub-agent delegation returns with the agents.
- [x] A9. A server declares the permissions it uses on other servers, and the Hub refuses a call when no registered server provides one, naming the missing permission (D25). Done in the same revisions: `uses` in `ai.veoveo/authorization`, `invalid_authorization_details` for an undeclared use and `invalid_target` naming each permission no registered server provides.
- [x] A6. Time declares its permissions, checks granted permissions through one typed requirement table, registers at startup and verifies itself through the Hub. Done in `veoveo-mcp-time` `fa049c3`: nine permissions from one requirement table, administration as MCP tools, and six acceptance tests through the Hub on macOS and Linux.
- [ ] A7. Let a server dial in to the Hub over an authenticated connection.
- [x] A8. Limit each server's database user to its own table prefix. Done by the PostgreSQL cut (S9): each server owns one schema through its group role, and row-level security confines it to its own rows in kernel tables.

### OpenShell Qualification

D40 retired OpenShell, and the open items below closed unrun.

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

- [x] S1. `veoveo-template-mcp-rust` (`1167397`), a GitHub template repository, passes its check stage, runtime image and in-sandbox gates on macOS and Linux. Skeletons for `veoveo-core` (`2eb7d48`), `veoveo-mcp-time` (`0cd9273`) and `veoveo-hub` (`213e257`) are created from it and pass the same gates on both hosts. `veoveo-deploy` (`35446d9`) starts SurrealDB 3.3.0 from an image pinned by digest.
- [x] S2. `veoveo-core`: its environment and the slice's crates, plus A1 and A2. Done: `veoveo-core` `75c05e6`, which the Hub and Time pin. The store fixture accepts only a `surreal` child it started and that signs in with the fixture's credentials, and knowledge member replacement retries SurrealDB write conflicts; with both, the suite passes 823 of 823 tests in five consecutive environment runs and in three Linux image checks.
- [x] S3. `veoveo-mcp-time`: its environment, self-registration, migration and self-verification through the Hub (A6). Done at `fe08624`.
- [x] S4. `veoveo-hub`: its environment, registration (A3), dial-in (A7) and self-verification with the `modular-mcp` fixture. The first slice leaves out managed-agent token admission, which returns through registration, and the Console's snapshot, stream, artifact summary and cluster authorization endpoints, which return with the Console's repository. Registration and self-verification done at `b69f16f`; dial-in remains A7.
- [x] S5. `veoveo-template-installation` (renamed from `veoveo-deploy`, marked as a template at `c0eec52`): the installation configuration with roles, grants and the registration secret, the component lock and launch descriptions, so the local installation runs from the template's defaults. Done at `798e030`: the `vv-local` Compose project, the provider profile, and bootstrap, stop and reset instructions. The installation configuration is generated because it embeds per-run key thumbprints. The component lock is S8.
- [x] S6. The slice is up: every environment reports itself registered and verified on macOS and on the Linux host after a fresh `git pull`. Done on October 12 with core `75c05e6`, Hub `b69f16f` and Time `fe08624`. The README bootstrap from a reset passes Time's six acceptance tests and the Hub's registration test on macOS. On Linux, it passes the acceptance tests from fresh clones, and the reset leaves no sandbox, forward, container, volume or registration provider. On macOS, SIGTERM removes Time's registration row and a restart registers again within 6 seconds.
- [x] S9. The PostgreSQL cut (D23): core, the Hub, Time, the installation template, the server template and the qualification harness carry no SurrealDB code, dependency, image or document. Done on October 12 with core `61f913e` (640 tests), Hub `2e1daba` (123 tests), Time `6079b6a` (144 tests), `veoveo-template-installation` `9c115c4`, `veoveo-template-mcp-rust` `2c25a8b` and `veoveo-qualify-openshell` `d99b915`; every image check passes on macOS and Linux. The slice runs on PostgreSQL 18.6 on both hosts and passes Time's six acceptance tests. On macOS, SIGTERM deletes Time's registration, login and instance at once, and after SIGKILL the Hub removes the registration and drops the login 64 seconds later.
- [ ] S7. A second Time version registers and one session selects it.
- [x] S8. A component lock in `veoveo-template-installation` that names each component's repository and Git revision, with a format URI and JSON Schema under the conventions, read by the bootstrap instead of cloning `main`. Done at `5fae4b3`, which locks Hub `36cdec8` and Time `f4f1b1b`; the core cut (C6) qualifies the next lock on both hosts.

### Cuts During Porting

These cuts happen in the new repositories while code is copied, not in the current repository.

- [x] P1. Remove the Hub's compiled module registry and the twelve optional module declarations it links: Reason, Stream, Computers, agents, Workspace, Recording, Map, Time, UAV, Frames, Media and Optimization. Kernel modules stay compiled in, and every other module arrives through registration. Done in `veoveo-hub`.
- [x] P2. Move server-specific Hub code to its owners: agent runtime authentication, bindings and catalog import; the Console stream over Recording and agent tables; Computers routes; Workspace modules; Speech routes; and the Hub catalog's direct agent runtime, Computers and Recording dependencies. Done in `veoveo-hub`; managed-agent admission returns through registration and the Console endpoints return with the Console's repository.
- [ ] P3. Port Media onto Artifact's `client` feature (M6). Its write-capability table, the `media://artifact` proxy, in-memory output buffering and the public `/media/files` directory are cut.
- [ ] P4. Remove the Knowledge and Reason dev-dependency cycle.
- [ ] P5. Split `platform/workspace` into a contract and services.
- [ ] P6. Split the agent runtime contract from `agents/runtime`.
- [ ] P7. Give Artifact, Knowledge, Embedding and Recording acceptance suites in their own repositories that run over MCP against any implementation.
- [x] P8. Replace the hand-written server entries in `hub.json` with registration. Done: the Hub and the installation name no server.
- [ ] P9. Replace the planned per-component chart split with native OpenShell workload definitions and a qualified service execution path (D52). Retire replaced packaging after migration; use upstream installation tooling for OpenShell bootstrap.
- [ ] P10. Leave `cargo xtask` and the `testing-support` process supervisor behind; nextest and environment self-verification replace them.
- [x] P11. Owners declare their audit classes and details at registration (D28), and core's audit contract keeps only the envelope (C3). Done with C5: a registered server declares its classes through `audit.declare_server_classes`, confined to its own prefix.
- [ ] P12. Remove the Artifact and Knowledge sections of the Hub configuration contract, and take its Audit section from registration data.
- [x] P13. Remove the Knowledge and Artifact schemas, queries and service contract from core (C3). Done with C3.
- [ ] P14. Move each server's contract-document conformance check into that server's repository; `veoveo-hub-sdk` provides the check as a library.
- [x] P15. Remove `mcp/apps-extension/browser` and its `image-asset-inputs` metadata from `veoveo-core`; the browser runtime and its Node tests move to `veoveo-sdk-typescript` when the App-shipping servers are extracted. Done in `veoveo-core`.

### Core Cut

- [x] C1. Create `veoveo-hub-sdk` from the server template with the crates of D33: the MCP crates, the Task runtime's MCP adapter and the MCP audit details merge into `veoveo-hub-sdk`, `veoveo-mcp-conformance` becomes `veoveo-hub-sdk-conformance`, and the `modular-mcp` fixture with the tool-input fixtures becomes `veoveo-hub-sdk-fixture`. The Hub and Time pin it. Done in `veoveo-hub-sdk` `5c6e1ba`, pinned to core `7a6c210` and the rmcp fork with its reason beside the pin; the check stage passes 216 tests on macOS and Linux. The forwarded-token verifier accepts only its own server's audience, and the resource-token path of the old byte routes is gone.
- [x] C2. Move the Hub's schema and migrations, the store's Hub module, `veoveo-policy` and `veoveo-gateway-contract` into `veoveo-hub` (D30). Done in `veoveo-hub` `72bbd6a` on core `dd7394e` and the SDK `3524b83`: the Hub migrates its own `hub` schema with its own history, refuses a server registering `gateway`, declares its audit classes, reads other owners' records through the stored declarations, and passes core's database checks through `Conformance::owner`. Time `708d689` and the server template `1cf9b6c` run on the same core.
- [x] C3. Delete the Artifact, Knowledge, Embedding, Computers, Recording, Dictation, LiveView, Agents and Console items and the unused modules from core, as [Core Contents](#core-contents) lists. Time and the Hub drop their Knowledge source declarations. Done in `veoveo-core` `7a6c210`: 19 commits remove 67,895 lines and leave 11 crates; Time and the Hub follow in C2.
- [x] C4. Replace the Hub profile and the MCP input method in the `tasks` schema with protocol-neutral owner data. Done in `7a6c210`: `task.surface` is an opaque key the creating adapter fills, and `task_input.kind` an opaque input name.
- [x] C5. Core's check stage fails when a core crate depends on rmcp or on an MCP crate, or when the audit vocabulary names a server. Done in `7a6c210`: a Rust test reads core's lock file, audit classes are owner-declared with a JSON Schema stored in `audit.detail_type`, and core declares only Task and audit classes. The check stage passes 299 tests on macOS and Linux.
- [x] C6. Every repository passes its image check on macOS and Linux, and the local installation passes Time's acceptance tests after a reset (D31). Done on October 13 with core `f685fbf`, the SDK `c9742c0`, Hub `8ea3e5d`, Time `bc6b8be`, Artifact `cd4445b`, the server template `1a7b734` and `veoveo-template-installation` `ff883ee`. After a reset from the README on macOS and Linux, the Hub's registration test, Time's six acceptance tests and Artifact's five pass on both hosts, and SIGTERM removes Time's and Artifact's registrations, logins and instances at once.

### Artifact And Media

- [x] M1. `veoveo-mcp-artifact` foundation: the repository from the server template, the `artifact` schema, RustFS in the installation, single and multipart uploads, downloads, metadata, lists and paging, grants, deletion and retention, quotas, audit and notifications. Size and SHA-256 are optional on `create_upload`; RustFS checks them during the write when given, and the server computes the SHA-256 at completion otherwise. `create_upload` carries labels, retention, metadata and an idempotency key, and objects are stored by artifact ID. Acceptance passes through the Hub on macOS and Linux. Done in `veoveo-mcp-artifact` `cd4445b`: the `artifact` schema with `artifact.effective_level`, quota reservation under a locked usage row, idempotent creates, keyset listings and the sweep; nine tools, their resources and subscriptions, signed RustFS transfers through aws-sdk-s3, inline or Task digest verification, and an audit record in each decision's transaction through core's server audit functions, with 75 tests on both hosts. Artifact's five acceptance tests pass through the Hub and RustFS on both hosts, including 1 GiB of unknown size uploaded in parallel parts through OpenShell's TCP pass-through (44 s on macOS, 87 s on Linux), a ranged download, grants, a quota refusal and deletion releasing the bytes. A read refused across tenants is covered by database tests, because the local installation has one tenant.
- [x] M2. The server uses aws-sdk-s3 1.152.0 without default features, with rustls on ring and without aws-config. It is the only Rust S3 crate that signs Content-Length, Content-Type, the SHA-256 checksum and `If-None-Match` into a URL, completes a multipart upload create-only, and sets bucket CORS and lifecycle rules. Done in M1.
- [x] M3. `ctx.client()` in `veoveo-hub-sdk`: calls through the Hub for the current caller or Task with token exchange (A5), typed calls from a provider's `contract` feature, builders that run when awaited, and a typed handle for tools that run as Tasks. Done in `veoveo-hub-sdk` `4f2773f`: the `client` feature's `HubClient`, `ToolCall` and `TaskHandle`, which waits on Task status subscriptions, `ctx.client()` and Task bindings in `server`, and `TestMesh` in `testing`; the Hub's tests and the SDK's own pass on macOS and Linux. Time `16f150d` and the server template `4ecd9b3` follow.
- [x] M4. Durable steps in core's Task runtime: `ctx.step` stores each finished step's typed result on the Task, and a restarted Task resumes at its first unfinished step. Done in `veoveo-core` `6898a77`: `tasks.task_step`, steps that record their operation ID before they run, and an unsettled step reported with the same ID.
- [x] M5. Artifact's `client` feature: `ArtifactClient` uploads a stream of unknown size and downloads, built on `ctx.client()`. Done in `veoveo-mcp-artifact` `92d38e1`: typed calls for every tool, streamed uploads whose memory stays at part size times parallelism (64 MiB by default), ranged downloads, and the acting server recorded on each artifact and audit record; 82 tests pass on macOS and Linux.
- [x] M6. `veoveo-mcp-media` on PostgreSQL with `ArtifactClient` (P3), on operations and the usage ledger (M9, M10). The provider address is required configuration, so every gate test names a fake provider; a qualification test reaches the real one only when its environment enables it. Done with `veoveo-mcp-media` `1fe31f7`: `run` as a Task parked on a provider operation, completed by signed webhooks under the installation's public origin or, without one, by bounded status checks; outputs streamed into Artifact as durable steps through a client that admits only the provider's output hosts on every redirect; estimated and actual costs in the usage ledger. The port also fixed core `d5353ac` (a caller's cancellation of a parked Task reaches the provider through its claim), added the installation's public origin to `veoveo-hub-sdk` `67314b4`, and moved Artifact `ce550f8` to share links under that origin; every check stage passes on macOS and Linux.
- [x] M7. Artifact sharing: release states, share links and their route, and access requests. Done in `veoveo-mcp-artifact` `c2e541c`: release and private states, share links for released artifacts without data labels that live up to 30 days with an optional redemption limit, the public `GET /artifact/shares/{token}` route answering a live link with a five-minute signed GET and every refusal with the same 404, access requests whose approval writes the grant in the same transaction, and the two review prompts; 101 tests pass on macOS and Linux. The SDK's request span must stop recording raw paths before share links run in an installation.
- [ ] M8. The Artifact library App, delivered with the Console port.
- [x] M9. Operations, the usage ledger and the minimal audit record in `veoveo-core` (D34, D35, D36), with durable steps (M4). Done in `veoveo-core` `50e72a3`: Tasks park on operations that settle through events, checks and deadlines; the `usage` ledger in FOCUS 1.4 columns with Task costs and daily totals; the audit record cut to an envelope with owner reason codes, URI targets and the acting server, mapped to OCSF 1.9. 328 tests pass on macOS and Linux. Migration `0503` requires a reset of every installation's database.
- [x] M10. The SDK, the Hub, Time and Artifact adopt M9: `ctx.step`, `ctx.operation`, `ctx.usage` and the callback route in the SDK; the Hub's own reason codes, the session rule of D37 and its cost views. Done with `veoveo-hub-sdk` `25d9ea5` (`TaskWorker` with a shutdown drain, steps, operations with the callback route, usage with per-Task costs), Hub `a8843f2` (its own reason codes, D37, usage partitions and cost views at `/admin/{profile}/usage/daily`), Time `ffeec94` on `TaskWorker`, Artifact `128fe01` and the server template `399da40`; every check stage passes on macOS and Linux. Hub `0689f2b` qualifies D37 end to end through a real login at Keycloak 26.8.1: after a logout a Task keeps exchanging, and after a replayed refresh token its exchange is refused with `invalid_grant` and its earlier token is no longer admitted.
- [ ] M11. Spending limits over the usage ledger, and the OCSF audit export and FOCUS usage export checked by their projects' validators.
- [x] M12. Reset the local installation from the README on macOS and Linux with a new component lock, and pass the acceptance tests of the Hub, Time, Artifact with sharing, and Media with a fake provider. Media's real provider is qualified once in the same run, with one generation of its cheapest image model, completed through bounded status checks and through its webhook, which reaches the local installation through the template's optional `tunnel` Compose profile: a named Cloudflare tunnel that carries the installation's single public origin, such as `veoveo.example.com`, one per host's installation, whose remote ingress passes only Media's callback route and Artifact's share route and answers 404 to everything else. The Linux host is the permanent Bioma reference installation, whose public origin `veoveo.bioma.ai` stays untouched until E6; the API key reaches Media's environment only as an OpenShell provider placeholder. Done on October 14: both installations were reset with the new lock and passed the acceptance tests of the Hub, Time, Artifact with sharing through the tunnel, and Media with the fake provider by webhook and by status checks. One real generation per host completed, by webhook through the tunnel on macOS and by status checks on Linux, stored its output in Artifact and recorded its actual cost. The run's findings were fixed in core `cec2f9f` (a server keeps its instance and Tasks across a lost database connection, reaped only after a 30 s grace, and a parked Task's cancellation reaches its provider), SDK `7446181` (newest-first owner pages, batch reads, `PreserveOutcome` and the SQL confinement check of D38), Hub `c9f16cd` (a per-server connection pool discarded after a restart, and the Keycloak login that qualifies D37 inside its environment), Time `5706256`, Artifact `5588fc4` (verifications on `TaskWorker`) and Media `2d2f2d0` (state read through the runtime API, provider quotes as estimates, unique fake identifiers), with served binaries built apart from test builds. The macOS installation runs these revisions and passes every acceptance suite and the live checks: policy reloads, ended database sessions and server restarts. The Linux installation moves to them after macOS is accepted.

### Docker Environments And Lore

- [x] L1. Record D40 to D43 and these tasks. Done with this record.
- [x] L2. The Hub issues Lore tokens (D43), and stock Lore accepts them: a client clones the repositories it is granted and gets "Not found" for any other. Done in `veoveo-hub` `dcaf880` on core `c0c8254` and the SDK `3ea1a32`: the typed `lore` section, Lore tokens at the token endpoint, the authorization server's metadata at `/oauth/.well-known/openid-configuration`, Lore clients from `generate-local-installation` and the `lore-tokens` refresher; stock Lore v0.10.1 clones a granted repository with an EdDSA token of that shape and answers "Not found" for another. Core admits plain HTTP for names under `.internal` in place of OpenShell's host alias.
- [x] L3. Qualify the Envoy edge on macOS before the installation adopts it: HTTPS egress to the fetch hosts only, the registration secret added only on `POST /oauth/register`, published ports reaching environments that sit only on internal networks, and the media provider key resolving only from Media's network. Done with Envoy v1.40.0: a CONNECT proxy reaches crates.io, `static.rust-lang.org` and GitHub, where Cargo fetches a crate and a Git dependency, and refuses other hosts; a matcher limits the registration secret to `POST /oauth/register`, so registration access tokens pass unchanged and the published port adds nothing; RBAC on the source subnet limits the provider key to Media's network; no secret appears in an environment.
- [x] L4. `veoveo-template-installation` runs the Lore server, the Envoy edge, the token service and the environments as Compose services, generates the installation CA, and describes Lore bootstrap and merges in its README. It keeps no OpenShell file. Done at `f220a75`.
- [x] L5. The Hub, Time, Artifact, Media and `veoveo-template-mcp-rust` drop their OpenShell policies and wording, and their READMEs launch environments through Compose. Done with Hub `c3db10a`, Time `1098651`, Artifact `a559daa`, Media `9786adb` and the server template `cc989e0`, each passing its image check, and core `2b4dc94` and the SDK `d06d9fe` for their documents; every component moved to core `c0c8254`, the SDK `3ea1a32` and rustls 0.23.46.
- [x] L6. Reset the local installation from the README on macOS and pass M12's acceptance tests, the Lore checks (a granted clone, a refused repository, a branch push, a refused push to `main`, an admin merge) and the secret checks (no Lore token, registration secret or provider key readable inside an environment). Done on October 14: Time passes 6 acceptance tests, Artifact 7 and Media 2 with the fake provider, again after every environment was recreated; every Lore and secret check holds, tokens refresh every ten minutes, and the egress proxy refuses hosts outside its allowlist.
- [x] L7. Retire OpenShell: archive `veoveo-qualify-openshell` and rewrite this plan's environment sections and every repository's documents for D40. Done: the repository is archived, and OpenShell appears only in the records of completed work.
- L8. **Withdrawn by D55 on October 17, not completed.** The following records the former D45 Desktop acceptance work and its then-open limitations; it imposes no current implementation gate. On October 15, the official macOS Desktop 0.10.100 completed trusted TLS, Keycloak browser SSO and explicit account confirmation through the separate `veoveo-service-lore` adapter (`cb31c30`), then displayed all four authorized remote repositories. Provider refresh after the revalidation interval, catalog reload after an adapter restart, and catalog reconnect after a Desktop relaunch passed. Upstream Lore stays unmodified. Six Rust security tests, format/Clippy, runtime image build, Compose validation, write/unknown RPC rejection and unauthenticated catalog/exchange rejection passed. Agent catalog filtering still returns only its assigned repository, and all four coding containers remain isolated from the adapter and its private credential/session volumes. The adapter implements published `UrcAuthApi` and environment contracts, keeps provider refresh tokens private, issues two-minute repository tokens and limits human sessions to eight hours. Its local component revision is pinned; Linux deployment and publication remain pending. **Still unfinished:** opening a live graph and revision diff from the remote-only Desktop UI. Tested row/revision clicks and menus expose no working navigation; blank revision counts and zero branch counts are not verified repository statistics. No local checkout was created. Do not claim full Desktop completion, per-repository token renewal in the UI, or a definitive upstream limitation from this result. Hub canonical external OAuth discovery remains separate work. Later on October 15, Keycloak rejected the existing refresh token as inactive and the adapter correctly removed the session. Desktop then showed an authentication error without reopening sign-in; neither relaunch nor recreating the same remote entry recovered it. Automatic provider-expiry recovery was therefore also an open Desktop acceptance requirement at that time (now withdrawn by D55). Recovery was subsequently verified on the L11 revision: the official macOS CLI 0.10.1 initiated browser sign-in, the user completed it, and quitting/reopening Desktop loaded the renewed shared credential. Desktop again displayed four remote repositories; live reload, provider refresh after the revalidation interval, and catalog reload after an adapter restart passed. This restores the connection but does not satisfy automatic reauthentication within Desktop. The tested manual recovery procedure is documented in the installation README.
- [x] L9. Deploy D46 on macOS, done with `veoveo-template-installation` `8b44524`: unmodified, digest-pinned Keycloak 26.8.1 in production mode, PostgreSQL 18.6 with a non-superuser application owner, loopback HTTPS through Envoy, an operator-owned external identity volume and protected bootstrap credentials. The local Hub uses a confidential S256 PKCE client and stable user subjects; the temporary bootstrap service account and credential are removed. Authorization code login, authenticated MCP access, refresh and logout pass before and after all identity containers are recreated. All four coding containers are denied access to identity HTTP, PostgreSQL and the host listener, and carry no identity credentials or runtime mounts. The macOS user trusts only the identity leaf certificate. Compose validation and macOS deployment pass; Linux deployment is not claimed. The installer guide records provider choice, backup/restore responsibilities and an Entra configuration fragment.
- [ ] L10. Qualify Entra on the remote Linux reference separately, using its tenant-specific v2 issuer. The Hub's human OAuth/client-registration and Task contracts remain separate work. For Lore, qualify direct issuer access-token type, native repository claim mapping, supported OpenShell refresh, expiry/reconnect and access removal under D55; do not register or extend a Lore Desktop adapter. Preserve the reference public origin. Local Keycloak acceptance does not provision an Entra tenant or qualify its claim shape, and this macOS slice does not modify the remote host.
- [x] L11. Remove Keycloak assumptions from the Lore adapter deployment. Done on October 15 in `veoveo-service-lore` `e096f6f` and `veoveo-template-installation` `be4e789`: explicit issuer/client/scopes, discovery-checked Basic or Post client authentication, asymmetric ID-token algorithm allowlists, optional private CA, and issuer/client-bound sessions. Local Keycloak registration is isolated in `identity/configure-lore-client`; generic deployment accepts operator-supplied OIDC configuration and credentials without provider administration. Entra and generic customer examples include refresh scopes, and external issuer requests use trusted Envoy egress with explicit host allowlists. Ten Rust tests cover full fixture login and renewal for both client-auth methods plus fail-closed security checks; format, Clippy, runtime image build, installer syntax, Compose validation and local startup pass. Agent catalog filtering still returns only its assigned repository. This is protocol-fixture qualification, not live Entra/customer or automatic Desktop reauthentication acceptance. L10 remains separate; D55 withdraws L8 and schedules adapter retirement, so adapter Linux deployment/publication is no longer required.

### Extraction

- [ ] E1. Tag `veoveo-core` `v0.1.0` once the first slice is up.
- [ ] E2. Bring each further component in with its own environment, one at a time, after the first slice is up.
- [ ] E3. Extract the leaf servers: Datasheet, DuckDB, Timeseries, Chart, Map and Frames.
- [ ] E4. Extract Knowledge, Recording, Agents and Computers, deciding their repository names (D29) first and, with the agents, inline artifact writes for a model without a sandbox (D27).
- [ ] E5. Extract the GPU servers, runtimes and showcases.
- [ ] E6. Create `BiomaAI/veoveo-bioma` from `veoveo-template-installation` the way any organization would and move the reference to the qualified OpenShell Docker-driver execution path, including native Linux CUDA requests where needed (D54).

### Documentation

- [ ] W1. Replace `FORK_DEVELOPMENT.md` with installation-template and component-fork guidance.
- [ ] W2. Turn `CODEMAP.md` into an organization map in `veoveo-docs`.
- [ ] W3. Update the AGENTS.md naming, repository command and CI sections.
