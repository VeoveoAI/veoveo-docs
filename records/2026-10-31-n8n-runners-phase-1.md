# n8n runners on the deployment: teams by link, access by grant (J2, J3, J5)

2026-10-31 (UTC), 23:17 to 23:57. Coordinator: Claude Code (Opus 5.5). Probes: a build agent
(Claude Code, Sonnet). Plan section 14; checklist J2, J3 and J5. Code is in the
[Hub record](2026-10-31-linked-repositories-hub.md), the
[Computer apps record](2026-10-31-computer-apps-keep-on.md) and veoveo-mcp-n8n `61f2fb4`, the
n8n runner.

## What ran

| Component | State |
|---|---|
| Hub | `f8c97ad` (runners and routing per link) |
| n8n server | `61f2fb4`: `docker build --target check .` on the box rc 0, 98 s, 65 passed, including `tests/workflows.rs` against real n8n (30.4 s, the fork image through `localhost:5003`). Removed: the team editor, its app origin and the shared owner session. Added: the execution data rule and the overview App |
| Hub CLI | `hub-sdk-cli` rebuilt at SDK `7360c0f` (`sha256:eb53609a…`). The CLI at `05273d1` refused `n8n__team-a__run` with "multiple namespace delimiters". BiomaAI installation `89c5f35`, Computer version `a8f5e9711a8d`. Both of the owner's Computers were restarted onto it, each ready in about 10 s |

The deployed n8n Lore repository (`e5f7919c…`) became a parent. Its `main` is the GitHub tree
at `61f2fb4`, without a top-level `workflows/`, with Lore's default links:

| Link | Repository | Contents |
|---|---|---|
| `team-a` | `team-a-2317` (`01a194415d3c…`) | `templates/team/` plus `resolve-time` and `slow-run`, tenant `reference`, greeting "Team A says hello" |
| `team-b` | `team-b-2317` (`01a19441619672b09443b253f36b47c5`) | `templates/team/`, greeting "Team B says hello" |

- **The tracked branch:** each link tracks `main-d216cc1441255ad5b517cc243cec578d`, because
  Lore suffixed the parent branch's name with its ID. The teams already had a `main` of their
  own.
- **The instance went away:** the branch's instance `bccd-aee3369273a5` was removed, and the
  parent's `main` shows no instance and no failure.
- **The runners:** they were created at 23:19:21 and 23:19:22, right after the teams were
  watched; before that, nobody watched the linked repositories, so the design creates no
  runner. Their servers started at 23:25:06 and 23:25:09, about 5 min 45 s later, most of it
  the image build.

## J3: each team its own runner

| Probe, as A (`rozgo@bioma.ai`, owner of both teams) | Result |
|---|---|
| `veoveo-hub-sdk-cli tools` | `n8n__team-a__{run,retry_execution,stop_execution}` and the same for `team-b` |
| `n8n__team-a__run`, `hello-run` | 679 ms, execution 1, `{"greeting":"Team A says hello, probe-team-a"}` |
| `n8n__team-b__run`, `hello-run` | 698 ms, execution 1, `{"greeting":"Team B says hello, probe-team-b"}`. Each team has its own n8n |
| Reading `n8n://team-a/workflows`, `n8n://team-b/workflows` | Each lists only its own team's workflows: four for team-a, two for team-b |
| `n8n__team-a__run`, `resolve-time` | 1139 ms, execution 2. Its Veoveo Tool called Time's `resolve_time` through the bridge for the caller, so I15 holds under a runner |

## J2: a runner admits only people with a grant on its repository

Two gates decide a call:
- **The installation's roles** decide the permission. `n8n.workflows.run` declares the risk
  `sensitive`, which only `admin` accepts among the installation's three roles (`member`,
  `billed`, `admin`).
- **Lore's grants** decide the team.

| Probe | Result |
|---|---|
| M (`alex.rozgo@vrx.group`, role `member`, no grant on team-b) | `tools` lists no `n8n__` tool. `n8n__team-b__run` was refused: "You don't have permission to call `n8n__team-b__run`. It isn't available in this profile." |
| M through group `n8n-team-a-2317`, shared on team-a as `member` | Still refused, by the role: "Your roles don't grant the permission this requires." The role gate holds whatever the grant |
| A (`admin`), with A's grant on team-b removed by M, a co-owner (23:55:47) | At the first probe, 9 s later: no `n8n__team-b__…` in `tools`, `n8n__team-b__run` refused, and `n8n://team-b/status` refused. The refusal text does not tell the link gate from the role gate |
| A through group `n8n-team-b-2317`, shared as `member` | Listed within 1.4 s of the share. `n8n__team-b__run` answered in 649 ms: "Team B says hello, A-via-group" |
| A removed from the group | Refused 1.8 s after the removal began |
| Restored | A is an owner again and watches team-b; a run answered in 552 ms |

## J5: adding or removing a link adds or removes its runner

| Change of the parent | Result |
|---|---|
| Link `team-c` added (`team-c-2317`, `01a1944f9e2d…`, watched), Lore revision 18, push ended 23:40:09.1 | team-c's server started at 23:46:33, and `n8n__team-c__run` was listed at 23:46:43, about 6 min 34 s after the push |
| Link removed, Lore revision 19, push ended 23:46:55.1 | `n8n__team-c__…` gone from `tools` by 23:47:10, within 15 s |

**Finding:** every parent push recreated **every** runner of the branch, not only the
changed link's.
- After the addition, team-a's, team-b's and team-c's sandboxes were recreated within 3 s of
  each other. After the removal, team-a's and team-b's were recreated again.
- The old runners served while the new ones built, then no runner was listed for 12 to 23 s
  per swap.
- The cause: each runner's start command lists the excluded links, so the link set is part
  of every runner's specification.
- A Hub fix is in progress: a link added or removed must leave the other runners untouched
  while the parent's own content is unchanged.

## Boundaries

- **Status per link was not readable.** The deployed Console (`d8f8a87`) takes no `link`, so a
  runner's tracked branch and applied revisions were not read. A Console with `link` is in
  progress. `n8n://{link}/status` gave each runner's linked repository and start time.
- **Phase 2 waits.** J4 (a release by merging in a team), J6 (a team's credentials stay in
  its runner) and J7 (execution data by who fetched it) wait for the Hub fix.
- **Not yet deployed:** the overview App's list of teams needs Hub `0aa6593`, which forwards
  a view's `resources/list`.
