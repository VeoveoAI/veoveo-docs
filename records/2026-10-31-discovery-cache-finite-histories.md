# Finite cache histories and stale-response fences

Hub `5aa01ef` commits proofs over arbitrary finite sequences of the supported
actual cache operations. Starting from the empty representation, these histories
preserve the cache invariants. An older-generation response stays harmless after
any supported suffix. Full key invalidation also continues to fence its old
response across replacement work, provided accepted later requests for that same
key do not reuse the old ticket.

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran the manual Linux checks, and
GPT-6 Astra reviewed the relation, theorem statements, complete logs and identities.
Runtime source remains Hub `688b91a`, SDK `154a473`, Core `120306e`. There are no
runtime, generated-model, primitive-model or configuration changes.

## History construction and guarantees

[CacheHistoryProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/CacheHistoryProof.lean)
defines each step through the actual extracted method's normal-return equation.
It includes cached reads as observations with unchanged state, plus start,
completion, cached-only removal and full key invalidation. There is no copied
executor and no invariant in the step/history premises.

Induction from empty derives strict key order, uniqueness, each map's 4096-entry
bound, stored-key generation coherence and nondecreasing generation. The history
can contain accepted and rejected requests, successful and failed discovery
payloads, reads and invalidations; each included operation must return normally.

The generation fence follows through any later supported finite suffix. Once a
reachable state's generation exceeds the old fetch's generation, completing that
fetch returns `false` and preserves every field of the final state. This needs no
request-ticket freshness premise.

The replacement fence starts with actual full key invalidation, derives ticket
absence, and maintains exclusion through the suffix. Its `Nonreuse` assumption
restricts only accepted start outputs for the same key. Other keys, rejected
starts, unused callback observations and other operations are unrestricted. The
proof derives the final mismatch; it does not assume the desired final lookup.
This is a scoped finite-history assumption, not universal UUID freshness.

Constructive acceptance theorems build a noncoalesced initial history and append
a successful generation advance to any reachable prefix. They retain the exact
observed ticket, key and zero denied count, and construct the full extended
history. No clock-success premise is needed for those starts. Cached-only removal
remains distinct from full key invalidation and is not claimed to fence work.

## Measured checks and repairs

The first check failed after **2.752 s** on the reserved identifier `prefix`, an
unreduced pair projection in the accepted-output rewrite, and an unspecified
induction-tail index. The second failed after **2.696 s** on one multiline record
layout in the generation-advance acceptance theorem. These were proof-authoring
errors, not production defects or semantic negative controls. Neither failed
module was qualified from its partial theorem-audit output.

The third check passed with exit 0 after **2.847 s**:

```sh
LAKE_NO_UPDATE=1 lake env lean CacheHistoryProof.lean -o .lake/build/lib/lean/CacheHistoryProof.olean
```

All **12 executable guards** passed. `start_excludes` permits only standard Lean
logical axioms. Eleven history/completion declarations also permit precisely the
existing native `Instant.add` Result boundary. All seven printed history closures
include that boundary and contain no `sorryAx`.

The initially narrower audit expectation for constructive start histories was
corrected after inspecting the actual dependency: `History` and `Step` include
the completion equation in their types. Therefore even a start-only history
theorem depends on its addition boundary. This does not assert that time addition
executes during a start, and introduces no new primitive assumption.

Seventeen source/configuration inputs, the effective private configuration,
twelve qualified prerequisite OLeans and supporting library identities matched
around the accepted run. Dependencies were reused without rebuilding under the
previously recorded Lean 4.35.0/private Aeneas configuration. One unused
simplifier argument remains as a warning.

- Checked source: **20,772 bytes**, SHA-256
  `03ed390d3d60baa1589409c4cf0b5d0d3b6403a09445ca2ee5c14f0071858e33`.
- OLean: **589,072 bytes**, SHA-256
  `174e90daf949c70e1794899ea3d3f5dce882e0c1149acc5ae4e0ac947556b45e`.
- Accepted log: **1,436 bytes**, SHA-256
  `8e12d74b50b88472044f3b86925690f7ee120da4fc182845e30e3c0a340be25a`.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/finite-histories-20261031.json)
records all attempts, source/artifact identities, commands, audits and remaining
boundaries. The second log's corrected measured size is 1,161 bytes; an initial
worker summary had repeated the first attempt's byte count.

## Remaining boundaries

These are finite supported normal-return histories. Native construction,
collection/identifier/clone/equality/clock correspondence and the connection to
the async mutex wrappers remain explicit external obligations. No post-panic
state, callback-effect counts, liveness or native scheduling proof is claimed.

Actual-source semantic controls and fresh restored checks are next. Server-wide
invalidation retains its recorded translation limitation; listener freshness,
client caching and cross-replica delivery remain open. No native or Docker test
reruns, remote push, deployment or paid model calls occurred in this checkpoint.
