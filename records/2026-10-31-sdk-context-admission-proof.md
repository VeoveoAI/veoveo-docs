# Exact SDK request-context admission

SDK `f72f91f` commits a checked contract for the actual extracted
`HubRequestContext::validate_for` across Direct, Automated and Delegated provenance.
The exact result is proved under the recorded operational model without assuming
that the validator succeeds. It changes no runtime behavior or authorization rule.
Full issuance and the Hub-to-SDK composition remain unfinished.

## Contract and boundaries

`InternalAuthContextProof.validate_for_exact` takes arbitrary typed context, actor
and invocation authority. The extracted validator returns Rust `Ok(())` exactly
when the independent `ContextAccepted` predicate holds, and
`InvalidRequestContext` otherwise; both sit inside the Aeneas successful result.

The predicate covers complete direct/automated principal equality, including all
sets and `authenticated_at`; delegated service identity and the inherited scopes,
data labels and assurances; common token/tenant/Work Context/mode relationships;
initiator and delegation identities; and the existing session-family conditions.
It does not assume any own-code validator succeeds.

The five explicit text bounds require the source subject, actor ID, actor subject,
token issuer and OAuth client to fit the model's pointer-sized UTF-8 length.
The proof establishes byte conversion and roundtrip behavior for those inputs in
the operational model. These are representation bounds, not new Rust checks.
Native collection, string, allocation and translator correspondence remain external
boundaries. Authentication of the supplied context, current policy, deadlines,
complete claims, signature verification and async caller wiring are not proved by
this validator theorem. Constructed admitted examples and actual-source semantic
controls for this new contract remain pending.

## Execution

GPT-6.1 Sol implemented the proof; GPT-6 Luna ran the bounded unattended checks;
GPT-6 Astra reviewed the independent predicate against Rust, the complete theorem,
source hashes and successful compiler/audit outputs. Checks used the existing warm
Linux x86_64 graph with Lean 4.35.0 and pinned Aeneas `fdebf20`.

1. `LAKE_NO_UPDATE=1 lake env lean InternalAuthContextProof.lean` passed in
   **4.60 seconds**, with peak RSS **2,754,872 KiB**. All 16 source/config/import
   hashes matched before and after.
2. `LAKE_NO_UPDATE=1 lake build InternalAuthSpecification InternalAuthContextProof`
   passed in **5.82 seconds**, with peak RSS **2,763,196 KiB**. All 13 immutable
   source/config hashes matched; generated OLean outputs were captured separately.
   Lake's 1,804 jobs include cache replay, not 1,804 fresh compilations.

Both checks report only `propext`, `Classical.choice` and `Quot.sound` for the public
theorem. The executable audit rejects every other dependency, including `sorryAx`.
The final ContextProof OLean SHA-256 is
`a1b79520207eb2aa1357a4afca1ef6964ba36b510c6cad7ecdfafb88518e7b79`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/context-admission.json)
records source, configuration, artifact and log identities and the exact commands.

## Proof-development changes

Earlier attempts failed on tuple normalization, dependent comparison dictionaries,
option facts and tactic preprocessing. The proof uses Aeneas's existing
`uncurry_apply_pair` lemma, target-only reductions and a final propositional closer.
The independent mode projection changed from `def` to `abbrev` with an identical
match, allowing dependent dictionaries to reduce consistently. Generated Rust
extractions and native-library models were not edited.

Lean's supported targeted split mode is scoped to the final case analysis. An
800,000-heartbeat checking allowance is scoped to this theorem; actual heartbeat
consumption was not instrumented. The malformed option-placement attempt and the
pre-compiler manifest/path failures are not successful checks or evidence about
the necessary budget. The deliberately incomplete diagnostic runs are not proofs;
one diagnostic gated its baseline but not its scratch leaf, as recorded in the
receipt. These failures established no new runtime defect.

The proof is an opt-in manual target. No native test suite, broad Docker gate,
deployment, dependency repin or OpenCode/provider call ran in this checkpoint.
The commit is local and has not been pushed or deployed. Source applicability and
the next composition obligations remain in the
[boundary review](2026-10-31-issuer-composition-boundaries.md).
