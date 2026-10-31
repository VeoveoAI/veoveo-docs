# Actual SDK issuer model and audited primitive boundaries

SDK `5d37105` commits a compiling model of the actual internal-token issuer,
request-context and delegation validation, claim assembly and recipient comparison.
Its dependency audit passes. This establishes a checked foundation for the issuer
correctness theorem; it does not establish that theorem or complete Hub coverage.

## Source and preparation

The extraction uses SDK `e268032`, Core `120306e`, the previously qualified explicit
string expression from SDK `19a1e65`, and one additional private parameter rename.
`AccessTokenClaims::from_identity(identity)` becomes
`from_identity(token_identity)`, with all 23 identifier tokens renamed. Its operations,
types, order, allocation behavior, API and authorization conditions are unchanged.
The old generated binder hid the SDK's `identity` namespace. The pinned generator
has no applicable full-qualification option; no generated output was edited to
compensate.

Fresh Charon `de8736f` extraction completed in **12.841 s** and Aeneas `fdebf20`
translation in **3.374 s** on Linux x86_64. Both roots and all 15 inventoried own
functions have transparent, error-free bodies. Compared with the reviewed
explicit-string extraction, the new raw functions differ only in the private
binder/references, wrapping and source spans. Generated types change one source-span
comment; both external templates are byte-identical. The templates are retained as
evidence outside the compiled module tree.

The handwritten library models retain ordered set traversal, predicate/iterator
state, UTF-8 text and nanosecond comparison. They do not replace SDK validation or
issuance with desired outcomes. Native correspondence still requires the stated
set-order, valid representation and memory-availability assumptions. The ordinary
timestamp law explicitly excludes leap-second values; NumericDate projects seconds
and does not preserve every subsecond distinction.

## Checks and observations

GPT-6.1 Sol implemented the model and source preparation; GPT-6 Luna ran the bounded
logged checks; GPT-6 Astra reviewed the source, raw differences and audit before
committing the milestone.

On macOS arm64 with Rust 1.99.0, all 178 covered source paths of the earlier private
SDK snapshot were compared with current `19a1e65`, then only the parameter-rename
candidate was overlaid. This was covered-source equivalence, not a fresh full Git
archive. Formatting passed in **0.295 s**, all **35 internal-auth tests** passed in
**16.525 s** command time, and strict library Clippy passed in **3.824 s**. The source
map stayed unchanged. That runner did not capture the native executable hash;
this missing instrumentation is recorded rather than filled from a later shared
build artifact.

The final Linux Lean 4.35.0 run reused the pinned stock Aeneas dependency graph in
a private package build tree. Exact input hashes were checked before execution:

- `lake build RequestCompositionSdk`: exit 0, **9.91 s**. Its graph has 1,801 jobs;
  this is not a claim that all dependencies were rebuilt from scratch.
- `lake env lean InternalAuthModelAudit.lean`: exit 0, **2.57 s**. All nine audits
  passed and no `sorryAx` appeared.

Seven audited functions depend only on `propext`, `Classical.choice` and
`Quot.sound`. Identity creation additionally depends on provider setup, the UTC
clock, UUID generation, UUID text conversion and native JWT-ID parsing. Issuance
adds only `sign_forwarded` over the actual complete claims argument. These are
explicit primitive observations, not assumptions that our validation succeeds.
The twelve checked package files remained unchanged during validation. Subsequent
README edits report the result; executable model/audit bytes stayed unchanged.

The model OLean SHA-256 is
`e969bba9485600a1553cacf21812f20353495c7959ce2eedbe5421504a3add7b`.
The [committed receipt](../../veoveo-hub-sdk/proofs/internal_auth/evidence/internal-auth-model.json)
records source, tool, effective private configuration and output identities,
commands, measured timings, individual audit dependencies and log locations.

## Failures and remaining work

The first model attempt exposed a reserved local name and missing pair ordering.
The next exposed helper universes restricted to `Type 0` and the generated name
collision. Those were corrected without new assumptions. A later attempt copied
inputs into the wrong private directory and is classified as setup failure, not a
check of the intended source. The final run verified the exact input hashes first.
An initially reported raw diff used an older baseline; the correct comparison was
reviewed independently. One generated line has trailing whitespace and the two raw
templates end with a blank line; Git's whitespace check flagged them, and those raw
bytes were retained for exact extraction correspondence.

The next milestone is exact successful and failed issuance, complete signer claims,
valid direct and delegated examples, and binding the issued recipient triple.
Compilation and an axiom audit alone do not prove those contracts, native-library
refinement, termination, cryptography or instrumented side-effect traces.
Recipient comparison returns the server/deployment/resource triple, not the entire
identity or verification wrapper. Hub still pins SDK `239622d`; integration with
that running dependency is unproved. No full Docker gate, deployment, paid model
call or CI integration ran. This milestone is committed locally, not pushed.
