# Refresh transaction completeness fault control

A deliberate mutation now checks sensitivity of the committed refresh transaction
completeness proof. The model normally enters its ready phase only when no writes
remain to be staged. Replacing that premise with `True` leaves the constructor
name and arity intact but permits premature readiness.

GPT-6 Astra selected and reviewed this control; GPT-6 Luna executed it on Linux
with Lean 4.35.0 in a private copy of the compiled package. The modified model
compiled in 4.571 seconds. The unchanged proof failed in 5.123 seconds: inside
`alignment_step`, the available prefix equation `staged ++ remaining = program`
could not establish `remaining = []`. The dependent
`committing_program_complete` theorem consequently failed its axiom audit. The
reported `sorryAx` was failed-proof recovery, not an accepted proof assumption.

This is a semantic proof obligation exposed by a compilable weaker model. It is
not a concrete Lean counterexample or a proof of `False`. The separately checked
native split-commit mutation already supplies the concrete audit-failure result:
generation advances to 1 when rollback should retain 0. See the
[native and predicate controls record](2026-10-30-refresh-controls-qualification.md).

Restoring the exact original model made its build pass in 4.557 seconds and the
unchanged proof pass in 5.256 seconds. Model SHA-256 is
`ea64493f1fb70ec5303df18d24f6b931f86e231f7eae4cfd05d0edf6a9a0ddc5`;
the proof remains
`a92c92858848ceba6f163fc55a427df787102f726258e03a3e6d4c637bbb1038`.
An initial private-copy layout failed to resolve the existing sibling package
before compilation; it was corrected and receives no semantic credit.

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/evidence/completeness-control.json)
records the exact mutation, commands, source/log hashes and restored checks.
Original shared sources and the green compiled package remained untouched. No
native tests were repeated because this control changed only an isolated Lean
model. No deployment, production behavior, authorization rule or CI hook changed.
The transaction slice remains in progress; replay and positive concurrent
execution proofs have separate acceptance obligations.
