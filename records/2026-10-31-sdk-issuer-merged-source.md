# Issuer proof applicability after SDK source integration

SDK merge `dbfd2a096f6b8f9cd210568d935182f9b486823a` reconciles the committed
issuer proof work with the fetched upstream SDK. Its parents are local `6afa18a`
and upstream `7459481`; its exact tree is
`066d726d43e1d6254b06bc5b7a50a8bf6b4e8e48`.

The merge changes only `Cargo.toml`, `Cargo.lock`, and the Apps and registration
design documents. There were no conflicts or manual resolutions. All issuer
preparations, generated models and proof files remain unchanged. Every Core
dependency now names upstream `4ebcf890eae077cdaf28dacdfab6650f1e5c4e30`, which
includes the independently developed parked-Task wake fix. This slice does not
qualify that Task behavior.

GPT-6.1 Sol performed the merge and source review, GPT-6 Luna executed the logged
checks, and GPT-6 Astra reviewed the evidence and committed the integration. The
source snapshot contains 230 tracked files. No deployment, paid model call, new
authorization rule, runtime adapter or proof-execution framework was introduced.

## Native checks

The frozen merge snapshot passed these macOS aarch64 checks with Rust 1.99.0:

- `cargo fmt --all -- --check`: 0.343 seconds.
- `cargo test --locked -p veoveo-hub-sdk --lib internal_auth:: -- --nocapture`:
  35 passed, 133 filtered out; 21.843 seconds for Cargo and 0.35 seconds reported
  by the test harness.
- `cargo clippy --locked -p veoveo-hub-sdk --lib -- -D warnings`: 8.246 seconds.

All commands exited zero and the complete source map remained unchanged. The
checks reused the existing warm Cargo target with two build jobs. The executable
named in the test log was subsequently hashed as
`46c2399445c4b6e0d17f3ba4d53c1012c8cf7cded3dc1dd451eb6d0504a772d9`,
93,630,560 bytes. This is a post-run identity observation of that warm-target file.

An initial runner path-substitution error stopped before any Cargo command; its
setup evidence is retained separately. The successful command logs and source
maps are under
`/tmp/hub-request-composition-20261031/sdk-merge-066d726/native-evidence-run2/`.

## Extraction and limits

Fresh Linux extraction used the merged crate and its exact Core dependency, with
the existing two roots, 34 include selectors and seven opaque selectors. Charon
passed in 18.997 seconds and Aeneas in 3.224 seconds. Both roots and the 15 selected
functions were transparent, structured and error-free; the public issuer retained
its permission search followed by identity construction, claims construction and
signing. The complete 230-file source map remained unchanged.

SDK `e82ceb8` commits the
[source/model receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/merged-source-20261031.json),
including exact commands, tool hashes, source and output identities, comparison
method and setup events. Its SHA-256 is
`36c163f1f60bd869688c1913d0ea1780c19a3335cadef297e23ed48f1873d3be`.
The LLBC is 4,823,623 bytes with SHA-256
`2289acd033e750c330d2855bb2900e9612d4df86a0ccc6c59b9554b717270716`.
Local raw outputs, full diffs and logs are retained under
`/tmp/hub-request-composition-20261031/sdk-merge-066d726/evidence-raw-comparison/`.

All four raw output hashes differ from the older extraction. Review established
the exact reason: 24 source-comment lines in `Funs.lean`, ten in `Types.lean`, 40 in
the function template and 21 in the type template. They record the new Core
checkout revision and shifted declaration source locations. Every changed line
is a `Source:` line inside a generated documentation comment. Restoring only those
lines reproduces the corresponding old file byte for byte; no declaration,
function body, type or external interface changed. This comparison does not strip
arbitrary comments, rename identifiers or normalize executable code.

The committed raw model and existing proofs remain unchanged. Their established
issuer/recipient contracts therefore apply to this newly extracted SDK slice under
the same recorded primitive and representation assumptions. No additional Lean
theorem or broader application guarantee is claimed, and unchanged Lean packages
were not rerun for source-comment changes.

The extraction setup first encountered a missing archive-prefix field and then a
missing pinned Core revision in Linux's offline cache; neither reached Charon.
A normal locked metadata fetch retrieved exactly `4ebcf89`, preserving the lockfile,
and extraction continued from the verified tree. These setup failures are not
translator, native-test or contract failures.
One shell-wrapper attempt also failed before Cargo; the receipt records it
separately from the successful fetch.

Hub's dependency pins are unchanged. This result does not establish applicability
to its older pinned SDK, its new App-origin forwarder or registration fields, nor
does it establish crypto/verifier, HTTP, database or deployed behavior. The earlier
caller deadline control remains incomplete; this integration does not finish its
independent witness. The existing registration-design wording that describes all
forwarded tokens as capped by the original caller token also remains a separate
documentation correction: the native acting-server path uses its inherited
delegation deadline and deliberately exempts that original-token cap.

The merge is local and has not been pushed or deployed. Full repository
publication gates were not run for this checkpoint. The comprehensive Hub goal
remains active and partial.
