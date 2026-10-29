# Qualification Checklist

Every feature of the factory-sandbox installation that must work, how to check it, and
where it stands. People and agents use the same list. The design is in
[ARCHITECTURE.md](ARCHITECTURE.md) and the `DESIGN.md` files it maps; what is next is
in [PLAN.md](PLAN.md); dated evidence is in [records](records/README.md).

Rules:
- **Status:** `proven` (with evidence), `pending`, or `component` (proven by repository
  tests only, not on the deployment).
- **Order:** component tests, then deployed probes, then one model-driven acceptance.
- **Model calls:** none during iteration. The final acceptance uses
  `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` and nothing else.
- **Evidence:** facts, not "done". Name the command or tool, the identities (digests,
  revisions, sandbox IDs) and the timings.
- **Fake providers** (the Media fixture) produce synthetic data. They prove routing and
  storage, not real inference or valid media.
- **Secrets:** never in evidence. Keep signed URLs, tokens and passwords out.

Installation under test: K3s box `rozgo-sim-pc`, public host `https://veoveo.bioma.ai`
(single host), deployed 2026-10-28: Hub `651390d`, Lore `4ee9f338`, OpenShell gateway `ebd6a1c` (runtime and
supervisor `ab37a698c`), installation `62b288e` (Computer version `0de8536be11e`), OpenCode `ca091c8` (2.0; Computer image `38490c5-ca091c8`), console `b96a5a2`, Artifact `a0566b8`, Media
`6bd5843`, Embedding `95216bd`, SDK `581fdcb`.

## A. Identity and administration

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| A1 | A person signs in to Hub | Browser PKCE login with Entra | Access token and refresh token issued; refresh rotates | proven 2026-10-23 (admin principal, client `opencode`) |
| A2 | An administrator uses the admin routes | `GET /admin/local/control-plane` with an Entra `administrator` app-role token | 200, through rule `installation-administration` (`roles: [administrator]`), with no per-person rule | proven 2026-10-23 (revision `gcp-01a166f0…`) |
| A3 | A member without the role is refused | Same route as a member | 403 | proven 2026-10-26 with a second account whose operator and administrator roles were removed in Entra: a fresh sign-in's token had no `roles`, and the route answered 403 in 0.26 s. A refresh of a session signed in before the removal kept both roles, for up to seven days ([record](records/2026-10-26-second-person.md)) |
| A4 | A server acting for its caller is refused on admin routes | Hub test `calls.rs` | 403 | component |
| A5 | Admin publication round trip | GET, edit, PUT `/admin/local/control-plane` | `applied`, new revision, change visible | proven 2026-10-23 (enrollment, Time assignment) |

## B. Computer

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| B1 | First entry creates the Computer from the current template | Open `https://veoveo.bioma.ai/computer` | Computer Ready on the template's image; no device login | proven 2026-10-23 in Chrome: `/computer` → sign-in → start page with what's new → OpenCode, after Hub's policy gained `DeleteSandboxTemplate` (the first two attempts failed without it) |
| B2 | A stale Computer link repairs itself | Reload an old `/computer/c/…` URL after its sandbox is gone | 303 to `/computer`, then setup, then the Computer; background requests stay 503 | proven 2026-10-26: background requests 503 `computer-unavailable`; the reload went to `/computer`, then the same link with a new sandbox in about 20 s ([record](records/2026-10-26-closeout.md)) |
| B3 | Lore works with the one Hub login | In the Computer shell: `lore repository list "$VEOVEO_LORE_REMOTE"` with no flags | exit 0 and no login prompt; OpenShell logs show no `credential_endpoint_mismatch` | proven 2026-10-23: plain `lore repository list "$VEOVEO_LORE_REMOTE"` in OpenCode's shell exited 0 with no login prompt |
| B4 | A new assignment works at once | An admin assigns a repository, then the person clones it | Clone succeeds within seconds, without waiting for the 300 s token lifetime | proven 2026-10-26: published through the admin route as the person; refused at 1.9 s, cloned at 2.9 s ([record](records/2026-10-26-closeout.md)) ; again 2026-10-26 with one Lore token per repository: the first clone after a share succeeded at once, its token minted on that request ([record](records/2026-10-26-sharing.md)) |
| B5 | A removed assignment stops | An admin or owner removes it, then the person clones again | Refused within the Computer's reuse of that repository's token, at most 240 s | proven 2026-10-26 at 222 s: a Computer reuses a repository's token until 60 s before its 300 s expiry ([record](records/2026-10-26-sharing.md)). Until then, Hub's renewal stopped it at once: proven 2026-10-26: a clone 0.23 s after the publication still worked, the next at 12.4 s was refused ([record](records/2026-10-26-closeout.md)) |
| B6 | Lore access survives a restart | Restart the Computer, then `lore repository list` | exit 0 | proven 2026-10-26: after a restart, `lore repository list` exit 0 and Time cloned (364 files) in 0.19 s ([record](records/2026-10-26-closeout.md)); the list names the person's repositories since Lore asks Hub ([record](records/2026-10-26-lore-listing.md)); a second person's list names only their own, and Lore refuses their clone of the first person's with `PERMISSION_DENIED` ([record](records/2026-10-26-second-person.md)) |
| B7 | Artifact objects through the single host | From the Computer: Artifact upload and download via `veoveo.bioma.ai/artifacts/…` | Byte counts and SHA-256 match; no other hostname used | proven from outside a Computer 2026-10-23 (administrator via `veoveo-hub-sdk-cli`: 1 MiB, PUT 200 in 0.93 s and GET 200 in 0.41 s, both on `veoveo.bioma.ai/artifacts/`, SHA-256 equal, artifact `01a16960-cd6e…`); pending from a Computer; download from inside a Computer proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)); upload and download from inside, as the person, proven 2026-10-25 ([record](records/2026-10-25-batch3-and-g1.md)) |
| B8 | Many repositories | A person reaches many repositories | Every clone works; no token grows with the count | proven 2026-10-26: 200 repositories shared through one group, listed and cloned with 0 failures in 50.4 s, one token minted per repository ([record](records/2026-10-26-sharing.md)); the earlier limit of about 130 to 135 in one token is gone |
| B9 | Large push through the proxy | Push one file over 16 MiB, and about 500 files | Push succeeds; time it | proven 2026-10-26: 17 MiB and 500 files, commit 0.64 s, push 0.21 s; a fresh clone matched by SHA-256 ([record](records/2026-10-26-closeout.md)) |
| B10 | The platform puts nothing in the home | A fresh Computer: `echo ~` and `ls -A ~` | `~` is `/sandbox`; only OpenShell's `.openshell-initialized` and what programs created themselves | proven 2026-10-23 through Hub: `~` = `/sandbox`, `10001:10001 2770`, holding `.cache`, `.config`, `.local` (OpenCode's own) and `.openshell-initialized` |
| B11 | Restart keeps the home | Create a file, an unpushed Lore change and an OpenCode session; restart | All three present; same URL; only running programs and `/tmp` gone; time it | proven 2026-10-23/24 through Hub on the new runtime; the race that lost a home is fixed and proven at the OpenShell level with a SIGTERM-ignoring workload (claim kept and re-adopted with the same file); not run through Hub with a slow-stopping Computer |
| B12 | Any client learns of a new version | Publish a template with a release note | `console__computer`'s description changes mid-session; the call reports running, current and what's new; the same status over HTTP from a shell in the Computer; the start page lists it | proven 2026-10-23/26: a new note showed on `/computer/version` within 9 s and in `console__computer`'s description inside the Computer; OpenCode's own refresh rests on its `tools/list_changed` handling, as it has no model-free tool list ([record](records/2026-10-26-closeout.md)) |
| B13 | An idle Computer is collected | Leave it idle past `computers.collectAfter`, then enter | Sandbox gone, home kept; entry creates the current version; what's new shown once | proven 2026-10-24 with `collectAfterSeconds` 600: collected at 00:05:35 (browser idle 701 s, sandbox 733 s), claim kept; entry recreated it in 3.56 s with `~/keep.txt` (content, mode, inode) and the OpenCode session |
| B14 | A failed new version is diagnosable | Publish a template whose image cannot start, then restart | The cause is shown; the previous version stays recorded; the home is intact | proven 2026-10-26: the status page named the failure (the 120 s readiness deadline, not `ImagePullBackOff`) and kept the previous version, which served again in about 20 s; the home claim was kept ([record](records/2026-10-26-closeout.md)) |
| B15 | Restart is quick | Measure stop, create and first page | Seconds, not the 101–160 s stops measured 2026-10-23 | proven 2026-10-23 on the new runtime: the gateway's delete took 0.77 s (was 38.6 s); replacement 5.1 s |
| B16 | Signing in again keeps a running Computer working | Sign in from a second browser while the Computer runs; call Hub and Lore from it | The browser joins the Computer's custody: no handoff, and Hub and Lore keep answering | failed 2026-10-27: a second sign-in handed custody off, and the running OpenCode's Hub calls were refused for 3 h ([record](records/2026-10-27-early-adopter-failures.md)). Fixed in Hub `5a1b926`. Proven 2026-10-28: a second Chrome profile's sign-in at 16:19:15 joined the family; no custody call, no restart, and a process started before it kept calling Hub and Lore with exit 0 ([record](records/2026-10-28-forwarding-and-second-sign-in.md)) |
| B17 | Many open connections to a Computer all open | 40 concurrent event streams (`…/api/event`) from the Computer's page | All 40 open within a second | failed 2026-10-28 on Hub `5a1b926`: 28 opened and 12 waited, because Hub's forwards shared one gateway connection capped at 32 streams. Proven on Hub `651390d`: 40 of 40 within 341 ms ([record](records/2026-10-28-forwarding-and-second-sign-in.md)) |
| B18 | OpenCode searches files | OpenCode's `GET /api/fs/find` in a Computer | 200 with the matching files | failed 2026-10-28: 21 × 500, because OpenCode could not download the ripgrep it runs. Proven 2026-10-29 on Computer version `7e27dc4bf18d` (factory `ac05fb30…` with ripgrep 14.1.1): 200 in 57 ms with the file found ([record](records/2026-10-29-computer-internet-and-search.md)) |
| B19 | A Computer fetches packages and clones, and its credentials stay bound | In a Computer: `git clone` from GitHub; `cargo add` and `cargo check`; a Hub placeholder sent to another host | Clone and cargo exit 0; the placeholder refused | proven 2026-10-29 on Computer version `7e27dc4bf18d`: clone in 495 ms; `cargo new`, `add serde`, `check` in 5.2 s; the placeholder refused by the proxy with 403 `credential_endpoint_mismatch`. The toolchain's read-only `CARGO_HOME` had made `cargo check` exit 101; it is `/sandbox/.cargo` now ([record](records/2026-10-29-computer-internet-and-search.md)) |

## C. Repositories

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| C1 | Whoever creates a repository owns it | In OpenCode: `console__create_repository {name}` | Returns `{id, name, remote}`; the next plain `lore` push works with no admin step | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| C2 | Nobody claims another person's repository | Second person calls with the first person's `id` | 409 `repository-claimed` | proven 2026-10-26: the second person's `console__create_repository` with `qual-b9`'s name and `id` answered 409 "Another person created this repository" in 577 ms, and the control plane was unchanged ([record](records/2026-10-26-second-person.md)) |
| C3 | An interrupted create completes | Repeat the call with the returned `id` after a failure | Registered once; no duplicate | component |
| C4 | An owner shares with a person | `console__share_repository {repository, person: <email>, access: member}` | The person lists, clones and pushes it within seconds | proven 2026-10-26: answered in 691 ms; listed at once, cloned on the first try (291 ms), pushed (148 ms) ([record](records/2026-10-26-sharing.md)) |
| C5 | Sharing is refused where it should be | A member shares; an owner demotes themselves; an unknown email; no subject | 403, 409, 404, 400, each saying what to do | proven 2026-10-26 ([record](records/2026-10-26-sharing.md)) |
| C6 | An owner shares with a group | `console__create_group`, `console__set_group_member`, `console__share_repository {group}` | Members clone and push; a member cannot change the group | proven 2026-10-26: cloned 291 ms, pushed; the member's change of the group answered 403 ([record](records/2026-10-26-sharing.md)) |
| C7 | Removal from a group stops access | Remove the member | Refused within the 240 s bound of B5 | the bound is B5's; the run was cut short by the credential gap the same record fixes ([record](records/2026-10-26-sharing.md)) |
| C8 | A member's push is served | A member pushes a branch of a shared server repository | The factory builds and serves it as theirs | proven 2026-10-26: served 304 s after the push, 0 restarts, read by the member through `console__status` ([record](records/2026-10-26-sharing.md)) |
| C9 | `lore repository create` makes its creator the owner | In a Computer: `lore repository create "$VEOVEO_LORE_REMOTE/<name>"`, push, clone | Listed at once; the first push and a clone work; Hub records the creator as `owner` | proven 2026-10-27: created in 523 ms, listed at once, pushed 116 ms, cloned 80 ms; the other person likewise ([record](records/2026-10-27-lore-create.md)) |
| C10 | Only an owner deletes | A member, then the owner, runs `lore repository delete` | The member is refused; the owner's deletion removes the repository from Lore and Hub | proven 2026-10-27: the member refused (Hub `PERMISSION_DENIED` in 21 ms); the owner's in 206 ms, then 404 in Hub ([record](records/2026-10-27-lore-create.md)) |

## D. Factory serving (Stage 1)

Time is the reference server. Record per push: stop, start, fetch, build and server
startup times, from `console__logs` timestamps.

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| D1 | Watch as the person | `console__watch {repository}` | Hub subscribes as the caller; the watch survives Lore `ABORTED` | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D2 | First push serves `main` | Push `main`, then poll `console__status` | BuildKit builds `openshell/image/`; the image comes from the local registry; the sandbox is Ready; `servingRevision` = the pushed revision; `time__*` tools appear | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D3 | Factory instance reaches PostgreSQL | One `time__*` call that uses the database | Works, verified against the platform trust bundle with no `sslrootcert` (decision D1) | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D4 | Same image and policy push restarts | Push a source change | Same sandbox ID; restarted, not recreated; incremental build | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D5 | Policy change recreates | Push a change to `openshell/policy.yaml` | New sandbox, empty disk; no `UpdateConfig` call | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D6 | Second branch, second data environment | Push `dev/<user>/x`; `console__select` it for `time` | Separate database `dev_<user>_x_<8 hex>`; every chat of that person follows; `select null` returns to `main` | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D7 | A broken build is diagnosable | Push code that fails to compile | The branch's server exits at start and OpenShell restarts it with back-off; `console__status` shows its `exitCode` and `restartCount`; `console__logs` shows the error; a fixing push serves again. A failed image build or create is `failed{stage}` and leaves the sandbox serving as it was | proven 2026-10-25: exitCode 101, restartCount 1, `error[E0308]` in the logs, the fix served again ([record](records/2026-10-25-batch3-and-g1.md)) |
| D8 | A crash at startup is diagnosable | Push a server that exits at startup | Status shows the exit code and restart count; logs explain it; a fixing push recovers | proven 2026-10-25: status shows exitCode and restartCount ([record](records/2026-10-25-batch3-and-g1.md)) |
| D9 | Branch deletion removes its instance | Delete the branch in Lore | The instance, sandbox and providers are removed | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D10 | Soft caps warn | Exceed `instancesPerUser` (4) | A warning in status; nothing refused (`enforce: false`) | proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| D11 | Recovery | Restart Hub; restart Lore; reboot the node | Watches resume; instances serve again with no manual step | Hub and Lore restarts proven 2026-10-25 ([record](records/2026-10-25-platform-tools-and-time-flow.md)); node reboot pending |
| D12 | A watch outlives idle time | Push to a watched repository more than 2 h 13 min after its last push | Applied within seconds | failed 2026-10-27: after 14 h idle, three watches applied no push ([record](records/2026-10-27-shared-capacity.md)). Fixed in Hub `0ca6bb5`: Cilium's records of the four subscription connections were renewed every 30 s. Proven 2026-10-29 on Hub `651390d`: a push to g1-rerun after 13 h 37 min of idle was `listening` 22.2 s later ([record](records/2026-10-29-computer-internet-and-search.md)) |
| D13 | A removed sandbox is reported | Delete an instance's sandbox outside Hub, then push | Status names the missing sandbox as `failed{stage: create}`; the push creates it again | proven 2026-10-27: the status said so at once; the push at 18:45:58 created the sandbox, which served at 18:50:10 ([record](records/2026-10-27-shared-capacity.md)) |
| D14 | A slug belongs to one repository | Push another repository whose server keeps a slug that a served repository uses | Its registration is refused, saying so in its logs; the served one keeps serving | proven 2026-10-27: `slug-probe` refused at 23:20:05 ("the slug template is served by another repository's server…"), g1-rerun stayed registered ([record](records/2026-10-27-early-adopter-failures.md)) |

## E. Platform services

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| E1 | Services registered and routed | `veoveo-hub-sdk-cli tools` as the administrator | `artifact__*`, `media__*`, `embedding__*`, `console__*` listed | proven 2026-10-23 (15 + 3 + 1 + 5 tools after Artifact `b7bbde9`, Media `d7ae458`, Embedding `1323732`) |
| E2 | A service registers again after its registration is abandoned | Keep the service down past Hub's 60 s registration grace while Hub runs, then let it start (a Hub outage alone abandons nothing) | It registers again by itself with a new client; its tools route; no manual file moves | proven 2026-10-23: Artifact (`artifact-01a1668e…` → `artifact-01a1674370…`); Media `d7ae458` and Embedding `1323732` stopped 100 s and 104 s, registered again 3.3 s after start with new clients; all their tools listed |
| E3 | Embedding runtime on the GPU | Embedding `/readyz` | `ready` through the runtime | proven 2026-10-23 |
| E4 | Media through its fixture provider | One Media call | Routed and stored; the output is synthetic fixture data | proven 2026-10-25: `media__run` on `fake/text-to-image`, 9.8 s, artifact `image/png` 65,536 bytes, downloaded 200 with the same SHA-256 `c6ee57f0…`; synthetic fixture data |

## F. Installation and operations

| # | Check | How | Expect | Status |
|---|---|---|---|---|
| F1 | Our images come only from the local registry | Pod image references and kubelet events | `registry.veoveo-system.svc.cluster.local:5000/veoveo/…`; public images pinned by digest | proven 2026-10-23 |
| F2 | A single public host | DNS, and the routes of tunnel `veoveo-bioma-ai` | Only `veoveo.bioma.ai`; S3 under `/artifacts/`; `veoveo-objects` does not resolve | proven 2026-10-23 |
| F3 | Script clients are not blocked | Python default User-Agent to `/oauth/token` | Hub answers (JSON 400), not Cloudflare 403 1010 | proven 2026-10-23 |
| F4 | A config change needs no sandbox recreation | Rerun Hub's config seed on the same claim, then restart Hub | Files replaced; the claim and sandbox are kept | proven 2026-10-25: the installer's apply wrote Hub's files into claim `hub-config-v1` (created 2026-10-23) with its seed Job and restarted Hub; sandbox `hub` (created 09:04, before the apply) was kept ([record](records/2026-10-25-installer-first-apply.md)) |
| F5 | Hub's Lore CLI trusts Lore's TLS | A factory watch reads `openshell/` | Read succeeds (Hub `4d639af`) | proven 2026-10-25: D2 read Time's `openshell/` and served it ([record](records/2026-10-25-platform-tools-and-time-flow.md)) |
| F6 | Fresh install order | Follow the installation docs from empty | Lore is Ready after Hub serves its issuer; Hub needs no Computer template at start (read at entry since #13 part B; deleting `computer-v1` gave 503 with the cause and recreating it served again in 2.4 s with no Hub restart, 2026-10-23) | pending (next fresh install) |

## G. Model-driven acceptance (last)

Only after every deployed check above passes. Use `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro` in
the person's Computer, with no other model. Record the scenario input, the tool sequence
with timings, output identities and bytes, errors and their causes, and what was not
proved.

| # | Scenario | Expect | Status |
|---|---|---|---|
| G1 | The agent creates a server repository, pushes it, watches it serve, breaks it with a push, diagnoses it from `console__status` and `console__logs` alone, and fixes it with a push | Served again with no human help; every step uses only Hub's tools and plain `lore` | proven 2026-10-25, MiMo-V2.6-Pro ([record](records/2026-10-25-batch3-and-g1.md)); again 2026-10-26 on Hub `2739757` with the scope-free Lore token: three pushes, served, broken, diagnosed and fixed in 730 s, $0.08 ([record](records/2026-10-26-g1-rerun.md)) |
| G2 | Two agents share through a group: the owner's creates a group with the other person, creates and pushes a repository and shares it with the group; the member's finds it, clones it by name and pushes | Both succeed with only Hub's tools and plain `lore`; an independent clone shows both pushes | proven 2026-10-26 on OpenCode 2.0, MiMo-V2.6-Pro: 281 s and 91 s, 31 tool calls all completed, $0.025 ([record](records/2026-10-26-sharing.md)) |
