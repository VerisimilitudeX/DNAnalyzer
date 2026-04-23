#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/launcher-common.sh"

dnanalyzer_init "$REPO_ROOT"

echo "Running DNAnalyzer..."
dnanalyzer_run "$REPO_ROOT/assets/dna/example/test.fa"
