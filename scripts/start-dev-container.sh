#!/usr/bin/env bash
set -euo pipefail

echo "Building DNAnalyzer development container..."
docker build -f .devcontainer/Dockerfile -t dnanalyzer-dev .

echo "Starting development container..."
docker run --rm -it -p 8080:8080 -v "$(pwd)":/workspace dnanalyzer-dev
