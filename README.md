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
</ul>

<h2 id="Quick Introduction to DNA">Quick Introduction to DNA

 <h3 id="DNA">DNA</h3>

  <p> In a nutshell, DNA is in every cell of your body and contains the instruction on how to build more than 200 different types of cells in your body. DNA is almost like a programming language, but only for robots and by using AI and Machine learning, we can crack the code to reading and interpreting it. <p>
 
<h3 id="Algorithm">Algorithm</h3>

  <p> The algorithm we have is still a work in progress, but everyday it's getting improved for the better.
  
<h3 id="Database">Database</h3>

  <p> Having a database of DNA is the best way on interpreting the DNA combined with machine learning, by the ML model learning from our current DNA it can make accurate predictions on DNA it's never seen before. This is how current DNA tests work. <p>

<blockquote <p> Think of a videogame anti-cheat, the anti-chat senses all player movements and cross-references that movement with a set of confirmed cheats in that videogame. This database contains hundreds of possible known cheats players can have, usually the most common ones. When a player cheats you can assign a probability number for how likely this anti-cheat detection is correct, more common cheats are usually higher on this scale. <p>
</blockquote>
  
<h2 id="getting-started">Getting Started
</h2>
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

https://user-images.githubusercontent.com/27987685/194954560-5f470ecc-e733-4757-9773-f6d2998eef86.mov

<h2 id="future-support-and-improvements">Future Support and Improvements
</h2>

<h3 id="gui">GUI
</h3>

<p>A cross-platform GUI-based application that will perform the algorithms implemented in the software. Currently, the Met CLI is used as an expedient for this feature. Once implemented, the Met CLI would continue to be the main tool for power users.
</p>

<h3 id="needleman-wunsch-algorithm">Needleman-Wunsch Algorithm
</h3>

<p>This algorithm is used primarily for gene sequencing looking for the optimal match between multiple gene sequences. While the Boyer-Moore algorithm is undoubtedly more efficient, the Needleman-Wunsch algorithm continues to be one of the most accurate algorithms for genomic sequencing. 
  <code>[8]
  </code>
</p>

<h3 id="Genotype Data for Analysis and Machine Learning Training">Genotype Data for Analysis and Machine Learning Training
</h3>

<p> This will bring the ability to use genotype data from external DNA testing services with DNAnalyzer's Algorithm. In the future, to use this program, all you need is a simple 150$ DNA Test to be able to experience all the features of DNAnalyzer.

<h3> <a href=https://github.com/bbuchfink/diamond">DIAMOND</a> Implementation, a <a href="https://blast.ncbi.nlm.nih.gov/Blast.cgi">BLAST</a> fork.
</h3>

<p> This will combine <a href=https://github.com/bbuchfink/diamond>DIAMOND</a>'s performance advantage along with <a href=https://blast.ncbi.nlm.nih.gov/Blast.cgi">BLAST</a>'s algorithm.

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

## Contributing:

- <a href="https://github.com/Verisimilitude11/DNAnalyzer/blob/main/docs/Contribution%20Guideline/Contribution_Guideline.md">Contributing Guidelines</a>
- <a href="https://github.com/Verisimilitude11/DNAnalyzer/blob/main/docs/contributing/CONTRIBUTING.md">How To Use Git</a>

### Contributors

<h4>DNAnalyzer was developed with the help of the following people:
<h4>
<a href="https://github.com/Verisimilitude11/DNAnalyzer/graphs/contributors">

<img src="https://contrib.rocks/image?repo=Verisimilitude11/DNAnalyzer&&max=817"  alt=""/>

<h2 align="left" id="citations">Citations
</h2>

<ol>
  <li>Genomic Data Science Fact Sheet. (n.d.). Genome.gov. 
    <a href="https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science">https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science
    </a>
  </li>
  <li>DNA and RNA codon tables. (2020, December 13). Wikipedia. 
    <a href="https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables">https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
    </a>
  </li>
  <li>GC-content - an overview | ScienceDirect Topics. (n.d.). Www.sciencedirect.com. 
    <a href="https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content">https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content
    </a>
  </li>
  <li>Length matters: Disease implications for long genes. (2013, October 22). Spectrum | Autism Research News. 
    <a href="https://www.spectrumnews.org/opinion/viewpoint/length-matters-disease-implications-for-long-genes/">https://www.spectrumnews.org/opinion/viewpoint/length-matters-disease-implications-for-long-genes/
    </a>
  </li>
  <li>Suter, D. M. (2020). Transcription Factors and DNA Play Hide and Seek. Trends in Cell Biology. 
    <a href="https://pubmed.ncbi.nlm.nih.gov/32413318/">https://pubmed.ncbi.nlm.nih.gov/32413318/
    </a>
  </li>
  <li>What is non-coding DNA?: MedlinePlus Genetics. (n.d.). Medlineplus.gov. 
    <a href="https://medlineplus.gov/genetics/understanding/basics/noncodingdna/">https://medlineplus.gov/genetics/understanding/basics/noncodingdna/
    </a>
  </li>
  <li>BLAST TOPICS. (2019). Nih.gov. 
    <a href="https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&amp;PAGE_TYPE=BlastDocs&amp;DOC_TYPE=BlastHelp">https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&amp;PAGE_TYPE=BlastDocs&amp;DOC_TYPE=BlastHelp
    </a>
  </li>
  <li>Wikipedia Contributors. (2021, March 24). Needleman–Wunsch algorithm. Wikipedia; Wikimedia Foundation. 
    <a href="https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm">https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm
    </a>
  </li>
  <li>Cytogenic Location. (2020, December 13). Wikipedia. 
    <a href="https://en.wikipedia.org/wiki/Cytogenetics">https://en.wikipedia.org/wiki/Cytogenetics
    </a>
  </li>
</ol>

<h2 id="terms-of-use">Terms of Use
</h2>

<p>You are entirely responsible for the use of this application, including any and all activities that occur. While the DNAnalyzer Team strives to fix all major bugs that may be either reported by a user or discovered while debugging, they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances. For further inquiries, please contact the following email address: 
  <code>contact@dnanalyzer.live
  </code>
</p>

#### Copyright © 2022 DNAnalyzer. This is an open source project.
