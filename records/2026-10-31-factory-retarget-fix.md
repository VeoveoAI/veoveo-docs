# Factory retarget identity: correction and native qualification

Hub commit [`48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`](https://github.com/VeoveoAI/veoveo-hub/commit/48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c)
is pushed to `origin/main`. It corrects the original-source defect in the
[reproduction record](2026-10-31-factory-retarget-identity.md). Both required Docker
checks pass on its exact tree. This is component qualification; no deployment or
formal Factory transition proof is claimed by this record.

## Change and engineering decisions

Changing a link named `team-a` from repository A / tracked branch 1 to B / branch 2
previously changed the native command while retaining A / 1 in `hub.instance`.
Credential lookup still returned A, B's later push was ignored, and A's later push
could change the command back. The original regression observed all those outputs
before asserting; it failed on the original source without an injected fault.

The correction reads the stored linked target when finding an existing runner.
Changing either repository or tracked branch forces replacement, retaining the
deployment and data-environment database. After preparing the image, policy,
providers and template, Hub deletes the old sandbox and waits for confirmed
absence. One SQL statement then records the new repository, tracked ID/name and
linked pusher before the existing creation path renews credentials and creates
the replacement. If the sandbox is already absent, the target is recorded before
creation. A deletion failure does not record the new target. Failures after
confirmed deletion can leave no sandbox, and retry uses the resulting stored
state; there is no rollback promise.

Registrations join their routing identity from that instance row. The existing
kernel notification mechanism now signals real changes to the joined fields,
and the watcher compares complete registered-server output before publication.
This covers a changed target without requiring a new process registration. It
does not establish atomic publication order between concurrent reloads.

No repository authorization rule or additional authorization service was added.
The owning [Hub design](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md)
changed with the implementation. Two upstream Factory fixes arrived during this
work: `3c907cf` preserves the serving marker on an unchanged runner, and `4c3e6bb`
reads provider grants from the active catalog at each push. The integrated fix
preserves both. The single integration conflict was in `factory.rs`; the tests
below were rerun by the final full checks on the combined source.

## Execution and evidence

GPT-6 Astra coordinated and reviewed the source and evidence; GPT-6.1 Sol wrote
the correction and regressions; GPT-6 Luna ran preparation and checks. No OpenCode
or paid provider model calls were made. Native fixtures use real Hub code and
private PostgreSQL, with simulated Lore, OpenShell and image-building responses.
They do not execute a real Lore checkout or a deployed sandbox.

Three focused checks first passed on the correction before upstream integration:

- `contributions::lore::factory::tests::retargeting_a_link_updates_its_runner_identity_client_and_push_routing`:
  complete Runner and instance-client values, actual command arguments, a later B
  push, and exclusion of a later A push. Body 1.51 s; command 40.055 s including compilation.
- `contributions::lore::factory::tests::a_refused_retarget_delete_preserves_the_old_target_until_retry`:
  an injected `DeleteSandbox` refusal, preservation of the old observed target,
  client and command in that fixture, then a successful retry. Body 1.45 s;
  command 1.901 s. This does not assert that every real failed delete keeps a
  worker alive: deletion can already be underway.
- `registration::store::concurrency_tests::a_retargeted_instance_publishes_its_complete_live_registration`:
  the production target SQL, real kernel notification and running watcher
  publish the new repository while preserving every other registered-server
  field. No manual refresh or new registration drives the observation. Body
  1.22 s; command 33.086 s including compilation.

The first two use `cargo test --locked -p veoveo-hub --bin veoveo-hub <name> -- --exact --nocapture`;
the third uses `--lib`. Toolchain: Rust 1.99.0, macOS ARM64; private PostgreSQL
18.6, pinned Core `422dcf268d690fcbc3fee435cf9b81e7f36ffeac` migrations followed by
Hub migrations, and SDK `7360c0f96cb616c519d27256df214ff4f2e6e831`.

SQLx 0.9.0 preparation succeeded in 29.176 s. Exactly two query metadata records
were replaced, for `runner.sql` and `linked.sql`. The wrapper initially rejected
the expected deletion of the two old hash-named records; review confirmed the
exact old/new pairs, and preparation was not repeated. Integrated adoption
preserved upstream's new `push`/`unserved` metadata. Both final checks independently
validated the resulting metadata with `cargo sqlx prepare --workspace --all --check`.

Final source: commit `48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`, tree
`6728c1b310189b4313ff7fa5c9781b4d4a6c2332`. Both hosts ran
`docker build --target check .` on the same source archive, with a 7,200 s bound.
The Linux check built on Ubuntu through the existing SSH tunnel; no Mac-built
executable was transferred. The Mac check ran in Docker Desktop's Linux VM.

- Mac: exit 0, 176.374 s; 460 tests passed, 2 skipped across 31 binaries.
  The three new tests took 1.385 s, 1.357 s and 1.126 s respectively.
- Linux: exit 0, 215.448 s; 460 tests passed, 2 skipped across the same 31 binaries.
  The three new tests took 7.207 s, 8.015 s and 4.227 s respectively.
- Both passed SQLx validation, formatting, strict all-target/all-feature Clippy,
  cargo-deny and cargo-hack. Neither timed out. Source, Docker-context and build-input
  maps were unchanged after each run. No explanation of the timing difference
  was established by these measurements.

## Output identities

The complete source/Docker-context map contains 1,160 files, SHA-256
`0520bd4885c4238945eb10f9f8c1ef443c539417ccac05faf8707a9fceb80374`.
The 847-file build-input map excluding proof material is
`7176f3efa7817a7efd8678eb84bb0f5ce854a21a17bd43dcac908999eb715a13`.
The archive SHA-256 is `2ff049409207138383cf38418e9be1cdcd9aeff8437c88223ad4a2330eabe93a`.
The unfinished new proof package was excluded from both native check inputs.

Local evidence root: `/tmp/hub-factory-retarget-20261031/`.

- `fix1/final-validation-summary.json`: SHA-256
  `357d3487f6a7b0cfc59d901a735967ffaf124fa6589977e4c310010fda73f3b7`.
  It includes the native focused binaries: 97,653,544-byte Hub binary
  `5d5770192571671be8c39c41f42210534711dd251b8aa15e5dbe29b45e2e02ab`,
  and 178,931,896-byte library test binary
  `824d282654933960e0b3cf2fb2bada292b2c0c87fee0d53f19be99de00fad587`.
- `fix2/final-check-summary.json`: SHA-256
  `c15e46beb084f8fe64be373efcce3b352dc677319097599d01598b0e593f8624`.
- `fix2/mac-final1/docker-check.log`: 487,732 bytes, SHA-256
  `a0f9b6a342fa2440c67db4690a38eef48a85ec208f6c43625669843d9ea3a95d`;
  summary `3c0e68e5e16b519f07df328d07f476aee7cf597bef09b4aa554a2cdb5ed71ad1`.
- `fix2/linux-final1-mirror/docker-check.log`: 487,617 bytes, SHA-256
  `1ccc4cc9ff3f4a40ad0eb3df5a1330b7db6fdfaf57a6b6cedae12f503a132046`;
  summary `86e28429a969b6e53c81174384fa68fcdea01613ecaeb0f544eb03de39ee5ee9`.

## Remaining formal and deployed obligations

The full async/SQL retarget protocol is being modeled manually in Lean. Its
success, failure-prefix, retry and finite-history contracts are not yet qualified.
This record does not turn native tests into formal SQL refinement. PostgreSQL
statement behavior, uncertain replies, native RPC behavior, credentials and actual
filesystem/process effects require explicit correspondence boundaries.

Factory deletion uses OpenShell's ordinary deletion, without `keep_workspace`;
Computer replacement separately requests workspace preservation. The source/API
contract therefore does not equate preserving the deployment/database with
preserving the old checkout. Actual native cleanup and checkout execution were
not exercised here. The start command names `branch@LATEST`; its correctness is
not evidence of an exact measured checkout matching the recorded applied revision.

Two separate concurrency questions remain open: a linked follower can prepare from
an older parent snapshot before acquiring the runner lock, and concurrent
registration reloads may publish out of order. This sequential retarget correction
does not claim to resolve either. No running installation was changed.
