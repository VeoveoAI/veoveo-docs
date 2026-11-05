# Qualification of USD, previews and share links, with OpenCode last

2026-11-05 UTC. Worker: Claude Code (Opus 5.5). Step 8 of
[plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). The agent under test was OpenCode in the owner's
Computers on an explicitly selected `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`. Scripts, session messages with every URL redacted but the Hub's
`/view/` pages, and logs are in `~/k3s-builds/usd-20261104/step8/` on the box. No token, share link secret or signed URL appears here.

**Outcome.** All six scenarios ended with what they ask for. Three of them needed a skill fixed first, and qualification also found a bug in the
Hub, fixed and measured here: [a factory server's changed skill was refused](#a-changed-skill-was-refused). Deterministic work came first: a cold build, and a
sandbox that did not opt in to the GPU.

**Browsers.** `list_connected_browsers` showed one browser, the Default profile, signed in as `rozgo@bioma.ai` (Computer A). It was the only one
tested. The `bioma.ai` and `vrx.group` profiles have no extension, so `alex.rozgo@vrx.group` (Computer M) acted from its OpenCode and not from a browser.

Component tests and deployed probes are in the four records this follows:
[content domain](2026-11-05-usd-content-domain-deployed.md), [server and viewer](2026-11-05-usd-server-and-viewer.md),
[Artifact](2026-11-05-usd-artifact-previews-deployed.md) and [variants](2026-11-05-usd-viewer-variants.md).

## Under test

| What | Revision |
|---|---|
| Hub | `518566f`, image `sha256:50f746b8…`, and after the fix `ef727e2`, image `sha256:1a58e8f0…` |
| Artifact | `0dabcb7` for the first round, then `0f6d501`, image `sha256:5c1b2756…` |
| USD | Lore `bf7295ab`, `033affe1`, `283621db`, and at the end `92d3e5cc`, whose skill equals GitHub `b60995e`'s by SHA-256 `4fdb8f7a…`. Sandbox `b099-804e391506fc`, 0 restarts |
| Installation | `0217e21`, template `f165868`. `plan` at the end: 18 of 18 |
| Computers | A and M, version `508eb2ac7ef9`, OpenCode build `v0.0.0-detached-202611021006`, not restarted, 13 h old at the end |
| Scenes | `usd-demo`, `e58a50cef0a9e248353ae4b8f102883b`, revision `e52596d9` |

## Deterministic, before any model call

### The cold build

A new branch `cold-check` of `veoveo-mcp-usd`, pushed from Computer A at 10:00:45. Its sandbox `b44a-381059866af9` had an empty disk: `target/` did not exist 16 s in.

| Measure | Result | The first cold build |
|---|---|---|
| Push to serving | **672 s, 11 min 12 s** | 18 min 18 s, with 32 jobs |
| The viewer's WASM | 4 min 32 s | 5 min 41 s |
| The server, release | 6 min 16 s | |
| Memory that cannot be reclaimed, `anon`, sampled every 15 s from the node's cgroup | **3315 MiB** at most | |
| `memory.peak`, which counts the page cache | 8203 MiB | "7.75 of 8 GiB" |
| `oom_kill` | **0** | |
| Disk at the end | `target/` 4.5 GB, `.cargo` 1.2 GB | |

The limit is 8 GiB and the page cache fills it, as it should. That the memory an out-of-memory kill would count stayed near 3.3 GiB is a sample, 43 of them: a peak between two is not ruled out. No kill happened.

With `usd` selected on that branch, `usd__render_stage` of the hummingbird at 60 took 10180 ms: `adapter: NVIDIA GeForce RTX 4090`, `renderMs` 4320, 255,838 bytes, SHA-256 `2fa22092…`. Opened, it is right. The selection was cleared and the artifact deleted.

### A sandbox that did not opt in

A branch `gpu-absent` of `g1-server`, whose image names no NVIDIA variable, under the same factory template. **The first push made no instance, because that repository was not watched.** `console__watch` and a second push made sandbox `bd39-0bc46d212835` in 20 s:

```text
pod runtimeClass=nvidia limits={"cpu":"4","memory":"8Gi"}
PROBE visible=[] capabilities=[]
PROBE ls: cannot access '/dev/nvidia*': No such file or directory
PROBE nvidia-smi-rc=127
exec: devices=0 smi=none driverlib=0
```

So the runtime class alone gives no GPU, on Bioma as it had in Docker. A push without `openshell/run` removed both instances, 404 within 10 s, and both branches are archived. `g1-server` stays watched: nothing undoes a watch, and its `main` still has no instance.

## Model-driven acceptance

Every prompt was in a person's words and named no tool. The prompts are in `step8/prompts/`. In the checklist these are G5 to G10, in this order.

| Scenario | Input, briefly | First run | After the fix |
|---|---|---|---|
| U1 | What scenes are in `usd-demo`; what the hummingbird holds and how long it runs; a picture at a moment you pick; find it again by what it shows; a link to look at it | The work right, and **an anonymous share link** instead of a page | **Passes** |
| U2 | Franka with a different gripper, as a picture, and a link | Never answered, three ways: below | **Passes** |
| U3 | I want to look around the kitchen and move the camera; a link | **Passes** | |
| P1 | A new repository with `index.html` and `style.css`; push; a link to see it working | **Fails:** "nothing in this setup turns a plain page pushed to Lore into a URL" | **Passes** |
| A1 | Upload `/tmp/q8/field-notes.pdf`; a link to see it; make it shareable for someone with no account; then stop that link | **Passes** | |
| M1 | As M, what the hummingbird in repository `e58a50ce…` holds, and a picture of it | **Passes** | |

### U1, on the final skills

Session `ses_e5479e587ffeSDEw6enjZE0tbc`, 144 s, 15 calls, USD 0.0293, model `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` on every turn. The skill call failed on the [stale entry](#a-changed-skill-was-refused), so it read the skill as a resource instead. In order: `usd__list_scenes`, by name 404 and then by ID nine scenes; `usd__inspect_stage` 84 prims, 0 to 264 at 60, "4.4 seconds"; `usd__render_stage` at time 132 in about 10 s; `artifact__search_knowledge` with the words "a small green hummingbird hovering in mid-air with its wings beating"; `artifact__create_download`, `curl`, `read`, which is the agent looking at its own picture.

| Check | Measured |
|---|---|
| The product | `resultUri` `artifact://artifacts/01a1ab87-…`, `hummingbird-t132.png`, 208,932 bytes, 1280x720 |
| Metadata | `repository` `e58a50ce…`, `branch` `main`, `path`, `revision` `e52596d9`, `address`, `taskId`, `time` 132. Provenance `actingServer: usd`, with its Task |
| Adapter | `NVIDIA GeForce RTX 4090` |
| Bytes | Signed download and the file on the token origin both `3cbeb3f4447d366e…`. The first run's render at 132 had the same SHA-256, so a render repeats exactly |
| Found by meaning | Rank 2 of 9. Rank 1 is an older render of the same bird, so nothing here says the search told two of its frames apart |
| The link | `/view/artifact/01a1ab87-…/hummingbird-t132.png`, with "no share link needed" |
| Its state | `releaseState: private`, unchanged |
| In Chrome | The Hub's frame with the platform's sandbox, on a token origin, shows the bird, `DYNAMIC`, `nosniff`, no `Content-Disposition` |

### U2, on the final skills

Session `ses_e54393038ffegpDVPnnj5R9M7j`, 145 s, **8 calls, USD 0.0091**, 8 asks. `hub:usd/view-stages` loaded. It tried `Robotiq_2F_85`, whose render failed honestly, then `AlternateFinger`, once. Artifact `01a1abc8-…`, 88,202 bytes, metadata `variants` naming the selection, adapter the 4090, no share links, signed download and token origin both `d1de990c765b3e13…`. It gave two links, the picture's and the viewer's, and told the person why `Robotiq_2F_85` could not render. Both open in Chrome. The arm looks right. The viewer opens at the default selection, and its panel switches it.

### U3

Session `ses_e549fb808ffefN2a0wC1GqHUMu`, 154 s, 12 calls, USD 0.0173, 9 asks, before any fix. It found the Hub's origin through the `computer` skill and answered `/view/lore/e58a50ce…/main/kitchen_set/kitchen_set.usdz`. It tried the link with `curl` from the Computer: `403 policy_denied`, because a Computer's policy does not admit `/view/`. It gave the link anyway, and rightly. In Chrome the kitchen draws with its panels.

### P1, after the fix

Session `ses_e5479e585ffe45x0kgSG1xT6RG`, **34 s, 7 calls, USD 0.0101**, 0 asks. `lore repository create`, `lore stage --scan`, `commit`, `push`, and `/view/lore/01a1ab86…/main/index.html`. In Chrome the frame's document is `/index.html` on a token origin: "Hello from Lore", `color: rgb(0, 128, 0)`, `style.css` 200 and `DYNAMIC`.

### A1

Session `ses_e549fb80fffeEIAWqNskgK5MRL`, 189 s and then 36 s, 15 calls, USD 0.0352, 0 asks, on the first skills. The input is a 712-byte synthetic PDF, SHA-256 `8645f77f…`.

| Step | Recorded outcome |
|---|---|
| Upload | `artifact__create_upload`, a signed PUT, `complete_upload`: `01a1ab60-…`, `application/pdf`, 712 bytes. Signed download `8645f77f…`, the input's |
| Preview link | `/view/artifact/01a1ab60-…/field-notes.pdf`, which draws the text in Chrome |
| Release and link | `set_release_state` to `released`, `create_share_link`, 7 days, `redemptions: 0` |
| Opened in Chrome | Top-level on `artifact-{token}.veoveo-bioma.space/_veoveo/view/field-notes.pdf`, with Download. Its file: `application/pdf`, `DYNAMIC`, `nosniff`, `8645f77f 8f161dab` |
| "Stop the link" | `revoke_share_link`, `revokedAt` 11:30:25, `redemptions` 1, which the agent reported |
| After it, at 11:30:45 | The open preview's file and viewer page **404**, and the link says "no such share link" |

The link was in the browser tool's call for that one visit, and is revoked.

### M1

Session `ses_e54a51927fferI2VFmI59fFOK9`, 88 s, 12 calls, USD 0.0223, 10 asks. `usd__list_scenes` on the repository: **403** "You hold no access to this repository". `console__repository_access`: 403. `artifact__search_knowledge`: no hits. **`usd__render_stage` was never called.** M's Artifact listing held 0 artifacts before and after. The answer says it cannot reach the repository, quotes the 403, says nothing of the scene's contents, and names what would unblock it. It then asked the person how to go on.

## What went wrong, and what was fixed

### The harness, first

The first U1 and M1 stopped for 30 minutes on `skill` `hub:usd/view-stages`, status `running`. Nothing had hung: OpenCode was asking the person, as [K8](../QUALIFICATION_CHECKLIST.md#k-skills-and-groups) requires for a factory server's skill, and nobody answered. `q8.sh` now answers `once` to each ask and records it, as a person who says yes would.

### No Hub origin in the skills

The first U1 did the work and then released the render and made a 7-day anonymous share link. Its reasoning: `/view/artifact/...` "on the Hub's origin", then "What is 'the Hub's origin'?". It disclosed what it had done, but a person asking to see their own picture should not end up with an anonymous link. **Fixed** in `download-an-artifact` and `view-stages`: the origin is `COMPUTER_HUB_URL` without its path, and the person's own file needs no share link and keeps its release state.

### No page for a Lore file in the skills

The first P1 spent 421 s and 24 calls and concluded that a pushed page has no URL, and offered to wrap it in an MCP server. Nothing it could read said otherwise. **Fixed** in the `lore` skill, published through the control plane with no Computer restart.

### `usd__list_scenes` by name

`repository` wants an ID, and agents tried the name first: a 404 and a retry, each run that had not read the fixed skill. `view-stages` now says so. Not an error a person sees.

### Guessing at a close-up

The first U2 and its rerun rendered the picture and then tried to frame the gripper, since the arm is small in the whole stage and nothing reports where a prim is. The first ended in a provider error, **"Too many images in request: 5 > 4"** from DeepInfra, because each picture it read stayed in the session. The rerun ran out its 15 minutes "calibrating" the camera, at USD 0.058. **Fixed** in `view-stages`: a close-up is guesswork, so render the default once and give the viewer's address. Compare the final run: 8 calls and USD 0.009. A tool that reported a prim's bounds would be the real answer, and was not added.

### A changed skill was refused

**Found by this run, and fixed.** Reading a skill in OpenCode verifies it against its listed entry, and after a push of USD every load failed:

```text
skill://usd/view-stages/SKILL.md is 2125 bytes; the skill entry lists 1918
```

| Measured | Result |
|---|---|
| 20 s after one push served, and 80 s and 18 min after the next | The skill call errors, each time |
| Without the skill, session `r2-u2`, 883 s, USD 0.063 | It cloned the repository, tried to install `pxr`, and released an artifact for a share link |
| Without the skill, session `r3-u2`, 809 s, USD 0.082 | `pypi.org` was refused, and **it probed third-party PyPI mirrors, reached one and began fetching a wheel** for `usd-core`. Stopped and removed. That those hosts are open is the Computer's policy and not this work's, and it is worth the owner's reading |
| A selection change, a hint to that person's listens | Did not help |
| A control plane publication, here a repository created | Helped: the next load worked |

**My first reading of the cause was wrong.** A listing answers `ttlMs: 5000` and OpenCode keeps its entries, so I took this for OpenCode's bug, and had one reading of `veoveo-hub-sdk-cli skills` that looked right. That reading came after a publication, so it showed nothing. Measured directly, with no model, by pushing one trailing newline to the skill:

| After `servingRevision` moved | Hub's `skills/list`, before the fix (`518566f`) | After it (`ef727e2`) |
|---|---|---|
| 0 s | 2125, the old size | **2126** |
| 5, 15, 35 and 75 s | 2125 | 2126 |
| `resources/read` of the file | 2126 characters | 2126 characters |
| Reverted, at 0 s | 2125 was all it had ever listed | 2125 |

So **the Hub held the stale list:** its discovery cache is keyed by the catalog generation, and a push with the same declaration starts none. Skills are not declared, so nothing emptied it.

**The fix,** Hub `ef727e2`, in its [design](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/DESIGN.md#skills): `hub.instance.served_at`, which the Hub already recorded when a server registers or resumes, joins what registrations route, and migration `0038` notifies the `hub` channel when it is set. A server coming up then starts a new generation, which empties the cache and ends every open listen with a hint, as after a publication. No new mechanism, and no Computer version. Only an instance has that row, so an installed server is unaffected. A server that stops does not notify: what it served stays listed until it comes back.

| Measured after the fix | Result |
|---|---|
| OpenCode's reopen | 13:21:20, about a second before the status showed serving at 13:21:21. Again at 13:23:44 after the revert |
| Session `ses_e541ebb8cffeHEdHyQyq6hKGlL`, started about 11 s after a push served, with nothing else done: "Load the skill about USD stages" | `skill` **completed** with the new text, 8.5 s, USD 0.0039, 1 ask |
| `an_instance_server_coming_up_starts_a_new_generation` | Component test: a resume, and a stop and a resume, each advance the generation |

A cost that follows: each factory push now ends every open listen once, on one Hub replica here, and each client lists again. A discovery that overlaps it can answer "catalog changed during discovery; retry", as any registration could already.

### Others

- **`Robotiq_2F_85`:** every run that chose it got `unresolved Payload layer @/sandbox/Robotiq/2F-85/Robotiq_2F_85_edit.usd@`. The layer is not in `usd-demo`. Its Task failed honestly, and the agent chose another. This is the first evidence of a stage with a dependency outside its folder: a render refuses it, where `inspect_stage` lists what is missing. A stage in the browser shows without it. That difference is unchanged.
- **Asks.** With the USD skill loaded a person answers before every code execution and shell command: 11 in the first U1, 9 in U3, 8 in U2. That is K8 working, and it is what using USD feels like in a Computer. Adding `skill://usd/` to `mcp.servers.hub.skills.approved` would end them. That is the owner's call, since it trusts whatever that repository's pushers write.
- **Signed URLs in a session.** Agents pass them to `curl` on the command line, so they sit in the session for their five minutes. `q8.sh` redacts them, and the [skill](https://github.com/VeoveoAI/veoveo-mcp-artifact/blob/main/crates/veoveo-mcp-artifact/skills/download-an-artifact/SKILL.md) warns about chats and files. Unchanged.

## What changed

| Repository | Commit | Change |
|---|---|---|
| `veoveo-template-installation` | `f165868` | `lore` skill: a person's page for a pushed file |
| `veoveo-installation` | `400eea9`, `b02cff3` | The same, and the lock: Artifact `0f6d501`, its image, and that template |
| `veoveo-mcp-artifact` | `0f6d501` | `download-an-artifact`: the origin, and no share link for a person's own file |
| `veoveo-mcp-usd` | `5f6a97b`, `b60995e` | `view-stages`: `id`, the origin, a render's page, and close-ups. Pushed to its Lore repository as `033affe1` and `283621db`, serving in 65 s each |
| `veoveo-hub` | `ef727e2` | A factory server coming up starts a new generation: migration `0038`, `served_at` in the two registration queries and in `RegisteredServer`, the test, the design and `.sqlx` |
| `veoveo-installation` | `0217e21` | The lock: the Hub at `ef727e2` |

| Check | Mac | Linux |
|---|---|---|
| Installer, template and Bioma at each commit | rc=0 | rc=0 |
| Artifact `0f6d501` | rc=0, 126 tests, 9 skipped | rc=0, the same |
| USD `5f6a97b`, `b60995e` | rc=0, 687 tests, 20 skipped | rc=0, the same |
| Hub `ef727e2` | rc=0, 519 tests, 2 skipped | rc=0, the same. An earlier Linux run stopped on `cargo fmt`, on my test, before anything was pushed |

`plan` showed exactly two differences, Artifact's image and the `lore` skill's five lines. `apply` under the shared lock: `platform-servers` 24 s, `hub-control-plane` 2 s. Then 18 of 18. The Hub's fix was one more: `plan` showed only `hub`, and `apply` took 21 s, in which the Hub restarted. Then 18 of 18 again. The Computers were not restarted.

After it, with no model: `usd__inspect_stage` and a render on the 4090, 1495 ms; M still 403; Time's `resolve_time`; `artifact__search_knowledge`; `lore` create, push, clone and delete on both Computers; in Chrome the Time and n8n Apps, the library and the viewer. No `ERROR` line in the Hub's log over those minutes. `embedding-runtime`, `console` and `media` kept running, 0 restarts. `embedding__embed` was not called directly here, as my call had the wrong arguments; search answered through it.

## Cost

As OpenCode reports it, on one model.

| Session | Time | Calls | Asks | USD | Input, output, reasoning, cache read |
|---|---|---|---|---|---|
| First U1, first M1 | 30 min each, waiting | 2, 1 | | 0 | 0 |
| U1, first | 309 s | 15 | 11 | 0.0284 | 51436, 2355, 3760, 280528 |
| M1 | 88 s | 12 | 10 | 0.0223 | 46683, 613, 1399, 133376 |
| U3 | 154 s | 12 | 9 | 0.0173 | 31532, 856, 2604, 200128 |
| P1, first | 422 s | 24 | 0 | 0.0293 | 47038, 1402, 7195, 456480 |
| A1, two turns | 225 s | 15 | 0 | 0.0352 | 68848, 2103, 3116, 287456 |
| U1 and the first U2, one session | 144 s and 376 s | 33 | 1 | 0.0465 | 75048, 5112, 6969, 1033488 |
| P1, rerun | 34 s | 7 | 0 | 0.0101 | 21290, 544, 393, 42704 |
| U2, second | 899 s, cut off | 25 | 20 | 0.0577 | 93006, 4536, 14059, 418000 |
| U2, third, no skill | 883 s, cut off | 36 | 2 | 0.0634 | 111199, 2886, 10930, 983376 |
| U2, fourth, no skill | 809 s, cut off | 47 | 2 | 0.0824 | 147300, 4852, 12120, 1198368 |
| U2, final | 145 s | 8 | 8 | 0.0091 | 15883, 899, 1263, 103312 |
| The skill, loaded right after a push | 8.5 s | 1 | 1 | 0.0039 | 8746, 73, 49, 10928 |
| **Total** | | | | **0.41** | |

## Cleanup

Every artifact of these runs is deleted, the Lore repositories and the checkout, the branch instances, and what the agents left in `/sandbox/scratch` and `/tmp/opencode`. M holds no artifact. The eight older artifacts of A are left as they were. Tabs are closed. The disk is at 77%.

## What this does not prove

- **Other profiles.** Nothing ran in a browser as `alex.rozgo@vrx.group` or in the `bioma.ai` profile, so a second person's browser is unproved. M's refusal is its agent's tools.
- **A second person with a grant** opening a preview from an agent's link.
- **The fix with several Hub replicas, or in another person's OpenCode.** Bioma has one replica, and only A's OpenCode was watched. The notification is the same channel other registrations use.
- **A person answering asks in OpenCode's page.** `q8.sh` answered through the API, each `once`. The prompt itself was seen in the [skills acceptance](2026-11-03-skills-acceptance.md).
- **Search telling a render from others of the same scene.** One rank, with older renders of the same bird beside it.
- **The final skills in every scenario.** U3, A1 and M1 ran on the first skills, as they needed no change, and were not run again.
- **Real media.** Media's provider is the synthetic fake, and no scenario here used it.
- **A model but this one,** large files, and any browser but Chrome.
