# SDK authorization proof publication

On 2026-10-30, SDK commit
`239622d12c08b771cc5e813fe3e846385d8d04ad` (tree
`bd5af0d6f4d1743f7b24856dc2957dc9784ee048`) was fast-forwarded to `origin/main`
from `05273d1f90b9a08e90e377187f4eddd084605fe5`. A subsequent
`git ls-remote origin refs/heads/main` independently returned the published commit.
The working tree was clean and `git diff --check 05273d1..239622d` passed.

The commit contains the private resource resolver/parsed matcher refactor, its
manual Aeneas/Lean package, native regressions and owning design documentation.
The [original qualification](2026-10-29-sdk-authorization-proof.md) records the
formal boundary and exact source overlay. Publication does not enlarge that
boundary. No public API, dependency or wire-contract change was added to publish it.

## Exact-source component checks

The SDK repository requires `docker build --target check .` on Mac and Linux
before pushing. GPT-6 Luna `/root/builder` ran those checks unattended from an
immutable `git archive` of the commit, without an overlay. Both hosts verified
archive SHA-256
`f947d89447934a09aea6553508ffa576850452b06a55815d49cf328420c8dec5`.
Linux compiled on the actual x86_64 machine; Mac used Docker Desktop's Linux
ARM64 environment. Source was transferred; built binaries were not.

| Host / build platform | Docker exit | Elapsed | Nextest result |
| --- | --- | --- | --- |
| Mac / `linux/aarch64` | 0 | 1,090 s | 283 passed, 3 skipped |
| Linux / `linux/x86_64` | 0 | 79 s | 283 passed, 3 skipped |

These are full check-target results, not only the Nextest summaries. Durations
include build/check work with the hosts' existing caches and are not comparable
performance measurements. No source fix was needed during these checks.

The Linux SSH wrapper returned 255 after the remote check completed. Its on-host
metadata records Docker exit 0; the complete log contains the successful test
summary and final image identity. The log and metadata were retrieved to the Mac
and their hashes checked against the remote files. The wrapper failure did not
cause another build or erase the successful remote result.

Check-stage image identities:

```text
Mac   sha256:53d450895fa6c34a1c20e45132d5b6e7adc8275eea26e43711e8cbd3d18ebc69
Linux sha256:9b7870661666316abae9c907b331fd6ce1230c88f821c2402a62b70a8cd7fb5f
```

Local logs and metadata are in `/tmp/sdk-239-check/mac/` and
`/tmp/sdk-239-check/linux/`, named `check.log` and `check.meta`.
Log SHA-256:

```text
Mac   10fcef0e67a39db40f411fca6801972d20db9a01ff5294c7b886ccaa42b609bc
Linux 046be158de8bc768efcbf7610e8465679af0fda11a58447911e7446567ab496c
```

The retrieved Linux metadata SHA-256 is
`9e14f6934c189de958478cf4381e3aa509b8a5e8f5c67e4413551e9c0ae8afd3`.
The bounded scratch receipt, `/tmp/sdk-239-check/linux/receipt.json`, has SHA-256
`96781b567f8e325a9f01ddeacbbf38300efa23ebdc024363e62c161b9dd5d7c9`.
Logs, build contexts and check images are temporary execution artifacts; this
record retains their measured identities.

## Responsibility and remaining work

GPT-6.1 Sol `/root/coder` owns the implementation/proofs and next SDK-to-Hub
composition. GPT-6 Luna `/root/builder` performed the two checks and retrieved
the evidence. The Astra coordinator reviewed the source/dependency boundary and
gate results, performed the fast-forward push and verified its remote identity.

At this publication checkpoint Hub still pins SDK `05273d1`. Publishing the SDK
does not update Hub or other consumers. The next slice adopts this exact revision
and attempts extraction of its actual public access wrapper, then composes the
qualified SDK resolver with Hub's registered-server and delegation results.
Native parsing, map/borrow adapters and clock semantics retain explicit proof
boundaries; no native implementation is proved by a dependency update alone.

The earlier manual Lean qualification was not rerun merely for publication.
These full component checks are separate evidence. No deployment, release image
publication, browser qualification or paid model call was performed.
