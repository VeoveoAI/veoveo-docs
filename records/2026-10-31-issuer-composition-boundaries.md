# Connecting Hub forwarding to SDK issuance

This is a source and proof-model review, not a checked composition theorem. The
reviewed source states are Hub `c6feadb` and SDK `de98b25`. Hub's existing shared
extraction still records Hub `3bc2923`, SDK `239622d` and Core `120306e`; the SDK
issuer extraction uses its separately recorded prepared source. Their newer source
applicability remains governed by the
[source audit](2026-10-30-proof-source-applicability.md). No deployed version was
inspected, and no runtime or generated model was changed during this review.

## What the native boundary does

The actual Hub
[`issue_bearer_token_until`](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/mcp/upstream_authorized_http.rs)
copies the accepted HTTP client's profile, server, deployment, resource, OAuth
client, actor, authority, permissions, request context and delegation fields into
the SDK's `ForwardedRequest`. It supplies the context as `Some`, caps the requested
deadline by the client's optional delegation deadline, calls the SDK issuer, and
returns either the resulting bearer string or the existing wrapped token error.

The upstream caller chooses a 60-second deadline for ordinary messages and
900 seconds for `SubscriptionsListenRequest`. The SDK then applies its own
delegation-context cap and, when request context is present and there is no acting
server, the source-token cap. The last condition is keyed to `acting_server`, not
the authority's Direct/Automated/Delegated provenance enum. The Hub source comment
about the source-token cap must be read with that conditional; it is not an
unconditional property of delegated forwarding.

Hub and the SDK sample time separately. The final contract must preserve the SDK's
expiry refusal if the effective deadline is no longer after its clock observation.
The caller's TTL choice alone does not prove successful issuance, positive
whole-second JWT lifetime, or preservation of timestamp nanoseconds in NumericDate.

## The proof representations are different

The existing Hub
[`TypesExternal.lean`](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/HubCurrentRoles/TypesExternal.lean)
uses tagged string identifiers, `Finset` for native sets, and `Int × Nat` for
timestamps. The SDK
[`TypesExternal.lean`](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/RequestCompositionSdk/TypesExternal.lean)
uses separately tagged identifiers, an ordered list inside `OrderedSet`, and an
`I64` seconds/`U32` nanoseconds timestamp. These are proof representations, not
additional runtime data formats. Native Rust passes its existing typed values.

The composition therefore needs proved field-preserving correspondence:

- Identifiers preserve their string values within the corresponding identifier
  domain. Numeric model tags are local implementation details, not interchangeable
  identities or authorization decisions.
- Set correspondence preserves membership in both directions, including empty
  sets, and supplies the unique native traversal in its key order. An arbitrary
  enumeration of a `Finset` does not establish canonical scope text. Keep the
  SDK's ordered representation and its separate traversal-order obligation.
- Timestamp correspondence preserves both components exactly over the admitted
  native range, without truncating out-of-range mathematical integers into machine
  scalars. The SDK package's ordinary/non-leap timestamp correspondence restriction
  remains explicit; this review does not extend it to all Chrono values.
- Principal correspondence preserves all fields, including group roles and
  `authenticated_at`; context correspondence preserves execution, audit and source
  token data. Delegation correspondence preserves the complete ordered actor chain,
  originating Task and deadlines. Projecting only fields mentioned by one policy
  check would be insufficient for complete signed-claims preservation.

These obligations belong in the manual proof composition. They require no new
runtime adapter, permission check, schema or service. Native collection, allocation,
alias and translator correspondence remain explicit external boundaries; a
standard-only Lean axiom audit does not establish them by itself.

## Completion boundary

The checked
[`constructed_policy_route_exact`](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/DelegatedPolicyClientProof.lean)
already connects computed retained routing, a supplied catalog generation's policy,
actual optional permission narrowing and the complete HTTP client. The SDK issuer
is still an unresolved own-code call in that Hub graph. Closing the connection must
use the actual transparent SDK implementation and its independently specified
output, with the correspondence above; assuming an issuer that returns the desired
identity would leave the central obligation unproved.

The [initial SDK milestone](2026-10-31-sdk-identity-recipient-proof.md) proves a
bootstrap constructor case and recipient-triple binding. That binding alone does
not establish the verifier's full `identity_from_claims` wrapper, which additionally
checks standard actor claims, permission-detail shape and ownership, actor-chain
consistency, request context and timestamps. Signature verification and serialization
remain their own boundaries. The in-progress context theorem, full issuance,
independent complete claims, admitted examples and semantic mutation controls must
be distinguished from this source review and from one another.

GPT-6 Astra performed this read-only review while GPT-6.1 Sol and GPT-6 Luna
continued the existing context-proof/check loop. No native tests, deployment or
OpenCode/provider calls were performed for the review.
