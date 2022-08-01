package edu.duke;


/**
 * The <code>Pixel</code> class represents a color as its component values of
 * red, green, blue, as well as alpha (for transparency).
 * 
 * <P>
 * Each of the component values of a pixel must have a value between 0 and 255.
 * If a value is given outside that range, it is changed to be within that range.
 * As such, a negative value would be set to 0 and a value greater than 255 would
 * be set to 255.
 * 
 * <P>
 * Example usage:
 * 
 * <pre>
 * ImageResource image = new ImageResource();
 * for (Pixel p : image.pixels()) {
 *     int red = p.getRed();
 *     int green = p.getGreen();
 *     int blue = p.getBlue();
 *     int average = (red + green + blue) / 3;
 *     p.setRed(average);
 *     p.setGreen(average);
 *     p.setBlue(average);
 * }
 * image.draw();
 * </pre>
 * 
 * <P>
 * This is open-source software released under the terms of the GPL
 * (http://www.gnu.org/licenses/gpl.html).
 */
public class Pixel {
    static final int MAX_VALUE = 255;
    private int alpha = MAX_VALUE, red = 0, green = 0, blue = 0;
    private int myX;
    private int myY;

    /**
     * Creates a Pixel from an integer value.
     * 
     * @param i the integer value representing all the color components
     * @param x the x-coordinate of this pixel in the image
     * @param y the y-coordinate of this pixel in the image
     */
    Pixel (int i, int x, int y) {
        myX = x;
        myY = y;
        setValue(i);
    }

    /**
     * Creates a Pixel from RGB values and an Alpha value (for transparency).
     * 
     * @param r the red value
     * @param g the green value
     * @param b the blue value
     * @param a the Alpha value
     * @param x the x-coordinate of this pixel in the image
     * @param y the y-coordinate of this pixel in the image
     */
    Pixel (int r, int g, int b, int a, int x, int y) {
        red = r;
        green = g;
        blue = b;
        alpha = a;
        myX = x;
        myY = y;
    }

    /**
     * Creates a Pixel from RGB values.
     * 
     * @param r the red value
     * @param g the green value
     * @param b the blue value
     * @param x the x-coordinate of this pixel in the image
     * @param y the y-coordinate of this pixel in the image
     */
    Pixel (int r, int g, int b, int x, int y) {
        this(r, g, b, MAX_VALUE, x, y);
    }

    /**
     * Creates a new Pixel from with the same values as the other pixel passed
     * as a parameter.
     * 
     * @param other another pixel
     */
    public Pixel (Pixel other) {
        this(other.getRed(), other.getGreen(), other.getBlue(), 
             other.getAlpha(), other.getX(), other.getY());
    }

    /**
     * Returns the pixel's x-coordinate within the image.
     *
     * @return the x-coordinate of this pixel.
     */
    public int getX () {
        return myX;
    }

    /**
     * Returns the pixel's y-coordinate within the image.
     *
     * @return the y-coordinate of this pixel.
     */
    public int getY () {
        return myY;
    }

    /**
     * Returns the value of the pixel's red component.
     * 
     * @return the pixel's red value within the range 0-255
     */
    public int getRed () {
        return red;
    }

    /**
     * Returns the value of the pixel's green component.
     * 
     * @return the pixel's green value within the range 0-255
     */
    public int getGreen () {
        return green;
    }

    /**
     * Returns the value of the pixel's blue component.
     * 
     * @return the pixel's blue value within the range 0-255
     */
    public int getBlue () {
        return blue;
    }

    /**
     * Returns the value of the pixel's alpha (or transparency) component.
     * 
     * @return the pixel's alpha value within the range 0-255
     */
    public int getAlpha () {
        return alpha;
    }

    /**
     * Resets the value of the pixel's red component to the value passed as a parameter.
     * If it is not in the range of 0-255 it is changed to be in that range.
     * 
     * @param r the red value
     */
    public void setRed (int r) {
        red = clamp(r);
    }

    /**
     * Resets the value of the pixel's green component to the value passed as a parameter.
     * If it is not in the range of 0-255 it is changed to be in that range.
     * 
     * @param g the green value
     */
    public void setGreen (int g) {
        green = clamp(g);
    }

    /**
     * Resets the value of the pixel's blue component to the value passed as a parameter.
     * If it is not in the range of 0-255 it is changed to be in that range.
     * 
     * @param b the blue value
     */
    public void setBlue (int b) {
        blue = clamp(b);
    }

    /**
     * Resets the value of the pixel's alpha (or transparency) component to the value passed as a parameter.
     * If it is not in the range of 0-255 it is changed to be in that range.
     * 
     * @param a the alpha value
     */
    public void setAlpha (int a) {
        alpha = clamp(a);
    }

    /**
     * Returns the string representation of the of the pixel.
     * 
     * @return a string containing the RGB values
     */
    public String toString () {
        return "Pixel R: " + red + " G: " + green + " B: " + blue;
    }

    // returns the integer value of the pixel.
    int getValue () {
        return (alpha << 24) | (red << 16) | (green << 8) | blue;
    }

    // resets the pixel to an integer value.
    void setValue (int pixel) {
        alpha = (pixel >> 24) & 0xff;
        red = (pixel >> 16) & 0xff;
        green = (pixel >> 8) & 0xff;
        blue = (pixel) & 0xff;
    }

    // clamps the given value to a valid pixel value
    private int clamp (int value) {
        return Math.max(0,  Math.min(value, MAX_VALUE));
    }
}
