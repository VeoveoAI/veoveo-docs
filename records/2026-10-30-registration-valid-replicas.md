# Valid overlapping replica registrations

Hub commit `bec2309` adds constructed successful executions to the registration
model. The checked history theorem now has explicit valid admission examples:
an existing registration survives replica addition, and two overlapping
same-metadata calls both finish with their exact rows and logins intact.

## Inputs and resulting state

The fixture uses mathematical client/login representatives: the seed is client
0/login 10; attempt 0 adds client 1/login 11; attempt 1 adds client 2/login 12.
Login 99 belongs to unrelated data. These are model identifiers, not native OAuth
client IDs or PostgreSQL role names. Full metadata, remaining row payloads, role
payloads and disjoint application state are arbitrary parameters.

`seeded_replica_admitted` proves a well-formed initial seed and a complete
execution of the actual transition constructors. The first attempt holds the
deployment lock while the second begins and waits. After admission, the database
equals the independent replica-addition specification, the first response is
successful, the second still waits and the lock is free.

`same_metadata_overlap_succeeds` continues that schedule: the waiting attempt
acquires the released lock, reads, admits and commits. Both responses are
successful, actual commit identities are `[0, 1]`, and the lock is free. The
complete final database equals two independent replica additions. This preserves
the seed, both candidate rows and role payloads, unrelated login 99 and the
application frame. Every selected insertion constraint is established, including
the second login being distinct from both existing registrations.

The initial validity proof is part of each final conjunction and its axiom
closure. The helpers construct and prove individual steps; they do not introduce
an atomic successful-registration oracle. These are reachable successful
schedules, not a guarantee that every scheduler eventually completes them.

## Execution and evidence

GPT-6.1 Sol implemented the witnesses, GPT-6 Luna checked frozen sources on Linux,
and GPT-6 Astra reviewed the exact input/output claims and committed the result.
The existing Lean 4.35.0 and pinned Aeneas dependency cache were reused.

The final direct `lake env lean /tmp/RegistrationWitnesses-packet6.lean` check
passed in 7.09 seconds. One composed `lake build` passed all eight package targets
in 6.10 seconds. Both new theorem closures contain exactly `propext` and
`Quot.sound`, with no `sorryAx` or unreviewed axiom. Prior theorem closures remain
unchanged.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/valid-replicas.json)
records eleven frozen source/configuration hashes, commands, timings, log
identities and exact fixture/output claims. The
[proof module](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/RegistrationWitnesses.lean)
contains both final theorems and the step constructions.

Development corrections supplied an explicit locking parameter to a Step
constructor and proved the second insertion's login constraint by considering
both surviving keys and simplifying their row fields. These were elaboration and
proof-algebra failures, not semantic fault-control evidence; no model constraint
was weakened. Runtime and seven prerequisite modules are unchanged. No native
tests, extraction, deployment, OpenCode acceptance or CI hook ran for this
proof-only milestone. The commit is local, not pushed.

Exact ordinary/instance replacement, partial-write abort and the original
unlocked-read counterexample remain next. The broader update/removal/authority
obligations remain open. These model witnesses do not establish native payload
encoding, PostgreSQL primitives or formal correspondence to asynchronous Rust/SQL.
