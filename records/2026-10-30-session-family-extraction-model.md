# Existing session-family predicate extracted and modeled

The unchanged `SessionFamilyAuthority::allows` now extracts alongside the qualified
SDK/current-policy/delegation package. The extended model builds, all preceding
proofs rebuild, and four dependency audits pass. This is an extraction/model
checkpoint: the independent session admission theorem, native witnesses, semantic
controls and restored qualification are still pending at this checkpoint.

## Source and scope

Hub base `bb2e97f5c984a53eaa218109e4c01a70e952e365`, the prior 53-file native
overlay and SDK runtime `239622d12c08b771cc5e813fe3e846385d8d04ad` are the same
verified inputs as the [SDK-to-Hub qualification](2026-10-30-sdk-hub-authorization-qualification.md).
The separately identified SDK proof-edition metadata does not change runtime SDK
source. `crates/veoveo-hub/src/policy/session.rs` is byte-identical to the Hub base:
SHA-256 `3aff520943d1458c6bb37ae9db5ee5ca1a5fc9eb06c41a1083e381ede696e46f`.

The extraction adds one root and include, `veoveo_hub::policy::session::_::allows`,
to the successful prior plan: five roots, 21 includes and the same 11 explicit
opaque boundaries. The existing catalog field-name annotation remains confined
to the extraction copy. No session seam, production check, policy change or
whole-admission oracle was introduced.

The emitted method is a transparent definition with its actual short-circuit
control flow. It checks family-ID presence, revocation, strict family expiry,
owner/tenant, authorization server and protected resource, OAuth client and Work
Context, retained identity, token/current-principal issuer and subject agreement,
and scope containment. Refresh generation and the retained original IdP issuer
are deliberately not compared. The generated `PartialOrd::gt` default is retained.

New ordinary primitive models supply equality and scope ordering, plus Chrono
comparison over the existing full `Int × Nat` timestamp representation. They
retain subsecond ordering. Three UTC dictionary payload types and ordinary UTC
dictionary operations satisfy the generated interfaces; admission does not inspect
those payloads. Formatting delegates the pinned Aeneas model and establishes no
native formatting guarantee. There are no new native-operation axioms.

Source comparison found all 165 preceding type blocks unchanged apart from source
locations. Of 131 preceding function/declaration blocks, 122 are unchanged; nine
PartialOrd dictionaries gain the generated reachable `gt` field and its `impl_def`
form. The prior algorithm and closure bodies are unchanged. Rebuilding the prior
proof package checks compatibility with that generated dictionary expansion.

Native Chrono timestamp projection/order, collection and identity representations,
Rust/compiler/extractor correspondence remain refinement boundaries. The model does
not verify Chrono's calendar or memory implementation. Exact family selection from
the signed ID belongs to the store caller; this method observes only presence.
JWT validation, principal construction, `from_stored` serialization, read deadlines,
clock sampling and authoritative freshness remain outside this extraction. Unbound
tokens are admitted separately by the outer caller, not by this predicate.

## Measured execution

GPT-6.1 Sol `/root/coder` prepared the extraction scope and models; GPT-6 Luna
`/root/builder` executed logged jobs on Ubuntu Linux x86_64; Astra `/root` reviewed
the actual emitted method, model boundaries and mirrored artifact identities.
Extraction used the existing pinned 2026-09-17 Rust nightly and Charon/Aeneas
binaries; proofs used Lean/Lake 4.35.0. No deployment or OpenCode scenario ran.

- Charon exited 0 in 33.021 seconds; LLBC reports `has_errors=false`.
- Aeneas exited 0 in 1.870 seconds.
- The fresh extended default Lake build exited 0 in 37.828 seconds.
- ModelAudit, CurrentPermissionsModelAudit, NativePolicyModelAudit and
  SessionModelAudit exited 0 in 2.568, 2.568, 2.618 and 2.568 seconds respectively.

SessionModelAudit checks the actual method and every added primitive operation.
Its accepted dependency closures contain only `propext`, `Classical.choice` and
`Quot.sound`, with no `sorryAx`. This audits the Lean definitions; it does not turn
the native representation boundaries above into proved library implementations.

The first model build failed on an authored documentation comment immediately
before `#print` in the new audit. Changing that comment to a normal block comment
fixed the syntax; the direct audit then passed before the fresh full run above.
That failed setup is retained separately and is not a semantic mutation result.

## Artifact identities

Extraction plan SHA-256:
`20989b3fc1c337109a47369e609ccd613c3c3a1490960af326f4df8d5adf163d`.
Extraction summary:
`3488493ff06298d72b2217f0a792fcd462706d64a0d20264aa2c839afbc1d8c3`.
LLBC is 4,121,451 bytes:
`5c909f892fea0e26e570cb3b07924f50bb7cd43b0f5a8f4816f1585a3bd0054d`.

The successful model freeze contains 54 overlay files over 826 base files, yielding
842 merged paths. Overlay archive:
`e1a0b78f5a2ffae9b36ad23411475987671a19c86acf675d76b1bfad08704ab4`;
manifest:
`8da1d4cda6a7a5bac1da751aaa7c0794216aa075ae32e4b7cae76988962a65b9`.
Model-run summary:
`581e40bb94cdb8d6e0800bf8d47d5f28633c65b439c9de71172c61ad5564eec0`.

Generated Types/Funs remain exactly the probe outputs:

```text
Types.lean (95,761 bytes)
6f7534408dfeeeaea56afd035bede7dd14c777295066bf2a9f41b34f8cca93ba
Funs.lean (157,290 bytes)
445dee3644b5d80de20aab0b226e6d6c2d1b2d2fdc95da96e312f973bc239b76
TypesExternal.lean
2c4c8ca2c5292ec38c6afe92ccbbc2cde02e01030ece2ac3f25034676d422482
FunsExternal.lean
091e77ac473986eba833e96003fd09d1bb0b4228e97b30d5e7598104f2115873
```

Logs, exact commands, frozen manifests and generated outputs are mirrored under
`/tmp/hub-session-family-20261030/evidence-probe-1/` and
`/tmp/hub-session-family-20261030/evidence-models-run2/`; the excluded first model
run is in `evidence-models-run1/`. Successful remote runs are `session-probe-1`
and `session-models-run2` under `/home/rozgo/.cache/lean-pilot/hub-session-family-20261030/`.
This checkpoint claims no new native session test, complete session theorem,
refresh transaction proof, publication or deployed applicability.
