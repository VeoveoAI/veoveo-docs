# Linked repositories: a revision without `openshell/`, a deep link, and content that runs nothing

2026-10-31 (UTC). Coordinator: Claude Code (Opus 5.5). Code: a coding agent (Claude Code,
Opus 5.5), reviewed by the coordinator. Checks, deployment and probes: a build agent (Claude
Code, Sonnet). Plan section 14. These are fixes found in the
[previous deployment](2026-10-31-linked-repositories-hub.md).

## What shipped

| Component | Commit | Change |
|---|---|---|
| veoveo-hub | `000f74e` | **A revision without `openshell/`:** Lore answers the `openshell` prefix with `NotFound`, or with `InvalidArgument` where `openshell` is a file. Either is read as an empty `openshell/`, so there is no instance and no failure. The link checks still run in that case.<br>**Content runs nothing:** a linked repository's `openshell/policy.yaml` rule whose binary path or glob could match `/sandbox/link` is refused (`/**`, `/sandbox/**` and the like). The link then gets no runner, or keeps what it applied, with the reason in `hub.lore_runner_failure`. A team's rules name programs, such as `/sandbox/src/**` or a program of the image.<br>**Names in refusals:** refusals and audit targets name a linked tool as the caller wrote it, as in `ledger__team-b__inspect`.<br>**No server named:** no real server is named in the Hub's or the SDK's tests and examples |
| veoveo-hub-sdk | `7360c0f` | The runner tool audit target `veoveo://servers/{server}/links/{link}/tools/{tool}`; neutral examples |
| Installations | template `c926cf7`, BiomaAI `25c4423`, `2c6e314` | Design text. Nothing under `/sandbox/link` reaches the Hub, the database or a linked repository's endpoints as a program of its own. Two limits stay the parent program's responsibility: OpenShell matches a rule against a program and the programs that started it, and the base policy's internet rule names every program. The lock's Hub |

## Checks and deployment

| Check | Result |
|---|---|
| SDK `7360c0f`, box | rc 0, 74 s, 328 passed, 3 skipped |
| Hub `000f74e`, box and Mac | rc 0; box 244 s; 444 passed, 2 skipped |
| Deployment | Hub image `sha256:c4c85d1b…`. `plan` showed 17 of 18 steps matching, the Hub's image the only change. `apply --step hub` took 20.7 s, and the next `plan` showed 18 of 18 |

## Probes

All probes ran as `rozgo@bioma.ai`, with README pushes, and the status was read about 12 s
later.

| Probe | Result |
|---|---|
| A repository without `openshell/` (`rp-probe-2155`) | `console__status`: "No instance: no instance serves that branch of the repository", with no prepare failure |
| Top-level links, without `openshell/` (`rp-parent-top-2155`) | The same: no instance and no failure |
| Links at `teams/one` and `teams/two` (`rp-parent-deep-2155`) | "…could not be prepared: reading the revision's links as `<person>` failed: the revision holds the link teams/two below its top level, which a factory sandbox's checkout cannot leave out: a factory serves only links at the top level of a branch's revision, so move the link there or remove it". It names one of the two links |
| The n8n instance | A README revision pushed at 22:17:07.27 was served at 22:17:18.3, about 11.2 s later, with no failure |

## Boundaries

- No runner has run yet. J2 to J5 wait for the n8n runner.
- The refusal of a rule naming `/sandbox/link` has been shown in fixture tests only.
