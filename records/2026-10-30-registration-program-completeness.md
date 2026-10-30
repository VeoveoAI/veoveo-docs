# Registration programs are complete before modeled commit

Hub commit `d3885bf` adds the first checked registration transaction theorem:
`RegistrationTransaction.committing_program_complete`. Starting from the model's
initial state, every committing attempt in every finite execution has staged its
complete replica-admission or replacement program. Replacement includes removal
of every login captured by its DELETE statement, followed by creation of the new
login and insertion of the complete candidate row.

This is a handwritten transaction-model proof mapped to Hub's Rust/SQL. It is
not an extraction of asynchronous Rust or SQL, nor a proof of serialization.
The original race involved complete programs interleaved incorrectly; this
theorem alone does not rule it out. The
[native race fix](2026-10-30-registration-replica-replacement-race.md) remains
separate component evidence.

## Model and independent specification

The model covers one retained deployment under an already admitted, fixed
namespace/key. Client keys, login keys, complete metadata/binding values and
remaining row/role payloads are parametric. Native serialization and field
projection remain correspondence boundaries rather than hidden assumptions
about selected version strings.

The DELETE step captures an exact finite list of rows at that statement's view.
Later commit applies those captured key deletions, not a fresh deletion of every
current row. Ordinary fixed-source admission locks before comparison; replacement
upserts acquire their real lock in both fixed and original protocols. The
original same-metadata path can remain unlocked, allowing the old interleaving
to be represented. Review caught and corrected a missing original-upsert lock
before qualification.

Primitive commit publishes its staged deltas without a completeness, correct
metadata or lock-ownership guard. Completeness instead follows from the initial
alignment and preservation of the program/loop invariant at every transition.
A server may commit or abort a submitted commit request; a client error does not
by itself choose that database outcome. The frame contains disjoint application
data, not all PostgreSQL catalog or notification effects.

`RegistrationSpecification.lean` independently describes replica addition and
replacement as resulting maps. Its sequential history is indexed by actual
commit event identities and original requests, not invented contributions. Its
`SerialGuarantee` and `AbortGuarantee` declarations are still unproved
propositions. Valid same-metadata addition, exact ordinary/instance replacement
executions and the original unlocked-read counterexample remain pending.

## Execution and evidence

GPT-6.1 Sol implemented the model and proof, GPT-6 Luna ran frozen-source checks,
and GPT-6 Astra reviewed the source mapping and theorem statements. The Linux
checks reused the existing Lean 4.35.0 and pinned Aeneas/Mathlib dependency cache;
the Aeneas framework pin is `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`. No new
Rust extraction is claimed merely because this toolkit is a dependency.

The direct theorem check passed. The worker reported 9.8 seconds; the mirrored
artifacts retain its exit code and full log but no separate timing file. One
composed `lake build` then checked the Model, Specification and Proof targets,
passing in a recorded 6.88 seconds. The theorem's audited closure is exactly
`[propext, Quot.sound]`; there is no `sorryAx` or unreviewed axiom. Unused
binder/simp/tactic lint warnings remain and do not change that closure.

Development iterations corrected Lean record syntax, a reserved identifier and
an overly general empty-progress witness in the login-drop case. The final proof
advances the completed list explicitly by the dropped login. Intermediate
elaboration recovery is not semantic fault-control evidence.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/program-completeness.json)
records all six frozen source/configuration hashes, exact commands, log and timing
identities, native-evidence linkage and boundaries. The
[proof source](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationProof.lean)
contains both the invariant and theorem; the
[model](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationModel.lean)
contains the operational assumptions and statement mapping.

This proof-only milestone changes no runtime behavior and did not rerun the
already qualified native tests. Proof execution remains manual, with no CI hook,
deployment or provider/model-driven acceptance. The commit is local, not pushed.

Registration coverage is now partial. Next are lock/observation invariants,
serial equivalence to the independent operation specification, abort-event
exclusion, valid-output executions and the original-protocol fault. Concurrent
RFC 7592 updates, removal/housekeeping, namespace-key changes, preparation in
another database, post-commit audit/catalog adoption, SQL refinement and liveness
remain explicit later obligations within the broader Hub goal.
