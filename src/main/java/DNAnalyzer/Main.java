package DNAnalyzer;

import DNAnalyzer.cli.AnalysisCommand;
import picocli.CommandLine;

public final class Main {
    private Main() {
    }

    public static void main(String[] args) {
        int exitCode = new CommandLine(new AnalysisCommand()).execute(args);
        if (exitCode != 0) {
            System.exit(exitCode);
        }
    }
}
