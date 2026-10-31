# Actual Rust faults qualify the native delegation narrowing proof

Hub `c6feadb` qualifies the native narrowing edge added by `e66bb34`. Two isolated
one-line Rust faults translate successfully, fail the unchanged connected proof,
and have independent Lean witnesses of the wrong successful result. Restoring the
Rust reproduces the four canonical generated Lean files; a fresh build passes the
direct/delegated targets and model audit. No production defect or runtime change
was introduced by this slice.

## Inputs and observations

GPT-6.1 Sol wrote the source patches and witnesses; GPT-6 Luna ran the logged Linux
extraction and proof checks; GPT-6 Astra reviewed the raw diffs, semantic failures,
audit output, source identities and commits. The source baseline remains Hub
`3bc2923`, SDK `239622d`, Core `120306e`, with the existing catalog-field annotation
only. Charon `de8736f`, Aeneas `fdebf20`, Rust nightly 2026-09-17 and Lean 4.35.0
retain their recorded pins and private discriminant-name patch. The exact unrelated
generic `delegation::authority::narrow` exclusion remains; both concrete native
methods are transparent and error-free.

1. **Ignoring carried authority.** The real `SubjectDelegation::narrow` wrapper is
   changed to call the existing adapter with `granted.clone()` and `&granted`.
   This retains the function interface and actual native adapter. Only that
   generated function body changes; generated types and external templates remain
   byte-identical. The frozen `subject_narrow_exact` proof fails because it cannot
   derive intersection with the carried permissions. An independent witness proves
   that a singleton grant with an empty carried set returns that singleton, and
   differs from the required empty intersection.
2. **Losing valid authority.** The real native filter predicate becomes
   `carried.contains(permission) && false`. It retains the original lookup and
   closure capture. The generated predicate returns false in both branches;
   generated type changes are source-span comments only. The frozen predicate
   proof is left requiring that an arbitrary permission not belong to the carried
   set. An independent witness supplies equal singleton inputs, proves successful
   empty output, and proves inequality to the nonempty intended intersection.

The witnesses import only the raw model and unchanged finite-operation helper
proofs. They do not import the failed module. Direct `lake env lean` checks emit no
`.olean`; absence of failed-leaf artifacts was checked in both fresh graphs. Each
witness's four executable audits permits only `propext`, `Classical.choice` and
`Quot.sound`. Both valid-grant preservation and absence of amplification matter;
always returning no permissions would not satisfy this contract.

## Measured checks and restoration

The first extraction took **30.030 s** in Charon and **2.527 s** in Aeneas. The
second took **26.111 s** and **2.31 s**. Both extracted the reviewed source faults
without translation errors. The unchanged delegated proof failed as expected in
**2.64 s** and **2.73 s**. The successful independent witnesses took **2.79 s** and
**2.66 s**. Their dependency builds took 44.90/4.72 s and 46.01/4.77 s respectively.
These are command wall times, excluding preparation, copying and review.

Both scratch `delegation.rs` files were restored to SHA-256
`d05e28c937f3a0bcb50524d4bbf94e7d16ab581dafa190b12da3575a5138599e`.
One subsequent canonical extraction took **31.623 s** in Charon and **2.928 s** in
Aeneas. All four generated Lean files match the canonical baseline byte-for-byte.
The LLBC bytes differ from the earlier baseline; no cause is inferred from that
difference and no claim of identical LLBC is made.

In a fresh package build, `lake build DirectPolicyClientProof DelegatedPolicyClientProof`
passed in **55.42 s** and `lake env lean ModelAudit.lean` passed in **4.19 s**.
All seven delegated audits pass with no `sorryAx`: five use only standard axioms;
complete-client construction retains the existing formatter symbols, and the
constructed-route theorem also retains the existing namespace helper. The native
Rust regression passed in the preceding milestone and was not rerun here. No
deployment, full Docker gate or paid model call ran.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/delegation-narrowing-controls.json)
records source, tool, effective configuration, model, witness and output hashes;
commands, timings and log identities; and the preserved scratch evidence locations.
The restored delegated OLean is
`b470560d9bbb0c3cdf47c32e423ee865ffb5a2064a481d4b23772884ca2ffad2`.

## Iterations and limits

The first overgrant witness needed an explicit abbreviation normalization before
applying its already checked native-intersection lemma. Its statements,
specification, imports and audits did not change. Setup mistakes included patch/log
paths, a shell precondition that skipped PATH setup, and a source-copy path. An
inventory parser incorrectly reported absent bodies after successful Charon;
inspection of the actual transparent structured bodies allowed Aeneas to consume
that existing output without re-extraction. A final optional hash command named
templates absent from the Lean package and failed after both compiler checks had
passed; template hashes were read from the extraction output instead. These are
tooling/reporting failures, not platform failures or successful proof evidence.

Final patch artifacts omit blank context lines for whitespace cleanliness.
Independent application reproduces the same extracted mutant Rust hashes. The
consolidated scratch summary's overly broad “all standard-only” statement was
corrected against the actual seven audit outputs in the committed receipt.

This qualifies the native narrowing edge of the existing selected-client proof.
Native collection/iterator/clone correspondence, translators, the source-reviewed
async caller, snapshot freshness and namespace-helper completion remain explicit
boundaries. Actual SDK issuance and recipient verification are next. The prepared
SDK `e268032` extraction is not proof of Hub's still-pinned `239622d`; its source
integration must be established before claiming a connected pinned-stack result.
The comprehensive goal remains active. This milestone is committed locally, not
pushed or deployed by this team.
