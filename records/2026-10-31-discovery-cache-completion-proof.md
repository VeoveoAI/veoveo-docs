# Cache completion and a composed invalidation fence

Hub `9e6228c` commits a checked independent contract for the actual extracted
`SurfaceState.complete`,
for its returned flag and every state field. A composed theorem now connects
actual key invalidation to actual completion: a late response leaves exactly the
invalidated state. This checkpoint does not yet establish arbitrary histories
with intervening replacement requests or generation changes.

GPT-6.1 Sol implemented the specification and proofs; GPT-6 Luna ran the manual
Linux check; GPT-6 Astra reviewed the source, statements, logs and identities.
Runtime source remains Hub `688b91a`, SDK `154a473`, Core `120306e`. This adds two
proof leaves and documentation, with no runtime, primitive-model or generated
source changes.

## What was proved

The [independent specification](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheCompleteSpecification.lean)
retains full descriptor vectors, denied counts, pending tickets, retry records
and generation. The [proof leaf](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheCompleteProof.lean)
connects it to the actual generated operation and derives these cases:

- A missing or mismatched request ticket returns `false` and preserves every
  state field, without assuming a successful clock or payload comparison.
- A current successful response moves the entire supplied vector and denied
  count into the cache and removes the current ticket and retry record. Its
  changed flag follows the actual vector comparison and denied-count comparison.
- A previously absent entry is accepted without comparing payload elements.
  A current response with a false changed flag still consumes its ticket; false
  alone does not imply unchanged state.
- A current failed response preserves cached descriptors, consumes the ticket
  and records the observed retry deadline. The actual SDK constant and duration
  conversion are proved to supply exactly 5,000,000,000 nanoseconds to addition.
- At capacity, an absent key removes the named first map entry before insertion.
  Unrelated values are preserved except that explicit victim. Interpreting first
  as minimum requires the native map's sorted representation.
- Chaining actual `discard_key` and actual `complete` preserves exactly the
  invalidated state for either payload outcome. Unique in-flight keys are the
  only collection premise needed for that direct composition.

The generic comparison preserves Aeneas's actual `Vec.ne` Result. It does not
replace custom element inequality with structural equality or its negation.
Source review also found floating-point annotations in the pinned rmcp descriptor
types, reinforcing why an unconditional structural-equality claim would need
additional justification. No descriptor validation or runtime rule was added.

## Measured execution

A read-only inventory confirmed the seven existing model/start/read proof OLeans
still matched their qualified hashes and byte sizes. The runner then checked all
thirteen source/config entries and the seven prerequisites before and after the
new stages. It used the existing qualified Lean 4.35.0/Aeneas dependency setup,
including its documented instance-name patch. No prerequisite was rebuilt.

Both new stages passed on their first compiler run:

- `lake env lean CacheCompleteSpecification.lean -o .lake/build/lib/lean/CacheCompleteSpecification.olean`:
  exit 0, **14.361 s**, empty log.
- `lake env lean CacheCompleteProof.lean -o .lake/build/lib/lean/CacheCompleteProof.olean`:
  exit 0, **4.474 s**. Thirteen executable axiom guards passed. Six accept only
  standard Lean logical axioms; seven additionally permit precisely the existing
  native `Instant.add` boundary. Nine printed closures match those bounds, with
  no `sorryAx`.

Both commands used `LAKE_NO_UPDATE=1`. Source and prerequisite checks stayed
identical, and the new specification OLean remained unchanged across the proof
check. Warnings concern unused tactics/simplifier arguments and a deprecated
lemma name. There were no compiler errors or failed retries in this checkpoint.

Final identities:

- Specification source SHA-256:
  `99e9e73c3c5228556671f2f5754d096c640aa30ac902af955be2bd94bcb9bcd9`.
- Proof source SHA-256:
  `2126c263a05b3c456a50b9f4a4e110782972d989065145194dda0e695b6052c5`.
- Specification OLean: 58,264 bytes, SHA-256
  `4d7df8b6d293d04fcd7599eec11f6c848ae191865388e19bacb5935969c2c530`.
- Proof OLean: 662,280 bytes, SHA-256
  `6c464fa5adb5c10fab046ede0dab0be8fb36b7351aaaf1a950fdac1328775ebc`.
- Proof log: 7,411 bytes, SHA-256
  `7711c9cf70a63ff97819042e89782f7281d5f5dce0411393aa78eab257abbb03`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/complete-contract-20261031.json)
records the source map, commands, artifacts, axiom closures and explicit boundaries.

## What remains

Native time addition is an uninterpreted Result boundary: the proof does not
assume it always succeeds or prove a returned deadline is in the future. Failure
and divergence remain possible. No native post-panic state, callback invocation
counts or async mutex refinement is claimed.

The next step is preserving sorted/unique maps, capacity bounds and generation
coherence across the actual operations, then composing finite replacement and
generation histories. Actual-source semantic controls remain pending. Server-wide
invalidation still has its recorded translator limitation. Native collection,
descriptor, allocation/destructor and time representation remain explicit
refinement boundaries.

No native tests or full Docker suites were rerun for these proof-only additions.
No deployment, remote push or model-driven acceptance occurred.
