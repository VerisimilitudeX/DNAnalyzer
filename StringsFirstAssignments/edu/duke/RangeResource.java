package edu.duke;

import java.util.List;
import java.util.ArrayList;


/**
 * The <code>RangeResource</code> class represents a range of integer (or whole) numbers and allows
 * access to these numbers using the method <code>sequence</code>. The integers can then be iterated
 * over using a <code>for</code> loop
 * 
 * <P>
 * Example usage:
 * 
 * <PRE>
 * // this prints the square number sequence for the first 9 numbers:
 * //   1, 4, 9, 16, 25, 36, 49, 64, 81 
 * RangeResource rr = new RangeResource(1, 10);
 * for (int value : rr.sequence()) {
 *     System.out.println(value * value);
 * }
 * </PRE>
 *
 * <P>
 * Another example usage:
 * 
 * <PRE>
 * // this prints the odd numbers in decreasing order within the given range:
 * //   37, 35, 33, 31, 29, 27, 25, 23
 * RangeResource rr = new RangeResource(37, 21, -2);
 * for (int value : rr.sequence()) {
 *     System.out.println(value);
 * }
 * </PRE>
 *
 * <P>
 * This software is licensed with an Apache 2 license, see
 * http://www.apache.org/licenses/LICENSE-2.0 for details.
 * 
 * @author Duke Software Team
 */
public class RangeResource {
    private int myStart;
    private int myEnd;
    private int myIncrement;
    private List<Integer> myValues;

    /**
     * Create a <code>RangeResource</code> object, starting at 0 and going up to but not including
     * end, [0 - end), that increments by 1.
     * 
     * @param end when to stop the range, not included as one of the values
     * @throws exception if the end is negative
     */
    public RangeResource (int end) {
        this(0, end, 1);
    }

    /**
     * Create a <code>RangeResource</code> object, starting at start and going up to but not
     * including end, [start - end), that increments by 1.
     * 
     * @param start the first value in the range, included as one of the values
     * @param end when to stop the range, not included as one of the values
     * @throws exception if the end is less than the start
     */
    public RangeResource (int start, int end) {
        this(start, end, 1);
    }

    /**
     * Create a <code>RangeResource</code> object, starting at start and going up to but not
     * including end, [start - end), that increments by the amount passed as a parameter.
     * 
     * @param start the first value in the range, included as one of the values
     * @param end when to stop the range, not included as one of the values
     * @param increment how much to add to get the next value in the range's sequence
     * @throws exception if increment is negative when the end is greater than the start
     * @throws exception if increment is positive when the end is less than the start
     * @throws exception if increment is 0
     */
    public RangeResource (int start, int end, int increment) {
        if (increment == 0) {
            throw new ResourceException("RangeResource: invalid increment, cannot be 0");
        }
        if (end < start && increment > 0) {
            throw new ResourceException("RangeResource: invalid increment, cannot be positive when end (" + end
                    + ") is less than start (" + start + ")");
        }
        if (end > start && increment < 0) {
            throw new ResourceException("RangeResource: invalid increment, cannot be negative when end (" + end
                    + ") is greater than start (" + start + ")");
        }
        myStart = start;
        myEnd = end;
        myIncrement = increment;
        myValues = makeValues(start, end, increment);
    }

    /**
     * Create an <code>RangeResource</code> object that is a copy of another range.
     * 
     * @param other the original range being copied
     */
    public RangeResource (RangeResource other) {
        this(other.myStart, other.myEnd, other.myIncrement);
    }

    /**
     * Return string representation of this range, with each value in the sequence separated by a
     * comma.
     *
     * @return a <code>String</code> containing all the values in the range
     */
    @Override
    public String toString () {
        // System.out.println("RANGE: [" + myStart + ".." + myEnd + ") by " + myIncrement);
        return myValues.toString();
// old iteration way 
//        StringBuilder result = new StringBuilder();
//        result.append("[ ");
//        for (int k : this.sequence()) {
//            result.append(k + " ");
//        }
//        result.append("]");
//        return result.toString();
    }

    /**
     * Allow access to the numbers in this range one at a time.
     * 
     * @return an <code>Iterable</code> that will allow access to each number in this range
     */
    public Iterable<Integer> sequence () {
        return myValues;
// left in case we want to show another example of an iterator
//        return new Iterable<Integer>() {
//            @Override
//            public Iterator<Integer> iterator () {
//                return new Iterator<Integer>() {
//                    private int place = myStart;
//                    @Override
//                    public boolean hasNext () {
//                        if (myIncrement > 0) {
//                            return place < myEnd;
//                        }
//                        else {
//                            return place > myEnd;
//                        }
//                    }
//                    @Override
//                    public Integer next () {
//                        int result = place;
//                        place += myIncrement;
//                        return result;
//                    }
//                };
//            }
//        };
    }

    // generate the values in the range (much simpler than building an Iterator)
    private List<Integer> makeValues (int start, int end, int increment) {
        List<Integer> result = new ArrayList<Integer>();
        while (true) {
            if (increment > 0 && start >= end) {
                break;
            }
            else if (increment < 0 && start <= end) {
                break;
            }
            result.add(start);
            start += increment;
        }
        return result;
    }
}
