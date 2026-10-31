# Registration lookup: actual-source semantic control

Hub commit `e06d209` qualifies the exact getter proof committed in `9d064b6`.
Removing the second-match check from a private copy of the actual Rust makes the
unchanged proof fail. An independent Lean witness establishes the resulting wrong
answer; restoring the Rust reproduces the canonical generated model and passes
the unchanged proof again. No tracked production code changed.

## Property and control

The getter must return a complete registration exactly when one row matches the
requested slug, otherwise none. The private mutation changes
`matching.next().is_none().then_some(server.as_ref())` to
`true.then_some(server.as_ref())` in `RegistrationSnapshot::get`.

The independent witness uses two complete registrations with the same slug and
distinct deployment IDs, each stored under its own deployment key. It proves
successful outer `Result` values containing `Some`, while the original independent
singleton specification returns `None`, in both enumeration orders. It verifies
unique keys and key/row coherence; it does not assume the desired result or rely
on an invalid duplicate-key map. All namespace contents and other row fields remain
arbitrary. The witness imports only the mutant model, never the failed theorem
module or a stale artifact. Four executable axiom audits allow only `propext`,
`Classical.choice` and `Quot.sound`.

This is stronger evidence than observing a tactic failure alone: the independently
proved output contradicts the contract. The generated difference is confined to
the getter body: retain the first match, discard the remaining iterator state,
and remove the second scan and its absence test.

## Execution trace and identities

GPT-6.1 Sol prepared the control and witness; GPT-6 Luna ran unattended Linux
extraction and checks; GPT-6 Astra reviewed the results and committed the milestone.
Inputs remain Hub runtime `3bc2923`, SDK `239622d`, Core `120306e`, Charon 0.1.293,
the pinned Aeneas translation tools and Lean 4.35.0. The private Aeneas import-name
repair and dependency overrides are those of the
[tooling qualification](2026-10-30-request-composition-tool-imports.md).

1. Apply the Rust mutation in a private source copy and verify the source maps.
   Charon passed in **24.506 s**, Aeneas in **2.024 s**. All 15 requested roots
   resolved transparently; no extraction errors were recorded.
2. Build a fresh mutant model and the unchanged assembly proof: **13.786 s**.
   The frozen getter proof failed as expected in **2.819 s** at its second-scan
   reasoning; its executable audit rejected the recovered `sorryAx`.
3. Check the independent semantic witness: **2.469 s**, exit 0, four standard-only
   audits. No failed getter artifact was imported.
4. Reverse the patch in the same private Rust tree. Charon passed in **24.306 s**,
   Aeneas in **2.023 s**. All four generated Lean files matched canonical bytes
   exactly, without normalization.
5. Build a fresh restored model/assembly package: **13.586 s**. The unchanged
   getter passed directly in **2.768 s**, and its exact nondefault target passed
   in **3.269 s**. All five getter audits passed and source hashes stayed unchanged.

The immutable getter source SHA-256 is
`8dd2e35b7e6ac6443547737148f33b95f2597ad7921b59231573b7be1542f128`.
The committed witness is
`3546d8ff89e4d052ea8c6400016e35d523b278a9b60f3519f1effde856f9ea0d`.
The restored generated `Funs.lean` is
`b1cd794046eea1100fa621bf555126ce9e44452938d16fe32c4be7133d9656f1`;
the final proof artifact is
`0581875bf4ee022769080da62255f6a84d66d04a3b47966e16b0572e0dec5bd8`.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/e06d209/proofs/request_composition/evidence/registration-lookup-control.json)
records input/output identities, phase summaries, commands, timings, source maps
and log hashes. Receipt SHA-256:
`3e4b2f964af98b799b01cbad8da5347d9e2e68cfca1486ec3a6e3f133772df9f`.
Temporary phase logs remain under
`/tmp/hub-request-composition-20261030/evidence-get-ambiguity-*/`.

## Development errors and boundaries

An initial upload failed because its task directory did not exist; that setup was
corrected before extraction. The first witness check failed in **2.718 s** because
nil membership was not fully simplified and recursive simplification exceeded the
depth limit. Only proof tactics changed: one bounded unfolding replaced recursive
simplification. The four theorem statements and independent specification remained
unchanged. Neither failed attempt is counted as qualification evidence.

The result concerns actual Rust translated into the explicit Lean models. Native
BTreeMap/Arc, equality, cloning and compiler/translator correspondence remain
assumptions; this did not run the mutant as a native executable. It proves neither
full selection collection nor namespace construction, current-policy provenance,
SDK issuer/recipient composition, SQL or asynchronous recovery. Semantic controls
for the separate assembly contracts are still pending.

The patch and witness are manual qualification inputs, outside default targets.
There was no SDK repin, production change, full Docker gate, deployment or model
call. The broader formal-verification goal remains open. This checked milestone
is committed before proceeding to the next proof.
