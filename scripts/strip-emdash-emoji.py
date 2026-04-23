#!/usr/bin/env python3
"""Strip em-dashes, en-dashes, and emojis from Markdown files."""

import re
import sys
from pathlib import Path

# Emoji ranges covering the vast majority of pictographs.
EMOJI_PATTERN = re.compile(
    "["
    "\U0001F300-\U0001F5FF"
    "\U0001F600-\U0001F64F"
    "\U0001F680-\U0001F6FF"
    "\U0001F700-\U0001F77F"
    "\U0001F780-\U0001F7FF"
    "\U0001F800-\U0001F8FF"
    "\U0001F900-\U0001F9FF"
    "\U0001FA00-\U0001FA6F"
    "\U0001FA70-\U0001FAFF"
    "\U00002600-\U000026FF"
    "\U00002700-\U000027BF"
    "\U0001F000-\U0001F02F"
    "\U0001F0A0-\U0001F0FF"
    "\U0001F100-\U0001F1FF"
    "\U0001F200-\U0001F2FF"
    "←-⇿"
    "⌀-⏿"
    "①-⓿"
    "■-◿"
    "⬀-⯿"
    "]+",
    flags=re.UNICODE,
)

# Variation selectors and zero-width joiners that can linger after emoji stripping.
COMBINING = re.compile(r"[︀-️‍]")


def clean(text: str) -> str:
    # Em-dash and en-dash replacement. Handle spaced forms first.
    text = text.replace(" — ", " - ")
    text = text.replace(" – ", " - ")
    text = text.replace("—", "-")
    text = text.replace("–", "-")
    text = EMOJI_PATTERN.sub("", text)
    text = COMBINING.sub("", text)
    # Collapse multiple trailing spaces that emoji removal may have left.
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def main(paths):
    changed = 0
    for p in paths:
        path = Path(p)
        if not path.is_file():
            continue
        original = path.read_text(encoding="utf-8")
        cleaned = clean(original)
        if cleaned != original:
            path.write_text(cleaned, encoding="utf-8")
            print(f"cleaned: {path}")
            changed += 1
    print(f"{changed} file(s) changed out of {len(paths)}")


if __name__ == "__main__":
    main(sys.argv[1:])
