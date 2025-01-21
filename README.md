![DNAnalyzer-modified](https://user-images.githubusercontent.com/96280466/221687615-698969a1-8d39-4278-aa92-8f713625f165.png)


<p align=center><img src="https://img.shields.io/badge/copyright-2025-blue" alt="Copyright"> <img src="https://img.shields.io/github/v/release/VERISIMILITUDEX/DNAnalyzer" alt="Releases"> <img src="https://img.shields.io/github/repo-size/VerisimilitudeX/DNAnalyzer" alt="Repository Size"> <img src="https://hits.dwyl.com/verisimilitudeX/DNAnalyzer.svg?style=flat" alt="Hits Counter">  <img src="https://github.com/VerisimilitudeX/DNAnalyzer/actions/workflows/gradle.yml/badge.svg" alt=""> 
<a href="https://discord.gg/X3YCvGf2Ug"><img src="https://img.shields.io/discord/1033196198816915516" alt=""></a>
<a href="https://deepsource.io/gh/VerisimilitudeX/DNAnalyzer/?ref=repository-badge}"><img src="https://deepsource.io/gh/VerisimilitudeX/DNAnalyzer.svg/?label=active+issues&amp;show_trend=true&amp;token=9NBX3zsf0IZ3Nii3AApiX1Wa" alt="DeepSource" title="DeepSource"></a>
<a href="https://zenodo.org/records/14556578"><img src="https://zenodo.org/badge/DOI/10.5281/zenodo.14556578.svg" alt="DOI" title="DeepSource"></a>
<a href="https://github.com/VerisimilitudeX/DNAnalyzer/issues"><img src="https://img.shields.io/github/issues/VerisimilitudeX/DNAnalyzer" alt="Issues" title="DeepSource"></a>
<a href="https://github.com/VerisimilitudeX/DNAnalyzer/pulls"><img src="https://img.shields.io/github/issues-pr/VerisimilitudeX/DNAnalyzer" alt="Issues" title="DeepSource"></a></p>

# DNAnalyzer

DNAnalyzer is a fiscally sponsored 501(c)(3) nonprofit organization (EIN: 81-2908499) dedicated to revolutionizing the field of DNA analysis. We aim to democratize access to machine learning-powered DNA analysis through efficient on-device computation and interpretive tools. It was created by [Piyush Acharya](github.com/VerisimilitudeX) and is currently led by him and [@LimesKey](github.com/LimesKey). As a testament to its significant impact on the computational biology research industry, it currently has 45 computational biologist and computer scientist contributors from accredited international institutions and corporations such as Microsoft Research, University of Macedonia, and Northeastern University. Additionally, it has earned the star of the Organizer of the [AI Engineer World's Fair](https://www.ai.engineer/worldsfair) (OpenAI, Microsoft, Google DeepMind, Anthropic, etc) 

<a href="https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=519909104&machine=largePremiumLinux&location=WestUs&skip_quickstart=true&geo=UsWest" target="_blank">
    <img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces" style="height: 35px; width: auto; vertical-align: middle;" />
</a>

<a href="https://huggingface.co/DNAnalyzer" target="_blank">
    <img src="https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-xl-dark.svg" alt="Model in Hugging Face" style="height: 35px; width: auto; vertical-align: middle;" />
</a>

<a href="https://www.producthunt.com/posts/dnanalyzer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dnanalyzer" target="_blank">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=401710&theme=dark" alt="DNAnalyzer on Product Hunt" style="height: 35px; width: auto; vertical-align: middle;" />
</a>

## <a name="background"></a>Background

Currently, the average cost of accessing an individual's DNA sequence is approximately $100 [[1](https://www.genome.gov/about-genomics/fact-sheets/Sequencing-Human-Genome-cost)]. On top of that, most personal genomics providers charge up to $600 for insights such as carrier status, health predisposition, wellness reports, and traits analyses [[2](https://customercare.23andme.com/hc/en-us/articles/115013843028-What-Health-Related-Information-Can-I-Learn-From-23andMe), [3](https://umatechnology.org/how-much-does-a-dna-test-cost-in-2025-compare-prices)]. This restricts these valuable health insights from reaching the communities that need them most.

At the same time, there are significant privacy risks associated with direct-to-consumer genetic testing companies. Unlike a credit card number or password, stolen or misused genetic information cannot be changed. A 2018 study by Vanderbilt University found that 78% of DTC genetic testing companies shared genetic information with third parties in de-identified or aggregate forms without additional consumer consent [[4](https://link.springer.com/chapter/10.1007/978-3-030-71352-2_14)]. Few laws regulate how genetic data should be stored and protected, and companies have experienced data breaches. For example, in 2023, 23andMe suffered a data breach where hackers accessed the genetic information of 6.9 million users, demonstrating an urgent need for tools such as DNAnalyzer [[5](https://arstechnica.com/tech-policy/2023/12/hackers-stole-ancestry-data-of-6-9-million-users-23andme-finally-confirmed)].

By enabling secure, on-device genomic data analysis with no costs for consumers, DNAnalyzer aims to mitigate these risks while making insights more accessible to underserved communities.

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

The use of this application is entirely at your own discretion and responsibility, including all actions and outcomes that may result. While the DNAnalyzer team is committed to addressing significant issues reported by users or identified during ongoing research, we disclaim any liability for losses, damages, or other consequences arising from the use of this application, regardless of the circumstances. For any questions or concerns, please contact us at help@dnanalyzer.org.

If you utilize this software in your research, we kindly request that you provide an appropriate citation. You may use the following formats:

**APA Citation:**

```apa
Acharya, P. (2022). DNAnalyzer: ML-Powered DNA Analysis Platform (Version 3.5.0-beta.0) [Computer software]. https://doi.org/10.5281/zenodo.14556577
```

**BibTeX Citation:**

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

Copyright © Piyush Acharya 2025. DNAnalyzer is a fiscally sponsored 501(c)(3) nonprofit organization (EIN: 81-2908499) and is licensed under the MIT License.

## Stars

Please star the repository to show your support!

<a href="https://star-history.com/#VerisimilitudeX/DNAnalyzer&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=VerisimilitudeX/DNAnalyzer&type=Date" />
 </picture>
</a>
