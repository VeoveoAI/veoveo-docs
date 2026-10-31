# Finite selection scan and exact eligible rows

Hub commit `282acdc` proves that the explicit iterator model terminates on
finite component input, using the already qualified extracted selection-entry
predicate. The reference output contains exactly the eligible complete registration
rows, and two emitted rows with the same deployment key must be identical.
This advances full selection correctness; it does not yet prove map collection.

## Contract and source boundary

`Eligible snapshot components key row` independently requires a component selecting
that deployment key, a keyed snapshot lookup returning the whole row, and a row slug
matching the component slug. `emitted_membership` proves both directions of the
reference sequence's correspondence with that relation. `emitted_key_functional`
then establishes whole-row equality for equal emitted keys without assuming unique
component entries or a desired routing result.

The other three declarations establish the raw component cursor law, totality of
this package's `filterMapNext` recurrence, and its filtered cursor law. Each step
preserves the captured snapshot and advances through the reference sequence. The
recursion decreases the finite raw suffix, including skipped entries.

The entry predicate is actual extracted Hub code, qualified by the
[source-mutation control](2026-10-30-selected-entry-control.md). The iterator and
collection primitives are explicit handwritten operational models, not extracted
Rust standard-library implementations. Native iterator, BTreeMap, Arc, equality
and compiler/translator correspondence remain assumptions. The new claims use no
namespace-helper or SDK issuer result.

## Execution

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran unattended Linux checks, and
GPT-6 Astra reviewed its contract and evidence. Runtime inputs remain Hub
`3bc2923`, SDK `239622d` and Core `120306e`. Generated models and the qualified
entry proof are unchanged. Checks use Lean 4.35.0 with the existing explicit
[private patched-tool setup](2026-10-30-request-composition-tool-imports.md).

Four direct proof-development attempts failed in **2.622 s**, **2.472 s**,
**2.522 s** and **2.674 s**. The causes were unreduced iterator projections,
rewriting the finite suffix too late, a generated callback not matching the trait
projection used in a rewrite, and finally a redundant simplification tactic.
The independent contract stayed unchanged. These were elaboration/tactic failures,
not discovered production defects or semantic-control results.

The final direct command,
`LAKE_NO_UPDATE=1 lake env lean SelectedCollectionProof.lean`, passed in **2.774 s**.
The explicitly requested nondefault target,
`LAKE_NO_UPDATE=1 lake build SelectedCollectionProof`, passed in **3.429 s**.
All five executable axiom audits permit only `propext`, `Classical.choice` and
`Quot.sound`, with no `sorryAx`.

Proof SHA-256:
`ee42d4430aaff9e1d01949b13488b806178890bf3bc9805c80bb1fb1421de8b0`.
Compiled proof SHA-256:
`d4510ce839ec95aa2f9a6a33aae7fb372c02931999510ddc3e861cac17135830`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/finite-selection-scan-checkpoint.json)
records the commands, measured results, source identities, failures and limits.
Its SHA-256 is
`e621d639ca0c1fbd10e4a5ba7c62d4946e7970ac79f120a39741c570c577bde6`.
Temporary logs remain under
`/tmp/hub-request-composition-20261030/evidence-selected-collection-*/`.

Review found an asymmetry in the temporary target receipt's serialized maps:
the before field included the new proof but the old private Lake configuration;
the after field included the updated configuration but omitted the new proof.
The runner had checked the correct effective 62-file map. A read-only supplement
reconciles that map and verifies the actual proof, configuration and compiled
artifact hashes. It is included in the committed receipt; the original temporary
receipt was preserved, and no build was repeated or source changed.

## Remaining work

Ordered map insertion, the complete `collectMap` result and the actual `selected`
method's connection to that result remain open. Per-slug route uniqueness,
constructor coherence, namespace construction, current-policy provenance and SDK
issuer/recipient composition also remain open. The reference-sequence theorem
alone does not establish the final route map.

No production source, generated model, dependency pin or runtime policy changed.
These were manual proof checks; no native component run, full Docker gate,
deployment, paid model call or new CI mechanism was involved.
