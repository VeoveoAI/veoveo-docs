# Checked instance lifetime ownership and complete removal effects

The manual Lean model now proves that a reached instance-removal commit uses the
current registration snapshot and performs the complete independently specified
cleanup. It removes the instance, its registrations and their logins, while
preserving the deployment, unrelated logins and current disjoint application state.
This is the first formal checkpoint for the
[native race correction](2026-11-01-registration-instance-removal-fix.md), not
completion of the lifecycle slice or formal refinement of Rust/SQL.

Native correspondence is Hub `12a132dcbdddcd7fad1defcd007432385d237a76`;
adoption starts from `64c8a0f49ca7c49bb20d80e9789e597b87823b79`. GPT-6.1 Sol authored
the model, independent specification and proofs. GPT-6 Luna compiled frozen
sources on Linux x86_64. GPT-6 Astra reviewed the source mapping, theorem premises,
full compiler diagnostics and final source/artifact evidence. No native runtime
code changed in this checkpoint, and no deployment or model-driven acceptance ran.

## What the proof covers

The model represents one instance lifetime with two writers: instance-authorized
registration and removal. A first registration can have no deployment row yet.
The model preserves cached service authority, ordered private SQL effects,
captured DELETE rows, individual login drops, server commit/abort decisions and
separate response delivery. The original protocol retains its real deployment
upsert lock and late instance DELETE lock. Neither INSERT nor primitive commit
assumes the desired no-orphan invariant; the native registration FK references
deployment, not instance.

For arbitrary finite executions of the fixed protocol, the checked foundation
derives shared lock ownership, uniqueness of an active owner, ordered staging,
complete programs at commit requests and stable current instance/DELETE
observations. `reached_removal_effect` combines those facts with independently
specified cleanup algebra. It assumes neither the desired final database nor an
already correct cleanup program. Instance, deployment, registration and role
payloads remain parametric.

The [source mapping](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/LIFETIME_SOURCE.md)
identifies actual Rust/SQL operations and interpretation boundaries. PostgreSQL
READ COMMITTED locking/atomicity, SQLx behavior, native serialization and the Lean
toolchain remain trusted boundaries. The model is handwritten; Aeneas did not
extract these modules.

## Manual execution and evidence

Pinned Lean is 4.35.0 and Mathlib is
`56a005855ea17e0b0958f73ec801ae140b0a1679`. The canonical package retains its existing
Aeneas support pin `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`; no pin changed.

The direct commands compile one module at a time with
`LAKE_NO_UPDATE=1 lake env lean <Module>.lean -o <Module>.olean`, using the package's
`.lake/build/lib/lean/` output directory. Each command has a 180-second bound.

| Checked output | Direct command time | Direct artifact bytes | Result |
| --- | ---: | ---: | --- |
| RegistrationLifetimeModel | 4.422 s | 1,645,008 | Passed |
| RegistrationLifetimeSpecification | 4.020 s | 204,312 | Passed |
| RegistrationLifetimeProof | 10.932 s | 2,239,328 | Passed |

The three unchanged imported dependencies were first compiled in 5.224, 3.170 and
3.020 seconds. Later authoring checks reused only exact matching source/artifact
pairs. Final direct proof output has SHA-256
`069726c9c12bbf262f2dd181bc99e38190229e072bca1210e452c402570d458b`.

The final canonical package check ran:

```sh
LAKE_NO_UPDATE=1 lake build RegistrationLifetimeModel RegistrationLifetimeSpecification RegistrationLifetimeProof
```

It passed in **22.08 seconds** under the same 180-second bound. The 22-file
Lean/Lake/manifest/toolchain input map was unchanged before and after. Six package
modules built: the three requested targets and their three actual imports. Lake's
3,145-job summary includes cached dependencies; it is not a count of proofs or
fresh module compilations. The sixteen existing default targets remain unchanged
and were not all replayed.

The named-target artifacts are separately recorded: Model 1,645,120 bytes,
Specification 204,424 bytes and Proof 2,239,544 bytes. The latter has SHA-256
`ca42b4c47c7062e9f045af4b184853a3dbf23c496569989a6fe819dc012fa781`.
The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/instance-lifetime-foundation.json)
contains all source/tool/artifact identities, exact commands, timings and log
hashes. Compiled artifacts and full logs remain temporary.

All **30 declaration axiom guards** pass, and nine theorem closures are printed.
Only `propext`, `Classical.choice` and `Quot.sound` occur. The imported Effects
module separately retains its two existing audits. These are declaration checks,
not thirty execution scenarios. Unused-variable/tactic and deprecated lemma-name
warnings remain; there are no proof errors or accepted `sorryAx` dependencies.

## Authoring failures and remaining work

Four earlier frozen checks failed: record-update syntax; an erased result type;
unfinished request/phase cases and cleanup algebra; then an opaque record-field
mismatch and a reserved Lean identifier. Their diagnostics and source identities
are retained separately. Repairs changed formatting, an explicit result annotation
and proof bodies/helpers, without weakening the intended contract. These failures
are compiler feedback, not semantic negative controls or new native defects.

Next are exact optional-deployment registration effects; mixed actual-commit-order
histories with explicit unrelated-state interference; no-orphan preservation and
abort exclusion; complete legitimate, original-bug and rollback executions; and
semantic mutants with restoration. The existing commit-only history definition
does not yet establish an all-executions theorem when the frame changes.

Response tags are modeled, but complete returned credentials/database/metadata
payloads and postcommit audit/reload behavior remain unproved. Normal Factory row
updates, token reissue, namespace/per-client writers, housekeeping, allocation or
ID reuse, shared bootstrap/group state, cross-database atomicity, listener
convergence and liveness remain outside this checkpoint. The comprehensive Hub
verification goal stays active.
