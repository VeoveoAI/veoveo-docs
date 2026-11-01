# SDK proof history published without replacing current runtime

SDK `4e84876c050f0fe4431d411758d363bb14ea5207` merges the 15 local proof commits
through `e82ceb89` with upstream `db64f9ee` and is pushed to `origin/main`.
An independent `git ls-remote` matched the local main SHA after publication.
The local and remote histories had diverged; the merge retains both histories.
It adds no runtime behavior relative to the upstream parent.

GPT-6.1 Sol prepared the merge, GPT-6 Luna ran both native checks, and GPT-6 Astra
reviewed source identity, evidence and publication. The
[SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/published-history-integration-20261031.json)
records exact source, commands, hashes, results and boundaries. Receipt SHA-256:
`3a41489f1b8bff2080d2375f4a0013203bb0aab4ab38407926c501f9e3f7c1ac`.

## Source and proof scope

The single textual merge conflict was in the private claims constructor. The
complete upstream file was retained, including its new repository-grant assembly.
The auto-merged request-context file was also restored to its complete upstream
version. Thus neither the older private parameter rename nor the equivalent
String-construction proof preparation is carried into the newer runtime.

All 157 nonproof paths, file modes and contents match upstream `db64f9ee`.
All 74 pre-existing proof paths are retained; only their internal-auth README is
updated, and a new receipt is added. Historical generated models, theorems and
evidence are unchanged and apply to their recorded revisions and assumptions.
Publishing them does not formally qualify the newer linked-repository flow.

`db64f9ee` differs from the extraction source `7360c0f` only in the Apps design
document; runtime and Cargo inputs are identical. The new proof work targets
repository-grant issuance and decoded-claims identity reconstruction. No current
issuer/verifier theorem is established by this merge. Hub's SDK pin is unchanged.

## Measured native qualification

Both hosts ran `docker build --target check .` from the same archived pending-merge
tree `ce54d40681c045fec3322c1d2b1a59fa4d0976b9`, containing 231 files. The archive
SHA-256 is `8ff95e6d6cdd046314420debdb2e8e810dc70fc233d4d2cf770641599a7e9d68`.
The full source, Docker context and 157 nonproof inputs were unchanged after each
run. The final commit adds only proof documentation/evidence after that checked tree.

- Mac Docker Desktop: exit 0 in **174.742 seconds**; Nextest ran **328 tests**, all
  passed, with **three skipped**, across 22 binaries. The test phase took 20.874 s.
  Log: 277,944 bytes, SHA-256
  `1ce9282f5af69358f457904d34ee7d63204e19e6944e20d38e6f5903463cb7f0`.
- Ubuntu Linux: exit 0 in **62.029 seconds**; the same **328 passed, three skipped**,
  across 22 binaries. The test phase took 21.138 s. Log SHA-256:
  `1286e755cf93e9b51c7fa8ef6779b0451e7711f96ab7d0da95645564fb60a48e`.

The checked Docker stage performs locked dependency fetching, formatting, strict
Clippy, dependency policy, per-feature checks and Nextest. The existing bounded
Docker runner was reused with SDK source paths and identities. No new permanent
runner or CI integration was added. These are native component checks in Linux
containers on both hosts, not fresh Lean checks, deployment or model-driven acceptance.
There were no paid model calls and no deployment. The newer linked-token proof
scope remains open; the unchanged historical proof packages were not rerun.
