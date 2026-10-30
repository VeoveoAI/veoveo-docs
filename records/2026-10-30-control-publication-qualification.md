# Configuration publication transaction qualification

The configuration-publication design model is proved within its stated boundary
and qualified with separate native PostgreSQL evidence. The complete Lean package
passes; two deliberate Rust faults fail their intended database assertions; fresh
original-source native validation passes again. This is not formal refinement of
the asynchronous Rust/SQL implementation, and it does not verify replica adoption.

The [package and specification](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/control_publication/README.md)
and [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/control_publication/evidence/control-publication-receipt.json)
record the exact inputs and boundaries. Earlier records cover
[source mapping](2026-10-30-control-publication-source-review.md), the
[native baseline](2026-10-30-control-publication-native-baseline.md), and
[faults/restoration](2026-10-30-control-publication-native-controls.md).

## What the model establishes

The state machine describes arbitrary finite interleavings of publication attempts,
including individual staged writes, lock acquisition, predecessor comparison,
commit/abort and response delivery. PostgreSQL's modeled commit can apply an
incomplete staged list; application completeness is derived from the instruction
sequence, not built into a database precondition.

- At a protocol commit, every planned revision/object/context/audit statement has
  been staged, and the checked predecessor is still the locked active revision.
  Expanded grant/membership clear-and-insert loops produce the independent expected
  row projection, including empty lists and removed contexts.
- While revision history is retained, two committed attempts cannot have the same
  predecessor. The proof derives this from the initial active-pointer foreign-key
  condition, the lock comparison and revision insertion's primary-key check; it
  does not assume a unique-winner oracle or unchecked fresh IDs.
- The tracked committed projection equals an ordered replay of committed publisher
  plans. A reachable aborted attempt appears in none of those events and contributes
  no publication writes or successful batch. Other publishers may still commit;
  this is not a claim that the global database never changes after a failed call.
- The modeled valid audit batch preserves stored records and contains every supplied
  record. Identical records are idempotent; conflicting incoming IDs are refused.
- Constructive executions establish legitimate initial and replacement success.
  Concrete witnesses satisfy the actual modeled statement constraints, update a
  retained context, remove another, create a new context with empty grants, and
  retain prior revision/audit rows. Safety is not made vacuous by blocking every
  publication.
- A reachable client-error state permits either server commit or server abort.
  Another reachable execution commits and then loses the acknowledgement; a
  concrete instance has an error response and a newly committed revision. An error
  therefore cannot imply rollback. These are model executions, not native network
  fault experiments or a guarantee of progress under every scheduler.

The mathematical replay is proof-only state. No runtime journal, admission rule,
authorization check, service, CI hook or recovery framework was introduced.

## Validation and source identity

Sol `/root/coder` implemented the model/proofs/tests and reviewed failures. Luna
`/root/builder` ran logged native and Lean checks against frozen copies. Astra
`/root` reviewed the actual Rust/SQL order, assumptions and theorem statements;
independently checked final stage-log digests and native source correspondence;
and reviewed both exact native failures and restored executable identities.
No deployed or paid-model qualification was run.

Final Lean source is checkpoint 9: 81 overlay paths on Hub
`bb2e97f5c984a53eaa218109e4c01a70e952e365`, with SDK
`239622d12c08b771cc5e813fe3e846385d8d04ad` and Core
`120306eb969c6134dadd422dca701a2ce63e9492` unchanged. Archive SHA-256:
`715d9493145f6e2a5b79556cbc62714b84f1b86c1199b48889a8648f64851eeb`.
Source manifest:
`c32131c944ac7ceea9cb00e77ff224e4078b5ae11bdcfab46666e642d7c45cba`.
The command-only correction is manifest 10:
`1f821da4d261a001401b9c04ef5d5c2e5320fb16e69d9bc90595a755af418901`.

The final fresh Linux package uses Lean 4.35.0 and the pinned Aeneas package
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf` for its existing dependency setup.
This slice does not run Rust extraction. The uncertainty target build and direct
proof passed in 16.191 and 2.768 seconds. A direct witness check then stopped because
the command sequence had not built its `PublicationExamples` import. A continuation
on the same verified source built that prerequisite and completed:

- examples target: 3.670 seconds;
- concrete witness proof: 2.969 seconds;
- full default package build: 3.820 seconds;
- history proof: 3.620 seconds;
- committed-state replay proof: 2.868 seconds.

All continuation stages exited 0, with the source map verified unchanged before
and afterward. Earlier proof-development failures and the missing-import attempt
are retained; they are not accepted semantic controls. Executable axiom checks
cover the public proof declarations, including the concrete witnesses. Accepted
closures contain only standard `propext` and `Quot.sound`, or no axioms; no accepted
log contains `sorryAx`. This kernel result does not establish the correspondence
between the model's database operations and a real PostgreSQL implementation.

Native checkpoint 5 and final source 9 differ only in eight proof/target files.
There are no Rust, SQL or query-metadata differences between them. Thus the accepted
native baseline, both private faults and fresh restoration apply to the exact
native inputs retained in the final package. The four restored tests, formatting
and strict library Clippy passed. The actual production publication method remains
byte-identical, SHA-256
`5fd8da2683e4acc81f0a28fc4246d98456b9c82a6bb32ccd891b352f07f12830`.
No original production publication bug was established.

## Evidence and limits

Final local evidence under `/tmp/hub-control-publication-20261030/`:

- `evidence-checkpoint-run6/summary.json`:
  `a419946e16ca20d0bb620eccec230339d2ead3eaba0d3f439e53f42da0abceff`;
- `evidence-checkpoint-run6-continuation/summary.json`:
  `d03fb1ae03a7d79693a2ee926c174f7804fe61d9d5601a6c744211d4f6e23ef5`;
- `native-publication-checkpoint5-restoration-run1/summary.json`:
  `e52cc7cc7cd5d5317b865f6d59ff7be268779945ee11290adbac36f23e4b03e5`.

PostgreSQL atomicity, Read Committed visibility and locking, constraints, SQLx
transaction behavior and the concrete same-connection audit implementation remain
explicit correspondence assumptions. The model's context payload covers mutable
fields; preserved key/tenant/creation fields have native evidence. Admission,
serialization, deterministic IDs, full SQL constraint semantics and the authentic
prior document used to generate audit drafts are not formally refined here.
Unrelated rows and independent rejection audits are explicitly disjoint projections;
other writers that alias tracked keys, history deletion and Task-route cascades need
further composition. Sequence allocation, physical crash durability, asynchronous
replica adoption and liveness remain outside this result.

`HUB-CONFIG-01` therefore stays partial. The next transaction slice is refresh-family
concurrency, followed by registration/replacement; local replica adoption belongs
to the later request/discovery composition work. The wider ten-area goal remains
active. Source and reports are uncommitted at this checkpoint.
