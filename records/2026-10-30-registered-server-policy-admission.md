# Registered-server policy: admission and permission consistency

The [exact evaluator table](2026-10-30-registered-server-policy-decision.md) now
supports checked declarative admission and permission-consistency corollaries in
[RegisteredServerAdmissionProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/RegisteredServerAdmissionProof.lean).
The source, toolchain and native boundaries are unchanged from that checkpoint:
Hub `bb2e97f5`, SDK `05273d1`, Lean/Lake 4.35.0; no runtime or policy edits.

The actual extracted evaluator allows exactly when the action is eligible, the
supplied server exists and the declared access is satisfied by the independently
proved role/risk predicate. Server/Task-style admission requires an existential
granted permission; explicit `Authenticated` access requires no additional grant;
a permission route requires that particular permission. The actual inner
evaluator's denials return empty grants.

Given the actual `registered_target` result, the coherence corollary identifies
the declaration and route passed to SDK access with the ones used for permission
evaluation. For a coherent permission route, the actual returned decision always
retains the required permission; it allows exactly when the role/risk predicate
grants it, and allowance implies that permission belongs to the returned grant
set. This derives the base-policy consistency fact needed by the earlier
downstream theorem. It does not yet prove their downstream composition or the
asynchronous caller's construction of the inputs.

The same explicit successful native-operation premises remain. Pure corollaries
have only standard Lean axioms; actual-evaluator corollaries additionally depend
on the approved SDK-access and clock symbols. Per-theorem allowlists and the
model audit passed without `sorryAx`.

GPT-6.1 Sol authored the module, GPT-6 Luna ran checks on the existing Linux host,
and GPT-6 Astra reviewed statements and independently verified the summary and
stage-log hashes. A direct-first check against the prior compiled prerequisites
passed in approximately 2.82 seconds. The fresh exact-snapshot run then passed:

| Stage | Exit | Elapsed |
| --- | --- | --- |
| Prior proof targets and model-audit prerequisites | 0 | 32.269 s |
| `lake env lean RegisteredServerAdmissionProof.lean` | 0 | 2.919 s |
| `lake build RegisteredServerAdmissionProof` | 0 | 3.269 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.568 s |

All 826 base files, 38 overlay files and 829 merged paths verified. The earlier
proof/model bytes stayed fixed; this packet passed on its first attempt. No new
Rust tests, extraction, semantic controls, deployment or paid qualification ran.
The increment is uncommitted and the overall authorization slice remains partial;
downstream composition and native/mutation qualification are next.

Evidence is retained under
`/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/registered-admission-proof-1-run1/`
and mirrored at `/tmp/hub-decide-server-20261030/registered-admission-proof-1-run1/`.

```text
Overlay archive e26fbe847f32ffe1ef64a0c60494c7ed852ef591d5f09014d871fe4263d329b4
Manifest        e5a8b6cd675fbf8edd356ab60b6fa0572a4f38f366d3828c23c5a2dcb4fb8503
Run summary     aaced032c4654ff7cd2d60ecdc62b50c3cca3ab435f5cdb6a666f886b10aecd2
Proof module    275e0fe4960b6eee88ae4c6e8628c4e8ac20d684b4876abbfac5cdd68f96915f
```
