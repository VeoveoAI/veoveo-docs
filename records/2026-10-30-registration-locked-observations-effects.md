# Locked registration observations and exact effects

Hub commit `2231825` adds three checked ingredients for registration concurrency:
exclusive active lock ownership, stable observations against current committed
state, and exact write effects against an independent sequential specification.
The [previous milestone](2026-10-30-registration-program-completeness.md) already
established complete staging before commit. These results are not yet composed
into the full serial-history theorem.

`active_owner_unique` derives that two active attempts must have the same
transaction identity. `reached_observations` then shows that an ordinary
registration's observed metadata, and replacement's captured DELETE rows, still
describe the current committed database throughout active phases including
commit-pending. Completed and abort-pending phases are excluded. Another
transaction cannot commit while such an attempt owns the deployment lock.

`admit_exact` equates the complete admission program with the independent
replica-addition specification. `replacement_exact` equates the complete
replacement program with the independently specified metadata, registration and
login maps: old registrations and their logins disappear, the complete candidate
and role are added, and unrelated logins and disjoint application data survive.
The latter theorem assumes an exact current row listing; the observation theorem
derives that listing for reachable active replacement attempts. It does not
re-execute DELETE against later rows at commit.

## Execution and evidence

GPT-6.1 Sol implemented the Lean proofs, GPT-6 Luna checked frozen sources on
Linux, and GPT-6 Astra reviewed the statements and committed the milestone.
The existing Lean 4.35.0 cache and Aeneas framework revision
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf` were reused. No Rust extraction was
performed for these handwritten transaction models.

Direct `lake env lean` checks passed for Locks in 3.57 seconds, Effects in
2.73 seconds and Observations in 5.75 seconds. One composed `lake build` then
passed all six package targets in 7.14 seconds. The axiom closures are:

- Lock ownership and exact admission: `propext`.
- Stable observations: `propext`, `Quot.sound`.
- Exact replacement: `propext`, `Classical.choice`, `Quot.sound`.

No audited declaration uses `sorryAx` or an unreviewed axiom. Unused-variable and
deprecated tactic-name warnings remain. The
[committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/locked-observations-effects.json)
records nine frozen source/configuration hashes, exact commands, log and timing
hashes, theorem claims and limits. The composed log hash is
`cb0080fe` (full identity in the receipt); its source hash list matches the
committed proof packet.

During development, the observation proof initially failed to rule out a
different committing transaction. The repair explicitly applies ownership to
both identities and derives their equality, contradicting that case. This
required no model or runtime change. Earlier effect-proof failures were map and
membership algebra errors; they are not semantic fault-control evidence.

This milestone changes no runtime code and does not repeat the already qualified
[native race regression](2026-10-30-registration-replica-replacement-race.md).
No deployment, provider/model call or CI hook was involved. The commit is local,
not pushed.

## Remaining boundary

The next work composes actual commit events into an independent serial history,
excludes aborted attempts, constructs valid replica/replacement executions and
proves the original unlocked-read counterexample. Broader registration coverage
still includes per-client updates, removal, housekeeping, namespace/key changes,
external-environment preparation and post-commit audit/catalog adoption.

These proofs cover one retained deployment with an already admitted fixed
namespace/key. SQL isolation, locking and constraint semantics, native field
projection, Core login/schema operations and correspondence to asynchronous
Rust remain explicit boundaries. No formal SQL refinement, liveness guarantee
or whole-Hub verification is claimed.
