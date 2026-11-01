# Factory watcher: current-state and complete-output proof foundation

The manual Factory proof now includes a watcher layer corresponding to the
preparation correction in Hub `a69e3cba3f9865e06e1db5ff77d1562ac468338a`.
Lean checks 14 foundational lemmas and 18 axiom guards (the lemmas and four
operation definitions). This extends the existing Factory model without changing
its executor or any production source. It does not yet close the watcher slice:
actual two-operation histories, populated witnesses and semantic fault controls
remain pending.

Source: [watcher model](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherModel.lean),
[checked theorem leaf](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/FactoryWatcherProof.lean),
[source correspondence and limits](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/factory_retarget/WATCHER_SOURCE.md).
The earlier [native fix qualification](2026-10-31-factory-preparation-serialization.md)
is separate evidence: five component regressions and the full Mac/Linux checks.
No native test, deployed probe or OpenCode model call was repeated for these
proof-only files.

## What the checked contracts establish

- Given the explicit SQL observation contract and schema uniqueness, the current
  Runner projection comes from the actual full backing row selected by
  repository, branch and link. All nullable projection fields are preserved.
- Query error, absence and obsolete target notifications preserve the entire
  modeled Factory state and watcher failure map. Their query/log attempts remain
  in the trace; unchanged state is not mislabeled as no attempted operation.
- Changing captured parent revision, pusher or fallback content cannot change the
  returned operation when its key and tracked branch ID stay the same. The
  continuation constructs its request from the current applied parent instead.
- Valid source observations, a current row, no failing Factory step and the
  existing capacity conditions derive acceptance. No successful watcher return,
  already-correct Request or desired final state is supplied as a premise. The
  result includes the complete 21-field row, path-specific native/provider/request
  outputs, unrelated Factory-state preservation and the complete failure map.
- Preparation success and Factory success remain distinct. The channel theorem
  retains Factory errors and their effects even when preparation succeeded and
  the watcher attempts to clear its own preparation failure.
- A consistent absent-row observation prevents a captured candidate from
  recreating anything in the modeled state. This does not prove native removal
  itself or the full cleanup procedure.

The failure map includes the watched deployment in its key, unlike the mutex and
current-runner SQL key. Failure values retain linked repository, parent revision,
message and timestamp. Status writes distinguish committed state from the
acknowledged reply, including error replies after committed writes.

## Boundary

This is handwritten executable source correspondence, not Aeneas extraction of
async Rust or formal SQL refinement. It calls the previously checked Factory
`apply` model unchanged. The substantive watcher roots use async Tokio guards,
SQL and native Lore calls; extracting a small comparison alone would not verify
the enclosing operation.

The interpretation assumes the actual guard is held across one operation in one
watcher process, native current-row reads agree with storage, parsed identities
and rows satisfy their schema, and external writers do not intervene. Logical
preparation/resolve/fallback observations retain their actual arguments but do
not prove the implementations of those native operations. A successful tracked
branch-name response is accepted even if marked deleted, matching `reapply`.
Parent resolution has a different policy and is not silently substituted.

The parent operator carries branch ID, follows/pinned inputs and the requested
linked repository. A query error supplies no existing projection to resolution;
it does not turn the parent operation into a no-op. Recorded fallback may return
an old target while reading against the parent's newly requested linked
repository. Its resolution failure can remain recorded even when fallback
application succeeds. That operator compiles and its definition passes the
axiom audit; its multi-operation behavioral contracts are still pending.

The inherited Factory model covers an existing runner. New allocation, saved
parent retry/membership freshness, replicas and direct writers, concurrent
registration/served-marker changes, crash/nonreturn and eventual progress remain
outside this foundation. The current applied parent is not necessarily Lore's
latest head. Native object framing retains the existing scoped no-alias condition
for workspace and truncated sandbox name. No new runtime rule follows from these
proof assumptions.

## Execution and evidence

GPT-6.1 Sol authored the model and theorem leaf. GPT-6 Astra reviewed source
correspondence, statements and full compiler/audit output. GPT-6 Luna ran bounded,
unattended checks on the actual Ubuntu x86_64 machine using Lean **4.35.0** and
Mathlib **56a005855ea17e0b0958f73ec801ae140b0a1679**. Each command had a
180-second process-group bound and `LAKE_NO_UPDATE=1`:

```sh
lake env lean FactoryWatcherModel.lean -o .lake/build/lib/lean/FactoryWatcherModel.olean
lake env lean FactoryWatcherProof.lean -o .lake/build/lib/lean/FactoryWatcherProof.olean
```

The model passed in **8.232 seconds** with an empty compiler log. The proof passed
in **9.383 seconds**, with one unused implicit-instance warning in `publish_exact`.
All 18 guards passed; seven printed closure audits contain only `propext`,
`Classical.choice` and `Quot.sound`, with no `sorryAx` or additional axioms.
The 11-file final input map and six imported source/artifact pairs were unchanged
through the check. Prior artifacts were reused only after matching their accepted
source and artifact hashes; the new outputs were absent before their checks.

Earlier authoring failures are retained, not counted as platform defects or
successful proofs: the first model check failed in 21.754 seconds on four
constructor-typing errors and emitted no model artifact. The first proof check
failed in 12.487 seconds on failure-map function equalities and a projection
substitution. Its axiom audit rejected the unfinished results. The corrections
qualified constructors and repaired proof tactics without changing model behavior
or the explicit theorem conditions/results. Staging path omissions occurred
before compilation and were corrected separately.

Temporary evidence root:
`/tmp/hub-factory-concurrent-preparation-20261031/`. Package documentation retains
the compact receipts and manual commands; compiler artifacts/logs remain temporary.

- Model source SHA-256:
  `8cef39ee9a74201321f26a2ccc5c677d4794aec20d94a8e4dbf2fb26c05ed345`.
  Model artifact: 2,450,168 bytes, SHA-256
  `f0dc55f6804747bf83d40aadf572cfeaee9413162ee0907d5f7c8cc51aa5cbef`.
  `watcher-model-check2-mirror/evidence-run1/summary.json` SHA-256:
  `929fd10d8f1da0c8bf299f5d76d4e6073ab126febcc1a542975eff63d8e0b00b`.
- Proof source SHA-256:
  `1f78591915464bd2b37f34d3887e351809e1785225d77f4fa121781629ba04a3`.
  Proof artifact: 711,296 bytes, SHA-256
  `fdf6f9d89f732ee0206f8a296a92950a9c4357be90be9bcc83ad047b49f750bd`.
  `watcher-foundation-check2-mirror/evidence-run1/summary.json` SHA-256:
  `f74a60745e2c5874c65a38663bccacf09efb5b95848a42bbffff6945451dbff4`.
  Its complete 1,077-byte log SHA-256:
  `5b47070f92396614e2891c35c3e08d60bb206ae5a0a223e6919eab001d98921c`.
- Final input receipt SHA-256:
  `ae53df121e0ca84be3bead86850dc6b826ad2669a03ac60d301b2abc5c6100ec`.
  Final source-map digest:
  `eeb08170066339be4273e8b52ec8b5f8d3b0f9026704e2f69c3328b91bde3c42`.

Next work composes real modeled parent applications with queued linked updates,
checks complete client-visible constructive outcomes and failure ordering, then
tests lost current-metadata selection and an overstrict old-parent equality rule
as deliberate model faults. Those controls must fail for the intended semantic
reason and pass again after exact source restoration. This foundation alone does
not establish those remaining properties or complete Hub verification.
