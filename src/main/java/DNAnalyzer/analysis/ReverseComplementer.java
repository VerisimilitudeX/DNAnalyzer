package DNAnalyzer.analysis;

import java.util.Locale;

public final class ReverseComplementer {
    private ReverseComplementer() {
    }

    public static String reverseComplement(String sequence) {
        StringBuilder builder = new StringBuilder(sequence.length());
        for (int i = sequence.length() - 1; i >= 0; i--) {
            builder.append(complement(sequence.charAt(i)));
        }
        return builder.toString().toUpperCase(Locale.ROOT);
    }

    private static char complement(char base) {
        return switch (Character.toUpperCase(base)) {
            case 'A' -> 'T';
            case 'T', 'U' -> 'A';
            case 'C' -> 'G';
            case 'G' -> 'C';
            default -> 'N';
        };
    }
}
