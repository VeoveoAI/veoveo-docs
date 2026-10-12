# Repository Split Plan

Status: active plan for the `VeoveoAI` organization. Decisions marked done under
[Tasks](#tasks) are accepted, and repositories are created from it as work lands. The
Veoveo monorepo's contracts, layout and release process apply to each component until
it moves.

Baseline: Veoveo main `0c33cf8a7` on 2026-10-11.

This plan moves Veoveo from one repository into a `VeoveoAI` GitHub organization.
One repository, `veoveo-core`, holds every contract, protocol client, conformance
suite and shared library that crosses a repository boundary. Each running service,
MCP server, runtime and application becomes its own repository that depends on
`veoveo-core` and releases on its own schedule. Installations compose released
components instead of forking the platform.

The goal is that a change to one component rebuilds, qualifies and deploys that
component alone. Today a change to a shared crate rebuilds every Rust image family,
and the Gateway binary rebuilds whenever one of ten domain servers changes.

## Standards And Protocols

| Standard or protocol | Use in this plan |
|---|---|
| Git and GitHub organizations | One repository per component under `VeoveoAI`; installation repositories in the installation owner's organization |
| Cargo | Components consume `veoveo-core` and other contract crates as GitHub Git dependencies pinned by tag; nothing is published to a registry |
| Semantic Versioning 2.0.0 | `veoveo-core` versions; `cargo-semver-checks` blocks unplanned breaking changes |
| OCI images | Each host builds component images locally; a registry for distributing them is an open decision (D15) |
| Dockerfile multi-stage builds with BuildKit | `dev`, `check`, `build` and `runtime` stages in every component repository |
| OpenShell 0.1.3 | Component environment runtime: sandboxes from our images, `version: 1` policies, providers, service exposure and port forwarding |
| Compose specification | Launch of SurrealDB and other upstream infrastructure that runs outside OpenShell |
| Helm 3 | One application chart per component, built on a shared library chart |
| Flux | One HelmRelease per component in the installation repository, ordered with `dependsOn` |
| MCP `2026-07-28` | Unchanged; slugs, URI schemes, scopes and `ai.veoveo/*` keys keep their wire spelling |
| Veoveo MCP extensions `ai.veoveo/registration`, `ai.veoveo/authorization` and `ai.veoveo/module` | Repository-owned declarations a server sends when it registers with the Gateway |
| OAuth 2.0 private-key JWT client authentication, RFC 7523 | Server and agent identities |
| OAuth 2.0 Token Exchange, RFC 8693 | Narrowed delegation from an agent to a sub-agent |
| Cedar | Authorization conditions; the version is pinned when adopted |
| `veoveo.ai/deployment/v9` and `veoveo.ai/deployment-lock/v8` | Current profile and lock formats; the component lock below extends them |
| SurrealDB 3.3.0 modules | Each component ships its own module schema and migrations |

## Principles

1. `veoveo-core` holds contracts, protocol clients, conformance suites and shared
   libraries. It runs no service and depends on no component repository.
2. Every component repository depends on `veoveo-core`. A component may also depend
   on another component's published contract crate, never by path and never in a
   cycle.
3. A contract moves into `veoveo-core` when `veoveo-core` needs it, when a service
   needs it, or when most repositories use it as shared vocabulary.
4. An implementation is valid when it passes its conformance suite in `veoveo-core`.
   That suite, not the source location, is what makes Artifact, Knowledge, Embedding
   and Recording replaceable.
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
| `core` | Contracts, protocol clients, conformance suites and shared libraries | `veoveo-core` |
| `service` | Platform service that implements a core contract, including its MCP server | `veoveo-service-artifact` |
| `mcp` | Domain MCP server with no platform role | `veoveo-mcp-time` |
| `runtime` | Native or GPU runtime used by a service | `veoveo-runtime-embedding` |
| `app` | User-facing application | `veoveo-app-console` |
| `sdk` | Client library | `veoveo-sdk-python` |
| `template` | GitHub template repository | `veoveo-template-mcp-rust` |
| `showcase` | Demonstration workload | `veoveo-showcase-uav` |
| `qualify` | Qualification suite for a third-party runtime | `veoveo-qualify-openshell` |
| none | Organization singletons | `veoveo-docs`, `veoveo-deploy`, `veoveo-website` |

`veoveo-deploy` is the development installation that Veoveo runs for itself on
OpenShell. It has the shape of an installation repository and holds development values.

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
is extracted. No Veoveo crate is published yet, so the rename has no external
consumers. Catalog slugs, URI schemes, scopes and extension keys do not change.

### Runtime Names

OpenShell 0.1.3 rejects sandbox names longer than 19 characters, and container and
Kubernetes resource names carry their own limits. Runtime names therefore use
`vv-<kind>-<name>`, with a short code for each kind, while repositories, crates,
binaries and images keep their full `veoveo-<kind>-<name>` names. Kinds without a code
use `vv-<name>`. Published identities, such as `veoveo.ai`, the `ai.veoveo/*` extension
keys and the `veoveo.ai/*` format tags, keep their spelling.

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
| none | none | `vv-core`, `vv-deploy` |

Every current catalog name fits. The longest, `vv-mcp-optimization`, uses all 19
characters, so a new MCP server name stays within 12 characters after `vv-mcp-`.
Running several versions of one component, as
[Session Version Selection](#session-version-selection) requires, needs a variant
suffix that this rule has no room for in the longest names (D19).

## Repository Catalog

| Repository | Source today | Publishes |
|---|---|---|
| `veoveo-core` | `platform/{types,macros,modules,store,policy,oauth,http,task-runtime,audit}`, `mcp/{contract,apps-extension,knowledge-extension,conformance}`, the contract, protocol and client crates listed under [Core Contents](#core-contents), `testing/support`, `testing/fixtures` | crates, conformance CLI and suites, policy checks |
| `veoveo-service-gateway` | `platform/gateway/{src,catalog,composition,queries}` | image, chart |
| `veoveo-service-artifact` | `platform/artifacts/service`, `servers/artifact-mcp` | service and MCP images, chart |
| `veoveo-service-agents` | `agents/{kernel,manager,runtime}` | images, chart, agent templates |
| `veoveo-service-knowledge` | Knowledge implementation in `platform/knowledge`, `servers/knowledge-mcp` | image, chart |
| `veoveo-service-recording` | `platform/recordings/{hub,forwarder,store,reader,rrd,video}`, `servers/recording-mcp` | images, chart |
| `veoveo-service-computers` | `platform/computers/*`, `platform/runtimes/computers`, `servers/computers-mcp` | Host, template and MCP images, chart |
| `veoveo-service-factory` | new; see [Factory](#factory) | images, chart |
| `veoveo-runtime-embedding` | `platform/runtimes/embedding` without its contract and client | GPU image, chart |
| `veoveo-runtime-simulation` | `platform/runtimes/simulation` without its contract | GPU image |
| `veoveo-mcp-time` | `servers/time-mcp` | contract crate, image, chart |
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
| `veoveo-template-installation` | `examples/bioma` with installation values removed | template repository |
| `veoveo-deploy` | none; new | the development installation: SurrealDB Compose file, installation configuration, namespace bindings and component lock |
| `veoveo-docs` | repository-wide documents in `docs/`, `tools/screenshots` | documentation site |
| `veoveo-showcase-uav` | `showcase/uav-sim`, `servers/uav-sim-mcp` | images, charts |
| `veoveo-showcase-sumo` | `showcase/sumo` | images, charts |
| `veoveo-qualify-openshell` | the OpenShell spike probes and policies | qualification results per OpenShell release and host |
| `.github` | new | organization profile and reusable workflows |

The organization holds 38 repositories. Each installation adds one public
repository in its owner's organization. The reference is `BiomaAI/veoveo-bioma`,
built from `examples/bioma`.

### Core Contents

Starting from `veoveo-mcp-contract`, `veoveo-platform-store`, `veoveo-task-runtime`
and `veoveo-types`, the required dependency closure contains 13 crates. It already
includes the Artifact, Audit, Gateway, Knowledge and Embedding contracts, so those
contracts cannot live outside `veoveo-core`.

| Crate | Path today | Reason it belongs in core |
|---|---|---|
| `veoveo-artifact-contract` | `platform/artifacts/contract` | Required by `mcp-contract`, `audit-contract` and `platform-store` |
| `veoveo-artifact-client` | `platform/artifacts/client` | Encodes the Artifact HTTP protocol for 16 crates |
| `veoveo-audit-contract` | `platform/audit/contract` | Required by `mcp-contract` and `platform-store` |
| `veoveo-gateway-contract` | `platform/gateway/contract` | Required by `mcp-contract`, `platform-store` and `policy` |
| `veoveo-knowledge-contract` | `platform/knowledge/contract` | Required by `mcp-contract` and `platform-store` |
| `veoveo-embedding-contract` | `platform/runtimes/embedding/contract` | Required by `knowledge-contract` and `platform-store` |
| `veoveo-embedding-client` | `platform/runtimes/embedding/client` | Protocol client for any Embedding implementation |
| `veoveo-task-contract` | `platform/task-runtime/contract` | Shared Task vocabulary |
| `veoveo-recording-contract`, `veoveo-recording-protocol` | `platform/recordings/{contract,protocol}` | Used by the Gateway, UAV, View and Console |
| `veoveo-computers-contract` | `platform/computers/contract` | Used by the Gateway and Console |
| `veoveo-frames-contract` | `platform/frames/contract` | Used by the Recording service |
| `veoveo-simulation-contract` | `platform/runtimes/simulation/contract` | Shared by showcases and acceptance |
| `veoveo-deploy-contract` | `deploy/contract` | Installation tooling; it enumerates first-party servers in `FirstPartyMcpServer`, so it stays out of core until registration replaces that list |
| `veoveo-oauth-client` | `platform/oauth` | Shared by the Gateway and Computers |
| Agent runtime contract | to be split from `agents/runtime` | Required by the Gateway catalog |
| Workspace contract | to be split from `platform/workspace` | Shared by the Gateway, Console and Workspace |

Domain server contracts stay with their server under the existing `contract`
feature. Map and Time are the first candidates for promotion because the most
repositories use them.

## Cross-Repository Contracts

### Component Packaging

Every `service` and `mcp` repository publishes these artifacts under one version
tag:

| Artifact | Today | After the split |
|---|---|---|
| Contract crate | path dependency through the `contract` feature | versioned crate |
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
installation   composes released components
app            depends on veoveo-core, reaches services through core clients
mcp            depends on veoveo-core and on other published mcp contract crates
service        depends on veoveo-core
runtime        depends on veoveo-core
veoveo-core    depends on third-party crates only
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
mechanism of the standard it extends. Nothing carries a version number before it ships.

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
Its three declarations, whose types live in `veoveo-core`, travel as client metadata:

| Extension | Declares |
|---|---|
| `ai.veoveo/registration` | slug, URI scheme, server version and endpoint |
| `ai.veoveo/authorization` | permissions and the permission each tool, resource template and prompt requires |
| `ai.veoveo/module` | the module manifest: ownership claims, requirements, SQL API, observation tables and migrations |

The registration response returns the client identifier, the RFC 7592 registration
access token, the server's database credentials and the keys that sign forwarded
identities. `veoveo-core` holds the normative protocol document and a registration
client that every server uses.

The server advertises the same declarations under `extensions` in its MCP discovery
result, so they have one source. Tools, resources and prompts are not declared twice:
the Gateway reads them through MCP discovery, as it does today.

The first registration of a namespace claims it. The Gateway pins the server's public
key to its slug, URI scheme, table prefix and permission prefix, such as `time`,
`time://`, `time_` and `time.*`. Later registrations of that namespace, including new
versions, must be signed by the pinned key, and a claim by another key is rejected.
Releasing a namespace is an explicit administrative action. A declaration outside the
pinned namespace is rejected with the exact reason.

The Gateway applies the module's migrations with the core module runner and its own
database credentials, then issues the server its own database user at registration.
The user has database-wide access, as servers have today, and limiting it to the
server's table prefix is tracked separately. A server never holds administrator
credentials.

A registration is a lease in SurrealDB, renewed through an RFC 7592 update every 10 seconds and expired after 30.
Every Gateway replica observes registrations through a LIVE query and builds a new
immutable catalog snapshot on each change, and requests in flight finish on the
snapshot they started with. When a lease expires, the server leaves routing, and its
Tasks stay bound to the version that created them. Every registration, claim,
migration and expiry enters the audit chain.

Several versions of one server may register at the same time, and a builder's session
selects among them as described in [Session Version Selection](#session-version-selection).
A server first registers a reachable address. A later step lets a server dial in over
an authenticated connection and receive MCP requests on it, so a build on a laptop or
in a factory sandbox joins a shared Gateway without inbound networking.

Destructive schema changes run as expand and contract. A version adds the new shape
first. The runner performs the contract step only when no registered version declares
reads of the removed shape and the change feeds show no access to it during the
configured window, and it takes a snapshot before the drop.

Artifact storage is a platform dependency of the Gateway, configured by address like
SurrealDB, and its upload, download and administration routes depend on the Artifact
contract in core rather than on a registered server.

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

### Time

| Permission | Resource | Access | Risks | Required by |
|---|---|---|---|---|
| `time.read` | `time.authority` | read | | `resolve_time`, `convert_time`, `assess_clock`, resources, completions and prompts |
| `time.schedule` | `time.calendar` | read | | `evaluate_windows`, `expand_schedule` |
| `time.timeline` | `time.epoch` | read | | `validate_timeline` |
| `time.events.write` | `time.event` | write | | `create_temporal_event`, `cancel_temporal_event` |
| `time.admin` | `time.authority` | write | administer | authority sources, acquisitions and activation |

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
Gateway. The Gateway's environment registers the `modular-mcp` fixture server from
`veoveo-core` as its test peer. Acceptance tests live in the component's repository
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
and SurrealDB are unmodified upstream releases that run outside the sandboxes. On
macOS the runtime needs Docker Desktop 4.94 or newer, whose Linux kernel enables
Landlock. Docker Desktop 4.54 lacks Landlock, and every sandbox fails OpenShell's
Landlock probe there. Docker Desktop also needs host networking enabled and Enhanced
Container Isolation disabled. Both hosts run the OpenShell gateway with
`OPENSHELL_TELEMETRY_ENABLED=false`, and images disable Rerun's usage analytics.

The October 11 qualification ran the same probes on macOS (arm64, Docker Desktop
4.94) and on the Ubuntu 24.04 RTX 4090 host (amd64).

| Path | Works | Fails |
|---|---|---|
| Outbound from a sandbox | HTTP, SSE, WebSocket, native gRPC over HTTP/2, SurrealDB queries and LIVE notifications, Cargo through the TLS-inspecting proxy; 30-minute runs complete with p99 latency of 1 to 3 ms on Linux and 3 to 9 ms on macOS | WebSocket upgrades to endpoints inspected as `mcp`, `json-rpc` or `graphql`, and plain requests to endpoints inspected as `websocket` |
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
such as SurrealDB run outside OpenShell as plain containers, and each environment's
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
dial-in connection (A7) belongs to the first slice.

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
| Feature isolation | cargo-hack, proving that each `contract` feature builds alone |
| Public API | cargo-semver-checks for `veoveo-core` against its previous tag |
| Wire formats and schemas | insta snapshots |
| Parsers, IDs and URIs | proptest |
| Store tests | a real SurrealDB 3.3.0 server outside OpenShell, because the in-memory engine hid a RocksDB commit conflict in the current repository |
| Launching | OpenShell sandboxes for environments, Docker Compose for SurrealDB, Kubernetes later |
| Deployment gates, later | Conftest or Kyverno CLI, kubeconform and `helm lint` |

## First Slice

The first slice is the smallest installation that represents Veoveo end to end.

| Component | Runs as |
|---|---|
| OpenShell gateway 0.1.3 | the official package, outside the sandboxes |
| SurrealDB 3.3.0 | the official image, outside the sandboxes; it runs as UID 65532, so its data volume mounts at `/home/nonroot`, where RocksDB can create its directory |
| Gateway environment | an OpenShell sandbox from `veoveo-service-gateway` |
| Time environment | an OpenShell sandbox from `veoveo-mcp-time` |

`veoveo-deploy` is the development installation. It holds the SurrealDB Compose file,
the installation configuration, the namespace bindings and a component lock that names
each component's Git revision. Each component repository describes its own launch:
its policy, providers, GPU use and exposure under `openshell/`. Installation
configuration uses the same core contract that production installation repositories
use. The Gateway environment fetches `veoveo-deploy` and applies its bindings at first
start, so a binding changes through a commit. Starting SurrealDB and creating the
sandboxes are the only steps taken outside an environment, and each environment
generates its own private key. The slice is up when every environment reports itself
registered and verified on macOS. The Linux host repeats it from a fresh `git pull`
after macOS passes.

Core tests that use SurrealDB start one `surreal` process per fixture inside the
environment, because no container runtime enters a sandbox. The dev images copy the
SurrealDB 3.3.0 binary from the server image pinned by digest.

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
| 6 | Skeletons for `veoveo-core`, `veoveo-mcp-time`, `veoveo-service-gateway` and `veoveo-deploy`: README, AGENTS.md, LICENSE, workspace manifest with lint tables, toolchain pin, Dockerfile stages and `openshell/policy.yaml` | `docker build --target check` passes and each environment starts on both hosts |
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
is under test, origin tags on every write, SurrealDB change feeds for reversal, a
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
- [ ] D5. CI placement for per-repository CPU checks.
- [ ] D6. Agent model for Console and Workspace work.
- [ ] D7. Reconcile the factory permissions and roles with the brokers in `FACTORY_ISOLATION.md`.
- [x] D8. Authorization uses permissions, roles and bindings, relationship-based sharing, Cedar conditions, coarse OAuth scopes and narrowed delegation, declared by servers through `ai.veoveo/authorization`. No change waits for a person.
- [x] D9. New repositories are pushed to `VeoveoAI` as work lands, and the Linux host verifies each step from a fresh `git pull`.
- [x] D10. No task runner. Tools keep their own configuration, Cargo aliases provide short commands and test logic lives in Rust.
- [x] D11. Each environment builds, verifies and repairs its own component. Outside an environment, people and tools only launch environments and perform the bootstrap step.
- [x] D12. OpenShell 0.1.3 is the environment runtime on macOS and Linux, with telemetry disabled.
- [x] D13. MCP servers dial out to the Veoveo Gateway. Native gRPC endpoints use dial-in or port forwarding, never service exposure.
- [x] D14. Every repository is licensed under Apache-2.0. Its Section 6 grants no trademark rights, and it carries an explicit patent grant. The current repository has no `LICENSE` file and no Cargo `license` metadata, so every new repository's first commit adds both.
- [ ] D15. Image distribution: whether and where images are published, decided when an installation needs images it did not build.
- [ ] D16. Register the Veoveo name and logo as trademarks, and publish a `TRADEMARKS.md` policy that covers forks and `veoveo-*` names.
- [ ] D17. Choose the contribution model: a DCO sign-off, or a Contributor License Agreement if relicensing must stay possible.
- [x] D18. Runtime names use `vv-<kind>-<name>` with the kind codes in [Runtime Names](#runtime-names).
- [ ] D19. A variant suffix for runtime names when several versions of one component run at once.

### Registration And Authorization

- [ ] N1. Qualify the networking the first slice needs on macOS: one sandbox reaching another sandbox's service through exposure and through a port forward, and a custom endpointless provider whose placeholder resolves only on requests to a bound endpoint.
- [ ] A1. In `veoveo-core`: the normative protocol document, typed RFC 7591/7592 registration requests and responses, the `ai.veoveo/registration`, `ai.veoveo/authorization` and `ai.veoveo/module` declarations, the registration client for servers, the installation configuration without servers (roles, grants, overrides and the registration secret), and the forwarded identity as an RFC 9068 access token carrying granted permissions in RFC 9396 `authorization_details`.
- [ ] A2. Load module manifests in `veoveo-modules` through the same admission as Rust declarations.
- [ ] A3. Gateway registration: the registration endpoint, namespace pinning, leases in SurrealDB with LIVE distribution, catalog snapshots, migrations through the core runner and per-server database users. Every call site that reads a configured server list reads the registration catalog.
- [ ] A4. Gateway authorization by roles over access and risks, overrides, and granted permissions in the signed identity, replacing policy rules and profile server lists.
- [ ] A5. Issue narrowed sub-agent tokens through token exchange.
- [ ] A6. Time declares its permissions, checks granted permissions through one typed requirement table, registers at startup and verifies itself through the Gateway.
- [ ] A7. Let a server dial in to the Gateway over an authenticated connection.
- [ ] A8. Limit each server's database user to its own table prefix.

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
- [ ] Q10. Add a `limit` scenario for loopback ports: inside a sandbox, a closed loopback listener keeps completing TCP handshakes and never answers, while a plain container refuses the connection.
- [ ] Q11. Add a scenario for synthetic DNS address expiry: a long-running process that resolves a host early, such as Cargo fetching Git dependencies before the crates.io index, is denied with `transparent_tcp_mapping_denied` when it connects after the mapping expires.
- [ ] Q12. Add a lifecycle scenario for a Docker daemon restart: OpenShell 0.1.3 marks running sandboxes Error, refuses both stop and start, and only delete recovers, losing `/sandbox`. Environments keep source in Git and treat `/sandbox` as a cache.

### First Slice Tasks

- [x] S1. `veoveo-template-mcp-rust` (`1167397`), a GitHub template repository, passes its check stage, runtime image and in-sandbox gates on macOS and Linux. Skeletons for `veoveo-core` (`2eb7d48`), `veoveo-mcp-time` (`0cd9273`) and `veoveo-service-gateway` (`213e257`) are created from it and pass the same gates on both hosts. `veoveo-deploy` (`35446d9`) starts SurrealDB 3.3.0 from an image pinned by digest.
- [ ] S2. `veoveo-core`: its environment and the slice's crates, plus A1 and A2.
- [ ] S3. `veoveo-mcp-time`: its environment, self-registration, migration and self-verification through the Gateway (A6).
- [ ] S4. `veoveo-service-gateway`: its environment, registration (A3), dial-in (A7) and self-verification with the `modular-mcp` fixture. The first slice leaves out managed-agent token admission, which returns through registration, and the Console's snapshot, stream, artifact summary and cluster authorization endpoints, which return with the Console's repository.
- [ ] S5. `veoveo-deploy`: the SurrealDB Compose file, installation configuration, namespace bindings and component lock, applied by the Gateway environment at first start.
- [ ] S6. The slice is up: every environment reports itself registered and verified on macOS and on the Linux host after a fresh `git pull`.
- [ ] S7. A second Time version registers and one session selects it.

### Cuts During Porting

These cuts happen in the new repositories while code is copied, not in the current repository.

- [ ] P1. Remove the Gateway's compiled module registry and the twelve optional module declarations it links: Reason, Stream, Computers, agents, Workspace, Recording, Map, Time, UAV, Frames, Media and Optimization. Kernel modules stay compiled in, and every other module arrives through registration.
- [ ] P2. Move server-specific Gateway code to its owners: agent runtime authentication, bindings and catalog import; the Console stream over Recording and agent tables; Computers routes; Workspace modules; Speech routes; and the Gateway catalog's direct agent runtime, Computers and Recording dependencies.
- [ ] P3. Make Media use the Artifact client instead of `veoveo-artifact-service`.
- [ ] P4. Remove the Knowledge and Reason dev-dependency cycle.
- [ ] P5. Split `platform/workspace` into a contract and services.
- [ ] P6. Split the agent runtime contract from `agents/runtime`.
- [ ] P7. Add implementation-neutral conformance suites for Artifact, Knowledge, Embedding and Recording.
- [ ] P8. Replace the hand-written server entries in `gateway.json` with registration.
- [ ] P9. Split `deploy/helm/veoveo` into per-component charts and a platform chart.
- [ ] P10. Leave `cargo xtask` and the `testing-support` process supervisor behind; nextest and environment self-verification replace them.
- [ ] P11. Let owners register Audit details the way they register Audit targets, and remove the Computer, Recording, Dictation, LiveView and Artifact variants from `AuditDetail`.
- [ ] P12. Replace the Artifact, Knowledge and Audit sections of the Gateway configuration contract with registration data.
- [ ] P13. Move the Knowledge and Artifact schemas and queries out of `veoveo-platform-store`, and `artifact_service` out of `veoveo-mcp-contract`, when those services are extracted.
- [ ] P14. Move each server's contract-document conformance check into that server's repository; core provides the check as a library.
- [ ] P15. Remove `mcp/apps-extension/browser` and its `image-asset-inputs` metadata from `veoveo-core`; the browser runtime and its Node tests move to `veoveo-sdk-typescript` when the App-shipping servers are extracted.

### Extraction

- [ ] E1. Tag `veoveo-core` `v0.1.0` once the first slice is up.
- [ ] E2. Bring each further component in with its own environment, one at a time, after the first slice is up.
- [ ] E3. Extract the leaf servers: Datasheet, DuckDB, Timeseries, Chart, Map, Frames and Media.
- [ ] E4. Extract the services: Artifact, Knowledge, Recording, Agents and Computers.
- [ ] E5. Extract the GPU servers, runtimes and showcases.
- [ ] E6. Publish `veoveo-template-installation` and move the Bioma reference to `BiomaAI/veoveo-bioma`.

### Documentation

- [ ] W1. Replace `FORK_DEVELOPMENT.md` with installation-template and component-fork guidance.
- [ ] W2. Turn `CODEMAP.md` into an organization map in `veoveo-docs`.
- [ ] W3. Update the AGENTS.md naming, repository command and CI sections.
