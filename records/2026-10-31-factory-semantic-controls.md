# Factory: wrong-result and wrong-refusal controls

Two deliberate faults in the manual Factory model are now detected by unchanged
populated execution assertions. Independent witnesses first establish the complete
wrong outcomes. Reversing each patch restores all nine scratch source files exactly;
fresh baseline model, fixture and both acceptance assertions then pass. This checks
that the assertions distinguish valid success from the intended regressions.

The runtime correspondence is Hub `48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`.
Before this checkpoint, Hub main was `c96f5481ebee1ac1360b68df37a5b912eccfc285`;
its runtime sources and dependency pins have not changed since that correspondence
revision. This adds proof sources and evidence only. The
[earlier native retarget defect and correction](2026-10-31-factory-retarget-fix.md)
remain separate evidence; these synthetic faults are not new production bugs.

## Assertions and faults

The fixture specifies all 21 row columns, complete modeled client/provider/native
and creation-request outputs, exact command arguments and ordered events. Expected
values are written independently, without using the model's success-row builder or
program as an expected-output oracle. Acceptance is checked, not assumed. The
fixture's valid identifiers, source-script bytes and four public synthetic raw-token
SHA-256 pairs were independently checked; they are not actual issued credentials.

- **Target omission:** remove only the linked repository and tracked-branch ID
  assignments from the target update. The independent witness proves normal return
  with the complete wrong stored row/client/provider material retaining target A,
  while the new request/command names target B. The unchanged complete retarget
  assertion rejects this result.
- **Capacity boundary:** change only enforced admission's refusal from `count > limit`
  to `count >= limit`. With no native sandbox, no other faults and count = limit = 1,
  the independent witness proves the exact capacity error, complete failed row,
  unchanged provider state, absent native worker, no creation request and full refusal
  trace. The unchanged complete accepted-output assertion rejects this refusal.

These are standalone concrete execution assertions importing only the manual model
and fixture. They are not mutations of actual Rust, nor checks of unchanged generic
Choice/Recovery theorems under altered semantics. SQL/async/native correspondence,
external observations and caller serialization remain explicit interpretation
conditions. No Aeneas extraction or formal SQL refinement is claimed.

## Execution trace

GPT-6.1 Sol authored the sources, GPT-6 Luna ran unattended bounded Linux checks,
and GPT-6 Astra reviewed the exact source mapping, logs and restored receipts.
Lean 4.35.0 and Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679` stayed pinned.
Each command had a 180-second bound and `LAKE_NO_UPDATE=1`. No paid model scenario,
deployment or repeat native test battery was run for this proof-only change.

The sequence was `lake build FactoryRetargetModel`, then direct `lake env lean`
compilation of the fixture, the independent fault witness, and the unchanged positive
control, each with an explicit OLean output path. Each mutant used fresh own-package
artifacts. Restoration reversed the exact patch, compared the source map, and built
the model, fixture, retarget assertion and capacity assertion in another fresh graph.
Dependency caches were reused; proof artifacts never crossed a model mutation.

| Case | Model | Fixture | Independent witness | Unchanged acceptance assertion |
| --- | ---: | ---: | ---: | ---: |
| Target omission | pass, 7.538 s | pass, 3.095 s | pass, 21.736 s | expected semantic failure, 3.044 s |
| Capacity at limit | pass, 8.232 s | pass, 3.881 s | pass, 4.836 s | expected semantic failure, 3.075 s |

Both failures report that the complete expected-result conjunction is false.
The downstream `sorryAx` dependency is also rejected by the axiom audit, and no
failed positive-control OLean is accepted. The semantic mismatch, not that cascade,
is the fault-detection evidence. Successful witnesses and assertions use only
`propext`, `Classical.choice` and `Quot.sound`. Each execution theorem has a finite
local recursion-depth setting of 4096 and uses kernel-checked `decide`, not
`native_decide` or a new axiom.

The final positive baseline assertions passed in 22.710 s and 21.644 s. After target
patch reversal, the four fresh stages passed in 7.293, 3.054, 21.294 and 21.866 s.
After capacity patch reversal, they passed in 6.699, 3.884, 30.345 and 20.733 s.
All nine source identities match their baseline in each restored scratch package;
the four fresh OLean identities also match the baseline measurements.

Initial authoring failures are separate: ambiguous dotted constructors stopped the
first fixture check after 4.339 s, and the default recursion depth stopped the next
retarget assertion after 3.878 s. Qualification followed constructor qualification
and the finite local bound. Neither failure is counted as semantic detection.

## Retained identities and boundaries

Committed sources, patches and the compact per-stage receipt are in
[the Factory package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/SOURCE.md#standalone-controls-receipt).
The two fault-only witnesses stay under `mutations/`, outside ordinary baseline
targets. The canonical Lake file preserves the five existing manual targets and
adds only the fixture and two positive controls. The checked scratch Lake file also
declared the fault witnesses; the canonical package is not claimed byte-identical to
that scratch manifest. The checked Lean and patch bytes are identical.

- Final scratch input receipt: SHA-256
  `15e2b64f0b6480417429d853dea59ee665d1b643066e0f97fcfc4e15c6c624c3`.
- Source archive: SHA-256
  `f6c19dc84d2a93121d0a63ae29fa1a121a88654584cf92d5522dc6fbc65c4ec1`.
- Target patch: SHA-256
  `f7ad4c8ded6cdd02ea72775cea44dcc922eaf817c70f8bcb4b186189935bd192`.
- Capacity patch: SHA-256
  `e3200b48e9b48785e2820eba305f62e8267c8cdb6dcbc02e98de2881f39e6a74`.
- Target restoration receipt: SHA-256
  `8b7ab4cb660e68ad33917ad7fa8ad11b14180e242a143116183a30ff96136053`.
- Capacity final receipt: SHA-256
  `340e4984332dbcf03a135e5f59fa43418c2ddbbfd9e6db2603cb3af54035403c`.

Full logs, generated artifacts and private mutation trees remain temporary beneath
`/tmp/hub-factory-retarget-20261031/`. The committed compact receipt retains source,
patch, artifact and log hashes and measured outcomes. No CI job, test runner,
runtime authorization rule or production behavior was added.

The Factory coverage item remains open. Next is a deterministic native investigation
of a linked follower preparing from an old runner before acquiring its lock; this is
a hypothesis, not yet a reproduced bug. Finite-history composition, concurrent
registration publication, eventual recovery, Computer lifecycle and cleanup remain
separate obligations.
