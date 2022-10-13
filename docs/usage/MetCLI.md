<h2 id="usage">Command-Line Interface (CLI) Usage
</h2>

DNAnalyzer uses CLI arguments instead of `stdin`. For example, you can do:

```
<executable> assets/dna/random/dnalong.fa --amino=ser
```

or

```
<executable> assets/dna/random/dnalong.fa --amino=ser --min=0 --max=100
```

Help message (--help):

```
Usage: DNAnalyzer [-hrV] --amino=<aminoAcid> [--find=<proteinFile>]
                  [--max=<maxCount>] [--min=<minCount>] DNA
A program to analyze DNA sequences.
      DNA                    The FASTA file to be analyzed.
      --amino=<aminoAcid>    The amino acid representing the start of a gene.
      --find=<proteinFile>   The DNA sequence to be found within the FASTA file.
  -h, --help                 Show this help message and exit.
      --max=<maxCount>       The maximum count of the reading frame.
      --min=<minCount>       The minimum count of the reading frame.
  -r, --reverse              Reverse the DNA sequence before processing.
  -V, --version              Print version information and exit.
  ```