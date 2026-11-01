# Saved-parent retry model elaboration

The new manual `FactorySavedParentModel.lean` elaborates under Lean 4.35.0.
This is a checked definition checkpoint, not a correctness theorem, Rust
extraction, SQL refinement or additional runtime qualification. The
[native correction](2026-10-31-factory-saved-parent-retry-fix.md) remains the
separate component-test evidence for Hub `77b258a`.

GPT-6.1 Sol authored the model and its source correspondence document. GPT-6 Astra
reviewed it against the corrected Rust, native branch lookup and preparation SQL.
GPT-6 Luna ran the frozen Linux elaboration with the existing manual proof tools.
The prior Factory and watcher model/proof sources remain byte-identical. The only
package change is one additional nondefault manual target; no CI hook was added.

The model represents immutable preparation, then guarded native branch observation
and publication. It retains full parent preparation failures, independently observed
SQL commit/reply outcomes, existing link failures and the complete Factory state.
The native-head decision does not consult failure records. Accepted child requests
are constructed from source inputs and executed by the unchanged watcher/Factory
model rather than supplied as a desired output.

Review removed an accidental precondition that required a runner row even on
discard paths. `enter` now operates on arbitrary state, including no runner;
current source errors can also publish without one. Its concrete `Ready` value is
an internal proof decomposition while the native parent guard remains held.
Only `completeExisting` requires the existing row. The composition requires that
evidence conditionally, when admission actually reaches the child operation.
General missing-row allocation and membership retirement are not fabricated as
no-ops or caller-supplied successful effects.

## Execution and identities

The manual command, bounded at 180 seconds with `LAKE_NO_UPDATE=1`, was:

```sh
lake env lean FactorySavedParentModel.lean -o .lake/build/lib/lean/FactorySavedParentModel.olean
```

It exited **0 in 18.699 seconds**, with an empty compiler log and a fresh output.
The seven-file source map, two accepted prerequisite source/artifact pairs,
Lean/Lake tools and Mathlib pin were unchanged. No theorem guards or axiom-closure
prints were expected or claimed at this model-only checkpoint.

- Runtime source: `77b258ae10837a01ca7c7464e7c4245c94cd4105`.
- Coverage source basis: `e1101a7ab5b1f44b69d46592c8067d561cfa65d4`.
- Model SHA-256: `c1f2a591c3ba800a6a8f520f94f4feb4592e168a76ef11e8948dd547eedf952d`.
- Input packet SHA-256: `f88e139b4637e11f5faa5c3abe12ee2581c6a75971a3a786abf085ce071fbd86`.
- Source archive SHA-256: `62aef6eee1cea9fa9143ef965ea4a10024c620e8b78ad5376c62f0d082d56575`.
- Seven-file map SHA-256: `e2dec16ea3da1320d2a8b7ae8259eb5f058e4a282036aac9c97cb84b4ef10464`.
- New OLean: 1,560,832 bytes, SHA-256
  `edb01cb6615e49391f1ec24468213fb2e7b76fd898db7f6c1f45503b61082554`.
- Empty log SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
- Summary SHA-256: `1fcabf4886d917745597060b456edd2450159b5efe09583e95a1e8b9b99dc2c4`.
- Mathlib: `56a005855ea17e0b0958f73ec801ae140b0a1679`.

Prerequisites were the previously checked `FactoryRetargetModel.olean`
(`86d35cb19aea6b19727b3bb0fc2cfcb3c3c45674a05f063c3acbd053d1f402ee`)
and `FactoryWatcherModel.olean`
(`f0dc55f6804747bf83d40aadf572cfeaee9413162ee0907d5f7c8cc51aa5cbef`).
No prerequisite rebuild was needed.

The first packet was never executed: a likely reserved binder spelling was spotted
before launching Lean and renamed from `prefix` to `events` without changing model
behavior. Its transparent diff and unexecuted packet remain in temporary evidence.
This is not a failed proof or a runtime defect. The actual check is
`/tmp/hub-factory-saved-parent-retry-20261031/saved-parent-model-check2-mirror/evidence-run1/`;
the frozen source packet is the sibling `saved-parent-model-check2/` directory.

Correctness proofs, populated independent examples and semantic controls remain
pending. Native snapshot truth, process-local guard ownership/no interfering
writers, SQL atomicity and inherited external-service contracts remain explicit
interpretation assumptions. No deployment, paid model call or repeated native
test run occurred during this proof-only checkpoint.
