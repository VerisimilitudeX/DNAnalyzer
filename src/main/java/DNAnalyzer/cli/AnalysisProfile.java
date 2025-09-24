package DNAnalyzer.cli;

import java.util.Arrays;
import java.util.Locale;
import java.util.Optional;

public enum AnalysisProfile {
  BASIC(new ProfileDefaults(false, false, false, 0, false, 150, false)),
  DETAILED(new ProfileDefaults(true, true, false, 0, false, 75, true)),
  QUICK(new ProfileDefaults(false, false, true, 0, false, 250, false)),
  RESEARCH(new ProfileDefaults(true, true, false, 5, true, 50, true)),
  MUTATION(new ProfileDefaults(false, false, false, 5, false, 100, false)),
  CLINICAL(new ProfileDefaults(true, true, false, 3, true, 60, true));

  private final ProfileDefaults defaults;

  AnalysisProfile(ProfileDefaults defaults) {
    this.defaults = defaults;
  }

  public ProfileDefaults defaults() {
    return defaults;
  }

  public static Optional<AnalysisProfile> fromName(String value) {
    if (value == null) {
      return Optional.empty();
    }
    String normalized = value.trim().toUpperCase(Locale.ROOT);
    return Arrays.stream(values()).filter(profile -> profile.name().equals(normalized)).findFirst();
  }

  public static String listProfiles() {
    return Arrays.stream(values())
        .map(profile -> profile.name().toLowerCase(Locale.ROOT))
        .reduce((a, b) -> a + ", " + b)
        .orElse("none");
  }

  public record ProfileDefaults(
      Boolean detailed,
      Boolean verbose,
      Boolean quick,
      Integer mutationCount,
      Boolean reverseComplement,
      Integer gcWindow,
      Boolean orfs) {}
}
