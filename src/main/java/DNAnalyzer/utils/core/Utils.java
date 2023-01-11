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
     * Reads the contents of a file, stripping out newlines and converting
     * everything to lowercase.
     *
     * @param file the file to read
     * @return String with the contents of the file (newlines removed and converted
     * to lowercase)
     */
    public static String readFile(final File file) {
        try {
            return Files.readString(file.toPath()).replace("\n", "").toLowerCase();
        } catch (IOException e) {
            return null;
        }
    }
}
