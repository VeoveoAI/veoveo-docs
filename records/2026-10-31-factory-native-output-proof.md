# Factory: complete modeled lifecycle outputs and constructive retarget

The manual Factory proof now connects a successful apply to the complete row,
modeled provider state, observed sandbox outcome and issued creation requests.
It also proves a populated changed-target execution succeeds under explicit
successful external-operation observations. This extends the
[row/error checkpoint](2026-10-31-factory-retarget-row-proof.md), with the same
runtime source correspondence to Hub `48d7e25a564f24c9d0418fbbebeda1d5c7d4c68c`.
There is no runtime change, deployment or Aeneas extraction in this checkpoint.

## Established contracts

`successful_run_no_abort` shows that a successful modeled run cannot contain an
abort. `success_implies_capacity` uses this to derive capacity acceptance from
successful completion. `successful_apply_complete` therefore removes the extra
capacity premise from the earlier whole-row theorem.

`successful_outputs_complete` connects the complete row to independent
`nativeOutput`, `providerOutput` and `requestOutput` specifications, plus preservation
of unrelated whole model objects. It distinguishes the source's actual paths:

- Keeping a runner preserves the complete prior modeled provider state and the
  native read observation; it issues no create request. It does not require the
  newly built image or every spec field to equal the retained one.
- Restarting refreshes the modeled client projection and preserves the remaining
  provider fields. Stop/start behavior follows the observed phase and restart
  count. The result remains an external native observation, not inferred readiness.
- Replacement or creation records the complete modeled registration/refresh
  material and appends the exact creation request. The observed post-call sandbox
  remains separate from the requested spec.

`changed_present_accepts` derives successful completion for a populated existing
runner retarget when the named external operations succeed. The populated example
then establishes the final row, issued request, refresh client ID and secret lookup.
It assumes no desired after-state or already-successful overall apply. Its singleton
store satisfies scoped row/digest uniqueness without a global collision-freedom
assumption. UUID formatting and native SHA relations remain explicit premises.

## Execution and corrections

GPT-6 Astra reviewed correspondence and specifications; GPT-6.1 Sol wrote the proof;
GPT-6 Luna ran checks on Linux through the existing SSH tunnel. The toolchain is
Lean 4.35.0 with Mathlib `56a005855ea17e0b0958f73ec801ae140b0a1679`. The exact
previously checked model and row-proof OLeans were verified before reuse. Each
attempt required a fresh leaf output and unchanged frozen source maps.

The single manual command was bounded to 180 seconds:

```sh
LAKE_NO_UPDATE=1 lake env lean FactoryNativeOutputProof.lean -o .lake/build/lib/lean/FactoryNativeOutputProof.olean
```

An initial launcher attempt exited 127 in 4 ms because its PATH omitted the
installed `lake`. The corrected launcher named the pinned toolchain explicitly.
That setup failure was not a Lean result. Subsequent preserved attempts were:

- Check 1: exit 1, 30.954 s; unresolved output-choice equations and witness tactic
  elaboration. The dependency guard rejected unfinished proof dependencies.
- Check 2: exit 1, 19.169 s; broad simplification hit the 200,000 heartbeat limit.
- Check 3: exit 1, 7.854 s; the proof selected lifecycle cases before unfolding
  records, but a local-option/doc-comment placement error and restart goals remained.
- Check 4: exit 1, 6.860 s; only two contradictory phase/restart-count implications
  remained. They were closed explicitly in the next revision.
- Check 5: exit 0, 6.945 s; all 14 executable axiom guards passed, with eight printed
  theorem closures using only `propext`, `Classical.choice` and `Quot.sound`.

The final algebra theorem has a finite local 800,000-heartbeat limit, not a global
or unlimited setting. Corrections changed proof tactics/layout, not the model,
required output specifications, mathematical statements or fixture values. The
successful log contains unused-variable/simp-argument warnings and no errors.
No failed attempt produced an accepted leaf OLean.

Separately, the builder checked all four synthetic raw credential strings:
each base64url-decodes to 32 bytes, and SHA-256 of the actual token string matches
its stated digest (4/4). The populated runner script equals the Rust
`runner_start_command` format body after brace expansion and Lore-path substitution.
These are fixture/source consistency checks, not cryptographic proofs or an
executed checkout. No installation credential was used.

## Identities and limits

Temporary evidence root: `/tmp/hub-factory-retarget-20261031/`.

- Final packet `native-output-check5/inputs.json`: SHA-256
  `4b4b9f9cbbf0f7966cc3c215f92115e54666503dd4b39c74a60e61de7e2e2796`.
- Final eight-file archive: SHA-256
  `42b7bb04fac06610c4b432bd9e7400d5ab1cf7fd386b1b2926dbf4ada946feab`.
- Checked leaf: 24,061 bytes, SHA-256
  `0165725f865ae28f1d4e7e3530bec9c0d7fa088bf4a3246c83e9335c4b3bba23`.
- Fresh OLean: 2,460,512 bytes, SHA-256
  `e2c9136699ef0cc9ea71096bce41a458f0068bd9c2cc17fa42b38df0bbef04de`.
- Final log `native-output-check5-mirror/run1/lean.log`: 6,425 bytes, SHA-256
  `2a24923175b3a66950c516c39c419bf4c681c523cd554474104d57e95cf9a4b0`.
- Reused model/row-proof OLean hashes:
  `86d35cb19aea6b19727b3bb0fc2cfcb3c3c45674a05f063c3acbd053d1f402ee` /
  `7a72412270c42a64c968935a531750770bb3456f7eaa92c7deb1613711aa7564`.

The leaf and manual Lake target are source artifacts; compiled outputs and full
logs remain temporary. Package qualification prose/receipts are updated after the
checks without changing checked Lean source. No package-wide or native test rerun
is claimed. The existing runtime correction has separate native qualification.

These theorems remain about the handwritten model under its SQL, serialization,
schema, UUID/hash, native-payload/equality and RPC interpretation boundaries.
Provider state here is the modeled custody material/client projection, not a proof
of every native Provider protobuf field or complete token issuance. Acknowledgement
does not establish remote receipt, readiness, workspace retention or exact checkout.
The retained script requests `branch@LATEST`.

Output specifications share the model's lifecycle selector; this checkpoint does
not independently verify every selection condition. Independent choice contracts,
wrong-result/wrong-refusal controls, complete failure prefixes and conditional
retry/history composition remain next. Concurrent follower supersession, concurrent
registration publication and eventual recovery remain separate obligations.
