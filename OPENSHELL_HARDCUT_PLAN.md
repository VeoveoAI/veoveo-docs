# OpenShell Hard Cut Plan

The next infrastructure slice is the
[full native OpenShell management plan](LORE_OPENSHELL_INTEGRATION.md#full-native-openshell-management-plan).
Move PostgreSQL, shared SeaweedFS and Lore from Compose to existing OpenShell
workloads, using native volumes, policies, providers, exposures and restart policies.
Installation bootstrap provisions resources and configuration without service
launch ordering. Long-running services use their existing connection retry and
reconnection behavior, with native Always restart/backoff when a process exits.
OpenShell restores eligible persisted workloads; it does not order them by service
dependency or wait for application health. Verify recovery with late and interrupted
dependencies; fix any observed failure at the service boundary. Keycloak is the
external local-development identity provider on any host OS. No new orchestration,
watchdog, health framework or gateway authentication startup change is planned.
Docker remains the compute backend. This is planned, not deployed.

Status: the local macOS hard cut and direct-IdP Lore authoring path pass focused
acceptance. Clone/edit/push, the small branch hook, native credential renewal,
source withdrawal, applied binding-removal/detach, termination and gateway recovery
are qualified. The Desktop adapter/signer/ingress are retired and durable data is
preserved. Complete low-level branch isolation is superseded, not claimed passed.
The authorized reference Linux goal now passes: native deployment at
`veoveo.bioma.ai`, real signed WaveSpeed webhook qualification and final bounded
OpenCode MiMo acceptance. Qualification is in progress: native builds/deployments and focused identity/service
gates are recorded in the dated Linux entries. One real signed WaveSpeed Events callback now passes on Linux. Deterministic deployed-service, recovery and final Linux MiMo client gates now
pass; earlier bounded failures remain historical. GPU/CUDA remains separate.
The Hub → Time and prepared-source factory milestone now also passes locally:
deployed application qualification, exact Git/Lore correspondence, no-model
preflight, one bounded model build and Time deployment from that same Lore revision.
Private Artifact and the private fake-provider Media slice also pass, including
Media lifecycle qualification, direct Mac byte transfer and the final bounded
OpenCode MiMo client scenario. A separately authorized one-shot real WaveSpeed
polling run also passes: one decoded PNG through Hub/Media/Artifact, with exact
bytes and USD 0.003 actual usage. That Mac polling proof is separate from the
subsequent Linux signed Events qualification recorded below.

Ownership and exact scope are in [Direct Lore Credentials Through OpenShell](LORE_DIRECT_OIDC_PLAN.md).
Desktop graph/diff and browser-session recovery were withdrawn, not marked passed.

The active hosted Computer goal includes the user-approved
[Hub-issued native Lore extension](#hub-issued-native-lore--accepted-goal-extension),
accepted and resumed on 2026-10-19. Entra authenticates users; Hub owns repository
assignments and issues native Lore tokens. This supersedes earlier direct-IdP
issuance instructions for the new goal. Existing Linux application acceptance
does not establish acceptance of this new issuer or the hosted Computer workflow.

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

## Agent-Operated Platform Adoption Plan

Accepted target, 2026-10-18. This checklist implements the consolidated
[product architecture](LORE_OPENSHELL_INTEGRATION.md#product-workflow-and-full-platform-plan).
All phases below are **pending**; adjacent Mac/Linux proofs do not complete them.
The reference Linux, signed webhook and final MiMo work remains separate. The user
authorized native human Lore access on 2026-10-18; that part of A is now active,
following the [direct access decision](LORE_DIRECT_OIDC_PLAN.md#human-access-decision).
Other phases remain planned. Each phase
uses deterministic/component checks first, deployed probes second, and a bounded
model-driven acceptance only after the expected behavior passes. Use the exact
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` for final OpenCode acceptance, no substitution
or model calls during iteration. Record measured tool outcomes, inputs, versions,
timings, identities, byte/hash evidence and limits separately for each layer.

- [ ] **A — Hosted Computer and human Lore onboarding.** Qualify
  the supported OpenCode build in each user's private OpenShell Computer,
  connecting to Hub with interactive sign-in, renewal,
  role-filtered discovery, normal Tasks and Artifact publication/retrieval. Qualify
  Lore CLI direct authenticated clone/sync, stage/commit/push and login/refresh from
  the hosted Computer over the private Lore route against native repository permissions. A local commit changes
  no platform revision; a successful push publishes the exact expected revision.
  Use users with different native Lore permissions. Both can sign in, inspect
  permitted code and select accessible branches. Denial of a protected-branch push
  must leave other permitted Lore operations available. Preserve each component's
  existing grants; do not infer repository exclusion from platform usage or coding.
  Exercise expired/revoked credentials and separate Lore/Hub audiences. Existing
  supervised factory Lore renewal is not acceptance of this human path. Use
  ordinary local agent file/shell tools.
  Human login uses native OAuth device authorization, native encrypted credential
  storage and automatic refresh, independently of repository selection. Qualify
  native operation authorization, expiry/rotation/concurrent refresh and logout
  separately from existing factory issuance. Hub supplies nonsecret setup; its
  bearer is not a repository credential. The authorized upstream update selects
  `ec6bdc2195753b50f70696d367788b4bc8d08964`, which implements native device login
  and repository token exchange. It supersedes our unqualified OIDC prototype.
  Native refresh remains `NotSupported` at that revision. Source adoption, local
  factory regression and complete human onboarding remain separate gates.
- [ ] **B — Deterministic factory and trusted publication.** Split future factory
  templates from agent/Computer templates. A pushed immutable Lore revision runs
  declared commands in a fresh native OpenShell sandbox without OpenCode/model.
  Preserve historical model-build evidence, but do not use it as the job contract.
  Qualify registered source selection, trusted independent checks, bounded resources,
  failed-check diagnostics, exact source/workload/image provenance and retry by a
  new user push. Resolve and qualify the general trusted image construction and
  distribution path using existing native build/image contracts; Artifact content
  storage is not an OCI registry. Prove author jobs lack Docker socket and
  deployment/registry credentials. Define and qualify the user-facing build-status,
  logs and result-link contract using existing native status/Hub surfaces before
  choosing any new API. Prove push success, build success and deployment selection
  remain separately observable. Preserve exact Git handoff while Cargo pins need it.
- [ ] **C — Lore schema, reconciliation and environment routing.** Finalize the
  narrow environment composition schema over native workload/templates, approved
  bindings and lifecycle declarations. A thin module in the existing trusted Hub
  process consumes notification hints, reads authoritative revisions and periodically
  reconciles. Test missed/duplicate events, restart recovery and delayed results
  after supersession/deletion. Only registered sources can deploy; the editing
  branch cannot grant itself targets, providers, resources or quota. Verify readiness
  by registration plus an application probe before selection.
  Run one shared base and two private overrides, each replacing one service while
  inheriting another. Verify independent user access and contexts, selected-version
  discovery, delegation/downstream routing, concurrent Tasks, retained Task versions,
  pinned and following bases, label rename and cycle rejection. An unhealthy override
  must stay unavailable. Promote tested digests by destination config; source merge
  alone must not redirect traffic. Delete one branch-bound environment during active
  work; prove drain/cancel policy, owned cleanup, revocation and no resurrection,
  while the other environment, shared resources, retained state and bootstrap survive.
  Test route inheritance separately from data isolation and document migration limits.
  The current newest-instance-per-slug route is not this acceptance.
- [ ] **D — Hosted Computer persistence and lifecycle.** Provision a private persistent
  native OpenShell Computer with OpenCode, Lore CLI, Hub connection and trusted-config
  default `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. Qualify browser/session access, reconnect,
  human Lore authentication, provider credential custody/renewal, storage persistence,
  isolation, logout/revocation and explicit deletion/retention. No shared admin
  identity or retired Desktop adapter. Model inference stays agent/provider-owned.
  Repeat A's native-permission scenarios for separate users' hosted
  Computers; compare authorized capabilities and publication identities. Private
  scratch and unpublished commits must stay outside platform canonical source.
  Stopping the Computer or deleting a factory job must leave the published project,
  Artifacts and selected service deployment intact. This phase can be designed
  alongside B/C once A's identity contracts are clear. It remains a separate
  product qualification from the storage backend work below.
- [ ] **E — Durable infrastructure and GPU adoption.** Qualify protected volumes,
  PostgreSQL/storage protocol access, backups and actual restore before changing
  existing durable placement. Preserve the IdP cold-start bootstrap. Separately
  qualify native NVIDIA CDI and a tiny checked CUDA computation on the selected
  Docker driver. Hardware inventory is not execution acceptance. Apply the same
  admitted resource, ownership and retention contracts; do not introduce Kubernetes,
  Flux, a parallel scheduler or a replacement runtime inventory.

Initial scope uses native Lore CLI/protocol and existing Hub MCP tools. All platform users
can use permitted capabilities; source, compute, billed actions, promotion and
administration require independent grants. Computer, factory and deployed-service
lifetimes remain independent.

## Upstream Lore Adoption — 2026-10-18

Authorized: update Veoveo to current upstream Lore and remove additions now
implemented natively. The upstream-merge baseline is
`8be7e6e69216c9c974f12027b35910ad1d3fd708`, merging upstream
`ec6bdc2195753b50f70696d367788b4bc8d08964` (0.10.2-nightly) into the existing
`native-openshell` history. Upstream `main` was resolved and pinned before the
merge; this is a source build, not a claim that a new stable release was published.
The subsequent native storage implementation is committed and published on
`VeoveoAI/lore` branch `native-openshell` at
`7785408e70ed302296a24383ae302c3a606e78c3`.
It is now merged and pushed to `origin/main` at
`9152e7fcb6c0be1c62ec05490f787d271a6d8d3f`. The merge preserves the exact
`7785408e` source tree (`fe211dc9067e4fbb384ed528938001b83461e688`), so the
installed image and existing tests still apply. Main's two older QUIC-token and
setgid credential-loader patches were excluded because decision D44 had already
retired them. No new runtime implementation was added by the merge.

- Removed the entire unqualified local human OIDC prototype: custom repository-login
  mode, extra protobuf/settings field, local OAuth dependency and token-store/refresh
  orchestration. Native upstream owns device authorization and repository exchange.
- Retained only the necessary factory integration: opaque access tokens with an
  explicit local identity, supplied-bearer discovery, and the existing normal-push
  assignment hook with fixture/tests/documentation. This merge baseline differs from the
  selected upstream in 12 files, 561 additions and 31 deletions.
- Native client/background-service IPC is now bitcode v2; upgrade matched binaries
  and stop the old service using its matching CLI before replacement.
- Upstream removed the `identity_claim` setting and resolves native identity claims
  with `sub` fallback. Remove the obsolete default from installation configuration;
  retain issuer, audience, resource grants and trusted factory assignments.
- Component checks and pinned image builds pass; the new CLI and local server are
  installed. Local storage restart/persistence checks pass. Native human
  refresh still returns `NotSupported`; a source upgrade
  does not complete human onboarding or customer-issuer qualification.

Coordinator reviewed the residual source diff. Implementation is by `coder`
(GPT-6.1 Sol); checks/builds/local deployment are assigned to `builder` (GPT-6 Luna).
No model-driven acceptance is required to establish this deterministic source
upgrade. Keep component and deployed evidence separate below as gates complete.

Component checkpoint at frozen `8be7e6e6`: `cargo test --locked -p
lore-credential --tests --quiet` passes 37 tests; `lore-transport` with the same
flags passes one discovery integration test and 238 unit tests; `lore-server`
passes 1,399 tests including the retained factory hook. Builder-reported elapsed
times are approximately 3.7, 29 and 99 seconds respectively, including compilation;
the server's test execution reports 7.54 seconds. The first three command outputs
are retained in the tool execution trace, not standalone log files. These component
fixtures do not prove live human IdP login or automatic refresh. The remaining
component suites also pass: `lore` 370, `lore-revision` 1,491 (15 ignored),
`lore-storage` 648 and `lore-io` 65, for **4,249 passing tests** across the seven
packages. Builder-reported elapsed times for those four commands are approximately
79, 131, 37 and 8 seconds, including compilation. Their logs and subsequent build
receipts are collected under `/tmp/lore-upgrade-evidence/`.

The user also requested SeaweedFS storage during this upgrade. Inspection of the
exact candidate found that the native AWS immutable backend requires both S3 and
DynamoDB: fragment associations and lifecycle state remain in DynamoDB even if the
mutable branch store stays local. SeaweedFS alone is not a configuration-only
replacement. The candidate does register the AWS plugin; the upstream configuration
reference's statement that no plugins are registered is stale relative to the
committed code. The user selected a native S3 + PostgreSQL storage plugin and
explicitly required the same `veoveo` database. The accepted design is recorded in
[Lore Storage Backend](LORE_OPENSHELL_INTEGRATION.md#lore-storage-backend): a
separate crate within the Lore fork, dedicated `lore` schema/login and bucket,
immutable index and mutable CAS in PostgreSQL, and native process-local resource
locks. No DynamoDB service is being added. Native debug CLI/server builds of
`8be7e6e6` passed, but these and the 4,249 component checks are the **baseline**;
they do not qualify the new storage plugin. Shared-tree builds stopped before
implementation began. No live Lore replacement or storage reset has occurred.

Preparation checkpoint: the existing `veoveo` database now has dedicated
`server_lore`/`lore` and `server_lore_test`/`lore_test` login/schema pairs; SeaweedFS
has separate `lore` and `lore-test` buckets and credentials. Own-schema creation
and 32-byte own-bucket Put/Get/Head/Delete succeed; unrelated application schema
creation and Artifact bucket access are denied. Bucket listing is filtered to the
authorized bucket. IAM administration refusal was not tested, and these
preparation probes did not capture timings or body hashes. No new database,
volume, live Lore switch or application reset occurred. Private environment files
are outside source/build contexts. Receipt:
`/tmp/lore-upgrade-evidence/storage-preparation.md`.

The installation configuration slice passes `docker compose -f compose.yaml
config --quiet` in 0.118 seconds, without starting or stopping services. Subsequent
database probes reject an unrelated Artifact table read, database creation and
role creation with SQLSTATE `42501`. An IAM `ListUsers` probe returns an unknown
AWS CLI error without an HTTP status, so it does not prove an administration
denial. The current documented source archive still selects the upstream baseline;
it must move to the reviewed plugin commit before building. Receipt:
`/tmp/lore-upgrade-evidence/installation-config-validation.md`.

The plugin source is implemented and frozen for review and real-backend tests;
focused compilation of the crate, server registration and operator seed fixture
passes. This is not storage acceptance. Builder qualification is separate from
the upstream baseline above.

The first focused schema-identifier unit test passes (55.55 seconds including
compilation). The server plugin test then fails after 103.961 seconds because its
test fixture indexes a missing TOML key before invoking validation. Qualification
stopped there; no real-backend pass is inferred. Coordinator review also identified
a recursive-retirement race involving a later parent publication that reuses an
existing child association. The source was returned to the coder for the test fix
and a native-operation regression/correction before another freeze. Evidence:
`/tmp/lore-upgrade-evidence/s3pg-unit-tests.log`.

The subsequent native conformance run caught an exact-address query defect:
partition-wide matching incorrectly reported an obliterated context as present
when a sibling context survived. The implementation now uses exact native
`MatchFull` semantics. The recursive-retirement correction renews exact child
association generations when publishing a parent, including query-skipped reused
children. The corrected real PostgreSQL/SeaweedFS integration passes in 5.084
seconds overall, with 1.72 seconds inside its single scenario runner. Operator
fixture compilation passes in 17.904 seconds. Fault barriers are synthetic controls
around real backend operations; reopening a store instance is not a process crash
or dependency restart. Receipt: `/tmp/lore-upgrade-evidence/query-fix-qualification.md`.

Pinned release builds at `7785408e` pass: runtime/client image in 162.414 seconds,
operator fixture in 120.335 seconds, macOS CLI in 143.102 seconds and factory image
in 38.900 seconds. The runtime image is
`sha256:fc0d7829b6f3a9433a0337ff4a888d73c7687ffdc6f782df4c8861db5f930003`.
These Docker images are Linux ARM64, not qualification of the Linux x86-64
reference host. Commands, image identities, binary bytes/hashes and smoke limits:
`/tmp/lore-upgrade-evidence/pinned-builds-7785408.md`.

**Installed local cutover:** the user's actual executable
`/Users/rozgo/.local/bin/lore` now reports `lore 0.10.2-nightly+local` in a fresh
login shell. Its 55,380,408 bytes have SHA-256
`5d23c012fb73c3cb9b6d342a127b2ea242967417489ee08e6d28db5a3d71f455`.
Native isolated background-service start/status/stop/status passes. The local
`vv-lore` container now runs the pinned runtime above and reports
`loreserver 0.10.2-nightly`; its internal health check returns HTTP 200.
The address, TLS identity and retained old local volume are unchanged, and no host
port is published. The selected backend is `s3_postgres` in the existing
`veoveo` database and dedicated SeaweedFS `lore` bucket. Native stopped-server
seeding created 13 live objects/payloads/associations and 15 mutable references;
all 13 S3 objects were read back, totaling 1,383 bytes with per-object SHA-256
evidence. Existing IdP client subjects/secrets and the Time assignment were
preserved; only disposable fixture repository/branch bindings changed.
Receipts: `/tmp/lore-upgrade-evidence/host-cli-install-final.md` and
`/tmp/lore-upgrade-evidence/cutover-backend-readback.json`.

Builds alone had previously left the installed CLI/server unchanged. The installed
cutover above corrects that gap. Source publication is separately verified with
`git ls-remote`; OpenShell `6589a918a` and OpenCode `7b12c605` were already published
and received no new commits from this upgrade. Retained-source republication and
storage dependency restart are separate deployed gates. Factory credential renewal,
permission-denial transport and human onboarding are outside this storage effort.
No model calls have been made for this upgrade.

Retained Time source has now been republished through normal native commands,
under the same repository, assigned branch and ordinary IdP identity. New Lore
revision `c653516f6af29f811497f72854972a147567345e0e09d780ca785dfcde742e6c`
on `factory-time` corresponds to Git `90eabf9d3a103075c2aff907f008cf63f341f822`.
A fresh clone matches all 362 files and 29 directories, totaling 1,639,866 bytes,
including file modes; no symlinks or missing/extra/hash mismatches were found.
Main remains protected with no published head in this fresh backend. The old
`8adc50f3...` revision below belongs to historical local-store qualification; it
was not migrated. The trusted factory assignment is unchanged, and temporary
publisher resources were removed. Receipt:
`/tmp/lore-upgrade-evidence/time-native-published-tree-check-final.log`.

The user explicitly stopped the unrelated factory-harness and OpenShell HTTP/2
detour and requested only storage restart/persistence completion. The uncommitted
OpenShell relay patch and Hub native-forwarding prototype worktrees/branches were
removed. The four qualifier edits and added factory `BranchGet` policy rule were
reverted; other agents' changes were preserved. No detour commit, push or deployment
occurred. Failed diagnostic logs remain under `/tmp/lore-upgrade-evidence/` as
historical evidence, not unfinished storage gates. Existing Time source is the
durable byte fixture for the completed server and dependency restart checks.

**Storage restart acceptance — 2026-10-19:** builder (GPT-6 Luna) used the existing
private native Lore connection to read Time repository
`280a718d5d3574271274bba5c8db344b`, branch
`d0239a8b02de57a353218aa8ef36bb59`, at the published `c653516f...` revision above.
Baseline and fresh clones after separate `vv-lore`, `vv-postgres` and
`vv-seaweedfs` restarts all match the retained Git source: 362 files, 29 directories,
1,639,866 bytes and no symlinks. The existing reader is `0.10.1-nightly+local`;
the installed server is `0.10.2-nightly` from the pinned `7785408e` image. This
records compatibility of that reader, not a claim that its image was upgraded.
The mode-inclusive manifest over all four retained clone trees is identical:
`c1c321e4ff110efa6ab3ab573af28afbe1e3509d73889543b613a9af835e66d0`.

Independent PostgreSQL reads and actual S3 `GetObject` body reads eliminate client
cache dependence from the persistence proof. The Time partition retains 6 mutable
references, 373 live object keys and 444,781 stored bytes, with no unavailable
payload associations. Reference digest
`fb235d9a461bcd7d981b0269ef2c6798fa514f83b1bd02434baabe5c764c900f`
and object-manifest digest
`4a9a0f124fa40d5270acd6740518cc507449993fb323b34739db60b1a1566949`
are identical at all four checkpoints. Post-restart full readbacks took 25.33,
26.55 and 27.77 seconds respectively. Hub, Time and Artifact readiness return
HTTP 200. Media's attempted `/readyz` returns 404 both before and after; its running
process/supervisor state is separate from application readiness acceptance.

These are controlled local container restarts with retained volumes, not power-loss,
backup/restore, multiple-server or reference Linux acceptance. No model calls,
gateway restart, new grants, factory replacement or transport deployment occurred.
Receipts are `/tmp/lore-upgrade-evidence/storage-baseline-readback.json` and
`storage-after-{lore,postgres,seaweedfs}-restart.json` in the same directory.
The complete execution trace, exact commands, timings, serialization details,
readiness limitations and owned-artifact cleanup are recorded in
`/tmp/lore-upgrade-evidence/storage-restart-persistence-report.md`.
The updated guide passed three-view visual inspection, details/navigation/zoom/fit,
and all six SVG/PNG exports; final storage notes were rechecked after acceptance.
Diagram receipt: `/tmp/lore-upgrade-evidence/diagram-cleanup-qa.json`.

Storage acceptance, in order:

- [x] Implement native immutable/mutable plugin and operator fixture configuration;
  review publication, retirement, isolation and cancellation behavior.
- [x] Provision dedicated Lore and test schema/bucket access in existing PostgreSQL
  and SeaweedFS; own-storage access and unrelated application-data denials pass.
  PostgreSQL database/role creation is denied. SeaweedFS IAM administration denial
  remains unqualified, as recorded above; it is not a restart/persistence claim.
- [x] Pass native immutable-store conformance and focused mutable CAS, concurrent
  representation/copy/obliteration, missing-object and partial-failure tests.
- [x] Pass fresh-process reopen and dependency restart checks with exact byte/hash
  evidence; record orphan/reclamation limitations without claiming atomic S3/SQL.
- [x] Build source-pinned server/CLI images, seed fresh development Lore
  state from retained source/configuration and switch the local server.
- [x] Verify published source survives fresh reads after each restart, with stored payload bytes in the
  dedicated bucket and reference/index rows in `veoveo.lore`.

The reference Linux deployment and human OIDC refresh remain separate. No model
call is required to establish the backend's deterministic storage behavior.

The earlier public native-Lore forwarding proposal was superseded by the user's
per-user hosted Computer decision. It is not a storage acceptance gate. No public
DNS, tunnel, Hub transport or OpenShell deployment change was made for this effort.
Read-only ingress inspection remains recorded in
`/tmp/lore-upgrade-evidence/bioma-ingress-inspection.json`.

The updated visual guide passed desktop browser inspection of all three views,
component details, tab/hash navigation, zoom/fit and six in-memory SVG/PNG exports.
All SVGs parsed and PNGs decoded at the expected dimensions. Only the missing
favicon returned HTTP 404; no JavaScript error was observed. This is diagram QA,
not platform qualification. Temporary receipt:
`/tmp/veoveo-lore-upgrade-diagram-qa.json`.

The historical single-origin diagram revision was inspected in all three views at
2026-10-19 05:15 UTC. The planned Computer → Hub → Lore path and Hub/Artifact
details matched the contract at that checkpoint, before the hosted Computer
decision superseded the public Lore forwarding path; qualified topology stays
explicitly historical. Detail panels, tabs, zoom/fit and all six SVG/PNG export
handlers pass; SVGs parse, PNGs decode and the console has no warnings/errors.
Exports were checked in memory. Receipt with HTML digest:
`/tmp/veoveo-lore-single-origin-diagram-qa.json`.

## Embedding Generation — 2026-10-19

The user authorized implementation in isolated worktrees, Mac qualification,
merge/push to main before Linux deployment, and subsequent Linux qualification.
This goal restores generation only. The user explicitly excluded pgvector;
Knowledge, vector storage and retrieval remain separate. No existing PostgreSQL
image or extension change is part of this work.

Architecture and component ownership are recorded in
[Embedding Generation](LORE_OPENSHELL_INTEGRATION.md#embedding-generation).

- [x] **Runtime prerequisite.** Pin the exact EmbeddingGemma 2 revision and upstream
  Python dependencies. Prove real text/code inference on MPS with FP32 and fallback
  disabled; record actual forward devices, token counts, finite/unit-normalized
  768-dimensional vectors, rankings, timings and measured memory. Inventory alone
  is not GPU execution evidence.
  The isolated M3 Max probe used revision
  `914f7f89142e33e77833254d9c9b90c3cef7303b` and recorded input/hidden-state
  execution on `mps:0`, FP32, finite normalized 768-dimensional vectors and the
  expected text/code rankings. Two 8,192-token inputs completed in 6.773 seconds;
  observed MPS driver allocation reached 17.730 GB. These are prerequisite
  measurements, not deployed Hub results or Linux qualification. Raw evidence is
  currently in `/tmp/veoveo-embedding-qualification/qualification-report.md`.
- [x] **Component implementation and checks.** Build the isolated typed MCP contract
  and private runtime; verify bounds, exact prompt/tokenization semantics, caller
  permissions, authenticated runtime access, usage attribution and safe errors.
  Qualify busy, timeout and malformed-provider behavior. Label synthetic fixtures
  separately from real model inference. Run the component Docker gates on Mac and
  Linux; compiling on Linux does not deploy a Linux service.
  Mac Docker ARM64 MCP checks passed at
  `8b35c870653e323aec5f44ea1deb5a74ccf613e8`: 15/15 tests, PostgreSQL 18.6
  SQLx metadata, formatting, clippy, dependency audit and five feature combinations.
  Native Linux AMD64 MCP checks also passed at that source: 15/15 tests.
  Final runtime `2668a96d5f3bd55ba97db5f1cbb71d084ac1e000` passed 12/12
  deterministic tests natively and in ARM64/AMD64 Docker checks. These tests use
  synthetic provider/model fixtures. Rust test
  corrections installed the TLS provider in test setup and aligned read-only
  discovery expectations with the SDK's existing permission filtering.
  Real runtime startup also exposed an invalid equality check against the native
  tokenizer's unspecified-length sentinel. Removing that check preserves explicit
  untruncated token counting and API limits; it does not change the tokenizer.
  A second startup/inference qualification exposed a misplaced PyTorch hook:
  Sentence Transformers calls its transformer forward method directly, bypassing
  that hook. Runtime `2668a96d5f3bd55ba97db5f1cbb71d084ac1e000` removes production
  hook instrumentation and keeps explicit GPU selection and FP32 parameter checks.
  Separate qualification instrumentation observed actual MPS inputs and hidden
  states; the serving process does not wrap upstream methods.
  A separately ignored native Hub acceptance runner was added without production
  MCP changes. At MCP `943181ed0a9f544e2744b678ad940265a0d92faf`, the ARM64 Docker
  gate passed 17 component tests; the contract-only gate passed three tests. The
  live test is intentionally excluded from those runs. Its initial digest-format
  compile error was corrected with Core's existing digest type. It uses the
  existing qualification client identifier accepted by the Linux Cloudflare edge.
  Test-only revision `fd03aa434c425fca244011ec16a0c01466c08f9b` adds an optional
  explicit PEM CA bundle for the local OpenShell certificate. The first native
  host acceptance attempt failed discovery because normal system roots did not
  trust that local CA. The added roots preserve ordinary TLS/hostname verification;
  production MCP/runtime code is unchanged.
  Final MCP source `5d8da46a1deb0921b5de8822ab3b256e1e0c9941` passes 19
  native component tests and the exact-source ARM64 Docker check, with the real
  acceptance scenario intentionally ignored in those runs. Formatting and strict
  clippy pass. The four provider tests include a synthetic stale-intermediary
  connection case: after six idle seconds, one embedding POST must use a fresh
  connection. These synthetic vectors establish transport behavior, not model
  inference. The final-source native Linux AMD64 Docker gate also passes all 19
  tests, with one intentional live-test skip, in 140.33 seconds. Its SQLx
  metadata/migrations/prepare, formatting, strict clippy, dependency audit and
  feature combinations pass; check image:
  `sha256:8eaf6e3eecf2622bcd9d22878147211424d687bc0e882b05b5fac564a0d9f26f`.
- [x] **Mac deployment.** Qualify native launchd/MPS inference through the private
  OpenShell provider path and the normal Hub service route. Verify readiness,
  unauthorized access, real vectors and usage, plus restart recovery. Preserve
  unrelated services, identities and concurrent work.
  Direct private HTTP inference at runtime `2668a96` passed on M3 Max/MPS. The
  six-item text/code corpus returned 98,754 bytes in 0.325 seconds, actual token
  counts `[18,26,27,17,22,22]`, expected retrieval rankings and maximum norm error
  `7.51e-8`. Two 8,192-token documents completed in 6.584 seconds; one 8,192-token
  document plus seven short items completed in 6.037 seconds. Byte/item/batch
  overflow rejected before inference. A concurrent request returned busy in
  1.5 milliseconds; after a caller disconnected, admission remained occupied until
  the real worker finished. These are real model outputs from test input text,
  separate from synthetic component fixtures. The native provider route to the
  loopback runtime now passes: credential-bound readiness/capabilities return 200,
  missing authorization returns 401, the wrong path returns 403 and an unadmitted
  executable cannot connect. Its initial 401 was a probe error: the caller must
  supply the native opaque reference for substitution, not omit Authorization.
  A launchd restart recovered readiness in 5.344 seconds and reproduced the six
  vectors exactly (paired cosine 1.0, maximum component difference 0.0).
  Authenticated native Hub acceptance now passes using test source `fd03aa4`,
  deployed MCP image `51a3ce9e` (source label `943181e`) and runtime `2668a96`.
  Its eight operations were tools/list, capability read, own usage before,
  six-item embed, usage after success, token-overflow embed, usage after rejection
  and unauthenticated tools/list. The complete scenario took 437.427 ms; the
  successful embedding call took 221.521 ms. The compact reserialized tool output
  was 58,439 bytes, SHA-256
  `2fce91338b3978b1f4abd143de85d00e3037361ca4286255502e97819a6b4acb`.
  All six 768-dimensional vectors were finite and normalized (maximum norm error
  `7.51e-8`), with expected Mars/Venus and addition/multiplication rankings.
  Native usage recorded one 16,384-token estimate and 132 actual input tokens;
  overflow added an 8,192-token estimate and a zero-quantity actual record.
  Unauthenticated MCP access returned 401/Bearer. This final corpus uses actual
  code newlines and supplies the Linux baseline; earlier direct-runtime corpus
  receipts are separate. The full 116,775-byte native receipt has SHA-256
  `a0f8b788328ea92c4784d5443ef710b58bdf3663e3627ed2db12dbd5ba44bde7`.
  A deployed lower-permission identity was unavailable: the existing member has
  write access and no grant was added for this test. Permission filtering remains
  separately covered by component tests.
  The first post-restart embedding call failed with a closed ambiguous-runtime
  error (`-32603`): its 16,384-token estimate remained and no actual record was
  added. It was not automatically replayed. Hub credential refresh had fenced
  older database tunnels 13.55 seconds earlier; no trace ties that event to the
  runtime POST, so refresh is a confounder, not an established cause. A later
  explicit request passed in 230.908 ms (460.778 ms for the full scenario), with
  paired cosine 1.0 and maximum component difference 0.0 against the first Hub
  corpus. Its receipt SHA-256 is
  `af11a3afdd30f11c930abf80812deec85558ad12141db5623c8fbe3aa1431114`.
  A second controlled restart established identical signing-key hashes and
  retained volume/file metadata, but its first delayed inference failed the same
  way in a quiet provider window. That repeat rules out treating the earlier
  refresh event as a sufficient explanation. That failure kept restart acceptance
  open until the private HTTP correction below was deployed and measured.
  Diagnostic-only source `6ea6d92b5b56bcea5f93719a2306081e6fa58703` passed 18
  component tests and reproduced the delayed first-call failure in its deployed
  ARM64 image. Closed diagnostics reported `Embed / Send`, no HTTP status and
  `is_request=true`; other transport flags were false. No private input, response
  body, credential or arbitrary error text is logged. Source inspection found
  a 90-second default client idle pool against the runtime's fixed five-second
  keepalive, with the native intermediary waiting for another client request
  before observing upstream closure. This is a source-supported explanation,
  not a captured packet trace. The four-second native client idle timeout in
  `5d8da46a1deb0921b5de8822ab3b256e1e0c9941` now passes deployed qualification;
  no replay, OpenShell patch or alternate transport was added.
  Final ARM64 image
  `sha256:437b92499c4bf687af000d4f71f3415377c3c8cdfd151f3b7ab10dae572a99df`
  passed the first Hub call after 32.821 idle seconds, controlled MCP stop/start,
  and native launchd runtime restart. Embedding calls took 254.217, 218.100 and
  376.836 ms; complete eight-operation scenarios took 506.069, 478.615 and
  570.757 ms. Each returned six vectors and 132 actual tokens, with 58,439 bytes
  of compact structured-output evidence. All vectors matched the Mac baseline
  exactly (paired cosine 1.0, maximum component difference 0.0).
  The MCP retained its named volume and identical 83-byte mode-0600 signing key.
  The launchd process now uses a persistent mode-0600 log under
  `~/Library/Logs/Veoveo/`; its PID changed and readiness/capabilities returned 200.
  Final post-runtime-restart receipt SHA-256:
  `01b65c4452ce0bcd252497b81ff392cc1a52d64693fc6bd665773138286e7c3b`.
  Consolidated Mac receipt:
  `/tmp/veoveo-embedding-qualification/diagnostic-5d8da46/final-receipt.json`,
  SHA-256 `fccf87c9801e2444ea7d90776cd6ea2d17b5761ec495a75f62f56b3edd5d1a1c`.
  The optional synthetic control with the timeout removed was not run; the
  deployed failing predecessor and successful corrected candidate are recorded.
  The native Hub usage API exposes principal/kind/phase/token/count aggregates.
  Live acceptance can verify bounded usage deltas; per-request context, source
  and delegation metadata remain component-test evidence because that public API
  does not expose them. No cross-domain SQL or extra Task is added to inspect them.
  **Deployment prerequisite found:** the retained Mac Hub rejects the new native
  registration document before metadata/signature validation. Its extracted binary
  contains SDK `a1d9d653ae3d723821cdeeab92f4a67acdca39ce` and Core
  `0e4f26ab0f15b27509bdf6a3796df2f8041cbfb0` source paths. That SDK expects permission
  strings where the current typed contract sends route-access objects. Hub, Time,
  Artifact and Media source mains already use the matching SDK `b3da412f` / Core
  `433ed5f3`; no legacy registration adapter is being added. The required local
  deployment cutover uses those published revisions and fresh disposable Veoveo
  application state, after reviewing schema dependencies. Preserve the shared
  PostgreSQL database, Lore schemas/roles, trusted identity/signing configuration
  and native provider custody. That cutover now has all four services registered
  and Ready; native Time discovery, resolution and conversion pass. The database,
  S3 containers/volumes, Lore schemas/roles and external identity remain in place.
  A post-cutover read-only query using the existing `server_lore` credentials
  returned 402 objects, 401 payloads, 402 associations, 22 mutable references and
  zero retired children, matching the historical storage qualification baseline.
  There is no immediate pre-cutover count receipt; an earlier assertion of that
  measured before/after comparison was withdrawn. The application owner's denied
  Lore query is permission evidence, not a successful data comparison.
  This deployment prerequisite is separate from successful direct MPS runtime
  probes and the remaining authenticated embedding acceptance.
- [x] **Main integration.** Review, merge and push the Mac-qualified component and
  installation changes to main before Linux workload deployment. Preserve other
  agents' uncommitted changes and record exact source/image identities.
  Published and independently verified remote main refs on 2026-10-19:
  [MCP `5d8da46`](https://github.com/VeoveoAI/veoveo-mcp-embedding/commit/5d8da46a1deb0921b5de8822ab3b256e1e0c9941),
  [runtime `2668a96`](https://github.com/VeoveoAI/veoveo-runtime-embedding/commit/2668a96d5f3bd55ba97db5f1cbb71d084ac1e000),
  [installation `7ad90a6`](https://github.com/VeoveoAI/veoveo-template-installation/commit/7ad90a699799a2c38da24370608a4f10a664410d).
  The installation fast-forward preserved all seven concurrent uncommitted files
  byte-for-byte; none was included in these commits. Linux deployment was released
  only after these remote refs were verified.
- [x] **Linux deployment.** Deploy the published source through native OpenShell
  Docker/CDI on the RTX 4090. Verify CUDA execution, the private provider path,
  Hub calls, usage, access denial and restart behavior. Compare the same model,
  processing identity, input corpus and numerical/ranking results with Mac;
  bitwise-identical vectors are not required.
  Native GPU/CDI admission, UID 10001 cache/token access and actual CUDA forward
  placement now pass on the RTX 4090. The separate real-model probe observed all
  271,002,624 parameters and inputs on `cuda:0`, with FP32 hidden states; its
  six-item forward took 0.604 seconds. This is separate from Hub acceptance.
  Runtime source `f55b855b46e60f88212e8ab88a4400ad27d48f90` fixes the Docker
  working directory: UID 10001 owns `/sandbox`, while `PYTHONPATH=/opt/embedding`
  preserves access to the root-owned package. Python inference code remains
  unchanged from qualified Mac runtime `2668a96`. No OpenShell patch was needed.
  The serving MCP retains production source `5d8da46`; test-only main
  `f6100da5249975fecdc81885f61dc747e6bf0bf6` preflights the baseline and reserves
  a new report before any network request. Five deterministic acceptance tests,
  formatting and focused strict Clippy pass on native Mac and Linux; both real
  scenarios are ignored in those component checks.

  Native binding activation now passes. The authoritative configuration is the
  full published database control-plane root, including `nativeUpstreams`,
  `computers` and flattened `lore`; mounted `hub.json` seeds only an empty
  installation. A file edit and restart did not change that active revision.
  Under the coordinated publication pause, the existing native offline
  `import-control-plane` command published the embedding binding together with
  the Computers task's separately reviewed Lore endpoint correction; all other
  fields were semantically preserved. The same current Hub image restarted and
  the stored payload matched the candidate. Readiness and OAuth metadata returned
  200. Native policy/provider custody, keys, mounts and exposure were retained;
  the trusted mounted/durable files were then synchronized. No database reset,
  new permission, hand-written SQL publication or configuration service was added.

  The corrected native SDK six-item scenario passes through Linux Hub using
  the existing Entra member. Its exact eight operations are tools/list,
  capabilities read, own usage before, six-item embed, usage after success,
  token-overflow embed, usage after rejection and unauthenticated tools/list.
  Total elapsed time was 1,429.224 ms; the successful embed took 281.496 ms.
  Six ordered finite normalized 768-dimensional FP32/CUDA vectors used
  `[18,26,27,17,22,22]` tokens (132 total). The compact structured output was
  58,455 bytes, SHA-256
  `61c6de10b61086c4bfee386fd1950338007be16cb0dc0a1f8d838d709617cbcb`;
  this is reserialization evidence, not captured HTTP wire bytes. Maximum norm
  error was `7.899422e-8`. Against the exact Mac corpus, minimum paired cosine
  was `0.9999999999987987` and maximum component difference `2.104789e-7`, with
  unchanged text/code retrieval winners. Native usage recorded 16,384 estimated
  and 132 actual tokens; token overflow recorded an 8,192-token estimate and
  zero actual usage, and unauthenticated discovery returned 401/Bearer. The
  complete report SHA-256 is
  `5f60bda094103dd7e34a6ab85c3c7bfe16c3d1c3035b5ad82afac0e2f413d07e`.
  Both native Hub capacity cases now pass with complete ordered finite/unit
  768-dimensional outputs. Two 8,192-token documents took 1,180.338 ms and
  returned 19,935 compact bytes (SHA-256
  `210edc0f1a89cebddf383604dc7319ea360eb720c61eb16ccdc0d047a27d10bc`).
  One 8,192-token document plus seven 15-token documents took 1,258.893 ms and
  returned 77,918 compact bytes (SHA-256
  `d8dfaa60133d64f0e4b54cf8c2dece801390156e05eaea9c0caeabfc5c21d681`).
  Each case recorded one 16,384-token estimate and one actual record for the
  exact 16,384/8,297 total. The complete capacity scenario took 3.429 seconds;
  its 227,450-byte report SHA-256 is
  `7625959844e7f5c3f1d437c099467f6440771bfaa6a422b4721c90e71cce96dc`.
  The controlled native MCP restart also passes. A fresh call seven seconds
  afterward took 278.948 ms; the full eight-operation scenario took 1,494.419 ms.
  All six vectors matched the pre-restart Linux output exactly (maximum component
  difference `0.0`) and retained Mac parity. Its 118,723-byte report SHA-256 is
  `0756b22b77ffb3a2d8b52c5c7eb7f82634542839812d3189c0cd8f1c0b11a018`.
  The native runtime restart also passes: the following embed took 673.413 ms
  and its full eight-operation scenario took 1,797.417 ms. Vectors again matched
  pre-restart Linux exactly (maximum difference `0.0`) and retained Mac parity.
  The same runtime sandbox/image, cache and token hashes were preserved; native
  restart advanced its authorization epoch from 1 to 2. Its 118,716-byte report
  SHA-256 is
  `9651abdd745999c9c4786a459b9d204af7a41055a21a6c6e80897ea02162b7aa`.
  These receipts close the embedding deployment gate, including both component
  restarts. Nineteen-tool discovery plus readiness/OAuth metadata were observed;
  these runs do not claim new adjacent-tool execution, generic GPU scheduling or
  Computer-flow acceptance. No new grants were added. OpenCode qualification is
  excluded from this embedding closeout, as recorded below. Earlier
  failed discovery, binary-replacement integrity and evidence-path/principal
  fixture attempts remain recorded separately; none was automatically replayed.
  Exact receipts and proof limits are in the
  [local operator qualification report](../veoveo-template-installation/state/embedding-generation-evidence-20261019/REPORT.md).
- [x] **Embedding scope complete.** Standalone embedding implementation and native
  Mac/Linux deployment are delivered, including real model output, Core usage,
  maximum-capacity batches, access rejection, parity and both component restarts.
  Per the user's scope correction, OpenCode qualification is excluded from this
  embedding closeout and is not a remaining embedding gate. Its attempted client
  readiness check failed at OAuth before any model call. No OpenCode or Hub
  authentication code, grants or policy were changed to resolve it, and no agent
  model acceptance is claimed.
- [x] **Documentation.** Updated this checklist, the architecture and all affected
  views/details of `diagrams/veoveo-platform.html`. All three views, navigation,
  embedding/runtime details, Fit and SVG/PNG exports were inspected in Chrome
  on 2026-10-19; the exported 2960×2480 PNG was also visually reviewed.

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

The historically qualified factory image starts from a pinned Rust toolchain image, with OpenCode 2.0.29
and the patched Lore CLI. It no longer inherits an old Veoveo development image.
That historical factory has no direct network, capabilities, Docker socket or bootstrap mounts.
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

The 2026-10-19 placement review retains consolidation under native OpenShell as
the target, including Lore and storage, while keeping the existing MCP workloads
there. The accepted immediate sequence is to establish Computer-to-Lore native
connectivity and authentication with the currently running services first. Then
move durable services with qualified protocol routing, readiness dependencies and
restart recovery. The current host-loopback connection fix is not that migration.

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

This goal now passes after the completed Mac milestone and sanitation.
Deploy native OpenShell, Hub, Time, Artifact and Media on the reference Linux host
`veoveo.bioma.ai`, qualify one real signed WaveSpeed callback, then run final
bounded OpenCode MiMo acceptance. The goal permits at most one paid WaveSpeed
generation in total; final MiMo reuses that retained Task/Artifact rather than
submitting another generation by default. Runtime and final-client qualification
now pass; preparation and exact receipts are recorded below. Historical Mac
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
  user MCP forwarding subsequently passes through the deployed Time suite below. Standard
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
  example. Both human sessions and native application custody are now established;
  deployed two-principal permission acceptance remains a separate gate.
- Media and its synthetic provider fixture are Ready in `vv-services`, sandboxes
  `aaf95cb3-dfd3-4ec1-9056-8028bb3ee20d` and
  `d3deaf79-fd53-4d9a-87f6-2c06513e97e6`. The clean installation checkout is
  Bioma `d702148`, including template public-link corrections from `1ea5c8d`.
  Runtime images match source `20e2c6e`. The Media digest below corrects an earlier
  transcription error; live Docker inspection and the build receipt agree on
  `4074d31a…b87a`, with no rebuild or runtime replacement. The fixture has its own
  configuration volume and fake HMAC only; no WaveSpeed key or real webhook secret
  is mounted there. Its catalog returns 200 with the expected fixture bearer and
  401 with a wrong bearer. Media migration v1 and active registration pass.
  Lifecycle, application transfers, Tasks and real-provider acceptance remain open.
- Media's native HTTP exposure initially returned 421: OpenShell's service ingress
  rewrites upstream Host to `127.0.0.1:8802`, while the deployment accepted only
  its logical service authority. The existing SDK setting
  `VEOVEO_ALLOW_LOOPBACK_HOSTS=true` is now in Media's private mounted `provider.env`.
  Native stop/start applied it without replacing the sandbox, volumes, policy or
  signing key. Startup registered a new client ID, as expected; the namespace key
  thumbprint is unchanged. Native verified-TLS and public Cloudflare callback
  probes now reach signature validation and return 401 for missing/invalid
  signatures. A native ForwardTcp request with `Host: attacker.invalid` still
  returns 421. TLS verification and signature enforcement remain enabled. These
  synthetic requests name a nonexistent operation; they prove ingress and rejection,
  not receipt of a real WaveSpeed event. `VEOVEO_PUBLIC_ORIGIN` remains unset for
  the fake-provider baseline, so completion remains bounded status checks.
  At the 22:47:40 UTC receipt checkpoint, all six missing/malformed/incorrect-HMAC
  probes returned 401: native requests took 3.509–4.955 ms and public requests
  172.942–183.575 ms. The unrelated-Host control took 3.476 ms. These are individual
  request measurements, not latency benchmarks. Tasks, predictions and Artifact
  counts stayed at zero. Builder GPT-6 Luna executed the deployed probes; coder
  GPT-6.1 Sol documented the existing configuration and coordinator GPT-6 Astra
  reviewed source and the sanitized receipt. No paid generation or model-driven
  acceptance ran. Evidence:
  `/home/rozgo/VeoveoAI-reference/evidence/media-native-deployment.json`, SHA-256
  `05f93f87d75075edff54cf4325edc151f501748beb96f1e6744bee5bdcf49765`.
  Template `7e113b2` and Bioma `09ee3d9` now document this native HTTP exposure
  prerequisite independently of completion mode; both are published.
- The public guide's new Bioma link was checked in Chrome over the temporary local
  HTTP server. All three views render, component details and navigation work, and
  the console reports no warnings/errors. Both exports produced files: SVG
  114,421 bytes (parsed SVG root) and PNG 399,643 bytes (2960 x 2310). The browser
  automation download event timed out despite Chrome saving the SVG successfully;
  filesystem inspection confirmed both new downloads. This is browser QA only.
- The guide was reviewed again in Chrome at 2026-10-19 00:31 UTC after separating
  historical Mac qualification from the current Linux reference. All three views,
  a component detail in each, tab navigation, zoom and fit work; no console
  warnings/errors were captured. The Linux SVG export parses with viewBox
  `0 0 1480 1155` (114,319 bytes, SHA-256
  `bde1db47205357ba727c139143533f8ab59819450e3fc30ed06b8b7d7b92be78`).
  The PNG export decodes at 2960 x 2310 (386,719 bytes, SHA-256
  `dc6f1794dd0b0e73258e149c255468f8a3b457a6f15ec2c0629206cfb29478f4`)
  and was visually inspected. The Mac platform and credential views also export
  parsed SVGs and decoded, visually inspected PNGs: respectively 121,339/531,267
  bytes at 2960 x 2480, and 115,219/159,999 bytes at 2830 x 1018. Both Linux
  download-event waits timed out; new files in
  Chrome's Downloads directory independently confirm successful exports. This
  reviews the pending-state snapshot, not the remaining Linux runtime gates.
- Published installation `4b35192` corrects native application refresh profiles:
  initial PKCE requests `scope=mcp`, while refresh omits the optional scope field
  and retains the original grant. Hub currently rejects any explicit refresh
  scope. Four profile lints and thirteen helper tests pass. Bioma merged the
  template normally at `389a234`; the Linux checkout is clean at that revision.
- The administrator and ordinary member completed separate public Entra-to-Hub
  S256 PKCE flows as client `opencode`, resource
  `https://veoveo.bioma.ai/mcp/local`, context `reference-work`. Independent
  live-JWKS EdDSA verification passes for both expected principal identities,
  issuer, audience and context. The administrator also holds billed authority.
  An earlier member attempt selected the administrator's SSO session; the helper
  rejected the identity mismatch and its unused token file was removed. No Hub
  identity mapping change was needed. The final member attempt exchanged once
  and matched the intended ordinary-member principal. Native provider
  `vv-hub-qualification` now owns both distinct refresh grants in operator-only
  workspace `vv-hub-qa`. Member provisioning used one explicit rotation; later
  scheduled renewals for both identities were observed without manual rotation.
  Consumed private staging files were removed after custody confirmation. No
  bearer or refresh token is published. Two-principal permission tests remain open.
- SDK `026902a` was built for Linux/amd64 and run inside native sandbox
  `vv-hub-qa/sdk-preflight` with the opaque administrator reference. Public Hub
  discovery lists 40 tools: 22 Time, 15 Artifact and three Media. A typed
  `time__resolve_time` call for `2026-10-17T12:00:00Z` returned that UTC instant
  and Unix seconds `1792238400`; its authority release IDs matched the response's
  effective authority. Initial and post-refresh calls took 294.268 and 302.328 ms.
  These prove a mediated application call, not clock accuracy or Task acceptance.
  Evidence: `evidence/sdk-admin-preflight-baseline.json`, SHA-256
  `9ce7ce264244ed7e03141a1a40c54c6420fcf0c3e172d0944c76b4495ee57f95`.
  The receipt paths in this section are relative to the remote reference root.
- Application renewal qualification distinguishes OpenShell's 300-second credential
  lease from Hub's 900-second access JWT lifetime. The native API redacts the JWT;
  the expiry bound is source-derived from successful refresh completion, not a
  decoded claim measurement. Post-member-configuration baselines are 23:24:44 UTC
  for administrator refresh and 23:25:44 for member refresh; the conservative
  same-reference recheck was no earlier than 23:41:44. At 23:42:03, fresh typed
  Time calls passed for both identities (administrator 353.884 ms, member
  337.244 ms). Both reference hashes and the SDK sandbox main process/container
  remained unchanged; no manual rotation occurred. These are fresh client calls
  after renewal, not uninterrupted transport across a generation fence.
  Evidence: `evidence/sdk-hub-qualification-member-custody.json`, SHA-256
  `c3aef1ca20e867482793914e4bceafce6bd9b34809de01ff6d28a23b07d4e15c`.
  The post-expiry receipt is `evidence/sdk-post-expiry-renewal.json`, SHA-256
  `c7fc883d93d9025d74555a09c023feff21039255d82914a394870c849751dbb2`.
- The first deterministic deployed Time suite passes all seven cases in 14.98
  seconds. It proves ordinary-member discovery/calls, administrator admission and
  member refusal, unauthenticated/undeclared refusal, pushed Task completion with
  three occurrences, cancellation retained across reconnect, event notification
  and reconnected resource reconciliation. It does not yet prove actual restart
  recovery. Builder GPT-6 Luna ran the unchanged Time acceptance executable from
  `90eabf9` through the committed Bioma native policy; no model calls were used.
  Full private output: `evidence/time-acceptance-suite.log`.
- The first private Artifact suite passes five cases and fails its large multipart
  transfer (76.62 seconds total). The failing case sends 64 parts of 16 MiB and
  one final 3 MiB part, four concurrently, for 1,076,887,552 bytes. It is not a
  single oversized HTTP request. At 23:33:45.737 UTC, the runner applied an
  automatic provider environment update; native logs then record four storage
  host connection closures at 23:33:45.741–.743. Cloudflared reports matching
  cancelled requests, and SeaweedFS records truncated parts 12–15. The client
  reports a TLS close without `close_notify`, with no HTTP response status.
  Eleven complete parts (184,549,376 bytes) remain in the open upload; Artifact
  completion and its verification Task were never requested. The source explains
  this: OpenShell's shared runtime generation fences even credential-free raw TCP
  when another endpoint's OAuth credential changes. Artifact's production upload
  client already implements bounded retries of the same idempotent multipart PUT;
  the acceptance fixture bypassed it with a raw sender. The corrected fixture uses
  that existing public client, preserving the independent byte, digest, range and
  deletion checks. It still streams an unknown-size multipart upload with four
  concurrent parts; bounded retries resend the same part identity and bytes.
  The correction changes only acceptance source and its required client feature.
  Full Docker component checks pass on macOS and Linux/amd64 (116 tests, nine
  skipped each), as do strict Clippy and the two existing public-client integration
  cases. Deployed qualification of the corrected fixture remains open. Native
  enforcement and the deployed Artifact runtime are unchanged. One successful
  Artifact abort closed the failed upload, marked its Artifact failed and released
  its reservation: tenant reserved bytes and open-upload count are both zero.
  A scoped S3 ListParts read returns `NoSuchUpload`; the temporary native maintenance
  sandbox was then deleted.
  Full private output:
  `evidence/artifact-acceptance-suite.log`.
- The first corrected-client run still fails acceptance, after 232.21 seconds,
  with `the subscription ended`. Its multipart upload completed and created the
  verification Task at 2026-10-19 00:10:44.861926 UTC. The test exited during its
  initial verification subscription around 00:10:49. Independent read-only state
  later shows Artifact `01a1517c-06eb-73c3-b60d-5ed081d831f9` Available at
  00:13:40.662257 and its verification Task succeeded at 00:13:40.671100, holding
  1,076,887,552 bytes with server-computed SHA-256
  `c8f34e712074151a1643b88f5b92e6d3200074916b8ce3ecdb15f0307e8adbb1`.
  Reserved bytes and open uploads are zero. This proves multipart completion and
  subsequent server verification, not the test's independent digest comparison,
  range/deletion assertions. Supervisor logs show four storage-host tunnels closed
  on generation changes at 00:07:49 and 00:09:49 during the successful upload;
  individual PUTPart retry attempts are not instrumented. At 00:10:49.483164075,
  another automatic provider change advanced generation 4 to 5. Two Hub-host
  tunnels closed because their generation was stale at .488352561 and .490228499;
  stderr was written at .491411345. Native source guards the entire inspected
  relay, including active SSE, despite the outer log saying "before inspection".
  This connects the observation failure to native generation fencing. Subsequent
  changes were 00:12:49 and 00:13:49, the latter after verification completed.
  The next acceptance-only correction reuses the SDK's existing bounded
  subscription reopen and resource reconciliation; mutations are not replayed
  and no polling fallback is added. The SDK permits three total openings, which
  covers this measured verification window, not an arbitrary 600-second sequence
  of repeated closures. The retained object was untouched at that checkpoint.
  Evidence: `evidence/artifact-large-corrected.stdout.log` and
  `evidence/artifact-large-corrected.stderr.log`.
- The subscription correction's macOS Docker check passes 116 tests with nine
  skipped. Its Linux Docker check passes 115 and fails one, with nine skipped:
  `share_route::every_refused_link_answers_the_same_not_found` receives TCP
  connection refused at its local SeaweedFS fixture during a tiny setup PUT,
  before the share-refusal assertions. This is separate from the deployed large
  upload. Source inspection finds no early fixture drop; fixture process exit or
  an unreserved-port/readiness race remain hypotheses, not established causes.
  The exact case then passed alone (2.80 seconds), and all four parallel share-route
  cases passed (2.85 seconds). The readable kernel journal contains no OOM/kill
  evidence for the original window; child stderr was already removed by fixture
  cleanup. The original cause remains undetermined. Separate diagnostic setup
  attempts used stale local image tags and failed before test execution; these
  were replaced with the current pinned dev image, not treated as test outcomes.
  One subsequent full Linux check of the unchanged candidate passes 116 tests
  with nine skipped, including strict Clippy, in 201.078 seconds. Its immutable
  check image is
  `sha256:5b4c8b3ccb0ea95810342274065b1c0a7d11db1bee1d5bc3bffa65d31f3a2ab4`.
  Artifact acceptance commit `03c17f15ea099d494de0670ea48b9fcc52d4101a` is
  published; its production runtime is unchanged at `83d6910`. The remote source
  checkout is now clean at that acceptance commit after verifying its tracked
  files already matched it. The remote installation also fast-forwarded to
  `c2930111a10bf491193c88d7743183dcdfd7ef97` (README only); runtime configuration
  and private state were not changed.
- The corrected acceptance executable has SHA-256
  `6c593f17491f9688487afe55c90d70f407f3379e99c5216760143a5543b19682`.
  QA image `sha256:ac0b16bd9bb35b8511faa56e9ee80f6420daaac1d8d338beba29a2c842aade95`
  replaces only this binary; SDK, Time and Media hashes are unchanged. Before the
  next large case, one authorized normal Artifact delete removed the retained
  object `01a1517c-06eb-73c3-b60d-5ed081d831f9`; its sweeper removed the metadata
  and upload records, and usage returned to zero stored/reserved bytes and zero
  open uploads. The temporary maintenance runner was deleted. The corrected native
  runner `vv-hub-qa/artifact-multi-v2` is sandbox
  `f4b79fb8-a9ad-4a6f-9c15-23a4bffb08b0`. Its one exact large-object case failed
  after 428.11 seconds, from 00:48:38.296 to 00:55:46.406 UTC on October 19,
  with JSON-RPC `-32603`, `upstream MCP request failed: Transport closed`.
  The multipart upload completed at 00:52:54.309; independent read-only state shows
  Artifact `01a151a2-2788-7362-ae05-3db1d7d8cf45` Available at 00:55:49.483,
  holding 1,076,887,552 bytes with server-computed SHA-256
  `c8f34e712074151a1643b88f5b92e6d3200074916b8ce3ecdb15f0307e8adbb1`.
  Its verifier succeeded at 00:55:49.490. These server outcomes do not turn the
  failed acceptance test into a pass. Native QA supervisor logs record Hub tunnel
  closures at 00:54:46.973 following a provider environment update. Independently,
  Hub's own native supervisor recorded `policy_changed:false` and
  `provider_env_changed:true` at 00:55:46.347, followed by six connection fences
  from generation 2 to 3 at 00:55:46.352. Hub recorded upstream EOF at
  00:55:46.353613 and .353804. This tightly correlates the failure with Hub's own
  credential update rather than establishing a fixed one-minute stream timeout.
  The source audit found no such stream lifetime. Individual RPC-to-fence IDs
  were not captured. The object and runner are retained. No replay, Media suite
  or paid generation followed.
  Private evidence: `evidence/artifact-large-corrected-20261019.log`, SHA-256
  `fb87adc825a68848ddf2f24ec66bad5c190953b2b897aca1d889e8f715df41fb`,
  and `evidence/artifact-large-corrected-receipt-20261019.json`. Native log evidence
  is `evidence/native-hub-window-20261019.log`, SHA-256
  `68c173d307160b3d20c64e99da8acd0923b9026398570d69914cd7754f7c28c7`;
  `evidence/native-hub-refresh-fence-20261019.json` retains the safe timestamp
  projection. Native timestamps have millisecond precision.
- Source review identified a Hub subscription-boundary defect: an established
  upstream subscription returning `Ok(None)` is converted into `TransportClosed`
  and then JSON-RPC `-32603`. The SDK's existing bounded reopen/re-read behavior
  handles subscription endings, but correctly does not reinterpret arbitrary
  application errors as retryable disconnects. Hub correction
  `ec9f7f59be0e74135e5ed8179e65e360c701cf6c` is published: retain that typed end and finish the downstream subscription using
  RMCP's normal completion result; preserve actual protocol/admission errors.
  This follows [MCP 2026-07-28 subscription closure](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions).
  Its [HTTP binding](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)
  has no `Last-Event-ID` replay; recovery re-establishes subscriptions and reconciles
  current state without replaying mutations. OpenShell's
  [provider guidance](https://docs.nvidia.com/openshell/dev/how-it-works/providers/profiles)
  recommends reconnecting after configuration-related grant failures. Native
  enforcement remains unchanged. The regression exercises the actual Hub boundary,
  subsequent resource reconciliation and later pushed updates.
  The regression reproduces the original defect with baseline production code:
  one test failed in 1.49 seconds at the ended-listener assertion with the same
  JSON-RPC `-32603`. The corrected implementation passes the same regression in
  1.66 seconds: HTTP EOF produces normal downstream completion, a new listener
  recovers state changed during the gap, later updates are pushed, and a genuine
  upstream refusal keeps its error code/message. The focused subscription unit
  case passes 1/1 and the full lifecycle target passes 2/2. The Mac Docker check
  then passed 204 tests with one skipped; image
  `sha256:8d490d99bdf061e76d4a7648f01368bd4c82b34d5efca585aeb0b594eedf61c1`.
  The remote Linux x86_64 Docker check also passed 204 tests with one skipped;
  image `sha256:b0ab42373bc77f190fa1b5cc35032267995da85456a6036902c4ad27a01629f6`.
  Deployment subsequently passed readiness and a routed Time call as recorded
  below; the updated large-object case subsequently passes as recorded below.
  Both regression runs used the same Linux ARM64
  dev image on the Mac; this is not Linux x86_64 deployment evidence.
  An initial compile attempt failed in `hkdf` with E0463 for
  `hmac`; the same image/source compiled past that stage using a Linux-local
  Cargo target and two build jobs, without establishing the original cause.
  A subsequent test-only missing `Debug` derive was corrected before the actual
  baseline regression ran. Neither setup failure is a regression verdict.
- Hub `ec9f7f59be0e74135e5ed8179e65e360c701cf6c` is now deployed on Linux in
  runtime image `sha256:91988a8f06cc6ae13fc2e2d768a7f03de6b0a601aee79436eaf0fc8958343ef6`.
  Native OpenShell has no image-update command, so the supported rollout stopped
  and replaced the old Hub sandbox while retaining logical `vv-control/hub`,
  provider/policy selection and the read-only `vv-hub-config` mount. The new
  sandbox is `4af8097f-8781-4b24-81f1-ba863a0fafda`, main process
  `4b3c6a53-16da-4a62-85b7-f15c2cf0a228`; the existing logical HTTP exposure is
  restored with the same target and bearer passthrough. Verified public TLS and
  resource discovery return HTTP 200, unauthenticated MCP returns 401, and the
  existing native SDK runner's authenticated routed Time call resolves
  `2026-10-17T12:00:00Z` to Unix `1792238400` and DTG `171200ZOCT26`, with matching
  effective authority IDs. This is rollout/readiness evidence, not the pending
  full large-object recovery or same-revision restart qualification.
- The next large-object run, using the corrected Hub and unchanged Artifact
  acceptance binary, started at 01:45:20 UTC on October 19. It failed with
  `the subscription ... kept ending`; libtest reported 333.89 seconds, zero
  passed and one failed. No exact test-end timestamp was recorded; the process
  was observed absent by 01:51:32. The retained Artifact and verification Task
  share ID `01a151d6-1247-7810-ac9b-cc2b9ab6c017`. Independent read-only evidence
  shows the Artifact Available at 01:52:46.493424 and its Task Succeeded at
  01:52:46.499104, with 1,076,887,552 bytes and matching SHA-256
  `c8f34e712074151a1643b88f5b92e6d3200074916b8ce3ecdb15f0307e8adbb1`.
  Backend completion after the observer failed is not an acceptance pass.
  Before this run, the prior retained object `01a151a2-2788-7362-ae05-3db1d7d8cf45`
  was deleted through the normal Artifact API and stored/reserved usage returned
  to zero. The temporary maintenance runner was removed.
  Source review of pinned SDK `026902ae73eaa56533dbc49bd66c39481c8b9494`
  establishes the new error's exact condition: three total acknowledged listener
  openings have ended. Healthy reads, updates and listening time never reset that
  lifetime budget, even when the caller's 600-second timeout remains. Task result
  observation has the same cap. This proves the client recovery defect but does
  not by itself establish why each stream ended. A client-only correction is in
  development: bounded cancellable backoff, existing caller deadlines, immediate
  real errors, resubscribe/current-state reconciliation and no mutation replay.
  Work is isolated from unrelated local SDK commit `7f01193`.
  The private allowlisted receipt is
  `evidence/artifact-large-subscription-failure-20261019.json`, SHA-256
  `f17ea0517ca0ee49f8699dad5178df1b31d2a315ca35b29b08836f47150ae7df`;
  its raw test log is `evidence/artifact-large-hub-ec9f7f59-20261019.log`, SHA-256
  `dabe69e99d6ca49c0cbfb7ea744867832e17be08fd01607d44e11e83c453cb8c`.
  A supplementary native-log projection records five QA runner provider updates
  and nineteen relay fences in the window. No captured request identity ties
  those fences to a particular listener. Hub's observed provider update at
  01:52:52.368 occurred after the client failed; no typed Hub listener-end message
  was captured. The private projection is
  `evidence/artifact-large-native-log-window-20261019.json`, SHA-256
  `3851d427a6805fa450b5f40efa538b38713eb60269dcc7093b64e629230fc5de`.
- SDK client correction `483914615a2e5846e58aac97daabb30b77835c6d` is published
  from an isolated worktree based on `026902a`; unrelated local paging work is
  unchanged. Resource and Task observations now reopen typed listener ends with
  cancellable exponential backoff from 100 milliseconds to five seconds. Five
  seconds actually awaiting notifications resets the delay; a slow snapshot or
  acknowledgment alone does not. The existing caller timeout/drop bounds the
  observation. Genuine errors remain terminal and mutations are never replayed.
  Baseline Linux regressions reproduce both failures: Task observation fails in
  0.18 seconds and resource observation in 15.35 seconds at the old opening cap.
  Corrected Linux tests pass two deterministic policy cases and four public HTTP
  cases in 20.87 seconds. The resource case crosses four healthy listener endings,
  re-reads changed state and receives a later push; the Task case crosses four
  rapid endings with exactly one creation and separately proves timeout does not
  cancel the Task. Other cases cover terminal errors and deadline/drop recovery.
  These HTTP tests inject normal listener endings; the earlier Hub regression
  covers actual upstream HTTP EOF. Neither substitutes for native deployed proof.
  Full Docker gates on both hosts pass 302 tests with three skipped, including
  strict lint, dependency and feature checks. Mac check image
  `sha256:61d30c8b95fe0ff48f27d4cced7f499455aaa4d609a0d88ef2eef2e20a9f2270`
  is Linux/arm64; remote Linux check image
  `sha256:b11211686aecbec303ebeedfc52006d7fc8f18189aa6f1e658d42546411059a2`
  is Linux/amd64. Private full-gate logs are
  `/tmp/veoveo-hub-sdk-check-71857-mac.log`, SHA-256
  `d4d9128f41ecc0f3384eec10e500efaf10b763f3c61efaef96c51eadbe5d1aac`,
  and `evidence/sdk-resource-observation-check-71857-linux.log`, SHA-256
  `58f7bac01d31e301d8e749cd00320f0fbe2ff170c7c2386f2354e8be14c9231c`.
  Artifact adopts this SDK in `ce0a766e3556ce02f899b9dc37466f5d1be013c0`;
  Media adopts the same SDK and Artifact client in
  `774be1eddfe387a95a461a88c7a0b2b2d48d84c7`. These updates change only the
  manifest/lockfile source identities, with no unrelated dependency versions or
  edges changed. Both repositories are published after full Docker gates on both
  hosts: Artifact passes 116 tests with nine skipped; Media passes 72 with eleven
  skipped. Artifact check images are
  `sha256:02d212ea9837221986719a95e3846763cf1412144ffa98240f1dd05656fa83aa`
  on Mac (Linux/arm64) and
  `sha256:a2d157841cf3c367a7b8c99af929ebb9dafd19809745af0404e9c7fe8cecee31`
  on Linux (Linux/amd64). Media check images are
  `sha256:7a05c720c1ceed55f660ec293e4664ec7bc813d6d4f85fd81cd64cbad497a248`
  and `sha256:704dc6ad30717731c224b0a7bc4d0f2d97bcaed0e0263048e5dcf279b9636495`,
  respectively. The private `evidence/component-checks-20261019.json` receipt
  records the commands, source revisions, images and log hashes separately from
  deployment. Updated Linux runtime images and release qualification executables
  are built. Time `9874293`, Artifact `ce0a766` and Media `774be1e` are now Ready
  after native image replacement with the same logical names, providers,
  configuration and persistent mounts. The large-object case subsequently passes;
  service restart recovery and the remaining acceptance gates are pending.
- The updated Linux qualification image is
  `sha256:75dd6ef03e6bcb813f0f4c9301fecc3f4bfa172a232767ce2431a0946bec8d9f`,
  containing the release SDK CLI and Time, Artifact and Media acceptance binaries.
  Their binary hashes and test listings were checked before execution. Replacement
  sandbox IDs are Time `f7c64397-3dac-405b-95e2-8b93c97efcd7`, Artifact
  `a4831b8a-2f6f-46f1-966b-b8c3c4f4569c` and Media
  `c93481d0-6872-4a48-ad6e-cbc96abe5684`. Media's existing native HTTP exposure
  retains its target `127.0.0.1:8802` and bearer passthrough. Its `/readyz` path
  returns 404 because no such route exists; application acceptance uses the
  supported Hub discovery/schema/call surface.
  The fresh Time baseline starts at 02:53:31 UTC on October 19 and passes all
  seven cases in 14.60 seconds, with eight filtered and no restart cases run.
  The log ends with the successful harness summary; wrapper end/exit fields were
  not captured. Its last-write time, 02:53:46.199, is not an exact process-end
  timestamp. Private log `evidence/time-acceptance-v2.log` has SHA-256
  `8390ff3a5a3c4a42a92aa817a272b64e8350301c925381497e9b77f0b0df8751`.
  A malformed principal in the initial empty qualification runner was corrected
  before any tests ran; production services were unaffected. The subsequent long
  Artifact case captures explicit start/end and exit status as recorded below.
- The updated large-object acceptance passes on October 19 using the frozen
  Artifact `ce0a766` release acceptance binary, SHA-256
  `eeb2f2f1e42644513404770d3c9c1a013f84cf21456fcb0bfae5287ecfa1a5c0`,
  and qualification image `75dd6ef03e6b`. The exact test is
  `a_gibibyte_of_unknown_size_verifies_serves_a_range_and_releases_its_bytes`
  in sandbox `50cef612-a920-44f5-a7b9-6fa1f7217967` (`artifact-qa-v2`).
  Parent timestamps are 03:03:58.197–03:11:00.413 UTC: 422.216 seconds between
  recorded millisecond timestamps (the receipt's separately rounded duration is
  422.217 seconds). Native Exec exits zero; libtest reports one passed, zero
  failed in 419.65 seconds, with empty stderr.
  The case uploads 1,076,887,552 deterministic bytes in 65 parts, waits for
  Available, compares the server's size and whole-content SHA-256 with the locally
  computed input, checks a 206/200-byte range crossing a part boundary, deletes
  once and observes an unreadable resource and stored-byte reduction of at least
  the object's size. It does not full-download the object, prove direct S3
  deletion, assert a particular read-error code or demonstrate that a retry or
  reconnect occurred during this successful run. Neither the object ID nor the
  successful content digest is printed by this test. Those values must not be
  borrowed from the earlier failed runs.
  Private receipt files are retained under installation state
  `state/reference/evidence/artifact-large-pass-20261019`: `meta.json` SHA-256
  `4a24ad0889648269a36b0984b2f1e64051bc614e37b2222af2cf18152a6533b7`
  and `stdout.log` SHA-256
  `b2126d60bbcd47d47e6143f9ddde961d380a5cbb1f7497595eefa6a44a3623e7`.
  The retained object from the prior failed run was deleted through the normal
  Artifact API before this test; resource absence and zero stored/reserved usage
  were observed, and its temporary maintenance runner was removed.
  The SSH forwarding session subsequently stopped completing banner exchange.
  Public Hub discovery still returned verified-TLS HTTP 200 in 0.397 seconds, and
  unauthenticated MCP returned 401 in 0.326 seconds. After restoring the same
  RustDesk 2222-to-22 mapping, Linux SSH and native service readiness returned.
  Supplemental Docker logs for the successful test window returned zero bytes
  from the QA, Hub and Artifact supervisors; this supplies no additional transport
  evidence. The private `native-logs/receipt.json` beneath the successful test
  evidence records that retrieval. No successful workload was repeated to recover
  missing diagnostics. Updated fake Media, restart recovery, real signed callback
  and final MiMo acceptance remain open.
- **Next development cutover: merged typed contracts, fresh state.** The operator
  selected a reset on October 18: application data is disposable during active
  development. Do not implement old-registration migrations, retained Task result
  adapters, compatibility decoders or backups for this cutover. Source and trusted
  installation/identity configuration remain the inputs to the fresh deployment.
  The seven clean local `main` candidates are Core `433ed5f`, SDK `b3da412`,
  Artifact `00c8e93`, MCP template `b39a604`, Time `151d271`, Hub `ed6778f` and
  Media `4e8504b`. These are candidates, not the deployed revisions in the table
  below. Their Mac and Linux Docker checks subsequently pass with the two follow-up
  commits recorded below, and all seven selected revisions are published.
  Fresh deployment subsequently completed as recorded below. Do not infer
  deployed acceptance from source-check receipts.
  Read-only review finds a coherent Core/SDK/Artifact pin graph and no confirmed
  defect in a fresh matched stack. SDK observation recovery and durable Task
  adapters are unchanged from `4839146`; Hub listener forwarding is unchanged
  from `ec9f7f5`. Required Tasks and permission-before-creation behavior remain.
  The intentional contract cutover changes registration permission strings to
  tagged `RouteAccess`, Product results to `{resultUri, metadata}` and collections
  to `{items, limit, nextCursor}` with typed filters. Signed-download output stays
  unchanged. Old registration rows cannot be decoded by the new Hub, and old
  completed Media Task payloads are not new typed Products; the authorized reset
  removes both historical formats instead of supporting them.
  After source gates pass, deploy the coherent set against fresh application
  state and qualify new registrations, two-identity admission, Page/Product calls,
  Media-to-Artifact delegation, subscription recovery and terminal/in-flight
  restarts. Then run the one real signed callback and final bounded MiMo check.
  Earlier deployed successes, including the large Artifact run above, remain
  evidence for their exact frozen revisions; they are not passes for these merges.
- **Merged-source local gates pass (October 19 UTC).** These are Docker
  `check` targets on macOS, producing Linux ARM64 check images, not Linux-host
  deployment acceptance. Core `433ed5f` passes 349 tests/two skipped; Artifact
  `00c8e93` 112/nine; Hub `ed6778f` 206/one; Media `4e8504b` 69/11; and the MCP
  template `b39a604` 14/zero. SDK follow-up `b0b8d86` passes 227/three and Time
  follow-up `e607b2e` passes 140/ten. All seven selected working trees are clean.
  The initial SDK fetch failed because Core's exact pin was not yet published.
  Temporary bare Git mirrors supplied the same committed dependency objects;
  manifest/lock pins and original check instructions remained unchanged. This
  proves local source gates, not canonical remote fetch or Linux-host gates.
  Time's initial gate exposed primitive floating-point decoding failures after
  Core enabled arbitrary-precision JSON: tagged expressions and flattened
  projections buffer numeric values. The fix uses supported JSON Number decoding
  and finite f64 admission, preserving numeric wire shapes and GPS bounds. The
  next run exposed a stale hosted-error assertion; its replacement verifies direct
  typed/schema refusal and the current masked error contract. Both original
  failures and the failed intermediate run are retained. SDK's test-only follow-up
  restores three removed trace/serialization redaction regressions through current
  typed routes; no runtime SDK change or dependency repin is required.
  The successful Time run is 04:11:09.907–04:16:04.348 UTC; SDK is
  04:06:06.281–04:12:06.401 UTC. Private installation evidence is
  `state/reference/evidence/component-checks-20261019.json`, SHA-256
  `bcf945cbb565bf4cf76e9b3baf1032f696483329d874fd0f6296ca71740dc5e4`;
  `typed-contract-checks-20261019/` retains all ten check receipts and hashed logs.
  Checked patch hashes match the subsequent SDK and Time commit diffs exactly.
  The subsequent Linux source checks and publication are recorded below.
  Fresh-state deployment and the real signed callback subsequently completed as
  recorded below; final bounded MiMo acceptance subsequently passes in the final
  Time-first receipt. No paid generation
  or OpenCode model call was made by these source-check cycles.
- **First merged-source Linux gate passes.** Core `433ed5f` passes the canonical
  Docker `check` target on the remote Linux x86_64 host: 349 tests passed, two
  skipped, exit zero, 04:27:22.575–04:31:00.872 UTC. Check image
  `sha256:c7c32be656bbbed25533699e48ddf36b33117297f64ce1f1848f7b241fc4f8e9`;
  log SHA-256 `4473fa6aa37bd9365747daa3839767a1a98f52dd82076aa0ac71f1e5be678b9d`.
  The remote receipt is `evidence/source-bundles-20261019T0418Z/linux-core-433ed5f-check.json`.
  Both host gates now pass, and the exact Core revision is published to origin.
  Dependent Linux checks can fetch that pinned revision normally. This is source
  qualification; it does not establish deployment or callback acceptance.
- **All merged-source Linux gates pass and are published (October 19 UTC).**
  The actual Linux x86_64 host passes the canonical Docker `check` targets for
  Core `433ed5f` (349 passed/two skipped), SDK `b0b8d86` (227/three), Hub
  `ed6778f` (206/one), Time `e607b2e` (140/ten), Artifact `00c8e93` (112/nine),
  Media `4e8504b` (69/11) and MCP template `b39a604` (14/zero). All seven local
  trees are clean and the selected heads match origin `main`. Their exact source
  trees, commands, times, image IDs and log hashes are retained in the private
  `component-checks-20261019.json` aggregate and `typed-contract-checks-20261019/`.
  Builder is GPT-6 Luna; source follow-up author is GPT-6.1 Sol; review and
  publication are coordinated by GPT-6 Astra.
  The first Artifact gate failed two SeaweedFS fixture startups before test
  assertions (110 passed/two failed/nine skipped). Both exact isolated cases then
  passed using `cargo test --all-features --test ... -- --exact --nocapture` in
  the pinned dev image, followed by one unchanged full canonical nextest gate
  with no overlapping build. The full success took 178.624 seconds,
  04:55:35.475–04:58:34.099 UTC; image
  `sha256:f5aac09407368b27193fbaca7674f5dd811ee5492963d401392ceb8a90f45ee4`.
  Original failure, focused runs and full success remain separate receipts.
  Initial Hub/Artifact build contention is plausible, not an established cause;
  no source change, timeout extension or weakened assertion was used.
  A raw process diagnostic inadvertently included the SeaweedFS admin password
  in tool output, not saved evidence. No other credential field was present.
  Raw argv/environment inspection stopped. That password was privately rotated
  during the authorized fresh SeaweedFS recreation; other private configuration
  fields were verified unchanged. This is not evidence of external use. Source
  gates alone do not claim application acceptance. The subsequent rollout and
  first fresh-stack acceptance are recorded below.
- **Fresh typed-contract deployment (October 19 UTC).** Matching Linux/amd64
  runtime images for Hub `ed6778f`, Time `e607b2e`, Artifact `00c8e93` and Media
  `4e8504b` were built, revision-label checked and deployed through native
  OpenShell. All four services and the matching synthetic provider fixture are
  Ready. The authorized reset recreated only the application PostgreSQL and
  SeaweedFS volumes; the fresh database had zero user schemas/public relations
  before Hub startup. No backups or compatibility migration were added. Gateway,
  tunnel, trusted configuration, native provider definitions and the current
  fresh-reference signing keys were retained. Verified Hub readiness and public
  discovery pass. The immutable runtime table below is current; earlier receipts
  describe their exact historical sources. Runtime logs and hash-verified receipts
  are under private installation evidence `typed-contract-runtime-20261019/`.
  Fresh administrator/member Entra PKCE grants pass independent Ed25519 signature,
  issuer, audience and identity checks. Direct access-token updates were rejected
  by OpenShell's refresh-ownership guard; reconfiguring each existing native
  refresh entry restored custody without a new provider or credential path.
  The controller minted fresh access tokens, and disposable QA grant files were
  removed after custody confirmation. New authorization epochs require fresh QA
  processes; ordinary automatic renewal must preserve those new references.
  At that checkpoint application-token expiry qualification remained open: use
  completion of the
  initial successful calls plus the configured 900-second JWT lifetime and a
  margin, not merely the 300-second native lease. The controller-held JWTs were
  not extracted; this is a conservative configuration-derived bound.
  Artifact's dedicated storage key is denied List/Get on an existing unrelated
  probe bucket/object that bootstrap credentials successfully list/read; its
  ListBuckets response excludes that bucket. XML AccessDenied was captured for
  List/Get, without an HTTP-status capture. IAM ListUsers separately returns
  HTTP 403/AccessDenied. The probe object and bucket were removed. This is scoped
  authorization evidence, not fresh multipart acceptance.
  Four matching release QA executables pass hash and executable checks as the
  actual sandbox user in image
  `sha256:0738c6b1ea075759cd865b64a4d0897b2a688d0437832e72d2d0847b18428904`.
  Initial extraction/ownership/mode mistakes were corrected before executing
  tests; no application source changes were needed. A standalone SDK probe in
  Time's runner was denied by its binary allowlist before dispatch. The dedicated
  SDK runner uses the existing client policy and succeeds for both principals:
  the fixed `2026-10-17T12:00:00Z` resolve call takes 0.392/0.321 seconds,
  respectively. Time's seven baseline cases pass, zero failures, 14.61 seconds
  libtest time and 14.662 seconds outer native Exec, at
  05:37:19.389–05:37:34.051 UTC. The private receipts are under
  `typed-contract-deployed-20261019/`. Artifact's fresh `00c8e93` six-case private
  baseline also passes: zero failures, 406.48 seconds libtest and 406.534 seconds
  outer native Exec, 05:37:47.744360–05:44:34.278715 UTC, exit zero and empty
  stderr. This includes the large unknown-size multipart case's independent
  digest, boundary range, deletion and stored-byte release assertions. The exact
  receipt is `artifact-acceptance-typed-20261019.json`; stdout SHA-256
  `82ede48948d2c912f20e9ee599f5a41369a2a7ed66efa08392958ebd474ed396`.
  Media's six-case fake baseline also passes, 51.28 seconds libtest and
  51.336316 seconds outer Exec, 06:10:19.893940–06:11:11.230256 UTC, exit zero;
  receipt `real-wavespeed-20261019/media-fake-six-final.json`. Recovery and
  renewal results and their remaining limits are recorded below. At the initial
  rollout checkpoint no paid generation or OpenCode model call had run; the later
  single real Events result is recorded below.
- **Fresh typed-stack recovery and renewal — 2026-10-19 UTC.** The three
  terminal prepare/restart/verify pairs pass against the same prepared records.
  Each service's native stop/start retains its sandbox and changes its process;
  these terminal pairs restart the component alone, not Hub. Time retains event
  `event-01a152c9-a591-7720-acb8-76e6425ebc18`, version 2 and its cancelled Task;
  verify passes at 06:12:22.938281–06:12:23.804474 (0.82 seconds libtest).
  Artifact retains `01a152ca-58e8-7af2-a1c5-8d5054165d8b` and its available-at
  timestamp; same-ID verify passes at 06:17:27.957162–06:17:29.188808
  (1.11 seconds), including exact downloaded bytes and cleanup. Media retains
  internal Task `01a152cb-fe21-7e60-bc57-751c85df9981`, prediction
  `01a152cbfe397480a14032033076822b` and the completed result; verify passes at
  06:17:48.118172–06:17:49.437975 (1.19 seconds), including its 65,536-byte
  synthetic Artifact and digest. Initial Artifact/Media verifies immediately after
  native Ready failed (unacknowledged resource subscription / transport send);
  these failures remain in the receipts. Native Ready alone did not establish
  application registration readiness. A routed application read preceded each
  successful same-record verify; no re-prepare or mutation replay was used.
  Private receipts are `real-wavespeed-20261019/{time,artifact,media}-terminal-*`.

  Media's coordinated in-flight Media+Hub restart also passes: 62.00 seconds
  libtest, 06:21:15.337475–06:22:17.592172 UTC, native Exec exit zero. Hub Task
  `gtr_xyEfLk3aJ4o6WNuicdmG720ZznGrzAEf2eO3eTA5u_Y`, internal Media Task
  `01a152d2-4ae4-7d23-94d7-521a711e0a63` and prediction
  `01a152d24b107b83b6e0903089b152c2` remain the same. The test observes Working
  after verified restart, then pushed Completed, one independently observed fake
  submission, one output and a retained result. Saved bytes total 65,536, SHA-256
  `c6ee57f09dbd4b0e5c6072ec59f2bbce2decf3ef9b1c695af802f26ae28931ce`.
  Receipt `media-inflight-recovery.stdout.log` has SHA-256
  `9dcec5192f12d2a97410c476930752da5d7328bef6cc85e16578e13909a50a00`;
  the matching stderr and native stop/start timestamps are retained alongside it.

  Both administrator and ordinary-member fresh calls succeed at 06:14:07 in the
  same SDK runner process `405171f2-f1f9-4323-a8c0-9e8f68571a5a`, without manual
  credential rotation. Before/after opaque-reference hashes match for both roles.
  The conservative original-JWT expiry bound is 06:09:57.302: the first successful
  current-process admin call ended at 05:54:53.302, plus the configured 900-second
  JWT lifetime and four-second verifier margin. This is a source/config-derived
  bound, not privately decoded per-token expiry; OpenShell's 300-second lease cap
  is not the JWT lifetime. This proves fresh-call recovery beyond that bound with
  unchanged handles, not uninterrupted transport or a separately measured refresh
  issuance timeline.

  Time in-flight recovery subsequently passes the reviewed operator sequence:
  24.91 seconds libtest, 06:51:48.763363855–06:52:13.922969328 UTC, exit zero.
  The same Hub Task `gtr_ylGIxVgW7EAS__wvpg2NwIlwvlPkRdO85Za4y-QqMC4` is Working
  before and after the confirmed Time restart; a reopened subscription delivers
  Working then pushed Completed with the expected 64-window schedule and retained
  completion. Time's process changes from `e5aaa…` to
  `86fd2f6d-538b-456f-a17e-12a4c7987a7d`. Receipt stdout SHA-256 is
  `f696fd960eefa3bd41c705d4cb45181b62e8511408c3d232bcedd489b55869ca`,
  stderr `342973bcaf40e73698d9d65a9fcf82e6d417a13c493d343e3e591fc1b321e739`;
  the native boundary receipt is `time-inflight-reviewed-20261019-native.json`.
  Earlier attempts remain historical: the 06:19:50.887–06:20:40.321 attempt reached
  Completed before the required post-restart Working assertion; the approximately
  49-second orchestration exceeded that fixture's working interval. A later
  automated harness read empty stdout after redirecting readiness JSON to a file
  and stopped before Task read/continuation; it is invalid evidence. Neither
  establishes a product recovery failure. No production behavior was changed.
  Gate 3 closes on the reviewed passing receipts; final bounded MiMo qualification
  subsequently passes in the final Time-first receipt after the historical attempts below.

  After real Media restoration, the existing admitted Media acceptance binary
  also passes its free catalog/member-refusal case in 0.38 seconds libtest,
  06:54:39.852017718–06:54:40.343164991 UTC. This proves a nonempty restored catalog
  and ordinary-member generation refusal without creating a generation; it does
  not assert that `wavespeed-ai/flux-schnell` was listed. That exact assertion
  subsequently passes as part of the final client scenario.

- **Final Linux OpenCode attempt — incomplete, 2026-10-19 UTC.** One authorized
  exclusive attempt used the reviewed private driver SHA-256
  `7bda21caed68d4794d37e5302f766381d1e5911fb29f870291977e983cf57daf`,
  OpenCode source `7b12c605`, the selected installed executable and explicit Build
  model `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, with eight-step/240-second bounds.
  It used its own OAuth grant, correct project/PWD and owned persistent server;
  Media generation was denied and the prompt required reuse of the real Artifact.
  Native MCP connected after 2.133963 seconds. The run started at
  06:31:23.043945 UTC and ended at 06:35:25.213759; the model phase reached
  240.023554 seconds and the owned processes were stopped (child exit -9).
  Session `ses_ead246882ffeKWdlYuYkWvaKj4` emitted one CLI step-start, no completed
  step or tool results, and saved no output. Its persisted assistant has one empty
  reasoning part created at 06:31:27.450; no text or tool input is persisted.
  This establishes engine reasoning-start activity, not an instrumented provider
  response or the subsequent cause of delay. No Time Task handle is visible. Stored zero usage/cost counters are
  incomplete accounting, not proof of zero provider response or billing.
  CLI stderr is empty; server stderr contains only the SDK SEP-2352 notice that
  the stored OAuth credential lacks an issuer stamp. No logged permission,
  provider error or retry identifies the timeout cause. Real Media restoration
  had native Ready evidence, but no retained catalog response; an attempted SDK
  catalog probe was policy-denied before Hub. Do not attribute this attempt to
  discovery failure or claim its real-catalog assertion passed.
  Private evidence is `opencode-reference-final-20261019/`, receipt SHA-256
  `58461d97c39a58d4e9e55eabbf3fdbafa4e6db9e4aac817e938fbdd4a4f130c9`.
  Gate 5 remained unchecked at this first-attempt checkpoint. No replacement run
  had been made; the later corrected attempt is recorded below. No new paid
  generation is needed or permitted by this retrieval scenario.

  The killed attempt left a durable execution claim with no terminal outcome;
  a later managed-server startup could automatically resume it outside the
  harness's bound. After retaining exact-session sanitized claim/parts metadata,
  the native `session delete --standalone` command with warming disabled retired
  only this disposable session. Read-only verification confirms no session,
  message, inbox or pending rows remain. Receipts
  `session-claim-before-deletion.json` and `session-deletion-verification.json`
  are retained beside the immutable attempt; the latter has SHA-256
  `7b363eeebb960106402018a34e3cd39472499ab33e55a3404538b8624424da01`.
  No model call was made by that cleanup.

  A separate private launcher candidate now pre-creates an empty native session
  to know its identity before CLI execution. On deadline or abnormal exit while
  the server still owns it, it requests standard session interruption with
  `resume=false`, waits a bounded ten seconds for terminal state, then stops its
  owned processes; SIGKILL is last-resort cleanup. A read-only claim observation
  explicitly reports released, remaining or unknown state. Process death alone
  is not durable cancellation, and failure to confirm terminal state is not
  success. This correction preserves production session recovery. Its local
  dummy-provider check passes at 06:56:28.379541–06:56:29.324569 UTC: one synthetic
  SSE request/frame, acknowledged interruption, terminal Interrupted, released
  claim and observed provider-connection closure. Cleanup takes 10.465 ms; no
  external inference or Hub call occurs. Private receipt
  `real-wavespeed-20261019/mimo-cancellation-check-receipt.json` has SHA-256
  `76c06e81503ef111effac9c0d9c4ef39f6afb12e7b84547568136d58f7f74165`.
  After that proof, the reviewed candidate SHA-256
  `dcc3a36a2967ae66a683f4759ffebcd346720eadc12d7f041f14d5500cf48b3d`
  ran the corrected bounded attempt at 06:57:25.554651 UTC, session
  `ses_ead0c91eaffeYVBWZ4ITmzP9Jd`, with native MCP connected at 06:57:27.590188.
  It retained explicit MiMo/Build, eight steps, 240 seconds, its own OAuth grant,
  retained-Artifact retrieval and the generation denial. This second attempt also
  timed out: 240.003101 seconds model phase, 242.127631 seconds total, finished
  07:01:27.682756 UTC. No completed tools, finalized accounting or saved output
  were recorded. Native interruption completed in 39.06 ms; the claim was released
  with resume-attempt count zero. Receipt
  `real-wavespeed-20261019/final-mimo-candidate-attempt.json` has SHA-256
  `013d3e9a56b58f02b1dc491b97945dd5c791e10eae3a448286cf78742f840f71`;
  the exact archived attempt is `opencode-reference-final-attempt-20261019/attempt/`.
  The local cancellation proof and released claim do not establish final client
  acceptance or explain the latency. No provider-cost conclusion follows from
  absent finalized accounting.

  A separate reviewed candidate adds the existing authenticated native
  `/api/event` stream before prompting, with a `server.connected` barrier and
  exact-session filtering. It retains event types/counts, source/receive timestamps
  and delta lengths only, discarding raw reasoning/tool inputs. Engine delta
  events are batched and live-only, not provider HTTP chunks; disconnect/overflow
  limits are recorded. Its explicit model deadline accepts only 240 or 600 seconds,
  retaining the same eight-step model/scenario/generation denial and known-session
  interruption cleanup. Its local fixture now passes with one synthetic request
  and frame, a nonempty reasoning delta counted in a mode-0600 live JSONL file,
  no retained raw synthetic text, acknowledged interruption, terminal Interrupted,
  released claim and closed provider connection. The observer retains 14 metadata
  records, no local record-limit hit or reported overflow, and records EOF;
  cleanup takes 8.599 ms. Receipt SHA-256 is
  `071ef21d6526e240028a6914928c5c4bfc7f2a2941b60e072dc0f0eea60b30fb`;
  this is a localhost fixture with no inference or Hub call.
  The reviewed candidate `6043b29604c2518f25c96ea20ae046848b6e9df3f41408c7752f990c7319dcd8`
  ran with the explicit 600-second bound and the same eight-step scenario,
  07:08:38.339632–07:18:39.833546 UTC, session `ses_ead025069ffeXuzFg4ZxxjEmf0`.
  This third attempt also reached its bound: 600.001049 seconds model phase,
  601.463073 seconds total. Native observation counted 1,624 reasoning deltas and
  61,086 characters, but no tool call, finalized accounting or saved output.
  Native interruption took 37.617 ms; its claim is released with zero resumes.
  Receipt `opencode-reference-final-instrumented-20261019/attempt/receipt.json`
  has SHA-256 `d53cdf4460fc92f5827deffc64e6819ff9702a650c05806dca21a7d82492e271`.
  These counts prove continuing engine reasoning activity, not a silent stream;
  they do not measure provider HTTP chunks, token usage or cost. Gate 5 remained open.

  Source/config review finds no explicit reasoning control in the selected
  default variant. Cached MiMo metadata permits 131,072 output tokens and exposes
  reasoning toggle support; Core's primary output allowance uses that limit when
  context room permits. Eight steps bounds model calls, not first-step reasoning,
  and CLI `--thinking` only controls rendering. No contradictory tool instruction
  or transport defect is established. A new private candidate selects the native
  `#none` variant of the same exact provider/model, mapping to DeepInfra body
  `reasoning.enabled=false`; scenario, permissions and MCP Tasks are unchanged.
  The localhost fixed-refusal comparison passes: default reasoning is omitted,
  `#none` sends exactly `reasoning.enabled=false`, and both retain identical 12-tool
  local Build inventories and schema hashes. Two intentional HTTP 400 responses
  create no inference and leave released claims. The first `#none` attempt ended
  unsuccessfully after 65.823 seconds at eight steps: two local tool-name/search-shape
  errors, then read-only resource discovery; no intended MCP operation or saved file.
  The prompt confused direct MCP tools with Code Mode resource helpers. An actual-project
  localhost refusal probe then measured normal asynchronous tool inventory growth
  from 12 to 50 in 101 ms, with required direct tools present and generation absent.
  The corrected prompt distinguishes these surfaces. Its same-model `#none` run,
  bounded by 16 steps / 600 seconds, was partial: 2026-10-19
  07:40:44.824397–07:43:29.677098 UTC, 164.850767 seconds total /
  163.212114 seconds model phase, session `ses_eace4ea38ffeCdYeXWcDCUKj8w`.
  The retained Artifact download independently verifies as PNG 1024 × 1024 RGB,
  883,996 bytes, SHA-256
  `007af757d14221e544098adc5a1e37488f7e57818c85c9e3d91e97587d646b96`.
  The single `expand_schedule` call was rejected because its calendar ID lacked
  `calendar-`; its time-only local fields were also outside the decoder contract.
  The advertised schema lacked the prefix/full-date metadata. No Time Task was
  created. Code Mode `.arrayBuffer()` / `crypto.subtle.digest` assumptions caused
  local errors before the successful download. CLI exit 0 is not a semantic pass.
  Durable session cost is USD 0.0850859424: 178,365 input, 6,943 output,
  652,384 cache-read and zero reasoning tokens. The 15 CLI step records total only
  USD 0.0664002324 and are incomplete. Authoritative receipt:
  `state/reference/evidence/opencode-reference-final-direct-20261019/durable-session-usage.json`,
  SHA-256 `2db296e9a900f514ca1130b00b98622f9b564c8b240f7a259cd7d045e2bfcf80`.
  Time's schema-only correction is published at
  `d70ac8e2f9bdfb1c012ee744e5cd119ce4bca1dd`, tree
  `b4ac7086357e4f788899eb8fd9dcc1cf5c1c7a02`. Both canonical Docker checks pass
  141 tests / 10 skipped: Mac-hosted Linux ARM64 and actual reference Linux AMD64.
  Matching runtime rollout and the new Time baseline now pass: seven cases in
  14.84 seconds, Hub catalog 39 tools / 21 Time tools, with live `CalendarId`
  prefix/minimum 10/maximum 128 and full local-date/time metadata. The new runtime
  image is `sha256:e57e00213da9acef3d25ef4fae19c690a0b2843eeae4374c54cc33f2172c90b8`;
  matching QA image `sha256:3df4c810854dc9c65045c0864992301e72c480df70a131cc7597fbc11c01a83f`.
  Time sandbox `4cf23b46-1c5b-46d9-987c-dc7f2cb969bb`, process
  `d72771e0-43c6-40f6-8ed7-c032b3dc6dfe`, records this rollout; earlier `e607b2e`
  images and baseline/recovery receipts remain historical evidence.
  QA recreation uses the authored base policy with the same provider: effective
  policy export contains a synthetic provider key and is not the authored input
  for recomposition. Effective policy equivalence is confirmed by canonical SHA-256
  `171d1e63fe62d86c30140f3c4c2504c656c5b558841235d0aa7b6e8f7f56b845`;
  provider/credential selectors, Time public-key fingerprint and RW state mount are
  unchanged. Member read of retained Task
  `gtr_ylGIxVgW7EAS__wvpg2NwIlwvlPkRdO85Za4y-QqMC4` still returns Completed,
  64 occurrences, not truncated, no error and the same timestamps. The private
  `time-calendar-schema-20261019/native-rollout-d70ac8e` receipts retain this proof.
  A separate no-model native status observation on the unchanged OpenCode project
  measured absent → pending → connected in 1.033 seconds, then clean shutdown;
  this is normal asynchronous discovery, not a configuration defect.
  The next same-model 16-step run ended with CLI exit 0 but semantic failure:
  2026-10-19 08:14:01.257596–08:21:07.218450 UTC, session
  `ses_eacc6751cffe60j73RL4fVYA1X`, 424.697897 seconds model phase / 425.959552 total.
  It made one filtered catalog call and one download request, but zero Time resolve
  or schedule calls. Initial default Python GETs received HTTP 403 / body code 1010
  before URL expiry. A later browser-like User-Agent case network-downloaded the
  exact 883,996-byte PNG to a fresh 0600 file; it did not copy the prior image.
  This is not the required unchanged-header/default-client proof, and no Time Task
  was created. The sanitized semantic receipt is retained with the attempt.
  The native Cloudflare object-host-only `bic=false` rule was applied/read back at
  08:36:22.683664 UTC; global Browser Integrity Check remains on. Post-edge checks
  pass: default Python signed GET 200/682.388 ms, default curl 200/424.357 ms, both
  exact 883,996 bytes/SHA/PNG; unsigned 403 AccessDenied/205.016 ms and tampered
  403 SignatureDoesNotMatch/194.681 ms. No UA override, TLS bypass or proxy was used.
  Receipt `opencode-reference-post-edge-20261019/transfer-receipt.json`, SHA-256
  `c6c11ba38519dd12cad206a27682f3cffb0c4d47de718d5b9b5935833e0b3c99`.
  The later full-scope Time-first run passes the final semantic gate, as recorded
  below. No new generation ran; the real signed callback remains independently qualified.
  Reasoning deltas are live-only; the full reasoning value is persisted on end.
  Therefore the empty retained start cannot establish that no reasoning deltas
  arrived before SIGKILL. Provider response timing and billing remain unmeasured.
- **Native provider-request instrumentation.** OpenShell `6589a91` writes opt-in
  supervisor OCSF JSON to `/var/log/openshell-ocsf.YYYY-MM-DD.log`; the supervisor
  log directory is ephemeral. Enable `ocsf_json_enabled`, verify application and
  JSON emission, then retain private before/after log-directory copies for the
  single real run before restart. Gateway sandbox logs carry shorthand and retain
  only the latest 2,000 entries. Both paths use bounded, potentially lossy queues.
  The actual real-run receipt below used a bounded native supervisor log response,
  not a verified complete filesystem capture.
  Count distinct observed native-admitted generation POSTs separately from status
  GETs, using the recorded window and OCSF event IDs. This is not a lossless count
  of provider-accepted requests. Pair it with the Task operation, provider
  prediction, applied signed callback, cost and Artifact receipts.
- A related narrow protocol audit found that pinned RMCP already rejects
  non-declaring clients on `tasks/get`, `tasks/update`, `tasks/cancel` and Task-ID
  subscriptions with the standard `-32021` and `requiredCapabilities`. Media's
  ordinary `tools/call` refusal for its Task-only generation tool instead uses
  `-32600`. The [Tasks capability-negotiation rule](https://tasks.extensions.modelcontextprotocol.io/specification/2026-07-28/tasks#capability-negotiation)
  also requires `-32021` when execution requires a Task. Time's `expand_schedule`
  and `validate_timeline` stubs have the same gap. Corrections use the
  pinned RMCP's typed error helper, preserve mandatory Tasks and check permissions
  first. New regressions assert the capability payload and no Task creation;
  Media also asserts zero quotes or provider dispatch. Media correction
  `b53c010a848b13eac47fe1ec172821652a3d7d4d` is published after Mac and remote
  Linux Docker checks each passed 72 tests with eleven skipped. Time correction
  `9874293db5ffdc6be260dd60094e7b1f97fe5e3c` is published after both Docker checks
  each passed 153 tests with ten skipped. These include strict lint and feature
  gates. Both corrections are included in the replacement runtimes above. Artifact has
  no analogous Task-only tool stub. No dependency changes or taskless execution
  path are included in these corrections.
- Native workspace isolation now passes on Linux with the existing Entra forwarder.
  An independent operator inventory confirmed `vv-services/time`
  (`29bb3e6d-d8fc-4062-a587-b7e173ec2a50`) and `vv-control/hub`
  (`235f1e07-d4a9-4b51-a87d-37563798b1c8`) both Ready immediately before the probe.
  Direct native `ForwardTcp` to Time returned HTTP 200 for `/readyz` with logical
  Host `time.internal:8800`; an Init-only attempt to the existing Hub returned
  exact gRPC `NotFound`, the native unauthorized-existence concealment. The probe
  exited zero; exact start/end timestamps and duration were not instrumented.
  It did not require `GetSandbox`,
  `sandbox:read`, a new identity or an expanded grant. Temporary mode-0600
  Controller inputs, including the existing forwarder secret, were removed.
  Qualifier `5fcb89c6be8c7a3b2294f0261456cf68516dd326` is published; the repository's
  original archived status was restored. Its Linux x86_64 executable SHA-256 is
  `d6747f30d5eb38d576b87d1caa40939aeccfb9440fa0ecf30e7619eebc9f0209`.
  Mac and Linux checks each pass nine first-path tests with two ignored and strict
  Clippy. The first mock-only check deadlocked because it awaited request Data
  before returning stream headers; the fixture now returns headers after Init,
  and its async tests have bounded deadlines. That diagnostic was not a deployed
  native failure. The safe receipt is `evidence/forward-isolation-probe.json`;
  both local and remote qualifier checkouts are clean at the published revision.
  This closes the identity/TLS/routing gate, independently of the
  remaining service recovery and real signed callback gates.
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
  At that preflight checkpoint no paid generation or OpenCode model call had
  occurred; the subsequent single real Events run is recorded below.

### Linux Real WaveSpeed Signed Events Receipt — 2026-10-19

The user prioritized the one real signed-callback run before completing the
then-remaining deterministic/restart gates. Those service/recovery gates now pass;
this Events gate remains independent; final client gate 5 subsequently passes by
reusing its retained image. Exactly one paid generation ran through the Rust acceptance
client, public Hub, native Media and private Artifact. No OpenCode/model-driver
call or second generation was used.

- **Input and timing:** `wavespeed-ai/flux-schnell`, prompt "A small orange robot
  holding a green seedling on a clean white laboratory bench, soft studio light,
  simple centered composition, no text." Input: `size=1024*1024`, `num_images=1`,
  `seed=42`, `output_format=png`, `enable_base64_output=false`,
  `enable_sync_mode=false`. The acceptance interval is
  05:49:43.827679–05:50:09.861785 UTC, **26.034106 seconds**, including dispatch,
  callback completion, output storage and billing; pure inference time was not
  measured.
- **Durable linkage:** internal Media Task
  `01a152b5-6d72-72a3-83d3-0fa9080da3ff`; generation operation
  `01a152b5-6e45-7ec1-87b9-ca013bfc4cc5`; provider prediction/event
  `c8aa00e31ec14fe79fba39d02938773f`; available private Artifact
  `01a152b5-b5d4-7e93-9f2f-5387f2e01345`. The signature-verified final callback
  was persisted/applied at 05:50:01.632404 UTC, **16.878267 seconds** after the
  recorded generation acknowledgment. Its generation operation settled in
  `events` mode with **zero generation status checks**. One separate billing
  check reconciled the actual charge. Task, prediction and Artifact provenance
  agree; per-Task estimate and actual are each **USD 0.003**, quantity one
  `Requests`.
- **Independent bytes:** verified TLS, unchanged signed GET, no redirects;
  **883,996 bytes**, decoded **PNG 1024 × 1024**, SHA-256
  `007af757d14221e544098adc5a1e37488f7e57818c85c9e3d91e97587d646b96`.
  Size, MIME and canonical digest match the stored Artifact. The image is saved
  privately as `tmp-client-reference/wavespeed-events-20261019.png` on the Mac.
- **Failures before success:** catalog-not-loaded admission refused the initial
  attempt; independent SQL showed zero Media Tasks/operations, so it did not spend
  a generation. Catalog refresh had actually received HTTP 401. The authoritative
  installation key worked directly; the existing native provider credential was
  corrected and Media restarted, after which catalog admission succeeded. No
  direct provider-key environment fallback was added. Independent retrieval first
  hit the Time-focused SDK runner's tool policy; adding only
  `artifact__create_download` to its existing public Hub endpoint/binary rule
  allowed the download. The runner process changed, so this is not a same-process
  post-expiry renewal proof.
- **Native traffic and limits:** the retained bounded supervisor log response has
  128 lines/103 OCSF records and one observed native-admitted generation POST.
  This is not verified full filesystem capture or a lossless provider-server
  request ledger; native queues can drop records. Pair that observation with the
  single durable dispatch/prediction and accepted callback, rather than inferring
  an independent provider-accepted HTTP count. One model/input/image is qualified;
  other models/providers, GPU/CUDA and final MiMo remain outside this pass.

Private installation evidence is `state/reference/evidence/real-wavespeed-20261019/`:
`result.json`, `operator-proof.csv` (SHA-256
`0113008a178d680a0cda5d517a49e28a6ddc7347adcbdd020e6b29f28550622f`),
`operator-proof-receipt.json` and `independent-image-verification.json`. No callback
bearer URL, signed download URL, request header or provider secret is published.

| Current Linux runtime | Immutable image ID |
| --- | --- |
| Hub `ed6778f` | `sha256:6fd5cdb9761ba5f91bc288110a0a1794a141dd6ac9dfe66e4048385e087d1a70` |
| Time `d70ac8e` | `sha256:e57e00213da9acef3d25ef4fae19c690a0b2843eeae4374c54cc33f2172c90b8` |
| Artifact `00c8e93` | `sha256:28413a16b612a35725e91fc5dae2325ffc17613df742489d34a59d6d0f93cf29` |
| Media `4e8504b` | `sha256:e3353a53f38f6a9f65cf5f93ff8c8fab663a2a8828244e5e674dd98485ce2209` |
| Media test provider `4e8504b` | `sha256:b97476b8d40c03dff0381c6600517fb27320ee08fcff50fa113cb4af69449b11` |

- [x] **0 — Inventory, retired-stack cleanup and reviewed native placement.** Reconcile
  the current remote processes, images, policies, identity, public routing and
  PostgreSQL/Lore/S3/key ownership. Remove the explicitly retired Linux containers,
  clusters, volumes and task-created backups; preserve the active control plane,
  source checkouts, Mac and unrelated services. Use fresh application state and
  keys. Bring unsupported native capabilities or
  responsibility changes to coordinator review; add no proxy, second launcher or
  infrastructure fallback to hide an unresolved failure.
- [x] **1 — Pinned native Linux builds and installation.** Select reviewed source
  revisions, build/check Linux x86_64 artifacts and record actual immutable images
  and executable revisions. Install the native OpenShell gateway/supervisor and
  approved service definitions, providers, private placements and persistent
  mounts through existing installation/native contracts. Preserve the established
  Lore/IdP custody and durable service ownership. Generate fresh Linux service keys
  and register them into the fresh database; never reuse the retired key material.
  Mac ARM64 evidence is historical, not Linux
  x86_64 acceptance.
- [x] **2 — Identity, TLS and public routing.** Qualify verified TLS, canonical
  issuer/audience/JWKS admission, native credential custody/renewal, workspace
  isolation and Hub's approved private forwarding bindings. Establish and verify
  the actual public HTTPS callback route using the existing Media callback
  contract; preserve signed URL authority and direct S3 bytes. Review any routing
  gap before implementation rather than inventing a relay or bypass.
- [x] **3 — Deterministic deployed services.** Prove Hub registration and discovery,
  Tasks, permissions, subscriptions, reconnect, renewal and restart/persistence
  with Time, Artifact and Media on the actual Linux sandboxes. Preserve the
  independent Artifact metadata/digest/byte and usage/provenance assertions.
  Use deterministic fixtures before real-provider work, and distinguish component
  results from deployed evidence. Hub requires Tasks; no taskless compatibility
  work is part of this goal.
- [x] **4 — One cheap real signed WaveSpeed callback.** Review the actual model,
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
  not this callback gate or a guaranteed future price. The single Linux run now
  passes with the [dated Events receipt](#linux-real-wavespeed-signed-events-receipt--2026-10-19).
  Deterministic/restart gate 3 now passes separately; no additional paid
  generation was needed for the subsequently completed client gate 5.
- [x] **5 — Final bounded OpenCode MiMo qualification.** Only after deterministic,
  component, integration and deployed gates pass and expected behavior works,
  preflight the selected OpenCode MCP client without inference, then run the
  explicitly selected `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` Build agent once within
  reviewed step/time bounds. Retrieve/reconcile the existing real Task and Artifact,
  execute a Time Task and verify saved bytes; do not submit a second paid generation
  by default. Refine the exact scenario after deployment. Record actual tool outcomes,
  Task/Artifact identities, saved bytes/hash, errors, timings and model token/cost
  evidence. Preserve normal asynchronous MCP connection/catalog behavior. Stop on
  failure and return to development; no model calls during iteration, silent model
  substitution, repair loop or automatic mutation replay. The reviewed
  [Time-first receipt](#linux-final-time-first-opencode-mimo-receipt--2026-10-19)
  now passes the complete scenario without a new generation.

### Linux Final Time-First OpenCode MiMo Receipt — 2026-10-19

The complete model-driven scenario passes with OpenCode source `7b12c605`, the
reviewed installed executable and explicit Build model
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro#none`, 16-step / 600-second bounds and its own
OAuth grant. Driver start/finish: **08:39:08.179348–08:40:43.145956 UTC**;
**94.966864 seconds total / 92.797675 seconds model phase**. The outer builder
launch was approximately 95.04 seconds and is a different measurement. Session
`ses_eacaf7328ffeycifx83RlrRnWC` exits zero and satisfies the semantic assertions,
not merely the process-status check.

- **Ordered operations:** all eight tool envelopes completed without errors: two
  `resolve_time` calls, exactly one `expand_schedule`, one filtered catalog call
  finding `wavespeed-ai/flux-schnell`, resource discovery/read of the retained
  Artifact, one `create_download` and one native shell. First recorded direct-tool
  invocation was 6.268652 seconds after driver start; this measures invocation,
  not catalog readiness or the first HTTP request.
- **Task reconciliation:** exactly one Time Task
  `01a15350-c26b-73b2-a922-4562431da071`, actual Hub handle
  `gtr_4pfg_rQsyNguBbWNq2oBPyfBkDcB6EuGUxkSnOPdizA`, succeeded at
  **08:39:24.027981 UTC** with one occurrence and `truncated=false`. Two native
  resolutions supplied the horizon for `calendar-final-mimo-2030-8f2308ad`;
  no TimeInstant was fabricated. Trusted read-only SQL confirms the single row.
- **Retained image:** model-observed metadata matches Media Task
  `01a152b5-6d72-72a3-83d3-0fa9080da3ff`, prediction
  `c8aa00e31ec14fe79fba39d02938773f` and Artifact
  `01a152b5-b5d4-7e93-9f2f-5387f2e01345`. The exact signed URL, GET method and
  empty explicit headers were preserved. Native shell wrote a fresh exclusive
  mode-0600 file from the network, without UA override, TLS bypass or local copy.
  Independent full decode confirms PNG 1024 × 1024 RGB, **883,996 bytes**, SHA-256
  `007af757d14221e544098adc5a1e37488f7e57818c85c9e3d91e97587d646b96`.
- **Accounting and lifecycle:** durable cost **USD 0.0223635068**, 41,621 input /
  4,080 output / 254,688 cache-read / zero reasoning tokens. Native claim released,
  zero resumes. No new generation or Media Task was created; the single paid
  signed-callback image was reused.
- **Evidence and limits:** private `opencode-reference-final-timefirst-20261019/`
  retains the driver, original transcript, operator SQL, image and ledger receipt.
  `semantic-review.json` SHA-256
  `4926c4ccded6ce697aee8e811e8d9697d315354b0d3bec2be74c35f241209eb5`;
  historical manifest SHA-256
  `3cb0c0800a13cc185b21fc082c16f710707005e71628c6715fec1c529be25512`.
  The separate independent semantic supplement is retained without rewriting that
  manifest. Source negotiation and prior component/live probes establish separate
  lifecycle behavior; this final receipt does not capture capability-body wire
  data or distinguish pushed status from status polling.

### PostgreSQL vector and spatial extensions — 2026-10-19

**Qualified in the existing `veoveo` database on both deployments.** PostgreSQL
remains 18.6; pgvector 0.8.7 and PostGIS 3.6.4 are enabled in `_extensions`.
Template commit `844e89386f2831ed7d5d45556fdc6cf13f4b9047` and Bioma commit
`be40fb21e43a80bd4cfe4e739f6663aca9626f2e` contain the same pinned Dockerfile,
bootstrap SQL and verification SQL. Existing volumes, service schemas, ownership,
registration roles and search paths remain in place. Keycloak's database is unchanged.

- **Execution:** GPT-6 Astra coordinated/reviewed, GPT-6.1 Sol implemented the
  installation changes, and GPT-6 Luna built and deployed them. No OpenCode or
  inference-provider calls were made. These are deterministic database checks,
  not model-driven acceptance or a new MCP tool qualification.
- **Images:** the Mac's Docker `linux/arm64` build took 10.53 seconds and produced
  `sha256:e9a851dad724ff7ff7e46e87a59b4037683e998683d8fa4bb1cd342b6c9339fc`
  (703,536,221 bytes). The actual Linux reference's `linux/amd64` build took
  12.30 seconds and produced
  `sha256:ec28a91344e51dd0e22a6c16ac773b07dcb57f69a863d1a3c55858e2cacdaa33`
  (688,778,865 bytes). Both retain the digest-pinned PostgreSQL 18.6 server/client;
  only the extension packages and their dependencies are added.
- **Bootstrap and behavior:** empty-database initialization and repeated explicit
  enablement pass on both architectures. Exact vector L2 distance is 5 for
  `[1,2,3]` and `[4,6,3]`; HNSW nearest-neighbor and GiST bounding-box queries return
  the expected fixture row. EPSG:4326 point `(1,1)` transforms to EPSG:3857
  `(111319.49079327357,111325.1428663851)` within `1e-6`. The small fixture forces
  index plans with `enable_seqscan=off`; this proves index usability, not speed,
  scale or approximate-search recall.
- **Authorization and lifecycle:** deployed checks use trusted administrator
  `SET ROLE` into existing Time, Artifact, Media and Hub roles on both hosts, plus
  Lore locally. This proves those roles' database authorization; it is not a new
  service-login authentication test. Extension-schema CREATE is denied and
  `spatial_ref_sys` is read-only to those roles. All fixture DDL rolls back.
  Extension state survives PostgreSQL recreation/restart, pre-existing application
  ownership is unchanged (87 local schema/relation records, 83 remote), and actual
  application connections reappear after restart. No application compatibility
  layer, ownership migration or SDK change was added.
- **Unplanned execution issues:** remote harness path/SSH quoting mistakes and
  overly narrow/broad ownership comparisons were corrected; they did not require
  extension source changes. Broad diagnostics exposed the local PostgreSQL admin
  password and the remote SeaweedFS admin password in tool output. Both were
  rotated without retaining the old values in evidence. PostgreSQL's replacement
  succeeds over its nonloopback network path and an incorrect password is rejected;
  its stock container-loopback trust path was unsuitable for that negative test.
  SeaweedFS's replacement login succeeds and its old password is rejected by the
  native login form. S3 credentials, image, volume, TLS mounts and ports are unchanged.

Private receipts are under the template's ignored
`state/postgres-extension-evidence-20261019/`. The final local verification and
credential-remediation receipt is `coordinator-final-verification.json`, SHA-256
`9fa2267a34d06a6dea47301fcffa2dba9ec2569a6075be7c0ca0cdd8b67593a6`.
The remote final correction/supplement is
`remote-live-rollout/remote-live-rollout-correction.json`, SHA-256
`7f78a3c82baae31c8c9a619e9d9a98dc2314fc54f0e1faf568be061a695b2b36`;
it records the successful comparison of pre-existing ownership separately from
the newly created `_extensions` schema. Verification SQL SHA-256 is
`b314d84cabd101f023c796a92514be38c5512fe83efe4d36f7820cc0f5a4943f`.
Follow the [installation instructions](https://github.com/VeoveoAI/veoveo-template-installation/blob/844e89386f2831ed7d5d45556fdc6cf13f4b9047/postgres/README.md)
for build, enablement and service-role checks. A consuming MCP still owns its
columns, queries, indexes and feature-specific qualification.

### Remaining Adoption

During this slice, retain PostgreSQL/SeaweedFS in their trusted installation
placement and the qualified Lore/IdP path. Qualify persistent-volume access and
backup/restore before migrating durable infrastructure. Use one selected service
version per slug until composition/version routing is implemented.

Further adoption remains open:

- Follow the [agent-operated adoption phases](#agent-operated-platform-adoption-plan):
  user agents edit/test/commit on their Computers and push to Lore; future factories
  execute deterministic jobs. Historical factory-model proofs remain historical.
  For Lore-authored changes, publish a verified source snapshot to a separate Git
  checkout and remote, with the Lore revision in the Git commit message. Use one
  editing path per task; no automatic bidirectional sync. Git remains a build input
  while Cargo uses Git revision pins.
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

### Hosted Computers — Implementation And Linux Acceptance

The active Computer goal now includes the actual Linux reference at
`https://veoveo.bioma.ai/computer`. Local component tests and cross-built binaries
do not complete this goal. Coordinate the live switch with the ongoing installation
qualification; do not run parallel deployment changes or paid model calls.
Preserve the other team's Lore storage and qualification edits.

The accepted product boundary is one private, persistent native OpenShell Computer
per user. Its OpenCode web app, native Lore CLI, per-user Hub connection and default
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` configuration are ready on first use. The user's
native Lore permissions govern repository access; there is no extra author gate or
shared administrative identity. Working files remain private until pushed to Lore
or uploaded to Artifacts. Independent factories build published revisions and have
no OpenCode, inference credentials or agent instructions.

Source work lives under `/Users/rozgo/VeoveoAI/.worktrees/` in
`computers-openshell`, `computers-opencode`, `computers-lore`, `computers-hub`,
`computers-installation` and `computers-docs`. Main checkouts and the running
installation are not changed by this source work. The coordinator owns architecture,
review and evidence; the GPT-6.1 Sol coder owns implementation and the GPT-6 Luna
builder owns builds and checks. Neither worker makes model calls during iteration.

Source checkpoint, 2026-10-19:

- **Native Lore refresh:** local commit `821da21710a9085797dc8a9d98955c1f3af1c389`
  refreshes the selected public client's native OIDC login before resource-token
  exchange. Credential-pair updates use existing process/file locks, refresh token
  rotation is retained, and invalid grants require login again. Synthetic issuer
  tests include two real child processes sharing one credential store and exactly
  one refresh request. Credential tests (38), transport authentication tests (111),
  login tests (12), authentication tests (15), CLI compilation and strict
  credential/transport clippy pass. The broader revision clippy lane still has
  pre-existing findings. No installed CLI, real IdP refresh or crash-atomic
  provider/filesystem transaction is proved by these tests.
- **Factories:** installation commit `71e2c0b` removes OpenCode, its configuration
  and instructions, and the factory inference provider. A local Linux ARM64 image
  build passes; an offline container as UID 1000 has Lore, Rust/Cargo and the Hub
  SDK client, with no `opencode` executable or `/etc/opencode` directory. This
  fixture uses the existing cached Lore `0.10.1-nightly+local`; it does not qualify
  the new user-refresh commit. Image identity:
  `sha256:909420cc2ced205e1dd46fbfbd0e02708e697c2b5babca800c3a3be2aba8c0a2`.
- **OpenShell persistence:** local commit
  `90577de61bbea00c389b0920cdb931dcc9e58b1a` implements managed Docker working
  volumes and retained sandbox identity/specification. Focused server persistence
  tests (8), invalid-retention rejection (1), persisted startup/recovery tests (12),
  provisioning-worker tests (2), Docker-driver library tests (141; 2 ignored) and
  all-target compilation and strict affected-crate clippy pass. A real Docker-driver
  persistence fixture passes (4.61 seconds). The first isolated native gateway test
  failed on Stop → Start: initial readiness and workspace bytes passed, then the
  control supervisor fails and the sandbox enters `Error/ContainerExited`.
  The underlying supervisor diagnostic was lost during test cleanup; the observed
  failure does not yet establish its cause. Source review identifies a likely
  identity mismatch: changing the generation of an existing runtime leaves its
  generation-bound outer fence unchanged. The source correction
  preserves generation and rotates authentication on same-runtime Start, while
  committing a fresh identity and owned operation atomically after an observed
  missing-runtime response. Missing-runtime tests retain their fresh-generation
  requirement. The next native run passes initial readiness (864 ms), Stop → Start
  (2,695 ms) and retained identity after runtime loss (4,886 ms), then fails
  recreation with `SandboxTokenWriteFailed`: the recovery request omitted the
  gateway token that normal Create derives from the native launch bundle. The
  recovery source now derives that same driver-only token from the freshly minted
  bundle, with no token added to the public persisted specification. This failed
  run took 55.85 seconds; Cargo reports failure, but its numeric
  exit code was not retained because the wrapper used zsh's read-only `status`
  variable. Owned fixture resources were removed. The final recovery keeper and
  strict clippy pass, followed by the native gateway E2E (one test, 14.26 seconds;
  48.95 seconds including command/build overhead). Cumulative milestones are
  initial Ready at 0.863 seconds, Stop → Start at 2.630, retained runtime loss at
  4.812, recreated Ready at 10.714, gateway-restart preservation at 13.900 and
  explicit deletion/reclamation at 14.243. The retained sentinel is 54 bytes,
  SHA-256 `c414da577a789a3862fc6c645daa100b4309b5f0f60f478d43857381e908883a`.
  This uses an isolated local gateway and cached OpenShell 0.1.4 runtime/supervisor
  fixtures; it does not qualify the actual Linux installation. Async provisioning
  errors use owned native Stop before retry. The later matching Linux build and
  isolated lifecycle result are recorded below; public Computer acceptance remains
  pending.
- **Native forwarding readiness:** follow-up local commit
  `ea9b680dc780c1f24fd0cbf703cbfaf9b04f2d40` makes ForwardTcp success wait for
  the existing connected-target relay claim. It also owns both stream directions,
  closes an idle target when the caller drops the response, and preserves request
  EOF as a half-close so the target can deliver its final response. No protobuf or
  SDK API changes are needed. Twelve forwarding tests and eight existing relay
  integration tests pass; strict all-target server clippy passes in 77 seconds.
  A broad new StreamExt import initially collided with existing extension traits;
  qualifying only the new call fixes that compile error. A later comment-only
  doc-markdown lint was corrected without rerunning unchanged behavior tests.
  Matching native Linux builds/E2E subsequently pass as recorded below. Installation documentation commit
  `cb8540ee60be37e1010aff2f3f2ee86e78a69fc7` pins this revision; its image inputs
  are unchanged from the tested `16dcf3c` tranche.
- **OpenCode serving:** local commit
  `376324a9fe6870e6e9825e97bcd96d4948d84d5a` adds base-path serving, explicit
  trusted loopback proxy mode, mount-scoped browser storage and online-only serving.
  The final repository check passes all 34 tasks (22.05 seconds wall time), and
  all five CLI WebUi tests pass (107 assertions, 1.56 seconds).
  The focused browser cache/persistence suite passes (15 tests, 13.91 seconds),
  along with prior browser regressions (18), base-path tests (1), theme preload
  tests (7), proxy regressions (8) and five package typechecks. An earlier CLI WebUi
  failure, `InvalidHTTPResponse`, came from the buffered test proxy replaying
  transport-framing headers; the fixture now lets the HTTP server own framing
  while preserving encoded content. The E2E typecheck retains four known baseline
  errors. Final embedded-web-UI packages build for macOS ARM64 (53.38 seconds),
  Linux ARM64 (44.45 seconds) and Linux x86_64 baseline (43.56 seconds). Executable
  SHA-256 values are, respectively,
  `2da0a16007cee6c74bd9e8df448c3ee5ef7ee4cda2007cb6619b532773e60365`,
  `3f2d72d652d99a7c68e1b8b59597c782cf17a543bfb993ab75610d31a86bf1d8` and
  `79f58e2eaefa35cd30dd3cb73c7eca83ff2f45a67b0b41684cde1e4cbe74ddc3`.
  A macOS package smoke test with an isolated home and model fetching disabled
  returns HTTP 200 for `/api/info` and the web UI, marks HTML private/no-store,
  and refuses `/registerSW.js` with HTTP 404. No inference was requested. Online-only
  serving disables offline app caching so a fresh browser navigation must reach
  Hub admission. A path namespace is not an origin security boundary. The isolated
  Linux image execution below does not qualify authenticated remote browser access.
- **Hub and installation:** local Hub commit
  `e35f79823c0327a77ec817ffd8ec11022ee41fb4` adds typed installation inputs,
  owner mapping, browser-bound single-use PKCE state, native-family admission and
  durable pending/ready custody transitions. Two PostgreSQL-backed tests cover
  login state and serialized handoff/rollback; the bootstrap policy test, locked
  compilation and strict clippy pass. Clean SQLx generation and a fresh offline
  compilation also pass; removed metadata belongs to Core queries, not Hub queries.
  OAuth HTTP routing, native provisioning and streaming browser forwarding are now
  implemented in the worktree. The first runtime SQLx/compile gate fails after
  36.56 seconds: a logout query uses `family_id` where the existing refresh-token
  table declares `family`, the HTTP client has no enabled `.form` method, and the
  native policy error type does not support the selected `anyhow::Context` call.
  Those errors are corrected. A follow-up callback Handler error was traced by an
  explicit Send diagnostic to the form serializer remaining live across an await;
  scoping it like the existing native OAuth helper fixes the lifetime. SQLx prepare
  now passes (7.44 seconds), producing 91 current queries with aggregate SHA-256
  `7841086149dc0db336a80c8a0d7c7a2949f8c015db4d0ccb90ea76e58465767c`.
  Locked offline workspace/all-target/all-feature compilation passes (0.22 seconds
  on the warmed target). The first focused test run passes six cases and fails
  three PostgreSQL fixture starts because version-18 tools are absent from PATH;
  the corrected environment reaches the suite (seven pass, two fail). Those
  failures identify test setup defects: the new admission fixture lacks the
  installation OAuth-client resolver, and the extended handoff keeper reuses an
  already-inserted browser-cookie digest for its second login. Binding the native
  resolver and using a fresh replacement digest fixes both; all nine focused
  Computer tests pass (1.10 seconds). No concurrency cause is established by the
  duplicate-key error. Strict Hub clippy initially reaches two collapsible-if style
  findings; native let-chains correct both without changing behavior. The final
  locked workspace/all-target strict clippy passes in 8.83 seconds. The reviewed
  runtime is committed as `1e4aa5c0f8091d62030cf614e24c93f8b1b340f0`. The first full
  Mac-host Linux ARM64 Docker check compiles, then fails its SQLx prepare check:
  the committed metadata is missing queries. Its source is clean and contains the
  same 91 metadata files. Source inspection establishes the cause: SQLx 0.9 emits
  freshly compiled dependency queries into the same workspace directory, while
  warm dependencies emit nothing. Hub's existing README requires an empty target
  directory and retention of Core queries. The foundation's removal of 85 files
  because they belonged to Core was incorrect; the warm generation and subsequent
  offline compile did not validate that cleanup. Native regeneration against the
  exact pinned graph and migrations in a clean container produces 176 queries:
  the existing 91 are unchanged and all 85 additions exactly match the entries
  incorrectly removed by the foundation. Commit
  `df67d0c001088587d9f888c559b827e6c5953854` retains this full generated set;
  aggregate SHA-256 is
  `2e507e0c722f5ae5bff0125d9c75225b9487fc9ff929b719cdee408c9daa27ea`.
  No Rust or Docker gate change is required for that correction. The full Mac-host
  Docker retry then passes SQLx, formatting, clippy, dependency policy and feature
  checks. Of 216 selected tests, 215 pass and one database-contract test fails;
  one additional test is skipped. That existing test reports eight violations in
  the new Computer persistence: three queries lack tenant predicates, delivery
  clearing lacks a key/batch bound, three tables lack retention declarations, and
  the browser-session family foreign key lacks a leading-column index. The source
  correction resolves the native family first, derives its typed tenant/principal
  for Computer reads, and carries owner predicates through custody locking and
  completion. Logout clears every successor envelope in ordered batches under the
  existing revocation/audit transaction. Retention declarations preserve durable
  Computer lifetime; the family index supports the existing cascade. The existing
  keeper covers wrong-owner refusal plus 1,001 synthetic envelopes across multiple
  batches, including audit rollback. Fresh PostgreSQL 18.6 preparation against
  Core and the revised unreleased migration compiles in 36.86 seconds, generating
  178 metadata files (four replaced and two added), aggregate SHA-256
  `42e0bed375e8dc00a3b0d611f21538e692afc864515e17dfb538a9c1d538a1d2`.
  The corrected source and generated metadata are committed as
  `9da92b37340f1849b9e23145cab790977a3dff4e`. Offline workspace/all-target/all-feature
  compilation passes in 0.29 seconds. The existing database-contract test passes
  with zero violations across 75 queries and 24 tables; all nine focused Computer
  tests pass in 1.22 seconds. Strict workspace/all-target/all-feature clippy passes
  in 9.41 seconds. The checker remains intact. The full Mac-host Linux ARM64
  Docker gate then passes: 216 tests pass, one is skipped, test execution takes
  33.342 seconds and the whole build takes 201.92 seconds. Its check image is
  `sha256:2356424b84960109a0050575625415a915d26371f315a4b3fcb7e442ca949603`.
  The actual Linux x86_64 gate also passes all 216 selected tests with one skipped
  in a 249.586-second Docker build,
  along with migrations, SQLx, formatting, clippy, dependency and feature checks.
  Its check image is
  `sha256:a307862b3878e060f028ea4b2a03e2c050d8f24a8a2a6fdc1927a26377f4e0ad`.
  The first Linux wrapper invocation lacked Docker on PATH and did not start a
  build; using the already-present executable corrects only that harness failure.
  The matching Linux x86_64 runtime image then builds in 124.000 seconds:
  `sha256:1ada0a05a1fc87c77f022be373687c7f13b8167ab56fee7983d42d460742a251`,
  144,568,409 bytes. Its first invocation exits 126 before any Docker build because
  it selects a non-executable CLI path; the established task-local Docker executable
  succeeds without source changes. The reviewed source archive is SHA-256
  `7f9368f41bfdea9475c317e7b8f026b67a4a9571d088cbceb7ef9e22a8fb218c`.
  Focused receipts and
  `docker-check-macos.log` are in
  `/tmp/computers-hub-database-rules-validation-20261019/`. The added audit
  authentication method uses Core's
  existing declaration UPSERT and requires no data reset, record rewrite or Core/SDK
  pin; existing Artifact evidence remains intact.
  Review also found that native Sandbox Ready precedes application listening and
  ForwardTcp currently returns RPC headers before actual target connection.
  The native correction above awaits the existing relay claim before success,
  without changing wire fields, so initial provisioning can wait for TCP readiness.
  This establishes listener availability, not arbitrary application health.
  Installation commit
  `16dcf3c9e3d0106f65064bdb1226c17582f34209` adds the independent Computer image
  and configuration. It passes OpenCode's native schema and the native OpenShell
  parser (four policies and two profiles).
  Lore is now built from `821da217` into ARM64 image
  `sha256:e88c8357466a2d452370f57f4898297a99259ef9a3e0f23d1f0c772136335df6`
  in 105.97 seconds. Combining that image, the reviewed factory image and the final
  OpenCode Linux ARM64 package builds Computer image
  `sha256:bae2d09b9131c633544ff71332640401960b1ae313de1e6b802625f290bde85e`
  in 2.50 seconds. Offline image inspection confirms UID/GID 1000, private writable
  scratch/HOME/XDG/Lore directories and root-owned, non-writable `/etc/computer`.
  OpenCode reports `0.0.0-hosted-computer-20261019-final-linux-arm64`; Lore reports
  `0.10.2-nightly+local`, executable SHA-256
  `36b682a584d0113d57442da7c05770fec6c0797600a2e41d849c305db47193e6`.
  No factory-token environment key or token-named file was found in the inspected
  config/home. A 1.46-second native startup smoke passes: API HTTP 200, correct
  mounted HTML base and online-only marker, private/no-store, and HTTP 404 for
  both service-worker endpoints. The initial config harness ran from the wrong
  monorepo directory and could not resolve `effect`; the native schema passed
  from its package directory. An initial smoke request incorrectly sent the
  public mount prefix directly to the backend; the corrected request follows
  Hub's strip-prefix contract. Neither correction changes production source.
  Browser sessions
  must follow current Hub family expiry/revocation and permissions, including
  open streams. Native OpenShell owns Hub refresh after custody handoff. A crash
  with ambiguous handoff requires reauthorization; healthy provider status alone
  does not prove which user's family was installed.

Read-only remote baseline: SSH through `127.0.0.1:2222` reached Linux
`6.8.0-147-generic x86_64` in approximately 0.94 seconds. Public `/readyz` and OAuth
discovery returned HTTP 200 with successful TLS verification in approximately
0.24 seconds each. `/computer` returned HTTP 404 in 0.38 seconds. This establishes
access and the existing public baseline, not a deployed Computer. No service was
restarted, no credentials were exported and no model request was made.

The next Linux inventory reports Docker 29.2.1, OpenShell CLI 0.1.3 and 278 GB free.
Matching `ea9b680` gateway/runtime/supervisor artifacts are not installed. The
authorized isolated lane uses fresh task-owned sources, image/resource names,
state and ports; it does not reuse or restart the deployment's service containers
or other teams' active test resources. The final OpenCode x86_64 executable now runs
on that host with matching SHA-256
`79f58e2eaefa35cd30dd3cb73c7eca83ff2f45a67b0b41684cde1e4cbe74ddc3`.
`--version` and `serve --help` each exit successfully in approximately 0.07 seconds,
with the expected trusted-proxy and base-path flags. These checks use task-owned
HOME/XDG paths and disabled model fetching; no inference is invoked. The remote
receipt is `/tmp/computers-linux-qualification-20261019-16dcf3c9/opencode-linux-x64-smoke.log`.
The Linux Lore image build also exits successfully. The resulting Linux x86_64
Computer image is
`sha256:462d8574f84b04f7d9b801b1b9110885c6593c57311833526471999f18861a75`.
The matching Lore and deterministic Factory images are, respectively,
`sha256:902afddd87de1dad21228bb02af2c11af15a208b57348621dadc3ae5a3bcf305`
and `sha256:0b2787908f6875b70b04dd18d521e3acd281da0b117c5c4fed571dc1fb2cf7eb`;
all three inspect as `linux/amd64`. Factory and Computer builds take 51.65 and
2.25 seconds. The first Lore build lacks a wall timer; its log creation-to-last-write
interval is 203 seconds and its Cargo stage reports 104.5 seconds, which are not
substitutes for a measured end-to-end wall duration.
Its offline container smoke now passes: UID 1000, writable private state paths,
API HTTP 200, expected mounted HTML base and online-only marker, private/no-store,
and HTTP 404 for `/sw.js` and `/registerSW.js`. The embedded OpenCode hash matches
the reviewed package. Native Lore reports `0.10.2-nightly+local`, SHA-256
`19afa922a9bcdbf5cbb27ade9e0dfc3a0dfe2ccc1c43223d4fa0e9739397a49a`.
The smoke takes approximately 2.3 seconds and its owned container is removed.
This proves native target execution and HTTP serving with
network disabled, not authenticated Hub ingress or OpenShell sandbox lifecycle.
Local ARM64 receipts are not substituted for the remaining target-platform tests.

The matching native OpenShell Linux gateway compiles from `ea9b680` in 15 minutes
3 seconds, using the repository-pinned Rust 1.95, Zig 0.14.1 and cargo-zigbuild
0.22.3 inside a task-owned builder. The staging wrapper then fails because that
builder lacks `jq`; adding the prerequisite inside the builder allows reuse of
the compiled gateway. Host packages and running gateway services are unchanged.
The staging rerun succeeds in 3 minutes 49 seconds. Matching Linux AMD64 images
are built locally from that archive: gateway
`sha256:b568c51af00da3d6bca59814031ec50c70caf873439b453b95d12c5af09ea41c`,
sandbox runtime
`sha256:ab35dbc40835a6ed1e77bbc45472df3eb44660440177fc3988d53b7bbfb5cf95`,
and supervisor
`sha256:907ee27979dcefb5bcf13aeaa370372eeb4fe61e4ffb62dc13dc00bc955cfe54`.
Their image builds take 4.80, 0.58 and 1.06 seconds respectively. These artifacts
have not been pushed or installed into the running deployment. The matching
release CLI builds in 4 minutes 11 seconds, SHA-256
`f1b4e7cf58b460ff666a64b19081a489d49096e42fe2ea23d2da8bec90dc9b24`.
The repository's supported prebuilt gateway/CLI inputs select those exact release
artifacts for isolated E2E, avoiding a redundant debug gateway build. The first
native lifecycle attempt reaches the owned gateway and supervisor but fails
before retention assertions: the derived fixture's `/workspace/project` is
root-owned and unusable by sandbox UID 1000. The wrapper cleans up its own
gateway and sandbox. Correcting ownership in the task-owned derived image gives
fixture `sha256:a682a600cb160bf5df8e8422c877a6d30e9408fcf9b62a0dfc8e151a9cc948fd`.
The unchanged native lifecycle test then passes on Linux x86_64: one test in
16.07 seconds, 23 seconds including wrapper overhead. Initial readiness,
same-runtime Stop/Start, retained identity after observed runtime loss, fresh
generation/recreation, owned gateway restart and exactly owned Delete cleanup
all pass. Its 54-byte sentinel retains SHA-256
`1b9f92125f09ac7da8591dac422a2537c101c0a93680aa9a7b390529e027b460`.
This fixture checks generic workspace retention; it is separate from the pending
Computer image's native OpenCode session/project persistence scenario. The first
fixture failure and corrected pass remain separate logs under
`/tmp/computers-openshell-linux-qualification-20261019-ea9b680/logs/`.

The Linux Docker inventory contains no Lore runtime; no Lore systemd unit or
TCP listener on port 41337 was found. This does not exclude a separately hosted
private endpoint. Ownership of the Linux Lore prerequisite is being clarified
with the existing storage/installation owner before changing that service.

Remaining acceptance, in order:

The installation permission review identifies one additional prerequisite. Native
credential binding cannot select two providers for the same ForwardTcp endpoint.
A Computer-enabled Hub therefore uses one new dedicated native control identity
for both existing service forwarding and Computer provisioning, with one opaque
environment reference. Native CreateWorkspace and global GetProviderProfile
require the configured platform-admin role; scope enforcement additionally requires
workspace, sandbox and provider read/write scopes. Its egress policy admits the
fourteen RPCs actually used and the unbound public `/oauth/token` POST, preserving
existing IdP and database rules. It does not admit credential export, Delete,
Exec, provider Update or wildcard RPCs. This installation change is source-tested;
it has not been issued or attached on the live deployment. User Computers retain
their own Hub grants and native Lore login, never this management identity.
Source review also finds that the initial Computer policy lacks the signed object
byte route needed for Artifact publication. The installation now adds only native
curl access to the exact public object authority over unbound TCP/TLS, preserving
SigV4 and excluding Hub/model credentials. The updated agent instructions require
a fresh Computer image; earlier image receipts do not cover that text. The
updated Linux x86_64 Computer image builds in 3.2 seconds from the same reviewed
Factory, Lore and OpenCode inputs:
`sha256:928de5288cd5001e7b1f8ac836e73702d6f2e1ba93951c1f6859ddbfcb68621f`.
The actual image then passes its task-owned native OpenShell lifecycle test in
15.92 seconds. Native `/api/info` responds; POST creates one Session and Project;
PATCH changes a nonempty title and synthetic metadata. Native SSE delivers
`server.connected`, `session.renamed` and `session.metadata.updated`. The same
session/project IDs, creation times, title, metadata and scratch bytes survive
Stop/Start, observed runtime loss with fresh-generation recreation, and owned
gateway restart. A synthetic marker in Lore's private home directory also survives;
it is not an actual login credential or proof of Lore authentication. Explicit
Delete removes the owned volume. The temporary Rust test reuses the existing
native SDK/gateway fixture, with bounded Hyper HTTP/SSE and no model calls;
source SHA-256 is
`a7b9a37702a8a506a98ddd7848490171b8abf98530c7bcfdda38a11a25c84c17`.
The safe retained state is 602 bytes, SHA-256
`478f2a235297ac66e007fb24e3944bb9918937a249e93b2d63099121569796c6`,
for Session `ses_eac7c1ed1ffeyzQmjmAraqRRKI` and Project
`1ab5f4e6ab9cf5ef60c57dc7b5b29a22821f4c5f`. The synthetic Lore/scratch marker is
57 bytes, SHA-256
`428fbfc7ff72481767ef2b95eb2bfa85e1271fa18e8d56fd372bbb911604a4aa`.
Cumulative milestones are Ready at 1.819 seconds, session/SSE recorded at 2.481,
Stop/Start verified at 3.765, runtime loss retained at 5.954, recreation verified at
12.125, gateway restart verified at 15.502 and owned deletion at 15.915.
The wrapper exits zero. Its local receipt is
`/tmp/computers-final-handoff-20261019/computer-native-api-lifecycle.log`, SHA-256
`b1ea22d64b84dd4179ffd598bc0d84ea94cc69cf4c06722c135f3e91ddad2410`.
The first wrapper preflight lacks Docker on PATH and starts no gateway or sandbox;
the corrected task-only PATH selects the already-present approved Docker CLI.
This proves Computer application-state retention and native HTTP/SSE, not Hub
browser authentication, two-user permissions, actual Lore refresh or model access.
The ARM64 image rebuild also passes in 2.839 seconds, with the same reviewed
Factory, Lore and OpenCode inputs and no binary rebuild:
`sha256:74caaa250552a1fedc33f04443695fb2861bc2594c409fdb69ee8b1b64e5127f`.
The retained receipt bundle is `/tmp/computers-final-handoff-20261019/receipt.json`,
SHA-256 `ffb9bbe9da71718c79a993273d14726a99bd369fe2f00f9dfa175d211fb706b0`.
Its build and lifecycle logs sit alongside it. All images remain prepared artifacts;
no public or installed service has changed. No live object transfer has been
attempted by this work.
The first expanded native policy check fails before profile assertions: the
example Lore identity endpoint selects transparent TCP on the same public host
as managed Hub MCP. Native ambiguity analysis reports conflicting
`transparent_tcp_eligible` metadata. The earlier parser-only receipt did not test
that admission rule. The example is corrected to select a distinct actual
IdP authority while preserving Lore's native end-to-end TLS. Bioma's Entra issuer
already has a separate host; this does not call for a new alias, proxy or public
Lore route. The failed check takes 5.40 seconds, including 4.88 seconds compilation.
The corrected native parser/profile/ambiguity run passes in 3.18 seconds:
Computer policy, both Hub control variants with the exact fourteen RPCs, the
endpointless provider definitions and negative conflicting-provider/overlap
fixtures are admitted or refused as expected. Installation commit
`455b5eac0d02468c9810fb32786311281c5d17f2` contains that reviewed eleven-file
change. This source result does not prove native issuance, credential renewal,
signed transfers or deployed browser access.

The reviewed cutover uses the existing native control plane, not a second
installation controller. Import the global user profiles and create the reviewed
Computer template before starting Hub; its provisioner validates these at startup.
Merge a public `computer-browser` PKCE/refresh client, `computer` profile and a
selected existing Work Context into the actual Hub catalog. The profile uses the
existing Entra identity provider and Hub authorization server; extend the existing
upstream OIDC client's allowed resources for `/mcp/computer`. Its upstream callback
remains `/oauth/callback`; the public Computer client's callback is separately
`/computer/callback`. Preserve current memberships, permissions, service bindings
and key references. Validate the full merged configuration with the native Hub CLI,
then stage the additional Computer policy into the existing read-only Hub config
volume alongside its selected configuration.

Enabling `computers` or changing native transport requires an actual Hub restart,
and changing its image requires coordinated native replacement: neither catalog
reload nor restarting the existing Docker container installs a new image. The
native CLI has no in-place image-update command. Before selecting the replacement
operation, inventory the exact owned Hub sandbox, mounts and exposure and preserve
any working state it owns. The fresh-sandbox example is not authority to delete an
existing sandbox. Reestablish its same public exposure as necessary, retaining
PostgreSQL, object storage, config/signing state and unrelated workloads. Startup
applies the additive Computer schema and audit declarations; no application reset
is required. These are reviewed source requirements, not claims that the new IdP
client, final catalog, private Lore endpoint or replacement operation is prepared
on the live installation.

1. Source/component prerequisite passes as recorded above, including both full Hub
   Docker gates and actual Linux Computer application-state lifecycle. Do not repeat
   unchanged gates merely for rollout. Browser-cache namespaces remain separate
   from server-side authorization; they are not origin security boundaries.
2. Coordinate the public installation switch using the built Linux Hub runtime and
   Computer/native OpenShell images identified above. Both Computer platform images
   are built; the actual Linux image passes the isolated application-state checks.
   The user required no parallel deployment changes during the other team's Linux
   qualification. Check current deployment activity before changing shared services;
   do not turn that constraint into a request for the user to discover installation
   ownership or technical setup. Resolve the native operator session and prepare
   the private Lore configuration from existing installation inputs. Distinguish
   the reviewed source/image identities from the unchanged live revisions.
3. Open `/computer` as two separate users. Prove first-use provisioning, distinct
   owner workspaces/storage, HTTP/SSE/WebSocket access, cross-user refusal and
   session expiry/revocation. Repeat account switching in one browser profile.
4. Qualify native Lore login and refresh against the selected IdP, private network
   connectivity, permitted reads/writes and denied operations. Prove the user's
   Hub actions and native provider renewal beyond the initial token lifetime.
   Existing factory credentials are not evidence for this user-login path.
5. Verify each user's exact scratch bytes after stop/start, runtime recreation and
   coordinated gateway restart. Publish selected content to Lore and Artifacts,
   then run a separate factory against the exact published revision. Confirm that
   the factory has no OpenCode or inference credentials.
   The isolated prerequisite above passes with native OpenCode state: create a
   unique scratch directory, POST `/api/session` with a
   nonempty title, that directory and synthetic metadata, then PATCH a second
   nonempty title and retained marker. Save the returned session/project IDs and
   creation time outside the runtime. After each native lifecycle transition,
   retrieve the same session and project and compare the stable fields and scratch
   bytes; never recreate them after restart. `/api/info` is the bounded readiness
   check. Backend paths omit the public Computer mount prefix. An empty patched
   title invokes title generation, so this deterministic scenario must never send
   one. These are application-state checks, not model or real Lore-login evidence.
6. Only after deterministic and deployed gates pass, run the bounded Computer
   OpenCode qualification with the exact MiMo model, at most eight steps and
   240 seconds. Reuse the existing real Artifact and exercise a Time Task; do not
   submit another image generation. Coordinate this paid call with the reference
   qualification owner and retain actual tool outcomes, timings, identities and
   byte/hash evidence. No silent model substitution or model-driven repair loop.

Keep secrets, bearer values and signed URLs out of committed evidence. Update this
checkpoint and the existing three-view diagram as implementation and acceptance
advance; none of the pending paths is qualified by an adjacent component test.

Coordination recheck at 2026-10-19 09:44:49–09:45:01 UTC: public `/readyz`
returns 200 and `/computer` returns 404, with no redirects followed. The Linux
host has no Lore-named Docker container or systemd unit and no listener on 41337;
this does not exclude a separately hosted private Lore endpoint. The latest
reference execution record reports its completed Time-first MiMo scenario, but
that separate client receipt does not qualify the hosted Computer or authorize
parallel changes. The earlier request for a formal installation release and private
Lore owner was an overly broad coordination blocker, not a failed component gate.
The documentation worktree's detail-data/static checks pass. Diagram visual
review remains pending: automatic browser approval rejected its local `file://`
preview, and the requested localhost preview has not been approved.

The 2026-10-19 14:42 UTC read-only inventory narrows the remaining work. The live
Hub is still `ed6778f6a7e61df4f4c42241a589d9450f2bd63f`, its selected catalog has
no Computer client/binding, and its configuration volume has no Computer policy.
The built `9da92b3` image has not been selected by the installation. Public
`/readyz` returns 200 and `/computer` returns 404. System and user systemd job
queues are empty; running QA sandboxes alone do not establish concurrent work.
No services, data or credentials were changed by this inventory.

The installed native CLI's mTLS profile fails authenticated `whoami` and provider
listing with `missing authorization header`. Another saved OIDC profile has an
expired access token; its refresh capability and compatibility with the selected
CLI remain to be investigated using native session operations. These facts do not
establish that the user must supply a new credential. Separately, the existing
Linux Lore image already contains the server and CLI, and the installation's
trusted `vv-lore` service supplies the private PostgreSQL/SeaweedFS deployment
recipe. The remaining Lore investigation concerns Linux provisioning inputs and
native per-repository authorization with Entra; factory Keycloak credentials and
successful native refresh tests do not prove that human issuer interface. Safe
preparation continues without a generic permission or endpoint question.

Native operator recovery then succeeds without user input: the matching
`ea9b680` CLI, with `XDG_CONFIG_HOME` selecting the existing `veoveo-reference`
profile, completes authenticated `whoami` in 3.3 seconds including SSH and lists
provider profiles, both with exit zero. Native session handling refreshes the
saved grant; its store remains mode 0600 and its access expiry is now in the
future. No token is manually exported or copied, and no service, sandbox or
installation configuration is changed. The earlier operator failure came from
the selected CLI/configuration context and expired access token, not a measured
need for a new user credential. Private rollout preparation resumes using that
existing native session. Entra/Lore per-repository grant compatibility remains a
separate source/design investigation; it must not be replaced by global grants
or an additional token issuer to make login pass.

The coordinator approves the bounded native direct-role implementation described
in `LORE_DIRECT_OIDC_PLAN.md`: signed IdP role assignments map to typed exact
repository grants inside Lore, using its existing authorizer, partition grants
and native listing. The GPT-6.1 Sol coder owns the isolated `computers-lore` source
change over `821da217`; the GPT-6 Luna builder independently stages Linux inputs
using the recovered native operator session. No live identity or service changes
are made by staging. Signed scalar recipient claims already work in Lore; actual
Entra access-token issuance/renewal and permission behavior remain unproved. The
change is an authorization representation within native Lore, not permission for
global grants, a Hub Lore signer or a replacement authorization service.


### Computer native Lore and Entra preparation — 2026-10-19

The GPT-6.1 Sol coder implements the reviewed direct-role mode in isolated Lore
commit `b32265924ccf1d3c09de8f76ea4eecc8c2562b05`. Exact typed repository/action
mappings feed the existing authorizer, partition grants and native paginated
repository catalog. Empty actions retain ordinary native writes, not read-only
access. Review catches and corrects a synchronous-handler fallback: a finite
admitted grant for another repository must deny access, not reinterpret the raw
JWT through the older structured-claim path. No new issuer, wire protocol or
service-account bypass is introduced.

The GPT-6 Luna builder runs the frozen source on macOS: 71 authorization, 57
settings, nine OIDC, six obliterate and twelve partition-access tests pass, plus
one transport test proving the native original-access-token path without an
exchange template: 156 total. Test execution times are respectively 0.26, 0.00,
0.53, 0.01, 0.36 and 0.02 seconds; first compilation takes 1 minute 59 seconds.
Locked CLI/server consumer compilation passes in 57 seconds including wrapper.
Strict server Clippy exits 101 after 66 seconds with ten diagnostics in unchanged
`hooks/factory_branch.rs` and `plugins/s3_postgres.rs`; it reports none in changed
files. This is not a green full Clippy gate, new Linux build or Entra receipt.
Logs are retained at `/tmp/computers-lore-direct-roles-validation/`.
The reviewed ten-file source manifest aggregate SHA-256 is
`a6ae929c032d517f9e93b24893ab90d88bca3a496c4bf130c6b8bd03caf88680`.

Native Entra setup now advances using the existing Linux operator account, without
a new user login. On OpenShell API application
`8a6d434f-8c4c-4e2c-9756-9b2d94118d17`, the reviewed app-role PATCH preserves
four existing roles, adds Application membership to `openshell-admin`, and adds
five exact application scope roles. Existing `sandbox:write` supplies the sixth.
PATCH succeeds in two seconds, and nine-role readback matches the reviewed body.
The dedicated single-tenant `vv-hub-native-control` application is created in one
second, with application ID `61e0ebf1-d8f8-4747-beac-e908da2bb9e1`; its service
principal is `e5ece6f5-586a-4a13-867d-0cff89aeae0e`. Exactly seven assignments are
verified: `openshell-admin`, `workspace:read`, `workspace:write`, `sandbox:read`,
`sandbox:write`, `provider:read`, and `provider:write`. No `openshell:all` or Graph
runtime permission is assigned. Credential creation and native refresh custody
follow as a separate step; this readback has zero password/key credentials.
The running Hub and its existing forwarder identity remain unchanged.

Two preparation errors are corrected explicitly. A shallow copy altered the
local before-snapshot while constructing a PATCH; drift comparison stops before
any write, and a fresh independent snapshot restores the review baseline. A
colon-delimited assignment loop then produces an invalid GUID after the first
successful role grant; Graph returns HTTP 400. Correct structured-ID handling
assigns the remaining six roles and verifies the exact set. Neither error is an
Entra authorization refusal. Nonsecret receipts and payloads remain under
`/tmp/computers-entra-preparation-20261019/`. The normalized nine-role readback
SHA-256 is `a029afde6954ea359d669fabf1baad093a0fa6ef663f3f6abd9c40d431da740a`;
the seven-assignment readback is
`29d754df964a11f7da5f70a50af5f3fadb188f3feb8b7cff96bdd90ac5159e16`.

Explicit workspace-scoped native inventory confirms the existing Hub exposure:
`vv-control/hub/http`, port 8080, `bearer_passthrough`. An earlier empty default
workspace list did not establish a missing exposure. Cloudflare's selected native
route and Hub's loopback-host allowance remain required.

The actual trusted Linux bootstrap root is
`/home/rozgo/VeoveoAI-reference/src/veoveo-template-installation`, project
`vv-local`, using `compose.yaml` and `compose.storage-tls.yaml`. The earlier
`/home/rozgo/vertex/veoveo` path was not the active installation. Read-only checks
at the actual root find no Lore service/configuration/CA yet; PostgreSQL and
SeaweedFS retain their existing volumes and private addresses 10.231.10.2/.3.
Lore is prepared for the unused private 10.231.10.10:41337 endpoint, with matching
TLS IP SAN, advertised native URLs and signed recipient claim. The storage TLS
leaf verifies against the existing public OpenShell root. Lore will connect to
`https://veoveo-objects.bioma.ai:9000` through a Lore-only private address mapping,
preserving its actual TLS and signing authority. It needs no public gRPC route or
replacement storage certificate.

Installation `c70a35b2ff175460e4262e949f1d77585c261764` updates the existing
Factory/Lore Dockerfiles to install reviewed public CA files, one certificate per
file, through the normal system trust update. Computer inherits Factory trust;
private keys never enter those contexts. The four-file manifest aggregate SHA-256
is `8e4e404e665ac63cb8bbd8df49a711a6be5551754a9dc94d1314bc12aac5e160`.
Native bootstrap inputs are staged locally at
`/tmp/computers-lore-bootstrap-20261019/` for review. They are not installed merely
by staging. New Lore, Factory and Computer images must include the actual Linux
trust inputs and Bioma origin; the previous Computer image embeds the generic
example MCP origin and is not the final public installation artifact. No new
runtime, native Lore user login or Computer browser acceptance is claimed here.


Native credential custody then succeeds. The actual API identifier URI is
`api://8a6d434f-8c4c-4e2c-9756-9b2d94118d17`. The dedicated endpointless provider
profile passes native lint/import, and `vv-control/vv-hub-native-control` is
created without replacing an existing provider. One 90-day client credential has
nonsecret key ID `0adea6a5-ebb9-493b-b17f-7afaf4a374d1` and expires
2027-01-17 15:15:25 UTC. Its response is held only in a mode-0600 Linux temporary
file, supplied through native `--secret-material-env`, and removed after native
ConfigureProviderRefresh succeeds. Initial RotateProviderCredential succeeds in
one second. Status is `refreshed`, with next refresh at 2026-10-19 16:13:18 UTC
and initial access expiry at 16:16:18 UTC. No bearer export or manual JWT copy is
used. This proves initial acquisition/custody, not renewal beyond that expiry.
The live Hub still uses its prior forwarder attachment.

The new Linux-only P-256 Lore CA and server leaf are generated through the reviewed
native OpenSSL recipe. Chain verification and IP 10.231.10.10 / DNS
vv-lore.internal SAN checks pass. The public CA SHA-256 fingerprint is
`18:0B:52:F2:83:DB:0A:A5:ED:64:D2:68:B7:76:67:47:AF:0C:88:6E:0D:3A:66:ED:12:58:03:F2:53:EE:74:56`;
the server leaf fingerprint is
`6E:98:C5:77:49:D8:43:DD:B2:42:81:D9:1B:36:33:58:19:23:C7:31:64:4A:C1:63:FE:CF:A3:A4:F0:5B:E0:29`.
The public-only image context contains one certificate per file: the new Lore root
and existing storage root. Private keys stay mode 0600 on Linux and never enter an
image or Mac copy. An initial relative storage-leaf path was wrong; corrected
verification uses the actual `state/storage-tls/tls.crt`, then both chains pass.
No storage data, service runtime or existing certificate is replaced.

Installation `b6a6b6e9d4dc6dff83769355b10a24b89265f247` also aligns the Factory's
SDK CLI input to the published typed-contract revision
`b0b8d868cf91c50706b8bfe7edc8c1eec937d7ea`, replacing its stale `a1d9d65` pin.
The Factory remains deterministic with no OpenCode or model credentials. The
Dockerfile SHA-256 is
`3b1a6e0e18c7c149824bf423f50b241423a6bc135ce12f1d4ea0388f8c91c127`.

The privately staged actual Bioma Hub configuration preserves existing service
bindings, `reference-work` memberships and the upstream `/oauth/callback` URI.
It adds the `computer` profile, public `computer-browser` client with
`/computer/callback`, the `/mcp/computer` resource and native Computer controls.
The matching built `9da92b3` runtime validates both the base and merged config;
the merged result reports two profiles. Its SHA-256 is
`347280f0ee2bbaabbf6d267ed2c094cc25e6f58192a89d729a4bc57ccbe8de67`, retained at
Linux `/tmp/computers-entra-preparation-20261019/hub-computer-merged.json`.
An initial validation with the older live image rejects the new catalog section;
that image does not implement Computers. Nothing has selected the staged config
or new runtime yet.

Review of first native publication finds a separate authorization omission:
RepositoryCreate carries its target ID in the body and bypasses partition-metadata
admission. A valid issuer login alone can reach creation in the current native
path. The coordinator approves a narrow creation-admission method on the existing
RepositoryAuthorizer, using the requested body ID before hooks, stores, existing
metadata lookup or forwarding. Token-grant modes reuse their current exact grants;
native external ReBAC creation must retain its existing new-resource authorization
flow. Matching new image builds wait for this correction and focused regression
results. The earlier 156-test receipt does not qualify this newly discovered path.

Native Entra Lore registration payloads are prepared separately for review. The
public CLI may request the one Lore API delegated scope as the signed-in user;
API app-role assignment is not a separate login gate. Only exact repository role
assignments grant source access. The bounded two-user scenario gives both existing
qualified users `Lore.Time.Member` for canonical repository
`280a718d5d3574271274bba5c8db344b`. Only the ordinary member receives
`Lore.Acceptance.Member` for synthetic repository
`019a0119a7007d5aa201754caee43a11`; Hub administrator status must not admit that
repository. Neither role grants privileged actions or service-account bypass.
These payloads, native create semantics and real token issuance still require
execution evidence; staging is not a login, publication or permission proof.


Native branch semantics are also inspected before acceptance: repository members
may change protection through BranchProtect/BranchUnprotect or modern branch
metadata. A protected push is refused while that state is set; this is not a
per-human branch ACL that prevents the same member from unprotecting it. Preserve
these native semantics. Cross-repository/no-role denial is the isolation gate;
conditional protected-push refusal is reported separately, without a human
service-account bypass or broader branch authorization change.


### User correction: preserve Lore security behavior — 2026-10-19

The user explicitly rejects changing Lore's security model or adding rules on top
of it. This supersedes the coordinator's direct-role and body-ID creation-admission
approvals above. Stop that authorization work. Remove the task-owned uncommitted
creation patch and revert custom Lore commit `b322659`, preserving the explicitly
requested native refresh fix at `821da217`, upstream authentication and the other
agent's storage implementation. Withdraw the custom installation role-mode recipes
and Graph payloads; do not substitute global grants, another signer, an additional
authorization service or further branch rules.

The finite Lore Graph script had already stopped on its first mutation, API
application creation, with `Authorization_RequestDenied` at 15:30:22 UTC, request
ID `55496760-00b1-49d0-85f1-5a69682cce93`. Its response file is empty and no later
mutation ran. There is no successful creation response for a Lore API/CLI, service
principal, recipient policy, consent or role assignment. The builder issues no
further Lore Graph calls and has no Lore test or build running. This is not a new
user permission request; the rejected authorization design is withdrawn regardless
of that Graph failure.

The Computer goal remains: OpenCode web at `/computer`, native Lore CLI and private
connectivity, each user's Hub connection, persistence, and independent deterministic
factories. Computer/OpenShell management credential custody and prepared Hub
configuration remain valid work. No Lore security-model modification is a Computer
completion gate. Source cleanup and its exact resulting identities follow below.


Cleanup verifies the complete Lore source tree, not only selected files. Local
revert commit `7ce28b6c576252c3fe743ceb5dfe43f6df92fb9f` is clean; its tree ID
`c668e85c6f790f25c867de95d4ca3a9eab1f5628` exactly equals native refresh baseline
`821da21710a9085797dc8a9d98955c1f3af1c389`. `git diff 821da217 HEAD` is empty.
The uncommitted creation-admission patch and its new test are removed after
matching the task-owned manifest. No custom authorization change remains in the
Lore tree, and no such change reached the running installation. Upstream, storage
and the explicitly requested native refresh fix remain intact.

Installation withdrawal is committed as
`caf5d046f86c12c9f411684c5c257a786f485272`, with a clean worktree. The custom
Entra role guide and TOML are removed; the Computer README again selects the full
native refresh baseline. Public-CA contexts, the SDK pin and deterministic factory
changes remain. Task-owned unexecuted custom auth payloads and recipes are
withdrawn; read-only discovery/evidence is retained. No replacement security model
is introduced.

### Hub-issued native Lore — accepted goal extension

Accepted and implementation resumed by the user on 2026-10-19. This is required
scope within the current hosted Computer goal, not a separate optional project.
The goal remains a private persistent Computer at `https://veoveo.bioma.ai/computer`
for each user, serving OpenCode web with native Lore CLI, per-user Hub access and
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. Extend it with Hub-owned repository assignments
and Hub-issued native Lore credentials. Entra only authenticates the person into
Hub. Keep private scratch, native OpenShell lifecycle, deterministic factories
without OpenCode/model credentials, existing reference services and the final
bounded acceptance requirements. Do not change native Lore authorization/client
protocol behavior; retain the independently requested refresh fix.

The user explicitly accepts the new Hub responsibility after the source review.
Earlier instructions retiring Hub's old Lore issuer or requiring direct-IdP
issuance are superseded for this goal. Do not restore that implementation or the
withdrawn direct-role/creation-admission patches. The architecture is
[Hub-issued native Lore credentials](LORE_OPENSHELL_INTEGRATION.md#hub-issued-native-lore-credentials).

**Measured starting state:** Hub `9da92b3` already signs Ed25519 application tokens,
publishes JWKS, brokers Entra login and maintains refresh families. Interactive
grants and persisted bindings currently require an MCP profile. Its RFC 8693 path
is authenticated registered-server delegation, not native Lore public exchange.
It has no device-code grant. Native Lore `7ce28b6` remains clean and tree-identical
to refresh baseline `821da217`; its device/exchange/refresh requests, EdDSA keys,
native identity strings and ordinary HTTP proxy/CA support fit the proposed issuer.
These are source findings, not new deployed acceptance.

**Ownership and execution:** GPT-6 Astra coordinator owns architecture, canonical
plans/diagram, review and evidence; the existing GPT-6.1 Sol coder owns source;
the existing GPT-6 Luna builder owns compiling, checks and coordinated deployment.
Reuse `.worktrees/computers-hub`, `computers-installation` and `computers-docs`.
No implementation occurs in the main checkouts. Keep Lore unchanged. Serialize
coding and validation of the same tree; preserve other agents' documentation and
installation work. No OpenCode/model calls during iteration.

- [x] **HLI1 — Resource-based issuer foundation.** Generalize hosted OAuth resource
  resolution, authorization requests/codes, refresh families, revocation and audit
  targets from mandatory MCP profile to a registered protected resource. Reuse
  typed catalog admission and existing signer/session/publication mechanisms.
  MCP remains a consumer; do not introduce a fake MCP profile for native Lore.
  Scope standard token claims to the common signer and accept only authorized
  typed issuance results. Existing server delegation keeps its own authenticated
  contract. First source slice is implemented and reviewed; focused compilation
  found three repairable Rust error groups before tests. Those source fixes are in
  the integrated slice below; focused compilation and behavioral verification now
  pass. Hub `adb4aa37` passes both full platform gates. This completes the source
  foundation; native client/deployed qualification remains HLI6–HLI7.
- [x] **HLI2 — Typed native contribution and assignments.** Bind the Lore-specific
  contribution at the executable composition boundary, outside the generic Hub
  OAuth library. A binary-only `contributions/lore` module is the minimal accepted
  boundary: it avoids a dependency cycle and unnecessary relocation of binary
  fixtures while shipping one process. Generic handlers dispatch registered typed
  behavior; they do not branch on a Lore name. Native integration fixtures may
  name Lore; generic Hub fixtures remain generic. Define deployment/audience/
  recipient, native repository ID, tenant and explicit principal/action grants.
  Publish typed assignments in the existing revisioned control plane with atomic
  audit; use existing administrative authority. No implicit administrator or
  Work Context grants, free-form JWT templates or duplicate permissions store.
  Source admission, signed-claim and live-publication fixtures pass in both full
  platform gates; actual native user grants remain deployed acceptance work.
- [ ] **HLI3 — Native user login.** Add RFC 8628 device authorization, browser
  verification through the existing Entra broker, durable expiring device state,
  standard polling/error semantics, one-time redemption and refresh-family
  issuance. Advertise actual device/token/JWKS endpoints through discovery. The
  public client's registration selects the Lore resource because native device
  requests contain only client ID and scopes. Use access JWTs, not ID tokens as
  credentials. Keep the native CLI and its persistent token store unchanged.
- [ ] **HLI4 — Repository exchange and renewal.** Add the native public-client
  RFC 8693 exchange, separate from server delegation. Resolve the exact requested
  repository and current assignments. Issue native `resources` entries with a
  dedicated audience, stable identity and signed recipient binding. Login and
  repository tokens have distinct issuance authority; a repository token cannot
  mint unrelated grants. Reuse rotating refresh families and current admission.
  Grant removal blocks new issuance; report the native expiry/caching boundary
  for tokens already issued. Empty native permissions are not read-only.
- [ ] **HLI5 — Factory service credentials.** Add generic hosted support for
  explicitly registered `client_secret_post` clients to match native OpenShell's
  existing client-credentials renewal. Reuse typed resource issuance and exact
  repository assignments with distinct factory service identities. Preserve
  native secret custody/injection. Factories contain no OpenCode, human refresh
  token, model provider or custom token helper.
- [ ] **HLI6 — Installation and actual Linux integration.** Configure Lore's
  existing issuer/audience/native-claim/public-client/exchange-template settings
  to trust Hub. Configure the Computer's native REST OAuth paths under the Hub
  origin, disjoint from managed MCP paths, with existing proxy and CA support;
  private Lore gRPC remains direct. Register known repository IDs and explicit
  user/factory grants through Hub. Native creation does not automatically persist
  creator grants, and native listing does not become grant-filtered. Coordinate
  the final gateway/Hub cutover and required fresh native credentials; staged
  files/images are not selected runtime. No parallel shared deployment.
- [ ] **HLI7 — Qualification and completion.** Compile and run focused contract,
  database, protocol and consumer regressions, then both required component gates.
  Use the real unchanged Lore CLI against the integrated issuer, followed by
  actual Linux two-user browser/session and repository access, token exchange,
  refresh beyond expiry, grant withdrawal at the native expiry boundary and
  persistence. Prove deterministic factory credentials/build independently of
  Computers. Only after deterministic/deployed gates pass, run final Computer
  MiMo acceptance at eight steps/240 seconds with the retained real Artifact and
  a Time Task, no new generation. Record exact inputs, identities, hashes, timings,
  errors and source/deployed/model boundaries. Update this checklist and all
  three existing diagram views; merge/cleanup remain subsequent reviewed work.

**Live data requirement, clarified by the user on 2026-10-19:** repositories,
deployments, clients, scope templates, lifetime policy and explicit grants are typed
control-plane data. Only Lore's native protocol/claim/action types are compiled.
Reuse the authenticated live control-plane publication API and catalog replacement;
do not register individual repositories in Rust or require a restart to edit
assignments. Every issuance reads the request's current admitted section. Change
generic startup so an existing active database revision is loaded, rather than
overwritten by the seed file; seed only an empty installation. An explicit trusted
operator import handles deliberate full installation replacement. Include the
revision publication audit in the existing transaction, including revisions that
only change contributed records. Prove a live assignment change affects the next
exchange and survives an ordinary restart. Already-issued JWT expiry and
in-flight snapshot semantics remain native. Review found that existing control-plane
publication updated only the receiving process; registration notifications alone
did not refresh other replicas' assignments. Extend the existing native database
notification/reconciliation path to active control revisions. Each replica admits
and adopts the current revision under the same lock as its local administrative
publication, and reconciles after reconnect. Prove this independently of a local
swap. This is asynchronous convergence, not simultaneous adoption or immediate
revocation of existing native tokens. The source is included in the integrated freeze
below; qualification remains pending.

**Integrated source freeze, 2026-10-19:** GPT-6.1 Sol froze the Hub worktree on base
`9da92b3`, with 89 changed/new/deleted source paths and no dependency or lockfile
changes. Manifest `/tmp/computers-hub-native-issuer-source.json` has source
fingerprint `a8ad43230d46aaa7eac45a649994a404cb089db366eeb75e2721d0d1fc05ee58`;
SQLx metadata is excluded and owned by GPT-6 Luna's validation pass. The source
includes the resource issuer, typed native contribution, device flow, public
repository exchange, factory secret-post authentication, DB-authoritative startup,
atomic publication audit, ordered local adoption and native notification/reconcile
watcher. Owner request denial is distinct from signer/infrastructure failure, so
withdrawn factory assignments are not reported as broken signing keys. Formatting
and diff checks passed; this is not a compilation or deployed acceptance result.

Written regressions exercise the hosted HTTP issuer with synthetic fixture identity
approval, independently verified JWTs, login/resource separation, refresh, current
user/factory grants, concurrent publication and restart with an old seed file.
A separate two-handle fixture observes native control-revision notifications and
reconciliation. These fixtures have not yet passed and do not establish real Entra,
native Lore CLI/server, two-process propagation or Linux Computer acceptance.
Builder validation owns the frozen Hub tree; installation configuration changes
proceed separately in `computers-installation`. The live deployment is unchanged.

**Integrated compilation update:** the first prepare attempt stopped after about
38 seconds because a device-denial query with `RETURNING id` was consumed with
`execute`; the source now uses `fetch_optional`. The next attempt stopped after
about 36 seconds because the current SHA-256 output type does not implement
`LowerHex`, in the device handler and its synthetic fixture; both now use the
existing hex encoder. Both failures occurred before behavioral tests. Evidence:
`/tmp/computers-hub-native-issuer-validation-20261019/attempt.json`.

Re-frozen source fingerprint
`2a6fe7f2eb499346806b275f12e365f2cd2722a2e6668ceebfb5c6bdd77cd429`
passes full SQLx preparation against disposable PostgreSQL 18.6 with pinned Core
and Hub 0001–0005 migrations. Fresh-target dependency-inclusive compilation
produced 188 query metadata files: 17 added and seven removed from the 178-file
baseline. `SQLX_OFFLINE=true cargo check --locked --workspace --all-targets
--all-features` also passes, in 0.54 seconds using that prepared target. Focused
behavioral tests and strict clippy are still running; no deployed claim follows.

Installation review found an active legacy helper, `identity/configure-lore`, that
hardcodes fixture repository/issuer data and provisions repository claims at the
IdP. HLI6 retires that helper and its superseded tests and updates active runbooks
to typed Hub publication. This is the requested hard cut in grant ownership,
not an additional Lore authorization layer. Storage/TLS bootstrap and native
factory integration stay under their existing responsibilities.

**Focused gate completion and local commit:** Hub
`c93a1c10e1b41bc84416631565ad41a39d481842` is committed and clean in the isolated
worktree, with no push, merge or live selection. Its source matches reviewed
fingerprint `e36cd6a12d79079b70f9de98dc252dbcb2f222f7276d33a12dbf26c9a878c79b`;
all 188 regenerated SQLx entries are committed. GPT-6 Luna's focused gate is green:

| Check | Measured result |
|---|---|
| Typed token profiles | 3 passed |
| Device polling after boxed approval payload | 1 passed; 0.78 seconds runtime |
| Native claims/templates, initiating-browser binding, database notifications/reconciliation | 4 passed, one per focused selection |
| Hosted native issuer HTTP/JWT/refresh/live-grant/restart fixture | 1 passed; 14.78 seconds runtime on final representation |
| Computer library regressions | 9 passed; 1.17 seconds runtime |
| Hub state, refresh families, control store and control-plane fixtures | 9 passed; approximately 2.94 seconds combined runtime |
| `cargo clippy --locked --workspace --all-targets --all-features -- -D warnings` | Passed; 2.27 seconds |

These selections span the recorded non-SQL source fixes; unaffected passing tests
were not rerun for unrelated fixture/lint edits. Final strict clippy compiles all
targets/features, and both consumers of the changed device result were rerun.
The Mac-host Linux ARM64 full `check` target subsequently failed in two existing
control-plane tests: 223 passed, two failed and one skipped. Both failing assertions
require private-key JWT for all hosted client-credentials registrations, while HLI5
adds explicit `client_secret_post` registrations. Source review must distinguish
stale expectations from any unintended broadening of admission before updating
these tests. The actual Ubuntu x86_64 gate was interrupted before nextest after
the same-source failure; its task-owned build processes were verified stopped.
There is no Linux gate result or completed check-target image for this revision.
Follow-up Hub commit `adb4aa37d656e8da6f7e6a54a5814db1ed2c8a20` corrects those
stale expectations and one actual admission/runtime inconsistency: hosted
secret-post authentication resolves `OAuthClientSecret`, so its admitted secret
reference must have that purpose. External issuer metadata retains its existing
contract. Mixed methods and missing private-key JWKS remain rejected. Formatting
and diff checks pass; focused tests and both full gates are assigned to the builder
on this new frozen revision. There are no SQL, query-cache or dependency changes.
The builder subsequently reports 40/40 control-plane tests passing in 9.26 seconds
and strict workspace/all-targets/all-features Clippy passing in 4.26 seconds.
Both full Docker `check` gates are running against this exact revision. Linux uses
an isolated source archive with SHA-256
`a0331eb67ccd45484e342f03d4c74660c2ab791fe8c31a4258387b524eeea0e1`.

**Full component gates complete on `adb4aa37`:** GPT-6 Luna ran the canonical
`docker build --target check .` on the Mac's Linux ARM64 Docker host and the actual
Ubuntu Linux x86_64 host. Both commands exited zero, each with 226 tests passed
and one skipped. Nextest took 33.613 seconds on ARM64 and 34.536 seconds on x86_64;
these are test-run durations, not complete build timings. The respective immutable
check images are
`sha256:5525941cdc83303d6883b343f1d23a8cda9537bf33f61174fa9a719dc8c39d15`
and `sha256:fd7e352697db4ae72d1339bdc17b395b696aeb5c673a5658102b6519f7f01324`.
Logs are retained under `/tmp/computers-hub-native-issuer-validation-20261019/`
as `mac-adb4-full-check.log` and `linux-adb4-full-check.log`. The matching Linux
runtime subsequently builds from that same isolated source export as
`sha256:9e1255939bec4473a38a3a4daa98d0e2cb7b7e710d253bd42d4933bf70426e1b`
(`linux/amd64`, `component` user). Release compilation takes 2m04s; a networkless,
read-only `--help` smoke exits zero. No new image, catalog or gateway has been
selected by the live installation.
The native issuer fixture approves a synthetic identity
through trusted fixture storage and uses no real Lore server or Entra session.
It proves live withdrawal of user/factory assignments, concurrent publication order
and persistence across restart with a stale seed. The notification fixture uses
two in-process catalog handles and a real database listener; it is not a deployed
two-process propagation receipt.

Additional failures resolved during this gate: native fixture resource names were
corrected to Core's lowercase identifier contract; common direct-invocation
admission now recognizes device authorization as well as authorization-code login;
the test administrator was given an explicit fixture-only admin read/write rule
after the intended policy denial. Production policy was not bypassed. Clippy's
oversized `DevicePoll::Approved` payload became `Approved(Box<DeviceApproval>)`,
preserving typed fields and exhaustive matching with one allocation on approval.
A needless borrow and nested conditional were corrected without lint suppression.
The complete sanitized attempt history and current verdict remain in
`/tmp/computers-hub-native-issuer-validation-20261019/attempt.json`.

Installation HLI6 is separately frozen on `caf5d04` in 17 source paths, fingerprint
`627b40ba837621cb862d948be21d20328fe3f6122714e79d0a78a290a6c427b3` at
`/tmp/computers-installation-hli6-source.json`. Source review confirms matching
native issuer/audience/client/template settings, exact disjoint OAuth REST paths,
Hub-owned factory grants and retirement of the old IdP provisioning helper. The
native factory hook already accepts the canonical Hub identity string; its old
UUID-only restriction belonged to the retired helper. No Lore source, image pin or
copied Computer image input changed. Syntax/consistency checks pass. Native
OpenShell policy parsing and endpoint-ambiguity admission now pass, with zero
ambiguities; native profile-set validation accepts the Computer Hub/model profiles.
Native Lore `Settings::load` accepts the server template with its OIDC fragment,
and `select_repository_authorizer` selects `ResourceGrants` with no `auth_url`.
The final temporary harness run took 128.74 seconds including compilation. Two
earlier harness setup attempts failed because the standalone manifest lacked
Lore's native vendor patches and compiler cfgs; the harness now uses the source's
existing settings. No installation or Lore source changed to accommodate it.
Receipt: `/tmp/computers-installation-hli6-validation/receipt.json`. This is native
configuration admission only: no server, identity exchange or backend was contacted.
The matching Hub CLI also admits the complete synthetic example (`ok: 4
profile(s)`). The unchanged 17-path installation source is committed at
`cccccc40983255cf9217ef38836401ea34e82c8c`, with the same recorded fingerprint and
a clean worktree. The actual private Linux catalog also passes the matching CLI
(`ok: 2 profile(s)`), after an SSH copy to mode-0600 local input verified against
SHA-256 `0a05bd216d1cd0d813158257b41e4c12c3e0a30a5fd14c123134a06bb4935bcf`.
The corrected actual Computer policy passes native parsing/ambiguity admission as
well. Both Hub platform gates subsequently pass as recorded above. This validates configuration;
it does not import a catalog or select a live runtime.

At 2026-10-19 17:25:15 UTC, a read-only public curl baseline with normal TLS
verification reports `/readyz` 200, OAuth discovery 200 and `/computer` 404.
The Linux inventory still selects the previous Hub image `6fd5cdb9761b`; no shared
cutover occurred. Receipt: `/tmp/computers-public-baseline-20261019.json`.
An earlier Linux Python urllib probe returned 403, while default curl from both
hosts returned discovery 200; the client-dependent rejection's cause is not
established. It does not substitute for the pending native Lore client check.

Actual issuer configuration is privately staged under
`/tmp/computers-hli6-cutover-20261019` on Linux, with directory mode 0700 and files
0600. Repository and assignment arrays remain empty until native repository
availability is proved. The unchanged native Create path connects with no selected
repository, creates it, saves local metadata and emits the canonical repository ID
(`lore-revision/src/repository/create.rs`). After native login and server readiness,
use that emitted ID for explicit live Hub registration/assignments before testing
repository reads/writes. No automatic creator grant or additional Lore rule is
required. Dedicated backend credentials, deployment and native factory custody
remain integration work. Private inspection of the current live Artifact
configuration confirms both storage and signing endpoints use HTTPS authority
`veoveo-objects.bioma.ai:443`. The staged Computer policy was corrected from port
9000 to 443; its SHA-256 is
`26afb3c9a5d06e63e5318521b784e7242e888f4ae8d7fa3b1d47349ed60f7f1d`.
Lore's separate private S3 TLS mapping remains on port 9000. Host DNS resolves
the public Artifact authority globally; no actual Computer exists yet, so its
native DNS and byte-transfer behavior remain unmeasured. No signed URL was
printed and no object download occurred during this configuration review.

**Pre-cutover trust correction:** inspecting the exact retained Lore input
`sha256:902afddd87de1dad21228bb02af2c11af15a208b57348621dadc3ae5a3bcf305`
finds the native CLI/server but only the generic local-installation CA, fingerprint
`37:07:83:D2:4D:E0:F6:F8:CA:D3:05:1E:86:89:23:9B:99:98:D4:19:A8:D1:C5:04:30:BB:B4:A4:35:D8:0A:7E`.
The final `caf5` receipt really names this image; this is not merely a stale tag.
Its prior version/startup receipt did not inspect the required Linux trust roots.
CLI SHA-256 is `19afa922a9bcdbf5cbb27ade9e0dfc3a0dfe2ccc1c43223d4fa0e9739397a49a`;
server SHA-256 is `07227e386ca6ab0949c9bbea3f28975329a73a14bf45825f2726b154c3dca4a2`.
The verified staged public context contains the actual Lore and storage roots
recorded above. Rebuild the unchanged native Lore source with the existing
Dockerfile and that context; inspect the retained Factory and Computer images
separately before deciding whether they need rebuilding. No Lore authorization
change, TLS bypass or runtime certificate fallback is authorized by this finding.
Sanitized evidence:
`/tmp/computers-hub-native-issuer-validation-20261019/lore-image-inspection.json`,
SHA-256 `dcbcdedd51d99e9ea385bbfd67311d90bd09779d5a201d1df0188bad3d03ef04`.
Cutover remains held while the correct immutable artifacts are established.

The corrected Lore runtime now builds as
`sha256:d8ca55bb7653469fd8cbf754d2509e03c272240956677284bf3878dfa64f5366`
on Linux x86_64 from installation `cccccc40`, native source tree
`c668e85c6f790f25c867de95d4ca3a9eab1f5628` (identical to reviewed `821da217`),
and the verified public CA context. Docker reuses the source-build layers and
adds the two intended CA files through the normal trust-store update. CLI/server
hashes and versions remain unchanged. Networkless inspection finds both exact
Linux roots, each verified against the installed system trust bundle. Build log:
`/tmp/computers-lore-final-821-linux-20261019/lore-build.log`.

Separate networkless inspection confirms the retained Factory `aae9b06e…dd6193e`
and Computer `c668229a…d3d1d96` already contain both verified roots; neither needs
a trust rebuild. The Computer contains OpenCode SHA-256
`79f58e2eaefa35cd30dd3cb73c7eca83ff2f45a67b0b41684cde1e4cbe74ddc3`, selects
`deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` and points MCP at
`https://veoveo.bioma.ai/mcp/computer`. The existing native Lore CLI hash matches
the inspected server image. These are immutable-image/configuration observations,
not authenticated network or model receipts.

The coordinator releases trusted preparation of only the dedicated Lore database
login/schema, bucket/IAM identity, private native configuration/credentials and
new absent Lore volume, following the existing installation recipe. The staged
Lore-only Compose override is being updated to the corrected image and explicit
`HOME=/data`, with UID/GID 1000 matching the existing TLS key ownership. Ordinary
volume preparation provides the same identity a private writable home; no TLS key
permission is relaxed. Lore start remains held until its selected inputs are
verified; the shared gateway/Hub switch and paid qualification have not occurred.

The corrected private Lore-only Compose overlay is frozen at SHA-256
`1b358152a8fbcf0dac2d667b62d618f9f81221bc8dc004470029d5b867338e97`.
Its only changes from the reviewed overlay are the corrected immutable Lore image
and `HOME=/data`; UID/GID 1000, private network placement, TLS binds and storage
inputs are retained. Trusted preparation creates database login `server_lore` and
its own `lore` schema in the existing database. Readback confirms no superuser,
CREATEDB, CREATEROLE or BYPASSRLS authority, no role memberships, no database CREATE
and no CREATE on `public`; the role owns and can use its own schema. SeaweedFS's
`lore` bucket and dedicated `lore-vv-lore` policy are also created. The IAM user,
credential file and new Lore volume remain incomplete at this checkpoint.

During preparation, a builder diagnostic printed the existing SeaweedFS admin
password from container arguments. This violated the secret-handling instructions.
The coordinator stopped preparation and released a native rotation of only
`VEOVEO_SEAWEEDFS_ADMIN_PASSWORD`; private comparison confirmed it was distinct
from both S3 bootstrap credential values. An initial preservation-check harness
failed with `IsADirectoryError` after updating the mode-0600 environment file and
before restart. The corrected continuation reused that newly generated value.
Only `vv-seaweedfs` was then recreated, retaining image
`sha256:7b5ca1f11aa4c91593612d2d4a9e253ec9152a4bd13a19e551290a042a4c52f5`,
its existing data volume and read-only TLS bind; all other installation container
IDs were unchanged. Native admin login with the new value returns 303 to `/admin`
and sets a session cookie. The old value was not retained or independently tested,
so this is not an independent old-password rejection receipt. The S3 TLS listener
responds with 403. Authenticated controls then pass: bootstrap ListBuckets returns
200 with `artifacts,lore`; Artifact's own bucket listing returns 200 and listing
Lore's bucket returns 403. A unique 45-byte probe is uploaded/downloaded/deleted
with 200/200/204, exact size/hash agreement and a subsequent 404. The first probe
attempt wrote literal `false` because of a local curl-config serialization error;
it was deleted and the corrected attempt read a binary fixture file directly.
No existing application object was touched. Existing IAM users/policies are
unchanged. No S3 key was rotated, no data volume was removed and no unrelated
application was restarted.

After those storage controls and dedicated Lore input/ownership checks pass, the
coordinator releases only private Lore start using the frozen overlay and
`--no-deps --no-build --pull never`. Native server/backend/TLS evidence must precede
the separately reviewed gateway/Hub switch. Source gates remain green; no new
native user login, Computer provisioning or paid qualification is claimed here.

**Private Lore starts on Linux:** GPT-6 Luna finishes the dedicated native storage
inputs and starts only `vv-lore` with the frozen overlay, exit zero. Lore selects
the reviewed immutable `d8ca55bb…` image and listens at `10.231.10.10:41337`.
The endpoint's hostname/SAN and installation Lore CA verify; an HTTP/2 request
returns 200 with TLS verification result zero. Startup creates five tables in the
`lore` schema, all owned by `server_lore`; native database authentication and schema
USAGE succeed while database CREATE remains false. The new data volume is owned
by UID/GID 1000 with mode 0700. These are server/TLS/backend startup observations,
not an authenticated native repository-operation receipt.
The first TLS probe verified `vv-lore.internal`. A follow-up connects to the actual
native endpoint's literal IP with `openssl s_client -verify_ip 10.231.10.10
-verify_return_error`, using the installed Lore root; it exits zero with
`Verification: OK` under TLS 1.3. Receipt:
`/tmp/computers-lore-storage-20261019/receipt.json`, SHA-256
`590dc2a48b39d2769d57c9ad1066e3b8417b209367c5f790bb851e4139b647eb`.

The installed Lore S3 identity independently lists its own bucket and reads its
versioning status (200), round-trips a unique 33-byte fixture with SHA-256
`815a3d853f102f105283df8bc8c253649d27cbbba29cb09e7761d919e49bc6db`, deletes
it (204) and observes 404 afterward. Listing `artifacts` and IAM ListUsers both
return 403. Its credential file is mode 0600, owned by UID/GID 1000. Before adding
the installed scoped key, the builder observes an existing `vv-lore` user/key and
preserves it; that differs from the earlier no-user report, and the prior key's
creation provenance has not yet been reconciled. No shared or administrative
credential is used by the Lore service. The gateway/Hub window remains held for
the final native inventory, binary and config-promotion preflight.

At approximately 2026-10-19 18:12 UTC, the coordinator releases the reviewed
gateway-wide maintenance sequence after read-only preflight. The native service
remains the existing user unit/state directory; its eight non-Hub Ready sandboxes
must retain logical identity and recover after the gateway restart. The current
Hub owns no persistent working volume; only its stopped logical sandbox is to be
replaced, preserving `vv-hub-config`, JWKS and application data. The absent
`installation` workspace/Computer template are conditional native creations, and
the already-linted global profiles are imported individually. Trusted config
promotion writes only the three reviewed files as UID/GID 10001, mode 0600; the
matching Hub performs explicit stopped-process control-plane import before its
replacement starts. The native-control provider reports refreshed custody, last
refresh 18:07:58 UTC and expiry 19:07:57 UTC; this status alone does not prove an
authenticated management RPC. Runbook:
`/tmp/computers-hli6-cutover-20261019/COMPUTER_CUTOVER.md`, SHA-256
`a9e94291018afcf7c3c295cdc9ba244b4617809d8dd674f367653818827a0369`.
Release is not a claim that the new gateway, Hub or public Computer is selected.

The builder then stops the existing logical Hub through native lifecycle (exit
zero, under one second) and replaces/restarts the existing gateway service. The
selected gateway binary SHA-256 is
`cba364c003f995ce541e69942fadde2fcf8aaa5cdd83c3d8afefeeb2e800bc46`,
matched byte-for-byte against the immutable reviewed gateway image before stop.
The selected native CLI is
`f1b4e7cf58b460ff666a64b19081a489d49096e42fe2ea23d2da8bec90dc9b24`;
its release source matches `ea9b680` except for the task's lifecycle-test
registration. Both version strings are `0.0.0`, so hashes/source evidence, not
that build metadata, identify these artifacts. Gateway preflight passes and the
existing user service becomes active on the new binary. The actual encryption
key remains in place at `gateway/credentials/key-encryption-key.bin` under the
existing state tree; it is neither copied nor rekeyed.

Five independent QA/provider workloads recover to Ready. Time, Artifact and
Media instead enter `MainProcessRestartBackoff` while Hub remains intentionally
Stopped. Source review identifies a runbook ordering error: all three application
entrypoints register with Hub before opening their MCP listeners, and registration
failure exits the process. Requiring them Ready before starting Hub can therefore
prevent recovery. The coordinator corrects the order: confirm the bounded runtime
error is Hub discovery/registration, complete the new Hub import/start/exposure,
then require application registration/listener/Ready recovery. Preserve the three
logical identities and native retry state; no application reset, policy workaround
or source change is warranted by this dependency. Other failure causes still
require diagnosis. Revised private runbook SHA-256:
`819f17fb65aced0c4c07b0af244729318a066e52456f3f3245cb2af85f45182f`.
The bounded runtime log classification subsequently reports repeated `could not
register` errors with HTTP 502 at the Hub registration endpoint for all three.
Native CLI log requests had returned no lines; the builder used privately
captured Docker logs to classify these errors without exposing credentials.
This establishes the failing startup phase. The builder resumes Hub setup/import/
replacement/exposure; recovery after Hub returns remains the required result.

Native setup then creates the absent `installation` workspace and persistent
Computer template and imports the two linted global profiles. The networkless
trusted helper promotes the exact three files into `vv-hub-config`, preserving
the existing JWKS; matching Hub validation and explicit control-plane import both
exit zero. Only the stopped old Hub is deleted. Its replacement, native ID
`fa2c63d6-731a-4e0e-87bf-3086046e0775`, selects the reviewed image/provider/policy
but exits before readiness: migrations are current, then `connect native upstream
gateway` fails with `connect error: transport error`. The new public exposure has
not yet been restored. This is a distinct failure from application registration
502s and remains under diagnosis.

Source review locates this error before bearer-interceptor installation and RPC
authorization. Both configured gateway endpoints remain
`https://host.openshell.internal:17670`, using the readable injected supervisor
CA. Host-side TLS verifies against the installation gateway CA and negotiates TLS
1.3/HTTP2 with the expected SAN. The different injected sandbox CA is expected for
native interception; it is not justification to replace trust or bypass mediation.
Container-root DNS/hosts observations do not establish the transient main process's
namespace. A bounded process watcher did not capture that child. The coordinator
therefore releases one temporary narrow Rustls/connector diagnostic through the
existing supported `RUST_LOG` setting, with private capture and exact restoration
of the original environment bytes. No role, grant, policy, TLS or source change is
made to compensate for the unresolved transport error.

That single diagnostic retry remains inconclusive: the Hub restart count advances
from 11 to 12 with the same generic error and no lower-level connector/TLS lines.
The builder restores the original environment bytes (SHA-256
`f77545f01378e390aaa57c101f59868fcd2db3e0f7a811e02ac5a3610c5afb61`),
UID/GID 10001 and mode 0600. Read-only inspection cannot establish the actual
workload namespace: host `/proc` access is denied to the SSH user, and the native
supervisor explicitly cannot inspect the workload's mount or PID namespace.
Docker-root resolver observations remain noncanonical. No DNS, TLS, ALPN or
authorization cause has been proved. Further blind retries are held while source
review identifies a supported diagnostic or preserves the SDK's typed transport
error chain. Hub is still unexposed; application registration recovery remains open.

The source review subsequently establishes the distinction: the canonical child
inherits the workload container's mount/network view, but its DNS and connection
syscalls pass through native seccomp-notify mediation. A plain Docker-exec process
does not exercise that broker. Native `policy_dns` resolves
`host.openshell.internal` from the driver's trusted `host_gateway_ip`. Thus the
missing Docker-root hosts alias is not a proved configuration defect. The chosen
source fix retains tonic's original connection error as a typed SDK error source,
so ordinary startup error reporting can reveal its cause without changing routing,
trust, policy or authentication. That diagnostic fix has not yet been built or
deployed.

A subsequent read-only native `logs --source sandbox --since 30m` capture contains
208 OCSF events: 52 resolved gateway-name events, 52 allowed destination events and
13 allowed socket events for `127.0.0.1:17670`. It also contains 13 TLS/handshake
events whose cause is still being inspected. These observations establish that the
native broker resolves and permits this path; they do not establish successful
application TLS. No new live retry or configuration change is made. The SDK's
first regression run stops at its five-second test deadline (19.285 seconds total
command time): a bound, non-listening loopback socket did not produce the assumed
immediate refusal on this host. This is a test-fixture failure, not a new finding
about the deployed connection. The coder is correcting the portable fixture;
production transport behavior remains unchanged.

The corrected fixture sends a real TLS client hello to an owned loopback peer,
which responds with an invalid TLS record. The typed original Rustls cause remains
discoverable through the SDK error chain. That regression passes (one test, 0.33
seconds test time / five seconds command wall time), as do three existing SDK error
unit tests. Strict all-target Clippy subsequently passes in six seconds after one
test-only `manual_let_else` correction. Frozen source fingerprint:
`31ae458b35a20d1632cdc921274429afa4b1799ece812a076551aa5965351807`.
Logs are `/tmp/computers-openshell-transport-errors-a7f6892.log`,
`/tmp/computers-openshell-sdk-error-tests-a7f6892.log` and
`/tmp/computers-openshell-sdk-clippy-31ae458.log`. These are local SDK checks, not a
diagnosis of the deployed failure. The next Hub build will pin the reviewed fork
commit for both SDK and policy; the existing native gateway/runtime remain selected.

The SDK fix is published on the fork's task branch as
`9724fb1834dec157b4482a1da97338fd8ca1e50c`. Hub commit
`b24ccad0c524625de513b0b37bec4a5419d85c49` changes only its two OpenShell
dependency pins and the five corresponding lockfile source identities. No registry
versions or application source change. Compared with the former pinned OpenShell
revision, SDK/Core/protocol sources are unchanged except for this diagnostic fix;
the policy advance incorporates the already-reviewed disjoint REST/MCP route
semantics used by the selected native gateway. Both Hub platform gates pass from
this exact clean commit. The Mac-host Linux ARM64 gate exits zero in 211 seconds,
with 226 tests passed and one skipped (33.059 seconds test time), check image
`sha256:da44c95fcc83d9a744226d46062431bd75e610296b0512f7222971d09df85eb0`.
The actual Ubuntu Linux x86_64 gate exits zero in 263 seconds with the same counts
(34.773 seconds test time), check image
`sha256:fc31d81976fab665964cee08dd97a824c9d3f5e0c0e38f5c9f31fdaf52180383`.
Both include SQLx metadata verification, formatting, strict Clippy, dependency
checks and the feature matrix. Linux source archive SHA-256:
`e8243d92335f93375c9c7477d54c636c81dac276362d2c230eb8615d70591811`.
Gate logs: `/tmp/computers-hub-b24ccad-mac-check.log` and
`/tmp/computers-hub-b24ccad-linux-check.log`. The matching Linux runtime image builds
in 129 seconds as
`sha256:934b1c776ff3ba50f22a5af692c1a2e1c91680b69be8b812b7d4c78ed2a8b8ce`.
Its extracted x86_64 ELF is 63,183,056 bytes, SHA-256
`decdf123c4823fb3c98283c05976fc016a18a547c9f84a0ee7ac429a61880a67`;
networkless `--help` succeeds. `--version` is not a supported command and returns
Clap's usage error. Build log:
`/tmp/computers-hub-b24ccad-linux-runtime.log`. These component/build checks do not
diagnose the deployed transport failure. The coordinator releases the already
reviewed native stop/delete/recreate of only the stateless Hub, retaining its
logical name, exact policy, read-only configuration volume and dedicated provider.
No gateway restart or configuration reimport is required. Capture the first typed
startup cause before exposing the replacement; exposure and application recovery
require readiness. No main merge has occurred.

Native stop/delete completes and Get returns NotFound before recreation. The new
`vv-control/hub` is `89770a5f-c12a-48cf-8dbb-8c2182f9668c`, selecting the
verified `934b1c77` image and retained configuration/provider/policy. Its supervisor
connects and accepts configuration, but the main process again fails after current
schema checks. The complete seven-line anyhow block is:

```text
Error: connect native upstream gateway

Caused by:
    0: connect error: gateway transport failed
    1: transport error
    2: received fatal alert: NoApplicationProtocol
    3: received fatal alert: NoApplicationProtocol
```

The builder's first filtered summary omitted the two decisive cause lines. Review
of the complete contiguous error block establishes TLS ALPN negotiation failure;
the SDK source-preservation change works. The same block appears in eight captured
attempts. This failure precedes bearer authorization/RPC and does not justify
changing grants, trust or Lore behavior. Native protocol selection is under source
review. The new Hub remains Starting and unexposed; Time/Artifact/Media registration
recovery and user acceptance remain open. Private logs are retained on Linux as
`/tmp/computers-hli6-hub-main-private.log` and
`/tmp/computers-hli6-hub-supervisor-private.log` (mode 0600). No further live changes
follow this capture.

Source review identifies the native configuration cause. In OpenShell
`crates/openshell-supervisor-network/src/proxy/relay.rs`, HTTP2 is admitted only when
`PreparedHttpPolicy::Inspect` contains exactly one endpoint configuration. The
new native-control policy creates fourteen separate configurations for the same
gateway host/port, so `l7/tls.rs` advertises only HTTP/1.1. Tonic requests HTTP2,
which produces the measured `NoApplicationProtocol` alert. The former forwarder
had one endpoint. This is a policy-structure error, not a certificate or grant
failure.

The approved correction uses one enforced REST endpoint selecting
`/openshell.v1.OpenShell/**`, with the same fourteen exact POST allow rules and
the same provider binding. The service-root selector selects the endpoint; it is
not an allow rule. Native `l7/http2.rs` evaluates each request against the rules,
so no additional RPC is admitted. Source and private policy staging must preserve
every unrelated route, executable and filesystem setting. Existing native policy
admission, engine construction, a single matching endpoint and exact rule-set
comparison precede the supported policy-only update:
`openshell policy set --workspace vv-control --policy <reviewed-file> --wait --timeout 60 hub`.
No gateway/Hub rebuild, trust change or Lore change is required. Deployment and
application recovery remain pending.

The direct per-request evaluator is internal to OpenShell and cannot be constructed
by the existing external checker. The coordinator declines a new in-crate test
seam merely to repair this configuration. Structural checks and the reviewed
per-stream evaluator remain distinct from executed RPC acceptance; actual required
RPC calls and an unlisted-RPC denial remain deployment acceptance work after
recovery. No new conformance framework is added.

The one-endpoint native-control correction is published as installation
`3f34d462e9c1ae77a0492363c9d5b28c53f6113f`. The existing parser/ambiguity
check passes in 4.91 seconds and confirms the same fourteen ordered POST rules,
provider binding and all unrelated policy fields. The supported policy update
succeeds on Hub `89770a5f-c12a-48cf-8dbb-8c2182f9668c`, revision 2. A fresh
attempt advances past the ALPN failure and stops at a different native policy
validation error at 2026-10-19 19:11:10Z:

```text
Error: canonicalize trusted Computer native policy
Caused by:
    sandbox policy validation failed; network policy 'lore': protocol tcp endpoint '10.231.10.10' must use a DNS hostname, not an IP literal; direct IP connections bypass policy DNS and are blocked
```

The configured file `/etc/veoveo/hub/computer-policy.yaml` exists on the retained
read-only configuration volume, mode 0600 and owner 10001:10001. This is semantic
policy canonicalization, not filesystem access. Earlier staging checks parsed
policy and checked ambiguity but omitted the complete native semantic validator;
that earlier result does not establish full admission. Use the existing
`validate_and_canonicalize_sandbox_policy` in that check, as Hub does, without
introducing a new validation framework.

Read-only host probes find no `vv-lore.internal` mapping or DNS answer. The existing
TLS receipt already verifies that hostname and the private IP; no certificate
change is needed to select the hostname. Source configuration is being corrected
consistently to `grpcs://vv-lore.internal:41337`, retaining exact private-IP policy
constraints. The proposed trusted host resolver record remains subject to checking
the actual supervisor resolver path. No new DNS service, Lore authorization rule,
TLS bypass or repository assignment is introduced. Hub remains Starting and
unexposed, with application registration and real-user acceptance still pending.
Native credential custody reports a successful refresh at 19:05:28Z with expiry
20:05:27Z; this status alone does not prove a control RPC after the preceding
credential expired.

The builder measures the actual supervisor on host networking, with no Docker DNS
override and `/etc/resolv.conf` selecting `127.0.0.53`. The host's existing
systemd-resolved 255.4 is active and listens on that address, with `ReadEtcHosts`
enabled by default. A host-owned `10.231.10.10 vv-lore.internal` record therefore
uses the existing trusted resolver; no workload alias or separate DNS service is
needed. The SSH account's noninteractive sudo check requires authentication, so
the coordinator requests that exact host edit from the user. It remains pending;
no alternate privilege path or unproved resolver fallback is introduced. Source
configuration now selects the hostname consistently; full native validation and
the coordinated runtime data updates remain in progress.

Installation correction `5d31d76b8782fdca7f7acffe663cc3591f367dcc` is now
published on `hosted-computer`, tree
`4e791eceaf4593609d3469829329c7ab0ccb54f4`, with ten frozen source files
matching fingerprint
`ef8f1b52ba4ccfef3f2b3bca36b4dc3a34459f93c6b08b56ba1ee2406b8ec267`.
The existing complete native policy validator passes for all four affected source
policies and the private Computer policy, with zero endpoint ambiguities. The
private candidate differs only at the Lore endpoint host; port 41337 and
`allowed_ips: [10.231.10.10]` are preserved. Its installed SHA-256 is
`025e7c5805b9dcd8aea03b78eea84ca66c93841b0810274fa41036360eeb322a`.
The trusted networkless volume update preserves mode 0600 and owner 10001:10001;
no other volume file changes. No image rebuild is needed for this data correction.

Hub's normal retry starts its main process at 2026-10-19 19:29:15.926Z and reaches
native Ready at the same sandbox identity, restart count 18. The structured
application log reports `listening` on `127.0.0.1:8080` at 19:29:16.032658Z.
Inventory finds nine sandboxes, zero user Computer template references or owner
labels, and exactly one `installation/computer` source template. Native template
creation is not an upsert, so the supported row-only delete/recreate changes only
`environment.VEOVEO_LORE_REMOTE`; fresh readback matches every other spec field,
including image, resources, driver configuration, environment, labels and
annotations. No user sandbox, workspace or working volume is deleted.

The existing `http` exposure is restored on Hub port 8080 with the same bearer
passthrough mode and named Cloudflare target. TLS-verified public probes return
`/readyz` 200 in 0.427 seconds, `/computer` 303 in 0.427 seconds, OAuth discovery
200 in 0.272 seconds and the Computer protected-resource metadata 200 in 0.192
seconds. These establish public HTTP availability and entry-point redirection,
not browser sign-in or a provisioned Computer. Five non-Hub sandboxes are Ready;
Time, Artifact and Media are initially still retrying registration and their normal
recovery remains under observation. No model call occurs.

The Hub catalog and retained rebuild input still need their endpoint-only update.
An unauthenticated `GET /admin/local/control-plane` returns 401 in 0.354 seconds,
as expected; this does not test the existing administrator custody. Native refresh
status and the normal real-Entra application-grant flow are being checked after
the authorized session hard cut. The Computer browser cookie does not authenticate
administrative Bearer routes. No credential is extracted from native custody, no
synthetic approval is used, and existing qualification policies are not broadened
to manufacture an administrative client. The host DNS entry remains pending the
user's privileged edit. Native Lore login and repository acceptance have not run.

Subsequent native inventory confirms all nine existing sandboxes Ready, including
Time, Artifact and Media, with unchanged application identities and no Computer
sandbox. `qa-sdk-initial` attaches the retained `vv-hub-qualification` provider.
The provider-wide refresh status reports both human grants
`reauthorization_required`, recovery `reauthorize`, failure `oauth_invalid_grant`.
The CLI displays last refreshes 18:11:57 and 18:11:58, with expiries 18:16:57 and
18:16:58 on 2026-10-19; it omits the timezone, so these are retained as displayed.
A preceding query using the historical `admin_access_token` selector
returned no configuration; that narrow result was not evidence that the provider
or all custody had disappeared. No credential material is read or exported.

The coordinator attempts the actual public Computer browser flow through Cua.
The browser origin approval gate rejects navigation to
`https://veoveo.bioma.ai`, reporting permission declined. No sign-in, handoff or
Computer provisioning occurs. Browser permission is requested; neither another
browser nor an indirect login path is used to bypass that rejection.

The supported fresh administrator path is the existing OpenCode MCP auth client,
with public client `opencode`, scope `mcp`, resource
`https://veoveo.bioma.ai/mcp/local` and registered loopback redirect
`http://127.0.0.1:3210/callback`. Actual client data confirms
`defaultWorkContext: reference-work`, which Hub selects when that optional request
parameter is absent. The known 376 build supports the exact native callback and
state checks: local Darwin ARM64 executable SHA-256
`2da0a16007cee6c74bd9e8df448c3ee5ef7ee4cda2007cb6619b532773e60365`.
Isolated task-owned configuration, all XDG roots, temporary directory and credential
database are prepared without running authentication or a model. Once browser
permission is granted, native authentication can create a fresh grant in that
isolated store. Independently verify live JWKS, identity, audience, client and
context before private administrative use and native refresh-custody handoff.
This does not extract existing OpenShell custody or add an OAuth implementation.

The final metadata-only receipt is
`/tmp/computers-hli6-policy-validation/metadata-only-final-receipt.json`, mode 0600,
SHA-256 `d3b29e06e7cd372350806509dfa1b52e018bec763659ed81c4c040bb79b76fab`,
recorded at 2026-10-19 19:43:42Z by the GPT-6 Luna builder. It records the existing
native validator's exit zero in 5.5 seconds, log
`/tmp/computers-hli6-policy-validation/native-check-final.log` (SHA-256
`11f17e33df93d7ae9ab9bb5c287db56b4a476a8686e1d1990c4d92c6f07c4af1`),
the template row replacement and all nine native Ready states. Template row
`e2083817-ae5c-497d-86e5-d40bbafb687b` becomes
`7b7b4038-f46c-4905-bf64-0c175d8f8011`; only the Lore environment value changes
in the canonical spec. A final TLS-verified status-only observation, without
following redirects, retains readiness 200 (0.391123 seconds), Computer entry 303
(0.391039), OAuth discovery 200 (0.379308) and Computer protected-resource metadata
200 (0.391463). These are deployed HTTP probes, not browser or model acceptance.

Actual retained QA credential keys are `HUB_ADMIN_REFERENCE` and
`HUB_MEMBER_REFERENCE`. Future native refresh reauthorization must target those
existing keys, not create a key from an obsolete example. Nonsecret native-auth
inputs now exist at `/tmp/computers-hub-admin-auth-20261019` (directory 0700):
`opencode.json` 0600, `launch.sh` 0700 and `README.md` 0600. Configuration SHA-256
is `5f63ff8b649155c1dbf0b52b8a7d29e8cd7a61cd046e1233c35ec8c1ed959fac`;
launcher SHA-256 is
`c2cdddbd02fd4fd2e90467d4e12e78d613f993fec2e30402457aafd623e6c6e2`.
The launcher checks the reviewed native client hash, isolates state and disables
model-list fetching. Static JSON, shell syntax and permission checks pass. It has
not run; browser permission and the host DNS edit are still pending. Updated guide
JSON, JavaScript syntax, three SVGs and unique SVG IDs pass static checks; browser
review and export checks remain unperformed for these guide bytes.

The source-reviewed native acceptance checklist now includes an independent
factory build, beyond repository clone/hash proof. A dependency-free locked Rust
fixture is published at the real emitted repository/revision, then only the
Computer's scratch source changes to a different marker. The separate factory
must clone the published revision, build offline/frozen with its existing
toolchain, and produce the published synthetic marker with retained byte/hash
evidence. Its native provider attachments and absence of OpenCode/model access
are checked separately. Checklist SHA-256
`2586f3d769c87240d9f4ffe0d956d8249fb27361246a392267e3d11619bfc9fa`
at `/tmp/computers-hli6-cutover-20261019/NATIVE_LORE_CHECKLIST.md`; none of these
native user or factory operations has yet run.

At 2026-10-19 21:03 UTC, implementation resumes after the user approves the native
host-service connection fix. The earlier `/etc/hosts` proposal is superseded.
Source review confirms that `host.openshell.internal` uses OpenShell's exact
backend-provided host address without upstream DNS; its authorized raw TCP relay
preserves Lore TLS/gRPC. The selected change publishes the existing Lore container
only on `127.0.0.1:41337`, issues a leaf certificate containing that native hostname
under the existing CA, and aligns Computer/factory policies, template environment
and the Hub deployment endpoint. Remove the stale bridge-IP `allowed_ips` entry;
do not replace it with a loopback range. Issuer, audience, repository grants and
native Lore behavior stay unchanged. The coder owns installation source, the
builder owns Linux rollout/probes, and the coordinator owns review and this record.
Source preparation and read-only live inventory are underway; this entry does not
claim the cutover or successful client connection. Existing browser-origin denial
and fresh human authentication remain separate from this network fix. No model
call or durable-service migration is authorized by this connection step.

The revised installation source is frozen at
`c2030495fe592f8f800e768f96184154315de5b8`, tree
`c69080ff6e901c3af6b123551f742236cfae803d`. The existing native checker passes
in 5.85 seconds with exit zero for four source policies and the new private
Computer candidate; all have zero ambiguities. The private candidate SHA-256 is
`87822ba03aa8b12614013a413eda0dcaa95a46506f8a1cc6a85a2cd5edb60b31`.
Its only semantic changes from the installed policy are the Lore hostname and
removal of its obsolete bridge-IP allowlist. Hub caches that policy at startup,
so the approved rollout includes a native restart of the existing Hub sandbox.

A builder diagnostic exposed Lore's dedicated S3 and PostgreSQL credentials in
tool output. Their replacement and revocation are complete; no other service
credentials or authorization rules changed. Private metadata receipts remain in
`/tmp/computers-lore-credential-remediation-20261019-continuation` on Linux. The
continuation exited zero in 2.05 seconds and confirmed replacement access and
old-credential rejection. This incident is closed; the disposable development
installation does not require further credential work for this assignment.

Computer connection qualification then found two distinct setup errors. The first
two Lore probes omitted `--policy`, so their exit-28 transport errors did not test
the Computer's intended network rule. An explicit task policy retaining the exact
Lore route produced TLS ALPN alert 120: `protocol: tcp` alone still permits native
OpenShell TLS interception, which offered HTTP/1.1. The direct host endpoint passed
TLS 1.3, hostname verification and HTTP/2 with the existing Lore CA. Native
`tls: skip` on the exact Lore rule preserves the intended end-to-end gRPC TLS.
Installation commits `be959d9` and `63bf967` add the standard certificate-directory
environment and this passthrough setting; Lore and OpenShell code are unchanged.

GPT-6 Luna builder ran the unchanged native Lore CLI in Computer image
`sha256:c668229af4a278c6b40b4c0160a4fe8e16636881a9da2f4b21a8808d9d3d1d96`
under that explicit, task-only rule with isolated HOME/XDG and no providers:
`lore -P --json repository list grpcs://host.openshell.internal:41337` completed
native `EnvironmentGet` and returned expected `Not authenticated` (exit 16) in
about 2.0 seconds. The disposable sandbox was deleted. This proves the private
DNS/TCP/TLS/gRPC transport, not a repository listing, user authentication or the
full Computer policy. The corrected private Computer policy and template are now
installed; the same Hub sandbox was restarted to load its cached policy and
returned public readiness HTTP 200 in 0.207 seconds. The source Computer image
also carries the certificate-directory setting for future builds; the current
reviewed image receives it through its template. The sanitized local receipt is
`/tmp/computers-hli6-policy-validation/lore-tls-rollout-receipt.txt`. The live Lore
registry endpoint still needs the normal authenticated administrative update.
Browser-origin permission remains pending after the tool's explicit rejection;
no browser workaround or model call was made.

The same source review found that the existing Artifact byte-transfer rule's
explicit no-interception intent also required `tls: skip`. Commit `837d8a2` adds
that one field to the exact signed-object endpoint. The matching installed policy
is now selected after a final Hub reload; readiness returns HTTP 200 in 0.189
seconds. No Artifact operation or model call was used for this configuration fix;
authenticated Computer byte-transfer acceptance remains pending. Diagram detail
text reflects the transport result; geometry is unchanged and browser review
remains pending with the existing browser permission gate.

The user's manual Linux-browser sign-in at 2026-10-19 22:01 UTC reached the
Computer callback. Hub's OAuth token exchange returned HTTP 200, then the callback
returned 503. The owner row and handoff existed, but no native workspace or browser
session had been created. Native request logs ended at `GetWorkspace` after two
profile reads. Source review identified a concrete native contract violation:
`computer-` plus the 32-character UUID generated a 41-character workspace name,
while OpenShell validates a maximum of 19 before checking existence. The original
callback warning discarded the underlying cause, so the gRPC status itself was
not measured in those logs.

Hub commit `e7af2e6f2066e02d77e6d2da5a6238450faf3641` fixes construction with a
stable 19-character name derived from the full UUID; Hub identity and browser base
path retain that full ID. Existing cloned-template comparison remains before
provider or sandbox adoption. Parent `a7c606c` retains the already-sanitized
top-level callback error in the existing warning. No database, authorization,
Lore, schema or compatibility changes are involved. GPT-6 Luna builder ran the
extended existing owner-mapping regression (1 passed in 1.05 seconds) and Hub
binary compilation (passed in 13.40 seconds); the initial fixture attempt lacked
PostgreSQL 18 on PATH and was rerun with the installed tools. The actual Ubuntu
x86_64 runtime build produced image
`sha256:67d5e4063ade380aa46fde79b2431bf211176eb1f3f2e80496da6d5e80772911`.
The corrected image is now deployed as native Hub sandbox
`759c65ef-df38-42ad-8f08-cd766179d6a4`, with the original configuration volume,
native-control provider and bearer-passthrough public exposure. An initial create
attempt selected the user Computer policy instead of Hub's own policy and was
rejected before creating a workload; the retained authored Hub policy restored
the intended deployment without changing authority. Native and public readiness
return HTTP 200 (public request 0.392 seconds), and `/computer` returns 303 to
normal authorization. A fresh manual browser sign-in is requested; the previously
consumed callback cannot resume setup. No model call has been made during this fix.

The required macOS Docker component gate for that same clean Hub revision also
passes: `docker build --target check .` exits zero in about 3 minutes 30 seconds,
including image export. GPT-6 Luna builder records 226 tests passed, one skipped
and zero failed; the check image is
`sha256:6d4607849923bfcc65e04e70795715da0a30c71d8ec5d1459f672eff332ebabe`.
The matching full Linux gate also passes on the exact source archive
`fee0b2eff070e5e9c1f4ddc0498a8191bc231b70522a0cab810f082387fa1acc`:
compile, Clippy, dependency and feature checks pass, with 226 tests passed, one
skipped and zero failed. Test compilation takes 1 minute 36 seconds and execution
34.418 seconds; total wall time is about 3 minutes. Its check image is
`sha256:de09c8075d3233c55fe3d85bb18ce5f836b9d2261484d9273641a2c97f487e10`.
These are component results on actual Ubuntu x86_64, separate from user acceptance.
A corrected read-only check at
22:28:47 UTC derives the exact native workspace from the Computer UUID and finds
it absent. The original 22:01 owner/handoff row remains not ready, no browser
session exists, and the pending login expired at 22:27:47. Repeating token-endpoint
successes do not establish a new browser callback or successful provisioning.

At 22:30 UTC, the coordinated embedding deployment owner publishes the remaining
Lore endpoint correction together with its required native upstream binding.
Existing trusted-operator access reads the complete authoritative document using
Hub's own `active_revision.sql`; no custody credential or browser session is
extracted. Exact semantic comparison permits only the new
`vv-services/embedding:8803` binding and the `primary` Lore endpoint replacement
with `grpcs://host.openshell.internal:41337`. Both baseline and candidate pass
native validation in the same deployed Hub image (158 and 132 ms). The binding
is startup-fixed, so the owner stops the sole serving Hub, rechecks the unchanged
revision, and uses the existing native `import-control-plane` command. The Lore
endpoint alone supports ordinary live publication; this combined update does not
change the no-restart contract for repository or assignment management.

Import exits zero in 264 ms. New revision
`gcp-01a15649-3db0-70f1-914b-304edf87f66e` has native digest
`sha256:f998a87a24240fd5ef1aa7aed13e4387312b98f6a9fac831d9a44c435087d4f3`;
its complete payload equals the reviewed two-change candidate before and after
restart. The same sandbox, image, effective policy, provider, mount and exposure
are retained. The measured stop-request-to-Ready interval is about 42 seconds
(22:29:45–22:30:27 UTC), not a continuously sampled public-outage duration.
Public readiness returns 200 in 230 ms and native OAuth metadata returns 200 in
193 ms. This is deployment/configuration evidence, not native user authentication
or Computer provisioning. No authorization, session or Lore behavior changes.
The other owner's receipt is
`/tmp/veoveo-embedding-qualification/linux-control-plane-snapshot-20261019/receipt.md`
on Linux, SHA-256
`4ad622d8d04afc1fc4073a067597575afc6f2cb522d9373fdba9c85a6aa83845`.
The prepared native Lore checklist now uses the same hostname and still records
that its user/factory scenarios have not run. Computer browser acceptance resumes
with a fresh manual sign-in; both full Hub component gates now pass as recorded above.
The existing diagram's Hub detail text records the same status, and its embedded
JSON, executable JavaScript and three inline SVG documents pass static checks.
The browser origin approval gate also refuses the local diagram preview; visual
review remains pending, with no alternate browser route used.

The next manual sign-in reaches the user's Computer at 22:53:44 UTC. Native
sandbox `d1b80178-3038-4a87-a02a-3115e90b88d7` is Ready; the owner row is ready,
its refresh family is attached and one browser session exists. This establishes
first-use provisioning and browser admission, but the screenshot shows a blank
OpenCode page. An earlier callback at 22:53:12 returned native `Cancelled`, and
two retries of consumed login state were refused before the successful fresh
callback; this is not a claim of an uninterrupted first-attempt onboarding path.
Hub returns 503 for two startup assets while 59 Computer requests
succeed. Native-origin checks find both files intact: the browser-storage module
is 863 bytes, SHA-256
`63e9ac3b023650386f40370eaca865b56c77279dec5efdc4fbd9fc9b119278b9`;
the project-avatar CSS is 3,313 bytes, SHA-256
`1f1b371c471d676a004862a1b613d81223c13512e953ddcb7f5ccffefcdc7c56`.
Both return the correct MIME type and HTTP 200 locally. HTML has the correct
per-Computer base path and online-only marker, and local API info returns 200.
The user's console later reports 503 for different language/location modules.
No API bootstrap request follows the failed module imports. Existing Hub logs
omit the transport cause, and the available native records do not establish its
exact status; do not present the capacity diagnosis as a measured native error.

Source inspection identifies a concrete capacity mismatch: Hub permits 64
simultaneous forwarding streams, while native OpenShell shares a 20-connection
per-sandbox limit between TCP and SSH and separately caps pending opens at
32 per sandbox and 256 per replica. Each HTTP request opens a native relay and
loopback HTTP/1 connection; the SDK already shares its gateway HTTP/2 channel.
A bounded wait/retry proposal was committed as `bc7adc` but never built or
deployed. The user explicitly rejects artificial delay and directs higher
parallelism. The selected implementation gives native TCP forwarding typed,
configurable active/pending budgets separately from existing SSH limits, with
defaults and explicit reference settings of 128 active connections per sandbox,
1,024 active per replica, 128 pending per sandbox and 512 pending per replica.
Hub's Computer forwarding budget becomes typed configuration with a value of 512.
The normal HTTP path retains immediate connection establishment; the existing
cold-listener readiness wait remains separate. No HTTP request replay, new proxy,
native authorization change or OpenCode HTTP/2 rewrite is selected. Connection
pooling is a later measured optimization, not a prerequisite for this correction.
Only gateway and Hub builds/restarts are expected; existing Computer working
storage, runtime/supervisor images and native Lore behavior remain intact.
The correction is frozen in OpenShell `7c7c9331`, Hub `67654f36` and installation
`3df6b8fe`. Coordinator review confirms configuration reaches both active and
pending native TCP budgets and that the guard releases active slots on drop.
Hub's focused configuration and retry-classification tests pass, as does binary
compilation. The new Mac ARM64 full gate passes 226 tests with one skipped;
its check image is
`sha256:d79cd57930d0a15ab545a837023435578dc27e4e21e988a597b46184a1ae7ec4`.
The actual Linux x86_64 runtime builds as
`sha256:d92dd1b889425cc11e313ba60657a295451e35a3c532606408327e002dcb2da6`,
with binary SHA-256
`73574d4c25f4fb82c62da82c04df872050794bcdcada4ee76fc573640a19c769`.
Its actual Linux x86_64 full gate also passes 226 tests with one skipped (34.211 s
test phase), check image
`sha256:117358075bb3b0ddbba4d83d929ee0d369f559fe8a4da2d07ef873a5178936e6`.
Both Hub gates use the clean source archive SHA-256
`87e7b6e2a07371bae557953e21145e694da332738ce07be1431e455bbc4a0beb`.
Native gateway focused TCP tests and strict Mac Clippy pass on `7c7c9331`.
The first Linux build fails because Debian bookworm cannot satisfy the vendored
Z3 C++ requirements; the prebuilt-Z3 retry reaches final link but fails on the
older system ABI. A task-owned Debian trixie builder with pinned Rust 1.95.0 and
the supported `prebuilt-z3` feature succeeds. The source archive is SHA-256
`faef023077c8aca005d9171cde2574469cbc2020122f6dcbafcbd98a81cb9787`;
the gateway binary is
`828bddb37d82df8abbb8fc84a3d0cd4f073ea5b15f8b539466daba31b64f3f4a`.
It executes on the actual Ubuntu host and all dynamic libraries resolve.
These are build and host compatibility results. The subsequent Linux cutover
installs that gateway binary and the validated limit configuration, retaining the
existing native state and credential custody. The first one-off Hub import uses
the wrong trusted Docker network and fails DNS resolution before publishing.
The stopped helper is retried using the retained operator invocation (host
network and the existing `host.openshell.internal` loopback mapping); import
then succeeds after the unchanged active-revision guard. New active revision is
`gcp-01a156a8-2ca3-7bd0-a176-ba18fbe029ba`. Only
`computers.forwardingConnectionLimit=512` changes in the full catalog; the
embedding binding and Lore endpoint remain present. The recreated Hub is native
sandbox `02062d6c-89e2-42e7-9b7a-5f315d38f728` on the tested `d92dd1b8` image,
with its original logical name, provider, policy, mounted configuration and
bearer-passthrough exposure. It reaches Ready and public `/readyz` returns 200;
`/computer` returns 303 without following the redirect.

Time, Artifact and Media temporarily report Starting with exit code 1 during
native recovery. Docker wrapper presence and a Ready condition entry are not
treated as application readiness. They subsequently reach Ready with new main
instances and cleared exit codes after native backoff. Their observed restart
count is cumulative; no exact startup error is captured, so the underlying
application exit cause remains unestablished. Their images and policies do not
change. Other preexisting workload identities remain intact.
The builder writes a new private 79-byte sentinel
inside the actual user's `/sandbox` working volume before restart, SHA-256
`84beae344237d1888660f83c9aac385946ca2e3a830178b3d32302ef36251e96`.
After restart, the same Computer ID and
`openshell-workspace-64ae873d6b411d1ebee7d8bf72fab97e` working volume retain that
exact sentinel hash. Computer restart count remains zero while its main-process
instance changes. The native Computer endpoint returns 200 for `/` and
`/api/info`, and all 57 referenced entry-page assets return 200 (49 JavaScript,
8 CSS). A bounded 24-connection native-forward fetch returns 24 successful,
identical 79,727-byte language modules in five seconds. These probes use no
browser cookie and do not establish public authenticated browser rendering.
The user later shares a screenshot from the actual Linux Chrome session at the
same Computer path. It visibly shows the OpenCode home screen and its empty
session state, proving that the page renders in the user's browser. It does not
show a created session, model response, or Hub tool call. The screenshot was
shared before the candidate HTTP/2 supervisor fix was deployed; do not attribute
the recovery to that fix. The browser automation integration itself continues
to reject the origin, so no browser logs or network waterfall were collected.
The sanitized local rollout receipt is
`/tmp/computers-forwarding-cutover-20261019/receipt.json`, SHA-256
`2366ed1f9a11488f4b0f3e650c30e447982055ff6c27446c41c95a6c079a9e3e`.
Review catches swapped per-sandbox/per-replica labels in the first receipt;
a narrow read of the actual deployed TOML confirms the approved values are
correct, and only the receipt is corrected. No second gateway restart occurs.
The updated diagram's embedded JSON, executable JavaScript and three SVG
documents pass static checks. Visual review remains blocked by the existing
browser-origin permission decision.

The user's subsequent reload still shows a blank page. Retained Hub logs contain
four successful entry-page requests and 236 asset requests: 212 return 200 and
24 return 503. No `/api/*` bootstrap request follows. Failures occur in four
waves at 00:30:00.865, 00:33:51.815, 00:34:26.529 and 00:35:19.804 UTC on
October 20. Hub reports native forwarding `Unavailable`; matching gateway logs
show successful relay-open/claim pairs, without a corresponding failed-open
warning. The operator's successful direct-forward probe bypasses the Hub
sandbox's HTTP/2 L7 mediator and therefore does not qualify that layer.

Source review finds a separate mediator accounting defect. Its advertised
HTTP/2 concurrency is 32, but its admission guard counts exchange tasks awaiting
completion or joining. A peer can retire protocol streams and send compliant
replacements before those tasks are reaped; the guard then sends
`REFUSED_STREAM`, which the pinned tonic maps to `Unavailable`. GPT-6.1 Sol coder
adds a deterministic real-relay reproducer: hold 32 streams, retire 16 at the
peer, flush 16 replacements while relay polling is paused, then resume. GPT-6
Luna builder runs it against unchanged production source at `7c7c9331`; it fails
on stream 65 with `REFUSED_STREAM` in 0.08 seconds after a 56.06-second compile
(57.964 seconds wall time). Sanitized receipt:
`/tmp/computers-h2-rollover-red-20261020/receipt.json`, SHA-256
`f23f18acbb4305b653fb536f247f82c46106b7226b40da9750f14e0ad8a4b5b8`.
This proves the mediator defect locally; the deployment still needs the fix and
an authenticated browser result to establish that it resolves the observed UI.

The candidate stops accepting exchanges at task capacity while continuing to
drive the native HTTP/2 connection with `poll_closed`. Native protocol handling
queues replacements until a task retires. It retains the 32-task bound, adds no
fixed delay or replay, and removes the incorrect refusal. All seven focused
HTTP/2 tests pass, including rollover and cancellation, in 0.13 seconds after a
14.33-second compile. Strict Clippy first rejects an unread response-handle
collection in the new test; the fixture now observes its retained response count.
Revalidation passes all seven tests in 0.12 seconds and strict all-target crate
Clippy exits zero after 13.97 seconds. The fix
belongs in the supervisor image, not the already updated gateway executable.
The Docker driver resolves its supervisor image when the gateway initializes;
rollout must reload that configuration and recreate the Hub supervisor through
native lifecycle operations. Gateway reconciliation can interrupt other running
sandboxes, so it is not described as Hub-only downtime.

The repository's `build:docker:supervisor` task cross-builds the Linux amd64
supervisor on the Mac using the pinned GNU glibc-2.28 target. Release compilation
finishes in 1 minute 55 seconds; staged and target binary SHA-256 both equal
`0d36909bb2ab9efc6b6f821da8e5760316d7c254b2fe7bd25e4ac70e10fa07a1`.
The resulting image is
`sha256:e35532b00a8d26a3d134dc9424230685fa53b91a40a5aa8a0c98b4b2f3d31cf8`,
tagged `openshell/supervisor:h2-rollover-20261020`, with Linux amd64 metadata and
entrypoint `/openshell-supervisor`. Source is base `7c7c9331` plus the validated
single-file change; diff-patch SHA-256 is
`a363b1d8932026ce7879e838e9b274383bf93f481d34ac31e2296e7ffe1e1d60`.
This is an image build result, not actual Linux execution or browser acceptance.
Coordinator authorizes exact-image transfer, guarded supervisor-image selection,
native gateway reload and Hub supervisor replacement while preserving all
application images, providers, configuration, exposures and Computer storage.
The actual Ubuntu host loads that exact image and independently verifies the
supervisor executable hash. The installation changes only
`OPENSHELL_SUPERVISOR_IMAGE`; native gateway restart reconciles the same 14
sandbox identities. Hub and the Computer become Ready, and the Computer app
container, working-volume identity and sentinel hash remain unchanged. Public
TLS-verified `/readyz` returns 200. Artifact, Media and Time initially report
`exit_code=1` and later recover to Ready through native retry, with
`exit_code=null`. Their restart count of 37 is cumulative, not a measured delta.
Bounded retained error buffers do not establish the original exit cause.

A subsequent native Computer probe returns the 6,096-byte `/settings` HTML
shell with the expected mounted `<base>`, all 57 referenced assets return 200,
and `/api/info` returns 200 with 158 JSON bytes. Public Computer route probes
without a browser cookie return 401, so these checks do not establish an
authenticated browser render.

The user then demonstrates a distinct client-routing failure: clicking Settings
or New session navigates to `/computer/c/<id>//settings` or `//new-session` and
renders a black page. Manually removing the doubled separator makes New session
work. Hub preserves the incoming suffix and does not generate that browser URL.
GPT-6.1 Sol coder reproduces the exact duplicated links with the installed
Solid Router: its resolver joins a trailing-slash mount base with an absolute
route. OpenCode commit `4bd4891e9e3d67460eb43dcfcdefb5172c1279ff` trims the
separator only for the router base; HTML, asset, API, PWA and storage bases retain
their canonical form. The existing browser keeper exercises actual Solid links
and programmatic navigation at root and a multisegment Computer mount, including
query and fragment. The targeted unchanged-source case fails in 164 ms; the
fixed suite passes 8 tests / 33 assertions in 150 ms. App typecheck, formatting
and diff checks pass. These results are retained in the agent tool transcript,
without a separate timing for typecheck.

The actual Linux host builds OpenCode `4bd4891` with pinned Bun 1.4.2. An attempted
213 MB transfer of a Mac-built Linux executable is stopped while incomplete and
is not used. Locked dependency installation resolves 2,541 packages in 61.95
seconds; the web bundle builds 6,032 modules in 8.48 seconds. The route suite also
passes 8 tests / 33 assertions on Linux. The resulting native x64 executable is
version `0.0.0-hosted-computer-202610200115`, SHA-256
`6c4e6c85fd66e95fc82523bd0274545e36b6cda6a111b790fbda0b7c00241685`.
The Linux-built Computer image is
`sha256:efe89371e6e8dd058d805422b9b7bd8db0ba3212b5a56a989e460060f30e2c0f`;
offline inspection confirms linux/amd64, the exact executable and UID 1000.
The native `installation/computer` template now selects that image with the same
CPU 2, memory 4Gi, persistent-workspace setting and nonsecret environment values.
Its new template ID is `1f503a2f-1a99-476c-b00c-3799abf11824`.

The user explicitly permits discarding this disposable development Computer
workspace; its preservation must not block deployment. Native resource deletion
removes the old sandbox, cloned template, two owner provider instances and then
workspace `cpne3wuk5kqtpir5345`. The Hub row and external Computer ID remain.
This full workspace reset also discards native refresh custody, so the standard
browser OAuth handoff must recreate the owner workspace before the new image is
running. Public `/readyz` is 200 and `/computer` returns 303 into that flow.
No authenticated public UI or new sandbox readiness is yet proved. The coordinator
requests that one normal sign-in and the builder watches native recreation.
Mac Chrome inventory works, but acquiring the existing Computer tab is again
explicitly refused by the browser tool's saved/managed origin policy; no alternate
browser or CDP path is used.

The user's click on `/computer` exposes an incomplete development reset: the
old browser binding remains valid, so entry tries the deleted native sandbox and
returns 503 instead of beginning OAuth. In one guarded development transaction,
the builder removes only the exact old Computer row and its two browser-session
rows; no refresh-family, identity or installation configuration row changes.
The user then explicitly requests removal of the stale local browser denial.
Read-only inspection finds the exact public origin in the current conversation's
user-owned `origins.denied` list. Removing that one entry restores normal Chrome
tool access; other denied origins remain unchanged. This establishes the local
saved denial as the observed tool blocker, rather than a missing user grant.

Using the existing Bioma Entra browser account, the coordinator performs
normal sign-in. Hub creates Computer `01a156fc-c527-7231-8543-dd212f266e0c`, native
workspace `c5wpyb4wedk4oclzduk`, sandbox
`68213dc1-2917-47d9-bd01-f289e1363fc3`, running the Linux-built fixed OpenCode image.
The callback still returns 503: at `01:46:09.351Z` the supervisor records a failed
connection to `127.0.0.1:4096`, Hub reports native forwarding `Cancelled` at
`01:46:09.352Z`, and OpenCode begins listening at `01:46:09.502Z`. These timestamps
strongly support a listener-start race. The existing cold-start retry classifier
admits Unavailable and DeadlineExceeded, but omits this observed Cancelled result.
Hub commit `e564f60d024c2c9acfd0c37043589675bb76424f` includes Cancelled only in that
existing bounded pre-HTTP readiness wait. It adds no warm-request retry and
preserves authority, configuration and capacity refusals. The existing regression
passes 1/1 and library compilation takes 14.41 seconds; formatting and diff checks
pass. The actual Linux runtime build takes 136.4 seconds and produces image
`sha256:198d134ed2a771e8ad59dde3c2c75c3bbf61a2c5e422d2f3fe45d5654f03e010`,
with Hub executable SHA-256
`ec6f0ca8f2a181bed3d6a3c85ac2c317012bd69a82e900edf0a97bf45843be05`.
Native recreation retains `vv-control`, its control provider and configuration,
then restores the exact HTTP exposure. Sandbox
`81d885f6-29fd-4eff-9d8a-21d9bdb95092` is Ready; TLS-verified public readiness is
200 in 0.173 seconds. A subsequent normal browser handoff completes and the Hub
Computer row is ready. The user's MiMo replies render in the actual Mac Chrome
Computer session; the UI records 6 seconds and 3 seconds for two replies. These
are observed user calls, not an agent qualification run. A bare `lore` shell call
prints native usage and exits 2 because no subcommand was supplied; that proves
CLI execution, not authentication or private repository access.

The coordinator's one Stop/Start recovery probe temporarily interrupts the user's
next prompt with HTTP 503. The Computer subsequently resumes and its existing
session remains visible. No further restart qualification should interrupt the
active user; necessary development deployments remain authorized.

Two remaining failures are isolated before further model calls. OpenCode's actual
private file log records MCP connection failures to `veoveo.example.com`: the image
copied the generic example URL rather than the selected installation resource.
Installation `0192bb0b89b3f1fccc8dc3de108782642546a3b6` replaces that URL with
`{env:COMPUTER_HUB_URL}`. Hub `bfde2f284111cda9cd625005e2dc6450e7b06b38`
derives this environment field from the selected profile's typed protected resource
when cloning each native Computer template. A read-only query of active control
revision `gcp-01a156a8-2ca3-7bd0-a176-ba18fbe029ba` confirms the current value is
`https://veoveo.bioma.ai/mcp/computer`; no installation origin is compiled into
the generic image or Hub implementation.

The native Lore CLI reaches Hub's expected device authorization page. A normal
Chrome approval click receives HTTP 302 to the configured Microsoft authorization
endpoint, but Chrome's Log/Audits events prove that the initiating page's
`form-action 'self'` policy blocks that redirect. Re-clicking the consumed request
does not establish a new token expiry. Hub `bfde2f2` resolves the stored request's
current resource, public client and selected identity provider, and adds only that
provider's authorization origin to the form policy. Manual code entry first uses
a same-origin GET form, without placing the browser capability in its URL; actual
approval retains the existing POST/browser binding. No Lore security or client
protocol change is made. The existing browser-binding test passes 1/1 and Hub
binary compilation passes in 21.78 seconds; formatting and diff checks pass.
The existing native issuer HTTP fixture then passes 1/1 in 14.85 seconds and
strict all-targets Clippy passes in 14.61 seconds. An initial attempt lacks the
existing PostgreSQL 18 binaries on PATH and fails before any test executes;
selecting the installed Homebrew keg resolves that fixture setup. These are Mac
component checks. Linux runtime compilation, rollout, fresh browser approval and
native CLI completion remain pending.

The first candidate Computer rebuild accidentally reuses an older cached OpenCode
package (`79f58e2e…74ddc3`) instead of the proven router-fix executable
`6c4e6c85…241685`. Image `sha256:77f66144cec6136d93dfa7e48f69be319bf332a40a65166f87a620b24b6580f4`
is rejected before template selection or deployment. The replacement must retain
the exact router-fix binary from the verified current image and verify its full
hash in the final image. This is a rejected build input, not a deployed regression.
The corrected candidate is built on Linux and its actual embedded executable hash
matches the required full `6c4e6c85…241685` identity and router-fix version. It is
held unselected until the new Hub runtime is ready.

Continuous development deployment is authorized. Subsequent image-only releases
should retain the owner workspace and its provider instances and replace only
the native cloned template and sandbox, avoiding a new user sign-in. The hosted
Computer's durable storage requirement remains the product contract,
independently of the authorized development reset. Isolated image HTTP checks
serve the expected mounted shell; these do not replace a real router/browser
navigation check.

The user's Mac Chrome also displays a Safe Browsing `Dangerous site` interstitial
on the public OAuth callback. This is a separate browser classification, not an
HTTP 503 or certificate-error diagnosis. The precise classification trigger has
not been obtained; neither compromise nor a false positive is established. The
user explicitly authorizes Mac Chrome access, but the integration continues to
reject the origin under its saved permission policy. This is a tooling refusal,
not missing user authorization. No browser-policy bypass is used.
The user then enables full CDP access in the desktop app. A fresh supported
navigation still receives the same origin-policy refusal. Official OpenAI
documentation identifies Settings → Computer Use → Chrome → Manage as the
website allowlist/blocklist control, separately from full CDP developer mode.
User and workspace Codex configuration contain no browser-deny entry. Inspection
of the desktop app itself is also refused by Computer Use. App restart is the
next documented troubleshooting step; no claim is made that it removes a real
site-level or managed deny.

A separate user report concerns the old Mac `tmp-client`, not the Linux Computer.
Its launcher supplies a five-minute Keycloak service-account token through an
environment variable and explicitly disables OpenCode OAuth. Both running local
processes retain a token whose decoded, unverified expiry is
`2026-10-18T04:25:41Z`. Local Hub readiness is 200. The same existing token flow
issues a fresh 300-second token; correctly framed MCP discovery and tool listing
then return 200 in 13 ms and 20 ms, with 19 tools. An initial diagnostic omitted
the required MCP method header and returned protocol error `-32020`; correcting
the request framing resolves that probe error without a server change. No model
call or runtime mutation occurs. Native OpenCode supports OAuth refresh, but the
local test realm has no public OpenCode client registered. The user explicitly
selects the local Mac Hub for this client and confirms that Linux Computer work
should continue in parallel. The Mac fix uses a native public PKCE client and
OpenCode's existing demand-driven refresh, preserving the local endpoint; no
custom credential refresh loop is selected. A native Keycloak user-property
mapper supplies the actual user's immutable ID to the Hub's opaque principal and
initiator claims, with explicit member/contributor admission in the selected
existing context. Existing service identities and all Lore configuration remain
unchanged. The local `/computer` endpoint currently returns 404 while readiness
is 200; browser Computers have not been deployed on this Mac installation.

Installation commit `5e4a5e99` adds the opt-in local public-client configuration;
17 helper tests pass. Native Keycloak now has the `opencode-local` public client,
with authorization-code PKCE and refresh, the exact loopback callback, and the
existing user's native ID claims. The reviewed complete Hub candidate changes
only OAuth clients, explicit member admission and context membership. Its
SHA-256 is
`916f90932ce47b5840515f9b11cfdb83355dbc4c30be29180a36651dbf653b81`.
The old local Hub image lacks the native control-plane import command, so it is
replaced with the already tested `67654f36` runtime rather than writing SQL.
Native GetSandbox supplies the complete original spec; recreation retains its
command, policy, `vv-hub-forwarder` attachment, config volume and named exposure.
The imported active revision is `gcp-01a1568b-156a-7dc3-893c-cbfef72fe23b`,
digest `sha256:740bebf3e5094b8ca7a97a6275a4b4962b31421cfcfe6c1bbd1dfb57238e4ac5`.
The new local sandbox `4a530a3b-ea8b-4dba-aa04-9d44df586db3` is Ready on image
`sha256:7fb7fdf1a6ec9cf8016134f4295b2eab4583c7130252cba2fe20654a8f961eac`;
TLS-verified readiness and protected-resource metadata both return 200. The
Hub-hosted issuer routes return 404; source review identifies the absence of a
matching Hub-hosted issuer in this external-Keycloak profile as the expected
branch. The advertised Keycloak issuer is the intended native OpenCode login path.
The reviewed hosted-computer OpenCode binary is installed locally, with public
CA trust configured for new shells. Its existing background service initially
lacks that environment, so the first native authentication attempt fails TLS
before opening a browser. The supported `opencode service set env` command
configures `NODE_EXTRA_CA_CERTS` for the hosted-computer channel; the unrelated
mcp-tasks service remains running. Project OAuth configuration is activated and
native authentication reaches the real Keycloak login. The browser origin gate
denies agent access, so the user completes the existing browser flow manually.
The callback page shows authorization success and native CLI exits zero with
`Connected to veoveo`. The obsolete `tmp-client/launch-opencode.py` is removed at
the user's request; normal launch is `opencode` in the project directory.
The actual native reconnect returns 204 in 53.56 ms and discovers 19 Hub tools
under the approved human principal. The issued token lifetime is 300 seconds.
At 19.41 seconds after its actual expiry, native reconnect returns 204 in
103.94 ms and again discovers 19 tools. The same credential row still contains
the expired access token immediately before the request; OpenCode replaces both
access and refresh token hashes in place, retaining the expected human identity
and a new 300-second lifetime. The native refresh-start log is observed at
00:06:10.452 UTC on October 20. No direct token-endpoint probe, custom refresh loop
or second browser authorization performs this renewal. This proves demand-driven
renewal in the running native OpenCode service across a real expiry.

The user's first prompt then fails locally with `missing API key`. The selected
hosted-computer channel has a separate credential store, and migration omitted
the existing DeepInfra provider key from the previous store. Native provider
authentication imports that same key without changing the OAuth row or restarting
the service: `POST /api/integration/deepinfra/connect/key` returns 204 in 14.42 ms.
Private equality checking and the native available-model snapshot confirm the
active key and `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` selection. This proves provider
credential activation, not inference; no agent model call is made during repair.
The local receipts are under `/tmp/computers-local-opencode-native-20261019/`
(`baseline.json`, `post-expiry.json`, `model-credential-resolution.json` and `README.md`), without
credential values. The missing key is an integration omission in the launcher
replacement, separate from the successful Hub OAuth flow.

The first frozen HLI1 source fingerprint was
`b8f128504d57af70eb4bab558a815012faf254a0d93be822c0130e3fae1bf337`
on Hub `9da92b3`. Core `433ed5f` and Hub migrations `0001`–`0003` applied to
disposable PostgreSQL 18. Full SQLx preparation stopped after 22.8 seconds on a
registry-builder return-type mistake, a stale revocation test field/reference and
a callback catalog borrow. No tests ran. The builder stopped the scratch database
and retained logs under `/tmp/computers-hub-hli1-validation-20261019/`; its seven
partial new SQLx cache files are not a completed metadata generation. Source work
resumed to fix those errors and implement the native flow. No live reset occurred.

Independent read-only Linux custody observation at 2026-10-19 16:31:11Z:
GPT-6 Luna builder queried native refresh status for
`vv-control/vv-hub-native-control`, credential reference
`HUB_NATIVE_CONTROL_REFERENCE`. The command exited 0 in 1.96 seconds. Native
status reports `oauth2_client_credentials`, `refreshed`, last refresh 16:13:58Z,
expiry 17:13:57Z and next refresh 17:10:57Z, with no failure. This records a
replacement credential beyond the original 16:16:18Z expiry. A filtered gateway
journal query returned no matching event, so this does not identify automatic
scheduler versus explicit refresh origin. No authenticated control RPC after
renewal was invoked or proved; no credential was exported or runtime changed.

Use a hard cut for stored authorization bindings. Do not infer historical token
authority from the latest catalog or add a compatibility decoder/backfill to retain
disposable sessions. The user explicitly confirmed hyper-development mode on
2026-10-19: only their use matters and sessions may be killed. This supersedes the
earlier manual session-reset prerequisite. Migration `0003_oauth_resource.sql`
directly discards disposable OAuth authorization requests/codes, refresh tokens/
families, Computer browser sessions and pending Computer login state before
changing the bindings. Require fresh sign-in and normal credential handoff;
do not build session preservation, compatibility or reset-specific machinery.
Preserve native working storage and unrelated Task/Artifact/reference data.
The separate `vv-hub-native-control` service credential is unaffected. Routine
persistence remains required after the final schema is deployed. No live reset
has been performed yet.

The source investigation ran no tests/builds or runtime mutations. The final
pre-issuer Computer artifacts remain retained: installation `caf5d046`, Linux
Factory `sha256:aae9b06e3f6890e2b57e8472dc0d0f96c4dc67dc3ef4d3c419bde7c33dd6193e`
and Computer `sha256:c668229af4a278c6b40b4c0160a4fe8e16636881a9da2f4b21a8808d9d3d1d96`.
The Computer's isolated no-network `/computer/api/info` returns 200; native
Lore reports `0.10.2-nightly+local`. This is image startup evidence, not Hub/Lore
login. The builder's receipt is
`/tmp/computers-final-caf5-linux-20261019/receipt.txt`, SHA-256
`73302ad3e713e721233d16b2f96c1db2b2c342dd233351ab61f41fb87951632f`.
No shared gateway/Hub switch or new repository issuer has occurred.

The canonical architecture, this goal extension, direct-IdP history notice and
existing three-view diagram are updated together. Static JSON, JavaScript, SVG
XML, unique-node and local-source-link checks pass. Browser review of these new
guide bytes remains pending; the earlier guide's visual receipt does not cover
this edit. Main-checkout documentation edits by the other team remain untouched.

## Computer Main Integration — 2026-10-19

The coordinator integrates and publishes the Computer work on `origin/main`,
then removes the task's worktrees and merged branches. Parallel multimodal SDK,
runtime and architecture work is independently in progress and remains untouched.

Source integration keeps both the existing Lore storage work and the Computer
native refresh work. Lore `6b7a0e59` has exactly the same tree as the already-tested
`7ce28b6c` parent; it does not restore the retired credential-pinning/QUIC patches.
OpenCode `4bd4891` includes the prior `mcp-tasks` lineage. Hub `bfde2f2` and
installation `d278778` include the generic Computer URL and device-CSP fixes;
installation also preserves the embedding additions. The installation merge's
redundant Lore `ports` key is removed, retaining one configurable loopback mapping;
`docker compose config --no-interpolate --quiet` passes. This static check does not
move any service or establish the proposed Compose-free architecture.

Validation remains separated from deployment. GPT-6.1 Sol performs source merge
fixes; GPT-6 Luna builds and runs the component checks. Hub's complete check target
passes on Mac and actual Linux, each 226 tests passed and one skipped. The merged
installation's existing identity suite passes 21/21. OpenCode's normal pinned-Bun
pre-push hook passes 34/34 tasks in 3.515 seconds. Its primary checkout initially
has stale workspace links and the default shell selects Bun 1.3.13; selecting pinned
Bun 1.4.2 and `bun install --frozen-lockfile` restores the declared UI-to-util link
without source or lock changes. The push hook is not bypassed. Runtime Embedding
`017c897` passes pinned uv 0.13.1 frozen resolution, 12 unit tests and the model-free
Docker check. This packaging check does not constitute multimodal inference.

The OpenShell merge preserves the 62 upstream commits and native fresh generation
on Start. Its all-targets server check passes in 1m11s; focused server filters pass
8 persistent, 2 authenticated-start, 12 TCP-forwarding and 1 pending-limit tests.
The first H2 compile exposes the newer request-preparation API. OpenShell
`f66de383` supplies each request's UUID and captured observation context, preserving
the stream backpressure fix. Seven H2 tests and strict network Clippy pass, the
latter in 33.98s. SDK transport-error coverage passes 1/1. Docker-driver persistent
workspace coverage passes 3 tests, with one existing live test ignored. The
test-owned native Docker lifecycle E2E passes 1/1 in 16.40s: stop/start, runtime
loss and gateway restart preserve the same 54-byte sentinel, SHA-256
`e03081e39facfdb3ab091a973d52b0b257de954e8c0e221188f873cd1655a0c3`.
The isolated test cleans its owned gateway/container/volume; the live gateway is
untouched. Its first invocation stops before test execution because the standalone
E2E lock is stale. OpenShell `846de5fa` removes ten obsolete transitive crates with
no dependency upgrades, and the locked rerun passes on a clean tree. That source
is published on `origin/main`; publication does not upgrade the live gateway.

On Linux, Hub image `sha256:4da61e1054f9237ea94a02522b44d348664047c88be8fc825c78a12c108594b8`
is Ready as native sandbox `97026721-3d3b-4886-8ba9-de8b49fe26a5`, with its original
provider, configuration mount and HTTP exposure retained. The first recreation
attempt rejects generated effective-policy entries; the original authored policy
succeeds without an authorization change. Computer image
`sha256:949de92ef20a2450e8c0ed4a1ed1b54b77717504f6a76ec03d257677f9170c21`
retains the
proven OpenCode executable SHA-256
`6c4e6c85fd66e95fc82523bd0274545e36b6cda6a111b790fbda0b7c00241685`.
Native replacement initially reuses a stale saved browser base path; correcting
only the clone/sandbox environment restores the current owner route, preserving
the workspace and both provider bindings. Sandbox
`b9f2dc69-c6ae-426b-b679-e617f8af07cb` is Ready and serves the exact base
`/computer/c/01a156fc-c527-7231-8543-dd212f266e0c/`. The default-model API returns
DeepInfra MiMo-V2.6-Pro; scoped MCP connect followed by MCP status proves Hub
connected. No agent inference call is made.

A fresh native `lore auth login` on that Computer completes the ordinary Mac Chrome
Hub device page, Entra account selection and approved callback. The CLI exits zero
with `Authentication successful`. Its existing headless secure-storage fallback
warning is retained as native Lore behavior; no extra Lore security rules or
credential service is introduced. This proves user login and the CSP redirect fix,
not repository exchange, publication, renewal, second-user denial or final bounded
model acceptance. Those remain explicit gates before the infrastructure migration.

The final read-only GitHub audit finds all 15 primary repositories on `main`, with
each local `main` matching its actual remote `origin/main`. All six Computer task
worktrees are removed; every primary repository has only its primary worktree.
The contained Computer/typed-contract task branches are removed locally and the
published Computer task branches are removed remotely. Unrelated upstream branches
are retained. Lore and OpenCode now select `main` as their GitHub default branch.
Ongoing multimodal changes in SDK, runtime and the same documentation files remain
uncommitted by this coordinator; this closeout does not claim those trees are clean.
The initial full-management proposal included new dependency/readiness and
issuer-independent startup capabilities. The subsequent placement review supersedes
that proposal: use existing OpenShell capabilities, service-owned connection
recovery and native process restart, without service launch ordering. Installation
bootstrap only provisions resources/configuration. Keep local-development Keycloak
outside OpenShell on any host OS. The revised plan is linked above and is not deployed.
