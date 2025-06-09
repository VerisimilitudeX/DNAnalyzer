#!/bin/bash
cd /Volumes/T9/DNAnalyzer

echo "Running DNAnalyzer..."
java -jar build/libs/DNAnalyzer-1.2.1.jar assets/dna/example/test.fa 2>&1 