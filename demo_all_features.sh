#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/scripts/launcher-common.sh"

dnanalyzer_init "$SCRIPT_DIR"
dnanalyzer_require_advanced

FASTA_FILE="$SCRIPT_DIR/assets/dna/example/test.fa"

echo "🧬 DNAnalyzer Complete Feature Demo 🧬"
echo "======================================="
echo ""

echo "📋 Sample DNA file content:"
head -3 "$FASTA_FILE"
echo "..."
echo ""

echo "1️⃣ BASIC ANALYSIS (Default mode):"
echo "-----------------------------------"
dnanalyzer_run "$FASTA_FILE"
echo ""

echo "2️⃣ DETAILED ANALYSIS with verbose output:"
echo "-------------------------------------------"
dnanalyzer_run --detailed --verbose "$FASTA_FILE"
echo ""

echo "3️⃣ QUICK ANALYSIS:"
echo "-------------------"
dnanalyzer_run --quick "$FASTA_FILE"
echo ""

echo "4️⃣ MUTATION GENERATION:"
echo "------------------------"
dnanalyzer_run --mutate 3 "$FASTA_FILE"
echo ""

echo "5️⃣ REVERSE COMPLEMENT ANALYSIS:"
echo "--------------------------------"
dnanalyzer_run --rcomplement "$FASTA_FILE"
echo ""

echo "6️⃣ AVAILABLE COMMAND-LINE OPTIONS:"
echo "-----------------------------------"
dnanalyzer_run --help
echo ""

echo "✅ All features demonstrated successfully!"
echo ""
echo "🚀 USER-FRIENDLY IMPROVEMENTS CREATED:"
echo "======================================="
echo ""
echo "1. Easy launch script (easy_dna.sh) with preset modes:"
echo "   - basic, detailed, quick, mutations, reverse, all, custom"
echo ""
echo "2. Interactive custom mode for selecting specific options"
echo ""
echo "3. Analysis profiles for common use cases:"
echo "   - Research, Clinical, Basic, Detailed, Quick, Mutation"
echo ""
echo "4. Clear error messages and helpful guidance"
echo ""
echo "5. Sample usage examples and documentation"
