# Claims permission-detail fault and exact restoration

SDK commit `859990c` qualifies the complete claims proof against a deliberate
one-expression change in the actual Rust constructor. The unchanged theorem
rejects the fault, independent witnesses derive both wrong outputs, and exact
source/model restoration followed by a fresh baseline proof build passes. This
is proof sensitivity evidence, not a newly discovered production defect.

GPT-6.1 Sol implemented the witness, temporary check-script adaptations and compact
receipt; GPT-6 Luna executed the logged Linux checks; GPT-6 Astra reviewed the
source delta, independent witness, terminal results and evidence identities.
The [SDK receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/claims-permission-control.json)
contains exact source/tool lineage, commands, log hashes and output identities.
It extends the [claims assembly checkpoint](2026-10-31-sdk-claims-assembly.md).

## Fault and independent observations

The private extraction tree changes only the permission-detail guard in
`AccessTokenClaims::from_identity`:

```diff
- authorization_details: (!token_identity.permissions.is_empty())
+ authorization_details: (token_identity.permissions.is_empty())
```

The prepared 173-file source archive, pinned Core and tools, and extraction
selectors remain those of the prior claims checkpoint. Charon compiles and
extracts the mutant; Aeneas produces a model whose only semantic change against
the checked canonical output is the inverted Boolean passed to `Bool.then`.
Types and both external templates remain byte-identical. Both extracted roots
and all fifteen critical function bodies pass the error/transparency inventory.

The fresh model and unaffected component/example modules build successfully.
The unchanged `from_identity_exact` proof then fails in all four combinations of
empty/nonempty permissions and absent/present acting server. Its executable axiom
audit also rejects the unfinished declaration. No failed ClaimsProof artifact is
imported by the independent witness.

`PermissionDetailInversionWitness` derives the entire actual wrong result from
the mutated function and fresh unaffected components. For the populated fixture,
both `operator.inspect` and `operator.operate` disappear from authorization
details. For the valid empty-permission Direct fixture, a spurious empty
Permissions detail appears. Both outputs violate the unchanged independent
`ClaimsExact` specification; every other specified claims field is retained.
All three witness audits use only the standard Lean axioms `propext`,
`Classical.choice` and `Quot.sound`, with no `sorryAx`. These are typed fixtures,
not authenticated users, current policy grants or signed tokens.

## Execution and restoration

Measured stages were: mutant Charon 12.891 seconds; Aeneas 3.273 seconds; fresh
model/component build 19.635 seconds; expected contract rejection 2.758 seconds;
independent witness 2.764 seconds. The mutation package's 29-file source map
remained unchanged through all three Lean stages.

Reversing the patch in that same native tree restored all 173 original file
hashes. Restored Charon passed in 12.388 seconds and Aeneas in 3.223 seconds. All
four regenerated raw files exactly match their canonical hashes. A separate fresh
package then ran:

```sh
LAKE_NO_UPDATE=1 lake build InternalAuthClaimsComponents InternalAuthClaimsExamples InternalAuthClaimsProof
```

It passed in 21.292 seconds with its 28-file source map unchanged and all fourteen
claims audits standard-only, without `sorryAx`. The final build log hash is
`bfa40ceee7b533d6a26e8855b063c7323efe2bab18f16e65bb98ed85128c3afe`.
The receipt records the three produced OLean identities; binary equality to an
earlier build is not asserted. Review independently matched 35 receipt-referenced
files, all four restored raw outputs and the three final OLean artifacts.

Two diagnostic corrections were needed. An initial raw diff compared against
older pre-binder outputs; the corrected comparison uses the checked canonical
model and contains one Boolean change. A static review paused on an unused old
LLBC initializer, although the script already replaced it with the measured
predecessor digest before execution. Removing that misleading initializer did
not change source or generated output. Neither correction required repeating
extraction or represented a failed Aeneas invocation.

## Boundary and next work

Canonical runtime code, generated models, independent specification, theorem
statements and dependency pins are unchanged. Native collection ordering,
UTF-8/allocation, scalar/date and translator correspondence retain their explicit
boundaries. No JSON/signature roundtrip, current policy provenance, Task liveness,
whole native refinement or deployed applicability follows from this control.

The next contribution connects public issuer permission ownership and first-error
priority, complete identity construction and complete claims to signing. Core's
private permission-namespace helper still has a separate refinement gap; its
unchanged source needs a bounded extraction investigation. The verifier wrapper
and correspondence to Hub's pinned SDK also remain open. This slice ran no full
native suite, deployment, CI or paid model calls. The commit is local, not pushed.
