# GPU-Accelerated Smith-Waterman

This module provides an optional GPU implementation of the Smith–Waterman
local alignment algorithm using [PyOpenCL](https://pypi.org/project/pyopencl/).
When a compatible GPU or OpenCL runtime is unavailable, the code falls back to a
pure Python implementation.

## Usage

```
python -m src.python.gpu_smith_waterman SEQ1 SEQ2
```

To call the module from Java, the CLI flag `--sw-align` triggers the Python
implementation when used alongside `--align`.

```bash
# Analyse sample.fa and align against reference.fa
java -jar dnanalyzer.jar sample.fa --align reference.fa --sw-align

# Or specify both query and reference explicitly
java -jar dnanalyzer.jar --align query.fa reference.fa --sw-align
```

Or import the class in your own scripts:

```python
from src.python.gpu_smith_waterman import SmithWatermanGPU
sw = SmithWatermanGPU()
score, matrix = sw.align("ACACACTA", "AGCACACA")
```

The `score` variable will contain the maximum alignment score and `matrix`
contains the dynamic programming matrix.

## Dependencies

* Python 3.8+
* `pyopencl` (optional – falls back to CPU if not installed)

Install dependencies via:

```
pip install pyopencl
```

GPU execution has been tested on CUDA and OpenCL compatible devices.
