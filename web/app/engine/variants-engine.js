/**
 * variants-engine.js: notable pathogenic variant lookup (carrier section).
 *
 * The most conservative engine in the app. It looks up each variant in the
 * bundled dataset (data/variants/carrier_variants.json) by rsID, counts the
 * dosage of the risk allele with PRSEngine.countAllele, and returns the
 * dataset's dosage-specific interpretation together with the ClinVar id and
 * citation. It NEVER invents a result: a missing SNP, a no-call, or an
 * unexpected allele all return an explicit "cannot call" state rather than a
 * fabricated "you are negative".
 *
 * Reuses PRSEngine and does NOT fork it.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("../../analyzer/prs-engine.js"));
  } else {
    root.VariantsEngine = factory(root.PRSEngine);
  }
})(typeof self !== "undefined" ? self : this, function (PRSEngine) {
  "use strict";

  function evaluateVariant(genotypeData, variant) {
    var record = genotypeData.get(variant.rsid);

    if (!record) {
      return {
        variant: variant,
        status: "missing",
        genotype: null,
        dosage: -1,
        interpretation:
          "This variant (" + variant.rsid + ") is not present in your file. That is NOT the same " +
          "as a negative result, your array may simply not test this position.",
      };
    }

    var genotype = record.genotype;
    if (genotype === "--") {
      return {
        variant: variant,
        status: "nocall",
        genotype: genotype,
        dosage: -1,
        interpretation:
          "Your file lists " + variant.rsid + " but has no genotype call for it (a no-call), so " +
          "this variant cannot be read.",
      };
    }

    var expected = {};
    expected[String(variant.ref).toUpperCase()] = true;
    expected[String(variant.alt).toUpperCase()] = true;
    for (var i = 0; i < genotype.length; i++) {
      if (!expected[genotype.charAt(i)]) {
        return {
          variant: variant,
          status: "unexpected",
          genotype: genotype,
          dosage: -1,
          interpretation:
            "Your genotype at " + variant.rsid + " (" + genotype + ") contains an unexpected " +
            "allele for this position. No interpretation is shown, to avoid a wrong call.",
        };
      }
    }

    var dosage = PRSEngine.countAllele(genotype, variant.risk_allele);
    if (dosage < 0 || !variant.interpretations[String(dosage)]) {
      return {
        variant: variant,
        status: "unexpected",
        genotype: genotype,
        dosage: dosage,
        interpretation:
          "Your genotype at " + variant.rsid + " (" + genotype + ") could not be mapped to a known " +
          "result, so no interpretation is shown.",
      };
    }

    // dosage 0 = risk allele absent, 1 = carrier, 2 = homozygous.
    var flag = dosage >= 1 ? "attention" : "clear";
    return {
      variant: variant,
      status: "called",
      genotype: genotype,
      dosage: dosage,
      flag: flag,
      interpretation: variant.interpretations[String(dosage)],
    };
  }

  function evaluateAll(genotypeData, variantsData) {
    var variants = (variantsData && variantsData.variants) || [];
    var results = variants.map(function (v) {
      return evaluateVariant(genotypeData, v);
    });
    return {
      results: results,
      total: variants.length,
      meta: (variantsData && variantsData.meta) || {},
    };
  }

  return { evaluateVariant: evaluateVariant, evaluateAll: evaluateAll };
});
