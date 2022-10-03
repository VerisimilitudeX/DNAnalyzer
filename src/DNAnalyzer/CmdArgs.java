package DNAnalyzer;

import java.io.File;

import picocli.CommandLine.Option;
import picocli.CommandLine.Parameters;

public class CmdArgs {
  @Option(required=true, names = {"--amino"}, description = "The amino acid representing the start of a gene.")
  String aminoAcid;

  @Option(defaultValue = "0", names = {"--min"}, description = "The minimum count of the reading frame.")
  int minCount;

  @Option(defaultValue = "0", names = {"--max"}, description = "The maximum count of the reading frame.")
  int maxCount;

  @Parameters(paramLabel = "DNA", description = "The FASTA file to be analyzed.") 
  File dna;
}
