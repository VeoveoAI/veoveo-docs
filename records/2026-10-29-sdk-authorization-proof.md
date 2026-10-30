# SDK authorization: resource requirements and parsed-template matching

On 2026-10-29 (America/Los_Angeles), the SDK resource-requirement slice passed
manual formal qualification: fresh extraction, six authored Lean modules, five
independent semantic controls and a fresh restored baseline. HUB-CONTRACT-01 is
**partial**. This proves a route requirement, not complete user authorization.

The [manual package](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/authorization/README.md)
contains the shared production import, generated model, specifications, proofs,
concrete interpretation, patches and
[structured receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/authorization/evidence/authorization-receipt.json).
The [Hub coverage map](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md#hub-contract-01--shared-extension-contracts)
keeps the remaining producer, policy and dispatch obligations explicit.

## Execution and source identity

The Astra coordinator reviewed the source correspondence, specifications, native
assumptions, mutation definitions and receipt. `/root/coder`, the configured
GPT-6.1 Sol coder, implemented the private source seam and proofs and independently
reviewed the negative-control logs. `/root/builder`, the configured GPT-6 Luna
builder, ran unattended logged checks on the actual Linux x86_64 host. There were
no OpenCode/model-driven acceptance calls, deployment changes or pushes in this
slice. Formal checks, native component tests and deployed acceptance are separate;
no deployed acceptance is claimed.

SDK local commit `239622d12c08b771cc5e813fe3e846385d8d04ad` contains the work,
on top of the other agent's extension-naming commit
`05273d1f90b9a08e90e377187f4eddd084605fe5`. The **measured** source basis is
`8489a58d12f880e88bb71b226c720e57a5399084` plus the 27-path qualification
overlay, not unchanged SDK main. Concurrent naming changes were outside that
freeze. The coordinator matched all 27 measured paths before reporting edits;
then all 28 final owned paths matched the handoff manifest before commit. Only
README reporting and the added receipt differ from the measured overlay. Actual
source, model, authored proofs, patches and pins retain their measured bytes.
This correspondence does not claim a full SDK gate against the later naming work,
a Hub dependency-pin update, or a deployed proof-qualified stack.

SHA-256 identities:

```text
Overlay archive      6151394422cacaeafbc293bd888358a6fe6da666d259a6823eb0c945744154a9
Overlay manifest     ad09ebe80e1504fa5beda7c00e3f659737231a301fc69c493f0f119812a70dfd
Linux source archive 65314f86fa765a8f4cf5b1f8f052ea173ca662b58a0ff465e6ab8b415e71039d
Decision kernel      8ed2b007bb457eed5057054367e2c9e6aac38664bc9e89cddc580d61de3e6bf8
Generated Lean       f7c597d997b34b800578f39168924a4666426bc6d5a5dfee23bc7313708e2e0f
Composed proof       53bf1badb6f115b1a935aff9b2883719070ef45e2004cee8aa8baa14b6ed9e05
Receipt              93ec2cac9479f63771fa3fc442de41dbd73a0824677a6184bbeb562678fa633d
```

The receipt has all six authored-module and five mutation-patch identities,
per-stage commands/exits/timings and log hashes. The coder independently verified
85 referenced stage logs/native-receipt references and two execution-index hashes.
The builder checked ten variant source trees against the frozen manifest; mutants
differ in the intended decision kernel and freshly generated model. Raw artifacts
remain under `/home/rozgo/.cache/lean-pilot/sdk-contract-proof/`; caches, LLBC,
execution scripts and temporary snapshots are not committed.

## What changed and what is proved

A private Rust module now holds resource resolution and matching of borrowed,
native parsed views. Production and the standalone proof crate import the same
implementation. Native BTreeMap lookup/iteration, BTreeSet membership, template
parsing and Core URI decomposition remain in their adapters. The work introduces
no authorization policy, rejection gate, extension, schema, dependency pin or
runtime proof machinery. It adds no collection projection or additional heap
allocation to the adapter; no throughput or general zero-overhead benchmark is
claimed.

The established statements cover:

- Exact resource precedence, with no template matcher/cursor visits on an exact
  hit. Otherwise every relevant raw entry is interpreted, full access values must
  agree, and the first conflict returns its actual immediate next cursor.
- Total successful and unsuccessful resolution, including valid `Authenticated`
  requirements, same-permission agreement, zero matches and differing full values.
  `Authenticated` is distinct from undeclared; it does not bypass Hub's principal,
  profile, scope or delegated-authority checks.
- Actual root equality and total parsed path matching: bounds/termination, literal
  contents, scalar segment existence, exactly one required trailing empty segment,
  and terminal Tail cardinality including zero remaining segments. Domain-value
  validation and nonempty scalar contents are not invented by this matcher.
- Complete query matching over raw decoded keys. The raw-view theorem permits
  arbitrary flags. Only the native-view corollary assumes that `query_empty`
  corresponds to an empty key list and that absence of a query implies no keys.
- Composition of generated root/path/query functions with full-value resolution.
  The native parent wiring is explicit; no desired matching answer or prefiltered
  authorized-candidate list is assumed. A concrete interpretation supplies lawful
  primitive operations and demonstrates accepted agreement, conflicting access,
  a nonempty valid query, root refusal and exact override.

Native equality/inequality, finite raw iterator progress, decoded-text comparison,
query-set membership and exact-map correspondence are operational premises.
Template grammar, Core parsing/percent decoding/duplicate decoded-name rejection,
parent call wiring and borrowed-reference identity remain adapter boundaries.
Native `ptr::eq` regressions and review support reference identity; the Aeneas value
model is not a proof of pointer aliasing. The composition is a trace of extracted
functions, not extraction of the full native parser or asynchronous Hub endpoint.

## Formal execution and controls

Tools were Charon `de8736f7c995ac54dc490345cef9ea5143c06c62` (0.1.293),
Aeneas `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, Rust
`nightly-2026-09-17` (1.100.0-nightly), and Lean 4.35.0. The package locks its
Lean dependencies. Each variant uses separate source, Cargo target and Lake build
directories, sharing only pinned dependency caches. These are warm-cache stage
measurements, not cold bootstrap or end-to-end elapsed times.

| Stage | Initial baseline (execution 3) | Final restored (execution 6) |
|---|---:|---:|
| Five Rust witnesses | 575 ms | 189 ms |
| Charon | 279 ms | 153 ms |
| Aeneas | 1,019 ms | 1,026 ms |
| Default Lake build | 17,511 ms | 17,110 ms |
| ResolutionProof | 3,489 ms | 3,443 ms |
| TemplateProof | 3,524 ms | 3,571 ms |
| PathProof | 3,180 ms | 3,156 ms |
| MatcherProof | 2,756 ms | 2,724 ms |
| AuthorizationProof | 2,609 ms | 2,603 ms |
| ContractInterpretation | 2,665 ms | 2,685 ms |

All positive stages exited zero. The same 34 audited declarations have identical
baseline/restored axiom closures, limited to `propext`, `Classical.choice` and
`Quot.sound`, with no `sorryAx` or custom unproved facts. The count is an audit
inventory, not a measure of system coverage. Stated operational premises remain.

Each accepted mutant first passed Rust compilation, Charon, Aeneas and compilation
of the generated Lean module. The unchanged relevant semantic proof then failed
(exit 1), and its separate named Rust witness failed an assertion (exit 101):

| Mutation | Formal target | Actual witness observation |
|---|---|---|
| Exact hit returns None | Resolution exact result/success | None instead of Some(Authenticated) |
| Conflicting match continues | Full agreement and immediate stop | Some(Authenticated) instead of None |
| Inverted literal guard | Generated path-loop equivalence | Literal(1) matched segment 2 |
| Inverted query membership | Generated query-loop equivalence | Valid keys [2,1] within declared [1,2] were refused |
| Tail `<` becomes `<=` | Complete path/cardinality result | A valid Tail with zero segments was refused |

The two guard inversions retain the same primitive calls and signatures. Negative
acceptance is based on direct semantic-goal and assertion inspection, not merely
a nonzero process exit: the temporary runner accepts generic failure codes and has
no semantic failure-string oracle. No missing-symbol or dependency-only failure
was accepted. Execution 3 supplies the initial baseline and exact/conflict/Tail
controls; execution 6 supplies the corrected literal/query controls and final
fresh restored run. The restored kernel and generated model recover the exact
original identities.

## Native checks, failures and limits

The native checks used the Rust 1.99 Linux amd64 image
`sha256:b7f58ea8f9697da772a551b592e3b8b4536028c8d0edaa3672b7ed96b652b567`.
Seam3 passed 28 registration-wire tests (with the required `testing` feature) and
3 contract-boundary tests. Seam4's only change was an unused-lifetime elision;
it passed formatting and strict contract-library Clippy. The 28+3 passes belong
to seam3, not an invented rerun of seam4. The final formal checks use the unchanged
seam4 source. The native receipt's hash and commands are in the final receipt.

Observed problems were addressed and excluded from accepted evidence:

- Bounded unchanged-source extraction, even with opaque parser/Core/map boundaries,
  could not translate the external higher-ranked `core::str::pattern` signature.
  The private representation seam retains those native operations rather than
  replacing them with a proof-oriented collection implementation.
- The first seam inferred `Path<&&str>` instead of `Path<&str>`; an explicit
  dereference restores the original coercion. Two sequential early-return loops
  exceeded Aeneas's supported loop-return shape; an ordinary private path helper
  separates them. Both decision bodies remain extracted. A lifetime-only Clippy
  diagnostic was then corrected.
- One native invocation omitted the `testing` feature and ran no tests. A first
  standalone command selected the repository Rust toolchain and installed it;
  subsequent extraction commands pinned the intended nightly explicitly.
- Draft Lean elaboration, simplification and generic-instance errors were fixed.
  Failed drafts are not accepted proofs, even if they printed `sorryAx` diagnostics.
- Runner attempts 1, 2 and 5 failed before validation due to a nonempty evidence
  directory, a stale plan key and a variable-name typo. Execution 3 initially
  treated the literal/query theorem failures as failed dependency prebuilds and
  skipped their witnesses. Execution 4 accidentally ran a partial baseline because
  `--skip-baseline` was ignored: it completed Rust tests, extraction, default Lake
  and four direct proofs before termination. It is excluded. Corrected execution 6
  ran only the two controls and final restoration; no source/proof repair was made
  to make those controls pass.
- Two manually transcribed proof hashes in a draft receipt were corrected against
  frozen files. The final receipt and current-source hashes were checked again.

No original production authorization bug was established. This slice exposes the
existing algorithm for verification and corrects its integration/proof tooling.
Source review also corrected a documentation claim: the SDK can read advertised
MCP declarations, but no automatic Hub comparison with stored registration was
found or added. Admission and policy use the checked stored declaration.

Remaining formal obligations include declaration generation/validation, wire/schema
correspondence, registration identity, actual current-role/risk policy and SDK
resource dispatch. Typed dispatch's first-domain-parser match and authorization's
all-template agreement need an explicit correspondence argument; no vulnerability
or new runtime rejection is inferred from that gap. The next connected step is to
link the proved resource requirement to Hub's current-role/risk decision and the
already-qualified delegated-authority assembly. Full Mac/Linux publication gates,
Hub dependency adoption, deployment and model-driven acceptance were not performed.
