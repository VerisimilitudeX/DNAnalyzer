package DNAnalyzer.utils.alignment;

/** Simple global alignment using the Needleman-Wunsch algorithm. */
public class SequenceAligner {

  /** Result of an alignment. */
  public record AlignmentResult(String alignedSeq1, String alignedSeq2, int score) {}

  /**
   * Align two sequences with default scoring parameters.
   *
   * @param seq1 first sequence
   * @param seq2 second sequence
   * @return alignment result
   */
  public static AlignmentResult align(String seq1, String seq2) {
    return needlemanWunsch(seq1, seq2, 1, -1, -2);
  }

  /** Needleman-Wunsch global alignment. */
  public static AlignmentResult needlemanWunsch(
      String seq1, String seq2, int match, int mismatch, int gap) {
    int m = seq1.length();
    int n = seq2.length();
    int[][] scores = new int[m + 1][n + 1];
    Direction[][] traceback = new Direction[m + 1][n + 1];

    for (int i = 0; i <= m; i++) {
      scores[i][0] = i * gap;
      traceback[i][0] = Direction.UP;
    }
    for (int j = 0; j <= n; j++) {
      scores[0][j] = j * gap;
      traceback[0][j] = Direction.LEFT;
    }
    traceback[0][0] = Direction.NONE;

    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        int diag =
            scores[i - 1][j - 1] + (seq1.charAt(i - 1) == seq2.charAt(j - 1) ? match : mismatch);
        int up = scores[i - 1][j] + gap;
        int left = scores[i][j - 1] + gap;
        int max = Math.max(diag, Math.max(up, left));
        scores[i][j] = max;
        if (max == diag) {
          traceback[i][j] = Direction.DIAGONAL;
        } else if (max == up) {
          traceback[i][j] = Direction.UP;
        } else {
          traceback[i][j] = Direction.LEFT;
        }
      }
    }

    StringBuilder a1 = new StringBuilder();
    StringBuilder a2 = new StringBuilder();
    int i = m;
    int j = n;
    while (i > 0 || j > 0) {
      Direction dir = traceback[i][j];
      if (dir == Direction.DIAGONAL) {
        a1.append(seq1.charAt(i - 1));
        a2.append(seq2.charAt(j - 1));
        i--;
        j--;
      } else if (dir == Direction.UP) {
        a1.append(seq1.charAt(i - 1));
        a2.append('-');
        i--;
      } else if (dir == Direction.LEFT) {
        a1.append('-');
        a2.append(seq2.charAt(j - 1));
        j--;
      } else {
        break;
      }
    }

    return new AlignmentResult(a1.reverse().toString(), a2.reverse().toString(), scores[m][n]);
  }

  private enum Direction {
    NONE,
    DIAGONAL,
    UP,
    LEFT
  }
}
