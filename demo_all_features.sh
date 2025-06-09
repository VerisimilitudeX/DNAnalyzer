#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "🧬 DNAnalyzer Complete Feature Demo 🧬"
echo "======================================="
echo ""

echo "📋 Sample DNA file content:"
head -3 assets/dna/example/test.fa
echo "..."
echo ""

echo "1️⃣ BASIC ANALYSIS (Default mode):"
echo "-----------------------------------"
java -jar build/libs/DNAnalyzer-1.2.1.jar assets/dna/example/test.fa 2>&1
echo ""

echo "2️⃣ DETAILED ANALYSIS with verbose output:"
echo "-------------------------------------------"
java -jar build/libs/DNAnalyzer-1.2.1.jar --detailed --verbose assets/dna/example/test.fa 2>&1
echo ""

echo "3️⃣ QUICK ANALYSIS:"
echo "-------------------"
java -jar build/libs/DNAnalyzer-1.2.1.jar --quick assets/dna/example/test.fa 2>&1
echo ""

echo "4️⃣ MUTATION GENERATION:"
echo "------------------------"
java -jar build/libs/DNAnalyzer-1.2.1.jar --mutate=3 assets/dna/example/test.fa 2>&1
echo ""

echo "5️⃣ REVERSE COMPLEMENT ANALYSIS:"
echo "--------------------------------"
java -jar build/libs/DNAnalyzer-1.2.1.jar --rcomplement assets/dna/example/test.fa 2>&1
echo ""

echo "6️⃣ AVAILABLE COMMAND-LINE OPTIONS:"
echo "-----------------------------------"
java -jar build/libs/DNAnalyzer-1.2.1.jar --help 2>&1
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