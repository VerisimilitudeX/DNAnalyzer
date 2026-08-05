/**
 * traits-engine.js: single-SNP trait interpretation.
 *
 * Reads the parsed genotype object from PRSEngine.parseGenotypeText and a
 * traits dataset (data/traits/traits.json). For each trait it counts the
 * dosage of the effect allele with PRSEngine.countAllele and keys the
 * dataset's dosage-specific interpretation. Nothing here is medical advice;
 * every trait carries its own citation, loaded from the dataset.
 *
 * Design rules mirrored from prs.js: interpretation is WITHHELD (not guessed)
 * whenever the observed genotype cannot be interpreted at this locus:
 *   - a no-call ("--"),
 *   - a genotype containing an allele that is neither the reference nor the
 *     effect allele (possible strand flip / off-target call).
 * This is deliberately conservative: a wrong interpretation is worse than
 * "we can't call this one".
 *
 * This engine reuses PRSEngine and does NOT fork it.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("../../analyzer/prs-engine.js"));
  } else {
    root.TraitsEngine = factory(root.PRSEngine);
  }
})(typeof self !== "undefined" ? self : this, function (PRSEngine) {
  "use strict";

  /**
   * Evaluate a single trait definition against parsed genotype data.
   * Returns a status object describing what could (or could not) be called.
   */
  function evaluateTrait(genotypeData, trait) {
    var record = genotypeData.get(trait.rsid);

    if (!record) {
      return {
        trait: trait,
        status: "missing",
        genotype: null,
        dosage: -1,
        interpretation:
          "This SNP (" + trait.rsid + ") is not in your file, so this trait cannot be read.",
      };
    }

    var genotype = record.genotype;
    if (genotype === "--") {
      return {
        trait: trait,
        status: "nocall",
        genotype: genotype,
        dosage: -1,
        interpretation:
          "Your file lists " + trait.rsid + " but has no genotype call for it (a no-call), so this trait cannot be read.",
      };
    }

    // Guard: every allele in the observed genotype must be one of the two
    // expected alleles at this locus. Anything else means a strand flip or a
    // multi-allelic/off-target call we should not interpret.
    var expected = {};
    expected[String(trait.ref).toUpperCase()] = true;
    expected[String(trait.alt).toUpperCase()] = true;
    for (var i = 0; i < genotype.length; i++) {
      if (!expected[genotype.charAt(i)]) {
        return {
          trait: trait,
          status: "unexpected",
          genotype: genotype,
          dosage: -1,
          interpretation:
            "Your genotype at " + trait.rsid + " (" + genotype + ") contains an allele that is " +
            "not the expected " + trait.ref + "/" + trait.alt + " for this SNP. To avoid a wrong " +
            "call (this can happen with strand differences), no interpretation is shown.",
        };
      }
    }

    var dosage = PRSEngine.countAllele(genotype, trait.effect_allele);
    if (dosage < 0 || !trait.interpretations[String(dosage)]) {
      return {
        trait: trait,
        status: "unexpected",
        genotype: genotype,
        dosage: dosage,
        interpretation:
          "Your genotype at " + trait.rsid + " (" + genotype + ") could not be mapped to a known " +
          "result, so no interpretation is shown.",
      };
    }

    return {
      trait: trait,
      status: "called",
      genotype: genotype,
      dosage: dosage,
      interpretation: trait.interpretations[String(dosage)],
    };
  }

  /**
   * Evaluate every trait in the dataset. Returns { results:[...], calledCount, total }.
   */
  function evaluateAll(genotypeData, traitsData) {
    var traits = (traitsData && traitsData.traits) || [];
    var results = traits.map(function (t) {
      return evaluateTrait(genotypeData, t);
    });
    var called = results.filter(function (r) {
      return r.status === "called";
    }).length;
    return {
      results: results,
      calledCount: called,
      total: traits.length,
      meta: (traitsData && traitsData.meta) || {},
    };
  }

  return { evaluateTrait: evaluateTrait, evaluateAll: evaluateAll };
});
