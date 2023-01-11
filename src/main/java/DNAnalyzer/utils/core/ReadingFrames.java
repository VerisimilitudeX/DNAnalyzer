/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.utils.core;

import java.io.PrintStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import DNAnalyzer.data.codon.*;

/**
 * Reading frame data for the highest occurring codons.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class ReadingFrames {
    private final Map<String, Integer> codonCounts;
    private final CodonFrame codonFrame;

    /**
     * Constructor for the ReadingFrames class.
     *
     * @param codonFrame frame for codon data
     *                   {@code @category} Codon
     */
    public ReadingFrames(final CodonFrame codonFrame) {
        this.codonCounts = new HashMap<>();
        this.codonFrame = codonFrame;
    }

    /**
     * Get codon counts in the specified reading frame
     *
     * @param dna The DNA sequence
     *            {@code @category} Codon
     */
    private void buildCodonMap(final String dna) {
        // reset the hashmap
        codonCounts.clear();
        // loop over DNA in steps of 3 and store the codon and its corresponding count
        for (int i = codonFrame.getReadingFrame(); i < dna.length(); i += 3) {
            try {
                if (codonCounts.containsKey(dna.substring(i, i + 3))) {
                    codonCounts.put(dna.substring(i, i + 3), codonCounts.get(dna.substring(i, i + 3)) + 1);
                } else {
                    codonCounts.put(dna.substring(i, i + 3), 1);
                }
            } catch (final Exception e) {
                System.out.println(e);
            }
        }
    }

    /**
     * Method to filter through the codon counts found in the specified reading
     * frame based on the min
     * and max values
     *
     * @throws StringIndexOutOfBoundsException when string index is out of bounds of
     *                                         the map
     *                                         {@code @category} Codon
     */
    public void printCodonCounts(PrintStream out) throws StringIndexOutOfBoundsException {
        // Get codon counts for the dna in the specified reading frame
        buildCodonMap(codonFrame.getDna());

        // pretty print all the codon counts
        out.println(
            "Codons in reading frame " + codonFrame.getReadingFrame() + " (" + codonFrame.getMin() + "-"
                + codonFrame.getMax() + " occurrences)" + ":");
        out.println("----------------------------------------------------");
        for (final Entry<String, Integer> entry : codonCounts.entrySet()) {
            if (codonCounts.get(entry.getKey()) >= codonFrame.getMin()
                && codonCounts.get(entry.getKey()) <= codonFrame.getMax()) {
                out.println(entry.getKey().toUpperCase() + ": " + codonCounts.get(entry.getKey()));
            }
        }
    }
}
