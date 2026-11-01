# Factory link retargeting: native identity mismatch

The Factory recovery review reproduced a production defect: retargeting an existing
link from repository A to B changed the sandbox command to B but left the stored
runner and credential lookup pointing at A. A subsequent B push did not advance the
runner; an A push then changed its command back to A. This is an original-source
defect, not an injected proof-control fault.

The source basis is Hub `b03168abcc33ce17bc22a78c74babd8b1d3aba99`, with its pinned
SDK `7360c0f` and Core `422dcf2`. The first probe adds only a regression to the
existing native Lore Factory watcher fixture. All 1,157 archived source files and
844 build inputs were checked before and after execution. Production code was
unchanged for the reproduction.

## Scenario and observed failure

The exact test is
`contributions::lore::factory::tests::retargeting_a_link_updates_its_runner_identity_client_and_push_routing`.
It uses the real Factory code, SQL and a private PostgreSQL fixture, with in-process
fake Lore, OpenShell and image-builder services. Revisions, images and repository
names are synthetic fixture data; no deployed external service is qualified.

1. Create one runner of the parent branch's `team-a` link, targeting A and tracked
   branch 1. Observe its applied parent and linked revisions.
2. Push a new parent revision that retains that link name and the parent's own tree
   but retargets it to B and tracked branch 2.
3. Read the complete runner record, native command and actual `instance_client`
   projection using the provider's client credentials without exposing them.
4. Deliver a push to B, then a push to A, through their independent followers.
   Queued branch-created rechecks observe completed prior events; no sleep controls
   their ordering.
5. Assert the complete collected results: B's identity and command, B's later
   revision, and no change from A's later push.

The original-source aggregate assertion fails exactly as predicted. The first
command names B/branch 2, while `Runner.link.repository`, `Runner.link.tracked.id`
and `InstanceClient.linked.repository` still name A/branch 1. B's later revision is
not applied. A's later revision is applied and the final command names A again.

GPT-6.1 Sol prepared the regression; GPT-6 Luna executed the bounded native command
on macOS ARM64 with Rust 1.99.0 and the PostgreSQL 18 fixture. The coordinator inspected
the complete actual/expected tuple before accepting this as a defect.

The first command used the wrong Cargo binary name, `hub`, and exited in 0.601
seconds without compiling or running tests. Correcting only that argument to
`veoveo-hub` ran the intended test: one failure, 61 filtered, in 37.664 seconds
including compilation; the test body took 1.69 seconds. An unnecessary repeat with
unchanged source reproduced the same failure in 1.995 seconds, with a 1.49-second
test body. It is repeat evidence, not a second scenario or defect.

The test overlay's SHA-256 is
`b7e909e028ad8f112d8e8d3c03333bebc2639cf49577796275c59f68e8e4be7d`.
The executed binary is 97,532,360 bytes, SHA-256
`b7f5691a39cd48c740cdabb1aa945de8b9e70eaa0f07a96343d3fe95e6ae3b42`.
The first semantic-failure log is 6,254 bytes, SHA-256
`a8e5f3984bfecf3a093741264762ee7bfc006d5ff377f9c570c48c1790c82863`.
The original logs and maps are under
`/tmp/hub-factory-retarget-20261031/test-only1/evidence-run2/`; setup failure and
repeat evidence remain separately under `evidence-run1/` and `evidence-run3/`.

## Cause and correction boundary

Runner lookup uses parent repository, parent branch and link name. Creation writes
the linked repository and tracked branch, but the existing-runner update wrote only
the tracked branch's display name and latest pusher. The command used the new target
directly, while credentials and subsequent push selection read the old stored IDs.

The source review also found that registration queries join the instance's target,
but instance updates do not notify the registration watcher. Even a refresh can
suppress publication because its comparison omits the joined runner and branch.
Correcting stored IDs therefore needs corresponding live-catalog propagation.

The approved correction keeps the deployment and database: prepare first; await
the old sandbox's absence before storing a changed complete target; use existing
creation and credential renewal; publish joined target changes through the existing
kernel notification path; compare the complete published registration. A failed
delete retains the old target, without claiming the old native sandbox is still
serving. After deletion, a later failure may leave no sandbox and requires a retry.

Implementation and fixed-source qualification are in progress at this checkpoint.
No Lean theorem, formal SQL refinement, deployment or browser qualification is
claimed. The separate possibility of stale prepared work racing a parent change,
and registration-publication ordering under concurrent refreshes, remains open;
the sequential retarget regression does not resolve either.
