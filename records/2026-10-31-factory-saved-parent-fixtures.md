# Independent populated saved-parent histories

Five concrete complete-output histories pass directly against the manual executable
models. Fixture elaboration took **6.775 seconds** and the assertion proof took
**60.328 seconds**, with **67.104 seconds** total measured by the bounded runner.
All eight axiom guards and five printed closures accept only `propext`,
`Classical.choice` and `Quot.sound`.

The source basis is Hub `9429199e37ea7bcda23931f5da1fcd81098aa361`; runtime remains
`77b258ae10837a01ca7c7464e7c4245c94cd4105`. GPT-6.1 Sol authored the fixtures and
assertions, GPT-6 Astra reviewed the operation chains, independent expected records,
repairs and compiler output, and GPT-6 Luna ran the manual Linux checks. No runtime
code, deployed service, authorization rule or CI behavior changed.

## Inputs, operations and outputs

[FactorySavedParentFixture.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactorySavedParentFixture.lean)
imports the executable saved-parent model and public watcher fixture data.
[FactorySavedParentFixtureProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactorySavedParentFixtureProof.lean)
checks its assertions. Neither imports the foundation/history correctness leaves.

The initial existing runner serves parent revision1/Alice linked to A. Independent
starting data includes an old link failure and both related and unrelated parent
preparation failures. Parent revision2/Frank changes the program and linked target
to B/release/Dave. Each scenario executes the actual modeled first application;
the next backing row is read from that resulting state. A structural Ready helper
preserves the pre-child watcher state, and row-presence obligations are proved for
closed actual preceding executions. No expected B row or successful after-state
is supplied to justify a continuation.

1. **Newer application then old success:** apply parent2/B, then finish a previously
   prepared parent1/A success against the native parent2 head. The old attempt is
   discarded and all independently specified B outputs remain.
2. **Failed clear then old results:** B succeeds while the link-failure DELETE is
   observed not to commit and returns an error. The entire old diagnostic remains;
   old source success and then old source error are both discarded. The diagnostic
   cannot authorize replay. Its original creation is not claimed.
3. **Newer error then old error:** after B succeeds, a current parent3 source error
   publishes its exact revision, Frank identity, message and timestamp 43. That SQL
   write commits but its reply is lost; the trace retains both the error reply and
   warning. An obsolete parent1 error cannot replace this payload or B's outputs.
4. **Reused name:** a new parent ID9 actually applies B to the existing deployment
   under the same name. A retry of deleted old ID333 is discarded even when the old
   native record retains the original name and revision. This is replacement of
   an existing represented row, not initial allocation.
5. **Valid duplicate after clear:** the first operation clears both failure keys.
   A same-head saved retry still continues with a successful child/Factory result.
   Its preparation builds a different image while keeping the source tree, command
   and requirements unchanged. The existing reuse path keeps the first native
   image, providers and sole submitted request. Discard would fail this assertion.

Every scenario checks the independently specified complete modeled row, client
identity, native sandbox/spec, provider material, create-request history and full
argv, plus related and unrelated link/preparation status values. Expected records
reuse explicit public fixture data, not the model's success-row, configuration or
request constructors. These are synthetic model executions; no real Lore push,
OpenShell sandbox, PostgreSQL statement, media inference or model call ran here.

The [source interpretation](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/SAVED_PARENT_SOURCE.md)
and [generic history boundaries](2026-10-31-factory-saved-parent-histories.md) remain:
an existing runner and quiescent membership prefix on the accepted path, truthful
external observations, scoped serialized effects and inherited parser/SQL/crypto
contracts. The later ready observation is supplied separately from the earlier
provisioning acknowledgement. Submitted branch@LATEST argv does not prove checkout
bytes. No native async/SQL refinement, initial allocation, full retirement,
cross-replica ordering or liveness claim follows. Deliberate semantic faults and
exact restorations remain next; the broader Factory and Hub goals remain partial.

## Execution and authoring repair

Each attempt used nine frozen source/config files, four accepted model/data-only
prerequisite pairs, Lean 4.35.0, Mathlib
`56a005855ea17e0b0958f73ec801ae140b0a1679`, `LAKE_NO_UPDATE=1`, absent target
outputs and a 180-second bound per stage:

```sh
lake env lean FactorySavedParentFixture.lean -o .lake/build/lib/lean/FactorySavedParentFixture.olean
lake env lean FactorySavedParentFixtureProof.lean -o .lake/build/lib/lean/FactorySavedParentFixtureProof.olean
```

The first attempt stopped at stage 1 in **6.876 s**, exit 1, with neither target
artifact present. Three Ready-projection equalities needed explicit substitution,
and one record update had invalid field layout. The assertion stage did not run.
The repair changed only the helper proof body and layout, preserving all scenario
inputs, expected outputs and model bytes. This was an authoring repair, not a
runtime defect or semantic-control detection.

The second attempt passed both stages, with all nine files and four prerequisites
unchanged before and after. Stage 1 emitted two nonfatal linter warnings because
the final `all_goals rfl` was unnecessary after rewriting; stage 2 emitted only the
five successful axiom reports. No unfinished proof axiom was admitted. The accepted
bytes are retained instead of rerunning merely to remove that harmless tactic.

## Identities and evidence

- Fixture source SHA-256: `8bfa9b619a4f0ea4636d3d7834a40b7658c883edb3dca73f13804925aff4fd4e`.
- Assertion source SHA-256: `6e4cd31c8537d0243bd753eaa61a8cfbe2bbb386481c1c68ecb708938b0036c8`.
- Inputs SHA-256: `69799c10d05c6a9e5c5eb0c64897ce348a56ee3570ff2152c223505399d159e2`.
- Archive SHA-256: `4f401a028b66b0c559d55835ae80e85ce5dd9351a2563a517285005211dce242`.
- Nine-file map SHA-256: `c32543bf63382b864eed487b9bc6763a5c4e7d9ee8e27649fe82aaa1ba5e0786`.
- Fixture OLean: 469,800 bytes, SHA-256
  `0d2e59ab7d913d64967a1f50777fec3d053223a612333e9d0e3d87aaec2ffeaf`.
- Assertion OLean: 106,288 bytes, SHA-256
  `08cab5aa3e1b8aa8b744c2f637ecc23061a746016981d9c3031167d2397a8dde`.
- Stage 1 log: 338 bytes, SHA-256
  `e6bf3382c30ccfa85a141b13d60c8e56dbafd2d9451450d52b541f088b8ba1e1`.
- Stage 2 log: 685 bytes, SHA-256
  `95edec3ff72715ca6d059cd3bbc26933d76d983d55418facb3567b21b15ed8f6`.
- Successful summary SHA-256: `feac80de82f46072a3ded979ed576a9c8fc8eedcf8cf7b7ce45aec990fa6984d`.
- Failed first-stage log: 4,377 bytes, SHA-256
  `80e880f7bebd898ceeffb104373d19e1e0ad38b883fc7fb28c7fdc7db4ae80df`.
- Failed summary SHA-256: `2558f9dc7e00a3bbcbf71bd97c899072fd507e814e2255fda505b6d0a2ea4f12`.

Successful packet:
`/tmp/hub-factory-saved-parent-retry-20261031/saved-parent-fixture-check2/`.
Logs, maps, summary and artifacts are in the sibling
`saved-parent-fixture-check2-mirror/evidence-run1/`. The failed check1 packet/mirror
is retained separately. Sources, manual nondefault targets and this record are
committed; compiler outputs, logs and caches stay temporary.
