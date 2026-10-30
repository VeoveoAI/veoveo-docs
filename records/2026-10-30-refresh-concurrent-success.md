# Constructive concurrent refresh success

The refresh transaction model now has a complete legitimate concurrent execution:
request 0 acquires the family lock; request 1 finds the same token's family and
waits for that lock. Request 0 stages and commits rotation. Request 1 then reads
the consumed predecessor and receives request 0's committed successor, despite
having proposed a different candidate of its own. Both store acknowledgements
succeed.

The proof constructs this execution from generation-zero initial data. It proves
the row-domain constraints, distinct token IDs/digests, every statement's validity,
candidate shape and the actual delivery decision. It assumes neither a successful
result nor a `ValidWrites` oracle. A closed typed fixture instantiates the theorem;
the general version preserves arbitrary supplied family identity metadata.

Independent full-map lemmas identify the result: the family keeps its metadata
with generation one; the predecessor is consumed and points to the successor;
only that successor is present, with its original envelope; the retry candidate
is absent. Audit contains the first request's success record and the second
request's duplicate record. The resulting state is connected to those maps by
the concurrent-execution theorem's exact database equality.

This is an existential compatible schedule, not unconditional progress or a
guarantee under arbitrary cleanup. It supplies positive, non-vacuous execution
evidence alongside the general no-fork and aborted-attempt exclusion proofs.
The separately checked native PostgreSQL overlap test observed actual blocking
and equality of the recovered plaintext successor; this model's nominal envelope
does not prove encryption or plaintext behavior. See the
[native baseline](2026-10-30-refresh-native-baseline.md).

GPT-6.1 Sol implemented the witness, GPT-6 Luna checked frozen source on Linux
with Lean 4.35.0, and GPT-6 Astra reviewed the complete statements and output maps.
The final direct check passed in 3.519 seconds, followed by a successful target
build. Executable theorem-closure audits permit only standard Lean axioms. Earlier
attempts left record-projection, staging and arithmetic proof obligations; the
repairs retained the complete statement and explicit initial constraints.
The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/evidence/concurrent-success-checkpoint.json)
records exact source/log hashes and target timings.

Initial-family creation, SQL/async-Rust refinement, native type/time decoding,
crypto, physical durability and HTTP delivery retain their stated boundaries.
Commit-uncertainty witnesses are the remaining refresh-model work. No production
logic, authorization rule, deployment or CI behavior changed.
