package DNAnalyzer;

import java.io.IOException;

/**
 * Main Class for the DNAnalyzer program (run this).
 * 
 * @author @Verisimilitude11 (Piyush Acharya)
 * @version 1.2.1
 */

public class Main {
    public static void clearTerminal() throws InterruptedException, IOException {
        // Clears the console screen depending on the user's OS
        if (System.getProperty("os.name").contains("Windows")) {
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } else {
            System.out.print("\u001b[H\u001b[2J");
            System.out.flush();
        }
    }

    public static void main(final String[] args) throws IOException, InterruptedException {
        clearTerminal();

        // Create a new instance of the dnaSequence and codonData classes and send the
        // information to the dnaSequencer's ds constructor.
        final CoreExecutor gs = new CoreExecutor();
        final CodonData cd = new CodonData();
        gs.getSequenceAndAminoAcid(cd);
    }
}
