package DNAnalyzer;

import java.io.IOException;

// Main Class
public class Main {
    public static void main(final String[] args) throws IOException, InterruptedException {
        CoreExecutor.clearTerminal();

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        final CoreExecutor gs = new CoreExecutor();
        final CodonData cd = new CodonData();
        gs.getSequenceAndAminoAcid(cd);
    }
}
