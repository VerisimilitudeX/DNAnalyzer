/*
 * Copyright © 2022 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer;

import java.io.IOException;

import DNAnalyzer.gui.DNAnalyzerGUI;
import picocli.CommandLine;

/**
 * Main Class for the DNAnalyzer program.
 *
 * @author Piyush Acharya (@Verisimilitude11)
 * @version 1.2.1
 * @see https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science
 */
public class Main {

    /**
     * Clears the console screen based on the operating system.
     *
     * @throws InterruptedException
     * @throws IOException
     * @category User Experience
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
     * @throws IOException
     * @throws InterruptedException
     * @category Main
     */
    public static void main(final String[] args) throws IOException, InterruptedException {
        new CommandLine(new CmdArgs()).execute(args);
    }
}
