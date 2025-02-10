package DNAnalyzer.core.readingframe;

import org.springframework.stereotype.Component;
import java.util.logging.Logger;

/**
 * Calculates statistical significance using Poisson distribution.
 * This class provides methods for determining the statistical significance
 * of gene lengths and other sequence features.
 * 
 * References:
 * 1. Karlin, S., & Altschul, S. F. (1990). Methods for assessing the statistical
 *    significance of molecular sequence features by using general scoring schemes.
 *    Proceedings of the National Academy of Sciences, 87(6), 2264-2268.
 * 
 * @version 2.0
 * @since 1.0
 */
@Component
public class PoissonCalculator {
    private static final Logger LOGGER = Logger.getLogger(PoissonCalculator.class.getName());
    
    // Constants for Poisson distribution calculations
    private static final double LAMBDA = 100.0; // Expected mean length
    private static final double E = Math.E;     // Euler's number

    /**
     * Calculates the statistical significance of a sequence length using
     * Poisson distribution.
     *
     * @param length The length to evaluate
     * @return A probability value between 0 and 1
     */
    public double calculateSignificance(int length) {
        validateLength(length);
        LOGGER.fine("Calculating significance for length: " + length);
        
        // Calculate Poisson probability
        double probability = poissonProbability(length);
        
        // Convert to significance value (1 - cumulative probability)
        double significance = 1.0 - probability;
        
        LOGGER.fine("Calculated significance: " + significance);
        return significance;
    }

    /**
     * Validates the input length parameter.
     *
     * @param length Length to validate
     * @throws IllegalArgumentException if length is invalid
     */
    private void validateLength(int length) {
        if (length <= 0) {
            throw new IllegalArgumentException("Length must be positive");
        }
    }

    /**
     * Calculates the Poisson probability for a given length.
     *
     * @param k The observed length
     * @return The Poisson probability
     */
    private double poissonProbability(int k) {
        double numerator = Math.pow(LAMBDA, k) * Math.pow(E, -LAMBDA);
        return numerator / factorial(k);
    }

    /**
     * Calculates the factorial of a number.
     * Uses Stirling's approximation for large numbers to prevent overflow.
     *
     * @param n The number to calculate factorial for
     * @return The factorial value
     */
    private double factorial(int n) {
        if (n > 170) { // Use Stirling's approximation for large numbers
            return Math.sqrt(2 * Math.PI * n) * Math.pow(n / E, n);
        }
        
        double result = 1.0;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}