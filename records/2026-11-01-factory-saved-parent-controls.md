# Saved-parent retry semantic controls

Two deliberately faulty versions of the handwritten saved-parent model produce
the intended wrong outcomes and fail the same unchanged positive assertion. Exact
patch reversals restore all source/configuration bytes and the accepted compiled
outputs. The final five-history proof passes in **57.075 seconds**. This completes
the selected semantic-control checkpoint, not the entire Factory or Hub proof goal.

Source basis: Hub `9cb39b6efd90ffb82a43ef0740c642e0b8125462`; runtime-source basis
is `77b258ae10837a01ca7c7464e7c4245c94cd4105`. GPT-6.1 Sol authored the
control, witnesses and patches; GPT-6 Astra reviewed their properties, operation
chains, complete negative logs and restoration evidence; GPT-6 Luna executed the
bounded manual checks on Ubuntu Linux x86_64. No production code, deployment,
policy, CI job or paid model call changed or ran in this checkpoint.

## What was checked

The [positive assertion](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactorySavedParentControl.lean)
combines the existing independent `AcceptedThenOldSuccess` and
`ClearedThenValidDuplicate` propositions. It requires both protection of newer B
against obsolete A and actual successful continuation of a valid current-head
retry after both diagnostics clear. It imports only the executable models and
public fixture data; no generic foundation/history correctness theorem participates.

1. **Omit the head comparison.** The patch removes only
   `branch.latest ≠ attempt.input.revision`; ID, name, deletion and cancellation
   checks remain. The independent witness derives actual B success, actual B
   backing/current SQL projection, then successful old A replay despite the newer
   native head. It checks the complete wrong row, caller, native spec, providers,
   both submitted requests and argv, resolution inputs and full relevant/unrelated
   status values. Lean then establishes that the unchanged preservation assertion
   is false.
2. **Require a matching diagnostic.** The patch adds a source-success-only
   requirement for the exact link-failure key after native freshness succeeds.
   The independent witness derives actual B success and both cleared records,
   matching native ID/name/live/head, then a discarded valid duplicate with no
   child operation and all B provisioning outputs retained. The positive assertion
   requires a successful child, so preservation by refusal cannot satisfy it.
   The different rebuilt image remains explicit; the correct reuse path accepts.

Each wrong-outcome witness passes its standard-axiom audit. Each positive assertion
fails specifically because kernel `decide` establishes a false proposition, then
its axiom guard rejects the consequent `sorryAx`. No positive OLean is emitted.
The full logs contain no additional syntax, import, helper or resource error.
These are intentional model faults, not newly discovered native defects.

## Execution and restoration

Lean **4.35.0**, Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`, and
`LAKE_NO_UPDATE=1` were used with a **180-second bound per compiler command**.
Each case uses a separate private tree. Only the three accepted RetargetModel,
WatcherModel and WatcherFixture prerequisite artifacts are reused under a fault.

For each mutant, apply its exact patch with `patch --batch --fuzz=0 -p1`, then run
`lake env lean <module>.lean -o .lake/build/lib/lean/<module>.olean` in this order:

- `FactorySavedParentModel`;
- `FactorySavedParentFixture`;
- `FactorySavedParentHeadOmissionWitness` or
  `FactorySavedParentDiagnosticRefusalWitness`;
- the unchanged `FactorySavedParentControl` (expected compiler exit 1).

Restoration operates on that same mutated tree, requires its exact starting map,
reverses the same patch with `-R`, verifies the complete twelve-file baseline map,
and removes all derived artifacts while retaining the three unchanged prerequisites.
It freshly compiles Model → Fixture → Control. The last restoration also freshly
compiles `FactorySavedParentFixtureProof`, covering all five existing scenarios.
The final two positive leaves pass **nine guards and six printed closures**:
Control one/one plus FixtureProof eight/five. Those are axiom checks, not nine
execution scenarios. Successful closures contain only `propext`, `Classical.choice`
and `Quot.sound`.

| Phase | Compiler stages, seconds | Total seconds | Result |
| --- | --- | --- | --- |
| Positive baseline | 20.802 | 20.802 | Pass |
| Head comparison omitted | 4.923 / 5.024 / 18.546 / 17.949 | 46.446 | Witness passes; unchanged positive is false |
| Head comparison restored | 3.720 / 5.323 / 17.350 | 26.395 | Pass |
| Diagnostic required | 5.124 / 5.073 / 17.094 / 17.046 | 44.340 | Witness passes; unchanged positive is false |
| Diagnostic guard removed | 3.770 / 5.122 / 17.096 / 57.075 | 83.066 | Pass |

Both restorations reproduce the previously accepted model, fixture and control
OLeans byte-for-byte; the final fixture-proof OLean also matches its earlier
checkpoint. No generic correctness artifact is reused under a fault. A mutant
logger exit 0 means its expected negative was observed; the actual final Lean
compiler exits 1. Restored positive compiler stages all exit 0.

The first correct-baseline attempt was an authoring failure, not fault detection:
Model 4.873 s and Fixture 5.224 s passed, but the combined assertion failed
`Decidable` synthesis after 2.819 s. Splitting its proof into the two existing
conjuncts preserved the statement, inputs and expected outputs; the corrected
standalone baseline then passed. Failed baseline1 evidence is retained; controls1
was never executed and was superseded by controls2. The mechanical error filter
was also corrected to recognize both typed and ordinary Lean error headings.
The fixture retains its two known harmless unused/unreachable-tactic warnings.

## Identities and evidence

All hashes below are SHA-256. Common controls2 archive:
`cdb3e42cbe0d838b3d95636fc21322a0632e1a58f5abc25880db501af935f601`.
Full restored twelve-file source/config map:
`bc8bd0fd72af4a7652bf3a4d839017ea71fd52a33431887b89252a747171c6a8`.

Committed source identities:

- `FactorySavedParentControl.lean`: 1,077 bytes, `b90e53dbc48abb27190be433bb3ba068dd636a21216cdb32e85d6cdd994a8eee`.
- `mutations/FactorySavedParentHeadOmissionWitness.lean`: 3,386 bytes, `f2f5efe03d897d3de909b1f55c44a7fa9a84bd39e77466d50112691c83977ec6`.
- `mutations/FactorySavedParentDiagnosticRefusalWitness.lean`: 2,451 bytes, `10915b50721e64378f1c87fb6cbc7afd864f03e7c16cf56177b4b044f846e06f`.
- `mutations/omit-saved-head-check.patch`: 573 bytes, `310112589cca4afa4b932580999ef0c6a2f00ad7a14106333c8bd43769c7588b`.
- `mutations/require-saved-link-failure.patch`: 942 bytes, `d7b8c09c64034e464379745d70200a8cd56fcfb8e3fd98e52ce82dee9d39b245`.

Selected compiled evidence:

- FactorySavedParentControl.olean: 45,448 bytes, `d2cfc5d6fcbd3f555bbf525895b5c50a6062e97bb28056c6a721d490c76ef566` (Positive baseline).
- FactorySavedParentHeadOmissionWitness.olean: 95,736 bytes, `236443545f796832cef8380f03f5416decf8ec80371b65fbab288a02786d261a` (Head comparison omitted).
- FactorySavedParentDiagnosticRefusalWitness.olean: 69,632 bytes, `5f6eb2a4a4d88540f135925f60e361372ae3a2e831630ce677c5a50060ac4bc0` (Diagnostic required).
- FactorySavedParentFixtureProof.olean: 106,288 bytes, `08cab5aa3e1b8aa8b744c2f637ecc23061a746016981d9c3031167d2397a8dde` (Diagnostic guard removed).

Summary receipts (each records complete source/import maps, stage commands, output and log identities):

- Positive baseline: `734ac56001b37b4aa41e5e0f4ce8600e6ea3f1c7c6df262f55f33eb9692f531a`; input `5ccbe4905b92ce05c4407a22fdbc6a9d4594d468a4d44249eea56d4ad0cad5b2`.
- Head comparison omitted: `f582ed1887ae4ffde0fe95adf158ce324ddd6b5787c3c655bb0d8e6092bacdb1`; input `32a0e8b0bbe852f26089bee6afd9646321ecc01d62a7333f89db4d84285ca169`.
- Head comparison restored: `f3a9ec0a8c405694e6e19b3de83dab16e5b4e1cb1d8c66131525e4e4a4412085`; input `c1e51516b2b7ec82b0c83cab01787811ca0bf8dc724888c91babe2da63bbcac8`.
- Diagnostic required: `172c8fe48d3839fc7b4a1dc233981f66fc853d84e394292de189fc42d849a3c2`; input `282bd3d28e33497de111b668144df06066b3266bb41ab094ea772b16417b8208`.
- Diagnostic guard removed: `bf43259d04fec42f459b29732e46563a413340f6e29de875c059c617189f3dc7`; input `b3be3a671c414b7720e9a167f3c7ae1a7e94ecbbbabb5a36d5804abc00fb3ec9`.

The head-omission negative log is 3,255 bytes,
`548eaa19ba1002796d9ed5023e4c2d6f47855a2f54406c89d721f8536802a76d`;
the diagnostic-refusal negative log is 3,979 bytes,
`0cfebf80d4e15df0ccb5ed71320bca2c67c2903e390356f15d8990460efee53d`.
The final five-history log is 685 bytes,
`95edec3ff72715ca6d059cd3bbc26933d76d983d55418facb3567b21b15ed8f6`.
The failed baseline1 summary is
`99d0f7c33a9a315e2758f280ad4a85debb1fdb25d43f3acc9af6cebc00cbf52b`.

Temporary packets/logs/artifacts are under
`/tmp/hub-factory-saved-parent-retry-20261031/`: `saved-parent-controls-baseline{1,2}`,
`saved-parent-controls2/`, and mirrors
`saved-parent-controls2-{head-omission,diagnostic-refusal}-{mutant,restored}-mirror/`.
Each mirror's `evidence-run1/` retains full logs, maps and summary. The existing
20261031 temporary prefix is retained; this record is dated 2026-11-01. Sources,
manual nondefault targets and this receipt are committed; compiled artifacts,
archives, wrappers, logs and caches remain temporary.

## Boundaries

These are synthetic executions of a manually written model under the
[existing source interpretation](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/SAVED_PARENT_SOURCE.md):
an existing runner on accepted paths, quiescent membership prefix, truthful native
observations, scoped serialized effects, and inherited SQL/parser/crypto contracts.
They are not Aeneas extraction or formal refinement of native Rust/SQL. Actual
checkout bytes, external readiness, first allocation, general membership retirement,
concurrent registration/removal, cross-replica ordering and liveness remain open.
The [native bug/fix qualification](2026-10-31-factory-saved-parent-retry-fix.md)
and [five populated histories](2026-10-31-factory-saved-parent-fixtures.md) remain
separate evidence. No deployed probe or model-driven acceptance was performed here.
