# Public issuer ownership guard fault control

SDK commit `6afa18a` qualifies the public issuer proof against a deliberate fault
in its actual Rust source. The unchanged proof rejects the inverted guard; a
separate witness derives the wrong refusal; reversing the same patch restores
the exact source and generated model, and the baseline proofs pass again.
This is proof-sensitivity evidence, not another discovered production defect.

GPT-6.1 Sol implemented the witness and receipt, GPT-6 Luna executed the frozen
Linux checks, and GPT-6 Astra reviewed the source delta, theorem statements,
diagnostics, audits and artifact identities. The
[SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/public-issue-guard-control.json)
contains the exact commands, source/tool identities, timings and evidence paths.
The source basis remains the recorded SDK `e268032` slice with its reviewed
String/binder preparations and Core `120306e`. Canonical runtime code, generated
models, specifications, correctness proofs and dependency pins did not change.

## Fault and independent result

The [patch](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/mutations/invert-issue-owned-guard.patch)
removes only the `!` from the public issuer's search for a permission outside the
audience server. The verifier's similar guard is unchanged. Charon passed in
12.386 seconds, and Aeneas in 3.274 seconds. Both intended roots and all fifteen
critical functions remained transparent, structured and error-free. Independent
review found exactly the Boolean inversion in generated code, matching source
column changes, and unchanged external templates.

An isolated package built the mutant model and unaffected components in 25.329
seconds. The unchanged `InternalAuthIssueProof` then failed in 2.751 seconds:
its private `predicate_exact` lemma leaves `False` in both ownership cases.
The ownership helper theorem itself still passes. The dependent public equations
carry Lean's incomplete-proof marker, which the executable audit rejects. No
failed issuer-proof OLean was produced or imported into the witness.

The [independent witness](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/mutations/IssueGuardInversionWitness.lean)
uses the existing populated Direct request, with `operator.inspect` and
`operator.operate`, valid independent context constraints and a future source-capped
deadline. It proves that the mutant returns
`PermissionOutsideAudience operator.inspect`, without assuming provider, clock,
ID or signer success. Separately, explicit external observations establish the
complete successful reference result, including the exact claims supplied to
the signer. The witness then proves that the two results differ. No premise
assumes the issuer, identity constructor or reference outcome is successful.

Four earlier witness checks failed on namespace resolution and iterator/monadic
normalization. These were proof-authoring failures, separate from the intended
contract rejection. Only proof normalization changed; the specification, data
and assumptions did not. The final direct witness check passed in 2.66 seconds,
with all 33 source and 13 import identities unchanged before and after. All four
audits passed: one standard-only, and three with the six existing provider,
clock, UUID, UUID-display, ID-parser and signing boundaries. There is no `sorryAx`.
A preliminary command also used the wrong LLBC basename and stopped before
Aeneas ran; it provides no translation or semantic evidence.

## Restoration and limits

Reversing the patch in the same disposable Rust tree restored all 173 original
source files. Fresh Charon passed in 12.636 seconds and Aeneas in 3.322 seconds.
All four generated Lean files match the canonical bytes exactly. The new LLBC
identity is recorded separately; no LLBC or compiled-artifact equality to an
earlier build is claimed.

A fresh package ran:

```sh
LAKE_NO_UPDATE=1 lake build InternalAuthIssueSpecification InternalAuthIssueProof InternalAuthIssueExamples InternalAuthIssueWitnesses
```

It passed in 26.312 seconds, with 32 source identities unchanged and all eleven
public audits accepted: seven standard-only and four with the existing six
boundaries. The final build log SHA-256 is
`5373790827267ae57e6ed35f15b047f5c217927c5b8391a74968ebadb64f9313`.
Review independently matched all 31 receipt-referenced files, hashed the four
restored generated files, and matched the four recorded final OLean identities
to the captured build summary. No baseline own-package OLeans were copied.

The existing native namespace-helper, collection traversal, text/allocation and
timestamp representation obligations remain. This does not prove cryptographic
verification, authenticated policy provenance, Task liveness or native effect
counts. It also does not establish equivalence between the prepared SDK source
and Hub's older pinned dependency. The next integration must preserve complete
values across the two proof representations and state that source applicability
explicitly; see the [composition review](2026-10-31-issuer-composition-boundaries.md).

No broad native suite, CI hook, deployment or model/provider call ran. This
checkpoint is committed locally; push and deployment remain separate.
