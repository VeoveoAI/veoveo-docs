# Browser membership: unchanged-source translation boundary

The actual current-membership graph extracts through Charon, but the pinned Aeneas
backend cannot translate it completely. This establishes a tooling boundary, not
a new Hub defect or a proved browser contract. Runtime source is unchanged.
Hub `bcb20eb` records this evidence and the coverage boundary.

GPT-6.1 Sol traced the source and prepared the probe; GPT-6 Luna executed it on
Ubuntu Linux x86_64; GPT-6 Astra reviewed the graph, diagnostics and output hashes.
Source is Hub `a751c9b` with SDK `7360c0f` and Core `422dcf2`. The relevant source
and Cargo input hashes still match main `a0794ab`; intervening changes are proof
documentation and evidence.

The three roots are `EffectiveOAuthClient::membership`,
`HubCatalog::work_context_membership` and
`WorkContextDefinition::membership_for`. They retain contributed-authority
dispatch, actual catalog lookups, current group enrichment, selector matching and
the maximum matching membership level. No own helper is marked opaque and no
authority decision is supplied as an assumed Boolean.

## Measured execution

Locked offline Cargo metadata passed in **1.416 s**; cleaning only Hub's package
from the existing extraction target took **0.164 s**. Charon passed in
**30.065 s**, emitting **4,118,268 bytes** of LLBC with SHA-256
`c0f3a7874226019f9b2e4ae639c454c424766c8c0576803e6818326b1010bce3`.
The graph has 87 transparent own functions and 204 transparent own types, with
all required field/helper checks passing and no reported translation errors.

The initial inventory stopped before Aeneas: it expected three started declarations,
but the method selector also selected the `OAuthClientAuthority` trait. Review
confirmed exactly the three intended function bodies plus that transparent,
error-free trait. The continuation accepted that precise inventory and reused
the unchanged LLBC. It did not repeat Rust compilation or drop a branch.

Aeneas `nightly-2026.10.23-fdebf20` ran once under a 600-second bound, exiting
**1 in 1.421 s**. Its complete log is **13,377 bytes**, SHA-256
`ee8dcae5dc4b16cfddce47646a0111c5589518e6860a11d68c8da9e9c01d742b`.
Source and tool maps match before and after. It emitted four partial Lean files;
their byte identities are retained, but they contain unfinished definitions and
missing types and are not committed as usable models.

The substantive failures are:

- `EffectiveOAuthClient` contains an unsupported dynamic trait; its actual
  authority call at `oauth_clients.rs:164` uses an unsupported function pointer.
- `AdmittedCatalogSections::group_memberships` and its enrichment caller fail
  translation. The borrowed map lookup at `contract/catalog.rs:574` reports an
  abstraction that cannot be ended.
- Complete receiver types reach other unsupported dynamic/arrow types. The
  missing-type diagnostics in generated files follow those failures.

The backend also warns that its builtin Iterator model lacks `filter`, `map`,
`flatten` and `max` fields. Even a successful smaller extraction needs ordinary
library models and proof checks; emitted text alone is not a theorem.

The temporary continuation script separately needed fixes to grouped inventory
parsing, handling normal Cargo checkout metadata outside the tracked source map,
and the tool's `-version` flag. Those failures happened before translation and
are not backend evidence. No production workaround was introduced.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/computer_lifecycle/evidence/browser-membership-translation.json)
records exact commands, source and tool pins, logs, output identities and limits.
Full local evidence is under
`/tmp/hub-computer-lifecycle-20261101/browser-membership-probe1-mirror/`.
Review independently checked the current source guards, all five backend outputs
including LLBC, the complete backend log, and the actual dispatch and iterator
bodies. No Lean theorem, native test, deployed probe or model call occurred.

## Next contract, and what remains

The next candidate is the unchanged rule-selection calculation, whose receiver
does not require catalog services or dynamic authority. Its intended contract is
exact OR matching over principal/group/role/client selectors and the highest
matching level, including valid absence, order independence and duplicates.
It cannot substitute for current group enrichment or full browser admission.

The wider contract must preserve the original Computer, family ID, original
stored Principal and expiry in `BrowserSession`. Enriched groups affect the
membership decision only; any successful membership level admits. Resolver errors
propagate while membership errors become refusal, and time is sampled after
resolution. SQL lookup/join, stream readmission, cancellation and credential
custody remain separate obligations. Production will not be rewritten merely to
make the translator accept this graph.
