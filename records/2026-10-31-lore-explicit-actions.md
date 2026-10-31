# Lore follows Epic's main: explicit actions, read-only sharing, deployed

2026-10-31 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Checks, images, deployment and probes: a build agent
(Claude Code, Sonnet). Plan section 14, its first slice; checklist C14, with C4, C8, C9, C10
and J1 run again.

## What shipped

| Component | Commit | Change |
|---|---|---|
| VeoveoAI/lore | `c33e017a` | Merge of our `4ee9f338` with Epic's `b8fc623d`, 70 upstream commits since 2026-10-18. Our 19 commits are kept. Every write needs `write`, a protected push `push-protected`, and deleting a repository or protecting a branch `owner` or `admin`; any token for a repository reads it (`483c96ff`). Also the distrusted eMudhra roots and dependency advisories, endpoints that must authenticate the server, store and client fixes, and upstream's OIDC refresh in place of ours |
| VeoveoAI/veoveo-hub | `a9090ce` | Lore tokens carry Lore's explicit actions: a `reader` `[]`, a `member` `["write"]`, an `owner` `["write","owner"]`, for people and groups alike. Assignments may also carry `admin`, `push-protected`, `obliterate` and `migrate`. A creator gets `write` and `owner` |
| VeoveoAI/veoveo-hub | `8f39fb9`, `02e6810`, `33293ab`, `467dd29`, `d25b6f5` | What the Hub's check needed (below) |
| VeoveoAI/veoveo-core | `477a37f`, `422dcf2` | A server slug holds no `__`; the database conformance check knows `pg_catalog` |
| VeoveoAI/veoveo-hub-sdk | `5572a22`, `ec86fe3`, `9a3cbaa` | Core re-pins and the linked-server APIs, which nothing deployed uses yet |
| VeoveoAI/veoveo-mcp-console | `d8f8a87` | `share_repository` accepts `access: "reader"` |
| Installations | template `aae97b9`, BiomaAI `a481aaf`, `c1e3938` | Design text: the per-repository authorizer grants a token's permission plus read, and `implicit_actions` stays unset; the lock and the Computer version's release note |

The Hub's check (`docker build --target check`) failed three times before it passed. Each
cause predated tonight's change:
- **`cargo deny`, RUSTSEC-2024-0449.** `unsafe-libyaml` is now listed as unmaintained. It comes
  through `serde_yaml` 0.9, from the Hub's `providers.yaml` parsing and from `kube` 0.99 via
  `openshell-crypto`. `02e6810` adds a reviewed exception, and the plan's "Later" moves both
  off it.
- **Database conformance, 17 violations.** They were in test SQL added with the Hub's Lean
  proof work on 2026-10-30 (`fb9366e`, `05737d6`, `f6e679e`), which reads whole fixture
  databases and PostgreSQL's own views. `33293ab` adds the markers. Core `422dcf2` teaches the
  checker `pg_catalog`, whose relations obey the bounds rule but not the tenant rule, and
  `467dd29` takes that core.
- **`sqlx prepare --check`.** Core `4ebcf89`'s operation queries are part of the Hub's
  `.sqlx`. `d25b6f5` regenerates it with the check stage's own steps, from a fresh clone on the
  box: 4 entries removed, 5 added, the rest byte-identical.
- **Two clippy findings.** One came from the proof work (`a9327b2`, `policy/session.rs`) and
  one from the requested-providers change (`cd363a2`, `tests/factory.rs`). `8f39fb9` fixes
  both.

## Checks

| Check | Result |
|---|---|
| Lore, box | `cargo clippy --locked --workspace --all-targets -- -D warnings --no-deps` clean, 123 s. `cargo test --locked --workspace` 5325 passed, 0 failed, 29 ignored, 79 s. The first run failed on the box's `ulimit -n` of 1024. Smoke `uv run pytest scripts/test -m smoke`: 1338 passed and 2 failed, both from the box's revoked keyring warning |
| Hub `d25b6f5`, box and Mac | `docker build --target check .` rc 0 on both. Box 189 s; nextest 432 passed, 2 skipped |
| Console `d8f8a87`, box | Check rc 0, 28 of 28 tests |

## Deploy

Images in the in-cluster registry:
- Lore `sha256:c06142c9…` (`lore 0.12.1-nightly+local`);
- Hub `sha256:69b59ed2…`;
- Console `sha256:6af326c0…`.

BiomaAI's installation `c1e3938` pins them. It was committed from a Mac clone, because the
box's GPG pinentry timed out. `plan` showed 14 of 18 steps matching, and the 4 that differed
were the expected ones:
- Lore's image;
- the `computer-v1` and `factory-v1` templates (the Lore volume and the release note);
- the Hub's image and Lore volume;
- Console's image.

`apply` made 5 changes in 56.0 s: Lore 9.0 s, the Hub's sandbox 20.9 s, Console's 21.0 s.
The next `plan` answered rc 0.

The assignments in the control plane were written under the old meaning, where an empty
action set pushed. Republishing gave them the actions their levels now mean, through
`POST …/control-plane/validate` and `PUT …/control-plane` with `If-Match`. Revision
`gcp-01a19334…` became `gcp-01a19390…` at 20:04:36 (200 in 365 ms). Of 24 assignments:

| Before | After | Count |
|---|---|---|
| person, `[]` | `["write"]` | 5 |
| person, `["owner"]` | `["write","owner"]` | 17 |
| group, `[]` | `["write"]` | 2 |

A diff of the canonical documents, without `lore.assignments`, was empty. A second count by
key reported 6 differing keys outside the assignments; it contradicts the diff and was not
explained.

## Probes

The two people of the earlier records each ran Lore in their own Computer:
- M, `alex.rozgo@vrx.group`, Computer `cdjdlsct62djm3cnhv5`;
- A, `rozgo@bioma.ai`, Computer `c4itoit73lpkaheav7u`.

| Check | Result |
|---|---|
| C9 | M's `lore repository create` (`01a19391…`) 328 ms. Push 126 ms, clone 70 ms. The Hub records M as `owner` |
| C4 | Shared with A as `member`. A cloned (265 ms), committed and pushed revision 2 (129 ms) |
| C14 | `la-reader-2005` (`90c4f28b…`) shared with A as `reader`, `actions: []`. A cloned (233 ms). A's push was refused, rc 255 in 53 ms: "putting fragment to remote: Failed to store fragments … h2 protocol error … Reset(StreamId(11), CANCEL, Remote)" |
| C10 | A, a member: `lore repository delete` rc 17, "Not authorized to access repository", and the repository stays. M deleted it ("Repository deleted successfully", 153 ms); a later clone gave "Not found", and `console__repository_access` 404 |
| Existing data | A owns the n8n server's repository (`e5f7919c…`, one `owner` assignment). A cloned it (175 files, 309 ms) and pushed branch `la-probe-2005` (193 ms) |
| C8 | A pushed a README-only revision to the n8n repository's `main` at 20:13:48.311. The instance stopped at 20:13:49.6, started at 20:14:04.2, was ready at 20:14:07.2, and applied and served the revision at 20:14:08.4, about 20 s after the push. Its sandbox kept its name. An earlier README revision also applied, but its timing poll failed: it ran `jq` inside the Computer, which has none |
| J1 | The same as [before](2026-10-31-lore-link-access.md): a parent clone without a grant on one link failed at that link (rc 255, 2890 ms) with the same partial tree. A direct clone was refused, `lore sync` did not heal after the grant, and a fresh clone afterwards was one tree |

## Boundaries

- **The tokens' contents were inferred.** The Hub's Lore tokens were not inspected; their
  actions follow from the access records and from what Lore allowed. No Lore server log was
  read.
- **Refusals look like network faults.** A refused push and a refused link both reach the
  client as an HTTP/2 stream reset. The client says "Failed to store fragments" or
  "Repository not found", not that access was denied. A reader's local commit also printed
  six "Reconnecting … attempt 1 / 10" lines before succeeding.
- **Some clones were slower.** A clone of an empty repository took about 2.2 s, against
  0.23 s in the first J1 run. Not investigated.
- **The CLI image is unchanged.** The lock's `veoveo-hub-sdk` revision and its CLI image stay
  where they were. Nothing deployed uses the SDK's new linked-server APIs.
- **The caps warning was not checked.** `console__status` warns that the n8n instance's
  pusher is "the latest pusher of 6 instances, above the cap of 4". The warning predates
  tonight.
- **Leftover test data.** These disposable repositories remain:
  - `la-reader-2005`;
  - the J1 rerun's `j1s-*` (`baedea90…`, `dae5a6c7…`, `fd43922f…`);
  - three orphans of a failed probe start, `j1r-*` (`f2c36fb1…`, `65d769c6…`, `9d69383c…`).

  The n8n repository keeps revisions 10 and 11 (README lines) and the branch `la-probe-2005`.
