/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package test.java.DNAnalyzer;

import DNAnalyzer.DnaAnalyzer;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DnaAnalyzerTest {

    Path testFile = Path.of("C:\\Users\\garyg\\Documents\\projects\\DNAnalyzer\\assets\\dna\\random\\dnalong.fa");
    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @Test
    public void testCountBasePairsStream() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            long[] expected = {25000381, 24998528, 25000967, 25000124};

            Instant start = Instant.now();
            long[] actual = DnaAnalyzer.countBasePairsStream(inputLines.get(0));
            Instant finish = Instant.now();
            long timeElapsed = Duration.between(start, finish).toMillis();
            //System.out.println("Stream:");
            System.out.println("Stream:" + timeElapsed
                    + " milliseconds to run");
            //System.out.println("Stream: inputLines length = " + inputLines.size());
            //System.out.println("Stream:" + Arrays.toString(expected));
            //System.out.println("Stream:" + Arrays.toString(actual));
            assertArrayEquals(expected, actual);
        } catch (IOException ex) {
            Logger.getLogger(DnaAnalyzerTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Test
    public void testCountBasePairs() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            long[] expected = {25000381, 24998528, 25000967, 25000124};

            Instant start = Instant.now();
            long[] actual = DnaAnalyzer.countBasePairs(inputLines.get(0));
            Instant finish = Instant.now();
            long timeElapsed = Duration.between(start, finish).toMillis();
            //System.out.println("Array:");
            System.out.println("Array:" + timeElapsed + " milliseconds to run");
            //System.out.println("Array: inputLines length = " + inputLines.size());
            //System.out.println("Array:" + Arrays.toString(expected));
            //System.out.println("Array:" + Arrays.toString(actual));
            assertArrayEquals(expected, actual);
        } catch (IOException ex) {
            Logger.getLogger(DnaAnalyzerTest.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
