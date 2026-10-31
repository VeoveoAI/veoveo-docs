# Exact registration lookup proof

Hub commit `9d064b6` proves the actual extracted
`RegistrationSnapshot::get` accepts exactly one matching registration and refuses
zero or multiple matches. It preserves the entire returned registration. This is
a checked part of request composition; full selection and the connection to
current authority and token issuance remain unfinished.

## Contract and implementation

[SelectedRegistrationProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/SelectedRegistrationProof.lean)
defines an independent specification: filter the snapshot's raw server values by
slug, return the sole value, otherwise return none. `get_exact` equates that result
with the untouched extracted Rust function for arbitrary snapshot contents. It
needs no hypothesis supplying the desired registration, no well-formed-map premise,
and no namespace-helper result. The actual function does not consult namespaces.

Three supporting declarations establish the value iterator, the actual extracted
slug predicate, and the finite filtered scan. The scan proof follows this model's
own recursive definition; it does not assume two separately elaborated recursive
definitions are equal.

The fifth declaration, `lookup_exact`, connects the handwritten comparator-driven
map model to independent keyed list lookup. That is a model contract for the
coming selection proof, not independent verification of Rust's `deployment`
method or its standard-library BTreeMap implementation. Native collection,
equality, clone and identifier correspondence remain explicit boundaries.

## Inputs and measured checks

GPT-6.1 Sol implemented the proof; GPT-6 Astra reviewed the contract, source
boundaries and commit; GPT-6 Luna ran the unattended Linux checks. Runtime inputs
remain the canonical Hub `3bc2923`, SDK `239622d` and Core `120306e` extraction
recorded in the [assembly checkpoint](2026-10-30-request-assembly-proof.md).
No runtime or generated-source bytes changed.

The checks used Lean 4.35.0 and the explicit private Aeneas patch and dependency
overrides from the [tool import checkpoint](2026-10-30-request-composition-tool-imports.md).
The committed Lake target is nondefault: ordinary baseline manifests still select
stock Aeneas. Its manual commands require that documented private tool setup.

1. `lake env lean SelectedRegistrationProof.lean`: passed in **2.869 s**.
2. `lake build SelectedRegistrationProof`: passed in **3.171 s**.

All five executable axiom audits permit only `propext`, `Classical.choice` and
`Quot.sound`; no `sorryAx` or unresolved own-code function is admitted. The 61-file
effective source/configuration map remained unchanged during the checks.

The proof source SHA-256 is
`8dd2e35b7e6ac6443547737148f33b95f2597ad7921b59231573b7be1542f128`;
its `.olean` output is
`83572a794c3da5a2332eaae6e66903427fdb9bc9a91717accaa65f37451352be`.
The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/registration-lookup-checkpoint.json)
retains the complete effective source map, commands, configuration identities and
log hashes. Summary SHA-256:
`4659115e67e836652c08f4139973b4c4562c7fa062778e404af63716135c98e8`.
Temporary evidence is in
`/tmp/hub-request-composition-20261030/evidence-selected-getter-checkpoint1/`.

## Failed attempts and remaining work

Earlier development checks rejected a claimed definitional equality between
separate recursive models, reserved syntax, ambiguous generated names, incomplete
normalization and an unsupported local reducibility annotation. These were proof
development failures. Their recovered `sorryAx` declarations were rejected and
receive no qualification credit. The committed proof needs no reducibility override.

The selection-entry closure remains unfinished; its draft was saved separately
and excluded from this commit. Full finite selection collection, derived route
uniqueness, constructor coherence, namespace construction, current-policy provenance
and actual SDK issuer/recipient composition remain open. Actual-Rust semantic
controls for this new lookup theorem are prepared but have not run. These checks
establish no SQL, asynchronous-caller, deployment or recovery guarantee.

No native component tests, full Docker gate, runtime change, deployment or model
call was needed for this proof-only checkpoint. The broader goal remains active.
