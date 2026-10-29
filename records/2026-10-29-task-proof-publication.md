# Task proof source publication

The user requested committing and pushing the Task-continuity work to `origin/main`,
with deployment performed by another agent. On 2026-10-29 the exact qualified source
was committed and published:

- Hub `ee0bdf3b4f800ee31ed0e3017407a646244fd023` — production Task decisions,
  regressions, designs, proof package, semantic controls and evidence.
- SDK `8489a58d12f880e88bb71b226c720e57a5399084` — the private recipient decision,
  verifier integration and its design.

Both remote `refs/heads/main` identities were independently read back with
`git ls-remote` after their successful fast-forward pushes. SDK was pushed first;
Hub followed at approximately 19:52 UTC after its remaining checks passed. The
documentation commit containing this record also contains the original
[Task qualification record](2026-10-29-task-continuity-proof.md) and the updated plan.
The other agent's unrelated embedding record was left outside this commit.

## Checks before publication

The existing Hub and SDK `AGENTS.md` instructions require
`docker build --target check .` on macOS and Linux before pushing. The configured
GPT-6 Luna `/root/builder` ran those four commands unattended with logged results;
the configured Astra coordinator reviewed source identity and results and performed
the commits and pushes. No new source implementation was required. The configured
GPT-6.1 Sol coder's earlier implementation and proof work is documented in the
qualification record.

Inputs were full `git archive` snapshots of the committed source, with identical
archive hashes verified on both hosts. Each was extracted into its own temporary
context, outside the shared checkouts. Linux compiled on the actual x86_64 machine;
the Mac used Docker Desktop's ARM64 environment. No images or binaries were
transferred between hosts. Each host checked SDK before Hub; the hosts proceeded
independently using their existing BuildKit caches.

| Source | Host / architecture | Exit | Elapsed | Nextest result |
| --- | --- | --- | --- | --- |
| SDK `8489a58` | macOS / ARM64 | 0 | 156 s | 279 passed, 3 skipped |
| SDK `8489a58` | Linux / x86_64 | 0 | 203 s | 279 passed, 3 skipped |
| Hub `ee0bdf3` | macOS / ARM64 | 0 | 205 s | 357 passed, 2 skipped |
| Hub `ee0bdf3` | Linux / x86_64 | 0 | 162 s | 357 passed, 2 skipped |

The full check targets passed, not only the individual Nextest summaries. These
durations include cached build/check work and are not performance benchmarks. The
initial Mac detached launcher exited before Docker started and produced no gate
result; a retained foreground tool session ran the actual logged SDK check. No
failed source gate or source correction was hidden by that launcher correction.

Source archive SHA-256:

```text
SDK (183 entries) f5bdea3b951bea449e84b523f6a265bac94a5af8516f69f75329c676b9537e06
Hub (865 entries) 573262a344ed33f931953c08552e03bcce514f3b6b9bac07d7cdf0cad36f04c0
```

Check-stage image identities, in the same order as the table:

```text
SDK Mac   sha256:14749bee41126142d5dfa35fdd4ce2b462957088a18beb44c774f94567329b75
SDK Linux sha256:8f1dc044a2fe361fcb14b7a8d10ec3a0a5c30ced7bc428f7e86012a6dedda2de
Hub Mac   sha256:87bb07971cf59633cbb8c41b666146c93bd341fc4950f9520553d3522b50f638
Hub Linux sha256:db21f281279854a82cb123c963c18c3c68a55e57a1f861dd2614e59b83d2f00c
```

Logs and metadata remain in `/tmp/hub-check-validation-20261029/logs-mac/` on the
Mac and `/tmp/hub-check-validation-20261029/logs-linux/` on Linux. Each directory
contains `sdk-check.log`, `hub-check.log` and corresponding `.meta` files.
Log SHA-256:

```text
SDK Mac   9d06c5eba7c15d5d4baffd2f5e6022272830a8c756bd1769ef4f61d333b33805
SDK Linux 68449e6cb079c6aee11d387f8954aa43c837dbcf34f2b24b2435daecb27e8d7d
Hub Mac   d1142a5f4589840863a3ced09ff3018df0a55eeb68be44b1a5e2965e8c2fe3ca
Hub Linux 4e9cf47ea55f7b2e1cd532bf5ae7cc970a5163608079ae56f0d078c503a21cec
```

## Deployment handoff and proof boundary

No deployment, runtime image publication or qualification-model calls were made.
The images above are local check-stage artifacts, not deployable release evidence.
The other agent owns deployment.

Hub's SDK dependency remains
`a41c9cc6c81f6c0305dd41165defb142740ed6b1`; publishing SDK `8489a58` does not
automatically repin Hub or downstream MCP servers. There is no wire-contract change
or data migration in this slice. The two-source proof uses the exact SDK recipient
source recorded in its receipt, rather than claiming that the unchanged dependency
pin contains that private refactor.

The [manual proof package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/task_continuity/README.md)
and its source/model/handwritten proof bytes are unchanged from the accepted
qualification. Those proofs and semantic controls were not rerun merely to publish
them. Full repository checks add component evidence; they do not enlarge the formal
boundary or constitute deployed acceptance. The
[coverage map](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/README.md)
continues to mark the overall Task property partial, with the assumptions and
unbenchmarked label-scan cost recorded in the original qualification.
