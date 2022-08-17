package resources;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StorageResource {
    private List<String> myStrings;

    /**
     * Create an empty <code>StorageResource</code> object
     */
    public StorageResource () {
        myStrings = new ArrayList<String>();
    }

    /**
     * Create a <code>StorageResource</code> object, loaded with the Strings passed as parameters.
     */
    StorageResource (String... data) {
        myStrings = new ArrayList<String>(Arrays.asList(data));
    }

    /**
     * Create an <code>StorageResource</code> object that is a copy of another list.
     * 
     * @param other the original list being copied
     */
    public StorageResource (StorageResource other) {
        myStrings = new ArrayList<String>(other.myStrings);
    }

    /**
     * Remove all strings from this object so that <code>.size() == 0</code>.
     */
    public void clear () {
        myStrings.clear();
    }

    /**
     * Adds a string to this storage object.
     * 
     * @param s the value added
     */
    public void add (String s) {
        myStrings.add(s);
    }

    /**
     * Returns the number of strings added/stored in this object.
     * 
     * @return the number of strings stored in the object
     */
    public int size () {
        return myStrings.size();
    }

    /**
     * Determines if a string is stored in this object.
     * 
     * @param s string searched for
     * @return true if and only if s is stored in this object
     */
    public boolean contains (String s) {
        return myStrings.contains(s);
    }

    /**
     * Create and return an iterable for all strings in this object.
     * 
     * @return an <code>Iterable</code> that allows access to each string in the order stored
     */
    public Iterable<String> data () {
        return myStrings;
    }
}
