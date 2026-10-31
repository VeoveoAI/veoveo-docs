# Hub calls the checked SDK issuer model

Hub commit `a1cf258` replaces the extracted Hub graph's opaque issuer operation
with a concrete call to the SDK-owned extracted implementation. The complete
request and issuer are converted through the checked bridge; the returned token,
identity and error payloads are mapped back. The new theorem derives conversion
and the SDK input domain from independent Hub representation bounds, then proves
the complete independently specified SDK outcome. It assumes neither successful
validation nor successful issuance or signing.

This is a proof-model connection, with unchanged runtime source and Cargo pins.
It composes the Hub graph extracted from `3bc2923` with SDK proof revision
`6afa18a` and its prepared issuer implementation. It does not establish native
equivalence to Hub's older SDK `239622d` dependency. The actual Hub caller's
deadline selection and complete composed outcome remain the next checkpoint.

## What is established

The theorem preserves first-foreign-permission priority, the SDK's delegation,
context, expiry and identifier outcomes, the complete claims passed to its signer,
and signing success or error. The result mapping preserves modeled effects,
failure and divergence. Original string bounds and a bound over duplicate-free
enumerations of the original scope set derive the actual converted text domain;
there is no premise that an arbitrary traversal is native BTreeSet order.

An out-of-native-range mathematical timestamp produces an explicit Aeneas range
failure in the formal adapter. The independent physical-domain premise proves
that branch unreachable. This adds no runtime check or token refusal.

The global Hub issuer declaration is now a definition. Its checked transitive
axiom closure contains only `propext`, `Classical.choice`, `Quot.sound` and six
explicit SDK observations: crypto-provider setup, UTC clock, UUIDv7 generation,
UUID text conversion, ID parsing and signing. The old whole-issuer axiom and
`sorryAx` are absent. Native namespace-helper, collection/order/string/allocation
and date correspondence, cryptography/serialization/verifier behavior and
deployed-stack applicability retain their previously stated boundaries.

## Execution and evidence

GPT-6.1 Sol implemented the connection, GPT-6 Luna ran the manual Linux checks,
and GPT-6 Astra reviewed the definitions, logs, source maps and evidence before
committing. Lean 4.35.0 and the existing qualified Aeneas instance-naming patch
were reused. The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/a1cf258/proofs/current_roles/evidence/sdk-issuer-operational-connection.json)
records commands, exact source/configuration identities, failures and output hashes.

The final command requested all six bridge targets, `HubCurrentRoles` and
`NativePolicyModelAudit`. It passed in 3.168 seconds, rebuilding the corrected
OperationsProof and replaying prerequisites. A preceding 34.559-second attempt
compiled the affected bridge/model prerequisites but failed at the final
result-map proof equation; it is not counted as a passing build. An independent
scratch audit then passed in 2.66 seconds, checking both the issuer's definition
kind and its exact allowed axiom closure. The 73-source Hub map, SDK source map
and immutable imports remained unchanged during the final build.

The final OperationsProof OLean is 228,240 bytes, SHA-256
`b62522139bd15f545a467960ce949a31011e77c3442a11b03db8237990ae6f50`.
The committed receipt has SHA-256
`c7cb1f3a5e5c799675f0b0c925f8edbc10c1d9a97749837909f4271960cbf52f`.
Review verified seven recorded source/configuration hashes and 21 referenced
evidence files. Generated function/type bodies and the prior Fields/BridgeProof
source are unchanged.

The unplanned integration fix was Lean module formatting: Values and Records
received public module/import headers, with their definition bodies byte-identical
to the prior commit. Operational definitions were separated from their correctness
theorem so the generated module could import them. Earlier proof-normalization,
module-import and scratch-audit syntax failures are recorded as development
feedback, not production defects or semantic fault controls.

The next slice covers the actual caller, populated acceptance and a deliberate
deadline fault with restored baseline. No runtime or translator change, fresh
extraction, native regression rerun, broad Docker gate, deployment, CI hook or
paid model call occurred in this checkpoint. The commit is local; no push or
deployed qualification is claimed. Overall Hub coverage remains partial.
