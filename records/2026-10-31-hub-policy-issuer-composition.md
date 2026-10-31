# Selected current policy through forwarded-token issuance

Hub commit `1314994` adds a checked composition from constructed registration and
retained selection through current permission computation, optional delegation,
client construction and the prepared SDK issuer. It changes proof files and
documentation only. No runtime checks, policy rules, infrastructure, dependency
pins, CI jobs or deployment were added.

The [proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/PolicyIssuerCompositionProof.lean)
and [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/policy-issuer-composition-20261031.json)
are committed on local main. GPT-6.1 Sol implemented the proof, GPT-6 Luna ran the
logged Linux checks, and GPT-6 Astra reviewed the contract, source wiring and
evidence. This checkpoint was not pushed or deployed.

## Contract and source connection

`constructed_policy_issue_exact` covers arbitrary inputs within its stated source
representation bounds. Actual snapshot construction and selection supply the
retained registration. The theorem derives the complete original input occurrence,
including ordered public-route fields and app-origin declaration, and computes
permissions from that generation's authorization and the current subject principal.
For delegated calls, the permissions are exactly their intersection with the
carried ceiling. Membership is proved in both directions against independent
`Eligible`; there is no arbitrary desired-grant premise.

The accepted-context branch constructs the client and complete SDK request,
preserving field correspondence, canonicality and conversion roundtrip. It returns
the independently specified caller/issuer outcome, including existing validation
and signing errors and modeled failure/divergence. Text bounds on computed
permissions come from the source declaration entries; context bounds come from
the raw subject. The final theorem assumes neither context-construction success,
an arbitrary prepared client nor a desired token result.

The missing-route branch is `none` in this composition. Context construction
refusal preserves the existing MCP error code `-32603`, owned formatted message
and absent data, with formatter failure/divergence retained. The actual async
`connect_upstream` wrapper maps a missing server to an invalid-params error; its
transport and error mapping are not included in this theorem.

The wiring was reviewed against `mcp.rs` current-grant/narrowing/client calls and
`upstream_authorized_http.rs::issue_bearer_token_until`. The individual operational
functions come from the qualified extracted graph. The composition itself is
handwritten proof code, not extraction of that entire asynchronous caller.

## Execution and evidence

The proof base is Hub `6d69258`; the shared graph was extracted from Hub `1ccb868`,
SDK `154a473` and Core `120306e`. It reuses the
[current-domain qualification](2026-10-31-hub-current-domain-proofs.md), unchanged
generated models, existing prepared SDK bridge and private dependency configuration.
Linux x86_64 used Lean 4.35.0. Only the new leaf and its nondefault Lake target were
checked; existing qualified imports were reused.

1. The first three direct checks failed elaboration in 2.966 s, 2.738 s and 2.821 s.
   Repairs addressed a shadowed structure parameter, record syntax, generated
   symbol namespaces, `do`/`match` expression shapes, the existing Cow conversion
   and the constructed client's issuer projection. They did not weaken the
   statement, bounds or audit whitelist, or change an imported helper.
2. The frozen final leaf, SHA-256
   `9bbf97399ecc8ff17d63bdb2f92fb209d886ff4a45b8b1668706d3dbf3b1a30a`,
   passed `LAKE_NO_UPDATE=1 lake env lean -o
   .lake/build/lib/lean/PolicyIssuerCompositionProof.olean
   PolicyIssuerCompositionProof.lean` in 2.818 s.
3. After adding only `lean_lib PolicyIssuerCompositionProof`, the manual
   `LAKE_NO_UPDATE=1 lake build PolicyIssuerCompositionProof` passed in 3.600 s.
   The final OLean was 575,952 bytes, SHA-256
   `0de3bec614317a39cbb80b7999f907830cc0757c60eef05cddaee24c76c6b017`.

These timings measure commands, not authoring, review or preparation. A separate
initial runner assertion rejected an already-copied leaf before Lean ran; its guard
was corrected to verify the frozen hash. It supplies no proof evidence.

All four executable axiom audits passed without `sorryAx`. The request text-bound
derivation uses only standard Lean axioms. The remaining closures include the
existing SDK provider, clock, UUID/text/parser and signer boundaries, the two Hub
error-formatting boundaries, and, for the final theorem, the namespace helper.
The shared result type/definition retains issuer symbols in the refusal theorem's
closure; this is not evidence of signer execution on that branch. The coordinator
verified all five compiler log hashes, final leaf/Lakefile hashes and the accepted
audit output. The receipt has SHA-256
`d686156405ee020c340052a50bd748884057ab17ac0c7b46368ae3b555225fc2`.

## Remaining limits and next work

Snapshot/selection success, finite cursor/native collection correspondence, unique
composition keys, namespace-helper completion, source text/scalar/allocation/time
bounds and the supplied generation/deadline remain assumptions. Prepared SDK
equivalence to Hub's native SDK pin remains open. This proves value and dependency
equations, not instrumented effects, global freshness, caller TTL selection,
recipient verification, serialization/cryptography, physical SQL or deployment.

No new semantic mutant, native test, broad suite or paid model call ran. Existing
source controls retain their recorded applicability; the unfinished deadline
control remains unfinished. The complete Hub verification goal remains active.

The next priority is catalog isolation and stale-response handling: trace the
actual cache identity and invalidation/publication operations before choosing the
next consequential contract. In particular, establish whether differently narrowed
delegated subjects can share a cached admitted catalog. That is a source-review
question, not a confirmed defect or authorization-design change.
