# Polygenic Risk Scoring with DNAnalyzer

DNAnalyzer’s CLI now ships with a self-contained polygenic risk scoring (PRS) pipeline. This guide walks through the supported inputs, how to run a score, and how to interpret the console output.

## What You Need

- **23andMe raw data export** (TXT). The pipeline expects the standard tab-delimited layout: comment lines beginning with `#`, followed by a header row `rsid\tchromosome\tposition\tgenotype` and genotype calls such as `rs12345	1	123456	AG`.
- **PRS weight table** (CSV). Each record must include three columns: SNP identifier (`rsID`), risk allele (single base or two-character genotype), and the numeric weight. Example files are shipped under `assets/risk/`.

```text
# Example 23andMe snippet
rsid	chromosome	position	genotype
rs6025	1	1000	AA
rs1799983	7	2000	GT

# Example weight table
SNP,RiskAllele,Weight
rs6025,A,1.5
rs1799983,T,1.2
```

## Running the CLI

Invoke the Gradle task (or the shaded JAR) with the genotype file and at least one PRS CSV:

```bash
./gradlew run --args='--23andme my_genotype.txt --prs assets/risk/heart_disease_prs.csv'
```

You can provide multiple weight tables by comma-separating them:

```bash
./gradlew run --args='--23andme my_genotype.txt --prs assets/risk/heart_disease_prs.csv,assets/risk/sample_weights.csv'
```

An optional FASTA may be supplied as the final positional argument if you want the traditional sequence summary alongside the PRS output.

## Interpreting Results

The CLI prints a summary per weight table:

- **Variants** – Total variants in the weight table, how many were matched in the genotype file, and coverage percentage.
- **Raw score** – Sum of (allele dosage × weight) across all SNPs.
- **Normalised** – Raw score divided by the theoretical maximum magnitude (`Σ|weight| × 2`). Use this to compare scores across traits.

Each SNP contribution is displayed as a row showing the genotype call, requested risk allele, matched dosage (`0–2`), the weight, and the contribution added to the raw score. Missing genotypes or uncallable entries are flagged with a `--` genotype and a note such as “No genotype call”.

## Quality Checks

- **Coverage < 100%** means the shipped weights reference SNPs that are not present in your raw file. Treat scores derived from sparse coverage as exploratory only.
- **Uncallable genotypes** (`--`) occur when 23andMe marks a site as “no call”. These variants are excluded from the raw score.

## Limitations & Next Steps

- Scores are deterministic; no statistical normalisation against population cohorts is performed. Future releases may add reference distributions where ethically and legally possible.
- Weight files are bundled for demonstration only. Replace them with weights sourced from peer-reviewed GWAS studies before making any decision-oriented interpretations.
- Always validate against your own datasets. Run `GRADLE_USER_HOME=./.gradle ./gradlew test` to execute the included JUnit coverage once you have network connectivity to fetch the Gradle wrapper.

For questions or to contribute additional trait panels, open an issue or pull request in the repository.
