/**
 * analyzer.js: controller for the on-device DNA sequence workbench.
 *
 * The user's sequence file is read with FileReader and analyzed in-page via
 * window.SequenceEngine (a deterministic port of the DNAnalyzer Java engine).
 * It is never uploaded: the only network requests this page makes are for its
 * own static assets (the engine, Chart.js, the bundled sample, fonts).
 *
 * There is NO server dependency in the default path. An optional, default-OFF
 * "self-host" toggle can load ../assets/js/api-client.js and route analysis
 * through a DNAnalyzer server the user runs themselves; with the toggle off,
 * everything here works with no server running.
 *
 * Fail-loud philosophy (mirrors prs.js): on any parse/load error we show a
 * visible error and never a fabricated or partial result.
 */
(function () {
  "use strict";

  var SAMPLE_URL = "data/sample.fa";
  var MAX_ORF_ROWS = 100;
  var MAX_CODON_ROWS = 200;
  var MAX_PROTEIN_ROWS = 25;
  var MAX_PROMOTER_ROWS = 200;
  var ORF_MIN_PROTEIN_AA = 10; // protein prediction minimum length (amino acids)

  var els = {};
  var currentFileName = null;
  var loadedText = null; // most recently loaded raw file text
  var lastResult = null; // { fileName, ... , report } for export
  var charts = []; // active Chart.js instances, destroyed between runs
  var selfHostLoaded = false;

  document.addEventListener("DOMContentLoaded", function () {
    els.dropZone = document.getElementById("fileDropZone");
    els.fileInput = document.getElementById("fileInput");
    els.analyzeBtn = document.getElementById("analyzeBtn");
    els.importSampleBtn = document.getElementById("importSampleBtn");
    els.resetOptionsBtn = document.getElementById("resetOptionsBtn");
    els.status = document.getElementById("statusArea");
    els.resultsSection = document.getElementById("resultsSection");
    els.resultsContent = document.getElementById("resultsContent");
    els.resultsFileName = document.getElementById("resultsFileName");
    els.exportBtn = document.getElementById("exportBtn");
    els.selfHostToggle = document.getElementById("selfHostToggle");
    els.apiStatusContainer = document.getElementById("apiStatusContainer");
    els.apiStatus = document.getElementById("apiStatus");
    els.mobileToggle = document.getElementById("mobileToggle");
    els.navLinks = document.getElementById("navLinks");

    if (!window.SequenceEngine) {
      showError(
        "The on-device sequence engine failed to load, so no analysis can run. " +
          "This is a load error, not a result. Reload the page."
      );
      disableInputs();
      return;
    }

    wireInputs();
  });

  /* ---------- wiring ---------- */

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
        els.dropZone.classList.add("drag-over");
      });
    });
    ["dragleave", "drop"].forEach(function (type) {
      els.dropZone.addEventListener(type, function (e) {
        e.preventDefault();
        els.dropZone.classList.remove("drag-over");
      });
    });
    els.dropZone.addEventListener("drop", function (e) {
      var dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) readFile(dt.files[0]);
    });

    els.analyzeBtn.addEventListener("click", runAnalysis);
    els.importSampleBtn.addEventListener("click", loadSample);
    els.resetOptionsBtn.addEventListener("click", resetOptions);
    els.exportBtn.addEventListener("click", exportJson);
    els.selfHostToggle.addEventListener("change", onSelfHostToggle);

    if (els.mobileToggle && els.navLinks) {
      els.mobileToggle.addEventListener("click", function () {
        els.navLinks.classList.toggle("active");
      });
    }
  }

  /* ---------- file input ---------- */

  function loadSample() {
    setStatus("Loading a sample FASTA file...", true);
    fetch(SAMPLE_URL)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.text();
      })
      .then(function (text) {
        loadedText = text;
        currentFileName = "sample.fa";
        onFileReady();
      })
      .catch(function (err) {
        showError("Could not load the sample file. (" + err.message + ")");
      });
  }

  function readFile(file) {
    setStatus("Reading " + escapeHtml(file.name) + " on your device...", true);
    var reader = new FileReader();
    reader.onload = function (e) {
      loadedText = e.target.result;
      currentFileName = file.name;
      onFileReady();
    };
    reader.onerror = function () {
      showError("Could not read that file. Please try again.");
    };
    reader.readAsText(file);
  }

  function onFileReady() {
    els.analyzeBtn.disabled = false;
    els.dropZone.querySelector("h3").textContent = "Loaded: " + currentFileName;
    els.dropZone.querySelector("p").textContent =
      "Ready. Choose options and run analysis, or drop a different file.";
    setStatus(
      '<i class="fas fa-check"></i> ' +
        escapeHtml(currentFileName) +
        " is loaded on your device. Click “Run analysis”.",
      false
    );
  }

  /* ---------- options ---------- */

  function selectedOptions() {
    var checked = document.querySelectorAll(
      'input[name="analysis-option"]:checked'
    );
    var opts = {};
    Array.prototype.forEach.call(checked, function (c) {
      opts[c.value] = true;
    });
    return opts;
  }

  function resetOptions() {
    var defaults = {
      "sequence-length": true,
      "gc-content": true,
      "base-composition": true,
      "codon-usage": true,
      orfs: true,
      "protein-prediction": true,
      "promoter-detection": false,
      charts: false
    };
    var all = document.querySelectorAll('input[name="analysis-option"]');
    Array.prototype.forEach.call(all, function (c) {
      c.checked = !!defaults[c.value];
    });
  }

  /* ---------- run ---------- */

  function runAnalysis() {
    if (loadedText == null) {
      showError("Load a file (or import the sample) before running an analysis.");
      return;
    }
    var options = selectedOptions();
    if (Object.keys(options).length === 0) {
      showError("Select at least one analysis option.");
      return;
    }

    // Optional self-host path: only reachable when the toggle is on AND the
    // API client actually loaded. Otherwise we always run on-device.
    if (els.selfHostToggle.checked && selfHostLoaded && window.DNAnalyzerAPI) {
      runServerAnalysis(options);
      return;
    }

    var parsed;
    try {
      parsed = window.SequenceEngine.parseSequenceFile(loadedText);
    } catch (err) {
      showError("Could not parse that file: " + err.message);
      return;
    }
    if (!parsed.sequence || parsed.sequence.length === 0) {
      showError(
        "No sequence data was found in that file. Upload a FASTA (starts with " +
          "“>”), FASTQ (starts with “@”), or a plain sequence file."
      );
      return;
    }

    var report;
    try {
      report = analyzeOnDevice(parsed.sequence, options);
    } catch (err) {
      showError("Analysis failed while computing results: " + err.message);
      return;
    }

    lastResult = {
      fileName: currentFileName,
      format: parsed.format,
      header: parsed.header,
      options: options,
      report: report
    };
    renderResults(parsed, options, report);
  }

  /**
   * Run every selected analysis on-device via SequenceEngine. Returns a plain
   * data object; rendering is separate so the same data can be exported.
   */
  function analyzeOnDevice(seq, options) {
    var E = window.SequenceEngine;
    var report = {};

    report.length = E.length(seq);

    if (options["gc-content"]) {
      report.gcContentFraction = E.gcContent(seq);
    }
    if (options["base-composition"] || options.charts) {
      report.baseCounts = E.nucleotideCounts(seq);
    }
    if (options["codon-usage"]) {
      report.codonUsage = E.codonUsage(seq);
    }
    if (options.orfs || options.charts) {
      report.orfs = E.scanOrfs(seq);
    }
    if (options["protein-prediction"]) {
      // findProteins scans the 3 forward frames for ATG..stop and throws on a
      // non-M start; we always request the default methionine start.
      report.proteins = E.findProteins(seq, "M", ORF_MIN_PROTEIN_AA, MAX_PROTEIN_ROWS);
    }
    if (options["promoter-detection"]) {
      report.promoters = E.scanPromoters(seq);
      report.promoterLabel = E.PROMOTER_MOTIFS_LABEL;
    }
    return report;
  }

  /* ---------- rendering ---------- */

  function renderResults(parsed, options, report) {
    clearStatus();
    destroyCharts();

    var html = "";

    // Provenance line.
    html +=
      '<p class="analyzer-provenance"><i class="fas fa-lock"></i> ' +
      escapeHtml(currentFileName) +
      " · detected format: " +
      escapeHtml(parsed.format) +
      (parsed.header ? " · header: " + escapeHtml(parsed.header) : "") +
      " · computed on your device, deterministically.</p>";

    // Summary stat cards.
    html += '<div class="results-grid">';
    if (options["sequence-length"]) {
      html += statCard(report.length.toLocaleString(), "bases (length)");
    }
    if (options["gc-content"]) {
      html += statCard(
        (report.gcContentFraction * 100).toFixed(2) + "%",
        "GC content"
      );
    }
    if (report.baseCounts && options["base-composition"]) {
      html += statCard(report.baseCounts.N.toLocaleString(), "ambiguous bases (N)");
    }
    if (report.orfs && options.orfs) {
      html += statCard(
        report.orfs.length.toLocaleString(),
        "ORFs found (both strands)"
      );
    }
    html += "</div>";

    // Base composition bar.
    if (report.baseCounts && options["base-composition"]) {
      html += renderBaseComposition(report.baseCounts, report.length);
    }

    // Codon usage table.
    if (options["codon-usage"]) {
      html += renderCodonUsage(report.codonUsage);
    }

    // ORF table.
    if (options.orfs) {
      html += renderOrfTable(report.orfs);
    }

    // Protein predictions.
    if (options["protein-prediction"]) {
      html += renderProteins(report.proteins);
    }

    // Promoter motifs.
    if (options["promoter-detection"]) {
      html += renderPromoters(report.promoters, report.promoterLabel);
    }

    // Charts placeholder (canvases wired after DOM insert).
    if (options.charts) {
      html += renderChartsShell();
    }

    // Methods / show-the-math.
    html += renderMethods();

    els.resultsContent.innerHTML = html;
    els.resultsFileName.textContent = currentFileName;
    els.resultsSection.style.display = "";

    if (options.charts) {
      buildCharts(report);
    }

    els.resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function statCard(value, label) {
    return (
      '<div class="result-card"><div class="result-value">' +
      escapeHtml(String(value)) +
      '</div><div class="result-label">' +
      escapeHtml(label) +
      "</div></div>"
    );
  }

  function renderBaseComposition(counts, total) {
    var order = [
      { key: "A", cls: "base-a" },
      { key: "T", cls: "base-t" },
      { key: "G", cls: "base-g" },
      { key: "C", cls: "base-c" }
    ];
    var denom = total || 1;
    var bar = "";
    var legend = "";
    order.forEach(function (b) {
      var count = counts[b.key] || 0;
      var pct = (count / denom) * 100;
      var pctLabel = pct.toFixed(1);
      if (pct > 0) {
        bar +=
          '<div class="base-segment ' +
          b.cls +
          '" style="width:' +
          pct +
          '%" title="' +
          b.key +
          ": " +
          count +
          " (" +
          pctLabel +
          '%)">' +
          (pct > 6 ? b.key : "") +
          "</div>";
      }
      legend +=
        '<div class="legend-item"><span class="color-box ' +
        b.cls +
        '"></span>' +
        b.key +
        " " +
        count.toLocaleString() +
        " (" +
        pctLabel +
        "%)</div>";
    });
    var nCount = counts.N || 0;
    if (nCount > 0) {
      legend +=
        '<div class="legend-item"><span class="color-box" ' +
        'style="background:var(--medium-gray)"></span>N ' +
        nCount.toLocaleString() +
        " (" +
        ((nCount / denom) * 100).toFixed(1) +
        "%)</div>";
    }
    return (
      '<div class="results-table-container"><h3>Base composition</h3>' +
      '<div class="base-composition"><div class="base-bar">' +
      bar +
      "</div></div>" +
      '<div class="base-legend">' +
      legend +
      "</div></div>"
    );
  }

  function renderCodonUsage(usage) {
    var entries = Object.keys(usage).map(function (codon) {
      return { codon: codon, count: usage[codon] };
    });
    entries.sort(function (a, b) {
      return b.count - a.count || (a.codon < b.codon ? -1 : 1);
    });
    var total = entries.reduce(function (s, e) {
      return s + e.count;
    }, 0);
    var shown = entries.slice(0, MAX_CODON_ROWS);
    var E = window.SequenceEngine;

    var rows = shown
      .map(function (e) {
        var aa = E.CODON_TABLE.hasOwnProperty(e.codon)
          ? E.CODON_TABLE[e.codon]
          : "X";
        var pct = total ? ((e.count / total) * 100).toFixed(1) : "0.0";
        return (
          "<tr>" +
          td(e.codon) +
          td(aa === "*" ? "stop" : aa) +
          td(String(e.count)) +
          td(pct + "%") +
          "</tr>"
        );
      })
      .join("");

    var caption =
      "Codons counted by stepping through the sequence in non-overlapping " +
      "triplets from position 0 (frame 0). Only pure A/C/G/T codons are counted; " +
      total +
      " codons total.";
    if (entries.length > shown.length) {
      caption +=
        " Showing the top " + shown.length + " of " + entries.length + " codons.";
    }

    return (
      '<div class="results-table-container"><h3>Codon usage (frame 0)</h3>' +
      '<p class="analyzer-caption">' +
      escapeHtml(caption) +
      "</p>" +
      '<table class="results-table"><thead><tr>' +
      "<th>Codon</th><th>Amino acid</th><th>Count</th><th>Share</th>" +
      "</tr></thead><tbody>" +
      (rows || '<tr><td colspan="4">No complete codons found.</td></tr>') +
      "</tbody></table></div>"
    );
  }

  function renderOrfTable(orfs) {
    var shown = orfs.slice(0, MAX_ORF_ROWS);
    var rows = shown
      .map(function (o) {
        var protein = o.aminoAcidSequence || "";
        var proteinShort =
          protein.length > 40 ? protein.slice(0, 40) + "…" : protein;
        return (
          "<tr>" +
          td(o.strand) +
          td(String(o.frame)) +
          td(String(o.start)) +
          td(String(o.end)) +
          td(String(o.length)) +
          '<td class="sequence-cell" title="' +
          escapeHtml(protein) +
          '">' +
          escapeHtml(proteinShort) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    var caption =
      "ORFs are scanned on both strands across all 3 reading frames: each run " +
      "from an ATG start codon to the next in-frame stop codon (TAA/TAG/TGA), " +
      "then translated with the standard codon table (unknown codon → X).";
    var caveat =
      "Coordinates on the − strand are indices into the reverse-complement " +
      "string, not into the original forward sequence.";
    if (orfs.length > shown.length) {
      caption +=
        " Showing the first " + shown.length + " of " + orfs.length + " ORFs.";
    }

    return (
      '<div class="results-table-container"><h3>Open reading frames</h3>' +
      '<p class="analyzer-caption">' +
      escapeHtml(caption) +
      '</p><p class="analyzer-caption analyzer-caveat">' +
      '<i class="fas fa-triangle-exclamation"></i> ' +
      escapeHtml(caveat) +
      "</p>" +
      '<table class="results-table"><thead><tr>' +
      "<th>Strand</th><th>Frame</th><th>Start</th><th>End</th><th>Length (nt)</th>" +
      "<th>Translated protein</th></tr></thead><tbody>" +
      (rows || '<tr><td colspan="6">No ORFs found.</td></tr>') +
      "</tbody></table></div>"
    );
  }

  function renderProteins(proteins) {
    var rows = (proteins || [])
      .map(function (p) {
        var seq = p.sequence || "";
        var shortSeq = seq.length > 50 ? seq.slice(0, 50) + "…" : seq;
        return (
          "<tr>" +
          td(String(p.start)) +
          td(String(p.end)) +
          td(String(p.length)) +
          '<td class="sequence-cell" title="' +
          escapeHtml(seq) +
          '">' +
          escapeHtml(shortSeq) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    var caption =
      "Candidate proteins are ATG…stop runs on the 3 forward frames whose " +
      "translation is at least " +
      ORF_MIN_PROTEIN_AA +
      " amino acids, sorted longest first. Every one begins with methionine (M).";

    return (
      '<div class="results-table-container"><h3>Protein predictions</h3>' +
      '<p class="analyzer-caption">' +
      escapeHtml(caption) +
      "</p>" +
      '<table class="results-table"><thead><tr>' +
      "<th>Start</th><th>End</th><th>Length (aa)</th><th>Sequence</th>" +
      "</tr></thead><tbody>" +
      (rows ||
        '<tr><td colspan="4">No proteins of at least ' +
          ORF_MIN_PROTEIN_AA +
          " amino acids were found.</td></tr>") +
      "</tbody></table></div>"
    );
  }

  function renderPromoters(promoters, label) {
    var shown = (promoters || []).slice(0, MAX_PROMOTER_ROWS);
    var rows = shown
      .map(function (m) {
        return (
          "<tr>" +
          td(m.element) +
          td(String(m.position)) +
          '<td class="sequence-cell">' +
          escapeHtml(m.match) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    var caption =
      (label || "Simplified educational core-promoter motifs") +
      ". These are simplified regex motifs (TATA, BRE, INR, DPE), not full " +
      "biological consensus models, useful for teaching, not annotation.";
    if ((promoters || []).length > shown.length) {
      caption +=
        " Showing the first " +
        shown.length +
        " of " +
        promoters.length +
        " matches.";
    }

    return (
      '<div class="results-table-container"><h3>Promoter motifs ' +
      '<span class="analyzer-tag">educational</span></h3>' +
      '<p class="analyzer-caption">' +
      escapeHtml(caption) +
      "</p>" +
      '<table class="results-table"><thead><tr>' +
      "<th>Element</th><th>Position</th><th>Match</th>" +
      "</tr></thead><tbody>" +
      (rows || '<tr><td colspan="3">No promoter motifs matched.</td></tr>') +
      "</tbody></table></div>"
    );
  }

  function renderChartsShell() {
    return (
      '<div class="results-table-container"><h3>Charts</h3>' +
      '<div class="analyzer-charts">' +
      '<div class="chart-container"><canvas id="baseChart" height="240"></canvas></div>' +
      '<div class="chart-container"><canvas id="orfChart" height="240"></canvas></div>' +
      "</div></div>"
    );
  }

  function renderMethods() {
    var items = [];
    items.push(
      "<strong>Length &amp; GC.</strong> Length is the character count after " +
        "uppercasing. GC content is (G + C) / length, reported as a fraction " +
        "× 100. Empty sequence → 0."
    );
    items.push(
      "<strong>Base composition.</strong> A/C/G/T/N are counted directly; any " +
        "base outside A/C/G/T is normalized to N."
    );
    items.push(
      "<strong>Codon usage.</strong> The sequence is walked in non-overlapping " +
        "triplets from index 0; only pure A/C/G/T codons are tallied."
    );
    items.push(
      "<strong>ORFs.</strong> Both strands × 3 frames are scanned for " +
        "ATG…(TAA|TAG|TGA) runs and translated with the standard codon " +
        "table. Minus-strand coordinates index the reverse-complement string."
    );
    items.push(
      "<strong>Proteins.</strong> The 3 forward frames are scanned for " +
        "ATG…stop translations of at least " +
        ORF_MIN_PROTEIN_AA +
        " amino acids, sorted longest first."
    );
    items.push(
      "<strong>Promoter motifs.</strong> Fixed regexes for TATA/BRE/INR/DPE are " +
        "matched non-overlapping. Simplified and educational, not consensus models."
    );
    items.push(
      "<strong>Determinism.</strong> There is no model and no randomness: these " +
        "are direct ports of the DNAnalyzer Java engine, so identical input " +
        "always yields identical output."
    );
    return (
      '<details class="analyzer-details"><summary>Show the methods / show the math</summary>' +
      "<ul>" +
      items
        .map(function (i) {
          return "<li>" + i + "</li>";
        })
        .join("") +
      "</ul></details>"
    );
  }

  /* ---------- charts ---------- */

  function destroyCharts() {
    charts.forEach(function (c) {
      try {
        c.destroy();
      } catch (e) {
        /* ignore */
      }
    });
    charts = [];
  }

  function buildCharts(report) {
    if (typeof Chart === "undefined") {
      // Fail honestly rather than silently omit.
      var shell = els.resultsContent.querySelector(".analyzer-charts");
      if (shell) {
        shell.innerHTML =
          '<p class="analyzer-caveat"><i class="fas fa-triangle-exclamation"></i> ' +
          "Chart.js did not load, so charts are unavailable. The tables above " +
          "still contain every number.</p>";
      }
      return;
    }

    // Base composition pie.
    var baseCanvas = document.getElementById("baseChart");
    if (baseCanvas && report.baseCounts) {
      var counts = report.baseCounts;
      var pie = new Chart(baseCanvas.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["A", "T", "G", "C", "N"],
          datasets: [
            {
              data: [counts.A, counts.T, counts.G, counts.C, counts.N],
              backgroundColor: [
                "#ff0066",
                "#00a4ef",
                "#ff6900",
                "#34c759",
                "#8a8a9a"
              ]
            }
          ]
        },
        options: {
          plugins: {
            legend: { labels: { color: "#c9c9d6" } },
            title: {
              display: true,
              text: "Base composition",
              color: "#ffffff"
            }
          }
        }
      });
      charts.push(pie);
    }

    // ORF length-by-position bar chart.
    var orfCanvas = document.getElementById("orfChart");
    if (orfCanvas && report.orfs) {
      var orfs = report.orfs.slice(0, 40);
      var bar = new Chart(orfCanvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: orfs.map(function (o) {
            return o.strand + "@" + o.start;
          }),
          datasets: [
            {
              label: "ORF length (nt)",
              data: orfs.map(function (o) {
                return o.length;
              }),
              backgroundColor: "#00a4ef"
            }
          ]
        },
        options: {
          scales: {
            x: {
              ticks: { color: "#8a8a9a" },
              title: { display: true, text: "strand@start", color: "#c9c9d6" }
            },
            y: { ticks: { color: "#8a8a9a" }, beginAtZero: true }
          },
          plugins: {
            legend: { labels: { color: "#c9c9d6" } },
            title: {
              display: true,
              text: "ORF length by start position (first 40)",
              color: "#ffffff"
            }
          }
        }
      });
      charts.push(bar);
    }
  }

  /* ---------- export ---------- */

  function exportJson() {
    if (!lastResult) {
      showError("Run an analysis before exporting.");
      return;
    }
    var payload = {
      tool: "DNAnalyzer on-device sequence workbench",
      generatedAt: new Date().toISOString(),
      note:
        "Computed entirely in the browser with a deterministic engine. " +
        "The file name is recorded; the file contents are not included.",
      fileName: lastResult.fileName,
      format: lastResult.format,
      header: lastResult.header,
      options: lastResult.options,
      results: lastResult.report
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (lastResult.fileName || "analysis") + ".analysis.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ---------- optional self-host toggle ---------- */

  function onSelfHostToggle() {
    if (!els.selfHostToggle.checked) {
      els.apiStatusContainer.hidden = true;
      return;
    }
    els.apiStatusContainer.hidden = false;
    if (selfHostLoaded && window.DNAnalyzerAPI) {
      checkApiStatus();
      return;
    }
    setApiStatus("pulse", "Loading the API client...");
    var script = document.createElement("script");
    script.src = "../assets/js/api-client.js";
    script.onload = function () {
      selfHostLoaded = true;
      checkApiStatus();
    };
    script.onerror = function () {
      setApiStatus("offline", "Could not load the API client.");
    };
    document.head.appendChild(script);
  }

  function checkApiStatus() {
    if (!window.DNAnalyzerAPI) {
      setApiStatus("offline", "API client not available.");
      return;
    }
    setApiStatus("pulse", "Checking connection...");
    window.DNAnalyzerAPI.checkStatus()
      .then(function () {
        setApiStatus("online", "Connected to a local DNAnalyzer server.");
      })
      .catch(function () {
        setApiStatus(
          "offline",
          "No DNAnalyzer server reachable. Analysis will run on-device."
        );
      });
  }

  function setApiStatus(dotClass, message) {
    els.apiStatus.innerHTML =
      '<div class="status-indicator"><div class="status-dot ' +
      dotClass +
      '"></div><span>' +
      escapeHtml(message) +
      "</span></div>";
  }

  function runServerAnalysis(options) {
    setStatus("Sending the sequence to your local DNAnalyzer server...", true);
    var file = new File([loadedText], currentFileName || "sequence.fa", {
      type: "text/plain"
    });
    window.DNAnalyzerAPI.analyzeDNA(file, {
      options: Object.keys(options)
    })
      .then(function (data) {
        clearStatus();
        els.resultsContent.innerHTML =
          '<p class="analyzer-provenance"><i class="fas fa-server"></i> ' +
          escapeHtml(currentFileName) +
          " · analyzed by your self-hosted DNAnalyzer server.</p>" +
          '<pre class="analyzer-server-raw">' +
          escapeHtml(
            typeof data === "string" ? data : JSON.stringify(data, null, 2)
          ) +
          "</pre>";
        els.resultsFileName.textContent = currentFileName;
        els.resultsSection.style.display = "";
        els.resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch(function (err) {
        showError(
          "The self-hosted server request failed (" +
            err.message +
            "). Turn the toggle off to run on-device instead."
        );
      });
  }

  /* ---------- status helpers ---------- */

  function setStatus(message, spinning) {
    els.status.className = "analyzer-status";
    els.status.innerHTML =
      (spinning ? '<span class="analyzer-spinner"></span>' : "") + message;
    els.status.hidden = false;
  }

  function clearStatus() {
    els.status.hidden = true;
    els.status.innerHTML = "";
  }

  function showError(message) {
    els.resultsSection.style.display = "none";
    els.status.className = "analyzer-status is-error";
    els.status.innerHTML =
      '<i class="fas fa-circle-exclamation"></i> ' + escapeHtml(message);
    els.status.hidden = false;
    els.status.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function disableInputs() {
    if (els.dropZone) {
      els.dropZone.style.pointerEvents = "none";
      els.dropZone.style.opacity = "0.5";
    }
    if (els.analyzeBtn) els.analyzeBtn.disabled = true;
    if (els.importSampleBtn) els.importSampleBtn.disabled = true;
  }

  /* ---------- formatting ---------- */

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
        "'": "&#39;"
      }[c];
    });
  }
})();
