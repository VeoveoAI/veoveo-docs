# Constructed snapshot identity through retained routing and HTTP context

Hub commit `3cf2feb` connects the actual snapshot constructor, selected registration
lookup and HTTP-client construction. The proof derives the key-to-row deployment
invariant instead of assuming it, then proves exact per-slug acceptance/refusal and
preservation of the accepted request's destination and context. No production bug
or runtime change was found in this slice.

## What is established

`SelectedRouteContextProof.selected_get_exact` derives the actual selected getter's
result from an independent resolver: look up the slug in the captured composition,
look up its deployment in the supplied registration snapshot, then match the row's
slug. The complete map-image theorem and unique native composition keys establish
exactly zero or one matching whole registration. Unavailable or absent components,
missing deployments and wrong-slug registrations have no fallback. A matching
present route returns its complete current row.

`SnapshotConstructorProof.new_success_coherent` derives that every stored map key
equals its row's deployment field. It proves preservation through overwriting
insertion and finite collection, then connects those operations to the actual
constructor's mapping closure and wrappers. Repeated deployment IDs may carry
different complete rows; no input uniqueness, sortedness or duplicate-compatibility
requirement is introduced.

`constructed_route_context_exact` combines these results. The HTTP client identifies
the captured deployment and requested slug, uses the current row's endpoint, and
preserves the full expected actor, authority, client, delegation, supplied permissions
and request context. The actual request-context result is exact for direct and
delegated subjects. A retained deployment does not freeze its endpoint or declaration
forever: current means the supplied catalog generation for this request, not a claim
that it is globally the latest database state.

The caller was reviewed: `catalog.server()` delegates to registration lookup;
`connect_upstream` clones the returned registration once and uses that same local
row for transport, permission calculation, HTTP construction and discovery endpoint.
This is source correspondence review, not formal extraction of the async caller.

## Execution and evidence

GPT-6.1 Sol implemented the proof leaves, GPT-6 Luna ran the frozen-source Linux
checks, and GPT-6 Astra reviewed specifications, source connections, audits and
receipts and committed the result. Runtime inputs remain Hub `3bc2923`, SDK
`239622d`, Core `120306e`; supporting model adoption is `dd20465`. Lean is 4.35.0
with the already documented private patched-tool workflow. No source or dependency
pin changed for these proofs.

- Route direct compilation passed in **2.678 s** and emitted its OLean. Two earlier
  attempts failed in **2.726 s** and **2.677 s** on proof-local conjunction ordering,
  equality/type inference and list-rewrite normalization.
- Constructor direct compilation passed in **3.528 s** and emitted its OLean. Its
  first attempt failed in **2.628 s** on an implicit pair metavariable and an
  unreduced match before the actual mapper rewrite.
- `LAKE_NO_UPDATE=1 lake build SelectedRouteContextProof SnapshotConstructorProof`
  passed in **6.332 s**. These are explicit nondefault targets; no CI trigger was
  added. Timings are command execution times, excluding setup, review and transport.

All nine executable canonical-name axiom audits passed without `sorryAx`. Primitive
invariant and field lemmas use standard axioms; the actual caller results additionally
name the existing namespace helper, and the HTTP theorem type also names the two
native error-formatting functions. No successful formatting result or helper
completion is assumed. The failed elaborations were rejected by these audits and
are not semantic counterexamples or production defects.

The final check verified the same 66 source/configuration paths before and after;
their map SHA-256 is
`34484531a474b1abdf15a18a245baa610f2e5edfeba05e6089d17905ff641383`.
The only final configuration change was adding the two nondefault proof targets.
The final route OLean is
`4c764902770c7e4d4d71dfd94eda3a407fdd8614b5cbef26c0aa2dbffc622b6b`;
the constructor OLean is
`edad6a3ee0ed641ae22c20d7233b372631467a5f0e79008281dce1b2fbb56c6a`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/constructed-route-context-checkpoint.json)
records exact commands, successful and failed source/log identities, effective
source map, audit allowlists and compiled artifacts. It is SHA-256
`529bc627fda3d255cc3de1a866a7d44b3901472c9453fbb29fddd3b15475a474`.

## Boundaries and remaining work

The constructor proof assumes a finite operational cursor law, successful input
conversion and a valid initial cursor. It proves coherence of the actual result,
not full input presence or a complete last-written-row content specification.
Successful construction and selection remain conditional on the unresolved namespace
helper. Native BTreeMap/Arc/iterator/equality/ordering/allocation correspondence and
the compiler/translator/Lean toolchain remain trust boundaries. Composition-key
uniqueness is native representation correspondence, not a new application rejection.

Current-policy provenance of the supplied permissions, SDK issuer/recipient
composition, async caller refinement and combined source mutation qualification
remain open. Earlier entry/getter mutations retain their narrower recorded scope;
no new combined mutation was run here. These commits are local, not pushed or
deployed. No native component test, full Docker gate or paid model call ran for
this proof-only milestone. The comprehensive Hub goal remains active.
