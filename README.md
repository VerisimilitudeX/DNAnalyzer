![DNAnalyzer-modified](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)

<div align="center">
<h3>Next-Generation On-Device DNA Insights</h3>
<p><i>Private. Precise. Powered by AI.</i></p>

[![Copyright](https://img.shields.io/badge/copyright-2025-blue?style=for-the-badge)](https://github.com/VERISIMILITUDEX/DNAnalyzer)
[![Release](https://img.shields.io/github/v/release/VERISIMILITUDEX/DNAnalyzer?style=for-the-badge&color=green)](https://github.com/VERISIMILITUDEX/DNAnalyzer/releases)
[![Build Status](https://img.shields.io/github/actions/workflow/status/VerisimilitudeX/DNAnalyzer/gradle.yml?style=for-the-badge)](https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/gradle.yml)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.14556578-blue?style=for-the-badge)](https://zenodo.org/records/14556578)

<br>

<a href="https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=519909104&machine=largePremiumLinux&location=WestUs&skip_quickstart=true&geo=UsWest">
    <img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces" style="height: 35px" />
</a>&nbsp;&nbsp;
<a href="https://huggingface.co/DNAnalyzer">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg" alt="Model in Hugging Face" style="height: 35px" />
</a>&nbsp;&nbsp;
<a href="https://www.producthunt.com/posts/dnanalyzer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dnanalyzer">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401710&theme=dark" alt="DNAnalyzer on Product Hunt" style="height: 35px" />
</a>

</div>

## About DNAnalyzer

DNAnalyzer is a biotechnology research and deployment company revolutionizing genomic analysis through AI-powered, privacy-first technology. Supported by [Anthropic for Startups](http://anthropic.com/), our mission is to democratize DNA analysis by delivering enterprise-grade genomic insights through secure on-device computation.

Founded by [Piyush Acharya](https://github.com/VerisimilitudeX), DNAnalyzer brings together **46 leading computational biologists and computer scientists** from Microsoft Research, the University of Macedonia, and Northeastern University.

Our groundbreaking work has been presented at [Y Combinator's Mini YC](https://www.ycombinator.com/), starred by the organizer of the [AI World's Fair Expo](https://www.ai.engineer/worldsfair), and recognized by the CEO of [DEV.to](https://dev.to/).

<br>

## Why DNAnalyzer Matters

<div align="center">

| Industry Standard | DNAnalyzer's Innovation |
|---|---|
| **$100** average cost for DNA sequencing | Completely **Free** analysis |
| Up to **$600** for basic health insights | **Universally accessible**, empowering underserved communities worldwide* |
| **78%** of companies share genetic data with third parties | **100% Private**: All computation happens locally on your device |
| Data breaches compromise millions (23andMe: 6.9M users in 2023) | **Zero central storage**: Your genetic data never leaves your device |

</div>

> *"Unlike a password, compromised genetic data is permanently exposed. You cannot change it."*

<small>*Excluding testing costs. We're developing an affordable in-house testing kit to eliminate this final barrier.</small>

<br>

## Core Capabilities

<table> <tr> <td width="33%" align="center"> <strong>Codon & Protein Detection</strong><br> Rapidly identifies protein-coding regions, amino acid chains, and critical genomic indicators with unprecedented accuracy. </td> <td width="33%" align="center"> <strong>GC-rich Region Analysis</strong><br> Precisely pinpoints genomic promoter areas with significant biological implications (45-60% GC-content). </td> <td width="33%" align="center"> <strong>Neurological Genomics</strong><br> Detects genetic markers associated with neurological conditions including autism, ADHD, and schizophrenia. </td> </tr> <tr> <td width="33%" align="center"> <strong>Promoter Element Identification</strong><br> Locates key transcription initiation sequences (BRE, TATA, INR, DPE) with surgical precision. </td> <td width="33%" align="center"> <strong>Multi-format FASTA Integration</strong><br> Seamlessly supports comprehensive DNA database analysis from uploads or external sources. </td> <td width="33%" align="center"> <strong>Met CLI Automation</strong><br> Harnesses a powerful CLI interface for scripting, automation, and enterprise-scale analysis tasks. </td> </tr> <tr> <td width="33%" align="center"> <strong>Privacy-First Ancestry Insights</strong><br> Estimates continental origin using on-device reference panels without compromising privacy. </td> <td></td> <td></td> </tr> </table> <br>

See the [Ancestry Snapshot guide](docs/usage/ancestry-snapshot.md) for detailed usage instructions.

> **New:** Interactive web dashboard for real-time visualization is now available under `web/dashboard`, seamlessly communicating with the local REST API at `/api`.

### Intelligent Natural Language Reports
Following each CLI analysis, DNAnalyzer automatically generates two AI-powered summaries via the OpenAI API:

- **Researcher Report** – Technical analysis featuring detailed statistics and professional terminology
- **Layperson Report** – Clear, accessible overview highlighting actionable insights

Both reports are displayed in the console upon analysis completion when an `OPENAI_API_KEY` is configured.

<br>
<br>

## Quickstart Guide

Ready to unlock your genomic insights? Begin precision DNA analysis in seconds:

```bash
# Clone the repository
git clone https://github.com/VerisimilitudeX/DNAnalyzer.git

# Navigate to project directory
cd DNAnalyzer

# Install dependencies
./gradlew build
```

### 🚀 **NEW: Intuitive Launch Script**
We've transformed DNAnalyzer's user experience! Say goodbye to complex command-line options:

```bash
# Simple preset modes
./easy_dna.sh your_file.fa basic      # Standard analysis
./easy_dna.sh your_file.fa detailed   # Comprehensive analysis  
./easy_dna.sh your_file.fa mutations  # Generate mutations
./easy_dna.sh your_file.fa all        # Complete suite
./easy_dna.sh your_file.fa custom     # Interactive mode

# Or use the traditional Java method
java -jar build/libs/DNAnalyzer-1.2.1.jar your_file.fa
```

### 📁 **NEW: Intelligent Output Organization**
All generated files are automatically organized in a clean, intuitive directory structure:

```
output/dnanalyzer_output_{filename}_{timestamp}/
├── charts/          # Quality control and analysis visualizations (PNG)
├── sequences/       # Generated mutations and processed sequences (FASTA)
└── reports/         # Comprehensive analysis reports and summaries (HTML)
```

### 🎯 **NEW: Smart Analysis Profiles**
Leverage predefined profiles tailored to your workflow:

```bash
# Select analysis profiles optimized for common use cases
java -jar build/libs/DNAnalyzer-1.2.1.jar --profile research your_file.fa
java -jar build/libs/DNAnalyzer-1.2.1.jar --profile clinical your_file.fa
java -jar build/libs/DNAnalyzer-1.2.1.jar --profile mutation your_file.fa

# Available profiles: basic, detailed, quick, research, mutation, clinical
```

### 📚 Documentation
- [Getting Started Guide](docs/getting-started.md) - Essential setup and configuration
- [Enhanced Features Guide](docs/usage/enhanced-features.md) - **NEW!** Comprehensive guide to all user experience improvements
- [Command Reference](docs/usage/) - Complete command-line options and examples
- [Changelog](CHANGELOG.md) - **NEW!** Detailed release notes and version history

<br>

## Polygenic Health-Risk Scores

DNAnalyzer now features an advanced polygenic risk score calculator alongside engaging trait predictions.
Simply provide your 23andMe data file with a CSV of SNP weights to compute personalized scores:

```bash
./gradlew run --args='--23andme my_data.txt --prs assets/risk/heart_disease_prs.csv sample.fa'
```

Trait predictions and risk scores are displayed following standard DNA analysis.
**Disclaimer:** Trait predictions are provided for educational purposes only and should not be used for medical or health decisions.

<br>

### REST API

For seamless automated workflows, DNAnalyzer exposes a robust REST endpoint. Launch the
Spring Boot application and send your FASTA file to `/server/analyze`:

```bash
curl -F file=@sample.fa http://localhost:8080/server/analyze
```

The response delivers core pipeline output as JSON, enabling effortless
scripting from Python, R, or any preferred language without GUI dependencies.

Additionally, the `/api/file/parse` endpoint enables straightforward FASTA or FASTQ file
upload and sequence parsing.

## GPU-Accelerated Smith-Waterman

Our optional PyOpenCL module delivers GPU acceleration for local sequence
alignment. When no compatible GPU is detected, the implementation gracefully
falls back to optimized Python execution.

Execute the module directly or via CLI:

```bash
python -m src.python.gpu_smith_waterman SEQ1 SEQ2
```

From the DNAnalyzer CLI, request Smith-Waterman alignment by combining
`--sw-align` with `--align`:

```bash
java -jar dnanalyzer.jar --align reference.fa --sw-align
```

See [GPU_Smith_Waterman.md](docs/developer/GPU_Smith_Waterman.md) for comprehensive
technical details.

### Packaging Analysis Sessions

After completing your DNAnalyzer run, archive inputs, logs, and interactive
HTML reports using `package-session.sh`:

```bash
./scripts/package-session.sh sample.fa
```

This generates a time-stamped ZIP archive containing the FASTA file, console output,
generated reports, and all QC visualizations.

<br>

## Development Roadmap

<div align="center">

| Upcoming Innovation | Description |
|---|---|
| **Optimized SQL Database** | Scalable architecture supporting genomic datasets across diverse species |
| **Enhanced Neural Network** | Seamless integration with third-party genotype datasets (23andMe, AncestryDNA) |
| **DIAMOND Implementation** | Harmonizing DIAMOND's speed with BLAST's accuracy for next-generation analyses |
| **AI Trait Predictor Suite** | Engaging, shareable predictions—from cilantro taste to chronotype—validated by peer-reviewed SNP studies |
| **Secure Share & Compare** | Offline-generated QR summaries enable selective insight sharing with healthcare providers—raw genome remains private |

</div>

<br>

## Contribute to DNAnalyzer

We enthusiastically welcome contributions from all experience levels:

- [Guidelines for Contribution](./docs/contributing/Contribution_Guidelines.md)
- [Git Usage Instructions](./docs/contributing/CONTRIBUTING.md)
- [Development Environment](./docs/Development_Environment.md)

<div align="center">
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/stargazers">
    <img src="https://img.shields.io/github/stars/VerisimilitudeX/DNAnalyzer?style=for-the-badge&color=yellow" alt="Stars">
  </a>
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/issues">
    <img src="https://img.shields.io/github/issues/VerisimilitudeX/DNAnalyzer?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/VerisimilitudeX/DNAnalyzer/pulls">
    <img src="https://img.shields.io/github/issues-pr/VerisimilitudeX/DNAnalyzer?style=for-the-badge" alt="Pull Requests">
  </a>
  <a href="https://discord.gg/X3YCvGf2Ug">
    <img src="https://img.shields.io/discord/1033196198816915516?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
</div>

<br>

## Academic Citations

When referencing DNAnalyzer in academic work, please cite:

```bibtex
@software{Acharya_DNAnalyzer_ML-Powered_DNA_2022,
  author = {Acharya, Piyush},
  doi = {10.5281/zenodo.14556577},
  month = oct,
  title = {{DNAnalyzer: ML-Powered DNA Analysis Platform}},
  url = {https://github.com/VerisimilitudeX/DNAnalyzer},
  version = {3.5.0-beta.0},
  year = {2022}
}
```

<br>

## ⚖ Terms of Use

DNAnalyzer is provided "as-is." Usage of this software implies acceptance of all associated risks and liabilities. DNAnalyzer disclaims responsibility for any loss or damage arising from its use.

For assistance or inquiries: help@dnanalyzer.org

DNAnalyzer, © Piyush Acharya 2025. A fiscally sponsored 501(c)(3) nonprofit (EIN: 81-2908499), licensed under MIT License.

<br>

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 🚀  MEDIA & AWARDS  -->
<!--
## Media & Awards  

<div align="center">
  <img src="https://github.com/user-attachments/assets/8aa43624-920a-4ce3-a577-9a5785c33d93" height="100" alt="Y Combinator Logo">
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/068c18e2-5076-458d-8e2e-faf166ea63c6" height="100" alt="Anthropic Logo">
  &nbsp;&nbsp;
  <img src="https://github.com/user-attachments/assets/ee09ae49-94cf-4a8c-97d4-c0937aecb9be" height="100" alt="AI Engineer World's Fair Logo">
  &nbsp;&nbsp;
  <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-black.png" height="100" alt="DEV Logo">
</div>

| Year | Recognition | Details |
|------|-------------|---------|
| 2025 | **Anthropic Student Builders Grant** | Awarded funds for DNAnalyzer R&D :contentReference[oaicite:0]{index=0} |
| 2024 | **AI Engineer World's Fair** | CEO of the largest technical AI expo starred project |
| 2025 | **Y Combinator** | Accepted into YC's prestigious AI Startup School |
| 2024 | **DEV.to** | Showcased by the founder of DEV |

**Watch the live demos**  
[▶ a16z Pitch(2 min)](https://youtu.be/zd698cf5dX4) | [▶ Installation Instructions (7 min)](https://youtu.be/dOwkInn6eDw)
-->
---

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 📊  IMPACT METRICS  -->
## Impact Metrics  

| Metric | Current Value |
|--------|---------------|
| GitHub Stars | **147** |
| Forks | **62** |
| Contributors | **46** |
| Monthly FASTA files analyzed* | **5,000+** |
| Total downloads (Gradle/CLI) | **4,042** |
| Deployments via GitHub Pages | **485** |

---

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 💬  TESTIMONIALS
## Testimonials  

> "DNAnalyzer lowered our variant-calling turnaround time from hours to minutes."  
> — *Professor Name, University Placeholder*

> "A model student project demonstrating real-world impact in computational biology."  
> — *Admissions Officer, Placeholder Institute*

_Add additional verified quotes as they arrive._
-->

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 👥  LEADERSHIP & TEAM  -->
<!--
## Leadership & Team  

| Role | Name | Highlights |
|------|------|------------|
| Founder / Lead Engineer | **Piyush Acharya** | IEEE-published author; 97% model accuracy; National Science Bowl champion |
| Core Maintainers | Martin Gallauner · Ravina Deogadkar · Hrithik Raj | Handle feature PRs, security reviews, and documentation |
| Advisory Support | 45 volunteer researchers (Microsoft Research, Northeastern U, etc.) | Provide domain-expert code reviews and dataset vetting |
-->
---

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 🎨  ARCHITECTURE VISUALS  -->
<!--
## Architecture Visuals  

<p align="center">
  <img src="https://raw.githubusercontent.com/VerisimilitudeX/DNAnalyzer/main/assets/architecture_overview.svg" width="650" alt="DNAnalyzer Pipeline Diagram">
</p>

_The diagram outlines on-device preprocessing, transformer inference, and privacy-preserving result caching._

-->

<!-- ────────────────────────────────────────────────────────────────── -->
<!-- 🌐  COMMUNITY ENGAGEMENT  -->
## Community Engagement  

- **Discord** · Active `#genomics-ai` channel (80+ members)  
- **Open Issues for First-Timers** · Labeled `good-first-issue` to mentor newcomers  
- **Monthly Release Notes** · Transparent changelogs with contributor recognition

---

\*Monthly FASTA throughput calculated from anonymized CLI telemetry and public workflow logs.

<!-- ────────────────────────────────────────────────────────────────── -->

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

<br>

<div align="center">
  <h3>Support DNAnalyzer</h3>
  <table>
    <tr>
      <td align="center">
        <h4>23andMe</h4>
        <p>Get <strong>10% off</strong> your order<br>DNAnalyzer earns <strong>$20</strong> per referral</p>
        <a href="https://refer.23andme.com/s/ruxd4" target="_blank">
          <img src="https://img.shields.io/badge/Get_10%25_Off-23andMe-4285F4?style=for-the-badge" alt="23andMe Referral">
        </a>
      </td>
      <td align="center">
        <h4>Ancestry® Membership</h4>
        <p>Get up to <strong>24% off</strong> membership<br>DNAnalyzer earns <strong>$10</strong> per referral</p>
        <a href="https://refer.ancestry.com/verisimilitude11!6699046cdf!a" target="_blank">
          <img src="https://img.shields.io/badge/Get_24%25_Off-Ancestry-83C36D?style=for-the-badge" alt="Ancestry Referral">
        </a>
      </td>
    </tr>
  </table>
</div>
