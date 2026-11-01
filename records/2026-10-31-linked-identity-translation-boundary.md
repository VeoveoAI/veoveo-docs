# Current linked identity: complete Rust extraction, unsupported Lean translation

SDK `ce85c3d` records an unmodified extraction investigation of the current linked
repository token flow. The final Rust graph and its own-body inventory pass, but
Aeneas cannot translate that graph. **No generated Lean files or new theorem
results were produced.** This is a measured tool boundary, not a production defect.

The [receipt](https://github.com/VeoveoAI/veoveo-hub-sdk/blob/main/proofs/internal_auth/evidence/current-linked-translation-20261031.json)
contains all four attempts, exact commands, source/tool/input/output hashes and
diagnostics. Its SHA-256 is
`6ea2be1b5ab8d511e09dc8bc2c63b45e4dde331d570523d043b6a354a19736ce`.
GPT-6.1 Sol prepared the extraction scopes, GPT-6 Luna ran them on Linux, and
GPT-6 Astra reviewed the actual source, inventories and logs.

## Target and boundaries

The source is SDK `7360c0f96cb616c519d27256df214ff4f2e6e831`, with Core
`422dcf268d690fcbc3fee435cf9b81e7f36ffeac`. All 178 archived SDK files remain
unchanged through each completed attempt. The four entry functions are ordinary
`issue`, `issue_with_repository`, `recipient::bind` and `identity_from_claims`.
The complete claims and identity paths are retained, including recipient binding,
actor validation, duplicate detail handling, repository reconstruction and timestamp
conversion. Native Lore token issuance and cryptographic/JSON decoding are outside
these roots, rather than implicitly established by them.

The seven explicit selectors are unchanged across attempts: concrete claims signing,
crypto-provider initialization, clock, UUID generation, signing-key representation,
the exact JwtId parser and the free permission namespace helper. The parser is
matched by its owner, signature and source span; it does not hide PrincipalId parsing.
Actual permission ownership methods and the repository helpers remain transparent.

## Measured attempts

1. Charon succeeds in **25.724 s**. The inventory rejects a selector that flattened
   five promoted-constant initializer names into the `validate_for` method name,
   plus 53 omitted Core function bodies. These are generated constants, not five
   additional method implementations. Aeneas does not run.
2. Exact method matching and reachable Core component includes correct those
   issues. Charon succeeds in **14.240 s**; seven omitted Core type representations
   stop the inventory. Aeneas does not run.
3. Including those types exposes three further Core representations and one
   `naming::check` function. Charon succeeds in **14.241 s**; inventory stops again.
   A separate initial setup attempt had omitted the source archive and manifest
   from the fresh directory. Its input gate stopped before metadata or extraction;
   the log was retained separately and the unchanged packet ran after transfer.
4. A single transparent Core namespace include completes the reachable own graph,
   retaining the same four roots and seven explicit boundaries. Charon succeeds in
   **13.890 s**. Inventory checks pass for **205 transparent own functions**, four
   explicit opaque own functions and **60 transparent Core types**. The complete
   LLBC has 392 function declarations, 222 types, 51 traits and 247 implementations.

The final LLBC is **18,422,080 bytes**, SHA-256
`8412ccf4039c0915e3806a032389b947a51f483004813132779e861484645644`.
Aeneas exits 2 in **1.367 s**, reporting:

- Early returns inside the verifier's authorization-details loop are unsupported.
- Function-pointer (`Arrow`) types in Core `IdProfileSpec`, `IdGrammar` and
  `IdSchema` are unsupported, including locally quantified lifetimes.
- The `InternalTokenError::Identifier` constructor's function-trait signature is
  also rejected, followed by an unsupported Rust string-pattern signature and
  `CFailure`.

These are measured wall-clock stage durations; the command-only time-v durations
for the last Charon/Aeneas runs are 13.86 s and 1.32 s. The final Aeneas log is
6,695 bytes, SHA-256
`131918f862d967260d56e305ba6c14c696c2e96bbf15535b04d02995ed3b7ae8`.
Only LLBC is emitted; no raw Lean output is repaired or adopted.

## Consequence and next work

No production, generated or backend source was changed. No helper was made opaque
to hide these failures, and no new runtime check, authorization rule, CI job or
deployment was added. The separate passing native SDK checks do not establish a
formal verifier result.

Current verifier continuity stays open. Pinned translation options are being
inspected before selecting a remedy. The actual repository-grant calculation is
a useful next foundation: derive the exact union from tenant, principal and
admitted group memberships; preserve legitimate `Some(empty)` read grants and
return `None` only when no assignment matches. Such a proof would be partial
coverage, not a substitute for issuer/verifier composition or native Lore issuance.
Any eventual roundtrip theorem must also account for NumericDate's seconds
projection, rather than claiming nanosecond timestamps survive serialization.
