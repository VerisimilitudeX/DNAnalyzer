/**
 * app.js: controller for the on-device "understand your DNA file" report.
 *
 * The user's genotype file is read with FileReader and parsed ONCE with
 * PRSEngine.parseGenotypeText. That single parsed object is then handed to each
 * section engine (ancestry, traits, polygenic scores, carrier variants) and to
 * the data explorer. The file is never uploaded: the only network requests this
 * page makes are for its own static assets and bundled reference datasets.
 *
 * Each section loads its own dataset and renders independently. If a dataset
 * fails to load, that section shows a LOUD error (mirroring prs.js showError)
 * while the other sections still render.
 */
(function () {
  "use strict";

  var SAMPLE_URL = "data/sample-genome.txt";
  var ANCESTRY_URL = "data/ancestry/aim_panel.json";
  var TRAITS_URL = "data/traits/traits.json";
  var VARIANTS_URL = "data/variants/carrier_variants.json";
  var PRS_INDEX_URL = "data/prs/index.json";
  var MAX_TABLE_ROWS = 200;

  var els = {};
  // Loaded datasets (or an Error placeholder if the fetch failed).
  var data = {
    ancestry: undefined,
    traits: undefined,
    variants: undefined,
    prsIndex: undefined,
    prsScores: {}, // pgs_id -> parsed score table
  };
  // The most recent parsed genotype + label, kept for the report builder.
  var current = null;

  document.addEventListener("DOMContentLoaded", function () {
    els.dropZone = document.getElementById("dropZone");
    els.fileInput = document.getElementById("fileInput");
    els.sampleBtn = document.getElementById("sampleBtn");
    els.status = document.getElementById("statusArea");
    els.nav = document.getElementById("sectionNav");
    els.report = document.getElementById("report");
    els.sec = {
      ancestry: document.getElementById("sec-ancestry"),
      traits: document.getElementById("sec-traits"),
      prs: document.getElementById("sec-prs"),
      carrier: document.getElementById("sec-carrier"),
      explorer: document.getElementById("sec-explorer"),
      report: document.getElementById("sec-report"),
    };

    wireInputs();
    preloadDatasets();
  });

  /* ---------- input wiring (cloned from prs.js) ---------- */

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

  /* ---------- dataset loading (fail per-section, not app-wide) ---------- */

  function preloadDatasets() {
    fetchJson(ANCESTRY_URL, "ancestry");
    fetchJson(TRAITS_URL, "traits");
    fetchJson(VARIANTS_URL, "variants");
    fetchPrsIndex();
  }

  function fetchJson(url, key) {
    fetch(url)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.json();
      })
      .then(function (json) {
        data[key] = json;
        if (current) renderIfLoaded(key);
      })
      .catch(function (err) {
        data[key] = new Error(err.message);
        if (current) renderIfLoaded(key);
      });
  }

  function fetchPrsIndex() {
    fetch(PRS_INDEX_URL)
      .then(function (resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.json();
      })
      .then(function (json) {
        data.prsIndex = json;
        // Fetch each scoring file listed in the manifest.
        var scores = (json && json.scores) || [];
        return Promise.all(
          scores.map(function (s) {
            return fetch("data/prs/" + s.file)
              .then(function (r) {
                if (!r.ok) throw new Error("HTTP " + r.status);
                return r.text();
              })
              .then(function (text) {
                data.prsScores[s.pgs_id] = window.PRSEngine.parseScoreTable(text);
              })
              .catch(function (err) {
                data.prsScores[s.pgs_id] = new Error(err.message);
              });
          })
        );
      })
      .then(function () {
        if (current) renderIfLoaded("prs");
      })
      .catch(function (err) {
        data.prsIndex = new Error(err.message);
        if (current) renderIfLoaded("prs");
      });
  }

  // Re-render a single section once its (late-arriving) dataset resolves.
  function renderIfLoaded(key) {
    if (key === "ancestry") renderAncestry();
    else if (key === "traits") renderTraits();
    else if (key === "variants") renderCarrier();
    else if (key === "prs") renderPRS();
  }

  /* ---------- file reading (cloned from prs.js) ---------- */

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

  /* ---------- parse once, render all ---------- */

  function analyze(text, label) {
    var genotype;
    try {
      genotype = window.PRSEngine.parseGenotypeText(text);
    } catch (err) {
      showError("Could not parse that file: " + err.message);
      return;
    }

    // Guard, exactly as prs.js does.
    if (genotype.variantCount === 0) {
      showError(
        "No genotype calls were found in that file. Upload an unmodified " +
          "23andMe or AncestryDNA text export (not a .zip, PDF, or spreadsheet)."
      );
      return;
    }

    clearStatus();
    current = { genotype: genotype, label: label };

    els.nav.hidden = false;
    els.report.hidden = false;

    renderAncestry();
    renderTraits();
    renderPRS();
    renderCarrier();
    renderExplorer();
    renderReport();

    els.nav.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- section: ancestry ---------- */

  function renderAncestry() {
    var mount = els.sec.ancestry;
    var head = sectionHead("earth-americas", "Ancestry composition",
      "A coarse, continental-scale estimate from a small published panel of " +
      "ancestry-informative markers with real 1000&nbsp;Genomes Phase&nbsp;3 " +
      "frequencies. Not calibrated to you; can be wrong for mixed or " +
      "under-represented ancestry.", "teal");

    if (data.ancestry === undefined) {
      mount.innerHTML = head + loadingLine("Loading the ancestry panel...");
      return;
    }
    if (data.ancestry instanceof Error) {
      mount.innerHTML = head + sectionError(
        "The ancestry marker panel could not be loaded, so no composition can " +
        "be computed. This is a load error, not a result. (" + data.ancestry.message + ")");
      return;
    }

    var result = window.AncestryEngine.analyze(current.genotype, data.ancestry);
    current.ancestryResult = result;

    var meta = data.ancestry.meta || {};
    var html = head;

    if (!result.ok) {
      html += insufficient(
        "Not enough ancestry-informative markers in your file. Only " +
        result.comparedMarkers + " of the panel's " + result.panelSize +
        " markers were callable, below the minimum of " + result.minMarkers +
        " needed for even a coarse estimate. No composition is shown rather " +
        "than a misleading one.");
      mount.innerHTML = html;
      return;
    }

    var labels = meta.population_labels || {};

    // A small donut summarising the composition, built from a conic-gradient of
    // the same percentages shown in the bars. Purely presentational: the bars
    // below remain the accessible source of truth.
    var ancColors = ["var(--sage)", "var(--apricot)", "var(--teal)", "var(--clay)", "var(--blue)"];
    var stops = [];
    var acc = 0;
    result.composition.forEach(function (c, i) {
      if (c.percent <= 0) return;
      var col = ancColors[i % ancColors.length];
      stops.push(col + " " + acc.toFixed(2) + "% " + (acc + c.percent).toFixed(2) + "%");
      acc += c.percent;
    });
    if (acc < 100) stops.push("var(--line) " + acc.toFixed(2) + "% 100%");
    var top = result.composition[0];
    html += '<div class="app-anc">';
    html += '<div class="app-anc-donut-wrap"><div class="app-anc-donut" style="background:conic-gradient(' +
      stops.join(",") + ')"><div class="app-anc-donut-hole"><span class="app-anc-donut-pct">' +
      top.percent.toFixed(0) + '%</span><span class="app-anc-donut-label">' +
      escapeHtml(labels[top.population] || top.population) + '</span></div></div></div>';

    html += '<div class="app-anc-bars">';
    result.composition.forEach(function (c, i) {
      var name = labels[c.population] || c.population;
      var isTop = i === 0;
      var isZero = c.percent <= 0;
      var col = ancColors[i % ancColors.length];
      html += '<div class="app-anc-row' + (isTop ? ' is-top' : '') + (isZero ? ' is-zero' : '') + '">';
      html += '<div class="app-anc-toprow"><span class="app-anc-name">' +
        '<span class="app-anc-dot" style="background:' + col + '"></span>' +
        escapeHtml(name) + '</span><span class="app-anc-pct">' +
        c.percent.toFixed(1) + '%</span></div>';
      html += '<div class="app-anc-track"><div class="app-anc-fill" style="width:' +
        c.percent.toFixed(1) + '%;--anc-color:' + col + '"></div></div>';
      html += '</div>';
    });
    html += '</div>';
    html += '</div>';

    html += '<div class="prs-stats">';
    html += stat(result.comparedMarkers + "/" + result.panelSize, "markers used");
    html += stat(result.populations.length, "reference populations");
    html += stat(fmtPct(result.composition[0].percent), "top: " +
      escapeHtml(labels[result.composition[0].population] || result.composition[0].population));
    html += '</div>';

    // Show the math: per-population log-likelihoods + per-marker table.
    html += showMathAncestry(result, labels);

    // Attribution.
    if (meta.source || meta.citation || meta.panel) {
      html += '<p class="app-var-cite">' +
        escapeHtml([meta.panel, meta.source, meta.citation].filter(Boolean).join(" . ")) +
        '</p>';
    }

    mount.innerHTML = html;
  }

  function showMathAncestry(result, labels) {
    var rows = result.populations
      .map(function (pop) {
        return "<tr>" + td(labels[pop] || pop) + td(result.logLikelihoods[pop].toFixed(2)) + "</tr>";
      })
      .join("");

    var markerRows = result.perMarker
      .map(function (m) {
        var freqCells = result.populations
          .map(function (pop) {
            return td((m.freq[pop] == null ? "-" : Number(m.freq[pop]).toFixed(3)));
          })
          .join("");
        return "<tr>" + td(m.rsid) + td(m.genotype) + td(String(m.dosage)) +
          freqCells + td(m.palindromic ? "yes" : "") + "</tr>";
      })
      .join("");

    var freqHead = result.populations
      .map(function (pop) {
        return "<th>" + escapeHtml(labels[pop] || pop) + " f(alt)</th>";
      })
      .join("");

    return (
      '<details class="prs-details"><summary>Show the math (HWE binomial ' +
      'log-likelihood, softmax over populations)</summary>' +
      '<p class="prs-scorebar-caption" style="text-align:left">For each population we ' +
      'sum the Hardy-Weinberg genotype log-likelihood log[C(2,d)&middot;f<sup>d</sup>&middot;' +
      '(1-f)<sup>2-d</sup>] over your callable markers (d = your alt-allele dosage, f = that ' +
      'population\'s alt-allele frequency), then take a softmax to get the composition above. ' +
      'Higher (less negative) log-likelihood = better fit.</p>' +
      '<div class="prs-table-wrap"><table class="prs-table"><thead><tr>' +
      '<th>population</th><th>log-likelihood</th></tr></thead><tbody>' + rows +
      '</tbody></table></div>' +
      '<p class="prs-scorebar-caption" style="text-align:left;margin-top:1rem">Per-marker detail. ' +
      'Palindromic (A/T, C/G) SNPs are flagged: their strand is ambiguous, so treat them with care.</p>' +
      '<div class="prs-table-wrap"><table class="prs-table"><thead><tr>' +
      '<th>rsID</th><th>genotype</th><th>alt dosage</th>' + freqHead + '<th>palindromic</th>' +
      '</tr></thead><tbody>' + markerRows + '</tbody></table></div></details>'
    );
  }

  /* ---------- section: traits ---------- */

  function renderTraits() {
    var mount = els.sec.traits;
    var head = sectionHead("person", "Traits",
      "Well-established single-SNP traits, each read from one position and shown " +
      "with its citation. These are tendencies, not certainties, and no trait is " +
      "shown without a source.", "sage");

    if (data.traits === undefined) {
      mount.innerHTML = head + loadingLine("Loading the traits dataset...");
      return;
    }
    if (data.traits instanceof Error) {
      mount.innerHTML = head + sectionError(
        "The traits dataset could not be loaded. This is a load error, not a " +
        "result. (" + data.traits.message + ")");
      return;
    }

    var evald = window.TraitsEngine.evaluateAll(current.genotype, data.traits);
    current.traitsResult = evald;

    var html = head;
    html += '<div class="prs-stats">' +
      stat(evald.calledCount + "/" + evald.total, "traits read from your file") +
      '</div>';

    // Rotating accent + a friendly icon per card. Purely presentational; keyed
    // off the card index so the palette cycles sage/apricot/teal/clay/blue.
    var traitAccents = ["sage", "apricot", "teal", "clay", "blue"];
    var traitIcons = ["fa-mug-hot", "fa-glass-water", "fa-face-smile", "fa-dna",
      "fa-person-running", "fa-eye", "fa-wine-glass", "fa-seedling", "fa-heart"];

    html += '<div class="app-trait-grid">';
    evald.results.forEach(function (r, i) {
      var t = r.trait;
      var uncalled = r.status !== "called";
      var accent = traitAccents[i % traitAccents.length];
      var icon = traitIcons[i % traitIcons.length];
      html += '<div class="app-trait accent-' + accent + (uncalled ? ' is-uncalled' : '') + '">';
      html += '<div class="app-trait-top">';
      html += '<span class="app-trait-icon"><i class="fas ' + icon + '"></i></span>';
      html += '<div class="app-trait-titles">';
      html += '<p class="app-trait-name">' + escapeHtml(t.trait) + '</p>';
      html += '<p class="app-trait-gene">' + escapeHtml(t.gene) + ' . ' + escapeHtml(t.rsid) + '</p>';
      html += '</div></div>';

      var badges = "";
      if (t.proxy) badges += '<span class="app-badge proxy">proxy</span>';
      if (t.probabilistic) badges += '<span class="app-badge prob">probabilistic</span>';
      if (t.health_note) badges += '<span class="app-badge health">health note</span>';

      html += '<div class="app-trait-genorow"><span class="app-trait-geno' + (uncalled ? ' is-uncalled' : '') + '">' +
        escapeHtml(r.genotype || "not in file") + '</span>' + badges + '</div>';
      html += '<p class="app-trait-interp">' + escapeHtml(r.interpretation) + '</p>';

      if (r.status === "called" && t.health) {
        html += '<p class="app-health-note">' + escapeHtml(t.health) + '</p>';
      }
      html += '<p class="app-trait-cite">' + escapeHtml(t.citation) + '</p>';
      html += '</div>';
    });
    html += '</div>';

    mount.innerHTML = html;
  }

  /* ---------- section: polygenic scores ---------- */

  function renderPRS() {
    var mount = els.sec.prs;
    var head = sectionHead("chart-line", "Polygenic scores",
      "Real polygenic scores from the PGS Catalog, computed on your device. Each " +
      "bar is a relative position between the lowest and highest attainable score " +
      "for the variants present in your file, not a percentile, probability, " +
      "or risk.", "apricot");

    var crosslink =
      '<div class="app-crosslink"><i class="fas fa-circle-exclamation"></i> ' +
      'These scores are <strong>not ancestry-calibrated</strong>. A raw polygenic score ' +
      'should be read in the context of ancestry, see your ' +
      '<a href="#sec-ancestry">ancestry section</a> above. Treat every number here as ' +
      'approximate and educational.</div>';

    if (data.prsIndex === undefined) {
      mount.innerHTML = head + loadingLine("Loading polygenic scores...");
      return;
    }
    if (data.prsIndex instanceof Error) {
      mount.innerHTML = head + sectionError(
        "The polygenic score manifest could not be loaded. This is a load error, " +
        "not a result. (" + data.prsIndex.message + ")");
      return;
    }

    var scores = (data.prsIndex.scores || []);
    var html = head + crosslink;
    current.prsResults = [];

    scores.forEach(function (s) {
      var table = data.prsScores[s.pgs_id];
      html += '<div class="app-prs-card">';
      html += '<div class="prs-result-head"><div>' +
        '<p class="prs-result-trait">' + escapeHtml(s.trait) + '</p>' +
        '<span class="prs-result-pgs">' + escapeHtml([s.pgs_id, s.genome_build].filter(Boolean).join(" . ")) +
        '</span></div></div>';

      if (table === undefined) {
        html += loadingLine("Loading " + escapeHtml(s.pgs_id) + "...");
        html += '</div>';
        return;
      }
      if (table instanceof Error || !table.entries || !table.entries.length) {
        html += sectionError("This scoring file could not be loaded. (" +
          (table instanceof Error ? table.message : "no variants") + ")");
        html += '</div>';
        return;
      }

      var result = window.PRSEngine.computePRS(current.genotype, table);
      current.prsResults.push({ pgs_id: s.pgs_id, trait: s.trait, result: result, meta: s });
      html += prsBody(result, s);
      html += '</div>';
    });

    mount.innerHTML = html;
  }

  function prsBody(result, s) {
    var coveragePct = Math.round(result.coverage * 100);
    var normPct = ((result.normalisedScore + 1) / 2) * 100;
    normPct = Math.max(0, Math.min(100, normPct));

    var html = "";
    html += '<div class="prs-scorebar-label"><span>fewer scored effect alleles</span>' +
      '<span>more scored effect alleles</span></div>';
    html += '<div class="prs-scorebar"><div class="prs-scorebar-marker" style="left:' +
      normPct.toFixed(1) + '%"></div></div>';
    html += '<p class="prs-scorebar-caption">Your genotype sits at <strong>' +
      normPct.toFixed(0) + '%</strong> of the range between the lowest and highest possible ' +
      'score for the ' + result.matchedVariants + ' of ' + result.totalVariants +
      ' variants found in your file. A relative position, not a percentile, probability, or risk.</p>';

    html += '<div class="prs-stats">' +
      stat(result.matchedVariants + "/" + result.totalVariants, "variants found") +
      stat(coveragePct + "%", "coverage") +
      stat(result.rawScore.toFixed(3), "weighted score") +
      '</div>';

    if (result.coverage < 0.9) {
      html += '<div class="prs-coverage-note"><i class="fas fa-triangle-exclamation"></i>' +
        '<span>Only ' + coveragePct + "% of this score's variants were present in your file. " +
        'Consumer arrays genotype a fraction of a research score, so read this as approximate.</span></div>';
    }
    if (result.matchedVariants === 0) {
      html += '<div class="prs-coverage-note"><i class="fas fa-circle-exclamation"></i>' +
        "<span>None of this score's variants were found in your file, so the score " +
        'is zero by default rather than a real measurement.</span></div>';
    }

    html += prsTable(result);

    var meta = result.meta || {};
    var cite = [s.pgs_id, meta.citation || s.citation, s.license].filter(Boolean).join(" . ");
    html += '<p class="app-var-cite">' + escapeHtml(cite) +
      ' . Score data from the PGS Catalog.</p>';
    return html;
  }

  function prsTable(result) {
    var matched = result.contributions.filter(function (c) { return c.matched; });
    matched.sort(function (a, b) { return Math.abs(b.contribution) - Math.abs(a.contribution); });
    var shown = matched.slice(0, MAX_TABLE_ROWS);
    var rows = shown.map(function (c) {
      var cls = c.contribution > 0 ? "pos" : c.contribution < 0 ? "neg" : "";
      return "<tr>" + td(c.rsid) + td(c.genotype) + td(c.effectAllele) + td(String(c.dosage)) +
        td(fmt(c.weight)) + '<td class="' + cls + '">' + fmt(c.contribution) + "</td></tr>";
    }).join("");

    var caption = "Every scored variant found in your file, with its exact contribution. ";
    if (matched.length > shown.length) {
      caption += "Showing the top " + shown.length + " of " + matched.length + " by size. ";
    }
    caption += result.missingVariants + " scored variants were not in your file.";

    return '<details class="prs-details"><summary>Show the math (' + matched.length +
      ' variants contributed)</summary><p class="prs-scorebar-caption" style="text-align:left">' +
      escapeHtml(caption) + '</p><div class="prs-table-wrap"><table class="prs-table"><thead><tr>' +
      '<th>rsID</th><th>your genotype</th><th>effect allele</th><th>dosage</th><th>weight</th>' +
      '<th>contribution</th></tr></thead><tbody>' + rows + '</tbody></table></div></details>';
  }

  /* ---------- section: carrier / notable variants ---------- */

  function renderCarrier() {
    var mount = els.sec.carrier;
    var head = sectionHead("heart-pulse", "Notable variants",
      "The most conservative section: only well-established pathogenic variants " +
      "that consumer arrays actually test. Read the framing below carefully.", "clay");

    if (data.variants === undefined) {
      mount.innerHTML = head + loadingLine("Loading the variant dataset...");
      return;
    }
    if (data.variants instanceof Error) {
      mount.innerHTML = head + sectionError(
        "The notable-variants dataset could not be loaded. This is a load error, " +
        "not a result. (" + data.variants.message + ")");
      return;
    }

    var evald = window.VariantsEngine.evaluateAll(current.genotype, data.variants);
    current.carrierResult = evald;
    var meta = data.variants.meta || {};

    var html = head;

    // Hard disclaimer block.
    html += '<div class="app-hard-disclaimer"><strong>Read this first.</strong><ul>';
    (meta.hard_disclaimer || []).forEach(function (line) {
      html += '<li>' + escapeHtml(line) + '</li>';
    });
    html += '</ul></div>';

    evald.results.forEach(function (r) {
      var v = r.variant;
      var flagCls = r.status === "called" ? (r.flag === "attention" ? " is-attention" : " is-clear") : "";
      html += '<div class="app-var' + flagCls + '">';
      html += '<div class="app-var-head"><p class="app-var-cond">' + escapeHtml(v.condition) + '</p>' +
        '<span class="app-var-meta">' + escapeHtml(v.gene + " " + v.protein_change) + '</span></div>';
      html += '<div><span class="app-var-geno">' + escapeHtml(v.rsid + ": " + (r.genotype || "not in file")) +
        '</span></div>';
      html += '<p class="app-var-interp">' + escapeHtml(r.interpretation) + '</p>';
      html += '<p class="app-var-cite">' + escapeHtml(
        v.clinical_significance + " . ClinVar Variation ID " + v.clinvar_id +
        " (" + v.clinvar_accession + ") . " + v.citation) + '</p>';
      html += '</div>';
    });

    // APOE exclusion note.
    if (meta.excluded && meta.excluded.APOE_alzheimers) {
      html += '<p class="app-report-note"><i class="fas fa-circle-info"></i> ' +
        escapeHtml(meta.excluded.APOE_alzheimers) + '</p>';
    }

    mount.innerHTML = html;
  }

  /* ---------- section: data explorer ---------- */

  function renderExplorer() {
    var mount = els.sec.explorer;
    var g = current.genotype;
    var head = sectionHead("table", "Your DNA data explorer",
      "A pure, local view of the raw calls in your file. Search by rsID. Nothing " +
      "here leaves your device.", "blue");

    var html = head;
    html += '<div class="prs-stats">' +
      stat(g.variantCount.toLocaleString(), "variants in file") +
      stat(fmtPct(g.callRate * 100), "call rate") +
      stat(escapeHtml(g.format), "detected format") +
      '</div>';

    html += '<input class="app-explorer-search" id="explorerSearch" type="text" ' +
      'placeholder="Search rsID (e.g. rs671) or genotype..." autocomplete="off">';
    html += '<p class="app-explorer-caption" id="explorerCaption"></p>';
    html += '<div class="prs-table-wrap"><table class="prs-table"><thead><tr>' +
      '<th>rsID</th><th>chr</th><th>position</th><th>genotype</th></tr></thead>' +
      '<tbody id="explorerBody"></tbody></table></div>';

    mount.innerHTML = html;

    // Build a lightweight array once; render capped.
    var all = [];
    g.records.forEach(function (rec) { all.push(rec); });

    var searchEl = document.getElementById("explorerSearch");
    var bodyEl = document.getElementById("explorerBody");
    var capEl = document.getElementById("explorerCaption");

    function renderRows(filter) {
      var q = (filter || "").trim().toLowerCase();
      var matches = q
        ? all.filter(function (r) {
            return r.rsid.toLowerCase().indexOf(q) >= 0 ||
              r.genotype.toLowerCase().indexOf(q) >= 0;
          })
        : all;
      var shown = matches.slice(0, MAX_TABLE_ROWS);
      bodyEl.innerHTML = shown.map(function (r) {
        return "<tr>" + td(r.rsid) + td(r.chromosome) + td(r.position) + td(r.genotype) + "</tr>";
      }).join("");
      var cap = "Showing " + shown.length.toLocaleString() + " of " +
        matches.length.toLocaleString() + (q ? " matching" : "") + " variants";
      if (matches.length > shown.length) {
        cap += " (table capped at " + MAX_TABLE_ROWS + " rows so a large file does not hang your browser)";
      }
      capEl.textContent = cap + ".";
    }

    var debounce;
    searchEl.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () { renderRows(searchEl.value); }, 120);
    });
    renderRows("");
  }

  /* ---------- section: downloadable report ---------- */

  function renderReport() {
    var mount = els.sec.report;
    var head = sectionHead("download", "Download your report",
      "Save a copy of this report, built entirely on your device. It records only " +
      "the file's NAME, never its contents or your raw genotypes.", "sage");

    var html = head;
    html += '<div class="app-report-actions">' +
      '<button class="prs-btn prs-btn-primary" id="downloadJsonBtn" type="button">' +
      '<i class="fas fa-file-arrow-down"></i> Download JSON report</button>' +
      '<button class="prs-btn prs-btn-ghost" id="printBtn" type="button">' +
      '<i class="fas fa-print"></i> Save as PDF (print)</button>' +
      '<button class="prs-btn prs-btn-ghost" id="againBtn" type="button">' +
      '<i class="fas fa-rotate-left"></i> Analyse another file</button></div>';
    html += '<p class="app-report-note"><i class="fas fa-shield-halved"></i> ' +
      'The JSON contains your results, citations and full provenance, plus the file name only. ' +
      'The PDF is produced by your browser\'s print dialog. Both are created locally; nothing is uploaded.</p>';

    mount.innerHTML = html;

    document.getElementById("downloadJsonBtn").addEventListener("click", downloadReport);
    document.getElementById("printBtn").addEventListener("click", function () { window.print(); });
    document.getElementById("againBtn").addEventListener("click", function () {
      els.dropZone.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function downloadReport() {
    var citations = collectCitations();
    var report = window.ReportEngine.buildReport({
      fileName: current.label,
      genotypeSummary: {
        variant_count: current.genotype.variantCount,
        called_variants: current.genotype.calledVariants,
        call_rate: current.genotype.callRate,
        format: current.genotype.format,
      },
      ancestry: summariseAncestry(),
      traits: summariseTraits(),
      polygenicScores: summarisePRS(),
      carrierVariants: summariseCarrier(),
      citations: citations,
    });

    var dl = window.ReportEngine.toDownload(report);
    var a = document.createElement("a");
    a.href = dl.url;
    a.download = dl.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(dl.url); }, 2000);
  }

  /* ---------- report summarisers (results only, never raw file) ---------- */

  function summariseAncestry() {
    var r = current.ancestryResult;
    if (!r) return null;
    if (!r.ok) {
      return {
        reported: false,
        reason: "Below the minimum-marker floor.",
        markers_used: r.comparedMarkers,
        panel_size: r.panelSize,
      };
    }
    return {
      reported: true,
      markers_used: r.comparedMarkers,
      panel_size: r.panelSize,
      composition: r.composition.map(function (c) {
        return { population: c.population, percent: Number(c.percent.toFixed(2)) };
      }),
      note: "Coarse continental estimate, not ancestry-calibrated. HWE binomial likelihood + softmax.",
    };
  }

  function summariseTraits() {
    var e = current.traitsResult;
    if (!e) return null;
    return e.results.map(function (r) {
      return {
        trait: r.trait.trait,
        gene: r.trait.gene,
        rsid: r.trait.rsid,
        genotype: r.genotype,
        status: r.status,
        interpretation: r.interpretation,
        citation: r.trait.citation,
      };
    });
  }

  function summarisePRS() {
    if (!current.prsResults) return null;
    return current.prsResults.map(function (p) {
      return {
        pgs_id: p.pgs_id,
        trait: p.trait,
        matched_variants: p.result.matchedVariants,
        total_variants: p.result.totalVariants,
        coverage: Number(p.result.coverage.toFixed(4)),
        raw_score: Number(p.result.rawScore.toFixed(6)),
        normalised_score: Number(p.result.normalisedScore.toFixed(6)),
        citation: p.meta.citation,
        note: "Relative position only; not a percentile/probability/risk; not ancestry-calibrated.",
      };
    });
  }

  function summariseCarrier() {
    var e = current.carrierResult;
    if (!e) return null;
    return e.results.map(function (r) {
      return {
        condition: r.variant.condition,
        gene: r.variant.gene,
        rsid: r.variant.rsid,
        protein_change: r.variant.protein_change,
        genotype: r.genotype,
        status: r.status,
        interpretation: r.interpretation,
        clinvar_id: r.variant.clinvar_id,
        citation: r.variant.citation,
      };
    });
  }

  function collectCitations() {
    var out = [];
    if (data.ancestry && !(data.ancestry instanceof Error)) {
      var m = data.ancestry.meta || {};
      out.push({ section: "ancestry", source: [m.panel, m.source, m.citation].filter(Boolean).join(" . ") });
    }
    if (data.prsIndex && !(data.prsIndex instanceof Error)) {
      (data.prsIndex.scores || []).forEach(function (s) {
        out.push({ section: "polygenic_score", pgs_id: s.pgs_id, trait: s.trait, citation: s.citation, license: s.license });
      });
    }
    if (data.traits && !(data.traits instanceof Error)) {
      (data.traits.traits || []).forEach(function (t) {
        out.push({ section: "trait", rsid: t.rsid, citation: t.citation });
      });
    }
    if (data.variants && !(data.variants instanceof Error)) {
      (data.variants.variants || []).forEach(function (v) {
        out.push({ section: "variant", rsid: v.rsid, clinvar_id: v.clinvar_id, citation: v.citation });
      });
    }
    return out;
  }

  /* ---------- shared rendering helpers ---------- */

  function sectionHead(icon, title, lead, accent) {
    return '<div class="app-section-head accent-' + (accent || "sage") + '">' +
      '<span class="app-section-icon"><i class="fas fa-' + icon + '"></i></span>' +
      '<h2>' + escapeHtml(title) + '</h2></div>' +
      '<p class="app-section-lead">' + lead + '</p>';
  }

  function sectionError(message) {
    return '<div class="app-section-error"><i class="fas fa-circle-exclamation"></i>' +
      '<span>' + escapeHtml(message) + '</span></div>';
  }

  function insufficient(message) {
    return '<div class="app-insufficient"><i class="fas fa-triangle-exclamation"></i>' +
      '<span>' + escapeHtml(message) + '</span></div>';
  }

  function loadingLine(message) {
    return '<div class="prs-status"><div class="prs-spinner"></div>' + escapeHtml(message) + '</div>';
  }

  function stat(value, label) {
    return '<div class="prs-stat"><div class="prs-stat-value">' + escapeHtml(String(value)) +
      '</div><div class="prs-stat-label">' + escapeHtml(label) + '</div></div>';
  }

  /* ---------- status helpers (cloned from prs.js) ---------- */

  function setStatus(message, spinning) {
    els.status.className = "prs-status";
    els.status.innerHTML = (spinning ? '<div class="prs-spinner"></div>' : "") + escapeHtml(message);
    els.status.hidden = false;
  }

  function clearStatus() {
    els.status.hidden = true;
    els.status.innerHTML = "";
  }

  function showError(message) {
    els.status.className = "prs-status is-error";
    els.status.innerHTML = '<i class="fas fa-circle-exclamation"></i> ' + escapeHtml(message);
    els.status.hidden = false;
  }

  /* ---------- formatting (cloned from prs.js) ---------- */

  function fmt(n) {
    if (n === 0) return "0";
    var abs = Math.abs(n);
    if (abs < 0.001 || abs >= 1000) return n.toExponential(2);
    return (n > 0 ? "+" : "") + n.toFixed(3);
  }

  function fmtPct(n) { return Number(n).toFixed(1) + "%"; }

  function td(text) { return "<td>" + escapeHtml(text) + "</td>"; }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
