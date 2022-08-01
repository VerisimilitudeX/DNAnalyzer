package edu.duke;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.awt.image.PixelGrabber;
import javax.imageio.ImageIO;
import java.io.File;
import java.util.Arrays;


/**
 * The <code>ImageResource</code> class represents an image as a grid of <code>Pixel</code> objects
 * and allows access to all of them, using the method <code>pixels</code>. These pixels can then be
 * iterated over using a <code>for</code> loop.
 * 
 * <P>
 * Note, no changes made to the pixels in this image affect the original image opened unless you use
 * the method <code>save</code>.
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
 * <p>
 * This is open-source software released under the terms of the GPL
 * (http://www.gnu.org/licenses/gpl.html).
 */
public class ImageResource {
    // Default width and height of blank images
    static final int WIDTH = 200;
    static final int HEIGHT = 200;

    private Pixel[] myPixels;
    private BufferedImage myImage;
    // The file name info or empty if no file yet
    private String myFileName;
    private String myPath;
    // The image's display window
    private ImageFrame myDisplay;

    /**
     * Create an <code>ImageResource</code> object that represents the file chosen by the user using
     * a file selection dialog box.
     * 
     * @throws exception if no file is selected by the user
     */
    public ImageResource () {
        File file = FileSelector.selectFile(ImageIO.getReaderFileSuffixes());
        if (file == null) {
            throw new ResourceException("ImageResource: No image file choosen");
        }
        else {
            init(file);
        }
    }

    /**
     * Create an <code>ImageResource</code> object whose size is the width and height passed as
     * parameters and whose pixels are all black.
     * 
     * @param width the width of the image in pixels
     * @param height the height of the image in pixels
     * @throws exception if the width or height are not positive values
     */
    public ImageResource (int width, int height) {
        if (width <= 0 || height <= 0) {
            throw new ResourceException("ImageResource: witdh and height values must be positive [" + width + "x" + height + "]");
        }
        else {
            init("", getBlankImage(width, height));
        }
    }

    /**
     * Create an <code>ImageResource</code> object from the file name passed as a parameter.
     * 
     * @param fileName the name of the file
     * @throws exception if the file cannot be accessed or is not in an image format
     */
    public ImageResource (String fileName) {
        init(fileName, getImageFromFile(fileName));
    }

    /**
     * Create an <code>ImageResource</code> object from a file given as a parameter.
     * 
     * @param file the file representing an image
     * @throws exception if the file cannot be accessed or is not in an image format
     */
    public ImageResource (File file) {
        init(file);
    }

    /**
     * Create an <code>ImageResource</code> object that is a copy of another image.
     * 
     * @param other the original image being copied
     */
    public ImageResource (ImageResource other) {
        init(other.myPath + other.myFileName, other.myImage);
    }

    /**
     * Returns the width of the image in pixels.
     * 
     * @return the image's width in pixels
     */
    public int getWidth () {
        return myImage.getWidth(myDisplay);
    }

    /**
     * Returns the height of the image in pixels.
     * 
     * @return the image's height in pixels
     */
    public int getHeight () {
        return myImage.getHeight(myDisplay);
    }

    /**
     * Allow access to this image one pixel at a time.
     * 
     * @return an <code>Iterable</code> that will allow access to each pixel in this image
     */
    public Iterable<Pixel> pixels () {
        if (myPixels == null) {
            throw new ResourceException("ImageResource: not ready to iterate over pixels");
        }
        return Arrays.asList(myPixels);
    }

    /**
     * Displays this image in a separate window.
     */
    public void draw () {
        updateImage();
        myDisplay.show(myImage);
    }

    /**
     * Returns the file name associated with this image.
     *
     * @return the name of the file used to create this image or an empty string if it was created
     *         as a sized image
     */
    public String getFileName () {
        return myFileName;
    }

    /**
     * Resets the file name associated with this image.
     * 
     * Useful, for example, when saving the results of changes to this image in a different file
     * than the original.
     * 
     * @param name the new name for the file
     */
    public void setFileName (String name) {
        if (!name.equals("")) {
            myFileName = name;
            myDisplay.setTitle(myFileName);
        }
    }

    /**
     * Returns the pixel at the (x, y) coordinates passed as a parameter.
     * 
     * @param x the column position of the pixel
     * @param y the row position of the pixel
     * @return the Pixel at the given (x, y) coordinates
     */
    public Pixel getPixel (int x, int y) {
        // System.out.printf("get %d %d\n",x,y);
        return myPixels[y * getWidth() + x];
    }

    /**
     * Resets the pixel at the given (x, y) coordinates but does not redraw it.
     * 
     * @param x the column position of the pixel
     * @param y the row position of the pixel
     * @param p the new pixel values to use
     */
    public void setPixel (int x, int y, Pixel p) {
        if (0 <= x && x < getWidth() && 0 <= y && y < getHeight()) {
            myPixels[y * getWidth() + x] = p;
        }
    }

    /**
     * Returns a string representation of the image (file name, width, and height).
     * 
     * @return a string representation of the image
     */
    public String toString () {
        if (myImage == null) {
            return "";
        }
        else {
            return "IMAGE\n" + "File name: " + myFileName + "\n" + "Width: " + getWidth() + "\n" + "Height: " + getHeight();
        }
    }

    /**
     * Saves the image as a JPEG using its current file name or opens a file selection dialog box to
     * allow the user to choose a name if no file name set (for example if this image was created as
     * a blank sized image).
     * 
     * @throws exception if the current filename cannot be accessed for saving
     */
    public void save () {
        if (myFileName.equals("")) {
            saveAs();
        }
        try {
            updateImage();
            File file = new File(myPath + myFileName);
            ImageIO.write(myImage, "jpg", file);
        }
        catch (Exception e) {
            throw new ResourceException("ImageResource: unable to save image to a file ", e);
        }
    }

    /**
     * Saves the image as a JPEG by opening a file selection dialog box to allow the user to choose
     * the new name for the file.
     * 
     * @throws exception if no file is selected by the user
     */
    public void saveAs () {
        File f = FileSelector.saveFile(ImageIO.getWriterFileSuffixes());
        if (f == null) {
            throw new ResourceException("ImageResource: no file chosen for save.");
        }
        else {
            try {
                setPath(f.getCanonicalPath());
                save();
            }
            catch (Exception e) {
                // should never happen because we got the file from a dialog box
                throw new ResourceException("ImageResource: unable to save image to " + f, e);
            }
        }
    }

    // Maps the image into the array of pixels
    private Pixel[] imageToPixels (Image image) {
        int w = getWidth();
        int h = getHeight();
        int[] pixels = new int[w * h];
        PixelGrabber pg = new PixelGrabber(image, 0, 0, w, h, pixels, 0, w);
        try {
            pg.grabPixels();
        }
        catch (InterruptedException e) {
            System.err.println("Interrupted waiting for pixels!");
            return null;
        }
        if ((pg.getStatus() & ImageObserver.ABORT) != 0) {
            System.err.println("Image fetch aborted or errored");
            return null;
        }
        // System.out.printf("creating pixels %d\n", pixels.length);
        return intsToPixels(pixels, w, h);
    }

    // Maps an array of int to an array of pixels
    private Pixel[] intsToPixels (int[] pixels, int width, int height) {
        if (pixels == null) {
            throw new ResourceException(String.format("ImageResource: no pixels for %d %d\n", width, height));
        }
        Pixel[] pix = new Pixel[pixels.length];
        // System.out.printf("creating %d pixels on %d
        // %d\n",pix.length,width,height);
        for (int i = 0; i < pixels.length; i++) {
            // System.out.printf("pix at %d %d %d\n", i/width,i%width,i);
            pix[i] = new Pixel(pixels[i], i % width, i / width);
        }
        // System.out.printf("returning %d\n", pix.length);
        return pix;
    }

    // Maps an array of pixels to an array of int
    private int[] pixelsToInts (Pixel[] pixels) {
        int[] pix = new int[pixels.length];
        for (int i = 0; i < pixels.length; i++)
            pix[i] = pixels[i].getValue();
        return pix;
    }

    // update Java image to reflect pixel values
    private void updateImage () {
        int width = getWidth();
        int height = getHeight();
        myImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        myImage.setRGB(0, 0, width, height, pixelsToInts(myPixels), 0, width);
    }

    // Creates an image of width w and height h with black pixels
    private BufferedImage getBlankImage (int width, int height) {
        return new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
    }

    // Reads an image from a file and updates the pixels array
    private BufferedImage getImageFromFile (String fileName) {
        try {
            File file = new File(fileName);
            BufferedImage image = ImageIO.read(file);
            while (image.getWidth(null) < 0) {
                // wait for size to be known
            }
            return image;
        }
        catch (Exception e) {
            System.err.println(e);
            return null;
        }
    }

    // breaks the path into the root and simple file name
    private void setPath (String fileName) {
        int index = fileName.lastIndexOf(File.separator);
        if (index == -1) {
            myPath = "";
        }
        else {
            myFileName = fileName.substring(index + 1);
            myPath = fileName.substring(0, index + 1);
        }
        // System.err.printf("full = %s\nshort = %s\n", myPath, myFileName);
    }

    // creates an image from the given file
    private void init (File f) {
        try {
            String path = f.getCanonicalPath();
            init(path, getImageFromFile(path));
        }
        catch (Exception e) {
            throw new ResourceException("ImageResource: unable to find " + f);
        }
    }

    // associates the given image with the given filename
    private void init (String fileName, BufferedImage image) {
        try {
            setPath(fileName);
            myImage = image;
            myDisplay = new ImageFrame(fileName, image);
            myPixels = imageToPixels(myImage);
            // System.out.printf("init: %d %d %s\n", getWidth(), getHeight(), myPath);
        }
        catch (Exception e) {
            throw new ResourceException("ImageResource: not an image file " + fileName);
        }
    }
}
