# Every member runs n8n team workflows: `n8n.workflows.run` declares no risk

2026-11-01 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Group changes, check, deploy and probes: a build
agent (Claude Code, Sonnet). The owner asked that every Bioma developer can use n8n now,
and chose to open the run permission while the platform is in early access; it is to be
locked down later.

## What changed

| Component | Commit or action | Change |
|---|---|---|
| veoveo-mcp-n8n | `137824e` | `n8n.workflows.run` declares no risk; it declared `sensitive`, which the `member` role does not select. No n8n permission declares a risk now. `DESIGN.md` says so in the same commit, and that this holds for early access. The one unit test that asserted the risk is now `no_permission_carries_a_risk_in_early_access` |
| Lore group `early-adopters` | `console__set_group_member`, as its owner A | M (`alex.rozgo@vrx.group`) added as `member`. M was the one person with a control-plane grant who was not in the group |
| team-a (`01a194415d3c…`) | `share_repository`, as its owner A | Shared with `early-adopters` as `member` (`actions: ["write"]`) |

Coverage, from `hub.person` (5 people) against the group, the control plane's grants and
`reference-work`'s contributors. Labels are placeholders:

| Person | Domain | `early-adopters` | Role | `reference-work` |
|---|---|---|---|---|
| A | bioma.ai | owner | admin, billed | contributor |
| P2, P3, P4 | bioma.ai | member | member | contributor |
| M | vrx.group | member (added) | member | contributor |

Team-a's access is now its owner, `early-adopters` and `n8n-team-a-2317`; both groups have
`["write"]`.

## Checks

| Check | Result |
|---|---|
| `137824e`, coding agent | Nine offline suites, `cargo fmt`, clippy `-D warnings`, `cargo hack` and `cargo deny` pass. The real-n8n suites do not involve risks and were not run |
| `137824e`, box | The same check script as for `c822269`: rc 0, 54 s, 84 tests passed, 0 skipped |

## Deploy

The n8n parent (`e5f7919c…`) moved to `137824e`'s tree. Its links `team-a` and `team-b`
and its `n8n/admitted.toml` stayed unchanged. This is Lore revision 32, `da733102…`,
pushed at 03:11:57.9.

| Runner | Serving `da733102` | After the push | Linked revision |
|---|---|---|---|
| team-a | 03:13:08 | 70 s | `81cab683`, unchanged |
| team-b | 03:13:18 | 80 s | `5aec4bb1`, unchanged |

Both runners were ready, with no failure.

## Probes, as M (role `member`), from M's Computer with the Hub CLI

| When | Call | Result |
|---|---|---|
| Before | `tools` | Team-a lists `retry_execution` and `stop_execution`, and no `run` |
| Before | `n8n__team-a__run` | Refused: "Your roles don't grant the permission this requires." |
| Before | `n8n://team-a/workflows` | rc 0: `hello-run`, `hello-veoveo`, `model-call`, `resolve-time`, `slow-run` |
| 03:13:20 | `tools` | No `n8n__` tools: "the Hub could not list the Tools of `n8n`: DiscoveryPending" |
| 03:13:20 | `n8n__team-a__run`, `hello-run`, `{"name": "Ada"}` | rc 0 in 781 ms, execution 14: `[{"greeting":"Team A (J4) greets, Ada"}]` |
| 03:13:22 | `n8n__team-a__run`, `model-call` | rc 0 in 1550 ms, execution 15. A `chat.completion` from `XiaomiMiMo/MiMo-V2.6-Pro`, one choice with `finish_reason: "length"` and null content (the workflow asks for one token), and its usage |
| 03:14:09 and two more polls | `tools` | `n8n__team-a__{retry_execution,run,stop_execution}`, and the same for team-b, which M co-owns |

## Boundaries

- **Which grant carried M's call was not determined.** M may also be in `n8n-team-a-2317`.
  This does not show that `early-adopters` alone gives a run to P2, P3 or P4, none of whom
  was exercised.
- **The model's HTTP status was not read.** The 200 is inferred from the `chat.completion`
  object in the workflow's output.
- **Listing and calling disagreed for about 50 s after the runners restarted.** The catalog
  answered `DiscoveryPending` while both calls succeeded. Not investigated.
- **n8n in a person's own Computer needs the current Computer version.** P2, P3 and P4 get
  it when they restart on the offered update. Their Computers were not restarted. Running
  team workflows through the Hub does not depend on the Computer version.
- **The opening is deliberate and temporary.** Any role that grants `n8n.workflows.run`
  now runs the workflows of every team it holds a grant on, with that team's credentials.
  The plan's "Later" list carries locking it down.
