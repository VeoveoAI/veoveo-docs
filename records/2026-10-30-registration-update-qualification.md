# Register/replace/update concurrency qualified within its boundary

Hub commit `eb099bb` completes the mixed registration/update slice. The checked
fixed-protocol histories now have legitimate normal and stale no-op executions,
and the original update order has a constructive counterexample against the same
independent contract. The complete registration lifecycle and physical Rust/SQL
refinement remain open.

The paired control starts from the [same two-replica fixture and actual replacement
prefix](2026-10-30-registration-update-replacement-noop.md). Old-client preflight
reads the row while it exists and compares the stored digest. One ordinary
replacement endpoint is constructed through the real fixed registration steps,
including its deployment lock, comparison, DELETE snapshot, both login removals,
new login/row, commit and successful acknowledgement. That same reached state
supports both update-source orders; no atomic replacement operation is assumed.

The fixed branch runs five update steps and rolls back its private write before
returning success. Its complete database remains the independent replacement
result. The old branch runs six steps: begin, miss the old client, stage deployment
metadata, request commit, commit and return success. Its complete output is the
replacement database with only deployment metadata overwritten by the stale request.
The winner row and roles, binding and unrelated state remain unchanged. Both old
calls report success, the lock is released, and the actual commit tags are
registration 1 followed by update 0. Including the common preflight and replacement,
the constructed paths contain 20 and 21 model steps respectively.

`old_update_order_is_not_serial` derives a fold from the existing `SerialHistory`
relation using the original requests and actual event identities. The fold ignores
event write payloads. Replacement removes the old client, so the independent
current-row update must be an identity operation. Its metadata must remain the
replacement's, contradicting the old execution's distinct stale metadata. This
refutes the actual-commit-order contract, without claiming a separate theorem over
every alternative serialization order. The older unlocked registration defect is
not reintroduced to produce this counterexample.

GPT-6.1 Sol implemented the control, GPT-6 Luna checked it on the existing Linux
x86_64 Lean 4.35.0 cache, and GPT-6 Astra reviewed the common source schedule,
independent specification and output evidence. The first direct check passed in
**19.542 seconds**. One final `LAKE_NO_UPDATE=1 lake build` passed all sixteen
default modules in **20.945 seconds**, reporting 3168 jobs including dependencies.
The no-op and counterexample theorem closures each contain only `propext`,
`Classical.choice` and `Quot.sound`. There is no unreviewed axiom or incomplete proof
in these successful checks. All nineteen proof/config hashes match before/after
and the committed source.

The [final receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/update-transactions-receipt.json)
ties these results to complete staged programs, shared lock ownership, stable
observations, exact field effects, generic mixed commit histories, aborted-event
exclusion and the earlier normal/replica/replacement/abort witnesses. It records
the source identities, command bounds, inputs, sequence, outputs and prior receipts.
No further model primitive, runtime behavior, proof premise or checking-limit change
was needed for this paired control.

Native evidence remains separate. The [stale-update regression](2026-10-30-registration-stale-update.md)
measured the old metadata overwrite and passing minimal fix; its later module run
passes both actual-store concurrency regressions, and six instance-registration
tests, formatting and strict library Clippy also passed. Eleven retained native
source/query identities match the qualified current source. The original replica
baseline is historical; it is not falsely asserted to match the later entire store
file. Native tests were not repeated for these proof-only changes. The native
stale-update fixture uses one old registration; the Lean fixture uses two.

Remaining boundaries include one retained deployment, admitted namespace and
metadata/crypto validity, PostgreSQL atomicity/isolation/locking, typed-store/Core
correspondence, removal/housekeeping, broader authority and identity reuse,
HTTP/service audit/reload, public callbacks and deployed recovery. Constructed
success is not unconditional liveness, and an acknowledgement does not freeze later
writers. No full Docker gate, deployment, Aeneas extraction or paid model call ran.
Hub commits are local. HUB-REGISTER-01 remains partial; the comprehensive goal is
active. The next approved slice connects registration identity to fresh and retained
routing, current authority and SDK recipient checks, followed by catalog/listener
freshness and replica adoption.
