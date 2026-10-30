# Refresh generation history checkpoint

Hub commit `6f2a85b` proves three connected transaction-model properties:

- A reachable committing rotation has staged exactly the chosen successor
  insert, predecessor consume, generation advance and success audit, with the
  checked successor generation derived from the modeled decision.
- An active attempt owns the family lock and retains the current family
  snapshot until its server decision. Separate token maintenance remains allowed.
- The retained family generation equals its initial value plus the number of
  committed rotations, and those rotation generations strictly increase. Two
  rotations therefore cannot commit the same generation in this incarnation.

The no-fork conclusion follows from the reachable program, complete staging and
lock invariants. It does not assume a duplicate-free history or hide the intended
rotation inside the primitive commit. Family deletion ends the tracked
incarnation; eternal UUID nonreuse and initial family creation are not proved.

GPT-6.1 Sol implemented the three modules, GPT-6 Luna checked the frozen sources
on Linux with Lean 4.35.0, and GPT-6 Astra reviewed the theorem statements and
committed the checked group. History and Locks target builds passed; NoFork's
direct check passed in 3.502 seconds and its target build in 4.564 seconds.
All audited theorem closures use only standard Lean axioms. Earlier leaf
failures were tactic/syntax and record-normalization obligations, resolved
without weakening the statements.

Checks reused the already compiled package after a mistaken fresh dependency
build started redundant work. That private process group was stopped; no
application service was changed. This setup incident is not semantic proof
evidence. The [compact checkpoint](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/evidence/history-checkpoint.json)
records exact source/log hashes, commands and measured timings. The underlying
model and prefix proof hashes are unchanged from commit `17f1f74`.

This is a handwritten design-model result. Native SQL/decoder/lock correspondence,
PostgreSQL implementation, crypto, physical durability and HTTP delivery are not
formally verified. Committed-state replay excluding aborted attempts and positive
concurrent/uncertain executions are the next separate proof increment. No
production logic, authorization rule, deployment or CI behavior changed.
