# Task continuity: production Rust, Lean proofs and semantic controls

On 2026-10-29 the Task decision slice passed manual formal verification and focused
component checks. Four legal Rust mutations compiled and extracted successfully,
then failed both their concrete witnesses and the unchanged semantic proofs.
A fresh restored copy passed again with identical source/model/proof identities.

This establishes the named extracted decisions, not the whole Hub or durable Task
lifecycle. [HUB-TASK-01](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md#hub-task-01--captured-task-routing-and-retry-integrity)
is **partial**. The [proof package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/task_continuity/README.md)
contains the reproduction commands, generated model, handwritten proofs, mutation
patches and [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/task_continuity/evidence/task-continuity-receipt.json).

## Execution and source basis

The workspace's Astra coordinator reviewed the contract, production correspondence,
theorem statements and results. `/root/coder` used the configured GPT-6.1 Sol coder
role for source and proof implementation. `/root/builder` used the configured
GPT-6 Luna builder role for unattended logged extraction, builds, tests and proof
checks on the actual Linux x86_64 host through the existing SSH tunnel. No OpenCode
or other qualification-model calls were made. There was no deployment or publication.

The source bases were Hub `651390dbbb8b4e65b5b8bcd3f8714a981fac2371` and SDK
`7e2489dccbee6d00b377b174f68f9d5de692a68b`, with the task's exact changed files
overlaid into isolated copies. These are source-snapshot results, not qualification
of unchanged base commits. Hub's SDK pin stayed
`a41c9cc6c81f6c0305dd41165defb142740ed6b1`; it does not yet contain the SDK's private
recipient refactor. The proof crate imports the two exact sibling source files
through `#[path]`. Hub and SDK production builds were also checked in their own
workspaces; no dependency override was required.

The final frozen proof/source archive was
`92458eb28623e7c8e468476cb16c08a7a8ea1d61e83ad3af1370eee229413301`, with manifest
`7d5065f1083c4aad048b15a860079a2d6273c5d909f6ec7acddc0a64539a25bb` (SHA-256).
Each negative-control copy and restoration verified all 25 frozen paths before use.
Final documentation and receipts were written afterward; proof and runtime inputs
remained frozen.

Critical final SHA-256 identities:

```text
Hub decision.rs       42001518ef51d33535d79fb5dbe57a911fda35c762235fd09f97864a98222344
Hub task_routes.rs    d1ecf19bcd37519d3831901cafe7bbd1d2dbb23827a7eb96084c04d5d84b8677
Hub authorization.rs  2df2e097d6049779c5eb1e19edce7d7e63d278c04da166b6f60f73603a4bcc07
SDK recipient.rs      038868d521a67a8780e458fe404688a960da05c3837aece655372d266d6830f4
SDK internal_auth.rs  29eb4256f9e152b9456927a6b154f74d95d154e6732033118e9a366e7b1d0cd7
Generated LLBC        1ea587eb60200b41ba7ead4b78d66abc86357a85f012442bbf3699f981949756
HubTaskProof.lean     6fdf0a9e22e1a953d65d9de23b0a67f94b7f0958ed7b772175267c7332c23c7c
TaskContinuityProof   929caaf4f9b2a6a025d06a56ca4f872d6aa02b213f34967d714e96310a724885
TaskDispatchProof     9faa5a6a6bf7ba4f1b79caca32ddb98adf4a88ca4fa27e2821df3cff8acbd194
Rust proof witnesses  b2c3aebe37264c18fcd6459d929dfbe832b7e0112031126fd68bd7880ca44727
```

## What changed and what was proved

Existing Task checks and their successful output assembly moved into dependency-light
Rust called by production and extraction. Creation and later admission use the same
capture/deployment predicate. Retry returns the original retained record. Canonical
ID, source ID, server, deployment and capture are carried in the admitted request;
production consumes its canonical ID for policy and its source/server for forwarding.
The SDK's existing recipient comparison returns the verified binding consumed by its
identity adapter. Existing ordering and refusal responses were preserved. SQL,
token formats, dependency pins, Core and protected SDK hosting/Task modules were
unchanged. No authorization requirement, CI job or proof gate was added.

The checked statements establish:

- Label containment for arbitrary finite slices, including duplicates and any order,
  with total termination, bounded indexing and safe index increments for both loops.
- Exact owner-admission outcomes: binding, identity/provenance, retained labels and
  delegated capture; success iff those conditions hold, with the original Task and
  opaque current caller payload preserved.
- Exact captured composition/deployment agreement, and retry success iff the full
  retry key matches and expiry is strictly in the future. Success preserves the
  original capture, expiry and record; the expiry boundary is refused.
- Exact SDK server/resource/deployment binding and its existing error priority.
- Composition of the actual extracted owner, capture and recipient functions:
  an arbitrary expected recipient accepts iff all stated conditions hold, with one
  exact preserved request and recipient. This is a theorem about the composed
  extracted-function trace, not asynchronous HTTP delivery.

The production `AuthenticatedSubject` adapter is outside extraction. Its new Rust
test compares the whole subject and confirms that only execution changes. The
existing same-deployment retry test was strengthened: it previously reconstructed
the same composition; it now asserts that the proposed composition is different
while the target deployment stays the same, and checks preservation of the first
capture. This corrected a test weakness, not an observed production defect.

## Formal execution trace

The cached pinned tools were Aeneas `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`,
Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, extraction Rust
`nightly-2026-09-17`, and Lean/Lake `4.35.0`. The package's Lake manifest records
the Lean dependencies. Shared dependency packages were reused; each variant had
its own source tree and `.lake/build`.

Sequence: `cargo test --locked --lib`, `charon cargo --preset=aeneas`, fresh
`aeneas -backend lean` output, `lake build`, and direct Lean checks printing theorem
axioms. The accepted baseline checked both proof modules. All 14 printed theorem
closures contain only `propext`, `Classical.choice` and `Quot.sound`; none contains
`sorryAx` or a generated opaque-function axiom. Generated unused derive/debug stubs
exist but are outside these theorem dependencies. The pinned compiler/extraction
pipeline remains part of the trusted correspondence argument.

Each mutation below started from the frozen baseline, applied one checked-in patch,
passed Rust compilation, Charon, Aeneas and the generated-model/label-module build,
then independently ran the unchanged dispatch proof and its concrete Rust witness.
The witnesses use small fixed IDs/labels and expiry values; these are deterministic
fixtures, not deployed user requests.

| Mutation | Observed concrete counterexample | Unchanged proof | Lean / witness elapsed |
| --- | --- | --- | --- |
| Omit captured deployment comparison | Accepted deployment `4` with selected deployment `9`, instead of `Err(Capture)` | Capture agreement obligation failed | 4.539 s / 0.133 s |
| Omit retained-label containment | Accepted an otherwise matching owner missing recorded label `2`, instead of `Err(Ownership)` | Ownership containment obligation failed | 4.590 s / 0.134 s |
| Replace strict expiry `>` with `>=` | Accepted expiry `20` at time `20`, instead of `Err(Retry)` | Strict retry/expiry obligations failed | 4.425 s / 0.132 s |
| Omit SDK deployment comparison | Accepted another deployment with the same server/resource, instead of `Err(Deployment)` | Recipient/dispatch obligations failed | 4.498 s / 0.133 s |

All four proof checks exited `1`; their Rust witnesses exited `101` on the specific
assertion. These were semantic failures, not missing modules, invalid Rust or failed
extraction. Failed elaboration may report `sorryAx`; those failed proofs are not
accepted artifacts.

The fresh restored run passed five Rust witnesses in 0.156 s, Charon in 0.198 s,
Aeneas in 1.092 s, the default Lake build in 10.111 s, direct containment proof in
2.938 s and direct dispatch proof in 4.477 s. Source and generated model hashes
returned exactly to baseline; handwritten proofs stayed unchanged throughout.
These are cached-host command timings, not general performance benchmarks.

## Focused component checks

The Linux check environment was `veoveo-hub-check:e0-v5`, Rust `1.99.0`, with existing
Cargo caches and `CARGO_BUILD_JOBS=2`. The image supplied tools/cache only; exact base
source plus overlays supplied code. Ten changed production paths were hash-checked
at the actual compiled paths, including the new adapter test.

| Command (in the owning workspace) | Result | Elapsed including compilation |
| --- | --- | --- |
| `cargo test --locked -p veoveo-hub --lib task_routes` | 6 passed, final alias snapshot | 113.791 s |
| `cargo test --locked -p veoveo-hub --lib task_ownership_tests` | 2 passed, final alias snapshot | 0.321 s |
| `cargo test --locked -p veoveo-hub --test routing` | 1 passed | 59.969 s |
| `cargo test --locked -p veoveo-hub --test calls` | 1 passed | 19.372 s |
| `cargo test --locked -p veoveo-hub-sdk --lib internal_auth::request_tests` | 8 passed | 122.989 s |

Both workspaces passed `cargo fmt --all --check` and their library-only
`cargo clippy --locked -p <crate> --lib -- -D warnings`; final Hub Clippy took
37.790 s and SDK Clippy 22.2 s. Routing, calls and SDK results used the preceding
verified snapshot; the final source delta was only a Rust return-type alias, so
the affected Hub library tests and Clippy were repeated. No Core suite, full
Mac/Linux release gates, deployed probes or model-driven acceptance were run.

## Corrections and excluded attempts

- Generic `Option` operations initially became opaque extraction axioms. Explicit
  matches removed those dependencies. A borrowed value escaping a match then hit
  an Aeneas context-join limitation; passing the optional deployment by value fixed
  extraction without changing the concrete check.
- Lean proof drafts required corrections to decidability, bounded index/list
  rewrites and conditional normalization. The internal Boolean invariant was
  restated equivalently; public exact-result and total-correctness claims were not
  weakened, and generated Lean was never hand-repaired.
- Strict Clippy found two complex return signatures; one `Admission` alias fixed
  them. No lint suppression was added.
- An initial component overlay was extracted one directory too deep and tested the
  base source. Review caught the missing second ownership test. Those passes were
  discarded; corrected runs verified the actual compiled files and both tests.
- A cache lacked one pinned Git dependency; ordinary container networking fetched
  it. A wrong SDK workspace root, unavailable `jq`, and an extraction-manifest path
  were corrected in temporary validation scripts, not production code.
- The first mutation runner reused shell variables across function calls, colliding
  log paths. Its outputs were excluded. Locally scoped variables and a two-variant
  log-path dry run preceded the accepted fresh run.

Raw attempts remain under Linux `/home/rozgo/.cache/lean-pilot/task-continuity/`.
Accepted component summaries are `production-3/final-test-summary.txt` and
`production-4/final-validation-summary.txt`; mutation/restoration stage timings,
source hashes and raw-log hashes are in `final-negative-rerun/*/summary.txt`.
The accepted raw `final-negative-rerun/receipt.txt` has SHA-256
`ab52330276486a5d0f5928c2edbe1dae9b90e7288b10c4cb971f4d858e8128d8`.
Temporary scripts, LLBC files, compiled output and raw logs stay outside source;
the package keeps the compact reproducible evidence.

## Limits and engineering tradeoff

Equality and inequality implementations must terminate and agree with equality;
expiry ordering must match the exact mathematical strict order. Typed ownership
projection, actual subject adaptation, selected registration/endpoint association,
and decoded/verified token inputs are correspondence obligations outside extraction.
The real current policy call remains in production; the proof does not replace it
with an assumed `authorized = true` input.

SQL lookup/uniqueness/concurrent insertion/pruning, current policy evaluation,
token signing/verification, transport, and Core's durable claim/cancellation/recovery
lifecycle are not proved here. Review and the listed tests cover their stated cases
only. There is no claim of cross-database/RPC atomicity, exactly-once effects or
deployed acceptance.

Label projection now allocates two temporary vectors of borrowed references and
uses an O(required × held) scan, replacing the native set-subset operation and the
old cloning of current ownership. Admission is logically unchanged; performance
was not benchmarked, and neither zero overhead nor improved speed is claimed.

The contribution is a checked, implementation-linked contract with adversarial
semantic controls and explicit residuals. The broader platform property remains
partial; no blanket “Hub verified” conclusion follows.
