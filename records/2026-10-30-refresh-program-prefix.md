# Refresh transaction program-prefix checkpoint

Hub `17f1f74` adds a handwritten Lean transaction model and its first invariant
proofs. This is a design-model checkpoint; the refresh transaction slice remains
unfinished and no formal SQL refinement is claimed.

The model separates primitive commits from the application program. Commits can
apply any staged deltas; they do not assume the intended rotation or a complete
audit. The proved invariant derives that each reachable commit has staged its
entire chosen program, for arbitrary finite modeled protocol/environment
interleavings. Supporting lemmas establish generation-only family effects and
their session-admission connection, duplicate family/token preservation,
noncreation by updates of absent tokens, and preservation of first revocation
reason/time.

The modeled program follows rotation, duplicate delivery, replay and explicit
revocation, including early returns that drop rather than commit. Maintenance
uses independent token locks and can race plain reads; the model does not assume
all token changes hold a family lock. PostgreSQL locking, statement/constraint
behavior and atomic commits remain primitive assumptions. Source/schema/decoder
correspondence, physical durability, crypto and HTTP delivery are unproved.

GPT-6.1 Sol implemented the model and proofs, GPT-6 Luna ran the separate package
on Linux with Lean 4.35.0, and GPT-6 Astra reviewed the source mapping and theorem
statements. `lake build` passed in 26.415 seconds and
`lake env lean RefreshTransactionProof.lean` passed in 6.537 seconds. The executable
axiom audit passed; the printed theorem closures contain only standard Lean
axioms. Earlier attempts failed on record/lambda syntax and incomplete list/record
normalization; corrections did not weaken the theorem statements.

The [package README](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/README.md)
maps each model component to its actual Rust/SQL boundary. Its
[checkpoint receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/refresh_transactions/evidence/prefix-checkpoint.json)
records the six checked source-file hashes, commands and logs. Raw summary:
`/tmp/hub-refresh-concurrency-20261030/evidence-transaction-prefix/summary.json`,
SHA-256 `1a1402c49cd4268aaf88406ffeeb73d44e5f8b66b0ea0074bbaeb919ebb6db3f`.

Reachable outcome-to-program/history composition, no-fork, aborted-attempt
exclusion, positive concurrent rotation/duplicate executions and semantic controls
remain pending. Given-list field lemmas do not establish these larger properties.
There are no production changes, new access rules, CI hooks or deployed results.
