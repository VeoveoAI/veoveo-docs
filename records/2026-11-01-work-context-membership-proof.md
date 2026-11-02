# Work Context membership: exact-result proof checkpoint

The actual extracted `WorkContextDefinition::membership_for` now has a checked
total-result theorem. It returns the highest membership level of a matching
original rule, or `None` exactly when none matches. A returned level must have an
actual matching-rule witness. The specification independently describes the raw
principal, group, role and OAuth-client selectors; it assumes no admission Boolean
or precomputed maximum.

This follows the [translation checkpoint](2026-11-01-work-context-membership-extraction.md).
It is a checked proof milestone, not final qualification of the slice. Deliberate
fault controls and regressions of the shared proof packages remain pending. Full
browser admission, current catalog/group enrichment, authority dispatch, SQL and
OpenShell credential custody remain open.

## Implementation and source correspondence

GPT-6.1 Sol authored the models and proofs, GPT-6 Luna executed the manual commands
on Ubuntu x86_64, and GPT-6 Astra reviewed the source, output identities and audit.
Hub main was `56cd677` before this increment. Runtime Rust and dependency pins are
unchanged; generated proof Types/Funs, ordinary library models and three nondefault
manual Lean targets are the only implementation additions.

The accepted third extraction uses the established Hub `1ccb868`, SDK `154a473`,
Core `120306e` shared graph. It preserves all 212 existing type and 215 existing
function/dictionary declarations, adding two types, 23 functions/dictionaries and
eight ordinary external interfaces. Metadata, annotation and clean take 0.314 s,
0.002 s and 0.164 s; Charon takes 26.810 s and Aeneas 2.180 s, all successful.
LLBC reports no declaration errors. Types and Funs are adopted byte for byte.

The membership runtime bodies agree with focused extraction on current pins;
ten owned-source/macro comparisons were recorded in the preceding checkpoint.
Typed-ID representation remains external in the shared graph. Unrelated historical
routing, HTTP and issuer proofs retain their recorded applicability; this addition
does not requalify those paths against current main. The first broad extraction
candidate emitted unrelated clone bodies. A second explicit Eq selector introduced
compile-only assertion fields into old dictionaries. Narrowing the selectors
removed both problems without adding own-helper opacity or changing runtime code.

## What Lean checked

The matcher implements the independent OR of four selector relations. The
extracted native enum comparison agrees with
`Viewer < Contributor < Custodian < Owner`. Ordinary disjointness uses comparisons
over represented sets, and the generic maximum consumes the actual iterator's
`next` and comparison results. A finite-cursor argument establishes termination
through the real slice/filter/map pipeline.

The full result theorem proves both acceptance and absence, uniqueness of the
returned level, invariance under permutation and duplication of a present rule,
valid client-only grants, empty rule lists and nonempty rules with empty selectors.
A two-rule valid grant returns Custodian rather than Viewer. No desired-result
premise or blanket-refusal property replaces the correct outcome.

The final command was:

```sh
LAKE_NO_UPDATE=1 timeout --signal=TERM --kill-after=15s 180s lake build WorkContextMembershipAudit
```

It exited **0 in 5.583 s**, reusing qualified warm dependencies and model builds
through ordinary Lake invalidation. All **48 guarded declarations** pass; all
**12 printed axiom closures** use only `propext`, `Classical.choice` and
`Quot.sound` (the uniqueness primitive does not need Classical.choice).
No custom or `sorryAx` dependency is allowed. The 56-file source map is identical
before/after execution and matches the canonical checkout.

The log is **23,964 bytes**, SHA-256
`045052b5cd49456db1e3725bce6d08e82d0f8065e71db2437a7fabcba1f6c053`.
The main proof OLean is **479,760 bytes**, SHA-256
`377ef7d7c74a8318cc587f4f00b3574654b2193c9088abd4116ee3645a8f982f`.
Review verified all six output identities against the actual mirrored bytes.
Lean is 4.35.0 (`eb6cafb`), Aeneas `fdebf20`, Mathlib `56a0058`.

## Corrections and limits

Initial dependency setup lacked an already pinned SDK proof checkout. Stock
Aeneas then hit the previously known duplicate generated enum-instance name.
Reusing the existing qualified naming patch and pointing Lake at the Git repository
root, whose manifest selects `backends/lean`, restored the qualified setup. No new
tool patch, dependency version or copied OLean was introduced.

Authoring checks subsequently exposed redundant tactics, unclosed termination
branches, native discriminant reduction, tuple/WP elaboration and bounded-vector
literal errors. Each was corrected in the proof, without weakening its statement
or changing its operational models. The successive actual commands took 27.215 s,
3.907 s, 5.601 s and 3.784 s before the final pass. These are proof/setup corrections,
not newly discovered production bugs. The receipt preserves individual log hashes.

The standard-only axiom closure does not prove native Rust collection or typed-ID
representation, compiler/translator correspondence or standard-library refinement.
Pinned Rust iterator source was unavailable locally; maximum semantics are modeled,
not newly established from that source. Full browser and custody paths are still
unsupported by the broader extraction and are not replaced with opaque success
decisions. No native test suite, deployment, CI hook or model-driven acceptance ran.

The committed [proof receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/work-context-membership-proof.json)
contains source and output hashes, commands, tool revisions and authoring outcomes;
the [extraction receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/work-context-membership-extraction.json)
records correspondence and extraction limits. Full temporary evidence and binaries
remain at `/tmp/hub-computer-lifecycle-20261101/membership-proof-checkpoint5/mirror/`;
they are not committed. The next step is to show that deliberately reversing the
level comparison or dropping a valid client selector produces the wrong result and
is rejected by the unchanged proof, then restore the original passing source.
