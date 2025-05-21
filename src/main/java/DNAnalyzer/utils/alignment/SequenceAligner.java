package DNAnalyzer.utils.alignment;

/** Global alignment utilities using dynamic programming. */
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
    return needlemanWunschAffine(seq1, seq2, 2, -1, -2, -1);
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

  /**
   * Needleman-Wunsch global alignment with affine gap penalties.
   *
   * @param seq1 first sequence
   * @param seq2 second sequence
   * @param match match score
   * @param mismatch mismatch score
   * @param gapOpen gap opening penalty (negative)
   * @param gapExtend gap extension penalty (negative)
   * @return alignment result
   */
  public static AlignmentResult needlemanWunschAffine(
      String seq1, String seq2, int match, int mismatch, int gapOpen, int gapExtend) {
    int m = seq1.length();
    int n = seq2.length();
    int negInf = Integer.MIN_VALUE / 4;

    int[][] main = new int[m + 1][n + 1];
    int[][] gapRow = new int[m + 1][n + 1];
    int[][] gapCol = new int[m + 1][n + 1];
    DirectionState[][] trace = new DirectionState[m + 1][n + 1];

    main[0][0] = 0;
    gapRow[0][0] = negInf;
    gapCol[0][0] = negInf;
    trace[0][0] = DirectionState.DIAGONAL;

    for (int i = 1; i <= m; i++) {
      main[i][0] = negInf;
      gapRow[i][0] = gapOpen + (i - 1) * gapExtend;
      gapCol[i][0] = negInf;
      trace[i][0] = DirectionState.UP;
    }
    for (int j = 1; j <= n; j++) {
      main[0][j] = negInf;
      gapRow[0][j] = negInf;
      gapCol[0][j] = gapOpen + (j - 1) * gapExtend;
      trace[0][j] = DirectionState.LEFT;
    }

    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        int scoreMatch = seq1.charAt(i - 1) == seq2.charAt(j - 1) ? match : mismatch;
        int mDiag =
            Math.max(main[i - 1][j - 1], Math.max(gapRow[i - 1][j - 1], gapCol[i - 1][j - 1]))
                + scoreMatch;

        int gRow = Math.max(main[i - 1][j] + gapOpen, gapRow[i - 1][j] + gapExtend);
        int gCol = Math.max(main[i][j - 1] + gapOpen, gapCol[i][j - 1] + gapExtend);

        main[i][j] = mDiag;
        gapRow[i][j] = gRow;
        gapCol[i][j] = gCol;

        int max = Math.max(mDiag, Math.max(gRow, gCol));
        if (max == mDiag) {
          trace[i][j] = DirectionState.DIAGONAL;
        } else if (max == gRow) {
          trace[i][j] = DirectionState.UP;
        } else {
          trace[i][j] = DirectionState.LEFT;
        }
      }
    }

    StringBuilder aligned1 = new StringBuilder();
    StringBuilder aligned2 = new StringBuilder();

    int i = m;
    int j = n;
    DirectionState state = trace[i][j];
    int maxScore = Math.max(main[i][j], Math.max(gapRow[i][j], gapCol[i][j]));

    while (i > 0 || j > 0) {
      if (state == DirectionState.DIAGONAL) {
        aligned1.append(seq1.charAt(i - 1));
        aligned2.append(seq2.charAt(j - 1));
        i--;
        j--;
        state = trace[i][j];
      } else if (state == DirectionState.UP) {
        aligned1.append(seq1.charAt(i - 1));
        aligned2.append('-');
        i--;
        if (Math.max(main[i][j] + gapOpen, gapRow[i][j] + gapExtend) == main[i][j] + gapOpen) {
          state = trace[i][j];
        }
      } else if (state == DirectionState.LEFT) {
        aligned1.append('-');
        aligned2.append(seq2.charAt(j - 1));
        j--;
        if (Math.max(main[i][j] + gapOpen, gapCol[i][j] + gapExtend) == main[i][j] + gapOpen) {
          state = trace[i][j];
        }
      } else {
        break;
      }
    }

    return new AlignmentResult(
        aligned1.reverse().toString(), aligned2.reverse().toString(), maxScore);
  }

  private enum DirectionState {
    DIAGONAL,
    UP,
    LEFT
  }

  private enum Direction {
    NONE,
    DIAGONAL,
    UP,
    LEFT
  }
}
