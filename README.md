![DNAnalyzer-modified](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)


<p align=center><img src="https://img.shields.io/badge/copyright-2025-blue" alt="Copyright"> <img src="https://img.shields.io/github/v/release/VERISIMILITUDEX/DNAnalyzer" alt="Releases"> <img src="https://img.shields.io/github/repo-size/VerisimilitudeX/DNAnalyzer" alt="Repository Size"> <img src="https://hits.dwyl.com/verisimilitudeX/DNAnalyzer.svg?style=flat" alt="Hits Counter">  <img src="https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/gradle.yml/badge.svg" alt=""> 
<a href="https://discord.gg/X3YCvGf2Ug"><img src="https://img.shields.io/discord/1033196198816915516" alt=""></a>
<a href="https://deepsource.io/gh/VerisimilitudeX/DNAnalyzer/?ref=repository-badge}"><img src="https://deepsource.io/gh/VerisimilitudeX/DNAnalyzer.svg/?label=active+issues&amp;show_trend=true&amp;token=9NBX3zsf0IZ3Nii3AApiX1Wa" alt="DeepSource" title="DeepSource"></a>
<a href="https://zenodo.org/records/14556578"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.14556578.svg" alt="DOI" title="DeepSource"></a>
<a href="https://github.com/VerisimilitudeX/DNAnalyzer/issues"><img src="https://img.shields.io/github/issues/VerisimilitudeX/DNAnalyzer" alt="Issues" title="DeepSource"></a>
<a href="https://github.com/VerisimilitudeX/DNAnalyzer/pulls"><img src="https://img.shields.io/github/issues-pr/VerisimilitudeX/DNAnalyzer" alt="Issues" title="DeepSource"></a></p>

# DNAnalyzer

>Democratizing ML-powered DNA analysis through efficient on-device computation and interpretive tools.

**DNAnalyzer** is a fiscally sponsored 501(c)(3) nonprofit organization (EIN: 81-2908499) dedicated to revolutionizing the field of DNA analysis. We aim to democratize access to DNA analysis tools for a deeper understanding of human health and disease and pushing the boundaries of what is possible in the field of genetics research to make a significant impact in the industry. It was created by [Piyush Acharya](github.com/VerisimilitudeX) and is currently led by him and [@LimesKey](github.com/LimesKey).

## Summary
DNAnalyzer is your gateway to deciphering the secrets of DNA. Our innovative AI-powered analysis and interpretive tools empower geneticists, physicians, and researchers to gain deep insights into DNA sequences, revolutionizing how we understand human health and disease.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=519909104&machine=largePremiumLinux&location=WestUs&skip_quickstart=true&geo=UsWest)
[![Model in Hugging Face](https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg)](https://huggingface.co/DNAnalyzer)
<a href="https://www.producthunt.com/posts/dnanalyzer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dnanalyzer" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401710&theme=dark" alt="DNAnalyzer - Revolutionizing&#0032;AI&#0045;powered&#0032;accessible&#0032;DNA&#0032;analysis | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

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

Currently, the average cost of getting access to an individual's DNA sequence is $100. On top of that, most personal genomics providers charge up to $600 to gain access to (largely) machine-generated insights such as carrier status, health predisposition, wellness reports, and traits analyses [[1](https://customercare.23andme.com/hc/en-us/articles/115013843028-What-Health-Related-Information-Can-I-Learn-From-23andMe)]. This ends up restricting these valuable health insights from communities that need it the most.

At the same time, there are numerous privacy risks associated with direct-to-consumer genetic testing companies. Unlike your credit card number or your bank account password, if your genetic information is stolen or simply given away without your consent by a company that possesses it, it can’t be changed. Few federal and state laws regulate what companies must do to keep genetic data private and secure. The Genetic Information Nondiscrimination Act (GINA) prevents employers from discriminating against you on the basis of your genetic information. But it doesn’t say anything about what a third-party DTC genetic testing company can do with the information it collects about you. Also, importantly, GINA’s protections apply only if a person is displaying no symptoms of their genetic condition, says Ellen Clayton, J.D., M.D., a professor of health policy at Vanderbilt University Medical Center in Nashville, Tenn. If a person becomes symptomatic, GINA’s protections against discrimination no longer apply. Under the Affordable Care Act (ACA), health insurance companies cannot refuse coverage or charge more for coverage based on a preexisting condition—a prohibition that also applies to any condition discovered as the result of genetic testing. That means the companies that provide these services have the freedom to control what happens to a consumer’s genetic information once they receive it, Brookman says. Some companies also encourage consumers to provide additional sensitive family or health information in order to maximize the possible insights from the genetic tests being offered.

In one 2018 study of DTC genetic testing companies’ privacy policies, Vanderbilt University researchers found that 71 percent of companies used consumer information internally for purposes other than providing the results to consumers. Sixty-two percent said they use data for internal research and development, while 78 percent said they provided genetic information to third parties in de-identified or aggregate forms without additional consumer consent. There are also few laws regulating how consumers’ genetic data should be stored and protected by the companies that collect it, and genetic testing companies have experienced data breaches. For example, the DTC genetic testing company MyHeritage was hacked in 2018, and users’ emails and scrambled passwords were stolen. Their DNA information wasn’t stolen, but such a breach is certainly possible, CR experts say.

At DNAnalyzer, we believe that access to personalized

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
* **Web UI Coming Soon**

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

Your complete responsibility lies in the utilization of this application, encompassing all actions and consequences that arise. While the DNAnalyzer Team is dedicated to addressing significant issues that may arise, whether reported by users or as new research unfolds, they cannot be held accountable for any losses users may experience due to the application's use, irrespective of circumstances. For further inquiries, please reach out to the following email address: help@dnanalyzer.org.

If you use this software in your research, we request that you provide the appropriate citation.

Copyright © Piyush Acharya 2024. DNAnalyzer is a fiscally sponsored 501(c)(3) nonprofit (EIN: 81-2908499). Licensed under the MIT License.

## Stars

Please star the repository to show your support!

<a href="https://star-history.com/#VerisimilitudeX/DNAnalyzer&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
 </picture>
</a>
