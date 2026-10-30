# Current-role evaluator: unchanged-source extraction and model checkpoint

This is an extraction/model-compilation checkpoint, not qualification of the role
policy. No role-membership theorem, semantic mutant, production test, deployment
or application-model call is claimed here. The comprehensive Hub proof goal remains
active. Extension naming work belonged to another agent and was preserved.

The coordinator was GPT-6 Astra, the coder GPT-6.1 Sol, and the builder GPT-6 Luna.
Sol inspected the generated boundaries and implemented the external Lean models;
Luna ran unattended extraction/build/audit scripts on Linux. Astra reviewed the
source boundary, model design and results. No production Rust or dependency pin
was changed for this checkpoint.

## Exact input

The input is Hub `b9b6cec1b9c36a2e84afb980e208d2d116a84185`, with its actual SDK
dependency `05273d1f90b9a08e90e377187f4eddd084605fe5`. The Hub revision merges
the previously local proof coverage work with published group/extension changes.
The sibling SDK's newer resource-proof commit is not silently substituted for this
dependency.

The immutable source archive contains 792 verified files. Its SHA256 is
`80cc151c34417e71ea058f795bfb231abb888156e8726c1098b1f523f343768b`;
the manifest SHA256 is
`ebbf637c2c2a5b541fe3a68c1558fc84ad9d927dde08baebb1d776da54c0cc15`.
Each of these four selectors was supplied as both `--start-from` and `--include`:

```text
veoveo_hub::policy::grants::held_roles
veoveo_hub::policy::grants::effective_risks
veoveo_hub::policy::grants::granted_permissions
veoveo_hub::control_plane::authorization_config::_::allows
```

No additional `--opaque` selectors were used. That does not mean standard-library
dependencies were transparent: their native operation boundaries are explicit.
Tools were Aeneas `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, Charon
`de8736f7c995ac54dc490345cef9ea5143c06c62`, Rust `nightly-2026-09-17`, and
Lean `4.35.0`, with the existing pinned Lake dependency cache.

## Measured sequence and diagnostics

1. The original Charon command failed before extraction, exit 101 after 18.406 s.
   Linking `crc-fast`'s cdylib reported four missing `__rustc::__rdl_*` allocation
   symbols. Inspection of the pinned Charon source found that its default Miri
   analysis sysroot cannot code-generate, while nonselected dependencies still
   compile normally. This was not evidence of an unsupported Hub policy construct.
2. The same unchanged snapshot and selectors, adding only supported
   `--sysroot default`, succeeded in 63.727 s. Charon produced valid LLBC with
   `has_errors=false`: 1,304,953 bytes, SHA256
   `962aeafd7aeda717c68680b70228d5e29430692b765eb7c74d2d940509717b8f`.
   The four target bodies and their tenant/subject, role, risk and permission
   closures are transparent and structured. Native iterator/set/Option/ID
   operations remain external; no complete computed grant predicate is external.
3. Aeneas generated Lean in 1.020 s. Its initial output failed compilation because
   the pinned builtin Iterator structure lacks `map`, `filter`, `collect` and
   `any` fields. The pinned upstream regression
   `tests/src/issue-1043-iterator-methods.rs` uses the supported
   `-filter-trait-methods` option for this issue.
4. Adding that option regenerated the model in 1.016 s; isolated Lake compilation
   passed in 4.371 s. All 43 selected policy/helper/closure declaration blocks
   remained byte-identical. The output still contained 57 external placeholders,
   so this was not accepted as a policy proof.
5. Supported `-split-files` generation passed in 1.017 s. Sol implemented the
   documented external model files, preserving generated `Types.lean` and
   `Funs.lean`. Draft models-1 failed on two handwritten syntax/API errors
   (`Finset.insert`, Option-match elaboration); models-2 fixed those but exposed
   universe-specialized helper signatures. Models-3 corrected only those generic
   signatures. No generated policy or pinned tool/library was patched.
6. The frozen models-3 package passed all 11 file-hash checks. `lake build` passed
   in 9.729 s; `lake env lean ModelAudit.lean` passed in 2.568 s. Seven definition
   dependency audits—the four targets and `filterNext`, `any`, `collectSet`—list
   only `propext`, `Classical.choice`, and `Quot.sound`. These are audits of
   definitions, not completed policy theorems.

The first wrappers looked for LLBC/model output at incorrect paths/names and
temporarily reported absent files. The real artifacts and logs were inspected and
the summaries corrected; no tool success was inferred from those false fields.
Times above are individual stages with cached dependencies, not cold-start or
end-to-end throughput measurements.

## Model scope and remaining work

The [manual package](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/README.md)
fills 19 external type and 38 operation placeholders with ordinary Lean definitions.
IDs remain unbounded and nominally distinct. Finite-set views model BTreeSet;
iterator models call the actual extracted predicates and preserve their updated
state and short-circuit behavior. Unbounded scans use Aeneas's divergence model,
not an arbitrary fuel limit.

These are handwritten models of native primitives. Compilation and a standard-axiom
audit do not establish their refinement to Rust, lawful arbitrary comparison/borrow/
clone implementations, native ordering/allocation/aliases, or parsing. Unused
principal metadata is carried in ordinary model types; it is not newly verified.
No runtime collection or complexity changed.

Next work is to prove primitive laws and totality, then exact held-role, effective-risk
and granted-permission equivalences, including legitimate acceptance, duplicates,
empty inputs, matching denies and same-role access/risk coverage. Deliberate legal
mutants and restored checks remain pending. CurrentPermissions' actual registration
stream/request filter, selected-route decision assembly, principal/group projection,
session/issuer continuity and asynchronous/token boundaries are not discharged.
In particular, this evaluator uses the supplied principal's groups; it does not
independently refresh membership.

## Retained evidence identities

Linux evidence root:
`/home/rozgo/.cache/lean-pilot/hub-current-role-proof-20261029/`.

- `default-sysroot-probe/probe-receipt.json`: SHA256
  `ab0df3b17799f8661fa845685233d030b0a68324318e689b00e0b40edfbaee52`.
- `filter-trait-methods-probe/filter-trait-methods-receipt.json`: SHA256
  `9d6de2a7ff91d754b79c687a8d84f71abdebddbff7a2343239dedb5f7f48103c`.
- models-3 archive: SHA256
  `fdf682b181facc2dd623759bca09764982e9a4614e14786ca7a65da185a2f798`;
  11-file manifest:
  `86634d87ad0768ca95db4374704fec4d4ccd55b83d280a9d0aa499f1b7cd1e36`.
- Generated `Types.lean`:
  `f96d5d6e700d44f04d13b78d1e78bcc056a3752083302fa15f81ef1646dfd6ca`;
  generated `Funs.lean`:
  `390d5b405fe454ea4a776d4fd3fec1d6896ace1b53fe2737c88b5a5495ff9f52`.
- `models-3/logs/lake-build.log`:
  `4952a23c4c5c23542bc95bf2bdc2aaa9f3cfa99cf95466ca17b8d74b9ae13625`;
  `models-3/logs/lake-env-lean-model-audit.log`:
  `186d393e43ee5414e550b086fcfecb3921c4e91649af6add5c77fc91a99fe312`.
  Commands, exits, tools and timings are in
  `models-3/model-build-summary.json`.

This record applies to that frozen checkpoint. Later proof/model changes require
their own qualification and record.
