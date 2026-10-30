# Control publication: source mapping and query preparation

The first configuration-transaction slice now has a reviewed Rust/SQL mapping,
a compiling Lean transition model and prepared metadata for its four new database
queries. The publication proofs and native transaction tests are not qualified at
this checkpoint. This work follows the qualified
[session admission slice](2026-10-30-session-family-qualification.md).

Sol `/root/coder` owns the model, proofs and native tests; Luna `/root/builder`
runs logged checks against frozen copies; Astra `/root` reviews the specification,
source correspondence and evidence. No production publication rule, deployment,
OpenCode call or runtime proof mechanism was added.

## Source and model boundary

The actual
[publication method](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/store/control.rs)
begins a transaction, locks the singleton active-pointer row, compares the locked
revision with the expected predecessor, inserts the new revision and objects,
replaces Work Context rows, activates the pointer, appends the supplied audit batch
on the same connection, and commits. The concrete caller creates that batch through
`control_store::audit::changes` and `AuditAppend`; the generic `TransactionAppend`
interface alone does not guarantee an appender's contents.

The [model package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/control_publication/README.md)
keeps database commit separate from application ordering. Its commit primitive can
commit an incomplete list of staged writes. Completeness and the predecessor check
must therefore follow from Hub's modeled instruction sequence, rather than being
assumed by the database primitive. Writes are applied as deltas; unrelated rows and
separate rejection audits cannot be replaced by an old whole-database snapshot.

Review established the following explicit boundaries:

- Read Committed lock acquisition observes the current committed predecessor after
  waiting. Ordinary readers remain possible; successive independent reads do not
  constitute a coherent snapshot. The new test uses one SQL statement for its
  relational snapshot.
- Revision insertion checks primary-key absence. No reuse of retained revision IDs
  is assumed without that constraint. Cleanup and arbitrary owner SQL are outside
  this publication-only model.
- Work Context grant and membership replacement is modeled as separate clear/insert
  operations. The context payload represents mutable fields; preserved tenant/key
  and creation-time fields are checked in the native fixture, not proved by an
  opaque whole-row replacement.
- Core's audit append is exact-content and idempotent. The model checks duplicate
  IDs both against stored records and earlier incoming records. An identical
  existing batch need not increase the row count. Authenticity of the caller's
  supplied prior revision and generation of its audit drafts remain separate
  correspondence obligations.
- SQLx queues rollback when a transaction is dropped. A returned error does not
  by itself establish completed rollback or released locks. A lost commit response
  can leave committed data; commit, abort and response delivery are separate events.
- PostgreSQL atomicity, isolation, locks and constraints are external assumptions.
  Sequence allocation and physical crash durability are excluded. Core's private
  fixture disables fsync, synchronous_commit and full_page_writes.

This is a design model, not extraction of the asynchronous Rust endpoint or formal
SQL refinement. Source review and concurrent PostgreSQL tests do not change that
classification. Replica adoption, Task-route cascades and other writers need later
composition.

## Checks completed and failures retained

The first Linux model build failed on a nested-record syntax error. After that
repair, `lake build PublicationModel` passed in 6.625 seconds with Lean 4.35.0.
The proof file did not pass: subsequent direct checks exposed unfinished algebra
and invariant-instantiation steps. Their axiom guards rejected Lean's recovery
`sorryAx`; these failed declarations are not accepted proofs. In the latest direct
packet-5 diagnostic, two staged/remaining invariant cases remain unresolved.
These are proof-development failures, not established production counterexamples.

The first SQLx preparation failed because the new test module reused the existing
inline module's name. The fix names the new module `publication_tests` and leaves
the existing tests intact. The corrected isolated preparation used PostgreSQL
18.6 on macOS, exact Core and Hub migrations, and:

```text
cargo sqlx prepare --no-dotenv --workspace --all -- --package veoveo-hub --all-targets --all-features
```

That command passed in 18.333 seconds. The metadata directory grew from 251 to 255
records: exactly four additions, with no changed, deleted or unrelated records.
Root independently matched each record's query text, SHA-256 and filename to
`connection.sql`, `lock.sql`, `blocked.sql` and `snapshot.sql`. Only those four
records were adopted. The private database stopped successfully. This is query
preparation and compilation evidence, not execution of the new tests.

The two native tests are ready for a separate baseline: one appends the real audit
batch and then fails before commit; the other holds a real publisher, observes a
second writer blocked on its lock, and checks the winner's exact configuration and
successful audit batch. Later private fault controls will omit the predecessor
comparison and split commit from audit. No result for those tests or faults is
claimed here.

## Input and evidence identities

Hub base: `bb2e97f5c984a53eaa218109e4c01a70e952e365`.
SDK pin: `239622d12c08b771cc5e813fe3e846385d8d04ad`.
Core pin: `120306eb969c6134dadd422dca701a2ce63e9492`.
The current native checkpoint contains 76 overlay paths; its archive is
`625f62aebc2509448c453d93420078c9971dfdd4ae3181ba11ae7010f72069de`
and its manifest is
`1593c899760c13c5b32c94050f296345343c6a78e47eb3eeae42052385e186c0`.

Local evidence is under `/tmp/hub-control-publication-20261030/`:

- `evidence-checkpoint-run2/summary.json`:
  `cad34d954db05aaa2496800379ab84f859b89d7dfa2589693795545861994c32`;
- `evidence-proof5-direct-run1/summary.json`:
  `607bc415cc8f12ea59b8f7ef6f427584329fe6020d84d6cea16a0fc5301647fd`;
- `sqlx-prepare-run2/summary.json`:
  `d71b17250f0b970df9e2760f8770812276266a6d82ffeed810ef86d11a36a8b7`.

The finite-history single-winner proof, reachable initial/replacement and uncertain
commit executions, native baseline, deliberate faults and restored validation are
still pending. Source and evidence remain uncommitted.
