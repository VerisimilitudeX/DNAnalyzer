package DNAnalyzer.data;

import DNAnalyzer.io.FormatSniffer;
import DNAnalyzer.io.FormatSniffer.FileFormat;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import org.biojava.nbio.core.sequence.DNASequence;
import org.biojava.nbio.core.sequence.io.GenbankReaderHelper;

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
      }
    }

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
   * Parses a VCF file and returns a concatenation of REF and ALT fields. Falls back to BioJava's
   * SequenceReader utilities if manual parsing fails.
   */
  private static String parseVcf(File file) throws IOException {
    StringBuilder dna = new StringBuilder();
    try (BufferedReader br = new BufferedReader(new FileReader(file))) {
      String line;
      while ((line = br.readLine()) != null) {
        if (line.startsWith("#")) {
          continue;
        }
        String[] parts = line.split("\t");
        if (parts.length >= 5) {
          dna.append(parts[3]).append(parts[4]);
        }
      }
    }
    if (dna.length() > 0) {
      return dna.toString().toLowerCase();
    }

    try {
      Map<String, DNASequence> sequences = GenbankReaderHelper.readGenbankDNASequence(file);
      StringBuilder sb = new StringBuilder();
      for (DNASequence seq : sequences.values()) {
        sb.append(seq.getSequenceAsString());
      }
      return sb.toString().toLowerCase();
    } catch (Exception e) {
      return null;
    }
  }

  /**
   * Parses a file and returns the DNA sequence.
   *
   * @param file File to parse
   * @return DNA sequence
   * @throws IOException
   */
  public static String parseFile(File file) throws IOException {
    FileFormat format = FormatSniffer.detect(file);
    switch (format) {
      case FASTA:
        return parseFasta(file);
      case FASTQ:
        return parseFastq(file);
      case VCF:
        return parseVcf(file);
      default:
        return null;
    }
  }
}
