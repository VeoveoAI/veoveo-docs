# SDK-to-Hub authorization composition qualified

The [composition checkpoint](2026-10-30-sdk-hub-policy-composition.md) now has
paired semantic controls and fresh restored qualification. All three deliberately
faulty SDK implementations compiled, extracted and built their required Lean models,
then failed the unchanged intended proof and the native policy assertion. Fresh
unmodified source passes six native tests, formatting, strict library Clippy, new
extraction, the full Lean package, four direct proof checks and three audits.

This qualifies the stated SDK-access/current-policy/downstream-narrowing connection,
not the entire Hub or every MCP contract. The [native baseline](2026-10-30-sdk-hub-native-baseline.md)
describes the 23 whole-decision scenarios and eight direct SDK observations. No
production policy or new runtime authorization check was introduced in this slice.

## Connected guarantee and limits

Actual extracted access for tools, prompts, resources and resource templates is
connected to independent raw declaration semantics. Exact resources win; otherwise
matching templates must agree on their complete access value. That derived result
supplies Hub's former whole-access premise. The actual server evaluator and extracted
delegation kernel preserve the required permission, current/carried grant intersection
and correlation fields. A declared Authenticated route remains usable with zero
permission grants. Acceptance, refusal and complete outputs are covered within the
stated source/model boundary.

Native parsing and Core projections, primitive text/query/collection/Borrow laws,
compiler/extractor correspondence and foreign-module linkage remain explicit
assumptions. The imported resolver is the pinned SDK-owned generated algorithm,
connected by checked typed adapters, rather than an assumed resolver result.
Catalog/principal freshness, asynchronous caller projection, serialization,
declaration generation/validation and typed dispatch remain separate obligations.
The proof audits allow standard Lean axioms and the explicit native parser/matcher
symbols; policy also includes the clock. No successful restored proof contains
`sorryAx` or an axiom outside its reviewed allowlist. Native Rust tests support the
connection but do not turn these remaining adapter assumptions into formal proofs.

## Deliberate faults and observed rejection

Each patch touched only the isolated SDK's `registration/authorization.rs`.
The private resolver stayed byte-identical. Native and extraction copies used the
same runtime source bytes, supported local Cargo overrides for all three SDK
packages, and scratch lock changes limited to the three Git-to-path source entries.
Shared source caches and production checkouts were not mutated. Native builds
cleaned and freshly compiled Hub, SDK, fixture and macros; each witness used the
captured binary without a hash change.

| Fault | Unchanged proof | Actual native counterexample |
| --- | --- | --- |
| Discard an exact resource lookup | `SDKAccessProof.resource_exact_hit` | Exact Read entry over conflicting templates wrongly becomes `Deny/UndeclaredTarget`, with no required permission and empty grants |
| Return false after every actual template match | `SDKResolverAdapterProof.native_matcher_trace` | Two matching Read templates wrongly become `Deny/UndeclaredTarget` instead of Allow with the Read requirement and current grants |
| Discard a prompt lookup | Prompt case of `SDKAccessProof.access_exact` | An Authenticated prompt for a zero-grant caller wrongly becomes `Deny/UnknownPrompt` instead of Allow |

All three Lean failures are **symbolic semantic residuals**, not normalized `False`
or automatically synthesized Lean counterexamples. The first leaves the resolver
starting from `None` despite an exact-hit premise. The second runs native matching
but returns false instead of its result. The third evaluates prompt lookup but
returns `None` instead of that result. The native assertions independently exhibit
the corresponding wrong complete decision. These are injected faults, not evidence
of those defects in the unmodified production implementation. Recovery `sorryAx`
output in failed diagnostics is rejected, never accepted as a proof.

GPT-6.1 Sol `/root/coder` implemented the proofs/fixture and reviewed failures;
GPT-6 Luna `/root/builder` executed logged jobs on Ubuntu Linux x86_64; Astra `/root`
independently reviewed the semantic residuals, native counterexamples, source
correspondence and final evidence. Native Rust was 1.99.0; extraction used the pinned
2026-09-17 nightly, Charon/Aeneas binaries from the earlier extraction checkpoint,
and Lean/Lake 4.35.0. No paid model call or deployment occurred.

| Control | Native compile | Charon | Aeneas | Direct proof | Native witness |
| --- | --- | --- | --- | --- | --- |
| Exact resource | 48.944 s, exit 0 | 33.570 s, exit 0 | 1.869 s, exit 0 | 2.919 s, exit 1 | 0.264 s, exit 101 |
| Matcher | 49.048 s, exit 0 | 33.773 s, exit 0 | 1.872 s, exit 0 | 2.668 s, exit 1 | 0.264 s, exit 101 |
| Prompt | 49.351 s, exit 0 | 33.375 s, exit 0 | 1.871 s, exit 0 | 2.969 s, exit 1 | 0.264 s, exit 101 |

Every LLBC reports `has_errors=false`; generated-model and prerequisite builds
passed before the mapped proof check. Each native witness reports exactly zero
passed and one failed test with the intended assertion. Full logs and commands
are retained separately; neither a setup failure nor an import error earns credit.

## Fresh restoration

The restored native run passes 3 catalog tests (49.447 s including fresh compilation),
the expanded policy fixture (0.264 s), and 2 delegated tests (0.264 s), with formatting
(0.665 s) and strict library Clippy (13.235 s). The new native binary is 769156008
bytes, SHA-256 `d403f92acb397d4e785e73d4d50b5a6552460b02ce83a0a833da40ec1a4dc000`.

Fresh Charon (33.119 s) and Aeneas (1.820 s) both succeed. Restored LLBC has no
reported errors and hashes to
`a4ea1678316ae36a491642ec5da5c4ba1d7f3da12eb6f28044da21f6f8435b3f`.
The full default Lake build passes in 39.832 s; direct adapter/access/corollaries/
policy checks pass in 2.668/2.919/3.169/2.769 s; the three model audits each pass
in 2.568 s.

Restored raw generated hashes are
`38a733c35b6992512eeb99e4801193fa9ea5f38d93bd0f91456e8f5f9c7ed865`
(`Types.lean`) and
`42ba7f89acec9706b3a65f33f15e438dfe4bbcd8a9e8a3d2829df5363ce8db62`
(`Funs.lean`). They are **not** byte-identical to probe 6: 23/25 source-location
comments name the isolated SDK copy instead of the Git checkout. Replacing only
that exact SDK root substring on `Source:` comment lines, preserving all spans and
other characters, gives empty diffs. No definition, type or proof was edited to
obtain correspondence. Raw outputs/diffs remain available; the working generated
files retain their original probe-6 bytes.

One restoration setup attempt stopped before metadata or compilation because a
short SDK path replacement also matched the fixture/macros path prefixes. Longest-
first replacement and parsed equality of all three resulting paths fixed the
temporary runner. The failed setup is preserved and excluded from qualification.

## Source and receipts

Hub base `bb2e97f5c984a53eaa218109e4c01a70e952e365` plus the 53-file native-baseline
overlay; SDK runtime `239622d12c08b771cc5e813fe3e846385d8d04ad` plus separately
identified proof-edition/README metadata. Restored authorization source is
`4581408a56cef847179428a73f947e2d947c1269273f9416c286df46be8ce50f`;
the unchanged resolver is
`8ed2b007bb457eed5057054367e2c9e6aac38664bc9e89cddc580d61de3e6bf8`.

```text
exact-resource control summary
0116ee43ba80fb884511d9fd4c5921a9e81b000fe0a8934e4df9e7fa487fe00d
matcher control summary
631f6b8e046b5c0bb5efe3d792f1844f5d224cf56dddaa1c3722311186f93b1d
prompt control summary
68b05695ef654c325f98918a91ff31ab418b8dc9c93fe89b332bc12da37e990b
native restoration summary
8d2ec97ced0111fa6fd3829a7e028b660e553205b7a58ece76fd2dc7faf82df0
formal restoration summary
cde1df469c67977309e0be99505398a5522e7790f13673c84f7aa4f546b4a5ea
```

Local evidence is under `/tmp/hub-sdk-adoption-20261030/`, in
`evidence-sdk-drop-exact-resource-control-1`, `evidence-sdk-matcher-false-control-1`,
`evidence-sdk-prompt-none-control-1`, `evidence-sdk-restoration-native-1` and
`evidence-sdk-restoration-formal-1`. The corresponding successful formal remote run
is `sdk-formal-restoration-run2`. The
[compact receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/evidence/sdk-access-composition-receipt.json)
retains exact source/tool/model identities, stage outcomes and evidence digests.
Source and reports were uncommitted at qualification. This record establishes no
publication, deployment, browser, database-recovery or model-driven acceptance result.
