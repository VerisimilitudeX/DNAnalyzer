# API Reference

Covers the REST API (`DNAnalyzer.api.ApiApplication`) and the CLI
(`DNAnalyzer.Main`). All endpoints live under `/api/v1`. All requests and
responses are JSON unless marked `multipart/form-data`.

## Starting the API locally

```bash
./gradlew bootRun                      # Gradle, from source
java -jar build/libs/DNAnalyzer-1.2.1-boot.jar
docker compose up --build              # Full stack with Nginx front end
```

Health check:

```bash
curl http://localhost:8080/api/v1/status
```

Swagger UI: <http://localhost:8080/swagger-ui/index.html>.

## Error responses

All errors return `ErrorResponse`:

```json
{
  "timestamp": "2026-04-23T19:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "sequence must not be blank",
  "path": "/api/v1/base-pairs"
}
```

| HTTP | When |
|---|---|
| 400 | Validation failure (e.g. empty `sequence`, unsupported start amino acid) |
| 413 | Upload exceeds the gateway limit (Nginx default is 100 MB) |
| 500 | Unhandled server error (rare; should be reported as a bug) |

## Endpoints

### GET `/api/v1/status`

Health check and version metadata. Unauthenticated, returns `ApiStatusResponse`.

```json
{
  "service": "DNAnalyzer",
  "version": "1.2.1",
  "status": "OK"
}
```

### POST `/api/v1/analyze` (multipart)

Full analysis pipeline on an uploaded sequence file. Used by the web
dashboard.

**Form fields**

| Field | Type | Required | Description |
|---|---|---|---|
| `dnaFile` | file | yes | FASTA, FASTQ, or plain-text sequence |
| `options` | string | no | JSON with analysis flags (see "Analyze options") |

```bash
curl -F dnaFile=@sample.fa \
     -F 'options={"detailed":true,"includeAi":false}' \
     http://localhost:8080/api/v1/analyze
```

Response: `AnalysisResponse` containing base-pair counts, reading frames,
candidate proteins, and (optionally) AI-narrated summaries.

### POST `/api/v1/base-pairs` (JSON)

Base-pair counts, percentages, and GC content.

Request (`SequenceRequest`):

```json
{ "sequence": "ATGCGCATTA" }
```

Response (`BasePairResponse`): counts for A, T, C, G, N, total length, GC percentage.

### POST `/api/v1/reading-frames` (JSON)

Open reading frames in forward and reverse directions.

Request (`ReadingFrameRequest`):

```json
{ "sequence": "ATGCGCATTA", "minLength": 30 }
```

| Field | Type | Required | Description |
|---|---|---|---|
| `sequence` | string | yes | DNA sequence |
| `minLength` | integer | no | Minimum ORF length (default per service) |

Response (`ReadingFrameResponse`): list of ORFs with start, end, frame, and nucleotide content.

### POST `/api/v1/find-proteins` (JSON)

Candidate proteins, returning the top 10 by length.

Request (`ProteinRequest`):

```json
{ "sequence": "ATGCGCATTA...", "aminoAcid": "M", "minLength": 30 }
```

| Field | Type | Required | Description |
|---|---|---|---|
| `sequence` | string | yes | DNA sequence |
| `aminoAcid` | string | no | Start amino acid (default `M`); only standard amino acids accepted |
| `minLength` | integer | no | Minimum protein length |

Response (`ProteinResponse`): ranked list of candidate proteins.

### POST `/api/v1/manipulate` (JSON)

Reverse, complement, or reverse-complement a sequence.

Request (`ManipulationRequest`):

```json
{ "sequence": "ATGCGCATTA", "reverse": true, "complement": true }
```

| Field | Type | Required | Description |
|---|---|---|---|
| `sequence` | string | yes | DNA sequence |
| `reverse` | boolean | no | Reverse the sequence |
| `complement` | boolean | no | Take the complement |

Setting both to `true` yields the reverse complement. Setting neither is a
no-op and echoes the input.

### POST `/api/v1/parse` (multipart)

Extract the first sequence record from FASTA, FASTQ, or plain-text uploads.
Useful for validating user input before a full analysis.

| Field | Type | Required |
|---|---|---|
| `file` | file | yes |

Response (`FileParseResponse`): header, sequence, length, and detected format.

### POST `/api/v1/analyze-genetic` (multipart)

Score 23andMe or AncestryDNA genotype exports against bundled ancestry
reference panels and polygenic risk score panels.

| Field | Type | Required | Description |
|---|---|---|---|
| `geneticFile` | file | yes | 23andMe or AncestryDNA export |
| `snpAnalysis` | boolean | no (default `false`) | When `true`, includes per-SNP contribution in the response |

Response (`GeneticAnalysisResponse`): ancestry match scores, PRS values,
and (if requested) per-SNP breakdowns.

## CLI reference

Invoke the CLI via the launcher script (recommended) or directly via `java -jar`.

```bash
./easy_dna.sh <file> <mode>
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar <file> [flags]
./gradlew run --args='<flags>'
```

### Preset modes (via `easy_dna.sh`)

| Mode | Equivalent flags |
|---|---|
| `basic` | default (none) |
| `detailed` | `--detailed --verbose` |
| `quick` | `--quick` |
| `mutations` | `--mutate 3` |
| `reverse` | `--rcomplement` |
| `all` | runs basic, detailed, mutations, reverse in sequence |
| `custom` | interactive prompt |

### Common flags

| Flag | Purpose |
|---|---|
| `--detailed` | Comprehensive analysis output |
| `--verbose` | Extra logging |
| `--quick` | Fast subset of analyses |
| `--mutate <N>` | Generate N mutation variants of the input |
| `--rcomplement` | Emit the reverse complement |
| `--profile <name>` | Apply a preset analysis profile (see below) |
| `--23andme <file>` | Include a 23andMe genotype export |
| `--prs <csv>` | PRS weight table; can be repeated |
| `--align <file>` | Secondary sequence for alignment |
| `--sw-align` | Use Smith-Waterman (local alignment) for `--align` |
| `--no-ai` | Skip the optional AI-narrated report |
| `--version`, `--help` | Self-explanatory |

### Analysis profiles

```bash
java -jar build/libs/DNAnalyzer-1.2.1-plain.jar --profile list
```

Bundled profiles: `basic`, `detailed`, `quick`, `research`, `mutation`, `clinical`.

### Environment variables

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Enable AI-narrated reports |
| `OPENAI_MODEL` | Override the default model |
| `AI_PROVIDER` | Force a specific AI provider (defaults to `openai`) |
| `DNANALYZER_JAR` | Override the jar path used by `easy_dna.sh` |
| `DNANALYZER_PYTHON` | Override the Python interpreter used for Smith-Waterman |
| `DNANALYZER_SW_SCRIPT` | Override the Smith-Waterman script path |

## Python interface

`src/python/gpu_smith_waterman.py` is both a library and a CLI. Invoke
directly when you want to use the GPU path without the Java wrapper:

```bash
python3 -m src.python.gpu_smith_waterman ACACACTA AGCACACA --json
```

| Flag | Purpose |
|---|---|
| `seq1`, `seq2` | Inline sequences (positional) |
| `--seq1-file`, `--seq2-file` | Read sequences from FASTA or plain-text files |
| `--json` | Emit `{"score": ..., "aligned1": ..., "aligned2": ...}` on stdout |

The CPU fallback does not require `numpy`. `PyOpenCL` and `numpy` together
enable the GPU path; either missing triggers the CPU path silently.
