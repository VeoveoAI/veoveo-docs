# Exact discovery-cache fetch start

Hub `5dcf9d5` commits a checked, independent contract for the actual extracted
`SurfaceState.start`. It is a
complete-state contract. This advances the cache lifecycle proof beyond reads and
invalidation. Completion and overlapping-request histories remain open.

GPT-6.1 Sol implemented the specification and proofs, GPT-6 Luna ran the manual
Linux checks, and GPT-6 Astra reviewed the contracts, input identities and logs.
This checkpoint changes proofs and documentation only. Runtime source remains
Hub `688b91a`, with SDK `154a473` and Core `120306e`; the previously qualified
generated files and primitive models are unchanged.

## Contract

The [specification](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheStartSpecification.lean)
defines the returned fetch and all four state fields independently of the
generated operation. The [proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheStartProof.lean)
connects that specification to the actual translated Rust:

- Old-generation work leaves the entire state unchanged. Newer-generation work
  clears cached descriptors, pending tickets and retry records before obtaining
  the new ticket.
- At equal generation, coalesced work checks cooldown before pending work and
  capacity. Failure or divergence of an observed callback remains explicit.
- Capacity refuses even a non-coalesced replacement. Below capacity, accepted
  work returns the exact original key, observed ticket and zero denied count.
  Cached descriptors, retry records and unrelated tickets are preserved.
- An explicit successful non-coalesced case requires no clock observation and
  no condition on existing retry or pending records.

The accepted in-flight map has at most 4096 entries. The input length assumption
expresses physical list/usize correspondence; newer-generation work clears the
old map and does not need its length bound. No successful Hub result is assumed
as a premise.

## Execution trace

The existing model and read/invalidation artifacts were reused with exact hash
checks. No extraction or model rebuild was needed. Lean 4.35.0 used the same
qualified private Aeneas dependency as the preceding checkpoint; its existing
discriminant instance-name patch remains present. Clean upstream reproduction
has not been measured, and no new tool patch was introduced.

Two initial script prechecks failed before Lean ran: a missing metadata field,
then an incorrect path for a prerequisite compiled proof. Both were corrected
without changing model or source artifacts.

The independent specification compiled in 12.227 s. The first proof check failed
in 3.640 s on redundant tactics, a remaining definitional equality and one
mis-parenthesized assumption. Lean parsed the original pending condition in a
way that accidentally required coalescing to be enabled. Parenthesizing the
whole Boolean expression restored the intended acceptance domain; this was a
proof-draft error, not a runtime defect. The specification did not change.

The corrected proof passed in 6.467 s. Review then requested the explicit
non-coalesced acceptance theorem to guard against repeating that domain error.
The final proof passed in **7.398 s**, with sixteen executable axiom guards and
eleven printed closures containing only `propext`, `Classical.choice` and
`Quot.sound`. No `sorryAx` or custom primitive axiom appears in those closures.
Remaining warnings concern unused tactics, simplifier arguments and a variable.

Final identities:

- Specification source: SHA-256
  `ed3e26cbbec913d9709b27ac29d03df6598b5b2606a64a125eeba14295eb887a`.
- Proof source: SHA-256
  `6ab63db1ed4012d862dd784379cfd816bdcac5b7daca719cceaec5dd1c20035b`.
- Compiled proof: 901,152 bytes, SHA-256
  `62b5c9716d4897b657caf894cbfd598d2d77b9b26b64f9b7f8ca76f532a25054`.
- Final log: 7,578 bytes, SHA-256
  `3dadac163feadf60968abfc79c68c2796c40b0d73cfaa80912064180388cd8e0`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/start-contract-20261031.json)
records exact commands, input maps, attempts, dependency configuration and output
identities. The only postcheck change to that package was README prose.

## Boundaries and next work

This is implementation-linked, model-relative verification. Native collection,
identifier and allocation/destructor correspondence remain assumptions. The
map model's sorted/unique invariant maintenance still needs proof. Callback
Results express branch dependencies, not instrumented native invocation counts,
post-panic state or async mutex linearization. No globally fresh finite UUID or
hash injectivity axiom was added.

Next are exact completion, map invariant preservation and finite histories:
an invalidated or superseded response must neither overwrite newer descriptors
nor clear replacement work. Semantic controls for this state machine remain
pending. Server-wide invalidation retains its documented translator limitation;
cursor/listener behavior and native wrapper refinement are also open.

The earlier 22 native tests were not rerun for proof-only additions. No deployment,
full Docker qualification, remote push or model-driven acceptance occurred.
