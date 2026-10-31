# One selected route and catalog policy determine the direct client

Hub commit `7d3f6c6` adds the checked `constructed_direct_policy_route_exact` corollary in
[DirectPolicyClientProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/DirectPolicyClientProof.lean)
connects retained-route resolution, registration identity, current-policy grant
computation and complete HTTP client construction for a direct call.

One supplied `HubCatalog` provides the registration snapshot and installation
authorization. The theorem derives key/row coherence through actual snapshot
constructor success, then proves actual selected lookup equals the independent
computed resolver. An absent route yields `none`, without fallback. For a present
route, it derives the row's slug and deployment, proves exact complete client
construction using that row and generation's computed grants, and characterizes
permission membership by the existing independent `Grants` relation. It assumes
neither a desired row nor a desired grant set.

## Execution and limits

GPT-6.1 Sol added only the corollary and scoped audit to the existing leaf. GPT-6
Luna ran the manual Linux check; GPT-6 Astra reviewed the statement, source
correspondence and evidence. The frozen leaf SHA-256 is
`0209d79f02d5bcca5eab5b8c8dad00413f3c88adcc55e412fc056d2c16db8664`.
The source bodies of delegation, policy grants, registration snapshots and verified
subjects remain unchanged from the recorded Hub `3bc2923` extraction through the
proof base `9aa3988`; SDK remains `239622d` and Core `120306e`.

`LAKE_NO_UPDATE=1 lake env lean DirectPolicyClientProof.lean` passed in **2.64
seconds**, exit 0, using Lean 4.35.0 and the already-qualified private dependency
configuration. Both existing direct and new selected-route audits passed. The log
SHA-256 is `0085b07cf369e43db2caa5a641cd7db9660d2ff3910f15e84f8695d8247551e4`.
There is one existing unused-simp warning and no OLean emitted by this direct check.
Unchanged proof dependencies were reused; no full package build was repeated.
The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/direct-policy-route.json)
records source/configuration identities and the checked command. Its SHA-256 is
`cd43d37640d048de6e1a8ea8d957876c5e1e7ce54068477393c2f4c1753a8e0b`.
A rehash of the 109 private-package paths confirms the only source change is the
new leaf. The initial summary had labeled the old map as effective; the corrected
receipt distinguishes the baseline and current maps. No proof rerun was needed.

The new audit permits standard Lean axioms, the two existing constructor
error-formatting symbols and the existing namespace helper. Finite iterator/native
collection correspondence, native composition-key uniqueness and successful
constructor/selection completion remain premises. The theorem establishes the
behavior for one supplied generation, not that it is the globally latest state.
Snapshot acquisition and async transport wiring are source-reviewed composition
boundaries. Actual delegated narrowing and SDK issuance/recipient verification
remain open. No runtime or authorization rule changes, native tests, deployment,
push, full Docker gates or paid model calls occurred in this checkpoint.
