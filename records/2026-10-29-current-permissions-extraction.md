# Current permission collection: extraction checkpoint

On 2026-10-29 (America/Los_Angeles), the actual `CurrentPermissions::held`
implementation and its role-evaluation callees translated successfully through
Charon and Aeneas. This is an extraction checkpoint, **not a Lean proof or native
qualification** of the added scope. External model definitions and the connection
to the existing authority proof are in progress. The broader Hub goal remains active.

The preceding [current-role qualification](2026-10-29-current-role-proof.md) is
committed locally in Hub `33849317d6e80c78ba7fd8ed57067a62a2eb677c`; its
documentation is in `71d703eeb505cff6967a32de4f4deb061fc46dc8`. Neither commit
was pushed or deployed in this continuation. The previous authority decision
source still matches its measured SHA-256
`c0c502a95d8ca195f72979eaace8f640590d1da1a88348a2906b4b4bf8903b52`.

## Source and intended connection

The Astra coordinator reviewed scope, diagnostics and the one source edit.
`/root/coder` (GPT-6.1 Sol) traced the implementation, inspected generated bodies
and prepared the edit; `/root/builder` (GPT-6 Luna) ran logged extraction on the
Ubuntu 24.04.5 Linux x86_64 host. No application-model calls, deployment changes
or full Docker gates were performed.

Hub base `33849317d6e80c78ba7fd8ed57067a62a2eb677c` retains SDK
`05273d1f90b9a08e90e377187f4eddd084605fe5`. Its archive contains 818 tracked
files. One approved overlay changes `RegistrationSnapshot::iter` from
`map(Arc::as_ref)` to `map(|server| server.as_ref())`. Both project the same native
borrowed value through the same lazy map. This is a verifier-enabling spelling
change, not a change to selection, permissions or collection strategy. Native
alias/borrow refinement is not thereby proved. The edit is provisional pending
connected qualification; no other production source was changed.

`CurrentPermissions::held` iterates every raw registration in its supplied
snapshot, computes actual role grants for the original caller, filters each
emitted permission against the requested set, then collects. The intended theorem
is exact membership: requested **and** granted by at least one raw registration.
It must include empty inputs and duplicate permission occurrences with differing
grant outcomes. It will construct the concrete `HeldModel` and establish the
earlier authority package's `LawfulHeld` premise, using the existing grant proof.

`decide_server` is a separate consumer of those grants. Its exact route admission,
refusal metadata and output remain the following step. Its independent server and
request-target lookups must not be silently equated; caller composition establishes
that relationship. Its SDK lookup and clock observation are separate boundaries.

## Extraction boundary

The precise trait-implementation start selector is:

```text
{impl veoveo_hub::delegation::authority::Held for veoveo_hub::delegation::CurrentPermissions}::held
```

The include selector adds `<_>` after `Held`; the pinned start resolver forbids
that extra trait generic while the include matcher supports it. All four earlier
role functions remain included. The held-only run uses no `decide_server` start.

Five explicit opacity selectors are necessary for this pinned translator:

- `veoveo_hub::mcp::upstream_http::HubUpstreamHttpClientPool`
- `veoveo_hub::contract::catalog::SectionDeclaration`
- `veoveo_hub::contract::catalog::TargetDeclaration`
- `openshell_sdk::config::AuthConfig`
- `veoveo_hub::registration::snapshot::_::iter::_::call_mut`

The first four are unused callback/client/configuration payload types whose Arrow
or dynamic trait-object representations Aeneas does not support. The fifth is only
the synthetic native `Arc` projection FnMut body. Its ordinary external model must
call the modeled native projection and preserve the zero-capture state. It must
not supply a prefiltered registration list or assume any permission result.

The actual held method, its grant/filter closures, snapshot iteration and call_once,
catalog getters, role grants and `allows` remain transparent. The extra borrowing
adapter boundary is explicit; no claim of formally proved native pointer identity
or aliasing follows. SDK access and clock functions are absent from this first
held-only closure.

## Measured sequence and diagnostics

Pinned tools remain Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`,
Aeneas `fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf`, extraction Rust
`nightly-2026-09-17`, and Lean 4.35.0. Charon uses `--sysroot default` and
`--preset=aeneas`; Aeneas uses `-filter-trait-methods -split-files`.
Runs used `SQLX_OFFLINE=true`, locked dependencies and two build jobs.

1. The first selector used inherent-implementation syntax for a trait method and
   did not resolve. A separate rustc recursion warning also appeared; correcting
   only the selector made Charon succeed. No recursion flag or runtime change was
   needed. The initial warning is not established as the failure's cause.
2. The corrected unchanged-source extraction passed in 24.255 s with clean LLBC.
   Aeneas failed in 1.820 s on unsupported unused payload types and the higher-ranked
   function-item lifetime in `map(Arc::as_ref)`. Its partial files are not models
   accepted for qualification.
3. The one-line closure and four type opacities removed those errors. Formatting
   passed in 0.665 s and Charon in 24.255 s. Aeneas still failed in 1.818 s while
   synthesizing the projection FnMut's borrow behavior: a non-endable abstraction.
4. Making only that projection FnMut an explicit external boundary produced a
   successful combined held/decide_server translation: Charon 24.205 s, Aeneas
   1.821 s. The body audit confirmed that no decision or iterator was hidden.
5. The focused held-only extraction, using canonical `hub_current_roles.llbc`,
   passed Charon in 24.003 s and Aeneas in 1.217 s. Its body audit again confirmed
   the intended transparency and single projection boundary. No Lean build ran.

These are stage times with compiler caches reused, not cold-bootstrap or request
latencies. The combined run remains useful feasibility evidence; its route and clock
models are not being claimed as implemented by the held-only package.

Temporary runner failures included an undefined variable, a list-versus-map
manifest assumption, an expected-output-path mismatch and two selector typos.
They are retained as excluded setup attempts, not semantic proof failures. The
verified successful command vector is now reused with structural argument edits.
One typo run was interrupted; none produced an accepted model. Charon's first
valid LLBC was recovered from its actual output path without rerunning extraction.

## Artifact identities and remaining work

```text
Base archive         344fd0b78d97e6c80dea3cc8f60699f8c6853dfdf141480269ea7cecf74031ed
Base manifest        cea24208194b6da9846d9feca00c1b0ddb885df3f06f8a5cf30ff526d99dd1ec
Overlay archive      505aea9cb83588e950fbb14dd5ec279b87bbf9e31d916b9bca5cf91d1edebb9f
Overlay manifest     28e902564fec1bd9bd1a8289e69d0e31d95ee6af8f6ea118a143d6e61972597c
Snapshot Rust file   4d35ca1aa547817387d7922ec552513516c18e4bf00cd3e99ce4da4a3e68678d
Combined LLBC        d446f1037d0968177e2d3f6021adef7b345256bb29e3ed6b82c2a7cf8db608a4
Combined summary     ef3a1a83f0283628179320a773c9aeea6d06e74c524b3cbc8c2837c5d8dad8dd
Held-only LLBC       1e0a394ab87dd9f1456f7e7d00aa53a0fdc25d9ce31c38009fa40f7745fb837a
Held-only summary    56c46ce6cca2331632f931dbbfab4c9486e9fed8197d11b66ea5f62e376c1295
Generated Types      daf9738095b6ebaf37504e50fda332c5731aa96e1edf3e56c66b959a75845243
Generated Funs       35eda4be50d739d139421538d4d24b8c6aeb6fc57de41f0286fb93b76dd47852
```

Logs, summaries, source snapshots and LLBC remain temporary artifacts under
`/home/rozgo/.cache/lean-pilot/hub-current-permissions-20261029/`, especially
`probe-6/` and `probe-9/`. The coder compared 14 shared generated type definitions
and 31 shared Funs declaration blocks with the qualified package: none were missing
or changed, apart from surrounding mutual/end delimiters. This is correspondence
inspection, not a rerun of the prior proofs against the extended model.

The held-only templates have 68 type placeholders and 46 function placeholders.
The eight additional operations concern raw map values, owned-set iteration, Arc
dereference, FlatMap and the projection adapter. Generated axioms are not accepted
as proofs: ordinary definitions, finite traversal laws, the actual union/filter
theorem and the authority bridge remain to be implemented and checked. First rerun
the unchanged current-role proofs against the extended model; then qualify the new
statements with native witnesses, semantic controls and fresh restoration.

No new authorization rule, runtime check, CI hook or infrastructure component is
introduced. The complete endpoint, principal/catalog freshness, session/issuer,
SQL/concurrency and native collection/borrow refinement remain separate obligations.
