# Repository-grant translation boundary

The unchanged Hub repository-grant calculation extracts through Charon, but the
pinned Aeneas backend cannot translate its required `Iterator::cloned` signature.
There is no new producer theorem. The independent SDK detail construction/projection
extracts successfully into Lean source; compilation and proofs of that model are
the next step. These results do not close current issuer/verifier continuity.

The [machine receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/repository-grant-translation-20261031.json)
contains commands, inventories, the exact associated-type constraint, timings,
source maps and output hashes, published in Hub `f14ecab`. Its SHA-256 is
`75b2f4ea5fd3ad3f6b6e08090e7b67772d89efdd5c527a0b5c64ddc6386cf743`.

## Source and intended contract

- Hub `bfd390d141a2911ca8c2836106ad00b9ed557509`, tree
  `a39b998453dd61aa9e8ed4068b7f1fe85f85560f`: all 1,156 archived files verified.
- Its actual Git-pinned SDK `7360c0f96cb616c519d27256df214ff4f2e6e831`:
  all 178 archived files and the dependency checkout verified.
- Core `422dcf268d690fcbc3fee435cf9b81e7f36ffeac`; exact metadata pins and
  relevant identifier source hashes verified.
- Charon 0.1.293, Aeneas binary SHA-256
  `d968af5e01e50cef84add48a75cf2af8f80751458cab931066d05f42098d934c`,
  Rust nightly 2026-09-17 on Linux x86_64. The receipt identifies both binaries.
- Root coordinated and reviewed; GPT-6.1 Sol prepared and diagnosed the probes;
  GPT-6 Luna ran the bounded scripts serially on Linux. No model acceptance call
  or deployment was made.

The specification is independent of the iterator implementation: find assignments
in exactly the requested tenant/repository, match the principal or their admitted
tenant memberships, and return exactly the union of those assignments' actions.
No matching assignment means no grant. A matching assignment with no actions is
still a grant and preserves legitimate read access. This adds no role threshold,
action requirement or repository delegation ceiling.

## Execution and diagnosis

1. The first extraction also started the SDK detail constructors through external
   metadata. Charon exited 101 after 10.434 seconds, before producing LLBC. The
   panic names `RepositoryIds::{constructor#0}` and a missing `fn_sig` during root
   path resolution. A preceding asynchronous `MaybeSendFuture` warning is not the
   named panic; a previously successful extraction also had that warning class.

2. Removing only the external SDK start patterns avoids that panic. Charon exits
   zero after 40.258 seconds and emits 1,859,041 bytes of LLBC, SHA-256
   `391887bda0c2505e4e9d9c6e5f74303ed19d19fa7e5c71552eda81f0f5ae3203`.
   Both intended producer functions, all 38 own functions and all 37 own types are
   transparent and error-free. All five full-field checks pass. The strict root
   count nevertheless stops the runner: the selector also starts the default
   `CatalogSection::group_memberships`, which returns `Ok(Vec::new())`.

3. Root reviewed and explicitly accepted that additional method for backend
   feasibility. The original failed count check remains in the evidence. Aeneas
   runs against the same LLBC, with no repeated compilation or edited model. It
   completes 127 prepasses, then exits 2 after 0.459 seconds with zero generated
   files. LLBC and binary hashes are unchanged afterward.

4. The retained `Iterator::cloned` method has the equality `Self::Item = &'a T`.
   Hub's actual action-collection closure calls it. Aeneas's trait-signature
   translation rejects the residual equality; the error reports the Iterator
   trait's source span. The empty extra default has no such constraint or call.
   Removing that extra root therefore cannot remove the required failing
   dependency. Existing trait filtering and associated-type lifting were already
   active. No further root-only retry was made.

The inspected Aeneas source at `fdebf20` corroborates the stack and assertion.
Build provenance tying that checkout to the executed binary is not established;
the measured failure and source interpretation remain distinct. No constraint was
discarded and no native or backend code was rewritten to force extraction.

## Independent SDK dependency

Compiling the same SDK revision as the local crate avoids foreign root resolution
for `PermissionsDetail::new`, `RepositoryDetail::new` and `RepositoryDetail::grant`.
The strict inventory passes: three intended roots, seven transparent own functions,
eight transparent own types, complete fields, native String payloads, action-set
types and both detail-kind variants. Charon emits 317,098 bytes of LLBC, SHA-256
`a584e81f0f3ddf4f7fb99cd10af209e39823e00aceda92eae24b18093062e0ab`.
Aeneas produces unchanged function/type definitions and external templates.

The recorded `/usr/bin/time` wall times are 0.23 seconds for metadata, 0.09 for
package cleanup, 16.19 for Charon and 0.62 for Aeneas. These are command timings,
not end-to-end proof timings. No Lean compilation or theorem check has run at this
checkpoint. The next property is preservation of the entire grant through detail
construction and projection, including empty actions, with standard collection
clone correspondence explicit.

## Remaining boundaries

The producer, SDK issuer/verifier, admitted-input provenance, catalog publication,
native Lore contribution and SQL/asynchronous adapters remain separate open
obligations. A generated model is not a checked proof. Native identifier parsing,
JSON encoding, signing, verification and deployment are not qualified here.
No runtime policy, dependency pin, CI rule or application data changed.
