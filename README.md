![DNAnalyzer](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)

<div align="center">
<h3>Next-Generation On-Device DNA Insights</h3>
<p><i>Private. Precise. Powered by AI.</i></p>

[![Copyright](https://img.shields.io/badge/copyright-2026-blue?style=for-the-badge)](https://github.com/VerisimilitudeX/DNAnalyzer)
[![Release](https://img.shields.io/github/v/release/VerisimilitudeX/DNAnalyzer?style=for-the-badge&color=green)](https://github.com/VerisimilitudeX/DNAnalyzer/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/VerisimilitudeX/DNAnalyzer/gradle.yml?style=for-the-badge)](https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/gradle.yml)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.14556578-blue?style=for-the-badge)](https://zenodo.org/records/14556578)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

[![CodeQL](https://img.shields.io/github/actions/workflow/status/VerisimilitudeX/DNAnalyzer/codeql.yml?style=flat-square&label=CodeQL&logo=github)](https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/VerisimilitudeX/DNAnalyzer/badge)](https://scorecard.dev/viewer/?uri=github.com/VerisimilitudeX/DNAnalyzer)
[![Dependabot](https://img.shields.io/badge/Dependabot-enabled-025e8c?style=flat-square&logo=dependabot)](.github/dependabot.yml)
[![DeepSource](https://app.deepsource.com/gh/VerisimilitudeX/DNAnalyzer.svg/?label=active+issues&show_trend=true)](https://app.deepsource.com/gh/VerisimilitudeX/DNAnalyzer/)

</div>

## About

DNAnalyzer is an AI-powered, privacy-first platform for genomic analysis. All computation happens locally on your device, so genetic data never leaves your machine. The project is fiscally sponsored by Hack Club's 501(c)(3) (EIN 81-2908499).

Founded by [Piyush Acharya](https://github.com/VerisimilitudeX) with 50 contributors drawn from Microsoft Research, the University of Macedonia, and Northeastern University.

Supported by the [Claude for Student Builders](https://claude.com/programs/campus) program (Anthropic API credits) and the [YC AI Student Starter Pack](https://www.ycombinator.com/blog/the-yc-ai-student-starter-pack) (over $25,000 in AI-devtool credits across Azure, AWS, OpenAI, Anthropic, xAI, and more) as a participant in [YC AI Startup School](https://events.ycombinator.com/ai-sus).

## Why It Matters

| Industry Standard | DNAnalyzer |
|---|---|
| $100 average cost for DNA sequencing | Free analysis |
| Up to $600 for basic health insights | No usage fees |
| 78% of testing companies share genetic data with third parties | 100% local: no data leaves your device |
| Breaches regularly expose millions of users (e.g. 23andMe, 6.9M users in 2023) | Zero central storage |

> Compromised genetic data is permanent. Unlike a password, you cannot change it.

## Core Capabilities

| Capability | Description |
|---|---|
| Codon and protein detection | Identifies protein-coding regions, amino-acid chains, and genomic indicators |
| GC-rich region analysis | Locates promoter regions by 45 to 60 percent GC content |
| Promoter element identification | Detects BRE, TATA, INR, and DPE transcription initiation elements |
| Neurological genomic markers | Screens for variants linked to autism, ADHD, and schizophrenia |
| Multi-format FASTA integration | Parses FASTA, FASTQ, and plain-text input from uploads or external sources |
| CLI automation | Command-line interface for scripting and batch analysis |
| Ancestry estimation | Continental ancestry from 23andMe or AncestryDNA exports, on device |
| Polygenic risk scoring | Per-variant contribution reports with missing-variant flags |
| Smith-Waterman alignment | Optional PyOpenCL GPU acceleration with a pure-Python CPU fallback |

## Quickstart

### Docker (no Java install required)

```bash
git clone https://github.com/VerisimilitudeX/DNAnalyzer.git
cd DNAnalyzer
docker compose up --build
```

Once the containers are up, the stack listens on your machine at:

| Service | URL |
|---|---|
| Web UI | `http://localhost:3000` |
| REST API | `http://localhost:8080` |
| Swagger docs | `http://localhost:8080/swagger-ui/index.html` |

Stop with `docker compose down`.

### Manual build

```bash
git clone https://github.com/VerisimilitudeX/DNAnalyzer.git
cd DNAnalyzer
./gradlew build
```

This produces two jars under `build/libs/`:

| Jar | Purpose | Entry point |
|---|---|---|
| `DNAnalyzer-<version>-boot.jar` | Spring Boot REST API | `DNAnalyzer.api.ApiApplication` |
| `DNAnalyzer-<version>-plain.jar` | CLI fat jar | `DNAnalyzer.Main` |

### Running the CLI

The simplest path is the launcher script, which auto-selects a jar or falls back to `gradle run`:

```bash
./easy_dna.sh your_file.fa basic       # Standard analysis
./easy_dna.sh your_file.fa detailed    # Comprehensive analysis
./easy_dna.sh your_file.fa mutations   # Generate mutations
./easy_dna.sh your_file.fa all         # Complete suite
./easy_dna.sh your_file.fa custom      # Interactive mode
```

Override the jar path with `DNANALYZER_JAR=/path/to/jar` if needed.

The equivalent direct invocation:

```bash
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar your_file.fa
```

### Analysis profiles

```bash
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar --profile research your_file.fa
# Available: basic, detailed, quick, research, mutation, clinical
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar --profile list
```

### Output layout

Each CLI run writes into a timestamped directory under `output/`:

```text
output/dnanalyzer_output_<filename>_<timestamp>/
  charts/     # QC visualizations (PNG)
  sequences/  # Generated mutations and processed sequences (FASTA)
  reports/    # Analysis reports and summaries (HTML)
```

### Optional: AI-generated reports

When an OpenAI key is available, each run produces a researcher report and a layperson report alongside the numeric output.

```bash
export OPENAI_API_KEY=sk-...
export OPENAI_MODEL=gpt-4o-mini     # optional
```

Pass `--no-ai` to skip the model call.

## REST API

Start the API alone with `./gradlew bootRun`. All endpoints live under `/api/v1`.

| Endpoint | Method | Description |
|---|---|---|
| `/api/v1/status` | GET | Health check and version metadata |
| `/api/v1/analyze` | POST (multipart) | Full analysis pipeline on an uploaded FASTA/FASTQ/plain-text sequence |
| `/api/v1/base-pairs` | POST (JSON) | Base-pair counts, percentages, and GC content |
| `/api/v1/reading-frames` | POST (JSON) | Open reading frames (forward and reverse) |
| `/api/v1/find-proteins` | POST (JSON) | Top 10 candidate proteins by length |
| `/api/v1/manipulate` | POST (JSON) | Reverse, complement, or reverse-complement a sequence |
| `/api/v1/parse` | POST (multipart) | Extract the first sequence record from FASTA/FASTQ/plain uploads |
| `/api/v1/analyze-genetic` | POST (multipart) | Score 23andMe/AncestryDNA genotype files against bundled PRS panels |

```bash
curl -F dnaFile=@sample.fa http://localhost:8080/api/v1/analyze

curl -X POST http://localhost:8080/api/v1/base-pairs \
     -H 'Content-Type: application/json' \
     -d '{"sequence": "ATGCGCATTA"}'

curl -F geneticFile=@my_23andme.txt -F snpAnalysis=true \
     http://localhost:8080/api/v1/analyze-genetic
```

Full reference: [docs/API_REFERENCE.md](docs/API_REFERENCE.md).

## Polygenic Risk Scores

```bash
./gradlew run --args='--23andme my_data.txt --prs assets/risk/heart_disease_prs.csv sample.fa'
```

The CLI parses the standard tab-delimited 23andMe export, aligns it with each provided weight table, and reports the raw and normalized contribution of every SNP. Missing or uncallable variants are flagged so you can assess coverage before acting on a score.

Walkthrough and example outputs: [docs/usage/polygenic-risk-scoring.md](docs/usage/polygenic-risk-scoring.md).

Trait predictions are educational only. Do not use them for medical decisions.

## GPU-Accelerated Smith-Waterman

Run the Python module directly:

```bash
python -m src.python.gpu_smith_waterman SEQ1 SEQ2
```

Or invoke it from the CLI by combining `--sw-align` with `--align`:

```bash
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar sample.fa --align reference.fa --sw-align
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar --align query.fa reference.fa --sw-align
```

Implementation notes: [docs/developer/GPU_Smith_Waterman.md](docs/developer/GPU_Smith_Waterman.md).

## Packaging Analysis Sessions

Archive a run (inputs, logs, HTML report) into a timestamped ZIP:

```bash
./scripts/package-session.sh sample.fa
```

## Documentation

Entry points for humans and AI agents:

| Doc | Purpose |
|---|---|
| [AGENTS.md](AGENTS.md) | Orientation for agentic AI and automation |
| [docs/README.md](docs/README.md) | Index of all documentation |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System architecture and diagrams |
| [docs/REPOSITORY_MAP.md](docs/REPOSITORY_MAP.md) | Directory-by-directory guide |
| [docs/API_REFERENCE.md](docs/API_REFERENCE.md) | REST and CLI reference |
| [docs/getting-started.md](docs/getting-started.md) | First-time setup |
| [SECURITY.md](SECURITY.md) | Security policy and private reporting |

## Contributing

Contributions are welcome at every experience level.

- [Contribution guidelines](./docs/contributing/Contribution_Guidelines.md)
- [Git workflow](./docs/contributing/CONTRIBUTING.md)
- [Development environment](./docs/Development_Environment.md)

<div align="center">
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/stargazers"><img src="https://img.shields.io/github/stars/VerisimilitudeX/DNAnalyzer?style=for-the-badge&color=yellow" alt="Stars"></a>
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/issues"><img src="https://img.shields.io/github/issues/VerisimilitudeX/DNAnalyzer?style=for-the-badge" alt="Issues"></a>
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/pulls"><img src="https://img.shields.io/github/issues-pr/VerisimilitudeX/DNAnalyzer?style=for-the-badge" alt="Pull Requests"></a>
  <a href="https://discord.gg/X3YCvGf2Ug"><img src="https://img.shields.io/discord/1033196198816915516?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
</div>

## Impact Metrics

<!-- IMPACT-METRICS:START -->
| Metric | Current Value |
|---|---|
| GitHub Stars | 178 |
| Forks | 75 |
| Contributors | 51 |
| Merged pull requests | 0 |
| Release asset downloads | 247 |
<!-- IMPACT-METRICS:END -->

These numbers are refreshed by the `metrics-refresh.yml` workflow.

## Academic Citation

```bibtex
@software{Acharya_DNAnalyzer_ML-Powered_DNA_2022,
  author  = {Acharya, Piyush},
  doi     = {10.5281/zenodo.14556577},
  month   = oct,
  title   = {{DNAnalyzer: ML-Powered DNA Analysis Platform}},
  url     = {https://github.com/VerisimilitudeX/DNAnalyzer},
  version = {3.6.1},
  year    = {2022}
}
```

## Terms of Use

DNAnalyzer is provided "as-is". Use of this software implies acceptance of all associated risks and liabilities. DNAnalyzer disclaims responsibility for any loss or damage arising from its use. Contact: help@dnanalyzer.org.

DNAnalyzer, (C) Piyush Acharya 2026. Fiscally sponsored 501(c)(3) nonprofit (EIN 81-2908499), licensed under the MIT License.

<div align="center">
  <h3>Project Growth</h3>
  <a href="https://star-history.com/#VerisimilitudeX/DNAnalyzer&Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date&theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
      <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
    </picture>
  </a>
</div>

<div align="center">
  <h3>Support DNAnalyzer</h3>
  <table>
    <tr>
      <td align="center">
        <h4>23andMe</h4>
        <p>Get <strong>10% off</strong> your order<br>DNAnalyzer earns <strong>$20</strong> per referral</p>
        <a href="https://refer.23andme.com/s/ruxd4" target="_blank"><img src="https://img.shields.io/badge/Get_10%25_Off-23andMe-4285F4?style=for-the-badge" alt="23andMe Referral"></a>
      </td>
      <td align="center">
        <h4>Ancestry Membership</h4>
        <p>Get up to <strong>24% off</strong> membership<br>DNAnalyzer earns <strong>$10</strong> per referral</p>
        <a href="https://refer.ancestry.com/verisimilitude11!6699046cdf!a" target="_blank"><img src="https://img.shields.io/badge/Get_24%25_Off-Ancestry-83C36D?style=for-the-badge" alt="Ancestry Referral"></a>
      </td>
    </tr>
  </table>
</div>
