# The Computer agent learns how to clone from Lore and whom it works for

2026-11-02 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Probes, images and deploy: a build agent (Claude
Code, Sonnet). Reported by the owner from their Computer: asked which repositories it
could clone, OpenCode answered `git clone "$VEOVEO_LORE_REMOTE/<id>"`; asked "who am I?",
it searched for six tool calls before answering.

## What shipped

| Component | Commit | Change |
|---|---|---|
| Computer handbook, template and Bioma | `d6f9cae`, `060217c` | `$VEOVEO_LORE_REMOTE` is a Lore endpoint, not a Git remote; `lore clone "$VEOVEO_LORE_REMOTE/<repository ID>" <destination>` with `--branch`; `lore stage --scan .`, `lore commit "<message>"`, `lore push`, `lore sync`; Git works for other sources, and a Git checkout comes into Lore after `.git/` is listed in `.loreignore` |
| Computer handbook, template and Bioma | `508b63d`, `90665fe` | Groups and repository access change while a Computer runs: `console__groups` and `console__repository_access` read them when needed |
| veoveo-hub | `d116b5c`, `5c72d75` | A Computer's own client receives, after the handbook, `## Who you work for`: the person's name and email (`hub.person`), principal, tenant, the Computers' Work Context and the Computer's ID. `d116b5c` also named roles, groups and the version; the owner rejected facts that change during a session in instructions a client reads once per connection, and `5c72d75` removed them and the groups seam. `d116b5c` was never built |
| BiomaAI installation | `adce86a` | Hub `5c72d75`, image `sha256:72a5e550…` |

## Checks

| Check | Result |
|---|---|
| Git checkout into Lore, in the owner's Computer | `.loreignore` holding `.git/`; `lore repository create`, `lore stage --scan .` (2 files: `.loreignore`, `README.md`), commit, push; a fresh `lore clone` held `.loreignore` and `README.md` and no `.git`. Both probe repositories deleted |
| Hub `5c72d75`, box | `docker build --target check .` rc 0, 341 s, 476 passed, 2 skipped; deny clean |

## Deploy

- **Installer login.** The installer's stored administrator sign-in expired at 22:05:23 on
  2026-11-01. It was renewed with `veoveo-installer login`, approved through the owner's
  existing browser session; the grant's subject is `624e4793…` (`rozgo@bioma.ai`) with
  roles administrator and operator.
- **Handbook.** `plan` showed one changed step, hub-control-plane (handbook 5,024 to 5,708
  bytes); `apply` 5.1 s; control-plane revision `gcp-01a19a9c-16c5-7532-a1a6-e67471c7f6d5`.
- **Hub.** `plan` showed the Hub sandbox image and the handbook (5,708 to 5,915 bytes);
  `apply` 24.2 s, the Hub sandbox ready 19.0 s after recreation; the next `plan` matched 18
  of 18 steps.

## After the Hub restart

| Probe | Result |
|---|---|
| Health | `/livez` 204; `/readyz` 200 with 18 servers and 2 profiles. 589 log lines, 0 ERROR, 2 WARN: a watch on a deleted repository, and the deliberate deep-link probe repository. No migration applied at start |
| Catalog, as the owner | 75 tools from 13 servers, no discovery error |
| Team run, as M | `n8n__team-a__run` `hello-run` rc 0 in 777 ms |
| Time's main | `console__status`: serving `d9c079137cdc`, phase ready |
| The section | Read from the Hub's answer to `veoveo-n8n-computer` in the owner's Computer (a client allowed on `/mcp/computer`): the 6,526-byte instructions hold the handbook's new text and end with the person's section naming Alex Rozgo, `rozgo@bioma.ai`, the principal, tenant `reference`, Work Context `reference-work` and Computer `01a16a8c-8de3-7153-afd6-cb2611105c4f`; no roles, groups or version |

## Boundaries

- **OpenCode's answers after the change were not observed.** A new chat asking "who am I?"
  and which repositories it can clone is the owner's check. OpenCode reads instructions
  once per connection; one connected before the Hub restart may need a Computer restart.
- **The proof session's six Hub changes shipped with this image** (Hub main from
  `18c6268` to `5c72d75`). The checks above found no fault in what they touch; nothing
  exercised their edge cases.
