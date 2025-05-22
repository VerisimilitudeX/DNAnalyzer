"""GPU accelerated Smith-Waterman alignment using optional PyOpenCL.

If PyOpenCL is unavailable or no GPU is detected, a pure Python
fallback implementation is used.
"""

from __future__ import annotations

try:
    import pyopencl as cl
    import numpy as np
    _GPU_AVAILABLE = True
except Exception:  # pragma: no cover - optional dependency
    cl = None  # type: ignore
    np = None  # type: ignore
    _GPU_AVAILABLE = False


class SmithWatermanGPU:
    """Smith-Waterman with optional GPU acceleration."""

    def __init__(self, match: int = 3, mismatch: int = -3, gap: int = -2) -> None:
        self.match = match
        self.mismatch = mismatch
        self.gap = gap
        if _GPU_AVAILABLE:
            self._setup_opencl()

    # ---------------------------- GPU implementation -------------------------
    def _setup_opencl(self) -> None:
        """Initialize OpenCL context and compile kernel."""
        self._ctx = cl.create_some_context()
        self._queue = cl.CommandQueue(self._ctx)
        kernel = r"""
        __kernel void sw_diag(
            __global const char* seq1,
            __global const char* seq2,
            __global int* H,
            const int len1,
            const int len2,
            const int diag,
            const int start_i,
            const int match,
            const int mismatch,
            const int gap)
        {
            int gid = get_global_id(0);
            int i = start_i + gid;
            int j = diag - i + 1;
            if(i<=len1 && j>=1 && j<=len2) {
                int diag_idx = (i-1)*(len2+1) + (j-1);
                int up_idx   = (i-1)*(len2+1) + j;
                int left_idx = i*(len2+1) + (j-1);
                int idx      = i*(len2+1) + j;
                int match_val = seq1[i-1]==seq2[j-1] ? match : mismatch;
                int diag_val  = H[diag_idx] + match_val;
                int up_val    = H[up_idx] + gap;
                int left_val  = H[left_idx] + gap;
                int val = diag_val;
                if(up_val > val) val = up_val;
                if(left_val > val) val = left_val;
                if(val < 0) val = 0;
                H[idx] = val;
            }
        }
        """
        self._prog = cl.Program(self._ctx, kernel).build()

    def _align_gpu(self, seq1: str, seq2: str) -> tuple[int, "np.ndarray"]:
        len1, len2 = len(seq1), len(seq2)
        seq1_buf = np.frombuffer(seq1.encode("ascii"), dtype=np.int8)
        seq2_buf = np.frombuffer(seq2.encode("ascii"), dtype=np.int8)
        H = np.zeros((len1 + 1) * (len2 + 1), dtype=np.int32)
        d_seq1 = cl.Buffer(self._ctx, cl.mem_flags.READ_ONLY |
                           cl.mem_flags.COPY_HOST_PTR, hostbuf=seq1_buf)
        d_seq2 = cl.Buffer(self._ctx, cl.mem_flags.READ_ONLY |
                           cl.mem_flags.COPY_HOST_PTR, hostbuf=seq2_buf)
        d_H = cl.Buffer(self._ctx, cl.mem_flags.READ_WRITE |
                        cl.mem_flags.COPY_HOST_PTR, hostbuf=H)
        for diag in range(2, len1 + len2 + 1):
            start_i = max(1, diag - len2)
            end_i = min(len1, diag - 1)
            diag_size = max(0, end_i - start_i + 1)
            if diag_size == 0:
                continue
            self._prog.sw_diag(
                self._queue,
                (diag_size,),
                None,
                d_seq1,
                d_seq2,
                d_H,
                np.int32(len1),
                np.int32(len2),
                np.int32(diag),
                np.int32(start_i),
                np.int32(self.match),
                np.int32(self.mismatch),
                np.int32(self.gap),
            )
        cl.enqueue_copy(self._queue, H, d_H)
        H = H.reshape((len1 + 1, len2 + 1))
        return int(H.max()), H

    # ---------------------------- CPU fallback -------------------------------
    def _align_cpu(self, seq1: str, seq2: str) -> tuple[int, list[list[int]]]:
        len1, len2 = len(seq1), len(seq2)
        H = [[0] * (len2 + 1) for _ in range(len1 + 1)]
        max_score = 0
        for i in range(1, len1 + 1):
            for j in range(1, len2 + 1):
                match_score = self.match if seq1[i -
                                                 1] == seq2[j - 1] else self.mismatch
                diag = H[i - 1][j - 1] + match_score
                up = H[i - 1][j] + self.gap
                left = H[i][j - 1] + self.gap
                val = diag
                if up > val:
                    val = up
                if left > val:
                    val = left
                if val < 0:
                    val = 0
                H[i][j] = val
                if val > max_score:
                    max_score = val
        return max_score, H

    def align(self, seq1: str, seq2: str):
        """Return Smith-Waterman max score and matrix."""
        if _GPU_AVAILABLE:
            return self._align_gpu(seq1, seq2)
        return self._align_cpu(seq1, seq2)

    def traceback(self, seq1: str, seq2: str, matrix) -> tuple[str, str]:
        """Reconstruct the best local alignment from a score matrix."""
        import numpy as _np  # local import for type check

        H = _np.array(matrix)
        i, j = _np.unravel_index(H.argmax(), H.shape)
        aligned1: list[str] = []
        aligned2: list[str] = []
        while i > 0 and j > 0 and H[i][j] > 0:
            score = H[i][j]
            diag = H[i - 1][j - 1]
            up = H[i - 1][j]
            left = H[i][j - 1]
            match_score = self.match if seq1[i -
                                             1] == seq2[j - 1] else self.mismatch
            if score == diag + match_score:
                aligned1.append(seq1[i - 1])
                aligned2.append(seq2[j - 1])
                i -= 1
                j -= 1
            elif score == up + self.gap:
                aligned1.append(seq1[i - 1])
                aligned2.append("-")
                i -= 1
            elif score == left + self.gap:
                aligned1.append("-")
                aligned2.append(seq2[j - 1])
                j -= 1
            else:
                break
        return "".join(reversed(aligned1)), "".join(reversed(aligned2))


def _main() -> None:
    import argparse
    import json
    parser = argparse.ArgumentParser(description="Smith-Waterman alignment")
    parser.add_argument("seq1")
    parser.add_argument("seq2")
    parser.add_argument("--json", action="store_true", help="output JSON")
    args = parser.parse_args()
    sw = SmithWatermanGPU()
    score, matrix = sw.align(args.seq1, args.seq2)
    a1, a2 = sw.traceback(args.seq1, args.seq2, matrix)
    if args.json:
        print(json.dumps({"score": score, "aligned1": a1, "aligned2": a2}))
    else:
        print(f"Score: {score}\n{a1}\n{a2}")


if __name__ == "__main__":  # pragma: no cover - CLI entry
    _main()


__all__ = ["SmithWatermanGPU", "_GPU_AVAILABLE"]
