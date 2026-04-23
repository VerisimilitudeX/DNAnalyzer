#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/launcher-common.sh"

dnanalyzer_init "$REPO_ROOT"
dnanalyzer_require_advanced

echo "Running DNAnalyzer with verbose output..."
dnanalyzer_run --verbose "$REPO_ROOT/assets/dna/example/test.fa"
