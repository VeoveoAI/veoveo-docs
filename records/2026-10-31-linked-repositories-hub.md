# Linked repositories in the Hub: runners and routing per link, deployed

2026-10-31 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Checks, deploy and probes: a build agent (Claude
Code, Sonnet). Plan section 14, the Hub's links and routing (stages 2 and 3). No deployed
server reads a linked repository yet, so this records what is deployed and what still works,
not checklist J2 to J5.

## What shipped

| Component | Commit | Change |
|---|---|---|
| veoveo-core | `477a37f`, `422dcf2` | A server slug holds no `__`; the database check knows `pg_catalog` (the Hub pins `422dcf2`) |
| veoveo-hub-sdk | `ec86fe3`, `6e56e81` | Tool names `{slug}__{link}__{tool}`; an App's `{link}__{tool}`. A runner's forwarded token carries the caller's repository grant, an RFC 9396 entry of type `https://veoveo.ai/oauth/repository`, which the verifier exposes. A captured composition names one runner deployment per link, in format version 2, so existing records still read |
| veoveo-hub | `62584a4`, `ad68c04` (design), `78989d4`, `6483024`, `b10c8de` | **Runners:** a branch whose revision has links at its top level runs one runner per link instead of its instance (migration `0033`). A runner is built from the parent's program, with the parent checked out under a Lore view that leaves the links out. It serves the head of the branch the link tracks, cloned into `/sandbox/link`: the linked repository's branch of the parent branch's ID for a following link, or the branch of the pinned revision, read with `RevisionInfo` as the linked repository's watcher, for a pinned link. Each runner has its own database and the linked repository's providers and network rules.<br>**Lore tokens:** the instance token endpoint accepts a per-request scope naming the parent or the linked repository.<br>**Refusals:** a link below the top level, or a top-level link whose name is not a DNS label, is refused at prepare.<br>**Catalog:** the catalog lists a linked server once for each link the caller holds a grant on, projects names and URIs both ways, refuses an ungranted link, and keeps each Task on its runner |
| Installations | template `6516d1f`, `2691912`; BiomaAI `930a25f`, `db5e7fe`, `23813fe` | `factory-lore.yaml` gets the `request_scope` that Computers' Lore profile has, so a runner holds a token for each repository; the design and README text; the lock's Hub |

## Checks

| Check | Result |
|---|---|
| SDK `6e56e81`, box | `docker build --target check .` rc 0, 122 s, 328 passed, 3 skipped |
| Hub `78989d4`, box and Mac | rc 0; 437 passed, 2 skipped |
| Hub `b10c8de`, box and Mac | rc 0; box 220 s; 441 passed, 2 skipped; deny ok |

The fixture tests:
- `tests/linked.rs` runs the real binary with two synthetic runners:
  - a member lists only the team they hold a grant on;
  - forwarded tokens carry `actions: ["write"]` for a member and `[]` for a reader;
  - an ungranted link, a missing link and an unlinked name are refused;
  - resources are read under their link;
  - a Task stays on its runner.
- The coding agent also fixed a test hang it measured: a fixture dropped its database on
  the runtime thread while a connection on that runtime was half open, so every
  `DROP DATABASE` waited out PostgreSQL's 60 s authentication timeout. Before the fix, 3 of
  3 runs with 4 test threads failed; after it, 8 of 8 passed.

## Deploy

Hub image `sha256:f4a73bc2…` (`b10c8de`), in BiomaAI's installation `23813fe`.

`plan` showed two changes:
- step 13 `profiles`: `vv-factory-lore` gains `request_scope`;
- step 16 `hub`: the image.

Today's Hub would have refused a scoped token request, so the Hub went first:
1. `apply --step hub`, 20.0 s;
2. `apply --step profiles`, 1.0 s.

The next `plan` showed 18 of 18 steps matching.

## Probes

All probes ran as `rozgo@bioma.ai` from their own Computer.

| Probe | Result |
|---|---|
| A factory instance under the new profile | A README revision of the n8n repository (`7a1ad9e4…`), pushed at 21:54:01.1. The instance `bccd-aee3369273a5` was ready at 21:54:12.3 and served it at 21:54:13.5, about 12.4 s after the push, with no failure. The token request itself was not captured |
| Hub calls | `veoveo-hub-sdk-cli tools` 531 ms. `time__resolve_time` answered in 421 ms |
| Lore in a Computer | `rp-probe-2155` created, pushed and cloned |
| Time's App | Without a session, `/apps/time/now` answered 401 `apps-sign-in-required`. The page itself was not opened |
| Parents with links, watched | `rp-parent-top-2155` (links `team1` and `team2`) and `rp-parent-deep-2155` (links `teams/one` and `teams/two`), neither with an `openshell/` directory. Both recorded "Lore refused to read the revision's tree: NotFound", and so did a plain repository without `openshell/`. That contradicts the design, where a revision without `openshell/run` has no instance. It is being fixed, and it hid the deep link's own refusal, which remains to be shown |

## Boundaries

- No runner has run on the deployment. The n8n runner will be the first program that reads
  `/sandbox/link`, and J2 to J5 wait for it.
- These have not been tested for runners: listens and resource subscriptions, completion,
  prompts and the app origin.
- The refusal of a link below the top level has not been seen on the deployment.
- The box's disk is at 76%. Tonight's build outputs are being removed.
