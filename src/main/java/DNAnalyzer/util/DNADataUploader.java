package DNAnalyzer.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;

/**
 * Utility loader for consumer genotyping text exports such as 23andMe reports.
 * The parser keeps all data local on disk to preserve the privacy guarantees
 * highlighted in the documentation.
 */
public final class DNADataUploader {

    private DNADataUploader() {
        // Utility class
    }

    /**
     * Parses a 23andMe-style text export and returns a SNP-to-genotype map.
     * Lines beginning with {@code #} are ignored, as are markers without calls
     * ("--"). The resulting map preserves file order for deterministic output.
     *
     * @param file path to the 23andMe text export
     * @return immutable map keyed by rsid (e.g., rs1426654) with uppercase genotypes
     * @throws IOException if the file cannot be read
     */
    public static Map<String, String> uploadFrom23AndMe(Path file) throws IOException {
        if (file == null) {
            throw new IllegalArgumentException("file must not be null");
        }
        try (BufferedReader reader = Files.newBufferedReader(file, StandardCharsets.UTF_8)) {
            return parseGenotypeFile(reader);
        }
    }

    /**
     * Convenience overload accepting a string path to the genotype file.
     */
    public static Map<String, String> uploadFrom23AndMe(String file) throws IOException {
        if (file == null) {
            throw new IllegalArgumentException("file must not be null");
        }
        return uploadFrom23AndMe(Paths.get(file));
    }

    /**
     * AncestryDNA exports share the same column structure (rsid, chromosome,
     * position, genotype). Delegate to the 23andMe parser so developers can use
     * the method advertised in the README without duplicating logic.
     */
    public static Map<String, String> uploadFromAncestryDNA(Path file) throws IOException {
        return uploadFrom23AndMe(file);
    }

    private static Map<String, String> parseGenotypeFile(Reader input) throws IOException {
        Map<String, String> genotypes = new LinkedHashMap<>();
        String line;
        try (BufferedReader reader = toBuffered(input)) {
            while ((line = reader.readLine()) != null) {
                String trimmed = line.trim();
                if (trimmed.isEmpty() || trimmed.charAt(0) == '#') {
                    continue;
                }
                String[] tokens = trimmed.split("\t");
                if (tokens.length < 4) {
                    // Some vendors use spaces instead of tabs; retry with whitespace split.
                    tokens = trimmed.split("\\s+");
                }
                if (tokens.length < 4) {
                    continue;
                }
                String rsid = tokens[0].trim();
                String genotype = tokens[3].trim();
                if (rsid.isEmpty() || genotype.isEmpty() || "--".equals(genotype)) {
                    continue;
                }
                genotypes.put(rsid, genotype.toUpperCase(Locale.ROOT));
            }
        }
        return Collections.unmodifiableMap(genotypes);
    }

    private static BufferedReader toBuffered(Reader reader) {
        return reader instanceof BufferedReader ? (BufferedReader) reader : new BufferedReader(reader);
    }
}
