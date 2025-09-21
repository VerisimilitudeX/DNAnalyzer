package DNAnalyzer.analysis;

import java.util.Locale;

/** Utility helpers for sequence manipulation. */
public final class SequenceUtils {
    private SequenceUtils() {
    }

    public static String reverse(String sequence) {
        return new StringBuilder(sequence).reverse().toString();
    }

    public static String reverseComplement(String sequence) {
        char[] chars = sequence.toUpperCase(Locale.ROOT).toCharArray();
        StringBuilder builder = new StringBuilder(chars.length);
        for (int i = chars.length - 1; i >= 0; i--) {
            builder.append(complement(chars[i]));
        }
        return builder.toString();
    }

    private static char complement(char base) {
        return switch (base) {
            case 'A' -> 'T';
            case 'T' -> 'A';
            case 'G' -> 'C';
            case 'C' -> 'G';
            case 'U' -> 'A';
            default -> 'N';
        };
    }
}
