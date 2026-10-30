# Current permissions: actual result and authority composition

On 2026-10-29, the finite FlatMap proof and the actual extracted
`CurrentPermissions::held` result passed Lean checking on Linux. A concrete
`HeldModel` and proved `LawfulHeld` now connect that method to the existing
delegated-issuance theorem. This advances the
[registration cursor checkpoint](2026-10-29-current-permissions-cursors.md).
Native witnesses, integrated semantic mutation controls and a fresh restored
qualification remain pending; this is a proof checkpoint, not completion of
HUB-AUTH-01 or the whole permission slice.

## Checked statements and limits

The [FlatMap proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/FlatMapIteratorProof.lean)
establishes finite traversal using the remaining outer sequence and active inner
cursor. Its recursive measure is twice the remaining outer length plus the
presence of an inner cursor. Initial validity is constructed from existing
registration and permission-set cursor laws. No arbitrary fuel bound or assumed
final permission union replaces traversal.

The [current-permission proof](https://github.com/VeoveoAI/veoveo-hub/blob/main/proofs/current_roles/CurrentPermissionsProof.lean)
establishes exact successful output for the actual extracted method. A permission
is returned if and only if it was requested and some raw registration's
declaration grants it to the original caller under the established role/risk
predicate. Empty requests and empty registration snapshots return the empty set.
This is traversal of the supplied deployment map, including duplicate server
slugs, not a unique-slug lookup or a newest-deployment selection.

The concrete authority operation is this extracted method. Its `LawfulHeld` law
is proved from the exact-result theorem instead of supplied as the earlier coarse
current-permission premise. The composed issuance theorem retains the supplied
context and characterizes every issued permission by requested membership,
declared uses and the actual raw-registration grant predicate.

The uses/resource operation laws remain explicit. The theorem does not establish
that the asynchronous endpoint constructed the supplied context from this same
caller, nor freshness of the principal or catalog. Native maps, sets, Arc value
projection, allocation and aliasing remain primitive-model boundaries. The actual
`decide_server`, token signing, transport, database behavior and complete endpoint
are outside this result. The proof adds no runtime policy or rejection.

## Execution and evidence

The Astra coordinator reviewed the claims and evidence. `/root/coder` (GPT-6.1 Sol)
authored the proofs; `/root/builder` (GPT-6 Luna) ran unattended, logged checks on
Ubuntu Linux x86_64. The source basis remains Hub
`33849317d6e80c78ba7fd8ed57067a62a2eb677c`, its reviewed equivalent snapshot
iterator spelling, and the extraction-only naming annotation documented in the
[model checkpoint](2026-10-29-current-permissions-model.md). Generated functions,
ordinary models and tool pins did not change during these proof repairs.

Both final runs used fresh scratch source/build directories and the pinned Lean
4.35.0 dependency cache. FlatMap run 3 verified all 822 merged paths; current
permissions run 3 verified all 823. All stages below exited zero.

| Run | Prerequisite build | Direct proof | Proof target build | Model audit |
| --- | ---: | ---: | ---: | ---: |
| FlatMap run 3 | 25.506 s | 3.720 s | 4.170 s | 2.568 s |
| Current permissions run 3 | 28.260 s | 2.718 s | 3.169 s | 2.618 s |

The commands were `lake build RegistrationIteratorProof CurrentPermissionsModelAudit`
then `lake env lean FlatMapIteratorProof.lean`, its Lake target, and the direct
model audit; the second run substituted `FlatMapIteratorProof` as prerequisite and
`CurrentPermissionsProof` as target. The eleven current-permission declarations
and the audited model dependencies contain only Lean's standard `propext`,
`Classical.choice` and `Quot.sound`, with no `sorryAx`. These are cached proof-tool
timings, not application performance measurements.

```text
FlatMap proof file     58a7202a883772ccf2270aafccf30bf09f02ac9804209bb2d4b9eb90bbaa1fa2
FlatMap archive        a9ade33eb8a23cc06d149004670ec621e6e88bc707c3b9e3fcea093f7bb3c3a1
FlatMap manifest       ce63fa642e4a2986dcf8e03c02800f58ac4632b45bfbf5c6b911cabb3746dc11
FlatMap direct log     2854cc824ea9487872c339196ef3b21e5c5d85817a7276e38204c18d7232322b
FlatMap run summary    ea58c75aecb1a8aea9b8647b569d18e9495930287913cec01bf072fdaafe4266
Held proof file        733eb2bf0d152ec5f369d6e1cd26afd3535ef71ac254eee5238654510f475302
Held archive           6007d506bd52ab447424c0952a765af1ab5e3e16fe9472c7a82e9871afa8b155
Held manifest          40b729767ee9b16ed233857db56ca65e86c5edf487bd843918230f16844ec8f3
Held direct log        5fb0f101bb2849a23008656cd74ff8fb38bb5d3f80c4325dd12ff70451f60d76
Held target log        e50f203f831f9d9d6d2200e0569131d5ed0cbd716afab8b3bc82f4aa6a17fdd6
Held run summary       9ab15f78291f840567e3f92aeddf5f56441524d11b749039f40702310e3243a4
Final model audit      b4e28394cd8b70e7d1db654be33d35da36092905769c42c6b6e9503ce86d6303
```

Logs and frozen copies remain under
`/home/rozgo/.cache/lean-pilot/hub-current-permissions-20261029/`, in
`flatmap-proof-run3/` and `current-permissions-proof-run3/`.

Earlier drafts failed proof elaboration. FlatMap required matching the exact
recursive state record, including its exhausted flag. Current permissions required
explicit monadic normalization and extensional membership reasoning across two
equivalent finite-set equality instances. These repairs changed proof terms, not
the statements, source behavior or model assumptions. Failed drafts are excluded;
they were not semantic mutation controls. No new native component checks, full
Docker gates, deployment or model-driven acceptance occurred in these runs.

Next qualify the method with native whole-set witnesses, separate excess-grant
and lost-grant mutations, and fresh restoration before extending to actual server
admission. The comprehensive Hub verification goal remains active.
