package edu.duke;


/**
 * The <code>Point</code> class represents a two-dimensional location, constructed from (x,y) 
 * coordinates with some methods for access and the capability to calculate the distance from 
 * this point to another point.
 * 
 * <P>
 * Example usage:
 * 
 * <PRE>
 * Point a = new Point(3, 4);
 * Point b = new Point(2, 5);
 * double dist = a.distance(b);
 * </PRE>
 * 
 * <P>
 * This software is licensed with an Apache 2 license, see
 * http://www.apache.org/licenses/LICENSE-2.0 for details.
 * 
 * @author Duke Coursera Team
 */
public class Point {
    private int x;
    private int y;

    /**
     * Create a <code>Point</code> object from x and y coordinates.
     * 
     * @param startx is the x-coordinate
     * @param starty is the y-coordinate
     */
    public Point (int startx, int starty) {
        x = startx;
        y = starty;
    }

    /**
     * Returns the x coordinate of this point.
     * 
     * @return x coordinate
     */
    public int getX () {
        return x;
    }

    /**
     * Returns the y coordinate of this point.
     * 
     * @return y coordinate
     */
    public int getY () {
        return y;
    }

    /**
     * Calculate and return the Euclidean distance from this point to another point.
     * 
     * @param otherPt the other point to which distance is calculated
     * @return the distance from this point to otherPt
     */
    public double distance (Point otherPt) {
        int dx = x - otherPt.getX();
        int dy = y - otherPt.getY();
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * Returns a string representation of this point.
     * 
     * @return (x,y) for this point.
     */
    public String toString(){
        return "("+x+","+y+")";
    }


    // for testing only!
    public static void main (String[] args) {
        Point p1 = new Point(3, 4);
        Point p2 = new Point(6, 8);
        System.out.println(p1.distance(p2));
    }
}
