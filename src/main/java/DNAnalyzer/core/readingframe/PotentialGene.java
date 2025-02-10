package DNAnalyzer.core.readingframe;

/**
 * Represents a potential gene identified in a DNA sequence. This class encapsulates information
 * about a gene's location and statistical significance.
 *
 * <p>References: 1. Alberts, B., et al. (2014). Molecular Biology of the Cell, 6th Edition 2.
 * Pevzner, P. A. (2000). Computational Molecular Biology: An Algorithmic Approach
 *
 * @version 2.0
 * @since 1.0
 */
public class PotentialGene {
  private final int startPosition;
  private final int endPosition;
  private final double significance;

  /**
   * Creates a new PotentialGene instance.
   *
   * @param startPosition The starting position of the gene in the sequence
   * @param endPosition The ending position of the gene in the sequence
   * @param significance The statistical significance of this gene prediction
   * @throws IllegalArgumentException if positions are invalid or significance is out of range
   */
  public PotentialGene(int startPosition, int endPosition, double significance) {
    validateParameters(startPosition, endPosition, significance);
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.significance = significance;
  }

  /**
   * Validates the constructor parameters.
   *
   * @param startPosition The start position to validate
   * @param endPosition The end position to validate
   * @param significance The significance value to validate
   * @throws IllegalArgumentException if parameters are invalid
   */
  private void validateParameters(int startPosition, int endPosition, double significance) {
    if (startPosition < 0) {
      throw new IllegalArgumentException("Start position cannot be negative");
    }
    if (endPosition <= startPosition) {
      throw new IllegalArgumentException("End position must be greater than start position");
    }
    if (significance < 0.0 || significance > 1.0) {
      throw new IllegalArgumentException("Significance must be between 0 and 1");
    }
  }

  /**
   * Gets the start position of this potential gene.
   *
   * @return The start position
   */
  public int getStartPosition() {
    return startPosition;
  }

  /**
   * Gets the end position of this potential gene.
   *
   * @return The end position
   */
  public int getEndPosition() {
    return endPosition;
  }

  /**
   * Gets the statistical significance of this gene prediction.
   *
   * @return The significance value between 0 and 1
   */
  public double getSignificance() {
    return significance;
  }

  /**
   * Gets the length of this potential gene.
   *
   * @return The length in base pairs
   */
  public int getLength() {
    return endPosition - startPosition;
  }

  /**
   * Returns a string representation of this potential gene.
   *
   * @return A string describing this potential gene
   */
  @Override
  public String toString() {
    return String.format(
        "PotentialGene{start=%d, end=%d, length=%d, significance=%.3f}",
        startPosition, endPosition, getLength(), significance);
  }

  /**
   * Checks if this potential gene is equal to another object.
   *
   * @param obj The object to compare with
   * @return true if equal, false otherwise
   */
  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;

    PotentialGene other = (PotentialGene) obj;
    return startPosition == other.startPosition
        && endPosition == other.endPosition
        && Double.compare(significance, other.significance) == 0;
  }

  /**
   * Generates a hash code for this potential gene.
   *
   * @return The hash code
   */
  @Override
  public int hashCode() {
    int result = 17;
    result = 31 * result + startPosition;
    result = 31 * result + endPosition;
    long significanceBits = Double.doubleToLongBits(significance);
    result = 31 * result + (int) (significanceBits ^ (significanceBits >>> 32));
    return result;
  }
}
