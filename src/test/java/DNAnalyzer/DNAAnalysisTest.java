/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package DNAnalyzer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.Test;

import DNAnalyzer.DNAAnalysis;

import static org.junit.jupiter.api.Assertions.*;

public class DNAAnalysisTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @Test
    public void testCountBasePairs() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            long[] expected = { 25000381, 24998528, 25000967, 25000124 };
            long[] actual = DNAAnalysis.countBasePairs(inputLines.get(0));
            assertArrayEquals(expected, actual);
        } catch (IOException ex) {
            Logger.getLogger(DNAAnalysisTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void testCountBasePairsWithEmptyString() {
        String testEmptyString = "";
        long[] expected = { 0, 0, 0, 0 };
        long[] actual = DNAAnalysis.countBasePairs(testEmptyString);
        assertArrayEquals(expected, actual);

    }

    @Test
    public void testCountBasePairsWithNullString() {
        long[] expected = { 0, 0, 0, 0 };
        long[] actual = DNAAnalysis.countBasePairs(null);
        assertArrayEquals(expected, actual);
    }
}
