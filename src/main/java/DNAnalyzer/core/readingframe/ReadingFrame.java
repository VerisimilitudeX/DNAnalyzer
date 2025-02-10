package DNAnalyzer.core.readingframe;

import java.util.List;
import java.util.Collections;

/**
 * Represents a reading frame in a DNA sequence.
 * A reading frame is one of three possible ways to read a DNA sequence as codons,
 * starting from different positions (0, 1, or 2).
 * 
 * References:
 * 1. Lewin, B. (2008). Genes IX. Jones & Bartlett Learning.
 * 2. Brown, T. A. (2002). Genomes 2nd edition. Oxford: Wiley-Liss.
 * 
 * @version 2.0
 * @since 1.0
 */
public class ReadingFrame {
    private final int offset;
    private final boolean forward;
    private final List<PotentialGene> genes;

    /**
     * Creates a new ReadingFrame instance.
     *
     * @param offset The offset (0, 1, or 2) of this reading frame
     * @param forward True if this is a forward reading frame, false if reverse
     * @param genes List of potential genes found in this reading frame
     * @throws IllegalArgumentException if offset is invalid or genes is null
     */
    public ReadingFrame(int offset, boolean forward, List<PotentialGene> genes) {
        validateParameters(offset, genes);
        this.offset = offset;
        this.forward = forward;
        this.genes = Collections.unmodifiableList(genes); // Immutable list for thread safety
    }

    /**
     * Validates the constructor parameters.
     *
     * @param offset The offset to validate
     * @param genes The genes list to validate
     * @throws IllegalArgumentException if parameters are invalid
     */
    private void validateParameters(int offset, List<PotentialGene> genes) {
        if (offset < 0 || offset > 2) {
            throw new IllegalArgumentException("Offset must be 0, 1, or 2");
        }
        if (genes == null) {
            throw new IllegalArgumentException("Genes list cannot be null");
        }
    }

    /**
     * Gets the offset of this reading frame.
     *
     * @return The offset (0, 1, or 2)
     */
    public int getOffset() {
        return offset;
    }

    /**
     * Checks if this is a forward reading frame.
     *
     * @return true if forward, false if reverse
     */
    public boolean isForward() {
        return forward;
    }

    /**
     * Gets the list of potential genes in this reading frame.
     *
     * @return An unmodifiable list of potential genes
     */
    public List<PotentialGene> getGenes() {
        return genes;
    }

    /**
     * Returns a string representation of this reading frame.
     *
     * @return A string describing this reading frame
     */
    @Override
    public String toString() {
        return String.format("ReadingFrame{offset=%d, direction=%s, genes=%d}",
            offset,
            forward ? "forward" : "reverse",
            genes.size()
        );
    }

    /**
     * Checks if this reading frame is equal to another object.
     *
     * @param obj The object to compare with
     * @return true if equal, false otherwise
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        ReadingFrame other = (ReadingFrame) obj;
        return offset == other.offset &&
               forward == other.forward &&
               genes.equals(other.genes);
    }

    /**
     * Generates a hash code for this reading frame.
     *
     * @return The hash code
     */
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + offset;
        result = 31 * result + (forward ? 1 : 0);
        result = 31 * result + genes.hashCode();
        return result;
    }
}