/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Scanner;

/**
 * Creates a new instance of the getAminoAcid class after getting the DNA and
 * amino acid from the
 * user.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class CoreExecutor {

  /**
   * Gets the path to the file to be analyzed
   *
   * @param sc The input scanner
   * @returns The path to file
   * @category Input
   */
  private static String getFilePathInput(final Scanner sc) {
    System.out.print("Enter the path to the file to be analyzed: ");
    return sc.nextLine();
  }

  /**
   * Reads the inputted file to a string
   *
   * @param fileName The name of the file to be read
   * @category File IO
   * @returns The contents of the file as a string
   * @throws IOException
   */
  private static String readFile(final String fileName) throws IOException {
    // Load DNA file and concatenate lines
    return Files.readString(Path.of(fileName)).replace("\n", "").toLowerCase();
  }

  /**
   * Checks if DNA is valid
   *
   * @param dna The DNA to be checked
   * @category DNA
   * @returns True if DNA is valid, false otherwise
   */
  private static boolean isValidDNA(final String dna) {
    return dna.matches("[atgc]+");
  }

  /**
   * Gets the amino acid from the user
   *
   * @param sc The input scanner
   * @returns The amino acid
   * @category Input
   */
  private static String getAminoAcidInput(final Scanner sc) {
    System.out.print("Enter an amino acid: ");
    return sc.nextLine().toLowerCase();
  }

  /**
   * Returns the list of proteins in the DNA
   *
   * @param dna           The DNA to be searched
   * @param userAminoAcid The amino acid to be searched for
   * @category Protein
   * @returns The ArrayList of proteins
   */

  private static List<String> createProteinList(final String dna, final String userAminoAcid) {
    final ProteinFinder gfp = new ProteinFinder();
    return gfp.getProtein(dna, userAminoAcid);
  }

  /**
   * Calls the other methods to output the results
   *
   * @category Output
   * @param sc The input scanner
   * @throws IOException
   * @throws InterruptedException
   */
  public static void defaultCaller(final Scanner sc) throws IOException, InterruptedException {
    String dna = null;

    while (true) {
      try {
        dna = readFile(getFilePathInput(sc));
        break;
      } catch (final IOException e) {
        System.out.println("File not found. Please try again.");
      }
    }

    // Notifies user if DNA is invalid
    if (!isValidDNA(dna)) {
      throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
    }

    final String userAminoAcid = getAminoAcidInput(sc);

    // Prevents an error from occurring when the user enters an RNA sequence.
    // Recently, using DNA sequences instead of RNA sequences has been a more common
    // practice. In RNA, uracil is replaced with thymine (U -> T).
    dna = dna.replace("u", "t");

    // Create a list of proteins found in the DNA
    final List<String> geneList = createProteinList(dna, userAminoAcid);

    // Output the proteins, GC content, and quantities of each nucleotide found in
    // the DNA
    Properties.printProteinList(geneList, userAminoAcid);
    final float gcContent = Properties.getGCContent(dna);
    System.out.println("\nGC-content (genome): " + gcContent + "\n");
    Properties.printNucleotideCount(dna);

    // Output high coverage regions and the longest protein
    ProteinAnalysis.printHighCoverageRegions(geneList);
    ProteinAnalysis.printLongestProtein(geneList);
    System.out.println();

    // Output the number of codons based on the reading frame the user wants to look
    // at, and minimum and maximum filters
    final short READING_FRAME = 1;
    final int MIN_COUNT = 520860;
    final int MAX_COUNT = 520880;
    final ReadingFrames aap = new ReadingFrames(dna, READING_FRAME, MIN_COUNT, MAX_COUNT);
    aap.printCodonCounts();

    // Notifies the user if the DNA sequence is random.
    if (Properties.isRandomDNA(dna)) {
      System.out.println("\nWARNING: DNA sequence has been detected to be random.\n");
    }
  }
}
