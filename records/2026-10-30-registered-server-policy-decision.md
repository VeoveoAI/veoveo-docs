# Registered-server policy: exact admission and output table

The actual extracted `policy::evaluation::decide_server` now has a checked exact
result theorem. It uses the established role/risk/grant calculation, rather than
assuming the current permission set is correct. This is a conditional formal
checkpoint within HUB-AUTH-01; coherent-call/downstream composition, native
witnesses and semantic controls for this increment remain unfinished.

## What the theorem establishes

Hub remains `bb2e97f5c984a53eaa218109e4c01a70e952e365`, with compiled SDK
`05273d1f90b9a08e90e377187f4eddd084605fe5`. Runtime source and dependency pins have
not changed. The
[decision proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/RegisteredServerDecisionProof.lean)
imports the [projection/metadata packet](2026-10-30-registered-server-policy-projection.md)
and proves the actual generated evaluator equals the stated ordered outcome table:

- Non-MCP actions return `PolicyDeny`; otherwise an absent supplied server returns
  `UnknownServer`.
- With no explicit requirement, admission requires a nonempty calculated grant set.
- An absent explicit route produces `UnknownTool`, `UnknownPrompt` or
  `UndeclaredTarget`, according to the supplied requirement's kind.
- An explicit `Authenticated` route accepts, including with an empty grant set.
- A permission route accepts exactly when its permission belongs to the calculated
  grant set. The required permission remains present on a `MissingPermission`
  denial as well as on acceptance.
- Acceptance returns the entire calculated grant set; every denial in this inner
  evaluator returns an empty set. Effect, reason and all metadata follow the table
  and the previously checked construction theorem. This empty-denial property is
  not a claim about the separate downstream narrowing operation.

The supplied server and requirement remain independent of `request.target` in
this theorem, matching the actual function signature and body. Its route lookup
is derived from the actual request target; the subsequent coherent-call theorem
must establish the normal caller's relationship between these arguments.

`grants_exact` and `grants_membership` reuse the qualified extracted grant evaluator
and derive its declarative role/risk membership. The table assumes total successful
interpretations of catalog lookup and native SDK access over all their arguments,
the supplied installation-authorization result and an observed successful clock
result. These are explicit premises, not proofs of those native implementations
or just observations of one particular call. No premise assumes an already correct
grant set or overall authorization decision.

The theorem's enforced dependency audit admits only standard Lean axioms plus the
two previously declared native symbols: SDK `AuthorizationDeclaration.access` and
`Utc.now`. Grant membership remains standard-only. No `sorryAx` is admitted.
The SDK resource-resolution proof at a different revision is not silently applied
to this pin. Native collections/parser correspondence, outer action/profile/
principal/scope admission, catalog freshness, clock behavior, token issuance and
the full asynchronous endpoint remain outside this checkpoint.

## Execution and evidence

GPT-6.1 Sol authored the proof; GPT-6 Luna checked frozen inputs on the existing
Ubuntu Linux x86_64 host; GPT-6 Astra reviewed the table against Rust and the
generated body, then independently checked the summary and all stage-log hashes.
Lean/Lake 4.35.0 and the existing dependency/extraction pins were retained.

The first draft failed on proof syntax and normalization: applying a simplification
theorem as an implication, rewriting beneath an unreduced option match, and two
empty-grant record projections. The correction changed only tactics and a derived
projection lemma. Statements, generated code and external models stayed fixed.
These failures were not production defects or semantic negative controls.

A direct check of the new standalone frozen file against the first run's compiled
prerequisites passed in approximately 3.12 seconds without modifying that run.
The subsequent exact-snapshot run verified 826 base files, 37 overlay files and
829 merged paths, with all four stages passing:

| Command in `proofs/current_roles` | Exit | Elapsed |
| --- | --- | --- |
| `lake build RegisteredServerPolicyProof NativePolicyModelAudit` | 0 | 32.267 s |
| `lake env lean RegisteredServerDecisionProof.lean` | 0 | 3.119 s |
| `lake build RegisteredServerDecisionProof` | 0 | 3.570 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.669 s |

No Rust/native test, extraction, semantic mutant, deployment or OpenCode/model call
ran in this checkpoint. Prior projection/model bytes stayed fixed. The proof
increment remains uncommitted pending the remaining composition and qualification.

The final run is retained under
`/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/registered-decision-proof-2-run1/`
and mirrored at `/tmp/hub-decide-server-20261030/registered-decision-proof-2-run1/`.
The failed first packet is preserved separately.

```text
Overlay archive  60b0f365039c86c3eef938cc227bcf11f9ba5028389bd7afde2d07feeeb6b4ba
Manifest         1e3afcc0026b9a9c8d0e34bda357c0b81123021ade353de85b10bc1acb1ab94e
Run summary      2c903389940244ef427938fe986542f47abdd70b597f4404490d1149e24355ce
Proof module     b5e4977aca9bd92b2b6c8e73b117a23181518ad8ab47510c8693f06aace14e9d
Direct proof log 79598d1294c8c29a5d2e68ccea60f841ab06a0e98a7519005d952236ae2348b9
```
