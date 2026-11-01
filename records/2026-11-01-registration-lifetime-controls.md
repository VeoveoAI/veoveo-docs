# Registration lifetime contracts detect cleanup and response faults

Two deliberate faults in the manual lifetime model now fail the unchanged
independent acceptance contracts. Both exact restorations pass fresh positive
checks. This completes the planned semantic controls for the scoped store model
following the [six constructive scenarios](2026-11-01-registration-lifetime-witnesses.md).
The source basis is Hub `af953f6207a1fcfe592ad7328a6a74b6375c7905`, with native
runtime correspondence still `12a132dcbdddcd7fad1defcd007432385d237a76`.
The qualified control inputs, receipt and coverage update are published in Hub
`3473443`.

GPT-6.1 Sol wrote the two one-line patches and independent diagnostics. GPT-6 Luna
ran the bounded Linux x86_64 sequences; GPT-6 Astra reviewed the complete failed
goals, passing diagnostics and restored logs. These are intentionally injected
model defects, not newly discovered native bugs. Production sources, deployment,
proof statements and expected outputs did not change.

## What each control established

**Ignored login-drop effect.** The model still stages and records `dropLogin`, but
its primitive interpreter leaves the login map unchanged. The independent
diagnostic establishes the complete removal result with registration and instance
absent, retained deployment/unrelated data, released locks and both success tags,
while candidate login 20 remains. The unchanged acceptance proof fails at its
login-map equalities: login 20 must be absent after removal, and prior login 40
must be absent after replacement. The consistent branches in both goals are
false; this was not merely a parser, import or constructor failure.

**Wrong response after successful registration.** The model's successful
registration acknowledgement returns `invalidToken` instead of `registered`.
The diagnostic establishes that replacement was fully admitted: the new row/login
exists, the old row/login was removed, the old immutable deployment value remains,
the phase is committed and locks are free. The unchanged acceptance proof fails
at the four successful-response equalities for original, fixed, rollback/retry
and replacement scenarios. This tests the response after commit, not a refusal
before admission or a native HTTP status.

Both diagnostic proofs import only the executable model and independent
specification through the fixture module. They evaluate complete wrong outputs;
they do not separately certify reachability under the mutated step relation.
Unchanged execution declarations report no errors. Only the intended output
declarations acquire rejected `sorryAx` dependencies; no failed correctness
artifact is accepted.

## Execution and restoration evidence

Lean 4.35.0, Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679` and existing package
pins remain unchanged. Each case uses its own disposable source tree. The command
sequence freshly compiles Model, Specification, Witnesses, the independent
diagnostic, then the unchanged WitnessProof. Each command has a 180-second bound.
Only the final mutant acceptance command is expected to fail, and its exact
residual is reviewed before accepting the control.

- Cleanup control: diagnostic passed in **3.132 s**; unchanged acceptance failed
  in **3.417 s**. Exact reversal and the fresh four-module positive graph passed;
  its final WitnessProof took **3.601 s**. All nine compiler stages totalled
  **31.628 s**.
- Response control: diagnostic passed in **3.334 s**; unchanged acceptance failed
  in **3.253 s**. Exact reversal and the fresh four-module positive graph passed;
  its final WitnessProof took **3.521 s**. All nine compiler stages totalled
  **31.338 s**.

Both complete nine-file source maps returned to their baseline and remained exact
through restored compilation. Tools and imported artifacts were unchanged. The
restored Model, Specification, Witnesses and WitnessProof OLeans match their
previously accepted private-context hashes. The restored WitnessProof is
1,798,544 bytes, SHA-256
`6ad2c9166df5d95ac971cc3085cc7f8367dedbf000bbc44d751a7bb45fe6bbb0`.
Its 34 guards and six execution closures pass after each restoration. The two
diagnostic closures use only `propext` and `Quot.sound`; four diagnostic declaration
guards pass. Existing unused-simp warnings remain.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/instance-lifetime-controls.json)
records every stage, source/patch/tool/log identity and restored artifact. The
patches and diagnostic sources are versioned under
[mutations](https://github.com/VeoveoAI/veoveo-hub/tree/main/proofs/registration_transactions/mutations);
they are not ordinary baseline targets. Full logs and scripts remain temporary
under `/tmp/hub-registration-instance-removal-20261101/lifetime4/`. No runner,
CI hook, runtime job, new dependency or toolchain change was added.

The already qualified canonical history/consequence graph was not repeated after
these exact restorations. Native/full Docker checks, deployment and model-driven
acceptance were not run for these proof-only controls.

## Next boundary

The scoped instance registration/removal store model now has generic finite
history proofs, concrete valid/original-race executions and checked semantic
controls. This is not formal SQL refinement or full registration-service coverage.

Source review identifies the next boundary: the store commits before service
audits, catalog reloads, `served_at` updates and final response construction.
`served_at` changes cross the current model's full-instance stability boundary;
zero affected rows are allowed. An error after commit leaves that commit intact,
and a successful response cannot imply its row/login remains live after a
concurrent legal removal.

The next step is one bounded extraction-support probe of the unchanged native
`RegistrationService::information` graph, including its own surface derivation
and SDK response validation. No extraction or full response proof is claimed yet.
PostgreSQL/SQLx/compiler assumptions, other writers, external preparation,
listener convergence and liveness remain explicit boundaries. The comprehensive
Hub verification goal remains active.
