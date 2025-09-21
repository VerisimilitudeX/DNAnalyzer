package DNAnalyzer.analysis;

import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * Performs core sequence analytics used by the CLI.
 */
public final class SequenceAnalyzer {
    private static final Set<Character> VALID_BASES = Set.of('A', 'C', 'G', 'T', 'N');
    private static final Set<String> STOP_CODONS = Set.of("TAA", "TAG", "TGA");

    private final String sequence;

    public SequenceAnalyzer(String sequence) {
        this.sequence = sequence.toUpperCase(Locale.ROOT);
    }

    public int length() {
        return sequence.length();
    }

    public double gcContent() {
        if (sequence.isEmpty()) {
            return 0.0;
        }
        long gc = sequence.chars()
                .filter(ch -> ch == 'G' || ch == 'C')
                .count();
        return (double) gc / sequence.length();
    }

    public Map<Character, Long> nucleotideCounts() {
        Map<Character, Long> counts = new HashMap<>();
        for (char base : sequence.toCharArray()) {
            char normalized = VALID_BASES.contains(base) ? base : 'N';
            counts.merge(normalized, 1L, Long::sum);
        }
        for (char base : VALID_BASES) {
            counts.putIfAbsent(base, 0L);
        }
        return counts;
    }

    public List<GCWindow> highGcRegions(int window, double threshold) {
        if (window <= 0 || sequence.length() < window) {
            return Collections.emptyList();
        }
        List<GCWindow> regions = new ArrayList<>();
        int gcCount = 0;
        char[] chars = sequence.toCharArray();

        for (int i = 0; i < window; i++) {
            if (chars[i] == 'G' || chars[i] == 'C') {
                gcCount++;
            }
        }
        addGcWindowIfHigh(regions, 0, window, gcCount, window, threshold);

        for (int i = window; i < chars.length; i++) {
            if (chars[i - window] == 'G' || chars[i - window] == 'C') {
                gcCount--;
            }
            if (chars[i] == 'G' || chars[i] == 'C') {
                gcCount++;
            }
            addGcWindowIfHigh(regions, i - window + 1, i + 1, gcCount, window, threshold);
        }
        return regions;
    }

    private void addGcWindowIfHigh(List<GCWindow> regions, int start, int end, int gcCount,
            int windowSize, double threshold) {
        double gc = (double) gcCount / windowSize;
        if (gc >= threshold) {
            regions.add(new GCWindow(start, end, gc));
        }
    }

    public List<OpenReadingFrame> findOpenReadingFrames(int minLength) {
        List<OpenReadingFrame> orfs = new ArrayList<>();
        char[] chars = sequence.toCharArray();

        for (int frame = 0; frame < 3; frame++) {
            int i = frame;
            while (i <= chars.length - 3) {
                String codon = new String(chars, i, 3);
                if ("ATG".equals(codon)) {
                    int j = i + 3;
                    while (j <= chars.length - 3) {
                        String stopCodon = new String(chars, j, 3);
                        if (STOP_CODONS.contains(stopCodon)) {
                            int length = j + 3 - i;
                            if (length >= minLength) {
                                orfs.add(new OpenReadingFrame(frame, i, j + 3, length));
                            }
                            i = j + 3;
                            break;
                        }
                        j += 3;
                    }
                }
                i += 3;
            }
        }
        return orfs;
    }

    public Map<String, Integer> codonUsage() {
        Map<String, Integer> usage = new HashMap<>();
        for (int i = 0; i <= sequence.length() - 3; i += 3) {
            String codon = sequence.substring(i, i + 3);
            if (codon.chars().allMatch(ch -> ch == 'A' || ch == 'C' || ch == 'G' || ch == 'T')) {
                usage.merge(codon, 1, Integer::sum);
            }
        }
        return usage;
    }

    public int countMotifOccurrences(String motif) {
        if (motif == null || motif.isBlank()) {
            return 0;
        }
        String motifUpper = motif.toUpperCase(Locale.ROOT);
        int index = 0;
        int count = 0;
        while ((index = sequence.indexOf(motifUpper, index)) != -1) {
            count++;
            index += motifUpper.length();
        }
        return count;
    }

    public String sequence() {
        return sequence;
    }

    public record GCWindow(int startInclusive, int endExclusive, double gcContent) {
    }

    public record OpenReadingFrame(int frame, int start, int end, int length) {
    }
}
