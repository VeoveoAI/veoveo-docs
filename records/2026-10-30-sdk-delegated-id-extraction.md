# Preserve delegated identity inputs during extraction

SDK `19a1e65` replaces one existing delegated-context string construction with
explicit ordered appends. The comparison is still `actor.id == issuer#oauth_client_id`
at the same guard, with the same error. This is qualified proof preparation,
not a production defect fix or a completed issuer proof. It adds no authorization
rule, rejection, dependency, helper API or infrastructure.

## Why the expression changed

The pinned Aeneas formatting model represents `fmt::Arguments` as Unit and loses
the dynamic issuer/client values. Leaving that call opaque could not support a
faithful input-dependent comparison. The replacement uses one String, appends
the issuer text, `#`, then client text, and performs the existing comparison.
Source review of pinned Core's typed IDs confirms `Display` and `as_str` expose
the same underlying text. No performance benchmark or allocation-equivalence
claim is made.

GPT-6.1 Sol prepared the change and package; GPT-6 Luna ran the logged native and
extraction checks; GPT-6 Astra reviewed the exact source/generated diffs and
committed this milestone separately from the unfinished Lean model package.

## Observed validation

The extraction input was SDK `e268032` with only the candidate `request.rs`
overlay, Core `120306e`, Charon `de8736f`, Aeneas `fdebf20`, and Linux Rust
nightly 2026-09-17. Charon completed in **12.687 s** and Aeneas in **3.323 s**.
Both actual roots and all 15 selected own functions have transparent structured
bodies without extraction errors. Raw output preserves issuer/client values
through the append calls and existing comparison. Generated types are unchanged;
the formatter interface disappears from this generated function graph. Existing
missing iterator-model warnings remain for the operational models to supply.

The prepared source passed all 35 existing `internal_auth::` tests, formatting
and strict library Clippy on macOS arm64. Since current SDK main `154a473` also
contains Apps and Cargo-feature changes, the identical candidate was separately
checked in a private archive of that main revision:

- Formatting: **0.305 s**, exit 0.
- `cargo test --locked -p veoveo-hub-sdk --lib internal_auth:: -- --nocapture`:
  **35 passed**, zero failed; **16.803 s** command time, **0.35 s** harness time.
- Strict library Clippy: **4.466 s**, exit 0.

All 178 frozen source files remained unchanged during that run. Its Mach-O arm64
test executable SHA-256 was
`c2c3962c8005b131e2dfff7574983a5eaa8f724ee669851e0de82db2905d8d79`.
The adopted `request.rs` matches the tested candidate SHA-256
`9468ae3f1cea230ca729c2d3723bac26adcb0d5c31ae24d811c65d4a71eae7ee`.
The [committed receipt](../../veoveo-hub-sdk/proofs/internal_auth/evidence/delegated-id-extraction.json)
records exact commands, source/tool/configuration hashes, generated identities,
native outputs, timings and scratch log locations. Setup-only directory and
manifest-parser failures occurred before the affected tool commands; they are
not successful validation evidence or product defects.

## Remaining boundary

The extraction remains tied to its prepared source revision; the second native
run establishes testing against current SDK compilation context, not fresh
whole-main extraction. The operational Lean package, issuer/recipient correctness
theorems and their integration are unfinished. Hub still pins SDK `239622d`.
This milestone does not verify that pinned stack, signing/cryptographic
correspondence, or whole-repository behavior. No deployment, Linux runtime test,
full Docker gate or paid model call ran. The change is committed locally and
has not been pushed by this team.
