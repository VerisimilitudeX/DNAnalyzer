# Packaging Analysis Sessions

`package-session.sh` automates archiving a DNAnalyzer run. It executes the CLI, generates an interactive HTML report, and bundles the inputs and logs into a ZIP file.

```bash
./scripts/package-session.sh sample.fa
```

The script creates a `session_YYYYMMDD_HHMMSS.zip` archive containing:

- The original FASTA file
- `analysis.log` with the console output
- `report.html` showing nucleotide counts and percentages
- Any QC chart generated in `assets/reports`

Pass any additional DNAnalyzer CLI arguments after the FASTA file to customize the run.
