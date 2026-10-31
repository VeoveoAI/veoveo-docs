# Populated public issuer success and error priority

SDK commit `e9e6d41` exercises the [generic issuer contract](2026-10-31-sdk-public-issuer-composition.md)
with independent populated requests. The unchanged extracted issuer returns the
complete expected successful result for one request and the exact first foreign
permission for another. These are checked model-relative examples, not real
signed tokens or proof that the inputs were authenticated.

GPT-6.1 Sol implemented the independent inputs and witnesses; GPT-6 Luna executed
the frozen Linux checks; GPT-6 Astra reviewed their statements, primitive premises,
actual diagnostics and terminal results. The [SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/public-issue-examples.json)
records source, configuration, log and artifact identities. The generic
specification and proof from SDK `6665e9c` remain byte-identical.

## Inputs and outcomes

`InternalAuthIssueExamples` imports the independent specification and earlier
fixture definitions, not the public-issuer correctness theorem. It establishes
the requests' representation bounds and independent expected behavior:

- The Direct request has a user principal, authority, browser-session context,
  exact recipient/deployment and two permissions: `operator.inspect` and
  `operator.operate`. Its scopes are `operator:read` and `operator:use`. It requests
  expiry at second `4102444920`, while its source-token expiry is `4102444800`;
  both have zero nanoseconds. Its supplied clock observation is second `1788220800`.
  These deliberately chosen fixture dates do not model Hub's 60/900-second caller
  lifetimes. The independent relation accepts its context, finds no foreign
  permission and chooses the earlier source expiry.
- The priority request has ordered permissions `operator.inspect`, `other.inspect`
  and `third.inspect`, and changes the client from `console` to `other-client`.
  Both the first foreign permission and the later-invalid client context are
  derived from its values, rather than assumed.

`InternalAuthIssueWitnesses.ordinary_issued` applies the actual public issuer to the
first request. Given explicit provider, clock, generated-ID, ID-text, parsed-ID
and exact-claims signing observations, it returns the same complete expected
identity and signer-provided bearer. No premise assumes an own constructor or
issuer result. `ordinary_complete_fields` establishes the complete claims
relation, exact capped expiry, ordered scope string and both permission actions.

`foreign_precedes_invalid_context` proves the second request returns exactly
`PermissionOutsideAudience(other.inspect)`. It requires no successful provider,
clock, identifier, parser or signer observation. Both the correct error identity
and its priority over context validation are preserved.

## Validation

The independent fixture's final direct check passed in 2.65 seconds, with 22
source and 13 imported-artifact hashes unchanged before/after. Its four audits
use only standard Lean axioms. The actual-issuer witnesses passed in 2.53 seconds,
with 23 source and 14 import hashes unchanged. The complete-fields audit is
standard-only; the two public result equations retain only the existing six
explicit native boundaries. No audit accepts `sorryAx`.

The final named command,
`LAKE_NO_UPDATE=1 lake build InternalAuthIssueExamples InternalAuthIssueWitnesses`,
passed in 5.33 seconds with peak RSS 2,718,420 KiB. All 23 source hashes passed
before/after, and 14 imports passed before the build. The final two OLean digests
were captured separately; regenerated imports are not asserted byte-identical.
All seven new audits pass. The terminal build log SHA-256 is
`94cf9106127913beb3f1ed8947b89b69db87f0e68293bcb5d9f2bfc47dd5cf22`.
Review independently matched 30 receipt-referenced files and both captured final
artifact digests. The checkpoint is local, not pushed or deployed.

Two earlier failed leaf checks are retained as proof-authoring diagnostics:
the fixture needed explicit expiry projection and string-inequality reasoning;
the witnesses needed identity abbreviation unfolding and `refine` for an
unfinished subgoal. None changed request data, expected results, assumptions,
generic theorems, generated code or runtime behavior.

Core's handwritten namespace adapter, native set traversal, allocation and
representation correspondence, signing/serialization/verification and integration
with Hub's pinned SDK remain explicit boundaries. These examples establish no
policy-grant provenance, Task liveness, UUID uniqueness or deployed behavior.
The next qualification is one isolated actual-Rust public permission-guard fault,
independent wrong-result evidence and exact source/model restoration. No native
suite, deployment, CI integration or paid model call ran for these examples.
