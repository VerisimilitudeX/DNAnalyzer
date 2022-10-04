package DNAnalyzer;

import java.io.File;
import java.io.IOException;

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
  File dna;

  @Override
  public void run() {
    try {
      Main.clearTerminal();
      CoreExecutor.defaultCaller(this);
    } catch (IOException | InterruptedException e) {
      e.printStackTrace();
    }
  }
}
