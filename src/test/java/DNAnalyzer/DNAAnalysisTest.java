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

package DNAnalyzer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.jupiter.api.Test;

import DNAnalyzer.core.DNAAnalysis;

import static org.junit.jupiter.api.Assertions.*;

class DNAAnalysisTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @Test
    void testCountBasePairs() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            long[] expected = {25000381, 24998528, 25000967, 25000124};
            long[] actual = DNAAnalysis.countBasePairs(inputLines.get(0));
            assertArrayEquals(expected, actual);
        } catch (IOException ex) {
            Logger.getLogger(DNAAnalysisTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    void testCountBasePairsWithEmptyString() {
        String testEmptyString = "";
        long[] expected = {0, 0, 0, 0};
        long[] actual = DNAAnalysis.countBasePairs(testEmptyString);
        assertArrayEquals(expected, actual);

    }

    @Test
    void testCountBasePairsWithNullString() {
        long[] expected = {0, 0, 0, 0};
        long[] actual = DNAAnalysis.countBasePairs(null);
        assertArrayEquals(expected, actual);
    }
}
