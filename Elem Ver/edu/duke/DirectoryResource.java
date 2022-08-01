package edu.duke;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;


/**
 * The <code>DirectoryResource</code> class allows the user to choose one or more files from a
 * directory (or folder) with a file selection dialog box by using the method
 * <code>selectedFiles</code>. These files can then be iterated over using a <code>for</code> loop.
 * 
 * <P>
 * Example usage:
 * 
 * <PRE>
 * DirectoryResource dr = new DirectoryResource();
 * for (File f : dr.selectedFiles()) {
 *     ImageResource ir = new ImageResource(f);
 *     ir.draw();
 * }
 * </PRE>
 *
 * <P>
 * This software is licensed with an Apache 2 license, see
 * http://www.apache.org/licenses/LICENSE-2.0 for details.
 * 
 * @author Duke Software Team
 */
public class DirectoryResource {
    /**
     * Create a <code>DirectoryResource</code> object.
     * 
     * Creating a <code>DirectoryResource</code> object does not open a dialog box for selecting
     * files.
     */
    public DirectoryResource () {
        // do nothing
    }

    /**
     * Open a file selection dialog box to allow the user to navigate to a directory and select one
     * or more files from the chosen directory (or folder).
     * 
     * The file selection dialog box opened starts in the current project folder.
     * 
     * @return an <code>Iterable</code> that accesses the chosen files one at a time
     */
    public Iterable<File> selectedFiles () {
        File[] files = FileSelector.selectFiles();
        // guaranteed to have at least one item
        if (files[0] == null) {
            // return empty list rather than null, so others can throw the exception if needed
            return new ArrayList<File>();
        }
        else {
            return Arrays.asList(files);
        }
    }
}
