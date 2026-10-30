# Exact refresh binding and delivery proofs

Hub commit `c00037d` contains the checked pure-predicate checkpoint. The actual
Rust `RefreshFamily::bound_to` and `deliverable` bodies are unchanged; their
Charon/Aeneas extraction now has exact-output Lean proofs. This is a proved
predicate boundary, not completed refresh transaction qualification.

The binding result is exactly equality of authorization server, protected resource
and client. Delivery is exactly the full conjunction of consumed/replay state,
family revocation/lifetime, successor family, checked next generation, current
generation, successor lifetime/state and the live delivery envelope. The proof
covers acceptance as well as refusal. Additional theorems establish coherent
delivery success, refusal at the exact envelope deadline and the unbounded
successor equation implied by checked arithmetic.

A field-exact mathematical family-to-session projection connects a generation-only
update to the prior session admission invariant at the same request and time.
Actual SQL/Serde decoding, verified claims and asynchronous caller wiring are not
proved by this projection. Native identifier/time representation correspondence,
translators, crypto and concurrent transaction semantics remain explicit boundaries.

GPT-6.1 Sol wrote the proof, GPT-6 Luna executed it on Linux, and GPT-6 Astra reviewed
the properties, source boundaries and evidence before committing. The pinned
extraction uses Rust nightly `2026-09-17`, Aeneas `fdebf20`, SDK `239622d` and Core
`120306e`; the proof runs on Lean 4.35.0. The generated source was not hand-edited.

The extended existing package passed `lake build` in 38.531 seconds. Its five model
audits passed individually in 2.568–2.668 seconds. The final direct proof check
passed in 4.021 seconds; `lake build RefreshPredicateProof` passed in 5.072 seconds,
then the default package build passed in 1.416 seconds. All eight theorem dependency
closures contain only `propext`, `Classical.choice` and `Quot.sound`; the executable
audit rejects any other axiom. Earlier drafts failed on unreduced Option binds,
record syntax and a generation-equality rewrite. They were corrected without
weakening the specification or changing runtime behavior.

The final proof file has SHA-256
`07a0b7ff84c110b459ba2d7556b08c3891104837a6fa1605a71d6ddd25f8eded`.
The [checkpoint receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/refresh-predicate-checkpoint.json)
records source/model hashes, tool revisions, commands, timings, log hashes and
the remaining boundaries. The [native baseline](2026-10-30-refresh-native-baseline.md)
is separate component evidence. Semantic fault controls and the concurrent model's
correctness/history proofs remain pending. No CI proof hook, runtime check or
deployment was introduced.
