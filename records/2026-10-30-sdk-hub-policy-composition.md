# SDK declaration access connected to Hub policy and delegation

The actual extracted SDK access wrapper now has a total result theorem for tools,
prompts, resources and resource templates. Its derived result supplies the former
whole-access premise of Hub's registered-server decision and downstream delegation
proofs. The combined package passed all eight Lean stages. This advances the
[adapter checkpoint](2026-10-30-sdk-hub-adapter-models.md); new native qualification
and semantic controls for this connection are still pending.

## Contract established

`SDKAccessProof.access_exact` connects the generated public
`AuthorizationDeclaration::access` to raw declaration lookup. For resources, an
exact entry wins; otherwise the SDK's proved matcher/resolver requires all matching
complete access values to agree. The exact-hit theorem needs no parser, matcher
success or template-cursor totality premise. Its axiom closure nevertheless mentions
the native parser/matcher symbols through the actual access definition.

`SDKAccessCorollaries.Declares` describes declaration intent independently of current
authorization: a raw map entry for tools/prompts/templates; an exact resource entry
or nonempty, unanimous matching template entries for resources. The access result
is `Some output` exactly when that intent holds, and `None` exactly when no output
is declared. With no exact resource entry, two matching templates with unequal
complete access values return `None`. This includes Authenticated-versus-Permission
and different-permission conflicts; an exact resource entry still takes precedence.

`SDKRegisteredPolicyProof` derives the access-result premise from that result,
rather than accepting a native access oracle. It connects actual server evaluation
to the declared route and the proved current role/risk/grant calculation. A coherent
permission target records the exact required permission; Allow is equivalent to the
current grant condition. Downstream permission admission also requires the existing
managed-client condition and membership in carried permissions, preserving the full
grant intersection, required permission and correlation metadata. A coherent declared
Authenticated route with zero current grants produces the exact Allow record even
with an empty carried set. The general trace covers prior denial, unmanaged clients,
server/Task routes and undeclared routes without inventing new refusal conditions.

The raw-declaration-to-route correspondence is standard-axiom-only. Public access
proofs additionally name the native template `parse` and `matches` symbols; Hub
policy proofs also name the clock. Every successful audit excludes `sorryAx` and
axioms outside its explicit allowlist. This is not an assumption-free proof:
native parsing and Core URI projections must satisfy the stated parse/decoded-trace
laws; primitive text/query/cursor and collection/Borrow models, compiler/extraction
and cross-module linkage remain explicit boundaries. Catalog/principal freshness,
wire serialization and the asynchronous narrowing-wrapper projection remain outside
this result. No SQL, network, browser or deployment behavior was tested here.

## Execution

GPT-6.1 Sol `/root/coder` implemented the proofs; GPT-6 Luna `/root/builder` ran the
logged checks on Ubuntu Linux x86_64 using Lean/Lake 4.35.0. Astra `/root` reviewed
the declarations, actual generated callers, derived premises, positive acceptance,
full output guarantees and retained boundaries. No production Rust function changed
for these proofs. Native fixture edits made afterward are outside this checkpoint.

| Command in `proofs/current_roles` | Exit | Elapsed |
| --- | --- | --- |
| `lake build SDKAccessCorollaries RegisteredServerDownstreamProof` | 0 | 35.172 s |
| `lake env lean SDKRegisteredPolicyProof.lean` | 0 | 2.769 s |
| `lake build` | 0 | 3.370 s |
| `lake env lean SDKAccessProof.lean` | 0 | 2.819 s |
| `lake env lean SDKAccessCorollaries.lean` | 0 | 3.120 s |
| `lake env lean ModelAudit.lean` | 0 | 2.568 s |
| `lake env lean CurrentPermissionsModelAudit.lean` | 0 | 2.568 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.618 s |

The run verified frozen inputs and used a fresh package build directory with pinned
dependency caches; later stages reused the preceding prerequisite build. No new
Charon/Aeneas extraction or Rust test was run. Earlier direct attempts exposed Lean
match-auxiliary/monadic simplification issues and a missing imported namespace.
Explicit bind/case reasoning, typed lookup equalities and the namespace import fixed
them without changing the theorem statements or native models. Failed diagnostics
are not accepted proof evidence. Unused-simp warnings are not qualification failures.

## Source and evidence

Hub base: `bb2e97f5c984a53eaa218109e4c01a70e952e365`.
Cargo/Lake SDK pin: `239622d12c08b771cc5e813fe3e846385d8d04ad`.
The overlay has 53 files; the merged source has 841 unique paths. All four generated
and custom model hashes equal the adapter checkpoint. Generated files still match
extraction probe 6; custom external models are reviewed definitions, not the raw
external templates emitted by Aeneas.

```text
overlay archive
550d2bd9285b9885c7e14b8b15be02f22dcebb5b11f739eb3157a510a601fc2e
overlay manifest
c40fe67abb40f6bdb893c5fe44beb1b2ef27085acd3308d1519be72594b87f6f
runner
61a4b1c381746937adec34111bec8ac908924e7c2d6ee5fcdd320d0f7746d823
summary
c23ad8c9b9a80b1c569e389a84fa44c7a828d002c6977e56fb303d1393408d31
SDKAccessProof.lean
5d708bf9fc29c15fd7147717cb0d63987d1ca9f8326c05824b68b0e204e299b6
SDKAccessCorollaries.lean
9593285ad010056c3f1a925ff4c89d5a5a5170085bfe9feb7f88957dd05951c4
SDKRegisteredPolicyProof.lean
79217b603eb17caf25edd997dee5c11e47f6cd350d3e5d2d40f49c89cb1377f0
```

The direct composition log hashes to
`2abf957224412146992d4b78220289b68e05985b4a2338078a452ba39717df48`;
the full package build log hashes to
`d635ec3297ea610f64da31185cd2fac2efc54f1468ea8ea38b672a7f2e74cca4`.
The summary records every command, timing, source/model hash, log hash and axiom
output. Local logs: `/tmp/hub-sdk-adoption-20261030/evidence-sdk-policy-combined1/`.
Remote run:
`/home/rozgo/.cache/lean-pilot/hub-sdk-adoption-20261030/sdk-policy-combined-1-run1/`.

The proofs live in
[SDKAccessProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/SDKAccessProof.lean),
[SDKAccessCorollaries.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/SDKAccessCorollaries.lean)
and [SDKRegisteredPolicyProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/SDKRegisteredPolicyProof.lean).
They were uncommitted when checked; these hashes identify the actual checked source.
Publication, new native/mutation qualification and deployment are separate steps.
