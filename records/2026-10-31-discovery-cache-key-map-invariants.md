# Discovery cache key order and map preservation

Hub `6cfcb69` commits the ordering and collection-preservation proofs needed to
compose the already checked cache operations. This is a support checkpoint:
reachable cache-state invariants and finite operation histories remain open.

GPT-6.1 Sol implemented the two proof leaves, GPT-6 Luna executed their manual
Linux checks, and GPT-6 Astra reviewed statements, source identities and complete
logs. Runtime source remains Hub `688b91a`, SDK `154a473`, Core `120306e`. No
runtime, generated model, primitive-model or tool dependency changed.

## Contracts and scope

[CacheKeyOrderProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheKeyOrderProof.lean)
connects the actual extracted key comparator to a lossless lexicographic code.
The code retains generation, principal, every fingerprint byte and server. It
proves strict-order laws and code injectivity without assuming that authorization
hashes are globally injective.

[CacheMapInvariantProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheMapInvariantProof.lean)
proves the following for the concrete external map model used by the extraction:

- Strictly ordered keys are unique; insertion, removal and head removal preserve
  that ordering and uniqueness.
- Insertion returns the complete previous value, writes the complete new value
  and preserves other keys' complete values. Replacing an existing key does not
  grow the map; inserting an absent key grows it by exactly one.
- Removal returns the previous value, removes the key, never grows the map and
  preserves unrelated values.
- Making room then inserting preserves a bound of 4096 entries. A named eviction
  victim belongs to the original map and is its minimum key.
- Removal and making room preserve arbitrary predicates on stored keys.
  Insertion preserves them when its new key satisfies the predicate. These
  lemmas will support generation coherence in the next state proof.

These proofs start from ordered map inputs. They do not yet establish that every
state reachable through the actual Hub operations meets those premises, and they
do not verify Rust's standard-library `BTreeMap` implementation.

## Execution and repairs

The checker reused the qualified Lean 4.35.0/Aeneas setup, including its recorded
private dependency override and existing discriminant instance-name patch. No
model or prior proof dependency was rebuilt. Both commands used
`LAKE_NO_UPDATE=1` and a 180-second per-stage bound.

1. The first key check failed after **8.088 s**. A generic linear-order lemma
   selected a different comparison instance from the actual lexicographic
   comparator. The fix uses the standard library's laws for the exact comparator
   already connected to the extracted code. The map stage was skipped.
2. The repaired key leaf passed after **12.449 s**. The first map check failed
   after **2.769 s** because a named ordering predicate was not unfolded in the
   removal proof. A one-line proof repair preserved every map contract.
3. The map-only retry passed after **2.533 s**, reusing the exact accepted key
   artifact. Its command was `lake env lean CacheMapInvariantProof.lean -o
   .lake/build/lib/lean/CacheMapInvariantProof.olean`; the key check used the
   corresponding `CacheKeyOrderProof` paths.

The accepted pair passes **32 executable axiom guards** and twelve printed
theorem-closure audits. Each permits only `propext`, `Classical.choice` and
`Quot.sound`; none contains `sorryAx`. Failed draft proofs were rejected by the
compiler and audits, not accepted with additional assumptions. Remaining warnings
concern unused tactics and deprecated conditional lemma names.

The final run checked the fifteen recorded source/configuration identities and
effective private configuration, ten prerequisite OLeans, supporting source hashes
and unchanged Mathlib import artifacts. Final artifacts:

- Key-order OLean: **97,360 bytes**, SHA-256
  `99c1b330a28ab1e2c70c1d34a035970eaf2df67c3f011f250dbddc4c8bc15038`.
- Map-invariant OLean: **364,144 bytes**, SHA-256
  `04d441d950a8c35fc2e5e3c51579611863a5bdd332fb0cc2d30de02f99e294c2`.
- Final map log: **2,661 bytes**, SHA-256
  `28b127e6022737b3fab862072cde1d9b758f6224e6085978d6a5ef33c9bd7a2f`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/key-map-invariants-20261031.json)
retains the source map, commands, failed attempts, successful artifacts, audits
and two transfer-setup mistakes corrected before compilation. Neither proof
repair was a Hub runtime bug.

## Remaining work

Derive ordering, uniqueness, capacity and generation coherence from an empty
cache through actual normal-return operations, then establish finite-history
guarantees and qualify actual-source semantic controls. Native collection/time
correspondence and async mutex refinement remain explicit boundaries. Server-wide
invalidation still has its recorded translator limitation; listener freshness
and cross-replica delivery remain unproved.

No native tests or full Docker suites were rerun for this proof-only checkpoint.
No remote push, deployment or model-driven acceptance occurred.
