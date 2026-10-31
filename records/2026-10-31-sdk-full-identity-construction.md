# Complete forwarded-identity construction

SDK commit `95ecd75` proves the actual extracted `create_identity` function
against a complete independent outcome specification. The generic theorem covers
arbitrary requests and permission sets, every optional-context/acting-server
combination, successful identity values and the existing refusal priority. It is
the identity-constructor contract; public `issue`, complete signed claims, native
recipient verification and composition with Hub remain separate obligations.

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran the bounded Linux checks, and
GPT-6 Astra reviewed the source/specification correspondence, compiler diagnostics,
successful audit and qualification scope. The
[SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/identity-construction.json)
records source/tool/artifact identities, commands, timings and logs. The
[preceding context controls](2026-10-31-sdk-context-semantic-controls.md)
qualify the reused request-context theorem, not the new constructor theorem.

## Contract

The proof derives inherited-chain validation, including nonemptiness, the maximum
of eight registered actors and the originating Task's exact server/deployment.
It establishes the full delegation decision for arbitrary arguments, including
error priority when multiple fields are invalid. Bounds needed by the native vector
index and addition follow from the earlier guards; they are not assumed successes.

The constructor first caps the requested expiry by inherited delegation, then checks
delegation, observes the clock and checks the optional request context and OAuth
client. With context and no acting server, expiry is also capped by the source
access token. With an acting server, it retains the requested/inherited cap. That
distinction follows `acting_server`, not the authority provenance enum. Expiry at
or before the observed clock is refused before ID generation/parsing.

Every successful result preserves the complete request fields: profile, target
server/deployment/resource, client, actor, authority, permissions, context, acting
server/Task and inherited chain. It uses the issuer's identity, the generated ID,
the observed clock for issued/not-before times and the independently computed
effective expiry. ID-parse errors retain their existing error wrapping.

The specification sequences the five actual external primitives and retains their
modeled failure/divergence. It assumes no successful own validator, fresh-ID helper
or constructor result. Its only input premises are the context theorem's physical
UTF-8 representation bounds. The result equation describes values and dependencies;
it is not an instrumented effect-count or wall-clock timing proof.

## Checked generic result

The first successful direct check used `lake env lean InternalAuthIdentityProof.lean`
with `LAKE_NO_UPDATE=1` and completed in 4.86 seconds, exit zero, with
2,735,028 KiB maximum resident memory. The frozen proof SHA-256 was
`ba99f3e7d0377d5ebe3bf78e49ef2da51722f9f43a5a8bec8d008a1a17e47419`.
All 15 source/configuration identities and six imported proof artifact identities
matched before and after. The full log SHA-256 was
`8d22ce08e5207adf7db5f2e5e2c41a785d127d1a8bf1dc3f68bc205fa69e9532`.

The chain, delegation and request-decision theorems have only standard Lean axioms.
The constructor theorem additionally names exactly provider setup, clock sampling,
UUID generation, UUID text conversion and fallible ID parsing. No audited theorem
depends on `sorryAx`.

Earlier compiler runs exposed proof-writing errors in scalar bounds, conditional
normalization, result-type inference and helper application. A bounded hidden-term
diagnostic identified distinct generated pattern-match functions behind otherwise
matching printed expressions. Direct pointwise comparison and cases on the parse
result resolved this; no private generated name, Rust or model patch was needed.
Stale configuration, evidence-path and source-copy setup errors stopped before
Lean and are recorded separately. None is a newly discovered production defect.

## Constructed valid calls

The independent fixture module imports no identity-correctness theorem, so source
controls can reuse its inputs without importing a failed proof. The two successful
constructor theorems derive admission and deadlines from these fixtures; their only
success premises are the stated external provider/clock/UUID/text/parser observations.
No own-validator or constructor-success premise is supplied.

The fixture clock is `1788220800` seconds with zero nanoseconds. The Direct call
requests expiry `4102444920` and returns the earlier source-token expiry `4102444800`.
The acting-server call has source expiry `1788220700`, already before that clock;
its singleton inherited actor chain and matching originating Task constrain expiry
to `4102444860`, before the requested deadline. It succeeds with that inherited cap
and preserves the complete chain and Task. Both requests contain a supplied singleton
permission set; these private-constructor examples assert neither public issuer
namespace ownership nor current-policy provenance. Other supplied base fields and
server/Task identities remain arbitrary and are preserved.

The fixture compiled in 2.52 seconds, producing OLean SHA-256
`c9787af569e772a4d8413560ded697c32ba4103648b429278bfbecfe6b44cc98`.
The updated constructor proof with both success examples passed in 5.06 seconds.
All nine requested fixture/validation/construction audits passed their respective
standard-only or five-native-boundary allowlists, without `sorryAx`. These are
mathematical fixture times and model results, not observations of a live clock,
authenticated user, live Task or signed bearer.

The final manual `lake build InternalAuthIdentityExamples InternalAuthIdentityProof`
passed in 8.14 seconds with the final compiled sources unchanged. Lake reported
1,808 jobs, including dependency cache replay; this is not a count of new proofs.
The 16-file effective input map matched before and after. Six baseline imported
artifacts were checked before the named build; only the two final target artifacts
were captured afterward. All nine audits passed. The resulting Examples OLean hash is
`bea56b013af5c9928de7b9ef1c0ced9da61c5e7560b83ad5cff4dd81df934191`
and IdentityProof OLean hash is
`024a08edd001e1e32981c07496d0ce59c4d17f993d8220137d02489256f1baa2`.
The private configuration substitutes the recorded pinned local Aeneas checkout
for its Git dependency; its only target changes are the two new opt-in libraries.

## Applicability and remaining work

The extraction basis remains SDK `e268032` plus the qualified String/binder
preparation, with its recorded Core and translator pins. Read-only comparison
against local SDK `4fb723e` found `internal_auth.rs`, `internal_auth/request.rs`,
`exchange.rs`, `recipient.rs` and `identity.rs` byte-identical to the extraction
archive. This is narrow file correspondence, not qualification of a changed
dependency graph, Hub pin or deployment.

Native collection/string/allocation and ordinary timestamp correspondence remain
explicit boundaries. The constructor does not perform the public issuer's
permission-namespace check. That next proof must account for the handwritten
`Native.namespacePrefix` representation of Core's private namespace helper;
extracted ownership wrappers alone do not establish that helper's refinement.
Complete claims, signing/serialization, verifier behavior, issuer semantic controls
and Hub composition remain open. No native suite, deployment, dependency update or
paid model call ran for this proof-only work.

The SDK checkpoint and coverage updates are committed locally, unpushed and
undeployed. Deadline source controls are next, followed by complete public issuance
and claims; the comprehensive verification goal remains active.
