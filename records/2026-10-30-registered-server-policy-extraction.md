# Registered-server policy: unchanged-source extraction

This checkpoint establishes extraction feasibility for the next HUB-AUTH-01
increment. It does not qualify a new Lean theorem or the complete authorization
endpoint. The preceding [current-permission qualification](2026-10-29-current-permissions-qualification.md)
remains the last completed proof slice.

## Source and scope

The frozen source is Hub `bb2e97f5c984a53eaa218109e4c01a70e952e365`, with its actual
SDK pin `05273d1f90b9a08e90e377187f4eddd084605fe5`. All 826 base files were checked
against their manifest. The sole extraction-copy overlay is the previously reviewed
`charon::rename("control_plane_value")` annotation on the catalog field; removing it
recovers the original file. Runtime source, dependency pins and application state
were unchanged.

The first probe extracted `policy::evaluation::decide_server`,
`declared_route_access` and `registered_target`, including `decision`, `deny`, the
actual current-role/grant evaluator and the action helpers. The second added the
previously qualified `CurrentPermissions::held` entry point so subsequent work can
extend the existing package without losing its earlier production connection.
Both used the same seven existing opacity selectors; none was added for this slice.

`/root/coder` (GPT-6.1 Sol) prepared the frozen inputs, reviewed the adapted cache
runner and inspected the generated signatures. `/root/builder` (GPT-6 Luna) ran
the unattended, logged probes on Ubuntu Linux x86_64 and compared the retained
declarations. The Astra coordinator reviewed scope and the generated decision
path. No OpenCode/model acceptance, native test execution, deployment or full
Mac/Linux Docker gate was part of these probes.

## Measured execution

The existing pinned tools were retained: Charon
`de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf` and extraction Rust
`nightly-2026-09-17`. Charon used `--sysroot default --preset=aeneas`, the reviewed
entry points/includes and the two tool-registration arguments exactly once.
Aeneas used `-backend lean -filter-trait-methods -split-files`.

| Probe | Charon | Aeneas | LLBC |
| --- | --- | --- | --- |
| Three new entry points | exit 0, 23.856 s | exit 0, 1.768 s | 2,604,841 bytes; `has_errors=false` |
| New entry points plus prior Held | exit 0, 23.854 s | exit 0, 1.919 s | 3,784,027 bytes; `has_errors=false` |

The new decision functions, prior Held body and closures, role/grant functions,
`allows`, and selected action helpers are transparent structured definitions.
The previously reviewed synthetic snapshot projection `call_mut` remains opaque.
Aeneas still warns about the missing standard iterator model fields `map`,
`filter`, `collect` and `any`; these require the package's handwritten operational
models, not a runtime change. No Lean/model build was run at this checkpoint.

Comparison with the prior qualified generated files found 17 matching relevant
type declarations and 46 matching function declarations. Their bodies agree after
excluding source-location comments, inter-declaration ordering and the baseline
file's final namespace-closing marker. This is source/model correspondence
evidence; it is not a rerun of the earlier proofs in the extended package.

## Boundaries exposed by the probe

The actual evaluator takes `server` and `requirement` separately from
`request.target`. Its declaration lookup uses the supplied server, while declared
route lookup derives another server/requirement from the request target. The raw
proof must preserve this distinction; a normal-call corollary must derive their
agreement through the actual `registered_target` result.

The generated response construction calls the nullary foreign `chrono::Utc::now`
operation and retains its returned value. Native clock semantics remain outside
this extraction. Catalog lookups are operations of `PolicyCatalogView`; this
generic extraction does not establish catalog freshness or the concrete Hub
lookup implementation. SDK `AuthorizationDeclaration::access` remains a foreign
operation at the pinned revision. The separately qualified SDK matcher is at
`239622d`, not this pin: adoption or an explicit correspondence argument is required
before claiming that proof supplies this route lookup.

Next prove exact admission and returned fields, including valid `Authenticated`
routes with empty grants, permission membership, server/Task nonempty-grant
fallback and the distinct missing-target reasons. A permission-based denial must
retain its required permission; early missing-target denials leave that field empty.
Then connect an allowed permission route's grant membership to the existing
downstream-narrowing theorem. Ordinary external models, nonvacuous acceptance
witnesses, axiom audits, semantic controls and restored checks remain outstanding.
The full ten-area goal remains active.

## Artifact identities

Raw inputs, generated files and logs remain in
`/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/`, with the second probe's
summary, logs and generated files mirrored at
`/tmp/hub-decide-server-20261030/probe-2/`. Generated files were not installed into
the repository at this checkpoint. The summaries retain exact commands, exit
statuses, elapsed times, source checks and stage-log hashes.

```text
Base archive    892b8ebc2c6e60c0f83b284789d1ca744d8c2c9c41814640c389abec365d9b04
Base manifest   96703863c288f52f986a439824aab52992702f00c14e31f555597a448c4d36d2
Probe 1 summary 1bfc270cd0d71a46905dd3858cb1155d22f7f3dc495ce29357a805d0c59c6d7d
Probe 2 plan    ab10f6fb1010a6428b4daf52a23149b8d454fce00b6a442c1714b685bd807250
Probe 2 runner  ec61e9d9609e8bf7cf0ebecf611bf0a0af6dcb977736cdd42b90d88a4e2637ce
Probe 2 summary e588e6e74eb5622db692d317c100eb2cf43262874708ef15184708c1eaed7b2b
Probe 2 LLBC    8ba6e1b21547e5bf00c1df037204f0e1f6de882eec020ec522d7250d625ef660
Probe 2 Types   e0ac6edab7d722149b959315a0c88b13516606e6ef419a13104856b94cf72583
Probe 2 Funs    ab9d524b169b9b33a8b62c743d882eff4af294f4e54055b948197e7e69574f45
```
