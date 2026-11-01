# Factory and Task proof applicability against main

This is a read-only source-applicability audit followed by a documentation
correction. It ran no build, extraction, proof command, native test or deployment.
GPT-6 Astra compared current source and receipts; GPT-6 Luna audited the Core
changes and the Task package's actual imported source boundary.

Fresh `git fetch origin main` calls found these local/remote matches:

- Hub: `bdbaa51567feecd3295687f96e0a17b92cd49b6a`.
- SDK: `e9105ca7d398039c6cff20a59d70b324037e3dda`.
- Docs: `fa13b5e62e30249f64806292acf551e9363af6f0`.

The standalone Core checkout was `ef0095241300b26d87e4aacbf485a398f63b7362`,
three commits behind origin/main `422dcf268d690fcbc3fee435cf9b81e7f36ffeac`.
It was left unchanged. Hub already pins all Core crates to `422dcf2`, and its SDK
crates to `7360c0f96cb616c519d27256df214ff4f2e6e831`. Cargo uses those Git pins,
not the standalone Core checkout. The SDK production-directory diff between that
pin and `e9105ca` contains only `crates/veoveo-hub-sdk/src/apps/DESIGN.md`.

## Factory

All nine runtime files in the Factory proof's `result-check2/inputs.json` match
their frozen SHA-256 hashes. `git diff 48d7e25..bdbaa51 -- crates Cargo.toml
Cargo.lock` is empty. The source behind the
[checked manual row contract](2026-10-31-factory-retarget-row-proof.md) therefore
has not changed. This preserves its stated applicability, not an unstated proof
of the full native/concurrent protocol.

## Task

The Task proof crate imports exactly the two production Rust modules named by
`proofs/task_continuity/rust/src/lib.rs`; its Cargo manifest does not depend on
Core. Both inputs still match the qualification receipt:

- Hub `crates/veoveo-hub/src/state/task_routes/decision.rs`:
  `42001518ef51d33535d79fb5dbe57a911fda35c762235fd09f97864a98222344`.
- SDK `crates/veoveo-hub-sdk/src/internal_auth/recipient.rs`:
  `038868d521a67a8780e458fe404688a960da05c3837aece655372d266d6830f4`.

Core `4ebcf89` changes Task delivery/deadline persistence to perform wake-up in a
subsequent statement within the transaction. These operations, their SQL and their
concurrency are outside the extracted Task decision/recipient functions. The old
proof remains applicable to those pure functions and does not establish the new
queue/wake behavior.

Core `477a37f` rejects consecutive underscores in server slugs. The proof assumes
admitted typed server values and lawful equality; it does not model the parser or
prove the resulting endpoint/resource association. Core `422dcf2` changes database
conformance fixtures to recognize `pg_catalog`; it is neither a production Task
change nor an input to this standalone proof.

The Task README called a native run on Hub `eb099bb` / SDK `239622d` / Core
`120306e` “Current request-routing native coverage.” That wording was stale and
has been corrected to identify the recorded run. Its immutable receipt remains
unchanged. No historical native result is relabeled as a run on today's pins.

This audit covers the active Factory slice and the named Task inputs, not every
proof package in the wider Hub coverage map. Other packages retain their own
revision-bound receipts and explicit outstanding correspondence obligations.
