# Shared registration locks and current update observations

Hub commit `9518418` connects the previously proved update program to the current
database, using shared-lock invariants derived over every finite modeled mixed
register/replace/update execution. This is the next checkpoint after
[update program and field effects](2026-10-30-registration-update-program-effects.md),
with no production change or additional runtime check.

## Checked guarantees

`RegistrationUpdateLocks.lean` lifts the original registration prefix and branch
choice proofs through actual mixed steps. It derives both methods' ownership of
the same deployment lock and their physical transaction classification. Active
holding phases of registration and update cannot overlap. Waiting and completed
attempts may coexist normally. Failed updates with private writes keep their
ownership until the actual abort, rather than releasing on a caller-side failure.

`RegistrationUpdateObservations.lean` establishes that the original full-metadata
and captured DELETE observations remain current while held. An update's current
keyed row equals the row its UPDATE matched, from the ready phase through the
commit request. Combining that with the earlier complete staged program now proves
that actual update commit has the independent `sequentialUpdate` effect on the
current database; its correctness is not a guard built into primitive commit.

The no-op path also refers to current state: while rollback is pending with the
no-op outcome, its requested row is absent and the independent operation is the
identity. The prior rollback theorem supplies exact preservation at that immediate
transition. Neither result claims persistent absence in arbitrary later aborted
states or through a delayed success acknowledgement; another writer may proceed
after the lock is released.

## Validation

GPT-6.1 Sol implemented the two modules, GPT-6 Luna ran the bounded logged Linux
x86_64 checks, and GPT-6 Astra reviewed the claims, code and evidence. The existing
Lean 4.35.0 package and dependency cache were reused.

- Direct shared-lock proof: exit 0 in 3.99 seconds.
- Direct current-state proof: exit 0 in 4.07 seconds. Its later comment clarification
  limits the no-op theorem to the pending boundary; the final package checked those
  exact edited bytes.
- One composed `LAKE_NO_UPDATE=1 lake build`: exit 0 in 8.478 seconds, fourteen
  default modules, 3164 reported jobs including dependencies.
- All five new named theorem closures use only `propext` and `Quot.sound`. No
  `sorryAx` appears in the successful checks. Section-variable warnings remain.
- All seventeen source/config identities matched before and after the package
  build and the committed local files. The prior twelve modules, tool/dependency
  pins and native source are unchanged.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/update-stability.json)
contains the exact theorem claims, source and log hashes, commands and timings.
Two earlier lock drafts needed explicit phase/nonidle proof arguments; these were
proof-development errors, not semantic negative controls. No native test, full
Docker gate, deployment, Aeneas extraction or model call ran for this checkpoint.

## Remaining boundary

Mixed independent serial histories, general aborted-event exclusion, constructive
complete update/no-op executions and the old-update counterexample remain next.
The previously stated one-deployment/admission and PostgreSQL assumptions still
apply. Removal, housekeeping, broader authority/identity composition, SQL/Core
refinement, service postcommit behavior and liveness/deployed recovery remain open.
This is a checked source-mapped design model, not formal Rust/SQL refinement or
whole-Hub verification. The commit is local and has not been pushed or deployed.
