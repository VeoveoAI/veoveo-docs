# Integrated Hub checks on Mac and Linux

Hub `c23d9ae0f9a50a2a7f2d53e8840279dcfc37090e` passes the full repository check
after merging the linked-runner and Computer Apps changes and correcting the two
discovery-watch defects. Its tree is `89f58221a5f2b8f0780eb044947f41587351fb03`.
This record adds component qualification; it does not report a deployment or a new
formal theorem.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/integrated-native-checks-20261031.json)
records commands, source maps, output identities, named regressions and both logs.
GPT-6.1 Sol implemented the fixes; GPT-6 Luna ran the unattended checks; GPT-6 Astra
reviewed the evidence and matched all 839 nonproof inputs to the qualified source.

## Execution

Both hosts ran `docker build --target check .` from the same 9,472,000-byte source
archive, SHA-256 `1303701fc9ada382923e82baffb5f47ee3950a5e8fcfb880ccec5cb25682d3c8`.
The 1,144-file source and Docker context maps were unchanged before and after each
run. Linux built on Ubuntu itself; the Mac used Docker Desktop. Each built a Linux
container for its host architecture, with no forced platform or emulation.

- Mac: exit 0 in **179.237 s**; Nextest **454 passed, two skipped** in **35.637 s**.
- Ubuntu: exit 0 in **197.801 s**; Nextest **454 passed, two skipped** in **43.341 s**.

The checks cover Core and Hub migrations in private PostgreSQL 18, SQLx metadata,
formatting, strict all-target/all-feature Clippy, dependency policy, feature
combinations and the CI Nextest suite. All six named discovery-watch/subscription
regressions pass on both hosts: live publication, stale admission, publication
during the mutex wait, independent linked deployments, independent selections of
the same link, and subscription reconnect after an ended catalog source.

The local check image IDs are
`sha256:9a41e15191d3ab3ad696ac2767fd21450e9d5cb51ec84548e14ad6e0b676e58a`
on Mac and
`sha256:b60cccc4d34a22834708c09fe0f95aaa3b6393ecf2b98695365ef2972d23a28e`
on Ubuntu. They are check-stage images, not published deployment images.

The Mac log is 486,675 bytes, SHA-256
`40114701339f4aa2902e54372571002f802b9a32bf9cd5028d68d3abc989e0ef`;
the Linux log is 486,679 bytes, SHA-256
`497a11b7e9e9232a75b89259b496f7c6a05c22b3895add09decd973a23f5d41f`.
Both logs retain named results and aggregate counts. JUnit was not captured; the
attempted image-root path was absent, and the actual report location was not
inspected. No claim that Nextest failed to emit a report follows from that attempt.

## Warnings and limits

Dependency policy reported allowed duplicate dependency versions and an unused
NVIDIA OpenShell source allowlist entry; the lockfile uses the VeoveoAI fork.
These were nonfatal. Neither check timed out or required a source correction.

The existing Lean results retain their recorded source and model boundaries.
The optional link in cache keys, runner registration/selection and contributed
repository token flow need renewed formal correspondence checks on the current
source. Docker tests do not establish those proofs, arbitrary concurrent schedules,
SQL refinement, or deployed/browser behavior. No model calls or deployment were
performed. The subsequent receipt and status edits change no nonproof build input.
