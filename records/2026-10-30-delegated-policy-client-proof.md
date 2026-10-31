# Native delegation narrowing reaches the complete selected client

Hub commit `e66bb34` extends the checked selected-route/current-policy contract to
delegated calls. The actual extracted `BTreeSet` adapter returns exactly the
intersection of current grants and carried permissions. The actual
`SubjectDelegation::narrow` wrapper preserves that result. Direct calls retain the
current grants; delegated calls retain exactly the intersection. Both directions
of membership are proved, including a successful empty result.

`constructed_policy_route_exact` derives the row from the computed retained route
and installation authorization from the same supplied catalog generation. It then
connects actual grant computation, the optional native narrowing call, request
context and complete HTTP client construction. Current policy uses the current
subject principal in both branches; it does not substitute the principal retained
inside the signed delegation context. There is no desired-row or desired-grant
premise. An absent route yields no fallback.

This is a checked composition of extracted subcalls linked to the native caller by
source review. It is not extraction/refinement of that async caller, nor proof of
SDK token issuance or recipient verification. The theorem preserves existing
behavior, with no runtime or authorization-rule change.

## Implementation and checks

GPT-6.1 Sol authored the proof and adopted exact raw generated files; GPT-6 Luna
ran logged extraction, Lean checks and the focused native test; GPT-6 Astra
reviewed the contracts, source/model changes, evidence and commit.

Extraction remains pinned to Hub `3bc2923`, SDK `239622d`, Core `120306e`, Charon
`de8736f` and Aeneas `fdebf20`. The two native methods have transparent, error-free
structured bodies. No handwritten primitive changed: the proof reuses the existing
owned cursor, comparison, membership, filter and collection contracts. The external
templates are byte-identical to the prior graph. Two nondefault Lake targets expose
the direct and delegated proof modules for manual checking.

- Linux extraction: Charon **25.963 s**, Aeneas **2.18 s**, both exit 0.
- Linux Lean 4.35.0: all 25 existing configured model-package defaults passed in
  **37.51 s**; `ModelAudit.lean` passed in **2.54 s**.
- `LAKE_NO_UPDATE=1 lake build DirectPolicyClientProof DelegatedPolicyClientProof`
  passed in **3.32 s** on the final frozen source, with all seven new scoped audits.
  Unchanged model/native checks were not repeated during proof-only corrections.
- macOS Rust 1.99.0: the existing exact test
  `delegation::authority_adapter_tests::native_sets_select_first_undeclared_and_filter_without_changing_ordered_membership`
  passed, one test and zero failures, in **0.558 s** command time. Its input has
  three requested permissions and two carried permissions with one common member;
  the exact output is that common member. It also checks first-undeclared ordering.
  PostgreSQL was not started. An initial wrong module filter ran zero tests after
  rebuilding the test crate; that attempt is not counted as a passing regression.

These timings exclude coordination, copying and review. Five new theorem audits
use only standard Lean axioms. Complete-client construction additionally names the
two existing native error-formatting symbols. The constructed-route theorem also
names the existing namespace helper. No `sorryAx` or new opaque assumption remains.

The final proof source SHA-256 is
`bb96eeb3ac2eb52d207e7d23a09797ac924471c16a33ac360a1631357f01f0a5`;
its compiled OLean is
`6de5d868166b857c5da6c8e088fabd1adb21e0304b9c487a700a01c81e5adabf`.
The native test binary is
`d04c9062bb468a018d76d0a3ed43f08a7db941526e99a3c9c9c20323755982e3`.
The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/delegated-policy-client.json),
SHA-256 `b4bc7e6ba3de6b4cb8f553870a6d33646481184d6021ea6d57ed81b1cb3ae580`,
records exact commands, source/tool/configuration identities, outputs, logs and
the effective 110-path source map.

## Iterations and remaining qualification

The broad extraction selector also matched the unrelated generic
`delegation::authority::narrow`. Its generated parameter shadowed the namespace,
causing Lean compilation to fail. The tool's existing exact `--exclude` option
removes that function from this extraction. Neither required native method calls
it; both remain transparent, and no opaque replacement or runtime patch was added.
Its separate authority proof package remains unchanged. Six pre-existing iterator
metadata warnings persisted without new translation errors.

Proof elaboration needed an explicit `Result.ok`, then normalization of a monadic
optional branch and reduction of its known `some` match. Statements, independent
specifications and audit allowlists were unchanged. The audits rejected the failed
proofs. Scratch runner/path corrections are preserved in the evidence; successful
LLBC outputs were reused rather than repeating extraction for receipt-parser errors.
These were tooling/proof issues, not newly discovered production defects.

Native collection/iterator/Arc representation, finite constructor cursor laws,
composition-key uniqueness and successful namespace-helper completion remain
explicit boundaries. One supplied generation does not prove globally latest
database state. Intervening current-main changes outside the covered source remain
outside this recorded extraction's scope.

Next, qualify this new edge with actual Rust faults that ignore carried restrictions
and discard valid common permissions, independent witnesses and restored checks.
Then connect actual SDK issuance and recipient verification. No push, deployment,
full Docker gate or paid model call occurred; the comprehensive goal remains active.
