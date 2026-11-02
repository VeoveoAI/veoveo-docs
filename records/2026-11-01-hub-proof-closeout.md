# Hub proof checkpoint closeout

The broad verification effort remains paused at the user's request, pending better
Rust-to-Lean support. This closes the current repository checkpoint; it does not
complete the coverage roadmap. The [coverage report](2026-11-01-hub-formal-verification-status.md)
remains the inventory of established contracts, ten production correction groups
and remaining obligations.

The dependency correction and shared-package evidence are adopted. The checked
membership theorem is retained, and its original audit passes after exact source
restoration. **Both extra membership semantic controls remain unqualified and
deferred.** Their unsuccessful diagnostics are not counted as semantic detection.

## Completed package work

Hub commit `b4de0a2` adopts the exact previously tested request-composition Lake
manifest and records four successful commands: two current-role builds and two
request-composition builds, taking 20.60, 21.40, 3.48 and 32.82 seconds. The manifest
adds the existing `sdkInternalAuthProof` dependency at
`6afa18a0625265d2adae8916a22321a17e8e6418`; all prior revisions remain unchanged.
The authority package's normalized path names the same directory. The adopted
manifest SHA-256 is
`c54014a0f991232aa1b6fdd61fcb21b2fc7fb9bddc371ca6d49a4fc3182993e6`.

These are regressions of the recorded shared models, not qualification of newer
runtime issuance or asynchronous paths. All 114 effective source entries were
compared with the canonical checkpoint, including the tested manifest exception.
The raw after-map had a trailing literal backslash-n; the receipt identifies that
format defect and the matching parsed entries without altering the original file.
See the [shared regression receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/shared-model-regression-20261101.json).

The committed tool patch and its resulting source file have distinct hashes. The
937-byte naming patch hashes to
`1d21c956e3bbbcbff57f9185e8f784b772cd34302c4bda765a8a463fb1bdcb80`;
the patched Discriminant source hashes to
`467f244cc2103c050f38e732c153712c5c9fbbccc0ca0827d5c32990b174f411`.
The final receipt labels those separately. No new tool patch or dependency version
was introduced.

## Membership control outcome

GPT-6.1 Sol repaired isolated diagnostic fixtures; GPT-6 Luna executed bounded
commands on Ubuntu with pinned Lean 4.35.0 and the existing qualified Aeneas setup;
GPT-6 Astra reviewed the source changes and evidence. Original models, fault
expressions and acceptance statements were retained. No production Rust or SQL
was changed.

The intended cases were reversing membership-level comparison, causing a lower
matching level to win, and dropping a valid client selector, causing an otherwise
valid grant to disappear. Each required an independently compiled wrong-result
witness before running the unchanged acceptance proof against the fault.

The wrong-maximum diagnostic did not compile. Repairs progressed through concrete
slice evaluation, partial-function unfolding and exact-result proof evaluation,
but the final attempt still had helper equality and type-matching errors. Its
axiom guard correctly rejected unfinished proof terms. A small import/equation
probe established generic unfolding availability only; it proved no membership
behavior. These are unresolved Lean diagnostic-authoring errors, **not newly
discovered application bugs or established Rust translation failures**.

The final diagnostic exited 1 after 3.19 seconds. Its log is 30,862 bytes, SHA-256
`a318f00eead31d446cde17fde0c3e94f84fb6d1f78233c17535cb30837af69ce`.
No original negative acceptance check or dropped-client case ran. Further fixture
iterations were stopped instead of extending the wrap-up into a new investigation.
Failed diagnostic sources stay in temporary evidence and are not added as broken
Lean modules to the repository.

## Restored passing checkpoint

The builder reversed the private fault and harness changes, removed temporary
diagnostic sources and verified all 110 baseline files against Hub `6c0a1e1`.
The restored map hashes to
`3cfaf48cadc2e060ab6f91294ed73b6030efc80f8cae540b396d5181b2c2fd2d`.
The original `LAKE_NO_UPDATE=1 lake build WorkContextMembershipAudit` then passed
in **16.96 seconds**, with **48 guards and twelve standard-only axiom prints**.
The 24,113-byte log hashes to
`ad9162d3938ce09d2ede80a8d089d0d1cada0173202b425838e3335703cc44bc`.
Root independently verified both mirrored log byte counts and hashes.

The builder recorded the restored proof OLean as 479,768 bytes with SHA-256
`7917810a4b09cd2f2a2c0a152bd67411064bc82165e48b1faa74625d80e1b1f3`.
That artifact identity was measured on Linux; the OLean itself was not mirrored
for another independent byte check. An unused fixture OLean remains in the private
Lake cache, with no corresponding source or active target; it is not qualification
evidence. The source tree is restored and no compiler remains active.

See the [membership closeout receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/work-context-membership-closeout.json).
The raw final summary is at
`/tmp/hub-computer-lifecycle-20261101/membership-controls5/mirror/summary.json`,
SHA-256 `bc1fab72c59b334475998a98a89a0aaf9ba3ebacb8d3bbd622a08dcf68c1088c`.

All 879 native build inputs still match the prior accepted Mac/Linux checks, so
those checks were not rerun for proof manifests and documentation. The prior
[native checkpoint](2026-11-01-computer-stale-completion-native.md) ran 475 passing
tests with two existing skips on each host. No deployment, browser qualification,
OpenCode call, CI hook or runtime authorization change occurred in this closeout.

The remaining verification obligations, including these unqualified controls,
stay explicit in the proof map. Resuming them requires a later decision; nothing
continues automatically while the effort is paused.
