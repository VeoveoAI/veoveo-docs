# Refresh concurrency slice qualification

The refresh binding/delivery predicates and retained-family transaction design
model are qualified within the boundaries below. This closes the current refresh
concurrency slice, not the whole OAuth lifecycle or Hub formal-verification goal.

The extracted predicates prove exact binding, complete delivery acceptance and
refusal, strict delivery-window boundaries, checked generation arithmetic and
generation-only session-admission preservation. The transaction model connects
chosen programs to reachable complete commits, preserves family-lock snapshots,
proves strictly increasing committed generations, and replays actual step
contributions while excluding aborted attempts.

Positive executions construct valid initial rows, an overlapping rotation and
retry, both successful acknowledgements, the same original successor, and exact
family/token/audit maps. The final uncertainty proofs reach a legitimate committing
prefix with all writes staged. An observed error can then accompany either a
complete commit or a complete abort, with explicit distinct terminal phases and
their exact database effects. A separate execution commits first and loses its
acknowledgement. These are model executions, not native network fault injections.

GPT-6.1 Sol implemented the source/model proofs and tests; GPT-6 Luna ran frozen
logged checks; GPT-6 Astra reviewed the statements, source mapping and evidence.
Review strengthened replay to tie contributions to actual model steps, and
uncertainty to expose committed/aborted phases in the theorem statements. The
underlying operational model and production behavior did not change during these
proof additions.

Evidence classes remain separate:

- **Extracted production decisions:** the two actual Rust predicates translate
  through the pinned Charon/Aeneas path. The full existing predicate package and
  five audits pass after fresh original extraction. The eight new predicate
  theorem closures use only standard Lean axioms. Exact pins, timings and hashes
  are in the [predicate/control qualification](2026-10-30-refresh-controls-qualification.md).
- **Transaction-model proofs:** the final nine-module package builds in 4.731
  seconds with the committed predicate dependency. The final strengthened uncertainty direct
  check passed in 3.507 seconds; its three audited closures use only standard
  Lean axioms. Exact full-package timing and frozen source/log identities are in
  the [final receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/evidence/refresh-transactions-receipt.json).
  Earlier milestones cover [complete staging](2026-10-30-refresh-program-prefix.md),
  [generation history](2026-10-30-refresh-generation-history.md),
  [traced replay](2026-10-30-refresh-transaction-replay.md), and
  [concurrent success](2026-10-30-refresh-concurrent-success.md).
- **Native component evidence:** four new PostgreSQL tests and five existing
  `hub_state` tests passed, with formatting and strict library Clippy. They use
  actual observed database blocking, real audit append and state-layer cipher
  operations; the duplicate-success case checks the recovered plaintext and
  complete stored state/audits. See the [native baseline](2026-10-30-refresh-native-baseline.md).
- **Fault sensitivity and restoration:** deadline equality and client-binding
  bypass each break the unchanged extracted proof and the intended native
  assertion. Premature native commit before audit produces generation 1 after
  audit failure where rollback requires 0. A separately compilable premature-ready
  model breaks the complete-staging invariant. Original native, extraction and
  model baselines pass after restoration; see the
  [model control](2026-10-30-refresh-completeness-control.md). Failed-proof
  recovery axioms and setup failures receive no semantic credit.

The runtime refresh bodies match the inspected `bb2e97f` source. The only changes
to those two Rust modules are a test-only child module and a correction to the
comment about independent retention locks. Test queries/SQLx metadata and proof
artifacts are committed separately. Later proof-only additions did not trigger
repeated native suites. No deployment, provider-model call, runtime authorization
rule, CI hook or new infrastructure was introduced.

The formal model covers one retained family incarnation and single-shot attempt
identities. It permits independent token maintenance and preserves the request's
pre-lock time sample; positive witnesses choose compatible retained records and
live delivery windows. It does not assume all token writers hold a family lock.
First revocation reason/time are preserved, including the existing logout/replay
distinction; no stronger security policy was added.

Remaining boundaries are explicit: initial-family creation; native row decoding
and caller/preflight correspondence; SQL, schema and async-Rust refinement;
PostgreSQL lock/constraint/atomicity primitives; crypto, entropy and timestamp
representation; physical durability; HTTP delivery; unconditional progress and
deployment-wide recovery. The separate family-pruning/retained-Task compromise
question stays open in HUB-CLEANUP-01 and is not silently resolved by this slice.

Hub commit `3c0d3bf` contains the final uncertainty proofs, aggregate receipt and
coverage update. Earlier staging, generation, replay and concurrent-success
milestones remain separate commits. These are local commits; this slice does not
claim they have been pushed or deployed.

Registration/replacement concurrency is next. Its two admission paths, database
boundaries, post-commit audits and existing replica semantics must be traced before
specifying its model or changing production behavior.
