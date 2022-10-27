from random import choice

__summary__ = "Generate a random DNA file that is 100MB"
__author__ = "@Nv7-GitHub (Nishant Vikramaditya)"
__version__ = "2.0.1"

SIZE = 100000000
codes = ["a", "t", "g", "c"]
txt = ""
for _ in range(0, SIZE):
    txt += choice(codes)

with open("files/dna/dnalong.fa", "w+") as f:
    f.write(txt)

print("Done.")
