<div align="center">
  <img src="https://user-images.githubusercontent.com/96280466/186224441-46dd2029-b9dc-4b3d-aad8-bfd1e1e62f2e.png" height="300" alt=""/>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/copyright-2022-blue"  alt="Copyright"/>
  <img src="https://wakatime.com/badge/github/Verisimilitude11/DNAnalyzer.svg"  alt="WakaTime"/>
  <img src="https://img.shields.io/github/v/release/VERISIMILITUDE11/DNAnalyzer"  alt="Releases"/>
  <img src="https://img.shields.io/github/repo-size/Verisimilitude11/DNAnalyzer"  alt="Repository Size"/>
  <img src="https://img.shields.io/tokei/lines/github/verisimilitude11/DNAnalyzer" alt="Lines of Code"/>
  <img src="https://hits.dwyl.com/verisimilitude11/DNAnalyzer.svg?style=flat"  alt="Hits Counter"/>
  <!--img src='https://bettercodehub.com/edge/badge/Verisimilitude11/DNAnalyzer?branch=main'>-->
  <img src="https://github.com/Verisimilitude11/DNAnalyzer/actions/workflows/gradle.yml/badge.svg"   alt=""/>
  <a href="https://deepsource.io/gh/Verisimilitude11/DNAnalyzer/?ref=repository-badge}" target="_blank"><img alt="DeepSource" title="DeepSource" src="https://deepsource.io/gh/Verisimilitude11/DNAnalyzer.svg/?label=active+issues&show_trend=true&token=9NBX3zsf0IZ3Nii3AApiX1Wa"/></a>
</p>

<blockquote>
  <p>A highly efficient, powerful, and feature-rich algorithm for analyzing DNA sequences
  </p>
</blockquote>

<p>DNAnalyzer identifies proteins, amino acids, start and stop codons, high coverage regions, regions susceptible to neurodevelopmental disorders, transcription factors, and regulatory elements. Researchers are working to extract valuable information from such software to better understand human health and disease. Currently, we have a Command-Line-Interface (CLI) and are working on a Graphical User Interface (GUI) that will enable physicians to quickly and more easily interact with the software, enabling them to identify genetic mutations that may cause disease.
</p>

<h2 id="background">Background
</h2>

<p>The human genome is composed of over 3 billion base pairs, making human analysis nearly impossible. Consequently, using powerful computational and statistical methods to decode the functional information hidden in DNA sequences are necessary. The genome is also extremely intricate and contains a plethora of data, which need to be organized and converted into analyzable data appropriately. Current analytical tools and software make it arduous for both geneticists and physicians to do so, thus restricting them from acquiring crucial information to better understand humans.
  <code>[1]
  </code>
</p>

<h2 id="features">Features
</h2>

<ul>
  <li>Start and stop codons
    <ul>
      <li>Indicate the start and stop of an amino acid. There are 20 different amino acids. A protein consists of one or more chains of amino acids (called polypeptides) whose sequence is encoded in a gene.
        <code>[2]
        </code>
      </li>
    </ul>
  </li>
  <li>High coverage regions
    <ul>
      <li>Regions of a DNA genome that code for a protein and have a relatively high proportion of guanine and cytosine nucleotides to the 4 nucleotide bases (45-60% GC-content).
        <code>[3]
        </code>
      </li>
    </ul>
  </li>
  <li>Longest genes
    <ul>
      <li>Most susceptible to disease implications and are especially linked to neurodevelopmental disorders (e.g., autism).
        <code>[4]
        </code>
      </li>
    </ul>
  </li>
  <li>Regulatory elements
    <ul>
      <li>Binding sites for transcription factors, which are involved in gene regulation.
        <code>[6]
        </code>
      </li>
    </ul>
  </li>
  <li>FASTA files (.fa)
    <ul>
      <li>Supports multi-line and single-line FASTA database files. Files can either be uploaded or linked to from the web.
        <code>[7]
        </code>
      </li>
    </ul>
  </li>

  <li>Command-line interface (Met CLI)
    <ul>
      <li>
        The Methionine command-line interface (abbreviated as Met CLI) is a unified tool for running DNAnalyzer services from the command-line. The CLI is a powerful tool for using DNAnalyzer services and scripting a sequence of commands to execute. You can currently access all the core features present in DNAnalyzer without having to log in, although account support will be implemented soon. To get more information on Met CLI installation and currently supported commands, refer to Met CLI GitHub repository.
      </li>
    </ul>
  </li>
  <li>GUI
    <ul>
      <li>A cross-platform GUI-based application that performs the algorithms implemented in the software. The Met CLI continues to be supported. Currently, the following operations are supported:
        <ul>
          <li>set name of DNA file to analyze</li>
          <li>set minimum number of reading frames</li>
          <li>set maximum number of reading frames</li>
          <li>run analysis</li>
        </ul>
        More options will be added in the future.
    </ul>
  </li>
</ul>

<h2 id="Quick Introduction to DNA">Quick Introduction to DNA

 <h3 id="DNA">DNA</h3>

  <p>In a nutshell, DNA is found in every cell of your body and contains the instructions for building over 200 different types of cells. DNA is similar to a programming language, but only for living organisms. We can crack the code to reading and interpreting it by using Artificial Intelligence and Machine Learning, which can have life-saving benefits as well as key insights.<p>
  
<h3 id="Database">Databases</h3>

  <p>Having a database of DNA is the best way to interpret the DNA, and when combined with machine learning, the ML model can make accurate predictions on DNA it has never seen before. This is how current DNA tests function.<p>

<blockquote><p>Consider a videogame's anti-cheat; the anti-cheat detects all player movements and compares them to a list of confirmed cheats in that videogame. This database contains hundreds of known cheats that players can have, usually the most common ones. When a player cheats, you can assign a probability number to how likely this anti-cheat detection is correct; more common cheats are usually higher on this scale.<p>
</blockquote>
  
<h2 id="getting-started">Getting Started
</h2>

A <a href="https://1drv.ms/v/s!Ak23YJmC7V17iN9FpYLGHRGCLfzz3w?e=sKTHAK
">video tutorial</a> covering the instructions below is also available.
<h3 id="requirements">System Requirements
</h3>
To build and run the DNAnalyzer, you need

- JDK <a href="https://www.oracle.com/java/technologies/downloads/#jdk17-windows">17</a>
- A JAVA_HOME environment variable pointing to your JDK, or the Java executable in your PATH
- <a href="https://gradle.org/install/">Gradle</a>

<h3 id="build_and_run">Build & Run</h3>
We use <a href="https://gradle.org">Gradle</a> for building. The Gradle wrapper takes care of downloading
dependencies, testing, compiling, linking, and packaging the code.

<h4>Windows:</h4>

```
.\gradlew build
```

<h4>Linux/Unix/macOS:</h4>

```
./gradlew build
```

<h4>Executable:</h4>

```
java -jar build/libs/DNAnalyzer.jar <arguments>
```

If you prefer, you can also run it directly from Gradle:

UNIX / Linux:
```
./gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```

Windows:
```
.\gradlew run --args="assets/dna/random/dnalong.fa --amino=ser --min=10 --max=100"
```


<h4>Arguments:</h4>

DNAnalyzer uses CLI arguments instead of `stdin`. For example, you can do:

```
<executable> assets/dna/random/dnalong.fa --amino=ser --min=0 --max=100 -r
```

<h4>Usage:</h4>

```
<executable> <arguments>
```

<h5>Example:</h5>

```
java -jar build/libs/DNAnalyzer.jar assets/dna/random/dnalong.fa --amino=ser --min=16450 --max=520218 -r
```

<h4>GUI</h4>
DNAnalyzer also comes with a (very basic) GUI; to start DNAnalyzer with the GUI, run:

UNIX / Linux:
```
./gradlew run --args="--gui"
```

Windows:
```
.\gradlew run --args="--gui"
```

Then:
- enter the file name of the DNA file in the text field
- set min and max
- click analyze

The results of your analysis will be shown in the GUI on the right-hand side. 

<h4>Help message:</h4>

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

<h2 id="demo">Demo
</h2>

<https://user-images.githubusercontent.com/27987685/194954560-5f470ecc-e733-4757-9773-f6d2998eef86.mov>

<h2 id="future-support-and-improvements">Future Support and Improvements
</h2>

<h3 id="needleman-wunsch-algorithm">Needleman-Wunsch Algorithm
</h3>

<p>This algorithm is used primarily for gene sequencing looking for the optimal match between multiple gene sequences. While the Boyer-Moore algorithm is undoubtedly more efficient, the Needleman-Wunsch algorithm continues to be one of the most accurate algorithms for genomic sequencing.
  <code>[8]
  </code>
</p>

<h3 id="Genotype Data for Analysis and Machine Learning Training">Genotype Data for Analysis and Machine Learning Training
</h3>

<p>This will bring the ability to use genotype data from external DNA testing services with DNAnalyzer's algorithm. In the future, to use this program, all you need is a simple $150 DNA Test to be able to experience all the features of DNAnalyzer.

<h3> <a href=https://github.com/bbuchfink/diamond">DIAMOND</a> Implementation, a <a href="https://blast.ncbi.nlm.nih.gov/Blast.cgi">BLAST</a> fork.
</h3>

<p>This will combine <a href=https://github.com/bbuchfink/diamond>DIAMOND</a>'s performance advantage along with <a href=https://blast.ncbi.nlm.nih.gov/Blast.cgi">BLAST</a>'s algorithm.

<h2 id="data-sources-">Data sources:
</h2>

<ul>
  <li>
    <a href="https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables">Codon Tables</a>
  </li>
  <li>
    <a href="https://github.com/Verisimilitude11/DNAnalyzer/blob/main/assets/dna/random/Random%20DNA%20Generator.py">DNA Generator</a>
  </li>
</ul>

<h2>Citations</h2>
View our in-line citations in the <a href="docs/citations.md" target="_blank">Citations</a> document.

## Contributing

- <a href="https://github.com/Verisimilitude11/DNAnalyzer/blob/main/docs/Contribution%20Guideline/Contribution_Guideline.md">Contributing Guidelines</a>
- <a href="https://github.com/Verisimilitude11/DNAnalyzer/blob/main/docs/contributing/CONTRIBUTING.md">How To Use Git</a>

<h2 id="terms-of-use">Terms of Use
</h2>

<p>You are entirely responsible for the use of this application, including any and all activities that occur. While the DNAnalyzer Team strives to fix all major bugs that may be either reported by a user or discovered while debugging, they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances. For further inquiries, please contact the following email address:
  <code>contact@dnanalyzer.live
  </code>
</p>

#### Copyright © 2022 Piyush Acharya and DNAnalyzer. This is an open source project. Some rights reserved.
