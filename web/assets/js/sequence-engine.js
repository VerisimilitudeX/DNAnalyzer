/**
 * sequence-engine.js: on-device DNA sequence-analysis engine.
 *
 * A faithful JavaScript port of the DNAnalyzer server-side / CLI analysis code
 * so the website's analyzer runs entirely in the browser with NO server.
 * Every function names the Java method it mirrors in its JSDoc, and the numeric
 * / structural outputs are verified against the Java unit-test vectors by
 * web/assets/js/sequence-engine.test.mjs.
 *
 * Ported Java sources:
 *   - DNAnalyzer.analysis.SequenceAnalyzer
 *   - DNAnalyzer.analysis.ORFScanner
 *   - DNAnalyzer.analysis.SequenceUtils
 *   - DNAnalyzer.analysis.CodonAnalyzer
 *   - DNAnalyzer.analysis.AminoAcid
 *   - DNAnalyzer.api.service.SequenceAnalysisService (findProteins)
 *   - DNAnalyzer.api.service.SequenceFileService (parseSequenceFile)
 *   - DNAnalyzer.analysis.PromoterScanner
 *
 * NeurologicalMarkerAnalyzer is intentionally NOT ported (its own Javadoc says
 * it is "for demonstrative purposes only").
 *
 * Where the pre-existing web/analyzer/analyzer.js disagreed with the Java code
 * (e.g. reverse-complement mapping of U and unknown bases), the Java behavior
 * wins: SequenceUtils.reverseComplement maps U->A and any unknown base->N.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.SequenceEngine = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Shared constants                                                    */
  /* ------------------------------------------------------------------ */

  /** Stop codons, mirrors the STOP_CODONS set shared across the Java classes. */
  var STOP_CODONS = { TAA: true, TAG: true, TGA: true };

  /** Start codon set, mirrors ORFScanner.START_CODONS. */
  var START_CODONS = { ATG: true };

  /** Valid bases for SequenceAnalyzer (A/C/G/T/N). */
  var VALID_BASES = ["A", "C", "G", "T", "N"];
  var VALID_BASES_SET = { A: true, C: true, G: true, T: true, N: true };

  /**
   * Canonical codon table, ported VERBATIM from ORFScanner.buildCodonTable().
   * Unknown codon -> 'X' (handled by the getOrDefault-style lookup); stop -> '*'.
   * The literals reconcile with analyzer.js's genetic-code table and the Java
   * GENETIC_CODE map in SequenceAnalysisService.
   */
  var CODON_TABLE = {
    TTT: "F", TTC: "F", TTA: "L", TTG: "L",
    CTT: "L", CTC: "L", CTA: "L", CTG: "L",
    ATT: "I", ATC: "I", ATA: "I", ATG: "M",
    GTT: "V", GTC: "V", GTA: "V", GTG: "V",
    TCT: "S", TCC: "S", TCA: "S", TCG: "S",
    AGT: "S", AGC: "S",
    CCT: "P", CCC: "P", CCA: "P", CCG: "P",
    ACT: "T", ACC: "T", ACA: "T", ACG: "T",
    GCT: "A", GCC: "A", GCA: "A", GCG: "A",
    TAT: "Y", TAC: "Y",
    CAT: "H", CAC: "H", CAA: "Q", CAG: "Q",
    AAT: "N", AAC: "N", AAA: "K", AAG: "K",
    GAT: "D", GAC: "D", GAA: "E", GAG: "E",
    TGT: "C", TGC: "C", TGG: "W",
    CGT: "R", CGC: "R", CGA: "R", CGG: "R",
    AGA: "R", AGG: "R",
    GGT: "G", GGC: "G", GGA: "G", GGG: "G",
    TAA: "*", TAG: "*", TGA: "*"
  };

  /**
   * Amino-acid definitions tied to codon sets, ported from the AminoAcid enum.
   * Each entry carries the display name and aliases used by fromToken().
   */
  var AMINO_ACIDS = [
    { name: "ISOLEUCINE", display: "isoleucine", codons: ["ATT", "ATC", "ATA"], aliases: ["i", "ile"] },
    { name: "LEUCINE", display: "leucine", codons: ["CTT", "CTC", "CTA", "CTG", "TTA", "TTG"], aliases: ["l", "leu"] },
    { name: "VALINE", display: "valine", codons: ["GTT", "GTC", "GTA", "GTG"], aliases: ["v", "val"] },
    { name: "PHENYLALANINE", display: "phenylalanine", codons: ["TTT", "TTC"], aliases: ["f", "phe"] },
    { name: "METHIONINE", display: "methionine", codons: ["ATG"], aliases: ["m", "met"] },
    { name: "CYSTEINE", display: "cysteine", codons: ["TGT", "TGC"], aliases: ["c", "cys"] },
    { name: "ALANINE", display: "alanine", codons: ["GCT", "GCC", "GCA", "GCG"], aliases: ["a", "ala"] },
    { name: "GLYCINE", display: "glycine", codons: ["GGT", "GGC", "GGA", "GGG"], aliases: ["g", "gly"] },
    { name: "PROLINE", display: "proline", codons: ["CCT", "CCC", "CCA", "CCG"], aliases: ["p", "pro"] },
    { name: "THREONINE", display: "threonine", codons: ["ACT", "ACC", "ACA", "ACG"], aliases: ["t", "thr"] },
    { name: "SERINE", display: "serine", codons: ["TCT", "TCC", "TCA", "TCG", "AGT", "AGC"], aliases: ["s", "ser"] },
    { name: "TYROSINE", display: "tyrosine", codons: ["TAT", "TAC"], aliases: ["y", "tyr"] },
    { name: "TRYPTOPHAN", display: "tryptophan", codons: ["TGG"], aliases: ["w", "trp"] },
    { name: "GLUTAMINE", display: "glutamine", codons: ["CAA", "CAG"], aliases: ["q", "gln"] },
    { name: "ASPARAGINE", display: "asparagine", codons: ["AAT", "AAC"], aliases: ["n", "asn"] },
    { name: "HISTIDINE", display: "histidine", codons: ["CAT", "CAC"], aliases: ["h", "his"] },
    { name: "GLUTAMIC_ACID", display: "glutamic acid", codons: ["GAA", "GAG"], aliases: ["e", "glu"] },
    { name: "ASPARTIC_ACID", display: "aspartic acid", codons: ["GAT", "GAC"], aliases: ["d", "asp"] },
    { name: "LYSINE", display: "lysine", codons: ["AAA", "AAG"], aliases: ["k", "lys"] },
    { name: "ARGININE", display: "arginine", codons: ["CGT", "CGC", "CGA", "CGG", "AGA", "AGG"], aliases: ["r", "arg"] },
    { name: "STOP", display: "stop", codons: ["TAA", "TAG", "TGA"], aliases: ["*", "stop"] }
  ];

  /**
   * Resolve an amino-acid token like the AminoAcid.fromToken() static method.
   * Blank/null -> null. Matches on the display name or any alias, case-insensitive.
   * Returns the amino-acid definition object or null.
   */
  function aminoAcidFromToken(token) {
    if (token == null) return null;
    var trimmed = String(token).trim();
    if (trimmed.length === 0) return null;
    var normalized = trimmed.toLowerCase();
    for (var i = 0; i < AMINO_ACIDS.length; i++) {
      var aa = AMINO_ACIDS[i];
      if (aa.display === normalized) return aa;
      for (var k = 0; k < aa.aliases.length; k++) {
        if (aa.aliases[k] === normalized) return aa;
      }
    }
    return null;
  }

  /** Uppercase helper mirroring Java's toUpperCase(Locale.ROOT) for ASCII DNA. */
  function upper(s) {
    return String(s == null ? "" : s).toUpperCase();
  }

  /* ------------------------------------------------------------------ */
  /* SequenceAnalyzer                                                    */
  /* ------------------------------------------------------------------ */

  /** Mirrors SequenceAnalyzer.length(). */
  function length(sequence) {
    return upper(sequence).length;
  }

  /**
   * Mirrors SequenceAnalyzer.gcContent(): returns a FRACTION in [0,1].
   * Empty sequence -> 0.0.
   */
  function gcContent(sequence) {
    var seq = upper(sequence);
    if (seq.length === 0) return 0.0;
    var gc = 0;
    for (var i = 0; i < seq.length; i++) {
      var ch = seq.charAt(i);
      if (ch === "G" || ch === "C") gc++;
    }
    return gc / seq.length;
  }

  /**
   * Mirrors SequenceAnalyzer.nucleotideCounts(): counts A/C/G/T/N with any
   * non-ACGTN base normalized to N. All five keys are always present.
   * Returns a plain object { A, C, G, T, N }.
   */
  function nucleotideCounts(sequence) {
    var seq = upper(sequence);
    var counts = { A: 0, C: 0, G: 0, T: 0, N: 0 };
    for (var i = 0; i < seq.length; i++) {
      var base = seq.charAt(i);
      var normalized = VALID_BASES_SET[base] ? base : "N";
      counts[normalized] += 1;
    }
    return counts;
  }

  /**
   * Mirrors SequenceAnalyzer.highGcRegions(window, threshold): a sliding window
   * of size `window` returning { startInclusive, endExclusive, gcContent } for
   * every window whose GC fraction is >= threshold. Returns [] when window <= 0
   * or sequence length < window.
   */
  function highGcRegions(sequence, window, threshold) {
    var seq = upper(sequence);
    var regions = [];
    if (window <= 0 || seq.length < window) {
      return regions;
    }
    var gcCount = 0;
    var i;
    for (i = 0; i < window; i++) {
      var c0 = seq.charAt(i);
      if (c0 === "G" || c0 === "C") gcCount++;
    }
    addGcWindowIfHigh(regions, 0, window, gcCount, window, threshold);

    for (i = window; i < seq.length; i++) {
      var leaving = seq.charAt(i - window);
      if (leaving === "G" || leaving === "C") gcCount--;
      var entering = seq.charAt(i);
      if (entering === "G" || entering === "C") gcCount++;
      addGcWindowIfHigh(regions, i - window + 1, i + 1, gcCount, window, threshold);
    }
    return regions;
  }

  /** Mirrors SequenceAnalyzer.addGcWindowIfHigh(). */
  function addGcWindowIfHigh(regions, start, end, gcCount, windowSize, threshold) {
    var gc = gcCount / windowSize;
    if (gc >= threshold) {
      regions.push({ startInclusive: start, endExclusive: end, gcContent: gc });
    }
  }

  /**
   * Mirrors SequenceAnalyzer.findOpenReadingFrames(minLength).
   * Returns { frame, start, end, length } objects. Exact loop semantics:
   * the inner j starts at i + 3, end = j + 3 (exclusive), and on a hit i jumps
   * to j + 3. Only ORFs with length >= minLength are kept.
   * NOTE: this is DISTINCT from scanOrfs()/ORFScanner, whose inner loop starts
   * at j = i. Both behaviors are kept under their own function names.
   */
  function findOpenReadingFrames(sequence, minLength) {
    var chars = upper(sequence);
    var orfs = [];
    for (var frame = 0; frame < 3; frame++) {
      var i = frame;
      while (i <= chars.length - 3) {
        var codon = chars.substring(i, i + 3);
        if (codon === "ATG") {
          var j = i + 3;
          while (j <= chars.length - 3) {
            var stopCodon = chars.substring(j, j + 3);
            if (STOP_CODONS[stopCodon]) {
              var len = j + 3 - i;
              if (len >= minLength) {
                orfs.push({ frame: frame, start: i, end: j + 3, length: len });
              }
              i = j + 3;
              break;
            }
            j += 3;
          }
        }
        i += 3;
      }
    }
    return orfs;
  }

  /**
   * Mirrors SequenceAnalyzer.codonUsage(): steps by 3 from index 0, counting
   * only pure-ACGT codons. Returns a plain object mapping codon -> count.
   */
  function codonUsage(sequence) {
    var seq = upper(sequence);
    var usage = {};
    for (var i = 0; i <= seq.length - 3; i += 3) {
      var codon = seq.substring(i, i + 3);
      if (isPureAcgt(codon)) {
        usage[codon] = (usage[codon] || 0) + 1;
      }
    }
    return usage;
  }

  /** True when every char of the codon is one of A/C/G/T. */
  function isPureAcgt(codon) {
    for (var i = 0; i < codon.length; i++) {
      var ch = codon.charAt(i);
      if (ch !== "A" && ch !== "C" && ch !== "G" && ch !== "T") return false;
    }
    return true;
  }

  /**
   * Mirrors SequenceAnalyzer.countMotifOccurrences(motif): NON-overlapping
   * count (advance by motif length after each hit). Null/blank motif -> 0.
   */
  function countMotifOccurrences(sequence, motif) {
    if (motif == null || String(motif).trim().length === 0) {
      return 0;
    }
    var seq = upper(sequence);
    var motifUpper = upper(motif);
    var index = 0;
    var count = 0;
    while (true) {
      var found = seq.indexOf(motifUpper, index);
      if (found === -1) break;
      count++;
      index = found + motifUpper.length;
    }
    return count;
  }

  /* ------------------------------------------------------------------ */
  /* SequenceUtils                                                       */
  /* ------------------------------------------------------------------ */

  /** Mirrors SequenceUtils.reverse(). */
  function reverse(sequence) {
    return String(sequence == null ? "" : sequence).split("").reverse().join("");
  }

  /**
   * Mirrors SequenceUtils.complement() (per-base). A<->T, G<->C, U->A,
   * default -> N. This is the Java-authoritative mapping.
   */
  function complementBase(base) {
    switch (base) {
      case "A": return "T";
      case "T": return "A";
      case "G": return "C";
      case "C": return "G";
      case "U": return "A";
      default: return "N";
    }
  }

  /**
   * Mirrors SequenceUtils.reverseComplement(): uppercases, then walks the
   * sequence right-to-left appending complement(base). U->A and unknown->N,
   * which deliberately differs from web/analyzer/analyzer.js. Java wins.
   */
  function reverseComplement(sequence) {
    var chars = upper(sequence);
    var out = "";
    for (var i = chars.length - 1; i >= 0; i--) {
      out += complementBase(chars.charAt(i));
    }
    return out;
  }

  /**
   * Per-base complement of a full sequence (uppercased). Not a Java-named
   * public method, but exposed to mirror SequenceAnalysisService.complement()
   * for the manipulate() parity vector (complement("ATGC") == "TACG").
   */
  function complement(sequence) {
    var seq = upper(sequence);
    var out = "";
    for (var i = 0; i < seq.length; i++) {
      out += complementBase(seq.charAt(i));
    }
    return out;
  }

  /**
   * Mirrors ORFScanner.translate() (and CodonAnalyzer-style translation):
   * unknown codon -> 'X'. Trailing 1-2 leftover bases are ignored (i + 2 < len).
   */
  function translate(dna) {
    var seq = upper(dna);
    var protein = "";
    for (var i = 0; i + 2 < seq.length; i += 3) {
      var codon = seq.substring(i, i + 3);
      protein += CODON_TABLE.hasOwnProperty(codon) ? CODON_TABLE[codon] : "X";
    }
    return protein;
  }

  /* ------------------------------------------------------------------ */
  /* ORFScanner                                                          */
  /* ------------------------------------------------------------------ */

  /**
   * Mirrors ORFScanner.scan(sequence): scans BOTH strands x 3 frames.
   * Returns { strand:'+'/'-', frame, start, end, nucleotideSequence,
   * aminoAcidSequence, length }.
   *
   * IMPORTANT parity note: coordinates on the '-' strand are indices into the
   * reverse-complement string, NOT into the original forward sequence. This is
   * exactly what the Java ORFScanner does, so it is preserved verbatim.
   * The inner loop starts at j = i (distinct from findOpenReadingFrames).
   */
  function scanOrfs(sequence) {
    var forward = upper(sequence);
    var reverse_ = reverseComplement(forward);
    var orfs = [];
    for (var frame = 0; frame < 3; frame++) {
      pushOrfs(orfs, forward, frame, "+");
      pushOrfs(orfs, reverse_, frame, "-");
    }
    return orfs;
  }

  /** Mirrors ORFScanner.findOrfs(sequence, frame, strand). */
  function pushOrfs(results, sequence, frame, strand) {
    for (var i = frame; i + 2 < sequence.length; i += 3) {
      var codon = sequence.substring(i, i + 3);
      if (!START_CODONS[codon]) {
        continue;
      }
      for (var j = i; j + 2 < sequence.length; j += 3) {
        var stop = sequence.substring(j, j + 3);
        if (STOP_CODONS[stop]) {
          var orf = sequence.substring(i, j + 3);
          results.push({
            strand: strand,
            frame: frame,
            start: i,
            end: j + 3,
            nucleotideSequence: orf,
            aminoAcidSequence: translate(orf),
            length: orf.length
          });
          break;
        }
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* CodonAnalyzer                                                       */
  /* ------------------------------------------------------------------ */

  /**
   * Mirrors CodonAnalyzer.count(sequence, frame): THROWS on frame not in
   * {0,1,2}. Steps by 3 from `frame`. Returns codon counts SORTED by codon
   * (Java uses a TreeMap). Returned as a plain object; JS string keys iterate
   * in insertion order, so we insert in sorted order to match TreeMap output.
   */
  function codonCount(sequence, frame) {
    if (frame < 0 || frame > 2) {
      throw new Error("Reading frame must be 0, 1, or 2");
    }
    var seq = upper(sequence);
    var raw = {};
    for (var i = frame; i + 2 < seq.length; i += 3) {
      var codon = seq.substring(i, i + 3);
      raw[codon] = (raw[codon] || 0) + 1;
    }
    var keys = Object.keys(raw).sort();
    var sorted = {};
    for (var k = 0; k < keys.length; k++) {
      sorted[keys[k]] = raw[keys[k]];
    }
    return sorted;
  }

  /**
   * Mirrors CodonAnalyzer.filterByRange(counts, min, max): inclusive [min,max].
   * Returns {} when min < 0 or max < min. Preserves the input iteration order
   * (Java uses a LinkedHashMap over the incoming entry set).
   */
  function filterByRange(counts, min, max) {
    if (min < 0 || max < min) {
      return {};
    }
    var filtered = {};
    var keys = Object.keys(counts);
    for (var i = 0; i < keys.length; i++) {
      var value = counts[keys[i]];
      if (value >= min && value <= max) {
        filtered[keys[i]] = value;
      }
    }
    return filtered;
  }

  /**
   * Mirrors CodonAnalyzer.findGenes(sequence, start): the outer loop steps by 1
   * and the inner loop by 3. `start` may be an amino-acid definition object, a
   * token string (resolved via aminoAcidFromToken), or null. Returns the full
   * DNA substrings from a start codon through the stop codon (inclusive).
   */
  function findGenes(sequence, start) {
    var startAa = typeof start === "string" ? aminoAcidFromToken(start) : start;
    if (startAa == null) {
      return [];
    }
    var startCodons = {};
    var s;
    for (s = 0; s < startAa.codons.length; s++) startCodons[startAa.codons[s]] = true;
    var stopAa = aminoAcidFromToken("stop");
    var stopCodons = {};
    for (s = 0; s < stopAa.codons.length; s++) stopCodons[stopAa.codons[s]] = true;

    var upperSeq = upper(sequence);
    var len = upperSeq.length;
    var genes = [];
    for (var i = 0; i + 2 < len; i++) {
      var startCodon = upperSeq.substring(i, Math.min(i + 3, len));
      if (!startCodons[startCodon]) {
        continue;
      }
      for (var j = i + 3; j + 2 < len; j += 3) {
        var stopCodon = upperSeq.substring(j, j + 3);
        if (stopCodons[stopCodon]) {
          genes.push(upperSeq.substring(i, j + 3));
          break;
        }
      }
    }
    return genes;
  }

  /* ------------------------------------------------------------------ */
  /* SequenceAnalysisService.findProteins                                */
  /* ------------------------------------------------------------------ */

  /**
   * Mirrors SequenceAnalysisService.findProteins(...). Scans 3 forward frames
   * for ATG...stop proteins, translating codons via the genetic code (unknown
   * codon -> 'X'). The amino-acid sequence always begins with 'M'.
   *
   * THROWS on an unsupported start amino acid: only 'M' / methionine is
   * supported (matches the Java check on the first character being 'M').
   *
   * Returns { start, end, length, sequence } objects sorted by length DESC and
   * capped at `limit` (default 10). Java clamps minLength to a floor of 1.
   *
   * @param {string} sequence
   * @param {string} [startToken='M'] start amino acid token; only M is allowed
   * @param {number} [minLength=10] minimum protein length (in amino acids)
   * @param {number} [limit=10] max proteins returned
   */
  function findProteins(sequence, startToken, minLength, limit) {
    var normalized = upper(sequence);
    var min = (minLength == null) ? 10 : Math.max(minLength, 1);
    var cap = (limit == null) ? 10 : limit;

    if (startToken != null && String(startToken).trim().length !== 0) {
      // Currently only methionine is supported as canonical start codon.
      var aa = String(startToken).charAt(0).toUpperCase();
      if (aa !== "M") {
        throw new Error("Only methionine (M) start codon is supported at this time");
      }
    }

    var startCodon = "ATG";
    var proteins = [];
    for (var offset = 0; offset < 3; offset++) {
      var i = offset;
      while (i <= normalized.length - 3) {
        var codon = normalized.substring(i, i + 3);
        if (codon === startCodon) {
          var proteinStart = i;
          var proteinSequence = "M";
          var j = i + 3;
          while (j <= normalized.length - 3) {
            var nextCodon = normalized.substring(j, j + 3);
            if (STOP_CODONS[nextCodon]) {
              if (proteinSequence.length >= min) {
                proteins.push({
                  start: proteinStart,
                  end: j + 2,
                  length: proteinSequence.length,
                  sequence: proteinSequence
                });
              }
              i = j + 3;
              break;
            }
            proteinSequence += CODON_TABLE.hasOwnProperty(nextCodon) ? CODON_TABLE[nextCodon] : "X";
            j += 3;
          }
          if (j > normalized.length - 3) {
            i = j;
          }
        } else {
          i += 3;
        }
      }
    }
    // Stable sort by length descending (Java Comparator.comparingInt reversed).
    proteins.sort(function (a, b) {
      return b.length - a.length;
    });
    return proteins.slice(0, cap);
  }

  /* ------------------------------------------------------------------ */
  /* SequenceFileService.parseSequenceFile                               */
  /* ------------------------------------------------------------------ */

  /**
   * Mirrors SequenceFileService.parse(...): classifies raw file text as FASTA,
   * FASTQ, or PLAIN and extracts { header, sequence, format }. Throws on empty
   * input (no non-blank content lines).
   *
   * Rules (Java-authoritative):
   *   - Lines are trimmed. The first non-blank line decides the format.
   *   - '>' -> FASTA: header = text after '>', sequence = concat of remaining
   *     non-'>' lines (whitespace stripped), uppercased.
   *   - '@' -> FASTQ: header = text after '@', sequence = the SINGLE next line
   *     (whitespace stripped), uppercased.
   *   - otherwise -> PLAIN: join all non-blank lines (whitespace stripped),
   *     uppercased.
   *
   * @param {string} text raw file contents
   * @returns {{header:string, sequence:string, format:string}}
   */
  function parseSequenceFile(text) {
    if (text == null) {
      throw new Error("Uploaded file is empty");
    }
    var raw = String(text);
    if (raw.length === 0) {
      throw new Error("Uploaded file is empty");
    }
    // Split into lines and trim each, mirroring readAllLines()'s line.trim().
    var lines = raw.split(/\r\n|\r|\n/).map(function (l) {
      return l.trim();
    });

    var firstContentIndex = -1;
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length !== 0) {
        firstContentIndex = i;
        break;
      }
    }
    if (firstContentIndex === -1) {
      throw new Error("Uploaded file does not contain sequence data");
    }

    var firstLine = lines[firstContentIndex];
    if (firstLine.charAt(0) === ">") {
      return parseFasta(lines, firstContentIndex);
    }
    if (firstLine.charAt(0) === "@") {
      return parseFastq(lines, firstContentIndex);
    }
    return parsePlain(lines);
  }

  /** FASTA branch of parseSequenceFile. */
  function parseFasta(lines, headerIndex) {
    var header = lines[headerIndex].substring(1).trim();
    var seq = "";
    for (var i = headerIndex + 1; i < lines.length; i++) {
      var line = lines[i];
      if (line.charAt(0) === ">") {
        // Only the first record is used (parseSingle semantics); stop here.
        break;
      }
      seq += line.replace(/\s+/g, "");
    }
    var sequence = upper(seq);
    return {
      header: header.length === 0 ? "" : header,
      sequence: sequence,
      format: "FASTA"
    };
  }

  /** FASTQ branch of parseSequenceFile. */
  function parseFastq(lines, headerIndex) {
    if (headerIndex + 1 >= lines.length) {
      throw new Error("FASTQ sequence line missing");
    }
    var header = lines[headerIndex].substring(1).trim();
    var sequence = upper(lines[headerIndex + 1].replace(/\s+/g, ""));
    if (sequence.length === 0) {
      throw new Error("FASTQ sequence is empty");
    }
    return { header: header, sequence: sequence, format: "FASTQ" };
  }

  /** PLAIN branch of parseSequenceFile. */
  function parsePlain(lines) {
    var seq = "";
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length === 0) continue;
      seq += lines[i].replace(/\s+/g, "");
    }
    var sequence = upper(seq);
    if (sequence.length === 0) {
      throw new Error("Sequence content is empty");
    }
    return { header: "", sequence: sequence, format: "PLAIN" };
  }

  /* ------------------------------------------------------------------ */
  /* PromoterScanner                                                     */
  /* ------------------------------------------------------------------ */

  /**
   * SIMPLIFIED, EDUCATIONAL core-promoter motifs. These regexes are ported
   * directly from PromoterScanner.MOTIFS and are NOT full biological consensus
   * models -- they are teaching aids for the website analyzer.
   */
  var PROMOTER_MOTIFS_ARE_SIMPLIFIED = true;
  var PROMOTER_MOTIFS_LABEL =
    "Simplified educational core-promoter motifs (not full consensus models)";

  /** Motif definitions ported from PromoterScanner.MOTIFS. */
  var PROMOTER_MOTIFS = [
    { element: "TATA", regex: /TATA[AT]A/g },
    { element: "BRE", regex: /[CG][CG][AG]CGCC/g },
    { element: "INR", regex: /[CT][CT]A[AT][AG][CT][CT]/g },
    { element: "DPE", regex: /[AG]G[AT][CT][AG]/g }
  ];

  /**
   * Mirrors PromoterScanner.scan(sequence): returns { element, position, match }
   * for each non-overlapping motif hit (JS global-regex exec advances past each
   * match, matching Java Matcher.find()). The iteration order over motifs mirrors
   * the fixed definition order above.
   *
   * @param {string} sequence
   * @returns {Array<{element:string, position:number, match:string}>}
   */
  function scanPromoters(sequence) {
    var upperSeq = upper(sequence);
    var matches = [];
    for (var m = 0; m < PROMOTER_MOTIFS.length; m++) {
      var def = PROMOTER_MOTIFS[m];
      var re = new RegExp(def.regex.source, "g");
      var found;
      while ((found = re.exec(upperSeq)) !== null) {
        matches.push({ element: def.element, position: found.index, match: found[0] });
        // Guard against zero-length matches (none here, but defensive).
        if (found[0].length === 0) re.lastIndex++;
      }
    }
    return matches;
  }

  /* ------------------------------------------------------------------ */
  /* Public API                                                          */
  /* ------------------------------------------------------------------ */

  return {
    // constants / tables
    CODON_TABLE: CODON_TABLE,
    VALID_BASES: VALID_BASES,
    AMINO_ACIDS: AMINO_ACIDS,
    STOP_CODONS: STOP_CODONS,
    PROMOTER_MOTIFS_ARE_SIMPLIFIED: PROMOTER_MOTIFS_ARE_SIMPLIFIED,
    PROMOTER_MOTIFS_LABEL: PROMOTER_MOTIFS_LABEL,

    // SequenceAnalyzer
    length: length,
    gcContent: gcContent,
    nucleotideCounts: nucleotideCounts,
    highGcRegions: highGcRegions,
    findOpenReadingFrames: findOpenReadingFrames,
    codonUsage: codonUsage,
    countMotifOccurrences: countMotifOccurrences,

    // SequenceUtils
    reverse: reverse,
    complement: complement,
    reverseComplement: reverseComplement,
    translate: translate,

    // ORFScanner
    scanOrfs: scanOrfs,

    // CodonAnalyzer
    codonCount: codonCount,
    filterByRange: filterByRange,
    findGenes: findGenes,

    // AminoAcid
    aminoAcidFromToken: aminoAcidFromToken,

    // SequenceAnalysisService
    findProteins: findProteins,

    // SequenceFileService
    parseSequenceFile: parseSequenceFile,

    // PromoterScanner
    scanPromoters: scanPromoters
  };
});
