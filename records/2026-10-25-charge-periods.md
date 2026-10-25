# Charge periods in whole microseconds, and two runtime restarts

2026-10-24/25 (UTC). Builder: Sonnet; coordinator: Opus.

## Defect

`ChargePeriod::at(t)` was `[t, t + 1 µs)` with nanosecond precision. The ledger sends
periods to PostgreSQL as RFC 3339 text, and PostgreSQL rounds to microseconds half to
even, so at exactly 500 ns with an odd microsecond start and end became equal and the
row failed `CHECK (charge_period_start < charge_period_end)`. Measured by the coder
before the fix: 6 collisions in 12,000 timestamps. Embedding takes its period from
`Utc::now()`, so about 1 in 2,000 Embedding requests was refused before inference.
The SDK's default period comes from the stored Task time and was not affected; Media
takes its period from its provider's timestamp.

## Change

Core's two constructors cut both ends to whole microseconds, the precision PostgreSQL
stores, and core's usage design says so. A unit test pins the failing timestamp
(`2026-10-23T21:00:21.123455500Z`) and a sub-microsecond period.

| Repository | Commit | What |
|---|---|---|
| veoveo-core | `120306e` | the fix and its test |
| veoveo-hub-sdk | `6b965ca` | core pin |
| veoveo-mcp-artifact | `5fb8e1f` | SDK and core pins (Embedding uses Artifact's contract crate) |
| veoveo-mcp-embedding | `46fa002` | Artifact, SDK and core pins |

Gates (`docker build --target check .`), all exit 0:

| Repository | macOS | Linux box |
|---|---|---|
| core | 356 passed, 2 skipped | 356 passed, 2 skipped |
| SDK | 275 passed, 3 skipped | 275 passed, 3 skipped |
| Artifact | 112 passed, 9 skipped | 112 passed, 9 skipped |
| Embedding | 33 passed, 5 skipped | 33 passed, 5 skipped |

## Deploy

Embedding image `veoveo/embedding@sha256:7cc1de5d1b3a7a561266913cd835e3a2b8b04ed7790d8520787dfa1dbe8a98ff`
(70 s build). Only the `embedding` sandbox in `vv-services` was recreated; its
environment, mounts, claims, resources, command, policy hash (`ea9fae22…`) and
deployment ID were unchanged. Ready 11 s after create, registered with Hub.

Hub logged 8 ERROR lines between 00:28:40 and 00:28:42Z, `worker quit with fatal:
Transport channel closed` (`IncompleteMessage`) on Embedding's MCP endpoint, matching
the old pod's deletion by time; none after. Inference from timing, not traced.

## Probes

- 50 of 50 `embedding__embed` calls through the CLI as the person succeeded: 768
  dimensions, CUDA, 0.415–0.656 s each, measured around the CLI process.
- The ledger recorded 100 `embedding.input_tokens` rows (50 estimate, 50 actual), each
  period exactly 1 µs with six fractional digits, for example
  `00:29:43.483545`–`00:29:43.483546`.
- Boundary: 50 calls cannot show the absence of a 1-in-2,000 failure; the unit test at
  the failing timestamp shows the mechanism is gone.

## Runtime restarts

`media-provider` and `embedding-runtime` were stopped and started with OpenShell. Their
bootstrap init container moved from `openshell/sandbox@sha256:f00af5cb…` (the old
`a6ed0ab41` runtime) to `@sha256:d2a791ff…`, the gateway's current runtime, and both
gained the `workspace-owner` init container. Workload images unchanged; both 1/1
Running with no restarts. After: 5 of 5 embed calls succeeded (0.45–1.18 s), and
`media__models {"filters":{}}` answered with the fake provider's synthetic catalog,
which proves routing only.

Box logs: `$RUN/logs/ledger.log`, `ledger-restart-before.txt`, `ledger-restart-after.txt`.
