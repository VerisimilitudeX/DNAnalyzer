package resources;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

public class DirectoryResource {
    public DirectoryResource () {
    }
    public Iterable<File> selectedFiles () {
        File[] files = FileSelector.selectFiles();
        if (files[0] == null) {
            return new ArrayList<File>();
        }
        else {
            return Arrays.asList(files);
        }
    }
}
