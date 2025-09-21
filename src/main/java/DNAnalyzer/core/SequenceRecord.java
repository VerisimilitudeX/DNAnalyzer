package DNAnalyzer.core;

import java.util.Objects;

/** Simple immutable representation of a DNA/RNA sequence record. */
public final class SequenceRecord {
    private final String id;
    private final String sequence;
    private final String qualityScores;

    public SequenceRecord(String id, String sequence, String qualityScores) {
        this.id = id == null ? "unknown" : id.trim();
        this.sequence = normalize(sequence);
        this.qualityScores = qualityScores;
    }

    private static String normalize(String sequence) {
        Objects.requireNonNull(sequence, "sequence");
        return sequence.replaceAll("\\s+", "").toUpperCase();
    }

    public String id() {
        return id;
    }

    public String sequence() {
        return sequence;
    }

    public String qualityScores() {
        return qualityScores;
    }

    public int length() {
        return sequence.length();
    }
}
