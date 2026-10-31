# Complete Hub and SDK record correspondence

Hub commit `e4da328` proves the complete record bridge needed to connect the Hub
caller to the checked SDK issuer. Independent physical timestamp bounds suffice
for request and identity conversion, with every named field preserved. The
SDK-to-Hub output direction preserves the complete identity, bearer and errors.
The actual issuer call remains opaque in the Hub graph; this checkpoint does not
yet establish the composed caller contract.

GPT-6.1 Sol implemented the proof and adapter fault control, GPT-6 Luna ran the
Linux checks, and GPT-6 Astra reviewed the contracts, actual logs, restoration
maps and artifact identities. The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/e4da328/proofs/current_roles/evidence/sdk-issuer-bridge-records.json)
records exact commands, source/configuration hashes, timings and output identities.

## Contract and boundaries

The independent Fields definitions name corresponding fields and enum meanings;
they do not define correctness as merely being inverse conversions. Coverage
includes all Principal fields, group roles and authentication time, complete
source token/context/audit/execution, authority and provenance, output owner and
ordered initial grants, permissions, delegation actor order and originating Task,
identifiers, client/resource/deployment, and full timestamps.

For physically representable Hub values, the proof derives available conversion,
complete field meaning, sorted/unique set invariants and a Hub-side roundtrip.
It does not assume conversion, context admission or issuer success. The SDK output
direction preserves set membership without claiming arbitrary SDK lists are
canonical. Vectors preserve order and length. Every token-error constructor and
payload position is retained, including expected versus actual audience. Nested
Rust results retain their branch, and Aeneas failures, divergence and visible
effects are preserved by the result adapter.

These are proof representations, with no new runtime conversion or admission
rule. Physical I64/U32 bounds remain separate from non-leap qualification. Native
collection/string/order/allocation, parser/key encoding, crypto and translator
correspondence retain their existing boundaries. The source stack is the
[previously recorded composed stack](2026-10-31-hub-sdk-issuer-value-bridge.md),
not equivalence to Hub's older native SDK `239622d` dependency.

## Qualification trace

Records and Fields first elaborated in 2.858 and 2.737 seconds. This established
well-formed definitions, not the complete semantic contract. The full proof then
passed directly in 4.004 seconds. All 23 executable dependency guards and ten
printed closures accepted only `propext`, `Classical.choice` and `Quot.sound`, with
no `sorryAx`. Source, SDK and prerequisite maps were unchanged during each check.

The deliberate fault swaps Read and Write in both directions of the group-role
equivalence, retaining its inverse proof bodies. Mutant Records and Fields still
compile, in 2.979 and 2.814 seconds. The unchanged full proof fails in 3.960 seconds
on the independent Read/Write field meaning; its dependent axiom audit rejects
the incomplete proof, and no Proof OLean is emitted. A standalone witness imports
only Fields and passes in 2.677 seconds: the inverse still holds, Read becomes
Write, and the independent field relation is false. Its three audits are
standard-only. This is a proof-adapter sensitivity control, not a newly found
production defect or native-source mutation.

The same patch was reversed in the disposable tree. Comparing all 71 mapped
sources to the earlier passing direct check found only the intentional private
Lakefile addition of three manual targets. The affected compiled outputs were
removed. The final command rebuilt all three affected modules and passed in
9.365 seconds:

```sh
LAKE_NO_UPDATE=1 lake build SdkInternalAuthBridgeRecords SdkInternalAuthBridgeFields SdkInternalAuthBridgeProof
```

The final Proof OLean is 4,466,272 bytes, SHA-256
`f68ef595fdca434f25c174954f9664c7b069604b43c13ccc50748350c078f6ae`.
No compiled-artifact equality to the earlier direct check is claimed. Review
verified 21 receipt-referenced files, six source hashes and the three final
artifact identities. The receipt SHA-256 is
`d553ad8aa53d6cf93160c73deca9b98e733990352f3d6836f7e6225be9ff07dd`.

Earlier attempts had record-layout parsing and proof-normalization errors; their
corrections preserved the contracts. Separate disposable-copy attempts lacked
compiled cache companions, and an initial named build lacked the new target
declarations in its private Lakefile. Those setup failures are retained separately
and provide no semantic evidence. The passing builds retain nonblocking Lean
module-system/style warnings.

Next are timestamp comparison/minimum correspondence, the actual transparent SDK
issuer connection and the complete caller outcome. The covered Rust caller and
deadline-selection bodies remain unchanged relative to Hub extraction source
`3bc2923`; the separate SDK source-version boundary remains explicit. This slice
changed no runtime source, Cargo pin, generated body or translator. It added no
CI hook and performed no deployment, broad native suite or model/provider call.
