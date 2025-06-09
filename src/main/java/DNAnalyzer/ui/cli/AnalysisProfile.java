package DNAnalyzer.ui.cli;

/** Predefined analysis profiles for different use cases */
public enum AnalysisProfile {
  BASIC("Basic analysis with standard options", false, false, false, 0),
  DETAILED("Comprehensive analysis with detailed output", true, true, false, 0),
  QUICK("Fast analysis with minimal output", false, false, true, 0),
  RESEARCH("Research-grade analysis with all features", true, true, false, 0),
  MUTATION("Basic analysis with mutation generation", false, true, false, 5),
  CLINICAL("Clinical-grade analysis for medical applications", true, true, false, 0);

  private final String description;
  private final boolean detailed;
  private final boolean verbose;
  private final boolean quick;
  private final int mutationCount;

  AnalysisProfile(
      String description, boolean detailed, boolean verbose, boolean quick, int mutationCount) {
    this.description = description;
    this.detailed = detailed;
    this.verbose = verbose;
    this.quick = quick;
    this.mutationCount = mutationCount;
  }

  public String getDescription() {
    return description;
  }

  public boolean isDetailed() {
    return detailed;
  }

  public boolean isVerbose() {
    return verbose;
  }

  public boolean isQuick() {
    return quick;
  }

  public int getMutationCount() {
    return mutationCount;
  }

  /** Apply this profile's settings to CmdArgs */
  public void applyTo(CmdArgs cmdArgs) {
    cmdArgs.detailed = this.detailed;
    cmdArgs.verbose = this.verbose;
    cmdArgs.quick = this.quick;
    if (this.mutationCount > 0) {
      cmdArgs.mutationCount = this.mutationCount;
    }
  }

  /** Get a user-friendly list of all profiles */
  public static String getProfileList() {
    StringBuilder sb = new StringBuilder();
    sb.append("Available analysis profiles:\n");
    for (AnalysisProfile profile : values()) {
      sb.append(
          String.format("  %s: %s\n", profile.name().toLowerCase(), profile.getDescription()));
    }
    return sb.toString();
  }
}
