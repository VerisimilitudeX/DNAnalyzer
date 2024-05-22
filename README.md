20242024![DNAnalyzer-modified](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)


<p align=center><img src="https://img.shields.io/badge/copyright-2023-blue" alt="Copyright"> <img src="https://img.shields.io/github/v/release/VERISIMILITUDEX/DNAnalyzer" alt="Releases"> <img src="https://img.shields.io/github/repo-size/VerisimilitudeX/DNAnalyzer" alt="Repository Size"> <img src="https://hits.dwyl.com/verisimilitudeX/DNAnalyzer.svg?style=flat" alt="Hits Counter">  <img src="https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/gradle.yml/badge.svg" alt=""> 
<a href="https://discord.gg/X3YCvGf2Ug"><img src="https://img.shields.io/discord/1033196198816915516" alt=""></a>
<a href="https://deepsource.io/gh/VerisimilitudeX/DNAnalyzer/?ref=repository-badge}"><img src="https://deepsource.io/gh/VerisimilitudeX/DNAnalyzer.svg/?label=active+issues&amp;show_trend=true&amp;token=9NBX3zsf0IZ3Nii3AApiX1Wa" alt="DeepSource" title="DeepSource"></a></p>

# DNAnalyzer

>Revolutionizing DNA analysis and making it accessible to all through innovative AI-powered analysis and interpretive tools.

<!--<a href="https://www.producthunt.com/posts/dnanalyzer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dnanalyzer" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401710&theme=dark" alt="DNAnalyzer - Revolutionizing&#0032;AI&#0045;powered&#0032;accessible&#0032;DNA&#0032;analysis | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>-->

**DNAnalyzer** is a fiscally sponsored 501(c)(3) nonprofit organization (EIN: 81-2908499) dedicated to revolutionizing the field of DNA analysis. We aim to democratize access to DNA analysis tools for a deeper understanding of human health and disease and pushing the boundaries of what is possible in the field of genetics research to make a significant impact in the industry.

## Summary
DNAnalyzer is your gateway to deciphering the secrets of DNA. Our innovative AI-powered analysis and interpretive tools empower geneticists, physicians, and researchers to gain deep insights into DNA sequences, revolutionizing how we understand human health and disease.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=519909104&machine=largePremiumLinux&location=WestUs&skip_quickstart=true&geo=UsWest)

## Table of Contents

- [DNAnalyzer](#dnanalyzer)
  - [Summary](#summary)
  - [Table of Contents](#table-of-contents)
  - [Background](#background)
  - [Features](#features)
  - [Quick Introduction to DNA](#quick-introduction-to-dna)
    - [DNA](#dna)
    - [Databases](#databases)
  - [Getting Started](#getting-started)
  - [Future Support and Improvements](#future-support-and-improvements)
    - [Optimized SQL Database for Genomic Data](#optimized-sql-database-for-genomic-data)
    - [Improved Neural Network for Genotyped Data](#improved-neural-network-for-genotyped-data)
    - [DIAMOND Implementation, a BLAST fork](#diamond-implementation-a-blast-fork)
  - [Citations](#citations)
  - [Contributing](#contributing)
  - [Terms of Use](#terms-of-use)


## <a name="background"></a>Background

The human genome is composed of over 3 billion base pairs, making human analysis nearly impossible. Consequently, using powerful computational and statistical methods to decode the functional information hidden in DNA sequences are necessary. The genome is also extremely intricate and contains a plethora of data, which need to be organized and converted into analyzable data appropriately. Current analytical tools and software make it arduous for both geneticists and physicians to do so, thus restricting them from acquiring crucial information to better understand humans. `[1]`

## <a name="features"></a>Features

* **Start and Stop Codons**
  * Indicate the start and stop of a protein. There are 20 different amino acids. A protein consists of one or more chains of amino acids (called polypeptides) whose sequence is encoded in a gene. `[2]`
* **High Coverage Regions**
  * Promoter sequences in the genome that code for proteins have a relatively high proportion of guanine and cytosine nucleotides to the 4 nucleotide bases (45-60% GC-content). Such CpG islands are likely to reveal important information about the genome. `[3]`
* **Neurodevelopmental Disorders**
  * A group of disorders, usually characterized by longer genes, that affect the development of the brain and nervous
                        system. These disorders are caused by genetic mutations that affect the development of the
                        brain and nervous system. These disorders include autism, attention deficit hyperactivity
                        disorder (ADHD), and schizophrenia. `[4]`
* **Core Promoter Elements**
  * Promoter sequences are short DNA sequences that are located upstream of a gene and are responsible for initiating transcription (e.g. BRE, TATA, INR, and DPE). `[5]`
* **FASTA File Support**
  * Supports multi-line and single-line FASTA database files. Files can either be uploaded or linked to from the web. `[7]`
* **Command-Line Interface (CLI)**
  * The Methionine command-line interface (abbreviated as Met CLI) is a unified tool for running DNAnalyzer services from the command-line. The CLI is a powerful tool for using DNAnalyzer services and scripting a sequence of commands to execute. You can currently access all the core features present in DNAnalyzer without having to log in, although account support will be implemented soon. To get more information on Met CLI installation and currently supported commands, refer to Met CLI GitHub repository.
* **Graphical User Interface (GUI)**
  * A cross-platform GUI-based application that performs the algorithms implemented in the software. The Met CLI continues to be the best way to run the program. Currently, the following operations are supported:
    * Set name of DNA file to analyze
    * Set minimum and maximum number of reading frames
    * Run analysis
  * More features will be added in the future.

## <a name="quick-introduction-to-dna"></a>Quick Introduction to DNA

### <a name="dna"></a>DNA

DNA, present in most cells of the body, holds the blueprint for creating over 200 distinct cell types. Like a programming language, it is exclusive to living organisms. With the aid of ML, we can decode and comprehend DNA, leading to life-saving discoveries and valuable insights.

### <a name="databases"></a>Databases

A DNA database is crucial for interpreting DNA sequences. By leveraging machine learning, predictions can be made on previously unseen DNA sequences. This is the foundation on which modern DNA analysis programs operate.

## <a name="getting-started"></a>Getting Started

Please refer to the [Getting Started](docs/getting-started.md) document for more information on how to use DNAnalyzer.

## Future Support and Improvements

### Optimized SQL Database for Genomic Data
 
Our goal is to find the best SQL database fork that can handle high performance and vertical scaling. We will store and query genomic data from thousands of species, including their genes and mutations. This will help us train our machine learning model more effectively.

### Improved Neural Network for Genotyped Data

This will bring the ability to use genotyped data from 3rd-party DNA testing services with our algorithm. In the future, to use this program, all you will need is a simple $99 DNA Test to be able to experience all the features of DNAnalyzer.

### DIAMOND Implementation, a BLAST fork

This will combine [DIAMOND](https://github.com/bbuchfink/diamond)'s performance advantage along with [BLAST](https://blast.ncbi.nlm.nih.gov/Blast.cgi")'s algorithm.

## Citations

View our in-line citations in the [Citations](docs/citations.md) document.

## Contributing

* [Contributing Guidelines](./docs/contributing/Contribution_Guidelines.md)

* [How To Use Git](./docs/contributing/CONTRIBUTING.md)

## Terms of Use

Your complete responsibility lies in the utilization of this application, encompassing all actions and consequences that arise. While the DNAnalyzer Team is dedicated to addressing significant issues that may arise, whether reported by users or as new research unfolds, they cannot be held accountable for any losses users may experience due to the application's use, irrespective of circumstances. For further inquiries, please reach out to the following email address: help@dnanalyzer.live.

If you use this software in your research, we request that you provide the appropriate citation.

Copyright © Piyush Acharya 2023. DNAnalyzer is a fiscally sponsored 501(c)(3) nonprofit (EIN: 81-2908499). Licensed under the MIT License.
