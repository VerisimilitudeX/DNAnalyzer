# Ancestry Snapshot (Privacy-Safe)

The `AncestrySnapshot` utility compares your genotype to a small on-device
reference panel to estimate continental ancestry. All calculations occur locally
and no raw data is sent to third-party services.

## How it works
- Reference markers are packaged in `assets/ancestry/continental_reference.json`.
- `AncestrySnapshot` loads these panels at runtime and scores your genotype.
- The continent with the highest match percentage is reported.

## Usage Example
```java
Map<String, String> snps = DNADataUploader.uploadFromAncestryDNA("my_data.txt");
DNAAnalysis analysis = new DNAAnalysis(new DNATools(""), null, "M");
analysis.ancestrySnapshot(snps);
```

This prints a simple breakdown of continental matches without leaving your
machine.
