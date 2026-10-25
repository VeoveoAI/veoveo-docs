# Architecture documentation

## Documents

- Design lives in `DESIGN.md` files: how each part works now, in present tense, with no
  dates, evidence, status or history. Each decision has one owner; other documents link
  to it and never restate it. [ARCHITECTURE.md](ARCHITECTURE.md) holds only what no
  repository owns, and its map names the `DESIGN.md` that owns each topic.
- Status lives in [PLAN.md](PLAN.md) and the
  [qualification checklist](QUALIFICATION_CHECKLIST.md).
- Records are dated evidence in `records/`. Never edit one; each new piece of work adds
  one file named `YYYY-MM-DD-topic.md`.
- Links to another repository are `https://github.com/<org>/<repo>/blob/main/...` URLs,
  never `../` paths.

## Visual guide

- Update `diagrams/veoveo-platform.html` in the same change as every major change to
  component responsibilities, runtime placement, identity/trust flows or the
  source-to-deployment workflow. Keep `ARCHITECTURE.md` and the owning `DESIGN.md`
  files consistent with the visual guide.
- Update the diagram when an illustrated pending path is implemented or qualified.
  The qualification checklist determines acceptance status; distinguish planned,
  implemented and qualified behavior. Do not infer acceptance from adjacent tests.
- Preserve the whitepaper colors and the three views: current platform, credential
  path and next integration. Update the snapshot date when reviewing new state.
- Edit the existing standalone HTML. Keep it self-contained; do not introduce a
  separate manifest, compatibility copy, archive or generated-image collection.
  Use its SVG/PNG export controls for images needed outside the guide.
- After visual edits, inspect all three views in a browser and check component
  details, navigation and exports. A byte-for-byte relocation needs only file and
  link verification.
