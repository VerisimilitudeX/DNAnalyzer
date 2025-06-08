package DNAnalyzer.core.readingframe;

/** Data class representing an open reading frame. */
public record OpenReadingFrame(int start, int end, boolean forward, int frame,
                               String sequence, String aminoAcids) {}
