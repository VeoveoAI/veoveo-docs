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
The [platform visual guide](diagrams/veoveo-platform.html) must be updated with every
major architecture change and whenever an illustrated pending path is qualified.
Static guide checks pass (three views, unique IDs, JavaScript/JSON and local links).
Browser interaction and export QA remain unverified: the earlier browser tool
rejected the local file URL and explicitly prohibited alternate access workarounds.
Use one native OpenShell Docker-driver path for factories, checks and managed
services. No Kubernetes, Helm, Flux, OpenBao, alternate preview host or compatibility
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

The next application slice is specified in
[Planned Adoption Of Existing Veoveo Components](LORE_OPENSHELL_INTEGRATION.md#planned-adoption-of-existing-veoveo-components)
and drawn as planned in the [visual guide](diagrams/veoveo-platform.html#next).
The next milestone is **working Hub → Time integration, followed by a build-only
factory pass over prepared Time source**.
This is a local Mac installation with no users or live deployment to preserve:
rebuild and replace local services directly. Complete integration and debugging in
the main development session before assigning work to the factory model. These
steps remain open. Hub and Time now pass deployed application qualification on
this Mac; exact Git/Lore source correspondence and the factory pass remain open.

Inspected source state (2026-10-17):

| Repository | HEAD | State relevant to this milestone |
|---|---|---|
| Core | `0e4f26a` | Committed naming preparation; clean |
| Hub SDK | `a1d9d65` | Committed rename and generic environment-bearer CLI input; clean |
| Time | `90eabf9` | Naming/dependencies, environment-bearer acceptance, restart probes and diagnostics checked, committed and pushed; clean |
| Artifact / MCP template | `4fc0cc9` / `21be15c` | Committed naming preparation; clean; Artifact adoption follows Time |
| Hub | `00a7e7b` | Rename, Lore-issuer removal, external-issuer handling, native transport and SQLx metadata checked, committed and pushed; clean |
| Media | `031c913` | Reviewed naming changes checked, committed and pushed; clean; runtime adoption follows Time |
| Installation | `3ca655f` | Native Hub/Time setup and factory preparation checked, committed and published; deployed Hub/Time application qualification passed |
| OpenShell qualifier | `447bd88` | Native ingress probe and operator harness checked and committed locally; push refused because the GitHub repository is archived; local work preserved |
| Docs | This change | Candidate, architecture, checklist, split plan and visual guide reconciled with deployed Hub/Time evidence; browser/export QA remains unverified |
| Lore / OpenShell | `cb2c191f` / `0e85111e` | Lore clean; native DNS/TLS and Tasks qualified; Tasks runtime source `45f3b534`, followed by a docs-only clarification; OpenShell branch pushed to the maintained VeoveoAI fork |

Prior component test reports and committed preparation do not replace fresh
checks or qualify deployed Hub/Time sandboxes. Preserve these working trees,
review the combined diff and record fresh validation against the source actually
being deployed. Hub/Time acceptance now passes; an identical Git/Lore Time tree and
the factory build remain open.

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
  documentation is reconciled in this change. The qualifier commit is preserved locally because its remote
  repository is archived. Remove Veoveo Gateway naming from owned source, configuration,
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
  Media runtime adoption remains later work.
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
- [ ] **Prepared source and Git copy:** finish any Hub/Time integration fixes
  outside the factory model's task, run the component-owned gates and commit/push
  the prepared source to Git. Seed Time in Lore from that exact tracked tree;
  verify file contents, paths, executable bits and symlinks, excluding VCS metadata,
  secrets and build output. Record the Git commit and Lore revision in this
  checklist's acceptance entry; no new manifest or synchronization service.
  Retain Cargo's existing pinned Git dependencies for this pass.
- [ ] **Factory preparation without model calls:** layer the shared Lore/agent
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
  2.0.29 loading the bounded agent configuration. The installed shell schema
  accepts an explicit numeric timeout in milliseconds; zero disables it and must
  not be used. Validate the exact config/agent invocation and select a finite
  foreground timeout from preflight measurements. Real native policy admission,
  exact Lore clone, dependency/release build and
  Hub access remain separate gates. No live publisher/factory or model call has run.
- [ ] **Bounded model task:** provide the exact Lore clone/revision instructions
  and run `cargo build --locked --release --bin veoveo-mcp-time` from the prepared
  checkout. The model reports the revision, command, exit status and output path.
  It is not assigned source edits, dependency changes, environment repair or
  additional MCP exploration. If a command fails, retain its output and return the
  failure to the main development session; no model repair loop. This is task
  scope, not a new read-only grant, filesystem restriction or deny rule. Verify
  source is unchanged and the binary was built in this run, not supplied prebuilt.
- [ ] **Local result:** from the same Lore revision, use the component Dockerfile
  on the Mac for image construction and replace the local Time service through
  native OpenShell commands. Verify readiness and a Hub-routed Time call.
  Image construction/deployment stay outside the model's task; no Docker socket
  is added to the factory. Record the build, source correspondence and local Time
  result in this checklist.

After the prepared Time build pass:

- [ ] **Artifact:** add its native service, registration-key volume and approved
  PostgreSQL/S3 access. Qualify signed upload/download, integrity and ranges,
  tenant/access denial, quota enforcement and restart persistence. Bytes go to S3
  directly; the Hub carries metadata/authorization.
- [ ] **Media:** add its native service with the existing fake provider and status
  checks. Qualify Task-bound delegation through the Hub to Artifact, streamed
  output storage, cancellation/recovery, provenance and usage. Real billed providers,
  webhooks and Artifact share-link ingress remain separate qualifications.

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
