# Repository-grant detail preservation

The actual SDK detail constructors and repository-grant projection now have checked
Lean contracts for complete value preservation. A deliberate one-line Rust fault
that discards granted actions is caught by both the unchanged proof and an existing
native test. An independent proof establishes the faulty output, including that a
legitimate empty-action read grant still works. This is a proof-sensitivity control,
not a newly discovered production bug.

The [proof package](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/repository_grants/README.md)
contains the generated model, handwritten standard-library models, theorem source,
source mutation and independent witness. Its
[qualification receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/repository_grants/evidence/qualification-20261031.json)
records commands, source maps, timings, logs and artifact identities. SDK commit
`e9105ca` publishes this package. This follows
the separate [producer translation investigation](2026-10-31-repository-grant-translation-boundary.md);
it does not close that producer or the complete issuer/verifier obligation.

## Source, contract and execution

- Unmodified SDK `7360c0f96cb616c519d27256df214ff4f2e6e831`, with Core
  `422dcf268d690fcbc3fee435cf9b81e7f36ffeac`; the isolated source map covers 178 files.
- Charon 0.1.293 and the recorded Aeneas binary extract three roots, seven
  transparent own functions and eight transparent own types. Generated functions,
  types and external-interface templates are retained without manual edits.
- Ten theorems cover exact permission/repository construction, actual ID/action
  clones, complete grant projection and roundtrip, empty-action read grants, and
  constructor injectivity. Thirteen executable closure guards cover these theorems
  and the three production roots; only `propext`, `Classical.choice` and `Quot.sound`
  are admitted.
- The coordinator reviewed source, proof scope and negative-result logs. GPT-6.1
  Sol prepared proofs and evidence; GPT-6 Luna ran bounded unattended checks.
  Native Rust tests ran on macOS ARM64 with Rust 1.99.0; extraction and Lean 4.35.0
  ran on Linux x86_64. There were no deployments or OpenCode/model acceptance calls.

The contract preserves the complete repository text and entire action membership,
not just a yes/no authorization result. An empty action set remains a valid read
grant. It adds no authorization rule or runtime check.

## Measured sequence

1. The first model build passed in 22.816 seconds. The proof failed in 10.060
   seconds because of record-literal layout. The axiom guard rejected Lean's
   resulting incomplete declaration. Joining those fields onto one line preserved
   the statement; the proof then passed in 6.087 seconds with all 13 guards.
2. The actual mutant's generated interface exposed an explicit type parameter on
   the standard empty-set constructor. The unused baseline support declaration
   was corrected to that exact signature. No generated body or theorem changed.
   A fresh baseline model passed in 10.773 seconds, followed by the unchanged proof
   in 3.927 seconds. These syntax/interface repairs are setup findings, not evidence
   that a semantic fault was detected.
3. The existing native test
   `internal_auth::tests::a_runners_token_carries_the_callers_grant_on_its_linked_repository`
   passed once in 51.382 seconds including compilation. The injected fault changed
   only `RepositoryDetail::grant` to clone a new empty action set. The same test
   failed in 5.671 seconds at the intended assertion: actual empty actions versus
   expected `push-protected` and `write`. Reversing the patch restored the exact
   original source map; the unchanged test passed in 5.823 seconds. These are
   Cargo command times, not request latency; the test bodies took 0.01–0.02 seconds.
4. Fresh mutant extraction passed all own-interface checks. Its Lean model built
   in 9.043 seconds. The unchanged proof failed in 3.696 seconds at the precise
   equality between empty actions and `detail.actions`. Its cascading `sorryAx`
   was rejected and no correctness OLean was accepted. The independent Funs-only
   witness passed in 2.754 seconds with three standard-only guards, proving the
   wrong nonempty-grant result and retained empty-read behavior.
5. Reversing the same patch on Linux restored all 178 source files and regenerated
   all four raw Lean files byte-for-byte. Restored Charon took 13.289 seconds and
   Aeneas 0.565 seconds. A fresh restored model passed in 8.486 seconds and the
   unchanged proof in 3.184 seconds, with all 13 guards and source postchecks passing.

Every accepted baseline/control stage checked its frozen source and dependency
inputs before and after execution. The mutant uses the same primitive models and
unchanged theorem source as the successful baseline. Native baseline/restoration
tests reach later empty-read assertions that the deliberately failing native run
does not reach; the independent Lean witness also checks empty reads directly.

The frozen theorem source SHA-256 is
`94003104000a76ae565dd5026a68d632707b7b4cba30b8179c5bbdca124eb1df`.
The generated baseline/restored function file is 4,581 bytes, SHA-256
`40c0e1be9dbe30221421189fb02b4a21afc458343bf6bff18fc9335e83dbdf45`.
The source mutation is SHA-256
`afde2e5c03896256059c04713966c936bc7590f75c71958a211dd7241e3a8fa5`.
The receipt retains the other generated, native-binary, log and compiled-proof
identities. Restored native binary and LLBC bytes differ from their first builds;
source and raw generated-file equality are established, binary reproducibility is
not claimed. The corrected-interface baseline and restored proof OLeans do match:
99,288 bytes, SHA-256
`7aebcc207eaf2154be1a34843cbe7da97094493aba459f6ef5e3b05aac4c0431`.
Their individual model OLeans differ despite identical gated model sources; the
receipt records both sets without claiming a cause or general reproducible build.

## Boundaries

The equations are proved over the extracted code with explicit standard-library
value models: finite-set membership, String clone and a finite clone traversal that
calls the actual element-clone functions. Native allocation, panics, aliasing,
allocator effects and traversal/effect ordering remain refinement boundaries.
Identifier parsing, serde/wire equivalence, cryptography, the full issuer/verifier,
Hub's assignment/group calculation and Lore's native enforcement are not proved here.

The qualified Lean dependency retains the previously recorded two-line Aeneas
instance-name patch. No new backend patch is introduced; clean unpatched upstream
reproduction is unmeasured. The unsupported producer/verifier translations remain
open rather than being worked around with production changes.

Only proof assets and documentation changed. There is no runtime, policy, Cargo pin,
CI hook or deployment change, and no new full-platform qualification claim.
