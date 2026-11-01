# Computer replacement protocol: first checked Lean checkpoint

Hub commit `a751c9b2589d27b366b30854994af956cffa4b26`, pushed to `origin/main`,
adds a manual source-correspondence model of Computer replacement. It establishes
valid success, failure followed by retry, and obsolete completion preservation.
There is no Hub runtime change. This is partial `HUB-COMPUTER-01`, not a claim that
browser recovery, credential custody or OpenShell execution has been verified.

GPT-6.1 Sol authored the model, independent specification, witnesses and proofs;
GPT-6 Luna ran the bounded Linux qualification; GPT-6 Astra reviewed the source,
claims, logs and artifact bytes. The native source basis is
`8b7303d8351ebf356577666c981fbbe9747c79f0`. Its separate
[real-PostgreSQL checkpoint](2026-11-01-computer-stale-completion-native.md)
already passed; those native checks were not repeated for this proof-only change.

## What was checked

The model follows claim/finish/failure/notice SQL effects and the Rust worker's
returned native-stage continuation. Full row expectations are independent
constructors. They include custody identifiers, complete provisioning snapshots,
failure, notices, collection and keep-on state; other table entries are preserved.
An opaque field represents unprojected storage columns without claiming native
observation of those columns.

The populated scenarios use Computer 7, tenant 11, principal 13, a version-v1
initial row, prior failure/notice/collection data and a separate unrelated row:

1. Operation A, ID 70 at time 0, claims version v2. Acknowledged claim plus an
   actual successful reread produces its context. Nine logical native attempts
   return success, then the exact full success row is recorded.
2. `createSandbox` returns a synthetic error after six accepted attempts. The
   proof identifies the exact seven-attempt prefix, error and opaque after-effect
   marker, and the full durable failure row. Fresh operation 71 at time 30 then
   claims and succeeds from that actual failed table.
3. B, ID 71 at time 661 with cutoff 1, takes over stale A. B's complete admitted
   row and complete successful output are independently specified. A's direct
   finish and failure both preserve the whole table during B and after B finishes.
   A separate general theorem covers the captured stale worker's result-to-SQL
   continuation against the actual table at completion time.

General statements also cover wrong-owner and ended-operation refusal, unrelated
rows, shown-notice suppression, first returned native error, SQL error delivery
after commit versus abort, and claim/reread errors launching no worker. The strict
660-second boundary is retained: equality is neither the running predicate nor
the stale-claim predicate. This checkpoint does not change that source behavior.

The nine logical attempts include local preparation and waiting as well as native
calls; they are not nine proved remote RPCs. Synthetic effect markers prove no
real process readiness, rollback or cancellation.

## Execution and evidence

The command was `LAKE_NO_UPDATE=1 lake build ComputerLifecycleProof`, on Ubuntu
Linux x86_64, with an external 180-second bound and default Lean heartbeats.
Lean is 4.35.0, revision `eb6cafb7290e8bd5f2937522d8d804f58f02bafc`;
Mathlib is pinned to `56a005855ea17e0b0958f73ec801ae140b0a1679`.

The initial run exited 1 in **23.503 s**. Model, specification and witnesses
compiled, but the proof left four conditional-projection goals unsolved. A doc
comment immediately preceding a namespace also caused a parser error. The axiom
guard rejected the unfinished theorem. The repair split the remaining conditionals
and made the namespace comment ordinary; no model, specification, theorem
statement, axiom guard or dependency changed.

The final run exited **0 in 3.620 s**. Lake rebuilt only the changed proof; the
three prerequisite artifacts remained byte-identical in the same private graph.
All **27 declaration guards** passed; the **eleven printed axiom closures** used
only `propext`, `Classical.choice` and `Quot.sound`. No `sorry`, `native_decide` or
new axioms were admitted. Module-header and proof-style warnings remain visible
in the log; they were not hidden or treated as failures.

The final log is **2,964 bytes**, SHA-256
`e892fc33ddc511683ad9e7e7176b482df3523fb99a5440d0b5c78a8ce0634b76`.
The compiled proof is **556,312 bytes**, SHA-256
`341138411cd2ad740477dab23a02fcacf5df0bb88be45b1de16ad9b7612b90a7`.
The failed-run log is **12,036 bytes**, SHA-256
`b3976e1e01a718bc021c77d4304b22b99db38ff8fc8d481586375741e855a171`.

Review independently compared nine frozen package files and eleven mapped native
files, all four final compiled artifact byte lengths/hashes, both compiler logs,
the source guard list and actual printed closures. Documentation was updated
after qualification; proof sources and pins remain the checked bytes.

A separate driver setup error referenced a Mac-only `/tmp` path from Linux and
failed before launching Lean. Comparing the staged file with the frozen manifest
hash corrected it. A setup note and original driver are retained; the note is not
a raw traceback or compiler result. Neither setup nor proof authoring failures
were new production defects.

The committed [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/computer_lifecycle/evidence/replacement-protocol.json)
contains all source/tool/artifact identities, command, repair and limitations.
Full local logs and compiled artifacts are under
`/tmp/hub-computer-lifecycle-20261101/proof-checkpoint2-mirror/`, with the initial
run in the sibling `proof-checkpoint1-mirror/`. These are temporary execution
artifacts, not committed build caches. The
[package README](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/computer_lifecycle/README.md)
gives the manual command; no CI or runtime prover was added.

## Remaining boundary

This is handwritten Lean with reviewed source correspondence, not Aeneas-extracted
Rust or formal SQL refinement. PostgreSQL atomicity and SQLx delivery outcomes are
explicit contracts. Native request construction, decoded snapshots and version
hashing also remain interpretation boundaries.

The outer 600-second timeout scheduler and interrupted prefixes, `remove()`
internals, persistent-home survival and eventual recovery are not proved. SQL
operation-ID fencing protects publication, but cannot cancel an already accepted
native mutation or prevent its effects on a same-name sandbox. Ready/TCP success
is a historical observation, not current HTTP health. Browser identity, custody
issuance/renewal and collection need separate composition and native evidence.

Next are semantic fault controls against these unchanged assertions. None has
been run for this package yet. No deployment or model-driven acceptance was run.
