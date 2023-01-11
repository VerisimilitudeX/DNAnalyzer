package DNAnalyzer.utils.core;

import DNAnalyzer.data.codon.CodonFrame;
import org.junit.jupiter.api.BeforeEach;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

class ReadingFramesTest {

    ReadingFrames readingFrames;
    Path projectPath = Path.of("");
    Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

    @BeforeEach
    void setUp() {
        try {
            List<String> inputLines = Files.readAllLines(dnaLongTestInput);
            readingFrames = new ReadingFrames(new CodonFrame(inputLines.get(0), (short) 1, 2, 100));

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}