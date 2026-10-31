# Current Hub domains and complete selected registration provenance

Hub commit `6d69258` records this checkpoint. The shared proof graph was freshly
extracted from Hub `1ccb868`, with its
published SDK `154a473` and Core `120306e`, and qualified against the new domains.
This is proof work on the existing implementation: no runtime, policy, database,
dependency pin, deployment or CI change was made.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/current-domains-20261031.json)
contains exact source hashes, commands, generated outputs, accepted build logs,
private dependency configuration and the failed attempts. GPT-6.1 Sol implemented
the proofs, GPT-6 Luna ran the logged Linux checks, and GPT-6 Astra reviewed the
contracts, native field shapes, source correspondence and evidence.

## What is established

- App-origin policy evaluation derives the complete decision from its declared
  access and the current principal's grants. Declared `Authenticated` access works
  with zero grants. Declared permission access succeeds when held, while a missing
  grant and an absent declaration retain their distinct refusal reasons. The
  shared SDK access theorem now includes all five target kinds.
- Every successfully constructed and selected registration is an unchanged,
  complete occurrence from the constructor's input. Same-key overwriting is
  permitted. The explicit surface observation retains every public route prefix,
  body limit and request rate, duplicate occurrences and order, plus the app-origin
  bit. This is input provenance, not a proof of which input must win.
- The refresh predicate includes `AdministratorRevocation`. Its result is
  independent of the recorded reason; a present administrative-revocation
  timestamp causes refusal under the existing predicate.

The first two additions are
[AppOriginAdmissionProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/AppOriginAdmissionProof.lean)
and [RegisteredSurfacesProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/RegisteredSurfacesProof.lean).
They are available as nondefault manual Lake targets of the same names. The
constructor provenance proof is reusable for complete-row properties; it does
not substitute a desired output row or permission set as a premise.

## Measured qualification

The unchanged extraction scope has 17 start selectors, 52 includes and 15 opaque
selectors. Charon completed in 93.747 s with 18 transparent functions and no LLBC
errors. Aeneas completed in 2.323 s. The 6,332,510-byte LLBC has SHA-256
`95dabcce1d112f7f28da7680a7eb03ba4effd96c143ed569a34ff688f4c1092f`.
The 1,076-file native source map verified before and after the existing reversible
catalog naming annotation. Generated Funs/Types were adopted byte for byte.

With Lean 4.35.0 and the existing qualified private Aeneas/dependency configuration:

- Current-policy default targets passed in 7.843 s; the three caller targets in
  5.307 s.
- Request defaults passed in 1.285 s; the eight selected/constructor/client targets
  in 13.037 s.
- Final direct App-origin and surfaces checks passed in 2.876 s and 2.602 s.
  Their named manual targets then passed in 4.331 s and 4.127 s.

The final named-target OLeans were 417,304 bytes
(`5f291c2fab0195bfd0caa92136a6c5aa053508f4e16b0a8a1be5baa8f1b03bd8`)
and 174,416 bytes
(`9dd2743b4ea9536720a62d03304cd037258d67fe72c9fd41c16fc41d40db2ded`).
These identify artifacts observed in the private build tree, not permanent binary
storage. Command timings include cached/replayed dependencies and exclude authoring,
review, copying, preparation and failed attempts; Lake job counts are not test counts.
The coordinator checked the nine accepted log hashes, the exact 15 final code/config
file hashes and both complete package maps. Only subsequent documentation differs
from the validated package maps. Accepted audits contain no `sorryAx`.

Initial proof attempts failed on symbolic `isize` discriminants, a shadowed
membership binder, folded payload projection and misqualified audit symbols.
Existing scalar lemmas and local proof corrections resolved them without changing
the claims. The App-origin audit also initially omitted the existing template
parser/matcher: Lean follows the entire shared access definition, including resource
branches. The corrected whitelist records these existing primitives and the sampled
clock; the App-origin branch does not execute template parsing. No new function
axiom was added. A stale private Lake manifest and Python runner separators caused
separate setup failures before proof execution.

## Boundaries and next step

Native collection/iterator correspondence, identifier and timestamp representation,
namespace-helper completion, supplied catalog/clock observations, extraction and
compiler correctness remain explicit. The three surface newtypes preserve their
native String/u64/u32 payload shapes; their parsers and declaration validation are
not proved here. The separate HTTP forwarder, caller TTL wrappers, async freshness,
cryptography/serialization, physical SQL and deployed behavior remain outside this
checkpoint. The prepared SDK issuer bridge still requires native equivalence to
Hub's SDK pin; the source differences include service-context string construction
and a local variable name.

The [13 earlier native checks](2026-10-31-hub-merged-source-native.md) apply to the
same runtime source and were not repeated. No new source-fault control, deployment,
full Docker suite or paid model call ran. Historical controls retain their source
identities; the unfinished deadline control remains unfinished. This checkpoint
does not establish the whole Hub or the complete request lifecycle.

Next is the composed selected-route/current-grant-to-issuer theorem: derive its
client and permission provenance from the actual preceding operations, preserving
complete request fields and SDK outcomes without assuming an arbitrary prepared
client or desired token result.
