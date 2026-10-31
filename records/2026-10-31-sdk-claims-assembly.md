# Complete forwarded-token claims assembly

SDK commit `ed21505` proves the actual extracted `AccessTokenClaims::from_identity`
returns the complete independently specified claims for any typed identity within
the stated text-representation bounds. It also constructs populated delegated and
empty-permission Direct results. The final three manual targets pass all fourteen
new executable axiom audits. This checkpoint does not yet qualify the planned
actual-source permission fault or compose the public issuer with signing.

GPT-6.1 Sol implemented the proofs, fixtures and check-script adaptations;
GPT-6 Luna executed the logged Linux checks; GPT-6 Astra reviewed the actual source,
independent specification, proof boundaries, terminal logs and thirty evidence-file
hashes. The [compact SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/claims-assembly.json)
records commands, source/tool lineage, timings and output identities.

## Contract and inputs

`InternalAuthClaimsProof.from_identity_exact` establishes exact successful output;
`actual_claims_complete` connects that output to the unchanged `ClaimsExact`
specification. The contract preserves issuer, subject, audience, OAuth client,
token ID, all three NumericDate seconds, the complete acting-party chain, scope
text, groups and roles. Empty permissions produce no authorization detail;
nonempty permissions produce exactly one detail retaining every action. The entire
invocation is preserved, including Principal, authority, request context, deployment,
acting server and Task, and inherited delegation context.

The actual scope-rendering and inherited-actor loops are proved total with finite
traversal measures. Their spacing and nesting, `StandardClaims::new`, clones and
Option-to-Vec collection are derived rather than assumed successful. The only
constructor input premises are physical text bounds for the actor ID, audience,
each scope and the joined scope string. They are not runtime admission rules.

The closed rich fixture contains scopes `operator:read` and `operator:use`, two
inherited actors followed by the current actor, a matching originating Task and
two permission actions. Its output has scope text `operator:read operator:use`
and actor nesting current gamma, then beta, then alpha. The empty-permission Direct
fixture keeps populated actor/context metadata and both scopes while emitting
neither a permission detail nor a prior actor. Both satisfy separately proved
independent `ContextAccepted` facts. These are typed mathematical fixtures, not
observations of authenticated sessions, live Tasks or native signed tokens.

Reusable component proofs and independent example definitions have separate
modules. The examples do not import the complete claims-correctness theorem, so
the next source-control witness can use them without importing a proof that the
mutation is expected to invalidate.

## Checks and evidence

The source basis remains the recorded SDK `e268032` extraction with the previously
adopted String/private-binder preparation and Core `120306e`. The five covered
current local Rust files were independently checked against their recorded hashes
and still match. The generated bodies, operational models and independent
specification are unchanged. This is not a whole-current-dependency or deployed
applicability claim; Hub still has a separate pinned SDK boundary.

The generic proof first passed direct elaboration in 2.83 seconds. After splitting
the reusable components and adding fixtures, the final direct checks passed in
2.79 seconds for Components, 2.76 for Examples and 2.71 for Proof. The final command
was:

```sh
LAKE_NO_UPDATE=1 lake build InternalAuthClaimsComponents InternalAuthClaimsExamples InternalAuthClaimsProof
```

It exited zero in 7.58 seconds, with maximum resident size 2,758,960 KiB. All
nineteen formal-package source inputs matched before and after. Eight imported
artifacts were checked before the build; the named build may rebuild artifacts,
so no unchanged-import-after claim is made. The three final OLean identities are
captured in the receipt. The final log SHA-256 is
`abf4a26135e10cf58340d2396bca303e6a07b87a632bf3947ec8ddb32674a24c`;
the output-identity map is
`5b6ed4e48c6aa59522f7b3652fd634668facaa70dd165f60f104f7f6801d2228`.

All fourteen new declarations use only `propext`, `Classical.choice` and
`Quot.sound`, with no `sorryAx` or added native-observation axioms. Earlier attempts
failed on proof-local clone, iterator, collector and dependent-index normalization.
A bounded full-expression diagnostic exposed a transported slice-index proof;
the final proof establishes actual iterator/body equations before rewriting under
the existing loop postcondition. Fixture layout, constructive scope-order proof
and simplification declarations were corrected after the module split. These were
proof-authoring failures, not newly discovered production defects. The failed
attempts and diagnostic are not counted as qualification.

## Remaining boundaries

Exact modeled traversal does not prove native BTreeSet enumeration, allocation,
UTF-8 or scalar/date correspondence. The ordinary non-leap timestamp boundary
remains explicit. NumericDates project seconds; no positive whole-second remaining
lifetime, timestamp roundtrip or Hub caller TTL is established. Claims assembly
does not authenticate its input, derive current policy grants, prove Task liveness,
serialize JSON or verify a signature.

Next is the actual-Rust permission-detail inversion control, an independent wrong
output witness and exact source/model restoration. Public issuer permission
ownership, Core's private namespace helper, complete signer-argument composition,
the verifier wrapper and Hub integration remain open. No runtime code, generated
model, dependency pin, CI job, native/full-stack test, paid model call or deployment
changed for this checkpoint. The proof commit is local; it has not been pushed.
