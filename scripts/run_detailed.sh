#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
source "$SCRIPT_DIR/launcher-common.sh"

dnanalyzer_init "$REPO_ROOT"
dnanalyzer_require_advanced

echo "Running detailed DNAnalyzer workflow..."
dnanalyzer_run --detailed --verbose "$REPO_ROOT/assets/dna/example/test.fa"
echo ""

echo "Generating reverse complement..."
dnanalyzer_run --rcomplement "$REPO_ROOT/assets/dna/example/test.fa"
echo ""

echo "Generating mutations..."
dnanalyzer_run --mutate 5 "$REPO_ROOT/assets/dna/example/test.fa"
