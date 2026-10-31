# HTTP constructor permission preservation: source fault and restoration

Hub commit `1057bcb` qualifies the permission-preservation edge of the connected
route/context proof. A deliberate change to the actual Rust constructor is rejected
by the unchanged proof, and a separate Lean witness proves the concrete semantic
fault. Reversing the same source patch restores the exact generated files and passing
connected proofs. No new production defect or runtime behavior change was found.

## Scenario and result

In a disposable archive of Hub `3bc2923`, the mutation changes only the HTTP client's
`permissions` initializer to `permissions: BTreeSet::new()`. SDK remains `239622d`
and Core `120306e`. Charon extracts the actual mutated source; Aeneas adds only the
empty-set call and stores its result in that field. Types and external templates
are unchanged, and all 16 extraction roots are transparent and error-free.

The frozen `SnapshotAssemblyProof.http_new_exact` fails at complete-client equality:
the actual client holds the empty set while its independent specification preserves
the supplied set. Its executable axiom audit rejects the resulting `sorryAx`.

The independent witness imports the raw model, never the failed proof module. It
constructs a direct subject with an execution context and no delegation, derives
acceptance by the actual context function, and supplies a singleton permission.
It proves the entire returned client, the loss of that permission and disagreement
with the unchanged expected-client specification. Other typed payloads remain
parametric. The four executable audits pass without `sorryAx`: the context and
membership results use standard axioms; actual-constructor results additionally
name only the two existing error-formatting symbols in their theorem types.

The exact patch is reversed in the same source tree. The full source map, with only
the existing catalog extraction annotation, and actual SDK map are rechecked. All
four restored raw files match the canonical constructor extraction byte for byte.
Fresh mutant and restored packages use the same qualified private tool configuration.
The restored model, direct assembly proof and both connected route/constructor
targets pass with unchanged package source maps.

## Execution and evidence

GPT-6.1 Sol authored the witness and proof-local corrections; GPT-6 Luna executed the
logged Linux checks; GPT-6 Astra reviewed the source/model differences, diagnosed
the dependency-selection failure and committed the result. Lean is 4.35.0, Charon
is pinned to `de8736f`, and Aeneas to `fdebf20`, using the previously qualified
private discriminant-instance naming patch. No new tool patch was introduced.

- Mutant extraction: Charon **25.008 s**, Aeneas **2.020 s**, both exit 0.
- Final mutant package: model build **24.410 s**, unchanged proof rejected with
  exit 1 in **3.220 s**, independent witness passed in **2.819 s**.
- Same-source restoration: Charon **33.190 s**, Aeneas **2.221 s**, both exit 0.
- Final restored package: model build **16.848 s**, direct assembly proof
  **3.020 s**, and `lake build SelectedRouteContextProof SnapshotConstructorProof`
  **45.062 s**, all exit 0. All nine connected target audits pass.

These are command runtimes, excluding preparation, transport and review. The final
mutant package tracks 16 source/configuration paths including its witness; the
restored package tracks 15 and contains no witness. Both maps remain unchanged.

The [receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/request_composition/evidence/http-permission-preservation-control.json)
is SHA-256 `9b54e7ec312e5cf75afe776efa5599c2011d246c1120ebc611ad0c84c46ebddc`.
It records commands, source/tool/configuration identities, logs, earlier attempts,
raw outputs and compiled artifacts. The checked witness is
`0e70657cba7e3b41fe132231242402f36a4e7c94185f775cc81734c02d5b1741`.
The compiled mutant and restored `Funs.olean` hashes are respectively
`751c8225c663332ff7af2997c5b90ef71aaaaf73cafd966eee07b70826e93645` and
`ccd4d23fb719a08e8d72e97366cd58b508d5d602ff494093cbf15ca6432fbb0f`.

## Iterations and limits

Setup mistakes involved missing inputs, path guards, a summary-write typo and the
location of the LLBC error flag. The latter occurred after successful restored
Charon extraction; only Aeneas was continued, without repeating Charon. Witness
iteration fixed a redundant tactic, an alias projection and reserved lambda binders
in its audits; statements, independent specification and allowlists stayed unchanged.

The initial fresh packages copied canonical dependency configuration without applying
the already specified private overrides. Their model/assembly checks succeeded,
but combined targets hit the known `instDiscriminantLocalResultIsize` collision.
Both mutant and restored packages were recreated with the exact reviewed private
configuration and rechecked. The final claims above use those corrected runs.
These workflow and proof-code errors are distinct from the intended semantic fault.

This validates one constructor edge, not every edge of the composed route theorem.
It does not prove native authentication of arbitrary typed witness inputs, current
grant provenance, SDK token issuance/recipient verification, async caller refinement
or native collection representation. Existing compiler, translator, Lean and opaque
namespace-helper boundaries remain explicit. No native component test, full Docker
gate, deployment, push or paid model call ran for this proof-only change.

The next step is one shared generated graph: the routing extraction already contains
the qualified policy functions, so existing policy proofs can be reused directly
without nominal-type converters or duplicate recursive models. That consolidation
and the policy/delegation-to-client composition are not yet implemented or qualified.
The comprehensive Hub verification goal remains active; this commit is local.
