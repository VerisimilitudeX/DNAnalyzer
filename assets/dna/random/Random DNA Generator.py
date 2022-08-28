# Generate a random DNA file that is 100MB
from random import choice

SIZE = 100000000
codes = ["a", "t", "g", "c"]
txt = ""
for _ in range(0, SIZE):
    txt += choice(codes)

with open("files/dna/dnalong.fa", "w+") as f:
    f.write(txt)

print("Done.")
