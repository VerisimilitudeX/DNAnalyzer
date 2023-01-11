![DNAnalyzer Logo](https://user-images.githubusercontent.com/96280466/186224441-46dd2029-b9dc-4b3d-aad8-bfd1e1e62f2e.png)

<p align=center><img src="https://img.shields.io/badge/copyright-2023-blue" alt="Copyright"> <img src="https://wakatime.com/badge/github/Verisimilitude11/DNAnalyzer.svg" alt="WakaTime"> <img src="https://img.shields.io/github/v/release/VERISIMILITUDE11/DNAnalyzer" alt="Releases"> <img src="https://img.shields.io/github/repo-size/Verisimilitude11/DNAnalyzer" alt="Repository Size"> <img src="https://img.shields.io/tokei/lines/github/verisimilitude11/DNAnalyzer" alt="Lines of Code"> <img src="https://hits.dwyl.com/verisimilitude11/DNAnalyzer.svg?style=flat" alt="Hits Counter">  <img src="https://github.com/Verisimilitude11/DNAnalyzer/actions/workflows/gradle.yml/badge.svg" alt=""> 
<a href="https://discord.gg/X3YCvGf2Ug"><img src="https://img.shields.io/discord/1033196198816915516" alt=""></a>
<a href="https://deepsource.io/gh/Verisimilitude11/DNAnalyzer/?ref=repository-badge}"><img src="https://deepsource.io/gh/Verisimilitude11/DNAnalyzer.svg/?label=active+issues&amp;show_trend=true&amp;token=9NBX3zsf0IZ3Nii3AApiX1Wa" alt="DeepSource" title="DeepSource"></a></p>

>Revolutionizing DNA analysis and making it accessible to all through innovative analysis and interpretive tools

DNAnalyzer identifies protein-encoding sequences via recognizing start and stop codons, predicts high coverage regions, and locates promoter sequences and their associated regulatory sequences. It also provides a variety of other useful tools, such as a built-in DNA sequence editor, viewer, generator, and converter.

Researchers are working to extract valuable information from such software to better understand human health and disease. Currently, we have a Command-Line-Interface (CLI) and are working on a Graphical User Interface (GUI) that will enable physicians to quickly and more easily interact with the software, enabling them to identify genetic mutations that may cause disease.

## Background

The human genome is composed of over 3 billion base pairs, making human analysis nearly impossible. Consequently, using powerful computational and statistical methods to decode the functional information hidden in DNA sequences are necessary. The genome is also extremely intricate and contains a plethora of data, which need to be organized and converted into analyzable data appropriately. Current analytical tools and software make it arduous for both geneticists and physicians to do so, thus restricting them from acquiring crucial information to better understand humans. `[1]`

## Features

* Start and stop codons
  * Indicate the start and stop of a protein. There are 20 different amino acids. A protein consists of one or more chains of amino acids (called polypeptides) whose sequence is encoded in a gene. `[2]`
* High coverage regions
  * Promoter sequences in the genome that code for proteins have a relatively high proportion of guanine and cytosine nucleotides to the 4 nucleotide bases (45-60% GC-content). Such CpG islands are likely to reveal important information about the genome. `[3]`
* Neurodevelopmental Disorders
  * A group of disorders, usually characterized by longer genes, that affect the development of the brain and nervous
                        system. These disorders are caused by genetic mutations that affect the development of the
                        brain and nervous system. These disorders include autism, attention deficit hyperactivity
                        disorder (ADHD), and schizophrenia. `[4]`
* Core promoter elements
  * Promoter sequences are short DNA sequences that are located upstream of a gene and are responsible for initiating transcription (e.g. BRE, TATA, INR, and DPE). `[5]`
* FASTA files (.fa)
  * Supports multi-line and single-line FASTA database files. Files can either be uploaded or linked to from the web. `[7]`
* CLI
  * The Methionine command-line interface (abbreviated as Met CLI) is a unified tool for running DNAnalyzer services from the command-line. The CLI is a powerful tool for using DNAnalyzer services and scripting a sequence of commands to execute. You can currently access all the core features present in DNAnalyzer without having to log in, although account support will be implemented soon. To get more information on Met CLI installation and currently supported commands, refer to Met CLI GitHub repository.
* GUI
  * A cross-platform GUI-based application that performs the algorithms implemented in the software. The Met CLI continues to be the best way to run the program. Currently, the following operations are supported:
    * Set name of DNA file to analyze
    * Set minimum and maximum number of reading frames
    * Run analysis
  * More features will be added in the future.

## Quick Introduction to DNA

### DNA

In a nutshell, DNA is found in every cell of your body and contains the instructions for building over 200 different types of cells. DNA is similar to a programming language, but only for living organisms. We can crack the code to reading and interpreting it by using Artificial Intelligence and Machine Learning, which can have life-saving benefits as well as key insights.

### Databases

Having a database of DNA is the best way to interpret the DNA, and when combined with machine learning, the ML model can make accurate predictions on DNA it has never seen before. This is how current DNA tests function.

## Getting Started

A [video tutorial](https://youtu.be/dOwkInn6eDw) covering the instructions below is also available.

### System Requirements

* JDK [17](https://www.oracle.com/java/technologies/downloads/#jdk17-windows)+
* A `JAVA_HOME` environment variable pointing to your JDK, or the Java executable in your PATH
* [Gradle](https://gradle.org/install/)

### Build & Run

The easiest way to use the program on Windows is by using executable file to install the program, build gradle and run the GUI.
We use [Gradle](https://gradle.org) for building. The Gradle wrapper takes care of downloading dependencies, testing, compiling, linking, and packaging the code.

<details>
      <summary>Linux and compilation</summary>
```pwsh
./gradlew build
```

### Usage

```pwsh
<executable> <arguments>
```

#### Executable

```pwsh
java -jar build/libs/DNAnalyzer.jar
```

#### Arguments

DNAnalyzer uses CLI arguments instead of `stdin`. For example, you can do:

```pwsh
assets/dna/random/dnalong.fa --amino=arg --min=16450 --max=520218 -r
```

### Example

```pwsh
java -jar build/libs/DNAnalyzer.jar assets/dna/random/dnalong.fa --amino=ser --min=16450 --max=520218 -r
```

#### Gradle Run

If you prefer, you can also run it directly from Gradle:

```pwsh
./gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```

#### GUI

DNAnalyzer also comes with a (very basic) GUI; to start DNAnalyzer with the GUI, run:

```pwsh
./gradlew run --args="--gui assets/dna/random/dnalong.fa"
```


Then:

* Enter the file name of the DNA file in the text field
* Set min and max
* Click analyze


The results of your analysis will be shown in the right pane.
</details>

#

#### Help message

```txt
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

## Future Support and Improvements

### Needleman-Wunsch Algorithm

This algorithm is used primarily for gene sequencing looking for the optimal match between multiple gene sequences. While the Boyer-Moore algorithm is undoubtedly more efficient, the Needleman-Wunsch algorithm continues to be one of the most accurate algorithms for genomic sequencing. `[8]`

### Genotype Data for Analysis and Machine Learning Training

This will bring the ability to use genotyped data from 3rd-party DNA testing services with our algorithm. In the future, to use this program, all you will need is a simple $99 DNA Test to be able to experience all the features of DNAnalyzer.

### DIAMOND Implementation, a BLAST fork

This will combine [DIAMOND](https://github.com/bbuchfink/diamond)'s performance advantage along with [BLAST](https://blast.ncbi.nlm.nih.gov/Blast.cgi")'s algorithm.

### .FAB File Format

This will allow for the use of own custom .fab files, which are a binary version of FASTA files. It will enable faster processing of large files and massively reduced file sizes (up to 4x).

## Citations

View our in-line citations in the [Citations](docs/citations.md) document.

## Contributing

* [Contributing Guidelines](https://github.com/Verisimilitude11/DNAnalyzer/blob/main/docs/Contribution%20Guideline/Contribution_Guideline.md)

* [How To Use Git](https://github.com/Verisimilitude11/DNAnalyzer/blob/main/docs/contributing/CONTRIBUTING.md)

## Terms of Use

You are entirely responsible for the use of this application, including any and all activities that occur. While the DNAnalyzer Team strives to fix all major bugs that may be either reported by a user or discovered while debugging, they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances. For further inquiries, please contact the following email address: `contact@dnanalyzer.live`

##### Copyright © Piyush Acharya 2023. This is an open-source project with code available to inspect and modify.
