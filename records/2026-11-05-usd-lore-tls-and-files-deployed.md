# Lore's TLS and ranges and the Hub's files route, deployed to Bioma

2026-11-05 UTC (2026-11-04 local). Worker: Claude Code (Opus 5.5), with no OpenCode or other model call. Evidence for step 3
of [plan section 18](../PLAN.md#18-usd-a-viewer-and-agent-tools-from-bevy_openusd). Scripts and logs are in
`~/k3s-builds/usd-20261104/step3-deploy/` on the box, with the probes' output under `probes/`. No token or signed URL
appears in them or here.

**Outcome.** Deployed and working. Every request naming a repository without a grant was refused. One thing the plan asked
for was not measured: the owner's real Lore token sent directly on `RevisionTree`. See [probe 3](#3-a-repository-without-a-grant).

## What changed

| Repository | Commit | Change |
|---|---|---|
| `veoveo-template-installation` | `56cfe48` | TLS on Lore's HTTP port, port 41339 on the container and Service, NetworkPolicy and Hub policy `lore_files` for the Hub alone, `httpEndpoint` in the seed, design and workloads |
| `veoveo-installation` | `1a6b4aa` | The same with Bioma's values, the lock, and the Lore server's own image |

| Image | Lock key | Digest | Built from |
|---|---|---|---|
| Lore server | `lore-server` (new) | `sha256:b9c6ca1ef842587b201c644f0bffa2a5d7545259b9bcef9fe2d2c54915ae8aa7` | Lore `2c0c689b` |
| Hub | `hub` | `sha256:dc0feb34aa8f26a16ca251c9843e8690f4e7b6d2fa92eec274e26c4dfdff7d41` | Hub `a75a1c6` |
| Lore command line | `lore` (unchanged) | `sha256:c06142c9f3c02dafbad9d26fd49407ea62f452bbeccd7806fedb030c8081cc65` | Lore `c33e017a` |

Read back from the pods: the Lore server runs `b9c6ca1e`. The Hub pod, Computers A and M and a factory instance mount
`c06142c9`.

**The separate lock key was not planned.** `@image:lore@` fills `lore.yaml` and the Hub, Computer and factory driver
configurations, so one new digest would have changed the Computer and factory templates. `c33e017a..2c0c689b` changes
only Lore's HTTP files, its settings, docs, tests and Cargo, not gRPC, so the Computers can safely stay. This ends the
README's "all run one digest". The installer's test lock names the new key too.

**`httpEndpoint`** took the reviewed route. It is in `kubernetes/hub.example.json`, the seed that the `hub-control-plane`
step publishes. `identity hub` wrote the private `hub.json` from the same seed. No private file was edited by hand.

## Sequence

Checks before pushing: `docker build -f installer/Dockerfile --target check .` passed on the Mac and on Linux for both
repositories (97 + 8 tests in Bioma). The first Linux run failed because macOS `tar` had added `._SKILL.md` files to the
copy, which a test read; rerun with a clean copy it passed.

| UTC | Action | Result |
|---|---|---|
| 05:02 and 05:03 | Lore image built in 81 s, Hub image in 68 s, at `nice 10` | Pushed |
| 05:05:51 | `plan` | rc 2. 15 of 18 match; `lore`, `hub`, and `hub-control-plane` refused |
| 05:06:59 | `apply --step lore --step hub` | rc 0 in 32.2 s: Lore's Deployment 15.0 s, the Hub sandbox replaced in 17.1 s |
| 05:07:39 | `identity hub`, then `plan` | Only `hub-claim` and `hub-control-plane` differ, and the new Hub validates the document |
| 05:07:51 | `apply --step hub-claim --step hub-control-plane` | rc 0 in 6.1 s; revision `gcp-01a1aa1b-4681-7c03-96fb-c153cca01aa2` active |
| 05:07:57 | `plan` | rc 0, **18 of 18 match** |

`plan` changed only the Lore server, the Hub and the listed configuration, so no stop condition was met. Pods created
since the deploy began are `lore-6b4c68cb58-dm4tw`, `hub` and the Hub's supervisor. No Computer restarted, the owner's
included.

**The refusal at 05:05.** The old Hub answered "extension admission failed" to the seed with `httpEndpoint`, and `apply`
changes nothing while any step is refused. So the Hub had to go first, by `--step`. The new Hub then accepted the same
document, with `httpEndpoint` as the only difference. That the old Hub refused because it did not know the field is
inferred, not read from its log. An installation publishing a field its running Hub does not know takes these two passes.

## Probes on the deployed stack

Throwaway repositories were made with the real `lore` binary: `step3-probe-a` (`01a1aa1cfb977557ae33891bf9205560`) from
Computer A (`rozgo@bioma.ai`), and `step3-probe-m` (`01a1aa1f4a087728bb467ecb9f316c10`) from Computer M
(`alex.rozgo@vrx.group`), in the same tenant, with no grant to A. Both were deleted afterwards through `lore repository
delete`, and the route then answered 404 for each. Route requests went to the public origin with the owner's stored SDK
sign-in.

### 1. Hub to Lore over HTTPS on 41339

| Check | Result |
|---|---|
| Hub's supervisor | `ALLOWED /usr/local/bin/veoveo-hub(0) -> lore.veoveo-system.svc.cluster.local:41339 [policy:lore_files]`; 0 denials |
| `openssl s_client` over a port-forward, Lore's CA, Service name | `Verification: OK`, `Verified peername: lore.veoveo-system.svc.cluster.local`, issuer `Veoveo Lore Service CA 2026` |
| `curl` with Lore's CA | `ssl_verify=0`, answer 401 |
| `curl` with the system's trust alone | Error 60, certificate not verified |
| Plain HTTP to the port | Refused by curl: not HTTP |

The policy passes TLS through (`tls: skip`), so the handshake is between the Hub and Lore. **That the Hub verifies the
certificate is inferred:** the route works against a private CA and its `reqwest` client has no setting that disables
verification, but the Hub was never shown a wrong certificate.

### 2. A real file through the route

SHA-256 of the route's body against a fresh `lore clone` in Computer A (87 ms):

| File | Bytes | Answer | SHA-256, equal on both sides |
|---|---|---|---|
| `hello.txt` | 21 | 200 | `c2b2c437…` |
| `blob.bin` (random) | 3,145,728 | 200, 0.87 s | `29499c8d…` |
| `folder/a b.txt`, as `a%20b.txt` | 18 | 200 | `c72290b2…` |
| `folder/inner/deep.txt` | 5 | 200 | `64896f89…` |

| Request on `blob.bin` unless named | Answer |
|---|---|
| `If-None-Match` with its ETag | 304, 0 bytes |
| `Range: bytes=1000-1999` | 206, `Content-Range: bytes 1000-1999/3145728`, 1,000 bytes equal to the full body's |
| `Range: bytes=-50` | 206, equal to the last 50 bytes |
| `Range: bytes=99999999-` | 416, `Content-Range: bytes */3145728` |
| The folder `folder` and the root | 200, JSON entries with name, type, size and address |
| `GET /lore/local/repositories` | 200, 26 entries, this one with `access: owner` |
| A missing path, and a missing branch | 404 `lore-file-not-found` |
| No token | 401 |
| `hello.txt` after a second push, with the old ETag | 200, new bytes `efb35395…`, new ETag |

Files answered `application/octet-stream`, `nosniff` and `private, no-transform`. Small requests took about 0.2 s.

**Cloudflare adds a browser lifetime to a range.** A 206 from `veoveo.bioma.ai` carries
`Cache-Control: private, max-age=14400, no-transform`. Past Cloudflare, through the gateway, the same 206 carries
`private, no-transform`, so the zone's browser cache setting adds it. `cf-cache-status` was `BYPASS`, so the edge did not
store it. It is inferred, not tested, that a browser could reuse a range of this URL for four hours after the branch moves.
Nothing was changed. The content domain's zone was set to respect the origin, per the
[Cloudflare record](2026-11-04-usd-cloudflare-setup.md).

### 3. A repository without a grant

**On the route, with A's sign-in on M's repository:** 403 `repository-access-forbidden` for a file, a folder and the root,
at 0.16 to 0.19 s, and not in A's listing. A's own repository in the same run: 200. An unknown ID: 404
`repository-not-found`.

**The owner's real Lore token, natively, on `StorageService/Get`:** `lore clone` of M's repository from Computer A. The
token stays in custody, and the supervisor's own rule is what puts it in front of Lore:

```text
05:15:21.192 supervisor  Request-scoped credential refused; forwarding the ordinary credential
05:15:21.193 Lore        response failed, classification "Code: 7", latency 0 ms
```

The same pair came at 05:15:22.104 and .105. The clone exited 29 with no files. Lore's log does not name which layer
refused; that it was the partition layer rather than token verification is inferred, because the same token serves other
Lore requests. The command line words this as "Repository not found", beside a stream reset with `CANCEL`, rather than
permission denied. The reset's cause was not looked into.

**Directly on `RevisionTree`, with a real Lore token: not measured.** Nothing was found that can send it:

- A Computer's supervisor admits only the `lore` binary to port 41337. `curl` was refused,
  `DENIED /usr/bin/curl(0) -> lore…:41337 [reason:transparent_tcp_policy_denied]`.
- `lore` never calls `ThinClientService/RevisionTree`; a search of its source finds no caller.
- A real Lore token does not leave custody. A browser login to mint one needs the owner's approval, which was not given.
  Signing one with the private key was ruled out.

What was measured on that RPC instead, on the deployed server, directly over a port-forward, with both repositories' real
revision signatures:

| Token | Own repository | Other repository |
|---|---|---|
| None | 16 `authorization header required` | 16 `authorization header required` |
| The owner's real SDK token, which is not for Lore | 7 `Not allowed` | 7 `Not allowed` |
| Junk | not sent | 7 `Not allowed` |

These prove the token check stands in front of the deployed RPC. They do not reach the repository check, since no token
got past verification.

**Component test, not a deployed probe.** At Lore `2c0c689b`, the real thin-client handler under the real `JWTInterceptor`
and `PartitionAccessLayer`, with the `ResourceGrantsAuthorizer` and HS256 test tokens of the shape the Hub issues. It is in
`rt-test.patch` and **is not pushed**. Passed, 0.02 s, both controls reading their own trees:

| Token for repository A, request naming B | Answer |
|---|---|
| `lore-partition-bin` B | 7 `Unauthorized` |
| `urc-repository-id-bin` B | 7 `Unauthorized` |
| `lore-partition-bin` B, `urc-repository-id-bin` A | 7 `Unauthorized` |
| B's branch tip by identifier | 7 `Unauthorized` |
| A signed token naming no repository, on B | 7 `Unauthorized` |
| No token | 16 |

The test builds the same stack as `partition_scoped` but does not call it. That `ThinClientService` registers through
`partition_scoped` is read from `lore-server/src/grpc/server.rs`, where `StorageService`, measured above, does too.

**One result in that test was not a refusal.** A token for A, naming A, with B's revision signature, returned B's tree. The
test's in-memory store is created with `isolate_partitions: false`, so it does not separate repositories. Bioma's store is
`s3_postgres`, whose `isolates_partitions` is true and whose read selects by `partition_id`. Measured live with the real
binary and token in Computer A's checkout:

| `lore` command | Result |
|---|---|
| `sync` to A's own revision 1 | rc 0 |
| `sync` to M's revision signature | rc 79, `state data address not found`, no files |
| `revision info` on M's revision signature | rc 79, `state data address not found` |

So the deployed store refuses this, and the protection depends on the store. The route itself only reads addresses from the
repository's own tree. No token reached `RevisionTree` this way on the deployed server, so this too rests on the store's
other reads.

### 4. What was already working

| Check | Result |
|---|---|
| `https://sandbox.apps.veoveo.bioma.ai/` | 200, 0.23 s, as before the deploy |
| `https://veoveo.bioma.ai/` and `https://x1.veoveo-bioma.space/` | 404 and 200, as before |
| The proxy page's `script-src` | `'self' 'unsafe-inline'`; with `?declared=1` it adds `'wasm-unsafe-eval'` |
| The Time App, `/apps/time/now`, in the owner's Chrome through the extension | Rendered, marked Live, with its clock and the owner's events |
| `resources/read` of `ui://time/now`, `ui://n8n/overview`, `ui://turno/prepare` | `text/html;profile=mcp-app`, 58,047, 36,260 and 11,430 characters |
| `tools/list` on `/mcp/local` | 78 tools |
| `lore` from Computers A and M | Create and push in each; from A a clone (87 ms), a second push (605 ms) and a clone of an older repository, `rp-probe-2155` (241 ms) |
| `embedding__embed`, real runtime | 567 ms, 768 dimensions, device `cuda` |
| Errors in the logs since the deploy | 0 at `ERROR` in Lore (32 lines) and in the Hub (6,674 lines) |

The WASM check reads the policy header only; no App compiled WebAssembly here.

### 5. Computers and factories cannot reach 41339

Run in Computer A and in factory instance `ab61-db6424cf0c90`, by Service name and by cluster IP:

| Program | Result in both |
|---|---|
| `curl` | Error 7 in 0 to 2 ms |
| `python3` socket | `PermissionError` |
| The `lore` binary, which may reach 41337 | Refused, rc 28 |

Supervisors logged each one, for example
`DENIED /opt/veoveo/lore/usr/local/bin/lore(0) -> 198.18.0.6:41339 [reason:transparent_tcp_mapping_denied]` and
`DENIED /usr/bin/curl(0) -> 10.43.21.195:41339 [reason:transparent_tcp_policy_denied]`.

The NetworkPolicy reads back as admitting 41339 only from supervisors in `openshell-openshell-vv-control`. **It was not
exercised.** A supervisor image has no shell to test from, so these refusals are the supervisor's. Only the sandbox policy
has been seen refusing; the NetworkPolicy behind it has not.

## Not proven

- The owner's real Lore token directly on `RevisionTree`, as above.
- The Hub refusing a wrong certificate.
- The NetworkPolicy dropping 41339 from another namespace.
- A Lore read lasting longer than Lore's 300 s timeout, and a file inside a link answering 404. Step 3 listed both as
  inferred, and they were not tried here. The largest file here was 3 MiB.
- Any request through the content domain, which is step 4.
