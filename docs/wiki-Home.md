# Welcome to the DNAnalyzer Wiki!

![](https://user-images.githubusercontent.com/96280466/186224441-46dd2029-b9dc-4b3d-aad8-bfd1e1e62f2e.png)

> DNAnalyzer identifies proteins, amino acids, start and stop codons, high coverage regions, and regulatory elements.
> Researchers are working to extract valuable information to better understand human health and disease.
> Currently, we are developing a Command-Line Interface (CLI) and a Graphical User Interface (GUI) to enable physicians
> to quickly identify genetic mutations.

## Documents
[View Documents](https://github.com/VerisimilitudeX/DNAnalyzer/tree/main/docs)

## Contributing

### Steps to follow 📜

1. **Fork it 🍴**  
   Get your own fork of [DNAnalyzer](https://github.com/VerisimilitudeX/DNAnalyzer) by using the `Fork` button at the top right of this page.  
   ![](https://github-images.s3.amazonaws.com/help/bootcamp/Bootcamp-Fork.png)

2. **Clone it 👥**  
   Clone your fork to your local machine:
   ```bash
   git clone https://github.com/Your_Username/DNAnalyzer.git
   cd DNAnalyzer
   ```
   Then, add a reference to the original repository:
   ```bash
   git remote add upstream https://github.com/theabhishek07/DNAnalyzer.git
   git remote -v
   ```

3. **Sync with the Remote 🔄**  
   Keep your local repository up-to-date:
   ```bash
   git fetch --all --prune
   git checkout main
   git reset --hard upstream/main
   git push origin main
   ```

4. **Create a new branch**  
   Create a new branch for your contribution:
   ```bash
   git checkout -b <branchname>
   ```
   To switch branches later:
   ```bash
   git checkout <branchname>
   ```
   Add changes and commit:
   ```bash
   git add .
   git commit -m "your commit message"
   ```
   Push your branch:
   ```bash
   git push -u origin <branchname>
   ```
   Finally, in your browser, navigate to your repository, click **Contribute**, and then **Open Pull Request**. Provide a concise title and description describing your contribution.

### Contribution Guideline

- ⭐ Drop a star on the GitHub repository (optional).
- Before contributing, please read [`Contributing_Guidelines.md`](Contributing_Guidelines.md) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
- Create an issue or propose a feature/bug fix.
- Fork the repo, clone it, create a branch, add your changes, commit, and push.
- Make a pull request comparing your branch with the main branch of the repository.

## Usage

### Command-Line Interface (CLI) Usage

DNAnalyzer uses CLI arguments instead of standard input. For example:
```bash
<executable> assets/dna/random/dnalong.fa --amino=ser
```
or
```bash
<executable> assets/dna/random/dnalong.fa --amino=ser --min=0 --max=100
```
To view the help message:
```bash
<executable> --help

# Output:
Usage: DNAnalyzer [-hrV] --amino=<aminoAcid> [--find=<proteinFile>] [--max=<maxCount>] [--min=<minCount>] DNA
  DNA                    The FASTA file to be analyzed.
  --amino=<aminoAcid>    The amino acid representing the start of a gene.
  --find=<proteinFile>   The DNA sequence to be found.
  -h, --help             Show this help message and exit.
  --max=<maxCount>       Maximum count of the reading frame.
  --min=<minCount>       Minimum count of the reading frame.
  -r, --reverse          Reverse the DNA sequence before processing.
  -V, --version          Print version information and exit.
```

## Reports

- [Key Personnel and Knowledge Distribution](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/key-personnel-and-and-knowledge-distribution.pdf)
- [Technical Health Overview](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/technical-health-overview.pdf)
- [Trend Report](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/reports/trend-report.pdf)

## Samples

- [Serine DNAlong](https://github.com/VerisimilitudeX/DNAnalyzer/blob/936181dd714855276ea34f55b94e5b53afc8ef0e/docs/samples/serine-dnalong.md)