# Lore And OpenShell Integration

Status: accepted infrastructure direction for design and qualification, revised on
2026-10-16. Lore is the source and revision authority. OpenShell owns execution
and runtime access for factory work and deployed services. Veoveo connects source
revisions to checks, service composition and promotion. The local hard cut and first
native Lore/private MCP path pass focused acceptance; general deployment and
composition remain pending. See [execution status](OPENSHELL_HARDCUT_PLAN.md).

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
tools, and Veoveo's MCP gateway. Use existing logs and diagnostics. A custom factory
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
| Credentials and model/API access | Native profiles, attachments, refresh and credential driver | Qualify Lore gRPC and current private-key JWT requirements |
| Policy changes and inspection | Native policies, advisor, prover, middleware/interceptors | Product-specific admission only; no duplicate approval engine |
| Sessions, terminals and diagnostics | Native SDK/CLI/TUI and observation APIs | Links to source/check results, no replacement relay or logger |
| Factory user access | Native OIDC and workspace membership | Mapping approved source authority to runtime access |
| Human identity | Configured OAuth/OIDC provider | Application subject/permission mapping |
| MCP application behavior | Existing Veoveo gateway and service contracts | Composition, discovery, narrowed delegation and Task authority |

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
| Agent to Lore | Stock CLI over the qualified supervisor-mediated credential/transport path |
| Veoveo gateway to deployed MCP service | Native authenticated OpenShell forwarding, carrying MCP requests with Veoveo's narrowed application token |

OpenShell documents consuming its [Rust SDK](https://docs.nvidia.com/openshell/v0.1.4/sdk/rust)
from source at the gateway's release tag. Reuse a client/channel per gateway. Configure
the SDK's token source/refresher explicitly; a static bearer value does not renew
itself. Qualify expiry and reconnection for long-lived streams. The
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
   outside the workload. Lore gRPC mediation remains a qualification gate below.
3. A Lore notification wakes the small revision integration. It reads the exact revision
   and approved environment definition, then asks OpenShell to run fresh checks/builds.
   Trusted publication records the resulting immutable image digest and check evidence.
4. The integration requests a service sandbox through the same OpenShell SDK and Docker
   driver. OpenShell owns startup, supervision and restarts. After application readiness,
   Veoveo makes that immutable version available in the authorized composition.
5. An MCP client calls the Veoveo gateway with its execution context. The gateway resolves
   the selected service version, checks application permission and opens authenticated
   OpenShell forwarding to that service. The service receives a narrowed application
   token. Neither the user nor agent receives the gateway's OpenShell management token.
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
trusted Veoveo gateway to each sandbox's loopback listener. The v0.1.4 RPC requires
bearer authentication, `sandbox:write` scope and workspace membership, and resolves
the target sandbox under that principal before opening the supervisor relay. See
[`ForwardTcp`](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/proto/openshell.proto)
and [its handler](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/grpc/sandbox.rs).
Use the native SDK/raw client transport; add a generic SDK stream adapter if needed,
not a new relay service. Keep its management credential outside service workloads.
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
general user access tokens for the Veoveo MCP gateway. See its
[authentication contract](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/gateways/authentication)
and [OIDC implementation](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-server/src/auth/oidc.rs).

Move standard browser OAuth/refresh operations out of Veoveo after external-client
qualification. Share browser SSO through the configured issuer, with separate
resource audiences. Do not forward an OpenShell bearer as a gateway bearer or let
an environment manifest add an unapproved issuer. Keep the product's permissions,
context admission, narrowed actor/delegation tokens and Task authority in Veoveo;
OpenShell roles describe factory access rather than permission to use arbitrary
MCP services or production data. The existing Lore client authentication adapter
remains until its published protocol has an equivalent qualified replacement.

The gateway already supports configured authorization servers but also implements
its own authorization codes, refresh families, rotation and revocation. Its
[auth design](../veoveo-service-gateway/crates/veoveo-service-gateway/src/auth/DESIGN.md)
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

Use a small compiled hook to enforce branch mutation policy with authenticated
identity and trusted bindings. Do not execute scripts from the pushed repository in
the trusted Lore server. Keep pre-handlers bounded and local; builds, remote
provisioning and CI never run inside a pre-push handler. Inspect any needed async
policy lookup or additional verified identity context as a specific hook API change,
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
as appropriate, with audience separation for OpenShell, Lore and Veoveo. Human
Desktop login and application authorization retain their own protocol contracts.

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

Use OpenShell provider profiles and supported refresh strategies wherever they
match. Its ordinary `oauth2_client_credentials` refresh currently uses client ID and
client secret; Veoveo's existing Lore refresher uses private-key JWT authentication.
Qualify that difference explicitly. A generic private-key JWT refresh addition is a
possible upstreamable OpenShell patch; retain working external refresh while needed.
The existing SPIFFE JWT-SVID token-grant path is another option when an installation
already has workload identity, but requires SPIRE or a compatible Workload API and
additional trust bindings. It is not required infrastructure for the first slice.

Use native OpenShell provider APIs and its encrypted database credential driver.
Qualify protected persistent state, encryption-key custody, refresh, rotation and
recovery. There is no separate secrets service or human `.env` distribution project
in this candidate.

Lore's existing
[resource grants](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/authnz/resource_grants_authorizer.rs)
are repository-scoped. That alone does not prove isolation between users' branches
inside the same repository. Bind author workers to allowed branch identities and
deny protected-branch changes, branch administration, another user's branches and
cross-repository access at server-side authorization or hook boundaries. Audit every
enabled mutation path, including low-level storage operations and alternative API
versions, before claiming a branch policy cannot be bypassed.

In both inspected branch-push implementations, Lore v0.10.1 permits
`is_service_account` to bypass branch protection. An author worker must not receive
that flag merely because it is an automated client. Promotion authority belongs to
an independently authorized principal. Preserve the server's ordinary push and
merge semantics; add explicit policy or capabilities instead of trusting agent
claims. See the
[legacy push handler](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/grpc/handlers/branch_push.rs)
and [v1 handler](https://github.com/EpicGames/lore/blob/v0.10.1/lore-server/src/grpc/revision/v1/branch_push.rs).

Agent workers cannot read the secret store, resolve provider secrets through the
management API, access signing keys or the SPIFFE Workload API, or administer
OpenShell. Removing a binding must invalidate future credential resolution; already
established Lore sessions must also be tested for bounded expiry/revocation. Never
claim that hiding a token prevents abuse of the permissions that token grants.

## gRPC Integration Gap And Envoy Transition

The inspected OpenShell v0.1.4 TLS proxy advertises only `http/1.1` on its client and
upstream sides. Its inspected HTTP path rejects HTTP/2 prior-knowledge requests.
Lore's gRPC path requires HTTP/2. These source checks identify a real integration
gap; this is not a completed runtime test. See
[TLS ALPN configuration](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-supervisor-network/src/l7/tls.rs)
and [HTTP/2 rejection](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-supervisor-network/src/proxy.rs).

The preferred enhancement is generic HTTP/2/gRPC mediation within OpenShell's
existing proxy and provider architecture. Preserve endpoint and binary policy,
per-sandbox credential ownership, TLS verification, streaming, trailers,
cancellation, limits and denied-operation behavior. Do not adapt Lore to a new
HTTP/1-only facade. Middleware requiring unsupported inspection must still fail
closed; header authorization alone must not imply protobuf-body inspection.

A trusted Envoy bridge is a permitted transition if its sandbox identity is
authenticated and unforgeable across the OpenShell boundary. Current Compose
source-IP routing is not automatically valid after egress passes through shared
supervisors or relays. Never replace that identity with an agent-supplied header.
Raw TLS passthrough can carry gRPC but cannot inject credentials into encrypted
requests. No transition may expose a real token to the author as a workaround.

Retire duplicated agent-egress, credential injection and refresh machinery only
after the replacement passes the same checks. Envoy has no blanket ownership of
service ingress: native OpenShell forwarding owns supported service routes. Retain
only independently demonstrated gaps, such as Lore Desktop gRPC ingress or required
TLS/auth mediation, and remove each bridge when native support qualifies.

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

1. **Native execution and service hosting.** On OpenShell's native Docker driver,
   run a tiny prebuilt MCP service as the canonical process, with a native template,
   scoped provider, restart policy and authenticated `ForwardTcp` access. Verify
   allowed/denied requests, streaming/cancellation, cross-workspace denial, exit/restart and
   supervisor/gateway interruption. Check credential unreadability and current
   generation identity. This needs no model session, Helm, Flux or Kubernetes.
2. **Lore coexistence.** Use one author sandbox, one allowed repository/branch and
   a forbidden repository. Qualify gRPC credential mediation, then clone and push a
   bounded fixture with normal Lore commands. Verify branch/repository confinement,
   both relevant API paths, low-level storage access, renewal and reconnect. Any
   bridge is limited to the verified gap and removed when native support qualifies.
3. **Native access, policies and persistence.** Verify workspace confinement, provider
   binding/rotation, policy advisor review/reload and prover limits. Validate admitted
   volume persistence and cleanup. Exercise missed events, delayed operations and
   gateway crashes; generic recovery fixes belong in OpenShell. Use its native
   diagnostics and credential driver.
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

These are unrun acceptance gates. The architecture is OpenShell-owned execution;
qualification chooses supported configuration or closes a specific native gap, not
whether to keep a duplicate Veoveo implementation by default.

## Reviewed Source Baselines

The design review used Lore v0.10.1 (`95a9a834`) and OpenShell v0.1.4
(`5a7728c304b5528e954e9ae900cf21f84e1a12b1`). Lore source was read from its tag,
not the local checkout's later commits. OpenShell source was inspected in a clean
temporary checkout. No fork, source patch, runtime migration, inference run or CUDA
qualification was performed as part of this plan revision.
