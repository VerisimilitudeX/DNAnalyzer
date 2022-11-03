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
import static org.junit.jupiter.api.Assertions.*;

public class DNAnalyzerTest {

    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @Test
    public void testCountBasePairs() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            long[] expected = { 25000381, 24998528, 25000967, 25000124 };
            long[] actual = DNAnalysis.countBasePairs(inputLines.get(0));
            assertArrayEquals(expected, actual);
        } catch (IOException ex) {
            Logger.getLogger(DNAnalyzerTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void testCountBasePairsWithEmptyString() {
        String testEmptyString = "";
        long[] expected = { 0, 0, 0, 0 };
        long[] actual = DNAnalysis.countBasePairs(testEmptyString);
        assertArrayEquals(expected, actual);

    }

    @Test
    public void testCountBasePairsWithNullString() {
        String testNullString = null;
        long[] expected = { 0, 0, 0, 0 };
        long[] actual = DNAnalysis.countBasePairs(testNullString);
        assertArrayEquals(expected, actual);
    }
}
