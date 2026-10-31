# Actual request-composition bodies translate

Both partitions now translate successfully: the exact committed Hub source in its
own `RequestCompositionHub` namespace, and the SDK issuer/context/identity/claims
path in `RequestCompositionSdk`. SDK source preparation is committed as
`e268032a35cfa8f75ef7094622d818dda1f2a736`. **This is translation and native-test
evidence, not a completed Lean composition proof.**

## Failure resolved without changing the validation contract

SDK probe 3, based on `7e28d5e`, passed Charon inventory but Aeneas failed in
`HubRequestContext::validate_for` at `request.rs:35–41`, joining borrowed contexts
across a provenance Boolean expression. It exited 1 after **1.518 s**, peak RSS
**438,532 KiB**. Partial output was not adopted as a successful model.

The reviewed fix spells each existing provenance condition as an ordered guard
returning the same `InvalidRequestContext` error. Common conditions are evaluated
first, provenance conditions retain their order and short-circuiting, and the final
common/session-family condition stays last. It adds no condition, clone, allocation
or public API. Canonical `!=`, `is_some` and `!is_empty` expressions negate the
existing concrete equality/emptiness checks. Source review establishes this
comparison; a formal old/new Rust equivalence proof is not claimed.

The proposal was translated in a temporary checkout before applying it to main.
SDK probe 4 has exactly one changed source file from `7e28d5e`; its final bytes match
committed `e268032`. Charon reported no errors. Both roots and all 15 inventoried
function bodies were unique and transparent, including actual issuer, context,
identity and claims construction. Aeneas passed in **3.122 s**, peak RSS
**765,744 KiB**, emitting all four files. Its permission guard and actual call order
remain `find → create_identity → from_identity → sign_forwarded`.

Concrete signing/serialization, clock and identifier primitives retain explicit
boundaries. The actual SDK issuer is not replaced with a chosen successful identity.
Hub still pins SDK `239622d`; newer SDK extraction is not proof of that pinned
dependency until the integration is established.

## Native source check and exact Hub extraction

GPT-6.1 Sol implemented the reviewed rewrite and extraction configuration; GPT-6
Luna executed the bounded Linux extraction and Mac native checks; GPT-6 Astra
reviewed the contract and committed the source checkpoint. No paid model call,
deployment or full repository Docker gate was performed.

On macOS ARM64 with `rustup run 1.99.0-aarch64-apple-darwin`, in order:

- `cargo fmt --all -- --check`: passed, **0.377 s**.
- `cargo test --locked -p veoveo-hub-sdk --lib internal_auth:: -- --nocapture`:
  **35 passed**, 126 filtered; **7.159 s** Cargo / **0.36 s** body.
- `cargo clippy --locked -p veoveo-hub-sdk --lib -- -D warnings`:
  passed, **2.257 s**.

All six recorded source/dependency files matched before and after the checks.
No new test was added for this expression rewrite. A temporary formatting command
used an unsupported rustfmt flag; the supported command then confirmed byte-for-byte
format stability before the native run. This setup failure is not a test failure.

Separately, exact Hub `3bc2923ca1d2e0c559e532286c16ec3d6a5ceb7a` (runtime change
`91ab4cc`) was extracted with only the existing catalog-field naming annotation.
Charon passed in **24.459 s**, Aeneas in **2.022 s**; LLBC has no errors. This removes
the previous scratch-format correspondence issue and supplies untouched generated
files with their final module namespace. Namespace-helper behavior and the SDK
issuer bridge remain open; the current handwritten models are being compiled.

Tool pins remain Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, and Linux Rust nightly 2026-09-17.
Translation retained its earlier primitive interfaces and did not add an
authorization rule. Lean theorem checks, model/adapter correspondence and semantic
controls remain separate work.

## Evidence identities

Logs are under `/tmp/hub-request-composition-20261030/`. SHA-256 identities:

- Final SDK `internal_auth/request.rs`:
  `99165c82db4d7eaa3e062763fa552f3f2fe95786b311b26c69d7bfe07144c6ce`.
- Native summary `evidence-sdk-request-guards-native/summary.json`:
  `dd26142da897f032ba83b89c6ce6ef56c41d9d88cc047791d08a8721f2b18724`.
- Native test executable:
  `c7a6cd087583e953affc4bc56cf778fc570a3c45a39153fd9ffcf7056ececc13`.
- SDK probe 4 summary `evidence-sdk-local-probe4-aeneas/aeneas-summary.json`:
  `34c883dfff418b2f73103ab9ad07c25e25178c56e18862caf75959eb49cdeb6e`.
- SDK LLBC, 4,811,432 bytes:
  `6f75795bcb2c2fe6cddd70d708fd7e97ca7e2b4497797cb63ca416c29e4baa87`.
- SDK generated Funs, 118,685 bytes:
  `4192b523fcb8e0ffffd5bb255214d002461a9de6c299b916f6d8e3652a13223a`.
- SDK generated Types, 27,881 bytes:
  `4183617c619265c0355aba25fad5e275160e17e3d58d570b2f3c0305405ddb10`.
- Canonical Hub summary `evidence-hub-partition-a-canonical1/summary.json`:
  `0e26957b07303686cd2a37c0487dc433145711622447205e73934af3ff12a038`.
- Hub LLBC, 6,106,808 bytes:
  `7edac606b908226fd1748bc70046c582c9dc399d366412700a58ed7abbd0e5d0`.
- Hub generated Funs, 223,858 bytes:
  `b1cd794046eea1100fa621bf555126ce9e44452938d16fe32c4be7133d9656f1`.
- Hub generated Types, 115,359 bytes:
  `afc561f2a66c0f4725eba1181379ec09ec298f1aec4de12557c1aa79bb8874f2`.

The earlier [source checkpoint](2026-10-30-request-composition-source-checkpoint.md)
remains historical. Neither successful extraction nor these passing native tests
complete the intended selected-route → current-authority → signed-claims → recipient
contract.
