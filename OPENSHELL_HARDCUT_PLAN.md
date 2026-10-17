# OpenShell Hard Cut Plan

Status: the local macOS hard cut and first native Lore/private MCP path pass focused
acceptance. The old factory/application runtime has been removed. Linux is explicitly out of scope for
this phase; its current installation will be replaced separately.

The architecture is [Lore and OpenShell integration](LORE_OPENSHELL_INTEGRATION.md).
Use one native OpenShell Docker-driver path for factories, checks and managed
services. No Kubernetes, Helm, Flux, OpenBao, alternate preview host or compatibility
launcher. Preserve source and durable data independently of workload lifecycle.

## Completed Cut

The recovery checkpoint is the ignored, private installation directory
`state/hardcut/20261016-213611`. It contains twelve Git bundles, five author/reviewer
workspace archives and their manifest/checksums. Eleven repositories initially had
unpublished commits. Original source histories and durable service volumes remain.

Removed the four `vv-dev-*` containers, reviewer, autonomy edge and token worker,
Compose application gateway/MCP containers and obsolete tunnel. Removed the old
`autonomy/`, `runtime/` and agent Envoy SDS launch paths. Removed seven captured
sandbox/cache/secret volumes, six disposable networks and the identified legacy
factory/application image tags. No global Docker prune was used.

The application gateway's `lore-tokens` command and its Envoy filesystem SDS worker
have been deleted. OpenShell owns workload credential custody and policy. Envoy
currently remains only for bootstrap OIDC egress and Desktop/identity ingress.

Durable Lore, PostgreSQL, SeaweedFS, identity and Desktop session/signing state have
not been deleted. Unattached application data and recovery archives are retained;
retaining data does not preserve an executable legacy launcher.

## Current Native Path

Homebrew manages the stock OpenShell 0.1.4 CLI and gateway. The gateway runs as its
native macOS service with verified TLS, generic OIDC, encrypted native credential
storage and telemetry disabled. Local Keycloak provisioning registers the public
PKCE CLI client and private controller. Runtime code uses OIDC discovery and the
native Rust SDK; it has no Keycloak provider switch.

The supervisor image uses a narrow OpenShell transport patch for HTTP/2 REST
method/path admission, authority checks and native header credential mediation.
Unsupported inspection/middleware combinations do not negotiate HTTP/2. Credential
body checks preserve uncompressed gRPC message boundaries; compressed or oversized
messages fail closed under inspection. Cancellation must reset upstream streams
and release relay slots, including after upload finishes.

The maintained Lore checkout is `../lore`, with no temporary `lore-openshell`
worktree. Its CLI has auth-only changes to accept an opaque access token with an
explicit local identity and carry that bearer on repository discovery. The server
remains upstream v0.10.1. Revision, storage, branch and merge behavior is unchanged.

The factory image starts from a pinned Rust toolchain image, with OpenCode 2.0.29
and the patched Lore CLI. It no longer inherits an old Veoveo development image.
The factory has no direct network, capabilities, Docker socket or bootstrap mounts.
Only OpenShell's channel volume is attached. The real Lore JWT stays in the trusted
provider/supervisor; the workload receives its native opaque placeholder.

The first service is a deterministic MCP echo fixture in OpenShell workspace
`vv-first-private`. It uses authenticated native `ForwardTcp`, without a public
service URL. The management bearer is separate from its fixture application token.
Creation, deletion and deletion waits must all select the same workspace.

Exact source revisions, official runtime digest and machine-local build outputs
are recorded in [the component lock](../veoveo-template-installation/openshell/component-lock.json).
Operating commands are in [the native setup](../veoveo-template-installation/openshell/README.md).

## Focused Acceptance

Keep these checks narrow; no inference or coding agent session is required.

- A normal Lore read succeeds for the assigned repository and fails for an existing
  unassigned repository. Method/path policy rejects unlisted RPCs.
- Real credentials are absent from the workload environment. Bootstrap/operator
  paths and Docker socket are inaccessible. Raw TCP attempts to a public endpoint,
  identity administration and the OpenShell management endpoint are denied.
- Native provider rotation is installed and a subsequent Lore read succeeds without
  restarting the factory. The initial grant is read-only and expires in fifteen
  minutes; operator reprovisioning is explicit, with no replacement token daemon.
- MCP initialization, notification, tool discovery and echo invocation succeed over
  native forwarding. Missing application credentials and an authenticated workspace
  nonmember fail. Native target authorization hides the resource with `NOT_FOUND`.
- Recreate the private service twice while a same-named default-workspace sentinel
  exists. Its identity must remain unchanged; clean up only the test-owned sentinel.
- HTTP/2 regression tests verify gRPC streaming/trailers, authority and path denial,
  header custody, message framing, policy-generation fencing and cancellation before
  and after response headers. More cancellations than the slot limit must succeed.
- Restart the native gateway, then repeat the Lore and private service checks.
- Reload the official Desktop's remote catalog after auth deployment. CLI success is
  not Desktop acceptance. Remote graph/diff and automatic expired-session recovery
  remain separate requirements.

The [committed acceptance record](../veoveo-qualify-openshell/README.md#focused-macos-native-path)
and component lock identify the exact tested source and running images. A prior image's successful check cannot qualify a later build. Record local
commits separately from publication and upstream PRs.

## Infrastructure Placement

Move compatible long-running Lore, database, storage and application services onto
native OpenShell workloads with operator-owned workspaces and admitted persistent
volumes. Use the same lifecycle and forwarding interfaces. Qualify storage access,
backup/recovery and Desktop's native gRPC path before moving their durable state.
Do not add another Veoveo scheduler, token broker or log service.

Local Keycloak, its dedicated PostgreSQL database and HTTPS endpoint stay outside
the gateway in the minimal Compose bootstrap. OpenShell currently initializes OIDC
before creating/recovering workloads, so hosting its only issuer there creates a
cold-start dependency loop. An installation using external Entra or another issuer
needs no local Keycloak stack. Running even the issuer inside OpenShell would need
a native bootstrap/recovery solution, not weaker authentication.

Bootstrap resources and durable state are independent of disposable Lore branches.
Their lifecycle owner may be OpenShell without making them preview-owned data.

## Subsequent Adoption

The first workable local path does not qualify the whole platform. Still required:

- Move the remaining compatible infrastructure and actual MCP components to native
  definitions; qualify persistence, registration and relevant service operations.
- Put thin source/revision-to-runtime bindings in an existing trusted Veoveo process.
  A Lore push selects an immutable revision, runs checks and publishes an approved
  image. Keep build/publication credentials outside agent-controlled jobs.
- Implement arbitrary Lore-defined compositions, inheritance and two private service
  overrides, authorization, no silent fallback, branch deletion and active-Task
  version/retention rules. No hardcoded environment labels.
- Replace the Linux installation and qualify the same path with native CDI and a
  tiny checked CUDA computation. Do not inspect or migrate the old Linux setup now.
- Complete Desktop remote graph/diff and automatic reauthentication acceptance, and
  qualify external Entra/customer providers independently.

Prefer native schemas, APIs and extension points. Maintain narrow VeoveoAI patches
only for demonstrated gaps, preserving Lore/OpenShell security and ordinary logic.
