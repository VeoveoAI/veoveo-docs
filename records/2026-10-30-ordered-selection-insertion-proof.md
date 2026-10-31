# Ordered selection-map insertion preserves complete registrations

Hub commit `ef07e8d` proves total insertion in the explicit map model used by the
extracted selection caller. It preserves strict deployment-key ordering, derives
unique output keys and returns exactly the whole-row union of the prior entries and
the inserted entry. No production defect was found or runtime behavior changed.

For an existing deployment key, whole-row union requires compatibility: the old row
must equal the new one. The proof derives this from the
[checked eligible-emission contract](2026-10-30-finite-selection-scan-proof.md).
It does not assume the desired final route map. Strict ordering is necessary because
the insertion algorithm stops at the first larger key; unique but unsorted input
would not suffice. Ordering holds for the empty accumulator, and each insertion
preserves it.

## Checks and evidence

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran unattended Linux checks, and
GPT-6 Astra reviewed its contract, source map and evidence. The runtime/model inputs
remain Hub `3bc2923`, SDK `239622d`, Core `120306e`, and Lean 4.35.0 with the existing
private patched-tool setup. The new proof imports the unchanged finite-scan proof.

The first direct check failed in **3.023 s**: three `change` tactics encountered
unreduced successful `Result` postconditions. Three explicit `WP.spec_ok`
simplifications corrected elaboration; contracts, models and the recursive branch
were unchanged. This failure earns no production-defect or semantic-control credit.

The corrected manual checks passed:

- `LAKE_NO_UPDATE=1 lake env lean SelectedMapInsertionProof.lean`: **3.024 s**.
- `LAKE_NO_UPDATE=1 lake build SelectedMapInsertionProof`: **3.473 s**.

All four named audits permit only `propext`, `Classical.choice` and `Quot.sound`,
with no `sorryAx`. Each run verified the same approved 63 paths before and after.
Only the explicit nondefault target was added between direct and target validation.
A first target-runner launch stopped before Lake because its frozen packet was
missing remotely; copying that packet preceded the one actual target execution.

Proof SHA-256:
`d960bd52bc76c831d357ddd20fa1183b1d6417b135ff5e001b8b17fc95ac9334`.
Compiled proof SHA-256:
`d2fade4b5b972b935ff3564edba8ec12680121fc675d61486ed28f26d0e54bba`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/ordered-map-insertion-checkpoint.json)
is SHA-256 `dac88f488963a0213d142a342bff17b6f3eded5f41e80965da438e1fcc7d6cf7`.
It retains commands, source/configuration reconstruction, measured results and log
identities. Temporary logs are in
`/tmp/hub-request-composition-20261030/evidence-selected-map-insertion-*/`.

## Boundary

This proves the handwritten collection primitive, not Rust's native BTreeMap
implementation. Native key representation/order, collection, equality, cloning and
compiler/translator correspondence remain explicit assumptions. No namespace-helper
success or SDK issuer result is assumed by these declarations.

The next operation is `collectMap`: prove its complete accumulated result and connect
that result to the actual `selected` method. Constructor coherence, per-slug
uniqueness, namespace completion and request/issuer composition remain open.
Production source, generated models and dependency pins are unchanged. No native
component test, full Docker gate, deployment or model call ran for this proof-only
milestone. The checkpoint is committed locally before advancing.
