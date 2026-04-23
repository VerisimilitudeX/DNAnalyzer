#!/usr/bin/env python3
"""Regenerate the module dependency graph in docs/ARCHITECTURE.md.

Walks src/main/java/DNAnalyzer/, extracts each file's package and its
intra-project imports (other DNAnalyzer.* packages), and writes a Mermaid
flowchart between the MODULE-GRAPH markers.

Zero external dependencies; runnable in CI with plain `python3`.
"""

from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
JAVA_SRC_ROOT = REPO_ROOT / "src" / "main" / "java" / "DNAnalyzer"
ARCH_DOC = REPO_ROOT / "docs" / "ARCHITECTURE.md"
BEGIN_MARKER = "<!-- MODULE-GRAPH:START -->"
END_MARKER = "<!-- MODULE-GRAPH:END -->"

PACKAGE_RE = re.compile(r"^\s*package\s+([\w\.]+)\s*;", re.MULTILINE)
IMPORT_RE = re.compile(r"^\s*import\s+(static\s+)?(DNAnalyzer\.[\w\.]+)\s*;", re.MULTILINE)


def toplevel_module(fqn: str) -> str:
    """Map a fully-qualified DNAnalyzer.x.y.z package to its top-level module."""
    parts = fqn.split(".")
    if parts[0] != "DNAnalyzer":
        return fqn
    if len(parts) == 1:
        return "root"
    return parts[1]


def collect() -> dict[str, set[str]]:
    """Return a map of module -> set of modules it imports from."""
    graph: dict[str, set[str]] = defaultdict(set)
    if not JAVA_SRC_ROOT.is_dir():
        return graph
    for path in JAVA_SRC_ROOT.rglob("*.java"):
        text = path.read_text(encoding="utf-8", errors="ignore")
        pkg_match = PACKAGE_RE.search(text)
        if not pkg_match:
            continue
        pkg = pkg_match.group(1)
        module = toplevel_module(pkg)
        graph.setdefault(module, set())
        for _, imported in IMPORT_RE.findall(text):
            dep = toplevel_module(imported)
            if dep != module:
                graph[module].add(dep)
    return graph


def render(graph: dict[str, set[str]]) -> str:
    modules = sorted(graph.keys())
    lines = ["```mermaid", "flowchart LR"]
    for module in modules:
        label = "root" if module == "root" else module
        lines.append(f"    {module}[{label}]")
    edges: list[tuple[str, str]] = []
    for src, deps in graph.items():
        for dst in sorted(deps):
            edges.append((src, dst))
    for src, dst in sorted(edges):
        lines.append(f"    {src} --> {dst}")
    if not edges:
        lines.append("    note[No intra-project imports detected]")
    lines.append("```")
    return "\n".join(lines)


def splice(doc: str, block: str) -> str:
    start = doc.find(BEGIN_MARKER)
    end = doc.find(END_MARKER)
    if start == -1 or end == -1 or end < start:
        raise SystemExit(
            f"Could not find {BEGIN_MARKER}...{END_MARKER} markers in {ARCH_DOC}"
        )
    before = doc[: start + len(BEGIN_MARKER)]
    after = doc[end:]
    return f"{before}\n{block}\n{after}"


def main(argv: list[str]) -> int:
    check_only = "--check" in argv
    graph = collect()
    block = render(graph)
    original = ARCH_DOC.read_text(encoding="utf-8")
    new = splice(original, block)
    if new == original:
        print("module graph already up to date")
        return 0
    if check_only:
        print("module graph is out of date; run without --check to update")
        return 1
    ARCH_DOC.write_text(new, encoding="utf-8")
    print(f"updated {ARCH_DOC.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
