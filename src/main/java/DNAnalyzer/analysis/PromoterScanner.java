package DNAnalyzer.analysis;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Simple motif scanner for core promoter elements. */
public final class PromoterScanner {
  private static final Map<String, Pattern> MOTIFS =
      Map.of(
          "TATA", Pattern.compile("TATA[AT]A"),
          "BRE", Pattern.compile("[CG][CG][AG]CGCC"),
          "INR", Pattern.compile("[CT][CT]A[AT][AG][CT][CT]"),
          "DPE", Pattern.compile("[AG]G[AT][CT][AG]"));

  public List<PromoterMatch> scan(String sequence) {
    String upper = sequence.toUpperCase(Locale.ROOT);
    List<PromoterMatch> matches = new ArrayList<>();
    for (Map.Entry<String, Pattern> motif : MOTIFS.entrySet()) {
      Matcher matcher = motif.getValue().matcher(upper);
      while (matcher.find()) {
        matches.add(new PromoterMatch(motif.getKey(), matcher.start(), matcher.group()));
      }
    }
    return matches;
  }

  public record PromoterMatch(String element, int position, String match) {}
}
