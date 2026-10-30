# Registration commit-order equivalence and abort exclusion

Hub commit `f43441c` proves that every finite execution of the fixed registration
transaction model has the same registration, metadata and login state as the
independent sequential operations in actual server-commit order. An aborted
attempt cannot occur in that committed history. These are model guarantees for
ordinary replica admission and deployment replacement, not a proof of all Hub
registration paths or formal SQL refinement.

## What is connected

The proof derives each attempt's original request and whether it chose replica
addition or replacement from the actual transitions. Combined with the checked
[staging](2026-10-30-registration-program-completeness.md) and
[lock/observation/effect](2026-10-30-registration-locked-observations-effects.md)
invariants, `committing_effect` equates every reached commit with the independent
operation on current committed state. Primitive commit still has no
application-correctness guard.

`execution_serial` inducts over all finite modeled interleavings and uses the
state's actual commit events and their original requests. It does not invent a
trace to fit the final state or define the specification as staged-write replay.
Only disjoint application-frame changes are normalized. The theorem does not
need the weaker specification's initial well-formedness premise.

`aborted_event_excluded` derives that no event bears an aborted attempt's
identity: an event records a server commit, and that attempt's committed phase
cannot subsequently become aborted. This excludes the attempt's contribution,
not pre-existing equal row values or equal values written by another attempt.
`serial_history_and_abort` establishes both facts for the same reached state.
A later replacement can still remove a registration before its successful
acknowledgement reaches the caller; response order and current survival are not
the serial-history claim.

## Qualification

GPT-6.1 Sol implemented the new History module, GPT-6 Luna checked frozen sources
on Linux, and GPT-6 Astra reviewed the specification connection and committed the
milestone. The existing Lean 4.35.0 and pinned Aeneas dependency cache were reused.
No runtime or prerequisite proof-module semantics changed.

The final direct `lake env lean /tmp/RegistrationHistory-packet8.lean` check
passed in 7.17 seconds. One composed `lake build` passed all seven package
targets in 8.45 seconds. `committing_effect`, `execution_serial` and the composed
theorem have exactly `propext`, `Classical.choice` and `Quot.sound` in their
axiom closure. Abort exclusion uses only `propext`. No audited declaration has
`sorryAx` or an unreviewed axiom; existing unused-variable and tactic-name
warnings remain.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/serial-history.json)
records ten frozen source/configuration hashes, commands, measured timings and
log identities. The
[proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationHistory.lean)
contains the operational branch invariant, per-commit theorem, history induction
and abort exclusion.

Development failures concerned equal transaction indices and simplification of
metadata/record projections in the frame-commutation lemma. The repair kept the
already passing negative branch and applied the metadata equality after exposing
the positive record projection. These were proof-algebra failures, not semantic
fault controls or application failures. The previously qualified native tests
were not rerun for this proof-only change. No deployment, OpenCode acceptance or
CI hook was involved. This commit is local, not pushed.

## Remaining work

Constructive valid replica/replacement executions and an original-protocol
counterexample remain before this first slice is qualified. The latter must
preserve the original replacement upsert lock and statement-time DELETE result,
reproducing the native race rather than weakening unrelated database behavior.

The model covers one retained deployment and admitted fixed namespace/key.
PostgreSQL isolation, locking and constraints, native payload projection, Core
schema/login operations and asynchronous-store correspondence remain explicit
boundaries. Per-client updates, removal, housekeeping, key/authority changes,
cross-database preparation and post-commit service audit/catalog adoption are
later obligations.

Read-only review identifies a specific next hypothesis for the update slice:
`RegistrationService::update` authenticates before entering the store transaction;
`RegistrationStore::update` ignores the affected row count of its registration
UPDATE, then updates deployment metadata unconditionally. A replacement between
authentication and the store transaction may leave a stale caller changing the
new deployment. This has
not yet been reproduced. A deterministic actual-store probe must establish the
behavior before choosing a fix or extending the model.
