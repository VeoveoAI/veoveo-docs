# n8n runners, phase 2: untouched neighbours, releases per team, data by who fetched it (J4, J7)

2026-11-01 (UTC), 00:20 to 00:45. Coordinator: Claude Code (Opus 5.5). Code: a coding agent
(Claude Code, Opus 5.5), reviewed by the coordinator. Checks, deployment and probes: a build
agent (Claude Code, Sonnet). Plan section 14; checklist J4 and J7. It continues
[phase 1](2026-10-31-n8n-runners-phase-1.md).

## What shipped

| Component | Commit | Change |
|---|---|---|
| veoveo-hub | `bfd390d` (head) | **The Apps bridge** answers a view's `resources/list` with the person's resources of the view's own server (`0aa6593`).<br>**Untouched runners** (`def7bac`): a runner's checkout includes the parent's own top-level entries instead of excluding its links, so its command does not depend on the set of links. A push that leaves the parent's own tree (SHA-256, migration `0035`) and a runner's tracked revision as that runner applied them leaves its sandbox alone.<br>**The tracked branch:** `VEOVEO_TRACKED_BRANCH` in a runner's environment (`a8f0bd5`).<br>**Also:** the corrected refusal of a linked repository's rule (`1e92ed3`), and the Lean session's merged proof and runtime work |
| veoveo-mcp-console | `811e476` (`9d80fb1` before it) | `status` and `logs` take `link` |
| veoveo-mcp-n8n | `648f43f` | A run acts on outside services with its team's credentials (wording) |
| BiomaAI installation | `a4b1615` | The lock |

Checks:
- Hub `bfd390d`, box and Mac: rc 0, 456 passed, 2 skipped; box 212 s.
- Console `811e476`, box: 30 passed.

Deployment:
- `plan` showed 16 of 18 steps matching, the Hub's and Console's images the only changes.
- `apply` made 2 changes in 51.8 s: the Hub ready in 23.8 s, Console in 24.1 s.
- The next `plan` showed 18 of 18.

The n8n parent's own tree became the GitHub tree at `648f43f` (Lore revision 20, 00:22:19.1),
with its links kept. Both runners took the new program: team-a served it 5 min 16 s after the
push, team-b 5 min 34 s after.

`console__status` with `link` for team-a showed:
- the runner: link `team-a`, linked repository `01a194415d3c…`, linked revision `62f36b42…`;
- the tracked branch: `{"id":"d216cc1441255ad5b517cc243cec578d","name":"main-d216cc14…"}`;
- the sandbox `ready`, with 0 restarts;
- the watcher A;
- `ungrantedProviders: ["vv-factory-model"]`.

## Probes

| Probe | Result |
|---|---|
| A link added (team-c, Lore revision 21, 00:28:22.6) | Only team-c's sandbox was created; it served at 00:33:28. Team-a's and team-b's sandboxes kept their IDs, main process instances, 0 restarts and scheduling times, and both answered `hello-run` (644 ms, 653 ms) |
| The link removed (revision 22, 00:35:25.2) | Only team-c's sandbox went; team-a's and team-b's were unchanged |
| **J4**: a release in team-a | A pushed a new greeting to team-a's tracked branch at 00:35:50.04. The Hub had the linked revision `c456cece…` by 00:35:59.3, and team-a's runner restarted in its sandbox, ready at 00:36:02. Two runs in the next seconds failed with "failed to discover upstream MCP" while its server started. The first run that succeeded, at 00:36:09.9 (19.8 s after the push), returned `{"greeting":"Team A (J4) greets, j4"}`. Team-b's sandbox was untouched |
| **J7**: A's run | Execution 5, `n8n://team-a/execution/5`: A reads `"access":"data"` with its output and run data; M reads `"access":"summary"`, without output |
| **J7**: a webhook run | A `POST` to team-a's public hook for `hello-veoveo` answered 200 `{"greeting":"Hello from Veoveo"}`, execution 6. A, and M (a writer through `n8n-team-a-2317`), read `"access":"data"` |
| **J7**: a reader | With M a `reader` on team-b and the group's grant removed, team-b's hook ran as execution 7. A reads `"access":"data"`; M reads `{"execution":"7","mode":"webhook","status":"success","access":"summary","output":null}`. A first attempt showed data, because M also held write through the group; then the grants were restored |

## Findings

- `servingRevision` reads `null` for a runner a parent push left untouched, though it
  serves. A Hub fix is queued.
- J6 waits. A grant of `vv-factory-model` to team-a published through the live control
  plane changed nothing, because the Hub reads `factory.providers` only when it starts. It
  also left the live control plane differing from what the installation declares, which the
  next `plan` showed. The grant is now going into the installation's declaration, and a Hub
  fix to read the grants at each prepare is queued.
- A replaced runner serves nothing while it restarts: J4's two failed calls. The plan's
  "Later" has the replacement without a gap.
