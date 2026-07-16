/**
 * prs-engine.js: on-device polygenic score engine.
 *
 * A faithful JavaScript port of the DNAnalyzer server-side scoring code
 * (DNAnalyzer.prs.GenotypeData, PolygenicRiskCalculator, RiskWeightTable).
 * It parses a consumer genotype export (23andMe or AncestryDNA), matches the
 * calls to a scoring table by rsID, and computes a weighted-dosage polygenic
 * score. Everything runs in the browser: no file bytes ever leave the page.
 *
 * The numeric results are verified against the Java unit tests
 * (PolygenicRiskCalculatorTest) by scripts run at build time.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PRSEngine = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /**
   * Normalise a raw genotype token to uppercase A/C/G/T (and '-').
   * Mirrors GenotypeData.normaliseGenotype: strip anything that is not a
   * letter or hyphen, uppercase, and treat an empty result as a no-call.
   * Digits (AncestryDNA writes '0' for a no-call) fall out here, so a "00"
   * pair becomes "--".
   */
  function normaliseGenotype(raw) {
    if (raw == null) return "--";
    var cleaned = String(raw).replace(/[^A-Za-z-]/g, "").toUpperCase();
    return cleaned.length === 0 ? "--" : cleaned;
  }

  /**
   * Count how many copies of `allele` appear in `genotype`.
   * Returns dosage 0, 1, or 2, or -1 when the genotype is a no-call or cannot
   * be interpreted. Direct port of GenotypeData.GenotypeRecord.countAllele.
   */
  function countAllele(genotype, allele) {
    if (genotype === "--") return -1;
    var upperAllele = String(allele).toUpperCase();

    if (upperAllele.length === 1) {
      var target = upperAllele.charAt(0);
      var count = 0;
      for (var i = 0; i < genotype.length; i++) {
        if (genotype.charAt(i) === target) count++;
      }
      return count;
    }

    if (upperAllele.length === 2) {
      if (genotype.length !== 2) return -1;
      var first = upperAllele.charAt(0);
      var second = upperAllele.charAt(1);
      var g0 = genotype.charAt(0);
      var g1 = genotype.charAt(1);
      if ((g0 === first && g1 === second) || (g0 === second && g1 === first)) {
        return 2;
      }
      if (g0 === first || g0 === second || g1 === first || g1 === second) {
        return 1;
      }
      return 0;
    }

    return -1;
  }

  /**
   * Parse a 23andMe or AncestryDNA text export into a Map of rsID -> record.
   * 23andMe rows are `rsid chr pos genotype` (4 columns, genotype like "AG");
   * AncestryDNA rows are `rsid chr pos allele1 allele2` (5 columns). Comment
   * (`#`) and header lines are skipped. Whitespace-delimited to tolerate both
   * tab and space separated files.
   */
  function parseGenotypeText(text) {
    var records = new Map();
    var format = "unknown";
    var lines = String(text).split(/\r?\n/);

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.length === 0 || line.charAt(0) === "#") continue;

      var tokens = line.split(/\s+/);
      if (tokens.length < 4) continue;

      var rsid = tokens[0].trim();
      // Header row (either format).
      if (/^rsid$/i.test(rsid) && /^chromosome$/i.test(tokens[1])) {
        format = tokens.length >= 5 ? "ancestrydna" : "23andme";
        continue;
      }
      if (rsid.length === 0) continue;

      var genotype;
      if (tokens.length >= 5) {
        genotype = normaliseGenotype(tokens[3] + tokens[4]);
        if (format === "unknown") format = "ancestrydna";
      } else {
        genotype = normaliseGenotype(tokens[3]);
        if (format === "unknown") format = "23andme";
      }

      records.set(rsid, {
        rsid: rsid,
        chromosome: tokens[1].trim(),
        position: tokens[2].trim(),
        genotype: genotype,
      });
    }

    var variantCount = records.size;
    var calledVariants = 0;
    records.forEach(function (record) {
      if (record.genotype !== "--") calledVariants++;
    });

    return {
      records: records,
      format: format,
      variantCount: variantCount,
      calledVariants: calledVariants,
      callRate: variantCount === 0 ? 0 : calledVariants / variantCount,
      get: function (rsid) {
        return records.get(rsid) || null;
      },
    };
  }

  var RSID_NAMES = ["rsid", "hm_rsid", "snp", "snpid", "variant", "variant_id"];
  var EFFECT_ALLELE_NAMES = [
    "effect_allele",
    "effectallele",
    "riskallele",
    "risk_allele",
    "ea",
    "a1",
    "allele",
  ];
  var WEIGHT_NAMES = ["effect_weight", "effectweight", "weight", "beta", "or_weight"];

  function indexOfName(header, names) {
    for (var i = 0; i < header.length; i++) {
      if (names.indexOf(header[i]) >= 0) return i;
    }
    return -1;
  }

  /**
   * A data line has at least one numeric field (a position or a weight);
   * a header line is all text. This distinguishes a PGS Catalog column header
   * (`rsID effect_allele effect_weight ...`) or a legacy CSV header
   * (`SNP,RiskAllele,Weight`) from the rows beneath it, without special-casing
   * either format.
   */
  function looksLikeHeader(cols) {
    for (var i = 0; i < cols.length; i++) {
      if (cols[i] !== "" && isFinite(Number(cols[i]))) return false;
    }
    return true;
  }

  /**
   * Parse a scoring table. Understands two shapes with one code path:
   *   1. PGS Catalog scoring files: `#key=value` metadata header, a named
   *      column header (rsID / effect_allele / effect_weight), tab-delimited.
   *   2. The legacy DNAnalyzer risk CSV: optional header, positional
   *      columns (rsid, riskAllele, weight).
   * Returns { name, entries: [{rsid, effectAllele, weight}], meta }.
   */
  function parseScoreTable(text, options) {
    options = options || {};
    var meta = {};
    var header = null;
    var delim = null;
    var entries = [];
    var lines = String(text).split(/\r?\n/);

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.length === 0) continue;

      if (line.charAt(0) === "#") {
        var kv = line.slice(1).match(/^([A-Za-z_]+)=(.*)$/);
        if (kv) meta[kv[1].toLowerCase()] = kv[2].trim();
        continue;
      }

      if (delim === null) delim = line.indexOf("\t") >= 0 ? "\t" : ",";
      var cols = line.split(delim).map(function (s) {
        return s.trim().replace(/^"|"$/g, "");
      });

      if (header === null && looksLikeHeader(cols)) {
        header = cols.map(function (c) {
          return c.toLowerCase();
        });
        continue;
      }

      var rsid;
      var allele;
      var weightToken;
      if (header) {
        var ri = indexOfName(header, RSID_NAMES);
        var ai = indexOfName(header, EFFECT_ALLELE_NAMES);
        var wi = indexOfName(header, WEIGHT_NAMES);
        if (ri < 0 || ai < 0 || wi < 0) continue;
        rsid = cols[ri];
        allele = cols[ai];
        weightToken = cols[wi];
      } else {
        rsid = cols[0];
        allele = cols[1];
        weightToken = cols[2];
      }

      var weight = Number(weightToken);
      if (!rsid || !allele || !isFinite(weight)) continue;
      entries.push({
        rsid: rsid.trim(),
        effectAllele: allele.toUpperCase(),
        weight: weight,
      });
    }

    var name =
      options.name ||
      meta.trait_reported ||
      meta.pgs_name ||
      meta.pgs_id ||
      "Polygenic score";

    return { name: name, entries: entries, meta: meta };
  }

  /**
   * Apply a scoring table to parsed genotype data. Direct port of
   * PolygenicRiskCalculator.calculate: rawScore is the dosage-weighted sum,
   * normalisedScore divides by the maximum attainable magnitude
   * (sum of |weight| * 2), and coverage is the matched fraction. Every
   * scoring variant produces a contribution row (matched or missing) so the
   * result is fully auditable.
   */
  function computePRS(genotypeData, scoreTable) {
    var contributions = [];
    var rawScore = 0;
    var maxMagnitude = 0;
    var matched = 0;
    var missing = 0;
    var entries = scoreTable.entries;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      maxMagnitude += Math.abs(entry.weight) * 2;

      var record = genotypeData.get(entry.rsid);
      if (!record) {
        missing++;
        contributions.push({
          rsid: entry.rsid,
          genotype: "--",
          effectAllele: entry.effectAllele,
          dosage: -1,
          weight: entry.weight,
          contribution: 0,
          matched: false,
          note: "No genotype call",
        });
        continue;
      }

      var dosage = countAllele(record.genotype, entry.effectAllele);
      if (dosage < 0) {
        missing++;
        contributions.push({
          rsid: entry.rsid,
          genotype: record.genotype,
          effectAllele: entry.effectAllele,
          dosage: -1,
          weight: entry.weight,
          contribution: 0,
          matched: false,
          note: "Uncallable genotype: " + record.genotype,
        });
        continue;
      }

      var contribution = dosage * entry.weight;
      rawScore += contribution;
      matched++;
      contributions.push({
        rsid: record.rsid,
        genotype: record.genotype,
        effectAllele: entry.effectAllele,
        dosage: dosage,
        weight: entry.weight,
        contribution: contribution,
        matched: true,
        note: "",
      });
    }

    var normalisedScore = maxMagnitude === 0 ? 0 : rawScore / maxMagnitude;
    var coverage = entries.length === 0 ? 0 : matched / entries.length;

    return {
      name: scoreTable.name,
      totalVariants: entries.length,
      matchedVariants: matched,
      missingVariants: missing,
      rawScore: rawScore,
      normalisedScore: normalisedScore,
      coverage: coverage,
      contributions: contributions,
      meta: scoreTable.meta || {},
    };
  }

  return {
    normaliseGenotype: normaliseGenotype,
    countAllele: countAllele,
    parseGenotypeText: parseGenotypeText,
    parseScoreTable: parseScoreTable,
    computePRS: computePRS,
  };
});
