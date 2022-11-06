package DNAnalyzer;

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
