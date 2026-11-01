# n8n runners admit every node and credential type; a team calls the model as its own content

2026-11-01 (UTC), 02:30 to 02:45. Coordinator: Claude Code (Opus 5.5). Code: a coding agent
(Claude Code, Opus 5.5). Check, deployment and probes: a build agent (Claude Code, Sonnet).
Plan section 14.

## The decision

The owner asked for the n8n runners to be as open as possible for now, and to be locked down
later.
- **What is admitted:** the parent's `n8n/admitted.toml` admits every node type n8n ships
  (`nodes = "all"`) and every credential type (`credentials = "all"`). A team that names no
  `nodes` loads all the parent admits.
- **One exclusion stays:** the always-excluded nodes (command, SSH, Git, local files, MCP).
  They would let a workflow run programs of its own in the runner, which could read, for
  example, n8n's database password from its environment.
- **Credentials:** they still come only from the providers granted to the team's repository,
  through the runner's import, so admitting every credential type grants no access by itself.

## What shipped

veoveo-mcp-n8n `c822269`:
- **The open forms:** `nodes = "all"` and `credentials = "all"` sit beside the explicit
  lists. Under "all" the runner leaves `NODES_INCLUDE` unset and sets only `NODES_EXCLUDE`.
- **The parent and the template:** the parent's own file is open. The team template names
  no nodes, and a comment says a team may narrow them.
- **The tests:** the real-n8n test now applies a webhook feeding an HTTP Request, with a
  bearer credential imported though nobody named its type.

Check: `docker build --target check .` on the box, rc 0, 110 s, 84 passed. That includes
`tests/workflows.rs` against the fork's n8n on PostgreSQL (36.1 s).

## Deployment and probes

| Step | Result |
|---|---|
| The n8n parent (`e5f7919c…`) at `c822269`'s tree, links kept (Lore revision 31, 02:39:15.5) | team-a served it at 02:40:31 and team-b at 02:40:46, both `ready`, with their workflows unchanged |
| team-a, a commit on its tracked branch (revision 11): `nodes` removed, credential `deepinfra0001` (`httpBearerAuth`, `token` from `DEEPINFRA_API_KEY`), and `workflows/model-call.json`, a Veoveo Trigger then an HTTP Request "Ask the model" with that credential | `n8n__team-a__run` with `model-call` returned in 1318 ms, execution 13: `"statusCode":200`, `"model":"XiaomiMiMo/MiMo-V2.6-Pro"`, `"object":"chat.completion"`, 9 tokens. It stays as team-a's example |
| team-b, `nodes` removed (revision 7) | Its runner started and was `ready`. `hello-run` returned "Team B says hello, b-after-nodes-removed" in 648 ms. With no credential mapping and no grant, it has no model access |

## Boundaries

The always-excluded nodes stay excluded, by design. Which node and credential types to lock
down, and when, is in the plan's "Later".
