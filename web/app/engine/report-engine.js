/**
 * report-engine.js: assemble a downloadable local report.
 *
 * Everything here runs in the browser. It takes the already-computed section
 * results (ancestry, traits, polygenic scores, carrier variants, data summary)
 * plus provenance/citations and builds a single JSON object, then hands back a
 * Blob + object URL for download. It records only the file NAME the user chose,
 * NEVER the file contents or raw genotypes, so the downloaded report cannot
 * leak the DNA data. There is no network call: the report is built and
 * downloaded entirely on-device.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ReportEngine = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /**
   * Build the report object.
   * @param sections { fileName, generatedAt, genotypeSummary, ancestry,
   *                   traits, polygenicScores, carrierVariants, citations }
   */
  function buildReport(sections) {
    return {
      report: "DNAnalyzer on-device DNA report",
      generated_at: sections.generatedAt || new Date().toISOString(),
      privacy_notice:
        "This report was generated entirely in your browser. It contains only " +
        "the NAME of the file you loaded, never its contents or your raw genotypes. " +
        "Nothing was uploaded.",
      not_medical_advice:
        "Educational only. Not a diagnostic test and not medical advice. " +
        "Discuss any result with a clinician or genetic counselor.",
      source_file_name: sections.fileName || "(unnamed)",
      genotype_summary: sections.genotypeSummary || null,
      ancestry: sections.ancestry || null,
      traits: sections.traits || null,
      polygenic_scores: sections.polygenicScores || null,
      carrier_variants: sections.carrierVariants || null,
      provenance_and_citations: sections.citations || [],
    };
  }

  /**
   * Serialise the report and return a Blob URL for download. The caller is
   * responsible for revoking the URL after the click.
   */
  function toDownload(report) {
    var json = JSON.stringify(report, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    return {
      url: URL.createObjectURL(blob),
      filename: "dnanalyzer-report.json",
      size: blob.size,
    };
  }

  return { buildReport: buildReport, toDownload: toDownload };
});
