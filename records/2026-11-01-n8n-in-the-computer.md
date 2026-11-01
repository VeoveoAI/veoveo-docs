# n8n in the Computer and the overview App, in the browser (J8, J9, J10)

2026-11-01 (UTC), 01:20 to 02:05. Coordinator: Claude Code (Opus 5.5), in the owner's
Chrome (Claude in Chrome). Builds and deployment: a build agent (Claude Code, Sonnet). Code:
a coding agent (Claude Code, Opus 5.5). Plan section 14; checklist J8, J9 and J10, and a
finding for J12.

## What was deployed

| Component | Commit or digest | What it holds |
|---|---|---|
| n8n fork | `veoveo` `f9e9349025` → image `sha256:ed414042…` | `N8N_SANDBOX_SERVICE_HOMES` gives each Assistant sandbox its own home |
| veoveo-mcp-n8n | `264dc89` | The runner, plus `veoveo-n8n-computer`.<br>**n8n:** runs on loopback with SQLite in the person's home, with an owner it creates. Its editor is served at the Computer's `apps/n8n/` with the owner's local session.<br>**Teams:** found through the Hub as the owner and cloned at their tracked branch. Their workflows are applied as drafts, and saved edits are written back to the files every 5 s.<br>**Gateway:** the Veoveo Tool's bridge, the Assistant's model endpoint and the sandbox service. The fork image is pinned |
| Images | n8n-computer `sha256:25077587…`, Computer `sha256:a9920f80…` (3.48 GB, about 1.1 GB more) | n8n 2.46.0, Node.js 26.12.1, `veoveo-n8n-computer`, and a build-time check run as uid 10001 |
| BiomaAI installation | `57f960a` (lock) | `computers.apps` n8n on 5680. The policy names `veoveo-n8n-computer` in the `hub` and `model` rules. Memory 6 GiB; Computer version `dd3cc36b4772` |

Two image faults were found and fixed before n8n ran:
- The Veoveo nodes' directory was `drwx------ root`, so n8n crash-looped in both Computers
  ("EACCES … scandir '/opt/veoveo/n8n/nodes/n8n-nodes-veoveo'"). OpenCode kept serving
  throughout, as the start command intends.
- The new uid-10001 build check then failed on the fork image's working directory
  (`/home/node`) rather than on a file.

Both Computers were restarted onto `dd3cc36b4772`, each ready in about 69 s. In
`rozgo@bioma.ai`'s Computer:
- `opencode`, `veoveo-n8n-computer`, `n8n start` and its task runner are running;
- n8n's `/healthz` answered 200;
- OpenCode answered 200;
- the model endpoint refused a call without its per-start token (401 "the token is not this
  Computer's n8n's").

## J9: the overview App

At `https://veoveo.bioma.ai/apps/n8n/overview`, signed in as the owner:
- **The teams:** "n8n · 2 teams", found through the bridge's `resources/list`. For team-a and
  team-b it shows the linked repository, `writer`, n8n 2.46.0, and when it was applied.
- **The workflows:** each with its trigger, `active`, last run, failures in 24 h and webhook
  URL (`POST https://veoveo.bioma.ai/instances/<deployment>/n8n/hooks/webhook/hello-veoveo`),
  with Run, View and "Edit in my Computer".
- **Recent executions** with status, start, duration and mode.

| Action | Result |
|---|---|
| Run on team-a's `hello-run` | The form came from the trigger's input schema ("name: Who to greet"). Execution 12 finished with `[{"greeting": "Team A (J4) greets, J9 from the App"}]`, and the executions list showed it |
| "Edit in my Computer" on the same workflow | The App's `ui/open-link` to `/computer/apps/n8n/open?repository=…&workflow=hello-run` reached `https://veoveo.bioma.ai/computer/c/01a16a8c-…/apps/n8n/workflow/…`: the owner's own n8n editor, with no sign-in screen, showing "Hello Run" (Veoveo Trigger, then Greeting, then Veoveo Result) |

## J8: the person's own n8n

- **The checkout:** "Edit in my Computer" cloned team-a into `$HOME/n8n/team-a` on its tracked
  branch `main-d216cc14…`, revision 10 (`lore status`: in sync with the remote), and applied
  its workflows.
- **Saving back:** a sticky note added in the editor and saved with ⌘S was written to
  `$HOME/n8n/team-a/workflows/hello-run.json` at 01:54:50, which now contains a
  `stickyNote`. Nothing was committed or pushed.
- **Privacy:** the other person's Computer (M) has no `$HOME/n8n` at all. Each Computer's
  n8n is its owner's, behind the Computer's owner admission (checklist B).
- **A cosmetic fault:** the Veoveo Result node shows "?" on the canvas, n8n's sign for a
  missing icon. It opens as itself, with its `Run` parameter.

## J10: no runner serves an editor

`https://n8n.apps.veoveo.bioma.ai/` first asks for sign-in (401
`app-origin-sign-in-required`). After sign-in the Hub answers "No app here: The instance
you selected for this server serves no app origin." The prompt comes first because some
registration of the slug still declares an origin, the old instance's presumably; that was
not traced. The `n8n://{link}/editor` resource has not been checked yet.

Any other name under `*.apps`, such as `nothing-here.apps.veoveo.bioma.ai`, answers with
the sandbox proxy's page (200), which holds no session or data.

## J12: the Assistant reaches the model, and npm stops at scoped packages

The Assistant opened without asking for a model and answered: "The user asks for a small
workflow build", then "I'll build this small workflow now". So its model calls go through
`veoveo-n8n-computer`. It created a sandbox, `$HOME/n8n/.sandboxes/4d0cbcc4-…/workspace`,
and ran `npm install` there. npm fetched `tsx`, `npm` and `typescript`, then failed on
`@n8n/workflow-sdk` (ECONNRESET, then EACCES) and `@types/node` (EACCES).

From inside the Computer:

| Request | Result |
|---|---|
| `curl https://registry.npmjs.org/typescript` | 200 |
| `curl https://registry.npmjs.org/@n8n/workflow-sdk` | 200 |
| `curl https://registry.npmjs.org/@n8n%2fworkflow-sdk` | rc 56, the connection reset |
| `curl https://registry.npmjs.org/@types%2fnode` | rc 56, the connection reset |

npm requests every scoped package with `%2F`, and OpenShell refuses `%2F` in a path unless
the endpoint sets `allow_encoded_slash: true`. OpenShell's own documentation ("Allow npm
Installs") gives the rule: an exact-host `npm_registry` endpoint, read-only, with
`allow_encoded_slash: true`, for Node's binary. It is being added to the Computer policy,
where it also serves OpenCode's npm. The Assistant's run was stopped after it began to
retry.

## Boundaries

- J12 waits for the npm rule.
- J11, a personal schedule kept running past the collection time, has not been run.
- Another person opening this Computer's n8n address was not tried with the second
  Chrome profile; the owner admission is the Computer's own, proven in checklist B.
