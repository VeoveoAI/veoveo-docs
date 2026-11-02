#!/bin/sh
# Assembles the published files in .site/, laid out under /docs/ because static assets
# are matched by the full request path. .site/ is not committed.
set -eu
cd "$(dirname "$0")/.."
rm -rf .site
mkdir -p .site/docs/architecture
cp diagrams/veoveo-platform.html .site/docs/architecture/index.html
