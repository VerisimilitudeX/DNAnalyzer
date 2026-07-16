/**
 * prs.js: controller for the on-device polygenic-score page.
 *
 * The user's genotype file is read with FileReader and scored in-page via
 * PRSEngine. It is never uploaded: the only network requests this page makes
 * are for its own static assets (the engine, the scoring table, fonts). The
 * scoring table's provenance (PGS id, citation, license) is read from the
 * file header and shown to the user.
 */
(function () {
  "use strict";

  var SCORE_URL = "data/score.txt";
  var SAMPLE_URL = "data/sample-genome.txt";
  var MAX_TABLE_ROWS = 200;

  var els = {};
  var scoreTable = null;

  document.addEventListener("DOMContentLoaded", function () {
    els.dropZone = document.getElementById("dropZone");
    els.fileInput = document.getElementById("fileInput");
    els.sampleBtn = document.getElementById("sampleBtn");
    els.status = document.getElementById("statusArea");
    els.result = document.getElementById("resultArea");
    els.attribution = document.getElementById("attribution");

    wireInputs();
    loadScoreTable();
  });

  function wireInputs() {
    els.dropZone.addEventListener("click", function () {
      els.fileInput.click();
    });
    els.dropZone.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        els.fileInput.click();
      }
    });
    els.fileInput.addEventListener("change", function (e) {
      if (e.target.files && e.target.files[0]) readFile(e.target.files[0]);
    });

    ["dragenter", "dragover"].forEach(function (type) {
      els.dropZone.addEventListener(type, function (e) {
        e.preventDefault();
        els.dropZone.classList.add("is-dragover");
      });
    });
    ["dragleave", "drop"].forEach(function (type) {
      els.dropZone.addEventListener(type, function (e) {
        e.preventDefault();
        els.dropZone.classList.remove("is-dragover");
      });
    });
    els.dropZone.addEventListener("drop", function (e) {
      var dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) readFile(dt.files[0]);
    });

    els.sampleBtn.addEventListener("click", loadSample);
  }

  function loadScoreTable() {
    fetch(SCORE_URL)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.text();
      })
      .then(function (text) {
        scoreTable = window.PRSEngine.parseScoreTable(text);
        if (!scoreTable.entries.length) {
          throw new Error("scoring table has no variants");
        }
        renderAttribution(scoreTable.meta, scoreTable.entries.length);
      })
      .catch(function (err) {
        // Fail loudly. No fabricated fallback score.
        disableInputs();
        showError(
          "The scoring table could not be loaded, so no score can be computed. " +
            "This is a load error, not a result. (" +
            err.message +
            ")"
        );
      });
  }

  function loadSample() {
    setStatus("Loading a sample genotype file...", true);
    fetch(SAMPLE_URL)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.text();
      })
      .then(function (text) {
        analyze(text, "sample-genome.txt (synthetic)");
      })
      .catch(function (err) {
        showError("Could not load the sample file. (" + err.message + ")");
      });
  }

  function readFile(file) {
    if (!scoreTable) {
      showError("Still loading the scoring table. Try again in a moment.");
      return;
    }
    setStatus("Reading " + escapeHtml(file.name) + " on your device...", true);
    var reader = new FileReader();
    reader.onload = function (e) {
      analyze(e.target.result, file.name);
    };
    reader.onerror = function () {
      showError("Could not read that file. Please try again.");
    };
    reader.readAsText(file);
  }

  function analyze(text, label) {
    var genotype;
    try {
      genotype = window.PRSEngine.parseGenotypeText(text);
    } catch (err) {
      showError("Could not parse that file: " + err.message);
      return;
    }

    if (genotype.variantCount === 0) {
      showError(
        "No genotype calls were found in that file. Upload an unmodified " +
          "23andMe or AncestryDNA text export (not a .zip, PDF, or spreadsheet)."
      );
      return;
    }

    var result = window.PRSEngine.computePRS(genotype, scoreTable);
    renderResult(result, genotype, label);
  }

  /* ---------- rendering ---------- */

  function renderAttribution(meta, variantCount) {
    var parts = [];
    if (meta.pgs_id) parts.push(meta.pgs_id);
    if (meta.trait_reported) parts.push(meta.trait_reported);
    parts.push(variantCount + " variants");
    if (meta.genome_build) parts.push(meta.genome_build);

    var html = "Score: " + escapeHtml(parts.join(" . ")) + ".";
    if (meta.citation) {
      html += " Source: " + escapeHtml(meta.citation) + ".";
    }
    if (meta.license) {
      html += " License: " + escapeHtml(meta.license) + ".";
    }
    html +=
      " Score data from the PGS Catalog (Lambert et al., Nature Genetics 2021 & 2024).";
    els.attribution.innerHTML = html;
  }

  function renderResult(result, genotype, label) {
    clearStatus();

    var coveragePct = Math.round(result.coverage * 100);
    var normPct = ((result.normalisedScore + 1) / 2) * 100;
    normPct = Math.max(0, Math.min(100, normPct));

    var meta = result.meta || {};
    var trait = meta.trait_reported || result.name;
    var pgsLine = [meta.pgs_id, meta.genome_build].filter(Boolean).join(" . ");

    var html = "";
    html += '<div class="prs-result-head">';
    html += "<div>";
    html += '<p class="prs-result-trait">' + escapeHtml(trait) + "</p>";
    if (pgsLine) html += '<span class="prs-result-pgs">' + escapeHtml(pgsLine) + "</span>";
    html += "</div>";
    html +=
      '<div class="prs-result-file"><i class="fas fa-lock"></i> ' +
      escapeHtml(label) +
      "<br>scored on your device</div>";
    html += "</div>";

    // Relative-position bar.
    html += '<div class="prs-scorebar-label"><span>fewer scored risk alleles</span>';
    html += "<span>more scored risk alleles</span></div>";
    html += '<div class="prs-scorebar"><div class="prs-scorebar-marker" style="left:' +
      normPct.toFixed(1) + '%"></div></div>';
    html +=
      '<p class="prs-scorebar-caption">Your genotype sits at <strong>' +
      normPct.toFixed(0) +
      "%</strong> of the range between the lowest and highest possible score for these " +
      result.totalVariants +
      " variants. This is a relative position, not a percentile, probability, or risk.</p>";

    // Stat chips.
    html += '<div class="prs-stats">';
    html += stat(result.matchedVariants + "/" + result.totalVariants, "variants found");
    html += stat(coveragePct + "%", "coverage");
    html += stat(result.rawScore.toFixed(3), "weighted score");
    html += "</div>";

    if (result.coverage < 0.9) {
      html +=
        '<div class="prs-coverage-note"><i class="fas fa-triangle-exclamation"></i>' +
        "<span>Only " +
        coveragePct +
        "% of this score's variants were present in your file. Consumer arrays " +
        "genotype a fraction of a research score, so read this as approximate.</span></div>";
    }

    if (result.matchedVariants === 0) {
      html +=
        '<div class="prs-coverage-note"><i class="fas fa-circle-exclamation"></i>' +
        "<span>None of this score's variants were found in your file, so the score " +
        "is zero by default rather than a real measurement.</span></div>";
    }

    html += renderTable(result);

    html +=
      '<div class="prs-again"><button class="prs-btn prs-btn-primary" type="button" ' +
      'id="againBtn"><i class="fas fa-rotate-left"></i> Score another file</button></div>';

    els.result.innerHTML = html;
    els.result.hidden = false;

    var again = document.getElementById("againBtn");
    if (again) {
      again.addEventListener("click", function () {
        els.result.hidden = true;
        els.dropZone.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    els.result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderTable(result) {
    var matched = result.contributions.filter(function (c) {
      return c.matched;
    });
    matched.sort(function (a, b) {
      return Math.abs(b.contribution) - Math.abs(a.contribution);
    });

    var shown = matched.slice(0, MAX_TABLE_ROWS);
    var rows = shown
      .map(function (c) {
        var cls = c.contribution > 0 ? "pos" : c.contribution < 0 ? "neg" : "";
        return (
          "<tr>" +
          td(c.rsid) +
          td(c.genotype) +
          td(c.effectAllele) +
          td(String(c.dosage)) +
          td(fmt(c.weight)) +
          '<td class="' + cls + '">' + fmt(c.contribution) + "</td>" +
          "</tr>"
        );
      })
      .join("");

    var caption =
      "Every scored variant found in your file, with its exact contribution. ";
    if (matched.length > shown.length) {
      caption += "Showing the top " + shown.length + " of " + matched.length + " by size. ";
    }
    caption += result.missingVariants + " scored variants were not in your file.";

    return (
      '<details class="prs-details"><summary>Show the math (' +
      matched.length +
      " variants contributed)</summary>" +
      '<p class="prs-scorebar-caption" style="text-align:left">' +
      escapeHtml(caption) +
      "</p>" +
      '<div class="prs-table-wrap"><table class="prs-table"><thead><tr>' +
      "<th>rsID</th><th>your genotype</th><th>effect allele</th>" +
      "<th>dosage</th><th>weight</th><th>contribution</th>" +
      "</tr></thead><tbody>" +
      rows +
      "</tbody></table></div></details>"
    );
  }

  function stat(value, label) {
    return (
      '<div class="prs-stat"><div class="prs-stat-value">' +
      escapeHtml(value) +
      '</div><div class="prs-stat-label">' +
      escapeHtml(label) +
      "</div></div>"
    );
  }

  /* ---------- status helpers ---------- */

  function setStatus(message, spinning) {
    els.result.hidden = true;
    els.status.className = "prs-status";
    els.status.innerHTML =
      (spinning ? '<div class="prs-spinner"></div>' : "") + escapeHtml(message);
    els.status.hidden = false;
  }

  function clearStatus() {
    els.status.hidden = true;
    els.status.innerHTML = "";
  }

  function showError(message) {
    els.result.hidden = true;
    els.status.className = "prs-status is-error";
    els.status.innerHTML =
      '<i class="fas fa-circle-exclamation"></i> ' + escapeHtml(message);
    els.status.hidden = false;
  }

  function disableInputs() {
    els.dropZone.style.pointerEvents = "none";
    els.dropZone.style.opacity = "0.5";
    els.sampleBtn.disabled = true;
  }

  /* ---------- formatting ---------- */

  function fmt(n) {
    if (n === 0) return "0";
    var abs = Math.abs(n);
    if (abs < 0.001 || abs >= 1000) return n.toExponential(2);
    return (n > 0 ? "+" : "") + n.toFixed(3);
  }

  function td(text) {
    return "<td>" + escapeHtml(text) + "</td>";
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }
})();
