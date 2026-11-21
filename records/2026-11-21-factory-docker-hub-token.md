# Factory builds fetch Docker Hub's pull token

On 2026-11-20 every factory build failed at its first step on a Docker Hub base BuildKit
had not pulled ([the record](2026-11-20-rust-1.100-postgres-19.md#factory-servers)), as
the 2026-10-25 record's D2 had on `docker/dockerfile`. The owner chose to let the Hub's
sandbox fetch Docker Hub's pull token rather than serve factory bases from the cluster.

## Sources

| Repository | Commit | Change |
|---|---|---|
| veoveo-hub | `085c5ab` | DESIGN.md, Factory Sandboxes: BuildKit asks `buildctl` for the pull token; the policy allows `GET /token` at `auth.docker.io` only, inspected as REST |
| veoveo-template-installation | `1043c3f` | `docker_hub_token` in both Hub policy examples, for `/usr/local/bin/buildctl`; `kubernetes/README.md` |
| veoveo-installation | `463d7fa`, `211dd4d` | The same entry in Bioma's Hub policy and README; the lock names the template at `1043c3f` |

## Probe

The probe is the Template server's Lore branch `dev/rozgo/docker-token`, pushed as the owner A.
Its `openshell/image/Dockerfile` adds `COPY --from=hello-world@sha256:1e4c05b8… /hello /sandbox/hello`,
an image no build had pulled: at 16:15:52 BuildKit held 162 cache records, none naming `hello-world`.
Scripts and logs are in `~/k3s-builds/docker-token-20261121/` on the box (`probe.sh`, `du.sh`, `probe.out`).

| Time (UTC) | Step | Result |
|---|---|---|
| 16:16:02 | Push 1, revision `a770a97b`, under the old policy | `failed{stage: build}` by 16:19: `#4 [internal] load metadata for docker.io/library/hello-world@sha256:1e4c05b8…`, `failed to fetch anonymous token: Get "https://auth.docker.io/token?…": dial tcp 198.18.0.6:443: connect: permission denied` |
| about 16:20 | `inst.sh apply hub` at `463d7fa` | The plan's one difference was `policy.network_policies.docker_hub_token`; the installer stopped, deleted and recreated the Hub's sandbox, keeping its workspace and claims, in 15.1 s; `/.well-known/oauth-authorization-server` answered 200 at 16 s |
| 16:20:11 to 16:20:12 | The Hub's rebuild of `a770a97b` after its restart | OpenShell's supervisor in `vv-control`: `Policy DNS mapped auth.docker.io … synthetic=198.18.0.6`, `NET:OPEN ALLOWED /usr/local/bin/buildctl(0) -> auth.docker.io:443 [policy:docker_hub_token engine:opa]`, then `HTTP:GET ALLOWED GET https://auth.docker.io/token` twice (`engine:rest`) |
| 16:20:13 | BuildKit | Cache record `pulled from docker.io/library/hello-world@sha256:1e4c05b8…` |
| 16:20:46 | Push 2, revision `40ed9e20` | Served at 16:24:59, 253 s after the push; `failed` empty, sandbox `ready` |

The supervisor's DNS line measures what the earlier record inferred: `198.18.0.6` is
OpenShell's synthetic address for a policy host, and the refusal was the sandbox's.
`buildctl` trusted OpenShell's TLS-inspecting proxy, so the endpoint is enforced as REST
with a `GET /token` rule rather than passed through as TCP. Push 2's build may have
reused the layers the rebuild had pulled; the token fetch is proved by the rebuild.

## Deployment

After the Hub's recreation, USD `cf8c2fb6`, Thumb `cdccf8ab`, Repo `22cfb719`, Time `475c20c4`,
Template `b1d780ea` and n8n `52c1701f` on `team-a` and `team-b` kept serving, sandboxes `ready`.
`inst.sh plan` at installation main `211dd4d`: 18 of 18 steps match.

## Not covered

- A base from a registry other than Docker Hub and the installation's registry, such as
  `ghcr.io`, still fails the build; its token host is not in the policy, as DESIGN.md says.
- A Docker Hub login: the token is anonymous, under Docker Hub's anonymous pull limits.
- The branch `dev/rozgo/docker-token` and its instance are kept, serving `40ed9e20`.
