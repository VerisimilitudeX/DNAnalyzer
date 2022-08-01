package edu.duke;

import java.util.ArrayList;
import edu.duke.FileResource;


/**
 * The <code>Shape</code> class represents a collection of <code>Point</code>s that can easily 
 * model a polygonal shape. Points can be added in order via code or given using a file, one 
 * point per line separated by a comma. The points can then be accessed in the order they were 
 * added one at a time, using the method <code>getPoints</code>.
 * 
 * <P>
 * Example usage: 
 * 
 * <PRE>
 * Point a = new Point(3, 4);
 * Point b = new Point(2, 5);
 * Shape s = new Shape();
 * s.addPoint(a);
 * s.addPoint(b);
 * s.addPoint(new Point(1, 1));
 * for (Point p : s.getPoints()) {
 *     System.out.println(p);
 * }
 * </PRE>
 * 
 * <P>
 * A <code>Shape</code> can also be created using file in the following format:
 * 
 * <PRE>
 * 3, 4
 * 2, 5
 * 1, 1
 * </PRE>
 *
 * <P>
 * Example file usage:
 * 
 * <PRE>
 * FileResource fr = new FileResource();
 * Shape s = new Shape(fr);
 * for (Point p : s.getPoints()) {
 *     System.out.println(p);
 * }
 * </PRE>
 * 
 * <P>
 * This software is licensed with an Apache 2 license, see
 * http://www.apache.org/licenses/LICENSE-2.0 for details.
 * 
 * @author Duke Coursera Team
 */
public class Shape {
    private ArrayList<Point> points;

    /**
     * Create an empty <code>Shape</code> object, one with no points.
     */
    public Shape () {
        points = new ArrayList<Point>();
    }

    /**
     * Create a <code>Shape</code> object from a file with x,y coordinates 
     * of points, in order, one pair of x,y per line.
     * 
     * Each x,y are comma-separated, e.g.,
     * <pre>
     *   3,4
     *  -2,5
     * </pre>
     * whitespace on line is skipped.
     * 
     * @param file is the FileResource accessible and bound to a file
     * with one pair of points per line
     */
    public Shape (FileResource file) {
        this();
        for (String line : file.lines()) {
            int commaloc = line.indexOf(",");
            int x = Integer.parseInt(line.substring(0, commaloc).trim());
            int y = Integer.parseInt(line.substring(commaloc + 1).trim());
            addPoint(new Point(x, y));
        }
    }
    
    /**
     * Add a point to this shape/polygon. 
     * 
     * The order in which points are added defines the order in which points are
     * accessed.
     * 
     * @param p is the Point added to this shape
     */
    public void addPoint (Point p) {
        points.add(p);
    }

    /**
     * Return the last point added to this shape/polygon
     * 
     * @return the last Point added
     */
    public Point getLastPoint () {
        return points.get(points.size() - 1);
    }

    /**
     * Allow access to this shape one point at a time.
     * 
     * @return an Iterable that allows access to points
     */
    public Iterable<Point> getPoints () {
        return points;
    }
}
