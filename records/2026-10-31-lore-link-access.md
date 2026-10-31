# Lore links: access stops at a linked repository, and a refused link aborts the clone

2026-10-31 (UTC), 18:24. Coordinator: Claude Code (Opus 5.5); the probe was written and
run by a build agent (Claude Code, Sonnet) and reviewed by the coordinator. Plan section 14,
its first step; checklist J1.

## What was run

On the deployment, in two people's Computers, with the Computers' own Lore CLI (`lore
0.10.2-nightly+local`) and Lore credentials, and the Hub's Console tools through
`veoveo-hub-sdk-cli`. Probe scripts and log on the box: `~/k3s-builds/links-20261031/probe/`.

| Person | Computer |
|---|---|
| M, `alex.rozgo@vrx.group` | `cdjdlsct62djm3cnhv5` |
| A, `rozgo@bioma.ai` | `c4itoit73lpkaheav7u` |

1. M created `j1-parent-1824` (`d06132d740571395bd24b59ecef85550`), `j1-a-1824`
   (`f7726008385003b6341cb29dcad2003e`) and `j1-b-1824` (`f021642c0b57ed87703a0c81f13fc7aa`)
   with `console__create_repository`, and owns all three.
2. M committed `a.txt` ("team a") to `j1-a` and `b.txt` ("team b") to `j1-b`, each in
   revision 1. In `j1-parent` M added `README.md` and linked both repositories at their
   root with `lore link add --non-interactive a …/<j1-a> /` (163 ms) and `… b …/<j1-b> /`
   (147 ms), then committed (revision 1, `16aa6348…`) and pushed (212 ms, 343 bytes). Each
   link created branch `main-b84661292cb5c9b9316da717e9684ffb` in its linked repository and
   pinned it there in tracking mode. M's tree: `README.md`, `a/a.txt`, `b/b.txt`.
3. M gave A `member` on `j1-parent` and `j1-a` with `console__share_repository`, and nothing
   on `j1-b`; `console__repository_access` on `j1-b` lists M alone.
4. A cloned the parent, then tried `j1-b` directly.
5. M gave A `member` on `j1-b`; A synced the first clone, then cloned the parent again.

## Results

| Step | Command, as A | Result |
|---|---|---|
| 4 | `lore clone …/<j1-parent>` | rc 255 after 2902 ms. It cloned link `a`, then failed on `b`: "Failed to load revision state: Not connected to remote: … h2 protocol error … Reset(StreamId(21), CANCEL, Remote)". Left on disk: `README.md`, `a/a.txt` with "team a"; `b` absent, not a node, not an empty directory |
| 4 | `lore link list`, `lore link info b` in that tree | rc 255 after 2656 ms and 2808 ms, the same stream reset; `link list` printed `a` before failing |
| 4 | `lore status` in that tree | rc 0, "Local branch in sync with remote" |
| 4 | `lore clone …/<j1-b>` | rc 29 after 2637 ms, no directory: "Not connected to remote … CANCEL … Repository not found" |
| 5 | `lore sync` in the first clone, after the grant | rc 0 in 39 ms, "Already on branch main latest revision 1"; `b` still absent |
| 5 | `lore clone …/<j1-parent>` again | rc 0 in 279 ms, "Clone link … in a", "Clone link … in b", 3 of 3 files: `README.md`, `a/a.txt`, `b/b.txt`, one tree |

## What it proves

- The deployed Lore enforces access per linked repository. A grant on the parent gives no
  access to a linked repository: a direct clone is refused, and a clone through the link
  stops there.
- With a grant on every repository, a fresh clone of the parent is one tree.

## What it does not

- Lore's design says a person without access to a linked repository sees its link and
  cannot descend. On this Lore the whole clone fails instead, leaves a partial tree that
  `lore status` and `lore sync` report as in sync, and does not heal after a grant. Lore's
  roadmap lists per-link access as in progress.
- The refusal reaches the client as an HTTP/2 stream reset, reported as "Not connected to
  remote" and "Repository not found", not as a permission denial; each refused attempt took
  2.6 to 2.9 s against 0.28 s for a granted clone. Where the reset starts (Lore's server, or
  the Computer's credential path) was not traced, and no server log was read.
- `lore link update` on the partial clone and a view of the parent that reads link nodes
  without descending were not tried.

## Consequence for the plan

Section 14 does not depend on cloning the parent. A person's Computer clones the team
repositories they hold a grant on, one by one, and the parent stays the Hub's directory of
teams. The plan and J1's expected result say so, and the client's handling of a refused
link is a follow-up in the plan's "Later".
