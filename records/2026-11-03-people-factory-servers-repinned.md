# 2026-11-03: People's factory servers moved to the new stack by the platform owner

After the skills and Work Context sweep
([record](2026-11-02-skills-and-work-context-sweep.md)), people's own factory servers still
pinned the old SDK `581fdcb`, core `d473011` and rmcp 3.5.0. The owner chose to move them for
the people rather than ask them to: these are test servers, so a repository that was awkward
to port could be replaced by the template.

## State before (01:08Z)

- None of the six served. Every branch answered "No instance … nobody watches the
  repository": no watch had been made for them after the cutover, so this was not a failed
  build.
- Correction to the sweep record: the cutover's schema reset for these six servers did not
  complete. The script dropped each schema, then fed psql's "Output format is aligned." back
  as SQL and failed with exit 3, so the schemas were never recreated.

## What was done

1. Schemas recreated in one transaction (rc 0), each owned by `server_<slug>`:
   `drop schema if exists <slug> cascade; create schema <slug> authorization server_<slug>;`
   for hello, josue, procesos, tareasjonathan, toolbox and template.
2. Each repository ported to SDK `a85b72d`, core `05b6c47` and the rmcp fork `d45f7f5`
   (3.8.0): the workspace pins and one SDK in each lock; one line for the registration's new
   `surfaces` field, as in the template; `.sqlx` regenerated against core `05b6c47`. Work
   Context appeared only in the old cached core queries, never in their source. Their own code
   is otherwise untouched; no migration needed folding. The template repository was replaced
   with template main `fdb7df8` at SDK `a85b72d`.
3. Pushed with Lore by the owner's account from its Computer, after `console__watch` on each
   repository. Commit message: "Platform update: SDK a85b72d, core 05b6c47, rmcp fork d45f7f5
   (3.8.0) … (done for you by the platform owner)".

| Repository | Slug | Branch | Revision | Pushed | Serving |
|---|---|---|---|---|---|
| mcp-rust-template `d4175ec2` | template | main | r3 `ebdb1787` | 01:14:37 | 01:21:17 |
| hello-jonathan `8bc2757f` | hello | main | r5 `3c8c92cd` | 01:16:15 | 01:22:56 |
| hello-josue `01a1898b` | josue | main | r2 `909c715a` | 01:16:16 | 01:22:41 |
| gestion-procesos `01a189e5` | procesos | main | r2 `d9fad3f6` | 01:16:18 | 01:22:53 |
| tareas-jonathan `01a18939` | tareasjonathan | main | r2 `7aba43a1` | 01:16:19 | 01:22:52 |
| tareas-jonathan `01a18939` | tareasjonathan | v2 | r3 `51565673` | 01:16:20 | 01:22:45 |
| veoveo-toolbox `52395356` | toolbox | main | r2 `f70c1ce4` | 01:16:21 | 01:23:00 |
| veoveo-toolbox `52395356` | toolbox | v2 | r3 `4cfde60e` | 01:16:22 | 01:22:59 |
| hello-name `387b6bfd` | – | main | not pushed: empty, no server | – | – |

Each push took 85–248 ms; push to serving took 6.5–7.3 min, with all eight release builds
compiling cold on the box at once. At 01:24Z every branch showed phase ready, serving revision
equal to applied revision, the process running, 0 restarts and no failure. The Hub lists
tools for each slug: hello 2, josue 2, procesos 3, tareasjonathan 5, template 1, toolbox 4.

## Deployed calls (01:27Z)

One read-only call per server through the Hub as the owner's account, default selection, one
cold sample each. These servers hold no data, so the empty results show only that each answers
with the right shape.

| Slug | Call | Result | Latency |
|---|---|---|---|
| hello | `hello__say_hello {"name":"qualification"}` | `{"greeting":"Hello, qualification!",…}` | 240 ms |
| josue | `josue__saludar {"nombre":"qualification"}` | `{"saludo":"¡Hola, qualification!"}` | 254 ms |
| procesos | `procesos__resumen_procesos {}` | all counts 0 | 346 ms |
| tareasjonathan | `tareasjonathan__list_tasks {}`, `task_summary {}` | `{"tasks":[]}`, all counts 0 | 279 ms, 384 ms |
| toolbox | `toolbox__count_text {"text":"qualification probe"}` | `{"characters":19,"lines":1,"words":2}` | 414 ms |
| template | `resources/read template://items` (its one tool writes) | `{"items":[],"limit":100,"nextCursor":null}` | 227 ms |

The v2 branches of tareasjonathan and toolbox serve but were not called.

## Component tests (local, PostgreSQL 18, offline queries)

`cargo test --locked --all-features` and the release build pass for hello (19), josue (20),
tareasjonathan main (22) and v2 (23), toolbox main (22) and v2 (25) and template (20).
gestion-procesos passes 17 and fails 3, the same 3 that fail on its original tree with the old
stack, so they are its owner's: a multi-line `-- veoveo:` marker in `resumen.sql`, a test that
expects tool order crear, cambiar, resumen where the list is alphabetical, and a test that
compares a page against values recorded before a state change.

## Unplanned

- The template's first push (r2 `ea659503`) carried four macOS AppleDouble files (`._*`)
  from the Mac's tar; r3 removes exactly those. The other pushes were built without them.
- Behaviour of the new rmcp and SDK: a tool's `invalid_params` error now arrives as a JSON-RPC
  error, not as an `isError` result.

## Access and caps

- Write assignments added for the owner's account on hello-name, hello-josue,
  gestion-procesos, tareas-jonathan and veoveo-toolbox (control plane `gcp-01a19e8e…`); the
  hello-name one removed again (`gcp-01a19f01…`). The other four stay: Hub watches those
  repositories as the owner's account, so later pushes by their people rebuild only while that
  account can read them. Each can go once its person watches the repository themselves. The
  people's own assignments were not touched.
- The owner's account is now the latest pusher of ten instances, above the per-person cap of
  four. The cap only warns today; with `caps.enforce` on, new instances it pushed would be
  refused.

Scripts and outputs: box `~/k3s-builds/factory-repin-20261102/`.
