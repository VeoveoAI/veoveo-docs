# Refresh predicate controls and restored baseline

The exact extracted refresh binding and delivery predicates are now qualified
within their stated primitive-model boundary. Two isolated Rust mutations break
the unchanged Lean proof and the corresponding native PostgreSQL test. A third
mutation is native transaction evidence only. No production authentication rule
was changed.

GPT-6.1 Sol implemented the predicates, fixtures and reviewed fault interpretation;
GPT-6 Luna ran logged frozen checks; GPT-6 Astra reviewed scope and evidence.
Extraction used the recorded Hub `bb2e97f` base with the committed proof/test
overlays, SDK `239622d`, Core `120306e`, Aeneas `fdebf20`, Lean 4.35.0 and Rust
nightly 2026-09-17 on Linux. Native tests used Rust 1.99.0 and private PostgreSQL
18.6 on the Mac. These are component checks, with no deployed or model-driven
acceptance run.

- **Inclusive delivery deadline:** changing `expires_at > now` to `>= now`
  extracts successfully. The unchanged proof fails on inclusive versus strict
  timestamp order; its helper models compile. The native test first accepts the
  inside-window case, then fails its exact-boundary assertion, “equal delivery
  deadline must detect replay” (exit 101, 3.369 seconds).
- **Client binding bypass:** ignoring the OAuth client comparison extracts
  successfully. The unchanged `bound_to_exact` proof fails because the computed
  result no longer requires all three binding fields; helper models compile.
  The native test fails “a different public client must not revoke the family”
  (exit 101, 2.232 seconds).
- **Commit before audit:** splitting the actual rotation and audit into separate
  transactions compiles, then the audit-failure test observes generation 1 where
  rollback requires 0 (exit 101, 2.020 seconds). This is a concrete native
  transaction counterexample, not an extracted async/SQL proof result.

Each native witness used the same binary hash recorded by its successful no-run
compilation, with one intended assertion failure and no timeout. The first two
formal failures are symbolic mismatches paired with concrete native examples;
we do not claim Lean generated a concrete counterexample or proved `False`.
Temporary helper setup failures were excluded: a missing approved patch/path,
the sibling authority package link, and source-location metadata normalization
were corrected before crediting semantic outcomes. Raw outputs are retained.

Restoration used fresh original extraction: Charon passed in 24.660 seconds with
`has_errors=false`; Aeneas passed in 1.973 seconds. The source verifier was
corrected to use the reviewed extraction annotation overlay rather than the
native catalog hash; all 909 merged paths matched. Only source-comment metadata
was normalized for generated correspondence. The original proof source remained
SHA-256 `07a0b7ff84c110b459ba2d7556b08c3891104837a6fa1605a71d6ddd25f8eded`.

The restored full package passed in 37.929 seconds, direct refresh proof in
2.819 seconds, and all five existing/new axiom audits in 2.5–2.6 seconds each.
The eight new predicate theorem closures use only standard Lean axioms.
Native restoration passed the four new tests (26.373 seconds including compile),
five `hub_state` tests (37.057 seconds including compile), formatting and strict
library Clippy (8.820 seconds). The original frozen native source was unchanged.

The [compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/refresh-controls-receipt.json)
records exact patches, source and output hashes, commands, timings and raw log
references. Historical mutant binary paths share a warm target directory and
were subsequently overwritten; their measured hashes are evidence, not a claim
that every old binary is still retained.

Native identifier/time representation, decoding, caller wiring, crypto, SQL
refinement, physical durability and HTTP delivery remain separate obligations.
The transaction model's history/replay/positive-execution work is tracked
separately. No runtime proof checks, CI hooks, new authorization restrictions,
deployment changes or paid model calls were introduced.
