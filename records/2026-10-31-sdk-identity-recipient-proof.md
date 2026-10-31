# Initial SDK identity and recipient contracts

SDK `de98b25` commits checked contracts for the actual identity constructor's
context-omitted bootstrap case, its signing continuation and exact recipient
binding. It also commits the independent full-context/claims specification and
six supporting collection laws. Full context-bearing issuance remains unfinished.

## What is established

The bootstrap request retains arbitrary complete typed payloads while setting
permissions empty and request context, acting server, Task and inherited delegation
to absent. The actual extracted constructor returns the independently described
complete identity, or its existing expiry/ID-parse error. It assumes explicit
provider, clock and native ID observations, not success of an own-code validator.

The issue theorem preserves that result through the actual claims constructor
and concrete signer, including Rust signing errors and modeled failure/divergence.
This is continuation factorization. The claims constructor still computes the
signer argument; an independent complete-claims theorem is not established here.

Recipient binding is characterized for arbitrary expected/presented triples under
explicit comparator laws: server or resource mismatch has audience-error priority,
deployment mismatch has its existing error, and success returns the entire
presented triple. This compares already supplied values; it does not verify a
signature, parse a token or establish caller authorization.

The six value laws cover finite list/set/Option cloning and equality. The separate
full contract specification elaborates, but definitions alone prove no behavior.

## Execution and evidence

GPT-6.1 Sol implemented the proofs; GPT-6 Luna ran bounded unattended checks;
GPT-6 Astra reviewed the statements, raw source correspondence and audit results.
All checks used Linux x86_64, Lean 4.35.0, pinned Aeneas `fdebf20`, and the existing
private dependency graph from the qualified SDK model. No runtime, generated
model or native-library model changed.

The final direct Correctness check exited 0 in **2.86 s**, with peak RSS
**2,724,900 KiB**. All 13 input hashes matched before and after. All four theorem
audits passed without `sorryAx`; the recipient closure is standard-only, and the
issuer closures retain only their declared provider/time/ID/signer observations.
The direct output OLean SHA-256 was
`d874302c212c98d653c81c5ced16540bba7996c1bf4d9a02e67a036eb12164aa`.

The named manual command
`lake build InternalAuthSpecification InternalAuthValueLaws InternalAuthCorrectness`
then passed in **13.64 s**, with all ten theorem audits passing. The graph reports
1,805 jobs; this does not mean 1,805 fresh compilations. The source/configuration
hashes remained unchanged. The broad post-build manifest reported a mismatch only
for the three target OLeans that Lake regenerated; their new hashes are recorded
separately. No input-source mismatch was observed.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/identity-recipient-checkpoint.json)
contains exact sources, effective private configuration, commands, output/log
hashes and each theorem's dependency closure. The proof package supplies opt-in
Lake targets; there is no CI or runtime integration.

## Failures and remaining scope

The earlier proof attempts failed on parsing, iterator unfolding, tuple/bind
normalization and equality of impossible failure continuations. Fixes stayed in
the proof, preserved every statement and retained failure/divergence. These were
proof-development errors, not newly found runtime defects.

The next full-context proof's first check failed in **49.53 s** on UTF-8/size
helpers and overly broad simplification. Its printed no-axioms line is not proof
evidence: compiler exit 1 is authoritative, and that leaf is excluded from this
commit. Valid direct/automated/delegated calls, complete independent signer claims,
nonempty permission sets, admitted witnesses, semantic controls and connection to
current Hub callers remain required. Native representation, allocation, translation
and crypto boundaries remain explicit. See the
[source applicability audit](2026-10-30-proof-source-applicability.md).

No new native tests, extraction, deployment, paid model calls or broad platform
gates ran in this proof-only checkpoint. The commit is local and not pushed.
