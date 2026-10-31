# Unchanged permission-namespace extraction boundary

A bounded probe attempted to expose Core's existing private permission-namespace
helper in the SDK issuer model. Charon succeeded, but pinned Aeneas failed while
translating Rust's string-pattern method signature. No Lean output was produced,
so this probe closes no formal coverage gap. The canonical model is unchanged.

GPT-6.1 Sol prepared the selector-only probe, GPT-6 Luna executed it on Linux,
and GPT-6 Astra reviewed the source identities, inventory and terminal diagnostic.
Inputs were the same 173-file prepared SDK `e268032` archive and pinned Core
`120306e` used by the [claims checkpoint](2026-10-31-sdk-claims-assembly.md), with
the same recorded Charon/Aeneas binaries. No Rust or dependency changes were made.

The selector delta includes `veoveo_types::permission_names::namespace`, removes
its opacity, and explicitly leaves third-party `core::str::_::split_once` opaque.
The resulting counts are two roots, 35 includes and seven opaque selections.
The Core helper uses `split_once('.')` and returns the prefix, or the original
string when no dot is present. This tests extracting our body while retaining a
standard-library boundary; it does not attempt to verify Rust's string library.

Charon passed in 12.188 seconds with all source hashes unchanged before and after.
Its LLBC is 4,885,855 bytes, SHA-256
`6fe680654038125147bf04418d979becfcb28c4c3f76ec3a45e61f5bdbe3bac1`.
Both roots and all sixteen uniquely resolved critical functions are transparent,
structured and error-free. The free namespace helper is among them;
`split_once` is the exact opaque library boundary. The issuer guard and call-order
inventory also passes. These are extraction observations, not Lean proofs.

Aeneas exited 2 in 0.665 seconds, without a timeout. It reports `Unimplemented`
at `/rustc/library/core/src/str/pattern.rs:99:0-99:24`, with
`Aeneas.Errors.CFailure` raised in `SymbolicToPureTypes.translate_fwd_ty` during
method-signature translation. Its peak resident size was 118,100 KiB. No Lean
files were emitted, and no Lean check or retry ran.

Local evidence is under
`/tmp/hub-request-composition-20261031/core-namespace-probe1/`:

- `remote-extraction1/summary.json`:
  `a22132c371c39396bc869d02fe35c334835de2fffda4447749fedbee08a35ad1`.
- `remote-aeneas1/aeneas1/logs/summary.json`:
  `f819ad7b95a8466b45c72b7a3b21d0064e0c92aa4d76ea7111196470dcc2a021`.
- `remote-aeneas1/aeneas1/logs/aeneas.log`:
  `fdef49e5742d69153a2c627ab0acf527a5446203b9e5c0f3b962c856d80aa463`.

The existing handwritten `Native.namespacePrefix` remains an explicit own-helper
refinement gap. Subsequent issuer composition can prove the permission scan,
identity/claims connection and exact signer argument relative to that model; it
must not claim unconditional native permission ownership. We will not rewrite
production code or expand this slice into translator changes to avoid the
limitation. No canonical models, proof statements, runtime behavior, CI,
deployment or paid calls changed.
