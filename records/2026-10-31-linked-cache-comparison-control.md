# Linked-cache comparator fault caught by native test and Lean

Hub `d008f66` records a successful actual-source linked-cache fault control.
The native regression and the unchanged Lean comparison theorem both catch
the same deliberate loss of link identity. Reversing that fault restores the exact
source and generated model; a fresh model and all nine proof modules pass again.
No production behavior changed, and this is not another discovered production bug.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/link-order-control-20261031.json)
records exact commands, models, source maps, tool versions, logs, binary/OLean
identities and both witness attempts. GPT-6.1 Sol prepared the control and witness;
GPT-6 Luna executed the bounded Mac/native and Linux/extraction/Lean checks;
GPT-6 Astra reviewed the source, generated delta, native assertion and proof residual.

## Inputs and expected behavior

The frozen source is Hub `c23d9ae`, SDK `7360c0f`, Core `422dcf2`; unchanged proof
sources are those adopted by Hub `4ab4275`. Two keys have equal generation, principal,
all fingerprint bytes and server, but present links `first` and `second`.
The test stores whole Tool descriptors with denied counts 5 and 17, starts another
fetch for the second key, invalidates the first, then completes the second with its
replacement descriptor and denied count 23. The second key must remain independent.

The [fault patch](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/mutations/ignore-link-order.patch)
keeps every field. It compares the first four normally, computes the actual optional
link comparison, then maps each result to `Equal`. `PartialOrd` delegates to that
`Ord`. Retaining the dependency ensures the negative check exercises wrong behavior,
not a missing generated interface. The native fixture and extraction trees are
separate: only the former contains the
[unchanged regression overlay](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/mutations/link-order-native-regression.patch).

## Measured execution

The native baseline passed in **36.434 s**. With the fault, the same test failed at
its final aggregate assertion in **25.052 s**: reading the first key returned the
second descriptor/17; invalidating the first erased the second entry and its pending
ticket, so the second entry stayed absent even after its pending fetch completed.
Reversing the same
patch restored the exact fixture map and a passing test in **24.905 s**. These are
Cargo command durations including compilation; the reported test body took 0.01 s.
The restored binary differs in hash from the initial binary despite exact restored
source, so no reproducible-binary claim is made.

Mutant extraction used five roots, 36 includes and zero explicit opaque selectors.
All 37 own-component bodies passed transparency/error checks. Charon took
**30.320 s** and Aeneas **1.268 s**. The only semantic generated delta is the intended
comparator; other differences are source locations. Both external templates match
the baseline exactly. No generated file was edited.

The first mutant model compiled in **12.855 s**, but its independent witness failed
in **3.536 s** because two `compare_self` lemma names were unavailable. The production
proof was not attempted, so this attempt establishes no semantic rejection. The
correction uses existing typed comparison reflexivity facts; statements, imports,
audits, Rust source and generated model remain unchanged.

The second fresh model compiled in **8.648 s**. The
[independent witness](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/mutations/CacheLinkOrderFaultWitness.lean)
passed in **3.277 s**, proving distinct present-link keys compare equal using actual
generated functions and only standard axioms. It imports no failed proof module.
The unchanged `key_comparison_exact` then failed in **2.882 s** at the intended
branch: the first four comparisons equal, but the implementation returns `Equal`
where the theorem requires the actual link comparison. The failed proof's OLean
is absent; subsequent `sorryAx` audit failures are cascading, not extra findings.
The successful witness OLean is **243,936 bytes**, SHA-256
`2931734d813dcaa23f20a2bf3661d9881701c645fb0dcf29d801230845351f0a`.

## Restoration and scope

The same extraction tree was restored to all **1,144** original source files.
Charon (**50.166 s**) and Aeneas (**2.546 s**) regenerated all four canonical files
byte for byte. A fresh model and all nine original proof modules passed in
**60.747 s** total, producing all 13 own OLeans. The restored key-frame and history
OLean hashes match the preceding accepted checkpoint. All 103 baseline axiom guards
pass. Completion, state and history results retain the existing Result-valued native
`Instant.add` assumption; other leaves and the three witness guards use only
`propext`, `Classical.choice` and `Quot.sound`. No `sorryAx` is accepted.

This remains implementation-linked, model-relative verification. Standard-library
collection/text/order/allocation correspondence and the compiler/translator remain
trust boundaries. Native key construction, fingerprinting, parsing/admission,
async locks/listeners, server-wide invalidation, pagination and SQL remain outside
this control. Cross-link full-key invalidation does not claim arbitrary writes
preserve other keys when capacity eviction applies.

The separate Apps/factory commits `0aa6593` and `1e92ed3` advanced main while this
private check ran and were retained before publication. The cache source, Cargo
pins and proof modules are unchanged; this record does not qualify those commits'
new behavior. No new full native suite, deployment, image publication, runtime
authorization rule, CI hook or paid model call was performed for this checkpoint.
