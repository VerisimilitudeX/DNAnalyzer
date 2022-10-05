package DNAnalyzer;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import picocli.CommandLine.Command;
import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

@Command(name="DNAnalyzer", mixinStandardHelpOptions = true, description = "A program to analyze DNA sequences.")
public class CmdArgs implements Runnable {
  @Option(required=true, names = {"--amino"}, description = "The amino acid representing the start of a gene.")
  String aminoAcid;

  @Option(names = {"--min"}, description = "The minimum count of the reading frame.")
  int minCount = 0;

  @Option(names = {"--max"}, description = "The maximum count of the reading frame.")
  int maxCount = 0;

  @Parameters(paramLabel = "DNA", description = "The FASTA file to be analyzed.") 
  File dnaFile;

  String readFile(File file) throws IOException {
    return Files.readString(file.toPath()).replace("\n", "").toLowerCase();
  }

  @Override
  public void run() {
    String dna = "";
    try {
      Main.clearTerminal();
      dna = readFile(dnaFile);
    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
      return;
    }

    // Valid DNA?
    if (!dna.matches("[atgc]+")) {
      throw new IllegalArgumentException("Invalid characters present in DNA sequence.");
    }

    // Replace Uracil with Thymine (in case user entered RNA and not DNA)
    dna = dna.replace("u", "t");

    // Create protein list
    ProteinFinder gfp = new ProteinFinder();
    List<String> proteins = gfp.getProtein(dna, aminoAcid);


    // Output the proteins, GC content, and nucleotide cnt found in the DNA
    Properties.printProteinList(proteins, aminoAcid);
    final float gcContent = Properties.getGCContent(dna);
    System.out.println("\nGC-content (genome): " + gcContent + "\n");
    Properties.printNucleotideCount(dna);

    // Output the number of codons based on the reading frame the user wants to look at, and minimum and maximum filters
    final short READING_FRAME = 1;
    final ReadingFrames aap = new ReadingFrames(new CodonFrame(dna, READING_FRAME, minCount, maxCount));
    aap.printCodonCounts();
  }
}
