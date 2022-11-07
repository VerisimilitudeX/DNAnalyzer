#!/usr/bin/env bash

if [[ ! $(command -v mypy --help &> /dev/null) ]]; then
    python -m pip install mypy
fi

mypy --strict  $(git ls-files "*.py")
