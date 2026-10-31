# Hub source integration and focused native checks

Hub merge `1ccb868` integrates upstream `0ff0819` with local proof work at
`1072084`. The merged tree is `1988d039d60f804841758084e85a15f20618ce3e`.
No merge conflict or manual resolution occurred. All differences from the upstream
parent are the 56 proof/evidence paths; runtime and configuration match upstream
exactly. The two registration race fixes, `05737d6` and `22cdabb`, were already
ancestors of both parents and remain present.

The merged manifest uses the published SDK `154a473` and Core `120306e`. It does
not adopt the newer SDK issuer-proof line or Core Task fix merely because those
have been integrated separately in the SDK repository. The existing generated
Hub models, proofs and controls are unchanged by this merge.

GPT-6.1 Sol inspected and merged the sources; GPT-6 Luna ran the logged native
checks; GPT-6 Astra reviewed source equality, logs and counts and committed the
integration. The frozen snapshot contains 1,076 files. Its source map stayed
unchanged throughout validation and matched the repository afterward. The
archive SHA-256 is
`ea96fc280f9a74996cd1e87669285131f74d8a82170cd9381e42068ef13fba03`;
the sorted source-map SHA-256 is
`1f269349c7a513d15e2774dc7dce0b8eb5172479a17e6258bd99be026970c6f4`.

## Native results

On macOS aarch64 with Rust/Cargo 1.99.0 and the existing warm target:

- Formatting: passed in 0.643 seconds.
- Both registration concurrency regressions: 2 passed, 39.924 seconds for Cargo,
  1.21 seconds in the test harness. These include the replica/replacement race and
  stale-update protection.
- Existing instance-registration integration tests: 6 passed, 61.268 seconds for
  Cargo, 24.97 seconds in the harness.
- Strict library Clippy: passed in 19.977 seconds.
- App-origin sign-in, admission and forwarded-identity test: 1 passed, 1.581 seconds
  for Cargo, 0.89 seconds in the harness.
- Shared policy catalog semantics: 1 passed, 1.535 seconds for Cargo, 0.01 seconds
  in the harness.
- Authorized upstream HTTP assertions: 3 passed, 0.339 seconds for Cargo,
  0.01 seconds in the harness. These exercise fresh assertions, inherited
  delegation deadlines and subscription lifetimes.

All seven commands exited zero: 13 tests passed in total. The
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/merged-hub-source-20261031.json)
contains exact filters, source identities, log hashes and post-run identities of
the three test executables. Its SHA-256 is
`00d002f1d497a4a38d74c960d1dc7e62fdb72618970425aa428601abd6c31be4`.
Command timings include compilation; harness timings are the rounded values Rust
printed. Logs and snapshots are under `/tmp/hub-merge-20261031/`.

## Formal scope and next work

This is source integration and native component qualification, not a new Lean
result. Fresh shared-graph extraction and proof adaptation are the next slice.
They must include `AppOrigin` in the action/target/requirement domains, the new
`Requirements.app_origin` field, complete ordered `RegisteredServer.surfaces`
metadata, and `RefreshRevocation.AdministratorRevocation`. Similar function bodies
do not justify ignoring new variants or fields.

The existing extraction roots do not reach the separate `forwarded_bearer`
function. Its clock, lifetime, context and error path need a later explicit
connection. The original caller deadline witness remains incomplete and was not
retried. No runtime behavior or authorization rule was added by this proof effort
during the integration.

The merge and receipt are local commits; nothing was pushed or deployed. No full
publication gate, Linux native suite or paid model call ran. The comprehensive
verification goal remains active and partial.
