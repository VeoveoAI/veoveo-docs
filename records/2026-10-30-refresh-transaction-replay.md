# Refresh transaction replay and aborted-attempt exclusion

The checked replay proof now connects its history to actual transaction-model
steps. Each committed batch records the committing attempt and its exact staged
writes; each maintenance entry records its actual clear/prune step. Other control
steps and disjoint endpoint audit activity cannot hide a server commit, even if
that commit changes no row.

Every modeled execution has a corresponding contribution trace. Replaying that
trace produces the same owned family/token/audit state. For every such trace, an
attempt that ends aborted contributes no committed batch. Other attempts may
commit, cleanup may run, and endpoint rejection audits may change independently;
the theorem accounts for those effects rather than asserting that the entire
database stays unchanged after an error.

Review strengthened an initially weaker statement that merely asserted existence
of some replay list with the same result. That statement did not constrain the
list to actual execution steps. The committed version includes a
`TracedExecution` witness and universally quantified trace exclusion. The original
model, runtime and operational steps are unchanged.

The accompanying execution-support proof constructs staging, commit and successful
acknowledgement of a supplied program, releases its held locks and preserves other
attempts. Its explicit statement-validity and compatible-lock premises remain:
concrete initial constraints, successful concurrent rotation/redelivery and
uncertain-response witnesses are not established by this helper alone.

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran frozen checks on Linux with
Lean 4.35.0, and GPT-6 Astra reviewed and strengthened the statement. The final
replay direct check passed in 4.110 seconds; the execution-support direct check
passed in 3.794 seconds. Target builds passed, with exact commands, source/log
hashes and timings in the [compact checkpoint](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/evidence/replay-checkpoint.json).
Executable theorem audits admit only standard Lean axioms. A failed intermediate
run exposed constructor-pattern arity errors; correcting those did not weaken
the final claim.

These are handwritten model proofs. PostgreSQL constraint/lock/commit primitives,
SQL and async-Rust correspondence, crypto and physical durability retain their
existing boundaries. The native tests and faults recorded earlier remain separate
evidence; they were not rerun for these proof-only additions. No production code,
authorization rule, deployment, CI hook or model-provider call changed.
