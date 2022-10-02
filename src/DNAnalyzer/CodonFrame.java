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

import java.util.Objects;

/**
 * Declares the codon frame
 *
 * @author Shubham Jain (@shubhwip)
 * @version 1.2.1
 * @see "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables"
 */
public record CodonFrame(String dna, short readingFrame, int min, int max) {

    /**
     * gets dna
     * @return dna
     */
    public String getDna() {
        return dna;
    }

    /**
     * gets reading frame
     * @return reading frame
     */
    public short getReadingFrame() {
        return readingFrame;
    }

    /**
     * gets min
     * @return min
     */
    public int getMin() {
        return min;
    }

    /**
     * gets max
     * @return max
     */
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
