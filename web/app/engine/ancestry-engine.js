/**
 * ancestry-engine.js: on-device continental ancestry composition.
 *
 * RELATIONSHIP TO THE JAVA CODE (read this).
 * ------------------------------------------
 * This engine keeps the *bookkeeping* structure of the server-side
 * DNAnalyzer.ancestry.AncestrySnapshot.analyze (loop over populations, count
 * compared vs missing markers per population, sort and report results), but it
 * DELIBERATELY REPLACES the Java class's core statistic. AncestrySnapshot uses
 * a naive "match rate": the fraction of markers whose observed genotype merely
 * *contains* an expected allele. That is not a real ancestry model, every
 * population shares most alleles, so match rate is close to 1 everywhere and
 * cannot separate ancestries.
 *
 * Instead this engine uses a proper allele-frequency model. For each
 * population p, given the reference ALT-allele frequency f(p) at each marker
 * and the user's ALT-allele dosage d in {0,1,2}, it computes the
 * Hardy-Weinberg binomial genotype likelihood
 *
 *     P(d | f) = C(2,d) * f^d * (1-f)^(2-d)
 *
 * and sums log P over all comparable markers to get a per-population
 * log-likelihood. A softmax over populations (with equal priors) turns those
 * log-likelihoods into a composition in percent. This is a well-established,
 * if simplified, likelihood approach (it assumes independent markers and a
 * single source population; it is NOT an admixture / local-ancestry model).
 *
 * This is therefore an intentional IMPROVEMENT on the Java version, not a
 * faithful port. It is still continental-scale and educational only.
 *
 * Honesty guards, mirroring prs.js:
 *   - Frequencies are clamped to [EPS, 1-EPS] so a log never blows up.
 *   - No-calls and markers absent from the file are skipped and counted.
 *   - If fewer than MIN_MARKERS ancestry-informative markers are comparable,
 *     NO composition is emitted; the caller shows "not enough markers".
 *   - Per-population log-likelihoods are returned so the UI can "show the math".
 *
 * Reuses PRSEngine.countAllele and does NOT fork it.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("../../analyzer/prs-engine.js"));
  } else {
    root.AncestryEngine = factory(root.PRSEngine);
  }
})(typeof self !== "undefined" ? self : this, function (PRSEngine) {
  "use strict";

  var EPS = 1e-4;
  // Minimum number of comparable AIM genotypes before we will report anything.
  // Below this, sampling noise dominates and a composition would be misleading.
  var MIN_MARKERS = 8;

  function clampFreq(f) {
    if (!isFinite(f)) return 0.5;
    if (f < EPS) return EPS;
    if (f > 1 - EPS) return 1 - EPS;
    return f;
  }

  // log C(2,d) for d in {0,1,2}: log(1), log(2), log(1).
  function logBinomCoeff(d) {
    return d === 1 ? Math.log(2) : 0;
  }

  /**
   * Compute continental ancestry composition.
   * @param genotypeData parsed object from PRSEngine.parseGenotypeText
   * @param panel dataset object { meta, populations:[...], markers:[
   *          { rsid, chr, ref, alt, palindromic, freq:{POP:altFreq,...} } ] }
   * @returns {
   *   ok: boolean,                // false when below the marker floor
   *   comparedMarkers, panelSize,
   *   populations: [POP,...],
   *   logLikelihoods: {POP:number},
   *   composition: [{population, percent, logLikelihood}],   // desc by percent
   *   perMarker: [{rsid, dosage, genotype, freq:{POP:...}, palindromic}],
   *   skipped: { missing:[rsid], nocall:[rsid], unexpected:[rsid] }
   * }
   */
  function analyze(genotypeData, panel) {
    var markers = (panel && panel.markers) || [];
    var populations = (panel && panel.populations) || [];

    var logL = {};
    for (var p = 0; p < populations.length; p++) logL[populations[p]] = 0;

    var compared = 0;
    var perMarker = [];
    var skipped = { missing: [], nocall: [], unexpected: [] };

    for (var m = 0; m < markers.length; m++) {
      var mk = markers[m];
      var record = genotypeData.get(mk.rsid);
      if (!record) {
        skipped.missing.push(mk.rsid);
        continue;
      }
      if (record.genotype === "--") {
        skipped.nocall.push(mk.rsid);
        continue;
      }

      // The frequency is for the ALT allele, so we score ALT dosage.
      // Guard against unexpected alleles (strand issues, off-target calls).
      var expected = {};
      expected[String(mk.ref).toUpperCase()] = true;
      expected[String(mk.alt).toUpperCase()] = true;
      var bad = false;
      for (var c = 0; c < record.genotype.length; c++) {
        if (!expected[record.genotype.charAt(c)]) {
          bad = true;
          break;
        }
      }
      if (bad) {
        skipped.unexpected.push(mk.rsid);
        continue;
      }

      var dosage = PRSEngine.countAllele(record.genotype, mk.alt);
      if (dosage < 0) {
        skipped.unexpected.push(mk.rsid);
        continue;
      }

      compared++;
      var coeff = logBinomCoeff(dosage);
      for (var pi = 0; pi < populations.length; pi++) {
        var pop = populations[pi];
        var f = clampFreq(mk.freq[pop]);
        // log P(d|f) = log C(2,d) + d*log f + (2-d)*log(1-f)
        logL[pop] += coeff + dosage * Math.log(f) + (2 - dosage) * Math.log(1 - f);
      }

      perMarker.push({
        rsid: mk.rsid,
        genotype: record.genotype,
        dosage: dosage,
        freq: mk.freq,
        palindromic: !!mk.palindromic,
      });
    }

    if (compared < MIN_MARKERS) {
      return {
        ok: false,
        comparedMarkers: compared,
        panelSize: markers.length,
        minMarkers: MIN_MARKERS,
        populations: populations,
        logLikelihoods: logL,
        composition: [],
        perMarker: perMarker,
        skipped: skipped,
      };
    }

    // Softmax over populations with equal priors: subtract the max for
    // numerical stability, exponentiate, normalise. Proportions sum to 1.
    var maxLL = -Infinity;
    for (var a = 0; a < populations.length; a++) {
      if (logL[populations[a]] > maxLL) maxLL = logL[populations[a]];
    }
    var sumExp = 0;
    var exps = {};
    for (var b = 0; b < populations.length; b++) {
      var e = Math.exp(logL[populations[b]] - maxLL);
      exps[populations[b]] = e;
      sumExp += e;
    }

    var composition = populations
      .map(function (pop) {
        return {
          population: pop,
          percent: sumExp === 0 ? 0 : (exps[pop] / sumExp) * 100,
          logLikelihood: logL[pop],
        };
      })
      .sort(function (x, y) {
        return y.percent - x.percent;
      });

    return {
      ok: true,
      comparedMarkers: compared,
      panelSize: markers.length,
      minMarkers: MIN_MARKERS,
      populations: populations,
      logLikelihoods: logL,
      composition: composition,
      perMarker: perMarker,
      skipped: skipped,
    };
  }

  return { analyze: analyze, MIN_MARKERS: MIN_MARKERS, EPS: EPS };
});
