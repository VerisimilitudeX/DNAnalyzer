/**
 * sequence-engine.test.mjs
 *
 * Node parity test for web/assets/js/sequence-engine.js. Asserts the engine's
 * outputs EXACTLY match the Java unit-test vectors (SequenceAnalysisServiceTest,
 * SequenceFileServiceTest) plus the additional vectors called out in the task
 * spec. Run with:
 *
 *   node web/assets/js/sequence-engine.test.mjs
 *
 * Exits non-zero on any failure and prints a clear pass/fail summary.
 */
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const Engine = require(join(__dirname, "sequence-engine.js"));

let passed = 0;
let failed = 0;
const failures = [];

function record(name, ok, detail) {
  if (ok) {
    passed++;
  } else {
    failed++;
    failures.push(name + (detail ? " -> " + detail : ""));
  }
}

function eq(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  record(name, a === e, "expected " + e + ", got " + a);
}

function approx(name, actual, expected, eps = 1e-12) {
  const ok = typeof actual === "number" && Math.abs(actual - expected) <= eps;
  record(name, ok, "expected " + expected + ", got " + actual);
}

function truthy(name, cond, detail) {
  record(name, !!cond, detail);
}

function throws(name, fn) {
  let threw = false;
  try {
    fn();
  } catch (e) {
    threw = true;
  }
  record(name, threw, "expected an exception");
}

/* ---- SequenceAnalyzer: counts / gc / length -------------------------- */
eq("nucleotideCounts('ATGCN')", Engine.nucleotideCounts("ATGCN"), {
  A: 1, C: 1, G: 1, T: 1, N: 1
});
approx("gcContent('ATGCN') == 0.4", Engine.gcContent("ATGCN"), 0.4);
eq("length('ATGCN') == 5", Engine.length("ATGCN"), 5);
approx("gcContent('') == 0", Engine.gcContent(""), 0);

// non-ACGT normalized to N; all five keys present
eq("nucleotideCounts('XYZ') normalizes to N", Engine.nucleotideCounts("XYZ"), {
  A: 0, C: 0, G: 0, T: 0, N: 3
});

/* ---- SequenceUtils: reverse / complement / reverseComplement --------- */
eq("reverse('ATGC') == 'CGTA'", Engine.reverse("ATGC"), "CGTA");
eq("complement('ATGC') == 'TACG'", Engine.complement("ATGC"), "TACG");
eq("reverseComplement('ATGC') == 'GCAT'", Engine.reverseComplement("ATGC"), "GCAT");
// Java-authoritative edge cases: U -> A, unknown -> N
eq("reverseComplement('U') == 'A'", Engine.reverseComplement("U"), "A");
eq("reverseComplement('Z') == 'N'", Engine.reverseComplement("Z"), "N");

/* ---- parseSequenceFile ----------------------------------------------- */
eq("parseSequenceFile PLAIN", Engine.parseSequenceFile("ATGC\nAAGT"), {
  header: "", sequence: "ATGCAAGT", format: "PLAIN"
});
eq("parseSequenceFile FASTA", Engine.parseSequenceFile(">seq1\nATGCATGC"), {
  header: "seq1", sequence: "ATGCATGC", format: "FASTA"
});
eq("parseSequenceFile FASTQ", Engine.parseSequenceFile("@seq1\nATGC\n+\n!!!!!"), {
  header: "seq1", sequence: "ATGC", format: "FASTQ"
});
throws("parseSequenceFile('') throws", () => Engine.parseSequenceFile(""));

/* ---- findProteins ---------------------------------------------------- */
throws("findProteins start 'L' (leucine) throws", () =>
  Engine.findProteins("ATGAAATAG", "L", 2)
);
const proteins = Engine.findProteins("ATGAAATAGATGCCCCCTAA", "M", 2);
truthy("findProteins('M') returns proteins", proteins.length > 0, "empty result");
truthy(
  "findProteins first protein starts with 'M'",
  proteins.length > 0 && proteins[0].sequence.charAt(0) === "M",
  "sequence=" + (proteins[0] && proteins[0].sequence)
);

/* ---- findOpenReadingFrames ------------------------------------------- */
const orfs = Engine.findOpenReadingFrames("ATGAAATAG", 1);
truthy("findOpenReadingFrames('ATGAAATAG') finds >=1 ORF", orfs.length >= 1,
  "found " + orfs.length);
// exact ORF geometry: frame 0, start 0, ATG..TAG end exclusive = 9, length 9
eq("first ORF geometry", orfs[0], { frame: 0, start: 0, end: 9, length: 9 });

/* ---- codonCount ------------------------------------------------------ */
eq("codonCount('ATGAAA', 0) sorted", Engine.codonCount("ATGAAA", 0), {
  AAA: 1, ATG: 1
});
throws("codonCount invalid frame 3 throws", () => Engine.codonCount("ATGAAA", 3));
throws("codonCount invalid frame -1 throws", () => Engine.codonCount("ATGAAA", -1));

/* ---- codonUsage (pure-ACGT only, step 3) ----------------------------- */
eq("codonUsage('ATGATGNNN')", Engine.codonUsage("ATGATGNNN"), { ATG: 2 });

/* ---- countMotifOccurrences (non-overlapping) ------------------------- */
eq("countMotifOccurrences non-overlapping 'AAAA'/'AA' == 2",
  Engine.countMotifOccurrences("AAAA", "AA"), 2);
eq("countMotifOccurrences blank motif == 0",
  Engine.countMotifOccurrences("ATGC", "  "), 0);

/* ---- filterByRange --------------------------------------------------- */
eq("filterByRange inclusive", Engine.filterByRange({ AAA: 1, ATG: 3, GGG: 5 }, 1, 3), {
  AAA: 1, ATG: 3
});
eq("filterByRange min<0 -> {}", Engine.filterByRange({ AAA: 1 }, -1, 3), {});
eq("filterByRange max<min -> {}", Engine.filterByRange({ AAA: 1 }, 3, 1), {});

/* ---- findGenes (token resolution + step-1 outer loop) ---------------- */
eq("findGenes('ATGAAATAG', methionine)",
  Engine.findGenes("ATGAAATAG", "methionine"), ["ATGAAATAG"]);
eq("findGenes('ATGAAATAG', 'm')", Engine.findGenes("ATGAAATAG", "m"), ["ATGAAATAG"]);
eq("findGenes null start -> []", Engine.findGenes("ATGAAATAG", null), []);

/* ---- aminoAcidFromToken ---------------------------------------------- */
truthy("aminoAcidFromToken('M') -> METHIONINE",
  Engine.aminoAcidFromToken("M") && Engine.aminoAcidFromToken("M").name === "METHIONINE");
eq("aminoAcidFromToken('') -> null", Engine.aminoAcidFromToken(""), null);

/* ---- scanOrfs (both strands x 3 frames) ------------------------------ */
const scanned = Engine.scanOrfs("ATGAAATAG");
truthy("scanOrfs finds >=1 ORF", scanned.length >= 1, "found " + scanned.length);
// forward-strand frame-0 ORF: start 0..end 9, translate == 'MK*'
const fwd = scanned.find((o) => o.strand === "+" && o.frame === 0 && o.start === 0);
truthy("scanOrfs forward frame0 ORF present", !!fwd);
if (fwd) {
  eq("scanOrfs forward ORF nucleotides", fwd.nucleotideSequence, "ATGAAATAG");
  eq("scanOrfs forward ORF amino acids", fwd.aminoAcidSequence, "MK*");
  eq("scanOrfs forward ORF end", fwd.end, 9);
  eq("scanOrfs forward ORF length", fwd.length, 9);
}

/* ---- translate (unknown -> 'X') -------------------------------------- */
eq("translate('ATGAAATAG') == 'MK*'", Engine.translate("ATGAAATAG"), "MK*");
eq("translate unknown codon -> 'X'", Engine.translate("ZZZ"), "X");

/* ---- highGcRegions --------------------------------------------------- */
eq("highGcRegions window<=0 -> []", Engine.highGcRegions("GCGC", 0, 0.5), []);
eq("highGcRegions len<window -> []", Engine.highGcRegions("GC", 5, 0.5), []);
const gcRegions = Engine.highGcRegions("GCGCAT", 2, 1.0);
// sliding window advances by 1 (Java), so every 100%-GC window of size 2 is
// reported: [0,2)=GC, [1,3)=CG, [2,4)=GC.
eq("highGcRegions GC windows", gcRegions, [
  { startInclusive: 0, endExclusive: 2, gcContent: 1 },
  { startInclusive: 1, endExclusive: 3, gcContent: 1 },
  { startInclusive: 2, endExclusive: 4, gcContent: 1 }
]);

/* ---- scanPromoters --------------------------------------------------- */
const promoters = Engine.scanPromoters("TATAAA");
truthy("scanPromoters finds TATA box",
  promoters.some((p) => p.element === "TATA" && p.position === 0 && p.match === "TATAAA"),
  JSON.stringify(promoters));
truthy("promoter motifs flagged simplified", Engine.PROMOTER_MOTIFS_ARE_SIMPLIFIED === true);

/* ---- summary --------------------------------------------------------- */
console.log("");
console.log("SequenceEngine parity test");
console.log("  passed: " + passed);
console.log("  failed: " + failed);
if (failed > 0) {
  console.log("");
  console.log("FAILURES:");
  for (const f of failures) console.log("  - " + f);
  console.log("");
  console.log("RESULT: FAIL");
  process.exit(1);
} else {
  console.log("");
  console.log("RESULT: PASS (" + passed + " assertions)");
  process.exit(0);
}
