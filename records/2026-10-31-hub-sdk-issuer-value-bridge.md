# Hub and SDK issuer value correspondence

Hub commit `e9d9c8a` establishes the first representation bridge between the
existing Hub extraction and the separately checked SDK issuer. Identifier payloads,
ordered sets and bounded timestamps now have checked correspondence and roundtrip
theorems. Complete record meaning and the actual issuer connection remain pending.
Hub's opaque issuer operation and native SDK pin are unchanged.

GPT-6.1 Sol implemented the proof, GPT-6 Luna ran the Linux checks, and GPT-6 Astra
reviewed the definitions, theorem statements, logs, source maps and artifact
identities. The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/e9d9c8a/proofs/current_roles/evidence/sdk-issuer-bridge-values.json)
records exact commands, versions, configuration overrides, measured timings,
failures and output hashes.

## What is established

Identifier and opaque payload mappings preserve their carried String values. Set
conversion sorts by the concrete value order, preserves membership, uniqueness
and order, and roundtrips exactly. The reverse direction requires sorted,
duplicate-free SDK input. No arbitrary list is silently treated as a native set.

Timestamp conversion preserves seconds and nanoseconds within the physical I64/U32
ranges. Mathematical values outside that range have no conversion; there is no
truncation or default. Physical representability is separate from the narrower
non-leap theorem domain. These are proof definitions, not new runtime checks.

Fourteen executable axiom guards accept only `propext`, `Classical.choice` and
`Quot.sound`; ten declarations also print their closures. There is no `sorryAx`.

## Checks and observed errors

The SDK's four public issuer targets rebuilt from source under the existing
qualified Aeneas enum-instance naming patch: exit 0 in 26.610 seconds. Its 52
source files and the patched macro were unchanged. The wrapper then failed while
collecting a nonexistent root `RequestCompositionSdk.olean`; actual submodule
artifacts were collected separately, retaining the original incomplete wrapper
summary. The successful proof command was not rerun.

The first combined Hub model build passed in 14.378 seconds. The initial Values
check failed in 2.772 seconds because the String order import and one existential
roundtrip proof were incomplete. After those proof-only corrections, an evidence
directory setup error stopped one wrapper before Lean ran. The corrected wrapper
checked the unchanged final leaf successfully in 2.762 seconds.

The manual named target, `lake build SdkInternalAuthBridgeValues`, then passed in
3.691 seconds. Both successful checks preserved all 68 Hub and 52 SDK source
identities and the three immutable prerequisites. The named wrapper originally
reported `complete:false` because it also compared the requested output against
the earlier direct-check OLean. Lake regenerated that output; the preserved
summary and interpretation supplement distinguish this from a prerequisite change.

The final leaf SHA-256 is
`bfb8face110d216fac72067b43c71f1542e003357ea86ee5210aaf82416e2a6a`.
The named-target OLean is 220,648 bytes, SHA-256
`d105d3452a0038bd21bda39c23ebea97467a571a926a6b6c858f31c56d6765e2`.
It differs from the direct-check artifact; no compiled-artifact identity claim is
made between the two commands. Three Mathlib module-system suggestions remain
warnings; the build succeeds.

## Applicability and remaining work

The Hub graph's recorded source is `3bc2923`, with native SDK `239622d` and Core
`120306e`. The new proof dependency is SDK `6afa18a`, containing the prepared
issuer extraction from `e268032` and reviewed String/binder changes. This is an
explicitly composed prepared stack, not an equivalence proof for Hub's older
native SDK body. Private path overrides were checked; a fresh remote checkout
of the new dependency was not qualified here.

Native String/BTreeSet comparison and traversal, parser/key encoding and
cryptography remain separate boundaries. The next work must establish independent
per-field meaning for all request, identity, context, result and error records,
timestamp comparison/minimum correspondence, then link the actual issuer and
prove the caller contract. Roundtrips alone cannot exclude swapping two fields
of the same type in both directions.

This checkpoint is committed locally. No runtime change, broad native suite, CI
hook, deployment or model/provider call ran.
