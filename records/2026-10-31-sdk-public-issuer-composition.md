# Generic public issuer composition

SDK commit `6665e9c` adds `InternalAuthIssueProof.issue_exact`, relating the actual extracted
public `HubInternalTokenIssuer::issue` to an independent complete result contract.
It composes permission traversal, identity construction, complete claims and the
signer's returned result. Populated public-issuer examples and a public-issuer
source-fault control remain pending at this checkpoint. This is a proof of the
recorded operational model, not unconditional verification of native issuance.

GPT-6.1 Sol implemented the specification, proof and compact receipt; GPT-6 Luna
ran the frozen Linux checks; GPT-6 Astra reviewed the contract, source, audit
output and evidence identities. The [SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/public-issue.json)
records commands, source lineage, assumptions and output hashes. The existing
prepared extraction source, Core pin, generated model and dependency pins are
unchanged. No runtime source or authorization rule changes in this checkpoint.

## What the theorem says

An independent byte-level predicate describes permission ownership by the segment
before the first ASCII dot. A finite traversal theorem derives termination and
the exact first foreign permission. If one exists, public issuance returns that
same permission in `PermissionOutsideAudience`, without assuming any successful
context, provider, clock, ID or signer observation.

If every permission is owned, issuance follows the previously proved independent
identity result, including its exact validation errors. Successful identity field
preservation establishes the claims representation bounds; claims construction
then produces the complete independently specified claims value. The actual signer
receives exactly those claims. Its Rust error is preserved; its success returns
the same complete identity and returned bearer. Modeled native failure/divergence
also remains visible. No theorem premise assumes the issuer, constructor, claims
function or signer succeeds.

Text bounds are physical representation conditions, not additional admission
checks. Empty/no-dot modeled permission names are included rather than excluded by
an unproved parser assumption. Native sorted/unique set traversal remains a
correspondence obligation for the exact first-error order.

## Checks and limits

The independent specification elaborated in 2.56 seconds. Three proof-writing
attempts failed on Lean slice extensionality and monadic reassociation; they were
not native defects or qualifying proofs. The corrected generic proof passed its
direct check in 2.76 seconds without weakening its specification or domains.

The final manual command was:

```sh
LAKE_NO_UPDATE=1 lake build InternalAuthIssueSpecification InternalAuthIssueProof
```

It passed in 5.33 seconds with peak RSS 2,738,028 KiB. The 21-file source map
passed before and after; 12 imported OLean identities passed before the build.
Named builds can regenerate imports, so no post-build import-equality claim is
made. The two final OLean hashes were captured separately. The build log hash is
`e018f257b7b46bbb6ba18d1de6c1c024da70b8d1bb64d27d904a409b9243b6d5`.
Review independently matched 20 receipt-referenced file identities and both
captured artifact digests.

All four new executable axiom audits pass without `sorryAx`. Ownership and finite
scan use only standard Lean axioms. The public equations additionally retain the
six explicit provider, clock, UUID, UUID-display, ID-parser and signer boundaries.
The early-refusal declaration includes those native symbols through its type's
reference to the complete issuer; it assumes no successful observation of them.

Core's private namespace helper still uses the existing handwritten adapter. The
[bounded unchanged-helper extraction probe](2026-10-31-permission-namespace-extraction-boundary.md)
does not close that gap. Signing remains a typed external operation: serialization,
cryptographic verification, native side-effect counts, policy provenance and Task
liveness are not established. Neither current whole-SDK applicability nor Hub's
pinned-stack integration follows from this recorded source slice. The
[composition review](2026-10-31-issuer-composition-boundaries.md) tracks the remaining
identifier, collection, timestamp, caller-lifetime and verifier obligations.

No broad native suite, CI integration, deployment or paid model call ran. This
checkpoint is committed locally; push and deployed applicability remain separate.
