#!/usr/bin/env python3
"""Refresh the impact-metrics table in README.md from the GitHub API.

Uses the `gh` CLI (pre-installed on GitHub-hosted runners) so we never
have to ship a PAT. The block is delimited by IMPACT-METRICS markers.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
README = REPO_ROOT / "README.md"
BEGIN_MARKER = "<!-- IMPACT-METRICS:START -->"
END_MARKER = "<!-- IMPACT-METRICS:END -->"
REPO_SLUG = "VerisimilitudeX/DNAnalyzer"


def gh_api(path: str) -> object:
    result = subprocess.run(
        ["gh", "api", path, "--paginate"], check=True, capture_output=True, text=True
    )
    out = result.stdout.strip()
    if not out:
        return None
    # --paginate concatenates JSON arrays without commas; handle both shapes.
    try:
        return json.loads(out)
    except json.JSONDecodeError:
        chunks = []
        decoder = json.JSONDecoder()
        idx = 0
        while idx < len(out):
            while idx < len(out) and out[idx] in " \n\r\t":
                idx += 1
            if idx >= len(out):
                break
            obj, end = decoder.raw_decode(out, idx)
            chunks.append(obj)
            idx = end
        if not chunks:
            return None
        if isinstance(chunks[0], list):
            merged: list[object] = []
            for chunk in chunks:
                merged.extend(chunk)
            return merged
        return chunks[0]


def count_paginated(path: str) -> int:
    data = gh_api(path)
    if isinstance(data, list):
        return len(data)
    return 0


def main() -> int:
    repo = gh_api(f"/repos/{REPO_SLUG}")
    if not isinstance(repo, dict):
        print("could not fetch repo metadata", file=sys.stderr)
        return 1
    stars = repo.get("stargazers_count", 0)
    forks = repo.get("forks_count", 0)

    contributors = count_paginated(f"/repos/{REPO_SLUG}/contributors?per_page=100")
    merged_prs = count_paginated(
        f"/search/issues?q=repo:{REPO_SLUG}+is:pr+is:merged&per_page=100"
    )
    # Release asset downloads
    releases = gh_api(f"/repos/{REPO_SLUG}/releases?per_page=100")
    downloads = 0
    if isinstance(releases, list):
        for rel in releases:
            for asset in rel.get("assets", []) or []:
                downloads += asset.get("download_count", 0) or 0

    rows = [
        ("GitHub Stars", stars),
        ("Forks", forks),
        ("Contributors", contributors),
        ("Merged pull requests", merged_prs),
        ("Release asset downloads", downloads),
    ]

    block_lines = ["| Metric | Current Value |", "|---|---|"]
    for label, value in rows:
        block_lines.append(f"| {label} | {value} |")
    block = "\n".join(block_lines)

    original = README.read_text(encoding="utf-8")
    start = original.find(BEGIN_MARKER)
    end = original.find(END_MARKER)
    if start == -1 or end == -1 or end < start:
        print(
            f"could not find {BEGIN_MARKER}...{END_MARKER} in README.md",
            file=sys.stderr,
        )
        return 1
    new = (
        original[: start + len(BEGIN_MARKER)]
        + "\n"
        + block
        + "\n"
        + original[end:]
    )
    if new == original:
        print("impact metrics already up to date")
        return 0
    README.write_text(new, encoding="utf-8")
    print("refreshed impact metrics")
    return 0


if __name__ == "__main__":
    sys.exit(main())
