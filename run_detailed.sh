#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

dnanalyzer_init "$SCRIPT_DIR"
dnanalyzer_require_advanced

echo "Running detailed DNAnalyzer workflow..."
dnanalyzer_run --detailed --verbose "$SCRIPT_DIR/assets/dna/example/test.fa"
echo ""

echo "Generating reverse complement..."
dnanalyzer_run --rcomplement "$SCRIPT_DIR/assets/dna/example/test.fa"
echo ""

echo "Generating mutations..."
dnanalyzer_run --mutate 5 "$SCRIPT_DIR/assets/dna/example/test.fa"
