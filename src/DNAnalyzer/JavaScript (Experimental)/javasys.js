var Error_c = sc_newClass("java.lang.Error", Error, null, null);

function jv_Object() {
}

jv_Object_c = sc_newClass("java.lang.Object", jv_Object, null, null);

jv_Object_c.equals = function(other) {
   return this == other;
}

jv_Object_c.getClass = function() {
   return this.constructor.prototype;
}

jv_Object_c.hashCode = function() {
   return sc_id(this);
}

Error_c.equals = jv_Object_c.equals;
Error_c.hashCode = jv_Object_c.hashCode;

// All class objects have a getName method but our only way to add methods to java.lang.Class is via jv_Object here.
jv_Object_c.getName = function() {
   if (this.hasOwnProperty("$protoName"))
      return this.$protoName;
   // else - return undefined in case there's a field 'name' and we are calling DynUtil.getPropertyValue which tries the getX method first
}

// Use with replaceWith when a Java interface should just be eliminated in the JS. We used to use jv_Object but
// then started inheriting methods from that interface so this won't have that problem
function jv_EmptyInterface() {}
var jv_EmptyInterface_c = sc_newClass("sc.js.EmptyInterface", jv_EmptyInterface, null, null);

function jv_Comparable() {}
var jv_Comparable_c = sc_newClass("java.lang.Comparable", jv_Comparable, null, null);

var Number_c = sc_newClass("java.lang.Number", Number, null, [jv_Comparable]);
//sc_addTypeAlias("java.lang.Number", "java.lang.Byte");
sc_addTypeAlias("java.lang.Number", "java.lang.Short");
sc_addTypeAlias("java.lang.Number", "java.lang.Integer");
sc_addTypeAlias("java.lang.Number", "java.lang.Long");
sc_addTypeAlias("java.lang.Number", "java.lang.Float");
sc_addTypeAlias("java.lang.Number", "java.lang.Double");

Number_c.TYPE = Number_c;

Number.prototype.hashCode = function() {
   return Math.floor(this) * 17;
}

Number.prototype.equals = jv_Object_c.equals;

Number.prototype.getClass = jv_Object_c.getClass;

Number.prototype.intValue = function() {
   return this < 0 ? Math.ceil(this) : Math.floor(this);
}

Number.prototype.compareTo = function(o) {
   return o == this ? 0 : (o < this ? -1 : 1);
}

function sc_parseInt(s) {
   var res = parseInt(s);
   if (isNaN(res))
      throw new jv_NumberFormatException("For input string: " + s);
   return res;
}

function sc_parseFloat(s) {
   var res = parseFloat(s);
   if (isNaN(res))
      throw new jv_NumberFormatException("For input string: " + s);
   return res;
}

Number_c.parseInt = sc_parseInt;
Number_c.parseLong = sc_parseInt;
Number_c.parseDouble = sc_parseFloat;
Number_c.parseFloat = sc_parseFloat;

Number_c.valueOf = function(v) {
   // build in js method for comparison against a boolean or something
   if (arguments.length == 0)
      return this;

   if (sc_instanceOf(v, Number))
      return v;
   var str = v.toString();
   var res = parseFloat(str); 
   if (isNaN(res))
      throw new jv_NumberFormatException(str + " is not a number");
   return res;
}

Number_c.compare = function(a,b) {
   if (a == b)
      return 0;
   else if (a > b) 
      return 1;
   else
      return -1;
}

Number_c.toHexString = function(v) {
   return v.toString(16);
}


// Need some way to get to the original Object's toString method so we have a reasonable default
//Object.prototype.toString = function() {
//   return sc_DynUtil_c.getInstanceName(this);
//}


jv_Object_c.clone = function() {
   // TODO: will this get called for Node's the DOM?  If so should we call cloneNode?

   // Technically should throw here if this is not an instanceof Cloneable but that behavior is annoying anyway.
   var CloneInst = function(){}; // temporary constructor
   var clone;
   CloneInst.prototype = this.constructor.prototype;

   // Create a new instance using the classes prototype
   clone = new CloneInst;

   // Just copy over the properties - similar to how Java works.  It does not call the constructor
   for (var prop in this) {
      if (this.hasOwnProperty(prop)) 
         clone[prop] = this[prop];
   }
/*
   var paramValues;
   if (this.outer !== undefined)
      paramValues = [outer];
   else
      paramValues = [];
*/

   // Call the constructor
   //ret = this.constructor.apply(clone, paramValues);
   // If the constructor returned an instance use that, otherwise use the orig
   //clone = Object(ret) === ret ? ret : clone;

   return clone;
}

// TODO: shouldn't the type name be java.lang.String here?
var String_c = sc_newClass("String", String, null, [jv_Comparable]);

String_c._valueOf = function(o) {
   return o === null || o === undefined ? "null" : o.toString();
}

String_c.getName = function() { return "java.lang.String"; }

String.prototype._length = function() {
   return this.length;
}

String.prototype.contains = function(arg) {
   return this.indexOf(arg) != -1;
}

String.prototype.hashCode = function() {
   var len = this.length;
   return len == 0 ? 0 : len == 1 ? this.length * this.charCodeAt(0) * 53 : this.length * this.charCodeAt(0) * this.charCodeAt(len-1) * 7;
}

String.prototype.getClass = jv_Object_c.getClass;

String.prototype.toString = function() {
   return this;
}

String.prototype.startsWith = function(str) {
   return this.indexOf(str) == 0;
}

String.prototype.endsWith = function(str) {
   var idx = this.lastIndexOf(str);
   return idx != -1 && this.length - str.length == idx;
}

String.prototype.equals = function(other) {
   if (other === null)
      return false;
   return this.length == other.length && this.compareTo(other) == 0;
}

String.prototype.compareTo = function(other) {
   var len1 = this.length;
   var len2 = other.length;
   var num = Math.min(len1, len2);
   for (var i = 0; i < num; i++) {
      var c1 = this.charCodeAt(i);
      var c2 = other.charCodeAt(i);
      if (c1 !== c2)
         return c1 - c2;
   }
   return len1 - len2;
}

String.prototype.toCharArray = function() {
   return this.split('');
}

String.prototype.equalsIgnoreCase = function(o) {
   return this.toUpperCase() === o.toUpperCase();
}

// TODO: this assumes the regular expression works the same in Java. In JS, match returns the list of matches
// but in Java it's an all-or-nothing deal. Maybe a better solution is to emulate the JS patterns in Java and
// then the same library just use the native JS regexp when converted.
String.prototype.matches = function(p) {
   var res = this.match(new RegExp(p));
   if (res == null || res.length != 1)
      return false;
   return res[0].length == length;
}

var Boolean_c = sc_newClass("java.lang.Boolean", Boolean, null, null);
sc_addTypeAlias("java.lang.Boolean", "boolean");

Boolean.prototype.getClass = jv_Object_c.getClass;

Boolean_c.FALSE = false;
Boolean_c.TRUE = true;

Boolean_c.hashCode = jv_Object_c.hashCode;
Boolean_c.equals = jv_Object_c.equals;

function jv_Void() {}
var jv_Void_c = sc_newClass("java.lang.Void", jv_Void, null, null);

jv_Void_c.hashCode = jv_Object_c.hashCode;
jv_Void_c.equals = jv_Object_c.equals;

function jv_Byte() {}
var jv_Byte_c = sc_newClass("java.lang.Byte", jv_Byte, null, null);
jv_Byte_c.hashCode = jv_Object_c.hashCode;
jv_Byte_c.equals = jv_Object_c.equals;

Error.prototype.printStackTrace = function() {
  if (this.stack)
     sc_log(this.stack);
}

function jv_System() {
}

var jv_System_c = sc_newClass("java.lang.System", jv_System, null, null);

jv_System_c.out = new jv_PrintStream();
jv_System_c.err = new jv_PrintStream(true);

jv_System_c.arraycopy = function(src, srcPos, dst, dstPos, length) {
   if (srcPos < dstPos) {
      for (var i = length - 1; i >= 0; i--) {
         dst[dstPos + i] = src[srcPos + i];
      }
   }
   else {
      for (var i = 0; i < length; i++) {
         dst[dstPos + i] = src[srcPos + i];
      }
   }
}

jv_System_c.currentTimeMillis = function() {
   if (Date.now) 
     return Date.now();
   return new Date().getTime();
}

jv_System_c.identityHashCode = function(obj) {
   if (obj == null)
      return 0;
   return sc_id(obj);
}

function jv_PrintStream() {
   this.buf = null;
   this.err = arguments.length == 1 && arguments[0];
}

var jv_PrintStream_c = sc_newClass("java.io.PrintStream", jv_PrintStream, null, null);

jv_PrintStream_c.println = function() {
   var res = "";
   for (var i = 0; i < arguments.length; i++) {
      res = res + arguments[i];
   }
   var buf = this.buf;
   var str = ((buf == null ? "" : buf) + res);
   if (this.err && console.error) {
      sc_logError(str);
   }
   else if (console.log) {
      sc_log(str);
   }
   this.buf = null;
}

jv_PrintStream_c.print = function() {
   var res = "";
   for (var i = 0; i < arguments.length; i++) {
      res = res + arguments[i];
   }
   // No way to print without a newline so buffer this stuff up.
   if (this.buf == null)
      this.buf = res;
   else
      this.buf = this.buf + res;
}

function jv_Enum(name, ord) {
   this._name = name;
   this._ordinal = ord;
}

jv_Enum_c = sc_newClass("java.lang.Enum", jv_Enum, jv_Object, null);

jv_Enum_c.toString = jv_Enum_c.name = function() {
   return this._name;
}

jv_Enum_c.values = jv_Enum_c.getEnumConstants = function() {
   sc_clInit(this);
   if (this._values === undefined)
      console.log("*** enum not initialized");
   return this._values;
}

jv_Enum_c._valueOf = function(name) {
   sc_clInit(this);
   for (var i = 0; i < this._values.length; i++) 
      if (this._values[i]._name == name)
        return this._values[i];
   return null;
}

function jv_StringBuilder() {
  this.value = new Array();
  if (arguments.length == 1) {
     var arg = arguments[0];
     if (typeof arg != "number")
        this.value.push(arg);
     // else - capacity
  }
}


jv_StringBuilder_c = sc_newClass("java.lang.StringBuilder", jv_StringBuilder, jv_Object, null);

jv_StringBuilder_c.append = function(v) {
   if (v != null)
      this.value.push(v.toString());
}

jv_StringBuilder_c._length = function() {
   var len = 0;
   for (var i = 0; i < this.value.length; i++) 
      len += this.value[i].length;
   return len;
}

jv_StringBuilder_c.toString = function() {
   return this.value.join("");
}

jv_StringBuilder_c.substring = jv_StringBuilder_c.subSequence = function(start, end) {
   return this.toString().substring(start, end); // TODO: this could be more efficient
}


function jv_Array() {
}

Array_c = sc_newClass("Array", Array);

Array_c.hashCode = jv_Object_c.hashCode;
Array_c.equals = jv_Object_c.equals;
Array_c.getClass = jv_Object_c.getClass;

Array_c.clone = function() {
   var sz = this.length;
   var newArray = new Array(sz);
   var len = newArray.length;
   for (var i = 0; i < sz; i++) {
      newArray[i] = this[i];
   }
   return newArray;
}


jv_Array_c = sc_newClass("jv_Array", jv_Array, Array, null);

jv_Array_c.newInstance = function() {
   var res = null;
   // Ignoring arguments[0] - the type
   for (var i = 1; i < arguments.length; i++) {
      var nextDim = new Array(arguments[i]); 
      if (res == null)
         res = nextDim;
      else
         res = res[nextDim];
   }
   return res;
}

jv_Array_c.hashCode = jv_Object_c.hashCode;
jv_Array_c.equals = jv_Object_c.equals;

function jv_Exception() {
   // TODO: simulate this on IE using callee and arguments perhaps?
   this.stack = new Error().stack;
   this.message = arguments.length === 1 ? arguments[0] : null;
}

jv_Exception_c = sc_newClass("java.lang.Exception", jv_Exception, jv_Object, null);

jv_Exception_c.printStackTrace = function() {
   console.log(this.stack);
}

jv_Exception_c.toString = function() {
   if (this.message) {
      return this.message;
   }
   else
      return this.getClass().getName();
}

var jv_enableAsserts = true;

function jv_assert(expr) {
   if (!expr && jv_enableAsserts) {
      console.log("Assertion failed" + (arguments.length > 1 ? (": " + arguments[1]) : ""));
   }
}

function jv_Character() {
}

jv_Character_c = sc_newClass("java.lang.Character", jv_Character);

jv_Character_c.hashCode = jv_Object_c.hashCode;
jv_Character_c.equals = jv_Object_c.equals;

jv_Character_c.isLowerCase = function(c) {
   return /[a-z]/.test(c);
}

jv_Character_c.isUpperCase = function(c) {
   return /[A-Z]/.test(c);
}

jv_Character_c.toLowerCase = function(c) {
   return c.toLowerCase();
}

jv_Character_c.toUpperCase = function(c) {
   return c.toUpperCase();
}

jv_Character_c.isLetter = function(c) {
   var n = c.charCodeAt(0);
   return (n >= 65 && n < 91) || (n >= 97 && n < 123);
}

jv_Character_c.isDigit = function(c) {
   var n = c.charCodeAt(0);
   return n >= 48 && n <= 57;
}

jv_Character_c.isLetterOrDigit = function(c) {
   return jv_Character_c.isDigit(c) || jv_Character_c.isLetter(c);
}

jv_Character_c.isWhitespace = function(c) {
   return ' \n\t\r\f\v'.indexOf(c) != -1; 
}

// TODO: these should handle unicode characters
jv_Character_c.isJavaIdentifierStart = function(c) {
   return (c >= 'A' && c <= 'z') || c == '_';
}

jv_Character_c.isJavaIdentifierPart = function(c) {
   return (c >= 'A' && c <= 'z') || (c >= '0' && c <= '9') || c == '_';
}

function jv_Math() {
}

jv_Math_c = sc_newClass("java.lang.Math", jv_Math);

jv_Math_c.max = function(arg1,arg2) {
   return Math.max(arg1, arg2);
}

jv_Math_c.min = function(arg1,arg2) {
   return Math.min(arg1, arg2);
}

jv_Math_c.abs = function(arg) {
   return Math.abs(arg);
}

jv_Math_c.floor = function(arg) {
   return Math.floor(arg);
}

jv_Math_c.round = function(arg) {
   return Math.round(arg);
}

// These are methods we use to implement the java.lang.Class methods - equals, hashCode, getName, etc.  
// Because JS has a single name space - shared by both types and instances - the generated code will redirect
// to these methods when 'this = <the class>'.
jv_Class_c = {};

jv_Class_c.equals = jv_Object_c.equals;
jv_Class_c.hashCode = jv_Object_c.hashCode;
Number_c.getName = jv_Class_c.getName = function() {
   return this.$protoName;
}

jv_Class_c.toString = function() {
   return this.$protoName;
}

jv_Collections_c = {};

jv_Collections_c.sort = function(list) {
   var arr = list.toArray();
   if (arguments.length == 1)
      arr.sort(function(a,b) { return a.compareTo(b); } );
   else {
      var comparator = arguments[1];
      arr.sort(function(a, b) {
         return comparator.compare(a, b);
      });
   }
   var sz = arr.length;
   for (var i = 0; i < sz; i++) {
      list.set(i, arr[i]);
   }
}

jv_Collections_c.emptyList = function() {
   return new jv_ArrayList();
}

jv_Collections_c.singletonList = function(arg) {
   var res = new jv_ArrayList();
   res.add(arg);
   return res;
}

jv_Date = Date;
jv_Date_c = sc_newClass("java.util.Date", Date, jv_Object, null);

Date.prototype.hashCode = jv_Object_c.hashCode;
Date.prototype.equals = jv_Object_c.equals;
Date.prototype.getClass = jv_Object_c.getClass;
