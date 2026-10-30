# Original replica commits during locked replacement

Hub commit `82be7bd` checks the original registration protocol's stale-capture
midpoint. It is a complete reachability proof for this intermediate state; finishing
replacement and refuting the independent serial contract remain pending.

The fixture starts with a valid seed registration and login. A reads matching
metadata without locking and stages its login creation. B reads changed metadata,
takes the actual replacement upsert lock, captures only the seed registration and
stages its deletion and login drop. A then inserts, commits and acknowledges
success. Lean proves the database equals the independent first-replica result,
B still owns the deployment lock, B is ready to create its own login, and B's
captured client list is still just the seed. No replacement lock is bypassed.

Metadata, complete row and role payloads, and unrelated application state remain
parametric. The mathematical client/login representatives are the same as the
previous positive witnesses. Every selected statement guard is discharged from
the fixture; the transaction model and runtime code are unchanged.

GPT-6.1 Sol implemented the proof, GPT-6 Luna checked its frozen bytes on Linux,
and GPT-6 Astra reviewed the source, actual audit output and commit. The command
`lake env lean /tmp/RegistrationWitnesses-packet14.lean` passed in 34.28 seconds.
Source SHA-256 is
`b36088c7b58a6bc45df8fc046dffcae214419f5031cdd3ad6ed681af68085c93`.
The midpoint helper uses only `propext` and `Quot.sound`; existing public theorem
closures are unchanged, with no `sorryAx` or unreviewed axiom. The builder's initial
summary mistakenly included `Classical.choice` for this helper; the record uses
the actual audit output, and that reporting error was corrected without a rerun.

An earlier proof construction was deliberately terminated at a five-minute resource
cap (307.69 seconds including shutdown, exit 143), with no proof verdict. Splitting
the same nested state construction into smaller lemmas, then repairing record
layout and conditional simplification, produced the checked result. No model
semantics or proof budgets changed. The capped attempt is incomplete validation,
not a semantic fault-control result or a claim about the exact elaborator hot spot.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/original-midpoint.json)
contains source, log and timing hashes. This direct check covers the complete
updated witness module against unchanged prerequisites. No native test, extraction,
deployment or model-driven acceptance was repeated for this proof-only milestone.

The native race and lock fix are already separately qualified. This model result
does not establish formal Rust/SQL refinement, unconditional progress, per-client
update/removal correctness or broader registration lifecycle coverage. The commit
is local and has not been pushed.
