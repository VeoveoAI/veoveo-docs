# Factory watcher: failure ordering, recorded fallback and deletion boundary

Hub `abfb89b` publishes manual status and recovery composition on top of the
[parent/queued-update histories](2026-10-31-factory-watcher-histories.md). Nine
lemmas and one boundary definition pass ten executable axiom guards. Production
code, the accepted models and earlier proofs are unchanged. Populated witnesses
and the selected semantic controls are still needed to close this watcher slice.

Source: [status proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherStatusProof.lean),
[contracts, source boundaries and receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/WATCHER_SOURCE.md#checked-status-fallback-and-deletion-boundaries).

## What is established

`refusal_then_parent_history` begins with an actual modeled linked continuation
whose preparation fails. That operation produces the full failure map and leaves
the Factory state unchanged. Its resulting row binding feeds an actual successful
parent application. The theorem derives complete Factory/client outputs and both
status writes, including when either write did not commit. A committed second
publication clears the entire earlier failure at that key; Factory success alone
does not imply a committed clear. All other complete keys remain unchanged. A
different watched deployment is a distinct status key even for the same runner.

Recorded fallback may apply successfully while the resolution error remains
published. Acceptance follows from independent no-fault/capacity observations.
The stored failure names the requested linked repository; the applied row and
client name the returned fallback repository. Those repositories need not agree.

A Factory failure is separate from preparation failure. Given an observed
Factory error, the proof derives its exact stopped-prefix row from the established
recovery contract, while the watcher reports preparation success and attempts to
clear its preparation status. This is error characterization; a populated example
constructing that failure from a native observation remains pending.

The completed-deletion history derives absence of the runner's SQL key from the
explicit `rowDeleted` transition and prior uniqueness. A queued notification with
a consistent current-row read preserves the entire resulting modeled state and
makes no Factory attempt. This boundary deletes only the row. It does not prove
complete sandbox/provider/database cleanup or its ordering.

These are handwritten model proofs, not Aeneas extraction or formal SQL
refinement. The previous process-local serialization, SQL-read consistency,
schema, external native observations and normal-return assumptions remain.
Failure values retain linked repository, parent revision, message and timestamp;
publication commit and acknowledgement remain separate. No runtime rejection,
authorization rule, CI gate or orchestration was added.

## Execution and evidence

GPT-6.1 Sol authored the source, GPT-6 Astra reviewed the contracts and complete
compiler output, and GPT-6 Luna ran the bounded unattended Linux check. Lean
**4.35.0** and Mathlib **56a005855ea17e0b0958f73ec801ae140b0a1679** remain pinned:

```sh
LAKE_NO_UPDATE=1 lake env lean FactoryWatcherStatusProof.lean -o .lake/build/lib/lean/FactoryWatcherStatusProof.olean
```

The first attempt passed in **5.473 seconds** within the 180-second bound. All
ten guards passed; six printed closures use only `propext`, `Classical.choice`
and `Quot.sound`. One unused-section-variable warning remains. All 13 input files
and eight prerequisite source/artifact pairs were unchanged. The new output was
absent before compilation. No native/application test, deployment, deployed probe
or paid model call ran for this proof-only addition.

Runtime basis: Hub `a69e3cba3f9865e06e1db5ff77d1562ac468338a`; proof main basis:
`dd6bd84`. The manual target, source and compact receipt are committed; compiler
artifacts and logs remain temporary under
`/tmp/hub-factory-concurrent-preparation-20261031/watcher-status-check1-mirror/evidence-run1/`.

- Source: 16,248 bytes, SHA-256
  `b44a4e8a4defb755c3b2f9cbe1a85929e54596b030385ef46f40cc28d3dc694c`.
- Artifact: 520,880 bytes, SHA-256
  `7aef310c436e570c391ca00e8873c41f80b66a4d1210d5a70182248725390865`.
- Input receipt SHA-256:
  `7cc17bdea5fa59284e4ca649e23a5f44e0f138e38ec0ef661fa6288e6419157c`.
- Unchanged source-map digest:
  `e0d3e1c5ec4c801a4dac232f22aa9f879ca643f9b33cd2fc4bfa083b351ef383`.
- Full log: 1,135 bytes, SHA-256
  `0f01580784fdaafff9091f15cf512010e946e48100ee4e9b0198ac2dee4ade17`.
- Summary SHA-256:
  `db761f9a0568e3694c5da8e5afd712b4819d40eb128e246501d52774bd2bbbaa`.

Next: independently specified populated outputs, a lost-current-metadata fault
and an overstrict captured-parent equality refusal, followed by exact restoration
and fresh baseline checks. Native allocation/cleanup, saved-parent retry freshness,
replicas, concurrent registration publication and liveness remain separate work.
