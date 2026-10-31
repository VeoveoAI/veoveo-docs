# Identity-constructor deadline controls

The complete constructor contract from SDK `95ecd75` now has two qualified
actual-source controls. Each deliberately changes one Rust expression in a private
copy, makes the unchanged constructor proof fail, and has a separate Lean witness
of the wrong result. Both copies were restored in place and the original proofs
passed again. These are intentional test faults, not newly discovered production
defects or runtime changes.

GPT-6.1 Sol wrote the patches, witnesses and final check-script adaptations;
GPT-6 Luna executed the logged Linux checks; GPT-6 Astra reviewed the source and
generated diffs, independent specifications, failures, audits and restoration.
The [SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/identity-deadline-controls.json)
records exact commands, source/tool/output identities, measured stages and logs.
It references the existing constructor/model receipts for the shared baseline.

## Inputs and observed results

The source remains the recorded SDK `e268032` slice with the adopted String/binder
preparation and Core `120306e`. Each variant started from the exact same 173-file
archive and used the existing two-root, 34-include, seven-opaque extraction
selection. Both roots and all 15 inventoried own functions remained transparent
and error-free. Types and both external templates were unchanged; each generated
function diff changed only its intended constructor branch.

- **Direct source-cap bypass.** The patch removes the source-token minimum only
  when context is supplied and no acting server is present. The independent
  fixture requests expiry `4102444920`; its source expires at `4102444800`.
  The witness derives the mutant's complete returned identity with the requested
  expiry, 120 seconds beyond the independent cap, and proves it differs from the
  correctly capped identity. Every other field is retained. The input contains
  populated context and a supplied singleton permission set.
- **Repeated source cap on an acting call.** The patch adds that minimum to the
  acting-server branch. The fixture clock is `1788220800`, while the original
  source expires at `1788220700`. Its independently valid context, matching OAuth
  client, nonempty inherited actor chain and matching originating Task permit a
  future inherited expiry of `4102444860`. The witness derives the actual
  `ExpiredDelegation` refusal despite those admitted inputs. It asserts no native
  Task liveness, authenticated context or current-policy provenance.

The fixtures use mathematical timestamps, not observations of a live clock or
request. The Direct result assumes only the stated provider, clock and typed
UUID/text/parser observations. The acting refusal needs only provider and clock
observations. Neither witness assumes an own validator or constructor result.

## Qualification sequence

Each patched Rust copy was translated with Charon and Aeneas before any semantic
checks. A fresh package built the actual mutant model and unaffected imported
proofs. The frozen `InternalAuthIdentityProof` then failed on the changed deadline
branch. Separate witness modules imported independent examples and unchanged
helpers, never the failing identity proof or an artifact produced from it.

For Direct, Charon took 12.586 seconds, Aeneas 3.273, the model/helper build 19.959,
the expected contract rejection 5.067 and the independent witness 2.698.
For the acting mutation, those first four stages took 12.941, 3.533, 22.296 and
5.649 seconds. Its first witness check failed in 3.082 seconds on proof
normalization of fixed vector-size arithmetic and an inherited-expiry projection.
Normalizing those expressions and the fixture's dependent Option decisions left
the statements, imports, specification and model unchanged. The witness-only
retry passed in 2.972 seconds using the already-built mutant dependencies.

Each witness has three audited results. The independent input/deadline result
uses only standard Lean axioms. The actual-result theorems additionally contain
the five reviewed constructor primitive boundaries: provider setup, clock, UUID
generation, UUID text conversion and fallible ID parsing. The full constructor
appears in the acting theorem's statement, so that axiom inventory still names
all five even though its refusal needs no ID-success observations. No successful
witness audit contains `sorryAx`.

Both patches were reversed in their original private source trees. The complete
173-file maps and all four generated files matched the original hashes exactly.
Fresh packages then ran:

```sh
LAKE_NO_UPDATE=1 lake build InternalAuthIdentityExamples InternalAuthIdentityProof
```

Direct's restored build passed in 21.186 seconds; the acting variant's passed in
19.729. Both retained their checked source maps and passed all nine identity
fixture/contract audits without `sorryAx`. The restored generated `Funs.lean`
SHA-256 is `bec561cc7f7c8bff27ce4a7fc2c4434fd41a7d2de7bc495ed15e1e255808d24d`.
The two final target-log hashes are
`0e19f19e05c85f7f54b331c08b63f32b18e2286f7804da54c038f897b255f5d3` and
`470aa6064b07470348c30bc873752088ef3a69125b3317d82be17ee58b87819f`.

Earlier archive-path, private-configuration, remote-invocation and omitted-leaf
setup errors stopped before their intended proof/extraction commands. Their
records remain separate from the semantic results. The original failed acting
witness summary is likewise preserved alongside the successful retry.

## Boundary and next work

This establishes sensitivity of the extracted constructor contract to these two
source faults, including a concrete wrong output and a wrongly refused valid
input. It does not establish full public token issuance, signed claims,
cryptography, verifier behavior, native Task admission or composition with Hub's
pinned SDK. Native collection/string/time correspondence remains an explicit
boundary. The separate Core namespace-helper refinement gap is unchanged.

The normal Rust source, generated model, constructor theorem, dependency pins and
runtime configuration did not change. No native/full-stack suite, deployment,
provider/model call, CI integration or runtime rule was added. Complete claims
assembly is next, followed by public issuance and Hub composition; the broader
verification goal remains active.
