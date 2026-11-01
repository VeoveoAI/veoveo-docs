# A kept-on Computer runs its owner's n8n schedule

2026-11-01 (UTC). Coordinator: Claude Code (Opus 5.5). Probes: a build agent (Claude
Code, Sonnet) and the coordinator. Checklist J11.

## Setup

- **Person and Computer.** A, `rozgo@bioma.ai`, Computer `c4itoit73lpkaheav7u`, Computer
  version `a83c10c14f33`.
- **Keep on.** Turned on at 02:17:59 with `POST /computer/keep-on`.
- **Schedule.** "J11 keep-on probe" (`48svkfAQcdPFBpRM`) in A's own n8n, published there,
  with a schedule trigger every minute.
- **Control.** M, `alex.rozgo@vrx.group`, Computer `cdjdlsct62djm3cnhv5`, not kept on.

## Measurements

| When | What | Result |
|---|---|---|
| 02:19:04 | A's sandbox | `38a492ae…`, Ready, main process `d03975bb`, 0 restarts, pod scheduled 02:11:10 |
| 02:19:04 | M's sandbox | `b344dad8…`, Ready, main process `8e61b242`, 0 restarts, pod scheduled 02:11:11 |
| 03:23:56 | Both sandboxes | Unchanged: the same IDs and main processes, 0 restarts, Ready |
| 03:24 | A's `/computer/status`, with the Computer's own bearer | `keepOn: true`, version `a83c10c14f33` |
| 03:24:16 | A's n8n database (read only) | 68 executions of the schedule, the first at 02:16:40.053, the last started at 03:24:08.137 and stopped at 03:24:08.149: one a minute for 68 minutes |

## Decision on the collection time

The owner chose not to wait for the two hours of the collection time
(`computers.collectAfterSeconds` 7200). They will check it overnight. If a kept-on Computer
is ever collected, the Hub's INFO line for that collection, with the Computer, its version
and both idle times, shows why, and it is fixed. The timed check armed for 04:39 was
stopped.

## Boundaries

- **The two-hour case is not shown.** Neither Computer was idle for two hours: the browser
  and the probes used both. The Hub counts both browser requests and the sandbox's own
  network traffic as activity, and neither was measured here.
- **Whether a kept-on Computer stays on is shown only up to 68 minutes.** What this run
  shows: keep-on stays set, and A's own published schedule ran every minute without a
  restart.
