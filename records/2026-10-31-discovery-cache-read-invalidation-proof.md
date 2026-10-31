# Exact cache reads and key invalidation

Hub `4500e6d` commits the first discovery-cache contracts against the actual generated Rust
operations. They cover full cached reads, cached-only removal and full key
invalidation, including preservation of unrelated entries. Fetch start/completion
and composed stale-response histories remain to prove. Server-wide invalidation
remains explicitly unsupported by the pinned translator's callback interfaces.

GPT-6.1 Sol implemented the standalone primitive models and contracts; GPT-6 Luna
executed the bounded Linux checks; GPT-6 Astra reviewed the source correspondence,
contracts, logs and hashes. No runtime source, authorization rule, dependency pin,
deployment or CI behavior changed in this checkpoint.

## What is checked

The [proof leaf](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheKeyFrameProof.lean)
derives the actual generated key comparator from all four fields: catalog
generation, principal, authorization fingerprint and server. Equality is proved
against whole keys; it is not supplied as a desired comparator outcome.

Independent lookup and erase definitions retain whole values. Their contracts
are connected to the implemented primitive map operations, then to the extracted
Hub operations:

- `cached_exact` returns the complete cloned descriptor vector and denied count,
  or the actual missing result. The supplied payload clone dictionary must
  preserve each value; that premise is explicit.
- `remove_cached_exact` changes only the selected entry in the descriptor map.
  Every in-flight ticket, retry record and the generation remain intact.
- `discard_key_exact` erases the selected key from all three maps while retaining
  the generation. The other-key frame lemma preserves every unrelated whole
  value; combining it with this exact transition connects it to Hub's operation.
- Absence of the removed key is proved for maps with unique keys. The proof does
  not pretend that deleting the first occurrence from an arbitrary duplicate-key
  list removes every occurrence.

This is a prerequisite for stale-response fencing, not that completed proof.
Cached-only removal deliberately leaves a legitimate fetch running. Full
invalidation also clears its ticket; proving how a later completion responds is
the next slice.

## Source and translation

Input runtime source is Hub `688b91a`, represented by the same frozen `f81159f`
archive plus reviewed overlay, SDK `154a473`, Core `120306e`.
`discovery.rs` SHA-256 is
`4413008d7edfc56559857cb184351464f707ceb7dd21972cfa501e4bd01c77f0`.

Five roots and 18 includes select the five supported operations, their two
predicates, key derives and the actual SDK TTL initializer. There are no explicit
opaque overrides. Native dependencies still require external primitive models.
Charon completed in 34.361 s with transparent, error-free selected bodies; Aeneas
completed in 1.324 s. Both raw generated files remain byte-identical:

- `Funs.lean`: 33,054 bytes, SHA-256
  `14d75fc6a7ba823546a5d6743f476dd48e246e8c57c3a73573fd22dceebe8706`.
- `Types.lean`: 3,732 bytes, SHA-256
  `06d0d11d8e8319646e723752c693b4dec301ae1833ad544cfc89bee23a9b05a3`.

An initial five-root diagnostic failed because a disposable namespace wrapper was
placed before Lean's module/import preamble. Moving only that wrapper after the
preamble made all four raw-interface modules compile in 13.224 s. That diagnostic
used uninterpreted external templates and established interface compatibility
only. The subsequent semantic model replaces those templates with explicit
primitive definitions. Native `Instant.add` remains an explicit third-party
`Result` boundary; none of this checkpoint's checked read/removal contracts
depends on that axiom.

## Validation and observed errors

The implemented four-module model built in 10.685 s. Its compiled outputs were
then reused unchanged for the proof-only iterations:

- First proof attempt: failed in 6.235 s on Lean rewriting/API and record syntax
  errors. A referenced helper belonged to an earlier proof package rather than
  Aeneas; a small local proof replaced that missing reference.
- Second attempt: failed in 2.998 s on remaining notation, reflexive comparison
  and tuple-reduction goals. The primitive model and contract statements were
  unchanged.
- Final attempt: passed in 4.230 s. Ten executable axiom guards completed. Five
  printed audits report only `propext`, `Classical.choice` and `Quot.sound`.
  The guards rejected the earlier incomplete proofs' `sorryAx` dependencies.

The successful leaf SHA-256 is
`c8cbac62e63c314fb9921fa6a9aa5cdae3fa4f777445a781936e891ac9d54bdd`.
Its compiled OLean SHA-256 is
`77db850a6d78475196f50a3195f152020f86b77b150d9d9c77e7a627ce150373`;
the final log SHA-256 is
`75c05b947e0db53c991746a8244abc9405dcb6fab4d628f415923900551bbc97`.
Remaining log warnings concern unused simplifier arguments and a deprecated
lemma name; no proof error was ignored or audit relaxed.

Checks used Lean 4.35.0 and the previously qualified Aeneas dependency at
`fdebf20`, including its existing instance-name fix. This cache graph contains no
new discriminant definitions suggesting a direct need for that fix, but clean
upstream reproduction was not measured. The private Lake configuration also
retained the diagnostic package name while preserving the same module roots;
its exact identity and dependency override are recorded. The committed package
uses its canonical name and pinned dependency. No new tool patch was introduced.

## Boundaries and next work

The operational map model is an association list. Native correspondence requires
coherent borrowing and ordering, unique keys and representable lengths;
minimum-key eviction additionally needs sorted order. Identifier/string/UUID
representation, payload clone behavior, allocation/destructor effects and native
mutex/clock/request-ticket observations remain explicit boundaries. Time models
nanoseconds rather than truncating native comparisons to milliseconds. UUIDs
retain 128 bits; no impossible globally fresh finite UUID axiom is introduced.

Next are complete start/completion transitions, capacity behavior, and finite
histories proving stale responses cannot overwrite or finish replacement work.
Semantic controls for this state-machine slice remain pending. This checkpoint
does not establish listener/cursor behavior, native hash-key construction,
cross-replica propagation, server-wide invalidation or the full cache lifecycle.

The [extraction receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/five-operation-extraction-20261031.json)
and [read/invalidation receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/read-key-invalidation-20261031.json)
preserve exact inputs, commands, outcomes, output identities and assumptions.
The separately recorded 22 native tests were not rerun for these proof-only
edits. No broad Docker suite, deployment, paid model call or remote push is
claimed.
