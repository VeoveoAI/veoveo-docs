# Lore And OpenShell Integration

Status: accepted infrastructure direction for design and qualification, revised on
2026-10-18. Lore is the source and revision authority. OpenShell owns execution
and runtime access for factory work and deployed services. Veoveo connects source
revisions to checks, service composition and promotion. The local hard cut and first
native Lore/private MCP path, Hub → Time integration, prepared Time factory
build/deployment, private Artifact integration and the private fake-provider Media
slice pass local acceptance, including the final bounded OpenCode MiMo client
scenario. A separately authorized real WaveSpeed polling one-shot also passes,
producing a decoded image through the same native path. The next authorized goal
is the reference Linux deployment and a real signed WaveSpeed webhook, followed
by bounded OpenCode MiMo acceptance; none of those new gates has passed yet. Other
models, general composition and GPU/CUDA remain separate. See
[execution status](OPENSHELL_HARDCUT_PLAN.md).

The [platform visual guide](diagrams/veoveo-platform.html#platform) shows the current
platform with Lore, OpenShell, Hub, Time, private Artifact and Media. Its other
views explain the credential path and Media's qualified private workflow with
those existing services. Update it alongside this document after every major architecture change;
keep planned paths visibly distinct from qualified ones.

Desktop is no longer an acceptance requirement. The locally qualified path uses
[direct IdP-issued Lore credentials with native OpenShell renewal](LORE_DIRECT_OIDC_PLAN.md).
The Desktop authentication adapter, signer dependencies and Desktop ingress are
retired; durable data and private recovery state are preserved. External issuers
and interactive human Lore login require separate qualification.

This direction refines the [Infrastructure Candidate](INFRASTRUCTURE_CANDIDATE.md).
Extension builds and maintained VeoveoAI forks of Lore or OpenShell are permitted
where a verified gap requires them. Preserve each project's extension contracts,
security boundaries, source formats and ordinary operations.

## Product Workflow

A user starts an authorized factory workspace on a Lore branch. OpenShell creates
the sandbox from an approved native template; the agent edits, builds, tests and
uses ordinary Lore commands. Pushing the branch starts checks of that exact
revision in a fresh OpenShell sandbox. Successful checks produce immutable
artifacts eligible for a private preview or promotion. Environment branches compose
those artifacts and define resource ownership; deletion removes the preview's owned
resources according to retention and active-Task policy.

The normal user interface is Lore, OpenShell's existing connection and inspection
tools, and Veoveo's Hub. Use existing logs and diagnostics. A custom factory
console, logging service, runtime API or infrastructure language is not a prerequisite.

## Native Responsibilities

OpenShell owns every capability it already implements. Veoveo must not duplicate
it or require another service for the same job. Use native schemas/SDKs first,
extensions second, and narrow upstreamable changes for verified platform gaps.
The accepted factory-only Helm/Flux split is superseded by this execution model.

| Need | Reuse | Remaining integration |
|---|---|---|
| Source and immutable revisions | Lore repositories, grants, hooks and notifications | Approved source-to-workload bindings |
| Authoring, builds, checks and deployed services | OpenShell sandboxes, templates, commands, lifecycle and restarts | Exact source/artifact provenance and environment selection |
| Service reachability | Authenticated native TCP forwarding to loopback services | MCP application authentication, catalog/route selection and health acceptance |
| Runtime/GPU/storage attachment | Native Docker driver, resource fields and external-resource admission | Host configuration and approved resource references |
| Credentials and model/API access | Native profiles, attachments, refresh and credential driver | Lore lifecycle, Hub application credentials, management renewal and factory access qualified locally; wider issuer adoption remains separate |
| Policy changes and inspection | Native policies, advisor, prover, middleware/interceptors | Product-specific admission only; no duplicate approval engine |
| Sessions, terminals and diagnostics | Native SDK/CLI/TUI and observation APIs | Links to source/check results, no replacement relay or logger |
| Factory user access | Native OIDC and workspace membership | Mapping approved source authority to runtime access |
| Human identity | Configured OAuth/OIDC provider | Application subject/permission mapping |
| MCP application behavior | Existing Veoveo Hub and service contracts | Composition, discovery, narrowed delegation and Task authority |

Native [templates](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/templates)
carry workload settings. The [SDK](https://docs.nvidia.com/openshell/v0.1.4/sdk/rust)
provides management and connections. Keep source links as coordination state;
OpenShell remains authoritative for runtime inventory, status and access.

Remove Kubernetes, k3d, K3s, Helm and Flux entirely from this candidate, including
optional installation paths. Select OpenShell's native Docker driver on Mac and
Linux. No standalone factory service, broker, console or general CI platform is
required for the first integration. Place the small source/revision adapter in an
existing trusted process unless a concrete deployment need justifies separation.

## Rust Interfaces And Component Flow

Lore's core library, server and CLI are Rust, as are OpenShell's core runtime and
gateway. Use their existing Rust client interfaces in the trusted Veoveo integration.
Rust is the implementation language; authenticated protocols still separate the
services. Linking a client library does not embed either server, bypass authorization
or require access to its database. Agents continue to use the ordinary Lore CLI.

| Boundary | Selected interface |
|---|---|
| Veoveo to OpenShell | Official async `openshell-sdk`, with explicit workspace and HTTPS/OIDC configuration; generated Tonic clients through `raw_grpc_fresh()` for RPCs such as `ForwardTcp` |
| Veoveo to Lore | Version-pinned Rust client surfaces: `lore` for high-level repository operations and `lore-proto` generated clients with native transport/authentication for remote RPCs |
| Lore to revision integration | Native branch notifications as wakeups, followed by authoritative reads; periodic reconciliation repairs missed events |
| Agent to Lore | Maintained Lore CLI with narrow opaque-token/local-identity authentication patches over the qualified supervisor-mediated path |
| Veoveo Hub to deployed MCP service | Native authenticated OpenShell forwarding, carrying MCP requests with Veoveo's narrowed application token |

OpenShell documents consuming its [Rust SDK](https://docs.nvidia.com/openshell/v0.1.4/sdk/rust)
from source at the gateway's release tag. Reuse a client/channel per gateway. Configure
the credential path explicitly: native provider renewal of an opaque reference or
a supported SDK token source/refresher, as appropriate. A captured real bearer does
not renew itself. Prove the actual renewal owner across expiry, a fresh connection
and long-lived streams. The
[`lore` library](https://github.com/EpicGames/lore/blob/v0.10.1/lore/src/lib.rs)
exposes typed operations with event callbacks, including
[remote repository information](https://github.com/EpicGames/lore/blob/v0.10.1/lore/src/repository.rs)
and [notifications](https://github.com/EpicGames/lore/blob/v0.10.1/lore/src/notification.rs).
[`lore-proto`](https://github.com/EpicGames/lore/blob/v0.10.1/lore-proto/src/lib.rs)
contains generated RPC clients. These are source dependencies, not a claim of a
stable standalone Cargo SDK: Lore is pre-1.0 and its `lore` crate is `publish = false`.
Pin compatible versions and qualify the exact operations used. Prefer the high-level
client where it owns required version-control semantics; do not reconstruct those
semantics from raw storage RPCs or parse CLI output in the control plane.

The end-to-end flow is:

1. A user signs in through the installation's identity provider. OpenShell authorizes
   factory access through native workspace membership; Veoveo authorizes application
   context and service access. Tokens have separate intended audiences.
2. OpenShell starts an author sandbox. The agent edits source/configuration and pushes
   with Lore. Its supervisor mediates permitted egress and holds provider credentials
   outside the workload. The local Lore gRPC path is qualified as recorded in the
   execution checklist; other deployments require their own qualification.
3. A Lore notification wakes the small revision integration. It reads the exact revision
   and approved environment definition, then asks OpenShell to run fresh checks/builds.
   Trusted publication records the resulting immutable image digest and check evidence.
4. The integration requests a service sandbox through the same OpenShell SDK and Docker
   driver. OpenShell owns startup, supervision and restarts. After application readiness,
   Veoveo makes that immutable version available in the authorized composition.
5. An MCP client calls the Veoveo Hub with its execution context. The Hub resolves
   the selected service version, checks application permission and opens authenticated
   OpenShell forwarding to that service. The service receives a narrowed application
   token. Neither the user nor agent receives the Hub's OpenShell management token.
6. Later pushes repeat the same path; promotion selects a tested artifact. Branch deletion
   triggers an authoritative ownership check, Task drain/retention decisions and native
   OpenShell deletion of owned workloads. Inherited services and bootstrap remain.

Only the source/revision-to-workload mapping and Veoveo application semantics are
custom. Runtime state, credential custody, execution, forwarding, restarts, policy
and diagnostics retain their native OpenShell owners. No new Rust SDK, broker or
deployment service is required to connect these existing interfaces.

## Capability Evidence And Remaining Gaps

The reviewed v0.1.4 API has `SandboxSpec.command`, `restart_policy`, native service
exposures and workspace templates. Restart policies are `Never`, `OnFailure` and
`Always`; omission means `Never`. See
[`openshell.proto`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/proto/openshell.proto)
and [restart handling](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/compute/mod.rs).
A long-running service is therefore already a native workload, not a feature that
requires a separate deployment controller or a Veoveo process supervisor.

The public API inspected does not establish a deployment-group controller with
replica counts, autoscaling or coordinated rolling updates. Start with one sandbox
per owned service version. Create a new immutable version, qualify it and change
composition selection; do not claim template edits update existing sandboxes.
If fleet orchestration becomes required, first evaluate an OpenShell extension or
upstream contribution. Do not silently recreate it in Veoveo or restore Flux.

Native runtime `Ready` is distinct from application readiness. Use current service
registration and an application probe before selecting a version. The documented
lifecycle also has a recovery gap: a gateway crash while owning a driver operation
can leave the record pending with no resolution API. Qualify crash recovery and
close a proven gap in OpenShell before depending on it for durable service hosting.
Do not add a competing Veoveo restart/watchdog controller.

OpenShell attaches existing admitted volumes; that does not establish database
replication, backup orchestration or an arbitrary infrastructure provisioner.
PostgreSQL and SeaweedFS remain data services. Prefer running compatible instances
as native workloads with protected storage, and qualify their protocols/persistence
before replacing their existing bootstrap. Run compatible infrastructure through
OpenShell too, with operator-owned workspaces and retained volumes. Local Keycloak,
its dedicated database and HTTPS endpoint remain the minimal external bootstrap:
OpenShell initializes its OIDC issuer before workload recovery, so hosting the only
issuer inside that same gateway creates a cold-start loop. External Entra/customer
issuers need no local Keycloak stack. Root OpenShell/Lore/identity/storage recovery
remains independent of disposable environment branches.

## Workspaces And Runtime Placement

A factory sandbox is one active authoring workspace or independently isolated job.
It normally has one primary repository and can include additional explicitly
authorized repositories. Build/check workers are separate from author sandboxes;
verification starts from the recorded revision, not the author's mutable directory.

An OpenShell workspace is an access grouping containing sandboxes, providers and
templates. A Veoveo execution context selects service versions. Map them explicitly:
they are not interchangeable identifiers. Native OpenShell workspace users can
operate resources within their membership boundary, so private work must not rely
on sandbox names to hide it from unrelated members of the same OpenShell workspace.

Use OpenShell's native Docker driver on Mac and Linux, including the initial probes.
Request Linux GPU access through native NVIDIA CDI support. This is the single
runtime path in the plan; no cluster backend or alternate launcher is in scope.

The Docker driver uses a separate trusted supervisor and a fenced workload. It is
not equivalent to the current bare Compose agent containers. Qualify the driver's
host prerequisites and actual boundary, including persistence and CUDA. Container
and GPU-driver isolation do not imply a VM boundary. Qualify this selected boundary
against the threat model before migration; do not weaken it to make a probe pass.

## One Service Deployment Path

Every managed MCP service version runs as an OpenShell service sandbox. Use its
runtime image digest, canonical command, native resource request, approved policy,
provider attachments and authenticated forwarding. Author/build/check sandboxes use the
same execution system with different workload definitions. Published services stay
independent of their author's workspace lifetime.

The path is Lore revision, fresh OpenShell checks/build, verified artifact digest,
OpenShell service sandbox and endpoint, then Veoveo application routing. Promotion
selects tested artifacts in any authorized environment through that same path.
There is no OpenShell-only preview mode alongside a Helm/Flux release mode.

Use native authenticated `ForwardTcp` for private MCP connectivity from the
trusted Veoveo Hub to each sandbox's loopback listener. The v0.1.4 RPC requires
bearer authentication, `sandbox:write` scope and workspace membership, and resolves
the target sandbox under that principal before opening the supervisor relay. See
[`ForwardTcp`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/proto/openshell.proto)
and [its handler](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/grpc/sandbox.rs).
Use the native SDK/raw client transport; add a generic SDK stream adapter if needed,
not a new relay service. Keep its management credential in the trusted Hub,
outside factories, build/check jobs and MCP service workloads.
The current scope is broader than forward-only; qualify least-privilege workspace
placement and add a native capability if finer transport authority is required.

Do not publish an unauthenticated service exposure for these private MCP workloads.
OpenShell's HTTP service URLs bypass control-plane OIDC. Requiring agent-authored
application code alone to authenticate those URLs would not establish a trusted
private boundary. Native authenticated forwarding is the single selected MCP
transport. Application requests still carry Veoveo's short-lived, audience-bound,
permission-narrowed tokens, never the user's general identity or OpenShell token.

Qualify streaming, cancellation, limits, credential expiry, workspace revocation
and reconnection with the actual SDK. The native TCP relay can carry protocols
without parsing them; it does not inject or protect credentials inside Lore gRPC.
The separate browser-facing service implementation uses HTTP/1.1 upstream, so its
existence also does not close that gap. See
[service routing](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/service_routing.rs).
Use a native enhancement for an actual transport limit rather than another launcher.
Retire replaced paths after qualification.

Runtime restarts remain OpenShell-owned. Version promotion and Task drain are
application decisions: the integration changes the selected revision only after
checks and application readiness; pinned Tasks keep their version. Source changes
cannot grant providers, host mounts, administrative credentials or a weaker boundary.

## Planned Adoption Of Existing Veoveo Components

This describes the application integration sequence. Hub/Time, the prepared Time
factory pass, private Artifact and private fake-provider Media now have local
acceptance recorded in the execution checklist.
The [visual guide's Platform now view](diagrams/veoveo-platform.html#platform)
shows the qualified deployment; its [Next integration view](diagrams/veoveo-platform.html#next)
shows Media's qualified private use of the existing Hub and Artifact. Hub plus Time were
qualified first, followed by a build-only factory task from a known-good Time Lore
revision and then private Artifact. This is an unused local Mac installation: replace and restart local
services directly. Production continuity, parallel deployments and rollout
automation are not prerequisites. Select explicit runtime images; automatic
Lore-to-image deployment remains later work.

| Existing component | Use in this integration | Placement and status |
|---|---|---|
| `veoveo-hub` | MCP entry point, dynamic server registration/catalog, caller permissions, narrowed forwarded identity and server-to-server delegation | Qualified locally: trusted OpenShell service sandbox in an operator-owned control workspace; its OpenShell client can forward only into the approved service workspaces |
| `veoveo-mcp-time` | Resolve/convert time, expand a schedule as a durable Task, create an event and receive its resource updates | Qualified locally: first private MCP service sandbox, port 8800 and `/time/mcp`; persistent `/var/lib/veoveo/time` for registration identity and authority files |
| `veoveo-mcp-artifact` | Upload, verify, list and download tenant-owned files; enforce artifact access | Qualified locally: second private MCP service sandbox, port 8801 and `/artifact/mcp`; persistent registration key, PostgreSQL metadata and SeaweedFS/S3 bytes |
| `veoveo-mcp-media` | Discover models and run generation as a durable Task; store outputs through Artifact and record usage | Qualified locally: third private MCP service sandbox, port 8802 and `/media/mcp`; persistent registration key, PostgreSQL run state and a separate native fake-provider fixture; one real WaveSpeed polling run also qualifies, while public webhooks and other models remain later work |
| `veoveo-core` | Database kernel, identity, durable Tasks, audit and usage | Libraries inside the Hub/services; their durable state remains in the installation PostgreSQL database |
| `veoveo-hub-sdk` | MCP hosting/client, registration, forwarded-token checks, Task adapter, subscriptions and delegated calls | Libraries inside the Hub/services; its existing CLI is an initial application client |
| `veoveo-template-installation` | Assemble images, native workload/policy/provider definitions, approved endpoints and volumes | Existing installation repository; no second deployment manifest or component lock |

Each MCP service runs independently of factories and build/check jobs. The Hub
is trusted control code, not agent-authored code. Only that trusted Hub receives
the native OpenShell management authority needed for `ForwardTcp`; MCP services and
author/build jobs do not. Select explicit workspace IDs and qualify the actual
native permission boundary, since current forwarding authority includes
`sandbox:write`. The Hub's own restart, volumes and readiness use OpenShell's
native workload lifecycle. Its application endpoint must remain available to
services for registration and delegation; no service needs to manage OpenShell.

PostgreSQL and SeaweedFS initially remain in their existing trusted installation
placement. Admit only the service connections they need. Move these durable services
under OpenShell only after volume access and backup/restore qualification. Local
Keycloak, its dedicated database and HTTPS bootstrap remain outside OpenShell.
Lore's current service and authoring path stay as already qualified during this slice.

### Hub And SDK Naming And Ownership

Use these names throughout the application integration. Local checkouts use the
new names. Core, SDK, Time, Artifact and the MCP template have committed preparation.
Hub, Time's acceptance changes, Media's rename and native installation preparation
are checked, committed and published. The documentation records qualification
separately from source publication. Exact Git/Lore correspondence, factory preflight,
the bounded model build and Time deployment from that revision now pass locally.
The execution checklist records source revisions, publication status and open gates.
Links below point to the renamed local checkouts.

The names describe component roles: the Hub connects services, and the Hub SDK
implements the shared contracts for participating services and clients. MCP remains
explicit in current protocol contracts and transport modules. Future protocol support
can follow concrete integration needs; this rename preserves the current behavior.

| Previous repository | Target repository and primary package | Responsibility |
|---|---|---|
| `veoveo-service-gateway` | `veoveo-hub` | Service registration/catalog, application authorization, MCP routing, narrowed forwarded identity and server-to-server delegation |
| `veoveo-sdk-rust` | `veoveo-hub-sdk` | Shared MCP service contracts, hosting/client implementations, registration, Tasks adapter and delegated calls |

The Hub connects services through their declared contracts. The SDK implements
the shared mechanics; each service owns its domain contract. Core supplies the
database kernel, durable Tasks, audit and usage. OpenShell owns workload lifecycle,
sandbox boundaries and credential custody. Lore owns source and repository access.

**Complete the naming change across source and documentation.** Rename the
repositories, owned packages/crates/binaries and SDK companion crates consistently;
use `veoveo-hub-sdk-cli`, `veoveo-hub-sdk-fixture` and
`veoveo-hub-sdk-conformance` for the existing companions. Update consumers, Rust
imports, Git dependency URLs/pins, Cargo locks, build/image references,
installation configuration, tests and documentation. Remove the Veoveo Gateway
name and its application-owned `Gateway`/`gateway` identifiers, including owned
configuration, schema, audit and telemetry names, in favor of Hub naming.
Change shared declarations in their owning repository before updating consumers.
Use the existing local setup/reset path for changed stored names; preserve Lore
repositories and unrelated durable data. Keep native OpenShell gateway references
and standard protocol terminology accurate. Keep standard MCP/OAuth routes and
fields intact. Use direct replacements, without old-name aliases, wrappers,
duplicate manifests or compatibility paths. Sweep all active repositories and
docs for stale references, including this plan's source links and visual guide.

**Remove the superseded Lore credential issuer.** Hub `00a7e7b` deletes the former
`src/bin/gateway/lore_tokens.rs`, its
Lore token dispatch and `src/control_plane/lore.rs`; no renamed `lore_tokens.rs`
exists in the inspected source. Resource resolution, grants, validation, tests,
fixtures and docs were reviewed with the combined diff. Obsolete Hub-issued Lore
client/key generation in `src/local.rs` and its binary CLI options are removed. Preserve installation
`identity/configure-lore`, which provisions direct-IdP Lore clients and providers.
The cleanup now rejects retired `lore` configuration and adds negative issuance
regressions; the fresh Hub component gate passed as recorded in the execution
checklist. Do not recreate deleted
modules to satisfy stale links or instructions. The installation's IdP issues Lore grants directly;
native OpenShell providers renew and inject them; Lore validates them through
native OIDC discovery/JWKS.

Retain the Hub's MCP application authentication, registration, per-request
forwarded-token signing and narrowed delegation/token exchange. Keep generic
OAuth/JWKS machinery required by those flows. The direct-IdP Lore configuration,
existing Lore push hook and OpenShell custody/renewal remain in their current owners.

Done when builds and focused checks pass under the new names, every active consumer
resolves the renamed dependencies, Veoveo-owned old names and Lore-issuer paths are
gone, and MCP registration, forwarded identity and delegation still work. Verify
that a Lore resource request cannot obtain a token from the Hub and that direct-IdP
Lore access remains configured. Use focused component regressions and the planned
Hub/Time integration checks; record the actual checks in the execution checklist.

### First Factory Task: Build Prepared Time Source

The main development session owns Hub/Time integration, source fixes, component
checks and environment preparation. Complete those before invoking the factory's
model. The first factory task is to clone the supplied Lore revision, build Time
and report the result. It does not require a feature change or autonomous debugging.
Keeping edits out of this assignment is a cost/scope decision, not a new permission
restriction; preserve ordinary Lore grants and the existing push hook.

1. **Prepare and verify Hub + Time.** Qualify the connections and Time
   operations below using deterministic SDK/CLI calls. Fix source, configuration,
   registration, dependency and network errors in the main development session.
   Keep using the direct IdP Lore path; older component README examples of Compose
   routing or Hub-issued Lore credentials are not installation instructions
   for this integration.
2. **Put the prepared source in Lore and Git.** Commit and push the tested source
   to the existing Git remote, then seed Time's Lore repository from that exact
   tracked tree. Verify paths, bytes, executable bits and symlinks. Keep the VCS
   working directories separate and exclude their metadata, local secrets and
   build output. Record the Git commit and Lore revision in the execution
   checklist's concise acceptance entry. No source modification is needed merely
   to demonstrate the first build.
3. **Prepare the factory without spending model tokens.** Reuse Time's Dockerfile
   `dev` stage plus the shared installation's Lore/agent layer. It owns the Rust
   toolchain, PostgreSQL test tools and component checks. Configure dependency
   access/caches, inference, the approved Hub MCP endpoint and credentials
   through the existing OpenShell mechanisms. Keep the existing two-step smoke
   agent intact; installation now defines a separate four-step `prepared-time`
   agent with bounded output and MCP integrations denied. Validate the installed
   shell timeout before invoking the model. Manually preflight a
   fresh Lore clone and the exact build in the same image/policy/provider setup.
   Use the SDK client from the factory network path to verify Hub discovery
   and a Time call; the model need not explore or repair MCP integration.
4. **Run the bounded model task.** Supply the immutable Lore revision, clone
   instructions, working directory and
   `cargo build --locked --release --bin veoveo-mcp-time`. Ask for the source
   revision, command, exit status and `target/release/veoveo-mcp-time` output path.
   Build source in this run; dependency caches are fine, a supplied prebuilt Time
   binary is not proof. On failure, return the command output to the main
   development session. Do not ask the model to diagnose, edit, change dependency
   pins or retry speculative fixes. Check that the source tree remains unchanged.
5. **Use the result locally.** The operator builds Time's runtime image from the
   same Lore tree using its existing Dockerfile on the Mac, replaces the local
   OpenShell service and verifies readiness plus a Hub-routed Time call.
   Keep image construction and deployment outside the model's assignment; no
   Docker socket or new CI/deployment controller is needed in the factory.

Done when the factory builds the prepared Time revision from Lore, the corresponding
local service works through the Hub, and the matching source is pushed to Git.
The service runtime and the build factory remain separate workloads.

Git stays in parallel through ordinary source handoffs, not a permanent sync
adapter. For subsequent Lore-authored work, copy an exact revision into a separate
Git checkout, verify additions/deletions/content/modes/symlinks, commit with the
Lore revision in the message and push. Edit through one source path per task and
reconcile any intervening Git changes before continuing. A pushed Git tree protects
the source; it does not back up Lore's repository metadata or replace its data
backup. Cargo still resolves Core, SDK and other dependencies from pinned Git
revisions. Keep those pins for this first pass; publish a changed dependency to Git
before updating a consumer. Removing that dependency on Git is a separate decision.

### Implementation Decisions For The Prepared Time Pass

These decisions follow the current code, not just the desired topology. Read the
linked implementations and each repository's `AGENTS.md` before changing them.
Implementation decisions and measured acceptance are distinguished below. The
execution checklist records fresh component checks, deployed Hub/Time acceptance,
exact Git/Lore correspondence, and the successful bounded factory build. Do not turn
an unproven connection into a broader architecture change to make the checklist pass.

| Concern | Existing code to reuse | Decision for this pass |
|---|---|---|
| Factory image | [installation factory Dockerfile](../veoveo-template-installation/factory/Dockerfile), [Time Dockerfile](../veoveo-mcp-time/Dockerfile) | The shared factory already accepts `ARG BASE`. Build Time's `dev` target and use that image as `BASE`; retain the existing Lore/CA/agent additions. Do not duplicate Time's toolchain or create another universal factory image. |
| Factory filesystem | [native factory policy](../veoveo-template-installation/openshell/factory.yaml), [Time shell profile](../veoveo-mcp-time/env/profile.d/rust.sh), [offline SQL metadata](../veoveo-mcp-time/.cargo/config.toml) | `/usr` is read-only, but Time defaults `CARGO_HOME` to `/usr/local/cargo`. Use an explicit writable cache under `/sandbox`, set it after any login-shell profile, and use a fresh target directory for the proof. Keep the installed toolchain read-only. SQLX_OFFLINE already permits this release build without a running database. |
| Factory MCP client | [SDK CLI access](../veoveo-hub-sdk/crates/veoveo-hub-sdk-cli/src/main.rs), [CLI connection](../veoveo-hub-sdk/crates/veoveo-hub-sdk-cli/src/hub.rs), [SDK bearer sources](../veoveo-hub-sdk/crates/veoveo-hub-sdk/src/client.rs) | The committed CLI supports `--bearer-env` / `VEOVEO_CLI_BEARER_ENV` through `HubAuthentication::BearerFromEnvironment`, `StaticBearer` and `HubClient`; caller keys are conditional. Reuse this input and qualify it from the actual factory network path. In the factory, supply only the native OpenShell opaque reference. No private caller key, token fetcher or refresh worker belongs there. |
| Application admission | [JWT verification](../veoveo-hub/crates/veoveo-hub/src/auth/access_token.rs), [claim shape](../veoveo-hub/crates/veoveo-hub/src/auth/claims.rs), [current client authority](../veoveo-hub/crates/veoveo-hub/src/oauth_clients.rs), [context membership](../veoveo-hub/crates/veoveo-hub/src/catalog.rs) | Configure the local IdP and existing Hub catalog to satisfy this contract. Generic OIDC login or a valid Lore token does not establish application access. Preserve the verifier and authority checks. |
| Private MCP transport | [per-server HTTP pool](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_http.rs), [request authorization](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_authorized_http.rs), [discovery recovery](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_connection.rs), [native forwarding proof](../veoveo-qualify-openshell/src/bin/first-path.rs) | Hub `00a7e7b` adds [typed bindings](../veoveo-hub/crates/veoveo-hub/src/control_plane/native_upstreams.rs) and [in-process Unix/native transport](../veoveo-hub/crates/veoveo-hub/src/mcp/native_upstreams.rs), wired into the existing reqwest pool. Deployed forwarding, renewal, subscriptions, reconnect, Task cancellation and coordinated restart checks pass. The echo fixture alone does not qualify this client. |
| Service startup | [Time registration](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/registration.rs), [startup](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/mod.rs), [configuration](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/config.rs), [SDK registration](../veoveo-hub-sdk/crates/veoveo-hub-sdk/src/registration/client.rs) | Start PostgreSQL, then Hub, then Time. Time registers before serving, receives its database login and token trust from registration, migrates its own schema and holds a process-instance lock. Preserve this lifecycle instead of inventing a heartbeat, database credential distribution API or registration controller. |
| Acceptance | [Time live acceptance](../veoveo-mcp-time/crates/veoveo-mcp-time/tests/acceptance.rs), [Hub transport tests](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_connection/tests.rs) | Time `90eabf9` preserves behavior assertions, selects member/admin SDK static bearers through environment-variable names and adds coordinated restart probes. The trusted qualification runner can hold both references; the author factory gets only its member reference. No caller signing keys are copied. Component checks, deployed Hub/Time acceptance and the factory path preflight pass. Keep domain tests in Time and generic transport tests in Hub. |

**Application identity must be configured before diagnosing MCP transport.** The
Hub requires `typ=at+jwt`, the selected profile's audience and scopes, `client_id`
and the existing namespaced principal, Work Context and invocation-mode claims.
The catalog must contain the OAuth client, allowed resource/scopes, tenant/context
and membership. For a non-delegated machine caller use the existing `automated`
mode: service principal, subject equal to client ID, matching tenant, and no
initiator/delegation claims. These are current Hub requirements. Configure
Keycloak's supported token settings/mappers and the existing catalog; prove
admission with one deterministic request. OIDC identity-provider claim mapping
does not automatically supply this access-token contract. Keep Lore's issuer and
grants independent; the Hub's existing application and forwarded-token signing
responsibilities do not make it a Lore issuer.

The external authorization server has no Hub access-token signing fields. Its
client registrations describe the actual confidential authentication method used
by the native provider (`client_secret_post` locally); Hub does not need their
secrets or caller keys to admit an already verified token. The validation correction
retains hosted-client requirements and all resource, scope and context checks.
Local issuance additionally requires Hub's own issuer and token endpoint even if
stale signing configuration remains. These source changes require their component
checks and actual IdP admission before this integration is accepted.

**Review the drafted HTTP machinery over native forwarding.** The pinned reqwest 0.13.5
supports [`ClientBuilder::unix_socket`](https://docs.rs/reqwest/0.13.5/reqwest/struct.ClientBuilder.html#method.unix_socket),
which retains the request URI and uses TLS over the socket for an HTTPS URI.
The current draft uses a private, process-owned Unix listener per approved endpoint: each accepted
connection opens a fresh authenticated native `ForwardTcp` stream to the bound
workspace/sandbox/loopback port and pumps bytes in both directions with bounded
buffers and cancellation. Configure that server's existing reqwest client to use
the socket. This is a transport module in Hub, not a daemon, public port,
new MCP implementation or upstream patch. The existing `connector_layer` API wraps
reqwest's connector; it is not an arbitrary raw-stream injection API.

The draft binding is in Hub's typed configuration, to be populated by the
installation, keyed by the admitted logical endpoint rather than hardcoded Time
knowledge. Native transport configuration is fixed at startup. The reviewed
correction rejects changes before durable catalog publication and again at
replacement; restart Hub to change placement. Keep the registered URI, Host and token audience intact; the service
still arrives through registration. A missing binding fails explicitly. Preserve
per-server connection pooling, disposal on transport failure, request-specific
tokens, streaming response bodies and the existing one retry of read-only discovery.
Do not add a total timeout to long-lived subscriptions or replay a mutating tool
request after an ambiguous failure. Close the socket/stream tasks with their owner
and recreate connections after service replacement. Prove ordinary calls, streamed
updates and reconnect with this small module before wiring the rest of the stack.
If it cannot meet those requirements, report the concrete limitation before
replacing the HTTP stack or changing Lore/OpenShell internals.

**Qualify the management credential path explicitly.** The draft reads its bearer
environment variable once and constructs `AuthConfig::oidc(bearer)`, a static SDK
credential without configured expiry/refresher. Calling `raw_grpc_fresh()` alone
does not make that credential renew. The intended native opaque-reference/provider
path must be proved from the deployed Hub across real expiry and a fresh forwarding
connection. Keep custody and renewal native; do not add a token worker, assume an
environment reread, or transfer management credentials into Time or the factory.
Resolve any demonstrated native limitation with the coordinator before changing
component responsibilities.

The installation's [Hub/Time preparation](../veoveo-template-installation/openshell/HUB_TIME.md)
uses the native workload CA at `/run/openshell-supervisor-ca/material/ca.crt`
for Hub's pinned SDK connection. That connection sees the supervisor's TLS
interception certificate. The supervisor separately verifies the upstream gateway
with its driver-owned CA at the pinned destination. Copying the original gateway
CA into Hub would not establish trust in the intercepted connection. Workload CA
paths are provisioned read-only by OpenShell; no authored broad `/run` grant is needed.


**Distinguish application ingress from private service access.** For Hub's
application origin, qualify native `ServiceExposure` with `BearerPassthrough`,
TLS/host routing and Hub's own application authentication. Use that origin for
factory calls and Time's return traffic. Establish consistent DNS resolution, request
authority/Host, service route and certificate-name/CA verification from those actual
sandboxes. The cleanup removes the obsolete Compose/Envoy Hub application routes
and container reexec helper from source; bootstrap configuration validation passed.
The orphaned `vv-egress` proxy and its setup were also removed; verified Keycloak
discovery remains healthy through the retained identity HTTPS bootstrap. These
removals do not establish native application ingress. Hub uses native service
ingress; private Time traffic uses authenticated native forwarding.
The native exposure relay deliberately sends `Host: 127.0.0.1:8080` to Hub.
This loopback-bound deployment therefore selects Hub's existing
`--allow-loopback-hosts` option. It admits the three loopback names as well as the
configured public authority; the listener remains `127.0.0.1:8080`, and the public
issuer, metadata URLs and token audiences remain fixed to the native HTTPS origin.
External DNS, request authority and TLS checks still apply before that relay.
Time's byte-preserving private `ForwardTcp` path retains `time.internal:8800` and
keeps its loopback-host option disabled. Verified Hub metadata and unauthenticated
MCP admission now pass, and the initial Time sandbox has registered and connected
to PostgreSQL. Deployed client checks pass member calls, permission checks, event
notifications and reconnect. The demonstrated native Task-inspection gap is closed
by the narrow extension described below; Task completion/cancellation and
coordinated restart recovery now pass. Native management renewal passed through original token expiry with
a fresh forwarding connection and unchanged Hub process; see the checklist.
The 2026-10-17 investigation demonstrated that generated `.openshell.localhost`
service names lacked a sandbox DNS route, while a host-alias/Host override correctly
fails authority enforcement. The approved narrow native extension resolves one
label beneath that reserved suffix to the existing trusted HTTPS gateway socket,
only when the supervisor endpoint agrees with the backend IP and requested port.
Policy and executable admission, TLS verification and request authority remain
unchanged. Unsupported coordinates fail closed; custom domains and separate gRPC
and ingress ports are outside this extension. It needs no new DNS infrastructure
or protobuf metadata. The extension is implemented in OpenShell `fce7a790` and
passes the macOS and Linux ARM64 network library suites and macOS strict Clippy.
The gateway selects its supervisor image at startup and reconciles supervisor
containers for all existing running sandboxes. A native sandbox stop/start also
recreates its supervisor using that selection while preserving workload identity
and volumes. Verify actual container image IDs; a gateway restart can update more
than the two application sandboxes. The existing
`enable_loopback_service_http = false` gateway setting advertises HTTPS service
URLs. Verified gateway health, login, inventory and IdP discovery passed after
restart. Fresh disposable sandboxes now pass verified HTTPS MCP calls, authority
and policy denials, application credential rejection and exposure deletion/recreation
with new connections. See the execution checklist for image identities and exact
measurements. This establishes native service ingress, not deployed Hub/Time
application behavior, management credential renewal or active-application restart.
The native
[service HTTP route](../openshell/crates/openshell-server/src/http.rs) and
[bearer handling](../openshell/crates/openshell-server/src/service_routing.rs)
do not provide the workspace authorization of `ForwardTcp`; do not substitute
an exposed Time URL for the private MCP connection. Bind the registration bootstrap
secret only to its initial registration request through the native provider path.
Preserve the SDK's subsequent registration management credentials. Time's own
signing key and registration-issued database password remain with the trusted Time
service, never with the author factory. Permit its real PostgreSQL connection,
including session locks and LISTEN/NOTIFY; an HTTP credential proxy is not a
PostgreSQL transport. Mount Time's state for its runtime UID 10001; the author
factory uses UID 1000 and does not receive that state directory.

Local Keycloak remains the independent HTTPS bootstrap. Its canonical issuer
`https://auth.localhost:8443/realms/veoveo` has no supported sandbox DNS mapping.
The installation correction adds the native `host.openshell.internal` name to
the existing identity certificate and admits only GET on the realm's exact public
JWKS path through that alias. Hub explicitly configures this remote JWKS URL;
issuer and token endpoint stay canonical. URL, SNI and Host agree, and the existing
supervisor installation CA verifies the upstream. The certificate renewal and
isolated route tests passed; only the existing identity listener was recreated.
Live verified discovery and exact alias JWKS GET return 200, while other alias
methods and routes return 403. Real IdP application admission now passes through
the deployed Hub. These checks do not measure live IdP signing-key rotation.

**Inspect official Task extensions in the native policy layer.** Deployed tests
show that the selected core-only inspector rejects `tasks/get` and `tasks/cancel`
before Hub, although the
[versioned Tasks extension](https://github.com/modelcontextprotocol/ext-tasks/blob/main/specification/2026-07-28/tasks.md)
defines those requests and `tasks/update`. The approved correction recognizes only
these three client requests at `2026-07-28` through OpenShell's existing extension
classification and exact method allow rules. It preserves the core revision table,
typed Task parameters, common protocol/capability metadata validation, and matching
`Mcp-Method` / `Mcp-Name` headers, with the latter carrying `taskId`.
`allow_all_known_mcp_methods` remains core-only. Creation/subscription capability
negotiation remains the application's responsibility. The change is committed in
OpenShell `45f3b534`. Both macOS and the Mac's Linux ARM64 Docker-runtime component
gates passed, and a fresh-worktree supervisor image was built and selected. No
remote Linux/GPU testing is implied. The seven-case deployed suite now passes,
including Task completion and cancellation. Terminal event/Task persistence passes
across Hub and Time restarts. A running Task remained Working after a confirmed Time restart, then its fresh subscription received the exact completed result. Persisted service and Hub public keys also matched their baselines.

**Treat credential refresh as a connection boundary.** Native provider renewal
deliberately invalidates previous policy-generation guards before installing the
new credential snapshot, even when authored policy is unchanged. An in-flight
request can therefore fail before forwarding. Gateway-managed refresh preserves
the opaque reference; it does not promise an uninterrupted MCP connection. Keep
this native boundary, report the failed operation and explicitly establish a fresh
client/subscription. Do not replay mutating calls automatically. Qualify renewed
application access past the original token expiry with an unchanged captured
reference and unchanged workload identities. Hub applies a strict application
token expiry check; OpenShell management verifier leeway is a separate contract.
The same-reference, same-Exec-shell application renewal proof passed beyond the
original token expiry, followed by a complete ordinary suite. See the execution
checklist for the measured interruptions and recovery results.

**Keep changes in their owners.** Installation owns images, native definitions,
providers, endpoints and the local IdP/catalog choices. Hub owns endpoint
bindings and its native upstream transport; it remains server-agnostic. SDK CLI
owns the committed generic bearer input; the SDK already has the bearer implementation.
Time owns any demonstrated Time defect and its live acceptance input. Extend the
existing Rust qualification support only for deployment/credential assertions;
do not make it another launcher or move fixture code into Lore. Core, SDK hosting
and Lore need no planned behavior changes for this pass. OpenShell's narrowly
approved service-DNS and official Tasks-inspection changes above address demonstrated
native gaps; any additional change must identify the missing capability and smallest alternative
before expanding the agreed scope. Leave version upgrades,
general composition and automatic deployment out of these edits.

### Connections To Qualify

1. **Client to Hub:** the existing SDK CLI or another MCP client calls
   `/mcp/{profile}` at one approved TLS application origin. Qualify a local IdP-issued
   application token against the Hub's external-issuer admission,
   including `at+jwt`, audience, principal/tenant/Work Context mapping and permission
   denial. OpenShell management and Lore tokens are different audiences. This does
   not qualify interactive human login or customer issuers. Do not enable the
   Hub's old Lore-token issuance path to make this pass.
2. **Hub to service:** keep the existing MCP client and forwarded-token contract;
   connect its byte stream through native authenticated OpenShell `ForwardTcp` to
   the selected sandbox port. Bind the admitted registration endpoint to an
   operator-approved workspace, sandbox and port in the existing trusted process.
   Preserve the registered HTTP authority/path and JWT audience. A service cannot
   choose an arbitrary sandbox or grant management authority by registering a URL.
   Hub `00a7e7b` implements native forwarding beneath its existing `reqwest`
   HTTP pool; deployed Hub/Time qualification now passes. Keep the stream adapter
   generic and inside the existing client; add no relay daemon.
3. **Service back to Hub:** existing registration discovery, `/oauth/register`,
   JWKS refresh and (for Media) `/oauth/token` plus `/mcp/{profile}` use an approved
   Hub origin through native policy-controlled egress. Qualify this return route
   and Hub ingress separately from forward connections. Preserve registration's
   signed service identity and server-owned permission declarations. The Hub
   still learns service names through registration, not a compiled service list.
4. **Persistence:** the Hub owns installation/kernel migrations and grants each
   registration its own PostgreSQL login. Services run their own schema migrations
   and use the SDK/core APIs for shared Tasks, audit and usage. PostgreSQL connections
   must preserve session locks and LISTEN/NOTIFY. Native network admission, reconnect
   and mounted registration-key persistence are acceptance gates, not assumptions
   inferred from the echo fixture.
5. **Artifact bytes:** MCP carries metadata and authorization; clients and Media
   PUT/GET bytes at Artifact's signed S3 URLs. Qualify the address from every actual
   caller and preserve SigV4-bound host/headers. The bucket-scoped signing key stays
   in Artifact because signing requires the real key; it is never an agent credential.
   Share-link ingress is a later explicit qualification, not required for private
   upload/download acceptance.
6. **Media outputs:** Media uses its existing Task-bound SDK delegation to call
   Artifact through the Hub, then streams provider output to signed storage
   URLs. Use the existing fake provider on a policy-approved private endpoint and
   status-check completion (`VEOVEO_PUBLIC_ORIGIN` unset). A separate one-shot now
   qualifies real WaveSpeed polling for one model; public signed webhook ingress
   and other models still require their own acceptance. Keep provider credentials
   with the trusted service/provider path, outside author/build jobs.

Time's first acceptance covers discovery, resolve/convert, schedule Task completion
and cancellation, event subscriptions/reconnect, permission denial, restart recovery
and persistent registration identity. Use packaged time authority data; remote
authority acquisition and clock-observation sockets are separate qualifications.
Artifact then adds byte-transfer integrity, range download, access denial, quotas and
restart persistence. Media then adds delegated Artifact access, Task recovery without
duplicate output publication, cancellation, output provenance and usage records.
The [Media native integration plan](OPENSHELL_HARDCUT_PLAN.md#media-native-integration-plan)
records the source, native-policy and client-Task gates. Native Media is deployed;
its earlier private fake-provider qualification remains separate from the current
real WaveSpeed status-check configuration, with the testing fixture still available. Six deterministic native cases passed: Task-bound
Artifact delegation, exact 64 KB and 20 MB output transfers, provenance and usage,
pushed completion, ordinary-member billed-run refusal, Task-only invocation and
cancellation before and after dispatch. Media adopted its existing signing key
and schema. Native credential renewal and in-flight recovery across actual Hub/Media
restarts also passed, retaining the Task and service identities without duplicate
provider submission. A separate completed Task retained its result, Artifact bytes
and fresh-subscription delivery after actual Hub/Media restarts. The Mac's unchanged
signed-byte download also passed with exact bytes and checksum. The reviewed local
OpenCode build supports Tasks and passed no-model client preflight. Its revision
`46b2429` was local-only with the upstream origin when those probes ran. The later
transport repair is now published as `7b12c6051d23d1afa7ef6659b835fe2345f2ccd5`
on the maintained [VeoveoAI/opencode](https://github.com/VeoveoAI/opencode) fork's
`mcp-tasks` default branch; the original receipts retain their actual revision. The initial
bounded MiMo attempt reached the step limit without calling Hub: its launcher
inherited a stale `PWD`, selecting the workspace root instead of the nested
client project and omitting Hub configuration. No generation was submitted.
Correcting the launcher required no Hub, MCP protocol or OpenCode product change.
No-model fixtures confirmed expected nonblocking asynchronous MCP connection and
catalog updates; each model step refreshes the tool snapshot, and the billed-test
identity additionally permits `media.run`.
The user explicitly authorized one replacement final run using the corrected
`PWD`, an owned native persistent server, the exact reviewed Tasks executable,
Build agent and `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. It passed in 224.975 seconds
within eight agent steps and the 240-second deadline. Time, model/schema discovery,
exactly one fake-model generation, durable Task settlement, Artifact inspection
and signed download all succeeded. The Mac saved exactly 65,536 bytes with the
unchanged signed request and independently matching SHA-256; independent fixture
counts prove one submission. The output is synthetic fixture data, not a rendering
claim. The [execution receipt](OPENSHELL_HARDCUT_PLAN.md#media-native-integration-plan)
records identities, byte hash, exact driver, model usage/cost and the retained
initial failure. The private native slice is complete; no further model attempt
is authorized or needed.

A separately authorized [real WaveSpeed polling one-shot](OPENSHELL_HARDCUT_PLAN.md#real-wavespeed-polling-one-shot--2026-10-18)
then completed `wavespeed-ai/flux-schnell` through the same Hub → Media → Artifact
path, without a model agent: one Task and a real-provider output downloaded on the
Mac with matching Artifact checksum. The exact input requested one 1024 × 1024 PNG,
seed 42. Independent decoding verifies a valid 1024 × 1024 PNG, 802,505 bytes, with
the exact stored Artifact digest. Its USD 0.003 external quote matched both the
own-usage delta and independent per-Task estimate/actual usage records. Both result
and persisted prediction report status-check completion, with public origin unset.
The measured 37.509-second Task interval includes execution, status polling, output
ingestion and billing; it is not pure inference latency. Signing identity, database
and mounted state were retained. Native configuration changed without a Media
rebuild; the separate fake fixture counters were unchanged. Public signed webhook
ingress and remote Linux/GPU qualification remain separate; this one-shot does not extend the fake-provider
cancellation/recovery proof to a real provider.

The separate [MCP conformance and workspace follow-up](OPENSHELL_HARDCUT_PLAN.md#mcp-conformance-and-workspace-sanitation-follow-up--2026-10-18)
records the OpenCode repair, installation, branch publication and local cleanup.
A deterministic wire regression captured an unnecessary `notifications/cancelled`
POST during subscription teardown and reproduced the same HTTP 400 symptom. This
strongly supports attribution of the historical WaveSpeed error to the same SDK
path; the original trace did not capture its RPC method, so that attribution
remains an evidence-backed inference. The pinned SDK now follows the
[2026-07-28 cancellation contract](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions#cancellation):
close the request stream for modern HTTP; retain cancellation notifications on
transports without per-request streams. Eighty-eight MCP tests and the canonical
check pass. The source is published on the maintained fork; the locally built
ARM64 executable is installed, not uploaded as a binary release.

A live no-model check used source-imported Core `McpClient` at `7b12c60`, with a
fresh ordinary-member token and 18 tools. Time Task
`01a15012-0754-70b0-87c1-fcdbe474a599` completed one schedule occurrence;
discover/list/call/listen returned HTTP 200, with no HTTP 400 or cancellation
notification observed. Timing was not measured and server-side stream closure
was not independently instrumented; the component fixture proves that closure.
The installed executable's version/help smoke checks are separate from this
source-client proof. No new LLM or paid generation followed the repair.

**Hub requires Tasks; clients must implement the supported MCP specification.**
Use the [official Tasks extension](https://github.com/modelcontextprotocol/ext-tasks/blob/main/specification/2026-07-28/tasks.md#capability-negotiation)
and its per-request capability declaration/server-directed execution. Its optional
status in MCP as a whole does not add taskless support to this Hub contract. The
uncommitted Time/Media detour was removed at the user's direction; no server
candidate, fallback, compatibility adapter or reduced Hub capability is carried
forward. Ordinary tools remain unchanged. Modern HTTP defines no core
client-sent cancellation notification, and
[notification-POST header requirements are undefined](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#sending-messages);
the repair does not weaken mirrored request-header validation or assert a universal
`Mcp-Method` requirement for notifications.

The [reference Linux and signed-webhook execution gates](OPENSHELL_HARDCUT_PLAN.md#reference-linux-deployment-and-signed-wavespeed-webhook-goal)
now govern the next slice. Preserve remote data/identity first, then qualify pinned
native builds, verified identity/TLS/public routing, all four deployed application
services and one cost-bounded signed WaveSpeed callback. Callback receipt and
event-mode completion must be independently observed; the Mac status-polling
receipt is not webhook evidence. Final OpenCode MiMo acceptance follows successful
deterministic gates. The existing native responsibilities and placement contracts
remain authoritative; no new proxy or launcher is assumed. The read-only remote
inventory is not Linux deployment or GPU/CUDA acceptance.

Time's corresponding cases and Artifact's private follow-up now pass on this path.
Artifact runs in `vv-services/artifact`, with private port 8801, the recovered
persistent registration key and the existing PostgreSQL metadata. A dedicated
SeaweedFS identity holds only bucket-scoped permissions for `artifacts`; both
internal access and signed URLs use `http://host.openshell.internal:9000` over
native TCP admission. Six native cases cover signed transfers (including more than
1 GiB), checksum verification, ranges, Hub permission refusals, quotas, grants and
access requests. A retained object and its metadata/access survive actual
Artifact/Hub restarts; a newly opened subscription delivers its opening update.
Tenant and object isolation remain component
test evidence in this one-tenant installation. Public shares, in-flight Artifact
verification recovery, public Media webhooks, other real-provider models and Media
Lore/factory work stay separate. See the
[Artifact evidence](OPENSHELL_HARDCUT_PLAN.md#native-artifact-follow-up-2026-10-17).
This slice used the existing staged Hub placement configuration and a Git-built
Artifact image; it did not extend the Time-specific Lore/factory acceptance to
Artifact or implement general composition.

Automatic source-to-deployment integration remains a later, thin module in the existing
trusted Hub process: Lore notification plus authoritative revision read, fresh
OpenShell checks/builds, trusted publication of an immutable image, then native
service deployment and readiness before selection. Registration currently routes
the newest instance of a slug; parallel version selection, composition and Task
version retention remain later work. The first slice uses one selected version of
each service and does not claim to solve those semantics.

Implementation evidence: [Hub transport](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_http.rs),
[forwarded identity](../veoveo-hub/crates/veoveo-hub/src/mcp/upstream_authorized_http.rs),
[Time startup](../veoveo-mcp-time/crates/veoveo-mcp-time/src/server/mod.rs),
[Artifact storage](../veoveo-mcp-artifact/crates/veoveo-mcp-artifact/DESIGN.md#object-storage),
[Media outputs](../veoveo-mcp-media/crates/veoveo-mcp-media/src/run.rs),
[Core libraries](../veoveo-core/README.md) and [SDK libraries/client](../veoveo-hub-sdk/README.md).

## Data-Driven Environment Definitions

Use the [same Lore composition schema](INFRASTRUCTURE_CANDIDATE.md#configuration-and-lore-integration)
for any environment name. Names are labels, not lifecycle or authorization rules.
A definition can own deployments, inherit an authorized base, or combine both.
Pinned or tracking base selection, permitted identity/data bindings, resource requests,
retention and branch-deletion behavior are explicit inputs. Promotion selects
verified immutable artifacts in any authorized destination, without a fixed sequence
of stages. The immutable environment identity is separate from its label and branch
name; the resolved composition captures exact versions for routing and Tasks.

Keep the schema narrow: native OpenShell workload/template, policy and provider
references for all execution, and approved binding references for state and identity.
Do not copy these systems' schemas into a new infrastructure language. Trusted
admission policy outside the editing branch constrains references, grants, quotas
and targets. An environment cannot authorize its own issuer or privileges. Root
identity, Lore, controllers and the secret store survive deletion of an experiment.

## Identity And MCP Enforcement

Use the configured external OAuth/OIDC provider as the identity authority. OpenShell
validates that issuer's access tokens for its own API and applies native workspace
authorization. Its supported clients handle login and renewal. It does not issue
general user access tokens for the Veoveo Hub. See its
[authentication contract](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/gateways/authentication)
and [OIDC implementation](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/auth/oidc.rs).

Move standard browser OAuth/refresh operations out of Veoveo after external-client
qualification. Share browser SSO through the configured issuer, with separate
resource audiences. Do not forward an OpenShell bearer as a Hub bearer or let
an environment manifest add an unapproved issuer. Keep the product's permissions,
context admission, narrowed actor/delegation tokens and Task authority in Veoveo;
OpenShell roles describe factory access rather than permission to use arbitrary
MCP services or production data. Lore will validate the IdP's access tokens through
its native OIDC/resource-grants authorizer. Desktop compatibility is withdrawn;
retire its authentication adapter after the direct factory path qualifies. Do not
extend that adapter with a machine-token endpoint or preserve its signer as a
second trust authority. See [the cutover design](LORE_DIRECT_OIDC_PLAN.md).

The Hub already supports configured authorization servers but also implements
its own authorization codes, refresh families, rotation and revocation. Its
[auth design](../veoveo-hub/crates/veoveo-hub/src/auth/DESIGN.md)
requires `at+jwt` tokens and custom invocation/session claims. An external issuer
must be qualified for token format, resource binding, client registration, identity
mapping and revocation semantics before hosted login routes or storage are removed.
Normal logout leaves running Tasks authorized; detected credential compromise ends
their delegation. Preserve that contract with a qualified provider signal and
Veoveo Task grant, rather than duplicating the provider's refresh database. Do not
claim current Keycloak or intended Entra integration already satisfies this change.

OpenShell also supplies native
[MCP egress policy](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/policies/schema#understand-mcp-rejections):
method/tool selectors, deny precedence and revision-aware checks. Reuse these
instead of adding equivalent Veoveo proxy rules. The reviewed source implements them in
[`l7/mcp.rs`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-supervisor-network/src/l7/mcp.rs)
and `l7/relay.rs`. Explicitly enable `2026-07-28`; the default is `2025-11-25`.
Qualify SDK headers/metadata and use narrow enforced tool rules.

Arguments and responses are not inspected. `Mcp-Param-*` headers are not compared
with arguments and cannot establish authority. Veoveo retains user-specific
catalogs, environment routing and application/data permissions. Both layers must
allow a call. Direct clients still need authenticated ingress.

Native diagnostics distinguish protocol errors from policy denials. Malformed
requests fail even in audit mode. Qualify streams, cancellation and extensions;
do not bypass inspection to fix incompatibility.

## Lore Hooks And Branch Lifecycle

Lore v0.10.1 already defines hooks for branch push, creation and deletion, repository
creation and obliteration. Pre-handlers can reject an operation, response handlers
can add client-facing information, and post-handlers run asynchronously. The stock
server registers no custom hooks: using this extension point requires compiling
the selected hooks into a server build. See the
[hook configuration](https://github.com/EpicGames/lore/blob/v0.10.1/docs/reference/lore-server-config.md)
and [hook traits](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/hooks/traits.rs).

Use the existing `BranchPush` pre-hook for a small workflow guard on designated
factory identities. Compare the authenticated identity in `HookContext` with its
trusted repository/branch assignment and reject pushes elsewhere with a message
naming the assigned and attempted branches. Both supported push APIs already
invoke this hook. Keep assignments in installation/integration-owned server hook
configuration, outside agent control; CLI identities, headers and source files do
not establish authority. Human identities without an assignment retain normal
permissions. The current hook API supplies the required verified identity and IDs;
no handler or authorization/transport change is needed. Use the existing
`FailedPrecondition` business-rule rejection so ordinary clients display the
assignment message; their generic `PermissionDenied` conversion hides detail.

This is a guard on normal pushes, not complete isolation between branches or a
new authorization system. Native repository grants, branch protection, storage,
push and merge behavior retain their ordinary meaning. Do not execute scripts
from the pushed repository in the trusted Lore server. Keep pre-handlers bounded
and local; builds, remote provisioning and CI never run inside a pre-push handler.
Inspect any future missing hook capability as a specific hook API change,
rather than blocking the server thread with network calls.

Use Lore's
[notifications](https://github.com/EpicGames/lore/blob/v0.10.1/lore-proto/proto/notification.proto)
and post-hooks to wake reconciliation. They are hints, not proof of exactly-once
delivery or a transaction spanning Lore and OpenShell. The controller reads current
branch state before acting and periodically reconciles to recover missed events.
Key work by repository ID, branch identity, exact revision and job purpose. Recheck
the desired generation before publishing a preview; an old build result cannot
resurrect a deleted branch or overwrite a newer deployment.

The integration can expose check/deployment status through non-secret native
revision or branch metadata and existing status tools. A push response may link to
the job once that native response hook is qualified. Agent-editable metadata is
never a verification verdict or an authorization grant. Do not infer deployment
success from successful source publication.

## OpenShell Admission And Governance

Use OpenShell's existing OIDC validation and workspace membership for factory access.
Configure the installation's issuer and explicit roles; the local no-OIDC platform
admin default is not suitable for a shared factory. Reuse the same identity provider
as appropriate, with audience separation for OpenShell, Lore and Veoveo.
Application authorization retains its own protocol contract. Human Lore Desktop
login is outside the accepted factory scope.

Use a
[gateway interceptor](https://docs.nvidia.com/openshell/v0.1.4/extensibility/gateway-interceptors)
where native admission needs Veoveo context: apply an approved policy or reject an
unauthorized template, source binding, provider attachment or resource request.
Enforce security decisions in pre-dispatch validation with explicit RPC allowlists
and fail-closed behavior. Respect built-in authorization and validation after a
patch. Post-commit callbacks are observational and cannot reject committed work.

The interceptor API does not currently populate method-specific `current_state`,
does not intercept arbitrary reads or streams, and requires a gateway restart for
registration changes. Query authoritative state when needed; do not assume those
missing capabilities. Reconcile side effects independently. Keep provider profile
and policy administration outside untrusted source branches.

Authenticated middleware calls carry sandbox identity, while workload-controlled
labels, names, headers and repository files do not establish authority. Use
[supervisor middleware](https://docs.nvidia.com/openshell/v0.1.4/extensibility/supervisor-middleware/operations)
only for its documented phases and operations. Credential/routing headers are
protected and secrets are omitted from governance payloads; do not turn middleware
into a route for returning raw credentials or bypassing those restrictions.

Use the native [policy advisor](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/policies/advisor)
for network-access proposals, review and reload. Veoveo does not keep another
approval queue. Lore can version approved policy inputs; runtime approval still
follows OpenShell's authorized operations. Do not auto-apply agent-edited policy.

Use the native [prover](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/policies/prover)
within its documented model. Proposal risk checks do not prove compliance with an
installation maximum. The current boundary checker reports MCP/GraphQL and other
unmodeled shapes as unsupported. Keep those cases denied or under trusted explicit
review; never discard unsupported rules to manufacture a passing proof. No claim
of universal policy verification or automatic startup proving is made.

## Credentials And Repository Authority

The intended path is: an authorized sandbox makes a Lore request, its trusted
OpenShell supervisor resolves a repository-scoped credential, and Lore enforces
that credential at the repository and operation boundary. The author process never
receives the real token or a private signing key. Network rules and credential
endpoint bindings must both authorize the request. Renewal must cover long-running
sessions and re-established connections, not merely initial login.

Use native `oauth2_client_credentials` against the installation IdP, with client ID
and secret held as OpenShell refresh material. Local Keycloak supplies ordinary
Lore repository grants using built-in claim mappers and optional client scopes;
Lore validates that issuer directly. The old token worker is gone, and the Desktop
adapter is not a required factory issuer. No private-key JWT refresh patch, Veoveo
machine-token endpoint or SPIFFE/SPIRE deployment is needed for this slice.
Automatic renewal, reconnect, source withdrawal, applied binding-removal/detach,
native termination and recovery passed local direct-IdP acceptance on 2026-10-17.
See the measured results in the [execution checklist](OPENSHELL_HARDCUT_PLAN.md#separate-credential-lifecycle-qualification)
and the [direct-credential steps](LORE_DIRECT_OIDC_PLAN.md#implementation-order-and-acceptance).
Those Lore results do not qualify Hub application ingress or management renewal,
customer issuers, or cancellation of already-forwarded Lore requests.

Use native OpenShell provider APIs and its encrypted database credential driver.
Qualify protected persistent state, encryption-key custody, refresh, rotation and
recovery. There is no separate secrets service or human `.env` distribution project
in this candidate.

Lore's existing
[resource grants](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/authnz/resource_grants_authorizer.rs)
are repository-scoped. Factories use ordinary granted repository access and normal
Lore commands. An empty action array still permits ordinary unprotected pushes;
the smoke sandbox stays read-only through its OpenShell RPC policy. The selected
work branch is a workflow assignment, not a new
security boundary inside that repository. The pre-push hook above guards normal
pushes only; it does not establish complete isolation against low-level storage
APIs or every form of branch administration. The earlier comprehensive branch
confinement requirement is replaced by this scope, not satisfied by narrower tests.
Do not introduce custom `lore_authoring` claims, duplicated server RPC allowlists,
authorization middleware or stream-expiry machinery for the assignment guard.

In both inspected branch-push implementations, Lore v0.10.1 permits
`is_service_account` to bypass branch protection. An author worker must not receive
that flag merely because it is an automated client. Promotion authority belongs to
an independently authorized principal. Preserve the server's ordinary push and
merge semantics. Hook admission cannot bypass native protection. See the
[legacy push handler](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/grpc/handlers/branch_push.rs)
and [v1 handler](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/grpc/revision/v1/branch_push.rs).

Agent workers cannot read the secret store, resolve provider secrets through the
management API, access signing keys or the SPIFFE Workload API, or administer
OpenShell. Qualify native provider attachment, removal and renewal separately from
the branch hook. Removal must invalidate future credential references; measure
cached credentials and already-established sessions without promising cancellation
of requests already sent upstream. Use native sandbox stop when factory execution
must end. Do not add a Lore stream-expiry contract to manufacture revocation
acceptance. Never claim that hiding a token prevents abuse of its permissions.

## Qualified Native gRPC Mediation

The original OpenShell v0.1.4 source review found HTTP/1.1-only TLS mediation,
which could not carry Lore's gRPC credential path. The maintained supervisor now
has a narrow generic HTTP/2 patch in its existing proxy/provider architecture.
The local path passes focused streaming/trailer, method/path/authority, credential
custody, message framing, policy fencing and cancellation checks. Unsupported
inspection combinations fail closed. Lore keeps its ordinary authorization and
transport semantics; it has no HTTP/1 facade or stream-expiry patch.

Native OpenShell owns qualified Lore mediation, workload egress, application
service ingress and private authenticated forwarding. Native application DNS,
request authority and TLS verification have passed the fresh ingress fixture;
the actual Hub and Time clients also pass deployed qualification. The factory client path has also passed its separate preflight. Desktop
adapter ingress and signer dependencies are retired. The retained identity
listener serves Keycloak bootstrap and its restricted public-key alias only.
Bring any concrete native limitation and proposed design change to the coordinator
before changing this placement.

## Optional QUIC Storage Transport

Lore provides a binary QUIC storage transport and gRPC storage with equivalent
logical operations. QUIC's `lore-storage/0.4` transport is designed for low-overhead
fragment transfer; actual improvement depends on workload and network conditions.
Revision/control APIs and storage transport are separate choices; accelerating
storage with QUIC does not remove the gRPC control-path qualification. See
[Lore's storage design](https://github.com/EpicGames/lore/blob/v0.10.1/docs/explanation/system-design.md).

OpenShell v0.1.4 mediates TCP and DNS, and its inspected socket broker denies
general external UDP. Thus Lore QUIC is not enabled by an existing network allowlist
or by selecting a compute driver. See the
[socket broker](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-sandbox/src/network_broker.rs).
Lore's QUIC authorization embeds the JWT in the storage protocol; UDP forwarding
alone would not keep that credential outside the author process. See
[Authorize framing](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/protocol/storage/authorize.rs).

Evaluate two options after the functional integration is established:

1. Generic policy-enforced datagram support in OpenShell, plus an explicit credential
   custody design for Lore QUIC. Mediation must retain sandbox attribution,
   destination restrictions, limits and safe reconnect behavior. Opening host UDP
   access is not an equivalent solution.
2. A trusted supervisor-side adapter using Lore's transport interfaces to originate
   authenticated QUIC storage sessions. The agent uses an existing mediated channel;
   the adapter holds credentials and delegates only permitted storage operations.
   This is a proposed integration, not an existing OpenShell driver or a separate
   implementation of Lore's wire format.

Prefer existing interfaces and protocol libraries. Benchmark binary and multi-file
transfers against the qualified gRPC baseline with matching authorization, hashes,
limits, network conditions and credential custody. Enable QUIC only for a measured
benefit worth its integration cost. gRPC remains acceptable and QUIC does not block
the factory or preview work. Transport optimization preserves this same delivery
workflow; it does not create a second service hosting path.

## Checks Artifacts And Deployment

OpenShell executes author, build and verification commands; it does not decide
which changes may enter an authorized destination environment. Use component-owned test
commands and trusted gate configuration rather than creating another CI language.
An agent's edited test command returning zero is not an independent verdict.

Bind a verified result to the exact Lore revision, OpenShell sandbox/generation,
template image digest, approved policy and produced artifact digests. Treat all
author outputs as untrusted. Fresh verification and a trusted publication step hold
release/signing/registry credentials outside workers. Workers receive no Docker
socket, deployment credentials or production secret mounts. Qualify an isolated
image builder before choosing it; OpenShell process isolation does not itself
provide a safe privileged container builder.

Use the existing Veoveo Task facilities where appropriate for durable coordination,
without building another sandbox scheduler or assuming OpenShell is a complete CI
workflow engine. Submit approved immutable images and native definitions through
OpenShell's SDK; no Flux deployment bundle or separate CI service is required. A
human-friendly Lore branch follows revisions; the deployed record always names the
resolved revision and digests. Recheck active branch generation and permissions at
publication and deployment. Long-lived MCP Tasks keep their version binding.

Lore, OpenShell, their policy/credential bootstrap, credential storage and identity services
remain outside preview-owned teardown. Branch deletion drains or cancels work,
revokes access and cleans up owned resources while respecting declared retention.
Periodic reconciliation recovers missed callbacks; no additional event bus is
required for the first implementation.

## Extension Builds And Fork Policy

Prefer configuration, SDKs and existing extension interfaces. A compile-time Lore
hook is an extension build even though it needs a customized server binary. Keep
the hook small and test ordinary upstream clients and storage behavior against it.
Prefer external OpenShell interceptors and native drivers to edits inside its core.

When a generic gap requires core work, maintain the smallest coherent patch in a
VeoveoAI fork and pursue an upstreamable interface. HTTP/2 credential mediation,
generic JWT authentication support or missing verified hook context are candidates;
they are not promises that each requires a fork. No patch may disable sandboxing,
bypass endpoint ownership, broaden repository grants or rely on setuid/setgid token
loaders. QUIC follows the same rules.

Every integration build records upstream version/SHA, patch revisions and image
digests. Run the same relevant upstream and Veoveo contract tests against the
upstream baseline and the modified build; keep results distinct and never weaken
probes to accept a patch. Track upstream security updates and retire local patches
when equivalent upstream support is qualified. Never deploy an unreviewed source
branch of Lore or OpenShell as the trusted control plane of its own test environment.
New extension operations or transport capabilities use explicit compatible
negotiation and opt-in configuration; unsupported enforcement fails closed. Keep
existing clients and configurations working within their documented contracts.

## Qualification Sequence

The [hard-cut plan](OPENSHELL_HARDCUT_PLAN.md) sets the implementation order: preserve
work/data, remove the old execution path, then implement and qualify the new path.
The gates below describe required behavior, not a demand to run a broad suite before
cutting the old stack. Use focused checks as each changed boundary becomes runnable.
This list covers architecture-wide acceptance; the execution checklist puts
the completed Mac Hub/Time/prepared-factory milestone first. The active next goal
is reference Linux deployment and signed webhook qualification; GPU/CUDA remains
separate.

1. **Native execution and service hosting.** On OpenShell's native Docker driver,
   run a tiny prebuilt MCP service as the canonical process, with a native template,
   scoped provider, restart policy and authenticated `ForwardTcp` access. Verify
   allowed/denied requests, streaming/cancellation, cross-workspace denial, exit/restart and
   supervisor/gateway interruption. Check credential unreadability and current
   generation identity. This needs no model session, Helm, Flux or Kubernetes.
2. **Lore authoring and push guard.** In a disposable repository, clone, edit and
   push a bounded fixture with normal Lore commands and mediated credentials. Verify
   an assigned factory push succeeds, another branch gets the clear hook rejection,
   both supported push APIs invoke the existing hook, and native protected-branch
   behavior remains effective. Human permissions remain unchanged. These tests
   qualify a normal-push workflow guard; complete low-level branch isolation is not
   a requirement or a passing claim.
3. **Native access, policies and persistence.** Verify workspace confinement, provider
   binding/rotation, automatic ordinary Lore credential renewal across expiry and
   reconnect, and renewal-failure behavior. CLI OIDC refresh and manual rotation do
   not establish Lore renewal. Qualify attachment removal and measure effects on
   new requests and established sessions separately; use native sandbox stop for
   execution termination. Keep Lore's transport/session behavior unchanged. Verify
   policy advisor review/reload and prover limits. Validate admitted
   volume persistence and cleanup. Exercise missed events, delayed operations and
   gateway crashes; generic recovery fixes belong in OpenShell. Use its native
   diagnostics and credential driver. Implement the credential portion in the
   exact order in [the direct IdP plan](LORE_DIRECT_OIDC_PLAN.md); Desktop is not a
   prerequisite and no new Veoveo authentication adapter is required.
4. **Linux CUDA.** Repeat the runtime boundary with native GPU requests and execute
   a small CUDA kernel with a checked result. No CPU substitution or `nvidia-smi`-only
   acceptance. Use the same selected Docker driver and security boundary.
5. **Composition and one hosting path.** Run a base and two private overrides through
   OpenShell, with arbitrary labels and an inherited second service. Verify discovery,
   downstream context, no silent fallback, Task version ownership and same-version
   restart recovery. Rename labels; test pinned/tracking bases and reject cycles.
   Promote the same image digest to any authorized destination using native workloads.
6. **Source lifecycle and identity.** Push a definition, run fresh checks, apply native
   OpenShell resources, then delete its branch and verify only owned resources are
   removed. Preserve other compositions, retained state and bootstrap. Qualify external
   issuer login/refresh, separate audiences, MCP client compatibility and compromise
   revocation of Task delegation before retiring hosted OAuth. Test native MCP policy
   with the actual `2026-07-28` SDK and extension methods using deterministic requests.
7. **Optional transport and scale.** Measure QUIC only after secure mediation works.
   Qualify replica/rollout or other generic platform extensions only when a concrete
   requirement needs them; they do not justify a parallel service execution stack.

The [execution plan](OPENSHELL_HARDCUT_PLAN.md#required-lore-acceptance) tracks
the revised Lore gates explicitly. The stronger custom-isolation requirement is
superseded, not marked passed by hook tests. Completed read-only smoke checks,
push-hook tests and manual rotation alone do not establish automatic credential
renewal or access removal. The separate local direct-IdP measurements are complete;
Hub/Time application and management-credential qualification, exact prepared source, the bounded factory build and Time deployment from that Lore revision also passed locally.
The architecture is OpenShell-owned execution; qualification chooses supported configuration or closes a specific native
gap, not whether to keep a duplicate Veoveo implementation by default.

## Reviewed Source Baselines

The design review used Lore v0.10.1 (`95a9a834`) and OpenShell v0.1.4
(`5a7728c304b5528e954e9ae900cf21f84e1a12b1`). Lore source was read from its tag,
not the local checkout's later commits. OpenShell source was inspected in a clean
temporary checkout. Those were design-review baselines. The current local Lore and
OpenShell patches and focused acceptance are recorded in the execution checklist;
they do not qualify the unfinished Hub/Time placement, inference build or CUDA.
