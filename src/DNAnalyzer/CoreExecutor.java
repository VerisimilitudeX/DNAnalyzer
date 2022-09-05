package DNAnalyzer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * Creates a new instance of the getAminoAcid class after getting the DNA and amino acid from the
 * user.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class CoreExecutor {

  /**
   * Reads the inputted file to a string
   *
   * @param fileName The name of the file to be read
   * @category File IO
   * @returns The contents of the file as a string
   * @throws IOException
   */
  private String readFile(final String fileName) throws IOException {
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
  private boolean isValidDNA(final String dna) {
    return dna.matches("[atgc]+");
  }

  /**
   * Gets the amino acid from the user
   *
   * @returns The amino acid
   * @category Input
   */
  private String getAminoAcidInput() {
    Scanner sc = null;
    try {
      sc = new Scanner(System.in);
      System.out.print("Enter an amino acid: ");
      return sc.nextLine().toLowerCase();
    } finally {
      sc.close();
    }
  }

  /**
   * Returns the list of proteins in the DNA
   *
   * @param dna The DNA to be searched
   * @param userAminoAcid The amino acid to be searched for
   * @category Protein
   * @returns The ArrayList of proteins
   */
  private ArrayList<String> createProteinList(final String dna, final String userAminoAcid) {
    final ProteinFinder gfp = new ProteinFinder();
    return gfp.getProtein(
        dna,
        userAminoAcid,
        CodonData.getAminoAcid(AminoAcidNames.ISOLEUCINE),
        CodonData.getAminoAcid(AminoAcidNames.LEUCINE),
        CodonData.getAminoAcid(AminoAcidNames.VALINE),
        CodonData.getAminoAcid(AminoAcidNames.PHENYLALANINE),
        CodonData.getAminoAcid(AminoAcidNames.METHIONINE),
        CodonData.getAminoAcid(AminoAcidNames.CYSTEINE),
        CodonData.getAminoAcid(AminoAcidNames.ALANINE),
        CodonData.getAminoAcid(AminoAcidNames.GLYCINE),
        CodonData.getAminoAcid(AminoAcidNames.PROLINE),
        CodonData.getAminoAcid(AminoAcidNames.THREONINE),
        CodonData.getAminoAcid(AminoAcidNames.SERINE),
        CodonData.getAminoAcid(AminoAcidNames.TYROSINE),
        CodonData.getAminoAcid(AminoAcidNames.TRYPTOPHAN),
        CodonData.getAminoAcid(AminoAcidNames.GLUTAMINE),
        CodonData.getAminoAcid(AminoAcidNames.ASPARAGINE),
        CodonData.getAminoAcid(AminoAcidNames.HISTIDINE),
        CodonData.getAminoAcid(AminoAcidNames.GLUTAMIC_ACID),
        CodonData.getAminoAcid(AminoAcidNames.ASPARTIC_ACID),
        CodonData.getAminoAcid(AminoAcidNames.LYSINE),
        CodonData.getAminoAcid(AminoAcidNames.ARGININE),
        CodonData.getAminoAcid(AminoAcidNames.STOP));
  }

  /**
   * Calls the other methods to output the results
   *
   * @category Output
   * @throws IOException
   * @throws InterruptedException
   */
  public void defaultCaller() throws IOException, InterruptedException {
    // Change the file to be analyzed here
    String dna = readFile("assets/dna/random/dnalong.fa");

    // Notifies user if DNA is invalid
    if (!isValidDNA(dna)) {
      throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
    }

    final String userAminoAcid = getAminoAcidInput();

    // Prevents an error from occurring when the user enters an RNA sequence.
    // Recently, using DNA sequences instead of RNA sequences has been a more common
    // practice. In RNA, uracil is replaced with thymine (U -> T).
    dna = dna.replace("u", "t");

    // Create a list of proteins found in the DNA
    final ArrayList<String> geneList = createProteinList(dna, userAminoAcid);

    // Output the proteins, GC content, and quantities of each nucleotide found in
    // the DNA
    final Properties p = new Properties();
    p.printProteinList(geneList, userAminoAcid);
    final double gcContent = p.getGCContent(dna);
    System.out.println("\nGC-content (genome): " + gcContent + "\n");
    p.printNucleotideCount(dna);

    // Output high coverage regions and the longest protein
    final ProteinAnalysis gi = new ProteinAnalysis();
    gi.printHighCoverageRegions(geneList);
    gi.printLongestProtein(geneList);
    System.out.println();

    // Output the number of codons based on the reading frame the user wants to look
    // at, and minimum and maximum filters
    final int READING_FRAME = 1;
    final int MIN_COUNT = 5;
    final int MAX_COUNT = 10;
    final ReadingFrames aap = new ReadingFrames(dna, READING_FRAME, MIN_COUNT, MAX_COUNT);
    aap.printCodonCounts();

    // Notifies the user if the DNA sequence is random.
    if (p.isRandomDNA(dna)) {
      System.out.println("\nWARNING: DNA sequence has been detected to be random.\n");
    }
  }
}
