# Algorithm for Analyzing Genes in DNA

<img src="https://user-images.githubusercontent.com/96280466/182701235-67ac54c0-2cc2-465d-9458-0a9bef98f439.png" width="400"/>

## Overview
This software uses a modified version of the Boyer-Moore algorithm to analyze genomic sequences for the genes of amino acids, start and stop codons, regions with high GC-content, transcription factors, and regulatory elements. In the near future, machine learning models and artificial intelligence will be added to enhance the algorithm.

## Background
The human genome is comprised of over 3 billion base pairs, making manual analysis nearly impossible. Consequently, using powerful computational and statistical methods to decode the functional information hidden in DNA sequences are necessary. The genome is also extremely intricate and contains a plethora of structured data types, which need to be organized and structured appropriately.

## Features
* Start and stop codons
  * Indicate the start and stop of an amino acid. There are 20 different amino acids. A protein consists of one or more chains of amino acids (called polypeptides) whose sequence is encoded in a gene.
* High coverage regions
  * Regions of a DNA genome that code for a protein and have a relatively high proportion (45-60% GC-content) of cytosine and guanine nucleotides to the 4 nucleotide bases.
* Longest genes
  * Most susceptible to disease implications and are especially linked to neurodevelopmental disorders (e.g., autism)
* Transcription factors
  * Proteins that help turn specific genes "on" or "off" by binding to nearby DNA.
* Regulatory elements
  * Binding sites for transcription factors, which are involved in gene regulation.
* FASTA files (.fa)
  * Supports multi-line and single-line FASTA database files.

## Impact
Researchers are working to extract valuable information from software such as this in order to better understand human health and disease.
<!--https://www.spectrumnews.org/opinion/viewpoint/length-matters-disease-implications-for-long-genes/-->

## Future Support and Improvements

  ### GUI
  A GUI-based application that will run natively on Windows/macOS/Linux to perform the algorithms implemented in the software.

  ### Needleman-Wunsch Algorithm
  This algorithm is used primarily for gene sequencing looking for the optimal match between multiple gene sequences. For a physical and interactive understanding of the software used you can go to http://experiments.mostafa.io/public/needleman-wunsch/. It is a very interesting algorithm and I would suggest you check it out.

  https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm

  ### Cytogenic Location
  This program will implement the Cytogenic Location organization technique which is a technique for finding where specific genes will be located by giving the chromosome, arm, region and band. 7q31.2, for example, would be the CFTR gene located on the 7th chromosome's long arm, in the 3rd region on the 1st band, and the 2nd sub-band
