# Cache state invariants and generation fencing

Hub `a34bab3` commits a checked invariant over the actual extracted cache
operations. Every normal-return mutation preserves ordered, unique maps bounded
by 4096 entries, with every stored key at the state's generation. Generation
never decreases. From that invariant, completing an older-generation response
returns `false` and leaves the entire state unchanged, without requiring fresh
request tickets.

GPT-6.1 Sol implemented the proof, GPT-6 Luna executed the manual Linux check,
and GPT-6 Astra reviewed statements, full logs and source/artifact identities.
Runtime source remains Hub `688b91a`, SDK `154a473`, Core `120306e`. Only a new
proof leaf and documentation were added.

## What is connected

[CacheStateInvariantProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheStateInvariantProof.lean)
defines the map/state predicates and proves them for an empty represented cache.
It then uses the previously checked exact operation contracts to establish:

- Actual `start` preserves the invariants and never decreases generation,
  including its generation reset, rejection and acceptance branches.
- Actual `complete` preserves the invariants and exact generation for every
  normal result. Matching an in-flight ticket derives the fetch key's generation;
  that relationship is not assumed independently.
- Actual `remove_cached` and `discard_key` preserve the invariants and generation.
- Strict ordering implies unique keys. The 4096 bound implies the physical usize
  bounds needed by earlier contracts, using the library's portable lower bound.
- An older-generation fetch cannot match a stored in-flight key, so actual
  completion is a whole-state no-op for any payload, denied count and clock input.

The transfer theorems take an invariant before the operation and its actual
normal-return equation, then derive the invariant afterward. They do not assume
the desired after-state. Clock, ticket, vector-comparison and native-addition
Results remain arbitrary; successful used observations follow from bind inversion.
Pending and retry records may coexist, and completion may carry any denied count.

The empty base is a structural representation, not a newly extracted native
constructor. The next step is induction over finite histories of actual method
equations, so an invariant need not be supplied separately at each history step.

## Measured check

The first direct check failed after **2.654 s**: arithmetic automation did not
reduce a constructed state's generation field, and `Bool.true_eq_true` was not
available in the pinned library. Explicit projection reduction and removal of
that nonexistent lemma repaired proof elaboration without changing any statement.

The second check passed with exit 0 after **2.776 s**:

```sh
LAKE_NO_UPDATE=1 lake env lean CacheStateInvariantProof.lean -o .lake/build/lib/lean/CacheStateInvariantProof.olean
```

All **17 executable axiom guards** passed: fourteen permit standard Lean logical
axioms only; three completion-related declarations also permit precisely the
existing native `Instant.add` Result boundary. Five printed closures are
standard-only and two include that boundary; none contains `sorryAx`. The only
remaining warnings concern three unused simplifier arguments.

Sixteen source/configuration inputs, the effective private configuration, eleven
qualified prerequisite OLeans and supporting library identities matched around
the run. Existing dependencies were reused without rebuilding. Lean 4.35.0 and
the previously recorded private Aeneas configuration remain the qualification
environment; clean unpatched upstream reproduction was not measured.

- Checked source: **14,095 bytes**, SHA-256
  `d6033c750c81723d08676a195545710c89cc5e681408f242c75ab8e867e8bde5`.
- OLean: **367,544 bytes**, SHA-256
  `6d08d94c6468d5186026264ca120947c9acf9e2f2d0cfad9685075e72d0fcc13`.
- Accepted log: **1,610 bytes**, SHA-256
  `b6ce5e8a324bb9fe9f9a916633a0ebea3542224aea74ead039740639ae59c138`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/state-invariants-20261031.json)
records both attempts, artifacts, commands, audits and prerequisite identities.
The initial proof errors are not production bugs or semantic mutation tests.

## Boundary and next work

This proves normal-return preservation, not native post-panic state, callback
invocation counts, liveness, initial construction or async mutex refinement.
Native collection, identifier, clone/equality and clock correspondence remain
explicit. Addition is not assumed total or future-valued.

Finite histories, same-key replacement fencing with scoped accepted-ticket
nonreuse, actual-source semantic controls, server-wide invalidation, listener
freshness and cross-replica delivery remain open. No runtime/model/tool changes,
native or Docker test reruns, remote push, deployment or paid model call occurred.
