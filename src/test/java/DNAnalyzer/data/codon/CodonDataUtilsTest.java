package DNAnalyzer.data.codon;

import org.junit.jupiter.api.Test;

import static DNAnalyzer.data.codon.CodonDataUtils.returnSubstring;
import static org.junit.jupiter.api.Assertions.assertEquals;

class CodonDataUtilsTest {
    String testInput = "gggggaggtggcgaggaagatgac";

    // "ggg"
    int testCodon1 = 0;
    // "gga"
    int testCodon2 = 3;
    // "ggt"
    int testCodon3 = 6;
    // "ggc"
    int testCodon4 = 9;
    // "gag"
    int testCodon5 = 12;
    // "gaa"
    int testCodon6 = 15;
    // "gat"
    int testCodon7 = 18;
    // "gac"
    int testCodon8 = 21;

    String expectedCodon1 = "GGG";
    String expectedCodon2 = "GGA";
    String expectedCodon3 = "GGT";
    String expectedCodon4 = "GGC";
    String expectedCodon5 = "GAG";
    String expectedCodon6 = "GAA";
    String expectedCodon7 = "GAT";
    String expectedCodon8 = "GAC";

    @Test
    void testReturnSubstringWithCodon1() {
        String expectedResult = this.expectedCodon1;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon1);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon2() {
        String expectedResult = this.expectedCodon2;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon2);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon3() {
        String expectedResult = this.expectedCodon3;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon3);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon4() {
        String expectedResult = this.expectedCodon4;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon4);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon5() {
        String expectedResult = this.expectedCodon5;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon5);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon6() {
        String expectedResult = this.expectedCodon6;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon6);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon7() {
        String expectedResult = this.expectedCodon7;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon7);
        assertEquals(expectedResult, actualSubstringResult);
    }

    @Test
    void testReturnSubstringWithCodon8() {
        String expectedResult = this.expectedCodon8;
        String actualSubstringResult = returnSubstring(this.testInput, this.testCodon8);
        assertEquals(expectedResult, actualSubstringResult);
    }

}