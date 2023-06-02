package DNAnalyzer.utils.core;

import java.io.IOException;

/**
 * FastQ class for the DNAnalyzer program.
 * 
 * @version 1.2.1
 * @see <a href=
 *      "https://www.genome.gov/about-genomics/fact-sheets/Genomic-Data-Science">Genomic
 *      Datasheet</a>
 *      TODO: Delete this test class
 */
public class RunFastQ {

    /**
     * Main method for the FastQ class.
     * 
     * @param args Command line arguments
     *             {@code @category} Main
     * @throws IOException
     * @throws InterruptedException
     */
    public static void main(String[] args) throws InterruptedException, IOException {
        FastQ fq = new FastQ("assets\\dna\\real\\6_Swamp_S1_trnL_2019_minq7.fastq");
        fq.readFastQ();
        System.out.println("Average quality: " + fq.averageQuality());

        System.out.print("[");
        int[] hist = fq.createHistogram();
        for (int i = 0; i < hist.length; i++) {
            System.out.print(hist[i]);
            if (i != hist.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }
}