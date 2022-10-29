## DNAnalyzer Code Conventions

You should keep these practices in mind all the time while contributing to DNAnalyzer.

### Source File Name

- The source file name consists of the case-sensitive name of the top-level class it contains, plus the .java extension.

### Source File Structure

- A source file consists of, in order:
    - License or copyright information, if present
    - Package statement
    - Import statements
    - Exactly one top-level class

- Exactly one blank line separates each section that is present.
- All "special variables" (i.e. constants to be initialized early) are declared at the top of the file, below any
  imports.

### Imports

- Wildcard imports, static or otherwise, are not used.
- Import statements are not line-wrapped.

- Imports are ordered as follows:
    - All static imports in a single block.
    - All non-static imports in a single block.
    - If there are both static and non-static imports, a single blank line separates the two blocks. There are no other
      blank lines between import statements.
    - Static import is not used for static nested classes. They are imported with normal imports.

### Class Declaration

- Each top-level class resides in a source file of its own.
- Methods of a class that share the same name appear in a single contiguous group with no other members in between. The
  same applies to multiple constructors (which always have the same name). This rule applies even when modifiers such as
  static or private differ between the methods.

### Formatting

- Braces
    - Braces are used with if, else, for, do and while statements, even when the body is empty or contains only a single
      statement.
    - No line break before the opening brace, except as detailed below.
    - Line break after the opening brace.
    - Line break before the closing brace.
    - Line break after the closing brace, only if that brace terminates a statement or terminates the body of a method,
      constructor, or named class. For example, there is no line break after the brace if it is followed by else or a
      comma.
    - An empty block or block-like construct may be closed immediately after it is opened, with no characters or line
      break in between ({}).

- Block Indentation
    - Each time a new block or block-like construct is opened, the indent increases by two spaces. When the block ends,
      the indent returns to the previous indent level. The indent level applies to both code and comments throughout the
      block.

- Whitespace
    - Indents shall be 4 spaces, no tabs.
        - [set this as your setting on vscode](https://stackoverflow.com/a/38556923)

- Comments
    - Comments NEVER go on a line that already has code in it
    - Make comments succinct and ONLY about important code functionality; ex. `// connects to database` is
      OK, `// prints to console` is not
    - If you don’t need the code, delete it, don't comment it out.

### Naming

- Package names
    - Package names use only lowercase letters and digits (no underscores). Consecutive words are simply concatenated
      together. For example, com.example.deepspace, not com.example.deepSpace or com.example.deep_space.

- Class names
    - Class names are written in UpperCamelCase.
    - Class names are typically nouns or noun phrases. For example, Character or ImmutableList. Interface names may also
      be nouns or noun phrases (for example, List), but may sometimes be adjectives or adjective phrases instead (for
      example, Readable).

- Method names
    - Method names are written in lowerCamelCase.
    - Method names are typically verbs or verb phrases. For example, sendMessage or stop.

- Constant names
    - Constant names use UPPER_SNAKE_CASE: all uppercase letters, with each word separated from the next by a single
      underscore

- Non-constant field names
    - Non-constant field names (static or otherwise) are written in lowerCamelCase.- These names are typically nouns or
      noun phrases. For example, computedValues or index.

- Local variable names
    - Local variable names are written in lowerCamelCase.
    - Even when final and immutable, local variables are not considered to be constants, and should not be styled as
      constants.

- Make names representative, no shorthands unless it’s obvious; i.e. "authentication"="auth" is ok, but "question"="
  antsy" is not; gray areas such as "Question"="Ques" should be renamed (i.e. use "Question", not "Ques")

### Best Practices

- @Override is always used
    - A method is marked with the @Override annotation whenever it is legal. This includes a class method overriding a
      superclass method, a class method implementing an interface method, and an interface method re-specifying a
      superinterface method.
- Caught exceptions are not ignored
    - it is very rarely correct to do nothing in response to a caught exception. (Typical responses are to log it, or if
      it is considered "impossible", rethrow it as an AssertionError.)
- Reuse code when possible (i.e. if a thing is done in multiple places, see if a function is possible)
- Make algorithms elegant if you see a better way to do the same task
- Split functions that are big; each function should only do 1 task

One last thing: if you’re refactoring a lot of code, remember to let the rest of the team know so that we can
accommodate and avoid conflicts!
