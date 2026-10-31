# Discovery cache preserves current admission

Hub commit `8543cc5` fixes a reproduced cache-isolation defect found while reviewing
`HUB-CATALOG-01`. Four added runtime lines include the current policy principal and
optional delegated permission set in the existing fingerprint, excluding the
principal's per-request authentication timestamp. The owning design was updated
first. No authorization rule, rejection, TTL, schema, dependency or infrastructure
change was introduced.

This is verification-driven source review and native component qualification, not
a new Lean theorem or deployed result. GPT-6.1 Sol investigated and implemented
the regressions/fix, GPT-6 Luna ran frozen-source checks, and GPT-6 Astra reviewed
the source chain, complete before/after observations and evidence. The work is
committed on local main; it was not pushed or deployed in this slice.

## Defect and reachability

The old fingerprint bound the actor and invocation authority, original OAuth client
and retained execution composition. The key also bound catalog generation and
server, and each profile had a separate cache. Two admission inputs were missing:

- The same forwarded subject can be exchanged for different permitted subsets.
  SDK `154a473` preserves caller fields and signs permissions separately. Hub
  restores that ceiling in `SubjectDelegation`; fresh policy narrows by it, but
  the old cache key did not distinguish it.
- Native delegated invocation retains the user as policy principal but constructs
  a service actor with empty groups. Different current user groups can therefore
  produce different installation role grants behind the same actor and authority.
  The old key omitted the policy principal.

Cache hits return previously admitted descriptors before fresh filtering. Broad
population first gave a narrow call an extra descriptor; narrow population first
omitted a legitimate descriptor for a broad call. Tool execution reauthorizes
separately. This demonstrates incorrect catalog visibility and omission, not an
execution-privilege bypass.

Public exchange/token reachability is source-reviewed through Hub's grant/admission
paths and SDK's `issue_exchanged`/verification. The native tests do not execute
those endpoints or validate signatures. Profile ownership, composition and
generation were checked as existing isolation inputs, not added again.

## Native experiment

Two regressions in `mcp::authorization::tests` use native catalog resolution,
`policy::decide`, delegation route/narrowing and `CatalogDiscoveryCache`. The group
variant executes the delegated principal-to-actor projection. The ceiling variant
starts with admitted subject fixtures and adds the separately carried permission
set. Installed-client OAuth admission is supplied as true; dynamic owner/database
callbacks, HTTP handlers, upstream servers and watches are outside this boundary.

The synthetic server declares a common read tool and an extra write tool. Fresh
admission yields `[cache-fixture__common, cache-fixture__extra]` with denied count 0
for the broad subject, and `[cache-fixture__common]` with denied count 1 for the
narrow subject. Each test runs both fill orders before comparing the aggregate
complete Tool payloads and denied counts.

On original production code, both tests compiled and passed fixture/context
validation, fresh admission, common-tool preservation and timestamp/audit-only
reuse. Both failed only at the final comparison: the second caller observed
`[broad, narrow]` instead of `[narrow, broad]` across the two orders. Neither result
was inferred from a setup failure or timeout.

The identical regression file, SHA-256
`58f9393d0d18d14efa4f99a2367e2e30c13c591ca9f719e9f8b842de30ca41f9`,
passes after the correction. Equivalent calls still reuse the cache after fresh
authentication timestamps and audit observations. The fix separates contexts;
it does not disable caching or add another authorization layer.

## Qualification and evidence

The source base is Hub `131499483f1ade247ca47f284572c30fd291a191`, with SDK
`154a473` and Core `120306e`. Checks used macOS aarch64, Rust/Cargo 1.99.0,
`SQLX_OFFLINE=true` and the existing warm target, without a database. The
1,082-file private source map stayed unchanged during each phase.

Original-source runs exited 101 at the semantic assertion in 33.384 s and 0.693 s;
the first included 31.74 s of compilation. Fixed checks passed:

- Authorization module: 8/8, including both regressions, 13.826 s.
- Discovery module: 13/13, 2.354 s.
- Existing actor/authority fingerprint test: 1/1, 0.331 s.
- Formatting: 0.649 s; strict library Clippy: 10.116 s.

These are command timings. One fingerprint invocation misplaced `--exact` before
Cargo's separator and was rejected before any test. The corrected command passed;
successful earlier stages were not repeated.

The [committed receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/discovery_cache/evidence/native-authority-isolation-20261031.json)
contains exact commands, source/log hashes and both binary identities. Its SHA-256
is `52aed708c30a00a81b56ce4046ceecedb96127d9292db214bc2c70639552f4f3`.
The fixed test binary was 168,110,856 bytes, SHA-256
`400e9ca175952ce2e0be4241715979e9db77aac0510003c98ba7b81ae11f00f2`.
The coordinator verified all eight log hashes, three frozen file hashes, unchanged
regression, accepted test names/counts and fixed binary identity.

No Linux/deployed/browser qualification, broad Docker gate, paid model call or new
formal proof ran. Existing Lean claims were neither rerun nor broadened.
`HUB-CATALOG-01` remains formally unproved. Next is a production-linked proof of
cache transitions and histories: stale completion is a complete no-op;
invalidation/generation changes fence earlier work; valid completion preserves
exact contents and unrelated entries subject to capacity eviction. Mutex, UUID,
time, native map and hash/serialization assumptions remain explicit. Arbitrary
changing OAuth callbacks or upstream behavior are not proved fresh by key equality.
