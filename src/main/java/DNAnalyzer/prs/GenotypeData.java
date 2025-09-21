package DNAnalyzer.prs;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

/**
 * In-memory representation of a genotype dataset such as the one exported by 23andMe.
 * <p>
 * The parser is intentionally lightweight so that it can run inside the CLI without any
 * additional dependencies. The format expected is the standard tab-delimited 23andMe export
 * (with comment lines beginning with {@code #} followed by the header
 * {@code rsid\tchromosome\tposition\tgenotype}).
 */
public final class GenotypeData {

    private final Map<String, GenotypeRecord> records;

    private GenotypeData(Map<String, GenotypeRecord> records) {
        this.records = records;
    }

    /**
     * Parse a 23andMe text export.
     *
     * @param path path to the genotype file
     * @return parsed genotype data
     * @throws IOException when the file is missing or contains malformed content
     */
    public static GenotypeData from23AndMe(Path path) throws IOException {
        if (!Files.exists(path)) {
            throw new IOException("Genotype file not found: " + path);
        }

        Map<String, GenotypeRecord> map = new HashMap<>();

        int lineNumber = 0;
        for (String rawLine : Files.readAllLines(path, StandardCharsets.UTF_8)) {
            lineNumber++;
            String line = rawLine.trim();
            if (line.isEmpty() || line.startsWith("#")) {
                continue;
            }

            String[] tokens = line.split("\\s+");
            if (tokens.length < 4) {
                throw new IOException("Malformed genotype line " + lineNumber + " in " + path);
            }

            String rsid = tokens[0].trim();
            String chromosome = tokens[1].trim();
            String position = tokens[2].trim();
            String genotype = tokens[3].trim();

            if ("rsid".equalsIgnoreCase(rsid) && "chromosome".equalsIgnoreCase(chromosome)) {
                // Header row
                continue;
            }

            if (rsid.isEmpty()) {
                continue;
            }

            GenotypeRecord record = new GenotypeRecord(
                    rsid,
                    chromosome,
                    position,
                    normaliseGenotype(genotype)
            );

            map.put(rsid, record);
        }

        if (map.isEmpty()) {
            throw new IOException("Genotype file contained no variant calls: " + path);
        }

        return new GenotypeData(Collections.unmodifiableMap(map));
    }

    private static String normaliseGenotype(String rawGenotype) {
        String cleaned = rawGenotype.replaceAll("[^A-Za-z-]", "").toUpperCase(Locale.US);
        if (cleaned.isEmpty()) {
            return "--";
        }
        return cleaned;
    }

    /**
     * Retrieve the genotype record for a given rsID.
     *
     * @param rsid variant identifier
     * @return optional genotype record
     */
    public Optional<GenotypeRecord> get(String rsid) {
        return Optional.ofNullable(records.get(rsid));
    }

    public Map<String, GenotypeRecord> records() {
        return records;
    }

    /**
     * Represents a single SNP call from the genotype file.
     */
    public static final class GenotypeRecord {
        private final String rsid;
        private final String chromosome;
        private final String position;
        private final String genotype;

        public GenotypeRecord(String rsid, String chromosome, String position, String genotype) {
            this.rsid = rsid;
            this.chromosome = chromosome;
            this.position = position;
            this.genotype = genotype;
        }

        public String rsid() {
            return rsid;
        }

        public String chromosome() {
            return chromosome;
        }

        public String position() {
            return position;
        }

        public String genotype() {
            return genotype;
        }

        /**
         * Count how many copies of the requested allele are present in the genotype.
         * The risk allele is expected to be a single nucleotide (A/C/G/T) or a
         * two-character string representing the full genotype (e.g. {@code AG}).
         *
         * @param riskAllele allele to count
         * @return allele dosage (0, 1, 2) or -1 when the genotype cannot be interpreted
         */
        public int countAllele(String riskAllele) {
            if (genotype.equals("--")) {
                return -1;
            }

            String upperAllele = riskAllele.toUpperCase(Locale.US);

            if (upperAllele.length() == 1) {
                char allele = upperAllele.charAt(0);
                int count = 0;
                for (char base : genotype.toCharArray()) {
                    if (base == allele) {
                        count++;
                    }
                }
                return count;
            }

            if (upperAllele.length() == 2) {
                char first = upperAllele.charAt(0);
                char second = upperAllele.charAt(1);
                if (genotype.length() != 2) {
                    return -1;
                }
                char g0 = genotype.charAt(0);
                char g1 = genotype.charAt(1);
                if ((g0 == first && g1 == second) || (g0 == second && g1 == first)) {
                    return 2;
                }
                if (g0 == first || g0 == second || g1 == first || g1 == second) {
                    return 1;
                }
                return 0;
            }

            return -1;
        }
    }
}
