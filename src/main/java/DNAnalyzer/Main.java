/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import com.plexpt.chatgpt.*;

import DNAnalyzer.ui.cli.CmdArgs;
import picocli.CommandLine;

/**
 * Main Class for the DNAnalyzer program.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 * @see <a href=
 *      "https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science">...</a>
 */
public class Main {

    /**
     * Clears the console screen based on the operating system.
     *
     * @throws InterruptedException Necessary for clearing the screen
     * @throws IOException          Necessary for clearing the screen
     *                              {@code @category} User Experience
     */
    public static void clearTerminal() throws InterruptedException, IOException {
        if (System.getProperty("os.name").contains("Windows")) { // if the os is Windows
            new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
        } else {
            System.out.print("\u001b[H\u001b[2J"); // unicode string to clear everything logged above this
            System.out.flush();
        }
    }

    /**
     * Main method for the DNAnalyzer program (run this).
     *
     * @param args Command line arguments
     *             {@code @category} Main
     * @throws IOException
     * @throws InterruptedException
     */
    public static void main(final String[] args) throws InterruptedException, IOException {
        // Clear the console screen
        clearTerminal();

        System.out.println(
                "Welcome to DNAnalyzer! Please allow up to 15 seconds for the analysis to complete (note: the time may vary based on your hardware).");

        String apiKey = System.getenv("OPENAI_API_KEY");
        if (apiKey == null) {
            clearTerminal();
            new CommandLine(new CmdArgs()).execute(args);
            System.out
                    .println("\n**Please set your OPENAI_API_KEY environment variable for an AI analysis of the DNA**");
            System.exit(1);
        } else {

            // Create a ByteArrayOutputStream to hold the console output
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintStream ps = new PrintStream(baos);

            // Save the old System.out
            PrintStream old = System.out;

            // Set the new System.out to the PrintStream
            System.setOut(ps);

            new CommandLine(new CmdArgs()).execute(args);

            // Restore the old System.out
            System.out.flush();
            System.setOut(old);

            // Get the captured console output as a string
            String output = baos.toString();

            // Do something with the captured output
            ChatGPT chatGPT = ChatGPT.builder()
                    .apiKey(apiKey)
                    .build()
                    .init();

            String res = chatGPT.chat(
                    "From the perspective of a biological researcher, I would like you to provide a comprehensive understanding of the DNA analysis that goes beyond the surface-level information. I expect you to use technical terms but make it meaningful and tangible enough that I can learn about the DNA. In one paragraph for each topic, please explain the results of this DNA analysis to me, assuming I am an experienced biotechnology researcher. It is crucial that you avoid stating that DNA cannot be analyzed and offer more in-depth insights into the analysis: "
                            + output + ". End by summarizing the results of the analysis.");

            System.out.println(output + "\n-----------------------\n\nAI Analysis:\n");
            System.out.println(res);
            System.exit(0);
        }
    }
}
