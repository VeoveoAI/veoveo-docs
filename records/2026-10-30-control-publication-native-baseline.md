# Control publication: native PostgreSQL baseline

The two new publication tests and the two existing control-store integration tests
passed against PostgreSQL 18.6. Formatting and strict library Clippy also passed.
This is component evidence for the actual Rust transaction path; the transaction
model, deliberate fault controls and final restored qualification remain separate.
The preceding [source review](2026-10-30-control-publication-source-review.md)
records the SQL mapping and query preparation.

Sol `/root/coder` implemented the fixtures and reviewed their source; Luna
`/root/builder` executed logged checks on an isolated frozen copy; Astra `/root`
reviewed the assertions and independently verified all stage-log hashes, summary
linkage and the two native binary identities. The run used Rust 1.99 on macOS,
PostgreSQL 18.6 from Homebrew, `SQLX_OFFLINE=true` and the existing Cargo dependency
cache. No deployed endpoint, OpenCode model or paid provider was called.

## Scenarios exercised

The new
[publication fixtures](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/control_store/publication_tests.rs)
use the existing private Core database fixture, Hub migrations, declared audit
classes and real `AuditAppend`. They introduce no production failure hook.

`publication_late_append_failure_rolls_back_all_staged_rows` seeds a revision with
removed and retained contexts, then publishes a candidate with retained and new
contexts. Its test appender appends the actual successful batch on the supplied
connection and returns an error. A fresh lock acquisition waits for SQLx's queued
rollback to complete. A single-statement snapshot then exactly matches the old
revision, objects, identity rows, active pointer and audit records; loading the
active document returns the old document.

`publication_blocked_stale_writer_leaves_no_owned_rows_or_success_batch` holds the
first transaction after its real audit append. Before releasing it, the test
observes the second publisher blocked on that connection's lock through
`pg_blocking_pids` and verifies that a separate single-statement snapshot still
sees the old committed state. The winner then commits, and the stale publisher
returns the revision-conflict error. Assertions check the complete winning
document and objects, exact context/grant/membership values, preserved creation
timestamps and the four successful semantic audit records: publication, retained
context update, new context creation and removed context deletion. The losing
revision, objects and successful batch are absent.

Both wrappers inspect the isolation level on the actual supplied transaction
connection and require Read Committed. Their enclosing timeouts are 90 seconds.
The passing assertions establish the observed lock/isolation conditions; the logs
do not record the PID, lock-wait duration or each SQL statement's timing.

The unchanged integration tests also passed:
`publishes_immutable_revisions_and_moves_active_pointer_atomically` and
`concurrent_publications_activate_one_revision_and_refuse_the_other`.

## Execution and instrumentation

Commands ran in this order, with explicit Rust 1.99:

- `cargo fmt --all -- --check`: exit 0, 0.657 seconds.
- `cargo clean -p veoveo-hub --manifest-path <frozen Cargo.toml>`: exit 0,
  0.650 seconds; dependencies stayed cached.
- `cargo test --locked -p veoveo-hub --lib control_store::publication_tests::publication_ -- --nocapture`:
  2 passed, 0 failed; 39.884 seconds including compilation, test-reported 1.13 seconds.
- `cargo test --locked -p veoveo-hub --test control_store -- --nocapture`:
  2 passed, 0 failed; 38.014 seconds including compilation, test-reported 1.03 seconds.
- `cargo clippy --locked -p veoveo-hub --lib -- -D warnings`: exit 0,
  32.945 seconds.

Fresh `Compiling veoveo-hub` lines and Cargo's executable paths are present for
both test commands. The runner initially stopped after the successful integration
test because its executable-path parser expected `Running tests `, while Cargo
printed `Running tests/control_store.rs`. The original summary and logs remain
unchanged. A linked continuation captured and hashed the already-built executable,
verified the frozen source and ran only the missing Clippy stage. No test was
repeated to hide that instrumentation failure.

## Evidence identities and limits

Hub base is `bb2e97f5c984a53eaa218109e4c01a70e952e365`; SDK runtime pin is
`239622d12c08b771cc5e813fe3e846385d8d04ad`; Core remains
`120306eb969c6134dadd422dca701a2ce63e9492`. The 76-path checkpoint-5 overlay archive
is `625f62aebc2509448c453d93420078c9971dfdd4ae3181ba11ae7010f72069de`,
with manifest `1593c899760c13c5b32c94050f296345343c6a78e47eb3eeae42052385e186c0`.
All 862 merged source paths were unchanged after validation.

The unit executable was 157,030,552 bytes, SHA-256
`db80b44d565538f682e395ce467afc2c678dcd66652088ad344310ea098398b8`.
The integration executable was 35,698,320 bytes, SHA-256
`86d13160b6644c26f48ab8e54d368441a60584819b0a3086f06055da92f39aec`.
These are temporary test binaries, not deployment artifacts.

Evidence lives under `/tmp/hub-control-publication-20261030/`:

- `native-publication-checkpoint5-run1/summary.json`:
  `e3ffbfbce4c11d1b376f6517373eb7b5a4006063c057bb826323ee8518bdbb57`;
- `native-publication-checkpoint5-continuation.json`:
  `c2c42ac7333bf176af3efa110c7ee1d15cefea751569a9f0b4f0cabb7633c50c`.

Core's fixture disables physical durability settings, so this run does not prove
crash durability or multi-host recovery. It also does not establish formal SQL
refinement, replica adoption, arbitrary concurrent writers or commit-response-loss
behavior. It checks the named schedules and failure seam; general finite-execution
properties belong to the separately reviewed Lean model. Runtime publication logic
is unchanged. The proof work remains manual and uncommitted.
