/*
 * Copyright © 2024 Piyush Acharya. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer.utils.core;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * Utility class for DNAnalyzer
 *
 * @author David
 */
public class Utils {
  /**
   * Reads the contents of a file, stripping out newlines and converting everything to lowercase.
   *
   * @param file the file to read
   * @return String with the contents of the file (newlines removed and converted to lowercase)
   */
  public static String readFile(final File file) {
    try {
      return Files.readString(file.toPath()).replace("\n", "").replace("\r", "").toLowerCase();
    } catch (IOException e) {
      return null;
    }
  }

  /**
   * Clears the console screen based on the operating system.
   *
   * @throws InterruptedException Necessary for clearing the screen
   * @throws IOException Necessary for clearing the screen {@code @category} User Experience
   */
  public static void clearTerminal() throws InterruptedException, IOException {
    if (System.getProperty("os.name").contains("Windows")) { // if the os is Windows
      new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
    } else {
      System.out.print("\u001b[H\u001b[2J"); // unicode string to clear everything logged above this
      System.out.flush();
    }
  }
}
