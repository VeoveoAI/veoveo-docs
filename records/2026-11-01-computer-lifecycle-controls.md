# Computer replacement proof: two semantic controls

Two deliberate faults in the manual Computer replacement model now have qualified
controls. Independent diagnostics prove each complete wrong outcome; the original
proof rejects it, then passes after exact source restoration. These are injected
model faults, not newly discovered production bugs. No runtime code changed.
Hub `a0794ab` commits the controls receipt and coverage update.

This follows the [replacement proof checkpoint](2026-11-01-computer-replacement-proof.md)
at Hub `a751c9b2589d27b366b30854994af956cffa4b26`. GPT-6.1 Sol authored the
controls, GPT-6 Luna executed the bounded manual commands, and GPT-6 Astra reviewed
the source, rejection diagnostics and artifact evidence. No model-driven application
acceptance or deployment occurred.

## What each control establishes

**Missing operation-ID comparison.** In a private copy, remove only
`&& current.id == op` from the modeled finish predicate. Operation A is claimed
at time 0; B takes over after A is stale, at time 661 with cutoff 1. Both target
version 2. Running A's actual modeled worker wrongly publishes B's stored target
and clears B's pending operation. The diagnostic proves the complete resulting
table, including the unaffected row, and negates the original stale-worker
conclusion. A separate direct finish witness negates the original rejection
clause. The defect is premature publication and loss of B's pending operation;
it does not require different target versions.

The unchanged `stale_completion` proof fails at line 55: it requires the original
table and `matched = false`, while the faulty model changes the row and reports a
match. The independently checked counterexample, rather than downstream
`sorryAx` audit failures, establishes the semantic rejection.

**Missing listener attempt.** In another private copy, remove only `.waitListener`
from the modeled program. The actual success worker now commits its complete
success result after eight attempts ending in `.waitReady`. Its independent
diagnostic proves that full output, the missing listener attempt and the negation
of the original acceptance conjunction. The unchanged `ordered_success` proof
fails at line 164 with an eight-element trace where nine are required. The
fixture's opaque result marker is not a count or a health measurement.

## Execution and evidence

Each case ran its independent diagnostic, the unchanged `ComputerLifecycleProof`
target, and that same original target after restoring all eleven baseline files.
Commands used `LAKE_NO_UPDATE=1 lake build <target>`, each with an external
180-second bound and default Lean heartbeats.

- Operation-ID control: diagnostic passed in **42.540 s**, original proof rejected
  the fault in **4.215 s**, restored proof passed in **11.274 s**.
- Listener control: diagnostic passed in **11.746 s**, original proof rejected
  the fault in **3.856 s**, restored proof passed in **10.477 s**.

Every diagnostic checked seven guarded declarations and printed four axiom
closures. Each restored proof checked 27 guards and eleven closures. Successful
closures used only `propext`, `Classical.choice` and `Quot.sound`; no unfinished
proof was accepted. Neither negative run emitted the original proof artifact.

Execution used macOS arm64, Lean 4.35.0 at
`eb6cafb7290e8bd5f2937522d8d804f58f02bafc`, and Mathlib
`56a005855ea17e0b0958f73ec801ae140b0a1679`. Review checked all nine dependency Git
HEADs against the lock, all six compiler logs, source maps before and after each
command, and 26 copied artifact byte lengths and hashes. The restored proof
artifacts were respectively 556,320 bytes, SHA-256
`519795a38452d2d069262b2a3396ad37bc358a4cf20d91fdef18399b78e88348`,
and 556,328 bytes, SHA-256
`ffcd89252437c40a28743ffc2340c7669067d6b76936e3a9317a0ef1077ef29b`.
Their sources match; byte-identical artifacts across builds are not claimed.

The committed [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/computer_lifecycle/evidence/semantic-controls.json)
contains exact faults, full diagnostic sources, temporary targets, commands,
timings, source/tool/log/artifact identities and manual reproduction instructions.
Local execution evidence is under
`/tmp/hub-computer-lifecycle-20261101/semantic-controls1/mac-execution2/`.
Lake managed invalidation and rebuilding. Old diagnostic artifacts remain inactive
after their source and temporary target are removed; they are not restored-proof
inputs. Build caches and compiled artifacts are not committed.

## Setup failures and limits

Linux SSH initially timed out before login, so no Linux compiler ran for these
controls. On Mac, an existing materialized dependency cache lacked Git metadata;
Lake refused its attempted checkout before compiling Lean. A fresh private,
Lake-managed dependency tree then hit a 600.057-second fetch timeout. Fetching the
exact locked Batteries commit and resuming ordinary Lake setup resolved it.
Official targeted Mathlib cache retrieval passed in 40.209 seconds. No dependency
pin changed and no compiled artifact was transplanted. The receipt retains these
setup failures separately from proof results, including a correction to stale
cache-provenance wording in the raw phase summaries. A later bounded Linux SSH
check succeeded in 2.361 seconds; no extraction was launched by that check.

This qualifies sensitivity of a handwritten source-correspondence model, not
Aeneas-extracted Rust or formal SQL refinement. The existing
[PostgreSQL regression](2026-11-01-computer-stale-completion-native.md) remains
separate evidence; no native suite was rerun for this proof-only checkpoint.
Outer timeout scheduling, cancellation of native effects, current HTTP health,
persistent-home survival, browser admission and credential custody remain open.
The next prepared probe tests whether actual current-membership functions can be
extracted unchanged; it has not run.
