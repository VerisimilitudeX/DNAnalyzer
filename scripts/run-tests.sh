#!/usr/bin/env bash
set -euo pipefail

# Run Java tests
./gradlew test

# Run Python tests if any are present
if find . -path '*test*' -name '*.py' | grep -q .; then
    python3 -m unittest discover -s . -p '*test*.py'
fi
