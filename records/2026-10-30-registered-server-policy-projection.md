# Registered-server policy: target, route trace and metadata proofs

The first proof packet for the unchanged registered-server evaluator passed on
2026-10-30. It establishes target projection, the declared-route lookup trace and
decision metadata construction. It does not yet prove `decide_server`'s admission
table or complete the current authorization slice. This extends the
[model checkpoint](2026-10-30-registered-server-policy-model.md).

## Established boundary

The source basis remains Hub `bb2e97f5c984a53eaa218109e4c01a70e952e365`, with SDK
`05273d1f90b9a08e90e377187f4eddd084605fe5`. Runtime source, dependency pins and the
generated extraction are unchanged. The new
[proof module](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/RegisteredServerPolicyProof.lean)
establishes:

- `registered_target` returns the exact server and typed route payload for each
  target variant; server and Task targets have no explicit route requirement,
  and nonregistered targets return none. The coherence theorem exposes the
  relation to separately supplied server/requirement arguments.
- `declared_route_access` follows that projection, looks up the projected server
  and passes the exact declaration and requirement to the native SDK operation.
  The result-trace equality preserves failures and divergence; it does not assume
  a successful lookup or replace route resolution with an authorization oracle.
- All 14 kernel action names and registered action names are preserved. The
  generated target-copy operation and modeled optional tenant copy preserve values.
- `decision` preserves profile, action, target, principal, tenant, policy version,
  rule, trace ID and the observed clock value; its initial permission is absent
  and grant set empty. The unconditional clock trace and successful-result
  corollary are separate. `deny` uses that same construction with the exact
  refusal effect/reason and no rule.

Projection, names and copying use only standard Lean axioms or subsets. The route
trace additionally depends on the explicit native SDK access symbol; decision and
deny additionally depend on the explicit native clock symbol. Enforced per-theorem
allowlists passed without `sorryAx`. The audit of `decide_server` itself checks its
dependencies, not a completed admission theorem. Native parser/collection
correspondence, clock accuracy, concrete catalog freshness, the outer
profile/principal/scope checks and the SDK revision connection remain outside
these claims.

## Execution and corrections

GPT-6.1 Sol authored the proofs, GPT-6 Luna ran the logged checks on the existing
Ubuntu Linux x86_64 host, and GPT-6 Astra reviewed statements, source correspondence
and evidence. The frozen run verified 826 base files and 36 overlay files in a
fresh package build directory, reusing pinned dependency packages. The toolchain
remained Lean/Lake 4.35.0 and the previously pinned extraction stack.

Earlier proof packets failed on Lean normalization of the exact action-name
conversion. Focused diagnostics isolated `Str`/slice unfolding and a simplifier
cycle between scalar-value and bit-vector conversion rules. The successful proof
uses kernel-checked finite ASCII facts, staged normalization and local removal of
the two reverse simplifier rules. It adds no axiom, `native_decide`, recursion-limit
increase, parser shortcut or runtime change. These were proof-authoring failures,
not observed production defects or semantic mutation controls. Unused-simplifier
argument warnings remain in the passing log.

| Command in `proofs/current_roles` | Exit | Elapsed |
| --- | --- | --- |
| `lake build NativePolicyModelAudit` | 0 | 32.318 s |
| `lake env lean RegisteredServerPolicyProof.lean` | 0 | 4.271 s |
| `lake build RegisteredServerPolicyProof` | 0 | 4.771 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.618 s |

The prerequisite build also rechecked the existing grant/Held proof dependencies.
This packet ran no new Rust tests, extraction, semantic mutants, deployment or
OpenCode/model qualification. Next comes the actual admission/output table using
the established grant calculation, its coherent-call corollary and the connection
to downstream permission narrowing, followed by native witnesses and controls.

## Evidence identities

The run is retained at
`/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/registered-policy-proof-4-run1/`
and mirrored at `/tmp/hub-decide-server-20261030/registered-policy-proof-4-run1/`.
The coordinator independently checked the summary and all four stage-log hashes.
The proof increment remains uncommitted at this checkpoint.

```text
Overlay archive  92d4b77deea24f49c15d66b20c673283b82f87ee2158716a2e5027d38d2dfb32
Manifest         aac74ac6ff9f91b78b3a9a814f087995f8331d2c164d37b908442975a5d32a4a
Runner           3224af08c76c0632e500242d2485c2b91dcb0b9505e55a5ca29b834004bf2d3d
Run summary      cbbb928a41f7d36db7bbccd7d8b8c1623f0597e23f82a8a134b2f1c1be05fda1
Proof module     462d403fab1a645c12a01d6f71e163044a50df4312f9f762fbbe6011e2fc22ee
Direct proof log 76db68fdc6dcc8570a8aec34a3017b1267519a58ab6ceb4f165e87d22efa6802
```
