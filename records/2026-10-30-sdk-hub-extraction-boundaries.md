# SDK-to-Hub extraction boundaries

This is an extraction and dependency-adoption checkpoint, not a completed
SDK-to-Hub proof. The previously qualified registered-server proofs remain at
their [recorded source boundary](2026-10-30-registered-server-policy-qualification.md).
No new composed Lean theorem, native Hub qualification or deployed result is
claimed here.

## Source and dependency adoption

After [SDK publication](2026-10-30-sdk-authorization-publication.md), Hub's two
Cargo SDK pins and three lockfile source references were updated from `05273d1`
to `239622d12c08b771cc5e813fe3e846385d8d04ad`. The current-role proof package now
requires that same commit's `proofs/authorization` package through Lake. There
is no runtime behavior change in the Hub source for this adoption.

The frozen input is Hub `bb2e97f5c984a53eaa218109e4c01a70e952e365` plus a
49-path overlay containing the prior registered-server work and dependency
edits. Base archive SHA-256 is
`892b8ebc2c6e60c0f83b284789d1ca744d8c2c9c41814640c389abec365d9b04`;
overlay archive SHA-256 is
`9f6eac315c6d73b156a1acf9e52e3786e01a8a15b86fac8c6a8b5f4d0f561760`.
The runner verified 826 base paths, all 49 overlay paths and 837 merged paths.
Native source and the existing extraction-only catalog field annotation remain
separate. The annotation is unchanged from the earlier qualification.

The precise Cargo update exited 0 in 3.319 s and was idempotent. The frozen
input already contained exactly the intended three lockfile source changes;
their writer was not established, so this is not attributed to that Cargo run.
Resolved Cargo lock SHA-256:
`a00f4580fabb83e5bfb9a4ec9e66eb3a1880ad8620326da620c95e3cf3663d09`.
Lake resolution exited 0 in 12.183 s, adding only the SDK package. All ten
previous Git dependency entries and the local authority package entry stayed
unchanged. Resolved Lake manifest SHA-256:
`f674793aa9e71b9cf475966c5789a0de6d1c9fc1824ddc5b311d7318e370aeb3`.
The coordinator reviewed the exact delta before its adoption in the working tree.

## Actual extraction results

GPT-6.1 Sol `/root/coder` prepared inputs, inspected the pinned tool source and
audited runner changes. GPT-6 Luna `/root/builder` executed the logged commands
on the actual Linux x86_64 host. The Astra coordinator reviewed boundaries,
approved the native adapter scope and modular reuse direction, and maintained
this record and the coverage map.

Tools remain Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, Rust nightly `2026-09-17` and Lean
4.35. The Hub probes preserve the four existing extraction roots and use
`charon cargo --sysroot default --preset=aeneas ... --lib --locked`, followed
by `aeneas -backend lean -filter-trait-methods -split-files ...`.
Exact argument vectors, environments and hashes are in the scratch plans and
summaries. No algorithm or production source was modified between these probes.

| Probe | Changed extraction input | Charon | Aeneas | Observed result |
| --- | --- | --- | --- | --- |
| 1 | Actual SDK access/resolver/matcher roots | Preliminary exit 0; controlled output also error-free | 2, 1.519 s | NativeMatcher's nested closure stayed opaque; translation failed at its call |
| 2 | Leading-impl closure selector | 0, 23.806 s | 2, 1.470 s | Selector did not change the closure's emitted body; same error |
| 3 | Module-qualified closure selector | 0, 23.755 s | 2, 0.565 s | Closure became structured; translation reached an unsupported native URI iterator signature |
| 4 | Only native `AuthorizationTemplate::matches` made opaque | 0, 24.004 s | 2, 1.518 s | URI signature error disappeared; private NativeMatcher representation was still opaque |
| 5 | NativeMatcher type included | 0, 24.257 s | 1, 1.820 s | Matcher representation/wiring extracted; foreign resolver cleanup failed translation |

Every completed Charon artifact parsed with `has_errors=false`. Probes 1–4
produced no Lean module; probe 5 produced partial files only. Partial output is
not an accepted generated model and did not replace the working-tree models.
Iterator-model warnings in probe 5 are also retained; they are not a successful
package build.

The selector diagnosis is from pinned Charon's name matcher: a pattern starting
with an impl is matched against the candidate's rightmost impl. The closure name
contains nested impls, so adding its actual module prefix was necessary. Probe 3
confirmed the closure's body became transparent. This was not missing compiler
MIR or a Rust authorization defect.

The next failure was Aeneas's unsupported associated-type signature
`Pattern::Searcher<'a>` at Rust `core::str::pattern.rs:99`. Core's
`ResourceUriParts::path_segments` carries that signature in its iterator type,
even when URI decomposition itself is opaque. Probe 4 therefore kept only
`AuthorizationTemplate::matches` as a native adapter boundary. Public SDK access,
the resolver, NativeMatcher and its parse-result closure remained selected.
Probe 5 additionally exposed NativeMatcher's actual one-field struct, removing
the opaque-ADT field-projection failure.

## Edition and compiler-IR diagnostic

The remaining failure occurred at the foreign resolver's loop end. Pinned
Charon can read promoted MIR for a local function but reads only optimized MIR
for a dependency function. The local resolver retained cleanup `Drop` statements;
the foreign resolver had explicit discriminant switches over a partially moved
value. Aeneas's read-place check rejects the bottom field before reading the
discriminant. This localizes the observed failure; it is not a proof of semantic
inequivalence between the two compiler representations.

The standalone proof crate used Rust 2021 while production uses Rust 2024. A
separate bounded diagnostic tested exact published SDK `239622d` with only that
scratch proof manifest changed to edition 2024. It used the existing standalone
`charon cargo --preset=aeneas` and `aeneas -backend lean` commands. The actual
shared `authorization_decision.rs` stayed byte-identical, SHA-256
`8ed2b007bb457eed5057054367e2c9e6aac38664bc9e89cddc580d61de3e6bf8`.

Charon exited 0 in 0.264 s with error-free LLBC; Aeneas exited 0 in 1.066 s.
The generated module is exactly the previously qualified 17,927-byte module:

```text
SdkAuthorizationProof.lean
f7c597d997b34b800578f39168924a4666426bc6d5a5dfee23bc7313708e2e0f
```

Both the coder and coordinator independently compared that hash with the
committed SDK model. The four helper signatures/bodies also match the local
2021 extraction after removing source locations and serializer IDs. This
establishes model-byte correspondence for local edition 2024. It does not prove
the optimized foreign lowering or complete the Hub-to-SDK linkage. No Lake
proof build, mutation campaign or native tests were rerun in this diagnostic.

## Execution errors and retained evidence

The first runner omitted explicit nightly PATH/library paths. A pause intended
to precede Charon raced with its launch: Charon did run and exited 0. A controlled
environment rerun emitted an error-free LLBC, but its runner raised a missing
`stages` key while recording the return code. That second code was not retained.
Recursive comparison found the two LLBCs differ only in `options.dest_file`;
all other parsed fields, bodies and types are identical. The first known exit-0
artifact and the controlled artifact were both retained. No third identical
Charon run was used merely to repair this logging omission.

An Aeneas-only continuation initially had the wrong working directory and failed
before process creation. Correcting that path allowed the actual recorded
Aeneas invocation. These are runner failures, distinct from the subsequent
translation limitations. They were not runtime application failures.

Scratch evidence lives under `/tmp/hub-sdk-adoption-20261030/` locally and
`/home/rozgo/.cache/lean-pilot/hub-sdk-adoption-20261030/` on Linux. Local mirrored
directories are `evidence-run1`, `evidence-probe2` through `evidence-probe5`, and
`evidence-edition2024`. Summaries retain full command vectors, stage/log hashes,
LLBC identities and output inventories. Summary SHA-256:

```text
probe2 14ea31cfdaa2413776d879d0b16f94d8a079731b075a5cfe051e669073e4e09b
probe3 089ab6abfb144542ad17e8e15d500cfb718203f5bf000956e0992618278daeb9
probe4 857dd34718e46c85535a8c3c61decec1c6cb152ef67a4193e7391e4c6b07ac49
probe5 0638e20fc571a956bd8c9149111be3d4ad07855182a5abeb2c3b54e3d850a05c
edition2024 89c280a039353755b9fa413a4bd991a33ae3122f0e76f127e009fd13f1df86f5
```

## Approved next step and limits

Align the SDK proof crate's edition with production and reuse its pinned,
source-identical generated resolver through typed Cursor/Matcher adapters in
Hub's ordinary external-function model. Extract the surrounding access dispatch,
NativeMatcher and parse-result wiring. The resolver model must delegate to the
existing generated algorithm, with no copied algorithm or assumed desired result.

Adapter preservation and the Lean connection still need proofs. Compilation and
module linkage remain an explicit trust boundary; source identity or defining
an alias is not a formal discharge of that boundary. The native template adapter
must be related to the SDK's actual generated root/path/query trace, with parsing,
decoded projections and borrow wiring clearly identified. Neither it nor the
clock becomes verified merely by composition.

No deployment, paid model call, runtime authorization rule, CI job or new
infrastructure was introduced. The comprehensive verification goal remains active.
