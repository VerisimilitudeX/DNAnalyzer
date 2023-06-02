package DNAnalyzer.data;

import DNAnalyzer.utils.core.Utils;

import java.io.*;

/**
 * Parser class for the DNAnalyzer program.
 * 
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 3.0.0-beta.0
 * 
 */
public class Parser {

    /**
     * Parses a file and returns the DNA sequence.
     * 
     * @param file File to parse
     * @return DNA sequence
     * @throws IOException
     */
    public static String parseFile(File file) throws IOException {
        if (file.getName().endsWith(".fa")) { // Regular FASTA file, this implementation only reads the first DNA sequence
            BufferedReader rd = new BufferedReader(new FileReader(file));
            StringBuilder dna = new StringBuilder();
            while (true) {
                String line = rd.readLine();
                if (line == null) break;

                // Extra info
                if (line.startsWith(">")) { // File descriptor
                    System.out.println("Reading DNA: " + line.replace(">", "").trim());
                    continue;
                }
                if (line.startsWith(";")) { // Comment
                    continue;
                }

                // Read file
                boolean stop = false;
                if (line.endsWith("*")) {
                    line = line.replace("*", "");
                    stop = true;
                }
                line = line.toLowerCase();
                dna.append(line);
                if (stop) break;
            }

            rd.close();
            return dna.toString();
        }

        return null; // TODO: Error handling, handle more types of files
    }
}
