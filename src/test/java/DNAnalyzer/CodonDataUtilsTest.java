/*
 * Copyright © 2023 DNAnalyzer. Some rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * You are entirely responsible for the use of this application, including any and all activities that occur.
 * While DNAnalyzer strives to fix all major bugs that may be either reported by a user or discovered while debugging,
 * they will not be held liable for any loss that the user may incur as a result of using this application, under any circumstances.
 *
 * For further inquiries, please contact DNAnalyzer@piyushacharya.com
 */

package DNAnalyzer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import DNAnalyzer.data.codon.CodonDataUtils;

/**
 * CodonDataUtilsTest contains 20 unit tests, one for each acid.
 *
 * @author @Speedro
 */
public class CodonDataUtilsTest {

	@ParameterizedTest
	@ValueSource(strings = { "i", "isoleucine", "ile" })
	public void testIsoleucine_expectCorrect(final String acid) {
		final var expected = List.of("ATT", "ATC", "ATA");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "l", "leucine", "leu" })
	public void testLeucine_expectCorrect(final String acid) {
		final var expected = List.of("CTT", "CTC", "CTA", "CTG", "TTA", "TTG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "v", "valine", "val" })
	public void testValine_expectCorrect(final String acid) {
		final var expected = List.of("GTT", "GTC", "GTA", "GTG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "f", "phenylalanine", "phe" })
	public void testPhenylalanine_expectCorrect(final String acid) {
		final var expected = List.of("TTT", "TTC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "m", "methionine", "met" })
	public void getMethionineTest(final String acid) {
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertTrue(actual.contains("ATG"));
	}

	@ParameterizedTest
	@ValueSource(strings = { "c", "cysteine", "cys" })
	public void getCysteineTest(final String acid) {
		final var expected = List.of("TGT", "TGC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "a", "alanine", "ala" })
	public void getAlanineTest(final String acid) {
		final var expected = List.of("GCT", "GCC", "GCA", "GCG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "g", "glycine", "gly" })
	public void getGlycineTest(final String acid) {
		final var expected = List.of("GGT", "GGC", "GGA", "GGG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "p", "proline", "pro" })
	public void getProlineTest(final String acid) {
		final var expected = List.of("CCT", "CCC", "CCA", "CCG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "t", "threonine", "thr" })
	public void getThreonineTest(final String acid) {
		final var expected = List.of("ACT", "ACC", "ACA", "ACG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "s", "serine", "ser" })
	public void getSerineTest(final String acid) {
		final var expected = List.of("TCT", "TCC", "TCA", "TCG", "AGT", "AGC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "tyrosine", "y", "tyr" })
	public void getTyrosineTest(final String acid) {
		final var expected = List.of("TAT", "TAC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "w", "tryptophan", "trp" })
	public void getTryptophanTest(final String acid) {
		final var expected = List.of("TGG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "q", "glutamine", "gln" })
	public void getGlutamineTest(final String acid) {
		final var expected = List.of("CAA", "CAG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "n", "asparagine", "asn" })
	public void getAsparagineTest(final String acid) {
		final var expected = List.of("AAT", "AAC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "h", "histidine", "his" })
	public void getHistidineTest(final String acid) {
		final var expected = List.of("CAT", "CAC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "e", "glutamic acid", "glu" })
	public void getGlutamicAcidTest(final String acid) {
		final var expected = List.of("GAA", "GAG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "d", "aspartic acid", "asp" })
	public void getAsparicAcidTest(final String acid) {
		final var expected = List.of("GAT", "GAC");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "k", "lysine", "lys" })
	public void getLysineAcidTest(final String acid) {
		final var expected = List.of("AAA", "AAG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}

	@ParameterizedTest
	@ValueSource(strings = { "r", "arginine", "arg" })
	public void getArginineAcidTest(final String acid) {
		final var expected = List.of("CGT", "CGC", "CGA", "CGG", "AGA", "AGG");
		final var actual = CodonDataUtils.getAminoAcid(acid);
		assertEquals(expected.size(), actual.size());
		assertTrue(actual.containsAll(expected));
	}
}
