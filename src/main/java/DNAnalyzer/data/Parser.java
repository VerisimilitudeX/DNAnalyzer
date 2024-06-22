package DNAnalyzer.data;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/**
 * Parser class for the DNAnalyzer program.
 *
 * @author Nishant Vikramaditya (@Nv7-GitHub)
 * @version 3.0.0-beta.0
 */
public class Parser {
  /**
   * Parses a FASTA file and returns the DNA sequence.
   *
   * @param file File to parse
   * @return DNA sequence
   * @throws IOException
   */
  private static String parseFasta(File file) throws IOException {
      StringBuilder dna;
      try (BufferedReader rd = new BufferedReader(new FileReader(file))) {
          dna = new StringBuilder();
          while (true) {
              String line = rd.readLine();
              if (line == null) break;
              
              // Extra info
              if (line.startsWith(">")) { // File descriptor
                  System.out.println("Reading DNA: " + line.substring(1).trim());
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
          } }

    return dna.toString();
  }

  /**
   * Parses a FASTQ file and returns the DNA sequence.
   *
   * @param file File to parse
   * @return DNA sequence
   * @throws IOException
   */
  private static String parseFastq(File file) throws IOException {
      String dna;
      // Read SEQ id
      try (BufferedReader br = new BufferedReader(new FileReader(file))) {
          // Read SEQ id
          System.out.println("Reading DNA: " + br.readLine().substring(1).trim());
          // Read DNA
          dna = br.readLine();
      }

    if (dna == null) {
      return "No DNA found";
    }

    return dna.toLowerCase();
  }

  /**
   * Parses a file and returns the DNA sequence.
   *
   * @param file File to parse
   * @return DNA sequence
   * @throws IOException
   */
  public static String parseFile(File file) throws IOException {
    if (file.getName()
        .endsWith(
            ".fa")) { // Regular FASTA file, this implementation only reads the first DNA sequence
      return parseFasta(file);
    }
    if (file.getName()
        .endsWith(".fastq")) { // Regular FASTA file, this implementation only reads the first DNA
      // sequence
      return parseFastq(file);
    }

    return null; // Error handling, handle more types of files
  }
}
