package DNAnalyzer.io;

import static org.junit.jupiter.api.Assertions.assertEquals;

import DNAnalyzer.io.FormatSniffer.FileFormat;
import java.io.File;
import org.junit.jupiter.api.Test;

class FormatSnifferTest {

    @Test
    void detectFasta() throws Exception {
        File f = new File("assets/dna/example/test.fa");
        assertEquals(FileFormat.FASTA, FormatSniffer.detect(f));
    }

    @Test
    void detectFastq() throws Exception {
        File f = new File("assets/dna/real/1_control_psbA3_2019_minq7.fastq");
        assertEquals(FileFormat.FASTQ, FormatSniffer.detect(f));
    }

    @Test
    void detectVcf() throws Exception {
        File f = new File("assets/dna/example/test.vcf");
        assertEquals(FileFormat.VCF, FormatSniffer.detect(f));
    }
}
