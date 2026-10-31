# Computed direct-call grants reach the complete HTTP client

Hub commit `9aa3988` connects the actual extracted policy computation to the actual
HTTP client constructor. For an accepted direct subject, the complete client equals
the independent expected record and its computed permission membership is exactly
the existing independent `Grants` relation. There is no supplied desired-grant set
or assumed successful policy result. This proves composition of the extracted
subcalls reviewed in the native caller; it does not formally refine the async caller.

The milestone also removes the duplicate request-composition generated graph.
Policy and routing now share the same generated types, functions and handwritten
primitive models. Existing seven routing proof files retain their specifications,
statements and proof bodies modulo import/namespace relocation. All 35 common grant
function bodies remain unchanged. The existing policy external-model file is an
exact prefix of the combined file. The endpoint model now uses the actual extracted
URL wrapper; ten order dictionaries include the reached default `min` operation.
These are proof-model changes, with no runtime, Cargo or canonical Lake-config edits.

## Execution

GPT-6.1 Sol implemented the consolidation and theorem; GPT-6 Luna ran logged checks
on Ubuntu x86_64; GPT-6 Astra reviewed source/model correspondence, audits and receipts.
The source remains Hub `3bc2923`, SDK `239622d`, Core `120306e`. Aeneas `fdebf20`
regenerated the same restored LLBC under the shared namespace in **2.440 seconds**,
exit 0. Charon and Rust extraction were not repeated. Raw generated files were
adopted without edits.

Lean 4.35.0 used the already-qualified private discriminant-instance patch and
explicit private dependency overrides. In a fresh copy of both complete packages:

- `current_roles`: `LAKE_NO_UPDATE=1 lake build`, including 25 configured defaults,
  passed in **45.27 s**; `lake env lean ModelAudit.lean` passed in **2.55 s**.
- `request_composition`: default build passed in **5.14 s**. The six explicit
  registration, collection, insertion, route and constructor targets passed in
  **22.14 s**.
- `lake env lean DirectPolicyClientProof.lean` passed in **2.69 s**, including its
  executable axiom audit. One unused-simp-argument warning remains. This direct
  invocation does not emit an OLean.

These are command elapsed times with warm dependencies, excluding preparation,
transfer and review. The 109-file effective source map is unchanged before/after,
SHA-256 `d27c07654a53b35b6951f44baf0b64bba52f4fb22ae50c0716db35e85a10cb52`.
The theorem source is
`120f0ce6d973d19c925979ae6dce3fe5cd6359d63e5b0909c4cba264ec790055`.
The shared compiled Funs artifact is
`cfe90f46b89e75f9ec420f81250e197e09a189dde40fe63ce51b4b9064c3abb3`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/shared-policy-request-graph.json),
SHA-256 `ac2480f5db7581065604bb12553fb88e5335be3941f6a06ceec0892600d26c80`,
records exact commands, dependency configurations, source identities, log hashes
and local evidence locations. The final execution summary is
`9bbabd14c83011638d9285f68ea7895d81664e246cfadfa6a7bdae142460784e`.

Earlier preparation failed because noninteractive PATH lacked Lake, then because
an initial copy contained only changed files and omitted an unchanged imported
proof. The final graph copies both complete packages and uses the pinned tool PATH;
all five stages pass. These were execution mistakes, not theorem failures. A
malformed layout-summary newline was corrected locally with its raw identity kept;
tool outputs were unchanged.

## Boundaries and next contribution

The theorem audit allows standard Lean axioms and exactly two existing native
error-formatting symbols carried by the constructor's error branch. It assumes
neither formatter contents nor issuer or namespace-helper behavior. Native
collection/primitive correspondence, compiler/translator and Lean are trusted
boundaries. The supplied installation and registration are not yet both derived
from one computed selected route. That composition is next, followed by actual
delegated narrowing and SDK issuance/recipient verification.

This is not a fresh extraction of all current main. Intervening Apps work changes
the OpenShell pin and downstream HTTP error formatting, and adds the
`RefreshRevocation::AdministratorRevocation` variant. Covered policy/constructor
bodies are unchanged, but the old extracted revocation domain does not include
the new variant. Future source refresh must account for it.

No production defect was discovered by this consolidation. Earlier registration
race fixes remain separate native findings; this result must not be counted as a
third bug. No native component tests, full Docker gates, deployment, push or paid
model call ran. The comprehensive verification goal remains active; this milestone
was committed locally.
