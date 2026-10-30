# Request composition: extraction feasibility

The request-composition proof remains incomplete. Separate SDK extraction now reaches
the actual issuer and claims assembly, but the pinned Aeneas backend cannot yet translate
all of their Rust interfaces. **No Lean theorem or production behavior was added by
these experiments.** GPT-6 Astra reviewed the boundaries, GPT-6.1 Sol prepared the
extraction inputs, and GPT-6 Luna ran bounded, logged Linux commands. No deployment or
model-driven acceptance calls were made.

## Exact inputs

The unchanged runtime inputs are Hub `eb099bb885c2d8e55b001dbf2c75bdd3dcc10753`, SDK
`239622d12c08b771cc5e813fe3e846385d8d04ad` and Core
`120306eb969c6134dadd422dca701a2ce63e9492`. Hub `cda9372` adds the separately recorded
native routing test and evidence, without changing those runtime inputs. The SDK
archive contains 173 files and has SHA-256
`d503de9b88b34172eee6e3299c53417f737abe68ebbf2e724d3c26dd1edd4f77`;
its manifest is `a1a6575c81f7b16e21ef12e98ea9c6388f03afdda6880979ea7dd89d12e3ebe7`.

Tools remain Charon `de8736f7c995ac54dc490345cef9ea5143c06c62`, Aeneas
`fdebf20d78e8007bb92fc17068f17fc2e6cfbbbf` and Rust `nightly-2026-09-17` on Linux
x86_64. Charon binary SHA-256 is
`813d8ce502b7fe1b4bbb5e149ce7b403a031ce17c2cfd6fab831342ed397dc74`;
Aeneas binary SHA-256 is
`d968af5e01e50cef84add48a75cf2af8f80751458cab931066d05f42098d934c`.

## Hub translation boundary

The previously preserved Hub probe-4 LLBC has SHA-256
`e3c7ebdc5250dca44512caacc7999f54bc4636d5f3d856d2628afdacc1c4bca3`.
Its 17 Hub roots are transparent, but its SDK issuer is opaque, so it cannot establish
the connected claims contract. A single interface-only Aeneas pass exited 1 in
**2.143 seconds**, with peak RSS **636,100 KiB**. It generated partial files with
12 reported errors, including 9 unique errors; none were adopted as a proof model.

The independent source sites are the borrowed map of registration groups in
`RegistrationSnapshot::of`, the `Arc::as_ref` function item in `deployment`, the error
constructor passed to `map_err` in `issue_bearer_token_until`, and the borrowed return
through `acting_task`'s closure. Some later errors cascade from those failures.
The summary hash is `6a84de51d00e7718501b0ec381174261035f90dfa739d873995ed0eade41d717`;
the log hash is `2c2f41699401c0dee554b0d8d4a52f0cda5b07a259a27fa163c1ce36687c5e24`.

The earlier broader probe-5 extraction ended with SIGKILL after 263.622 seconds and
no LLBC. Available kernel evidence did not establish its cause; it is not reported as
an out-of-memory diagnosis. It was not repeated unchanged.

## SDK extraction and translation

The SDK was extracted as the main crate from its exact archive, rather than as a
dependency of the full Hub graph. The packet
`sdk-local-extraction-plan1.json` has SHA-256
`c8465ab01db06efbec4f9fd34954c47bf020cf706eb3ceb616f2926c8d8d414e`.
It uses two roots, `HubInternalTokenIssuer::issue` and `recipient::bind`, 36 include
selectors and five opaque signing/provider/clock/UUID boundaries. Cargo uses
`--lib --locked --no-default-features --features server`, offline, with two build jobs.
Commands are bounded to 600 seconds and preserve their logs and source identities.

Charon completed in **88.365 seconds**, exit 0, producing error-free LLBC of
20,505,033 bytes, SHA-256
`c4403bacf31b6200b38b279be2aadbb192b8a7fb1485f4699071a5c574495782`.
The corrected inventory confirms both roots and all 17 requested helper selectors
have unique, transparent, structured bodies. The issuer includes its real permission
guard, identity creation and signing call; context validation, delegation validation,
deadline calculation, actor-chain construction and claims construction are present.
This is extraction coverage, not a theorem about those operations.

One Aeneas pass on that preserved LLBC exited **2** after **2.368 seconds**, peak RSS
**437,036 KiB**, producing **no Lean files**. Reported limitations include function
pointer fields in Core's identifier-profile descriptors, the SDK error-constructor
function item, the slice iterator `find` signature used in delegation validation,
and `str::pattern`. The final uncaught backend failure follows those interface errors.

Evidence SHA-256 values:

- Corrected LLBC inventory: `bb4bcd362ee4fa4db55995db3eeee47f72498183b77b42bfa0c3e24a7f925a6b`.
- Aeneas summary: `2990ac8435ed45344346ff6ace30e49bd5255f50da83e21ba57174ed44826050`.
- Aeneas log: `8350e31092e18b9f203b62ec0dfe7e986be0557e486b32937409d876f34221b7`.
- Aeneas timing log: `cbc8405733e60091c17e6530b938c1d6a70a1ab6c82bf85ded5479a499f439d5`.

The first runner rejected the manifest's empty symlink object; a second setup lacked
Rustup on PATH. Neither reached Rust extraction. After Charon succeeded, the inventory
parser incorrectly counted nested closures and repeated option flags. The corrected
inventory re-read the **same** LLBC; Charon was not repeated. The original parser-false
summary remains diagnostic history, not the accepted body inventory.

Logs, packets and large temporary outputs are retained under
`/tmp/hub-request-composition-20261030` locally and
`/home/rozgo/.cache/lean-pilot/hub-request-composition-20261030` on Linux. The SDK
translation evidence is in `evidence-sdk-local-probe1-aeneas` locally. These scratch
outputs are not a checked proof package and are not committed as generated Lean.

## Next obligations

Keep actual identity/claims construction transparent. Review narrow interface changes
or explicit primitive models instead of assuming that an issuer returns the desired
identity. Any bridge between separately extracted Hub and SDK types must preserve
every relevant field and execute the actual extracted issuer.

For Hub's namespace construction, a private helper can preserve the current borrowed
grouping and allocation behavior while exposing that `of` retains the exact server
map. A theorem quantified over arbitrary successful helper results can establish
routing safety independently of namespace contents. It cannot establish the helper's
termination, successful construction or ordinary-deployment ordering. That proposed
factor is not applied in these inputs; those full-goal obligations remain open.

The SDK's direct and delegated expiry rules must remain distinct: preserving an old
source context does not impose that source token's expiry again on admitted delegated
Task work. Native qualification and a formal assembly theorem remain separate from
the Hub's live-Task admission, wire serialization, cryptography and SQL obligations.
