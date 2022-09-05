package DNAnalyzer;

import java.io.IOException;

/**
 * Main Class for the DNAnalyzer program.
 * 
 * @see https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 */
public class Main {

    /**
     * Clears the console screen based on the operating system.
     * 
     * @category User Experience
     * @throws InterruptedException
     * @throws IOException
     */
    public static void clearTerminal() throws InterruptedException, IOException {
        if (System.getProperty("os.name").contains("Windows")) {
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } else {
            System.out.print("\u001b[H\u001b[2J");
            System.out.flush();
        }
    }

    /**
     * Main method for the DNAnalyzer program (run this).
     * 
     * @param args Command line arguments
     * @category Main
     * @throws IOException
     * @throws InterruptedException
     */
    public static void main(final String[] args) throws IOException, InterruptedException {
        clearTerminal();

        final CoreExecutor gs = new CoreExecutor();
        final CodonData cd = new CodonData();
        gs.defaultCaller(cd);
    }
}
