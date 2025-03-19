![DNAnalyzer-modified](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)

<div align="center">
<h3>Democratizing AI-Powered DNA Analysis</h3>
<p><i>On-device genomic insights for everyone, everywhere</i></p>

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

<br>

## Table of Contents

- [About DNAnalyzer](#-about-dnanalyzer)
- [Why It Matters](#-why-it-matters)
- [Core Features](#-core-features)
- [Quick DNA Introduction](#-quick-dna-introduction)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Citations](#-citations)
- [Terms of Use](#-terms-of-use)

<br>

## About DNAnalyzer

DNAnalyzer is a **fiscally sponsored 501(c)(3) nonprofit** (EIN: 81-2908499) revolutionizing DNA analysis by making machine learning-powered genomic insights accessible through efficient on-device computation.

Founded by [Piyush Acharya](https://github.com/VerisimilitudeX) and co-led with [@LimesKey](https://github.com/LimesKey), our platform has attracted **45 computational biologists and computer scientists** from institutions including Microsoft Research, University of Macedonia, and Northeastern University.

Our impact has been recognized by the organizers of the [AI Engineer World's Fair](https://www.ai.engineer/worldsfair) (backed by OpenAI, Microsoft, Google DeepMind, and Anthropic) and the CEO of Forem.

<br>

## Why It Matters

<div align="center">

| Current Reality | DNAnalyzer's Mission |
|---|---|
| **$100** average cost for DNA sequencing | **Free** on-device analysis |
| Up to **$600** for basic health insights | **Accessible** to underserved communities |
| **78%** of companies share genetic data with third parties | **Private, secure** analysis that stays on your device |
| Data breaches expose millions (23andMe: 6.9M users in 2023) | **No central database** of sensitive genetic information |

</div>

> *"Unlike a credit card number or password, stolen or misused genetic information cannot be changed."*

<br>

## Core Features

<table>
  <tr>
    <td width="33%" align="center">
      <h3>Start & Stop Codons</h3>
      <p>Identify protein coding regions and analyze the 20 different amino acids in polypeptide chains</p>
    </td>
    <td width="33%" align="center">
      <h3>High Coverage Regions</h3>
      <p>Detect promoter sequences with high GC-content (45-60%) that likely reveal crucial genomic information</p>
    </td>
    <td width="33%" align="center">
      <h3>Neural Disorder Analysis</h3>
      <p>Identify genetic signatures related to neurodevelopmental disorders like autism, ADHD, and schizophrenia</p>
    </td>
  </tr>
  <tr>
    <td width="33%" align="center">
      <h3>Core Promoter Elements</h3>
      <p>Find key promoter sequences (BRE, TATA, INR, DPE) responsible for initiating transcription</p>
    </td>
    <td width="33%" align="center">
      <h3>FASTA Support</h3>
      <p>Process multi-line and single-line FASTA database files through upload or web linking</p>
    </td>
    <td width="33%" align="center">
      <h3>Command-Line Interface</h3>
      <p>Access all core features through our powerful Methionine CLI (Met CLI) for scripting and automation</p>
    </td>
  </tr>
</table>

> **Coming Soon:** Web-based user interface for enhanced accessibility

<br>

## Quick DNA Introduction

**DNA: The Programming Language of Life**

DNA exists in most cells of the body and contains the blueprint for creating over 200 distinct cell types. Like a programming language exclusive to living organisms, it encodes the instructions for all biological processes.

**Databases: The Foundation of Analysis**

A DNA database is crucial for interpreting DNA sequences. By leveraging machine learning, we can make predictions on previously unseen DNA sequences, forming the foundation of modern genomic analysis.

<br>

## Getting Started

Ready to explore your DNA? Follow our comprehensive guide to get started:

```bash
# Clone the repository
git clone https://github.com/VerisimilitudeX/DNAnalyzer.git

# Navigate to project directory
cd DNAnalyzer

# Install dependencies
./gradlew build
```

For detailed instructions, please refer to our [Getting Started Guide](docs/getting-started.md).

<br>

## Roadmap

<div align="center">

| Upcoming Development | Description |
|---|---|
| **Optimized SQL Database** | High-performance vertical scaling database to store genomic data from thousands of species |
| **Enhanced Neural Network** | Support for genotyped data from 3rd-party DNA testing services ($99 compatibility) |
| **DIAMOND Implementation** | Combining DIAMOND's performance with BLAST's powerful algorithm |

</div>

<br>

## Contributing

We welcome contributions from developers and researchers of all skill levels!

- [Contributing Guidelines](./docs/contributing/Contribution_Guidelines.md)
- [How To Use Git](./docs/contributing/CONTRIBUTING.md)

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

## Citations

View our [detailed citations document](docs/citations.md) for all in-line references.

If you use DNAnalyzer in your research, please cite:

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

## ⚖Terms of Use

The use of this application is entirely at your own discretion and responsibility. While the DNAnalyzer team is committed to addressing significant issues, we disclaim liability for losses, damages, or consequences arising from the use of this application.

For questions or concerns, please contact us at help@dnanalyzer.org.

**Copyright © Piyush Acharya 2025.** DNAnalyzer is a fiscally sponsored 501(c)(3) nonprofit organization (EIN: 81-2908499) and is licensed under the MIT License.

<br>

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
  <p>Every referral helps fund our nonprofit mission</p>

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
