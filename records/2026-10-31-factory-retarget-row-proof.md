# Factory retarget: complete row and error-state proof checkpoint

The manual Lean package
[factory_retarget](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/README.md)
now has checked contracts for the complete successful instance row, linked-target
consistency and modeled returned errors. Its source correspondence is to Hub
`48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`. This is a handwritten model of
the sequential async/SQL protocol, not Aeneas-extracted implementation verification.
No runtime source changed for this checkpoint, and no deployment was performed.

## What is established

`successful_apply_exact` derives all 21 columns of the final `hub.instance` row
from the modeled operation sequence. Its specification independently lists the
expected row fields; it does not assume the desired final row or merely name the
operation fold as its specification. It preserves deployment, database, parent
repository/branch, link name and creation time; records the requested target and
revisions; and distinguishes kept, restarted, replaced and newly created sandboxes
for credentials, serving marker and capacity warning.

`successful_target_client_selection` connects that result to the complete client
projection's linked identity and the composed repository/tracked-branch push
selector. Separate lemmas exclude another target and show that a newly configured
raw client secret matches the stored digest under the explicit native hash relation.
The issued sandbox-request construction retains the full command and request
fields, but its construction lemma is not a proof of remote receipt or execution.

`apply_frame` and `apply_identity` preserve unrelated whole model objects and
immutable row identity through every modeled normal return, including errors.
`stopped_row_exact` establishes the exact row at a failed step. SQL errors can mean
either no commit or an atomic commit followed by a lost reply; failure logging can
commit independently. `uncertain_target_write` retains both outcomes, and the
original error survives best-effort logging. Connecting these step contracts to
every complete failure prefix and retry remains subsequent work.

`historical_omission` demonstrates why the old SQL was inconsistent: it retained
the old repository/tracked ID while constructing the new target's command. This
manual counterexample complements the original-source native reproduction in the
[retarget fix record](2026-10-31-factory-retarget-fix.md); it is not an injected
actual-Rust control or a new bug found in this checkpoint.

## Execution trace

GPT-6 Astra reviewed source correspondence and theorem scope; GPT-6.1 Sol wrote
the model and proofs; GPT-6 Luna ran bounded unattended checks on the Linux
reference machine through the existing SSH tunnel. No OpenCode or paid provider
model calls were made. Lean is pinned to 4.35.0 and Mathlib to
`56a005855ea17e0b0958f73ec801ae140b0a1679`. Dependencies use the existing verified
cache; project artifacts are fresh except for the explicitly verified unchanged
model reused in the proof-only correction.

The frozen input packet contains seven files. The command bounds are 180 seconds
per stage, with `LAKE_NO_UPDATE=1`:

1. `lake build FactoryRetargetModel`: exit 0 in 6.686 seconds. This model includes
   the direct `runner_applied` read/failure, raw secret versus digest, complete
   refresh client material, and the native sandbox observation at its actual read.
2. `lake env lean FactoryRetargetProof.lean -o .lake/build/lib/lean/FactoryRetargetProof.olean`:
   the first attempt exited 1 in 10.458 seconds. Errors were in proof tactics:
   missing equations after Boolean splits, a shadowed stage binder, reflexive
   conjunctions and optional-list indexing. Its axiom guard also rejected the
   unresolved proof dependencies. No proof artifact was accepted.
3. The same direct command after proof-only repairs exited 0 in 10.278 seconds.
   The model and mathematical statements were unchanged; the optional-index
   expression used the supported notation. All seven frozen files matched after
   execution. All 24 executable dependency guards passed, allowing only
   `propext`, `Classical.choice` and `Quot.sound`. These are axiom audits, not 24
   behavioral test cases. The log retains unused-variable/simp-argument warnings;
   it has no errors or `sorryAx` dependencies.

This checkpoint did not run a package-wide target or repeat native tests. The
previous native correction's full Mac/Linux checks each passed 460 tests with
two skipped, as recorded separately. Those tests and this model proof establish
different evidence and are not substitutes for each other.

## Reproduction identities

Temporary evidence is under `/tmp/hub-factory-retarget-20261031/`. Source, pinned
tool configuration and proofs are committed; `.lake` artifacts and full execution
logs remain temporary. The receipts distinguish the failed attempt from the final
passing command.

- Final input packet: `result-check2/inputs.json`, SHA-256
  `431af0711420fa49e2e4728f28714e56ada755bfdf7aeaced453e4e061a37084`.
- Final seven-file archive: `result-check2/source-files.tar`, SHA-256
  `4052a79bf170e2d4f84edc9ac75cad3c8329c73e9f6f80524d3d7c31a5c6bf7b`.
- Model source: 21,499 bytes, SHA-256
  `52f6da22b5acc42fdff56c6f0d32c28996f1953ce3da958a23c8fe9fbce51bf0`.
- Final proof source: SHA-256
  `ea62b2e5ef873b87fd1c5eb0b31668fb365ed2f339f5057527194c3d8988fead`.
- Accepted model OLean: 3,832,936 bytes, SHA-256
  `86d35cb19aea6b19727b3bb0fc2cfcb3c3c45674a05f063c3acbd053d1f402ee`.
- Fresh proof OLean: 4,229,544 bytes, SHA-256
  `7a72412270c42a64c968935a531750770bb3456f7eaa92c7deb1613711aa7564`.
- Final log: `result-check2-mirror/run1/logs/proof-direct.log`, SHA-256
  `6a3b815a24155bd486c9de2fa55be651bfc88c1d9e60d55035b1b7eef821f30a`.
- Failed proof log: `result-check1-mirror/run1/logs/proof-direct.log`, SHA-256
  `e7fcfebaa69572409ff23de1839c04c0d1e3ca3704447efc29c67691d485c85f`.

Package README qualification prose was updated after the frozen checks. The checked
Lean definitions, proof and tool configuration were not changed by that prose edit.

## Boundaries and next work

The successful-row theorem requires an existing bound runner, matching deployment
key, capacity acceptance and a successful modeled return. Capacity acceptance is
an independent count/configuration fact, not a successful-output premise; deriving
it from success remains next. SQL statements are atomic, but failed replies need
not imply rollback. The sequence excludes concurrent row removal or external
registration/serving-marker writes. Physical native-object preservation also
requires distinct `(workspace, sandboxName)` keys: truncated UUID names are not
assumed universally injective.

Native URL/UUID formatting, cryptographic hashing, actual protobuf defaults,
policy/template/provider preparation and external RPC behavior remain explicit
interpretation boundaries. The refresh credential projection does not verify the
whole token issuer. An RPC acknowledgement proves no sandbox readiness, checkout
revision or filesystem persistence; the actual command requests `branch@LATEST`.

Still open: independent complete native outputs for each path, full failure-prefix
and conditional retry/history composition, populated valid executions and semantic
fault controls. Concurrent linked-follower supersession, registration publication
ordering, process crashes and eventual recovery are separate obligations. This
checkpoint neither verifies PostgreSQL nor establishes a blanket verified Hub.
