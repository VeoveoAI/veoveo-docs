# Factory watcher: parent updates composed with queued notifications

Hub `dd6bd84` publishes the manual Factory watcher proof composing two actual
modeled operations.
The second starts from the first operation's resulting state. Lean checks
19 lemmas and four definition closures, with all 23 executable axiom guards
passing. Production source and the accepted Factory/watcher models are unchanged.
This is a checked proof checkpoint, not completion of the watcher qualification.

Source: [history proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherHistoryProof.lean),
[source correspondence and compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/WATCHER_SOURCE.md#checked-parent-and-queued-update-histories).
It extends the [watcher foundation](2026-10-31-factory-watcher-foundation.md).
The earlier [native correction and five regressions](2026-10-31-factory-preparation-serialization.md)
are separate component evidence, not formal SQL refinement.

## Checked guarantees

- `parent_full_output` constructs the parent's request from source inputs and
  resolution observations, derives acceptance from no-fault/capacity facts and
  preserves the complete row, native observation, provider material, creation
  request, client projection and unrelated state. Success and desired final
  values are not supplied as premises.
- Intermediate row identity, key membership and uniqueness follow from the
  existing `apply_identity` contract. The continuation reads the projection of
  the row the first operation actually produced, under the explicit SQL-read
  consistency assumption.
- `parent_retarget_then_obsolete` preserves that whole resulting state when a
  queued notification names the old repository or the old tracked branch ID
  within the same repository. It makes no Factory attempt and retains the new
  complete client projection. A current-row query error also leaves it unchanged.
- `parent_program_then_relevant` accepts a captured candidate after the parent
  program advances while its target stays the same. It constructs preparation
  arguments and the next request using the current applied parent revision and
  pusher, source-returned own entries, and the incoming linked revision/pusher.
  Complete outputs and unrelated-state preservation compose across both calls;
  equality with captured parent metadata is not required.
- A parent current-row query error still invokes resolution with `None` rather
  than silently skipping the operation. Status publication preserves every other
  complete failure key, including its watched-deployment component, and retains
  committed-versus-acknowledged outcomes.

These are handwritten model proofs, not extracted async Rust. They retain the
previous process-local lock, valid schema/identity, native observation, resolver
and SQL consistency assumptions. They do not verify PostgreSQL or Tokio, add a
runtime rule, or establish a cross-replica order. Source responses are indexed by
the actual requested arguments but their implementations remain external to this
proof. The parent is the current **applied** program, not necessarily Lore's latest
head. Issued `branch@LATEST` arguments do not prove the bytes checked out at the
recorded revision.

## Execution

GPT-6.1 Sol authored the proof; GPT-6 Astra reviewed the statements, source
correspondence, repair diff and full compiler/audit output. GPT-6 Luna ran the
bounded, unattended manual check on Ubuntu x86_64 with Lean **4.35.0** and Mathlib
**56a005855ea17e0b0958f73ec801ae140b0a1679**:

```sh
LAKE_NO_UPDATE=1 lake env lean FactoryWatcherHistoryProof.lean -o .lake/build/lib/lean/FactoryWatcherHistoryProof.olean
```

It passed in **5.773 seconds**, within a 180-second bound. All 23 guards passed;
seven printed dependency closures contain only `propext`, `Classical.choice`
and `Quot.sound`. The log contains unused section-variable and simp-argument
warnings. The 12-file source map and seven prerequisite source/artifact pairs
were unchanged, and the new artifact did not exist before the check.

The first attempt failed in 19.701 seconds, producing no artifact. A reserved
identifier, case-rewritten row equality and incomplete record-equality tactic
caused downstream missing-helper and `sorryAx` audit failures. The successful
retry repaired only those three authoring sites; explicit conditions and results
were unchanged. These failures were neither production defects nor deliberate
semantic controls.

Runtime basis remains Hub `a69e3cba3f9865e06e1db5ff77d1562ac468338a`, with proof
main basis `2ea8eb8`. No production file, dependency pin or accepted model changed.
No application tests, deployed probes, deployment or paid model calls ran for
this proof-only checkpoint. The new Lake target is manual and nondefault.

## Evidence identities

Temporary root: `/tmp/hub-factory-concurrent-preparation-20261031/`.
Raw logs/artifacts stay temporary; source, statements, manual target and the
compact receipt are committed.

- Proof source: 26,424 bytes, SHA-256
  `4071052dd897c4fab68c1d81dd3b12e952eef2076ec1029edebd05d91d2efb1c`.
- Accepted artifact: 710,016 bytes, SHA-256
  `05b0abe7dcd9e4c991f90f6fb234932c0a7e2eaca01145e6a5378cf5b025da9c`.
- Input receipt SHA-256:
  `3ad782244150f39e6d9bddeebf8609c4d4a00b5fdc9c1a08d8820c83b0cf6e0d`.
- Unchanged source-map digest:
  `58e2140081e30aa1b2626d2a27843206941a90dc8ff90f536a896c64a0225bcd`.
- `watcher-history-check2-mirror/evidence-run1/summary.json` SHA-256:
  `a66b9d8f093d050bc159debc579bd414b60e3b04df2346c126e6599161cbb4a1`.
- Successful full log: 4,482 bytes, SHA-256
  `5b5bee4a3ad6984c714bcb7381d40d8922b5b5db7e9e7c388e087aecbe28bfd2`.
- First-attempt full log: 5,600 bytes, SHA-256
  `bc9088b334f84bb504c5b356a03cbca971285db77aebb0027630a01f9dc4c16c`.

Still pending in this slice: detailed recorded fallback and failure publication
ordering, the explicitly bounded completed-deletion history, populated complete
output witnesses and two deliberate model faults with exact restoration.
Saved-parent retry/membership freshness, native allocation/cleanup, concurrent
registration publication, replicas, crash/nonreturn and eventual recovery remain
separate obligations. The overall Hub verification goal remains active.
