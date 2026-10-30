# Registered-server policy: model compilation checkpoint

The generated superset from the
[unchanged-source extraction](2026-10-30-registered-server-policy-extraction.md)
now builds with its handwritten external models. The existing role, permission
traversal and authority-connection proofs rerun successfully. This checkpoint
does not yet establish a theorem about `decide_server` admission or qualify the
complete endpoint; HUB-AUTH-01 remains partial.

## Interpretation and limits

The source remains Hub `bb2e97f5c984a53eaa218109e4c01a70e952e365`, SDK
`05273d1f90b9a08e90e377187f4eddd084605fe5`. The new generated Types and Funs are
byte-identical to probe 2. No runtime source or dependency pin changed.

The external model adds nominal values for a canonical Task ID, an extension
error and an action handle carrying a distinct registry identity and name.
Additional ordinary operations model metadata copying, `AsRef`, optional values,
set emptiness and action-name parsing. The action-name value profile was compared
with pinned Core `120306e`'s validator: nonempty, at most 128 bytes, initial ASCII
lowercase, then lowercase/digits/underscore/hyphen/dot. This is reviewed source
correspondence, not a proof of the Core parser. Formatting output, allocation,
native reference identity and input validation remain outside this value model.

Two native operations deliberately remain explicit symbols:

- `chrono.offset.utc.Utc.now`;
- `veoveo_hub_sdk.registration.authorization.AuthorizationDeclaration.access`.

They have their extracted operation signatures and no assumed correctness theorem.
The forthcoming branch/output theorem will condition on their observed successful
results. This avoids inserting a fixed timestamp or deny-all route result into
the model. It does not prove wall-clock accuracy, temporal behavior across calls,
the pinned SDK's route semantics, or its equivalence to separately qualified SDK
`239622d`. The full extended model therefore does **not** have a standard-axioms-only
boundary. The previously qualified role/Held theorems still do.

The new `NativePolicyModelAudit` enforces separate dependency allowlists:
target projection, action naming and target copying may use only the standard
axioms; declared-route lookup may additionally use the SDK symbol; response
construction and `deny` may additionally use the clock symbol; `decide_server`
may use both. Existing grant/Held declarations and theorem dependencies are checked
against the standard-only list. No unreviewed axiom or `sorryAx` is permitted.

## Execution and observed corrections

Sol authored the model increment and reviewed the cache runner. Astra reviewed
the models, source correspondence and dependency boundaries. Luna ran the frozen
checkpoint on the existing Ubuntu Linux x86_64 proof host. The source assembly
verified 826 base files and the 35-file model overlay, retaining the existing
toolchain and dependency pins. Each attempt had a fresh package build directory
and reused the cached dependency packages.

Before compilation, review corrected the generic `Option` clone model to invoke
the supplied clone operation for `Some`, including its result/failure behavior.
The first build then stopped after 8.728 seconds on a Lean reserved field name
in the new handwritten action-handle representation. The syntax-only correction
renamed that model field to `actionName` and adjusted its accessor. Generated
files and runtime source were unchanged. The failed run is retained separately;
it is not a semantic negative control.

The corrected frozen `models-3` run passed:

| Command from `proofs/current_roles` | Exit | Elapsed |
| --- | --- | --- |
| `lake build` | 0 | 33.170 s |
| `lake env lean ModelAudit.lean` | 0 | 2.618 s |
| `lake env lean CurrentPermissionsModelAudit.lean` | 0 | 2.618 s |
| `lake env lean NativePolicyModelAudit.lean` | 0 | 2.668 s |

The complete multiline audit output confirms the per-function boundaries above.
The existing role/Held closures contain only `propext`, `Classical.choice` and
`Quot.sound`, or subsets. This run performed no native Rust test, new extraction,
semantic mutation, deployment or OpenCode/model acceptance call. Next work is the
actual projection, route trace, metadata and admission proofs, followed by native
witnesses, semantic controls and restoration.

## Evidence identities

The retained run is
`/home/rozgo/.cache/lean-pilot/hub-decide-server-20261030/models-3-run1/`, mirrored
at `/tmp/hub-decide-server-20261030/models-3-run1/`. The summary records the exact
commands, input verification and stage-log hashes. The failed syntax attempt is
under the separate `models-2-run1/` directory. Proof changes remain uncommitted
at this checkpoint.

```text
Models 3 archive    fe566b7a44226cf226665cbb316ad6dc0bfd941fa93af181f5d5c64483ecc6bc
Models 3 manifest   0e77c0dd2fff2caa7e45c3285a708fd5eab9249d269979e333aab8d41c3b7ea9
Audited runner      050c0d7cf980da2cb544542d455a500238c64ec44063c4e0d49cd3ce10a8c83e
Final run summary   3763157891f0ab7b6114e3d8a5f4a15c0f18693b4be14754204ff0d77613ec73
TypesExternal       e54e8dd65ef25a87f3ca1b20972ae208a28ef143df451b73fe7832e4349e93cb
FunsExternal        7868358ae77db217d582e249139e03b754ddb9f3073058d04491a812f15aa9dd
NativePolicy audit  d50ad3c1ed8120c32676bc602211c0f083bd6a5ce22c77a77fce05b1d5dd2005
```
