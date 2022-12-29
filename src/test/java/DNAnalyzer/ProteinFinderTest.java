/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please reach out to contact@dnanalyzer.live
 */

package DNAnalyzer;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.jupiter.api.Test;

import DNAnalyzer.utils.protein.ProteinFinder;

class ProteinFinderTest {
	Path testFile = Path.of("C:\\Users\\garyg\\Documents\\projects\\DNAnalyzer\\assets\\dna\\random\\dnalong.fa");
	Path projectPath = Path.of("");
	Path dnaLongTestInput = projectPath.resolve("assets/dna/random/dnalong.fa");

	@Test
	void testGetProtein() {
		try {
			List<String> inputLines = Files.readAllLines(dnaLongTestInput);
			List<String> expected = new ArrayList<String>();
			expected.add("AATTCCCTACAACGGATGCGCCGCTGATAGACTCGGGTTCTGGCGTCCGAGTGAAGATGATAA");
			expected.add(
					"AACCAATCTCATGATCACCAGTTCTGACGTTACAGTATTTTCGGTTGAGCAGGCCCCATGGGGCCCCCGCATGCCGAATTACGATATGATGCCCACTATCCTGTGTCTTCCAACCTTATGACTGACTTGTATGCGCTGCGAGGTCCCTCGATAGATTTGCTCCCACCCGTCCCGGAAACCATATCGACGACTTGTAGGTCTCTAA");

			List<String> actual = ProteinFinder.getProtein(inputLines.get(0), "n");
			assertArrayEquals(expected.toArray(), actual.toArray());
		} catch (IOException ex) {
			Logger.getLogger(ProteinFinderTest.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

}
