# veoveo-docs

Documents that span the repositories of the `VeoveoAI` organization. Each component
repository keeps the design of its own code in its `DESIGN.md`; this repository keeps
what no single component owns, the plan and the evidence. Start with the architecture.

| Document | Contents |
|---|---|
| [Architecture](ARCHITECTURE.md) | The platform's purpose, its components and their responsibilities, identities and trust boundaries, the Computer → Lore → factory → Hub workflow, configuration ownership, and the map of which `DESIGN.md` owns each topic |
| [Plan](PLAN.md) | What is next and what is open |
| [Qualification Checklist](QUALIFICATION_CHECKLIST.md) | Every feature to test on the installation, for people and agents: how to check it, what proves it and its current status |
| [Records](records/README.md) | Dated plans, execution logs and qualification evidence, cited by reports; history, not the current design |
| [Platform Visual Guide](diagrams/veoveo-platform.html) | Three interactive views (platform, credential path and integration) in the whitepaper palette, with the snapshot date of the state they show. Open the HTML locally in a browser |

Design is written in its owner's `DESIGN.md`, or in the architecture when no
repository owns it, in the same change as the code. Status is the plan and the
checklist. Records are added, never rewritten. Contributor instructions are in
[AGENTS.md](AGENTS.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
