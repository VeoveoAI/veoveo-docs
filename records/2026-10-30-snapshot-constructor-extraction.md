# Actual snapshot constructor: extraction and model adoption

Hub commit `dd20465` adds the unchanged `RegistrationSnapshot::new` constructor
to the extracted request-composition model. Its generated body retains the generic
iterator, the actual `(server.deployment, Arc::new(server))` mapping closure,
map collection and the existing `of` call. Existing generated definitions are
unchanged. This is supporting extraction/model qualification; constructor coherence
and the connected route theorem are not yet claimed.

## Execution

GPT-6.1 Sol prepared the extraction and handwritten primitive adapter; GPT-6 Luna
ran the bounded logged checks on Linux x86_64; GPT-6 Astra reviewed the source,
raw generated diff, audits and evidence, then committed the checkpoint.

The source remains Hub `3bc2923`, SDK `239622d` and Core `120306e`. The frozen
constructor probe adds only one start/include to the previously qualified plan:
16 starts, 51 includes and 15 opaque selectors. Namespace construction and SDK
issuance keep their prior explicit boundaries. The only scratch source annotation
is the existing reversible catalog-field name annotation; no Rust expression or
dependency changed. A stale inherited plan flag suggesting a scratch refactor was
explicitly overridden by the frozen source map, with no refactor applied.

- Charon 0.1.293 passed in **24.210 s**, with no LLBC errors and all 16 requested
  transparent roots. The constructor and both closure-call bodies are transparent.
- Pinned Aeneas passed in **2.072 s**. Types gains one closure alias; functions
  gains 105 lines for the constructor and its closure methods/instances.
- The first six-target Lean build failed in **8.889 s** because generated generic
  dictionary dispatch calls `Iterator.map`, whose method entry point was missing
  from the pinned Lean builtin. This was not a native Rust defect.
- Adding a handwritten method adapter forwarding to the existing `map.default`
  model fixed that interface. The same six-target build passed in **23.911 s**:
  `RequestCompositionHub`, `SnapshotAssemblyProof`, `SelectedRegistrationProof`,
  `SelectedCollectionProof`, `SelectedMapInsertionProof` and
  `SelectedMapCollectionProof`. Lean is 4.35.0; invocation is manual with
  `LAKE_NO_UPDATE=1 lake build` and the existing private patched-tool workflow.

The handwritten model also defines the exact emitted `Arc.new` signature by the
existing allocation-erased whole-value representation. No generated file was
patched. Native allocation/refcounts, map representation, compiler and translator
correspondence remain trust boundaries. The generic constructor does not imply that
arbitrary user-defined iterators terminate. Later coherence proofs must allow
repeated deployment IDs and ordinary last-write-wins replacement.

## Evidence and limits

All 64 tracked private source/configuration paths matched before and after the
passing build. Existing executable axiom audits passed unchanged: only their
previous standard, namespace-helper and error-formatting boundaries are allowed.
New route and constructor proof leaves were excluded from this check. Existing
OLean files observed after the failed build were not treated as passing evidence.

The [extraction receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/snapshot-constructor-extraction.json)
records exact commands, source maps, raw outputs and timing/log identities. The
[model receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/snapshot-constructor-model-checkpoint.json)
records the failure, adapter, effective 64-path map and passing artifacts.
Generated functions SHA-256 is
`5fb3e9161019c59a86f44755df3206446f6bd2d9185d02cb7a48ea662e07bc5d`;
generated types SHA-256 is
`526a91b1996cde967a903e032f420f4155281a4b606adc0e9f7abca8cb3b483b`.
The passing log is
`b0663d097f22310f1f33707cc5ea7acb2b0bb7ee88f20de22a95fb7e5718a4e2`.

Temporary runner path-root and summary-field mistakes stopped before Lean. A
mistaken transfer copied the SSH identity to a temporary path on the same trusted
Linux target; that path was removed and its absence verified without outputting
contents. The temporary summaries retain these setup failures. No credential
rotation, runtime change, native component test, full Docker gate, deployment or
paid model call occurred. This checkpoint is committed locally, not pushed.
