import unittest
from src.python.gpu_smith_waterman import SmithWatermanGPU


class TestSmithWatermanGPU(unittest.TestCase):
    def test_cpu_alignment(self):
        sw = SmithWatermanGPU()
        score, _ = sw.align("ACACACTA", "AGCACACA")
        self.assertEqual(score, 17)


if __name__ == "__main__":
    unittest.main()
