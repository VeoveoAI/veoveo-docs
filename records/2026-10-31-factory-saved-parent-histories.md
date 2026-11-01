# Composed saved-parent update and retry histories

Seven manual history theorems pass Lean 4.35.0 in **4.873 seconds**. All seven axiom
guards and printed closures accept only `propext`, `Classical.choice` and
`Quot.sound`. The histories compose the checked admission and complete existing-
runner operations; they do not supply the desired intermediate state as a premise.

Runtime basis remains Hub `77b258ae10837a01ca7c7464e7c4245c94cd4105`. The frozen
proof source starts from `cd56e3bfe0ca4429386e87ebd174a2c2adddb241`, reusing all ten
accepted prerequisite source/artifact pairs unchanged. GPT-6.1 Sol authored the
leaf, GPT-6 Astra reviewed its statements, repairs and complete compiler output,
and GPT-6 Luna executed the bounded manual Linux checks. No runtime source,
authorization rule, deployed service or CI behavior changed in this checkpoint.

## What is established

The source is
[FactorySavedParentHistoryProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactorySavedParentHistoryProof.lean),
with its native interpretation in
[SAVED_PARENT_SOURCE.md](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/SAVED_PARENT_SOURCE.md).

- `newer_parent_then_saved` executes a normal newer-parent application first. It
  derives the exact child outcome and successful Factory result, complete modeled
  row/native/provider/request values, client identity and both status maps. A saved
  retry of a different parent revision then observes the newer native branch and
  discards either its source success or source error, preserving that whole state.
  When the link-failure clear did not commit, every pre-existing full diagnostic
  payload remains through both operations. The initial failure is an input, not
  something this theorem claims to create; revision hashes are compared for equality,
  never ordered.
- `current_error_then_obsolete` first publishes an actual current-head source error
  with its revision, pusher, message and timestamp. A subsequent obsolete attempt
  cannot change that result. Commit and acknowledgement remain separate observed
  facts, including a committed write with an error/lost reply.
- `normal_then_current_duplicate` first applies a normal update and clears both
  diagnostic keys. Its actual row/identity effects establish the next row, Runner
  shape and structural prefix domain. The current-head saved retry then succeeds
  on that resulting state with complete child/Factory outputs, despite both
  diagnostic records being absent. No desired second before-state is assumed.
- `changed_head_rejects` and `deleted_name_reuse_rejects` preserve arbitrary complete
  state. The latter covers a deleted old ID even when its name and head still match;
  it preserves an existing replacement but does not derive the replacement's
  creation. The remaining two declarations establish structural domain transfer
  from actual identity/status effects and from the first successful child.

The successful-application domain remains one existing runner with a structurally
quiescent ordinary-instance/membership prefix. Native faithful reads, actual scoped
mutex ownership, no interfering writers, truthful native branch observations,
atomic SQL statements and inherited parser/service/crypto contracts remain
interpretation assumptions. Lore may advance after its observed snapshot. These
are manual executable-model proofs, not Aeneas extraction, formal async Rust/SQL
refinement, cross-replica CAS, liveness, initial allocation or general retirement
proofs. Client projection and submitted argv do not prove token issuance or live
checkout bytes.

Independent populated complete sequences and deliberate semantic faults with exact
restorations are next. The deleted-name case still needs an actual replacement
sequence in those examples. This checkpoint does not close the Factory lifecycle
or the comprehensive Hub verification goal. The
[native correction](2026-10-31-factory-saved-parent-retry-fix.md),
[model elaboration](2026-10-31-factory-saved-parent-model.md) and
[foundation proofs](2026-10-31-factory-saved-parent-foundation.md) remain separate
evidence; there were no component tests, deployed probes or model calls here.

## Execution and repair

Both runs used a private frozen packet, an absent target artifact, the ten accepted
prerequisites, pinned Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`,
`LAKE_NO_UPDATE=1` and a 180-second bound:

```sh
lake env lean FactorySavedParentHistoryProof.lean -o .lake/build/lib/lean/FactorySavedParentHistoryProof.olean
```

The first run failed in **5.022 s** with exit 1 and no target artifact. Three helper
uses lacked a local decidable equality instance, and a failure-map equality did
not reduce through local aliases. A downstream `rcases` failed, an unused simp
argument warned, and the axiom guard rejected `sorryAx` from unfinished theorem
elaboration. These were proof-authoring errors, not runtime bugs or deliberate
semantic controls.

The repair added local `classical` in that proof body, proved the noncommitted map
equality by function extensionality and composed it after expanding the local goal
alias, and removed the unused simp argument. All seven theorem statements,
assumptions, guards, model bytes and prerequisite files stayed unchanged.

The second run exited **0 in 4.873 s**, with no warnings or errors. All 15 frozen
files, ten prerequisite pairs and tool/package gates matched before and after.
The complete 720-byte output contains all seven successful axiom reports.

## Identities and retained evidence

- History source SHA-256: `23806660077ce7ed6fa53e4ee7ffe478ccae2ad83e944fc1d87f1069aebb2c67`.
- Inputs SHA-256: `1b6e1199a6e4400b3b491dcae95fcdc30d284ae3c6a191d264f20933033d8f2f`.
- Archive SHA-256: `d8a50e6234462407a74c6943d50709adbb9516e4ef8bf4a3344888bc9dfa4e20`.
- Fifteen-file map SHA-256: `8e26f03a90719353517ca028f3c75ec9d7fdfe443ef801e5169164bb21e9ae1a`.
- Fresh OLean: 752,280 bytes, SHA-256
  `fc4a01e5ddf484d06f6ca4f29d6c236fa7cc2ba529c239ce2baeee4c28850a65`.
- Successful log: 720 bytes, SHA-256
  `7c9921b8afe2cc9a9f75e8374f8ce216c38c13f75ea67a5876f3d723de0f0533`.
- Successful summary SHA-256: `1f3f13ddf9f1dfa28c8323688c076dfec2c3286ebadbe55a08af883948aff0fd`.
- First failure log: 2,551 bytes, SHA-256
  `ddc3a0e08f4dd492df1148db2f1a6698d8cd0e033314b1fbad690d2b4ad4988e`.
- First failure summary SHA-256: `5bd93243d446a5785aae7a418ad667b18a1c532cd8ea755819c9300736a79adc`.

The successful packet is
`/tmp/hub-factory-saved-parent-retry-20261031/saved-parent-history-check2/`; logs,
maps, summary and artifact are in the sibling
`saved-parent-history-check2-mirror/evidence-run1/`. The failed check1 packet and
mirror remain separate. Sources, the nondefault manual Lake target and this receipt
are committed; generated OLeans, logs and caches remain temporary artifacts.
