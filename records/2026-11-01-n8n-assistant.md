# n8n's Assistant in the Computer, no editor on runners, and live provider grants (J12, J10)

2026-11-01 (UTC), 02:05 to 02:20. Coordinator: Claude Code (Opus 5.5), in the owner's
Chrome. Code: a coding agent (Claude Code, Opus 5.5). Builds and deployment: a build agent
(Claude Code, Sonnet). Plan section 14; checklist J12 and J10. It follows
[n8n in the Computer](2026-11-01-n8n-in-the-computer.md).

## What shipped

| Component | Commit | Change |
|---|---|---|
| Installations | template `163d925`, BiomaAI `2c8abf5`, `649ef1b` (lock) | The Computer policy gains OpenShell's `npm_registry` rule: `registry.npmjs.org:443`, REST, read-only, `allow_encoded_slash: true`, for `/usr/local/bin/node`, as OpenShell's "Allow npm Installs" gives it. This is Computer version `a83c10c14f33`. OpenShell found no ambiguity with the `internet` wildcard. n8n installs with `--no-audit`, which the read-only rule needs |
| veoveo-hub | `18c6268` (head) | **`3c907cf`:** a runner a push leaves untouched keeps its serving state.<br>**`4c3e6bb`:** `factory.providers` is read from the active control plane at each push, so a grant needs no Hub restart. The installer (`a117718`) no longer restarts the Hub for a change to `factory.providers` alone |

Checks:
- Hub `18c6268`, box and Mac: rc 0, 460 passed, 2 skipped; box 154 s.

Deployment:
- `plan` showed 14 of 18 steps matching.
- `apply` made 5 changes in 36.3 s, the Hub ready in 23.0 s.
- The next `plan` showed 18 of 18.

Both Computers were restarted onto `a83c10c14f33` and were ready within 10 s.

## npm in the Computer

From A's Computer, as uid 10001:
- `npm view @types/node version` answered `26.6.6`, and `npm view @n8n/workflow-sdk version`
  answered `0.38.4`. Both are scoped packages, which were reset before the rule.
- Node's own `fetch` of `…/@n8n%2fworkflow-sdk` still fails: "HTTP/2: stream closed before
  the response was complete". The unscoped `left-pad` answers 200. The gateway logged the
  `fetch` traffic under `internet`, not `npm_registry`. npm itself, which uses HTTP/1.1,
  works. Not explained further.

## J12: the Assistant builds a workflow in the person's Computer

At `https://veoveo.bioma.ai/computer/apps/n8n/assistant`, the Hub's stable way into the
person's own Computer, the Assistant opened without asking for a model. It was asked: "Build
a small workflow: a manual trigger, then a Set node that sets the field greeting to 'hello
from the Assistant'. Name it J12 Assistant probe."

- It read the node definitions, wrote the workflow's source, and answered after about 1 min
  10 s: "J12 Assistant probe is built and verified (workflow ID p7INgrdUxJZ8algn)… Verification
  ran both nodes for real and the output was exactly `{ "greeting": "hello from the Assistant" }`".
  The canvas showed both nodes executed, with one item. It is saved as an unpublished draft.
- **Its sandbox:** `$HOME/n8n/.sandboxes/1c6b5e58-…`, created 02:13, holds `node_modules`
  with `@n8n/workflow-sdk` 0.39.0, `package-lock.json`, `src/` and `workflows/`. That is the
  sandbox service of `veoveo-n8n-computer`, and npm's scoped install through the new rule.
- **Its model:** the Computer's model (`XiaomiMiMo/MiMo-V2.6-Pro` at DeepInfra), through
  `veoveo-n8n-computer`'s loopback endpoint. No key reached n8n's process.
- **A schedule for J11:** asked next for "J11 keep-on probe", a Schedule Trigger every minute
  then a Set of `tick`, it built and verified it ("tick came back as an ISO timestamp"), and
  asked for approval before publishing: n8n's own approval card, "Assistant wants to publish
  J11 keep-on probe". The coordinator allowed it once, and it reported "Published
  successfully". J11 checks it after the collection time.

## J10: no editor on a runner

| Probe | Result |
|---|---|
| `https://n8n.apps.veoveo.bioma.ai/` in the browser | After sign-in: "No app here: The instance you selected for this server serves no app origin" |
| Reading `n8n://team-a/editor` and `n8n://team-b/editor` | Refused: "It isn't available in this profile." |
| The n8n tools | `n8n__team-a__{run,retry_execution,stop_execution}`, and the same for team-b |
| The n8n resources | `contract`, `docs…`, `execution/{execution_id}`, `executions…`, `status`, `workflows…` and `workflow/{workflow}` per team, and `ui://n8n/overview`. No editor surface |

Only the runner's server uses n8n's owner account.

## Runners' serving state

With `console__status` and `link`, both runners showed `servingRevision` equal to
`appliedRevision` (`00c49e6c1e2c`) and `ready`. Team-a showed `ungrantedProviders: null`;
team-b showed `["vv-factory-model"]`.

## Boundaries

- The Assistant ran once for each request, on a small workflow. Larger builds, its sandbox
  under load, and approvals other than publishing were not tried.
- Node's `fetch` of scoped registry paths over HTTP/2 still fails, as stated above.
- The `n8n.apps` sign-in before "No app here" comes from a registration of the slug that
  still declares an origin; not traced.
