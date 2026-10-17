# Lore And OpenShell Integration

Status: accepted infrastructure direction for design and qualification, revised on
2026-10-16. Lore is the source and revision authority; OpenShell is the factory
execution and sandbox access authority. Veoveo connects those authorities to checks,
service composition and promotion. Implementation and migration are pending.

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

| Authority | Owns | Veoveo adds |
|---|---|---|
| Lore | Repositories, branches, immutable revisions, source transfer and native authorization | Binding an authenticated worker to allowed repositories and branches; branch events to checks and environment lifecycle |
| OpenShell | Sandbox lifecycle, execution, templates, resource requests, filesystem/network policy, workspace membership and provider custody | Approved source/revision bindings and deployment-specific admission through supported extensions |
| Existing component checks and CI | Test commands, build outputs and job results | Correlation to the exact Lore revision, template image, policy and resulting artifact digests |
| Helm, Flux and Kubernetes | Service packaging, configuration reconciliation, replicas, readiness and deployment cleanup | Approved environment composition and ownership declarations |
| Veoveo MCP gateway | Application authorization, discovery, delegation and Tasks | Base-environment selection, personal overrides and immutable deployment routing |
| OpenBao | Shared secret storage and developer retrieval | Scoped grants using existing APIs and qualification of OpenShell's Vault-compatible driver |

The factory integration uses OpenShell's SDK and native resources. It does not keep
a second authoritative sandbox inventory, restart controller, workspace membership
database, credential vault or network policy engine. Small records linking a Lore
branch/revision to an OpenShell resource and a deployment are necessary coordination
state, and reconcile against the authoritative systems.

OpenShell provides a [Rust SDK](https://docs.nvidia.com/openshell/v0.1.4/sdk/rust),
[templates](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/templates),
[workspaces](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/workspaces), and
[credential drivers](https://docs.nvidia.com/openshell/v0.1.4/extensibility/drivers).
Reference their native configuration and schemas instead of copying every setting
into a Veoveo wrapper.

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

The target deployment uses OpenShell's Kubernetes driver with k3d on the Mac and K3s
on Linux. The Docker driver is suitable for the first bounded coexistence probe.
Each OpenShell gateway selects one backend; use existing gateway selection for local
CPU and remote Linux GPU work. Kubernetes schedules the admitted CPU, memory and GPU
requests. Do not add a Veoveo GPU scheduler or silently substitute CPU for CUDA.

Dev, staging and stable remain compositions of separate service deployments. A
factory sandbox can run temporary test fixtures; it does not contain an entire
shared environment. Minimal runtime preview containers remain untrusted until
admitted and retain restricted network access, resources and credentials. An
OpenShell-hosted preview is the preferred opportunity to qualify for private,
unmerged versions; shared dev/staging/stable services retain normal deployment
controllers. Hosting and ingress contracts must pass before selecting it as the
preview default.

The [runtime documentation](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/runtimes)
describes the supported drivers. The v0.1.4
[MicroVM driver README](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-driver-vm/README.md)
still marks that driver experimental; it is not the initial default.

## Native Private Preview Hosting

OpenShell can expose long-running HTTP services in a sandbox through a
gateway-managed service URL. Qualify using a dedicated preview sandbox running the
component's minimal runtime image, separate from the author sandbox and its mutable
source. Closing the editor or stopping the author must not stop the preview. If this
passes, use native sandbox/service lifecycle for private previews instead of writing
a separate preview-container launcher. See
[service forwarding](https://docs.nvidia.com/openshell/v0.1.4/how-it-works/sandboxes/overview).

In v0.1.4, forwarded service routes bypass control-plane RPC/OIDC authorization;
the listener's TLS policy still applies. Bearer passthrough, when enabled, delivers
the application's bearer to the service and is not a gateway authorization check.
A service URL is therefore not evidence of private workspace access. Keep preview
endpoints private to the trusted gateway/ingress or enforce explicit application
authorization at the edge. Test that another user cannot call the endpoint directly
to bypass the selected composition or its permissions.

Forward only a short-lived, appropriately scoped application credential bound to
the selected preview/context. Never forward a user's refresh token, OpenShell
management credential or a production-wide bearer to agent-authored code. Verify
MCP initialization, discovery, SSE/streaming, cancellation, body limits, service
readiness, restart and active-Task behavior through the native forwarding path.
Sandbox readiness alone does not establish application health.

OpenShell remains the sandbox lifecycle authority. The Veoveo MCP gateway remains
the version-selection and application authorization authority. Flux and Kubernetes
continue managing shared baseline workloads and persistent infrastructure; adoption
of native private preview hosting does not imply moving databases, identity or the
entire stable environment into a sandbox.

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

OpenShell's
[Vault-compatible driver](https://github.com/NVIDIA/OpenShell/blob/v0.1.4/crates/openshell-driver-vault/src/lib.rs)
supports KV storage and Kubernetes or token-file authentication. Test that driver
against OpenBao before building any new connector. Human `.env` distribution uses
OpenBao's native UI/CLI separately; those files and login sessions stay outside
factory sandboxes.

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
after the replacement passes the same checks. Envoy retains service/Desktop ingress
and any independently required trusted-service routes. It is not a second mandatory
factory proxy once OpenShell can own that path securely.

## Optional QUIC Storage Transport

Lore provides a binary QUIC storage transport and gRPC storage with equivalent
logical operations. QUIC's `lore-storage/0.4` transport is designed for low-overhead
fragment transfer; actual improvement depends on workload and network conditions.
Revision/control APIs and storage transport are separate choices; accelerating
storage with QUIC does not remove the gRPC control-path qualification. See
[Lore's storage design](https://github.com/EpicGames/lore/blob/v0.10.1/docs/explanation/system-design.md).

OpenShell v0.1.4 mediates TCP and DNS, and its inspected socket broker denies
general external UDP. Thus Lore QUIC is not enabled by an existing network allowlist
or by selecting the Docker/Kubernetes driver. See the
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
the factory or preview work.

## Checks Artifacts And Deployment

OpenShell executes author, build and verification commands; it does not decide
which changes may enter shared dev, staging or stable. Use component-owned test
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
workflow engine. Publish approved immutable OCI deployment bundles for Flux. A
human-friendly Lore branch follows revisions; the deployed record always names the
resolved revision and digests. Recheck active branch generation and permissions at
publication and deployment. Long-lived MCP Tasks keep their version binding.

Lore, OpenShell, their policy/credential bootstrap, OpenBao and identity services
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

1. **Lore and OpenShell coexistence.** Use one factory sandbox, one allowed test
   repository/branch and one forbidden repository. Reproduce the native transport
   limitation, choose the smallest secure path, then clone, commit/push a bounded
   fixture and fetch the exact revision through normal Lore commands. Verify denied
   cross-repository and protected/other-user branch operations, no readable real
   tokens or signing keys, expiry/renewal, and reconnect. Test both supported API
   paths and low-level storage access relevant to the admitted client. No inference
   or coding-agent session is required.
2. **Native OpenShell integration.** Provision through its SDK/template and enforce
   the binding with native workspace roles and an interceptor where needed. Verify
   that names/labels cannot change grants, unsupported middleware fails closed,
   events can be missed without losing desired state, and deletion cannot be undone
   by a delayed job. Qualify the OpenBao credential driver with no custom connector.
3. **Kubernetes and CUDA.** Repeat the relevant boundary tests on local k3d and Linux
   K3s with OpenShell's Kubernetes driver and an enforcing CNI. On Linux, execute a
   small actual CUDA kernel and check the result. Distinguish container and VM
   isolation; do not treat `nvidia-smi` alone as compute qualification.
4. **Private preview hosting and selection.** Qualify dedicated OpenShell runtime
   sandboxes and native service forwarding for Alice/Bob previews of one tiny MCP
   service, with an inherited shared dev service. Deny direct endpoint access from
   unauthorized users, and verify authenticated routing, discovery, downstream
   context, no silent fallback, stream/cancellation behavior, Task version ownership
   and replacement-instance recovery. If native hosting does not meet the contract,
   keep restricted Kubernetes preview deployments rather than weaken the boundary.
   This is the earlier routing slice, after the critical factory/source boundary.
5. **Branch to preview lifecycle.** Push an environment change, run fresh checks,
   publish immutable artifacts and reconcile through Flux. Delete one preview and
   verify another preview, shared services, retained state and platform bootstrap
   survive. Promote the tested artifacts without rebuilding them as a new version.
6. **Optional QUIC.** Qualify mediation and credential custody, then compare measured
   transfers with gRPC. Keep it disabled if the benefit or boundary is insufficient.

Mac and Linux qualification are recorded separately. These are acceptance gates,
not claims that the integrations have passed.

## Reviewed Source Baselines

The design review used Lore v0.10.1 (`95a9a834`) and OpenShell v0.1.4
(`5a7728c304b5528e954e9ae900cf21f84e1a12b1`). Lore source was read from its tag,
not the local checkout's later commits. OpenShell source was inspected in a clean
temporary checkout. No fork, source patch, runtime migration, inference run or CUDA
qualification was performed as part of this plan revision.
