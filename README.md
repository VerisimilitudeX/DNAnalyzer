<img src="https://user-images.githubusercontent.com/96280466/186224441-46dd2029-b9dc-4b3d-aad8-bfd1e1e62f2e.png" width="400"/>

[![wakatime](https://wakatime.com/badge/github/Verisimilitude11/DNAnalyzer.svg)](https://wakatime.com/badge/github/Verisimilitude11/DNAnalyzer)

DNAnalyzer
==========

> A highly efficient, powerful, and feature-rich algorithm for analyzing genomic sequences

This software uses a modified version of the Boyer-Moore algorithm to analyze genomic sequences for the genes of amino acids, start and stop codons, regions with high GC-content, transcription factors, and regulatory elements. In the near future, machine learning models and artificial intelligence will be added to enhance the algorithm.

Background
----------

The human genome is comprised of over 3 billion base pairs, making manual analysis nearly impossible. Consequently, using powerful computational and statistical methods to decode the functional information hidden in DNA sequences are necessary. The genome is also extremely intricate and contains a plethora of structured data types, which need to be organized and converted into analyzable data appropriately. `[1]`

Features
--------

*   Start and stop codons
    *   Indicate the start and stop of an amino acid. There are 20 different amino acids. A protein consists of one or more chains of amino acids (called polypeptides) whose sequence is encoded in a gene. `[2]`
*   High coverage regions
    *   Regions of a DNA genome that code for a protein and have a relatively high proportion (45-60% GC-content) of cytosine and guanine nucleotides to the 4 nucleotide bases. `[3]`
*   Longest genes
    *   Most susceptible to disease implications and are especially linked to neurodevelopmental disorders (e.g., autism). `[4]`
*   Transcription factors
    *   Proteins that help turn specific genes "on" or "off" by binding to nearby DNA. `[5]`
*   Regulatory elements
    *   Binding sites for transcription factors, which are involved in gene regulation. `[6]`
*   FASTA files (.fa)
    *   Supports multi-line and single-line FASTA database files. `[7]`

Impact
------

Researchers are working to extract valuable information from software such as this in order to better understand human health and disease.

Future Support and Improvements
-------------------------------

### GUI

A GUI-based application that will run natively on Windows/macOS/Linux to perform the algorithms implemented in the software.

### Needleman-Wunsch Algorithm

This algorithm is used primarily for gene sequencing looking for the optimal match between multiple gene sequences. `[8]`

### Cytogenic Location

This program will implement the Cytogenic Location organization technique which is a technique for finding where specific genes will be located by giving the chromosome, arm, region and band. 7q31.2, for example, would be the CFTR gene located on the 7th chromosome's long arm, in the 3rd region on the 1st band, and the 2nd sub-band. `[9]`

### Data sources:

*   [https://en.wikipedia.org/wiki/DNA\_and\_RNA\_codon\_tables](https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables)
*   [http://algoart.com/aatable.htm](http://algoart.com/aatable.htm)
*   [https://www.bioinformatics.org/sms2/shuffle\_dna.html](https://www.bioinformatics.org/sms2/shuffle_dna.html)

Citations
---------

1.  Genomic Data Science Fact Sheet. (n.d.). Genome.gov. https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science
2.  DNA and RNA codon tables. (2020, December 13). Wikipedia. https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
3.  GC-content - an overview | ScienceDirect Topics. (n.d.). Www.sciencedirect.com. https://www.sciencedirect.com/topics/biochemistry-genetics-and-molecular-biology/gc-content
4.  Length matters: Disease implications for long genes. (2013, October 22). Spectrum | Autism Research News. https://www.spectrumnews.org/opinion/viewpoint/length-matters-disease-implications-for-long-genes/
5.  Suter, D. M. (2020). Transcription Factors and DNA Play Hide and Seek. Trends in Cell Biology. https://pubmed.ncbi.nlm.nih.gov/32413318/
6.  What is noncoding DNA?: MedlinePlus Genetics. (n.d.). Medlineplus.gov. https://medlineplus.gov/genetics/understanding/basics/noncodingdna/
7.  BLAST TOPICS. (2019). Nih.gov. https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp
8.  Wikipedia Contributors. (2021, March 24). Needleman–Wunsch algorithm. Wikipedia; Wikimedia Foundation. https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm
9.  Cytogenic Location. (2020, December 13). Wikipedia. https://en.wikipedia.org/wiki/Cytogenetics

**Copyright © 2022, DNAnalyzer. All rights reserved.**