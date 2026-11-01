# n8n's Assistant uses the person's Hub tools; the Veoveo Tool lists them

2026-11-01 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Images, deploy and probes: a build agent (Claude
Code, Sonnet). Browser checks: the coordinator, in the owner's Chrome. Checklist J13 and
J14. The owner asked for it because n8n is connected to the platform's tools, and the
Assistant was not.

## What shipped

| Component | Commit | Change |
|---|---|---|
| VeoveoAI/n8n (`veoveo`) | `60a31ec8` | `@n8n/agents`' MCP client moves from `@modelcontextprotocol/sdk` 1.31.0 to `@modelcontextprotocol/client` 2.4.0 with `versionNegotiation: { mode: 'auto' }`. It offers 2026-07-28 through `server/discover` first, and falls back to the 2025 `initialize` only on a server's legacy signals, not on 401/403, 5xx or network errors. SSE stays as upstream has it. The reserved `io.modelcontextprotocol/*` keys are stripped from a tool result's `_meta` |
| VeoveoAI/n8n (`veoveo`) | `a4efd135` | The Assistant's environment-managed settings (`mcpServers`, `sandboxImage`, `sandboxTimeout`) are neither saved nor applied from a saved row, as upstream #33488 intended |
| veoveo-mcp-n8n | `6ddd49d`, `960b25c`, `68eecbb` | `veoveo-n8n-computer` serves `/n8n/mcp/{token}` on loopback and names it in `N8N_INSTANCE_AI_MCP_SERVERS`; it forwards to the Hub's MCP endpoint of the Computers profile as the owner, and the Hub answers discovery and decides each call. `GET /n8n/bridge/tools` lists the owner's tools in a Computer and the bridge table on a runner, and the Veoveo Tool's Tool field is a list from it. `microsoftAgent365Trigger` is excluded. The fork image is pinned by digest. `DESIGN.md` in the same commits |
| BiomaAI installation | `41ff35a`, `d1d8612` | Computer versions `fd855144c176`, then `af6043514dfa` |

## Unplanned turns

- **A global pin was withdrawn.** The first fork commit, `6da92bf3`, pinned every MCP client
  connection to 2026-07-28. That would have cut the Assistant off from every 2025-era
  server. Its image build was stopped before an image existed. `60a31ec8` negotiates
  instead.
- **A saved setting overrode the environment.** On version `fd855144c176` the Assistant
  saw no Veoveo tools.
  - **Measured:** A's n8n database held `instanceAi.settings` with `mcpServers: ""`,
    saved under the earlier version. The Assistant's `mcp-servers` tool returned no
    servers. The program logged no request on the endpoint.
  - **Cause, read from the code:** n8n saves `mcpServers` with every admin save, and
    applies the saved value over the environment's at start. `veoveo-n8n-computer` saves
    `searchDisabled` at each start.
  - **Fix:** `a4efd135`. After the restart onto `af6043514dfa`, the row holds no
    `mcpServers`, `sandboxImage` or `sandboxTimeout`.

## Checks

| Check | Result |
|---|---|
| Fork `60a31ec8` | agents unit tests 2342 passed; MCP integration tests 60 passed against real local servers: a 2026-only server negotiates 2026-07-28 with no `initialize`; a 1.x server falls back; an SSE-only server connects through the retry; a 401 and a network failure stop after the probe |
| Fork `a4efd135` | The settings test file 153 passed; the cli typecheck is clean |
| veoveo-mcp-n8n `68eecbb`, box | `docker build --target check .` rc 0, 417 s, 86 tests passed |

## Deploy

| Image | Digest |
|---|---|
| n8n fork `a4efd1354d-trixie` | `sha256:f2956da8…` |
| n8n-computer | `sha256:16fe3d6a…` |
| Computer | `sha256:77be8c9b…` |

- **Installation.** `plan` showed one changed step, `computer-v1`. `apply` took 3.8 s, and
  the next `plan` showed 18 of 18 steps matching.
- **Release note.** The installer refused the first lock commit (`e297da4`): a new version
  needs its own release note. The build agent reworded the note.
- **The n8n parent.** It moved to `68eecbb`'s tree, Lore revision 34, pushed at 05:11:00.2.
  Both runners served it at 05:18:41, 7 min 41 s later, since the image changed.
- **Computers.** A's and M's Computers restarted at 05:11:01 and were ready at 05:11:42 on
  `af6043514dfa`. A's keep-on held.

## Probes

The times below are the box's clock.

| Probe | Result |
|---|---|
| The Veoveo Tool list, A's own n8n, browser | The Tool field lists 69 tools of 11 servers (`artifact`, `console`, `embedding`, `hello`, `josue`, `media`, `procesos`, `tareasjonathan`, `template`, `time`, `toolbox`). A workflow saved before the change, with a typed `time__resolve_time`, opened and ran |
| The same workflow before the change, browser, version `a83c10c14f33` | The Veoveo Tool called `time__resolve_time` as the owner through the bridge and returned Time's answer (GPS week 2443) |
| The list on runners | `curl http://127.0.0.1:8812/n8n/bridge/tools` in team-a's and team-b's sandboxes: `200 {"tools":[{"name":"time__resolve_time"}]}` |
| The endpoint without the token | `GET /n8n/bridge/tools` 401 without a token and with a wrong one |
| The Assistant, A, browser, version `af6043514dfa` | In a new thread, 05:13:13 to 05:14:07: `search_tools` found `veoveo_time__resolve_time`; `load_tool` loaded it; the call with `{"expression":{"format":"rfc3339","value":"2026-11-01T05:15:00Z"}}` returned Time's answer, marked `source="mcp:veoveo"`. The Assistant answered GPS week 2443, 18,918 seconds of week. The program logged three `n8n.assistant_tools` requests, admitted, each 200 |
| Approval | None was requested, and no pending confirmation was stored |
| Team runs as M after the change | `resolve-time` rc 0 in 1250 ms; `hello-run` rc 0 in 557 ms |

## Boundaries

- **The approval card was not seen.** `resolve_time` ran without asking. Whether the
  Assistant asks before a tool that changes something, n8n's default for write tools as read
  from the code, was not tried.
- **The Assistant's "connected MCP servers" list stays empty.** Its `mcp-servers` tool lists
  only servers a person connects through n8n's registry, so it called that list empty while
  using the Veoveo tools.
- **The n8n server's own tools are not in the list.** The list shows no `n8n__…` tools. Not
  investigated.
- **The editor showed "Offline" once.** Its canvas showed n8n's "Offline" badge once after
  the restart. Not investigated.
- **The `mcp-registry` module's MCP node types.** They are not covered by `NODES_EXCLUDE` and
  keep the 2025 client. This was read from the code, not seen running. The plan's "Later"
  list decides it at the lock-down.
- **Who has it.** Only A's and M's Computers run `af6043514dfa`. Other people get it when
  they restart on the offered update.
