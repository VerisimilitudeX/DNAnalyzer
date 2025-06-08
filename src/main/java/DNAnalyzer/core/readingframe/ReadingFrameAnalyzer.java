package DNAnalyzer.core.readingframe;

import DNAnalyzer.utils.protein.CodonTranslator;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.regex.Pattern;
import org.springframework.stereotype.Component;

/**
 * Analyzes DNA sequences to identify potential reading frames and genes. This class implements
 * rigorous scientific methods for DNA sequence analysis, including statistical validation and error
 * checking.
 *
 * <p>References: 1. Watson, J. D., et al. (2008). Molecular Biology of the Gene, 6th Edition 2.
 * Mount, D. W. (2004). Bioinformatics: Sequence and Genome Analysis
 *
 * @version 2.0
 * @since 1.0
 */
@Component
public class ReadingFrameAnalyzer {
  private static final Logger LOGGER = Logger.getLogger(ReadingFrameAnalyzer.class.getName());

  // Scientific constants
  private static final double MIN_GC_CONTENT = 0.45; // 45% minimum GC content
  private static final double MAX_GC_CONTENT = 0.60; // 60% maximum GC content
  private static final int MIN_GENE_LENGTH = 300; // Minimum gene length in base pairs
  private static final Pattern DNA_SEQUENCE_PATTERN = Pattern.compile("^[ATCG]+$");

  private final PoissonCalculator poissonCalculator;

  public ReadingFrameAnalyzer(PoissonCalculator poissonCalculator) {
    this.poissonCalculator = poissonCalculator;
  }

  /**
   * Analyzes a DNA sequence to identify potential reading frames and genes. Implements rigorous
   * validation and statistical analysis.
   *
   * @param sequence The DNA sequence to analyze
   * @param minLength Minimum length for potential genes
   * @return List of identified reading frames
   * @throws IllegalArgumentException if sequence is invalid or parameters are out of range
   */
  public List<ReadingFrame> analyzeSequence(String sequence, int minLength) {
    validateInputParameters(sequence, minLength);
    LOGGER.info("Starting sequence analysis of length: " + sequence.length());

    List<ReadingFrame> readingFrames = new ArrayList<>();

    // Analyze in both forward and reverse directions
    analyzeDirection(sequence, minLength, true, readingFrames);
    analyzeDirection(sequence, minLength, false, readingFrames);

    LOGGER.info("Found " + readingFrames.size() + " potential reading frames");
    return readingFrames;
  }

  /**
   * Find open reading frames and translate them to amino acid sequences.
   *
   * @param sequence DNA sequence to analyze
   * @param minLength Minimum ORF length
   * @return List of open reading frames
   */
  public List<OpenReadingFrame> findOpenReadingFrames(String sequence, int minLength) {
    validateInputParameters(sequence, Math.max(minLength, MIN_GENE_LENGTH));
    List<OpenReadingFrame> orfs = new ArrayList<>();
    findOrfsDirection(sequence, minLength, true, orfs);
    findOrfsDirection(sequence, minLength, false, orfs);
    return orfs;
  }

  private void findOrfsDirection(
      String sequence, int minLength, boolean forward, List<OpenReadingFrame> orfs) {
    String working = forward ? sequence : reverseComplement(sequence);
    for (int frame = 0; frame < 3; frame++) {
      List<PotentialGene> genes = findPotentialGenes(working, frame, minLength);
      for (PotentialGene gene : genes) {
        String orfSeq = working.substring(gene.getStartPosition(), gene.getEndPosition());
        String aaSeq = CodonTranslator.translate(orfSeq);
        orfs.add(
            new OpenReadingFrame(
                gene.getStartPosition(), gene.getEndPosition(), forward, frame, orfSeq, aaSeq));
      }
    }
  }

  /**
   * Validates input parameters against scientific criteria.
   *
   * @param sequence DNA sequence to validate
   * @param minLength Minimum length parameter to validate
   * @throws IllegalArgumentException if parameters don't meet criteria
   */
  private void validateInputParameters(String sequence, int minLength) {
    if (sequence == null || sequence.isEmpty()) {
      throw new IllegalArgumentException("DNA sequence cannot be null or empty");
    }

    if (!DNA_SEQUENCE_PATTERN.matcher(sequence).matches()) {
      throw new IllegalArgumentException("Invalid DNA sequence: must contain only A, T, C, G");
    }

    if (minLength < MIN_GENE_LENGTH) {
      throw new IllegalArgumentException(
          "Minimum length must be at least " + MIN_GENE_LENGTH + " base pairs");
    }

    double gcContent = calculateGCContent(sequence);
    if (gcContent < MIN_GC_CONTENT || gcContent > MAX_GC_CONTENT) {
      LOGGER.warning("GC content (" + gcContent + ") is outside optimal range");
    }
  }

  /**
   * Calculates GC content of a DNA sequence.
   *
   * @param sequence DNA sequence
   * @return GC content as a ratio
   */
  private double calculateGCContent(String sequence) {
    long gcCount = sequence.chars().filter(ch -> ch == 'G' || ch == 'C').count();
    return (double) gcCount / sequence.length();
  }

  /**
   * Analyzes sequence in a specific direction to identify reading frames.
   *
   * @param sequence DNA sequence
   * @param minLength Minimum length criteria
   * @param forward Direction of analysis
   * @param readingFrames List to store found reading frames
   */
  private void analyzeDirection(
      String sequence, int minLength, boolean forward, List<ReadingFrame> readingFrames) {
    String workingSequence = forward ? sequence : reverseComplement(sequence);

    for (int frame = 0; frame < 3; frame++) {
      List<PotentialGene> genes = findPotentialGenes(workingSequence, frame, minLength);
      if (!genes.isEmpty()) {
        ReadingFrame readingFrame = new ReadingFrame(frame, forward, genes);
        readingFrames.add(readingFrame);
      }
    }
  }

  /**
   * Finds potential genes in a given reading frame.
   *
   * @param sequence DNA sequence
   * @param frame Reading frame offset
   * @param minLength Minimum gene length
   * @return List of potential genes
   */
  private List<PotentialGene> findPotentialGenes(String sequence, int frame, int minLength) {
    List<PotentialGene> genes = new ArrayList<>();
    int start = frame;

    while (start + 2 < sequence.length()) {
      if (isStartCodon(sequence.substring(start, start + 3))) {
        int end = findStopCodon(sequence, start + 3);
        if (end != -1 && (end - start) >= minLength) {
          double significance = poissonCalculator.calculateSignificance(end - start);
          if (significance > 0.95) { // 95% confidence threshold
            genes.add(new PotentialGene(start, end, significance));
          }
        }
      }
      start += 3;
    }

    return genes;
  }

  /** Checks if a codon is a start codon (ATG). */
  private boolean isStartCodon(String codon) {
    return codon.equals("ATG");
  }

  /**
   * Finds the next stop codon in the sequence.
   *
   * @param sequence DNA sequence
   * @param start Starting position
   * @return Position of stop codon or -1 if not found
   */
  private int findStopCodon(String sequence, int start) {
    for (int i = start; i < sequence.length() - 2; i += 3) {
      String codon = sequence.substring(i, i + 3);
      if (codon.equals("TAA") || codon.equals("TAG") || codon.equals("TGA")) {
        return i + 3;
      }
    }
    return -1;
  }

  /**
   * Generates the reverse complement of a DNA sequence.
   *
   * @param sequence DNA sequence
   * @return Reverse complement sequence
   */
  private String reverseComplement(String sequence) {
    StringBuilder complement = new StringBuilder();
    for (int i = sequence.length() - 1; i >= 0; i--) {
      complement.append(complementBase(sequence.charAt(i)));
    }
    return complement.toString();
  }

  /** Returns the complement of a DNA base. */
  private char complementBase(char base) {
    switch (base) {
      case 'A':
        return 'T';
      case 'T':
        return 'A';
      case 'C':
        return 'G';
      case 'G':
        return 'C';
      default:
        throw new IllegalArgumentException("Invalid DNA base: " + base);
    }
  }
}
