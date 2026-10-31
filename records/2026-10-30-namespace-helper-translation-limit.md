# Unchanged namespace helper: measured translation limit

Hub commit `a9b0cad` records a failed translation probe, not a new proof or production
defect. The existing checked package remains unchanged. Its namespace-helper
completion and ordinary-deployment ordering obligations are still open.

The intended contract is operation-level: group exactly the non-instance server
values by slug; derive nonempty groups before indexing; preserve their contents
through sorting; route the first deployment and retain the remaining IDs in order.
The actual comparator orders live processes first, then newest registration, then
greatest deployment ID. The source probe did not change that algorithm.

GPT-6.1 Sol prepared the selector delta, GPT-6 Luna ran one bounded Linux probe,
and GPT-6 Astra reviewed the exact commands, source identities, diagnostics and
partial outputs. Inputs remain Hub runtime `3bc2923`, SDK `239622d`, Core `120306e`
and the pinned Charon/Aeneas toolchain. Relative to the canonical extraction plan,
the only selector change exposes `build_namespaces`: add its start/include and
remove its opacity, giving 16 starts, 51 includes and 14 opaques. The usual reversible
catalog naming annotation applies only to the temporary extraction tree.

## Observed results

- Charon exited 0 in **25.006 s**. LLBC has no errors, with all sixteen requested
  roots transparent. The actual helper and eight associated closure declarations
  have bodies: ordinary-server filter, group mapper, rank comparator and set-aside
  projection, including their `FnMut`/`FnOnce` forms.
- Aeneas exited 1 in **2.173 s**. It reported `Nested borrows are not supported yet`
  at the grouping loop (`snapshot.rs:102–104`) and `There should be no bottoms in
  the value` while translating `deployments[0].deployment` (`snapshot.rs:119`).
- Partial Lean output contains `sorry` for the helper. It was not compiled or
  adopted. Comparator closure bodies are present, but their presence alone gives
  no new proof or end-to-end sorting guarantee.

The second diagnostic is not evidence that native indexing fails. Nor does this
probe establish a specific `sort_by` translation failure. Existing iterator-model
warnings are separate from the two reported errors.

The reused runner named the fresh LLBC `hub_current_roles.llbc` instead of the
planned `hub_request_composition.llbc`, consistently in the Charon output and
Aeneas input. Every other command argument matches the plan. Source/pin maps and
output hashes were checked; the snapshot source remains unchanged.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/namespace-helper-translation-probe.json)
is SHA-256 `54b820cf4fd767eee290a93f0a7b8fb8baf9cb7764ba14940e9e7e1f1eded2bf`.
It retains the selector delta, stage bounds/timings, helper/closure identities,
source/tool/output hashes and diagnostics. The temporary summary is
`/tmp/hub-request-composition-20261030/evidence-namespace-helper-probe1/summary.json`,
SHA-256 `6056e1ffea8c4959b65884ea7bb7d23b0eec15274a85a63124e2aa77fc6b1528`.

There was no production change, replacement of the checked generated model,
new axiom granting helper success, retry, native test, full gate, deployment or
model call. The result rules out treating this pinned translator invocation as a
completed source proof. Further verification must retain that boundary explicitly;
the comprehensive goal remains active.
