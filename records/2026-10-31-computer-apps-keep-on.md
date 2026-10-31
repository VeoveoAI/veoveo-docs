# Computer apps and keep-on deployed

2026-10-31 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Checks, deployment and probes: a build agent (Claude
Code, Sonnet). Plan section 14, the Hub's Computers step.

## What shipped

| Component | Commit | Change |
|---|---|---|
| veoveo-hub | `f8c97ad` | **Opening a Computer:** `ui/open-link` may open a path under `/computer/apps/` on the issuer's origin.<br>**Programs of a Computer:** `computers.apps` names programs of a Computer version, each by a DNS-label name and a loopback port. `/computer/c/{c}/apps/{name}/…` reaches that port with the Computer's own admission, headers and forwarding limit; the program receives `/apps/{name}/…` after the base path, and a path without the slash gets 308.<br>**The stable link:** `GET /computer/apps/{name}/{*path}` signs the person in, starts their Computer and redirects into it. It answers 404 for a name the installation does not configure.<br>**Keep-on and stop:** `keep_on` (migration `0034`), with `POST /computer/keep-on` and `POST /computer/stop` for the owner's session or bearer, and the status page's forms. A kept-on Computer is never collected |
| BiomaAI installation | `9ff87cd`, `462e93e` | `computer-v1.yaml`'s `hub_computer` rule admits keep-on and stop for any program of the Computer, with the owner's credential. A new Computer version with a release note; the lock's Hub |

## Checks and deployment

| Step | Result |
|---|---|
| Hub `f8c97ad` check, box and Mac | rc 0; box 224 s; 447 passed, 2 skipped |
| Image | `sha256:e2f46d39…` |
| `plan` | 14 of 18 steps matching. The four that differed: templates (`computer-v1` recreated), hub-claim (`computer-policy-d97bd30b7eaf.yaml`), hub (its image) and hub-control-plane |
| `apply`, all steps in order | rc 0, 37.4 s. The templates; the claim, 4.0 s; the Hub recreated and ready, 24.2 s; the control plane published, 0.8 s; the old policy file removed, 4.0 s |
| `plan` again | 18 of 18 |

## Probes

| Probe | Result |
|---|---|
| Status | `GET /computer/status` with the Computer's bearer: `"keepOn":false` |
| The new version | Before, A's Computer ran version `811f82122b7f`, with `updateAvailable:true`, and its `POST /computer/keep-on` got the policy's 403 ("POST /computer/keep-on not permitted by policy"). `POST /computer/restart` answered 202 at 22:34:27, and by 22:34:37 the Computer was ready on `0d5e74dd8b1f` ("Your Computer can stay on while you're away, and you can stop it yourself."). M's Computer stays on `811f82122b7f` until it is restarted |
| Keep-on from inside the Computer | `POST /computer/keep-on {"keepOn":true}` answered 204 in 194 ms, and the status read `keepOn:true`. `false` answered 204 in 184 ms, and the status read `keepOn:false` |
| An unknown app, signed out | `/computer/apps/nothing/` answered 404 `not-found`. No app is configured, so there is nothing to sign into |
| Regression | The n8n instance served a README revision 13.0 s after its push. `time__resolve_time` answered in 463 ms. A's Computer cloned and pushed |

## Boundaries

- Stop was not run on the deployment, since a stopped Computer starts again only from its
  owner's browser. It is covered by the component tests.
- No `computers.apps` entry exists yet, so no program of a Computer has been reached through
  its route. The n8n program in the Computer will be the first.
- `ui/open-link` to `/computer/apps/` has not been exercised in a browser.
