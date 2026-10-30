# Registration concurrency: source review and first native probe

This starts HUB-REGISTER-01 after the qualified refresh concurrency slice. It is
source-review evidence, not a proof or a confirmed defect. The inspected Hub is
local `main` at `3c0d3bf`; its registration runtime sources still match the earlier
read-only review. Core is evaluated at Hub's pinned
`120306eb969c6134dadd422dca701a2ce63e9492`, not the sibling checkout's newer main.

GPT-6 Astra reviewed the transaction boundaries and specified the first probe;
GPT-6.1 Sol owns its native fixture implementation, and GPT-6 Luna owns the
frozen-source, logged checks. No provider/model-driven acceptance or deployment
is part of this investigation.

## Observed operation boundaries

The [registration store](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/registration/store.rs)
has distinct paths that the specification must preserve:

- Namespace registration creates a claim if absent and checks its pinned key.
  It creates a deployment if absent, then reads its metadata and storage binding.
  Matching metadata admits an additional process registration and login. Changed
  metadata replaces the deployment binding, deletes its previous registrations
  and drops their logins before admitting the new registration. A change of slug
  also checks the former namespace's key.
- Instance registration always replaces. If the instance uses another data
  environment, its server schema/group preparation happens in that database
  before the installation transaction. This is not a cross-database transaction.
- RFC 7592 update changes one registration's metadata and software statement and
  its deployment's metadata. It preserves the registration's deployment, slug
  and login. It deliberately does not update every other replica's metadata, so
  equality of all replica metadata is not a valid global invariant.
- Deregistration, collection and instance removal remove registration rows and
  logins. They have different leading statements and must be examined separately
  before claiming one common lock protocol.

The [service](https://github.com/VeoveoAI/veoveo-hub/blob/main/crates/veoveo-hub/src/registration/service.rs)
authenticates and verifies the incoming registration before store mutation.
Registration audits and catalog reload occur after the store transaction commits.
An error in that later work can accompany committed registration state. Unlike
the refresh success audit, these audits are not in the mutation transaction.

## Question the native probe must answer

Both namespace-claim creation and deployment creation use `ON CONFLICT DO NOTHING`.
The following deployment read has no `FOR UPDATE`. The replacement upsert takes
a row lock, but matching-metadata replica admission skips that upsert. This makes
an old replica overlapping replacement a race candidate; catalog DDL or other
database locks could still serialize the actual path. Inspection alone does not
establish which schedule is reachable.

The first probe exercises the actual registration store against disposable
PostgreSQL. A fixture-only barrier holds an old-metadata replica before its
registration insert while a changed-metadata replacement runs. It observes
blocking with `pg_blocking_pids` and compares complete deployment, registration
and login state. No production failpoint or timing-only sleep establishes the
schedule. If an earlier native lock prevents the proposed overlap, the result
must record that rather than bypassing it.

For registration/replacement-only histories, the proposed property is equivalence
to a permitted serial order of their existing operations. An old replica surviving
beside a replacement would not match either serial order: replica-then-replacement
removes it; replacement-then-old-registration treats the old metadata as a new
replacement. This property does not impose a new authorization rule or require
every registration in arbitrary RFC 7592 histories to share metadata.

Separate questions remain: whether update can affect deployment metadata after
its client row was removed; instance removal/reissue overlap with already admitted
requests; and the existing cross-repository slug preflight under concurrent first
registration. These are hypotheses to test, not established defects or reasons
to add admission checks.

## Formalization boundary

The transaction model must follow observed statement order and lock coverage,
derive the complete committed effects rather than assuming a correct operation
at its commit primitive, and include valid replica/replacement success as well
as rollback. PostgreSQL atomicity, constraints, row/catalog locks and isolation
are external assumptions. Native tests connect these assumptions to actual Hub
queries; they do not constitute formal SQL or async-Rust refinement. Signature
verification, Core schema/login functions, cross-database preparation, post-commit
audit/reload and eventual catalog adoption keep explicit separate boundaries.

Checked source SHA-256 identities:

- `registration/store.rs`: `88a1066cb31f1a92ad8732ffc03a4f5374dbebfe54f59140900485f7c18db7f1`
- `registration/service.rs`: `e3faf42b5ea3288da8085ec1a408e2311028909eeb610fa112db6167d690115e`
- `registration/store/deployment.sql`: `9b9684edebb3e1ec670dcc26530d14ea3e3ee1c03489da6527b52cb3c1f9a8fb`
- `registration/store/replace_deployment.sql`: `43f4784f66354856745954ea462e9b7f63e24c035971e3540ea961ab6433b29c`

No registration source, policy or data-model change was made by this review.
