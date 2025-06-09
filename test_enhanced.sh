#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "🧬 Testing Enhanced DNAnalyzer with Better Output Organization 🧬"
echo "=================================================================="
echo ""

echo "📋 Building the enhanced version..."
./gradlew build -x test 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed, trying with existing JAR..."
fi

echo ""
echo "🔬 Running enhanced analysis..."
echo ""

java -jar build/libs/DNAnalyzer-1.2.1.jar assets/dna/example/test.fa 2>&1

echo ""
echo "🧪 Running with mutations to test file organization..."
echo ""

java -jar build/libs/DNAnalyzer-1.2.1.jar --mutate=3 assets/dna/example/test.fa 2>&1

echo ""
echo "📁 Checking output directory structure..."
if [ -d "output" ]; then
    echo "Output directory structure:"
    find output -type f -name "*" | head -10
else
    echo "No output directory found (expected if using fallback)"
fi 