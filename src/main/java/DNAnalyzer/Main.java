package DNAnalyzer;

import java.io.IOException;

import org.springframework.boot.SpringApplication;

import DNAnalyzer.utils.ai.PathRouter;
import DNAnalyzer.utils.core.Utils;

/**
 * Main Class for the DNAnalyzer program.
 *
 * @author Piyush Acharya (@VerisimilitudeX)
 * @version 1.2.1
 * @see <a href= "https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science">Genomic
 *     Datasheet</a>
 */
public class Main {

    /**
     * Main method for the DNAnalyzer program.
     *
     * @param args Command line arguments
     * @throws IOException
     * @throws InterruptedException
     */
    public static void main(final String[] args) throws InterruptedException, IOException {
        // If no arguments provided, start in web server mode
        if (args.length == 0) {
            System.out.println("Starting DNAnalyzer in web server mode...");
            SpringApplication.run(DNAnalyzerApplication.class, args);
            return;
        }

        // Otherwise, run in CLI mode
        String apiKey = System.getenv("OPENAI_API_KEY");
        Utils.clearTerminal();
        if (apiKey == null) {
            PathRouter.regular(args);
        } else {
            PathRouter.runGptAnalysis(args, apiKey);
        }
    }
}
