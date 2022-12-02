#!/bin/bash
set -e
rm -rf out

echo "--------[main module]---------"
npm prune --omit=dev

echo "---[github-stats submodule]---"
cd src/github-stats
npm prune --omit=dev
cd ../..
mkdir out
mkdir out/src
cp -r src/github-stats out/src/github-stats

echo "----[typescript compiling]----"
tsc
