# Actual-source controls for context admission

SDK commit `4fb723e` qualifies the exact request-context validator contract against
two deliberate faults in its actual Rust source. Both variants reject the frozen
proof, independently prove a wrong result, restore the original source and generated
outputs, and pass fresh baseline proofs. These are controls of proof sensitivity,
not newly discovered production bugs. No runtime behavior was changed.

GPT-6.1 Sol implemented the two patches and standalone witnesses, GPT-6 Luna ran
the bounded logged checks on Linux, and GPT-6 Astra reviewed the source/model
differences, failed obligations, successful witnesses and restoration evidence.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/context-semantic-controls.json)
records the complete source/tool/output hashes, exact commands, logs, timings and
limits. It follows the [populated valid-context checkpoint](2026-10-31-sdk-context-valid-witnesses.md).

## Scenarios and observations

The Direct control removes only the actor/source equality rejection. Its constructed
caller retains every Principal field except an added `superuser` role. The independent
specification refuses this input, while the extracted mutant accepts it. This
establishes inconsistent identity acceptance, not any downstream permission grant.
The unchanged exact theorem fails on the removed equality obligation. The standalone
wrong-result witness passes in 3.772 seconds.

The Automated control changes only the required principal kind from Service to User.
Its standalone witness proves that the mutant refuses the independently admitted,
populated Service fixture, passing in 2.944 seconds. The frozen theorem exposes
two distinct consistent counterexample cases: valid-Service refusal and User
acceptance. The dedicated constructed witness establishes the former.

Each variant applies its patch to an isolated 173-file native source tree, runs
Charon and Aeneas with the unchanged extraction selection, then builds the raw
model and unaffected helpers in a fresh proof package. The failed correctness
module is never imported by the standalone witnesses. Their seven audited
declarations use only standard Lean axioms, with no `sorryAx` or assumed validator
success. The source scope remains SDK `e268032` plus the previously qualified
String/binder preparation; the receipt records the exact files and pins.

Measured Direct stages were Charon 12.889 seconds, Aeneas 5.825 seconds, model/helper
build 18.228 seconds and expected contract failure 5.151 seconds. Automated stages
were 12.739, 3.273, 13.022 and 4.718 seconds respectively. Timings measure individual
commands, not the whole engineering effort. Cached dependency replay is included
where Lake reports it.

Both patches were reversed in their original private source trees. The complete
original source maps and all four canonical generated Lean output hashes matched
exactly. Fresh restored builds of ContextProof, Examples and Witnesses passed in
17.317 seconds for Direct and 17.032 seconds for Automated. Each run passed all nine
requested axiom audits. Compiled artifact hashes are recorded per run; no claim of
cross-build OLean byte equality is made.

## Errors and remaining boundaries

Direct's first standalone witness needed one missing native inequality unfolding
in its local simplification; only that proof step changed. Automated preparation
initially put the patch at the wrong declared path, then encountered the retained
job directory. Both setup failures stopped before Charon and are recorded separately.
These are proof-authoring/setup errors, not native product defects. Successful stages
were reused; unchanged compiled sources needed no further checks at final review.

This establishes model-relative context consistency and wrong-acceptance/refusal
sensitivity. It does not prove authentication, current-policy provenance, complete
issuance, signed claims, recipient cryptography or integration with Hub's pinned SDK.
Native collection/string/allocation correspondence and translator assumptions remain
explicit. The next contribution is complete context-bearing identity issuance and
claims, preserving valid acceptance, exact fields, deadline rules and error priority.

The commit is local, unpushed and undeployed. No broad Docker gate, dependency update,
native/full-stack rerun or model-provider call ran for this proof-only packet. The
comprehensive verification goal remains active.
