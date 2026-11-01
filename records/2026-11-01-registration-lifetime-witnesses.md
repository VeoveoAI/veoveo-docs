# Concrete executions of instance registration and removal

Six constructive executions now connect the manual lifetime model to independent
expected results. This follows the [history proof](2026-11-01-registration-lifetime-history.md).
Native correspondence remains Hub `12a132dcbdddcd7fad1defcd007432385d237a76`;
adoption starts from Hub `66ef172` and is published in `af953f6`.
No runtime code or deployment changed.

GPT-6.1 Sol authored the witnesses, GPT-6 Luna ran bounded Linux x86_64 checks,
and GPT-6 Astra reviewed the step chains, independent outputs, diagnostics and
source/artifact evidence. No model-driven application acceptance ran.

## Scenarios and results

The fixtures use public synthetic values: one complete instance payload,
registration client 10/login 20, an unrelated login 99, and a populated unrelated
application frame. Existing-deployment replacement additionally starts with
client 30/login 40 and an immutable deployment value different from the candidate's
first-insertion value. These are model inputs, not claims of valid native
identifiers, signed credentials or parser acceptance.

1. **Original race.** Registration stages its deployment upsert, deletion and
   login creation privately. Removal sees no committed registrations, obtains
   its actual late instance lock, removes the instance and commits. Registration
   then passes the modeled native deployment foreign-key constraints and commits.
   Both replies succeed, but its row and login survive without the instance.
2. **Fixed registration first.** Registration is actually accepted. Removal then
   captures that row, drops its login and removes the instance. The deployment
   remains, and unrelated data is preserved. Both replies succeed, including a
   registration acknowledgement delivered after removal committed.
3. **Removal first.** Registration has cached authority while the instance exists.
   Removal commits; the fixed locking read then finds no instance. Registration
   returns the existing invalid-token tag with no staged writes or commit event.
4. **Abort and retry.** Removal stages deletion, fails before commit and rolls
   back. The original database remains, both locks are released, and registration
   subsequently succeeds. The aborted attempt retains its error and has no event.
5. **Lost reply.** Registration commits, then receives a delivery error. The
   accepted row/login, terminal committed phase and commit event remain. An error
   reply does not mean rollback.
6. **Existing-deployment replacement.** The old registration and login are removed,
   the new registration is accepted, the original immutable deployment value is
   retained, and unrelated roles and application state are unchanged.

Each exported scenario combines an actual chain of `Step` constructors with
independent complete database, reply-tag, lock and commit-sequence assertions.
The expected databases do not call the implementation's write interpreter or
the independent sequential operations. No desired final state is an execution
premise.

The execution leaf imports only the model and specification. A separate consequence
leaf subsequently imports the generic history proof: the original concrete
execution cannot satisfy the same independent serial-history contract that the
fixed concrete execution satisfies. Generic correctness does not manufacture
execution existence.

## Manual qualification

Lean 4.35.0 and the existing package pins are unchanged. The fixture module passed
in **4.020 seconds**. The first execution-proof draft failed in 3.370 seconds:
`simp` made no progress on the instance-presence premise of `Step.acquire`.
Changing only that proof body to expose the database projection, rewrite the known
initial database and close by reflexivity fixed it. Model, specification, expected
outputs and public theorem statements stayed unchanged. The failed artifact was
not accepted; this authoring failure is not a semantic negative control.

The repaired execution proof passed in **4.522 seconds** and the separate
consequences in **2.819 seconds**, each with a 180-second bound. The first OLean
is 1,798,544 bytes, SHA-256
`6ad2c9166df5d95ac971cc3085cc7f8367dedbf000bbc44d751a7bb45fe6bbb0`;
the consequences OLean is 17,616 bytes, SHA-256
`3c8e2161350efd0d59626b18729e26829fb29216bef03f1a8c766f9bcc1aadd3`.
Only unchanged, previously checked source/import/artifact pairs were reused.

All **36 new declaration guards** and eight printed closures pass. These are
declaration counts, not 36 scenarios. The six execution closures use `propext`
and `Quot.sound`; the two history consequences additionally use `Classical.choice`.
Two unused-simp-argument warnings remain. No `sorryAx`, custom axiom or increased
resource limit is accepted.

The manual package target is:

```sh
LAKE_NO_UPDATE=1 lake build RegistrationLifetimeWitnessConsequences
```

That canonical target passed in **25.54 seconds**, with a 180-second bound. Its
ten-module import graph built with unchanged source and tool-import maps; the
26-file input map is SHA-256
`5acab702073fd04d5f22d9c35a5b9d94516049995e31aaa862fce827a3fa4a86`.
Lake's 3,147 jobs include cached dependency work, not 3,147 new proofs. The
canonical execution-proof OLean is 1,798,760 bytes, SHA-256
`332ba8ab9cffd213df829c60eb4c8bc549901f8f0f3ca0bcbe3819b6e731e3fd`.
All 86 lifetime declaration guards and 26 printed closures passed, together with
the imported Effects module's two existing audits. Unrelated default proof
targets and native/full Docker checks were not repeated.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/instance-lifetime-witnesses.json)
records source/tool identities, both direct attempts and the canonical package
check. Full logs, compiler artifacts and execution scripts remain temporary under
`/tmp/hub-registration-instance-removal-20261101/`; no CI or runtime job was added.

## Boundaries and next work

These are handwritten, source-mapped model proofs, not Aeneas extraction or formal
SQL/async refinement. PostgreSQL/SQLx/compiler behavior, native input admission,
external database preparation, shared role/group state, other instance writers,
listener convergence and liveness remain explicit boundaries. Returned response
tags are proved; complete native API response payloads are not.

Next are deliberate cleanup and response mutations with independent wrong-output
diagnostics, unchanged-contract rejection and exact restoration. The historical
original-race counterexample is already checked, but those additional semantic
controls have not run. The comprehensive Hub verification goal remains active.
