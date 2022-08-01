package edu.duke;


/**
 * A general exception for Resource objects.
 * 
 * <P>
 * Note, this is a RuntimeException so that it does not HAVE to be caught,
 * but still gives useful information about the error.
 * 
 * <P>
 * This software is licensed with an Apache 2 license, see
 * http://www.apache.org/licenses/LICENSE-2.0 for details.
 * 
 * @author Duke Software Team
 */
public class ResourceException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ResourceException (String message) {
		super(message);
	}

	public ResourceException (String message, Throwable cause) {
		super(message, cause);
	}
}
