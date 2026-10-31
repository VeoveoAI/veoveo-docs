# Discovery watches follow live catalog publication

A production discovery-watch defect is reproduced and corrected. Three unchanged
native regressions fail against the original runtime and pass after the fix. The
cache's already-qualified synchronous source and generated/handwritten Lean files
are unchanged. **HUB-CATALOG remains partial; this checkpoint adds native evidence,
not a new Lean theorem or a deployed result.**

Hub commit `305aeb2` contains the correction, regressions, receipt and coverage update.

GPT-6.1 Sol implemented the regressions and the correction, updating the owning
DESIGN before runtime code. GPT-6 Luna ran bounded, unattended native checks.
GPT-6 Astra reviewed the actual call paths, complete logs, failed assertions,
source identities and passing results. The
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/native-watch-publication-20261031.json)
contains exact commands, source maps, log hashes, binary identities and timings.

## Cause and correction

`for_admission` uses `for_execution` to select an immutable request catalog.
`HubCatalogSnapshot::selected` gives it a separate watch channel, retaining the
captured generation. The original live handle is intentionally preserved as
`HubMcp.live_catalog` for publication notifications.

Discovery watches incorrectly checked and subscribed to the selected handle.
Publishing through the original live handle therefore did not stop an old watch.
An old admitted request could also retain only its own generation in the shared
watch map, deleting a newer watch. Merely checking the live generation before
awaiting that map's mutex would leave a publication-during-wait race.

The correction keeps selected manifests and routing. Validity checks and the
publication receiver use the live handle. Admission rechecks the live epoch under
the existing map mutex before retaining, reusing or inserting watch cells, and
checks it again after upstream opening, including the unchanging-server outcome.
No authorization rule, dependency pin, infrastructure component or CI job changes.

## Native scenarios and observed failures

The fixture constructs an authenticated subject and an actual admitted Hub handler.
Its declared `watch-fixture` server uses native RMCP streamable HTTP, advertises
tool-list changes, and acknowledges the exact filter. Tool descriptors are synthetic
fixture data. This does not exercise HTTP bearer admission or an identity provider.

Each initial open also repeats `ensure_discovery_watch`, requiring the same cell,
an active watch and no second source-open event. Publication advances the original
live handle while retaining the same registration. Channels and a deliberately
polled pending mutex acquisition establish ordering; sleeps do not establish it.
Observations have three-second bounds and each scenario has a thirty-second bound.

1. **Publication with a live selected watch.** The original watch did not cancel,
   its upstream listen future did not end, and it still reported active. The old
   descriptor with denied count 7 remained; completing old in-flight work replaced
   it with the late descriptor and denied count 11. The fixed run observes watch
   cancellation and actual source-listen future disposal, inactive status, empty
   cache and no repopulation by that late completion.
2. **Old admission after a newer watch exists.** The original call succeeded,
   deleted the newer cell, cancelled its watch and lost its cached contents. The
   fixed call returns the existing catalog-changed retry error and preserves the
   newer cell, active token and complete Tool descriptor with denied count 13.
3. **Publication while an old call waits for the map mutex.** The test holds the
   real mutex and polls the real call to Pending before publication. The original
   call succeeds and leaves its old watch active; the fixed call returns the retry
   error and the old watch ends. This is not a fabricated newer waiter overtaking
   Tokio's FIFO mutex queue.

All three original failures are the final aggregate semantic assertions. Initial
connection, exact acknowledgement, healthy reuse, database setup and mutex-pending
preconditions completed. The measured baseline and fixed test file is byte-identical:
SHA-256 `12c02671c52258f923ea2b5a214a03213c3821ee7f37d725204fd486a37a13a8`.

## Execution and identities

The source basis is Hub `2f5feef` with SDK `154a473` and Core `120306e`. Private native
trees use the previously qualified 1,083-file runtime source archive plus the exact
test/watch/DESIGN overlays; build inputs are compared before execution and remain
unchanged afterward. Each test tree has 1,084 files and 813 non-proof inputs.
Execution uses Rust `1.99.0-aarch64-apple-darwin`, PostgreSQL 18 fixtures, the existing
warm Cargo target, and `SQLX_OFFLINE=true` with database/compiler overrides removed.
Each command/stage has a 300-second limit and owns its process group.

The original-runtime regression command exits 101: **0 passed / 3 failed**, command
**38.749 s**, harness **6.92 s**. Its binary is **175,840,168 bytes**, SHA-256
`0b977ab4227133a5956666382982fcbb3558610b4eddfd1fdc46a00eb890b6d1`.
The fixed source passes all six stages:

- Formatting: **0.656 s**.
- Watch regressions: **3/3**, **32.360 s** command, **1.01 s** harness.
- Discovery regressions: **13/13**, **2.685 s** command, **2.02 s** harness.
- Ended-source subscription regression: **1/1**, **0.350 s** command.
- Catalog pagination regressions: **6/6**, **0.293 s** command.
- Strict library Clippy: **10.100 s**.

The latter two test harnesses report `0.00s`; this is output precision, not a claim
of zero execution time. Whole command durations include compilation and fixture
work. These are not cache-operation or publication-latency benchmarks.

All fixed tests execute the same **175,838,728-byte** binary, SHA-256
`eae8185b2d9a34e3db11381141975d8f20a06324c448569d65e4450bf8b508c9`.
The fixed validation summary is SHA-256
`9a96cd9c8669259212b786dd1bbde5e523c93ef1b759a5dc1fa181b3561d140d`.
Its full source-map digest is
`7d34961a52d0ca489c608041a927813c3811b0af277e0bc56e02eb88268219e6`;
the runtime watch file is
`1844fe871b9401637036e1368286441b9f003a09a689d268bff2be5f4bca1884`.

The first fixture attempt failed compilation in **13.622 s** because it used
`enable_tools_list_changed` instead of the pinned API's `enable_tool_list_changed`.
It ran zero tests. That setup failure and its log are retained separately; correcting
the method name and formatting the test preceded the measured failing baseline.

## Remaining boundary

These are specific native executions, not a proof over every scheduler, publication
interleaving, reconnect, notification loss or replica-adoption history. The change
does not close server-wide cache invalidation's translator limitation, asynchronous
wrapper refinement or the catalog cursor/listener formal contracts. The exact cache
state implementation remains SHA-256
`4413008d7edfc56559857cb184351464f707ceb7dd21972cfa501e4bd01c77f0`.

No Lean extraction/check, full Mac/Linux Docker qualification, push, deployment or
model call ran in this slice. Temporary runners, full maps, logs and binaries remain
outside Git; the regression tests, correction, compact receipt and coverage updates
are the committed artifacts. The
[coverage ledger](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md#hub-catalog-01--requestcatalogcachelisten-isolation)
tracks the remaining obligations.
