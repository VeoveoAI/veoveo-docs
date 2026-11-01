# Populated registration UPDATE preserves data and appends its audit

The populated matched-update witness passes Lean. It constructs nine actual model
transitions from an admitted two-replica seed through successful store return, and
checks independent complete database and audit results. This is a handwritten
store-model execution, not a new native test or formal SQL refinement.

GPT-6.1 Sol wrote the three modules, GPT-6 Luna ran the Linux checks, and GPT-6 Astra
reviewed the input/output values, transition constructors, repairs, logs, guards
and copied artifacts. The source basis is Hub
`2ca71cafdab78c9bc9953d9c392291d61bc67a97`; native Rust/SQL remains byte-identical
to qualified `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`. No runtime, dependency,
authorization, deployment, CI or paid-model changes accompany this proof.
Hub commit `ec18fae82dbe843cf0ba351bc10ef25db7dd99c9`, pushed to `origin/main`,
records the checked witness and its coverage update.

## Exact scenario and result

One admitted deployment starts with clients 30 and 31, logins 40 and 41, and
unrelated login 99. Client 30 has issuance time 11 and update time 12; client 31
has issuance 21, update 22 and orphaned time 23. Each has its own complete modeled
statement, digest and stable remainder. The retained storage binding and unrelated
frame are explicit. The seed satisfies the inherited key/login presence and
uniqueness constraints. Selected metadata admission, matching digest, changed
metadata and the current row are proved; native parsing/signatures and creation
of this seed remain outside the proof.

Actor 0 requests metadata version 2, the new signed-statement payload and update
time 99 for client 30. Both metadata versions retain server `fixture-service`, as
native admission requires. The nine constructed steps are preflight, transaction
begin, deployment write/lock, current-row match/write, audit-program capture,
private Core append, commit request, combined commit, and successful acknowledgment.

The independent expected database changes only deployment metadata and client 30's
metadata, statement and update time. Client/login identity, token digest, issuance
11, the complete stable remainder, client 31, all roles and unrelated state remain.
The output specification does not call the model's update or commit executor.

Prior complete audit record 900 is Register for `unrelated-fixture-server`, with
draft time 987654321 ns and stored time 987654 µs. New locally fresh record 100 is
Update for `fixture-service`, with draft time 123456789 ns and stored time 123456 µs.
The expected ledger contains exactly both full records and no others. Before
commit, the original database and ledger remain visible while both writes and the
new record are private and actor 0 holds the lock. Final acceptance checks the
complete database, ledger, transaction and cursor maps, sole update event, released
lock and ordinary store success. It does not construct native ClientInformation.

The [fixture source](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationAuditedUpdateWitnesses.lean)
contains all literal input and expected values. Its separate execution module is
importable without the generic audited UPDATE correctness proof or output
acceptance. The optional append follows the actual cursor, so a later missing-
instruction control can retain a legal execution. That control has not run yet.

## Measured proof checks

Each attempt ran one `LAKE_NO_UPDATE=1 lake build
RegistrationAuditedUpdateWitnessProof` command under an external 180-second limit,
with Lean 4.35.0 on Linux and unchanged default heartbeat limits:

1. First attempt: **FAIL**, 35.272 s. The fixture compiled; two missing Decidable
   instances prevented the execution module from completing. Explicit equality
   proofs replaced those two proof-body terms, without changing admission.
2. Second attempt: **FAIL**, 37.877 s. Fixture and execution compiled. Three
   acceptance equalities needed additional reductions for untouched ledger/map
   entries. Targeted projection proofs replaced excessive whole-state unfolding.
3. Final attempt: **PASS**, 37.729 s. All three new modules built; all 15 declaration
   guards and nine printed closures pass. Only `propext` and `Quot.sound` occur;
   admission and precommit-privacy closures require no axioms.

These are authoring repairs, not discovered production defects or semantic fault
controls. Declaration counts are not scenario counts. The final log reports 3,155
Lake graph jobs; that does not mean 3,155 fresh module compilations. The three new
module build lines report approximately 2.0, 2.2 and 2.1 seconds within the total.
Compiler style/deprecation warnings remain, with no axiom-guard bypass.

Successful copied artifacts are 502,752 bytes (Witnesses), 271,224 bytes
(WitnessExecution), and 162,744 bytes (WitnessProof). The Proof SHA-256 is
`35c94b478d58afb2047849fd1a693c97b30b026e960845e4d137806de77d9eff`.
All forty-three source files, eighteen local imported modules and tool identities
match their recorded maps before and after compilation.

## Setup and reporting failures

The RustDesk SSH route briefly timed out or dropped during staging before any
compiler started. Reusing a task-owned SSH connection recovered staging without
changing user connection settings. The Mac toolchain was inspected as a fallback
but was not used. An obsolete unrelated-module check in the temporary validation
script stopped one precompile attempt and was removed. A copied second-attempt
archive contained old bytes; it was preserved, and a new archive was built from
the authoritative frozen source map before compilation.

After the final compiler exited 0, the wrapper's artifact report looked for
`.lean.olean` instead of `.olean`. The wrapper exited 1 and its raw summary retains
`complete: false`. The compiler log, recorded command exit and three actual output
files independently establish the successful build. A supplemental receipt names
the correct files and hashes; the raw failure was not overwritten and the compiler
was not rerun for this bookkeeping mistake.

## Evidence and remaining work

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-update-success.json)
retains source/import/tool identities, scenario inputs, all command outcomes,
artifact sizes/hashes, repair boundaries and the reporting correction. Full logs
and outputs remain at
`/tmp/hub-registration-audit-20261101/audited-update-witness-checkpoint3-mirror/`.
Raw summary SHA-256:
`251516bf93ccf453f9c055827a145596ac6859b655a55c36cb07a03257f149c8`.
Correction SHA-256:
`379a592d4b1750fd06f17e12e45b4eb7f9203232931c94412d04edf0a28d2ace`.

PostgreSQL atomicity/locks, native Core append and source projections remain
interpretation contracts. Complete modeled payload equality does not establish
native serialization or crypto. No new native tests, deployed probes or
model-driven acceptance were run. Next are audit refusal with confirmed abort and
fresh retry, actual replacement followed by stale no-op with explicit external
audit, then an omitted-Update control and exact restoration.
