# Selected-entry routing: actual-source semantic control

Hub commit `9b367d3` qualifies the entry proof from `f758ae6` against a deliberate
slug-check bypass in the actual Rust. The unchanged proof rejects the altered
implementation. An independent witness proves its wrong answer, and restoration
reproduces the canonical model and passes fresh proof checks. The production source
and checked proof remain unchanged.

## Contract, mutation and witness

The private mutation changes only
`(&server.slug == slug).then(|| (*deployment, server.clone()))` to
`true.then(|| (*deployment, server.clone()))` inside `selected`.
The scenario uses one complete registration keyed by its own deployment and a
requested slug different from the registration's slug. Its namespace map and all
other registration fields are arbitrary.

The standalone witness establishes unique/coherent map keys, successful outer
`Result`, the complete returned deployment/registration pair and unchanged snapshot
state. The copied independent `lookupBy`/`chooseOne` specification returns none;
the witness proves the resulting contradiction. It imports the mutant model alone,
never the failed theorem module or a stale proof artifact. All four witness audits
permit only standard Lean axioms.

Raw generated-code review found precisely the intended change: the selection
closure discards the requested slug, removes its comparison and passes `true` to
`Bool.then`. The shorter source expression also moves the inner closure's location
comment from columns 48–80 to 30–62. `Types.lean` differs only in that comment;
both external templates are unchanged. Untouched raw outputs were used for all
checks, and restoration required exact hashes without normalization.

## Execution and measured results

GPT-6.1 Sol prepared the control/witness; GPT-6 Luna ran unattended Linux commands;
GPT-6 Astra reviewed the raw differences, results and commit. Inputs remain Hub
runtime `3bc2923`, SDK `239622d`, Core `120306e`, the canonical pinned Charon/Aeneas
extractors and Lean 4.35.0 with the qualified private import-name patch. The
[entry proof](2026-10-30-selected-entry-proof.md) records the baseline and boundaries.

1. Apply the patch in a fresh private Rust tree and verify source/dependency maps.
   Charon passed in **24.155 s**, Aeneas in **2.022 s**. All 15 requested roots
   resolved transparently, with zero extraction errors.
2. Build the fresh mutant model and unchanged assembly proof: **13.836 s**.
   The frozen entry proof failed as intended in **2.768 s** at its private
   body-conversion equality; the executable audit rejected downstream `sorryAx`.
   The five earlier getter/lookup declarations still had standard-only audits.
3. Check the independent semantic witness: **2.518 s**, exit 0, four standard-only
   audits. This proves a semantic defect, rather than relying on tactic rejection.
4. Reverse the exact patch in the same private source tree. Charon passed in
   **24.006 s**, Aeneas in **2.023 s**. Full Hub/SDK map checks passed and all four
   generated Lean files matched the canonical raw hashes exactly.
5. Build a fresh restored model/assembly package: **13.686 s**. The unchanged
   entry proof passed directly in **2.818 s**, then its exact nondefault target
   passed in **3.320 s**. All ten module audits permit only `propext`,
   `Classical.choice` and `Quot.sound`; source hashes stayed unchanged.

The proof remained SHA-256
`01751908a5a2ffcb5ee9756b938fe87478929a557d066361a69996aac3fee209`.
The independent witness is
`64d80a64e8abf98aa4459e594fdb4f1df62626f28f250a9d1ccf0602677f7f56`.
The restored compiled proof is
`3b0b1e537846f61ee0c4980d60803728f5c410bc55573d4304a78b96e7de1851`.
Final summary SHA-256:
`c4821389eece2d0c72ec60c6dc869233b4852249fae322f5c649b6da6a6fedcc`.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/selected-entry-control.json)
retains phase identities, commands/timings, source/model hashes, raw-diff identities
and log hashes. Its SHA-256 is
`795fa1d91aa4904dc0b9cd70d794d1ca884418db318e325c69cb7f4d5e3280e9`.
Temporary logs and generated mutant/restored outputs remain under
`/tmp/hub-request-composition-20261030/evidence-selected-entry-slug-*/`.
The patch and witness are committed manual qualification inputs, outside default
build targets; runners, LLBC and compiled artifacts remain temporary.

## Scope

This qualifies the actual extracted entry closure and its stated model contract.
Native BTreeMap/Arc, equality, cloning and compiler/translator correspondence remain
assumptions. The Rust mutation was compiled/extracted, not exercised as a native
service. Full collection, derived route uniqueness, constructor coherence,
namespace construction, current-policy provenance and SDK issuer/recipient
composition remain open. No new SQL, asynchronous recovery or deployed guarantee
follows from this check.

There was no production change, dependency repin, native component run, full Docker
gate, deployment or model call. The entry milestone is committed and qualified;
the broader formal-verification goal remains active.
