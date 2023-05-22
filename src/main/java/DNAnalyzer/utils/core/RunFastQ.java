package DNAnalyzer.utils.core;

import java.io.IOException;

public class RunFastQ {
    public static void main(String[] args) throws InterruptedException, IOException {
        FastQ fq = new FastQ("assets\\dna\\real\\6_Swamp_S1_trnL_2019_minq7.fastq");
        fq.readFastQ();
        System.out.println("Average quality: " + fq.averageQuality());

        System.out.print("[");
        int[] hist = fq.createHistogram();
        for (int i = 0; i < hist.length; i++) {
            System.out.print(hist[i]);
            if (i == hist.length - 1) {
            } else {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }
}