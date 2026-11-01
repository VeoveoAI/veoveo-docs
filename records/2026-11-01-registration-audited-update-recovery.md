# Registration UPDATE audit refusal, explicit abort and successful retry

Lean checked a populated recovery schedule with sixteen actual model transitions.
The failed attempt preserves the complete committed database and audit ledger;
only an explicit abort releases its lock. A fresh attempt then succeeds with the
independently specified complete result. This is a handwritten store-model proof,
not a new native execution or formal SQL refinement.

GPT-6.1 Sol authored the two modules, GPT-6 Luna compiled them on Linux, and
GPT-6 Astra reviewed the actual transitions, independent outputs, source maps,
compiler log and copied artifact bytes. The proof basis is Hub
`ec18fae82dbe843cf0ba351bc10ef25db7dd99c9`. Native Rust/SQL remains byte-identical
to qualified `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`; no runtime, authorization,
dependency, deployment, CI or paid-model change accompanies this proof.
Hub commit `d6b5cc4bd3205356ca018baea0ea26828f0795c2`, pushed to `origin/main`,
records the checked recovery proof and its coverage update.

## Exact scenario and result

The [fixture](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationAuditedUpdateRecoveryWitnesses.lean)
reuses the previously qualified two-replica seed: clients 30/31, logins 40/41,
unrelated login 99, complete statements/digests/stable fields, retained binding,
unrelated frame and prior full audit record 900. Actor 0 updates client 30. Four
actual data steps reach its private deployment and registration writes; audit
capture is the fifth. Its proposed record 900 correctly names Update for
`fixture-service`, with draft timestamp 223456789 ns and stored timestamp
223456 µs. However, committed record 900 has a different complete Register payload.
The proof establishes correct input shape and then excludes every valid CoreAppend
result for that conflicting ID. This refusal is not a successful append event.

The sixth actual step reports failure with rollback pending and lock 0 still held.
The seventh is explicit server abort. Both states retain exactly the seed database
and prior ledger, with complete transaction/cursor maps specified independently.
The aborted pending cursor is inactive model state, not runtime bookkeeping or a
new rule reserving its ID. A model error tag does not establish wire-response timing.

Actor 1 starts from that exact aborted state and executes nine actual steps:
preflight, begin, deployment write/lock, current-row write, audit capture, valid
private append, commit request, combined commit and successful acknowledgment.
The locally fresh record 100 is the complete Update record from the success
fixture. The final independent database changes only the intended metadata,
statement and update time; it preserves client/login identity, digest, issuance,
stable remainder, other replica, roles, binding and unrelated state. The ledger
contains exactly prior record 900 and new record 100. Complete final transaction
and cursor maps retain actor 0's aborted/error outcome alongside actor 1's success,
with released lock and exactly the retry's update event.

The [top-level theorem](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationAuditedUpdateRecoveryProof.lean)
composes start-to-abort and abort-to-success into one sixteen-step execution; it
does not merely check disconnected endpoint values. Expected maps are literal
specifications, not results obtained by calling the model's commit executor.

## Measured checks and repair

Each executed attempt used one `LAKE_NO_UPDATE=1 lake build
RegistrationAuditedUpdateRecoveryProof` with an external 180-second bound and
default Lean heartbeat limits. The initial draft was unexecuted.

- First compiler attempt: **FAIL**, 38.026 s. Witnesses compiled, but two local
  binders named `prefix` collided with Lean syntax. Dependent proof errors followed,
  and the axiom guard correctly rejected `sorryAx`.
- Final attempt: **PASS**, 37.976 s. Renaming only those two local binders and their
  uses to `readyPath` preserved definitions, theorem statements and guards. Both
  modules built fresh. Twenty declaration guards and nine printed closures passed;
  three closures are axiom-free, and the rest use only `propext` and `Quot.sound`.

Declaration counts are not scenario counts. The imported success execution's five
older closure prints are separate. Style/deprecation warnings remain and do not
weaken the axiom guards. Lake's reported 3,156 graph jobs are not 3,156 fresh builds;
the new Witnesses and Proof build lines report approximately 1.9 and 2.3 seconds.

Actual copied artifacts:

- RecoveryWitnesses: 199,000 bytes, SHA-256
  `ed3e89c388a68b3d32a8575c2b47499d525306c0f7c3f28f083de38c379f6747`.
- RecoveryProof: 255,560 bytes, SHA-256
  `6e2e7c40b34e7d45f01027d2e1500c8f91d6be12560dce33e6c89e7bb1a2d204`.

The complete final log is 15,884 bytes, SHA-256
`cd026cd2398cfb142d28bb71881ea090017e8fa0ba538f0646662c63f85b4b8e`.
The raw summary SHA-256 is
`0b25171751cbc19288fddb9c14eb4dd122ee91d92323bce8b0c78e3ef35a010a`.
All 45 frozen source files matched canonical before documentation updates, and
source/import/tool maps remained unchanged through compilation. No manual OLean
seeding was used. Lean/Lake and Mathlib identities, earlier failed log, repairs,
full source maps and output identities are in the
[compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-update-recovery.json).
Full temporary artifacts remain at
`/tmp/hub-registration-audit-20261101/audited-update-recovery-checkpoint3-mirror/`.

## Boundaries and next work

The native refusal fixture raises a BEFORE INSERT exception; the model uses a
conflicting record ID. These are different mechanisms. Existing native checks
were not rerun and no native collision or deployment is claimed. PostgreSQL
atomicity/locking, Core append, native serialization and faithful source
projections remain interpretation contracts. The proof establishes a possible
successful retry, not liveness, all retry schedules, lost commit replies or native
ClientInformation construction. No new production defect was found in this slice.

Next are an actual replacement followed by stale-update no-op, including its
explicit source-faithful external audit contribution, and a missing-Update control
with unchanged acceptance rejection and exact restoration. Full Hub coverage
remains partial.
