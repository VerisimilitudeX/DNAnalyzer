# Ancestry-informative marker (AIM) panel — provenance

`aim_panel.json` is the reference panel used by the on-device ancestry section
(`web/app/engine/ancestry-engine.js`). It is a small, honestly-sized panel of
**29** ancestry-informative SNPs with **real 1000 Genomes Phase 3 superpopulation
alt-allele frequencies**, including the strongest classic continental markers
(SLC24A5 rs1426654, SLC45A2 rs16891982, EDAR rs3827760, and OCA2/HERC2 pigmentation
SNPs).

## What is in the file

For each SNP the panel records:

- `rsid` — dbSNP identifier.
- `chr`, `pos` — GRCh38 position (from the Ensembl variation mapping).
- `ref`, `alt` — reference and alternate allele on the GRCh38 forward strand
  (the same strand 23andMe and AncestryDNA report on, so genotypes match
  directly without flipping).
- `palindromic` — `true` for A/T and C/G SNPs, whose strand is ambiguous. These
  are flagged in the "show the math" table so a reader can discount them.
- `freq` — the **alt-allele frequency** in each of the five 1000 Genomes
  superpopulations: `AFR`, `AMR`, `EAS`, `EUR`, `SAS`.

The ancestry engine scores the user's **alt-allele dosage** against these
frequencies with a Hardy–Weinberg binomial genotype likelihood, then takes a
softmax over populations. See the engine header for the full method and for why
this deliberately improves on the naive match-rate used by the Java
`AncestrySnapshot` class.

## Source of the numbers

- **Allele frequencies:** Ensembl REST API
  (`https://rest.ensembl.org/variation/human/<rsid>?pops=1`), which serves
  **1000 Genomes Project Phase 3** population allele frequencies
  (`1000GENOMES:phase_3:AFR|AMR|EAS|EUR|SAS`). The 1000 Genomes Project
  Consortium, *A global reference for human genetic variation*, Nature 2015
  (doi:10.1038/nature15393).
- **Positions / alleles:** the GRCh38 variation mapping returned by the same
  Ensembl records.

Every frequency in `aim_panel.json` is a real value returned by that API. **No
frequency was invented or padded.** SNPs for which the API did not return a
single clean alt allele with all five superpopulation frequencies — e.g.
rs2814778 (DARC/Duffy), rs4988235 (LCT), rs1800414, and other markers whose
Phase 3 frequencies were split across multiple non-reference alleles — were
**dropped rather than guessed**. A smaller *real* panel is preferred over a
larger fabricated one; the 29 markers shipped are the ones that resolved cleanly.

## SNP selection

The candidate SNPs are drawn from well-known ancestry-informative and
pigmentation markers used in published AIM work (e.g. Kidd et al.'s AISNP sets
and classic continental-ancestry / pigmentation SNPs such as SLC24A5
rs1426654, SLC45A2 rs16891982, DARC/Duffy rs2814778, EDAR rs3827760). Only
markers whose real five-population frequencies could be retrieved are shipped.

## Honesty notes

- This panel is **continental-scale only** and is **not calibrated** to any
  individual. It cannot resolve fine-scale or admixed ancestry.
- It assumes independent markers and a single source population (a simplifying
  assumption of the likelihood model), so it is educational, not a substitute
  for a validated ancestry service.
- The panel size is small by design (see `meta.panel_size` inside the JSON).
  Below `AncestryEngine.MIN_MARKERS` comparable markers the app refuses to
  report a composition at all.
