# Work Context membership: successful extraction, proof pending

The unchanged rule-selection calculation translates successfully with the pinned
Charon/Aeneas tools. An additive extraction using the existing shared proof basis
also succeeds. These are translation results; no new Lean theorem or native
qualification is claimed, and generated candidates have not replaced checked models.

This follows the [full browser-membership translation boundary](2026-11-01-browser-membership-translation.md).
The focused root is the existing `WorkContextDefinition::membership_for`. It
retains full Principal, Work Context and rule values, actual selector matching,
native membership-level comparison and the iterator pipeline. Catalog lookup,
current group enrichment and contributed-authority dispatch are outside this
calculation's dependency graph; they were not replaced with opaque admission
decisions.

GPT-6.1 Sol prepared and reviewed source/graph correspondence, GPT-6 Luna executed
on Ubuntu Linux x86_64, and GPT-6 Astra reviewed the compiler evidence and generated
diffs. No runtime source, authentication requirement or installation pin changed.

## Current-source extraction

Inputs are Hub `a751c9b`, SDK `7360c0f`, Core `422dcf2`, the existing Rust nightly
2026-09-17, Charon and Aeneas `nightly-2026.10.23-fdebf20`.
Locked metadata passed in **0.315 s**, the scoped Hub target clean in **0.164 s**,
and Charon in **27.712 s**. The LLBC contains one root, 25 transparent own
functions and 25 own types. It is **1,032,516 bytes**, SHA-256
`1db6a55d4a99a52d8cf6d4bc4acbd45738af5133f13b81aa6ebf2f418559e3a5`.

The inherited inventory scanner could not resolve a derived trait method's owner.
Review resolved actual function 152 through trait implementation 30 to
`core::cmp::Ord` for `WorkContextMembershipLevel`; its source span and complete
body were present. The metadata retains `Impl { Trait: 30 }`; it is the scanner's
owner resolution that failed, not a missing implementation segment. The original
failure is retained. Aeneas then used the unchanged LLBC, without recompiling Rust.

The exact backend command passed once under a 600-second bound. The timed command
took **0.74 s**; Aeneas reported **0.570998 s**. It emitted four complete split
files without reported errors. `Funs.lean` is **48,286 bytes**, SHA-256
`7d8866de4f8afe9156df75157efcc80667355f0d8e2365c43972352f9b17639c`;
the log is **4,196 bytes**, SHA-256
`a685fcc55317715800c57a236591a55a2b9a3f55970d6bed9a67b9c2baaf0893`.
The builtin Iterator model still warns about missing map/filter/max fields;
ordinary external models are required before Lean checking. Temporary logger
preflight failures occurred before this sole backend invocation and did not
change source or LLBC.

Review checked every emitted file and compiler-log byte identity, and compared
the post-run source maps with all 1,297 Hub and 178 SDK manifest entries. Generated
Types/Funs contain no unfinished proof placeholders. External templates are
templates, not accepted axiom-based proofs.

## Shared model integration candidate

The existing shared graph uses Hub `1ccb868`, SDK `154a473`, Core `120306e`.
Current linked-runner routing and HTTP issuance differ from that basis. Its older
proofs therefore retain their recorded applicability; adding membership must not
silently claim to requalify them against current main.

Ten owned-source and macro comparisons support applicability of the new membership
target across those pins. The additive extraction preserves the established
selectors, opaque boundaries and reversible catalog naming metadata, adding the
membership root and transparent requirements: 18 selectors, 54 includes, 15
existing opaques, 19 expected function bodies. Metadata, annotation and clean took
**0.415 s**, **0.006 s** and **0.164 s**; Charon passed in **27.110 s**, Aeneas in
**2.172 s**. LLBC reports zero declaration errors.

Literal generated diffs add 13 lines to Types and 506 to Funs, without changing
existing lines. Complete comparison and scope review precede adoption: broad
authority inclusion also emits unrelated clone bodies, one already modeled
externally. The shared graph's established typed-ID model partition also differs
from the fully transparent focused extraction. Those representation and comparison
boundaries are explicit; full graph byte equivalence is not claimed.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/computer_lifecycle/evidence/work-context-membership-extraction.json)
contains exact commands, pins, all output/log identities, source comparisons and
limits. Local evidence is under
`/tmp/hub-computer-lifecycle-20261101/membership-for-probe1-mirror/` and
`membership-shared-extraction1-mirror/` beside it. Review independently checked all
five combined outputs and five stage logs.

Next are the ordinary disjointness and iterator-maximum models, finite-cursor
correctness and a declarative result theorem: a returned level comes from a
matching original rule and no matching rule has a higher level; absence means no
rule matches. Valid grants, order/duplicate invariance, semantic controls and
restored baseline checks remain necessary. Full browser admission, SQL and
credential-custody composition remain open. No native suite, deployment, CI hook
or model-driven acceptance ran in this slice.
