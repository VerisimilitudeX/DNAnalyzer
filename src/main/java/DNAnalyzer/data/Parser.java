package DNAnalyzer.data;

import java.io.*;

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
    BufferedReader rd = new BufferedReader(new FileReader(file));
    StringBuilder dna = new StringBuilder();
    while (true) {
      String line = rd.readLine();
      if (line == null)
        break;

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
      if (stop)
        break;
    }

    rd.close();

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
    BufferedReader br = new BufferedReader(new FileReader(file));

    // Read SEQ id
    System.out.println("Reading DNA: " + br.readLine().substring(1).trim());

    // Read DNA
    String dna = br.readLine();
    br.close();

    if (dna == null) {
      return "No DNA found";
    }

    // TODO: Read field 3 (just a "+"), and then parse the quality data in Field 4
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

    return null; // TODO: Error handling, handle more types of files
  }
}
