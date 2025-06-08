package DNAnalyzer.report;

/** Simple POJO holding results of a DNA analysis. */
public class AnalysisResult {
  private final long adenine;
  private final long thymine;
  private final long guanine;
  private final long cytosine;
  private final long unknown;
  private final double gcContent;
  private final int sequenceLength;

  public AnalysisResult(long adenine, long thymine, long guanine, long cytosine, long unknown) {
    this.adenine = adenine;
    this.thymine = thymine;
    this.guanine = guanine;
    this.cytosine = cytosine;
    this.unknown = unknown;
    this.sequenceLength = (int) (adenine + thymine + guanine + cytosine + unknown);
    long counted = adenine + thymine + guanine + cytosine;
    this.gcContent = counted == 0 ? 0 : (guanine + cytosine) * 100.0 / counted;
  }

  public long getAdenine() {
    return adenine;
  }

  public long getThymine() {
    return thymine;
  }

  public long getGuanine() {
    return guanine;
  }

  public long getCytosine() {
    return cytosine;
  }

  public long getUnknown() {
    return unknown;
  }

  public double getGcContent() {
    return gcContent;
  }

  public int getSequenceLength() {
    return sequenceLength;
  }
}
