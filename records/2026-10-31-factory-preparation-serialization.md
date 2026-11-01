# Factory: qualify preparation under the existing runner lock

Hub `c340a2daab2494a8ab5dc7d6aa65ef29bb459f46` fixes the native stale
linked-preparation defect recorded in the
[counterexample](2026-10-31-factory-stale-preparation.md). The final checked source
is `a69e3cba3f9865e06e1db5ff77d1562ac468338a`, which also removes a redundant
test-helper binding required by Clippy. Five focused component regressions pass.
The full Docker check passes on both the Mac's ARM64 backend and the actual Ubuntu
x86_64 host: 465 tests passed and two skipped on each. This is component and build
qualification, not deployment evidence or a new Lean proof.

GPT-6 Astra reviewed the design, source and evidence; GPT-6.1 Sol implemented the
correction and regressions; GPT-6 Luna generated SQLx metadata and ran the checks.
No OpenCode model call, deployment, new authorization rule or proof execution
service was part of this work.

## Correction and scope

The existing per-runner mutex now covers the current Runner read, source
preparation, native/stored changes and failure publication or clearing. A captured
linked notification identifies the candidate; it no longer supplies an obsolete
parent revision and pusher after waiting for the lock. An absent runner or a
different current linked repository/tracked branch makes that notification
irrelevant. A still-relevant notification uses the current applied parent program
and pusher while retaining the incoming linked revision and pusher.

Parent link resolution and its fallback to recorded linked content use the same
lock, as do removal and failure clearing. Cancellation checks remain before effects
and failure publication. The new current-runner SQL query selects one unique
repository/branch/link row using the existing schema and Runner projection. It
introduces no schema, generation field, lock service or authorization check.
`Factory::apply_to` is byte-identical to the previously qualified `48d7e25` body.
The owning Hub design was changed with the implementation.

Source: [watcher](https://github.com/VeoveoAI/veoveo-hub/blob/a69e3cba3f9865e06e1db5ff77d1562ac468338a/crates/veoveo-hub/src/bin/hub/contributions/lore/factory/watch.rs),
[current-runner query](https://github.com/VeoveoAI/veoveo-hub/blob/a69e3cba3f9865e06e1db5ff77d1562ac468338a/crates/veoveo-hub/src/factory/record/current_runner.sql),
[component tests](https://github.com/VeoveoAI/veoveo-hub/blob/a69e3cba3f9865e06e1db5ff77d1562ac468338a/crates/veoveo-hub/src/bin/hub/contributions/lore/factory/tests.rs).

## Scenarios and execution

The tests run actual Hub Factory/watch code against private PostgreSQL and
synthetic Lore, OpenShell and image-builder endpoints. Full stored Runner,
native command, credential-client lookup and later routing observations are
checked where relevant. Synthetic endpoints do not establish real Lore checkout,
OpenShell execution, credential renewal or deployed recovery.

1. **Completed retarget:** capture a linked-A candidate, complete parent retarget
   to B, then execute the candidate. B's full output and current failure survive;
   a later valid B push advances and an old A push cannot switch it back.
2. **Completed removal:** execute a previously captured candidate after removing
   the runner. It cannot recreate the row, sandbox, client or failure record.
3. **Valid acceptance after parent advancement:** keep the same linked target,
   advance the parent's program and pusher, then execute the older candidate.
   Its valid linked revision/pusher apply using the current parent's revision,
   pusher, own entries and image, including the full resulting command/client.
4. **Reverse ordering:** pause parent link resolution while it holds the runner
   lock, queue a linked update, finish the parent, then apply that update. The
   final output combines the current parent with the newer linked revision.
5. **Failure ordering:** pause an earlier linked preparation that will fail,
   queue a parent retarget and finish both. Failure publication completes before
   the parent; the final B runner has no stale earlier failure.

The original counterexample packet is unchanged. Its schedule paused preparation
and required B to finish before releasing A. That ordering is impossible once A
holds the lock through preparation. The final regression therefore exercises a
real captured tracking candidate followed by the real continuation after B has
completed. Separate lock-order tests cover preparation already in progress. This
is not a claim that the unchanged original test passed. Test-only helpers forward
a captured candidate into the real continuation and observe the existing mutex;
they introduce no production scheduling mechanism. Gates/drain markers establish
ordering, with bounded waits rather than sleep-based assertions.

Each focused command was `cargo test --locked -p veoveo-hub --bin veoveo-hub
contributions::lore::factory::tests::<name> -- --exact --nocapture`, using Rust
1.99.0 on macOS ARM64 and `SQLX_OFFLINE=true`. In the scenario order above,
each ran exactly one test and passed, with 67 filtered out. Test bodies took
1.64, 1.24, 1.62, 1.68 and 1.31 seconds; complete Cargo commands took 42.435,
1.940, 1.938, 2.013 and 1.629 seconds. All used the same 98,256,872-byte test
binary, SHA-256
`0c43293467e29e86bc59c541feb9ba2e67a66452c21fb8017d64a773ca71b6a5`.

SQLx metadata was generated in a private PostgreSQL 18 database after the pinned
Core `422dcf268d690fcbc3fee435cf9b81e7f36ffeac` migrations and Hub migrations:
`cargo sqlx prepare --no-dotenv --workspace --all -- --package veoveo-hub
--all-targets --all-features`. It passed in 24.700 seconds, adding exactly one
record (287 to 288), with no old metadata changed or removed. Its query matches
the new SQL byte for byte. The 3,144-byte metadata record has SHA-256
`9a9c03c0b4b89d39dee87244aceb5a1439bd010393624e02a94296eb70313298`.
The private database was stopped afterward.

Both initial full checks stopped at the same test-only Clippy `let_and_return`
diagnostic after migrations, SQLx check and formatting passed: Mac 24.986 seconds,
Linux 43.906 seconds. Dependency, feature and test checks had not run. Commit
`a69e3cb` replaces the redundant binding with the expression itself; it changes
neither production behavior nor test semantics. Both complete checks were rerun
from the corrected frozen source with `docker build --target check .`.

- Mac: Docker Desktop 29.8.2, ARM64 backend; exit 0 in **145.026 seconds**.
- Linux: Ubuntu 24.04.5 LTS, Docker 29.2.1, x86_64; exit 0 in **271.283 seconds**.
- Both completed migrations, SQLx check, formatting, strict Clippy, cargo deny,
  cargo hack and Nextest. Each ran **465 tests: 465 passed, two skipped**.
  All five new tests have exactly one PASS line on each host.
- The same source archive was built natively on each host; no Mac binaries were
  used on Linux. All 1,179 source/context files and 849 nonproof build-input files
  retain their pre-build hashes. Existing BuildKit caches were reused.

## Evidence identities

Temporary evidence root:
`/tmp/hub-factory-concurrent-preparation-20261031/`. Compact receipts and logs:

- `fix1/sqlx-prepare-run1/summary.json`, SHA-256
  `5082fbc29b12f52488bc87b2d2ade96ce14053e8ad79c97762ea9b47004a0275`.
- `fix1/native-tests-run1/summary.json`, SHA-256
  `b8049474511ec46450bd635fd7f13ebf8160ad1449615c90efb3c7069446f046`.
- `style-fix1/full-check2/mac-run1/summary.json`, SHA-256
  `9bc97d6e1b1774d63ff21b003a6bc14857723bfe667f3ccdfd3ad32269ceb623`.
  Its `docker-check.log`: 488,591 bytes, SHA-256
  `e3392cf955339a696fb9d346fae178878d66ba188727cbb7bcadd4742326f49b`.
- `style-fix1/full-check2/linux-run1-mirror/summary.json`, SHA-256
  `bc5c57b01e3d7ce56dc5d2cc49fd7311e345d452b80d66db27bf198a059f475b`.
  Its `docker-check.log`: 488,619 bytes, SHA-256
  `70bb786802743beb8ec8a981179f357fc112deefce2df2a9477c6bdccb3f7b97`.
- Checked Git tree: `77a1197d53a63b2e61fc459aa9532e119bf49011`.
  Source archive SHA-256:
  `1ae3c9f30838747fd074e30c933069e19c6674b2a0d1abbb69b22097fefc5861`.
  Full source/context map digest:
  `40a18bbae72214ad967ccc4f3ba39b3c11fb38aee39270c8adf51b5a53aaccee`.
  Nonproof build-input map digest:
  `204cb61657162ba5677f6060af8795450fba6c398a9651938635dc36fde8ec00`.

## Remaining proof and qualification boundaries

The existing Lean Factory model covers sequential application and recovery. This
checkpoint fixes and tests its previously unestablished current-input boundary;
it does not yet prove the watcher composition. Next work composes current-runner
selection, preparation and failure publication with those existing complete-output
contracts, including valid acceptance after parent advancement.

The mutex coordinates one watcher process. Cross-replica reconciliation,
concurrent registration/publication writes, crash recovery and eventual progress
remain separate obligations. `retry_waiting` still prepares saved parent revision
and membership outside this boundary; this fix does not establish freshness of
that path. The current applied parent is not a promise to use Lore's latest head.
No formal SQL refinement, external-service proof or deployed acceptance follows
from these native component checks.
