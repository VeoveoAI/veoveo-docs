# SDK-to-Hub adapter models and matcher trace

The combined Hub proof package now builds with SDK `239622d`'s generated resolver
connected through ordinary typed adapters. The actual extracted NativeMatcher
parse/Option/closure trace also has a checked equivalence proof. This advances the
[wrapper extraction checkpoint](2026-10-30-sdk-hub-wrapper-extraction.md); it does
not yet establish the complete SDK-access-to-Hub-policy contract.

## What was checked

The external resolver placeholder is replaced with an ordinary definition that
calls the pinned SDK-owned generated algorithm. Two adapters preserve the supplied
cursor and matcher operations exactly, including errors, divergence and cursor
state. The resolver-link theorem equates those Lean definitions; it does not prove
the Rust compiler's foreign-module linkage.

The actual generated `AuthorizationDeclaration::access` is an ordinary definition,
not a whole-access axiom. It keeps the tool, resource, resource-template and prompt
branches. The custom map model visits raw entries using the supplied Borrow and
comparison operations; the raw template cursor does not prefilter candidates.
Full `RouteAccess` equality distinguishes `Authenticated` from every permission
and distinguishes different permission names.

The matcher trace theorem unfolds the actual generated method, `Option::is_some_and`
and closure. It proves parse-then-match wiring for an arbitrary parse result,
without assuming successful parsing or a desired authorization Boolean.

The existing roles, current-permissions and registered-server proofs build with
these models. Axiom audits retain standard-only closures for the old role and
current-permissions results. The matcher trace and access wrapper additionally
mention exactly the explicit native template `parse` and `matches` operation
symbols; the server evaluator also retains the clock symbol. No accepted proof
contains `sorryAx` or an unreviewed axiom.

The old server-policy theorem still takes an access-result hypothesis. Deriving
that hypothesis from the SDK resource semantics is the next step. Native parsing,
Core URI projections, text/query operations, map ordering/uniqueness/Borrow and
compiler/extractor correspondence remain explicit boundaries. This checkpoint
does not claim native parser correctness, serialization, asynchronous endpoint
correctness or new native qualification.

## Execution and diagnostics

GPT-6.1 Sol `/root/coder` implemented and froze the proof sources; GPT-6 Luna
`/root/builder` ran the logged commands on the Ubuntu Linux x86_64 host. The Astra
coordinator reviewed the adapters, generated callers, premises and evidence.
No production Rust function changed in this checkpoint. Hub's already prepared
Cargo and Lake SDK adoption remains part of its frozen source snapshot.

The first package attempt failed because the new proof omitted the namespace of
the imported SDK definitions. The second failed at `rfl`: two generated Option
match auxiliaries were not definitionally identified. Explicit unfolding alone
also left that equality open. A bounded diagnostic showed identical bind heads
and equivalent Option continuations. Bind congruence, function extensionality and
Option cases closed it without changing the statement or native models. Failed
attempts and their `sorryAx` recovery output are diagnostic evidence only.

Setup-only failures included manifest/path guards and a missing remote overlay;
they preceded proof execution. The full successful run used a fresh output tree,
verified frozen inputs and the existing pinned dependency cache. A direct leaf
check passed before this full run. Lean/Lake was 4.35.0.

| Command in `proofs/current_roles` | Exit | Elapsed |
| --- | --- | --- |
| `lake build` | 0 | 34.924 s |
| `lake env lean SDKResolverAdapterProof.lean` | 0 | 2.668 s |
| `lake env lean ModelAudit.lean` | 0 | 2.618 s |
| `lake env lean CurrentPermissionsModelAudit.lean` | 0 | 2.568 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.618 s |

One unused-simp-argument warning remains. There was no new Rust test run,
Charon/Aeneas extraction, semantic mutation run, deployment or OpenCode call.
Those evidence classes must not be inferred from this Lean package result.

## Source and evidence identities

Hub base: `bb2e97f5c984a53eaa218109e4c01a70e952e365`.
Cargo and Lake SDK pin: `239622d12c08b771cc5e813fe3e846385d8d04ad`.
The frozen overlay contains 50 paths; base plus overlay has 838 unique paths.

```text
overlay archive
f9e76f27d1f606bde3a930b3dc16ee186f3f0dbfe049b9389d6847da0b28198f
overlay manifest
28e55d7f3ef685a8f2f2ac69a867fcca7a4733db7ee01d31562d307ff008d3fb
runner
62dd48812b229728e8d6dc7ef85255ad60c0cb644549fc79c290b34435fd12d3
summary
1b6f03a4634121cac9288010417193304f13bfd6d7b884e4d1977d37212296c5
SDKResolverAdapterProof.lean
5cd8bd354dd30cba888ffd503fc79776e90557e742f1ccbd816cdc60a925de56
```

The generated `Types.lean` and `Funs.lean` remain byte-identical to probe 6:
`f795b7c7186845c22a1f9f0318687974cc74043549fafa2bf82961995a8383a4`
and `11750d3835163a118675756af699b8f8687254d3132f82952c785ee39ecb4a73`.
The custom `TypesExternal.lean` and `FunsExternal.lean` instead match the frozen
model manifest:
`7e56b679a14d401d9043507b8bddaf4c2fef4536d29c828f774fb674a5bac568`
and `099368317aff3fd48dec038c936bf2b9e7455b1dd91f10f4e864e0d114d9c0da`.
They are not the raw external templates emitted by Aeneas.

The full build log hashes to
`3c471896b178ecd73c410a987aca7642a1371edeb2b61b2aa449a3f8c334055b`.
The summary includes exact commands, source verification, per-stage timings,
axiom output and every log hash. Local evidence:
`/tmp/hub-sdk-adoption-20261030/evidence-models4/`.
Remote run:
`/home/rozgo/.cache/lean-pilot/hub-sdk-adoption-20261030/sdk-access-models-4-run1/`.

The reviewed source is
[SDKResolverAdapterProof.lean](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/SDKResolverAdapterProof.lean)
and the custom models beside the generated Hub module. These new Hub changes were
uncommitted when checked; this record identifies their frozen bytes, not a claim
that the current origin/main or deployment contains them.
