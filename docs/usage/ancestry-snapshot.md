# Ancestry Snapshot

The Ancestry Snapshot estimates your broad continental origins using reference panels processed entirely on device. Supply a genotyping data file (for example, a 23andMe text export) to generate a summary.

```
java -jar DNAnalyzer.jar --ancestry path/to/genome.txt
```

The tool outputs a simple breakdown by continent without transmitting any data to external servers.
=======
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
