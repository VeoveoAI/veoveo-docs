# Checked request-context and HTTP assembly proof

Hub commit `f85e8acca9f5314fa3f3dc3edda50f1b23c65ed5` adds the first checked
request-composition module. Its six declarations are in
[SnapshotAssemblyProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/SnapshotAssemblyProof.lean).
This is a partial implementation-linked proof, not completion of the broader
routing, current-authority, issuer and recipient contract.

## What is proved

1. For any namespace-helper function and result, successful snapshot assembly
   preserves the entire supplied deployment map and returns exactly that helper's
   namespaces. A constructive witness permits arbitrary successful namespaces.
2. The untouched extracted `RegistrationSnapshot::of` has that assembly shape.
   If it succeeds, its deployment map is preserved. The helper's own completion and
   namespace ordering are not proved.
3. Actual `AuthenticatedSubject::request_context` exactly matches an independent
   specification. A direct call requires execution and preserves audit, original
   token and principal. A delegated call retains its admitted original context;
   an explicitly conflicting execution is rejected. Both success and refusal are
   covered, without assuming the function's desired output.
4. Given successful context construction, actual `HubAuthorizedHttpClient::new`
   returns exactly an independently specified complete client value: transport,
   issuer, profile, recipient slug/deployment/resource, OAuth client, actor,
   authority, supplied permissions, context, acting server/Task, delegation context
   and deadline. Empty supplied permissions are allowed. The theorem does not
   establish that these supplied permissions are current or that the registration
   was selected correctly; those are composition obligations.

## Inputs and measured checks

The generated bodies come from exact Hub `3bc2923`, SDK pin `239622d` and Core pin
`120306e`, with only the existing extraction-only catalog-name annotation. The
[extraction receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/extraction-checkpoint.json)
contains exact tool arguments, input/source-map checks and generated-output hashes.
Generated `Types.lean` and `Funs.lean` were not edited.

GPT-6.1 Sol implemented the models and proofs; GPT-6 Astra reviewed the statements,
boundaries and exact commit contents; GPT-6 Luna executed the bounded Linux checks
with Lean 4.35.0 and the committed dependency manifest. In order:

- `lake build RequestCompositionHub`: passed in **11.032 s**.
- `lake env lean SnapshotAssemblyProof.lean`: passed in **2.819 s**.
- `LAKE_NO_UPDATE=1 lake build`: passed in **3.221 s**, with dependencies cached.

All nine source/config hashes matched the frozen inputs before and after the
qualifying package build. Executable axiom allowlists passed with no `sorryAx`.
The complete
[assembly receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/assembly-checkpoint.json)
records the commands, exact source map, summaries and log hashes.

The final proof file SHA-256 is
`52d30db8e5e58b83d15d2388ef832377e91fb6bbfaa8035d82c604fcbe224fc8`.
The final default-build summary is
`4bfdacd4776888b8605426986f738687fd6af5f3bdb5da44e7676194ab1fe9e5`;
its log is `3ec0d187c05aa772c70334402b5d6dd529f4cc9de2c0106f2e5271ceb6abe35b`.
Temporary logs are in
`/tmp/hub-request-composition-20261030/evidence-hub-a-first-proof-final-build2/`.

## Boundaries and rejected development attempts

Universal/context proofs use only standard Lean axioms. The actual snapshot
connection retains the explicitly uninterpreted namespace helper. It is not hidden
behind a conveniently chosen implementation or a success assumption. The HTTP
theorem's dependency audit additionally permits only the two native formatting
symbols referenced by the constructor's error branch. Its accepted-branch proof
assumes neither their successful execution nor their contents; it proves no error
message contract. No assumed issuer result appears in the HTTP theorem's audit.

Ordinary collection/equality/clone/time models remain explicit native-refinement
boundaries. The URL-to-string model constructs exact UTF-8 bytes under the actual
`Usize` representation bound; an oversized model value produces an explicit model
failure. This adds no Rust URL restriction and no universal length axiom. It avoids
the unrelated `U32` limit of Aeneas's convenient `toStr` constructor. Native
representability and URL parsing remain outside this proof; HTTP construction only
clones the endpoint and does not rely on that string conversion.

Earlier model builds rejected adapter type mismatches and a byte-length proof
normalization error. Earlier direct checks rejected unfinished record/Option
normalization, generated-name and tactic-layout errors; their recovery `sorryAx`
dependencies failed the audit and were never accepted as proofs. No statement was
weakened to pass those checks. A runner's first final invocation accidentally used
the already-cached model-only target; only the subsequent exact default build is
counted as final qualification evidence. The original attempts remain in temporary
evidence directories. These were development/setup failures, not semantic mutation
tests and not production authorization defects.

Selected-registration correctness, actual issuer-call assembly, the separately
extracted SDK implementation and recipient composition remain open. So do namespace
helper totality/order, async/store/SQL refinement and actual-source semantic controls
for this new module. The selected-registration draft is excluded from this commit
and from the checked targets. No runtime changes, SDK repin, deployment, full Docker
gate or model-driven acceptance occurred in this proof commit. The preceding
[SDK translation/native checks](2026-10-30-request-composition-translation.md) and
[real-Hub routing qualification](2026-10-30-request-routing-native-qualification.md)
remain distinct evidence.
