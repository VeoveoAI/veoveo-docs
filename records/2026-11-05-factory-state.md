# The factory's state, in one page

The Hub's new read and console's App went live on Bioma on 2026-11-05 (local time).

## What shipped

| Repository | Revision | What |
|---|---|---|
| veoveo-hub | `6117edf`, `540d25b` | `GET /factory/{profile}/instances?scope=own\|tenant`, no new table or background work |
| veoveo-mcp-console | `b7ecf80` | Tool `factory`, App `ui://console/factory`, skill `see-the-factory` |
| veoveo-template-installation | `66da65c`, `a79cdbb`, `11053c4` | Hub may call `ListSandboxes`, console may read `/factory/*/instances`, the lock |
| BiomaAI/veoveo-installation | `c3a764d`, `987319b`, `c8cc9b5` | The same policies, the lock |

Deployed images: Hub `sha256:8956e812...`, console `sha256:048d29be...`. `veoveo-installer plan`
afterward: 18 of 18 steps match.

## Evidence

| Layer | Result |
|---|---|
| Hub gate, macOS and box (`docker build --target check .`) | 525 tests passed, 2 skipped |
| Console gate, macOS and box | 36 of 36 |
| Tests of the carve-out | An instance acting for an administrator gets 403 on `scope=tenant`, an installed server gets 200 and still 403 on `/admin/local/control-plane`, and a member gets 403. The installed server's forwarded token is reissued with the Hub's key from a real one, because the test setup has no route to an installed server |
| `console__factory` as the owner, deployed, `scope=own` | 1120 ms, 68,764 bytes: 14 repositories, 10 instances, 5 data environments, 9 branches `served`, 5 `no_run` |
| `console__factory` on `/mcp/local` as the administrator, `scope=tenant`, Hub `6117edf` | 19 repositories, 18 instances, 1 selection, no branch that should serve and does not |
| The App in Chrome, through the Hub's host | Mine and Whole factory render on `https://veoveo.bioma.ai/apps/console/factory` |

## An unplanned fix

Hub `6117edf` refused Whole factory to every browser. Apps and Computers come through the
`computer` profile, and the policy admits `admin_read` only in `local`. Hub `540d25b` asks
whether any profile's policy admits the caller's `admin_read`; the `/admin` routes still decide by
their own profile. An administrator's agent in their Computer can now read the whole factory too.

## What the page showed at once

- Six instances whose latest pusher holds no grant: `josue`, `procesos`, `tareasjonathan` and
  `toolbox` (`main` and, for the last two, `v2`). The log store held 64 refused Lore tokens for each
  between 2026-11-03 and 2026-11-05. That their next start fails is inferred from the Hub's design;
  none was restarted to see.
- `n8n` link `team-b` asks for `vv-factory-model`, which is not granted.
- Five watched repositories serve nothing. Those read as `no_run`, so nothing is wrong with them.

## What this does not prove

- `Use this branch` and `Watch` were not pressed live: they change a person's real state. The tools
  behind them are the qualified `select` and `watch`.
- `prepare_failed`, `pending`, `name_refused` and a link with no runner did not occur live. Only the
  Hub's and console's tests exercise them.
- No OpenCode run: the agent's use of `see-the-factory` is not qualified.
