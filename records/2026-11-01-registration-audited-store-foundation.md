# Registration audit and store proof foundation

The manual Lean extension for instance registration and removal now compiles. It
connects successful audit appends to the modeled data commit and proves the
independent stored result, including repeated activity/server targets and complete
audit records. This is a handwritten source-correspondence model. It is not an
extraction of the Rust/SQL implementation, a deployed check, or complete audit
lifecycle qualification.

The native implementation is Hub `3d1b0b969ca8f35a757b74ebc9b959d62bf5ae33`, with
Core `422dcf268d690fcbc3fee435cf9b81e7f36ffeac` and SDK
`7360c0f96cb616c519d27256df214ff4f2e6e831`. The preceding
[native qualification](2026-11-01-registration-audit-fix.md) remains separate.
This checkpoint changes no production code. GPT-6.1 Sol authored the model and
proofs, GPT-6 Luna compiled them on Linux, and GPT-6 Astra reviewed the model,
native correspondence, logs and artifact identities. No model-driven OpenCode
acceptance or paid provider call occurred.

## What the checked statements establish

The inputs are arbitrary complete represented instance/deployment/registration
and login state, a family of registration/removal requests, and an existing audit
ledger. Complete audit drafts remain opaque values; their stored timestamps are
represented separately because Core compares both when an ID is retried.

The model reuses the checked lifetime protocol for data staging, real lock order,
commit and abort. At the actual ready transaction, the audit cursor captures its
request and ended registration rows. Each successful private append consumes one
source instruction. Registration produces Replace for every captured old row's
server, then Register for the candidate's server. Removal produces Deregister for
each captured row. Program completion is derived from individual steps; commit
does not assume a desired audit bag.

The independent specification counts activity/server occurrences, preserving
multiplicity. It also requires the complete modeled sequential data operation
and pointwise preservation of full audit records. The principal theorem starts
from a reached committing transaction with an exhausted cursor and explicitly
fresh distinct record identities. It constructs the combined decision and proves
that contract. Source binding and erasure to the earlier lifetime execution are
proved, rather than supplied as output assumptions.

Other checked statements establish idempotence of identical full-record retry,
refusal of conflicting identity reuse, preservation of unrelated records, and
confirmed rollback's unchanged committed data/audit stores. Aborted transactions
contribute no data commit event. Retired private cursor history does not reserve
audit IDs forever.

## Manual commands and observations

All commands used the existing manual logger and a 180-second process-group
limit. Toolchain and dependency pins were unchanged: Lean 4.35.0, Mathlib
`56a005855ea17e0b0958f73ec801ae140b0a1679`, and Aeneas support
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`.

The accepted model and specification were freshly compiled in checkpoint 2:

- `LAKE_NO_UPDATE=1 lake build RegistrationAuditedLifetimeModel`: exit 0,
  10.183 seconds; 754,704-byte OLean, SHA-256
  `005abac7f24193aafb66e9660117d0a6c69eb832462e440de8db20cc965148d4`.
- `LAKE_NO_UPDATE=1 lake build RegistrationAuditedLifetimeSpecification`: exit 0,
  5.624 seconds; 81,568-byte OLean, SHA-256
  `187f5c9f23faedd2bd18e80540a355ebd96d8bd6346493eb1d774050f52ac7ee`.

Checkpoint 3 changed only proof bodies and reused those exact accepted outputs:

- `LAKE_NO_UPDATE=1 lake build RegistrationAuditedLifetimeProof`: exit 0,
  25.962 seconds; fresh 1,069,320-byte OLean, SHA-256
  `25e71afa9c3a21d88312fe573a7b7ec2eba71c932e294ef50646f7e3aeb808e8`.
- All thirty declaration guards ran; eleven printed axiom closures use only
  `propext`, `Classical.choice` and `Quot.sound`, or no axioms. No `sorryAx` or
  compiler error appears in the accepted proof log.
- The proof log is 18,317 bytes, SHA-256
  `be7a2e686fc3bdc6fa102ac100b7375c974be0daa118d6edcb5536bd160b41cf`.

Source and tool inputs were unchanged during each run. Lake rebuilt three older
prerequisite modules against unchanged sources in checkpoint 2; their actual
resulting OLean identities were recorded and used for checkpoint 3. The result
does not assert that those rebuilt binaries equal their earlier artifacts.

Earlier failures are retained as failures. Checkpoint 1 stopped at a nested
record-update parsing error and produced no model OLean. Checkpoint 2's proof
failed on library lemma names, explicit list-count/composition reasoning and
constructor case inference; its axiom guard rejected the resulting unfinished
proof. The corrections changed proof bodies without weakening statements or the
independent specification. Private launcher preflights also hit Path-to-text
parsing and manifest-status errors before compilation; they are not evidence of
model or production failures.

Exact source hashes, commands, previous failures, prerequisite identities and
limitations are in the
[Hub receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/audited-store-foundation.json).
The accepted model, specification and proof source hashes respectively are
`6beefe9ff1eecb8b56143e3cc189e2bc6719b684c2236ea3ebb59eca9e93b4f6`,
`bd4fccf6ac3dbca608a8e20b0d314fd3bbd0ddf83295f7ff77f81c6fa2a431d9`, and
`f2f96090d096ca72fa2208bc7efe8065eeab02a59cc01b428cc3597acc6eb1b5`.

## Boundaries and next work

PostgreSQL atomicity/locking and Core's append and duplicate-identity behavior are
assumed native contracts. Encoding, target construction, schema admission, UUID
generation and cryptography are not proved. Distinct noncolliding IDs are a
scoped attempt precondition, not a global freshness axiom. Foreign audit appends
are restricted to IDs disjoint from active private records; retention and
conflicting foreign writers remain outside this model. Audit sequence numbers
are not treated as commit order.

Concrete populated execution witnesses and deliberate semantic faults have not
yet qualified this extension. The next case will construct replacement from a
valid explicitly seeded model with two old registrations, followed by independent
full output checks. Later cases cover removal, failed append/abort/retry and a
source-shaped postcommit refusal. A missing final Register instruction must fail
the unchanged independent contract, with its wrong output observed separately
and exact restoration checked.

Namespace registration, updates, expiry and ordinary deregistration still need
adapters. Full service responses, successful served-marker writes, listener
convergence, external environment preparation, bootstrap effects and liveness
remain unproved. These limits are retained in the
[source boundary](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/AUDITED_STORE_SOURCE.md).
