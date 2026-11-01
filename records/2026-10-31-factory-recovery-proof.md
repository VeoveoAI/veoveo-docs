# Factory: failure prefixes and conditional retry

The manual Factory model now has checked contracts for the exact first failed
operation, the state it leaves, and a subsequent successful apply from that state.
This extends the [complete-output checkpoint](2026-10-31-factory-native-output-proof.md).
It changes no Rust, SQL, native runtime, deployment or authorization behavior.

The source correspondence remains Hub
`48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`. Before this check, origin was fetched:
Hub `c2e646e5dde7bed7cf264dcea0d5e7032cc78f98`, SDK
`e9105ca7d398039c6cff20a59d70b324037e3dda` and Docs
`bfe3ac91fbba42ed26a27a009af67a9bb556de81` matched their local main branches.
Hub's `crates/`, `Cargo.toml` and `Cargo.lock` had no changes from the qualified
runtime fix. The standalone Core checkout was three commits behind origin, but
Hub already pinned Core's current main, `422dcf268d690fcbc3fee435cf9b81e7f36ffeac`.
The Task decision and recipient source hashes also still matched the earlier
[applicability audit](2026-10-31-factory-task-source-applicability.md). These facts
do not renew historical native qualification or establish all-proof applicability.

## Established contracts

- `failed_run_prefix` derives the first failed action, preceding successful actions,
  exact stopped state, retained original error and event trace from an actual
  failed modeled return. Later actions do not run. `failed_row_prefix` connects
  that state to every modeled row field, including an uncertain SQL commit and
  best-effort failure logging.
- `apply_surviving_runner` derives the existing row, runner shape and immutable
  identity after a normally returned operation, including failures. The model's
  existing-row/no-concurrent-removal domain is explicit.
- `changed_program_decomposition` connects the actual modeled changed-target
  program to its preparation/read/delete-or-admission prefix. A failure in that
  prefix leaves the old linked repository, tracked branch ID, tracked name and
  linked pusher. Other row fields may already have changed. A failed deletion may
  already have removed the sandbox; no rollback or still-serving claim is made.
- `no_fault_capacity_accepts` derives acceptance from no-error external-operation
  observations and the source's capacity condition. It covers absent as well as
  present sandbox reads and assumes neither a successful overall apply nor its
  desired final state.
- `retry_after_failure` binds the next call to the row and state actually left by
  the first, derives acceptance under those observations, and connects it to the
  independent complete-row, provider, native-observation and creation-request
  specifications. Unrelated whole model objects remain unchanged across both
  calls. A specialization additionally preserves the old target through a
  precommit failure and derives that the retry still sees a changed target.

The generic survival argument holds after every normal return, so its failed-call
premise is not needed by the proof body. This is a stronger preservation fact, not
an assumption that the first failure rolled back. The next call may observe native
absence, and the preceding target write may have committed despite an error reply.

## Execution

GPT-6 Astra reviewed source correspondence, statements and results; GPT-6.1 Sol
authored the new proof; GPT-6 Luna ran bounded checks on Linux through the existing
SSH tunnel. Lean 4.35.0 and Mathlib
`56a005855ea17e0b0958f73ec801ae140b0a1679` stayed pinned. The prior model, row proof
and native-output proof sources and compiled artifacts were hash-checked before
reuse. Each run used a fresh private packet and required its new output to be absent.

The single command had a 180-second bound and explicit pinned toolchain PATH:

```sh
LAKE_NO_UPDATE=1 lake env lean FactoryRecoveryProof.lean -o .lake/build/lib/lean/FactoryRecoveryProof.olean
```

- Check 1: exit 1, 16.641 s. Row binding, conditional projections, list association
  and tactic issues remained; broad simplification reached its heartbeat limit.
- Check 2: exit 1, 15.511 s. Only the finite admission-action distinctness helper
  remained unresolved. Before this run, review corrected an explicit option
  injectivity step; the superseded packet was never executed.
- Check 3: exit 0, 14.984 s. All 21 executable axiom guards passed. Eight printed
  theorem closures use only `propext`, `Classical.choice` and `Quot.sound`.

The failed attempts produced no accepted leaf artifact. Their axiom-guard failures
were consequences of unfinished proof elaboration, not runtime findings. Repairs
changed proof tactics only. The final capacity-acceptance theorem uses a finite
local 600,000-heartbeat bound; no global/unlimited setting was added. The accepted
log retains unused-variable/tactic warnings and contains no errors. Axiom guards
audit proof dependencies; they are not 21 execution scenarios or semantic controls.

## Evidence identities and limits

Temporary evidence root: `/tmp/hub-factory-retarget-20261031/`.

- Final packet `recovery-check3/inputs.json`: SHA-256
  `44fb74e65040c5122885533e4ab048fa16e3406956ad4d86404717017fa99335`.
- Final nine-file source archive: SHA-256
  `290cef62f4e71d9c4f071010969ea2c002b5c567d777a014493f702b5181f922`.
- Checked leaf: 22,672 bytes, SHA-256
  `80f34ec4401428dbabf13e8dac061e2546974377ffc08dc0b92f695c1ebabc35`.
- Fresh OLean: 1,555,040 bytes, SHA-256
  `30c0ee7c55eebba0d377adf80d6d3c0169d13ac22479ea553b2208424aa01e43`.
- Final log `recovery-check3-mirror/run1/lean.log`: 5,914 bytes, SHA-256
  `dcf9e3e903e8ffb8278a9c688e6a823fb3fefba9513fdc2a15ba13902b19ba1a`.
- Failed check 1 log: 15,751 bytes, SHA-256
  `91fcb6767e32d92b7ddabfc5facc7a607a7050445e5eb8afc867be4e58f0308a`.
- Failed check 2 log: 8,998 bytes, SHA-256
  `c553032eaecc1e600f633e241f1f3021379883fa628626f9df1b1561b16bd26d`.

Source maps matched before and after every run. The three accepted prerequisite
artifact identities are retained in the package's compact receipt. Checked Lean
source and the manual Lake target are committed; compiled artifacts and full logs
remain temporary. Qualification prose is written afterward. No native or
package-wide test rerun, deployed probe or model call occurred for this change.

This remains a handwritten source-correspondence model, not Aeneas extraction or
formal refinement of async Rust/SQL. SQL atomicity and unknown replies, serialized
existing-runner calls, schema/native-payload/hash interpretation and external
observations remain explicit boundaries. Native reads are observations at their
respective calls; they are not assumed stable across builds or between retries.
No external registration/removal writes occur in this sequential domain.

The result does not prove automatic retry scheduling, eventual readiness, exact
checkout, complete token issuance, concurrent follower freshness or replica
publication order. Independent lifecycle-choice contracts, meaningful wrong-result
and wrong-refusal controls, and finite-history composition remain open. No claim
that the complete Factory or Hub is verified follows from this checkpoint.
