# Refresh predicate extraction checkpoint

The actual `RefreshFamily::bound_to` and `deliverable` functions, including the
delivery-envelope closure, successfully translate through Charon and Aeneas. This
is an extraction checkpoint, not a checked refresh theorem, native qualification,
SQL refinement or deployment result. The scope follows the
[transaction source review](2026-10-30-refresh-transaction-source-review.md).

Sol `/root/coder` prepared the frozen source/selectors and reviewed the runner.
Luna `/root/builder` ran the logged extraction on Linux and checked the post-run
source map. Astra `/root` reviewed the selectors, actual generated function bodies,
new type/operation boundaries and draft native tests; independently verified the
three stage-log hashes, LLBC, all four generated files and original-summary link.

## Inputs and measured stages

Hub base is `bb2e97f5c984a53eaa218109e4c01a70e952e365`, SDK remains
`239622d12c08b771cc5e813fe3e846385d8d04ad`, and Core remains
`120306eb969c6134dadd422dca701a2ce63e9492`. The 83-path frozen overlay has SHA-256
`1db095cdbe268c3b2ee3fd3245e104253dce46a277b3a95de1f8b3ca354d28fb`;
its manifest is `c4d7e9f667cbbc3d42fb62bb815766b1f36dda6400a8fa08f089b03506e0c844`.
The exact command plan is
`d71484a776a6cdd4a032f7400d97569360c75d1cd974154ef37ee2616f64ed3c`.

The prior five extraction roots are retained with two additions: 7 starts,
23 includes and the same 11 opaque selections. The pinned nightly/toolchain and
existing extraction-only catalog naming annotation are unchanged. Four leading
Rust comment lines now accurately distinguish rotation/revocation family locking
from maintenance's own row-lock batches; the remaining refresh source bytes match
the original revision. The freeze predates the new native test drafts.

- Hub package clean: exit 0, 0.164 seconds.
- Charon: exit 0, 23.905 seconds; LLBC `has_errors=false`.
- Aeneas split translation: exit 0, 1.972 seconds.

The LLBC is 4,296,007 bytes, SHA-256
`d5e7040d9b1d6d6d2f9b7a57af3e420e002cacb051602400f629e27f15ac41d5`.
Generated `Types.lean` is
`a72a8c072fd1cb422c4f2d839701cddc230d7726b85f647e5f6669f2b487a3bb`;
`Funs.lean` is
`c710121441703ae79a32c5ed79462d4b45ab429d781891a9ca1c562b3c090bbc`.

## Meaning and remaining work

Both selected functions and `deliverable`'s `call_once` closure have transparent,
structured bodies. The generated decision retains the source's checks for consumed
and replay state, family revocation and expiry, successor family, checked next
generation, current generation, successor expiry/state and envelope deadline.
Binding retains its three typed equality comparisons.

The newly surfaced equality operation is `HubRefreshFamilyId` equality. New external
nominal types include `SecretBox`, `Uuid` and `Sha256Digest`; the predicate does not
open the ciphertext or compute a digest. Chrono ordering was already modeled in the
preceding session package; checked `u64` addition uses Aeneas's standard operation.
Generated external templates contain axioms as placeholders. They are retained raw
for inventory, not accepted as handwritten models or proved behavior. Ordinary
models, exact-result proofs, dependency audits and native correspondence are next.

Builder's comparison to the qualified session output found only added declarations
after normalizing source-location comments. This is an extraction-level comparison;
the expanded Lean package has not yet been built at this checkpoint. The planned
transaction model remains separate from these actual Rust predicates.

## Preserved execution corrections

The first launch stopped before creating the source directory because the input
archive was staged at a different path from the frozen plan. The identical files
were placed at the plan's paths and the unchanged audited runner was launched.
After all three successful stages, its final map check stopped on the intentional
catalog annotation. A separate read-only continuation verified all 784 base-only
paths and 83 overlay paths and the exact reversible annotation; no extraction was
repeated. Earlier runner review also corrected a stale assumption that Cargo.lock
must equal the base rather than the frozen SDK-adoption overlay. No dependency was
changed to satisfy that assumption.

Evidence is mirrored at `/tmp/hub-refresh-concurrency-20261030/evidence-probe-1/`.
The original summary SHA-256 is
`fb62c470e77732fc419af4dcab041b8cf3461e57e0b3b617ad618ade11febf5f`;
the source-map continuation is
`4c8bb031ae9b98ead71b0d0dc94bcc27fb5ab5b1042e1c77831ce17a80d4b503`.
Both remain distinct. No native tests, semantic mutants, Lean model build, runtime
behavior change or paid-model call is claimed by this checkpoint.
