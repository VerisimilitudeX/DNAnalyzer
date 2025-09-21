# Ancestry Snapshot (Privacy-Safe)

The `AncestrySnapshot` utility compares your genotype to a small on-device
reference panel to estimate continental ancestry. All calculations occur locally
and no raw data is sent to third-party services.

## How it works
- Reference markers are packaged in `assets/ancestry/continental_reference.json`.
- `AncestrySnapshot` loads these markers at runtime and scores your genotype.
- The continent with the highest match percentage is highlighted in the report.

## Quick start
```java
Path export = Paths.get("my_23andme_data.txt");
Map<String, String> snps = DNADataUploader.uploadFrom23AndMe(export);
AncestrySnapshot snapshot = AncestrySnapshot.usingBundledReference();
System.out.println(snapshot.formatResults(snps));
```

`formatResults` produces a concise text summary (for example `Top match: Europe
(100.0%)`). If additional detail is required, inspect the `Result` objects
returned by `analyze` to see missing or mismatched markers per population.
