# SDK-to-Hub native baseline

The SDK `239622d` adoption and expanded native policy fixture pass all six focused
Rust tests, formatting and strict library Clippy. This supplies component evidence
alongside the [Lean composition checkpoint](2026-10-30-sdk-hub-policy-composition.md).
The three new semantic controls and subsequent restored qualification have not run
at this checkpoint; the combined slice is not yet qualified.

## Exercised behavior

`actual_registered_policy_narrows_current_grants` now checks 23 complete decision
records through the actual SDK declaration access, Hub catalog policy and native
downstream narrowing functions. It then checks eight direct SDK access results.
The declaration passes the existing SDK validation; fixture URLs are never fetched.

The added scenarios cover an exact Read resource overriding conflicting Write and
Inspect templates; agreeing Read templates; Authenticated-versus-Permission and
different-permission conflicts; authenticated resource/prompt access with no current
or carried grants; direct template/prompt access; and missing targets. Earlier cases
retain managed-client refusal, exact grant intersection, required-permission
preservation, prior denial, missing tools and server/Task route behavior. Expected
records include effect, reason, requirement, grants, policy version, caller and
correlation fields. The actual clock sample is checked against the surrounding
observed timestamps; no claim about clock correctness follows.

The three registered-catalog tests cover denial metadata, distinct missing-target
reasons and authenticated/Task boundaries. Two delegated-assembly tests cover route
requirements, server boundaries and preservation of prior/nondelegated decisions.
These are in-process Rust component tests, not SQL, network, deployed or browser
tests. The tests do not formally refine native collections, parsing or asynchronous
callers to the Lean models.

## Source isolation and execution

GPT-6.1 Sol `/root/coder` extended and froze the fixture and audited the temporary
runner; GPT-6 Luna `/root/builder` ran it on Linux x86_64. Astra `/root` reviewed the
fixture, source-resolution plan, actual output and qualification boundaries.

The runner used fresh Hub and SDK source copies. Supported Cargo path patches
resolved SDK, fixture and macros to the exact isolated SDK tree. Metadata confirmed
all three local manifest paths. The scratch lock changed only by removing those
three Git source lines; versions, dependency lists and all unrelated entries stayed
identical. Shared Cargo source checkouts and working repositories were not patched.
The SDK runtime bytes are revision `239622d`; a separately identified two-file overlay
changes only the proof crate edition and its README.

All four affected packages were cleaned through the Hub's resolved dependency graph,
preserving third-party build caches. The first test command freshly compiled SDK,
fixture, macros and Hub; all three test filters executed the same recorded binary.
Native compilation used Rust `1.99.0 (b940084d7 2026-09-28)`, LLVM 23.1.1,
`SQLX_OFFLINE=true`, two Cargo jobs and locked resolution after metadata setup.

| Command after `rustup run 1.99.0-x86_64-unknown-linux-gnu cargo` | Result | Elapsed |
| --- | --- | --- |
| `fmt --all -- --check` | exit 0 | 0.665 s |
| `test --locked -p veoveo-hub --lib catalog::tests::registered_` | 3 passed | 49.647 s |
| `test --locked -p veoveo-hub --lib mcp::authorization::tests::actual_registered_policy_narrows_current_grants -- --exact` | 1 passed | 0.264 s |
| `test --locked -p veoveo-hub --lib mcp::authorization::tests::delegated_` | 2 passed | 0.264 s |
| `clippy --locked -p veoveo-hub --lib -- -D warnings` | exit 0 | 13.135 s |

Before launch, review corrected inherited runner assumptions about archive nesting,
manifest fields, workspace package versions and the older SDK pin. No compiler/test
had run against those drafts; they are setup defects, not production failures.
The executed runner's SHA-256 is
`aff36adc36f4bf7f74d20f0c04e26e6dceeed284f813633ae38b41a50fc63e4d`.

## Evidence identities

Hub base: `bb2e97f5c984a53eaa218109e4c01a70e952e365`.
SDK runtime revision: `239622d12c08b771cc5e813fe3e846385d8d04ad`.

```text
53-file Hub overlay archive
fc5b3b794e5af1fade30c40c46f84a852c62e6337bb7b8282e65f8a8c8de41a8
Hub overlay manifest
8db1a32ba63ecae55a7da5053361070c8c0c999ba559ad39a9b3e5424119b49f
formatted native fixture file
9c417b771fe4e232e652ad9bfda666370ceff66ed704975bf1dd8846f734fa00
SDK archive
d503de9b88b34172eee6e3299c53417f737abe68ebbf2e724d3c26dd1edd4f77
SDK proof-only overlay
1cddb649101d44168cb3b71d675683f8fa8718cf307929930ffa57beae27ccf0
executed binary (769175608 bytes)
8eba6af7dddd4175f9ad2281d52203c433ed60e5bd9ebb917f7ffe105c3e4197
summary
d78428733caa1e43910e47a6090bf6d6d44c9e432530a168f00562414a7debfb
scratch lock diff
c73409f7427416fa15f6febf3c67cc2ec7b8c3ed78d4d18dbfea1c3336ec2f1d
```

The summary records exact commands including absolute manifest paths, package IDs,
source hashes, lock hashes/diff, compilation evidence, test counts and every log
hash. Local mirror: `/tmp/hub-sdk-adoption-20261030/evidence-sdk-native-baseline-1/`.
Remote run: `/home/rozgo/.cache/lean-pilot/hub-sdk-adoption-20261030/sdk-native-baseline-1-run1/`.
This checkpoint ran no Charon/Aeneas extraction, Lean proof, mutation, deployment or
model-driven scenario. Source changes remain uncommitted; the frozen hashes identify
the tested bytes rather than implying origin/main or deployed applicability.
