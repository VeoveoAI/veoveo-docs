# OpenShell Hard Cut Plan

Status: the local macOS hard cut and direct-IdP Lore authoring path pass focused
acceptance. Clone/edit/push, the small branch hook, native credential renewal,
source withdrawal, applied binding-removal/detach, termination and gateway recovery
are qualified. The Desktop adapter/signer/ingress are retired and durable data is
preserved. Complete low-level branch isolation is superseded, not claimed passed.
The next authorized goal is a native reference Linux deployment at
`veoveo.bioma.ai`, real signed WaveSpeed webhook qualification and final bounded
OpenCode MiMo acceptance. These gates are not yet qualified; GPU/CUDA remains
separate. The existing remote installation has only been inspected read-only so far.
The Hub → Time and prepared-source factory milestone now also passes locally:
deployed application qualification, exact Git/Lore correspondence, no-model
preflight, one bounded model build and Time deployment from that same Lore revision.
Private Artifact and the private fake-provider Media slice also pass, including
Media lifecycle qualification, direct Mac byte transfer and the final bounded
OpenCode MiMo client scenario. A separately authorized one-shot real WaveSpeed
polling run also passes: one decoded PNG through Hub/Media/Artifact, with exact
bytes and USD 0.003 actual usage. Public webhooks remain unqualified.

Ownership and exact scope are in [Direct Lore Credentials Through OpenShell](LORE_DIRECT_OIDC_PLAN.md).
Desktop graph/diff and browser-session recovery were withdrawn, not marked passed.

The architecture is [Lore and OpenShell integration](LORE_OPENSHELL_INTEGRATION.md).
The [platform visual guide](diagrams/veoveo-platform.html) must be updated with every
major architecture change and whenever an illustrated pending path is qualified.
Static guide checks pass (three views, unique IDs, JavaScript/JSON and local links).
Chrome browser QA passed on 2026-10-17 using a temporary, loopback-only HTTP server
for the standalone guide: all three views, component details, navigation, zoom/fit
and SVG/PNG exports. The earlier local-file URL restriction no longer blocks this
check; no browser security settings were changed.
Use one native OpenShell Docker-driver path for factories, checks and managed
services. No Kubernetes, Helm, Flux, OpenBao, alternate workload host or compatibility
launcher. Preserve source and durable data independently of workload lifecycle.

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

Source selection, builds and explicit-image provisioning are in
[the native setup](../veoveo-template-installation/openshell/README.md).
Native OpenShell configuration and Docker build inputs determine what runs.

Keycloak now issues ordinary repository-scoped grants directly. Lore uses native
OIDC discovery/JWKS, one issuer, strict type/audience/expiry checks and denied baseline
access. The native provider owns client-secret custody, automatic renewal and injection.
The smoke RPC policy remains read-only. No manual token file or Veoveo signer is in
this path. Empty native catalog listing is expected; factories receive known assigned URLs.

## Native Regression Checks

Keep these checks narrow; no inference or coding agent session is required.

- A normal Lore read succeeds for the assigned repository and fails for an existing
  unassigned repository. Method/path policy rejects unlisted RPCs.
- Real credentials are absent from the workload environment. Bootstrap/operator
  paths and Docker socket are inaccessible. Raw TCP attempts to a public endpoint,
  identity administration and the OpenShell management endpoint are denied.
- Native automatic Lore credential renewal crosses expiry/reconnect without
  replacing the factory or its captured reference. The smoke policy remains read-only;
  bounded authoring and timed lifecycle checks use disposable fixtures below.
- MCP initialization, notification, tool discovery and echo invocation succeed over
  native forwarding. Missing application credentials and an authenticated workspace
  nonmember fail. Native target authorization hides the resource with `NOT_FOUND`.
- Recreate the private service twice while a same-named default-workspace sentinel
  exists. Its identity must remain unchanged; clean up only the test-owned sentinel.
- HTTP/2 regression tests verify gRPC streaming/trailers, authority and path denial,
  header custody, message framing, policy-generation fencing and cancellation before
  and after response headers. More cancellations than the slot limit must succeed.
- Restart the native gateway, then repeat the Lore and private service checks.

Run the [current qualification commands](../veoveo-qualify-openshell/README.md#focused-macos-native-path)
and use their generated output to investigate failures. A prior build's successful
check cannot qualify a later build.

## Required Lore Acceptance

The authoring gates below follow the revised scope in the architecture's
[Lore coexistence and credential boundaries](LORE_OPENSHELL_INTEGRATION.md#qualification-sequence),
not a comprehensive branch-authorization system. The original smoke path stays
read-only through its OpenShell RPC policy. Native Lore grants with an empty
action array still allow ordinary unprotected pushes. Use ordinary repository
credentials for the disposable authoring fixture; never add a service-account
protection bypass merely because it is a factory.
Preserve the existing CLI auth fixes and unrelated work. Hook modules, configuration
and tests own this slice; identify a concrete hook API gap before expanding it.

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
  hook, protection, repo-denial and custody checks. Management bearers must fail.
  Keep the smoke policy read-only. Empty native catalog listing
  is expected; provide known assigned repository URLs.
- [x] **Automatic renewal and reconnect.** Observe at least two native automatic
  refreshes, preserving the original opaque reference and running sandbox. Verify
  real operations and a fresh connection after original `exp` plus verifier leeway.
  Check a unique per-launch marker in fresh command replies to establish process
  continuity; PID equality and a persisted readiness file are insufficient.
  No manual rotate/update/reconfiguration during the observation period. Human
  OpenShell CLI refresh is not this credential path.
- [x] **Source withdrawal and renewal failure.** Disable only test A's IdP client,
  observe native refresh failure, and verify new operations/reconnects fail within
  the last issued token's expiry/leeway bound. Independent B continues to renew.
  Restore only state changed by this run, preserving its previous enabled value.
- [x] **Applied detach and established-work termination.** Separately detach A's
  provider after removing its policy binding, await native `REVOKED`, and reject
  saved-reference requests. This is the supported combined transition, not detach alone. Observe a
  real notification stream across withdrawal; do not claim detach/expiry cancels
  already-forwarded requests. Stop A with native sandbox lifecycle, await stopped
  state and verify termination while B remains operational. No Lore stream patch.
- [x] **Recovery and adapter retirement.** Verify native stored refresh after a
  gateway restart and owned-resource cleanup. Remove the Desktop adapter/runtime,
  routes and signer/manual token-file dependencies after the
  direct path passes. Preserve source/history/private recovery state and durable
  data. Update operator instructions.

Current local acceptance (2026-10-17): direct-issuer preflight, authoring, custody,
native protection, management-token denial and automatic renewal pass. Two native
refreshes and post-expiry/leeway operations retained the original reference and
process, verified by unique launch IDs in fresh replies. Source withdrawal produced
native renewal failure; first observed fresh-request denial was 299 seconds after
disable. Detach reached applied `REVOKED` 10 seconds after its request, after binding
removal had already become active. Native stop terminated the workloads; B stayed
operational. OpenShell gateway recovery preserved sandbox identity and stored
refresh while restarting the process. Recovery preserved an already-disabled A; cleanup and the
pre-existing-workspace regression pass. The earlier detach probe does not establish
uninterrupted process lifetime. Durable data is preserved and the adapter is retired.

Generated test reports remain under installation `state/openshell/lore-direct/`.
Keep unrun cases open; do not infer them from unrelated successful checks.

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

The first workable local path does not qualify the whole platform.

The qualified private Media application slice is specified in
[Planned Adoption Of Existing Veoveo Components](LORE_OPENSHELL_INTEGRATION.md#planned-adoption-of-existing-veoveo-components)
and detailed in the [visual guide](diagrams/veoveo-platform.html#next).
Hub, Time, private Artifact and Media belong to the guide's
[current platform](diagrams/veoveo-platform.html#platform), alongside Lore and OpenShell.
The completed local milestone is **working Hub → Time integration, followed by a
build-only factory pass over prepared Time source and deployment from that revision**.
This is a local Mac installation with no users or live deployment to preserve:
rebuild and replace local services directly. Complete integration and debugging in
the main development session before assigning work to the factory model. These
steps now pass on this Mac. Hub/Time application qualification, exact Git/Lore
source correspondence, factory preflight, the bounded model build and final Time
readiness/Hub-call verification are recorded below. The private native Artifact
follow-up and private fake-provider Media slice also pass. One real WaveSpeed
polling run also passes separately; other provider models, public webhooks and
broader source-to-deployment automation remain separate work.

Baseline source state (2026-10-17; later publication and cleanup are recorded in the
[MCP/workspace follow-up](#mcp-conformance-and-workspace-sanitation-follow-up--2026-10-18)):

| Repository | HEAD | State relevant to this milestone |
|---|---|---|
| Core | `0e4f26a` | Committed naming preparation; clean |
| Hub SDK | `a1d9d65` | Committed rename and generic environment-bearer CLI input; clean |
| Time | `90eabf9` | Naming/dependencies, environment-bearer acceptance, restart probes and diagnostics checked, committed and pushed; clean |
| Artifact / MCP template | `302d038` / `21be15c` | Artifact native bearer acceptance, restart probes and runtime trust/key preparation checked, committed and pushed; MCP template unchanged |
| Hub | `00a7e7b` | Rename, Lore-issuer removal, external-issuer handling, native transport and SQLx metadata checked, committed and pushed; clean |
| Media | `031c913` | Reviewed naming changes checked, committed and pushed; clean; runtime adoption follows Artifact |
| Installation | `e1d8800` | Native Hub/Time setup and factory workflow retained; private Artifact policies, mounts, registration and explicit Hub binding committed and published |
| OpenShell qualifier | `447bd88` | Native ingress probe and operator harness checked; initial archive-related push refusal is resolved: this commit is now published on `origin/main`, with archive status restored |
| Docs | This change | Candidate, architecture, checklist, split plan and visual guide reconciled with deployed Hub/Time and private Artifact evidence; Chrome browser/export QA passed |
| Lore / OpenShell | `cb2c191f` / `0e85111e` | Lore clean; native DNS/TLS and Tasks qualified; Tasks runtime source `45f3b534`, followed by a docs-only clarification; OpenShell branch pushed to the maintained VeoveoAI fork |

Prior component test reports and committed preparation do not replace fresh
checks or qualify deployed Hub/Time sandboxes. Preserve these working trees,
review the combined diff and record fresh validation against the source actually
being deployed. Hub/Time acceptance, identical Git/Lore Time source, the bounded
factory build and deployment from that Lore revision now pass.

First cleanup implementation (2026-10-17, now included in Hub `00a7e7b`): the combined Hub diff
removes the obsolete Lore issuer/generator options
and rejects retired `lore` configuration. New regressions request Lore resources as
both local callers while retaining MCP grants, and reject local issuance for an
external authorization server even with unused local key material present. The
retained registration, forwarding and delegation suites passed in the fresh Hub gate.
Media's existing rename/pins were reviewed; no extra domain changes were needed.
Hub/Core/SDK pins are internally consistent, and all 78 non-migration Hub SQL files
have exact-byte SQLx metadata with valid query hashes; the database-backed SQLx
metadata check also passed.

Fresh component validation against these working trees: Hub `cargo deny --locked
check` and `docker build --target check .` passed, including SQLx, formatting,
Clippy, per-feature checks and nextest (197 passed, one native transport fixture
test skipped). The check-stage image is
`sha256:d547b2005f8e734e344f01935faab0f3af2ccf86518c4fd896eb5eaac3f33fd0`.
Media `cargo check --locked --all-targets --all-features` passed. Installation Python
syntax, Compose configuration and a temporary-copy egress render passed. Envoy
validation through Compose hit a Docker address collision before Envoy ran;
the same pinned Envoy binary passed validation with networking disabled and only
its configuration and read-only TLS mounts. Time's stale Compose instructions
and key-based acceptance input have since been replaced in source with native
workflow instructions and member/admin environment-bearer inputs. Time's three
focused bearer-input tests passed, followed by its full Docker check stage:
SQLx metadata, formatting, strict Clippy, dependency policy, feature matrix and
nextest (150 passed, six live acceptance tests skipped). Its check image is
`sha256:164695cea669b45953cbfe93ba5e802d89dfa01af6141c5cb1c67bda551b2219`.
The lock adjustment only removes the unused SDK client-credentials dependency
edge and unreachable `veoveo-oauth` package; dependency versions and revisions
are unchanged.
These are component checks, not deployed Hub/Time acceptance.

Earlier build artifacts (superseded Hub image; not deployed at that checkpoint): Hub `docker build --target runtime` passed
from the checked working tree and produced `veoveo/hub:native-time-prep`,
`sha256:667ccf7220bc1b334fdbd812c907187b0841d9889ce1aa961022defac5814fe1`
(`linux/arm64`). Time's unchanged `dev` target is available as
`veoveo/time-dev:native-time-prep`,
`sha256:6382e247f3b0c077dafa5bd5a28418663847d0be55247f230684849f03c6b396`
(`linux/arm64`), for the later factory `BASE`.

The Hub dependency policy now admits only the official NVIDIA/OpenShell repository
at its unchanged Cargo pin. The coordinator approved one advisory-specific
`RUSTSEC-2025-0134` exception for locked `rustls-pemfile` 2.2.0 via pinned
`openshell-core`: informational maintenance notice, no patched version, remove
when the SDK drops that dependency. Installed cargo-deny 0.20.2 supports ID/reason
only, so caller scoping is documented rather than mechanically enforced;
`unused-ignored-advisory = "deny"` detects a stale exception. Other advisory/source
policy remains strict. This disposition is not a claim that dependencies have no
vulnerabilities; the fresh dependency gate passed both directly and in the Hub image.

Installation source now removes the old Hub virtual host/cluster and application
aliases from identity Envoy/Compose, deletes the Docker process/reexec helper and
stops provisioning its obsolete application client. Identity certificates name the
canonical identity endpoint and its restricted native public-key alias.
`identity/configure-lore`, management-client setup and Keycloak bootstrap remain.
The Hub README now describes generated local test fixtures and the pending native
runtime contract; identity instructions no longer launch/configure a Compose Hub.
The later runtime inventory found the old `vv-egress` OIDC proxy still running
without a configured consumer or active connections. Its Compose service, renderer
and tracked template are removed; Compose validation passed and only that disposable
container was stopped/removed. Ignored local output and all data volumes were
preserved. Verified Keycloak discovery still returns HTTP 200. `vv-identity-edge`
remains solely for Keycloak HTTPS bootstrap. Its live process now uses the cleaned
configuration, with no Hub route. The explicit leaf renewal preserved the CA and
private key and backed up the old pair privately. Only that listener was recreated.
TLS-verified canonical discovery and the alias's exact JWKS GET return 200; alias
POST/HEAD, admin/token paths, other realms and path suffixes return 403. The same
route and canonical forwarding-header behavior passed an isolated pinned-image
test. Subsequent native client calls passed Hub application admission; online key
rotation remains unqualified. Hub and Time were deployed after this cleanup checkpoint.

Review also found that native Hub transport is captured at startup while catalog
reload could accept different placement. The correction rejects changed native
configuration before durable revision publication and again during catalog
replacement, with focused regressions. Its fresh full Hub gate passed (199 tests,
one native fixture skipped), producing check image
`sha256:ea8200eb4e60c64406564aa5857331c808a80a33615cee4e24c311e9fb0c59b0`.
Deployment preparation then found external IdP clients were incorrectly required
to supply Hub-held authentication material. The correction retains hosted-client
requirements, admits actual external confidential-client metadata without local
custody, and refuses local issuance for an external issuer or token endpoint even
with stale signing configuration. Focused regressions and its full Docker gate
passed: 203 tests passed, one native fixture skipped; check image
`sha256:48ca9a138528b3222d6f4661c65b1a139cda87acb60dbcee2ac2c9697048a242`.
The new Hub runtime image is
`sha256:1bccba5465a51cd3bcd6625d262f8404ad9e26805ecb040cc9fdda6212438e21`
(`linux/arm64`). Time's initial checked runtime image is
`sha256:53edf614fc5bb4a59fc5cec1067b5cf7dc346fe8a8204a91c5d3e9c9d3aebc12`
(`linux/arm64`). Both are now deployed for initial qualification.
Time's subsequent acceptance-only changes passed a fresh full Docker check:
152 tests passed, ten live cases skipped; image
`sha256:e1d87b3ee0a85e76286be5b1f88ab32c186982eab6566fc8bcbbd98affacc079`.
The cases now include real schedule Task cancellation, explicit terminal-state
restart phases and a coordinated in-flight restart probe. Live results are recorded
below. A later diagnostic-only change reports subscription end reasons and restart
phases without changing assertions; it compiled and passed the live restart probe.

Read-only database preflight found the existing `veoveo` database contains retired
`gateway`, Time, Artifact, Media and shared Core state; no `hub` schema existed at
that preflight checkpoint. Subsequent Hub startup applies its own schema.
Core migrations 0100 and 0400 differed only by one SQL comment each in the naming
commit (`Gateway` → `Hub`); their executable SQL is byte-identical. After a
consistent private database backup, a guarded transaction locked the migration
table and reconciled only those two checksum fields from the exact reviewed old
values. Final checksums match the prepared source; versions, status and other
migration records are unchanged. No schema, application data or role was changed.
The existing database owner has CREATE and CREATEROLE for normal Hub startup and
registration. Preserve the retired schema until new-path acceptance and a separate
retirement decision; it is not an application compatibility route.

Installation preparation now includes the trusted `identity/configure-hub` helper,
native policies/provider profiles and workspace-labelled named-volume inputs,
described in [Hub/Time setup](../veoveo-template-installation/openshell/HUB_TIME.md).
The helper owns local IdP/catalog choices and private component configuration;
it performs no deployment or database mutation. Review corrected Hub's pinned
management trust to the native workload CA, while the supervisor retains upstream
gateway verification. All five provider profiles pass native lint. Isolated helper
checks preserve Hub keys on rerun and reject changed owner credentials, origin and
retained client secrets. The actual Hub catalog validator passed. Live helper setup
and rerun preserved all generated files byte-for-byte at mode 0600. Real IdP-signed
tokens passed signature, type, issuer, audience, claim uniqueness, scope and authority
checks. Native driver configuration is enabled with resource admission and both
approval/workspace labels retained; host bind mounts remain disabled. The installed
gateway accepted the configuration and restarted healthy with unchanged inventories.
Native admission refused a volume labelled for a different workspace and admitted
the correctly labelled fixture; only those fixtures were removed. Approved providers
and volumes are installed in `vv-control`, `vv-services` and the trusted client
workspace `vv-time-qa`; the forwarder has user membership only in `vv-services`.

Initial deployment (2026-10-17 23:22 UTC): Hub's native HTTP relay rewrites backend
Host to `127.0.0.1:8080`. Selecting the existing `--allow-loopback-hosts` option on
its loopback-only listener resolved the observed metadata 421 without changing
the public issuer or native external authority/TLS checks. Verified readiness and
metadata return 200, published URLs use the exact native HTTPS origin, and a valid
unauthenticated modern MCP request returns 401 with a Bearer challenge. Time then
registered through that origin, opened its PostgreSQL sessions and reached Ready.
Hub reports one server and one profile. Time uses private native forwarding and
does not enable the loopback-host option. The first serial native client suite passed
five of seven cases: member discovery/calls, application permission checks, valid
unauthenticated and undeclared-request rejection, event notifications and reconnect.
The two schedule Task cases failed at OpenShell L7 before Hub: `tasks/get` and
`tasks/cancel` are rejected as unavailable in revision `2026-07-28`. Investigate that
wire-contract mismatch in its owner; do not bypass native policy or claim Task
acceptance. The versioned official Tasks extension defines these methods, while
OpenShell currently checks only core method availability. The coordinator approved
native inspection of `tasks/get`, `tasks/update` and `tasks/cancel` as extension
requests at `2026-07-28`, using existing exact method rules. The core revision table
and `allow_all_known_mcp_methods` remain unchanged; retain typed parameters, common
metadata validation and exact task-ID routing headers. This correction is committed
locally as `45f3b534c75866e338000fc84b14e96c50b1b6ac`. Seven focused Mac regressions
and the full network package passed (1,544 library tests and four integration tests;
seven ignored), along with strict Clippy, formatting and docs checks. Validation in
the Mac's Docker runtime also passed: seven focused regressions, 1,577 library
tests and four integration tests, with seven ignored, plus strict Clippy. This is
the local Linux ARM64 container runtime; no remote Linux/GPU qualification occurred.
A fresh detached worktree at that commit produced the ARM64 supervisor binary
`057d3d056ae8eb74bfd3aee73948185d5562aac555d62103983a353f3c5e1510`
and public-CA installation image
`sha256:258578aa428230eebe4993d8e6134922d09fc2709df0263fe11f174c203b03f8`.
The gateway now selects that image; deployed Task qualification passed below.
Gateway startup reconciles supervisors for all existing running sandboxes, including
the two foundation workloads. Their original workload containers remained running,
Ready and at restart count zero; no policies, providers or volumes were changed.
Verify actual supervisor image IDs after a gateway restart rather than assuming
the change affects only subsequently restarted workloads. Native provider renewal
and a fresh Hub forwarding connection after the original
credential expiry are now qualified below. After activating the new supervisor, both ordinary
Task cases passed, including pushed completion, cancellation and retained results.
The seven-case run passed six cases; the first reconnect case encountered a native
credential-refresh boundary at 23:50:17 UTC. The supervisor recorded
`provider_env_changed:true`, unchanged configuration revision and
`policy_changed:false`, then closed the connection because its captured policy
generation was stale (1 versus 2). Member/admin provider refresh succeeded at
23:50:13. One diagnostic reconnect rerun passed, but that alone does not qualify
steady-state refresh/recovery. Code review confirms deliberate native behavior:
provider refresh changes the provider-env revision, and the supervisor fences old
connections before committing updated credentials. Gateway-managed renewal already
preserves opaque-reference identity; `stable_placeholder` is incompatible with this
mode and does not preserve connections. SDK/rmcp do not replay arbitrary failed
POSTs. Preserve the failed operation and explicitly reconnect; no source correction
or policy-generation bypass is justified.

Application renewal/reconnect proof passed on 2026-10-18 UTC in one native Exec
shell (PID 163) in the existing runner. The reference was captured before the
baseline token expired at 00:04:13. Native refreshes succeeded at 00:02:13 and
00:05:13, before their respective previous-token expiries, without manual rotation,
reconfiguration or restart. The applied provider-env revision changed from
`3712687188362590337` to `13329346073955293819`; the captured opaque member reference
remained equal. Member calls before and after renewal each passed, with the latter
after the original expiry plus 60 seconds. Hub application admission rejects at
exact `exp` (zero effective leeway). The subsequent ordinary suite passed 7/7 with
the same runner process and restart count zero. This qualifies renewal and explicit
fresh-client recovery, not uninterrupted in-flight MCP connections.

Terminal persistence also passed: preparation created an event at version 2 and a
Cancelled Task; native Time/Hub stop/start preserved both and fresh subscriptions
reconciled their state. The first in-flight Task restart proof was inconclusive:
Time was stopped and returned Ready, but the reopened subscription at 00:08:12.470
crossed automatic qualification-provider renewal at 00:08:13. The supervisor
applied the new credentials at 00:08:18.248 and fenced generation 7 at 00:08:18.253.
The test failed and attempted cleanup; this is not a Task-recovery pass or evidence
of lost Task state. A diagnostic-only test change now reports the subscription end
reason and exact phase, preserving every assertion and timeout. The controlled
probe then passed on the ELF64/AArch64 acceptance runner image
`sha256:ec13d5b4d12c1d25687625e515052499c4f6b3f0154e5ac511b1691d222ede7b`:
one test passed in 22.35 seconds. Time was confirmed Stopped at 00:22:50 UTC and
Ready at 00:22:55, with process `752df73f` replaced by `bf25d8cb`. The same Task was
Working after the boundary; a fresh subscription opened on Working, pushed
Completed with the exact expected schedule, and `tasks/get` retained that result.
Two preceding wrapper attempts closed stdin before any restart and were recorded
as harness failures; their Tasks were canceled. The successful operator continuation
used held-open stdin and sent exactly `continue` plus LF after readiness.

Public identity also persisted: Time's workload key and the fresh registration JWK
both retain thumbprint `8lWPsaer8WU_jnMYlWiZqOHsClGVzFVyLXASqJU8zRU`; Hub's
TLS-verified `/jwks.json` retains key ID
`q5OJklOPcvCMI72Y7AKFPAFVtgmB3TOC-_6WpBeS1BU`. A new registration client ID on
startup is expected; the persisted service key and namespace claim are the stable
identity. The obsolete original qualification runner was removed after privately
retaining its logs; the qualified replacement remains Ready.

- [x] **Finish rename and reconcile unfinished work:** follow
  [Hub And SDK Naming And Ownership](LORE_OPENSHELL_INTEGRATION.md#hub-and-sdk-naming-and-ownership).
  The change is `veoveo-service-gateway` → `veoveo-hub` and `veoveo-sdk-rust` →
  `veoveo-hub-sdk`, including SDK companion crates and all active consumers.
  Hub, Time, Media and installation source changes are committed and published;
  documentation is reconciled in this change. Qualifier `447bd88` is now published
  on `origin/main`; the repository was temporarily unarchived for its ordinary push
  and its archived status restored afterward. Remove Veoveo Gateway naming from owned source, configuration,
  schema/audit identifiers, build inputs and docs; retain native OpenShell gateway
  terminology and standard protocol routes/fields. Use the existing local setup
  path for stored-name changes, preserving Lore and unrelated durable data.
  Review generated SQLx metadata with its owning queries/migrations. No aliases,
  compatibility configuration or duplicate manifests.
- [x] **Finish obsolete Lore-issuer removal:** the combined Hub diff deletes
  the old issuer module, dispatch and control-plane Lore module. Reconcile their
  callers, resource/grant configuration, obsolete tests/examples, and Hub
  `src/local.rs` / binary CLI options for Hub-issued Lore client/key generation.
  Preserve installation `identity/configure-lore` direct-IdP client/provider setup
  and MCP authentication, registration,
  forwarded-token signing and narrowed delegation/token exchange. Verify the Hub
  cannot issue a Lore token and that direct-IdP Lore configuration remains intact.
  Combined source and focused regressions passed in the fresh Hub check stage.
- [x] **Resolve dependency and setup gates:** the narrow NVIDIA/OpenShell source
  admission and reviewed advisory disposition above pass `cargo deny --locked
  check` directly and in the full Hub check stage. Before cleanup this command
  exited 9 for four unapproved OpenShell Git dependencies and the informational
  `RUSTSEC-2025-0134` advisory; no other advisory is suppressed. Stale Hub
  application Envoy routes/aliases and the Docker configuration/reexec helper are
  removed. Installation syntax, Compose configuration, egress rendering and isolated
  Envoy configuration validation passed. These source/component checks do not
  provision or qualify a native Hub. Media's full Docker component gate also passed for the identical rename tree
  (cached steps), image `sha256:05b8ff4207caec2b9f2237801bab3e4cc88e86611d6487c015c6592c27837710`.
  Media runtime adoption subsequently passed in the private Media slice below.
- [x] **Review the drafted integration:** use
  [Implementation Decisions For The Prepared Time Pass](LORE_OPENSHELL_INTEGRATION.md#implementation-decisions-for-the-prepared-time-pass).
  Reuse the committed SDK CLI bearer input and review Hub's drafted bounded
  Unix-socket/native transport with existing MCP streaming/retry and registration.
  Configure Hub's actual external-issuer token/context/catalog contract. Adapt
  Time's live acceptance input to the prepared bearer path. The demonstrated
  native ingress gap and approved narrow OpenShell change are recorded below;
  the separately demonstrated native Tasks-extension inspection gap above is also
  approved. No Lore change is required.
- [x] **Native application ingress:** fresh disposable sandboxes prove consistent
  DNS, request authority/Host, service routing and verified TLS/CA for native
  `ServiceExposure` with `BearerPassthrough`. Use the same native origin mechanism
  for Hub application access and Time registration/JWKS/delegation egress. The
  real Hub and Time integration remains the following gate; private Time access
  remains authenticated `ForwardTcp`.

  Native ingress investigation (2026-10-17): the active gateway is verified HTTPS
  on `localhost:17670` with a `*.openshell.localhost` SAN. Hub and Time were not yet
  deployed during that investigation. Before the correction, policy DNS sent service hostnames
  to its trusted DNS resolver, which had no local service records. The recorded
  host-alias probe fails `request_authority_mismatch`; changing HTTP Host is not a
  solution. The coordinator approved a narrow supervisor-network fix for one-label
  names under the built-in `openshell.localhost` suffix, using the existing trusted
  HTTPS supervisor endpoint and matching backend IP, pinned to its exact port.
  Ordinary policy and executable admission, TLS SNI/verification and HTTP authority
  remain mandatory. Unsupported endpoints/ports fail closed. No new DNS service,
  protobuf configuration or custom-domain synthesis is planned. The extension is
  implemented in local commit `fce7a7908bd8d5fbdf975293536912aecfb28517`. On macOS,
  16 focused `native_` tests and the full
  network library suite (1,537 passed, two ignored) passed; strict Clippy passed
  after behavior-neutral lint fixes. Linux ARM64 with pinned Rust 1.95.0 also
  passed 16 focused tests and the full suite (1,570 passed, two ignored), from a
  read-only archive of that exact commit. The native cross-build produced the
  ARM64 supervisor image; the installation's public-CA-only layer is
  `sha256:0e759d1bc1434646f542cbc41de80ee244439cb0b8059d6d693cb91def07796a`.
  At this ingress gate, the gateway selected that image and advertised HTTPS
  service URLs with `OPENSHELL_ENABLE_LOOPBACK_SERVICE_HTTP=false`. Its private
  configuration was backed up before the Homebrew restart. Verified TLS status,
  login, native inventory APIs and Keycloak discovery passed after restart.
  The fresh-sandbox fixture passed with probe image
  `sha256:645f78445073be55a5d248ca1b568c86eb6b79bae8a357ffb8766325844cf87b`:
  health 200, MCP initialize/discovery/echo, notification 202, unauthenticated 401,
  unlisted path 403 and two explicit `request_authority_mismatch` 403 responses.
  Wrong name/port connections were refused; those generic transport failures do
  not identify a more specific rejection mechanism. Deleting the exposure returned
  404; recreating it and opening fresh connections repeated the positive and
  negative checks. Cleanup removed the owned workspace/services/sandboxes and
  preserved both existing sandboxes. This run does not measure credential renewal
  or gateway restart with an active application. The Hub client must trust the native
  mounted supervisor CA; the supervisor must separately verify the gateway CA.
  The driver already mounted that gateway CA, but the previous HTTP interception
  client used only system/corporate roots. The extension selects the driver-owned CA
  only for validated native service names or existing gateway aliases at the exact
  trusted gateway socket; ordinary upstream trust remains unchanged.
  The existing gateway setting `enable_loopback_service_http = false` selects
  advertised HTTPS service URLs; no new gateway setting is needed. Published-doc
  validation passed, with unrelated existing Fern warnings recorded in the build
  log. Hub/Time application behavior still requires its own deployed acceptance.
- [x] **Management renewal from Hub:** native provider renewal works with the
  opaque reference captured once by `AuthConfig::oidc`. The initial provider token
  expired at 23:25:50 UTC on 2026-10-17; automatic refreshes occurred at 23:23:50 and
  23:26:50 without manual rotation. OpenShell bounds verifier clock leeway to 30s.
  After restarting only Time, a fresh trusted member call passed and Hub opened a
  new allowed `ForwardTcp` stream at 23:27:42, beyond initial expiry plus leeway.
  Hub process `cffcc339-1006-44bc-9782-2efc7b366cd0` remained unchanged with restart
  count zero. Issuance and renewal stay with the native provider;
  `raw_grpc_fresh()` itself supplies no renewal.
- [x] **Hub + Time:** explicit runtime images in native service sandboxes;
  Hub in an operator-owned control workspace, Time in an approved service
  workspace. Qualify local application-token admission, service registration and
  return egress, endpoint-to-sandbox binding, native forwarding with the existing
  narrowed application token, database access and persistent service identity.
  Prove application admission/denial, credential refresh and reconnect from the
  actual deployed sandboxes, not a host-only fixture or previous test image.
- [x] **Time operations:** discovery, resolve/convert, schedule Tasks and
  cancellation, event subscriptions/reconnect, permission denials and restart
  recovery. Use packaged authorities. Existing component tests are evidence of
  behavior, not acceptance of this new runtime placement.
- [x] **Prepared source and Git copy:** finish any Hub/Time integration fixes
  outside the factory model's task, run the component-owned gates and commit/push
  the prepared source to Git. Seed Time in Lore from that exact tracked tree;
  verify file contents, paths, executable bits and symlinks, excluding VCS metadata,
  secrets and build output. Record the Git commit and Lore revision in this
  checklist's acceptance entry; no new manifest or synchronization service.
  Retain Cargo's existing pinned Git dependencies for this pass.
  Published Time Git commit `90eabf9d3a103075c2aff907f008cf63f341f822`, tree
  `f40b220942b4ceb67212a7a3ec6b4886ee562c30`, corresponds exactly to Lore repository
  `280a718d5d3574271274bba5c8db344b`, revision
  `8adc50f3dce40650572565adc8067ec26031d566a282ba22d227c8c0ff252302`.
  Fresh-clone comparison passed for 362 files and 29 directories: identical paths,
  file types, bytes and modes, excluding only `.lore` metadata. No symlinks or
  submodules exist in this tree. Git archive used explicit `tar.umask=0022` so local
  archive configuration could not alter the tracked executable/nonexecutable modes.
  Main is protected; `factory-time` branch
  `d0239a8b02de57a353218aa8ef36bb59` points to the same revision. The dedicated
  ordinary IdP client is assigned to that exact repository/branch. Recreating only
  the trusted Lore container activated the new assignment with its existing image
  and durable volume; mounted configuration and remote branch metadata were verified.
  The disposable publisher resources were removed; repository, identity and data remain.
- [x] **Factory preparation without model calls:** layer the shared Lore/agent
  setup over Time's existing Dockerfile `dev` image through factory `BASE`. Prepare
  writable Cargo state under `/sandbox` after login-shell profile setup, dependency
  access, the Lore source revision, working directory and the exact build command. In
  the same native image/policy/provider setup, manually verify a fresh Lore clone,
  a release build and SDK-client access to Time through Hub. Resolve all
  failures here, including registration/auth/network issues. Set up inference and
  MCP access for this task; give the model enough steps to run the prepared commands
  without opening an autonomous coding/debugging effort.
  Installation source now prepares a separate Time publisher/factory policy, named
  direct-IdP Lore client setup and four-step `prepared-time` agent. Ten focused
  helper regressions, profile lint and offline image smoke passed. The shared layer
  over Time dev image
  `sha256:6382e247f3b0c077dafa5bd5a28418663847d0be55247f230684849f03c6b396`
  produced factory image
  `sha256:e961b50cc218674041ad95427d2f454a6f64a92e5ee8a42461f929b22b81e6ad`.
  Offline UID-1000 smoke verified Rust/Cargo 1.99.0, Lore, SDK CLI, writable Cargo
  paths, the absence of a prebuilt Time release binary, and installed OpenCode
  2.0.29 loading the bounded agent configuration. Static inspection of that
  installed shell implementation confirms `timeout` milliseconds, a 120000 default,
  and an explicit 900000 accepted without clamping. Zero disables the timer and
  must not be used; select a finite foreground timeout from preflight measurements.
  Real native policy admission, exact Lore clone, dependency/release build and
  Hub access then passed. The trusted publisher completed the source handoff above.
  Offline CLI/config inspection confirmed
  `opencode run --agent prepared-time` selects the four-step agent. Use
  `OPENCODE_CONFIG=/etc/opencode/opencode.json`; the CLI exposes no `--config`
  option.
  The approved inference credential is the existing `DEEPINFRA_API_TOKEN` in the
  installation's ignored root `.env`. Trusted provisioning maps it to the native
  provider input without printing it or copying the file into a workload. The
  earlier environment-only check missed this existing input. The profile requires its static API key at
  creation; no deferred-credential bypass or substitute account is needed.
  Native sandbox `vv-time-build/factory-time`
  (`27efc914-1d35-4194-a585-52ea532fbd88`) is Ready under image `e961b50c` with
  exactly the dedicated Lore, production Hub-member and inference providers.
  Native policy admission and provider installation passed. A fresh clone of the
  recorded Lore revision built successfully with the exact locked release command
  in 92 seconds, using Rust 1.99.0 ARM64, writable `/sandbox/cargo` and fresh
  `/sandbox/time-preflight-target`. Its new ELF64/AArch64 binary has SHA-256
  `b0b4730fb14029b15f293ab7448bb6039df0d6b9fd6988408bdb31af75b92adb`.
  Source remains unchanged. TLS-verified member SDK discovery returned eight tools;
  `time__resolve_time` returned typed UTC/GPS fields for `2026-10-17T12:00:00Z`.
  All these checks ran without inference; the bounded model pass follows separately.
- [x] **Bounded model task:** provide the exact Lore clone/revision instructions
  and run `cargo build --locked --release --bin veoveo-mcp-time` from the prepared
  checkout. The model reports the revision, command, exit status and output path.
  It is not assigned source edits, dependency changes, environment repair or
  additional MCP exploration. If a command fails, retain its output and return the
  failure to the main development session; no model repair loop. This is task
  scope, not a new read-only grant, filesystem restriction or deny rule. Verify
  source is unchanged and the binary was built in this run, not supplied prebuilt.
  The single `prepared-time` model run passed: three model steps and two shell
  calls in 95.044 seconds. One foreground shell call cloned the full recorded Lore
  revision and ran the exact locked release build once; both exited zero. Cargo
  reported 57.09 seconds. The second call only read the saved truncated output for
  the final report. The build used a new `/sandbox/time-model-target`, proven absent
  before invocation; its executable ELF64/AArch64 binary has the same SHA-256 as
  the manual preflight and a modification time after the run began. Independent
  post-run comparison of the downloaded model clone again matched all 362 files
  and 29 directories against the Git export, excluding only `.lore`. No source
  changes, repair loop, build retry or model deployment occurred. The operator's
  runtime-image build and deployment passed the following separate gate.
- [x] **Local result:** from the same Lore revision, use the component Dockerfile
  on the Mac for image construction and replace the local Time service through
  native OpenShell commands. Verify readiness and a Hub-routed Time call.
  Image construction/deployment stay outside the model's task; no Docker socket
  is added to the factory. Record the build, source correspondence and local Time
  result in this checklist.
  A clean context exported from the verified model clone matched the same 362
  files and 29 directories, excluding only `.lore`. The existing Time Dockerfile
  built its `runtime` target on this Mac's Linux ARM64 Docker runtime in 61.5 seconds:
  `sha256:3bd9eedbbffd350d91fc1e06588f2cd4989c47fa1a3ee34b06fcc5adb943743c`.
  Only the owned `vv-services/time` sandbox was stopped/deleted/recreated; its
  state volume, provider, policy, environment and restart policy were preserved.
  New sandbox `c76a921f-1330-4b3c-ad59-028bc08863f1` is Ready on that exact image,
  with process `96218f87-1e8d-462a-8d6a-28f330ad9007`. Native private forwarding
  to the canonical `http://time.internal:8800/readyz` returned 200 `ready`.
  The fresh active registration retains public-key thumbprint
  `8lWPsaer8WU_jnMYlWiZqOHsClGVzFVyLXASqJU8zRU`. Hub process
  `1ef27545-52b8-49b7-8e54-78da4154ded7` stayed unchanged. Fresh member SDK discovery
  from the factory returned eight tools, and `time__resolve_time` returned
  `isError:false` with the expected typed UTC/GPS result for `2026-10-17T12:00:00Z`.
  Temporary readiness forwards were removed. No remote Linux/GPU qualification
  or automatic source-to-deployment system is claimed by this local result.

After the prepared Time build pass:

- [x] **Artifact:** add its native service, registration-key volume and approved
  PostgreSQL/S3 access. Qualify signed upload/download, integrity and ranges,
  access denial, quota enforcement and restart persistence. Bytes go to S3
  directly; the Hub carries metadata/authorization. Six private native cases and
  both restart phases pass below. Tenant/object isolation is proven by component
  tests; this one-tenant deployment does not claim cross-tenant acceptance.
- [ ] **Media:** follow the [Media native integration plan](#media-native-integration-plan)
  to add its native service with the existing fake provider and status checks. Qualify Task-bound delegation through the Hub to Artifact, streamed
  output storage, cancellation/recovery, provenance and usage. Real billed providers,
  webhooks and Artifact share-link ingress remain separate qualifications.

### Native Artifact Follow-up (2026-10-17)

Artifact `302d03884368d6915cce7b9496c96401eaf4b9d5` and installation
`e1d88003ec777d7655ce5214703358416af6d6c6` are committed and pushed. The component
gate passed SQLx metadata validation, formatting, Clippy, dependency checks,
feature checks and **113 tests**; nine live cases were deliberately skipped by the
component gate. Three installation-helper regressions passed independently.
The runtime image is
`sha256:40599b622df9c5fe92e79551b2efb705ceb0eb461a0d9a54b8b3e51377316657`,
with the exact Artifact revision in its OCI label. Its release compile took 69
seconds on this Mac's Linux ARM64 Docker runtime. This is a Git build and native
deployment slice; the earlier Lore/factory result remains specific to Time.

The installation adds only the approved
`http://artifact.internal:8801/artifact/mcp` → `vv-services/artifact:8801` binding
to the existing Hub configuration. It preserves the Time binding on initial setup
and later helper reruns. Hub still reads placements at startup; general Lore
composition and dynamic placement remain later work. Artifact has no public
OpenShell service exposure. Its registration uses native credential custody;
private requests use authenticated `ForwardTcp`, preserving authority and audience.

The existing PostgreSQL migration checksum matched exactly; no schema or migration
ledger repair was needed. Only the legacy registration key was adopted from
`vv-local_vv-mcp-artifact` into the workspace-labelled `vv-artifact-state` volume.
Its SHA-256 fingerprint over SPKI DER remains
`139421c9b60a64b76fd25498e75d4af263414ed0832541203dc2d32f38c25d99`.
Key ownership is UID/GID 10001, with directory mode 0700 and file mode 0600. The
legacy volume and existing object data remain intact.

SeaweedFS's native IAM stores a dedicated `vv-artifact` credential scoped to the
existing `artifacts` bucket. Its required Read/Write/List/Tagging/Admin actions all
carry that bucket restriction. Allowed bucket HEAD/list calls succeeded; a list
against another bucket was refused. The same identity's IAM ListUsers request
returned HTTP 403 with XML `AccessDenied`; the AWS CLI displays this native error
as `Unknown`. The bootstrap administrator still succeeds at bucket listing and
ListUsers. Only the dedicated credential is staged in the private read-only
`vv-artifact-config` volume. It never enters the acceptance runner. Both internal
and signed endpoints are `http://host.openshell.internal:9000`; TCP admission
preserves SigV4 authority and headers, and bytes bypass Hub.

The private live suite and retained-object restart phases qualify deployed
behavior separately from these source/preparation checks. From native Artifact
acceptance sandboxes in `vv-time-qa`, all six private live cases passed: the **1 GiB + 3 MiB**
multipart upload, verification Task, subscription update, cross-part range and
deletion/sweep case took **39.37 seconds**; the other five took **2.22 seconds**.
Those cases cover declared-checksum upload/range download, exact admitted admin
owner/provenance, member tool refusals, grant listing/revocation, quota enforcement
and approval of a member's access request. Transfers use signed URLs; the runner
holds only native member/admin references, never the S3 signing key.

The retained-object prepare phase created a 256 KiB object, then the trusted
operator stopped Artifact and Hub and started Hub followed by Artifact. The same
sandbox IDs, images, state/config volumes, provider bindings and workspace
placements were retained. The verify phase passed in **1.55 seconds** with a fresh
subscription, the same availability timestamp, metadata, owner/provenance, Work
Context access and exact downloaded bytes, then deleted the test object.
Artifact sandbox `eb50af7d-b5b0-4478-84a4-adadc45a1253` is Ready with process
`6cfdb981-6209-4d3e-9975-5ce60e7ea794`; Hub sandbox
`33c2c8ff-c2dc-42fd-83af-845b17db097f` has new process
`2a99c11c-ae76-4ac0-93d1-d481bcc6abeb`. The adopted Ed25519 public JWK thumbprint is
`D7zqKCokp5-W-CGAkcIFtwSxDVn_qua0Ki-nHybhdwk`. Hub's namespace claim matches that
thumbprint, and post-restart registration
`artifact-01a14cf86f877262aff044e800cb0d2d` is active, linking the deployed identity
to the adopted key. The prepare phase passed in 1.40 seconds.

After restart, a temporary operator-authenticated native TCP forward returned
**HTTP 200 `ready`** from `/readyz`, with canonical
`Host: artifact.internal:8801`. The temporary forward was closed. A fresh member
Time discovery/call through Hub passed in 0.12 seconds. Time kept its sandbox,
image and process `96218f87-1e8d-462a-8d6a-28f330ad9007`; Hub and Time kept their
previous runtime images. All three services are Ready. Four task-created completed
Artifact acceptance sandboxes were removed; the existing Time QA runner, shared
qualification provider and unrelated sandboxes remain intact.

The runner's checked ELF is Linux AArch64; its QA-only image is
`sha256:131c8b8a2a0bf45f8da9f096f8e1285f5fc9f347042ba99ea8ee8638615414c3`,
derived from the passing check image
`sha256:acc00a0844b0e89794ea3d3fe26079bb423b34a74bfb7b90b913b38f8f6b177d`.
No management credential or application signing key enters that runner. Both
qualification credentials and Hub's forwarder renewed before the restart probe
(observed applied refresh at 03:04:13 UTC). Scheduled refresh time is not proof of
application: the preceding scheduled update applied one minute later. Native
renewal still fences existing connections; these tests used explicit fresh
connections and did not suppress fencing or replay mutations.

Public share ingress, in-flight verification-Task restart recovery and deployed cross-tenant isolation
are outside this slice. The one-tenant live suite proves Hub permission refusals
and Work Context access; component tests in `tests/access.rs` prove tenant,
label and object-access isolation. Media's completed private follow-up is recorded
below; remote Linux/GPU and automatic source-to-deployment integration remain open.

Sanitized build/test logs are retained under `/private/tmp/artifact-*.log`.
Temporary credential-bearing IAM/provisioning diagnostics were removed after their
safe results were recorded. The guide's static scene/label/link checks cover this
update. Chrome browser QA on 2026-10-17 verified all three views, component detail
panels (including Artifact), keyboard component activation, navigation and zoom/fit.
Each view produced valid SVG and PNG downloads; the complete current-platform and
Media-integration PNGs were visually checked. The current-platform view includes
deployed Hub, Time and private Artifact alongside the Lore/OpenShell foundation
and qualified Time factory. At that review, the next-integration view showed planned Media using
those existing dependencies. No browser warnings or JavaScript errors were
recorded during the final check.

See [native Artifact setup](../veoveo-template-installation/openshell/ARTIFACT.md)
and [component acceptance](../veoveo-mcp-artifact/README.md#acceptance).

### Media Native Integration Plan

This records completed local acceptance for the existing placement shown in the
[guide](diagrams/veoveo-platform.html#next). It adds private
`vv-services/media:8802`, logical endpoint `http://media.internal:8802/media/mcp`,
to the qualified Hub, Artifact and durable stores. It does not extend the
Time-specific Lore/factory proof or add dynamic placement.

The guide distinguishes the qualified private Media slice from later work.
Chrome review on 2026-10-18 checked all three views, component details,
navigation and zoom/fit; each view exported valid SVG and PNG files, which were
also visually inspected. The current platform view now includes deployed Media
alongside Hub, Time and Artifact. The integration view shows its fixture and
qualified lifecycle paths. Browser and export review was repeated after the final
OpenCode pass and guide update; no console warnings or errors were observed.
Browser review remains separate from application qualification.

- [x] **0 — Complete the client byte-transfer prerequisites.** SDK revision
  `026902ae73eaa56533dbc49bd66c39481c8b9494` is reviewed and published. Its
  `hosting/results.rs` adds serialized JSON text alongside `structuredContent`,
  preserving the product ResourceLink at index 1. Five focused tests and the
  prescribed local Docker `check` gate passed (296 tests, three skipped, all 15
  feature combinations); this is macOS-hosted Linux ARM64 container evidence, not
  remote Linux/GPU qualification. Artifact revision
  `40e95be37b56b5e389a2b1dd908ef6c667aeae32` is reviewed and published with the
  corresponding description/transfer regression and SDK repin. Its focused signed
  download test and local Docker component gate passed (114 tests, nine skipped,
  all six feature combinations). Artifact now runs image
  `sha256:5004b47cbd8bf5eb0764c2d8fc93400f80f7905899417c75677bf3667eab3046`
  in native `vv-services/artifact`, retaining its key, state/configuration volumes
  and existing records. Five serial deployed private cases passed: upload/range
  transfer, role/tool denial, grants/revocation, access request and quota. The
  expected quota refusal left one new failed diagnostic record; existing available
  records were retained. The later Media cases verified live signed-transfer JSON
  text equality and exact 65,536-byte and 20,971,643-byte downloads from native
  sandboxes; their independent stored digests match. The Mac signed-byte leg
  passed on 2026-10-18 after normal local hostname setup completed. The actual
  OpenCode `McpClient` source requested a fresh signed download for retained
  Artifact `01a14d9d-af86-76d0-a568-ae16567e3611`, confirmed JSON text equals
  structured content, and saved exactly 65,536 bytes with unchanged method, URL
  and headers. SHA-256 is
  `c6ee57f09dbd4b0e5c6072ec59f2bbce2decf3ef9b1c695af802f26ae28931ce`;
  the mode-0600 file is `tmp-client/media-mac-preflight.bin`. No inference or new
  generation was used. Publish reviewed component revisions, deliberately update consumer pins
  and pass their gates before replacing a runtime. Prove an Artifact signed download with
  the typed SDK and actual saved bytes first. Establish one signed S3 authority
  reachable unchanged from both the Mac client and native sandboxes; the currently
  qualified sandbox address `host.openshell.internal:9000` is not proof of Mac
  reachability. Preserve SigV4 host/headers, direct byte transfer and Artifact's
  dedicated bucket-scoped signing-key custody. Add no byte proxy or URL rewrite.
- [x] **1 — Reconcile Media source and client contracts.** Initial Media revision
  `0589cb6dc192f8734bd2e5d183160868d682a102` is reviewed and published. Native
  bearer inputs, advertised fake-provider origin, runtime CA/key preparation and
  the SDK/Artifact repins passed five focused tests and the local Docker component
  gate (69 tests, four skipped, six feature combinations, SQLx metadata, formatting,
  Clippy and dependency checks). The runtime and fake provider are now deployed in native sandboxes; the basic
  fake-provider generation and ordinary-member billed-run denial passed (two
  cases, 10.84 seconds). Subsequent runtime and qualification revisions are recorded
  in gate 3. OpenCode's reviewed Tasks integration has passed its no-model source
  probe and compiled-CLI Hub connection check; the final model/client scenario
  also passed under gate 4. Replace stale Compose
  and copied caller-key instructions in its README/acceptance documentation with
  the qualified native IdP/opaque-reference pattern. Adapt acceptance member/admin
  input selection as in Time/Artifact, with clear missing/ambiguous-input errors and
  tests that avoid process-environment races. Preserve transport errors as errors,
  rather than accepting them as Hub permission denials. Keep signed URLs out of
  failure diagnostics. Media now pins reviewed SDK `026902ae` and Artifact
  `40e95be3`; preserve deliberate published dependency selection.
  The no-model OpenCode Task-client interoperability gate passed before the final
  model scenario, as recorded in gate 4 with the later bounded client acceptance.
  Prepare the UID 10001 runtime key directory and CA support using the existing
  component Dockerfile. Run the full component gate, including existing durable
  Task, usage, operation, tenant/object isolation and streamed-output tests.
- [x] **2 — Prepare native placement and the private fake provider.** Extend the
  existing trusted installation helper/configuration with Media's startup-approved
  Hub binding, registration provider, persistent signing-key volume and narrow
  PostgreSQL admission. Inventory/adopt any existing key before generating one;
  retain old data and unrelated Time/Artifact configuration. Hub placement changes
  require its documented restart. Keep endpoint, provider and placement selection
  in installation-owned configuration and preserve the existing Work Context;
  add no hardcoded dev/stage/release environments or new Media registry.
  Keep `VEOVEO_PUBLIC_ORIGIN` unset so completion
  uses provider status checks. Provider URL, fixture credential and required webhook
  secret are explicit trusted service inputs, never model credentials. Build the
  existing testing-only fake-provider binary as an ordinary component image input.
  The initial fake derived status/output URLs from its bound socket, which could
  not advertise a usable private origin when bound to `0.0.0.0`. Media `0589cb6`
  adds an explicit advertised origin, retaining loopback port 8803 for its listener.
  Installation preparation `a7c766e` selects the native HTTPS fixture exposure and
  narrow API/output admission, with no relay or new launcher. Media also needs both
  Hub `/oauth/token` REST and `/mcp/{profile}` MCP through SDK `ServerCalls`;
  stock OpenShell rejected MCP/REST mixing on one host/port. Builder confirmed its
  host/port contract comparison in `merge.rs:1070–1144`; existing disjoint-path relay
  tests (`relay.rs:9745,9999–10030`) bypass that policy-admission restriction.
  OpenShell revision `6589a918a7a84640969f9f77b852695e210d713f` is reviewed and
  published: shared native policy validation admits only provably disjoint
  REST/MCP paths and rejects overlapping paths at every specificity. Its local
  checks passed 298 policy tests, 1,547 network tests (two ignored), strict Clippy,
  formatting and documentation checks, including admitted-policy routing and
  canonicalized-path regressions. The native Mac gateway/CLI now report
  `0.1.5-dev.6+g6589a918a`; all seven existing supervisors reconciled to
  `sha256:2bc7eb108130556f6dd5df2e8f8c47f7d27b2500e69983460442d9a2a02d48d7`,
  while Hub/Time/Artifact workload container identities stayed unchanged. Verified
  HTTPS Hub readiness/metadata/JWKS and native-forwarded Time/Artifact readiness
  passed. The fresh-sandbox `native.service_ingress` probe passed positive calls,
  authentication/authority/path denials, exposure deletion/recreation and cleanup
  using probe image `sha256:645f78445073be55a5d248ca1b568c86eb6b79bae8a357ffb8766325844cf87b`.
  Media and its fake provider became Ready under the admitted mixed policy.
  The initial deployed generation case completed a Task through Hub, delegated to Artifact
  and downloaded its 65,536-byte output. Media image
  `sha256:ecfdbe176e899a830d80b02f5e6d70c4f35ad28cfc1b4bd0dbe337f356df36da`
  and fixture image
  `sha256:2defc5368ca05d4158bb8d57b81f80660c14a17091173ba061fdfc5924611899`
  both carry source revision `0589cb6`. The adopted Media signing key and existing
  schema migration checksum were retained. Media does not serve `/readyz`; its
  application readiness evidence is the actual MCP/catalog and Task path, not a
  nonexistent health route. These two basic cases do not qualify lifecycle recovery.
  Homebrew's existing service wrapper remains; the CLI/gateway binaries are local
  builds replacing its stock binaries, with originals/configuration backed up.
  A Homebrew upgrade/reinstall can overwrite that local adoption and requires
  deliberate revision selection and requalification. Do not permit all application
  traffic as generic REST or bypass L7.
  Admit only necessary provider API/output paths and direct signed S3 transfers;
  verify large-output streaming against the selected inspection policy.
- [x] **3 — Qualify deterministic deployed behavior.** Reviewed Media
  `392c2c1000c2b96fb8ee823bbf0996444c547623` is now
  published with the cancellation repair, safe fixture controls/observations and
  expanded acceptance suite. Its full local Docker check passed 71 tests (11
  ignored), SQLx metadata, formatting, strict Clippy, dependency and all six
  feature checks. The check image is
  `sha256:dcdeee04c0637c6766a19b97c02484a290dc8183873fbbf74abec2c29af73029`.
  An earlier full run failed during temporary SeaweedFS bucket setup before
  application execution; an isolated rerun, all 19 affected run tests and the
  subsequent full gate passed. Test-only diagnostics now retain safe process,
  port and HTTP-status evidence before cleanup; the original cause is unproven.
  No production timeout or test concurrency was changed. The matching native pair
  is now Ready: Media image
  `sha256:7487ff1f22b97725f7ff2cff0f8ba3995d8ab046cb16e3da77a9076edb7bca9a`
  and fixture image
  `sha256:d89e1437cb6d3c85d59f9b27bab5e7877a43ecbcfe7f622ee2c7beeba798781b`.
  Both carry the exact `392c2c1` revision label. Media's state/configuration volumes
  and key pin were retained; native registration/database/provider access passed.
  The existing qualification runner loaded the fixture-control policy and checked
  executable. Its first six-case attempt was blocked before any application call:
  the old supervisor's native executable-integrity pin rejected the replaced
  binary. Native stop/start retained the runner/workload and provider bindings
  while creating a fresh supervisor; no policy relaxation or manual cache reset
  was used. No Media Task was created by that blocked attempt. The first application
  run passed both cancellation cases and member billed-call refusal. Two completed
  downloads then hit an incorrect bare-hex comparison against the canonical
  `sha256:`-prefixed type; independent stored hashes and exact bytes matched for
  both sizes. The ordinary-call case expected the wrong error: live Hub correctly
  preserved Media's `INVALID_REQUEST` and exact Task-required message. Published
  qualification revision `293553e554e9f337e2e10fe7382e932a131ff703` corrects only
  those assertions and records installed Discover/list/catalog/schema readiness
  under C31. Acceptance compilation, strict Clippy and three input tests passed;
  executable SHA-256 is
  `820d972bd0ac421293ebdf4b18aa52d14f5245ba467ce0ee7f9c6509a9ed8772`.
  Runtime and fixture code are unchanged from deployed `392c2c1`. The corrected
  six-case native run passed 6/6 in 36.06 seconds (06:14:38–06:15:14 UTC): ordinary
  member browsing/billed refusal, catalog/schema/Task-only refusal, 65,536-byte and
  20,971,643-byte exact downloads, signed-request JSON text, stored typed checksums,
  owner/Work Context/labels/delegation metadata, estimate/actual usage, pushed Task
  completion and cancellation before/after provider dispatch. It ran after both
  credentials were applied at 06:14:02/03 UTC, before their next refresh.
  The after-dispatch cancellation receipt for Media Task
  `01a14d9d-c42f-7db1-9663-e3b1c667a702` is persisted with
  `{"deleted":true,"deletedCount":1}` and both cancellation timestamps.
  Native automatic refresh also applied at 06:05:02/03 UTC; fresh member and
  billed calls succeeded after the recorded original expiry of 06:04:03 UTC.
  The runner retained its sandbox/provider/binding/authorization inputs. Handle
  continuity across its supervisor restart is source-grounded in deterministic
  native reference derivation, not a claimed pre/post byte comparison.
  The external in-flight restart proof passed in 50.35 seconds: Hub Task
  `gtr_iw_SyLyObK5jy32Pj9aMC4b1WNYqR5aTt1-orfrbli0` was Working before and
  after actual native Media/Hub stop/start, then a fresh subscription received
  Completed with one provider submission and the exact retained 65,536-byte output.
  Sandbox identities, Hub signing identity and Media key pin were retained;
  process identities changed. A fresh Time call through Hub also passed afterward.
  An earlier attempt lost stdin before any service restart; it was canceled and
  its cancellation receipt verified. Native exec with an attached TTY supplied the
  required operator continuation without changing application code.
  Terminal-persistence prepare passed for Media Task
  `01a14dab-0911-71c0-9915-e63adc02784c`. After a separate actual Media/Hub
  restart, verification retrieved the Completed Task and result but stopped on
  equality with the prediction resource: the completion snapshot uses the worker's
  timestamp, while that resource uses the persisted Task completion timestamp
  (about 2.086 ms later in this case). Both remain valid; the acceptance comparison
  must verify their respective contracts and all other result fields. Published
  qualification revision `20e2c6edb13d86cf981cf78e2a45fa41cbc94ff5` corrects this
  test comparison, preserves both required timestamps, compares the resource to
  the authoritative prediction, and compares every other typed result field exactly.
  It also synchronizes the authoritative C31 compliance profile with the previously
  qualified documentation; the stale profile initially blocked component-test setup.
  Three input tests, strict acceptance/run Clippy and the focused real output-store
  regression passed. Production Rust and fixture behavior are unchanged; embedded
  compliance metadata changed. The new AArch64 acceptance executable has SHA-256
  `3045b1e6712ca3f45d3a6527186838a4b1b346af1068d95cd73ae3872b180ae6`.
  After native QA stop/start applied that binary, verification of the original
  prepared Task passed once in 1.80 seconds: retained Completed result,
  authoritative prediction, Artifact metadata, exact 65,536 bytes and checksum,
  and a new subscription delivering retained completion. No replacement generation
  was needed. Both external Media/Hub restart proofs are now qualified.
  A subsequent local owner-credential rotation preserved database data, per-service
  logins and signing keys. Only Hub restarted; the old owner password was rejected
  and the replacement authenticated. Fresh Time, Media catalog/schema/Task-only
  checks and verification of that same retained Task/Artifact passed afterward.
  The fixture's quote hold is false and automatic delivery is restored.
  Use a dedicated billed-test
  caller eligible for `media.generations.run`, Artifact read/write delegation and
  required prediction reads. Preserve the ordinary member's model browsing and
  billed-run denial. All credentials remain in native custody; callers receive
  opaque references, services retain their own signing keys. Prove catalog/schema
  discovery, Task-only invocation, provider status-check completion, Task-bound
  exchange through Hub to Artifact, exact streamed/downloaded bytes, owner/Work
  Context/labels/provenance and estimate/actual usage. Prove cancellation before
  dispatch and after dispatch, the provider cancellation receipt, terminal outcome
  and no duplicate output publication. Extend domain acceptance only where current
  cases lack those assertions: existing component tests already cover worker
  recovery/no resubmission, cancellation and multipart output. The initial live
  suite had two fake-provider cases and one separately gated real-provider case;
  the expanded candidate adds six ordinary fake cases and separate restart phases.
  Coordinate actual native Media/Hub restart externally while the test holds an
  ordinary Task identity; prove recovery from a parked in-flight Task, pushed
  completion, one provider submission/output and retained result/key identity.
  Establish no resubmission with independent fixture request evidence: the
  initial standalone fake had no component-counter API, and a single output does
  not prove a single submission. The reviewed candidate adds fixture-only safe
  request counts and prediction IDs/status, outside Media's allowed paths.
  Include cancellation while the provider quote is pending, before generation
  dispatch; the existing component case covers cancellation before worker claim
  only. Review found that the deployed baseline checks cancellation before awaiting the
  quote, then records the estimate and dispatches. A controlled held-quote regression reproduced an unwanted provider submission
  after cancellation (one submission, expected zero). The reviewed repair adds
  a cancellation checkpoint after the quote returns, before usage estimate and
  external dispatch; it must not interrupt the durable dispatch-to-wait sequence.
  Verify the regression and deployed boundary before claiming the cancellation gate. Fixture-only
  quote/completion controls and submission/cancellation observations may serve
  deterministic acceptance; they must stay outside the production binary and
  outside Media's allowed provider paths. Do not introduce production worker
  switches or infer dispatch counts from the number of stored outputs.
  Keep terminal persistence distinct from in-flight recovery and component tests
  distinct from deployment evidence. Qualify automatic credential renewal beyond
  expiry plus actual verifier leeway, then explicit fresh-client calls with the
  same opaque reference. Deployed Hub `00a7e7be` explicitly rejects at `exp`
  after JWT decoding (`auth/access_token.rs:90–96`), so its effective leeway is
  zero despite the JWT library's default 60 seconds. Measure against the later
  original member/billed expiry with clock margin; expiry plus 61 seconds is
  conservative. Native refresh can fence existing connections: record
  interruptions, never replay mutations automatically, and run isolated restart
  proofs with measured margin after an applied refresh. No real billed provider
  or public webhook is needed for this slice.
- [x] **4 — Preflight client Tasks without a model, then final MiMo qualification.**
  OpenCode local revision `46b24290c5a2976e351d56e48f6c27a90dd71c2d`
  on branch `mcp-tasks` integrates the official Tasks package and the narrowly
  reviewed SDK subscription corrections. Both MCP test files passed (85 tests),
  and the canonical repository check passed all 34 tasks plus lint. The first
  full regression run caught an ordinary-call timeout error-message change;
  the corrected deadline applies only to the Tasks path and preserves the SDK
  path's existing timeout behavior. The supported build script produced a Mac
  ARM64 executable with SHA-256
  `3f155f1426b7e5d97a940adba3a703fafdbb01ef993e6d96feee4cb65f1caf9b`.
  This run used a local commit based on upstream `origin/dev`, not an upstream
  release. At that time the checkout had only the upstream `anomalyco/opencode`
  origin and no published organization fork. The later published/installed repair
  is recorded separately in the [MCP/workspace follow-up](#mcp-conformance-and-workspace-sanitation-follow-up--2026-10-18). A no-model probe of
  the committed product `McpClient.connect/callTool` path against actual Hub passed: eight Time, eight Artifact and three Media tools,
  the typed fake-model schema, and one completed fake generation with its Artifact
  ID in model-visible JSON text. This directly exercised the client source with Bun;
  the native binary build/smoke is separate evidence. The compiled CLI also ran
  its ordinary persistent `serve` process on an ephemeral loopback port;
  `mcp.list` reported `veoveo` connected using the existing project configuration,
  a fresh member JWT and verified CA. Its temporary local-server authentication
  was kept in process environments, and the owned server was stopped afterward.
  The reviewed executable is now installed at `~/.opencode/bin/opencode`, version
  `0.0.0-mcp-tasks-202610180531`, with the previous binary retained at
  `~/.opencode/bin/opencode.backup-20261018T055004Z`. Existing running user
  processes were not restarted. The project's existing member launcher disables
  automatic updates for this local build and retains the explicit MiMo default;
  an exact-binary no-inference inventory also listed
  `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` and recognized the existing DeepInfra
  credential through a child-only environment. The Mac storage-hostname and
  unchanged signed-byte download prerequisite passed under gate 0. An authenticated
  read-only DeepInfra model inventory succeeded with the final run's exact binary
  environment and CA settings; this made no inference call.
  The initial bounded final MiMo attempt failed acceptance: it reached the
  eight-step limit while inspecting the workspace and looking for tools, without
  calling any Hub Time, Media or Artifact tool. The CLI exited zero, but that is
  not application success. No Task, Artifact or output file was created; the
  fixture retained the same nine submissions and nine prediction identities.
  The transcript records eight step starts and seven step finishes; its final
  finish event is absent. The persisted OpenCode session supplies complete reported
  accounting: 29,546 input, 1,466 output, 1,254 reasoning and 74,720 cache-read tokens,
  costing $0.015340172, with the requested DeepInfra MiMo model and build agent.
  That session records the workspace root as its directory, whereas the Hub MCP
  configuration lives in nested `tmp-client`. The qualification driver set Python's
  child `cwd` but inherited the workspace-root `PWD`; OpenCode's `run.ts` selects
  `options.root ?? process.env.PWD ?? process.cwd()` and changes directory there.
  Thus the driver selected the wrong project and did not load Hub. The child
  `PWD` was corrected and the actual agent tool registry checked without model
  calls before another final attempt was proposed. This was a
  qualification-launcher repair, not a Hub or MCP protocol change. A subsequent
  no-model check used the exact compiled CLI with a disposable loopback provider
  that returned a fixed refusal and generated no text or tool calls. It confirmed
  stale `PWD` selects the workspace and corrected `PWD` selects `tmp-client`.
  However, both first-request tool projections contained only 12 built-ins and no
  Hub tools. A same-server diagnostic then confirmed the correct project loaded
  `veoveo`, but its connection was `pending` at the first request and `connected`
  afterward. This is expected OpenCode behavior: MCP connections and catalog
  updates are asynchronous so they cannot block unrelated tools or the app.
  Do not change startup or tool-refresh semantics to satisfy this test. Use the
  existing persistent server, observe native connection status, and accommodate
  normal catalog updates in qualification. The first immediate request is not
  required to contain every configured tool. Each probe case sent one request to
  the local fixture only.
  A later request on the same persistent instance exposed 18 Hub tools: eight
  Time, eight Artifact and two Media browsing tools. This matches the ordinary
  member used for the no-model probe: `media.run` requires Write plus Billed risk,
  which the dedicated billed-test identity has. Existing deployed cases prove
  billed generation and exact member refusal. OpenCode selects a fresh tool
  snapshot on every model step, so later catalog updates also become available
  within the same prompt. No additional product change is needed or retained.
  The corrected qualification driver sets child `PWD` explicitly,
  starts an owned native `serve --stdio --port 0` process, observes its MCP
  connection status, and runs the unchanged bounded scenario against that same
  server with `run --server`. It retains the installed binary, model, prompt,
  eight-step limit and 240-second model-phase deadline; timeout stops both owned
  processes. Driver SHA-256 is
  `d20f25bad9c05e08a2a7681f38f533b2329eac4794e72a0f441fdb586319a55e`.
  The user explicitly authorized one replacement attempt after the launcher repair;
  this was an exception to the no-rerun default, not automatic retry. That replacement
  **passed** in 224.975 seconds, below the 240-second deadline, with exit 0 and
  eight agent steps. Session `ses_eb0818664ffeGZFS7iYZlhRwF0` records the intended
  `tmp-client` directory, Build agent and exact
  `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` model. Reported accounting is $0.0284300672:
  56,354 input, 1,666 output, 2,676 reasoning and 116,752 cache-read tokens.
  Direct calls succeeded for `media__models`, `time__assess_clock`,
  `media__model_schema`, exactly one `media__run` and `artifact__create_download`.
  The ordinary `execute` tool also performed read-only MCP resource discovery
  (26 resources and 13 templates) and read the resulting Artifact resource.
  One shell call saved the signed download without changing its URL or GET method;
  the signed response and command both had zero explicit headers.
  The completed Media Task is `01a14f80-6ba0-7b12-861b-a382eaee461a`, prediction
  `01a14f806bd270828758cab4de2d397d`, and Artifact
  `01a14f80-77f3-7260-bdd7-e8a27848f823`. Its private, Available `output-0.png`
  contains 65,536 synthetic fixture bytes. The mode-0600 file
  `/Users/rozgo/VeoveoAI/tmp-client/media-mimo-output.bin` independently matches
  that length and SHA-256
  `c6ee57f09dbd4b0e5c6072ec59f2bbce2decf3ef9b1c695af802f26ae28931ce`.
  These fixed fixture bytes are not a valid PNG despite `image/png` metadata; the
  prompt does not affect their content. Independent counters prove one submission:
  submissions 9→10, predictions 9→10, quotes 11→12, pending quotes 0,
  cancellations unchanged at 3, status reads 20→21 and output reads 6→7.
  The owned temporary server stopped; preexisting OpenCode processes were untouched.
  No further attempt is authorized or needed. Low-level client execution and
  `mcp.list` connectivity alone were not treated as proof of this agent path.

  **Final client execution trace (read-only audit, 2026-10-18).** Persisted session
  time is 14:50:51.165–14:54:36.134 UTC, or 224.969 seconds; the launcher's enclosing
  measurement was 224.975 seconds. The actual generation arguments were
  `{"model":"fake/text-to-image","input":{"prompt":"Veoveo native Media qualification"}}`.
  MiMo was the agent model; no image inference model was called.

  | Elapsed from session creation | Observed operation | Tool duration / outcome |
  | --- | --- | --- |
  | 74.724 s | `time__assess_clock({})` | 0.120 s; `clock acceptable: false` |
  | 74.729 s | `media__models`, search `fake` | 0.112 s; three models; overlaps Time |
  | 123.557 s | `media__model_schema` | 0.096 s; fake text-to-image schema |
  | 126.906 s | `media__run` | 8.858 s; one succeeded Task and Artifact |
  | 155.479 s | MCP resource discovery | 0.689 s; 26 resources, 13 templates |
  | 164.262 s | Artifact resource read | 1.614 s; resulting Artifact inspected |
  | 171.094 s | `artifact__create_download` | 0.525 s; signed GET request |
  | 201.190 s | Shell download and hash | 8.646 s; exact bytes, exit 0 |
  | 224.969 s | Final agent response | Finish reason `stop` |

  Both initial Hub calls occurred in the first model turn. There was no failed
  tool-discovery detour in this corrected run. The launcher observed MCP connected
  before attaching the run, but did not timestamp connection/catalog readiness.
  Thus 74.724 seconds measures first tool use, not discovery latency. The union
  of tool-execution intervals is 20.548 seconds (20.660 seconds summed with the
  overlapping first calls). The remaining 204.421 seconds includes model/provider
  waits, client overhead and the final response; it cannot be split further from
  the saved instrumentation. This run does not establish a latency distribution.

  All eight tool invocations completed without recorded tool errors or refusals.
  Time's negative clock assessment is a domain result, not a protocol error, and
  MiMo explicitly flagged it in its final response. The recorded tool text gives
  no violation details, so this trace does not establish which clock-quality
  requirement failed or prove acceptable clock accuracy. The default/tenant
  policy and synchronization/error-bound/source-quality checks are distinct from
  this scenario's requirement to make one Time call.
  Server stderr contains 24 nonfatal schema warnings: ignored `uint64` (12),
  `uint8` (4) and `uint32` (8) formats. The pinned MCP client's Ajv validator skips
  those unknown format checks while retaining types, required fields and explicit
  numeric constraints. These warnings are not failed calls, but format-only bit
  width enforcement was not proved. CLI stderr and server stdout were empty.

  The deployed `fake.rs` at runtime revision `392c2c1` is identical to the audited
  current source. It emits the fixed 65,536-byte offset-based pattern, checks only
  that the prompt is nonempty, and labels the bytes `output-0.png` / `image/png`.
  Every downloaded byte matches that pattern. Its first eight bytes are
  `00 ef de cd bc ac 9b 8a`, not the PNG signature `89 50 4e 47 0d 0a 1a 0a`.
  This proves the fake-provider orchestration, Task and Artifact byte path;
  it does not prove image inference, prompt conditioning or image decoding.

  Media's plain `run` handler refuses ordinary `tools/call`; the operation requires
  Task support. Test the actual selected OpenCode build's Tasks extension,
  capability declaration, get/subscription/completion and cancellation handling
  without spending model tokens. The original OpenCode 2.0.32's application MCP
  `callTool` wrapper passes only name/arguments/session metadata; static inspection
  found no Tasks extension in that call path: its ordinary tool execution cannot
  execute Media’s currently served Task-required `run`. Modern `server/discover`
  support alone does not satisfy this gate. The official
  [`@modelcontextprotocol/ext-tasks`](https://tasks.extensions.modelcontextprotocol.io/typescript/migrating-from-the-sdk)
  package (stable `0.2.2`, verified at its package registry) supplies client execution
  and settlement. Revision `2026-07-28` advertises Tasks through per-request
  `io.modelcontextprotocol/tasks` capabilities and receives server-directed Task
  results; do not send legacy `params.task` or use legacy `tasks/result` polling.
  OpenCode's pinned MCP SDK `2.0.0` also omits Task `Mcp-Name` routing headers;
  upstream client `2.3.1` derives these from `params.taskId`. Use that upstream
  support while retaining OpenCode's existing OAuth behavior and testing the
  dependency update. Its original wire codec stripped extension fields from
  subscription acknowledgements. The reviewed narrow patch preserves extension
  fields on `SubscriptionFilter`, with the official Tasks extension validating
  actual acknowledged task IDs; SDK `Client.listen` must retain stream ownership.
  Test invalid known fields and absent/narrowed/malformed acknowledgements rather
  than treating the requested filter as accepted. Pushed updates are optional in
  the Tasks specification: a valid declined subscription uses the official
  extension's polling mode, without repeating the initiating tool call or claiming
  pushed completion. Malformed acknowledgements and transport failures stay errors.
  Tools with `x-mcp-header` schema annotations retain the ordinary SDK path, which
  owns header projection. The SDK exposes no public projection API for raw
  extension calls, and modern tool declarations do not retain the legacy
  `execution.taskSupport` field. If such a tool requires Tasks, preserve its
  missing-capability refusal with a clear limitation diagnostic; do not repeat it
  through a path that drops routing headers. Media has no such annotations.
  Its modern SDK integration requires the host's raw request coordinator and
  request framing together. Keep connection, authentication and transport ownership
  in OpenCode, use supported SDK extension hooks and preserve ordinary tool calls,
  errors, cancellation and existing elicitation handling. The native client
  integration passed its no-model interoperability probe, deployed acceptance,
  Mac byte transfer and the final full-agent scenario recorded above. Add no
  wrapper, plain-call fallback or weaker Media Task contract, and do not silently
  replace the requested client. The final qualification followed successful
  deterministic, component, integration and deployed probes, using one bounded
  OpenCode scenario with explicit
  `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`: discover, models/schema, eligible `media.run`
  Task, Artifact download, save bytes and independently compare their hash.
  Use a fresh billed-test JWT only for that run, leaving the ordinary member
  launcher unchanged. Apply a per-run limit of eight agent steps and a 240-second
  wall-clock deadline, with no automatic rerun of a failed scenario or generation.
  The one explicit replacement authorization is recorded above; further attempts
  are not authorized. The controlled fake's automatic completion was restored
  first; no real provider was selected.
  Use the exact installed binary hash above, `--agent build`, explicit model/title,
  and per-run `agents.build.steps: 8` with `warming: false`. Load the existing
  installation `.env` value `DEEPINFRA_API_TOKEN` privately into the child-only
  `DEEPINFRA_API_KEY` expected by OpenCode; do not print it or change saved auth.
  Record actual tool outcomes, Task/usage records and model token/cost evidence.
  Stop on failure and return to development; no OpenCode model calls during
  iteration, automatic repair or model substitution.

The separate real-provider polling receipt follows. Public signed webhook ingress,
other real-provider models, Artifact public shares, general Lore/factory automation,
environment composition and remote Linux/GPU qualification remain separate work.
Aggregate gates are checked only when their acceptance conditions pass; the individual source and runtime
results are recorded separately. Component responsibilities remain unchanged.

### Real WaveSpeed Polling One-Shot — 2026-10-18

The user separately authorized one real-provider generation through the existing
native Hub → Media → Artifact path on this Mac. This is not a repeat of the earlier
fake-provider/MiMo scenario. A private caller used the reviewed OpenCode
`McpClient.connect/callTool` library at local revision
`46b24290c5a2976e351d56e48f6c27a90dd71c2d`, without an agent or LLM call: zero
model-driver tokens. The provider model itself performed real image inference.
The reviewed caller SHA-256 is
`3ad15b5891c60036fd7f316e6e187c490925c22f254e9fb1f2edc25cad6bc1f3`.
An exclusive attempt guard and output-file creation prevent automatic rerun or
overwrite; exactly one `media__run` was invoked, with a 240-second execution bound.
A failed or ambiguous submission must return to the operator, never be resubmitted.

The configured provider catalog/schema and an exact-input quote were checked before
submission. Model: `wavespeed-ai/flux-schnell`. Exact input:

```json
{
  "prompt": "A red ceramic cube and a blue glass sphere on a matte white table, soft studio lighting, no text.",
  "size": "1024*1024",
  "num_images": 1,
  "output_format": "png",
  "seed": 42
}
```

The external quote was USD 0.003. Media's production Task separately quotes before
recording estimated usage and dispatching. There is no atomic maximum-price input
or rejection gate: the external quote is a preflight observation, with a price-change
race before the Task's own quote. Own usage gained one estimate and one actual
record, each USD 0.003 (the JSON receipt represents the floating-point delta as
`0.0030000000000000027`). Independent trusted read-only verification found exactly
two usage records for this Media Task: one USD 0.003 estimate and one USD 0.003
actual. This is a per-Task match, not an inference from the aggregate delta alone.

Media retained its signing identity, database and mounted state while its native
sandbox was recreated for the real-provider configuration:
`38bdb6a2-4142-4ca8-847b-f8475f3c5005`. It retained runtime image
`sha256:7487ff1f22b97725f7ff2cff0f8ba3995d8ab046cb16e3da77a9076edb7bca9a`,
built from Media source `392c2c1000c2b96fb8ee823bbf0996444c547623`.
The provider API uses
an exact-host native credential binding; the credential-free output host is admitted
separately. `VEOVEO_PUBLIC_ORIGIN` remains unset. Both the settled result and the
persisted prediction report `completion: checks`; this demonstrates provider status
polling, not signed webhook delivery or public callback ingress. Native provider
profile v2 was Ready; the effective policy SHA-256 was
`eff2bd82b8a14df4b37dd8420b8c1dd6c3c7440013f58002e9d554bb301bd8c6`.

The safe [private receipt](/var/folders/wv/ckzszrqd2d59czjf43q0fqdm0000gn/T/veoveo-wavespeed-one-shot-tl55sgbg/attempt/receipt.json)
records UTC operation boundaries and monotonic elapsed milliseconds. It starts at
`2026-10-18T16:55:32.566Z` and finishes at `2026-10-18T16:56:10.326Z`:

| Operation | Measured elapsed |
|---|---:|
| Own usage before | 29.093 ms |
| Verified MCP connection | 36.915 ms |
| Read-only tool catalog, 19 tools including run/download | 29.969 ms |
| Single `media__run` through completed Task | 37,508.627 ms |
| Persisted prediction read | 25.369 ms |
| Artifact resource read | 44.920 ms |
| `artifact__create_download` | 51.396 ms |
| Signed GET, body, hash and exclusive file save | 6.864 ms |
| Native client cleanup | 1.889 ms |
| Own usage after | 9.572 ms |
| Whole caller, including preflight and validation | 37,760.537 ms |

The Task duration includes provider execution, scheduled status checks, output
retrieval, Artifact ingestion and billing reconciliation; it is not a measurement
of pure provider inference latency. No model-agent discovery delay is involved.

- Media Task: `01a14ff0-a276-7062-aee1-c33f0b08a08a`.
- Provider prediction: `197e07f456044ad695c7035632845780`.
- Artifact: `01a14ff1-2094-7c21-a97d-36b6ba11d9e4`, available, MIME `image/png`.
- Original file: [wavespeed-first-image.png](/Users/rozgo/VeoveoAI/tmp-client/wavespeed-first-image.png),
  802,505 bytes, mode 0600; SHA-256
  `615779dfcba8a5b8e8e2f6688a21c481086fa4ad0b1f471fde18dd4f536445e3`.
- Artifact's signed-request JSON text equals structured content. The caller parsed
  that text and preserved the GET URL/method byte-for-byte with zero explicit signed
  headers and no redirects. The downloaded size and canonical Artifact checksum match.

**Bounded real-provider polling: PASS.** The caller passed generation, persisted
completion-mode, Artifact and exact-download checks. Independent decoding verified
a valid 1024 × 1024 PNG; MIME, size and canonical Artifact digest agree. The
coordinator also opened the original and observed a red ceramic cube-shaped vessel
and a blue glass spherical vessel; this is a visual description, not a claim of
exact solid-cube/sphere geometric conformance. The Artifact is available/private and its provenance and
metadata retain this Media Task and provider prediction. The fake fixture counters
were unchanged across the real run, independently distinguishing it from another
fake submission. No source/production code changed or Media image was rebuilt;
only native provider/runtime configuration changed. The retained caller receipt
still says `passed_pending_independent_decode`; the independent decode described
above was a subsequent check and did not rewrite that receipt.

Wrapper stderr was empty. Private console review found six ignored-schema-format
notices (`uint32` × 4, `uint64` × 2) plus a background OpenCode transport error:
`client.onerror` logged `mcp transport error` at `16:56:10.179Z`, just before the
Task settled at `16:56:10.186Z`. Hub recorded `POST /mcp/local` HTTP 400 at
`16:56:10.175907714Z`, request ID `01a14ff1-34ba-7501-b510-26e237cd4173`, with
JSON-RPC `-32020`, `missing required Mcp-Method header`. The emitting client hook
is `packages/core/src/mcp/client.ts` around line 222. The original absent header and retained logs alone did not identify the underlying
RPC method. The completed Media/Artifact/download/usage results passed independently;
this was not a harmless or warning-free result. The separate deterministic
[MCP follow-up](#mcp-conformance-and-workspace-sanitation-follow-up--2026-10-18)
subsequently reproduced the same HTTP 400 in subscription teardown and repaired
that path without another paid run. Attribution of the historical error to this
path is a strong evidence-backed inference, not an original wire capture; the
original RPC method remains unknown and its receipt/error evidence is unchanged.

Guide QA after this update used Chrome through an ephemeral loopback HTTP server:
all three views were visually inspected, with tab navigation and provider details
checked; no browser console warnings or errors were observed. PNG/SVG export
buttons were clicked without page errors. New exported-file inspection remains
incomplete: the PNG automation download event timed out, and the browser tool
blocked `chrome://downloads` under its HTTP/HTTPS-only URL policy; no workaround
was attempted. Earlier successful file/export inspections remain historical proof.

No Linux deployment, GPU/CDI execution, public webhook, additional model or Media
Lore/factory qualification follows from this one-shot.

### MCP Conformance And Workspace Sanitation Follow-Up — 2026-10-18

This follow-up is separate from both the original fake/MiMo acceptance and the real
WaveSpeed receipt. It performs no new LLM call or paid generation and does not
rewrite their original source identities, timestamps, errors or costs.

**OpenCode transport repair, published and installed.** The maintained fork is
[VeoveoAI/opencode](https://github.com/VeoveoAI/opencode), parent
`anomalyco/opencode`. Local `origin` is `git@github.com:VeoveoAI/opencode.git`;
`upstream` is `https://github.com/anomalyco/opencode`. Branch `mcp-tasks` is published
at `7b12c6051d23d1afa7ef6659b835fe2345f2ccd5` and is the fork's default branch.
The earlier `46b2429` receipts remain historical evidence for the binary/source
used at that time.

A local real-HTTP fixture reproduced the same HTTP 400 symptom while the tool
result itself succeeded. The reproduced RPC method was captured directly; the
original WaveSpeed trace did not capture its method. Their shared SDK teardown
path strongly supports the historical attribution without proving it from that
original trace alone. Capturing every POST exposed `notifications/cancelled`
for the Task's `subscriptions/listen` request, without `Mcp-Method`. MCP SDK 2.3.1's
`Client.listen` teardown unconditionally sent that notification after aborting its
HTTP response stream. The existing pinned SDK patch now honors its native
`hasPerRequestStream` transport trait: modern Streamable HTTP closes only the
request stream; transports without per-request streams retain
`notifications/cancelled`. The ESM/CJS behavior and declaration comments agree.
There are no fabricated notification headers, Hub validation changes, custom wire
methods, Task state machine or mutation replay.

The regression was RED before the guard and GREEN afterward. Both MCP suites
passed 88 tests / 399 assertions, covering successful settlement, acknowledgement
timeout, user cancellation, Task execution timeout, actual HTTP stream cancellation,
non-stream cancellation notifications and existing ordinary calls. Frozen offline
installation reapplied the patch without a lockfile change. The canonical check
passed all 34 tasks, with zero errors and 1,306 warnings; it was not warning-free.
The native Mac ARM64 build is `0.0.0-mcp-tasks-202610181726`, 189,138,162 bytes,
SHA-256 `cc597e8e45e3ff8fa7df12deb2345696243c703fa144650f9eec1878e833ac3f`.
It was atomically installed at `~/.opencode/bin/opencode`; the previous binary is
retained at `~/.opencode/backups/opencode.before-mcp-tasks-20261018`.
The source-imported OpenCode Core `McpClient` at `7b12c60` then passed a live
no-model Time check with a fresh ordinary-member token: 18 visible tools and one
`time__expand_schedule` Task, `01a15012-0754-70b0-87c1-fcdbe474a599`, completed
one occurrence. Discover/list/call/listen returned HTTP 200, with no HTTP 400 or
`notifications/cancelled` observed; the inspected Hub window contained one
Completed Task notification and no HTTP 400. Timing was not measured. The client
scope closed its subscription, but server-side closure was not independently
instrumented in this live probe; actual HTTP stream cancellation is component
fixture evidence. These observations were reconstructed from console output,
not a retained original wire trace. The locally built executable separately
passed `--version` / `mcp --help` smoke checks; the live call used source imports,
not that binary. No LLM or paid-provider call occurred.

**Client contract. Hub requires Tasks; clients must implement the supported MCP
specification.** Use the official `io.modelcontextprotocol/tasks` extension with
per-request capability metadata and server-directed Task creation, as specified
by the [versioned Tasks specification](https://github.com/modelcontextprotocol/ext-tasks/blob/main/specification/2026-07-28/tasks.md#capability-negotiation).
The extension is optional in MCP as a whole; that does not make it optional for
this Hub client contract. No taskless execution fallback, compatibility adapter,
new client mode or reduced Hub capability is being added. Existing ordinary
catalog/tools behavior is unchanged.

The core [subscription cancellation contract](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions#cancellation)
uses HTTP response-stream closure or a stdio cancellation notification. Cancelling
a subscription is distinct from cancelling a durable Task, which uses
`tasks/cancel`. The [HTTP binding](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#sending-messages)
defines no core client-to-server notification over modern HTTP and leaves
notification-POST header requirements undefined. Do not claim that all notifications
must carry `Mcp-Method`; mirrored request-header validation remains intact.

The unrequested, uncommitted Time/Media server-error and test detour was removed
at the user's direction after verifying each owned diff. No candidate was
committed, deployed or added to the current next steps. The published service
behavior and historical acceptance receipts remain unchanged. Media is currently
configured for real WaveSpeed status checks; the testing fixture is separately
available. OpenCode's existing limitation for tools combining `x-mcp-header`
projection with required Tasks remains documented: no retry or routing-header
workaround was added. Media has no such annotation.

**Publication and local sanitation.** No new registry or state format was added.
The qualified native sources remain on their reviewed branches:

- OpenShell qualifier `447bd88d243ac6dc99b557c695eff81d9d4da764` now matches
  `origin/main`. Its ordinary push succeeded after temporary unarchiving, and
  GitHub archive status was restored to true.
- Lore `cb2c191feb2d317f989af40be287c2d6acb7fb4f` is published unchanged on
  `origin/native-openshell`, which is the tracking branch and GitHub default;
  local `origin/HEAD` agrees. Upstream remains `EpicGames/lore`. The diverged old
  `origin/main` history was retained rather than reintroducing superseded credential
  pinning changes.
- OpenShell `6589a918a7a84640969f9f77b852695e210d713f` remains published unchanged
  on `veoveo/grpc-credentials`.
- Stale `vv` remotes were removed from Core, Hub and Time after confirming their
  cached tips were ancestors and contained no unique commits.
- Clean, unreferenced detached OpenShell worktrees `supervisor-source`,
  `supervisor-source-45f3b534` and `supervisor-source-6589a918` were removed using
  ordinary `git worktree remove`: 3,763,240 KiB of file sizes. Unused Cargo caches
  `.qualify-target` and `.spike-target` accounted for another 2,092,004 KiB removed.
  The combined approximately 5.58 GiB is file-size accounting, not a measured gain
  in filesystem free space.
- The retired `veoveo-service-lore` checkout remains local-only, clean at `eb6dc82`,
  intentionally preserved as history. Workspace configuration, installation `.env`,
  `tmp-client`, durable state volumes, keys and generated artifacts were preserved.

### Reference Linux Deployment And Signed WaveSpeed Webhook Goal

This is the new active goal after the completed Mac milestone and sanitation.
Deploy native OpenShell, Hub, Time, Artifact and Media on the reference Linux host
`veoveo.bioma.ai`, qualify one real signed WaveSpeed callback, then run final
bounded OpenCode MiMo acceptance. The goal permits at most one paid WaveSpeed
generation in total; final MiMo reuses that retained Task/Artifact rather than
submitting another generation by default. Runtime qualification remains open;
completed preparation is recorded below. Historical Mac
Git/Lore correspondence and factory proofs retain their exact source revisions;
this goal does not retroactively change or repeat those receipts.

The operator selected the reference's existing Microsoft Entra tenant and
authorized the required application configuration on 2026-10-18. Entra is now
part of this goal. Reuse the existing Veoveo Web registration where applicable;
preserve existing grants and redirects. Native OpenShell validates its own Entra
resource tokens. Hub uses its existing Entra OIDC authorization-code broker and
retains application access/refresh issuance, explicit principal membership and
risk grants. Generic Entra JWTs do not replace Hub's application token contract.
These are selected configuration paths, not yet Linux acceptance. Other customer
issuers and interactive human Lore login remain separate.

The authorized read-only inventory observed Ubuntu 24.04.5 x86_64 with an RTX 4090,
an unavailable old gateway and Cloudflare HTTP 530/error 1033 at the hostname.
That proves neither a working public route nor Linux deployment. The operator
subsequently selected a fresh reference, stated that this old application data is
unimportant, and explicitly requested no backups and deletion of old containers,
clusters and data volumes. Stop backup/migration work and remove the retired Linux
stack and task-created backup copies after checking ownership. Preserve source,
the Mac installation, the active native OpenShell/Entra control plane and unrelated
services. GPU/CDI/CUDA qualification remains separate from this goal.

Preparation checkpoint (2026-10-18; deployment gates still open):

- The operator requested a public Bioma installation derived from the reusable
  template, linked from VeoveoAI as a real implementation example.
  [BiomaAI/veoveo-installation](https://github.com/BiomaAI/veoveo-installation)
  is published at `31fb50be1ebc0e2e07e34f4bc7568c6a8a85e5b0`, sharing template
  history through `1ca4f3062a11c0f6d46de2e898a0e427929fc7eb`. It contains the
  reviewed native reference policies, provider-profile schemas, Cloudflare ingress
  and explicit source/qualification status. Credentials, generated grants and
  private runtime state are excluded. The existing Linux checkout now tracks this
  origin at the published commit, keeping runtime state paths stable; its ignored
  `.env` checksum is unchanged and generic template updates remain its upstream.
- Installation `c5e5c328eb80e005b62aa13f99fbb356c79d259c` is published. Its
  Entra preparation uses existing Hub schemas, preserves private keys on reruns
  and creates no caller signer. Twenty-three helper tests, default/TLS Compose
  rendering, provider-profile lints, generated Hub catalog validation and native
  gateway configuration preflight pass. Native policy admission remains a runtime
  gate. Existing Mac services retain their deployed configuration.
- Native Linux x86_64 OpenShell `6589a918a7a84640969f9f77b852695e210d713f`
  compiled from a clean detached checkout: CLI SHA-256
  `4867727a9d9429e563038af0b8a97ecc4aa12893b9bea1ea8580e3073f7d7b10`,
  gateway `e27d990119d9dd85d22a232ebe76992b60d1be965a6621f89be5d4dc0c9a1456`.
  The release build completed in 3m30s; executable smoke checks pass. Supervisor
  image `sha256:22368e9fd71ebbb887402a91ca4ba7e5c754146179a4f53f7495f41d15644f51`
  is Linux/amd64 and passes a no-network executable smoke check. The native
  gateway is now active on loopback with the retained, verified TLS certificate;
  the initial checkpoint preceded application startup. Initialization reported four
  old stopped sandbox records with absent backend containers and refreshed the default
  mutable sandbox image. The exact-source trusted sandbox runtime is now pinned to
  `sha256:d87ca9c45c4cd8bc7876f5b1cb86768f4dd42b3babc2398dc00bff206d993a75`.
  Restart preserved authenticated OIDC/TLS and no longer pulled the mutable image.
  Installation `6f4552f` documents that runtime's role separately from the
  supervisor and application images. The native user unit is enabled and active;
  `loginctl enable-linger rozgo` succeeded and read-back is `Linger=yes`.
  Reboot recovery has not yet been tested.
- Entra has separate single-tenant resource, public CLI and Hub-forwarder
  registrations. The existing Veoveo Web application and grants are unchanged.
  The operator completed native device login and the gateway reports connected,
  authenticated OIDC with `openshell-admin`. The separate forwarder's v2 token
  passed live-JWKS signature, issuer, audience, expiry and exact role checks
  (`openshell-user`, `sandbox:write`). Its validated subject is a user in
  `vv-services` only, with no `vv-control` membership or admin role. Native custody
  is configured and an explicit provisioning rotation succeeded at 20:09:43 UTC;
  a scheduled renewal was subsequently observed at 21:06:55 UTC, with expiry
  22:06:54 and next refresh 22:03:54. No manual rotation triggered it. Hub-routed
  user MCP forwarding remains open. Standard
  Graph receipts and the token-free claim check
  are retained privately under
  `/home/rozgo/VeoveoAI-reference/evidence/entra-native-applications/`.
- Initial preservation work created private backups of old Linux containers,
  channel volumes, PostgreSQL/RustFS and native state/configuration. An isolated restored
  PostgreSQL clone with no network starts under the pinned PostgreSQL 18.6 image;
  private logical dumps pass `pg_restore --list`. The original data remains
  untouched at that checkpoint. The old database contains a `gateway` schema, 15 Artifact records,
  11 Media predictions and 21 Tasks. Its applied migration histories predate the
  current flattened migrations. The operator's subsequent fresh/no-backups decision
  supersedes this preservation work: no history migration, no more backup checks,
  and these task-created backup copies and retired resources have been removed.
  Cleanup removed eight stopped containers, nineteen unused old/scratch volumes,
  the empty old Compose network, the 115 GiB backup directory and retired-key
  staging. No cluster runtime was present; native sandbox inventories were empty
  after cleanup.
  Source, the active native gateway/TLS/credential state and the unrelated agent
  tunnel remain intact. Measured free disk after cleanup: 513,749,954,560 bytes.
- During backup preparation, a builder diagnostic printed a prefix of each old
  Linux Time, Artifact and Media `server-key.p8` into its tool output. Treat all
  three Ed25519 private keys as disclosed and retired; never deploy their staged
  copies. No key material was committed or published. Source review of old SDK `7446181` and
  current SDK `026902a` confirms these keys sign registration statements and OAuth
  client assertions; they do not encrypt objects or durable Task/service data.
  The selected fresh database will register new keys normally; the retired old
  containers, database volumes, exports and staged key copies have been deleted.
  No namespace-pin migration is needed.
  New Hub signing/registration credentials must also isolate the new deployment
  from old tokens and sessions. Fresh Hub credentials and a new Time service key
  are now active in the clean database.
- Linux/amd64 component checks pass: Hub `00a7e7b` 203 tests (one skipped),
  Time `90eabf9` 152 (ten skipped), Artifact `40e95be` 114 (nine skipped),
  Media `20e2c6e` 71 (eleven skipped). These are component checks, not deployed
  acceptance. Runtime builds at those exact sources also passed; their immutable
  image IDs are recorded below. Published Artifact `83d6910` replaces acceptance
  fixtures' Mac identity constants with required typed tenant, administrator and
  work-context inputs; exact ownership, quota, digest and provenance assertions
  remain. Its macOS and Linux component checks pass 116 tests (nine skipped) each.
  The final Artifact runtime was rebuilt from clean `83d6910`; its release build
  stage took 91.8 seconds and its image revision label matches that commit.
  Published qualifier `4f7fdbd` makes OAuth scope and issuer CA explicit inputs:
  six focused tests pass (two ignored), strict Clippy passes, and a read-only Mac
  native SDK status probe passes verified TLS/OIDC. Linux deployed qualifier use
  remains open. Installation `bc78b8e` emits the local issuer CA explicitly;
  only the corresponding ignored Mac qualifier JSON inputs were updated.
- Native Cloudflare ingress validation and five rule-selection checks pass for
  the Hub, callback-only Media and separate S3 routes. The dedicated tunnel now
  runs natively through its own enabled user unit; API read-back confirms ingress
  version 6, healthy status and four connections at 20:41:17 UTC. Public S3 DNS
  points to that tunnel. The unrelated existing agent tunnel is unchanged.
  Subsequent Hub discovery and S3 anonymous-denial probes traverse that tunnel.
  SeaweedFS's origin certificate verifies against the
  retained native CA for `veoveo-objects.bioma.ai`, expires 2027-01-16 20:12:52 UTC
  and remains outside images. Native and public S3 TLS probes both return HTTP 403
  with certificate verification passing. Signed transfers remain unqualified.
- Fresh PostgreSQL 18.6 and SeaweedFS 4.48 are running from pinned images with
  newly generated credentials and empty application state. PostgreSQL is healthy;
  its initial inventory contained zero application schemas. SeaweedFS reads its
  origin leaf/key from a read-only mount. No old keys or database history were
  imported. Dedicated bucket-scoped Artifact credentials and signed transfers
  remain subsequent gates.
- Hub is Ready in native workspace `vv-control`, sandbox
  `235f1e07-d4a9-4b51-a87d-37563798b1c8`, using the immutable image below and
  committed Bioma policy. Its three private configuration files are mounted
  read-only, owned by UID 10001 with mode 0600. Exact-image catalog validation
  passes (one profile). Native verified-TLS readiness and discovery return 200;
  public discovery/JWKS also return 200 with canonical issuer and matching key ID.
  Time is Ready in `vv-services`, sandbox
  `29bb3e6d-d8fc-4062-a587-b7e173ec2a50`. Normal mediated initial registration
  produced one active Hub registration and its namespace pin, Time migration v1
  succeeded, and operator native forwarding returned HTTP 200 readiness. These
  prove startup/registration, not user-authenticated Hub MCP calls or Tasks.
- Artifact is Ready in native `vv-services/artifact`, sandbox
  `f25bbb62-b37a-4304-ae24-40e37274c2fc`, from the immutable `83d6910` image
  below and Bioma `a70a38f`. Native admission, state/config mount checks, normal
  registration, migration v1 and forwarded readiness all pass. Its dedicated S3
  identity passes Put/Get with exact byte comparison, Delete, lifecycle setup,
  multipart create/upload/list/complete/abort and rejection of another bucket.
  All probe objects/uploads and the temporary unrelated bucket were removed.
  SeaweedFS's built-in readwrite preset lacked required startup/multipart actions;
  source review of 4.48 established the exact three bucket and eight object
  actions. Template `b4e2f99` now supplies the native scoped policy and procedure;
  Bioma merged it normally. No administrator privilege or broad `s3:*` was added.
  The S3 endpoint's IAM ListUsers probe returned `Unknown`, not a proven explicit
  IAM denial. The sanitized receipt is
  `/home/rozgo/VeoveoAI-reference/evidence/artifact-native-deployment.json`.
  User-authenticated Artifact MCP transfers and persistence remain open.
- Bioma Media qualification now binds to the same two-identity native provider as
  Hub and Artifact qualification. The member and administrator+billed grants each
  have one refresh owner; a rotating refresh token is not duplicated into two
  independent providers. The inherited separate Media profile remains an unused
  example. Actual application custody and acceptance await both human sessions.
- The public guide's new Bioma link was checked in Chrome over the temporary local
  HTTP server. All three views render, component details and navigation work, and
  the console reports no warnings/errors. Both exports produced files: SVG
  114,421 bytes (parsed SVG root) and PNG 399,643 bytes (2960 x 2310). The browser
  automation download event timed out despite Chrome saving the SVG successfully;
  filesystem inspection confirmed both new downloads. This is browser QA only.
- Published installation `4b35192` corrects native application refresh profiles:
  initial PKCE requests `scope=mcp`, while refresh omits the optional scope field
  and retains the original grant. Hub currently rejects any explicit refresh
  scope. Four profile lints and thirteen helper tests pass. Bioma merged the
  template normally at `389a234`; the Linux checkout is clean at that revision.
- The administrator completed public Entra-to-Hub S256 PKCE as client `opencode`,
  resource `https://veoveo.bioma.ai/mcp/local`, context `reference-work`. The
  independent live-JWKS EdDSA signature check passes. The issued grant represents
  the configured administrator plus billed authority, not a billed-only caller.
  No bearer or refresh token is published. The ordinary member's saved password
  was rejected once by Entra; user sign-in is pending. The bounded callback
  listener ended after 600 seconds with zero token exchanges; start a fresh PKCE
  attempt when the user is ready. Two-principal permission acceptance remains open.
- Public edge probes found Cloudflare Browser Integrity Check rejects the default
  `Python-urllib/3.13` User-Agent with HTTP 403/error 1010. The same discovery
  request succeeds with curl, absent User-Agent and the honest one-shot client
  identifier `veoveo-reference-qualification/1.0`. The temporary PKCE client uses
  its own identifier; no browser impersonation or edge setting was applied. This
  records an edge client restriction, not universal public-client acceptance.
- A trusted-host read-only `GET /api/v3/webhook/secret` returned HTTP 200 at
  20:13:47 UTC and confirmed the selected WaveSpeed secret matches. No secret was
  rotated. The token-free receipt is
  `/home/rozgo/VeoveoAI-reference/evidence/wavespeed-secret-preflight.json`.
  This proves neither sandbox credential mediation nor callback delivery.
  No paid generation or OpenCode model call has occurred in this goal.

| Built Linux runtime | Immutable image ID |
| --- | --- |
| Hub `00a7e7b` | `sha256:d348cee423cc698d7030f9aa40f1e566a42df35d962f92ce7c7b19f8b0fade0e` |
| Time `90eabf9` | `sha256:f5608dbb15bdf54447b0e979d203f0ccc0d1e358d2cc8cbecf743bf5c1732495` |
| Artifact `83d6910` | `sha256:60c3100d8d12b5acebb8080eae56d3a2fe560c02764507de50a2d715f3ecf238` |
| Media `20e2c6e` | `sha256:4074d31aabd225dcd5518aab234beadffa2149543aa1bc28502a43b194a5b87f5` |
| Media test provider `20e2c6e` | `sha256:83b0d544639ccfe51202852b5cbf28d55560618fad566f69cc41a3aa3dc9bb8b` |

- [x] **0 — Inventory, retired-stack cleanup and reviewed native placement.** Reconcile
  the current remote processes, images, policies, identity, public routing and
  PostgreSQL/Lore/S3/key ownership. Remove the explicitly retired Linux containers,
  clusters, volumes and task-created backups; preserve the active control plane,
  source checkouts, Mac and unrelated services. Use fresh application state and
  keys. Bring unsupported native capabilities or
  responsibility changes to coordinator review; add no proxy, second launcher or
  infrastructure fallback to hide an unresolved failure.
- [ ] **1 — Pinned native Linux builds and installation.** Select reviewed source
  revisions, build/check Linux x86_64 artifacts and record actual immutable images
  and executable revisions. Install the native OpenShell gateway/supervisor and
  approved service definitions, providers, private placements and persistent
  mounts through existing installation/native contracts. Preserve the established
  Lore/IdP custody and durable service ownership. Generate fresh Linux service keys
  and register them into the fresh database; never reuse the retired key material.
  Mac ARM64 evidence is historical, not Linux
  x86_64 acceptance.
- [ ] **2 — Identity, TLS and public routing.** Qualify verified TLS, canonical
  issuer/audience/JWKS admission, native credential custody/renewal, workspace
  isolation and Hub's approved private forwarding bindings. Establish and verify
  the actual public HTTPS callback route using the existing Media callback
  contract; preserve signed URL authority and direct S3 bytes. Review any routing
  gap before implementation rather than inventing a relay or bypass.
- [ ] **3 — Deterministic deployed services.** Prove Hub registration and discovery,
  Tasks, permissions, subscriptions, reconnect, renewal and restart/persistence
  with Time, Artifact and Media on the actual Linux sandboxes. Preserve the
  independent Artifact metadata/digest/byte and usage/provenance assertions.
  Use deterministic fixtures before real-provider work, and distinguish component
  results from deployed evidence. Hub requires Tasks; no taskless compatibility
  work is part of this goal.
- [ ] **4 — One cheap real signed WaveSpeed callback.** Review the actual model,
  schema, exact input and current quote/bound with the coordinator before the one
  user-authorized cheap submission. This is review within the approved goal, not
  a new approval flow; at most one paid WaveSpeed generation is planned in total.
  Select Media's event-completion mode and the matching provider webhook parameter
  and signature verifier. Independently prove receipt and acceptance of the signed
  callback and event-driven completion; status polling or a completed Task alone
  cannot qualify a webhook. Require one provider submission, retained Task/result,
  Artifact provenance, independent decode/exact download hash and per-Task
  estimate/actual usage. Stop on ambiguous submission or failure; no automatic
  generation retry. The Mac USD 0.003 polling receipt is separate historical proof,
  not this callback gate or a guaranteed future price.
- [ ] **5 — Final bounded OpenCode MiMo qualification.** Only after deterministic,
  component, integration and deployed gates pass and expected behavior works,
  preflight the selected OpenCode MCP client without inference, then run the
  explicitly selected `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` Build agent once within
  reviewed step/time bounds. Retrieve/reconcile the existing real Task and Artifact,
  execute a Time Task and verify saved bytes; do not submit a second paid generation
  by default. Refine the exact scenario after deployment. Record actual tool outcomes,
  Task/Artifact identities, saved bytes/hash, errors, timings and model token/cost
  evidence. Preserve normal asynchronous MCP connection/catalog behavior. Stop on
  failure and return to development; no model calls during iteration, silent model
  substitution, repair loop or automatic mutation replay.

### Remaining Adoption

During this slice, retain PostgreSQL/SeaweedFS in their trusted installation
placement and the qualified Lore/IdP path. Qualify persistent-volume access and
backup/restore before migrating durable infrastructure. Use one selected service
version per slug until composition/version routing is implemented.

Further adoption remains open:

- Give the factory model a real edit/test/commit task only in a separate effort
  covering model quality and token cost. For later Lore-authored changes, publish
  a verified source snapshot to a separate Git checkout and remote, with the Lore
  revision in the Git commit message. Use one editing path per task; no automatic
  bidirectional sync. Git remains a build input while Cargo uses Git revision pins.
- Qualify other customer issuers and interactive human Lore login separately.
  Entra is selected for the active Linux reference goal above; the local
  direct-issuer authoring/credential lifecycle gates remain complete.
- Move the remaining compatible infrastructure and actual MCP components to native
  definitions; qualify persistence, registration and relevant service operations.
- Put thin source/revision-to-runtime bindings in an existing trusted Veoveo process.
  A Lore push selects an immutable revision, runs checks and publishes an approved
  image. Keep build/publication credentials outside agent-controlled jobs.
- Implement arbitrary Lore-defined compositions, inheritance and two private service
  overrides, authorization, no silent fallback, branch deletion and active-Task
  version/retention rules. No hardcoded environment labels.
- After the [reference Linux/webhook goal](#reference-linux-deployment-and-signed-wavespeed-webhook-goal),
  qualify native CDI and a tiny checked CUDA computation separately. The read-only
  RTX 4090 inventory is not GPU execution or deployment acceptance.
- Qualify external Entra/customer providers independently against the native Lore
  claim/refresh contract. Desktop graph/diff and reauthentication are withdrawn.

Prefer native schemas, APIs and extension points. Maintain narrow VeoveoAI patches
only for demonstrated gaps, preserving Lore/OpenShell security and ordinary logic.
