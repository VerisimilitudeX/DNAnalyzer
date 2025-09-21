package DNAnalyzer.analysis;

/** Minimal Smith-Waterman implementation for local alignment. */
public final class SmithWaterman {
    private final int match;
    private final int mismatch;
    private final int gap;

    public SmithWaterman() {
        this(3, -3, -2);
    }

    public SmithWaterman(int match, int mismatch, int gap) {
        this.match = match;
        this.mismatch = mismatch;
        this.gap = gap;
    }

    public AlignmentResult align(String seq1, String seq2) {
        int len1 = seq1.length();
        int len2 = seq2.length();
        int[][] scores = new int[len1 + 1][len2 + 1];
        int maxScore = 0;
        int maxI = 0;
        int maxJ = 0;
        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                int scoreDiag = scores[i - 1][j - 1] + matchScore(seq1.charAt(i - 1), seq2.charAt(j - 1));
                int scoreUp = scores[i - 1][j] + gap;
                int scoreLeft = scores[i][j - 1] + gap;
                int best = Math.max(0, Math.max(scoreDiag, Math.max(scoreUp, scoreLeft)));
                scores[i][j] = best;
                if (best > maxScore) {
                    maxScore = best;
                    maxI = i;
                    maxJ = j;
                }
            }
        }
        StringBuilder align1 = new StringBuilder();
        StringBuilder align2 = new StringBuilder();
        int i = maxI;
        int j = maxJ;
        while (i > 0 && j > 0 && scores[i][j] > 0) {
            int current = scores[i][j];
            if (current == scores[i - 1][j - 1] + matchScore(seq1.charAt(i - 1), seq2.charAt(j - 1))) {
                align1.append(seq1.charAt(i - 1));
                align2.append(seq2.charAt(j - 1));
                i--;
                j--;
            } else if (current == scores[i - 1][j] + gap) {
                align1.append(seq1.charAt(i - 1));
                align2.append('-');
                i--;
            } else {
                align1.append('-');
                align2.append(seq2.charAt(j - 1));
                j--;
            }
        }
        return new AlignmentResult(maxScore, align1.reverse().toString(), align2.reverse().toString());
    }

    private int matchScore(char a, char b) {
        return Character.toUpperCase(a) == Character.toUpperCase(b) ? match : mismatch;
    }

    public record AlignmentResult(int score, String alignedSequence1, String alignedSequence2) {
    }
}
