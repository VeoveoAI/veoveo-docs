# Current permission collection: model compilation checkpoint

On 2026-10-29, the extended model of the actual `CurrentPermissions::held`
implementation compiled on Linux. The existing role/risk/grant proofs passed
unchanged against it, and both model dependency audits passed. This advances the
[extraction checkpoint](2026-10-29-current-permissions-extraction.md); it does
**not** yet prove the registration union, requested filter or their connection to
the authority package. Those new theorems remain in progress.

The Astra coordinator reviewed source correspondence and model boundaries.
`/root/coder` (GPT-6.1 Sol) implemented the ordinary external models and diagnosed
translation errors; `/root/builder` (GPT-6 Luna) ran logged, unattended checks on
the Ubuntu Linux x86_64 host. No native component test, full Docker gate,
deployment or application-model call was performed for this checkpoint.

## Source and model boundary

The frozen base is Hub `33849317d6e80c78ba7fd8ed57067a62a2eb677c`, with SDK
`05273d1f90b9a08e90e377187f4eddd084605fe5`. The sole production edit remains
the previously recorded equivalent iterator spelling in `snapshot.rs`:
`map(Arc::as_ref)` becomes `map(|server| server.as_ref())`.

The model retains the actual raw-registration traversal, grant mapper, requested
membership predicate and collection. New ordinary definitions model map values,
owned-set iteration, Arc value projection and forward FlatMap traversal. They
call the supplied iterator/closure operations and retain returned state rather
than supplying an assumed permission union. FlatMap records outer exhaustion;
correspondence with the concrete native fused cursor still needs a terminal-state
stability proof. Native allocation, aliasing, borrowing, sorted-memory and
post-terminal call-count traces are not proved by these definitions.

Two additional unused metadata types needed explicit extraction boundaries:
`prost_types::protobuf::value::Kind` and `serde_json::value::Value`. Inspection of
the extracted function bodies found no operation inspecting either payload. They
occur transitively in captured catalog metadata. Distinct ordinary tagged values
model them; no float arithmetic, JSON/protobuf parsing or serialization behavior
is claimed. The earlier four unused infrastructure type boundaries and single
Hub Arc-projection closure boundary remain. No permission decision was made
opaque.

The fresh LLBC inspection confirmed that the actual held implementation, its two
closures, both catalog getters, snapshot iterator/call_once, role functions and
`allows` remained transparent. Fourteen shared generated type definitions and
31 function blocks still match the qualified role package; its eight authored
proof/audit files were unchanged.

## Diagnostics and supported naming adjustment

The first model check stopped before compilation because the new local authority
dependency was absent from Lake's manifest. A targeted `lake update
hubAuthorityProof` added only `../authority`; all ten existing Git dependency
records remained unchanged. The resulting manifest SHA-256 is
`fdc65eacc395bd5cad4c2317b64818cd87ae67dcf483f2fa2921ed63c0c881ed`.

The second check failed on two generated metadata representations: an unresolved
`F64` in protobuf and a strict-positivity error in recursive JSON through its map
container. Later missing-type errors were cascades. The two data-only boundaries
above resolved those errors; fresh extraction preserved the permission-function
file byte-for-byte.

The third check then reached one generated Lean name collision. An earlier
`HubCatalog.control_plane` field shadowed the `control_plane` namespace in a
later field's type. The pinned extractor supports field rename metadata. A
temporary source copy adds exactly:

```rust
#[charon::rename("control_plane_value")]
control_plane: Arc<HubControlPlane>,
```

Charon receives `--rustc-arg=-Zcrate-attr=feature(register_tool)` and
`--rustc-arg=-Zcrate-attr=register_tool(charon)` for the selected crate. No
`lib.rs`, production field name, dependency, runtime build configuration or tool
binary is changed. Removing the single annotation line recovers the frozen
production `catalog.rs` byte-for-byte. The supported generator consistently
renames the Lean field and its access, including its own method-name collision
disambiguation. Generated Lean files are not edited. This annotation is a
proof-only staging input, not a deployed Rust change.

## Measured checks

Tools remain Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, extraction Rust
`nightly-2026-09-17` and Lean 4.35.0. Successful probe 10 used the two additional
metadata boundaries: Charon 24.106 s, Aeneas 1.221 s. Probe 11 added only the
supported naming annotation and its registration arguments: Charon 24.154 s,
Aeneas 1.217 s. Both exited zero with clean LLBC.

The final `held-models-run4` verified all 818 base files and 28 overlay files,
then checked these commands in order:

| Command | Result | Elapsed |
| --- | --- | --- |
| `lake build` | exit 0; existing role proof targets and extended model compiled | 24.205 s |
| `lake env lean ModelAudit.lean` | exit 0 | 2.618 s |
| `lake env lean CurrentPermissionsModelAudit.lean` | exit 0 | 2.568 s |

The reported dependency closures contain only `propext`, `Classical.choice` and
`Quot.sound`; the two new nominal metadata definitions depend on no axioms.
No accepted result uses `sorryAx` or a custom unproved fact. An audit of a
definition establishes its dependencies, not its desired behavioral theorem.
The unchanged role proofs are the behavioral results rechecked here.

The unsuccessful model builds are retained separately: run 1 stopped at the
missing manifest dependency; run 2 failed in generated types after 9.430 s;
run 3 failed at the namespace collision after 9.731 s. Neither audit ran after
those failures. Their nonzero exits are diagnostics, not semantic mutation tests.
Successful timings reuse pinned package/compiler caches and are not cold-build
or application latency measurements.

## Evidence identities and next work

The logged inputs and results remain under
`/home/rozgo/.cache/lean-pilot/hub-current-permissions-20261029/`, particularly
`probe-10`, `probe-11` and `held-models-run4`. Compact identities:

```text
Annotation patch      d419ecd3f16f120c367966c27c30bda0959b3cddd26fb0f106d15d0833ba3193
Original catalog.rs   240f410e22959bbf40983b95b532511f310b237d972e592d6f8ce7ad9dfc37ef
Annotated catalog.rs  5d7f03636a81b49549ca9645df7c55f44b2b685fc9964c33e382a5df7942bc57
Probe 11 LLBC         7ab21f7cf7e7560125c7783d620283dac16917e6fa974925f77cfe3fae22d758
Probe 11 summary      a6e5233ae7378b28a655a945ba33ae276652ece7386f955a3ea8862cf6fa5b2d
Generated Types       18f6df3d66cfe361d2b04d51e418823180ce3565d29a459c18fa0fb8e3a9c106
Generated Funs        77dbfe91b40fa74266ec162de9a128816529a067570384809b6534840832285e
Models 4 archive      80eab81fbf80c849db5845b8366bfd95a982af3b57ae74fa1751385ee2668568
Models 4 manifest     97af555c2840bc6edba2f64001b2f9732160a4c19fc921756df3e586f85a8963
Model build log       873bd7217fc8f60da08d2739ce7dc73f662a0a533d6a9e8c6a90afcc26c1734b
Old model audit log   186d393e43ee5414e550b086fcfecb3921c4e91649af6add5c77fc91a99fe312
Held model audit log  b4e28394cd8b70e7d1db654be33d35da36092905769c42c6b6e9503ce86d6303
Run 4 summary         3df0b7bccb5190c2551a47db2953a3cb20b8ab3be8cbe01e5b49d848f95d5367
```

Next prove finite traversal and exact held output, including empty inputs and
different grant outcomes for repeated permission names; construct the concrete
authority `HeldModel` and prove `LawfulHeld`, then instantiate the existing
delegation theorem. Native witnesses, semantic controls and fresh restoration
remain required before qualifying that expanded boundary. `decide_server`, outer
admission, principal/catalog freshness, session/token issuance and SQL remain
separate work. No new authorization rule, runtime check, CI hook or infrastructure
component was introduced.
