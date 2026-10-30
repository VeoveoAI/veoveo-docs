# Control publication: native faults and restoration

Two deliberate faults in private copies of the actual publication method were
caught by the new PostgreSQL tests. Fresh validation of the original implementation
then passed. This completes the native controls for the
[publication baseline](2026-10-30-control-publication-native-baseline.md); the
complete Lean transaction qualification remains in progress.

Sol `/root/coder` prepared the mutations and reviewed failures; Luna `/root/builder`
compiled and ran logged checks; Astra `/root` independently compared source copies,
verified summary/log digests and inspected the exact assertions and observations.
The native execution used Rust 1.99 and PostgreSQL 18.6 on macOS. Each control started
from the same frozen source, cleaned only the Hub package, compiled successfully,
and ran one exact test. No deployed or model-driven acceptance call was made.

## Deliberate faults

The working publication method remains unchanged. Each private source comparison
showed only the intended change in `src/store/control.rs`; test code and SQL remained
identical to the accepted baseline.

**Omit the locked predecessor comparison.** The mutation keeps lock acquisition and
the active-pointer read but disables the comparison's rejection branch. Compilation
passed in 24.227 seconds. The exact blocked-writer test exited 101, with zero passed
and one failed, at `stale predecessor must refuse: ()`. The stale writer returned
success after the fixture had observed real lock overlap. The test-reported duration
was 0.93 seconds; the whole witness command took 2.969 seconds. No timeout occurred.
The later row/audit assertions were not reached, so this control does not report a
post-second-commit relational snapshot.

**Commit configuration before appending audit.** The mutation commits immediately
before `records.append`, then opens a new transaction for the appender. Compilation
passed in 24.266 seconds. The exact late-failure test exited 101, with zero passed
and one failed, at the intended relational-snapshot equality. Its diagnostic shows
actual `active = gcp-publication-failed`, while the expected old snapshot has
`active = gcp-publication-base`; the candidate revision and new context also appear
in the actual snapshot. The appender error and completed rollback therefore did
not remove the already-committed configuration. The test-reported duration was
0.87 seconds; the command took 2.959 seconds. No timeout occurred. The final
`load_active_revision` assertion was not reached.

For each case, the no-run compilation, witness precheck and postcheck identify the
same executable. The controls are native Rust/SQL counterexamples. Separately
checked Lean examples demonstrate the corresponding faults in the handwritten
model; this is not extraction of the mutated asynchronous Rust or formal SQL
refinement.

## Fresh original-source restoration

The exact unmutated native checkpoint was reconstructed in a new source directory
and Hub was recompiled. All stages passed:

- formatting: 0.596 seconds;
- two new publication tests: 26.513 seconds including compilation, test-reported
  1.08 seconds;
- two existing control-store integration tests: 33.735 seconds including
  compilation, test-reported 1.01 seconds;
- strict library Clippy: 8.459 seconds.

The frozen merged source map remained unchanged after these checks. A first
restoration launcher attempt stopped before any build/test stage because a copied
scratch runner retained the earlier run-directory collision guard. Removing only
that stale guard allowed the fresh-root guard and intended commands to run; the
setup-only failed launcher log is preserved. No product source change followed
from that instrumentation error.

## Identities and remaining work

The native checkpoint is the same 76-path overlay as the baseline: archive
`625f62aebc2509448c453d93420078c9971dfdd4ae3181ba11ae7010f72069de`,
manifest `1593c899760c13c5b32c94050f296345343c6a78e47eb3eeae42052385e186c0`,
on Hub `bb2e97f5c984a53eaa218109e4c01a70e952e365`, SDK
`239622d12c08b771cc5e813fe3e846385d8d04ad` and Core
`120306eb969c6134dadd422dca701a2ce63e9492`.

Original runtime source SHA-256:
`5fd8da2683e4acc81f0a28fc4246d98456b9c82a6bb32ccd891b352f07f12830`.
The checked working source still has that digest. Mutated source digests were
`74a38e29d9ae4dcff9a056784eae0ea9c1425df991921f5d16e7aff72f035301`
and `81274d483fdc47647beb84ac9007cea043140aef7aeff94652da4e1fc14a31a4`.

Control binary digests, in the order above:

```text
7bc812ce979cf16a79a0b0d30281cec6c3c0963744334b079a3b0fa251b50aa3
bc335015c55378ea8a1930713aab2db2dbb795f2118e92f7ad9344a12a65dbbc
```

Restored unit/integration binary digests:

```text
f36d3198283d7115078bb50bf321b6a5c3818adcd2cece9da3d69964020cbb47
6ee736f40025f4b76cd6acb11ddbc10f46969dfe6b326bb1ba75b37888ffb6a2
```

These temporary binaries reused Cargo output paths; earlier binary digests identify
the captured earlier executions, not the files currently at those paths.
Evidence under `/tmp/hub-control-publication-20261030/`:

- `native-control-omit-locked-predecessor-run1/summary.json`:
  `7e43b9b5e5778ab03ad420c42044d9d5dd566f9861fe6c5b4b7c88fbe50e13e8`;
- `native-control-split-commit-before-audit-run1/summary.json`:
  `a4846bd056cb11396bdc48d85deb19b2ef3212b337b4f40e63dd64d6044fff85`;
- `native-publication-checkpoint5-restoration-run1/summary.json`:
  `e52cc7cc7cd5d5317b865f6d59ff7be268779945ee11290adbac36f23e4b03e5`.

The original control summaries preserve their pending-review fields; acceptance is
the independent semantic review recorded here. No original production bug was
established. The remaining formal work includes concrete reachable successful and
uncertain-commit executions, final package integration and the combined receipt.
The PostgreSQL, physical-durability and replica-adoption boundaries from the
baseline remain unchanged. Work is uncommitted; no runtime rule or infrastructure
was added.
