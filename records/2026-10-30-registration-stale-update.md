# A stale update preserves the replacement deployment

Hub commit `22cdabb` fixes a second registration concurrency defect found during
the verification work. A request could read its registration before replacement,
then update after replacement had removed that row. The old store transaction
ignored the zero-row registration update and unconditionally changed the retained
deployment metadata. The native probe reproduced this, and the identical corrected
regression passes with the fix. The update-operation Lean proof is still pending.

## Reproduction and fix

The actual store fixture creates a seed at version `0.1.0`, captures its stored
registration and compares its token digest, then prepares valid same-key, same-slug,
same-deployment update metadata at `0.3.0`. The SDK signs and verifies the statement
for that client's configuration URI. Actual replacement through a second owner
pool commits version `0.2.0` and removes the seed registration and login. The test
confirms that removal and the complete replacement state before calling the actual
store update for the captured old client.

The original store returned `Ok`. Only two captured fields changed: deployment
metadata version `0.2.0` became `0.3.0`, and its fixture endpoint moved from port 11
to port 12. The replacement registration still described version `0.2.0`; its
complete row, the claim and the selected login privileges/memberships were unchanged.
The exact before/after snapshot assertion failed, exposing the inconsistent state.

The fix reorders the existing two UPDATE queries so the deployment lock is taken
before the registration row, matching replacement's lock order. When the registration
write affects zero rows, it explicitly rolls back the transaction, discarding the
pending deployment change, and returns the existing success shape. The fixed probe
observes `Ok` and an unchanged complete replacement snapshot. SQL and transport
errors still propagate normally; this is not a blanket no-op guarantee for an
earlier failing constraint or a namespace-changing request.

There is no new authorization rule, rejection, query, schema, SQLx record or runtime
API. An update of an existing client still changes that registration and its
deployment, preserving other replicas' metadata. The owning design was updated
before the source change.

## Checks and evidence

GPT-6.1 Sol implemented the test and fix; GPT-6 Luna ran the bounded logged checks
on macOS aarch64 with Rust/Cargo 1.99.0 and PostgreSQL 18.6; GPT-6 Astra reviewed
the source, actual snapshot differences, qualification and commit.

The first successful reproduction reused another unit test's login names. Core's
pinned fixture shares one PostgreSQL cluster across test databases, and roles are
cluster-wide, so only this new test's representatives changed to suffixes 11 and 13
before running both tests together. The original test and helpers remain unchanged.
The corrected failing and passing runs use identical test SHA-256
`56cb9b5d4832aafd8e30958b7f54b17fee5705987aeeaf650100c9fe67421483`.

- Original source: exact focused regression exited 101 on the state assertion,
  with no timeout. Cargo took 8.821 seconds; the test body took 0.79 seconds.
- Fixed source: both concurrency tests passed together. Cargo took 17.653 seconds;
  the test bodies took 1.13 seconds.
- Six existing instance-registration integration tests passed, including normal
  update behavior: command 59.309 seconds, test bodies 25.00 seconds.
- Formatting passed in 0.646 seconds; strict library Clippy passed in 9.114 seconds.

Command timings include compilation. The
[receipt](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/registration_transactions/evidence/native-stale-update.json)
contains exact commands, source maps, native binary identities, result/log hashes,
the observed field differences and both baseline records. All three frozen source
files were unchanged during the fixed checks. The same warm build cache was reused;
no repeated Lean/extraction job, full Docker gate, deployment or paid model call ran.

## What this establishes

This is a deterministic actual-store schedule corresponding to the service's
preflight/write gap. It executes the store read and SDK statement verification,
but not the service authentication function, bearer parser, HTTP endpoint, audit
or post-commit reload. It does not prove all update/removal interleavings, formal
SQL refinement or deployed behavior.

The earlier [register/replace qualification](2026-10-30-registration-concurrency-qualification.md)
explicitly excludes update writers. The next proof work must connect the new
deployment-first transaction, both staged writes, missing-row rollback, normal
per-client output and mixed-operation histories. That extension cannot be inferred
from this passing native test. The source fix is committed locally, not pushed or
deployed; the comprehensive verification goal remains active.
