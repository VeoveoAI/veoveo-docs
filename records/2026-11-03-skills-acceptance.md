# 2026-11-03: Model-driven acceptance of skills in OpenCode and n8n's Assistant

The last qualification for the skills and Work Context rollout, after the deployed probes
passed ([sweep](2026-11-02-skills-and-work-context-sweep.md),
[follow-up](2026-11-03-task-guard-and-task-privacy.md)). Run in the owner's Computer
`01a16a8c…` (workspace `c4itoit73lpkaheav7u`, Computer version `0e9996d5296e`) through the
browser, at about 07:30Z.

## OpenCode

Model: `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, shown as selected in the prompt before sending.
Session `ses_e5fae787cffecYXIcZ1TGQ7HC8`, "Clonable repositories and clone instructions",
35k tokens, $0.02 at the end.

1. "Who am I, and which repositories can I clone? Tell me how I would clone one of them."
   - Seven tool calls (Skill, Execute, Shell), about 3 minutes. The platform skill loaded with no
     approval prompt, as the installation pre-approves `skill://veoveo/`.
   - The answer named the person, principal, tenant, Computer and groups, listed 24 repositories
     with their IDs, and gave `lore clone "$VEOVEO_LORE_REMOTE/<id>" <destination>`, with
     "Git alone won't work". These match the person section and the `lore` skill.
   - One wrong statement: it called `alex.rozgo@vrx.group` the same person ("also …"). That is a
     separate principal; the person section names one email. Inference: the model joined the two
     from a group they share. Model behaviour, not a platform fault.
2. "The template server has a skill. Load it and tell me, in two sentences, what it teaches about
   creating an item."
   - Before loading, OpenCode stopped with "Permission required: Load a skill by name,
     `hub:template/keep-items`", offering Deny, Allow always and Allow once. The template
     server is a factory-served branch, so its skill needs the person's approval (K8).
   - After Allow once, the answer described `template__create_item`, its `resultUri`
     `template://item/{item_id}` and `template://items`, which is what the skill says.

## n8n's Assistant

At `/computer/apps/n8n/assistant`, the same second question, adding "Don't build a workflow".

- Before loading, the Assistant stopped with "Opening skill: keep-items. Confirmation required",
  offering Always allow during this session, Allow once and Deny (K8).
- After Allow once, it answered in about 27 s with the same content as OpenCode, and built
  nothing.
- The confirmation names the skill but not its server; OpenCode's names both
  (`hub:template/…`).
- Not verified: which model the Assistant used. It calls the Computer's model through
  `veoveo-n8n-computer`; the page does not show the model.

Evidence screenshots were taken of both approval prompts (not stored in this repository).

## Result

K8 proven in both clients: a platform skill loads without asking, and a skill from a server
someone pushed asks first. The acceptance leaves one model error (the two accounts merged into
one person) and one presentation gap (n8n's confirmation does not name the skill's server).
