# Saved-parent admission and complete existing-runner output proofs

The manual saved-parent foundation passes Lean 4.35.0: 17 theorems and their
supporting definitions/execution entries pass all 28 axiom guards. Seven printed
closures admit only `propext`, `Classical.choice` and `Quot.sound`. The successful
check took **5.426 seconds** and produced a fresh proof artifact. This qualifies
the scoped manual model, not native async Rust or SQL refinement.

The [model checkpoint](2026-10-31-factory-saved-parent-model.md) and
[native correction](2026-10-31-factory-saved-parent-retry-fix.md) remain separate
evidence. Runtime basis is Hub `77b258ae10837a01ca7c7464e7c4245c94cd4105`;
the frozen proof source starts from `89b01968e18038f918adae8110206f014b839775`.
GPT-6.1 Sol authored the proof, GPT-6 Astra reviewed its complete statements,
repairs and compiler output, and GPT-6 Luna executed the manual Linux checks.

## What the foundation establishes

The implementation is
[FactorySavedParentProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactorySavedParentProof.lean).
Its state and source interpretation are in
[SAVED_PARENT_SOURCE.md](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/SAVED_PARENT_SOURCE.md).

- `obsolete_enter` preserves the whole Factory state and both failure maps when
  native branch ID/name/live/head no longer match. Source success and source error
  are both covered. There is no runner-row, uniqueness or membership premise on
  this discard path, so empty and deleted-runner states are included. The outcome
  also retains the modeled source/native attempt trace and guard release.
- Native lookup errors and the two actual cancellation observation points have
  explicit outcomes. A cancellation arriving after a status write starts is not
  treated as rollback of that write.
- `current_source_error` publishes the exact revision, pusher, message and timestamp
  at the preparation key, even with no runner. Its state follows the observed SQL
  commit independently of the reply; a lost/error reply can accompany a committed
  write. Unrelated preparation keys and all watcher/Factory state are preserved.
- `current_head_full` derives Ready data from actual current-head admission, then
  invokes the unchanged `Watcher.parentLink` and Factory operation. From native
  no-fault/capacity observations it derives the exact child outcome, actual Factory
  result with no error, complete modeled row/native/provider/create-request state,
  client identity projection and link/preparation-status effects. The desired
  Request and successful after-state are conclusions, not premises. Its own
  diagnostic row need not be present.

Successful application is explicitly scoped to an existing runner and a structurally
quiescent ordinary-instance/membership prefix. This is a before-state condition,
not a successful-output assumption. Native faithful prefix reads, actual scoped
mutex ownership, no interfering writers, native branch snapshot truth, atomic SQL
statements and inherited service/parser/crypto contracts remain interpretation
assumptions. A native Lore head may change after its observation. No cross-replica
CAS, liveness, live checkout bytes, full token issuance, initial allocation or
general membership-retirement proof is claimed.

The newer-parent-application followed by an obsolete saved retry is still a separate
composition to check. Independent populated cases and deliberate semantic faults
with exact restorations also remain pending; this record does not close the
complete Factory slice.

## Execution and proof-authoring repairs

Luna reused the nine previously checked prerequisite source/artifact pairs and
the pinned Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`. Each run used a
private frozen copy, absent target output, `LAKE_NO_UPDATE=1` and a 180-second bound:

```sh
lake env lean FactorySavedParentProof.lean -o .lake/build/lib/lean/FactorySavedParentProof.olean
```

The first attempt failed in **5.424 s**: a dependent match did not simplify, and
three rewrites could not see expressions under goal-level local bindings. The
second failed in **5.423 s** with only the preparation-map equality left after
simplification. Both emitted no proof artifact; their failed theorem elaborations
introduced `sorryAx` in diagnostics, which the final guards rejected.

Repairs changed only those proof bodies: explicit match splitting/injectivity,
reducing local bindings before rewriting, and reflexivity for the final equivalent
map expressions. Model bytes, theorem statements, assumptions, prerequisites and
guards did not change. These were proof-authoring errors, not newly discovered
runtime defects or intentional semantic controls. A handoff prose path typo was
resolved using the exact existing paths and hashes in inputs.json before execution;
no dependency rebuild was needed.

The third attempt exited **0 in 5.426 s**, with no errors or warnings, all 28 guards
and seven closure prints accepted. All 14 frozen files and nine prerequisite pairs
matched before and after. No native tests, paid model calls or deployments ran.

## Identities and retained evidence

- Proof SHA-256: `94ba7eb8ab31b310443bd2fdad41f3aafe3fb796bd14924fe6cb95139814e957`.
- Unchanged model SHA-256: `c1f2a591c3ba800a6a8f520f94f4feb4592e168a76ef11e8948dd547eedf952d`.
- Inputs SHA-256: `8fabf962ac0262cafab6adfb6d4c687d9b9ff55ab6095878ed2c94b0b6d3040b`.
- Archive SHA-256: `9113e1b92fe6fb2635915f33a921a6421080f4cf25608225ea8cb8c326fd7b1d`.
- Fourteen-file source map SHA-256: `2f8a3ceb61ebf5e137362795f3015da08d4f30b534e1fb54da4a69588c778065`.
- Fresh OLean: 423,976 bytes, SHA-256
  `e64d87af5776377b6d2629119443338429ddc429b7e7a34996bfb57c95abb66b`.
- Successful log: 626 bytes, SHA-256
  `689af0420a3ba0783dfeedaff8102b21b3d08e62edc6ac26f468d7266242b635`.
- Summary SHA-256: `6533d901afb7a7884e04d1def64aa9ba2531584e22a0fdf10b4a4ec7cd90620b`.
- First failure log SHA-256: `35405066995cda4fc08e7a3f76dcbc83597e64927b4e9eda6744c622ceda3a1d`.
- Second failure log SHA-256: `6f4a781df9ad1e8b83d5d29a87d8225de35fca7a7d828c2d18f9f82d7eaea54a`.

The successful packet is
`/tmp/hub-factory-saved-parent-retry-20261031/saved-parent-foundation-check3/`;
logs, maps, summary and artifact are in the sibling
`saved-parent-foundation-check3-mirror/evidence-run1/`. Attempts 1 and 2 retain their
own unchanged packets/mirrors. Proof sources, manual target and this receipt are
committed; generated OLeans, logs and caches stay temporary.
