package DNAnalyzer;

import java.util.Objects;

public class CodonFrame {
    private final String dna;
    private final short readingFrame;
    private final int min;
    private final int max;

    public CodonFrame(String dna, short readingFrame, int min, int max) {
        this.dna = dna;
        this.readingFrame = readingFrame;
        this.min = min;
        this.max = max;
    }

    public String getDna() {
        return dna;
    }

    public short getReadingFrame() {
        return readingFrame;
    }

    public int getMin() {
        return min;
    }

    public int getMax() {
        return max;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CodonFrame)) return false;
        CodonFrame that = (CodonFrame) o;
        return getReadingFrame() == that.getReadingFrame() && getMin() == that.getMin() && getMax() == that.getMax() && getDna().equals(that.getDna());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getDna(), getReadingFrame(), getMin(), getMax());
    }
}
