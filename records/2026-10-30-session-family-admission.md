# Exact session-family admission proof and native baseline

The unchanged session-family decision now has a checked exact-result theorem.
The full extended Lean package, direct theorem checks and four audits pass. Four
focused Linux native tests and the existing real-PostgreSQL session integration
test on macOS also pass. Deliberate faults and fresh restoration are still pending;
this is the positive baseline, not completed session qualification.

## Proved boundary

[SessionFamilyProof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/SessionFamilyProof.lean)
states an independent conjunction of the existing 16 admission conditions and
proves that actual extracted `SessionFamilyAuthority::allows` returns precisely
`.ok (decide Admitted)` for arbitrary modeled inputs. Acceptance and refusal are
therefore both characterized, without an assumption that the method already
returned the desired result.

Raw observed-field projections establish that changing unread fields cannot change
the result. In particular, refresh generation and the retained original IdP issuer
are irrelevant to this predicate. A coherent-family construction proves valid
access for arbitrary generations and retained issuers, subject to the actual token
bindings, scope containment and lifetime. Equal expiry refuses; one nanosecond
later in the same second admits an otherwise valid request. Time is the supplied
argument, not a newly sampled clock.

The nine printed theorem dependency closures contain only `propext`,
`Classical.choice` and `Quot.sound`; the executable audit rejects other axioms,
including `sorryAx`. Native Chrono/collection/identity representation correspondence,
compiler/extractor behavior and the caller boundaries remain as documented in the
[extraction/model checkpoint](2026-10-30-session-family-extraction-model.md).
The native store selects the exact signed family ID; the pure method observes
presence only. JWT checking, serialization, authoritative freshness and asynchronous
caller execution are not proved by the Boolean theorem.

## Native and component observations

Only a `cfg(test)` module was appended to `policy/session.rs`; the production prefix
remains byte-identical to the prior source. The four native tests exercise the
actual Rust method with typed synthetic records and fixed UTC timestamps:

- empty, equal and proper-subset token scopes;
- 13 individually changed identity/resource/client/context/tenant/issuer/subject/
  kind/scope bindings, each starting from a valid fixture;
- absent family, recorded revocation in either time direction, past/equal expiry
  and the next nanosecond;
- generation 0, 1, 7 and `u64::MAX`, differing original IdP and Hub issuers, changed
  unread metadata and a different present family ID.

The invalid-scope case contains every allowed scope plus an outside scope. Its
baseline uses equal scopes, so a reversed subset comparison reaches the intended
unauthorized-acceptance assertion instead of failing an earlier baseline assertion.
Fixture URLs are identifiers and are not contacted.

Linux Rust 1.99 ran `cargo test --locked -p veoveo-hub --lib policy::session::tests`:
four passed, zero failed, in a 45.692-second command including fresh Hub compilation.
Formatting passed in 0.665 seconds and strict library Clippy in 12.484 seconds.
The binary is 748,227,576 bytes, SHA-256
`135b9579cb15d45cd24d2643a7a84b656b638708b10b00e574b5d759d6e20d15`.

Separately, macOS arm64 Rust 1.99 with existing PostgreSQL 18.6 binaries on the test
process PATH ran the exact `session_family` integration test:
`session_binding_survives_rotation_and_rejects_cross_replica_revocation`.
It passed 1/1 in a test-reported 1.68 seconds; the Cargo command took 185.309 seconds
including compilation. The fixture owns a private PostgreSQL cluster and two
independent clients. It exercises rotation, live session reads, mismatched bindings,
logout, replay, expiry and a removed family. This is component evidence, not a
formal proof of SQL transactions, an actual multi-host deployment or an IdP login.
The macOS binary is 27,587,840 bytes, SHA-256
`0f1049d9d0ae36cceccfe9437d8504f81f1575c74091c7cfa2dc0941d8dd672b`.

## Proof execution and source identity

Sol `/root/coder` implemented the proof and native fixture, Luna `/root/builder`
ran the logged checks, and Astra `/root` reviewed the specification, actual theorem,
native cases and source/log correspondence. Lean/Lake remains 4.35.0. No production
authorization rule, CI hook, deployment or OpenCode scenario was added.

The frozen combined package passes its default build in 37.578 seconds, the direct
SessionFamilyProof check in 2.770 seconds, and ModelAudit,
CurrentPermissionsModelAudit, NativePolicyModelAudit and SessionModelAudit in
2.568, 2.568, 2.618 and 2.618 seconds. Earlier direct proof attempts failed on
decidability-instance/Boolean elaboration and broad simplification limits. Focused
Boolean normalization and proof irrelevance resolved them without changing the
specification or model assumptions or raising limits. These are development
attempts, not deliberate semantic controls; only the successful file/package counts.

Hub base remains `bb2e97f5c984a53eaa218109e4c01a70e952e365`, SDK runtime remains
`239622d12c08b771cc5e813fe3e846385d8d04ad`. The combined freeze has 56 overlay paths.
Archive and manifest respectively:

```text
ecba935731f83877f348c323b3cbdc384d2f386129d628de8f724a9152c925b2
cacecb60b01850d6ba5a6fd08449dd78a71f23d083130a59785f73c72803c11b
```

Session source including tests:
`2e1591c1630170180a974a2a4220b0be7c9cff754634e79148dc28083f5459b4`;
unchanged production prefix:
`3aff520943d1458c6bb37ae9db5ee5ca1a5fc9eb06c41a1083e381ede696e46f`;
SessionFamilyProof:
`ba721cd25a0be08297fcb8f81e93688c26f6c00ec4e1d8ac4370b2358571e71e`.

Summary hashes (formal, Linux native, macOS PostgreSQL):

```text
8e1b7de3ad375a0b46b3fcb2fd37ff21606fac4b0e6fd958ab36aa2a2ae4179d
d792f2bdd434fbb0808a777f83a8ee7055c8854d1a9a6a5f218268c828669bac
f287a767c50f42bd1dc3d8a2b31124f712af470020a870bfa509be2de690aa7e
```

Exact commands, manifests, stage logs and binary identities are under
`/tmp/hub-session-family-20261030/evidence-combined2/`,
`evidence-native-linux-run1/` and `mac-integration-run1/`. The direct proof history
is retained in `evidence-proof1/`. Source and reports remain uncommitted at this
checkpoint. Fault controls and restored qualification must complete before this
session slice is reported qualified; the broader OAuth/refresh lifecycle remains partial.
