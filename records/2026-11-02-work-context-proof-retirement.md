# Work Context proof retirement

The user requested one bulk removal of outdated Work Context proofs, one combined
check, commits, and cleanup of old Lean worktrees. The broad verification effort
remains paused. This retires obsolete active proof packages rather than porting
their generated models or adding new proof obligations.

## Changes

- Hub removed `current_roles`, `control_publication`, `refresh_transactions`,
  `request_composition`, and `task_continuity`: 209 tracked files.
- SDK removed `internal_auth`: 55 tracked files.
- Six README/index files now identify retained coverage, retired packages and
  immutable Git links to historical results and tooling. The Hub invariant IDs
  and roadmap anchor remain available. PLAN identifies earlier checkpoints as
  historical and retires the unfinished membership controls.
- Eight independent packages remain. All 133 retained Lean/configuration/manifest
  files are byte unchanged. No retained Lean import or Lake dependency requires a
  retired package. This change modifies no runtime Rust, SQL, Cargo pin or design.

Published commits:
[Hub `4126591`](https://github.com/VeoveoAI/veoveo-hub/commit/412659147fa43ea66ae543dd982a4e6536e57fcd)
and [SDK `e62f927`](https://github.com/VeoveoAI/veoveo-hub-sdk/commit/e62f927dbefd0996d48244cea673bdd9426d7b97).
Hub main advanced during validation with another agent's `ddb901c` Task
group/role change. The cleanup rebased without conflicts; that commit changes no
proof inputs. Its runtime behavior is not qualified by this proof run.

## Single combined check

GPT-6.1 Sol performed the scoped cleanup; GPT-6 Luna executed the unattended Linux
check; the coordinator reviewed the diff and independently matched all 17 mirrored
log byte counts and SHA-256 identities against the summary.

Inputs were frozen from Hub `b5c08321d752c9e42a817b076fe82b2d53900619` and SDK
`a85b72d37bb8e8a90c5c46ed6f1984aae7da9250`, with the bulk removal applied.
The manifest SHA-256 is
`e087a109ca40edc55831ea1b8cc1ce9d37ae45bd09e182fb261f052933cc0c1d`;
the retained source map is
`46420975b2bcf63883b194a70b04d08a3e03fbe452003512e27a910cbc41711c`.
All 256 mapped retained files matched before and after the run.

The existing Linux Lean 4.35.0 / Lake 5.0.0 toolchain (`eb6cafb`) and pinned
dependency caches were used, including the previously qualified Aeneas `fdebf20`
checkout with Discriminant source SHA-256
`467f244cc2103c050f38e732c153712c5c9fbbccc0ca0827d5c32990b174f411`.
No new tool patch or dependency version was introduced.

One driver invoked `LAKE_NO_UPDATE=1 lake build` with every existing declared
target in each retained package, followed by the nine discovery-cache manual
`lake env lean FILE -o .lake/build/lib/lean/STEM.olean` commands in README order.
That is one validation round: 86 named Lake targets and nine manual leaves,
17 command stages, each bounded to 180 seconds. All returned exit 0, without
repairs or reruns. Total recorded wall time was 262 seconds; command time summed
to 261.689 seconds:

- Hub authority: 23.650 seconds.
- Hub selection: 7.576 seconds.
- Hub discovery cache, including its nine manual leaves: 31.240 seconds.
- Hub Factory lifecycle: 97.751 seconds.
- Hub registration transactions: 63.969 seconds.
- Hub Computer lifecycle: 10.782 seconds.
- SDK authorization: 17.392 seconds.
- SDK repository-grant details: 9.329 seconds.

The local evidence mirror is
`/tmp/hub-work-context-proof-retirement-20261102/aggregate1-mirror/`.
It contains the runner, manifests, summary, preflight, receipt, 17 logs and eight
artifact inventories. The summary is 53,313 bytes, SHA-256
`5e27bb756ec46a82fd2657f90b953a408545e33f8d4c3df6cd4d5bcaeb4e42ea`.
The run receipt SHA-256 is
`51963ef7fa269f8e42b8529ab8f48299f6ec709e0e1891fc48f7b6d2940bb1a5`;
the temporary runner SHA-256 is
`345b673ee2a454d13465435225225c0f30ce3017ff5d63b22656d26f56e68da2`.
No runner or automatic proof gate was installed in a repository.

This checks retained historical Lean models after package removal. It is not fresh
Rust extraction, SQL refinement, current whole-Hub verification, or coverage of
the new Skills and Task group/role behavior. No native test suite, deployment probe
or model-driven acceptance was run for this proof/documentation-only change.

## Cleanup

The coordinator inspected all 20 local workspace repositories: no Lean/proof
worktrees or local branches remained. Hub and SDK origin also advertised no such
branches. The unrelated active worktrees and another agent's untracked embedding
record were preserved. The six removed canonical package directories have no
ignored leftovers.

The builder removed this run's Linux source staging, dependency-overlay symlinks
and source archive, and both local source archives. Logs and compact inventories
remain. No Hub/SDK/Docs Git checkout existed at the known Linux build paths; the
prior SDK-adoption source parent was a non-Git snapshot. No orphan application
proof worktree was found there. The qualified Aeneas dependency checkout has only its detached
root and was preserved with its required patch and reusable caches.

Historical dated records are unchanged. Removed proofs remain in Git history;
no unfinished membership-control work remains active.
