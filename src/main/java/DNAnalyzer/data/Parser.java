package DNAnalyzer.data;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.util.zip.GZIPInputStream;

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
      try (BufferedReader rd = new BufferedReader(readerFor(file))) {
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
      try (BufferedReader br = new BufferedReader(readerFor(file))) {
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
   * Create a reader for FASTA/FASTQ files, handling optional gzip compression.
   */
  private static BufferedReader readerFor(File file) throws IOException {
      InputStream in = new FileInputStream(file);
      if (file.getName().endsWith(".gz")) {
          in = new GZIPInputStream(in);
      }
      return new BufferedReader(new InputStreamReader(in));
  }

  /**
   * Parses a file and returns the DNA sequence.
   *
   * @param file File to parse
   * @return DNA sequence
   * @throws IOException
   */
  public static String parseFile(File file) throws IOException {
    String name = file.getName();
    if (name.endsWith(".fa") || name.endsWith(".fa.gz") || name.endsWith(".fasta") || name.endsWith(".fasta.gz")) {
      return parseFasta(file);
    }
    if (name.endsWith(".fastq") || name.endsWith(".fastq.gz")) {
      return parseFastq(file);
    }

    return null; // Error handling, handle more types of files
  }
}
