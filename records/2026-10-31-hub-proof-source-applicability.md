# Connected proof source applicability

Hub commit `e68d33a` records a read-only applicability audit after the partial
[caller control checkpoint](2026-10-31-hub-caller-deadline-control.md). This is
source evidence, not a new Lean theorem, native test or deployed result. The
unfinished independent counterexample remains unfinished; it was not retried.

GPT-6 Astra inspected Git source objects and recorded SHA-256 identities. Fetches
of both repositories' `origin` succeeded. At inspection, local Hub was `f8faea5`
and `origin/main` was `0ff0819`, with 22 local-only and 11 remote-only commits.
Local SDK was `6afa18a` and `origin/main` was `7459481`, with 13 local-only and three
remote-only commits. No merge or dependency update was made. These references
identify source, not the running deployment.

## What remains the same

The receipt compares ten Hub and seven SDK files, plus five explicitly delimited
source regions against their qualified source bases: Hub `3bc2923` and SDK
`239622d`. All five regions match byte for byte in both inspected local and remote
revisions:

- Hub's HTTP client constructor;
- Hub's current-policy, permission-narrowing and client-construction call sequence;
- Hub's `issue_bearer_token_until` body;
- SDK's identity-construction body;
- SDK's delegation-validation body.

The local Hub HTTP file's other change is error-display formatting. This leaves
the existing scoped caller result applicable to the same extracted body, subject
to its previously recorded model and dependency boundaries. Text equality alone
does not prove equivalence of callees, changed record types, compiler contexts or
the complete running program.

## What requires integration and requalification

The newer remote Hub adds three relevant surfaces outside the existing graph:

- `forwarded_bearer`, a separate non-MCP forwarding function with its own clock,
  lifetime, context construction and error path;
- `AppOrigin` target cases in the policy and contract code;
- a `surfaces` field in the complete `RegisteredServer` record.

The current complete-field proofs concern the earlier record. They cannot be
silently extended to the added field or forwarding function. The remote Hub also
pins SDK `154a473`, whereas local Hub and the canonical extraction use `239622d`.

SDK `6afa18a` includes the previously qualified source preparations: explicit
context guards, ordered scope/actor construction, explicit identifier-error
mapping, a typed signing wrapper, and the string/binder changes needed by the
extractor. Its intervening history also includes MCP Apps work. Existing focused
native tests and source review are not formal equivalence of the older pinned SDK.

Fetched SDK `7459481` retains the earlier formatted actor-ID expression and private
binder, and updates every Core dependency to `4ebcf89`. That Core commit fixes a
parked Task not being queued after an operation settles while waiting for a row
lock. It changes Task operation SQL and callers; it was made outside this proof
effort. Comparing Core `120306e` with `4ebcf89` found no changed path under
`platform/types`. That narrow fact does not qualify the new Task behavior or
discharge PostgreSQL/SQL refinement assumptions.

## Consequence for the plan

Keep the current proof claims tied to their recorded source. When integrating
newer source, preserve both the proof preparation and the other agents' changes,
coordinate SDK/Core pins, and requalify the changed record, policy cases and new
forwarding path. Reuse unchanged proofs only after their model correspondence is
checked. Do not repeat unrelated proof packages merely because a source revision
changed, and do not claim the newer stack is covered by the old graph.

The [machine-readable audit](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/source-applicability-20261031.json)
contains exact revisions, file/region hashes, extraction anchors, comparison
results and changed Core Task paths. No build, runtime/policy change, paid model
call, deployment or new proof machinery was introduced. The audit is committed
locally and has not been pushed. Overall coverage remains partial and the
comprehensive verification goal remains active.
