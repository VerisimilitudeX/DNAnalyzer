package DNAnalyzer.utils.core;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.ArrayList;

/**
 * FastQ class for the DNAnalyzer program.
 * 
 * @version 1.2.1
 * @see <a href=
 *      "https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science">Genomic
 *      Datasheet</a>
 */
public class FastQ {
    private String filename;
    // HashMap: key = sequence ([ATGC+]), value = quality sequence
    private HashMap<String, String> sequences;
    private ArrayList<Character> qualities;

    /**
     * Constructor for the FastQ class.
     * 
     * @param fname The filename of the FastQ file.
     */
    public FastQ(String fname) {
        filename = fname;
        sequences = new HashMap<String, String>();
        qualities = new ArrayList<Character>();
    }

    /**
     * Reads the FastQ file and stores the sequences and qualities in a HashMap.
     * 
     * @return The HashMap of sequences and qualities.
     * @throws IOException
     */
    public HashMap<String, String> readFastQ() throws IOException {
        // read in all the lines from the file and store in one string, and then iterate
        // over each line
        BufferedReader br = new BufferedReader(new FileReader(filename));
        String line = br.lines().collect(Collectors.joining("\n"));
        String[] lines = line.split("\n");
        for (int i = 0; i < lines.length; i += 4) {
            String sequence = lines[i + 1];
            String quality = lines[i + 3];
            sequences.put(sequence, quality);
            // put all the qualities into an arraylist
            for (char c : quality.toCharArray()) {
                qualities.add(c);
            }
        }
        br.close();
        return sequences;
    }

    /**
     * Calculates the average quality of the sequences.
     * 
     * @return The average quality of the sequences.
     */
    public char averageQuality() {
        // calculate the average quality of the sequences
        int total = 0;
        int sum = 0;
        for (char c : qualities) {
            sum += (int) c;
            total++;
        }
        return (char) (sum / total);
    }

    /**
     * Converts a character to a quality score.
     * 
     * @param c The character to convert.
     * @return The quality score.
     */
    public int phred33ToQ(char c) {
        // convert a character to a quality score
        return (int) c - 33;
    }

    /**
     * Converts a quality score to a character.
     * 
     * @param q The quality score to convert.
     * @return The character.
     */
    public char qToPhred33(int q) {
        // convert a quality score to a character
        return (char) (q + 33);
    }

    /**
     * Creates a histogram of the quality scores.
     * 
     * @return The histogram of the quality scores.
     */
    public int[] createHistogram() {
        int[] hist = new int[50];
        for (char phred : qualities) {
            int q = phred33ToQ(phred);
            if (!(q < 0 || q >= hist.length)) {
                hist[q]++;
            }
        }
        return hist;
    }
}
