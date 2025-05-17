package DNAnalyzer.data.trait;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/** Predicts simple phenotypic traits from SNP data. */
public class TraitPredictor {

  private static final List<Trait> TRAITS =
      List.of(
          new Trait(
              "Cilantro Preference",
              "rs72921001",
              "A",
              "Likely perceives cilantro as soapy",
              "No strong cilantro aversion"),
          new Trait(
              "Chronotype",
              "rs11121022",
              "G",
              "Predisposed to be a morning person",
              "Predisposed to be an evening person"),
          new Trait("Earwax Type", "rs17822931", "A", "Dry earwax type", "Wet earwax type"));

  private TraitPredictor() {}

  /**
   * Predict traits from a map of SNP identifiers to genotypes.
   *
   * @param snpData SNP genotype map
   * @return list of trait predictions
   */
  public static List<TraitPrediction> predictTraits(Map<String, String> snpData) {
    List<TraitPrediction> results = new ArrayList<>();
    for (Trait trait : TRAITS) {
      String genotype = snpData.get(trait.snp());
      if (genotype == null) {
        continue;
      }
      boolean match = genotype.contains(trait.allele());
      String prediction = match ? trait.positivePrediction() : trait.negativePrediction();
      results.add(new TraitPrediction(trait.name(), genotype, prediction));
    }
    return results;
  }
}
