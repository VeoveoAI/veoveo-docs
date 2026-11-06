# Media on Bioma generates real images

Bioma's Media ran against the synthetic fixture, so `media__models` listed only `fake/text-to-image`, `fake/large-video` and
`fake/always-fails`, and a person asking for a picture got 64 KB of filler bytes that no viewer opens. On 2026-11-05 (local time) it moved to
WaveSpeed, the provider it was built for. The template keeps the fixture.

## What changed

| Where | What |
|---|---|
| BiomaAI/veoveo-installation `e3ceea2` | `MEDIA_PROVIDER_URL` is `https://api.wavespeed.ai`, `MEDIA_OUTPUT_HOSTS` is `d2h7xmz5gqybh9.cloudfront.net`, `VEOVEO_PUBLIC_ORIGIN` is the public host; Media exposes its `http` service; the `generation` policy names WaveSpeed's API, with the credential bound to it, and its output host, with none; no `media-provider` sandbox, policy, claim or image |
| The box | The `vv-media-generation` provider's credential, by OpenShell's `provider update` from an environment variable; Media's `provider.env` reseeded with the webhook secret by the `seed-media-config-v1` Job, whose Job and bootstrap Secret were removed |
| Removed | The `media-provider` sandbox, its service, and the claims `media-provider-config-v1` and `workspace-media-provider` |

The key and the webhook secret came from `/Users/rozgo/BiomaAI/veoveo/.env`, and the box keeps copies, mode 0600, in its private directory under
`bioma/media/`. No value was printed. `veoveo-installer plan` afterward: 18 of 18 steps match.

## Evidence

Measured on the deployed installation.

| Layer | Input | Result |
|---|---|---|
| Installer tests | `cargo test --locked` in `installer/` | 97 and 8 passed |
| Catalog, as `rozgo@bioma.ai` | `media__models` | Media's log: "refreshed the model catalog", 1122 models; `wavespeed-ai/flux-schnell` is there and the query `fake` finds nothing |
| Model-driven acceptance | `deepinfra/XiaomiMiMo/MiMo-V2.6-Pro`, explicitly selected, session `ses_e5076f867ffeIzbfHUFxNxsZEa`, prompt "can you help me generate an image of a rainbow cow?" | 10 tool calls, all completed: the skill `hub:media/generate-media`, `media__models`, `media__model_schema`, `media__run`, `artifact__create_download`, a download and a read; 134 s |
| The run | `black-forest-labs/flux-3/text-to-image`, which the agent chose, listed at USD 0.048; Task `01a1af89-f63d-7aa3-998c-04e6cf6f40db`, prediction `18dc915af24747d995929e066122edc9` | `status: succeeded`, `completion: events`, 29 s from creation to completion: WaveSpeed's signed webhook came through the tunnel's Media route |
| Independent bytes | Artifact `01a1af8a-4c7b-7181-ba52-000035a1dd15`, downloaded apart from the agent | 635,980 bytes, JPEG, SHA-256 `598c76a1fb3052a0…`; size and media type match the artifact |
| The bill | `usage.record` for the Task | One estimate and one actual, each USD 0.048, quantity 1; the actual comes from Media's billing check with WaveSpeed |
| By eye | `/view/artifact/01a1af8a-4c7b-7181-ba52-000035a1dd15` in Chrome | A cow with a rainbow-striped hide in a sunny meadow |

The output's Artifact is private to `rozgo@bioma.ai`.

## What this does not prove

- **One model and one input.** The catalog's other 1121 models were not run, and video and audio were not tried. An output served from a host other than
  `d2h7xmz5gqybh9.cloudfront.net` would be refused until the policy and `MEDIA_OUTPUT_HOSTS` name it.
- **No spending limit.** Any person with `media` permission runs paid models, and an agent chooses which. Media records what a run costs and refuses a run it cannot
  price, but it caps nothing.
