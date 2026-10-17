# Architecture documentation

- Update `diagrams/veoveo-platform.html` in the same change as every major change to
  component responsibilities, runtime placement, identity/trust flows or the
  source-to-deployment workflow. Keep `LORE_OPENSHELL_INTEGRATION.md` and
  `OPENSHELL_HARDCUT_PLAN.md` consistent with the visual guide.
- Update the diagram when an illustrated pending path is implemented or qualified.
  The execution checklist determines acceptance status; distinguish planned,
  implemented and qualified behavior. Do not infer acceptance from adjacent tests.
- Preserve the whitepaper colors and the three views: current platform, credential
  path and next integration. Update the snapshot date when reviewing new state.
- Edit the existing standalone HTML. Keep it self-contained; do not introduce a
  separate manifest, compatibility copy, archive or generated-image collection.
  Use its SVG/PNG export controls for images needed outside the guide.
- After visual edits, inspect all three views in a browser and check component
  details, navigation and exports. A byte-for-byte relocation needs only file and
  link verification.
