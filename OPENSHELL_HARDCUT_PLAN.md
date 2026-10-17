# OpenShell Hard Cut Plan

Status: the local macOS hard cut and direct-IdP Lore authoring path pass focused
acceptance. Clone/edit/push, the small branch hook, native credential renewal,
source withdrawal, applied binding-removal/detach, termination and gateway recovery
are qualified. The Desktop adapter/signer/ingress are retired and durable data is
preserved. Complete low-level branch isolation is superseded, not claimed passed.
Linux remains outside this phase and its existing installation is untouched.

Ownership and exact scope are in [Direct Lore Credentials Through OpenShell](LORE_DIRECT_OIDC_PLAN.md).
Desktop graph/diff and browser-session recovery were withdrawn, not marked passed.

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
remains only for trusted bootstrap OIDC egress and identity ingress.

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
is a v0.10.1 extension build with one existing pre-push hook. Verified factory
identities map to operator-owned repository/branch assignments. Ordinary
repository authorization, revision, storage, branch protection and merge behavior
are unchanged; no new transport or authorization middleware is present.

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

Keycloak now issues ordinary repository-scoped grants directly. Lore uses native
OIDC discovery/JWKS, one issuer, strict type/audience/expiry checks and denied baseline
access. The native provider owns client-secret custody, automatic renewal and injection.
The smoke RPC policy remains read-only. No manual token file or Veoveo signer is in
this path. Empty native catalog listing is expected; factories receive known assigned URLs.


## Historical First-Path Smoke Acceptance

Keep these checks narrow; no inference or coding agent session is required.

- A normal Lore read succeeds for the assigned repository and fails for an existing
  unassigned repository. Method/path policy rejects unlisted RPCs.
- Real credentials are absent from the workload environment. Bootstrap/operator
  paths and Docker socket are inaccessible. Raw TCP attempts to a public endpoint,
  identity administration and the OpenShell management endpoint are denied.
- Native provider rotation is installed and a subsequent Lore read succeeds without
  restarting the factory. The initial smoke policy is read-only and its credential
  expires in fifteen minutes; operator reprovisioning is explicit, with no
  replacement token daemon.
  This proves installation of a replacement credential, not automatic Lore grant
  renewal, expiry handling or revocation. OpenShell CLI OIDC refresh is a separate
  credential path and does not establish Lore grant renewal either.
- MCP initialization, notification, tool discovery and echo invocation succeed over
  native forwarding. Missing application credentials and an authenticated workspace
  nonmember fail. Native target authorization hides the resource with `NOT_FOUND`.
- Recreate the private service twice while a same-named default-workspace sentinel
  exists. Its identity must remain unchanged; clean up only the test-owned sentinel.
- HTTP/2 regression tests verify gRPC streaming/trailers, authority and path denial,
  header custody, message framing, policy-generation fencing and cancellation before
  and after response headers. More cancellations than the slot limit must succeed.
- Restart the native gateway, then repeat the Lore and private service checks.
- Historical Desktop catalog reload passed for the adapter deployment. Desktop
  graph/diff and automatic expired-session recovery were not completed; the user
  withdrew those requirements on 2026-10-17. They no longer block this plan.

The [committed acceptance record](../veoveo-qualify-openshell/README.md#focused-macos-native-path)
and component lock identify the exact tested source and running images. A prior image's successful check cannot qualify a later build. Record local
commits separately from publication and upstream PRs.

## Required Lore Acceptance

The authoring gates below follow the revised scope in the architecture's
[Lore coexistence and credential boundaries](LORE_OPENSHELL_INTEGRATION.md#qualification-sequence),
not a comprehensive branch-authorization system. The original smoke path stays
read-only through its OpenShell RPC policy. Native Lore grants with an empty
action array still allow ordinary unprotected pushes. Use ordinary repository
credentials for the disposable authoring fixture; never add a service-account
protection bypass merely because it is a factory.
The broad `068cf857` server changes are set aside by a revert; preserve the earlier
CLI auth fixes and unrelated work. Hook modules, configuration and tests own this
slice; identify a concrete hook API gap before expanding it.

- [x] **Bounded clone and push.** Use a disposable fixture repository and an assigned
  branch with normal Lore CLI commands. Declare file/byte limits and operation
  deadlines, clone and verify the fixture, make one small edit, then push and verify
  the resulting revision/content. Use mediated gRPC storage; no inference session
  or QUIC bypass is needed.
- [x] **Normal-push assignment guard.** Enable Lore's existing `BranchPush` pre-hook
  for designated verified factory identities. Trusted installation/integration
  configuration supplies their repository and branch IDs, outside agent control.
  Test assigned-branch success, a clear wrong-branch rejection naming both targets,
  both existing push API hook calls, unchanged human permissions and native branch
  protection. No new token claim, authorization middleware, duplicated RPC allowlist
  or stream-expiry behavior. This is not proof of complete storage/API isolation.

The former comprehensive branch-confinement gate is **replaced**, not passed by
these narrower hook tests. Ordinary repository authorization remains in force.

Local evidence (2026-10-17): Lore `cb2c191f` is a hook/config/test extension of
`162df649`; the broad `068cf857` patch was reverted by `cb56081e`. The source diff
contains no authorization, RPC handler or transport edits. Seven focused hook tests
pass, including both existing push API calls with verified identity and spoofed
metadata. The native CLI fixture pushed a 7-byte final file and independently
cloned it, committed a separate change on `other-author`, and received the exact
assignment rejection. It read native protection metadata, verified the protected
push failed and remote content stayed unchanged, then pushed as an unassigned
human. Stock clients hide details of native `PermissionDenied`; the hook uses its
existing `FailedPrecondition` status so the workflow message remains visible.
Native push-handler tests separately check the specific protection status.

The qualification harness (`2021ddb`) also passed injected failures after workspace,
profile, provider and sandbox admission, including admission before readiness.
Cleanup runs for partial setup and workflow failures, attempts all owned resources,
and preserves a labelled pre-existing workspace. Each workload command is limited to
20 seconds, the workflow to 120 seconds, and setup plus workflow to 180 seconds.
Temporary OpenShell resources were removed and test assignments were cleared.
Exact source and running image IDs are in the installation component lock. This
fixture made no inference calls and kept the original smoke path read-only.

These completed checks used the former Veoveo signer. Preserve them as historical
evidence and rerun the workflow under the direct IdP before accepting that cutover.

## Separate Credential Lifecycle Qualification

Keep this work separate from the hook implementation. Follow
[the direct IdP plan](LORE_DIRECT_OIDC_PLAN.md#implementation-order-and-acceptance)
in order; it supplies the exact configuration, limits and evidence requirements.

- [x] **Direct issuer preparation.** Provision ordinary repo-scoped IdP clients and
  native OAuth client-credentials providers. Use built-in Keycloak mappers locally;
  no adapter token endpoint. Verify `at+jwt`, audience, subject, resource claims,
  scope denial and five-minute expiry without exposing credentials. Back up state.
- [x] **Native Lore cutover and workflow regression.** Configure native OIDC/Tier 2,
  direct discovery/JWKS and public CA trust. Remove adapter auth/catalog references,
  update trusted hook assignments to IdP subjects, and rerun bounded clone/push,
  hook, protection, repo-denial and custody checks. Old signer and management
  bearers must fail. Keep the smoke policy read-only. Empty native catalog listing
  is expected; provide known assigned repository URLs.
- [x] **Automatic renewal and reconnect.** Observe at least two native automatic
  refreshes, preserving the original opaque reference and running sandbox. Verify
  real operations and a fresh connection after original `exp` plus verifier leeway.
  No manual rotate/update/reconfiguration during the observation period. Human
  OpenShell CLI refresh is not this credential path.
- [x] **Source withdrawal and renewal failure.** Disable only test A's IdP client,
  observe native refresh failure, and verify new operations/reconnects fail within
  the last issued token's expiry/leeway bound. Independent B continues to renew.
- [x] **Applied detach and established-work termination.** Separately detach A's
  provider after removing its policy binding, await native `REVOKED`, and reject
  saved-reference requests. This is the supported combined transition, not detach alone. Observe a
  real notification stream across withdrawal; do not claim detach/expiry cancels
  already-forwarded requests. Stop A with native sandbox lifecycle, await stopped
  state and verify termination while B remains operational. No Lore stream patch.
- [x] **Recovery and adapter retirement.** Verify native stored refresh after a
  gateway restart and owned-resource cleanup. Remove the Desktop adapter/runtime,
  routes, signer/manual token-file dependencies and active lock entries after the
  direct path passes. Preserve source/history/private recovery state and durable
  data. Update operator instructions and actual source/image acceptance records.


Local direct-issuer evidence (2026-10-17): six identities passed signed-token and
scope-negative preflight. The workflow, custody, former-signer/management-token
rejection and idempotent provisioning checks passed. Automatic renewal observed
two native refreshes and successful operations after original expiry plus 60-second
leeway, using the original reference and unchanged process. This is separate from
human CLI refresh and the historical manual-rotation test.

Disabling only A's client produced native `oauth_invalid_client` with recovery
`fix_configuration`. First fresh-request denial was 299 seconds after disable and
55 seconds before the recorded expiry/leeway bound. A received a branch event after
disable; none was observed after expiry. Native stopped state, execution rejection
and exited workload containers were checked. B remained operational and renewed.
Binding removal was applied before detach; its applied `REVOKED` receipt followed
10 seconds after the detach request. Saved-reference access failed, and no event was
observed after that combined transition. Native stop ended the detached factory.

Healthy gateway recovery preserved sandbox identity and automatic stored refresh.
The qualification corpus records renewal and remaining gates separately with their
actual fixture images; interrupted attempts are not complete runs. Four partial-setup
failure points and a pre-existing workspace sentinel passed. The adapter/container,
Desktop edge, legacy provider/profile, manual signer helpers and old Desktop IdP
registration are retired. Private recovery is under installation
`state/recovery/direct-oidc-20261017-012804`; durable data volumes were preserved.
No new Lore authorization/transport changes or OpenShell core patches were needed.
Exact sources, image IDs, sanitized timestamps and receipt are in the component lock.

Record the exact source/image/policy/grant scope, declared limits and measured
results for each gate. Keep unimplemented or unrun cases open; do not infer them
from successful reads, rotation, cancellation tests or gateway restart recovery.

## Infrastructure Placement

Move compatible long-running Lore, database, storage and application services onto
native OpenShell workloads with operator-owned workspaces and admitted persistent
volumes. Use the same lifecycle and forwarding interfaces. Qualify storage access,
backup/recovery and the accepted native Lore gRPC path before moving durable state.
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

- Qualify Entra/customer issuers and interactive human Lore login separately. The
  local direct-issuer authoring/credential lifecycle gates above are complete.
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
- Qualify external Entra/customer providers independently against the native Lore
  claim/refresh contract. Desktop graph/diff and reauthentication are withdrawn.

Prefer native schemas, APIs and extension points. Maintain narrow VeoveoAI patches
only for demonstrated gaps, preserving Lore/OpenShell security and ordinary logic.
