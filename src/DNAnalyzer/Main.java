package DNAnalyzer;

import java.io.IOException;

// Main Class
public class Main {
    public static void main(final String[] args) throws IOException, InterruptedException {

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        final GenomeSequencer gs = new GenomeSequencer();
        final CodonData cd = new CodonData();
        gs.getSequenceAndAminoAcid(cd);
    }
}
