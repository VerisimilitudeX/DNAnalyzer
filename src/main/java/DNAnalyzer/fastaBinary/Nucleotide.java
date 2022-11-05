/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.fastaBinary;

import java.util.HashMap;
import java.util.Map;

/**
 * Enum for different possible nucleotides in the FASTA format.
 *
 * @author Johan Novak (@ImpossibleReality)
 * @version 1.2.1
 */
public enum Nucleotide {
    A("a", 0),
    C("c", 1),
    G("g", 2),
    T("t", 3),
    R("r", 4),
    Y("y", 5),
    K("k", 6),
    M("m", 7),
    S("s", 8),
    W("w", 9),
    B("b", 10),
    D("d", 11),
    H("h", 12),
    V("v", 13),
    N("n", 14),
    GAP("-", 15);

    private final String fastaVal;
    private final int value;

    Nucleotide(String fastaVal, int value) {
        this.fastaVal = fastaVal;
        this.value = value;
    }

    /**
     * Returns the Integer value of the nucleotide.
     *
     * @return The Integer value of the nucleotide.
     */
    public int getValue() {
        return value;
    }

    /**
     * Returns the FASTA value of the nucleotide.
     *
     * @return The FASTA value of the nucleotide.
     */
    public String getFastaVal() {
        return fastaVal;
    }

    /**
     * Returns the nucleotide that corresponds to the given FASTA value.
     *
     * @param fastaVal The FASTA value of the nucleotide.
     * @return The nucleotide that corresponds to the given FASTA value.
     */
    public static Nucleotide fromFastaVal(String fastaVal) {
        for (Nucleotide nucleotide : Nucleotide.values()) {
            if (nucleotide.getFastaVal().equalsIgnoreCase(fastaVal)) {
                return nucleotide;
            }
        }
        return null;
    }

    /**
     * Returns Nucleotide associated with the given integer value.
     * @param val The integer value.
     * @return The Nucleotide associated with the given integer value.
     */
    public static Nucleotide fromInteger(int val) {
        for (Nucleotide nucleotide : Nucleotide.values()) {
            if (nucleotide.getValue() == val) {
                return nucleotide;
            }
        }
        return null;
    }
}
