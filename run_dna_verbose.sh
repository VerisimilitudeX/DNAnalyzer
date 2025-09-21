#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

dnanalyzer_init "$SCRIPT_DIR"
dnanalyzer_require_advanced

echo "Running DNAnalyzer with verbose output..."
dnanalyzer_run --verbose "$SCRIPT_DIR/assets/dna/example/test.fa"
