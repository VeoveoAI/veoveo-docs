# Registration concurrency: fixed history and original counterexample

Hub commit `a81726a` completes the first retained-deployment register/replace
concurrency slice. The fixed protocol's general history theorem, valid successful
and aborted executions, and the original protocol's completed counterexample are
checked together. `HUB-REGISTER-01` and the comprehensive verification goal remain
partial; per-client updates, removal and broader authority composition are next.

## Concrete result

The native race and minimal fix were already committed in `05737d6`. An ordinary
replica could read matching deployment metadata without locking, then pause before
its insert. Replacement could delete the rows it saw before that replica committed.
Both calls succeeded, leaving old and new registrations and logins. Taking the
deployment row lock before the ordinary metadata comparison fixes this schedule.
The existing instance replacement already takes that lock through its upsert.

`original_overlap_is_not_serial` now constructs the same critical schedule in the
transaction model, from a proved well-formed seed. A stages its login; B takes the
real replacement lock, captures only the seed, and stages its deletion and login
drop. A then inserts, commits and acknowledges success while B still owns its lock.
B completes its own login creation, insert, commit and acknowledgement.

The theorem proves the entire final map:
`expectedReplica (expectedReplacement seed B) A`. It contains both A and B with B's
deployment metadata, removes the seed, and preserves unrelated login and application
state. Both responses are successful, the lock is released and actual commit IDs
are `[0, 1]`. This unchecked addition of A is not the sequential registration
operation for A. An independent sequential fold over the actual event IDs requires
A to be absent after B, contradicting the proved final map. The theorem refutes the
defined actual-commit-order contract; it does not claim a separate proof over every
alternative serialization order.

Metadata, complete row and role payloads, and disjoint application state stay
parametric. The mathematical fixture uses seed client 0/login 10, A client 1/login
11, B client 2/login 12, and unrelated login 99, with unequal old/new metadata.
All selected statement constraints are proved from the fixture. Primitive commit
has no correctness oracle, and the original replacement lock is never bypassed.

For the fixed protocol, the package proves complete ordered staging, exclusive
active lock ownership, stable metadata and DELETE observations, exact independent
commit effects, serial histories for every finite modeled interleaving and exclusion
of aborted attempts from actual commit events. Constructed traces cover valid
replicas, successful same-metadata overlap, changed-metadata ordinary replacement,
unconditional instance replacement including equal metadata, and abort after private
writes. The old and fixed results use the same model and independent specification.

## Execution and evidence

GPT-6.1 Sol implemented the proofs, GPT-6 Luna ran the logged Linux checks, and
GPT-6 Astra reviewed source, audits, scope and commits. The complete Witnesses module
passed `LAKE_NO_UPDATE=1 lake env lean RegistrationWitnesses.lean` in **33.15 seconds**.
The final eight-target `LAKE_NO_UPDATE=1 lake build` passed in **58.35 seconds**
(3,152 reported jobs including dependencies). Lean is pinned to 4.35.0; Aeneas's
proof toolkit is pinned to `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`.

All eleven source/configuration hashes matched before and after the final build.
The counterexample uses `propext`, `Classical.choice` and `Quot.sound`. All seventeen
audited declarations use only their recorded subset of those standard axioms;
none uses `sorryAx` or an unreviewed axiom. Existing unused-variable/simp/tactic
warnings remain. The
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/registration-transactions-receipt.json)
records exact commands, source identities, per-declaration axioms, log/timing hashes
and the original/fixed claims.

One intermediate completed-counterexample check failed on proof-local state aliases
and row-equality elimination. Explicitly typing the state projections repaired those
goals without changing the model or theorem. A separate missing-file copy attempt
failed before Lean started; the verified source was transferred before the one
successful direct run. Neither is a semantic fault-control result. The earlier
resource-capped prefix attempt is recorded in the
[midpoint milestone](2026-10-30-registration-original-midpoint.md).

The nine files in the [native evidence](2026-10-30-registration-replica-replacement-race.md)
were rehashed and are unchanged. That evidence remains separate: the original
actual-store regression failed, its unchanged assertions passed after the lock fix,
and six existing instance-registration integration tests, formatting and strict
library Clippy passed. Those native checks were not repeated for these proof-only
changes. No deployment or model-driven acceptance ran.

## Boundary and next work

This is a handwritten Lean transaction model mapped to reviewed Rust/SQL, not an
Aeneas extraction of asynchronous transactions or formal SQL refinement. PostgreSQL
READ COMMITTED visibility, atomicity, locks and constraints, Core schema/login
internals, native payload projection and request admission remain boundaries.
Full captured rows are proof-level witnesses; native DELETE returns only client,
server and login fields. No extra native snapshot or authorization rule was added.
Candidate metadata remains arbitrary, including admitted instance key changes;
external namespace-claim changes are outside this slice.

A success response does not guarantee survival after later replacement. Constructed
traces prove reachability, not unconditional progress or deployed durability. Initial
deployment creation, per-client update/removal, housekeeping, external-database
preparation and post-commit audit/catalog adoption remain open. The next native
probe addresses the source-review hypothesis that an update authenticated before
replacement can overwrite replacement metadata after its original row is gone.
That hypothesis is not yet confirmed. This qualification is committed locally;
it is not pushed or deployed.
