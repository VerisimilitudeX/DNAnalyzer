
// Generated JS from Java: java.lang.Runnable -----
function jv_Runnable() {
}

var jv_Runnable_c = sc_newClass("java.lang.Runnable", jv_Runnable, null, null);



// Generated JS from Java: java.lang.Iterable -----
function jv_Iterable() {
}

var jv_Iterable_c = sc_newClass("java.lang.Iterable", jv_Iterable, null, null);



// Generated JS from Java: java.util.Iterator -----
function jv_Iterator() {
}

var jv_Iterator_c = sc_newClass("java.util.Iterator", jv_Iterator, null, null);



// Generated JS from Java: java.util.Collection -----
function jv_Collection() {
}

var jv_Collection_c = sc_newClass("java.util.Collection", jv_Collection, null, [jv_Iterable]);



// Generated JS from Java: java.util.AbstractCollection -----
function jv_AbstractCollection() {

   jv_Object.call(this);
}

var jv_AbstractCollection_c = sc_newClass("java.util.AbstractCollection", jv_AbstractCollection, jv_Object, [jv_Collection]);

jv_AbstractCollection_c.toString = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.toString.apply(this, arguments);
   }
   if (this.isEmpty()) {
      return "[]";
   }
   var buffer = new jv_StringBuilder(this.size() * 16);
   buffer.append('[');
   var it = this.iterator();
   while (it.hasNext()) {
      var next = it.next();
      if (next !== this) {
         buffer.append(next);
      }
      else {
         buffer.append("(this Collection)");
      }
      if (it.hasNext()) {
         buffer.append(", ");
      }
   }
   buffer.append(']');
   return buffer.toString();
};
jv_AbstractCollection_c.add = function (object)  {
   throw new jv_UnsupportedOperationException();
};
jv_AbstractCollection_c.addAll = function (collection)  {
   var result = false;
   var it = collection.iterator();
   while (it.hasNext()) {
      if (this.add(it.next())) {
         result = true;
      }
   }
   return result;
};
jv_AbstractCollection_c.clear = function ()  {
   var it = this.iterator();
   while (it.hasNext()) {
      it.next();
      it.remove();
   }
};
jv_AbstractCollection_c.contains = function (object)  {
   var it = this.iterator();
   if (object !== null) {
      while (it.hasNext()) {
         if (object.equals(it.next())) {
            return true;
         }
      }
   }
   else {
      while (it.hasNext()) {
         if (it.next() === null) {
            return true;
         }
      }
   }
   return false;
};
jv_AbstractCollection_c.containsAll = function (collection)  {
   var it = collection.iterator();
   while (it.hasNext()) {
      if (!this.contains(it.next())) {
         return false;
      }
   }
   return true;
};
jv_AbstractCollection_c.isEmpty = function ()  {
   return this.size() === 0;
};
jv_AbstractCollection_c.remove = function (object)  {
   var it = this.iterator();
   if (object !== null) {
      while (it.hasNext()) {
         if (object.equals(it.next())) {
            it.remove();
            return true;
         }
      }
   }
   else {
      while (it.hasNext()) {
         if (it.next() === null) {
            it.remove();
            return true;
         }
      }
   }
   return false;
};
jv_AbstractCollection_c.removeAll = function (collection)  {
   var result = false;
   var it = this.iterator();
   while (it.hasNext()) {
      if (collection.contains(it.next())) {
         it.remove();
         result = true;
      }
   }
   return result;
};
jv_AbstractCollection_c.retainAll = function (collection)  {
   var result = false;
   var it = this.iterator();
   while (it.hasNext()) {
      if (!collection.contains(it.next())) {
         it.remove();
         result = true;
      }
   }
   return result;
};
jv_AbstractCollection_c.toArray = function () /* overloaded */ {
   if (arguments.length == 0) {
      var size = this.size(), index = 0;
      var it = this.iterator();
      var array = sc_newArray(jv_Object_c, size);
      while (index < size) {
         array[index++] = it.next();
      }
      return array;
   }
   else if (arguments.length == 1) {
      var contents = arguments[0];
      var size = this.size(), index = 0;
      if (size > contents.length) {
         var ct = contents.getClass().getComponentType();
         contents = (jv_Array_c.newInstance(ct, size));
      }
      for (var _i = this.iterator(); _i.hasNext();) {
         var entry = _i.next();
         contents[index++] = (entry);
      }
      if (index < contents.length) {
         contents[index] = null;
      }
      return contents;
   }
   else sc_noMeth("toArray");
};


// Generated JS from Java: java.lang.RuntimeException -----
function jv_RuntimeException() {

   jv_RuntimeException_c._clInit();

   if (arguments.length == 0) {
      jv_Exception.call(this);
   }
   else if (arguments.length == 1) {
      if (sc_paramType(arguments[0], String)) { 
         var detailMessage = arguments[0];
         jv_Exception.call(this, detailMessage);
}else if (sc_paramType(arguments[0], Error)) { 
         var throwable = arguments[0];
         jv_Exception.call(this, throwable);
}   }
   else if (arguments.length == 2) {
      var detailMessage = arguments[0];
      var throwable = arguments[1];
      jv_Exception.call(this, detailMessage, throwable);
   }}

var jv_RuntimeException_c = sc_newClass("java.lang.RuntimeException", jv_RuntimeException, jv_Exception, null);


jv_RuntimeException_c._clInit = function() {
   if (jv_RuntimeException_c.hasOwnProperty("_clInited")) return;
   jv_RuntimeException_c._clInited = true;
   
      jv_RuntimeException_c.serialVersionUID = -7034897190745766939;
      ;
};


// Generated JS from Java: java.lang.UnsupportedOperationException -----
function jv_UnsupportedOperationException() {

   jv_UnsupportedOperationException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      if (sc_paramType(arguments[0], String)) { 
         var detailMessage = arguments[0];
         jv_RuntimeException.call(this, detailMessage);
}else if (sc_paramType(arguments[0], Error)) { 
         var cause = arguments[0];
         jv_RuntimeException.call(this, (cause === null ? null : cause.toString()), cause);
}   }
   else if (arguments.length == 2) {
      var message = arguments[0];
      var cause = arguments[1];
      jv_RuntimeException.call(this, message, cause);
   }}

var jv_UnsupportedOperationException_c = sc_newClass("java.lang.UnsupportedOperationException", jv_UnsupportedOperationException, jv_RuntimeException, null);


jv_UnsupportedOperationException_c._clInit = function() {
   if (jv_UnsupportedOperationException_c.hasOwnProperty("_clInited")) return;
   jv_UnsupportedOperationException_c._clInited = true;
   
      jv_UnsupportedOperationException_c.serialVersionUID = -1242599979055084673;
      ;
};


// Generated JS from Java: java.util.List -----
function jv_List() {
}

var jv_List_c = sc_newClass("java.util.List", jv_List, null, [jv_Collection]);



// Generated JS from Java: java.util.ListIterator -----
function jv_ListIterator() {
}

var jv_ListIterator_c = sc_newClass("java.util.ListIterator", jv_ListIterator, null, [jv_Iterator]);



// Generated JS from Java: java.util.AbstractList -----
function jv_AbstractList() {
   this.modCount = 0;

   jv_AbstractCollection.call(this);
   this._jv_AbstractListInit();
}

var jv_AbstractList_c = sc_newClass("java.util.AbstractList", jv_AbstractList, jv_AbstractCollection, [jv_List]);

jv_AbstractList_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_List)) {
      var list = (object);
      if (list.size() !== this.size()) {
         return false;
      }
      var it1 = this.iterator(), it2 = list.iterator();
      while (it1.hasNext()) {
         var e1 = it1.next(), e2 = it2.next();
         if (!(e1 === null ? e2 === null : e1.equals(e2))) {
            return false;
         }
      }
      return true;
   }
   return false;
};
jv_AbstractList_c.hashCode = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.hashCode.apply(this, arguments);
   }
   var result = 1;
   var it = this.iterator();
   while (it.hasNext()) {
      var object = it.next();
      result = (31 * result) + (object === null ? 0 : object.hashCode());
   }
   return result;
};
jv_AbstractList_c.add = function () /* overloaded */ {
   if (arguments.length == 1) {
      var object = arguments[0];
      this.add(this.size(), object);
      return true;
   }
   else if (arguments.length == 2) {
      var location = arguments[0];
      var object = arguments[1];
      throw new jv_UnsupportedOperationException();
   }
   else sc_noMeth("add");
};
jv_AbstractList_c.clear = function ()  {
   this.removeRange(0, this.size());
};
jv_AbstractList_c.iterator = function ()  {
   return new jv_AbstractList_SimpleListIterator(this);
};
jv_AbstractList_c.addAll = function (location, collection)  {
   var it = collection.iterator();
   while (it.hasNext()) {
      this.add(location++, it.next());
   }
   return !collection.isEmpty();
};
jv_AbstractList_c.indexOf = function (object)  {
   var it = this.listIterator();
   if (object !== null) {
      while (it.hasNext()) {
         if (object.equals(it.next())) {
            return it.previousIndex();
         }
      }
   }
   else {
      while (it.hasNext()) {
         if (it.next() === null) {
            return it.previousIndex();
         }
      }
   }
   return -1;
};
jv_AbstractList_c.lastIndexOf = function (object)  {
   var it = this.listIterator(this.size());
   if (object !== null) {
      while (it.hasPrevious()) {
         if (object.equals(it.previous())) {
            return it.nextIndex();
         }
      }
   }
   else {
      while (it.hasPrevious()) {
         if (it.previous() === null) {
            return it.nextIndex();
         }
      }
   }
   return -1;
};
jv_AbstractList_c.listIterator = function () /* overloaded */ {
   if (arguments.length == 0) {
      return this.listIterator(0);
   }
   else if (arguments.length == 1) {
      var location = arguments[0];
      return new jv_AbstractList_FullListIterator(this, location);
   }
   else sc_noMeth("listIterator");
};
jv_AbstractList_c.remove = function (location)  {
   throw new jv_UnsupportedOperationException();
};
jv_AbstractList_c.removeRange = function (start, end)  {
   var it = this.listIterator(start);
   for (var i = start; i < end; i++) {
      it.next();
      it.remove();
   }
};
jv_AbstractList_c.set = function (location, object)  {
   throw new jv_UnsupportedOperationException();
};
jv_AbstractList_c.subList = function (start, end)  {
   if (0 <= start && end <= this.size()) {
      if (start <= end) {
         if (sc_instanceOf(this, jv_RandomAccess)) {
            return new jv_AbstractList_SubAbstractListRandomAccess(this, start, end);
         }
         return new jv_AbstractList_SubAbstractList(this, start, end);
      }
      throw new jv_IllegalArgumentException();
   }
   throw new jv_IndexOutOfBoundsException();
};

jv_AbstractList_c._jv_AbstractListInit = function() {
};

// Generated JS from Java: java.util.AbstractList.SimpleListIterator -----
function jv_AbstractList_SimpleListIterator(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   this.numLeft = 0;
   this.expectedModCount = 0;
   this.lastPosition = 0;
   jv_Object.call(this);
   this._jv_AbstractList_SimpleListIteratorInit();
}

var jv_AbstractList_SimpleListIterator_c = sc_newInnerClass("java.util.AbstractList.SimpleListIterator", jv_AbstractList_SimpleListIterator, jv_AbstractList, jv_Object, [jv_Iterator]);

jv_AbstractList_SimpleListIterator_c.hasNext = function ()  {
   return this.numLeft > 0;
};
jv_AbstractList_SimpleListIterator_c.next = function ()  {
   if (this.expectedModCount !== this._outer1.modCount) {
      throw new jv_ConcurrentModificationException();
   }
   try {
      var index = this._outer1.size() - this.numLeft;
      var result = this._outer1.get(index);
      this.lastPosition = index;
      this.numLeft--;
      return result;
   }
   catch(e) {
      if ((e instanceof jv_IndexOutOfBoundsException)) {
      throw new jv_NoSuchElementException();
      }
      else
         throw e;
   }
};
jv_AbstractList_SimpleListIterator_c.remove = function ()  {
   if (this.lastPosition === -1) {
      throw new jv_IllegalStateException();
   }
   if (this.expectedModCount !== this._outer1.modCount) {
      throw new jv_ConcurrentModificationException();
   }
   try {
      if (this.lastPosition === this._outer1.size() - this.numLeft) {
         this.numLeft--;
      }
      this._outer1.remove(this.lastPosition);
   }
   catch(e) {
      if ((e instanceof jv_IndexOutOfBoundsException)) {
      throw new jv_ConcurrentModificationException();
      }
      else
         throw e;
   }
   this.expectedModCount = this._outer1.modCount;
   this.lastPosition = -1;
};

jv_AbstractList_SimpleListIterator_c._jv_AbstractList_SimpleListIteratorInit = function() {
   this.numLeft = this._outer1.size();
         ;
   this.expectedModCount = this._outer1.modCount;
         ;
   this.lastPosition = -1;
         ;
};

// Generated JS from Java: java.util.AbstractList.FullListIterator -----
function jv_AbstractList_FullListIterator(_outer, start) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;

   jv_AbstractList_SimpleListIterator.call(this, this._outer1);
   if (start < 0 || start > this.numLeft) {
      throw new jv_IndexOutOfBoundsException();
   }
   this.numLeft -= start;
}

var jv_AbstractList_FullListIterator_c = sc_newInnerClass("java.util.AbstractList.FullListIterator", jv_AbstractList_FullListIterator, jv_AbstractList, jv_AbstractList_SimpleListIterator, [jv_ListIterator]);

jv_AbstractList_FullListIterator_c.add = function (object)  {
   if (this.expectedModCount !== this._outer1.modCount) {
      throw new jv_ConcurrentModificationException();
   }
   try {
      this._outer1.add(this._outer1.size() - this.numLeft, object);
      this.expectedModCount = this._outer1.modCount;
      this.lastPosition = -1;
   }
   catch(e) {
      if ((e instanceof jv_IndexOutOfBoundsException)) {
      throw new jv_NoSuchElementException();
      }
      else
         throw e;
   }
};
jv_AbstractList_FullListIterator_c.hasPrevious = function ()  {
   return this.numLeft < this._outer1.size();
};
jv_AbstractList_FullListIterator_c.nextIndex = function ()  {
   return this._outer1.size() - this.numLeft;
};
jv_AbstractList_FullListIterator_c.previous = function ()  {
   if (this.expectedModCount !== this._outer1.modCount) {
      throw new jv_ConcurrentModificationException();
   }
   try {
      var index = this._outer1.size() - this.numLeft - 1;
      var result = this._outer1.get(index);
      this.numLeft++;
      this.lastPosition = index;
      return result;
   }
   catch(e) {
      if ((e instanceof jv_IndexOutOfBoundsException)) {
      throw new jv_NoSuchElementException();
      }
      else
         throw e;
   }
};
jv_AbstractList_FullListIterator_c.previousIndex = function ()  {
   return this._outer1.size() - this.numLeft - 1;
};
jv_AbstractList_FullListIterator_c.set = function (object)  {
   if (this.expectedModCount !== this._outer1.modCount) {
      throw new jv_ConcurrentModificationException();
   }
   try {
      this._outer1.set(this.lastPosition, object);
   }
   catch(e) {
      if ((e instanceof jv_IndexOutOfBoundsException)) {
      throw new jv_IllegalStateException();
      }
      else
         throw e;
   }
};


// Generated JS from Java: java.util.AbstractList.SubAbstractList -----
function jv_AbstractList_SubAbstractList(list, start, end) {
   this.fullList = null;
   this.offset = 0;
   this._size = 0;

   jv_AbstractList.call(this);
   this._jv_AbstractList_SubAbstractListInit();
   this.fullList = list;
   this.modCount = this.fullList.modCount;
   this.offset = start;
   this._size = end - start;
}

var jv_AbstractList_SubAbstractList_c = sc_newInnerClass("java.util.AbstractList.SubAbstractList", jv_AbstractList_SubAbstractList, jv_AbstractList, jv_AbstractList, null);

jv_AbstractList_SubAbstractList_c.addAll = function () /* overloaded */ {
   if (arguments.length == 1) {
      var collection = arguments[0];
      if (this.modCount === this.fullList.modCount) {
         var result = this.fullList.addAll(this.offset + this._size, collection);
         if (result) {
            this._size += collection.size();
            this.modCount = this.fullList.modCount;
         }
         return result;
      }
      throw new jv_ConcurrentModificationException();
   }
   else if (arguments.length == 2) {
      var location = arguments[0];
      var collection = arguments[1];
      if (this.modCount === this.fullList.modCount) {
         if (0 <= location && location <= this._size) {
            var result = this.fullList.addAll(location + this.offset, collection);
            if (result) {
               this._size += collection.size();
               this.modCount = this.fullList.modCount;
            }
            return result;
         }
         throw new jv_IndexOutOfBoundsException();
      }
      throw new jv_ConcurrentModificationException();
   }
   else sc_noMeth("addAll");
};
jv_AbstractList_SubAbstractList_c.iterator = function ()  {
   return this.listIterator(0);
};
jv_AbstractList_SubAbstractList_c.size = function ()  {
   if (this.modCount === this.fullList.modCount) {
      return this._size;
   }
   throw new jv_ConcurrentModificationException();
};
jv_AbstractList_SubAbstractList_c.add = function (location, object)  {
   if (this.modCount === this.fullList.modCount) {
      if (0 <= location && location <= this._size) {
         this.fullList.add(location + this.offset, object);
         this._size++;
         this.modCount = this.fullList.modCount;
      }
      else {
         throw new jv_IndexOutOfBoundsException();
      }
   }
   else {
      throw new jv_ConcurrentModificationException();
   }
};
jv_AbstractList_SubAbstractList_c.get = function (location)  {
   if (this.modCount === this.fullList.modCount) {
      if (0 <= location && location < this._size) {
         return this.fullList.get(location + this.offset);
      }
      throw new jv_IndexOutOfBoundsException();
   }
   throw new jv_ConcurrentModificationException();
};
jv_AbstractList_SubAbstractList_c.listIterator = function (location)  {
   if (this.modCount === this.fullList.modCount) {
      if (0 <= location && location <= this._size) {
         return new jv_AbstractList_SubAbstractList_SubAbstractListIterator(this.fullList.listIterator(location + this.offset), this, this.offset,
                    this._size);
      }
      throw new jv_IndexOutOfBoundsException();
   }
   throw new jv_ConcurrentModificationException();
};
jv_AbstractList_SubAbstractList_c.remove = function (location)  {
   if (this.modCount === this.fullList.modCount) {
      if (0 <= location && location < this._size) {
         var result = this.fullList.remove(location + this.offset);
         this._size--;
         this.modCount = this.fullList.modCount;
         return result;
      }
      throw new jv_IndexOutOfBoundsException();
   }
   throw new jv_ConcurrentModificationException();
};
jv_AbstractList_SubAbstractList_c.removeRange = function (start, end)  {
   if (start !== end) {
      if (this.modCount === this.fullList.modCount) {
         this.fullList.removeRange(start + this.offset, end + this.offset);
         this._size -= end - start;
         this.modCount = this.fullList.modCount;
      }
      else {
         throw new jv_ConcurrentModificationException();
      }
   }
};
jv_AbstractList_SubAbstractList_c.set = function (location, object)  {
   if (this.modCount === this.fullList.modCount) {
      if (0 <= location && location < this._size) {
         return this.fullList.set(location + this.offset, object);
      }
      throw new jv_IndexOutOfBoundsException();
   }
   throw new jv_ConcurrentModificationException();
};
jv_AbstractList_SubAbstractList_c.sizeChanged = function (increment)  {
   if (increment) {
      this._size++;
   }
   else {
      this._size--;
   }
   this.modCount = this.fullList.modCount;
};

jv_AbstractList_SubAbstractList_c._jv_AbstractList_SubAbstractListInit = function() {
};

// Generated JS from Java: java.util.AbstractList.SubAbstractList.SubAbstractListIterator -----
function jv_AbstractList_SubAbstractList_SubAbstractListIterator(it, list, offset, length) {
   this.subList = null;
   this.iterator = null;
   this.start = 0;
   this.end = 0;

   jv_Object.call(this);
   this._jv_AbstractList_SubAbstractList_SubAbstractListIteratorInit();
   this.iterator = it;
   this.subList = list;
   this.start = offset;
   this.end = this.start + length;
}

var jv_AbstractList_SubAbstractList_SubAbstractListIterator_c = sc_newInnerClass("java.util.AbstractList.SubAbstractList.SubAbstractListIterator", jv_AbstractList_SubAbstractList_SubAbstractListIterator, jv_AbstractList_SubAbstractList, jv_Object, [jv_ListIterator]);

jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.add = function (object)  {
   this.iterator.add(object);
   this.subList.sizeChanged(true);
   this.end++;
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.hasNext = function ()  {
   return this.iterator.nextIndex() < this.end;
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.hasPrevious = function ()  {
   return this.iterator.previousIndex() >= this.start;
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.next = function ()  {
   if (this.iterator.nextIndex() < this.end) {
      return this.iterator.next();
   }
   throw new jv_NoSuchElementException();
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.nextIndex = function ()  {
   return this.iterator.nextIndex() - this.start;
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.previous = function ()  {
   if (this.iterator.previousIndex() >= this.start) {
      return this.iterator.previous();
   }
   throw new jv_NoSuchElementException();
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.previousIndex = function ()  {
   var previous = this.iterator.previousIndex();
   if (previous >= this.start) {
      return previous - this.start;
   }
   return -1;
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.remove = function ()  {
   this.iterator.remove();
   this.subList.sizeChanged(false);
   this.end--;
};
jv_AbstractList_SubAbstractList_SubAbstractListIterator_c.set = function (object)  {
   this.iterator.set(object);
};

jv_AbstractList_SubAbstractList_SubAbstractListIterator_c._jv_AbstractList_SubAbstractList_SubAbstractListIteratorInit = function() {
};

// Generated JS from Java: java.util.RandomAccess -----
function jv_RandomAccess() {
}

var jv_RandomAccess_c = sc_newClass("java.util.RandomAccess", jv_RandomAccess, null, null);



// Generated JS from Java: java.util.AbstractList.SubAbstractListRandomAccess -----
function jv_AbstractList_SubAbstractListRandomAccess(list, start, end) {

   jv_AbstractList_SubAbstractList.call(this, list, start, end);
}

var jv_AbstractList_SubAbstractListRandomAccess_c = sc_newInnerClass("java.util.AbstractList.SubAbstractListRandomAccess", jv_AbstractList_SubAbstractListRandomAccess, jv_AbstractList, jv_AbstractList_SubAbstractList, [jv_RandomAccess]);



// Generated JS from Java: java.util.ConcurrentModificationException -----
function jv_ConcurrentModificationException() {

   jv_ConcurrentModificationException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }}

var jv_ConcurrentModificationException_c = sc_newClass("java.util.ConcurrentModificationException", jv_ConcurrentModificationException, jv_RuntimeException, null);


jv_ConcurrentModificationException_c._clInit = function() {
   if (jv_ConcurrentModificationException_c.hasOwnProperty("_clInited")) return;
   jv_ConcurrentModificationException_c._clInited = true;
   
      jv_ConcurrentModificationException_c.serialVersionUID = -3666751008965953603;
      ;
};


// Generated JS from Java: java.lang.IndexOutOfBoundsException -----
function jv_IndexOutOfBoundsException() {

   jv_IndexOutOfBoundsException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }}

var jv_IndexOutOfBoundsException_c = sc_newClass("java.lang.IndexOutOfBoundsException", jv_IndexOutOfBoundsException, jv_RuntimeException, null);


jv_IndexOutOfBoundsException_c._clInit = function() {
   if (jv_IndexOutOfBoundsException_c.hasOwnProperty("_clInited")) return;
   jv_IndexOutOfBoundsException_c._clInited = true;
   
      jv_IndexOutOfBoundsException_c.serialVersionUID = 234122996006267687;
      ;
};


// Generated JS from Java: java.util.NoSuchElementException -----
function jv_NoSuchElementException() {

   jv_NoSuchElementException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }}

var jv_NoSuchElementException_c = sc_newClass("java.util.NoSuchElementException", jv_NoSuchElementException, jv_RuntimeException, null);


jv_NoSuchElementException_c._clInit = function() {
   if (jv_NoSuchElementException_c.hasOwnProperty("_clInited")) return;
   jv_NoSuchElementException_c._clInited = true;
   
      jv_NoSuchElementException_c.serialVersionUID = 6769829250639411880;
      ;
};


// Generated JS from Java: java.lang.IllegalStateException -----
function jv_IllegalStateException() {

   jv_IllegalStateException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      if (sc_paramType(arguments[0], String)) { 
         var detailMessage = arguments[0];
         jv_RuntimeException.call(this, detailMessage);
}else if (sc_paramType(arguments[0], Error)) { 
         var cause = arguments[0];
         jv_RuntimeException.call(this, (cause === null ? null : cause.toString()), cause);
}   }
   else if (arguments.length == 2) {
      var message = arguments[0];
      var cause = arguments[1];
      jv_RuntimeException.call(this, message, cause);
   }}

var jv_IllegalStateException_c = sc_newClass("java.lang.IllegalStateException", jv_IllegalStateException, jv_RuntimeException, null);


jv_IllegalStateException_c._clInit = function() {
   if (jv_IllegalStateException_c.hasOwnProperty("_clInited")) return;
   jv_IllegalStateException_c._clInited = true;
   
      jv_IllegalStateException_c.serialVersionUID = -1848914673093119416;
      ;
};


// Generated JS from Java: java.lang.Cloneable -----
function jv_Cloneable() {
}

var jv_Cloneable_c = sc_newClass("java.lang.Cloneable", jv_Cloneable, null, null);



// Generated JS from Java: java.util.ArrayList -----
function jv_ArrayList() {
   this.firstIndex = 0;
   this._size = 0;
   this.array = null;

   if (arguments.length == 0) {
      jv_ArrayList.call(this, 10);
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var capacity = arguments[0];
         jv_AbstractList.call(this);
   this._jv_ArrayListInit();
         if (capacity < 0) {
            throw new jv_IllegalArgumentException();
         }
         this.firstIndex = this._size = 0;
         this.array = this.newElementArray(capacity);
}else if (sc_paramType(arguments[0], jv_Collection)) { 
         var collection = arguments[0];
         jv_AbstractList.call(this);
   this._jv_ArrayListInit();
         this.firstIndex = 0;
         var objects = collection.toArray();
         this._size = objects.length;
         this.array = this.newElementArray(this._size + (this._size / 10));
         jv_System_c.arraycopy(objects, 0, this.array, 0, this._size);
         this.modCount = 1;
}   }}

var jv_ArrayList_c = sc_newClass("java.util.ArrayList", jv_ArrayList, jv_AbstractList, [jv_List,jv_Cloneable,jv_EmptyInterface,jv_RandomAccess]);

jv_ArrayList_c.clone = function ()  {
   try {
      var newList = (jv_Object_c.clone.call(this));
      newList.array = this.array.clone();
      return newList;
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_ArrayList_c.add = function () /* overloaded */ {
   if (arguments.length == 1) {
      var object = arguments[0];
      if (this.firstIndex + this._size === this.array.length) {
         this.growAtEnd(1);
      }
      this.array[this.firstIndex + this._size] = object;
      this._size++;
      this.modCount++;
      return true;
   }
   else if (arguments.length == 2) {
      var location = arguments[0];
      var object = arguments[1];
      if (location < 0 || location > this._size) {
         throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0A", Number_c.valueOf(location), Number_c.valueOf(this._size)));
      }
      if (location === 0) {
         if (this.firstIndex === 0) {
            this.growAtFront(1);
         }
         this.array[--this.firstIndex] = object;
      }
      else
      if (location === this._size) {
         if (this.firstIndex + this._size === this.array.length) {
            this.growAtEnd(1);
         }
         this.array[this.firstIndex + this._size] = object;
      }
      else {
         if (this._size === this.array.length) {
            this.growForInsert(location, 1);
         }
         else
         if (this.firstIndex + this._size === this.array.length || (this.firstIndex > 0 && location < this._size / 2)) {
            jv_System_c.arraycopy(this.array, this.firstIndex, this.array, --this.firstIndex, location);
         }
         else {
            var index = location + this.firstIndex;
            jv_System_c.arraycopy(this.array, index, this.array, index + 1, this._size - location);
         }
         this.array[location + this.firstIndex] = object;
      }
      this._size++;
      this.modCount++;
   }
   else sc_noMeth("add");
};
jv_ArrayList_c.addAll = function () /* overloaded */ {
   if (arguments.length == 1) {
      var collection = arguments[0];
      var dumpArray = collection.toArray();
      if (dumpArray.length === 0) {
         return false;
      }
      if (dumpArray.length > this.array.length - (this.firstIndex + this._size)) {
         this.growAtEnd(dumpArray.length);
      }
      jv_System_c.arraycopy(dumpArray, 0, this.array, this.firstIndex + this._size, dumpArray.length);
      this._size += dumpArray.length;
      this.modCount++;
      return true;
   }
   else if (arguments.length == 2) {
      var location = arguments[0];
      var collection = arguments[1];
      if (location < 0 || location > this._size) {
         throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0A", Number_c.valueOf(location), Number_c.valueOf(this._size)));
      }
      var dumparray = collection.toArray();
      var growSize = dumparray.length;
      if (growSize === 0) {
         return false;
      }
      if (location === 0) {
         this.growAtFront(growSize);
         this.firstIndex -= growSize;
      }
      else
      if (location === this._size) {
         if (this.firstIndex + this._size > this.array.length - growSize) {
            this.growAtEnd(growSize);
         }
      }
      else {
         if (this.array.length - this._size < growSize) {
            this.growForInsert(location, growSize);
         }
         else
         if (this.firstIndex + this._size > this.array.length - growSize || (this.firstIndex > 0 && location < this._size / 2)) {
            var newFirst = this.firstIndex - growSize;
            if (newFirst < 0) {
               var index = location + this.firstIndex;
               jv_System_c.arraycopy(this.array, index, this.array, index - newFirst, this._size - location);
               newFirst = 0;
            }
            jv_System_c.arraycopy(this.array, this.firstIndex, this.array, newFirst, location);
            this.firstIndex = newFirst;
         }
         else {
            var index = location + this.firstIndex;
            jv_System_c.arraycopy(this.array, index, this.array, index + growSize, this._size - location);
         }
      }
      jv_System_c.arraycopy(dumparray, 0, this.array, location + this.firstIndex, growSize);
      this._size += growSize;
      this.modCount++;
      return true;
   }
   else sc_noMeth("addAll");
};
jv_ArrayList_c.clear = function ()  {
   if (this._size !== 0) {
      jv_Arrays_c.fill(this.array, this.firstIndex, this.firstIndex + this._size, null);
      this.firstIndex = this._size = 0;
      this.modCount++;
   }
};
jv_ArrayList_c.contains = function (object)  {
   var lastIndex = this.firstIndex + this._size;
   if (object !== null) {
      for (var i = this.firstIndex; i < lastIndex; i++) {
         if (object.equals(this.array[i])) {
            return true;
         }
      }
   }
   else {
      for (var i = this.firstIndex; i < lastIndex; i++) {
         if (this.array[i] === null) {
            return true;
         }
      }
   }
   return false;
};
jv_ArrayList_c.isEmpty = function ()  {
   return this._size === 0;
};
jv_ArrayList_c.remove = function () /* overloaded */ {
      if (sc_instanceOf(arguments[0], Number)) { 
      var location = arguments[0];
      var result;
      if (location < 0 || location >= this._size) {
         throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0A", Number_c.valueOf(location), Number_c.valueOf(this._size)));
      }
      if (location === 0) {
         result = this.array[this.firstIndex];
         this.array[this.firstIndex++] = null;
      }
      else
      if (location === this._size - 1) {
         var lastIndex = this.firstIndex + this._size - 1;
         result = this.array[lastIndex];
         this.array[lastIndex] = null;
      }
      else {
         var elementIndex = this.firstIndex + location;
         result = this.array[elementIndex];
         if (location < this._size / 2) {
            jv_System_c.arraycopy(this.array, this.firstIndex, this.array, this.firstIndex + 1, location);
            this.array[this.firstIndex++] = null;
         }
         else {
            jv_System_c.arraycopy(this.array, elementIndex + 1, this.array, elementIndex,
                    this._size - location - 1);
            this.array[this.firstIndex + this._size - 1] = null;
         }
      }
      this._size--;
      if (this._size === 0) {
         this.firstIndex = 0;
      }
      this.modCount++;
      return result;
}
      else if (sc_paramType(arguments[0], jv_Object)) { 
      var object = arguments[0];
      var location = this.indexOf(object);
      if (location >= 0) {
         this.remove(location);
         return true;
      }
      return false;
}};
jv_ArrayList_c.size = function ()  {
   return this._size;
};
jv_ArrayList_c.toArray = function () /* overloaded */ {
   if (arguments.length == 0) {
      var result = sc_newArray(jv_Object_c, this._size);
      jv_System_c.arraycopy(this.array, this.firstIndex, result, 0, this._size);
      return result;
   }
   else if (arguments.length == 1) {
      var contents = arguments[0];
      if (this._size > contents.length) {
         var ct = contents.getClass().getComponentType();
         contents = (jv_Array_c.newInstance(ct, this._size));
      }
      jv_System_c.arraycopy(this.array, this.firstIndex, contents, 0, this._size);
      if (this._size < contents.length) {
         contents[this._size] = null;
      }
      return contents;
   }
   else sc_noMeth("toArray");
};
jv_ArrayList_c.get = function (location)  {
   if (location < 0 || location >= this._size) {
      throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0A", Number_c.valueOf(location), Number_c.valueOf(this._size)));
   }
   return this.array[this.firstIndex + location];
};
jv_ArrayList_c.indexOf = function (object)  {
   var lastIndex = this.firstIndex + this._size;
   if (object !== null) {
      for (var i = this.firstIndex; i < lastIndex; i++) {
         if (object.equals(this.array[i])) {
            return i - this.firstIndex;
         }
      }
   }
   else {
      for (var i = this.firstIndex; i < lastIndex; i++) {
         if (this.array[i] === null) {
            return i - this.firstIndex;
         }
      }
   }
   return -1;
};
jv_ArrayList_c.lastIndexOf = function (object)  {
   var lastIndex = this.firstIndex + this._size;
   if (object !== null) {
      for (var i = lastIndex - 1; i >= this.firstIndex; i--) {
         if (object.equals(this.array[i])) {
            return i - this.firstIndex;
         }
      }
   }
   else {
      for (var i = lastIndex - 1; i >= this.firstIndex; i--) {
         if (this.array[i] === null) {
            return i - this.firstIndex;
         }
      }
   }
   return -1;
};
jv_ArrayList_c.removeRange = function (start, end)  {
   if (start < 0) {
      throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0B", Number_c.valueOf(start)));
   }
   else
   if (end > this._size) {
      throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0A", Number_c.valueOf(end), Number_c.valueOf(this._size)));
   }
   else
   if (start > end) {
      throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.35", Number_c.valueOf(start), Number_c.valueOf(end)));
   }
   if (start === end) {
      return;
   }
   if (end === this._size) {
      jv_Arrays_c.fill(this.array, this.firstIndex + start, this.firstIndex + this._size, null);
   }
   else
   if (start === 0) {
      jv_Arrays_c.fill(this.array, this.firstIndex, this.firstIndex + end, null);
      this.firstIndex += end;
   }
   else {
      jv_System_c.arraycopy(this.array, this.firstIndex + end, this.array, this.firstIndex + start,
              this._size - end);
      var lastIndex = this.firstIndex + this._size;
      var newLast = lastIndex + start - end;
      jv_Arrays_c.fill(this.array, newLast, lastIndex, null);
   }
   this._size -= end - start;
   this.modCount++;
};
jv_ArrayList_c.set = function (location, object)  {
   if (location < 0 || location >= this._size) {
      throw new jv_IndexOutOfBoundsException(ai_Messages_c.getString("luni.0A", Number_c.valueOf(location), Number_c.valueOf(this._size)));
   }
   var result = this.array[this.firstIndex + location];
   this.array[this.firstIndex + location] = object;
   return result;
};
jv_ArrayList_c.newElementArray = function (size)  {
   return(sc_newArray(jv_Object_c, size));
};
jv_ArrayList_c.ensureCapacity = function (minimumCapacity)  {
   if (this.array.length < minimumCapacity) {
      if (this.firstIndex > 0) {
         this.growAtFront(minimumCapacity - this.array.length);
      }
      else {
         this.growAtEnd(minimumCapacity - this.array.length);
      }
   }
};
jv_ArrayList_c.growAtEnd = function (required)  {
   if (this.array.length - this._size >= required) {
      if (this._size !== 0) {
         jv_System_c.arraycopy(this.array, this.firstIndex, this.array, 0, this._size);
         var start = this._size < this.firstIndex ? this.firstIndex : this._size;
         jv_Arrays_c.fill(this.array, start, this.array.length, null);
      }
      this.firstIndex = 0;
   }
   else {
      var increment = this._size / 2;
      if (required > increment) {
         increment = required;
      }
      if (increment < 12) {
         increment = 12;
      }
      var newArray = this.newElementArray(this._size + increment);
      if (this._size !== 0) {
         jv_System_c.arraycopy(this.array, this.firstIndex, newArray, 0, this._size);
         this.firstIndex = 0;
      }
      this.array = newArray;
   }
};
jv_ArrayList_c.growAtFront = function (required)  {
   if (this.array.length - this._size >= required) {
      var newFirst = this.array.length - this._size;
      if (this._size !== 0) {
         jv_System_c.arraycopy(this.array, this.firstIndex, this.array, newFirst, this._size);
         var lastIndex = this.firstIndex + this._size;
         var length = lastIndex > newFirst ? newFirst : lastIndex;
         jv_Arrays_c.fill(this.array, this.firstIndex, length, null);
      }
      this.firstIndex = newFirst;
   }
   else {
      var increment = this._size / 2;
      if (required > increment) {
         increment = required;
      }
      if (increment < 12) {
         increment = 12;
      }
      var newArray = this.newElementArray(this._size + increment);
      if (this._size !== 0) {
         jv_System_c.arraycopy(this.array, this.firstIndex, newArray, increment, this._size);
      }
      this.firstIndex = newArray.length - this._size;
      this.array = newArray;
   }
};
jv_ArrayList_c.growForInsert = function (location, required)  {
   var increment = this._size / 2;
   if (required > increment) {
      increment = required;
   }
   if (increment < 12) {
      increment = 12;
   }
   var newArray = this.newElementArray(this._size + increment);
   var newFirst = increment - required;
   jv_System_c.arraycopy(this.array, location + this.firstIndex, newArray, newFirst + location + required,
           this._size - location);
   jv_System_c.arraycopy(this.array, this.firstIndex, newArray, newFirst, location);
   this.firstIndex = newFirst;
   this.array = newArray;
};
jv_ArrayList_c.trimToSize = function ()  {
   var newArray = this.newElementArray(this._size);
   jv_System_c.arraycopy(this.array, this.firstIndex, newArray, 0, this._size);
   this.array = newArray;
   this.firstIndex = 0;
   this.modCount = 0;
};
jv_ArrayList_c.writeObject = function (stream)  {
   var fields = stream.putFields();
   fields.put("size", this._size);
   stream.writeFields();
   stream.writeInt(this.array.length);
   var it = this.iterator();
   while (it.hasNext()) {
      stream.writeObject(it.next());
   }
};
jv_ArrayList_c.readObject = function (stream)  {
   var fields = stream.readFields();
   this._size = fields.get("size", 0);
   this.array = this.newElementArray(stream.readInt());
   for (var i = 0; i < this._size; i++) {
      this.array[i] = (stream.readObject());
   }
};
jv_ArrayList_c.sort = function (comp)  {
   jv_Arrays_c.sort((this.array), this.firstIndex, this._size + this.firstIndex, comp);
};

jv_ArrayList_c._jv_ArrayListInit = function() {
};

// Generated JS from Java: java.lang.IllegalArgumentException -----
function jv_IllegalArgumentException() {

   jv_IllegalArgumentException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      if (sc_paramType(arguments[0], String)) { 
         var detailMessage = arguments[0];
         jv_RuntimeException.call(this, detailMessage);
}else if (sc_paramType(arguments[0], Error)) { 
         var cause = arguments[0];
         jv_RuntimeException.call(this, (cause === null ? null : cause.toString()), cause);
}   }
   else if (arguments.length == 2) {
      var message = arguments[0];
      var cause = arguments[1];
      jv_RuntimeException.call(this, message, cause);
   }}

var jv_IllegalArgumentException_c = sc_newClass("java.lang.IllegalArgumentException", jv_IllegalArgumentException, jv_RuntimeException, null);


jv_IllegalArgumentException_c._clInit = function() {
   if (jv_IllegalArgumentException_c.hasOwnProperty("_clInited")) return;
   jv_IllegalArgumentException_c._clInited = true;
   
      jv_IllegalArgumentException_c.serialVersionUID = -5365630128856068164;
      ;
};


// Generated JS from Java: org.apache.harmony.luni.internal.nls.Messages -----
function ai_Messages() {
   jv_Object.call(this);
}

var ai_Messages_c = sc_newClass("org.apache.harmony.luni.internal.nls.Messages", ai_Messages, jv_Object, null);

ai_Messages_c.getString = function () /* overloaded */ {
   if (arguments.length == 0) return;
      if (arguments.length ==2 && sc_paramType(arguments[0], String) && sc_instanceOf(arguments[1], Number)) { 
      var msg = arguments[0];
      var arg = arguments[1];
      return msg + ": " + arg;
}
      else if (arguments.length ==1 && sc_paramType(arguments[0], String)) { 
      var msg = arguments[0];
      return msg;
}
      else if (arguments.length >=1 && sc_paramType(arguments[0], String)) { 
      var msg = arguments[0];
      var args = sc_vararg(arguments, 1);
      return msg;
}};


// Generated JS from Java: java.util.Arrays -----
function jv_Arrays() {

   jv_Arrays_c._clInit();

   jv_Object.call(this);
}

var jv_Arrays_c = sc_newClass("java.util.Arrays", jv_Arrays, jv_Object, null);

jv_Arrays_c.asList = function ()  {
   jv_Arrays_c._clInit();
   var array = sc_vararg(arguments, 0);
   return new jv_Arrays_ArrayList(array);
};
jv_Arrays_c.binarySearch = function () /* overloaded */ {
   jv_Arrays_c._clInit();
   if (arguments.length == 2) {
      if (sc_arrayParamType(arguments[0], String, 0) && sc_instanceOfChar(arguments[1], String)) { 
         var array = arguments[0];
         var value = arguments[1];
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (value > array[mid]) {
               low = mid + 1;
            }
            else
            if (value === array[mid]) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (value < array[mid] ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (value > array[mid]) {
               low = mid + 1;
            }
            else
            if (value === array[mid]) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (value < array[mid] ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (value > array[mid]) {
               low = mid + 1;
            }
            else
            if (value === array[mid]) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (value < array[mid] ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (value > array[mid]) {
               low = mid + 1;
            }
            else
            if (value === array[mid]) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (value < array[mid] ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (value > array[mid]) {
               low = mid + 1;
            }
            else
            if (value === array[mid]) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (value < array[mid] ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         var intBits = Number_c.floatToIntBits(value);
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (jv_Arrays_c.lessThan(array[mid], value)) {
               low = mid + 1;
            }
            else
            if (intBits === Number_c.floatToIntBits(array[mid])) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (jv_Arrays_c.lessThan(value, array[mid]) ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         var longBits = Number_c.doubleToLongBits(value);
         var low = 0, mid = -1, high = array.length - 1;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if (jv_Arrays_c.lessThan(array[mid], value)) {
               low = mid + 1;
            }
            else
            if (longBits === Number_c.doubleToLongBits(array[mid])) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         if (mid < 0) {
            return -1;
         }
         return -mid - (jv_Arrays_c.lessThan(value, array[mid]) ? 1 : 2);
}else if (sc_arrayParamType(arguments[0], jv_Object, 0) && sc_paramType(arguments[1], jv_Object)) { 
         var array = arguments[0];
         var object = arguments[1];
         if (array.length === 0) {
            return -1;
         }
         var low = 0, mid = 0, high = array.length - 1, result = 0;
         while (low <= high) {
            mid = (low + high) >>> 1;
            if ((result = ((array[mid])).compareTo(object)) < 0) {
               low = mid + 1;
            }
            else
            if (result === 0) {
               return mid;
            }
            else {
               high = mid - 1;
            }
         }
         return -mid - (result >= 0 ? 1 : 2);
}   }
   else if (arguments.length == 3) {
      var array = arguments[0];
      var object = arguments[1];
      var comparator = arguments[2];
      if (comparator === null) {
         return jv_Arrays_c.binarySearch(array, object);
      }
      var low = 0, mid = 0, high = array.length - 1, result = 0;
      while (low <= high) {
         mid = (low + high) >>> 1;
         if ((result = comparator.compare(array[mid], object)) < 0) {
            low = mid + 1;
         }
         else
         if (result === 0) {
            return mid;
         }
         else {
            high = mid - 1;
         }
      }
      return -mid - (result >= 0 ? 1 : 2);
   }
   else sc_noMeth("binarySearch");
};
jv_Arrays_c.fill = function () /* overloaded */ {
   jv_Arrays_c._clInit();
   if (arguments.length == 2) {
      if (sc_arrayParamType(arguments[0], String, 0) && sc_instanceOfChar(arguments[1], String)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Boolean, 0) && sc_instanceOf(arguments[1], Boolean)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], jv_Object, 0) && sc_paramType(arguments[1], jv_Object)) { 
         var array = arguments[0];
         var value = arguments[1];
         for (var i = 0; i < array.length; i++) {
            array[i] = value;
         }
}   }
   else if (arguments.length == 4) {
      if (sc_arrayParamType(arguments[0], String, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOfChar(arguments[3], String)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], Boolean, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Boolean)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}else if (sc_arrayParamType(arguments[0], jv_Object, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_paramType(arguments[3], jv_Object)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var value = arguments[3];
         jv_Arrays_c.checkBounds(array.length, start, end);
         for (var i = start; i < end; i++) {
            array[i] = value;
         }
}   }
   else sc_noMeth("fill");
};
jv_Arrays_c.hashCode = function () /* overloaded */ {
   jv_Arrays_c._clInit();
      if (sc_arrayParamType(arguments[0], Boolean, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            hashCode = 31 * hashCode + (element ? 1231 : 1237);
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            hashCode = 31 * hashCode + element;
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            hashCode = 31 * hashCode + element;
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], String, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            hashCode = 31 * hashCode + sc_charToInt(element);
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            hashCode = 31 * hashCode + element;
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var elementValue = array[_i];
            hashCode = 31 * hashCode + Math.floor((elementValue ^ (elementValue >>> 32)));
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            hashCode = 31 * hashCode + Number_c.floatToIntBits(element);
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            var v = Number_c.doubleToLongBits(element);
            hashCode = 31 * hashCode + Math.floor((v ^ (v >>> 32)));
         }
      }
      return hashCode;
}
      else if (sc_arrayParamType(arguments[0], jv_Object, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return 0;
      }
      var hashCode = 1;
      {
         var _lv = array;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = array[_i];
            var elementHashCode;
            if (element === null) {
               elementHashCode = 0;
            }
            else {
               elementHashCode = (element).hashCode();
            }
            hashCode = 31 * hashCode + elementHashCode;
         }
      }
      return hashCode;
}};
jv_Arrays_c.deepHashCode = function (array)  {
   jv_Arrays_c._clInit();
   if (array === null) {
      return 0;
   }
   var hashCode = 1;
   {
      var _lv = array;
      for (var _i = 0; _i < _lv.length; _i++) {
         var element = array[_i];
         var elementHashCode = jv_Arrays_c.deepHashCodeElement(element);
         hashCode = 31 * hashCode + elementHashCode;
      }
   }
   return hashCode;
};
jv_Arrays_c.deepHashCodeElement = function (element)  {
   jv_Arrays_c._clInit();
   var cl;
   if (element === null) {
      return 0;
   }
   cl = element.getClass().getComponentType();
   if (cl === null) {
      return element.hashCode();
   }
   if (!cl.isPrimitive()) {
      return jv_Arrays_c.deepHashCode((element));
   }
   if (cl.equals(Number_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   if (cl.equals(String_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   if (cl.equals(Boolean_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   if (cl.equals(Number_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   if (cl.equals(Number_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   if (cl.equals(Number_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   if (cl.equals(Number_c)) {
      return jv_Arrays_c.hashCode((element));
   }
   return jv_Arrays_c.hashCode((element));
};
jv_Arrays_c.equals = function () /* overloaded */ {
   jv_Arrays_c._clInit();
      if (sc_arrayParamType(arguments[0], Number, 0) && sc_arrayParamType(arguments[1], Number, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (array1[i] !== array2[i]) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_arrayParamType(arguments[1], Number, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (array1[i] !== array2[i]) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], String, 0) && sc_arrayParamType(arguments[1], String, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (array1[i] !== array2[i]) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_arrayParamType(arguments[1], Number, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (array1[i] !== array2[i]) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_arrayParamType(arguments[1], Number, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (array1[i] !== array2[i]) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_arrayParamType(arguments[1], Number, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (Number_c.floatToIntBits(array1[i]) !== Number_c.floatToIntBits(array2[i])) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_arrayParamType(arguments[1], Number, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (Number_c.doubleToLongBits(array1[i]) !== Number_c.doubleToLongBits(array2[i])) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], Boolean, 0) && sc_arrayParamType(arguments[1], Boolean, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         if (array1[i] !== array2[i]) {
            return false;
         }
      }
      return true;
}
      else if (sc_arrayParamType(arguments[0], jv_Object, 0) && sc_arrayParamType(arguments[1], jv_Object, 0)) { 
      var array1 = arguments[0];
      var array2 = arguments[1];
      if (array1 === array2) {
         return true;
      }
      if (array1 === null || array2 === null || array1.length !== array2.length) {
         return false;
      }
      for (var i = 0; i < array1.length; i++) {
         var e1 = array1[i], e2 = array2[i];
         if (!(e1 === null ? e2 === null : e1.equals(e2))) {
            return false;
         }
      }
      return true;
}};
jv_Arrays_c.deepEquals = function (array1, array2)  {
   jv_Arrays_c._clInit();
   if (array1 === array2) {
      return true;
   }
   if (array1 === null || array2 === null || array1.length !== array2.length) {
      return false;
   }
   for (var i = 0; i < array1.length; i++) {
      var e1 = array1[i], e2 = array2[i];
      if (!jv_Arrays_c.deepEqualsElements(e1, e2)) {
         return false;
      }
   }
   return true;
};
jv_Arrays_c.deepEqualsElements = function (e1, e2)  {
   jv_Arrays_c._clInit();
   var cl1, cl2;
   if (e1 === e2) {
      return true;
   }
   if (e1 === null || e2 === null) {
      return false;
   }
   cl1 = e1.getClass().getComponentType();
   cl2 = e2.getClass().getComponentType();
   if (cl1 !== cl2) {
      return false;
   }
   if (cl1 === null) {
      return e1.equals(e2);
   }
   if (!cl1.isPrimitive()) {
      return jv_Arrays_c.deepEquals((e1), (e2));
   }
   if (cl1.equals(Number_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   if (cl1.equals(String_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   if (cl1.equals(Boolean_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   if (cl1.equals(Number_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   if (cl1.equals(Number_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   if (cl1.equals(Number_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   if (cl1.equals(Number_c)) {
      return jv_Arrays_c.equals((e1), (e2));
   }
   return jv_Arrays_c.equals((e1), (e2));
};
jv_Arrays_c.isSame = function () /* overloaded */ {
   if (arguments.length == 0) return;
   jv_Arrays_c._clInit();
      if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number)) { 
      var float1 = arguments[0];
      var float2 = arguments[1];
      if (float1 === float2 && 0.0 !== float1) {
         return true;
      }
      if (Number_c.isNaN(float1)) {
         return Number_c.isNaN(float2);
      }
      if (Number_c.isNaN(float2)) {
         return false;
      }
      var f1 = Number_c.floatToRawIntBits(float1);
      var f2 = Number_c.floatToRawIntBits(float2);
      return f1 === f2;
}
      else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number)) { 
      var double1 = arguments[0];
      var double2 = arguments[1];
      if (double1 === double2 && 0.0 !== double1) {
         return true;
      }
      if (Number_c.isNaN(double1)) {
         return Number_c.isNaN(double2);
      }
      if (Number_c.isNaN(double2)) {
         return false;
      }
      var d1 = Number_c.doubleToRawLongBits(double1);
      var d2 = Number_c.doubleToRawLongBits(double2);
      return d1 === d2;
}};
jv_Arrays_c.lessThan = function () /* overloaded */ {
   jv_Arrays_c._clInit();
      if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number)) { 
      var float1 = arguments[0];
      var float2 = arguments[1];
      if (float1 < float2) {
         return true;
      }
      if (float1 > float2) {
         return false;
      }
      if (float1 === float2 && 0.0 !== float1) {
         return false;
      }
      if (Number_c.isNaN(float1)) {
         return false;
      }
      else
      if (Number_c.isNaN(float2)) {
         return true;
      }
      var f1 = Number_c.floatToRawIntBits(float1);
      var f2 = Number_c.floatToRawIntBits(float2);
      return f1 < f2;
}
      else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number)) { 
      var double1 = arguments[0];
      var double2 = arguments[1];
      if (double1 < double2) {
         return true;
      }
      if (double1 > double2) {
         return false;
      }
      if (double1 === double2 && 0.0 !== double1) {
         return false;
      }
      if (Number_c.isNaN(double1)) {
         return false;
      }
      else
      if (Number_c.isNaN(double2)) {
         return true;
      }
      var d1 = Number_c.doubleToRawLongBits(double1);
      var d2 = Number_c.doubleToRawLongBits(double2);
      return d1 < d2;
}};
jv_Arrays_c.med3 = function () /* overloaded */ {
   jv_Arrays_c._clInit();
      if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return x < y ? (y < z ? b : (x < z ? c : a)) : (y > z ? b : (x > z ? c : a));
}
      else if (sc_arrayParamType(arguments[0], String, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return x < y ? (y < z ? b : (x < z ? c : a)) : (y > z ? b : (x > z ? c : a));
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return jv_Arrays_c.lessThan(x, y) ? (jv_Arrays_c.lessThan(y, z) ? b : (jv_Arrays_c.lessThan(x, z) ? c : a)) : (jv_Arrays_c.lessThan(z, y) ? b : (jv_Arrays_c.lessThan(z, x) ? c : a));
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return jv_Arrays_c.lessThan(x, y) ? (jv_Arrays_c.lessThan(y, z) ? b : (jv_Arrays_c.lessThan(x, z) ? c : a)) : (jv_Arrays_c.lessThan(z, y) ? b : (jv_Arrays_c.lessThan(z, x) ? c : a));
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return x < y ? (y < z ? b : (x < z ? c : a)) : (y > z ? b : (x > z ? c : a));
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return x < y ? (y < z ? b : (x < z ? c : a)) : (y > z ? b : (x > z ? c : a));
}
      else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_instanceOf(arguments[3], Number)) { 
      var array = arguments[0];
      var a = arguments[1];
      var b = arguments[2];
      var c = arguments[3];
      var x = array[a], y = array[b], z = array[c];
      return x < y ? (y < z ? b : (x < z ? c : a)) : (y > z ? b : (x > z ? c : a));
}};
jv_Arrays_c.sort = function () /* overloaded */ {
   jv_Arrays_c._clInit();
   if (arguments.length == 1) {
      if (sc_arrayParamType(arguments[0], Number, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], String, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], Number, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], Number, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], Number, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], Number, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], Number, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}else if (sc_arrayParamType(arguments[0], jv_Object, 0)) { 
         var array = arguments[0];
         jv_Arrays_c.sort(0, array.length, array);
}   }
   else if (arguments.length == 3) {
      if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], Number, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && array[j - 1] > array[j]; j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && array[b] <= partionValue) {
               if (array[b] === partionValue) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && array[c] >= partionValue) {
               if (array[c] === partionValue) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], jv_Object, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var length = end - start;
         if (length <= 0) {
            return;
         }
         if (sc_arrayInstanceOf(array, String, 0)) {
            jv_Arrays_c.stableStringSort((array), start, end);
         }
         else {
            var out = sc_newArray(jv_Object_c, end);
            jv_System_c.arraycopy(array, start, out, start, length);
            jv_Arrays_c.mergeSort(out, array, start, end);
         }
}else if (sc_arrayParamType(arguments[0], jv_Object, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], Number, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && array[j - 1] > array[j]; j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && array[b] <= partionValue) {
               if (array[b] === partionValue) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && array[c] >= partionValue) {
               if (array[c] === partionValue) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], Number, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && array[j - 1] > array[j]; j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && array[b] <= partionValue) {
               if (array[b] === partionValue) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && array[c] >= partionValue) {
               if (array[c] === partionValue) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], Number, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && jv_Arrays_c.lessThan(array[j], array[j - 1]); j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && !jv_Arrays_c.lessThan(partionValue, array[b])) {
               if (jv_Arrays_c.isSame(array[b], partionValue)) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && !jv_Arrays_c.lessThan(array[c], partionValue)) {
               if (jv_Arrays_c.isSame(array[c], partionValue)) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], Number, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && jv_Arrays_c.lessThan(array[j], array[j - 1]); j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && !jv_Arrays_c.lessThan(partionValue, array[b])) {
               if (jv_Arrays_c.isSame(array[b], partionValue)) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && !jv_Arrays_c.lessThan(array[c], partionValue)) {
               if (jv_Arrays_c.isSame(array[c], partionValue)) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], String, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && array[j - 1] > array[j]; j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && array[b] <= partionValue) {
               if (array[b] === partionValue) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && array[c] >= partionValue) {
               if (array[c] === partionValue) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], String, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}else if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], Number, 0)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var temp;
         var length = end - start;
         if (length < 7) {
            for (var i = start + 1; i < end; i++) {
               for (var j = i; j > start && array[j - 1] > array[j]; j--) {
                  temp = array[j];
                  array[j] = array[j - 1];
                  array[j - 1] = temp;
               }
            }
            return;
         }
         var middle = (start + end) / 2;
         if (length > 7) {
            var bottom = start;
            var top = end - 1;
            if (length > 40) {
               length /= 8;
               bottom = jv_Arrays_c.med3(array, bottom, bottom + length, bottom + (2 * length));
               middle = jv_Arrays_c.med3(array, middle - length, middle, middle + length);
               top = jv_Arrays_c.med3(array, top - (2 * length), top - length, top);
            }
            middle = jv_Arrays_c.med3(array, bottom, middle, top);
         }
         var partionValue = array[middle];
         var a, b, c, d;
         a = b = start;
         c = d = end - 1;
         while (true) {
            while (b <= c && array[b] <= partionValue) {
               if (array[b] === partionValue) {
                  temp = array[a];
                  array[a++] = array[b];
                  array[b] = temp;
               }
               b++;
            }
            while (c >= b && array[c] >= partionValue) {
               if (array[c] === partionValue) {
                  temp = array[c];
                  array[c] = array[d];
                  array[d--] = temp;
               }
               c--;
            }
            if (b > c) {
               break;
            }
            temp = array[b];
            array[b++] = array[c];
            array[c--] = temp;
         }
         length = a - start < b - a ? a - start : b - a;
         var l = start;
         var h = b - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         length = d - c < end - 1 - d ? d - c : end - 1 - d;
         l = b;
         h = end - length;
         while (length-- > 0) {
            temp = array[l];
            array[l++] = array[h];
            array[h++] = temp;
         }
         if ((length = b - a) > 0) {
            jv_Arrays_c.sort(start, start + length, array);
         }
         if ((length = d - c) > 0) {
            jv_Arrays_c.sort(end - length, end, array);
         }
}else if (sc_arrayParamType(arguments[0], Number, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array);
}   }
   else if (arguments.length == 4) {
      if (sc_instanceOf(arguments[0], Number) && sc_instanceOf(arguments[1], Number) && sc_arrayParamType(arguments[2], jv_Object, 0) && sc_paramType(arguments[3], jv_Comparator)) { 
         var start = arguments[0];
         var end = arguments[1];
         var array = arguments[2];
         var comparator = arguments[3];
         if (comparator === null) {
            jv_Arrays_c.sort(start, end, array);
         }
         else {
            var length = end - start;
            var out = sc_newArray(jv_Object_c, end);
            jv_System_c.arraycopy(array, start, out, start, length);
            jv_Arrays_c.mergeSort(out, array, start, end, comparator);
         }
}else if (sc_arrayParamType(arguments[0], jv_Object, 0) && sc_instanceOf(arguments[1], Number) && sc_instanceOf(arguments[2], Number) && sc_paramType(arguments[3], jv_Comparator)) { 
         var array = arguments[0];
         var start = arguments[1];
         var end = arguments[2];
         var comparator = arguments[3];
         if (array === null) {
            throw new jv_NullPointerException();
         }
         jv_Arrays_c.checkBounds(array.length, start, end);
         jv_Arrays_c.sort(start, end, array, comparator);
}   }
   else if (arguments.length == 2) {
      var array = arguments[0];
      var comparator = arguments[1];
      jv_Arrays_c.sort(0, array.length, array, comparator);
   }
   else sc_noMeth("sort");
};
jv_Arrays_c.checkBounds = function (arrLength, start, end)  {
   jv_Arrays_c._clInit();
   if (start > end) {
      throw new jv_IllegalArgumentException(ai_Messages_c.getString("luni.35", Number_c.valueOf(start), Number_c.valueOf(end)));
   }
   if (start < 0) {
      throw new jv_ArrayIndexOutOfBoundsException(ai_Messages_c.getString("luni.36", start));
   }
   if (end > arrLength) {
      throw new jv_ArrayIndexOutOfBoundsException(ai_Messages_c.getString("luni.36", end));
   }
};
jv_Arrays_c.swap = function (a, b, arr)  {
   jv_Arrays_c._clInit();
   var tmp = arr[a];
   arr[a] = arr[b];
   arr[b] = tmp;
};
jv_Arrays_c.mergeSort = function () /* overloaded */ {
   jv_Arrays_c._clInit();
   if (arguments.length == 4) {
      var _in = arguments[0];
      var out = arguments[1];
      var start = arguments[2];
      var end = arguments[3];
      var len = end - start;
      if (len <= jv_Arrays_c.SIMPLE_LENGTH) {
         for (var i = start + 1; i < end; i++) {
            var current = (out[i]);
            var prev = out[i - 1];
            if (current.compareTo(prev) < 0) {
               var j = i;
               do {
                  out[j--] = prev;
               } while (j > start && current.compareTo(prev = out[j - 1]) < 0);
               out[j] = current;
            }
         }
         return;
      }
      var med = (end + start) >>> 1;
      jv_Arrays_c.mergeSort(out, _in, start, med);
      jv_Arrays_c.mergeSort(out, _in, med, end);
      if (((_in[med - 1])).compareTo(_in[med]) <= 0) {
         jv_System_c.arraycopy(_in, start, out, start, len);
         return;
      }
      var r = med, i = start;
      do {
         var fromVal = (_in[start]);
         var rVal = (_in[r]);
         if (fromVal.compareTo(rVal) <= 0) {
            var l_1 = jv_Arrays_c.find(_in, rVal, -1, start + 1, med - 1);
            var toCopy = l_1 - start + 1;
            jv_System_c.arraycopy(_in, start, out, i, toCopy);
            i += toCopy;
            out[i++] = rVal;
            r++;
            start = l_1 + 1;
         } else {
            var r_1 = jv_Arrays_c.find(_in, fromVal, 0, r + 1, end - 1);
            var toCopy = r_1 - r + 1;
            jv_System_c.arraycopy(_in, r, out, i, toCopy);
            i += toCopy;
            out[i++] = fromVal;
            start++;
            r = r_1 + 1;
         } } while ((end - r) > 0 && (med - start) > 0);
      if ((end - r) <= 0) {
         jv_System_c.arraycopy(_in, start, out, i, med - start);
      }
      else {
         jv_System_c.arraycopy(_in, r, out, i, end - r);
      }
   }
   else if (arguments.length == 5) {
      var _in = arguments[0];
      var out = arguments[1];
      var start = arguments[2];
      var end = arguments[3];
      var c = arguments[4];
      var len = end - start;
      if (len <= jv_Arrays_c.SIMPLE_LENGTH) {
         for (var i = start + 1; i < end; i++) {
            var current = out[i];
            var prev = out[i - 1];
            if (c.compare(prev, current) > 0) {
               var j = i;
               do {
                  out[j--] = prev;
               } while (j > start && (c.compare(prev = out[j - 1], current) > 0));
               out[j] = current;
            }
         }
         return;
      }
      var med = (end + start) >>> 1;
      jv_Arrays_c.mergeSort(out, _in, start, med, c);
      jv_Arrays_c.mergeSort(out, _in, med, end, c);
      if (c.compare(_in[med - 1], _in[med]) <= 0) {
         jv_System_c.arraycopy(_in, start, out, start, len);
         return;
      }
      var r = med, i = start;
      do {
         var fromVal = _in[start];
         var rVal = _in[r];
         if (c.compare(fromVal, rVal) <= 0) {
            var l_1 = jv_Arrays_c.find(_in, rVal, -1, start + 1, med - 1, c);
            var toCopy = l_1 - start + 1;
            jv_System_c.arraycopy(_in, start, out, i, toCopy);
            i += toCopy;
            out[i++] = rVal;
            r++;
            start = l_1 + 1;
         } else {
            var r_1 = jv_Arrays_c.find(_in, fromVal, 0, r + 1, end - 1, c);
            var toCopy = r_1 - r + 1;
            jv_System_c.arraycopy(_in, r, out, i, toCopy);
            i += toCopy;
            out[i++] = fromVal;
            start++;
            r = r_1 + 1;
         } } while ((end - r) > 0 && (med - start) > 0);
      if ((end - r) <= 0) {
         jv_System_c.arraycopy(_in, start, out, i, med - start);
      }
      else {
         jv_System_c.arraycopy(_in, r, out, i, end - r);
      }
   }
   else sc_noMeth("mergeSort");
};
jv_Arrays_c.find = function () /* overloaded */ {
   jv_Arrays_c._clInit();
   if (arguments.length == 5) {
      var arr = arguments[0];
      var val = arguments[1];
      var bnd = arguments[2];
      var l = arguments[3];
      var r = arguments[4];
      var m = l;
      var d = 1;
      while (m <= r) {
         if (val.compareTo(arr[m]) > bnd) {
            l = m + 1;
         }
         else {
            r = m - 1;
            break;
         }
         m += d;
         d <<= 1;
      }
      while (l <= r) {
         m = (l + r) >>> 1;
         if (val.compareTo(arr[m]) > bnd) {
            l = m + 1;
         }
         else {
            r = m - 1;
         }
      }
      return l - 1;
   }
   else if (arguments.length == 6) {
      var arr = arguments[0];
      var val = arguments[1];
      var bnd = arguments[2];
      var l = arguments[3];
      var r = arguments[4];
      var c = arguments[5];
      var m = l;
      var d = 1;
      while (m <= r) {
         if (c.compare(val, arr[m]) > bnd) {
            l = m + 1;
         }
         else {
            r = m - 1;
            break;
         }
         m += d;
         d <<= 1;
      }
      while (l <= r) {
         m = (l + r) >>> 1;
         if (c.compare(val, arr[m]) > bnd) {
            l = m + 1;
         }
         else {
            r = m - 1;
         }
      }
      return l - 1;
   }
   else sc_noMeth("find");
};
jv_Arrays_c.medChar = function (a, b, c, arr, id)  {
   jv_Arrays_c._clInit();
   var ac = jv_Arrays_c.charAt(arr[a], id);
   var bc = jv_Arrays_c.charAt(arr[b], id);
   var cc = jv_Arrays_c.charAt(arr[c], id);
   return ac < bc ? (bc < cc ? b : (ac < cc ? c : a)) : (bc < cc ? (ac < cc ? a : c) : b);
};
jv_Arrays_c.charAt = function (str, i)  {
   jv_Arrays_c._clInit();
   if (i >= str._length()) {
      return -1;
   }
   return str.charAt(i);
};
jv_Arrays_c.copySwap = function (src, from, dst, to, len)  {
   jv_Arrays_c._clInit();
   if (src === dst && from + len > to) {
      var new_to = to + len - 1;
      for (; from < to; from++, new_to--, len--) {
         dst[new_to] = src[from];
      }
      for (; len > 1; from++, new_to--, len -= 2) {
         jv_Arrays_c.swap(from, new_to, dst);
      }
   }
   else {
      to = to + len - 1;
      for (; len > 0; from++, to--, len--) {
         dst[to] = src[from];
      }
   }
};
jv_Arrays_c.stableStringSort = function () /* overloaded */ {
   jv_Arrays_c._clInit();
   if (arguments.length == 3) {
      var arr = arguments[0];
      var start = arguments[1];
      var end = arguments[2];
      jv_Arrays_c.stableStringSort(arr, arr, sc_newArray(String_c, end), start, end, 0);
   }
   else if (arguments.length == 6) {
      var arr = arguments[0];
      var src = arguments[1];
      var dst = arguments[2];
      var start = arguments[3];
      var end = arguments[4];
      var chId = arguments[5];
      var length = end - start;
      if (length < jv_Arrays_c.SIMPLE_LENGTH) {
         if (src === arr) {
            for (var i = start + 1; i < end; i++) {
               var current = arr[i];
               var prev = arr[i - 1];
               if (current.compareTo(prev) < 0) {
                  var j = i;
                  do {
                     arr[j--] = prev;
                  } while (j > start && current.compareTo(prev = arr[j - 1]) < 0);
                  arr[j] = current;
               }
            }
         }
         else {
            var actualEnd = end - 1;
            dst[start] = src[actualEnd--];
            for (var i = start + 1; i < end; i++, actualEnd--) {
               var current = src[actualEnd];
               var prev;
               var j = i;
               while (j > start && current.compareTo(prev = dst[j - 1]) < 0) {
                  dst[j--] = prev;
               }
               dst[j] = current;
            }
         }
         return;
      }
      var s;
      var mid = start + length / 2;
      var lo = start;
      var hi = end - 1;
      if (length > 40) {
         s = length / 8;
         lo = jv_Arrays_c.medChar(lo, lo + s, lo + s * 2, src, chId);
         mid = jv_Arrays_c.medChar(mid - s, mid, mid + s, src, chId);
         hi = jv_Arrays_c.medChar(hi, hi - s, hi - s * 2, src, chId);
      }
      mid = jv_Arrays_c.medChar(lo, mid, hi, src, chId);
      var midVal = jv_Arrays_c.charAt(src[mid], chId);
      var a, b, c;
      a = b = start;
      c = end - 1;
      var cmp;
      for (var i = start; i < end; i++) {
         var el = src[i];
         cmp = jv_Arrays_c.charAt(el, chId) - midVal;
         if (cmp < 0) {
            src[a] = el;
            a++;
         }
         else
         if (cmp > 0) {
            dst[c] = el;
            c--;
         }
         else {
            dst[b] = el;
            b++;
         }
      }
      s = b - start;
      if (s > 0) {
         if (arr === src) {
            jv_System_c.arraycopy(dst, start, arr, a, s);
         }
         else {
            jv_Arrays_c.copySwap(dst, start, arr, a, s);
         }
         if (b >= end && midVal === -1) {
            return;
         }
         jv_Arrays_c.stableStringSort(arr, arr, arr === dst ? src : dst, a, a + s, chId + 1);
      }
      s = a - start;
      if (s > 0) {
         jv_Arrays_c.stableStringSort(arr, src, dst, start, a, chId);
      }
      c++;
      s = end - c;
      if (s > 0) {
         jv_Arrays_c.stableStringSort(arr, dst, src, c, end, chId);
      }
   }
   else sc_noMeth("stableStringSort");
};
jv_Arrays_c.toString = function () /* overloaded */ {
   jv_Arrays_c._clInit();
      if (sc_arrayParamType(arguments[0], Boolean, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 5);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 3);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], String, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 2);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 5);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 5);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 4);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 4);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], Number, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 4);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}
      else if (sc_arrayParamType(arguments[0], jv_Object, 0)) { 
      var array = arguments[0];
      if (array === null) {
         return "null";
      }
      if (array.length === 0) {
         return "[]";
      }
      var sb = new jv_StringBuilder(2 + array.length * 5);
      sb.append('[');
      sb.append(array[0]);
      for (var i = 1; i < array.length; i++) {
         sb.append(", ");
         sb.append(array[i]);
      }
      sb.append(']');
      return sb.toString();
}};
jv_Arrays_c.deepToString = function (array)  {
   jv_Arrays_c._clInit();
   return jv_Arrays_c.deepToStringImpl(array, sc_initArray(jv_Object_c, 2, [ array ]), null);
};
jv_Arrays_c.deepToStringImpl = function (array, origArrays, sb)  {
   jv_Arrays_c._clInit();
   if (array === null) {
      return "null";
   }
   if (array.length === 0) {
      return "[]";
   }
   if (sb === null) {
      sb = new jv_StringBuilder(2 + array.length * 5);
   }
   sb.append('[');
   for (var i = 0; i < array.length; i++) {
      if (i !== 0) {
         sb.append(", ");
      }
      var elem = array[i];
      if (elem === null) {
         sb.append("null");
      }
      else {
         var elemClass = elem.getClass();
         if (elemClass.isArray()) {
            var elemElemClass = elemClass.getComponentType();
            if (elemElemClass.isPrimitive()) {
               if (Boolean_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (Number_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (String_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (Number_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (Number_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (Number_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (Number_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else
               if (Number_c.equals(elemElemClass)) {
                  sb.append(jv_Arrays_c.toString((elem)));
               }
               else {
                  throw new jv_AssertionError();
               }
            }
            else {
               jv_assert(sc_arrayInstanceOf(elem, jv_Object, 0));
               if (jv_Arrays_c.deepToStringImplContains(origArrays, elem)) {
                  sb.append("[...]");
               }
               else {
                  var newArray = (elem);
                  var newOrigArrays = sc_newArray(jv_Object_c, origArrays.length + 1);
                  jv_System_c.arraycopy(origArrays, 0, newOrigArrays, 0, origArrays.length);
                  newOrigArrays[origArrays.length] = newArray;
                  jv_Arrays_c.deepToStringImpl(newArray, newOrigArrays, sb);
               }
            }
         }
         else {
            sb.append(array[i]);
         }
      }
   }
   sb.append(']');
   return sb.toString();
};
jv_Arrays_c.deepToStringImplContains = function (origArrays, array)  {
   jv_Arrays_c._clInit();
   if (origArrays === null || origArrays.length === 0) {
      return false;
   }
   {
      var _lv = origArrays;
      for (var _i = 0; _i < _lv.length; _i++) {
         var element = origArrays[_i];
         if (element === array) {
            return true;
         }
      }
   }
   return false;
};

jv_Arrays_c._clInit = function() {
   if (jv_Arrays_c.hasOwnProperty("_clInited")) return;
   jv_Arrays_c._clInited = true;
   
      jv_Arrays_c.SIMPLE_LENGTH = 7;
      ;
};


// Generated JS from Java: java.util.Arrays.ArrayList -----
function jv_Arrays_ArrayList(storage) {

   jv_Arrays_ArrayList_c._clInit();
   this.a = null;

   jv_AbstractList.call(this);
   this._jv_Arrays_ArrayListInit();
   if (storage === null) {
      throw new jv_NullPointerException();
   }
   this.a = storage;
}

var jv_Arrays_ArrayList_c = sc_newInnerClass("java.util.Arrays.ArrayList", jv_Arrays_ArrayList, jv_Arrays, jv_AbstractList, [jv_List,jv_EmptyInterface,jv_RandomAccess]);

jv_Arrays_ArrayList_c.contains = function (object)  {
   if (object !== null) {
      {
         var _lv = this.a;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = this.a[_i];
            if (object.equals(element)) {
               return true;
            }
         }
      }
   }
   else {
      {
         var _lv = this.a;
         for (var _i = 0; _i < _lv.length; _i++) {
            var element = this.a[_i];
            if (element === null) {
               return true;
            }
         }
      }
   }
   return false;
};
jv_Arrays_ArrayList_c.size = function ()  {
   return this.a.length;
};
jv_Arrays_ArrayList_c.toArray = function () /* overloaded */ {
   if (arguments.length == 0) {
      return this.a.clone();
   }
   else if (arguments.length == 1) {
      var contents = arguments[0];
      var size = this.size();
      if (size > contents.length) {
         var ct = contents.getClass().getComponentType();
         contents = (jv_Array_c.newInstance(ct, size));
      }
      jv_System_c.arraycopy(this.a, 0, contents, 0, size);
      if (size < contents.length) {
         contents[size] = null;
      }
      return contents;
   }
   else sc_noMeth("toArray");
};
jv_Arrays_ArrayList_c.get = function (location)  {
   try {
      return this.a[location];
   }
   catch(e) {
      if ((e instanceof jv_ArrayIndexOutOfBoundsException)) {
      throw new jv_IndexOutOfBoundsException();
      }
      else
         throw e;
   }
};
jv_Arrays_ArrayList_c.indexOf = function (object)  {
   if (object !== null) {
      for (var i = 0; i < this.a.length; i++) {
         if (object.equals(this.a[i])) {
            return i;
         }
      }
   }
   else {
      for (var i = 0; i < this.a.length; i++) {
         if (this.a[i] === null) {
            return i;
         }
      }
   }
   return -1;
};
jv_Arrays_ArrayList_c.lastIndexOf = function (object)  {
   if (object !== null) {
      for (var i = this.a.length - 1; i >= 0; i--) {
         if (object.equals(this.a[i])) {
            return i;
         }
      }
   }
   else {
      for (var i = this.a.length - 1; i >= 0; i--) {
         if (this.a[i] === null) {
            return i;
         }
      }
   }
   return -1;
};
jv_Arrays_ArrayList_c.set = function (location, object)  {
   try {
      var result = this.a[location];
      this.a[location] = object;
      return result;
   }
   catch(e) {
      if ((e instanceof jv_ArrayIndexOutOfBoundsException)) {
      throw new jv_IndexOutOfBoundsException();
      }
      else
      if ((e instanceof jv_ArrayStoreException)) {
      throw new jv_ClassCastException();
      }
   }
};

jv_Arrays_ArrayList_c._jv_Arrays_ArrayListInit = function() {
};
jv_Arrays_ArrayList_c._clInit = function() {
   if (jv_Arrays_ArrayList_c.hasOwnProperty("_clInited")) return;
   jv_Arrays_ArrayList_c._clInited = true;
   
         jv_Arrays_ArrayList_c.serialVersionUID = -2764017481108945198;
         ;
};


// Generated JS from Java: java.lang.CloneNotSupportedException -----
function jv_CloneNotSupportedException() {

   jv_CloneNotSupportedException_c._clInit();

   if (arguments.length == 0) {
      jv_Exception.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_Exception.call(this, detailMessage);
   }}

var jv_CloneNotSupportedException_c = sc_newClass("java.lang.CloneNotSupportedException", jv_CloneNotSupportedException, jv_Exception, null);


jv_CloneNotSupportedException_c._clInit = function() {
   if (jv_CloneNotSupportedException_c.hasOwnProperty("_clInited")) return;
   jv_CloneNotSupportedException_c._clInited = true;
   
      jv_CloneNotSupportedException_c.serialVersionUID = 5195511250079656443;
      ;
};


// Generated JS from Java: java.lang.ClassNotFoundException -----
function jv_ClassNotFoundException() {

   jv_ClassNotFoundException_c._clInit();
   this.ex = null;

   if (arguments.length == 0) {
      jv_Exception.call(this, (null));
   this._jv_ClassNotFoundExceptionInit();
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_Exception.call(this, detailMessage, null);
   this._jv_ClassNotFoundExceptionInit();
   }
   else if (arguments.length == 2) {
      var detailMessage = arguments[0];
      var exception = arguments[1];
      jv_Exception.call(this, detailMessage);
   this._jv_ClassNotFoundExceptionInit();
      this.ex = exception;
   }}

var jv_ClassNotFoundException_c = sc_newClass("java.lang.ClassNotFoundException", jv_ClassNotFoundException, jv_Exception, null);

jv_ClassNotFoundException_c.getCause = function ()  {
   return this.ex;
};
jv_ClassNotFoundException_c.getException = function ()  {
   return this.ex;
};

jv_ClassNotFoundException_c._jv_ClassNotFoundExceptionInit = function() {
};
jv_ClassNotFoundException_c._clInit = function() {
   if (jv_ClassNotFoundException_c.hasOwnProperty("_clInited")) return;
   jv_ClassNotFoundException_c._clInited = true;
   
      jv_ClassNotFoundException_c.serialVersionUID = 9176873029745254542;
      ;
};


// Generated JS from Java: java.util.Comparator -----
function jv_Comparator() {
}

var jv_Comparator_c = sc_newClass("java.util.Comparator", jv_Comparator, null, null);



// Generated JS from Java: java.lang.NullPointerException -----
function jv_NullPointerException() {

   jv_NullPointerException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }}

var jv_NullPointerException_c = sc_newClass("java.lang.NullPointerException", jv_NullPointerException, jv_RuntimeException, null);


jv_NullPointerException_c._clInit = function() {
   if (jv_NullPointerException_c.hasOwnProperty("_clInited")) return;
   jv_NullPointerException_c._clInited = true;
   
      jv_NullPointerException_c.serialVersionUID = 5162710183389028792;
      ;
};


// Generated JS from Java: java.lang.ArrayIndexOutOfBoundsException -----
function jv_ArrayIndexOutOfBoundsException() {

   jv_ArrayIndexOutOfBoundsException_c._clInit();

   if (arguments.length == 0) {
      jv_IndexOutOfBoundsException.call(this);
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var index = arguments[0];
         jv_IndexOutOfBoundsException.call(this, ai_Messages_c.getString("luni.36", index));
}else if (sc_paramType(arguments[0], String)) { 
         var detailMessage = arguments[0];
         jv_IndexOutOfBoundsException.call(this, detailMessage);
}   }}

var jv_ArrayIndexOutOfBoundsException_c = sc_newClass("java.lang.ArrayIndexOutOfBoundsException", jv_ArrayIndexOutOfBoundsException, jv_IndexOutOfBoundsException, null);


jv_ArrayIndexOutOfBoundsException_c._clInit = function() {
   if (jv_ArrayIndexOutOfBoundsException_c.hasOwnProperty("_clInited")) return;
   jv_ArrayIndexOutOfBoundsException_c._clInited = true;
   
      jv_ArrayIndexOutOfBoundsException_c.serialVersionUID = -5116101128118950844;
      ;
};


// Generated JS from Java: java.lang.ArrayStoreException -----
function jv_ArrayStoreException() {

   jv_ArrayStoreException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }}

var jv_ArrayStoreException_c = sc_newClass("java.lang.ArrayStoreException", jv_ArrayStoreException, jv_RuntimeException, null);


jv_ArrayStoreException_c._clInit = function() {
   if (jv_ArrayStoreException_c.hasOwnProperty("_clInited")) return;
   jv_ArrayStoreException_c._clInited = true;
   
      jv_ArrayStoreException_c.serialVersionUID = -4522193890499838241;
      ;
};


// Generated JS from Java: java.lang.ClassCastException -----
function jv_ClassCastException() {

   jv_ClassCastException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }
   else if (arguments.length == 2) {
      var instanceClass = arguments[0];
      var castClass = arguments[1];
      jv_RuntimeException.call(this,
              ai_Messages_c.getString("luni.4B", instanceClass.getName(), castClass.getName()));
   }}

var jv_ClassCastException_c = sc_newClass("java.lang.ClassCastException", jv_ClassCastException, jv_RuntimeException, null);


jv_ClassCastException_c._clInit = function() {
   if (jv_ClassCastException_c.hasOwnProperty("_clInited")) return;
   jv_ClassCastException_c._clInited = true;
   
      jv_ClassCastException_c.serialVersionUID = -9223365651070458532;
      ;
};


// Generated JS from Java: java.lang.AssertionError -----
function jv_AssertionError() {

   jv_AssertionError_c._clInit();

   if (arguments.length == 0) {
      Error.call(this);
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Boolean)) { 
         var detailMessage = arguments[0];
         jv_AssertionError.call(this, String_c._valueOf(detailMessage));
}else if (sc_instanceOf(arguments[0], Number)) { 
         var detailMessage = arguments[0];
         jv_AssertionError.call(this, Number_c.toString(detailMessage));
}else if (sc_instanceOf(arguments[0], Number)) { 
         var detailMessage = arguments[0];
         jv_AssertionError.call(this, Number_c.toString(detailMessage));
}else if (sc_instanceOf(arguments[0], Number)) { 
         var detailMessage = arguments[0];
         jv_AssertionError.call(this, Number_c.toString(detailMessage));
}else if (sc_instanceOf(arguments[0], Number)) { 
         var detailMessage = arguments[0];
         jv_AssertionError.call(this, Number_c.toString(detailMessage));
}else if (sc_paramType(arguments[0], jv_Object)) { 
         var detailMessage = arguments[0];
         Error.call(this, String_c._valueOf(detailMessage),
                 ((detailMessage instanceof Error) ? (detailMessage) : null));
}   }}

var jv_AssertionError_c = sc_newClass("java.lang.AssertionError", jv_AssertionError, Error, null);


jv_AssertionError_c._clInit = function() {
   if (jv_AssertionError_c.hasOwnProperty("_clInited")) return;
   jv_AssertionError_c._clInited = true;
   
      jv_AssertionError_c.serialVersionUID = -5013299493970297370;
      ;
};


// Generated JS from Java: java.util.Map -----
function jv_Map() {
}

var jv_Map_c = sc_newClass("java.util.Map", jv_Map, null, null);



// Generated JS from Java: java.util.Map.Entry -----
function jv_Map_Entry() {
}

var jv_Map_Entry_c = sc_newInnerClass("java.util.Map.Entry", jv_Map_Entry, jv_Map, null, null);



// Generated JS from Java: java.util.Set -----
function jv_Set() {
}

var jv_Set_c = sc_newClass("java.util.Set", jv_Set, null, [jv_Collection]);



// Generated JS from Java: java.util.AbstractSet -----
function jv_AbstractSet() {

   jv_AbstractCollection.call(this);
}

var jv_AbstractSet_c = sc_newClass("java.util.AbstractSet", jv_AbstractSet, jv_AbstractCollection, [jv_Set]);

jv_AbstractSet_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_Set)) {
      var s = (object);
      try {
         return this.size() === s.size() && this.containsAll(s);
      }
      catch(ignored) {
         if ((ignored instanceof jv_NullPointerException)) {
         return false;
         }
         else
         if ((ignored instanceof jv_ClassCastException)) {
         return false;
         }
      }
   }
   return false;
};
jv_AbstractSet_c.hashCode = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.hashCode.apply(this, arguments);
   }
   var result = 0;
   var it = this.iterator();
   while (it.hasNext()) {
      var next = it.next();
      result += next === null ? 0 : next.hashCode();
   }
   return result;
};
jv_AbstractSet_c.removeAll = function (collection)  {
   var result = false;
   if (this.size() <= collection.size()) {
      var it = this.iterator();
      while (it.hasNext()) {
         if (collection.contains(it.next())) {
            it.remove();
            result = true;
         }
      }
   }
   else {
      var it = collection.iterator();
      while (it.hasNext()) {
         result = this.remove(it.next()) || result;
      }
   }
   return result;
};


// Generated JS from Java: java.util.AbstractMap -----
function jv_AbstractMap() {
   this._keySet = null;
   this.valuesCollection = null;

   jv_Object.call(this);
   this._jv_AbstractMapInit();
}

var jv_AbstractMap_c = sc_newClass("java.util.AbstractMap", jv_AbstractMap, jv_Object, [jv_Map]);

jv_AbstractMap_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_Map)) {
      var map = (object);
      if (this.size() !== map.size()) {
         return false;
      }
      try {
         for (var _i = this.entrySet().iterator(); _i.hasNext();) {
            var entry = _i.next();
            var key = entry.getKey();
            var mine = entry.getValue();
            var theirs = map.get(key);
            if (mine === null) {
               if (theirs !== null || !map.containsKey(key)) {
                  return false;
               }
            }
            else
            if (!mine.equals(theirs)) {
               return false;
            }
         }
      }
      catch(ignored) {
         if ((ignored instanceof jv_NullPointerException)) {
         return false;
         }
         else
         if ((ignored instanceof jv_ClassCastException)) {
         return false;
         }
      }
      return true;
   }
   return false;
};
jv_AbstractMap_c.toString = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.toString.apply(this, arguments);
   }
   if (this.isEmpty()) {
      return "{}";
   }
   var buffer = new jv_StringBuilder(this.size() * 28);
   buffer.append('{');
   var it = this.entrySet().iterator();
   while (it.hasNext()) {
      var entry = it.next();
      var key = entry.getKey();
      if (key !== this) {
         buffer.append(key);
      }
      else {
         buffer.append("(this Map)");
      }
      buffer.append('=');
      var value = entry.getValue();
      if (value !== this) {
         buffer.append(value);
      }
      else {
         buffer.append("(this Map)");
      }
      if (it.hasNext()) {
         buffer.append(", ");
      }
   }
   buffer.append('}');
   return buffer.toString();
};
jv_AbstractMap_c.hashCode = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.hashCode.apply(this, arguments);
   }
   var result = 0;
   var it = this.entrySet().iterator();
   while (it.hasNext()) {
      result += it.next().hashCode();
   }
   return result;
};
jv_AbstractMap_c.clone = function ()  {
   var result = (jv_Object_c.clone.call(this));
   result._keySet = null;
   result.valuesCollection = null;
   return result;
};
jv_AbstractMap_c.clear = function ()  {
   this.entrySet().clear();
};
jv_AbstractMap_c.containsKey = function (key)  {
   var it = this.entrySet().iterator();
   if (key !== null) {
      while (it.hasNext()) {
         if (key.equals(it.next().getKey())) {
            return true;
         }
      }
   }
   else {
      while (it.hasNext()) {
         if (it.next().getKey() === null) {
            return true;
         }
      }
   }
   return false;
};
jv_AbstractMap_c.containsValue = function (value)  {
   var it = this.entrySet().iterator();
   if (value !== null) {
      while (it.hasNext()) {
         if (value.equals(it.next().getValue())) {
            return true;
         }
      }
   }
   else {
      while (it.hasNext()) {
         if (it.next().getValue() === null) {
            return true;
         }
      }
   }
   return false;
};
jv_AbstractMap_c.get = function (key)  {
   var it = this.entrySet().iterator();
   if (key !== null) {
      while (it.hasNext()) {
         var entry = it.next();
         if (key.equals(entry.getKey())) {
            return entry.getValue();
         }
      }
   }
   else {
      while (it.hasNext()) {
         var entry = it.next();
         if (entry.getKey() === null) {
            return entry.getValue();
         }
      }
   }
   return null;
};
jv_AbstractMap_c.isEmpty = function ()  {
   return this.size() === 0;
};
jv_AbstractMap_c.keySet = function ()  {
   if (this._keySet === null) {
      this._keySet = new jv_AbstractMap___Anon1(this);
   }
   return this._keySet;
};
jv_AbstractMap_c.put = function (key, value)  {
   throw new jv_UnsupportedOperationException();
};
jv_AbstractMap_c.putAll = function (map)  {
   for (var _i = map.entrySet().iterator(); _i.hasNext();) {
      var entry = _i.next();
      this.put(entry.getKey(), entry.getValue());
   }
};
jv_AbstractMap_c.remove = function (key)  {
   var it = this.entrySet().iterator();
   if (key !== null) {
      while (it.hasNext()) {
         var entry = it.next();
         if (key.equals(entry.getKey())) {
            it.remove();
            return entry.getValue();
         }
      }
   }
   else {
      while (it.hasNext()) {
         var entry = it.next();
         if (entry.getKey() === null) {
            it.remove();
            return entry.getValue();
         }
      }
   }
   return null;
};
jv_AbstractMap_c.size = function ()  {
   return this.entrySet().size();
};
jv_AbstractMap_c.values = function ()  {
   if (this.valuesCollection === null) {
      this.valuesCollection = new jv_AbstractMap___Anon2(this);
   }
   return this.valuesCollection;
};

jv_AbstractMap_c._jv_AbstractMapInit = function() {
};

// Generated JS from Java: java.util.AbstractMap.__Anon1 -----
function jv_AbstractMap___Anon1(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractSet.call(this);
}

var jv_AbstractMap___Anon1_c = sc_newInnerClass("java.util.AbstractMap.__Anon1", jv_AbstractMap___Anon1, jv_AbstractMap, jv_AbstractSet, null);

jv_AbstractMap___Anon1_c.contains = function (object)  {
   return this._outer1.containsKey(object);
};
jv_AbstractMap___Anon1_c.iterator = function ()  {
   return new jv_AbstractMap___Anon1___Anon1(this);
};
jv_AbstractMap___Anon1_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.AbstractMap.__Anon1.__Anon1 -----
function jv_AbstractMap___Anon1___Anon1(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   this.setIterator = null;
   jv_Object.call(this);
   this._jv_AbstractMap___Anon1___Anon1Init();
}

var jv_AbstractMap___Anon1___Anon1_c = sc_newInnerClass("java.util.AbstractMap.__Anon1.__Anon1", jv_AbstractMap___Anon1___Anon1, jv_AbstractMap___Anon1, jv_Object, [jv_Iterator]);

jv_AbstractMap___Anon1___Anon1_c.hasNext = function ()  {
   return this.setIterator.hasNext();
};
jv_AbstractMap___Anon1___Anon1_c.next = function ()  {
   return this.setIterator.next().getKey();
};
jv_AbstractMap___Anon1___Anon1_c.remove = function ()  {
   this.setIterator.remove();
};

jv_AbstractMap___Anon1___Anon1_c._jv_AbstractMap___Anon1___Anon1Init = function() {
   this.setIterator = this._outer2._outer1.entrySet().iterator();
            ;
};

// Generated JS from Java: java.util.AbstractMap.__Anon1.__Anon2 -----
function jv_AbstractMap___Anon1___Anon2(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   this.setIterator = null;
   jv_Object.call(this);
   this._jv_AbstractMap___Anon1___Anon2Init();
}

var jv_AbstractMap___Anon1___Anon2_c = sc_newInnerClass("java.util.AbstractMap.__Anon1.__Anon2", jv_AbstractMap___Anon1___Anon2, jv_AbstractMap___Anon1, jv_Object, [jv_Iterator]);

jv_AbstractMap___Anon1___Anon2_c.hasNext = function ()  {
   return this.setIterator.hasNext();
};
jv_AbstractMap___Anon1___Anon2_c.next = function ()  {
   return this.setIterator.next().getKey();
};
jv_AbstractMap___Anon1___Anon2_c.remove = function ()  {
   this.setIterator.remove();
};

jv_AbstractMap___Anon1___Anon2_c._jv_AbstractMap___Anon1___Anon2Init = function() {
   this.setIterator = this._outer2._outer1.entrySet().iterator();
            ;
};

// Generated JS from Java: java.util.AbstractMap.__Anon2 -----
function jv_AbstractMap___Anon2(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractCollection.call(this);
}

var jv_AbstractMap___Anon2_c = sc_newInnerClass("java.util.AbstractMap.__Anon2", jv_AbstractMap___Anon2, jv_AbstractMap, jv_AbstractCollection, null);

jv_AbstractMap___Anon2_c.contains = function (object)  {
   return this._outer1.containsValue(object);
};
jv_AbstractMap___Anon2_c.iterator = function ()  {
   return new jv_AbstractMap___Anon2___Anon1(this);
};
jv_AbstractMap___Anon2_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.AbstractMap.__Anon2.__Anon1 -----
function jv_AbstractMap___Anon2___Anon1(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   this.setIterator = null;
   jv_Object.call(this);
   this._jv_AbstractMap___Anon2___Anon1Init();
}

var jv_AbstractMap___Anon2___Anon1_c = sc_newInnerClass("java.util.AbstractMap.__Anon2.__Anon1", jv_AbstractMap___Anon2___Anon1, jv_AbstractMap___Anon2, jv_Object, [jv_Iterator]);

jv_AbstractMap___Anon2___Anon1_c.hasNext = function ()  {
   return this.setIterator.hasNext();
};
jv_AbstractMap___Anon2___Anon1_c.next = function ()  {
   return this.setIterator.next().getValue();
};
jv_AbstractMap___Anon2___Anon1_c.remove = function ()  {
   this.setIterator.remove();
};

jv_AbstractMap___Anon2___Anon1_c._jv_AbstractMap___Anon2___Anon1Init = function() {
   this.setIterator = this._outer2._outer1.entrySet().iterator();
            ;
};

// Generated JS from Java: java.util.AbstractMap.__Anon2.__Anon2 -----
function jv_AbstractMap___Anon2___Anon2(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   this.setIterator = null;
   jv_Object.call(this);
   this._jv_AbstractMap___Anon2___Anon2Init();
}

var jv_AbstractMap___Anon2___Anon2_c = sc_newInnerClass("java.util.AbstractMap.__Anon2.__Anon2", jv_AbstractMap___Anon2___Anon2, jv_AbstractMap___Anon2, jv_Object, [jv_Iterator]);

jv_AbstractMap___Anon2___Anon2_c.hasNext = function ()  {
   return this.setIterator.hasNext();
};
jv_AbstractMap___Anon2___Anon2_c.next = function ()  {
   return this.setIterator.next().getValue();
};
jv_AbstractMap___Anon2___Anon2_c.remove = function ()  {
   this.setIterator.remove();
};

jv_AbstractMap___Anon2___Anon2_c._jv_AbstractMap___Anon2___Anon2Init = function() {
   this.setIterator = this._outer2._outer1.entrySet().iterator();
            ;
};

// Generated JS from Java: java.util.MapEntry -----
function jv_MapEntry() {
   this.key = null;
   this.value = null;

   if (arguments.length == 1) {
      var theKey = arguments[0];
      jv_Object.call(this);
   this._jv_MapEntryInit();
      this.key = theKey;
   }
   else if (arguments.length == 2) {
      var theKey = arguments[0];
      var theValue = arguments[1];
      jv_Object.call(this);
   this._jv_MapEntryInit();
      this.key = theKey;
      this.value = theValue;
   }}

var jv_MapEntry_c = sc_newClass("java.util.MapEntry", jv_MapEntry, jv_Object, [jv_Map_Entry,jv_Cloneable]);

jv_MapEntry_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var entry = (object);
      return(this.key === null ? entry.getKey() === null : this.key.equals(entry.getKey())) && (this.value === null ? entry.getValue() === null : this.value.equals(entry.getValue()));
   }
   return false;
};
jv_MapEntry_c.toString = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.toString.apply(this, arguments);
   }
   return this.key + "=" + this.value;
};
jv_MapEntry_c.hashCode = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.hashCode.apply(this, arguments);
   }
   return(this.key === null ? 0 : this.key.hashCode()) ^ (this.value === null ? 0 : this.value.hashCode());
};
jv_MapEntry_c.clone = function ()  {
   try {
      return jv_Object_c.clone.call(this);
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_MapEntry_c.getKey = function ()  {
   return this.key;
};
jv_MapEntry_c.getValue = function ()  {
   return this.value;
};
jv_MapEntry_c.setValue = function (object)  {
   var result = this.value;
   this.value = object;
   return result;
};

jv_MapEntry_c._jv_MapEntryInit = function() {
};

// Generated JS from Java: java.util.MapEntry.Type -----
function jv_MapEntry_Type(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
}

var jv_MapEntry_Type_c = sc_newInnerClass("java.util.MapEntry.Type", jv_MapEntry_Type, jv_MapEntry, null, null);



// Generated JS from Java: java.util.HashMap -----
function jv_HashMap() {

   jv_HashMap_c._clInit();
   this.elementCount = 0;
   this.elementData = null;
   this.modCount = 0;
   this.loadFactor = 0.0;
   this.threshold = 0;

   if (arguments.length == 0) {
      jv_HashMap.call(this, jv_HashMap_c.DEFAULT_SIZE);
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var capacity = arguments[0];
         jv_HashMap.call(this, capacity, 0.75);
}else if (sc_paramType(arguments[0], jv_Map)) { 
         var map = arguments[0];
         jv_HashMap.call(this, jv_HashMap_c.calculateCapacity(map.size()));
         this.putAllImpl(map);
}   }
   else if (arguments.length == 2) {
      var capacity = arguments[0];
      var loadFactor = arguments[1];
      jv_AbstractMap.call(this);
   this._jv_HashMapInit();
      if (capacity >= 0 && loadFactor > 0) {
         capacity = jv_HashMap_c.calculateCapacity(capacity);
         this.elementCount = 0;
         this.elementData = this.newElementArray(capacity);
         this.loadFactor = loadFactor;
         this.computeThreshold();
      }
      else {
         throw new jv_IllegalArgumentException();
      }
   }}

var jv_HashMap_c = sc_newClass("java.util.HashMap", jv_HashMap, jv_AbstractMap, [jv_Map,jv_Cloneable,jv_EmptyInterface]);

jv_HashMap_c.clone = function ()  {
   try {
      var map = (jv_AbstractMap_c.clone.call(this));
      map.elementCount = 0;
      map.elementData = this.newElementArray(this.elementData.length);
      map.putAll(this);
      return map;
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_HashMap_c.clear = function ()  {
   if (this.elementCount > 0) {
      this.elementCount = 0;
      jv_Arrays_c.fill(this.elementData, null);
      this.modCount++;
   }
};
jv_HashMap_c.containsKey = function (key)  {
   var m = this.getEntry(key);
   return m !== null;
};
jv_HashMap_c.containsValue = function (value)  {
   if (value !== null) {
      for (var i = 0; i < this.elementData.length; i++) {
         var entry = this.elementData[i];
         while (entry !== null) {
            if (jv_HashMap_c.areEqualValues(value, entry.value)) {
               return true;
            }
            entry = entry.next;
         }
      }
   }
   else {
      for (var i = 0; i < this.elementData.length; i++) {
         var entry = this.elementData[i];
         while (entry !== null) {
            if (entry.value === null) {
               return true;
            }
            entry = entry.next;
         }
      }
   }
   return false;
};
jv_HashMap_c.entrySet = function ()  {
   return new jv_HashMap_HashMapEntrySet(this);
};
jv_HashMap_c.get = function (key)  {
   var m = this.getEntry(key);
   if (m !== null) {
      return m.value;
   }
   return null;
};
jv_HashMap_c.isEmpty = function ()  {
   return this.elementCount === 0;
};
jv_HashMap_c.keySet = function ()  {
   if (this._keySet === null) {
      this._keySet = new jv_HashMap___Anon1(this);
   }
   return this._keySet;
};
jv_HashMap_c.put = function (key, value)  {
   return this.putImpl(key, value);
};
jv_HashMap_c.putAll = function (map)  {
   if (!map.isEmpty()) {
      this.putAllImpl(map);
   }
};
jv_HashMap_c.remove = function (key)  {
   var entry = this.removeEntry(key);
   if (entry !== null) {
      return entry.value;
   }
   return null;
};
jv_HashMap_c.size = function ()  {
   return this.elementCount;
};
jv_HashMap_c.values = function ()  {
   if (this.valuesCollection === null) {
      this.valuesCollection = new jv_HashMap___Anon2(this);
   }
   return this.valuesCollection;
};
jv_HashMap_c.newElementArray = function (s)  {
   return sc_newArray(jv_HashMap_Entry_c, s);
};
jv_HashMap_c.calculateCapacity = function (x)  {
   jv_HashMap_c._clInit();
   if (x >= 1 << 30) {
      return 1 << 30;
   }
   if (x === 0) {
      return 16;
   }
   x = x - 1;
   x |= x >> 1;
   x |= x >> 2;
   x |= x >> 4;
   x |= x >> 8;
   x |= x >> 16;
   return x + 1;
};
jv_HashMap_c.computeThreshold = function ()  {
   this.threshold = Math.floor((this.elementData.length * this.loadFactor));
};
jv_HashMap_c.getEntry = function (key)  {
   if (arguments.length == 0) return;
   var m;
   if (key === null) {
      m = this.findNullKeyEntry();
   }
   else {
      var hash = jv_HashMap_c.computeHashCode(key);
      var index = hash & (this.elementData.length - 1);
      m = this.findNonNullKeyEntry(key, index, hash);
   }
   return m;
};
jv_HashMap_c.findNonNullKeyEntry = function (key, index, keyHash)  {
   var m = this.elementData[index];
   while (m !== null && (m.origKeyHash !== keyHash || !jv_HashMap_c.areEqualKeys(key, m.key))) {
      m = m.next;
   }
   return m;
};
jv_HashMap_c.findNullKeyEntry = function ()  {
   var m = this.elementData[0];
   while (m !== null && m.key !== null) m = m.next;
   return m;
};
jv_HashMap_c.putImpl = function (key, value)  {
   var entry;
   if (key === null) {
      entry = this.findNullKeyEntry();
      if (entry === null) {
         this.modCount++;
         entry = this.createHashedEntry(null, 0, 0);
         if (++this.elementCount > this.threshold) {
            this.rehash();
         }
      }
   }
   else {
      var hash = jv_HashMap_c.computeHashCode(key);
      var index = hash & (this.elementData.length - 1);
      entry = this.findNonNullKeyEntry(key, index, hash);
      if (entry === null) {
         this.modCount++;
         entry = this.createHashedEntry(key, index, hash);
         if (++this.elementCount > this.threshold) {
            this.rehash();
         }
      }
   }
   var result = entry.value;
   entry.value = value;
   return result;
};
jv_HashMap_c.createEntry = function (key, index, value)  {
   var entry = new jv_HashMap_Entry(key, value);
   entry.next = this.elementData[index];
   this.elementData[index] = entry;
   return entry;
};
jv_HashMap_c.createHashedEntry = function (key, index, hash)  {
   var entry = new jv_HashMap_Entry(key, hash);
   entry.next = this.elementData[index];
   this.elementData[index] = entry;
   return entry;
};
jv_HashMap_c.putAllImpl = function (map)  {
   var capacity = this.elementCount + map.size();
   if (capacity > this.threshold) {
      this.rehash(capacity);
   }
   for (var _i = map.entrySet().iterator(); _i.hasNext();) {
      var entry = _i.next();
      this.putImpl(entry.getKey(), entry.getValue());
   }
};
jv_HashMap_c.rehash = function () /* overloaded */ {
   if (arguments.length == 1) {
      var capacity = arguments[0];
      var length = jv_HashMap_c.calculateCapacity((capacity === 0 ? 1 : capacity << 1));
      var newData = this.newElementArray(length);
      for (var i = 0; i < this.elementData.length; i++) {
         var entry = this.elementData[i];
         this.elementData[i] = null;
         while (entry !== null) {
            var index = entry.origKeyHash & (length - 1);
            var next = entry.next;
            entry.next = newData[index];
            newData[index] = entry;
            entry = next;
         }
      }
      this.elementData = newData;
      this.computeThreshold();
   }
   else if (arguments.length == 0) {
      this.rehash(this.elementData.length);
   }
   else sc_noMeth("rehash");
};
jv_HashMap_c.removeEntry = function () /* overloaded */ {
      if (sc_paramType(arguments[0], jv_HashMap_Entry)) { 
      var entry = arguments[0];
      var index = entry.origKeyHash & (this.elementData.length - 1);
      var m = this.elementData[index];
      if (m === entry) {
         this.elementData[index] = entry.next;
      }
      else {
         while (m.next !== entry) {
            m = m.next;
         }
         m.next = entry.next;
      }
      this.modCount++;
      this.elementCount--;
}
      else if (sc_paramType(arguments[0], jv_Object)) { 
      var key = arguments[0];
      var index = 0;
      var entry;
      var last = null;
      if (key !== null) {
         var hash = jv_HashMap_c.computeHashCode(key);
         index = hash & (this.elementData.length - 1);
         entry = this.elementData[index];
         while (entry !== null && !(entry.origKeyHash === hash && jv_HashMap_c.areEqualKeys(key, entry.key))) {
            last = entry;
            entry = entry.next;
         }
      }
      else {
         entry = this.elementData[0];
         while (entry !== null && entry.key !== null) {
            last = entry;
            entry = entry.next;
         }
      }
      if (entry === null) {
         return null;
      }
      if (last === null) {
         this.elementData[index] = entry.next;
      }
      else {
         last.next = entry.next;
      }
      this.modCount++;
      this.elementCount--;
      return entry;
}};
jv_HashMap_c.writeObject = function (stream)  {
   stream.defaultWriteObject();
   stream.writeInt(this.elementData.length);
   stream.writeInt(this.elementCount);
   var iterator = this.entrySet().iterator();
   while (iterator.hasNext()) {
      var entry = (iterator.next());
      stream.writeObject(entry.key);
      stream.writeObject(entry.value);
      entry = entry.next;
   }
};
jv_HashMap_c.readObject = function (stream)  {
   stream.defaultReadObject();
   var length = stream.readInt();
   this.elementData = this.newElementArray(length);
   this.elementCount = stream.readInt();
   for (var i = this.elementCount; --i >= 0;) {
      var key = (stream.readObject());
      var index = (null === key) ? 0 : (jv_HashMap_c.computeHashCode(key) & (length - 1));
      this.createEntry(key, index, (stream.readObject()));
   }
};
jv_HashMap_c.computeHashCode = function (key)  {
   jv_HashMap_c._clInit();
   return key.hashCode();
};
jv_HashMap_c.areEqualKeys = function (key1, key2)  {
   jv_HashMap_c._clInit();
   return(key1 === key2) || key1.equals(key2);
};
jv_HashMap_c.areEqualValues = function (value1, value2)  {
   jv_HashMap_c._clInit();
   return(value1 === value2) || value1.equals(value2);
};

jv_HashMap_c._jv_HashMapInit = function() {
   this.modCount = 0;
      ;
};
jv_HashMap_c._clInit = function() {
   if (jv_HashMap_c.hasOwnProperty("_clInited")) return;
   jv_HashMap_c._clInited = true;
   
      jv_HashMap_c.serialVersionUID = 362498820763181265;
      ;
      jv_HashMap_c.DEFAULT_SIZE = 16;
      ;
};


// Generated JS from Java: java.util.HashMap.Entry -----
function jv_HashMap_Entry() {
   this.origKeyHash = 0;
   this.next = null;

      if (sc_paramType(arguments[0], jv_Object) && sc_instanceOf(arguments[1], Number)) { 
      var theKey = arguments[0];
      var hash = arguments[1];
      jv_MapEntry.call(this, theKey, null);
   this._jv_HashMap_EntryInit();
      this.origKeyHash = hash;
}
      else if (sc_paramType(arguments[0], jv_Object) && sc_paramType(arguments[1], jv_Object)) { 
      var theKey = arguments[0];
      var theValue = arguments[1];
      jv_MapEntry.call(this, theKey, theValue);
   this._jv_HashMap_EntryInit();
      this.origKeyHash = (theKey === null ? 0 : sc_clInit(jv_HashMap_c).computeHashCode(theKey));
}}

var jv_HashMap_Entry_c = sc_newInnerClass("java.util.HashMap.Entry", jv_HashMap_Entry, jv_HashMap, jv_MapEntry, null);

jv_HashMap_Entry_c.clone = function ()  {
   var entry = (jv_MapEntry_c.clone.call(this));
   if (this.next !== null) {
      entry.next = (this.next.clone());
   }
   return entry;
};

jv_HashMap_Entry_c._jv_HashMap_EntryInit = function() {
};

// Generated JS from Java: java.util.HashMap.AbstractMapIterator -----
function jv_HashMap_AbstractMapIterator(hm) {
   this.position = 0;
   this.expectedModCount = 0;
   this.futureEntry = null;
   this.currentEntry = null;
   this.prevEntry = null;
   this.associatedMap = null;

   jv_Object.call(this);
   this._jv_HashMap_AbstractMapIteratorInit();
   this.associatedMap = hm;
   this.expectedModCount = hm.modCount;
   this.futureEntry = null;
}

var jv_HashMap_AbstractMapIterator_c = sc_newInnerClass("java.util.HashMap.AbstractMapIterator", jv_HashMap_AbstractMapIterator, jv_HashMap, jv_Object, null);

jv_HashMap_AbstractMapIterator_c.hasNext = function ()  {
   if (this.futureEntry !== null) {
      return true;
   }
   while (this.position < this.associatedMap.elementData.length) {
      if (this.associatedMap.elementData[this.position] === null) {
         this.position++;
      }
      else {
         return true;
      }
   }
   return false;
};
jv_HashMap_AbstractMapIterator_c.checkConcurrentMod = function ()  {
   if (this.expectedModCount !== this.associatedMap.modCount) {
      throw new jv_ConcurrentModificationException();
   }
};
jv_HashMap_AbstractMapIterator_c.makeNext = function ()  {
   this.checkConcurrentMod();
   if (!this.hasNext()) {
      throw new jv_NoSuchElementException();
   }
   if (this.futureEntry === null) {
      this.currentEntry = this.associatedMap.elementData[this.position++];
      this.futureEntry = this.currentEntry.next;
      this.prevEntry = null;
   }
   else {
      if (this.currentEntry !== null) {
         this.prevEntry = this.currentEntry;
      }
      this.currentEntry = this.futureEntry;
      this.futureEntry = this.futureEntry.next;
   }
};
jv_HashMap_AbstractMapIterator_c.remove = function ()  {
   this.checkConcurrentMod();
   if (this.currentEntry === null) {
      throw new jv_IllegalStateException();
   }
   if (this.prevEntry === null) {
      var index = this.currentEntry.origKeyHash & (this.associatedMap.elementData.length - 1);
      this.associatedMap.elementData[index] = this.associatedMap.elementData[index].next;
   }
   else {
      this.prevEntry.next = this.currentEntry.next;
   }
   this.currentEntry = null;
   this.expectedModCount++;
   this.associatedMap.modCount++;
   this.associatedMap.elementCount--;
};

jv_HashMap_AbstractMapIterator_c._jv_HashMap_AbstractMapIteratorInit = function() {
   this.position = 0;
         ;
};

// Generated JS from Java: java.util.HashMap.EntryIterator -----
function jv_HashMap_EntryIterator(map) {

   jv_HashMap_AbstractMapIterator.call(this, map);
}

var jv_HashMap_EntryIterator_c = sc_newInnerClass("java.util.HashMap.EntryIterator", jv_HashMap_EntryIterator, jv_HashMap, jv_HashMap_AbstractMapIterator, [jv_Iterator]);

jv_HashMap_EntryIterator_c.next = function ()  {
   this.makeNext();
   return this.currentEntry;
};


// Generated JS from Java: java.util.HashMap.KeyIterator -----
function jv_HashMap_KeyIterator(map) {

   jv_HashMap_AbstractMapIterator.call(this, map);
}

var jv_HashMap_KeyIterator_c = sc_newInnerClass("java.util.HashMap.KeyIterator", jv_HashMap_KeyIterator, jv_HashMap, jv_HashMap_AbstractMapIterator, [jv_Iterator]);

jv_HashMap_KeyIterator_c.next = function ()  {
   this.makeNext();
   return this.currentEntry.key;
};


// Generated JS from Java: java.util.HashMap.ValueIterator -----
function jv_HashMap_ValueIterator(map) {

   jv_HashMap_AbstractMapIterator.call(this, map);
}

var jv_HashMap_ValueIterator_c = sc_newInnerClass("java.util.HashMap.ValueIterator", jv_HashMap_ValueIterator, jv_HashMap, jv_HashMap_AbstractMapIterator, [jv_Iterator]);

jv_HashMap_ValueIterator_c.next = function ()  {
   this.makeNext();
   return this.currentEntry.value;
};


// Generated JS from Java: java.util.HashMap.HashMapEntrySet -----
function jv_HashMap_HashMapEntrySet(hm) {
   this.associatedMap = null;

   jv_AbstractSet.call(this);
   this._jv_HashMap_HashMapEntrySetInit();
   this.associatedMap = hm;
}

var jv_HashMap_HashMapEntrySet_c = sc_newInnerClass("java.util.HashMap.HashMapEntrySet", jv_HashMap_HashMapEntrySet, jv_HashMap, jv_AbstractSet, null);

jv_HashMap_HashMapEntrySet_c.clear = function ()  {
   this.associatedMap.clear();
};
jv_HashMap_HashMapEntrySet_c.contains = function (object)  {
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var oEntry = (object);
      var entry = this.associatedMap.getEntry(oEntry.getKey());
      return jv_HashMap_HashMapEntrySet_c.valuesEq(entry, oEntry);
   }
   return false;
};
jv_HashMap_HashMapEntrySet_c.iterator = function ()  {
   return new jv_HashMap_EntryIterator(this.associatedMap);
};
jv_HashMap_HashMapEntrySet_c.remove = function (object)  {
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var oEntry = (object);
      var entry = this.associatedMap.getEntry(oEntry.getKey());
      if (jv_HashMap_HashMapEntrySet_c.valuesEq(entry, oEntry)) {
         this.associatedMap.removeEntry(entry);
         return true;
      }
   }
   return false;
};
jv_HashMap_HashMapEntrySet_c.size = function ()  {
   return this.associatedMap.elementCount;
};
jv_HashMap_HashMapEntrySet_c.hashMap = function ()  {
   return this.associatedMap;
};
jv_HashMap_HashMapEntrySet_c.valuesEq = function (entry, oEntry)  {
   return(entry !== null) && ((entry.value === null) ? (oEntry.getValue() === null) : (sc_clInit(jv_HashMap_c).areEqualValues(entry.value, oEntry.getValue())));
};

jv_HashMap_HashMapEntrySet_c._jv_HashMap_HashMapEntrySetInit = function() {
};

// Generated JS from Java: java.util.HashMap.__Anon1 -----
function jv_HashMap___Anon1(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractSet.call(this);
}

var jv_HashMap___Anon1_c = sc_newInnerClass("java.util.HashMap.__Anon1", jv_HashMap___Anon1, jv_HashMap, jv_AbstractSet, null);

jv_HashMap___Anon1_c.clear = function ()  {
   this._outer1.clear();
};
jv_HashMap___Anon1_c.contains = function (object)  {
   return this._outer1.containsKey(object);
};
jv_HashMap___Anon1_c.iterator = function ()  {
   return new jv_HashMap_KeyIterator(this._outer1);
};
jv_HashMap___Anon1_c.remove = function (key)  {
   var entry = this._outer1.removeEntry(key);
   return entry !== null;
};
jv_HashMap___Anon1_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.HashMap.__Anon2 -----
function jv_HashMap___Anon2(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractCollection.call(this);
}

var jv_HashMap___Anon2_c = sc_newInnerClass("java.util.HashMap.__Anon2", jv_HashMap___Anon2, jv_HashMap, jv_AbstractCollection, null);

jv_HashMap___Anon2_c.clear = function ()  {
   this._outer1.clear();
};
jv_HashMap___Anon2_c.contains = function (object)  {
   return this._outer1.containsValue(object);
};
jv_HashMap___Anon2_c.iterator = function ()  {
   return new jv_HashMap_ValueIterator(this._outer1);
};
jv_HashMap___Anon2_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.HashSet -----
function jv_HashSet() {

   jv_HashSet_c._clInit();
   this.backingMap = null;

   if (arguments.length == 0) {
      jv_HashSet.call(this, new jv_HashMap());
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var capacity = arguments[0];
         jv_HashSet.call(this, new jv_HashMap(capacity));
}else if (sc_paramType(arguments[0], jv_Collection)) { 
         var collection = arguments[0];
         jv_HashSet.call(this, new jv_HashMap(collection.size() < 6 ? 11 : collection.size() * 2));
         for (var _i = collection.iterator(); _i.hasNext();) {
            var e = _i.next();
            this.add(e);
         }
}else if (sc_paramType(arguments[0], jv_HashMap)) { 
         var backingMap = arguments[0];
         jv_AbstractSet.call(this);
   this._jv_HashSetInit();
         this.backingMap = backingMap;
}   }
   else if (arguments.length == 2) {
      var capacity = arguments[0];
      var loadFactor = arguments[1];
      jv_HashSet.call(this, new jv_HashMap(capacity, loadFactor));
   }}

var jv_HashSet_c = sc_newClass("java.util.HashSet", jv_HashSet, jv_AbstractSet, [jv_Set,jv_Cloneable,jv_EmptyInterface]);

jv_HashSet_c.clone = function ()  {
   try {
      var clone = (jv_Object_c.clone.call(this));
      clone.backingMap = (this.backingMap.clone());
      return clone;
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_HashSet_c.add = function (object)  {
   return this.backingMap.put(object, this) === null;
};
jv_HashSet_c.clear = function ()  {
   this.backingMap.clear();
};
jv_HashSet_c.contains = function (object)  {
   return this.backingMap.containsKey(object);
};
jv_HashSet_c.isEmpty = function ()  {
   return this.backingMap.isEmpty();
};
jv_HashSet_c.iterator = function ()  {
   return this.backingMap.keySet().iterator();
};
jv_HashSet_c.remove = function (object)  {
   return this.backingMap.remove(object) !== null;
};
jv_HashSet_c.size = function ()  {
   return this.backingMap.size();
};
jv_HashSet_c.writeObject = function (stream)  {
   stream.defaultWriteObject();
   stream.writeInt(this.backingMap.elementData.length);
   stream.writeFloat(this.backingMap.loadFactor);
   stream.writeInt(this.backingMap.elementCount);
   for (var i = this.backingMap.elementData.length; --i >= 0;) {
      var entry = this.backingMap.elementData[i];
      while (entry !== null) {
         stream.writeObject(entry.key);
         entry = entry.next;
      }
   }
};
jv_HashSet_c.readObject = function (stream)  {
   stream.defaultReadObject();
   var length = stream.readInt();
   var loadFactor = stream.readFloat();
   this.backingMap = this.createBackingMap(length, loadFactor);
   var elementCount = stream.readInt();
   for (var i = elementCount; --i >= 0;) {
      var key = (stream.readObject());
      this.backingMap.put(key, this);
   }
};
jv_HashSet_c.createBackingMap = function (capacity, loadFactor)  {
   return new jv_HashMap(capacity, loadFactor);
};

jv_HashSet_c._jv_HashSetInit = function() {
};
jv_HashSet_c._clInit = function() {
   if (jv_HashSet_c.hasOwnProperty("_clInited")) return;
   jv_HashSet_c._clInited = true;
   
      jv_HashSet_c.serialVersionUID = -5024744406713321676;
      ;
};


// Generated JS from Java: java.lang.NumberFormatException -----
function jv_NumberFormatException() {

   jv_NumberFormatException_c._clInit();

   if (arguments.length == 0) {
      jv_IllegalArgumentException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_IllegalArgumentException.call(this, detailMessage);
   }}

var jv_NumberFormatException_c = sc_newClass("java.lang.NumberFormatException", jv_NumberFormatException, jv_IllegalArgumentException, null);


jv_NumberFormatException_c._clInit = function() {
   if (jv_NumberFormatException_c.hasOwnProperty("_clInited")) return;
   jv_NumberFormatException_c._clInited = true;
   
      jv_NumberFormatException_c.serialVersionUID = -2848938806368998894;
      ;
};


// Generated JS from Java: java.util.LinkedHashMap -----
function jv_LinkedHashMap() {

   jv_LinkedHashMap_c._clInit();
   this.accessOrder = false;
   this.head = null;
 this.tail = null;

   if (arguments.length == 0) {
      jv_HashMap.call(this);
   this._jv_LinkedHashMapInit();
      this.accessOrder = false;
      this.head = null;
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var s = arguments[0];
         jv_HashMap.call(this, s);
   this._jv_LinkedHashMapInit();
         this.accessOrder = false;
         this.head = null;
}else if (sc_paramType(arguments[0], jv_Map)) { 
         var m = arguments[0];
         jv_HashMap.call(this);
   this._jv_LinkedHashMapInit();
         this.accessOrder = false;
         this.head = null;
         this.tail = null;
         this.putAll(m);
}   }
   else if (arguments.length == 2) {
      var s = arguments[0];
      var lf = arguments[1];
      jv_HashMap.call(this, s, lf);
   this._jv_LinkedHashMapInit();
      this.accessOrder = false;
      this.head = null;
      this.tail = null;
   }
   else if (arguments.length == 3) {
      var s = arguments[0];
      var lf = arguments[1];
      var order = arguments[2];
      jv_HashMap.call(this, s, lf);
   this._jv_LinkedHashMapInit();
      this.accessOrder = order;
      this.head = null;
      this.tail = null;
   }}

var jv_LinkedHashMap_c = sc_newClass("java.util.LinkedHashMap", jv_LinkedHashMap, jv_HashMap, [jv_Map]);

jv_LinkedHashMap_c.clear = function ()  {
   jv_HashMap_c.clear.call(this);
   this.head = this.tail = null;
};
jv_LinkedHashMap_c.containsValue = function (value)  {
   var entry = this.head;
   if (null === value) {
      while (null !== entry) {
         if (null === entry.value) {
            return true;
         }
         entry = entry.chainForward;
      }
   }
   else {
      while (null !== entry) {
         if (value.equals(entry.value)) {
            return true;
         }
         entry = entry.chainForward;
      }
   }
   return false;
};
jv_LinkedHashMap_c.entrySet = function ()  {
   return new jv_LinkedHashMap_LinkedHashMapEntrySet(this);
};
jv_LinkedHashMap_c.get = function (key)  {
   var m;
   if (key === null) {
      m = (this.findNullKeyEntry());
   }
   else {
      var hash = key.hashCode();
      var index = (hash & 0x7FFFFFFF) % this.elementData.length;
      m = (this.findNonNullKeyEntry(key, index, hash));
   }
   if (m === null) {
      return null;
   }
   if (this.accessOrder && this.tail !== m) {
      var p = m.chainBackward;
      var n = m.chainForward;
      n.chainBackward = p;
      if (p !== null) {
         p.chainForward = n;
      }
      else {
         this.head = n;
      }
      m.chainForward = null;
      m.chainBackward = this.tail;
      this.tail.chainForward = m;
      this.tail = m;
   }
   return m.value;
};
jv_LinkedHashMap_c.keySet = function ()  {
   if (this._keySet === null) {
      this._keySet = new jv_LinkedHashMap___Anon1(this);
   }
   return this._keySet;
};
jv_LinkedHashMap_c.put = function (key, value)  {
   var result = this.putImpl(key, value);
   if (this.removeEldestEntry(this.head)) {
      this.remove(this.head.key);
   }
   return result;
};
jv_LinkedHashMap_c.remove = function (key)  {
   var m = (this.removeEntry(key));
   if (m === null) {
      return null;
   }
   var p = m.chainBackward;
   var n = m.chainForward;
   if (p !== null) {
      p.chainForward = n;
   }
   else {
      this.head = n;
   }
   if (n !== null) {
      n.chainBackward = p;
   }
   else {
      this.tail = p;
   }
   return m.value;
};
jv_LinkedHashMap_c.values = function ()  {
   if (this.valuesCollection === null) {
      this.valuesCollection = new jv_LinkedHashMap___Anon2(this);
   }
   return this.valuesCollection;
};
jv_LinkedHashMap_c.newElementArray = function (s)  {
   return sc_newArray(jv_LinkedHashMap_LinkedHashMapEntry_c, s);
};
jv_LinkedHashMap_c.putImpl = function (key, value)  {
   var m;
   if (this.elementCount === 0) {
      this.head = this.tail = null;
   }
   if (key === null) {
      m = (this.findNullKeyEntry());
      if (m === null) {
         this.modCount++;
         if (++this.elementCount > this.threshold) {
            this.rehash();
         }
         m = (this.createHashedEntry(null, 0, 0));
      }
      else {
         this.linkEntry(m);
      }
   }
   else {
      var hash = key.hashCode();
      var index = (hash & 0x7FFFFFFF) % this.elementData.length;
      m = (this.findNonNullKeyEntry(key, index, hash));
      if (m === null) {
         this.modCount++;
         if (++this.elementCount > this.threshold) {
            this.rehash();
            index = (hash & 0x7FFFFFFF) % this.elementData.length;
         }
         m = (this.createHashedEntry(key, index, hash));
      }
      else {
         this.linkEntry(m);
      }
   }
   var result = m.value;
   m.value = value;
   return result;
};
jv_LinkedHashMap_c.createEntry = function (key, index, value)  {
   var m = new jv_LinkedHashMap_LinkedHashMapEntry(key, value);
   m.next = this.elementData[index];
   this.elementData[index] = m;
   this.linkEntry(m);
   return m;
};
jv_LinkedHashMap_c.createHashedEntry = function (key, index, hash)  {
   var m = new jv_LinkedHashMap_LinkedHashMapEntry(key, hash);
   m.next = this.elementData[index];
   this.elementData[index] = m;
   this.linkEntry(m);
   return m;
};
jv_LinkedHashMap_c.linkEntry = function (m)  {
   if (this.tail === m) {
      return;
   }
   if (this.head === null) {
      this.head = this.tail = m;
      return;
   }
   var p = m.chainBackward;
   var n = m.chainForward;
   if (p === null) {
      if (n !== null) {
         if (this.accessOrder) {
            this.head = n;
            n.chainBackward = null;
            m.chainBackward = this.tail;
            m.chainForward = null;
            this.tail.chainForward = m;
            this.tail = m;
         }
      }
      else {
         m.chainBackward = this.tail;
         m.chainForward = null;
         this.tail.chainForward = m;
         this.tail = m;
      }
      return;
   }
   if (n === null) {
      return;
   }
   if (this.accessOrder) {
      p.chainForward = n;
      n.chainBackward = p;
      m.chainForward = null;
      m.chainBackward = this.tail;
      this.tail.chainForward = m;
      this.tail = m;
   }
};
jv_LinkedHashMap_c.removeEldestEntry = function (eldest)  {
   return false;
};

jv_LinkedHashMap_c._jv_LinkedHashMapInit = function() {
};
jv_LinkedHashMap_c._clInit = function() {
   if (jv_LinkedHashMap_c.hasOwnProperty("_clInited")) return;
   jv_LinkedHashMap_c._clInited = true;
   
      jv_LinkedHashMap_c.serialVersionUID = 3801124242820219131;
      ;
};


// Generated JS from Java: java.util.LinkedHashMap.AbstractMapIterator -----
function jv_LinkedHashMap_AbstractMapIterator(map) {
   this.expectedModCount = 0;
   this.futureEntry = null;
   this.currentEntry = null;
   this.associatedMap = null;

   jv_Object.call(this);
   this._jv_LinkedHashMap_AbstractMapIteratorInit();
   this.expectedModCount = map.modCount;
   this.futureEntry = map.head;
   this.associatedMap = map;
}

var jv_LinkedHashMap_AbstractMapIterator_c = sc_newInnerClass("java.util.LinkedHashMap.AbstractMapIterator", jv_LinkedHashMap_AbstractMapIterator, jv_LinkedHashMap, jv_Object, null);

jv_LinkedHashMap_AbstractMapIterator_c.hasNext = function ()  {
   return(this.futureEntry !== null);
};
jv_LinkedHashMap_AbstractMapIterator_c.checkConcurrentMod = function ()  {
   if (this.expectedModCount !== this.associatedMap.modCount) {
      throw new jv_ConcurrentModificationException();
   }
};
jv_LinkedHashMap_AbstractMapIterator_c.makeNext = function ()  {
   this.checkConcurrentMod();
   if (!this.hasNext()) {
      throw new jv_NoSuchElementException();
   }
   this.currentEntry = this.futureEntry;
   this.futureEntry = this.futureEntry.chainForward;
};
jv_LinkedHashMap_AbstractMapIterator_c.remove = function ()  {
   this.checkConcurrentMod();
   if (this.currentEntry === null) {
      throw new jv_IllegalStateException();
   }
   this.associatedMap.removeEntry(this.currentEntry);
   var lhme = this.currentEntry;
   var p = lhme.chainBackward;
   var n = lhme.chainForward;
   var lhm = this.associatedMap;
   if (p !== null) {
      p.chainForward = n;
      if (n !== null) {
         n.chainBackward = p;
      }
      else {
         lhm.tail = p;
      }
   }
   else {
      lhm.head = n;
      if (n !== null) {
         n.chainBackward = null;
      }
      else {
         lhm.tail = null;
      }
   }
   this.currentEntry = null;
   this.expectedModCount++;
};

jv_LinkedHashMap_AbstractMapIterator_c._jv_LinkedHashMap_AbstractMapIteratorInit = function() {
};

// Generated JS from Java: java.util.LinkedHashMap.EntryIterator -----
function jv_LinkedHashMap_EntryIterator(map) {

   jv_LinkedHashMap_AbstractMapIterator.call(this, map);
}

var jv_LinkedHashMap_EntryIterator_c = sc_newInnerClass("java.util.LinkedHashMap.EntryIterator", jv_LinkedHashMap_EntryIterator, jv_LinkedHashMap, jv_LinkedHashMap_AbstractMapIterator, [jv_Iterator]);

jv_LinkedHashMap_EntryIterator_c.next = function ()  {
   this.makeNext();
   return this.currentEntry;
};


// Generated JS from Java: java.util.LinkedHashMap.KeyIterator -----
function jv_LinkedHashMap_KeyIterator(map) {

   jv_LinkedHashMap_AbstractMapIterator.call(this, map);
}

var jv_LinkedHashMap_KeyIterator_c = sc_newInnerClass("java.util.LinkedHashMap.KeyIterator", jv_LinkedHashMap_KeyIterator, jv_LinkedHashMap, jv_LinkedHashMap_AbstractMapIterator, [jv_Iterator]);

jv_LinkedHashMap_KeyIterator_c.next = function ()  {
   this.makeNext();
   return this.currentEntry.key;
};


// Generated JS from Java: java.util.LinkedHashMap.ValueIterator -----
function jv_LinkedHashMap_ValueIterator(map) {

   jv_LinkedHashMap_AbstractMapIterator.call(this, map);
}

var jv_LinkedHashMap_ValueIterator_c = sc_newInnerClass("java.util.LinkedHashMap.ValueIterator", jv_LinkedHashMap_ValueIterator, jv_LinkedHashMap, jv_LinkedHashMap_AbstractMapIterator, [jv_Iterator]);

jv_LinkedHashMap_ValueIterator_c.next = function ()  {
   this.makeNext();
   return this.currentEntry.value;
};


// Generated JS from Java: java.util.LinkedHashMap.LinkedHashMapEntrySet -----
function jv_LinkedHashMap_LinkedHashMapEntrySet(lhm) {

   jv_HashMap_HashMapEntrySet.call(this, lhm);
}

var jv_LinkedHashMap_LinkedHashMapEntrySet_c = sc_newInnerClass("java.util.LinkedHashMap.LinkedHashMapEntrySet", jv_LinkedHashMap_LinkedHashMapEntrySet, jv_LinkedHashMap, jv_HashMap_HashMapEntrySet, null);

jv_LinkedHashMap_LinkedHashMapEntrySet_c.iterator = function ()  {
   return new jv_LinkedHashMap_EntryIterator((this.hashMap()));
};


// Generated JS from Java: java.util.LinkedHashMap.LinkedHashMapEntry -----
function jv_LinkedHashMap_LinkedHashMapEntry() {
   this.chainForward = null;
 this.chainBackward = null;

      if (sc_paramType(arguments[0], jv_Object) && sc_instanceOf(arguments[1], Number)) { 
      var theKey = arguments[0];
      var hash = arguments[1];
      jv_HashMap_Entry.call(this, theKey, hash);
   this._jv_LinkedHashMap_LinkedHashMapEntryInit();
      this.chainForward = null;
      this.chainBackward = null;
}
      else if (sc_paramType(arguments[0], jv_Object) && sc_paramType(arguments[1], jv_Object)) { 
      var theKey = arguments[0];
      var theValue = arguments[1];
      jv_HashMap_Entry.call(this, theKey, theValue);
   this._jv_LinkedHashMap_LinkedHashMapEntryInit();
      this.chainForward = null;
      this.chainBackward = null;
}}

var jv_LinkedHashMap_LinkedHashMapEntry_c = sc_newInnerClass("java.util.LinkedHashMap.LinkedHashMapEntry", jv_LinkedHashMap_LinkedHashMapEntry, jv_LinkedHashMap, jv_HashMap_Entry, null);

jv_LinkedHashMap_LinkedHashMapEntry_c.clone = function ()  {
   var entry = (jv_HashMap_Entry_c.clone.call(this));
   entry.chainBackward = this.chainBackward;
   entry.chainForward = this.chainForward;
   var lnext = (entry.next);
   if (lnext !== null) {
      entry.next = (lnext.clone());
   }
   return entry;
};

jv_LinkedHashMap_LinkedHashMapEntry_c._jv_LinkedHashMap_LinkedHashMapEntryInit = function() {
};

// Generated JS from Java: java.util.LinkedHashMap.__Anon1 -----
function jv_LinkedHashMap___Anon1(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractSet.call(this);
}

var jv_LinkedHashMap___Anon1_c = sc_newInnerClass("java.util.LinkedHashMap.__Anon1", jv_LinkedHashMap___Anon1, jv_LinkedHashMap, jv_AbstractSet, null);

jv_LinkedHashMap___Anon1_c.clear = function ()  {
   this._outer1.clear();
};
jv_LinkedHashMap___Anon1_c.contains = function (object)  {
   return this._outer1.containsKey(object);
};
jv_LinkedHashMap___Anon1_c.iterator = function ()  {
   return new jv_LinkedHashMap_KeyIterator(this._outer1);
};
jv_LinkedHashMap___Anon1_c.remove = function (key)  {
   if (this._outer1.containsKey(key)) {
      this._outer1.remove(key);
      return true;
   }
   return false;
};
jv_LinkedHashMap___Anon1_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.LinkedHashMap.__Anon2 -----
function jv_LinkedHashMap___Anon2(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractCollection.call(this);
}

var jv_LinkedHashMap___Anon2_c = sc_newInnerClass("java.util.LinkedHashMap.__Anon2", jv_LinkedHashMap___Anon2, jv_LinkedHashMap, jv_AbstractCollection, null);

jv_LinkedHashMap___Anon2_c.clear = function ()  {
   this._outer1.clear();
};
jv_LinkedHashMap___Anon2_c.contains = function (object)  {
   return this._outer1.containsValue(object);
};
jv_LinkedHashMap___Anon2_c.iterator = function ()  {
   return new jv_LinkedHashMap_ValueIterator(this._outer1);
};
jv_LinkedHashMap___Anon2_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.lang.ArithmeticException -----
function jv_ArithmeticException() {

   jv_ArithmeticException_c._clInit();

   if (arguments.length == 0) {
      jv_RuntimeException.call(this);
   }
   else if (arguments.length == 1) {
      var detailMessage = arguments[0];
      jv_RuntimeException.call(this, detailMessage);
   }}

var jv_ArithmeticException_c = sc_newClass("java.lang.ArithmeticException", jv_ArithmeticException, jv_RuntimeException, null);


jv_ArithmeticException_c._clInit = function() {
   if (jv_ArithmeticException_c.hasOwnProperty("_clInited")) return;
   jv_ArithmeticException_c._clInited = true;
   
      jv_ArithmeticException_c.serialVersionUID = 2256477558314496007;
      ;
};


// Generated JS from Java: java.util.SortedSet -----
function jv_SortedSet() {
}

var jv_SortedSet_c = sc_newClass("java.util.SortedSet", jv_SortedSet, null, [jv_Set]);



// Generated JS from Java: java.util.TreeSet -----
function jv_TreeSet() {

   jv_TreeSet_c._clInit();
   this.backingMap = null;

   if (arguments.length == 1) {
      if (sc_paramType(arguments[0], jv_SortedMap)) { 
         var map = arguments[0];
         jv_AbstractSet.call(this);
   this._jv_TreeSetInit();
         this.backingMap = map;
}else if (sc_paramType(arguments[0], jv_SortedSet)) { 
         var set = arguments[0];
         jv_TreeSet.call(this, set.comparator());
         var it = set.iterator();
         while (it.hasNext()) {
            this.add(it.next());
         }
}else if (sc_paramType(arguments[0], jv_Collection)) { 
         var collection = arguments[0];
         jv_TreeSet.call(this);
         this.addAll(collection);
}else if (sc_paramType(arguments[0], jv_Comparator)) { 
         var comparator = arguments[0];
         jv_AbstractSet.call(this);
   this._jv_TreeSetInit();
         this.backingMap = new jv_TreeMap(comparator);
}   }
   else if (arguments.length == 0) {
      jv_AbstractSet.call(this);
   this._jv_TreeSetInit();
      this.backingMap = new jv_TreeMap();
   }}

var jv_TreeSet_c = sc_newClass("java.util.TreeSet", jv_TreeSet, jv_AbstractSet, [jv_SortedSet,jv_Cloneable,jv_EmptyInterface]);

jv_TreeSet_c.clone = function ()  {
   try {
      var clone = (jv_Object_c.clone.call(this));
      if ((this.backingMap instanceof jv_TreeMap)) {
         clone.backingMap = (((this.backingMap)).clone());
      }
      else {
         clone.backingMap = new jv_TreeMap(this.backingMap);
      }
      return clone;
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_TreeSet_c.add = function (object)  {
   return this.backingMap.put(object, Boolean_c.TRUE) === null;
};
jv_TreeSet_c.addAll = function (collection)  {
   return jv_AbstractCollection_c.addAll.call(this, collection);
};
jv_TreeSet_c.clear = function ()  {
   this.backingMap.clear();
};
jv_TreeSet_c.contains = function (object)  {
   return this.backingMap.containsKey(object);
};
jv_TreeSet_c.isEmpty = function ()  {
   return this.backingMap.isEmpty();
};
jv_TreeSet_c.iterator = function ()  {
   return this.backingMap.keySet().iterator();
};
jv_TreeSet_c.remove = function (object)  {
   return this.backingMap.remove(object) !== null;
};
jv_TreeSet_c.size = function ()  {
   return this.backingMap.size();
};
jv_TreeSet_c.comparator = function ()  {
   return this.backingMap.comparator();
};
jv_TreeSet_c.first = function ()  {
   return this.backingMap.firstKey();
};
jv_TreeSet_c.headSet = function (end)  {
   var c = this.backingMap.comparator();
   if (c === null) {
      ((end)).compareTo(end);
   }
   else {
      c.compare(end, end);
   }
   return new jv_TreeSet(this.backingMap.headMap(end));
};
jv_TreeSet_c.last = function ()  {
   return this.backingMap.lastKey();
};
jv_TreeSet_c.subSet = function (start, end)  {
   var c = this.backingMap.comparator();
   if (c === null) {
      if (((start)).compareTo(end) <= 0) {
         return new jv_TreeSet(this.backingMap.subMap(start, end));
      }
   }
   else {
      if (c.compare(start, end) <= 0) {
         return new jv_TreeSet(this.backingMap.subMap(start, end));
      }
   }
   throw new jv_IllegalArgumentException();
};
jv_TreeSet_c.tailSet = function (start)  {
   var c = this.backingMap.comparator();
   if (c === null) {
      ((start)).compareTo(start);
   }
   else {
      c.compare(start, start);
   }
   return new jv_TreeSet(this.backingMap.tailMap(start));
};
jv_TreeSet_c.writeObject = function (stream)  {
   stream.defaultWriteObject();
   stream.writeObject(this.backingMap.comparator());
   var size = this.backingMap.size();
   stream.writeInt(size);
   if (size > 0) {
      var it = this.backingMap.keySet().iterator();
      while (it.hasNext()) {
         stream.writeObject(it.next());
      }
   }
};
jv_TreeSet_c.readObject = function (stream)  {
   stream.defaultReadObject();
   var map = new jv_TreeMap((stream.readObject()));
   var size = stream.readInt();
   if (size > 0) {
      var lastNode = null;
      for (var i = 0; i < size; i++) {
         var elem = (stream.readObject());
         lastNode = map.addToLast(lastNode, elem, Boolean_c.TRUE);
      }
   }
   this.backingMap = map;
};

jv_TreeSet_c._jv_TreeSetInit = function() {
};
jv_TreeSet_c._clInit = function() {
   if (jv_TreeSet_c.hasOwnProperty("_clInited")) return;
   jv_TreeSet_c._clInited = true;
   
      jv_TreeSet_c.serialVersionUID = -2479143000061671589;
      ;
};


// Generated JS from Java: java.util.SortedMap -----
function jv_SortedMap() {
}

var jv_SortedMap_c = sc_newClass("java.util.SortedMap", jv_SortedMap, null, [jv_Map]);



// Generated JS from Java: java.util.TreeMap -----
function jv_TreeMap() {

   jv_TreeMap_c._clInit();
   this._size = 0;
   this._comparator = null;
   this.modCount = 0;
   this._entrySet = null;
   this.root = null;

   if (arguments.length == 0) {
      jv_AbstractMap.call(this);
   this._jv_TreeMapInit();
   }
   else if (arguments.length == 1) {
      if (sc_paramType(arguments[0], jv_Comparator)) { 
         var comparator = arguments[0];
         jv_AbstractMap.call(this);
   this._jv_TreeMapInit();
         this._comparator = comparator;
}else if (sc_paramType(arguments[0], jv_SortedMap)) { 
         var map = arguments[0];
         jv_TreeMap.call(this, map.comparator());
         var lastNode = null;
         var it = map.entrySet().iterator();
         while (it.hasNext()) {
            var entry = it.next();
            lastNode = this.addToLast(lastNode, entry.getKey(), entry.getValue());
         }
}else if (sc_paramType(arguments[0], jv_Map)) { 
         var map = arguments[0];
         jv_AbstractMap.call(this);
   this._jv_TreeMapInit();
         this.putAll(map);
}   }}

var jv_TreeMap_c = sc_newClass("java.util.TreeMap", jv_TreeMap, jv_AbstractMap, [jv_SortedMap,jv_Cloneable,jv_EmptyInterface]);

jv_TreeMap_c.clone = function ()  {
   try {
      var clone = (jv_AbstractMap_c.clone.call(this));
      clone._entrySet = null;
      if (this.root !== null) {
         clone.root = this.root.clone(null);
         var node = jv_TreeMap_c.minimum(clone.root);
         while (true) {
            var nxt = jv_TreeMap_c.successor(node);
            if (nxt === null) {
               break;
            }
            nxt.prev = node;
            node.next = nxt;
            node = nxt;
         }
      }
      return clone;
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_TreeMap_c.clear = function ()  {
   this.root = null;
   this._size = 0;
   this.modCount++;
};
jv_TreeMap_c.containsKey = function (key)  {
   var object = this._comparator === null ? jv_TreeMap_c.toComparable((key)) : null;
   var keyK = (key);
   var node = this.root;
   while (node !== null) {
      var keys = node.keys;
      var left_idx = node.left_idx;
      var result = this.cmp(object, keyK, keys[left_idx]);
      if (result < 0) {
         node = node.left;
      }
      else
      if (result === 0) {
         return true;
      }
      else {
         var right_idx = node.right_idx;
         if (left_idx !== right_idx) {
            result = this.cmp(object, keyK, keys[right_idx]);
         }
         if (result > 0) {
            node = node.right;
         }
         else
         if (result === 0) {
            return true;
         }
         else {
            var low = left_idx + 1, mid = 0, high = right_idx - 1;
            while (low <= high) {
               mid = (low + high) >>> 1;
               result = this.cmp(object, keyK, keys[mid]);
               if (result > 0) {
                  low = mid + 1;
               }
               else
               if (result === 0) {
                  return true;
               }
               else {
                  high = mid - 1;
               }
            }
            return false;
         }
      }
   }
   return false;
};
jv_TreeMap_c.containsValue = function (value)  {
   if (this.root === null) {
      return false;
   }
   var node = jv_TreeMap_c.minimum(this.root);
   if (value !== null) {
      while (node !== null) {
         var to = node.right_idx;
         var values = node.values;
         for (var i = node.left_idx; i <= to; i++) {
            if (value.equals(values[i])) {
               return true;
            }
         }
         node = node.next;
      }
   }
   else {
      while (node !== null) {
         var to = node.right_idx;
         var values = node.values;
         for (var i = node.left_idx; i <= to; i++) {
            if (values[i] === null) {
               return true;
            }
         }
         node = node.next;
      }
   }
   return false;
};
jv_TreeMap_c.entrySet = function ()  {
   if (this._entrySet === null) {
      this._entrySet = new jv_TreeMap___Anon1(this);
   }
   return this._entrySet;
};
jv_TreeMap_c.get = function (key)  {
   var object = this._comparator === null ? jv_TreeMap_c.toComparable((key)) : null;
   var keyK = (key);
   var node = this.root;
   while (node !== null) {
      var keys = node.keys;
      var left_idx = node.left_idx;
      var result = this.cmp(object, keyK, keys[left_idx]);
      if (result < 0) {
         node = node.left;
      }
      else
      if (result === 0) {
         return node.values[left_idx];
      }
      else {
         var right_idx = node.right_idx;
         if (left_idx !== right_idx) {
            result = this.cmp(object, keyK, keys[right_idx]);
         }
         if (result > 0) {
            node = node.right;
         }
         else
         if (result === 0) {
            return node.values[right_idx];
         }
         else {
            var low = left_idx + 1, mid = 0, high = right_idx - 1;
            while (low <= high) {
               mid = (low + high) >>> 1;
               result = this.cmp(object, keyK, keys[mid]);
               if (result > 0) {
                  low = mid + 1;
               }
               else
               if (result === 0) {
                  return node.values[mid];
               }
               else {
                  high = mid - 1;
               }
            }
            return null;
         }
      }
   }
   return null;
};
jv_TreeMap_c.keySet = function ()  {
   if (this._keySet === null) {
      this._keySet = new jv_TreeMap___Anon2(this);
   }
   return this._keySet;
};
jv_TreeMap_c.put = function (key, value)  {
   if (this.root === null) {
      this.root = this.createNode(key, value);
      this._size = 1;
      this.modCount++;
      return null;
   }
   var object = this._comparator === null ? jv_TreeMap_c.toComparable((key)) : null;
   var keyK = (key);
   var node = this.root;
   var prevNode = null;
   var result = 0;
   while (node !== null) {
      prevNode = node;
      var keys = node.keys;
      var left_idx = node.left_idx;
      result = this.cmp(object, keyK, keys[left_idx]);
      if (result < 0) {
         node = node.left;
      }
      else
      if (result === 0) {
         var res = node.values[left_idx];
         node.values[left_idx] = value;
         return res;
      }
      else {
         var right_idx = node.right_idx;
         if (left_idx !== right_idx) {
            result = this.cmp(object, keyK, keys[right_idx]);
         }
         if (result > 0) {
            node = node.right;
         }
         else
         if (result === 0) {
            var res = node.values[right_idx];
            node.values[right_idx] = value;
            return res;
         }
         else {
            var low = left_idx + 1, mid = 0, high = right_idx - 1;
            while (low <= high) {
               mid = (low + high) >>> 1;
               result = this.cmp(object, keyK, keys[mid]);
               if (result > 0) {
                  low = mid + 1;
               }
               else
               if (result === 0) {
                  var res = node.values[mid];
                  node.values[mid] = value;
                  return res;
               }
               else {
                  high = mid - 1;
               }
            }
            result = low;
            break;
         }
      }
   }
   this._size++;
   this.modCount++;
   if (node === null) {
      if (prevNode === null) {
         this.root = this.createNode(key, value);
      }
      else
      if (prevNode.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
         if (result < 0) {
            this.appendFromLeft(prevNode, key, value);
         }
         else {
            this.appendFromRight(prevNode, key, value);
         }
      }
      else {
         var newNode = this.createNode(key, value);
         if (result < 0) {
            this.attachToLeft(prevNode, newNode);
         }
         else {
            this.attachToRight(prevNode, newNode);
         }
         this.balance(newNode);
      }
   }
   else {
      if (node.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
         var left_idx = node.left_idx;
         var right_idx = node.right_idx;
         if (left_idx === 0 || ((right_idx !== sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1) && (right_idx - result <= result - left_idx))) {
            var right_idxPlus1 = right_idx + 1;
            jv_System_c.arraycopy(node.keys, result, node.keys, result + 1, right_idxPlus1 - result);
            jv_System_c.arraycopy(node.values, result, node.values, result + 1, right_idxPlus1 - result);
            node.right_idx = right_idxPlus1;
            node.keys[result] = key;
            node.values[result] = value;
         }
         else {
            var left_idxMinus1 = left_idx - 1;
            jv_System_c.arraycopy(node.keys, left_idx, node.keys, left_idxMinus1, result - left_idx);
            jv_System_c.arraycopy(node.values, left_idx, node.values, left_idxMinus1, result - left_idx);
            node.left_idx = left_idxMinus1;
            node.keys[result - 1] = key;
            node.values[result - 1] = value;
         }
         node.size++;
      }
      else {
         var previous = node.prev;
         var nextNode = node.next;
         var removeFromStart;
         var attachFromLeft = false;
         var attachHere = null;
         if (previous === null) {
            if (nextNode !== null && nextNode.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
               removeFromStart = false;
            }
            else {
               removeFromStart = true;
               attachFromLeft = true;
               attachHere = node;
            }
         }
         else
         if (nextNode === null) {
            if (previous.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
               removeFromStart = true;
            }
            else {
               removeFromStart = false;
               attachFromLeft = false;
               attachHere = node;
            }
         }
         else {
            if (previous.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
               if (nextNode.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
                  removeFromStart = previous.size < nextNode.size;
               }
               else {
                  removeFromStart = true;
               }
            }
            else {
               if (nextNode.size < sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
                  removeFromStart = false;
               }
               else {
                  if (node.right === null) {
                     attachHere = node;
                     attachFromLeft = false;
                     removeFromStart = false;
                  }
                  else {
                     attachHere = nextNode;
                     attachFromLeft = true;
                     removeFromStart = false;
                  }
               }
            }
         }
         var movedKey;
         var movedValue;
         if (removeFromStart) {
            movedKey = node.keys[0];
            movedValue = node.values[0];
            var resMunus1 = result - 1;
            jv_System_c.arraycopy(node.keys, 1, node.keys, 0, resMunus1);
            jv_System_c.arraycopy(node.values, 1, node.values, 0, resMunus1);
            node.keys[resMunus1] = key;
            node.values[resMunus1] = value;
         }
         else {
            movedKey = node.keys[sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1];
            movedValue = node.values[sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1];
            jv_System_c.arraycopy(node.keys, result, node.keys, result + 1,
                    sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1 - result);
            jv_System_c.arraycopy(node.values, result, node.values, result + 1,
                    sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1 - result);
            node.keys[result] = key;
            node.values[result] = value;
         }
         if (attachHere === null) {
            if (removeFromStart) {
               this.appendFromRight(previous, movedKey, movedValue);
            }
            else {
               this.appendFromLeft(nextNode, movedKey, movedValue);
            }
         }
         else {
            var newNode = this.createNode(movedKey, movedValue);
            if (attachFromLeft) {
               this.attachToLeft(attachHere, newNode);
            }
            else {
               this.attachToRight(attachHere, newNode);
            }
            this.balance(newNode);
         }
      }
   }
   return null;
};
jv_TreeMap_c.putAll = function (map)  {
   jv_AbstractMap_c.putAll.call(this, map);
};
jv_TreeMap_c.remove = function (key)  {
   if (this._size === 0) {
      return null;
   }
   var object = this._comparator === null ? jv_TreeMap_c.toComparable((key)) : null;
   var keyK = (key);
   var node = this.root;
   while (node !== null) {
      var keys = node.keys;
      var left_idx = node.left_idx;
      var result = this.cmp(object, keyK, keys[left_idx]);
      if (result < 0) {
         node = node.left;
      }
      else
      if (result === 0) {
         var value = node.values[left_idx];
         this.removeLeftmost(node);
         return value;
      }
      else {
         var right_idx = node.right_idx;
         if (left_idx !== right_idx) {
            result = this.cmp(object, keyK, keys[right_idx]);
         }
         if (result > 0) {
            node = node.right;
         }
         else
         if (result === 0) {
            var value = node.values[right_idx];
            this.removeRightmost(node);
            return value;
         }
         else {
            var low = left_idx + 1, mid = 0, high = right_idx - 1;
            while (low <= high) {
               mid = (low + high) >>> 1;
               result = this.cmp(object, keyK, keys[mid]);
               if (result > 0) {
                  low = mid + 1;
               }
               else
               if (result === 0) {
                  var value = node.values[mid];
                  this.removeMiddleElement(node, mid);
                  return value;
               }
               else {
                  high = mid - 1;
               }
            }
            return null;
         }
      }
   }
   return null;
};
jv_TreeMap_c.size = function ()  {
   return this._size;
};
jv_TreeMap_c.values = function ()  {
   if (this.valuesCollection === null) {
      this.valuesCollection = new jv_TreeMap___Anon3(this);
   }
   return this.valuesCollection;
};
jv_TreeMap_c.toComparable = function (obj)  {
   jv_TreeMap_c._clInit();
   if (obj === null) {
      throw new jv_NullPointerException();
   }
   return(obj);
};
jv_TreeMap_c.addToLast = function (last, key, value)  {
   if (last === null) {
      this.root = last = this.createNode(key, value);
      this._size = 1;
   }
   else
   if (last.size === sc_clInit(jv_TreeMap_Node_c).NODE_SIZE) {
      var newNode = this.createNode(key, value);
      this.attachToRight(last, newNode);
      this.balance(newNode);
      this._size++;
      last = newNode;
   }
   else {
      this.appendFromRight(last, key, value);
      this._size++;
   }
   return last;
};
jv_TreeMap_c.successor = function (x)  {
   jv_TreeMap_c._clInit();
   if (x.right !== null) {
      return jv_TreeMap_c.minimum(x.right);
   }
   var y = x.parent;
   while (y !== null && x === y.right) {
      x = y;
      y = y.parent;
   }
   return y;
};
jv_TreeMap_c.comparator = function ()  {
   return this._comparator;
};
jv_TreeMap_c.firstKey = function ()  {
   if (this.root !== null) {
      var node = jv_TreeMap_c.minimum(this.root);
      return node.keys[node.left_idx];
   }
   throw new jv_NoSuchElementException();
};
jv_TreeMap_c.cmp = function (object, key1, key2)  {
   return object !== null ? object.compareTo(key2) : this._comparator.compare(key1, key2);
};
jv_TreeMap_c.headMap = function (endKey)  {
   if (this._comparator === null) {
      jv_TreeMap_c.toComparable(endKey).compareTo(endKey);
   }
   else {
      this._comparator.compare(endKey, endKey);
   }
   return new jv_TreeMap_SubMap(this, endKey);
};
jv_TreeMap_c.lastKey = function ()  {
   if (this.root !== null) {
      var node = jv_TreeMap_c.maximum(this.root);
      return node.keys[node.right_idx];
   }
   throw new jv_NoSuchElementException();
};
jv_TreeMap_c.minimum = function (x)  {
   jv_TreeMap_c._clInit();
   if (x === null) {
      return null;
   }
   while (x.left !== null) {
      x = x.left;
   }
   return x;
};
jv_TreeMap_c.maximum = function (x)  {
   jv_TreeMap_c._clInit();
   if (x === null) {
      return null;
   }
   while (x.right !== null) {
      x = x.right;
   }
   return x;
};
jv_TreeMap_c.appendFromLeft = function (node, keyObj, value)  {
   if (node.left_idx === 0) {
      var new_right = node.right_idx + 1;
      jv_System_c.arraycopy(node.keys, 0, node.keys, 1, new_right);
      jv_System_c.arraycopy(node.values, 0, node.values, 1, new_right);
      node.right_idx = new_right;
   }
   else {
      node.left_idx--;
   }
   node.size++;
   node.keys[node.left_idx] = keyObj;
   node.values[node.left_idx] = value;
};
jv_TreeMap_c.attachToLeft = function (node, newNode)  {
   newNode.parent = node;
   node.left = newNode;
   var predecessor = node.prev;
   newNode.prev = predecessor;
   newNode.next = node;
   if (predecessor !== null) {
      predecessor.next = newNode;
   }
   node.prev = newNode;
};
jv_TreeMap_c.appendFromRight = function (node, keyObj, value)  {
   if (node.right_idx === sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1) {
      var left_idx = node.left_idx;
      var left_idxMinus1 = left_idx - 1;
      jv_System_c.arraycopy(node.keys, left_idx, node.keys, left_idxMinus1,
              sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - left_idx);
      jv_System_c.arraycopy(node.values, left_idx, node.values, left_idxMinus1,
              sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - left_idx);
      node.left_idx = left_idxMinus1;
   }
   else {
      node.right_idx++;
   }
   node.size++;
   node.keys[node.right_idx] = keyObj;
   node.values[node.right_idx] = value;
};
jv_TreeMap_c.attachToRight = function (node, newNode)  {
   newNode.parent = node;
   node.right = newNode;
   newNode.prev = node;
   var successor = node.next;
   newNode.next = successor;
   if (successor !== null) {
      successor.prev = newNode;
   }
   node.next = newNode;
};
jv_TreeMap_c.createNode = function (keyObj, value)  {
   var node = new jv_TreeMap_Node();
   node.keys[0] = keyObj;
   node.values[0] = value;
   node.left_idx = 0;
   node.right_idx = 0;
   node.size = 1;
   return node;
};
jv_TreeMap_c.balance = function (x)  {
   var y;
   x.color = true;
   while (x !== this.root && x.parent.color) {
      if (x.parent === x.parent.parent.left) {
         y = x.parent.parent.right;
         if (y !== null && y.color) {
            x.parent.color = false;
            y.color = false;
            x.parent.parent.color = true;
            x = x.parent.parent;
         }
         else {
            if (x === x.parent.right) {
               x = x.parent;
               this.leftRotate(x);
            }
            x.parent.color = false;
            x.parent.parent.color = true;
            this.rightRotate(x.parent.parent);
         }
      }
      else {
         y = x.parent.parent.left;
         if (y !== null && y.color) {
            x.parent.color = false;
            y.color = false;
            x.parent.parent.color = true;
            x = x.parent.parent;
         }
         else {
            if (x === x.parent.left) {
               x = x.parent;
               this.rightRotate(x);
            }
            x.parent.color = false;
            x.parent.parent.color = true;
            this.leftRotate(x.parent.parent);
         }
      }
   }
   this.root.color = false;
};
jv_TreeMap_c.rightRotate = function (x)  {
   var y = x.left;
   x.left = y.right;
   if (y.right !== null) {
      y.right.parent = x;
   }
   y.parent = x.parent;
   if (x.parent === null) {
      this.root = y;
   }
   else {
      if (x === x.parent.right) {
         x.parent.right = y;
      }
      else {
         x.parent.left = y;
      }
   }
   y.right = x;
   x.parent = y;
};
jv_TreeMap_c.leftRotate = function (x)  {
   var y = x.right;
   x.right = y.left;
   if (y.left !== null) {
      y.left.parent = x;
   }
   y.parent = x.parent;
   if (x.parent === null) {
      this.root = y;
   }
   else {
      if (x === x.parent.left) {
         x.parent.left = y;
      }
      else {
         x.parent.right = y;
      }
   }
   y.left = x;
   x.parent = y;
};
jv_TreeMap_c.removeLeftmost = function (node)  {
   var index = node.left_idx;
   if (node.size === 1) {
      this.deleteNode(node);
   }
   else
   if (node.prev !== null && (sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1 - node.prev.right_idx) > node.size) {
      var prev = node.prev;
      var size = node.right_idx - index;
      jv_System_c.arraycopy(node.keys, index + 1, prev.keys, prev.right_idx + 1, size);
      jv_System_c.arraycopy(node.values, index + 1, prev.values, prev.right_idx + 1, size);
      prev.right_idx += size;
      prev.size += size;
      this.deleteNode(node);
   }
   else
   if (node.next !== null && (node.next.left_idx) > node.size) {
      var next = node.next;
      var size = node.right_idx - index;
      var next_new_left = next.left_idx - size;
      next.left_idx = next_new_left;
      jv_System_c.arraycopy(node.keys, index + 1, next.keys, next_new_left, size);
      jv_System_c.arraycopy(node.values, index + 1, next.values, next_new_left, size);
      next.size += size;
      this.deleteNode(node);
   }
   else {
      node.keys[index] = null;
      node.values[index] = null;
      node.left_idx++;
      node.size--;
      var prev = node.prev;
      if (prev !== null && prev.size === 1) {
         node.size++;
         node.left_idx--;
         node.keys[node.left_idx] = prev.keys[prev.left_idx];
         node.values[node.left_idx] = prev.values[prev.left_idx];
         this.deleteNode(prev);
      }
   }
   this.modCount++;
   this._size--;
};
jv_TreeMap_c.removeRightmost = function (node)  {
   var index = node.right_idx;
   if (node.size === 1) {
      this.deleteNode(node);
   }
   else
   if (node.prev !== null && (sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1 - node.prev.right_idx) > node.size) {
      var prev = node.prev;
      var left_idx = node.left_idx;
      var size = index - left_idx;
      jv_System_c.arraycopy(node.keys, left_idx, prev.keys, prev.right_idx + 1, size);
      jv_System_c.arraycopy(node.values, left_idx, prev.values, prev.right_idx + 1, size);
      prev.right_idx += size;
      prev.size += size;
      this.deleteNode(node);
   }
   else
   if (node.next !== null && (node.next.left_idx) > node.size) {
      var next = node.next;
      var left_idx = node.left_idx;
      var size = index - left_idx;
      var next_new_left = next.left_idx - size;
      next.left_idx = next_new_left;
      jv_System_c.arraycopy(node.keys, left_idx, next.keys, next_new_left, size);
      jv_System_c.arraycopy(node.values, left_idx, next.values, next_new_left, size);
      next.size += size;
      this.deleteNode(node);
   }
   else {
      node.keys[index] = null;
      node.values[index] = null;
      node.right_idx--;
      node.size--;
      var next = node.next;
      if (next !== null && next.size === 1) {
         node.size++;
         node.right_idx++;
         node.keys[node.right_idx] = next.keys[next.left_idx];
         node.values[node.right_idx] = next.values[next.left_idx];
         this.deleteNode(next);
      }
   }
   this.modCount++;
   this._size--;
};
jv_TreeMap_c.removeMiddleElement = function (node, index)  {
   if (node.prev !== null && (sc_clInit(jv_TreeMap_Node_c).NODE_SIZE - 1 - node.prev.right_idx) > node.size) {
      var prev = node.prev;
      var left_idx = node.left_idx;
      var size = index - left_idx;
      jv_System_c.arraycopy(node.keys, left_idx, prev.keys, prev.right_idx + 1, size);
      jv_System_c.arraycopy(node.values, left_idx, prev.values, prev.right_idx + 1, size);
      prev.right_idx += size;
      size = node.right_idx - index;
      jv_System_c.arraycopy(node.keys, index + 1, prev.keys, prev.right_idx + 1, size);
      jv_System_c.arraycopy(node.values, index + 1, prev.values, prev.right_idx + 1, size);
      prev.right_idx += size;
      prev.size += (node.size - 1);
      this.deleteNode(node);
   }
   else
   if (node.next !== null && (node.next.left_idx) > node.size) {
      var next = node.next;
      var left_idx = node.left_idx;
      var next_new_left = next.left_idx - node.size + 1;
      next.left_idx = next_new_left;
      var size = index - left_idx;
      jv_System_c.arraycopy(node.keys, left_idx, next.keys, next_new_left, size);
      jv_System_c.arraycopy(node.values, left_idx, next.values, next_new_left, size);
      next_new_left += size;
      size = node.right_idx - index;
      jv_System_c.arraycopy(node.keys, index + 1, next.keys, next_new_left, size);
      jv_System_c.arraycopy(node.values, index + 1, next.values, next_new_left, size);
      next.size += (node.size - 1);
      this.deleteNode(node);
   }
   else {
      var moveFromRight = node.right_idx - index;
      var left_idx = node.left_idx;
      var moveFromLeft = index - left_idx;
      if (moveFromRight <= moveFromLeft) {
         jv_System_c.arraycopy(node.keys, index + 1, node.keys, index, moveFromRight);
         jv_System_c.arraycopy(node.values, index + 1, node.values, index, moveFromRight);
         var next = node.next;
         if (next !== null && next.size === 1) {
            node.keys[node.right_idx] = next.keys[next.left_idx];
            node.values[node.right_idx] = next.values[next.left_idx];
            this.deleteNode(next);
         }
         else {
            node.keys[node.right_idx] = null;
            node.values[node.right_idx] = null;
            node.right_idx--;
            node.size--;
         }
      }
      else {
         jv_System_c.arraycopy(node.keys, left_idx, node.keys, left_idx + 1, moveFromLeft);
         jv_System_c.arraycopy(node.values, left_idx, node.values, left_idx + 1, moveFromLeft);
         var prev = node.prev;
         if (prev !== null && prev.size === 1) {
            node.keys[left_idx] = prev.keys[prev.left_idx];
            node.values[left_idx] = prev.values[prev.left_idx];
            this.deleteNode(prev);
         }
         else {
            node.keys[left_idx] = null;
            node.values[left_idx] = null;
            node.left_idx++;
            node.size--;
         }
      }
   }
   this.modCount++;
   this._size--;
};
jv_TreeMap_c.removeFromIterator = function (node, index)  {
   if (node.size === 1) {
      this.deleteNode(node);
   }
   else {
      var left_idx = node.left_idx;
      if (index === left_idx) {
         var prev = node.prev;
         if (prev !== null && prev.size === 1) {
            node.keys[left_idx] = prev.keys[prev.left_idx];
            node.values[left_idx] = prev.values[prev.left_idx];
            this.deleteNode(prev);
         }
         else {
            node.keys[left_idx] = null;
            node.values[left_idx] = null;
            node.left_idx++;
            node.size--;
         }
      }
      else
      if (index === node.right_idx) {
         node.keys[index] = null;
         node.values[index] = null;
         node.right_idx--;
         node.size--;
      }
      else {
         var moveFromRight = node.right_idx - index;
         var moveFromLeft = index - left_idx;
         if (moveFromRight <= moveFromLeft) {
            jv_System_c.arraycopy(node.keys, index + 1, node.keys, index, moveFromRight);
            jv_System_c.arraycopy(node.values, index + 1, node.values, index, moveFromRight);
            node.keys[node.right_idx] = null;
            node.values[node.right_idx] = null;
            node.right_idx--;
            node.size--;
         }
         else {
            jv_System_c.arraycopy(node.keys, left_idx, node.keys, left_idx + 1, moveFromLeft);
            jv_System_c.arraycopy(node.values, left_idx, node.values, left_idx + 1, moveFromLeft);
            node.keys[left_idx] = null;
            node.values[left_idx] = null;
            node.left_idx++;
            node.size--;
         }
      }
   }
   this.modCount++;
   this._size--;
};
jv_TreeMap_c.deleteNode = function (node)  {
   if (node.right === null) {
      if (node.left !== null) {
         this.attachToParent(node, node.left);
      }
      else {
         this.attachNullToParent(node);
      }
      this.fixNextChain(node);
   }
   else
   if (node.left === null) {
      this.attachToParent(node, node.right);
      this.fixNextChain(node);
   }
   else {
      var toMoveUp = node.next;
      this.fixNextChain(node);
      if (toMoveUp.right === null) {
         this.attachNullToParent(toMoveUp);
      }
      else {
         this.attachToParent(toMoveUp, toMoveUp.right);
      }
      toMoveUp.left = node.left;
      if (node.left !== null) {
         node.left.parent = toMoveUp;
      }
      toMoveUp.right = node.right;
      if (node.right !== null) {
         node.right.parent = toMoveUp;
      }
      this.attachToParentNoFixup(node, toMoveUp);
      toMoveUp.color = node.color;
   }
};
jv_TreeMap_c.attachToParentNoFixup = function (toDelete, toConnect)  {
   var parent = toDelete.parent;
   toConnect.parent = parent;
   if (parent === null) {
      this.root = toConnect;
   }
   else
   if (toDelete === parent.left) {
      parent.left = toConnect;
   }
   else {
      parent.right = toConnect;
   }
};
jv_TreeMap_c.attachToParent = function (toDelete, toConnect)  {
   this.attachToParentNoFixup(toDelete, toConnect);
   if (!toDelete.color) {
      this.fixup(toConnect);
   }
};
jv_TreeMap_c.attachNullToParent = function (toDelete)  {
   var parent = toDelete.parent;
   if (parent === null) {
      this.root = null;
   }
   else {
      if (toDelete === parent.left) {
         parent.left = null;
      }
      else {
         parent.right = null;
      }
      if (!toDelete.color) {
         this.fixup(parent);
      }
   }
};
jv_TreeMap_c.fixNextChain = function (node)  {
   if (node.prev !== null) {
      node.prev.next = node.next;
   }
   if (node.next !== null) {
      node.next.prev = node.prev;
   }
};
jv_TreeMap_c.fixup = function (x)  {
   var w;
   while (x !== this.root && !x.color) {
      if (x === x.parent.left) {
         w = x.parent.right;
         if (w === null) {
            x = x.parent;
            continue;
         }
         if (w.color) {
            w.color = false;
            x.parent.color = true;
            this.leftRotate(x.parent);
            w = x.parent.right;
            if (w === null) {
               x = x.parent;
               continue;
            }
         }
         if ((w.left === null || !w.left.color) && (w.right === null || !w.right.color)) {
            w.color = true;
            x = x.parent;
         }
         else {
            if (w.right === null || !w.right.color) {
               w.left.color = false;
               w.color = true;
               this.rightRotate(w);
               w = x.parent.right;
            }
            w.color = x.parent.color;
            x.parent.color = false;
            w.right.color = false;
            this.leftRotate(x.parent);
            x = this.root;
         }
      }
      else {
         w = x.parent.left;
         if (w === null) {
            x = x.parent;
            continue;
         }
         if (w.color) {
            w.color = false;
            x.parent.color = true;
            this.rightRotate(x.parent);
            w = x.parent.left;
            if (w === null) {
               x = x.parent;
               continue;
            }
         }
         if ((w.left === null || !w.left.color) && (w.right === null || !w.right.color)) {
            w.color = true;
            x = x.parent;
         }
         else {
            if (w.left === null || !w.left.color) {
               w.right.color = false;
               w.color = true;
               this.leftRotate(w);
               w = x.parent.left;
            }
            w.color = x.parent.color;
            x.parent.color = false;
            w.left.color = false;
            this.rightRotate(x.parent);
            x = this.root;
         }
      }
   }
   x.color = false;
};
jv_TreeMap_c.subMap = function (startKey, endKey)  {
   if (this._comparator === null) {
      if (jv_TreeMap_c.toComparable(startKey).compareTo(endKey) <= 0) {
         return new jv_TreeMap_SubMap(startKey, this, endKey);
      }
   }
   else {
      if (this._comparator.compare(startKey, endKey) <= 0) {
         return new jv_TreeMap_SubMap(startKey, this, endKey);
      }
   }
   throw new jv_IllegalArgumentException();
};
jv_TreeMap_c.tailMap = function (startKey)  {
   if (this._comparator === null) {
      jv_TreeMap_c.toComparable(startKey).compareTo(startKey);
   }
   else {
      this._comparator.compare(startKey, startKey);
   }
   return new jv_TreeMap_SubMap(startKey, this);
};
jv_TreeMap_c.writeObject = function (stream)  {
   stream.defaultWriteObject();
   stream.writeInt(this._size);
   if (this._size > 0) {
      var node = jv_TreeMap_c.minimum(this.root);
      while (node !== null) {
         var to = node.right_idx;
         for (var i = node.left_idx; i <= to; i++) {
            stream.writeObject(node.keys[i]);
            stream.writeObject(node.values[i]);
         }
         node = node.next;
      }
   }
};
jv_TreeMap_c.readObject = function (stream)  {
   stream.defaultReadObject();
   var size = stream.readInt();
   var lastNode = null;
   for (var i = 0; i < size; i++) {
      lastNode = this.addToLast(lastNode, (stream.readObject()), (stream.readObject()));
   }
};

jv_TreeMap_c._jv_TreeMapInit = function() {
};
jv_TreeMap_c._clInit = function() {
   if (jv_TreeMap_c.hasOwnProperty("_clInited")) return;
   jv_TreeMap_c._clInited = true;
   
      jv_TreeMap_c.serialVersionUID = 919286545866124006;
      ;
};


// Generated JS from Java: java.util.TreeMap.MapEntry -----
function jv_TreeMap_MapEntry(_outer, node, offset) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   this.offset = 0;
   this.node = null;
   this.key = null;

   jv_Object.call(this);
   this._jv_TreeMap_MapEntryInit();
   this.node = node;
   this.offset = offset;
   this.key = node.keys[offset];
}

var jv_TreeMap_MapEntry_c = sc_newInnerClass("java.util.TreeMap.MapEntry", jv_TreeMap_MapEntry, jv_TreeMap, jv_Object, [jv_Map_Entry,jv_Cloneable]);

jv_TreeMap_MapEntry_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var entry = (object);
      var value = this.getValue();
      return(this.key === null ? entry.getKey() === null : this.key.equals(entry.getKey())) && (value === null ? entry.getValue() === null : value.equals(entry.getValue()));
   }
   return false;
};
jv_TreeMap_MapEntry_c.toString = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.toString.apply(this, arguments);
   }
   return this.key + "=" + this.getValue();
};
jv_TreeMap_MapEntry_c.hashCode = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.hashCode.apply(this, arguments);
   }
   var value = this.getValue();
   return(this.key === null ? 0 : this.key.hashCode()) ^ (value === null ? 0 : value.hashCode());
};
jv_TreeMap_MapEntry_c.clone = function ()  {
   try {
      return jv_Object_c.clone.call(this);
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_TreeMap_MapEntry_c.getKey = function ()  {
   return this.key;
};
jv_TreeMap_MapEntry_c.getValue = function ()  {
   if (this.node.keys[this.offset] === this.key) {
      return this.node.values[this.offset];
   }
   if (this._outer1.containsKey(this.key)) {
      return this._outer1.get(this.key);
   }
   throw new jv_IllegalStateException();
};
jv_TreeMap_MapEntry_c.setValue = function (object)  {
   if (this.node.keys[this.offset] === this.key) {
      var res = this.node.values[this.offset];
      this.node.values[this.offset] = object;
      return res;
   }
   if (this._outer1.containsKey(this.key)) {
      return this._outer1.put(this.key, object);
   }
   throw new jv_IllegalStateException();
};

jv_TreeMap_MapEntry_c._jv_TreeMap_MapEntryInit = function() {
};

// Generated JS from Java: java.util.TreeMap.Node -----
function jv_TreeMap_Node() {

   jv_TreeMap_Node_c._clInit();
   this.prev = null;
 this.next = null;
   this.parent = null;
 this.left = null;
 this.right = null;
   this.values = null;
   this.keys = null;
   this.left_idx = 0;
   this.right_idx = 0;
   this.size = 0;
   this.color = false;

   jv_Object.call(this);
   this._jv_TreeMap_NodeInit();
   this.keys = (sc_newArray(jv_Object_c, jv_TreeMap_Node_c.NODE_SIZE));
   this.values = (sc_newArray(jv_Object_c, jv_TreeMap_Node_c.NODE_SIZE));
}

var jv_TreeMap_Node_c = sc_newInnerClass("java.util.TreeMap.Node", jv_TreeMap_Node, jv_TreeMap, jv_Object, [jv_Cloneable]);

jv_TreeMap_Node_c.clone = function (parent)  {
   var clone = (jv_Object_c.clone.call(this));
   clone.keys = (sc_newArray(jv_Object_c, jv_TreeMap_Node_c.NODE_SIZE));
   clone.values = (sc_newArray(jv_Object_c, jv_TreeMap_Node_c.NODE_SIZE));
   jv_System_c.arraycopy(this.keys, 0, clone.keys, 0, this.keys.length);
   jv_System_c.arraycopy(this.values, 0, clone.values, 0, this.values.length);
   clone.left_idx = this.left_idx;
   clone.right_idx = this.right_idx;
   clone.parent = parent;
   if (this.left !== null) {
      clone.left = this.left.clone(clone);
   }
   if (this.right !== null) {
      clone.right = this.right.clone(clone);
   }
   clone.prev = null;
   clone.next = null;
   return clone;
};

jv_TreeMap_Node_c._jv_TreeMap_NodeInit = function() {
   this.left_idx = 0;
         ;
   this.right_idx = -1;
         ;
   this.size = 0;
         ;
};
jv_TreeMap_Node_c._clInit = function() {
   if (jv_TreeMap_Node_c.hasOwnProperty("_clInited")) return;
   jv_TreeMap_Node_c._clInited = true;
   
         jv_TreeMap_Node_c.NODE_SIZE = 64;
         ;
};


// Generated JS from Java: java.util.TreeMap.AbstractMapIterator -----
function jv_TreeMap_AbstractMapIterator() {
   this.backingMap = null;
   this.expectedModCount = 0;
   this.node = null;
   this.lastNode = null;
   this.offset = 0;
   this.lastOffset = 0;

   if (arguments.length == 3) {
      var map = arguments[0];
      var startNode = arguments[1];
      var startOffset = arguments[2];
      jv_Object.call(this);
   this._jv_TreeMap_AbstractMapIteratorInit();
      this.backingMap = map;
      this.expectedModCount = map.modCount;
      this.node = startNode;
      this.offset = startOffset;
   }
   else if (arguments.length == 2) {
      var map = arguments[0];
      var startNode = arguments[1];
      jv_TreeMap_AbstractMapIterator.call(this, map, startNode,
              startNode !== null ? startNode.right_idx - startNode.left_idx : 0);
   }
   else if (arguments.length == 1) {
      var map = arguments[0];
      jv_TreeMap_AbstractMapIterator.call(this, map, sc_clInit(jv_TreeMap_c).minimum(map.root));
   }}

var jv_TreeMap_AbstractMapIterator_c = sc_newInnerClass("java.util.TreeMap.AbstractMapIterator", jv_TreeMap_AbstractMapIterator, jv_TreeMap, jv_Object, null);

jv_TreeMap_AbstractMapIterator_c.hasNext = function ()  {
   return this.node !== null;
};
jv_TreeMap_AbstractMapIterator_c.makeNext = function ()  {
   if (this.expectedModCount !== this.backingMap.modCount) {
      throw new jv_ConcurrentModificationException();
   }
   else
   if (this.node === null) {
      throw new jv_NoSuchElementException();
   }
   this.lastNode = this.node;
   this.lastOffset = this.offset;
   if (this.offset !== 0) {
      this.offset--;
   }
   else {
      this.node = this.node.next;
      if (this.node !== null) {
         this.offset = this.node.right_idx - this.node.left_idx;
      }
   }
};
jv_TreeMap_AbstractMapIterator_c.remove = function ()  {
   if (this.expectedModCount === this.backingMap.modCount) {
      if (this.lastNode !== null) {
         var idx = this.lastNode.right_idx - this.lastOffset;
         this.backingMap.removeFromIterator(this.lastNode, idx);
         this.lastNode = null;
         this.expectedModCount++;
      }
      else {
         throw new jv_IllegalStateException();
      }
   }
   else {
      throw new jv_ConcurrentModificationException();
   }
};

jv_TreeMap_AbstractMapIterator_c._jv_TreeMap_AbstractMapIteratorInit = function() {
};

// Generated JS from Java: java.util.TreeMap.UnboundedEntryIterator -----
function jv_TreeMap_UnboundedEntryIterator() {

   if (arguments.length == 3) {
      var map = arguments[0];
      var startNode = arguments[1];
      var startOffset = arguments[2];
      jv_TreeMap_AbstractMapIterator.call(this, map, startNode, startOffset);
   }
   else if (arguments.length == 1) {
      var map = arguments[0];
      jv_TreeMap_AbstractMapIterator.call(this, map);
   }}

var jv_TreeMap_UnboundedEntryIterator_c = sc_newInnerClass("java.util.TreeMap.UnboundedEntryIterator", jv_TreeMap_UnboundedEntryIterator, jv_TreeMap, jv_TreeMap_AbstractMapIterator, [jv_Iterator]);

jv_TreeMap_UnboundedEntryIterator_c.next = function ()  {
   this.makeNext();
   var idx = this.lastNode.right_idx - this.lastOffset;
   return new jv_TreeMap_MapEntry(this.backingMap, this.lastNode, idx);
};


// Generated JS from Java: java.util.TreeMap.UnboundedKeyIterator -----
function jv_TreeMap_UnboundedKeyIterator() {

   if (arguments.length == 3) {
      var map = arguments[0];
      var startNode = arguments[1];
      var startOffset = arguments[2];
      jv_TreeMap_AbstractMapIterator.call(this, map, startNode, startOffset);
   }
   else if (arguments.length == 1) {
      var map = arguments[0];
      jv_TreeMap_AbstractMapIterator.call(this, map);
   }}

var jv_TreeMap_UnboundedKeyIterator_c = sc_newInnerClass("java.util.TreeMap.UnboundedKeyIterator", jv_TreeMap_UnboundedKeyIterator, jv_TreeMap, jv_TreeMap_AbstractMapIterator, [jv_Iterator]);

jv_TreeMap_UnboundedKeyIterator_c.next = function ()  {
   this.makeNext();
   return this.lastNode.keys[this.lastNode.right_idx - this.lastOffset];
};


// Generated JS from Java: java.util.TreeMap.UnboundedValueIterator -----
function jv_TreeMap_UnboundedValueIterator() {

   if (arguments.length == 3) {
      var map = arguments[0];
      var startNode = arguments[1];
      var startOffset = arguments[2];
      jv_TreeMap_AbstractMapIterator.call(this, map, startNode, startOffset);
   }
   else if (arguments.length == 1) {
      var map = arguments[0];
      jv_TreeMap_AbstractMapIterator.call(this, map);
   }}

var jv_TreeMap_UnboundedValueIterator_c = sc_newInnerClass("java.util.TreeMap.UnboundedValueIterator", jv_TreeMap_UnboundedValueIterator, jv_TreeMap, jv_TreeMap_AbstractMapIterator, [jv_Iterator]);

jv_TreeMap_UnboundedValueIterator_c.next = function ()  {
   this.makeNext();
   return this.lastNode.values[this.lastNode.right_idx - this.lastOffset];
};


// Generated JS from Java: java.util.TreeMap.BoundedMapIterator -----
function jv_TreeMap_BoundedMapIterator() {
   this.finalNode = null;
   this.finalOffset = 0;

   if (arguments.length == 5) {
      var startNode = arguments[0];
      var startOffset = arguments[1];
      var map = arguments[2];
      var finalNode = arguments[3];
      var finalOffset = arguments[4];
      jv_TreeMap_AbstractMapIterator.call(this, map, finalNode === null ? null : startNode, startOffset);
   this._jv_TreeMap_BoundedMapIteratorInit();
      this.finalNode = finalNode;
      this.finalOffset = finalOffset;
   }
   else if (arguments.length == 4) {
      if (sc_paramType(arguments[0], jv_TreeMap_Node) && sc_instanceOf(arguments[1], Number) && sc_paramType(arguments[2], jv_TreeMap) && sc_paramType(arguments[3], jv_TreeMap_Node)) { 
         var startNode = arguments[0];
         var startOffset = arguments[1];
         var map = arguments[2];
         var finalNode = arguments[3];
         jv_TreeMap_BoundedMapIterator.call(this, startNode, startOffset, map, finalNode,
                 finalNode.right_idx - finalNode.left_idx);
}else if (sc_paramType(arguments[0], jv_TreeMap_Node) && sc_paramType(arguments[1], jv_TreeMap) && sc_paramType(arguments[2], jv_TreeMap_Node) && sc_instanceOf(arguments[3], Number)) { 
         var startNode = arguments[0];
         var map = arguments[1];
         var finalNode = arguments[2];
         var finalOffset = arguments[3];
         jv_TreeMap_BoundedMapIterator.call(this, startNode,
                 startNode !== null ? startNode.right_idx - startNode.left_idx : 0, map,
                 finalNode, finalOffset);
}   }}

var jv_TreeMap_BoundedMapIterator_c = sc_newInnerClass("java.util.TreeMap.BoundedMapIterator", jv_TreeMap_BoundedMapIterator, jv_TreeMap, jv_TreeMap_AbstractMapIterator, null);

jv_TreeMap_BoundedMapIterator_c.makeBoundedNext = function ()  {
   this.makeNext();
   if (this.lastNode === this.finalNode && this.lastOffset === this.finalOffset) {
      this.node = null;
   }
};

jv_TreeMap_BoundedMapIterator_c._jv_TreeMap_BoundedMapIteratorInit = function() {
};

// Generated JS from Java: java.util.TreeMap.BoundedEntryIterator -----
function jv_TreeMap_BoundedEntryIterator(startNode, startOffset, map, finalNode, finalOffset) {

   jv_TreeMap_BoundedMapIterator.call(this, startNode, startOffset, map, finalNode, finalOffset);
}

var jv_TreeMap_BoundedEntryIterator_c = sc_newInnerClass("java.util.TreeMap.BoundedEntryIterator", jv_TreeMap_BoundedEntryIterator, jv_TreeMap, jv_TreeMap_BoundedMapIterator, [jv_Iterator]);

jv_TreeMap_BoundedEntryIterator_c.next = function ()  {
   this.makeBoundedNext();
   var idx = this.lastNode.right_idx - this.lastOffset;
   return new jv_TreeMap_MapEntry(this.backingMap, this.lastNode, idx);
};


// Generated JS from Java: java.util.TreeMap.BoundedKeyIterator -----
function jv_TreeMap_BoundedKeyIterator(startNode, startOffset, map, finalNode, finalOffset) {

   jv_TreeMap_BoundedMapIterator.call(this, startNode, startOffset, map, finalNode, finalOffset);
}

var jv_TreeMap_BoundedKeyIterator_c = sc_newInnerClass("java.util.TreeMap.BoundedKeyIterator", jv_TreeMap_BoundedKeyIterator, jv_TreeMap, jv_TreeMap_BoundedMapIterator, [jv_Iterator]);

jv_TreeMap_BoundedKeyIterator_c.next = function ()  {
   this.makeBoundedNext();
   return this.lastNode.keys[this.lastNode.right_idx - this.lastOffset];
};


// Generated JS from Java: java.util.TreeMap.BoundedValueIterator -----
function jv_TreeMap_BoundedValueIterator(startNode, startOffset, map, finalNode, finalOffset) {

   jv_TreeMap_BoundedMapIterator.call(this, startNode, startOffset, map, finalNode, finalOffset);
}

var jv_TreeMap_BoundedValueIterator_c = sc_newInnerClass("java.util.TreeMap.BoundedValueIterator", jv_TreeMap_BoundedValueIterator, jv_TreeMap, jv_TreeMap_BoundedMapIterator, [jv_Iterator]);

jv_TreeMap_BoundedValueIterator_c.next = function ()  {
   this.makeBoundedNext();
   return this.lastNode.values[this.lastNode.right_idx - this.lastOffset];
};


// Generated JS from Java: java.util.TreeMap.SubMap -----
function jv_TreeMap_SubMap() {

   jv_TreeMap_SubMap_c._clInit();
   this.backingMap = null;
   this.hasStart = false;
 this.hasEnd = false;
   this.startKey = null;
 this.endKey = null;
   this._entrySet = null;
   this.firstKeyModCount = 0;
   this.lastKeyModCount = 0;
   this.firstKeyNode = null;
   this.firstKeyIndex = 0;
   this.lastKeyNode = null;
   this.lastKeyIndex = 0;

   if (arguments.length == 2) {
      if (sc_paramType(arguments[0], jv_Object) && sc_paramType(arguments[1], jv_TreeMap)) { 
         var start = arguments[0];
         var map = arguments[1];
         jv_AbstractMap.call(this);
   this._jv_TreeMap_SubMapInit();
         this.backingMap = map;
         this.hasStart = true;
         this.startKey = start;
}else if (sc_paramType(arguments[0], jv_TreeMap) && sc_paramType(arguments[1], jv_Object)) { 
         var map = arguments[0];
         var end = arguments[1];
         jv_AbstractMap.call(this);
   this._jv_TreeMap_SubMapInit();
         this.backingMap = map;
         this.hasEnd = true;
         this.endKey = end;
}   }
   else if (arguments.length == 3) {
      var start = arguments[0];
      var map = arguments[1];
      var end = arguments[2];
      jv_AbstractMap.call(this);
   this._jv_TreeMap_SubMapInit();
      this.backingMap = map;
      this.hasStart = this.hasEnd = true;
      this.startKey = start;
      this.endKey = end;
   }}

var jv_TreeMap_SubMap_c = sc_newInnerClass("java.util.TreeMap.SubMap", jv_TreeMap_SubMap, jv_TreeMap, jv_AbstractMap, [jv_SortedMap,jv_EmptyInterface]);

jv_TreeMap_SubMap_c.clear = function ()  {
   this.keySet().clear();
};
jv_TreeMap_SubMap_c.containsKey = function (key)  {
   if (this.isInRange((key))) {
      return this.backingMap.containsKey(key);
   }
   return false;
};
jv_TreeMap_SubMap_c.containsValue = function (value)  {
   var it = this.values().iterator();
   if (value !== null) {
      while (it.hasNext()) {
         if (value.equals(it.next())) {
            return true;
         }
      }
   }
   else {
      while (it.hasNext()) {
         if (it.next() === null) {
            return true;
         }
      }
   }
   return false;
};
jv_TreeMap_SubMap_c.entrySet = function ()  {
   if (this._entrySet === null) {
      this._entrySet = new jv_TreeMap_SubMapEntrySet(this);
   }
   return this._entrySet;
};
jv_TreeMap_SubMap_c.get = function (key)  {
   if (this.isInRange((key))) {
      return this.backingMap.get(key);
   }
   return null;
};
jv_TreeMap_SubMap_c.isEmpty = function ()  {
   if (this.hasStart) {
      this.setFirstKey();
      return this.firstKeyNode === null;
   }
   else {
      this.setLastKey();
      return this.lastKeyNode === null;
   }
};
jv_TreeMap_SubMap_c.keySet = function ()  {
   if (this._keySet === null) {
      this._keySet = new jv_TreeMap_SubMapKeySet(this);
   }
   return this._keySet;
};
jv_TreeMap_SubMap_c.put = function (key, value)  {
   if (this.isInRange(key)) {
      return this.backingMap.put(key, value);
   }
   throw new jv_IllegalArgumentException();
};
jv_TreeMap_SubMap_c.remove = function (key)  {
   if (this.isInRange((key))) {
      return this.backingMap.remove(key);
   }
   return null;
};
jv_TreeMap_SubMap_c.size = function ()  {
   var from, to;
   var fromIndex, toIndex;
   if (this.hasStart) {
      this.setFirstKey();
      from = this.firstKeyNode;
      fromIndex = this.firstKeyIndex;
   }
   else {
      from = sc_clInit(jv_TreeMap_c).minimum(this.backingMap.root);
      fromIndex = from === null ? 0 : from.left_idx;
   }
   if (from === null) {
      return 0;
   }
   if (this.hasEnd) {
      this.setLastKey();
      to = this.lastKeyNode;
      toIndex = this.lastKeyIndex;
   }
   else {
      to = sc_clInit(jv_TreeMap_c).maximum(this.backingMap.root);
      toIndex = to === null ? 0 : to.right_idx;
   }
   if (to === null) {
      return 0;
   }
   if (from === to) {
      return toIndex - fromIndex + 1;
   }
   var sum = 0;
   while (from !== to) {
      sum += (from.right_idx - fromIndex + 1);
      from = from.next;
      fromIndex = from.left_idx;
   }
   return sum + toIndex - fromIndex + 1;
};
jv_TreeMap_SubMap_c.values = function ()  {
   if (this.valuesCollection === null) {
      this.valuesCollection = new jv_TreeMap_SubMapValuesCollection(this);
   }
   return this.valuesCollection;
};
jv_TreeMap_SubMap_c.checkRange = function (key)  {
   var cmp = this.backingMap._comparator;
   if (cmp === null) {
      var object = sc_clInit(jv_TreeMap_c).toComparable(key);
      if (this.hasStart && object.compareTo(this.startKey) < 0) {
         throw new jv_IllegalArgumentException();
      }
      if (this.hasEnd && object.compareTo(this.endKey) > 0) {
         throw new jv_IllegalArgumentException();
      }
   }
   else {
      if (this.hasStart && this.backingMap.comparator().compare(key, this.startKey) < 0) {
         throw new jv_IllegalArgumentException();
      }
      if (this.hasEnd && this.backingMap.comparator().compare(key, this.endKey) > 0) {
         throw new jv_IllegalArgumentException();
      }
   }
};
jv_TreeMap_SubMap_c.isInRange = function (key)  {
   if (arguments.length == 0) return;
   var cmp = this.backingMap._comparator;
   if (cmp === null) {
      var object = sc_clInit(jv_TreeMap_c).toComparable(key);
      if (this.hasStart && object.compareTo(this.startKey) < 0) {
         return false;
      }
      if (this.hasEnd && object.compareTo(this.endKey) >= 0) {
         return false;
      }
   }
   else {
      if (this.hasStart && cmp.compare(key, this.startKey) < 0) {
         return false;
      }
      if (this.hasEnd && cmp.compare(key, this.endKey) >= 0) {
         return false;
      }
   }
   return true;
};
jv_TreeMap_SubMap_c.checkUpperBound = function (key)  {
   if (this.hasEnd) {
      var cmp = this.backingMap._comparator;
      if (cmp === null) {
         return(jv_TreeMap_c.toComparable(key).compareTo(this.endKey) < 0);
      }
      return(cmp.compare(key, this.endKey) < 0);
   }
   return true;
};
jv_TreeMap_SubMap_c.checkLowerBound = function (key)  {
   if (this.hasStart) {
      var cmp = this.backingMap._comparator;
      if (cmp === null) {
         return(jv_TreeMap_c.toComparable(key).compareTo(this.startKey) >= 0);
      }
      return(cmp.compare(key, this.startKey) >= 0);
   }
   return true;
};
jv_TreeMap_SubMap_c.comparator = function ()  {
   return this.backingMap.comparator();
};
jv_TreeMap_SubMap_c.setFirstKey = function ()  {
   if (this.firstKeyModCount === this.backingMap.modCount) {
      return;
   }
   var object = this.backingMap._comparator === null ? sc_clInit(jv_TreeMap_c).toComparable((this.startKey)) : null;
   var key = (this.startKey);
   var node = this.backingMap.root;
   var foundNode = null;
   var foundIndex = -1;
   TOP_LOOP :
      while (node !== null) {
         var keys = node.keys;
         var left_idx = node.left_idx;
         var result = this.backingMap.cmp(object, key, keys[left_idx]);
         if (result < 0) {
            foundNode = node;
            foundIndex = left_idx;
            node = node.left;
      }
         else
         if (result === 0) {
            foundNode = node;
            foundIndex = left_idx;
            break;
      }
         else {
            var right_idx = node.right_idx;
            if (left_idx !== right_idx) {
               result = this.backingMap.cmp(object, key, keys[right_idx]);
         }
            if (result > 0) {
               node = node.right;
         }
            else
            if (result === 0) {
               foundNode = node;
               foundIndex = right_idx;
               break;
         }
            else {
               foundNode = node;
               foundIndex = right_idx;
               var low = left_idx + 1, mid = 0, high = right_idx - 1;
               while (low <= high) {
                  mid = (low + high) >>> 1;
                  result = this.backingMap.cmp(object, key, keys[mid]);
                  if (result > 0) {
                     low = mid + 1;
               }
                  else
                  if (result === 0) {
                     foundNode = node;
                     foundIndex = mid;
                     break TOP_LOOP;
               }
                  else {
                     foundNode = node;
                     foundIndex = mid;
                     high = mid - 1;
               }
            }
               break TOP_LOOP;
         }
      }
   }
   if (foundNode !== null && !this.checkUpperBound(foundNode.keys[foundIndex])) {
      foundNode = null;
   }
   this.firstKeyNode = foundNode;
   this.firstKeyIndex = foundIndex;
   this.firstKeyModCount = this.backingMap.modCount;
};
jv_TreeMap_SubMap_c.firstKey = function ()  {
   if (this.backingMap._size > 0) {
      if (!this.hasStart) {
         var node = sc_clInit(jv_TreeMap_c).minimum(this.backingMap.root);
         if (node !== null && this.checkUpperBound(node.keys[node.left_idx])) {
            return node.keys[node.left_idx];
         }
      }
      else {
         this.setFirstKey();
         if (this.firstKeyNode !== null) {
            return this.firstKeyNode.keys[this.firstKeyIndex];
         }
      }
   }
   throw new jv_NoSuchElementException();
};
jv_TreeMap_SubMap_c.headMap = function (endKey)  {
   this.checkRange(endKey);
   if (this.hasStart) {
      return new jv_TreeMap_SubMap(this.startKey, this.backingMap, endKey);
   }
   return new jv_TreeMap_SubMap(this.backingMap, endKey);
};
jv_TreeMap_SubMap_c.setLastKey = function ()  {
   if (this.lastKeyModCount === this.backingMap.modCount) {
      return;
   }
   var object = this.backingMap._comparator === null ? sc_clInit(jv_TreeMap_c).toComparable((this.endKey)) : null;
   var key = (this.endKey);
   var node = this.backingMap.root;
   var foundNode = null;
   var foundIndex = -1;
   TOP_LOOP :
      while (node !== null) {
         var keys = node.keys;
         var left_idx = node.left_idx;
         var result = this.backingMap.cmp(object, key, keys[left_idx]);
         if (result <= 0) {
            node = node.left;
      }
         else {
            var right_idx = node.right_idx;
            if (left_idx !== right_idx) {
               result = this.backingMap.cmp(object, key, keys[right_idx]);
         }
            if (result > 0) {
               foundNode = node;
               foundIndex = right_idx;
               node = node.right;
         }
            else
            if (result === 0) {
               if (node.left_idx === node.right_idx) {
                  foundNode = node.prev;
                  if (foundNode !== null) {
                     foundIndex = foundNode.right_idx - 1;
               }
            }
               else {
                  foundNode = node;
                  foundIndex = right_idx - 1;
            }
               break;
         }
            else {
               foundNode = node;
               foundIndex = left_idx;
               var low = left_idx + 1, mid = 0, high = right_idx - 1;
               while (low <= high) {
                  mid = (low + high) >>> 1;
                  result = this.backingMap.cmp(object, key, keys[mid]);
                  if (result > 0) {
                     foundNode = node;
                     foundIndex = mid;
                     low = mid + 1;
               }
                  else
                  if (result === 0) {
                     foundNode = node;
                     foundIndex = mid - 1;
                     break TOP_LOOP;
               }
                  else {
                     high = mid - 1;
               }
            }
               break TOP_LOOP;
         }
      }
   }
   if (foundNode !== null && !this.checkLowerBound(foundNode.keys[foundIndex])) {
      foundNode = null;
   }
   this.lastKeyNode = foundNode;
   this.lastKeyIndex = foundIndex;
   this.lastKeyModCount = this.backingMap.modCount;
};
jv_TreeMap_SubMap_c.lastKey = function ()  {
   if (this.backingMap._size > 0) {
      if (!this.hasEnd) {
         var node = sc_clInit(jv_TreeMap_c).maximum(this.backingMap.root);
         if (node !== null && this.checkLowerBound(node.keys[node.right_idx])) {
            return node.keys[node.right_idx];
         }
      }
      else {
         this.setLastKey();
         if (this.lastKeyNode !== null) {
            return this.lastKeyNode.keys[this.lastKeyIndex];
         }
      }
   }
   throw new jv_NoSuchElementException();
};
jv_TreeMap_SubMap_c.subMap = function (startKey, endKey)  {
   this.checkRange(startKey);
   this.checkRange(endKey);
   var c = this.backingMap.comparator();
   if (c === null) {
      if (jv_TreeMap_c.toComparable(startKey).compareTo(endKey) <= 0) {
         return new jv_TreeMap_SubMap(startKey, this.backingMap, endKey);
      }
   }
   else {
      if (c.compare(startKey, endKey) <= 0) {
         return new jv_TreeMap_SubMap(startKey, this.backingMap, endKey);
      }
   }
   throw new jv_IllegalArgumentException();
};
jv_TreeMap_SubMap_c.tailMap = function (startKey)  {
   this.checkRange(startKey);
   if (this.hasEnd) {
      return new jv_TreeMap_SubMap(startKey, this.backingMap, this.endKey);
   }
   return new jv_TreeMap_SubMap(startKey, this.backingMap);
};
jv_TreeMap_SubMap_c.readObject = function (stream)  {
   stream.defaultReadObject();
   this.firstKeyModCount = -1;
   this.lastKeyModCount = -1;
};

jv_TreeMap_SubMap_c._jv_TreeMap_SubMapInit = function() {
   this._entrySet = null;
         ;
   this.firstKeyModCount = -1;
         ;
   this.lastKeyModCount = -1;
         ;
};
jv_TreeMap_SubMap_c._clInit = function() {
   if (jv_TreeMap_SubMap_c.hasOwnProperty("_clInited")) return;
   jv_TreeMap_SubMap_c._clInited = true;
   
         jv_TreeMap_SubMap_c.serialVersionUID = -6520786458950516097;
         ;
};


// Generated JS from Java: java.util.TreeMap.SubMapEntrySet -----
function jv_TreeMap_SubMapEntrySet(map) {
   this.subMap = null;

   jv_AbstractSet.call(this);
   this._jv_TreeMap_SubMapEntrySetInit();
   this.subMap = map;
}

var jv_TreeMap_SubMapEntrySet_c = sc_newInnerClass("java.util.TreeMap.SubMapEntrySet", jv_TreeMap_SubMapEntrySet, jv_TreeMap, jv_AbstractSet, [jv_Set]);

jv_TreeMap_SubMapEntrySet_c.contains = function (object)  {
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var entry = (object);
      var key = entry.getKey();
      if (this.subMap.isInRange(key)) {
         var v1 = this.subMap.get(key), v2 = entry.getValue();
         return v1 === null ? (v2 === null && this.subMap.containsKey(key)) : v1.equals(v2);
      }
   }
   return false;
};
jv_TreeMap_SubMapEntrySet_c.isEmpty = function ()  {
   return this.subMap.isEmpty();
};
jv_TreeMap_SubMapEntrySet_c.iterator = function ()  {
   var from;
   var fromIndex;
   if (this.subMap.hasStart) {
      this.subMap.setFirstKey();
      from = this.subMap.firstKeyNode;
      fromIndex = this.subMap.firstKeyIndex;
   }
   else {
      from = sc_clInit(jv_TreeMap_c).minimum(this.subMap.backingMap.root);
      fromIndex = from !== null ? from.left_idx : 0;
   }
   if (!this.subMap.hasEnd) {
      return new jv_TreeMap_UnboundedEntryIterator(this.subMap.backingMap, from,
                 from === null ? 0 : from.right_idx - fromIndex);
   }
   this.subMap.setLastKey();
   var to = this.subMap.lastKeyNode;
   var toIndex = this.subMap.lastKeyIndex;
   return new jv_TreeMap_BoundedEntryIterator(from, from === null ? 0 : from.right_idx - fromIndex, this.subMap.backingMap, to,
              to === null ? 0 : to.right_idx - toIndex);
};
jv_TreeMap_SubMapEntrySet_c.remove = function (object)  {
   if (this.contains(object)) {
      var entry = (object);
      var key = entry.getKey();
      this.subMap.remove(key);
      return true;
   }
   return false;
};
jv_TreeMap_SubMapEntrySet_c.size = function ()  {
   return this.subMap.size();
};

jv_TreeMap_SubMapEntrySet_c._jv_TreeMap_SubMapEntrySetInit = function() {
};

// Generated JS from Java: java.util.TreeMap.SubMapKeySet -----
function jv_TreeMap_SubMapKeySet(map) {
   this.subMap = null;

   jv_AbstractSet.call(this);
   this._jv_TreeMap_SubMapKeySetInit();
   this.subMap = map;
}

var jv_TreeMap_SubMapKeySet_c = sc_newInnerClass("java.util.TreeMap.SubMapKeySet", jv_TreeMap_SubMapKeySet, jv_TreeMap, jv_AbstractSet, [jv_Set]);

jv_TreeMap_SubMapKeySet_c.contains = function (object)  {
   return this.subMap.containsKey(object);
};
jv_TreeMap_SubMapKeySet_c.isEmpty = function ()  {
   return this.subMap.isEmpty();
};
jv_TreeMap_SubMapKeySet_c.iterator = function ()  {
   var from;
   var fromIndex;
   if (this.subMap.hasStart) {
      this.subMap.setFirstKey();
      from = this.subMap.firstKeyNode;
      fromIndex = this.subMap.firstKeyIndex;
   }
   else {
      from = sc_clInit(jv_TreeMap_c).minimum(this.subMap.backingMap.root);
      fromIndex = from !== null ? from.left_idx : 0;
   }
   if (!this.subMap.hasEnd) {
      return new jv_TreeMap_UnboundedKeyIterator(this.subMap.backingMap, from,
                 from === null ? 0 : from.right_idx - fromIndex);
   }
   this.subMap.setLastKey();
   var to = this.subMap.lastKeyNode;
   var toIndex = this.subMap.lastKeyIndex;
   return new jv_TreeMap_BoundedKeyIterator(from, from === null ? 0 : from.right_idx - fromIndex, this.subMap.backingMap, to,
              to === null ? 0 : to.right_idx - toIndex);
};
jv_TreeMap_SubMapKeySet_c.remove = function (object)  {
   if (this.subMap.containsKey(object)) {
      this.subMap.remove(object);
      return true;
   }
   return false;
};
jv_TreeMap_SubMapKeySet_c.size = function ()  {
   return this.subMap.size();
};

jv_TreeMap_SubMapKeySet_c._jv_TreeMap_SubMapKeySetInit = function() {
};

// Generated JS from Java: java.util.TreeMap.SubMapValuesCollection -----
function jv_TreeMap_SubMapValuesCollection(subMap) {
   this.subMap = null;

   jv_AbstractCollection.call(this);
   this._jv_TreeMap_SubMapValuesCollectionInit();
   this.subMap = subMap;
}

var jv_TreeMap_SubMapValuesCollection_c = sc_newInnerClass("java.util.TreeMap.SubMapValuesCollection", jv_TreeMap_SubMapValuesCollection, jv_TreeMap, jv_AbstractCollection, null);

jv_TreeMap_SubMapValuesCollection_c.isEmpty = function ()  {
   return this.subMap.isEmpty();
};
jv_TreeMap_SubMapValuesCollection_c.iterator = function ()  {
   var from;
   var fromIndex;
   if (this.subMap.hasStart) {
      this.subMap.setFirstKey();
      from = this.subMap.firstKeyNode;
      fromIndex = this.subMap.firstKeyIndex;
   }
   else {
      from = sc_clInit(jv_TreeMap_c).minimum(this.subMap.backingMap.root);
      fromIndex = from !== null ? from.left_idx : 0;
   }
   if (!this.subMap.hasEnd) {
      return new jv_TreeMap_UnboundedValueIterator(this.subMap.backingMap, from,
                 from === null ? 0 : from.right_idx - fromIndex);
   }
   this.subMap.setLastKey();
   var to = this.subMap.lastKeyNode;
   var toIndex = this.subMap.lastKeyIndex;
   return new jv_TreeMap_BoundedValueIterator(from, from === null ? 0 : from.right_idx - fromIndex, this.subMap.backingMap, to,
              to === null ? 0 : to.right_idx - toIndex);
};
jv_TreeMap_SubMapValuesCollection_c.size = function ()  {
   return this.subMap.size();
};

jv_TreeMap_SubMapValuesCollection_c._jv_TreeMap_SubMapValuesCollectionInit = function() {
};

// Generated JS from Java: java.util.TreeMap.__Anon1 -----
function jv_TreeMap___Anon1(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractSet.call(this);
}

var jv_TreeMap___Anon1_c = sc_newInnerClass("java.util.TreeMap.__Anon1", jv_TreeMap___Anon1, jv_TreeMap, jv_AbstractSet, null);

jv_TreeMap___Anon1_c.clear = function ()  {
   this._outer1.clear();
};
jv_TreeMap___Anon1_c.contains = function (object)  {
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var entry = (object);
      var key = entry.getKey();
      var v1 = this._outer1.get(key), v2 = entry.getValue();
      return v1 === null ? (v2 === null && this._outer1.containsKey(key)) : v1.equals(v2);
   }
   return false;
};
jv_TreeMap___Anon1_c.iterator = function ()  {
   return new jv_TreeMap_UnboundedEntryIterator(this._outer1);
};
jv_TreeMap___Anon1_c.remove = function (object)  {
   if (this.contains(object)) {
      var entry = (object);
      var key = entry.getKey();
      this._outer1.remove(key);
      return true;
   }
   return false;
};
jv_TreeMap___Anon1_c.size = function ()  {
   return this._outer1._size;
};


// Generated JS from Java: java.util.TreeMap.__Anon2 -----
function jv_TreeMap___Anon2(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractSet.call(this);
}

var jv_TreeMap___Anon2_c = sc_newInnerClass("java.util.TreeMap.__Anon2", jv_TreeMap___Anon2, jv_TreeMap, jv_AbstractSet, null);

jv_TreeMap___Anon2_c.clear = function ()  {
   this._outer1.clear();
};
jv_TreeMap___Anon2_c.contains = function (object)  {
   return this._outer1.containsKey(object);
};
jv_TreeMap___Anon2_c.iterator = function ()  {
   return new jv_TreeMap_UnboundedKeyIterator(this._outer1);
};
jv_TreeMap___Anon2_c.remove = function (object)  {
   if (this.contains(object)) {
      this._outer1.remove(object);
      return true;
   }
   return false;
};
jv_TreeMap___Anon2_c.size = function ()  {
   return this._outer1.size;
};


// Generated JS from Java: java.util.TreeMap.__Anon3 -----
function jv_TreeMap___Anon3(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractCollection.call(this);
}

var jv_TreeMap___Anon3_c = sc_newInnerClass("java.util.TreeMap.__Anon3", jv_TreeMap___Anon3, jv_TreeMap, jv_AbstractCollection, null);

jv_TreeMap___Anon3_c.clear = function ()  {
   this._outer1.clear();
};
jv_TreeMap___Anon3_c.contains = function (object)  {
   return this._outer1.containsValue(object);
};
jv_TreeMap___Anon3_c.iterator = function ()  {
   return new jv_TreeMap_UnboundedValueIterator(this._outer1);
};
jv_TreeMap___Anon3_c.size = function ()  {
   return this._outer1._size;
};


// Generated JS from Java: java.util.LinkedHashSet -----
function jv_LinkedHashSet() {

   jv_LinkedHashSet_c._clInit();

   if (arguments.length == 0) {
      jv_HashSet.call(this, new jv_LinkedHashMap());
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var capacity = arguments[0];
         jv_HashSet.call(this, new jv_LinkedHashMap(capacity));
}else if (sc_paramType(arguments[0], jv_Collection)) { 
         var collection = arguments[0];
         jv_HashSet.call(this,
                 new jv_LinkedHashMap(collection.size() < 6 ? 11 : collection.size() * 2));
         for (var _i = collection.iterator(); _i.hasNext();) {
            var e = _i.next();
            this.add(e);
         }
}   }
   else if (arguments.length == 2) {
      var capacity = arguments[0];
      var loadFactor = arguments[1];
      jv_HashSet.call(this, new jv_LinkedHashMap(capacity, loadFactor));
   }}

var jv_LinkedHashSet_c = sc_newClass("java.util.LinkedHashSet", jv_LinkedHashSet, jv_HashSet, [jv_Set,jv_Cloneable,jv_EmptyInterface]);

jv_LinkedHashSet_c.createBackingMap = function (capacity, loadFactor)  {
   return new jv_LinkedHashMap(capacity, loadFactor);
};

jv_LinkedHashSet_c._clInit = function() {
   if (jv_LinkedHashSet_c.hasOwnProperty("_clInited")) return;
   jv_LinkedHashSet_c._clInited = true;
   
      jv_LinkedHashSet_c.serialVersionUID = -2851667679971038690;
      ;
};


// Generated JS from Java: java.util.IdentityHashMap -----
function jv_IdentityHashMap() {

   jv_IdentityHashMap_c._clInit();
   this.elementData = null;
   this._size = 0;
   this.threshold = 0;
   this.modCount = 0;

   if (arguments.length == 0) {
      jv_IdentityHashMap.call(this, jv_IdentityHashMap_c.DEFAULT_MAX_SIZE);
   }
   else if (arguments.length == 1) {
      if (sc_instanceOf(arguments[0], Number)) { 
         var maxSize = arguments[0];
         jv_AbstractMap.call(this);
   this._jv_IdentityHashMapInit();
         if (maxSize >= 0) {
            this._size = 0;
            this.threshold = this.getThreshold(maxSize);
            this.elementData = this.newElementArray(this.computeElementArraySize());
         }
         else {
            throw new jv_IllegalArgumentException();
         }
}else if (sc_paramType(arguments[0], jv_Map)) { 
         var map = arguments[0];
         jv_IdentityHashMap.call(this, map.size() < 6 ? 11 : map.size() * 2);
         this.putAllImpl(map);
}   }}

var jv_IdentityHashMap_c = sc_newClass("java.util.IdentityHashMap", jv_IdentityHashMap, jv_AbstractMap, [jv_Map,jv_EmptyInterface,jv_Cloneable]);

jv_IdentityHashMap_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_Map)) {
      var map = (object);
      if (this.size() !== map.size()) {
         return false;
      }
      var set = this.entrySet();
      return set.equals(map.entrySet());
   }
   return false;
};
jv_IdentityHashMap_c.clone = function ()  {
   try {
      var cloneHashMap = (jv_AbstractMap_c.clone.call(this));
      cloneHashMap.elementData = this.newElementArray(this.elementData.length);
      jv_System_c.arraycopy(this.elementData, 0, cloneHashMap.elementData, 0, this.elementData.length);
      return cloneHashMap;
   }
   catch(e) {
      if ((e instanceof jv_CloneNotSupportedException)) {
      return null;
      }
      else
         throw e;
   }
};
jv_IdentityHashMap_c.clear = function ()  {
   this._size = 0;
   for (var i = 0; i < this.elementData.length; i++) {
      this.elementData[i] = null;
   }
   this.modCount++;
};
jv_IdentityHashMap_c.containsKey = function (key)  {
   if (key === null) {
      key = jv_IdentityHashMap_c.NULL_OBJECT;
   }
   var index = jv_IdentityHashMap_c.findIndex(key, this.elementData);
   return this.elementData[index] === key;
};
jv_IdentityHashMap_c.containsValue = function (value)  {
   if (value === null) {
      value = jv_IdentityHashMap_c.NULL_OBJECT;
   }
   for (var i = 1; i < this.elementData.length; i = i + 2) {
      if (this.elementData[i] === value) {
         return true;
      }
   }
   return false;
};
jv_IdentityHashMap_c.entrySet = function ()  {
   return new jv_IdentityHashMap_IdentityHashMapEntrySet(this);
};
jv_IdentityHashMap_c.get = function (key)  {
   if (key === null) {
      key = jv_IdentityHashMap_c.NULL_OBJECT;
   }
   var index = jv_IdentityHashMap_c.findIndex(key, this.elementData);
   if (this.elementData[index] === key) {
      var result = this.elementData[index + 1];
      return this.massageValue(result);
   }
   return null;
};
jv_IdentityHashMap_c.isEmpty = function ()  {
   return this._size === 0;
};
jv_IdentityHashMap_c.keySet = function ()  {
   if (this._keySet === null) {
      this._keySet = new jv_IdentityHashMap___Anon1(this);
   }
   return this._keySet;
};
jv_IdentityHashMap_c.put = function (key, value)  {
   var _key = key;
   var _value = value;
   if (_key === null) {
      _key = jv_IdentityHashMap_c.NULL_OBJECT;
   }
   if (_value === null) {
      _value = jv_IdentityHashMap_c.NULL_OBJECT;
   }
   var index = jv_IdentityHashMap_c.findIndex(_key, this.elementData);
   if (this.elementData[index] !== _key) {
      this.modCount++;
      if (++this._size > this.threshold) {
         this.rehash();
         index = jv_IdentityHashMap_c.findIndex(_key, this.elementData);
      }
      this.elementData[index] = _key;
      this.elementData[index + 1] = null;
   }
   var result = this.elementData[index + 1];
   this.elementData[index + 1] = _value;
   return this.massageValue(result);
};
jv_IdentityHashMap_c.putAll = function (map)  {
   this.putAllImpl(map);
};
jv_IdentityHashMap_c.remove = function (key)  {
   if (key === null) {
      key = jv_IdentityHashMap_c.NULL_OBJECT;
   }
   var hashedOk;
   var index, next, hash;
   var result, object;
   index = next = jv_IdentityHashMap_c.findIndex(key, this.elementData);
   if (this.elementData[index] !== key) {
      return null;
   }
   result = this.elementData[index + 1];
   var length = this.elementData.length;
   while (true) {
      next = (next + 2) % length;
      object = this.elementData[next];
      if (object === null) {
         break;
      }
      hash = jv_IdentityHashMap_c.getModuloHash(object, length);
      hashedOk = hash > index;
      if (next < index) {
         hashedOk = hashedOk || (hash <= next);
      }
      else {
         hashedOk = hashedOk && (hash <= next);
      }
      if (!hashedOk) {
         this.elementData[index] = object;
         this.elementData[index + 1] = this.elementData[next + 1];
         index = next;
      }
   }
   this._size--;
   this.modCount++;
   this.elementData[index] = null;
   this.elementData[index + 1] = null;
   return this.massageValue(result);
};
jv_IdentityHashMap_c.size = function ()  {
   return this._size;
};
jv_IdentityHashMap_c.values = function ()  {
   if (this.valuesCollection === null) {
      this.valuesCollection = new jv_IdentityHashMap___Anon2(this);
   }
   return this.valuesCollection;
};
jv_IdentityHashMap_c.getThreshold = function (maxSize)  {
   if (arguments.length == 0) return;
   return maxSize > 3 ? maxSize : 3;
};
jv_IdentityHashMap_c.computeElementArraySize = function ()  {
   var arraySize = Math.floor((((this.threshold) * 10000) / jv_IdentityHashMap_c.loadFactor)) * 2;
   return arraySize < 0 ? -arraySize : arraySize;
};
jv_IdentityHashMap_c.newElementArray = function (s)  {
   return sc_newArray(jv_Object_c, s);
};
jv_IdentityHashMap_c.massageValue = function (value)  {
   return(((value === jv_IdentityHashMap_c.NULL_OBJECT) ? null : value));
};
jv_IdentityHashMap_c.getEntry = function () /* overloaded */ {
   if (arguments.length == 0) return;
      if (sc_instanceOf(arguments[0], Number)) { 
      var index = arguments[0];
      return new jv_IdentityHashMap_IdentityHashMapEntry((this.elementData[index]), (this.elementData[index + 1]), this.elementData);
}
      else if (sc_paramType(arguments[0], jv_Object)) { 
      var key = arguments[0];
      if (key === null) {
         key = jv_IdentityHashMap_c.NULL_OBJECT;
      }
      var index = jv_IdentityHashMap_c.findIndex(key, this.elementData);
      if (this.elementData[index] === key) {
         return this.getEntry(index);
      }
      return null;
}};
jv_IdentityHashMap_c.findIndex = function (key, array)  {
   jv_IdentityHashMap_c._clInit();
   var length = array.length;
   var index = jv_IdentityHashMap_c.getModuloHash(key, length);
   var last = (index + length - 2) % length;
   while (index !== last) {
      if (array[index] === key || (array[index] === null)) {
         break;
      }
      index = (index + 2) % length;
   }
   return index;
};
jv_IdentityHashMap_c.getModuloHash = function (key, length)  {
   if (arguments.length == 0) return;
   jv_IdentityHashMap_c._clInit();
   return((jv_System_c.identityHashCode(key) & 0x7FFFFFFF) % (length / 2)) * 2;
};
jv_IdentityHashMap_c.rehash = function ()  {
   var newlength = this.elementData.length << 1;
   if (newlength === 0) {
      newlength = 1;
   }
   var newData = this.newElementArray(newlength);
   for (var i = 0; i < this.elementData.length; i = i + 2) {
      var key = this.elementData[i];
      if (key !== null) {
         var index = jv_IdentityHashMap_c.findIndex(key, newData);
         newData[index] = key;
         newData[index + 1] = this.elementData[i + 1];
      }
   }
   this.elementData = newData;
   this.computeMaxSize();
};
jv_IdentityHashMap_c.computeMaxSize = function ()  {
   this.threshold = Math.floor((((this.elementData.length / 2)) * jv_IdentityHashMap_c.loadFactor / 10000));
};
jv_IdentityHashMap_c.writeObject = function (stream)  {
   stream.defaultWriteObject();
   stream.writeInt(this._size);
   var iterator = this.entrySet().iterator();
   while (iterator.hasNext()) {
      var entry = (iterator.next());
      stream.writeObject(entry.key);
      stream.writeObject(entry.value);
   }
};
jv_IdentityHashMap_c.readObject = function (stream)  {
   stream.defaultReadObject();
   var savedSize = stream.readInt();
   this.threshold = this.getThreshold(jv_IdentityHashMap_c.DEFAULT_MAX_SIZE);
   this.elementData = this.newElementArray(this.computeElementArraySize());
   for (var i = savedSize; --i >= 0;) {
      var key = (stream.readObject());
      this.put(key, (stream.readObject()));
   }
   this._size = savedSize;
};
jv_IdentityHashMap_c.putAllImpl = function (map)  {
   if (map.entrySet() !== null) {
      jv_AbstractMap_c.putAll.call(this, map);
   }
};

jv_IdentityHashMap_c._jv_IdentityHashMapInit = function() {
   this.modCount = 0;
      ;
};
jv_IdentityHashMap_c._clInit = function() {
   if (jv_IdentityHashMap_c.hasOwnProperty("_clInited")) return;
   jv_IdentityHashMap_c._clInited = true;
   
      jv_IdentityHashMap_c.serialVersionUID = 8188218128353913216;
      ;
      jv_IdentityHashMap_c.DEFAULT_MAX_SIZE = 21;
      ;
      jv_IdentityHashMap_c.loadFactor = 7500;
      ;
      jv_IdentityHashMap_c.NULL_OBJECT = new jv_Object();
      ;
};


// Generated JS from Java: java.util.IdentityHashMap.IdentityHashMapEntry -----
function jv_IdentityHashMap_IdentityHashMapEntry(theKey, theValue, elementData) {
   this.iKey = null;
   this.elementData = null;

   jv_MapEntry.call(this, (theKey) === sc_clInit(jv_IdentityHashMap_c).NULL_OBJECT ? null : theKey,
           (theValue) === sc_clInit(jv_IdentityHashMap_c).NULL_OBJECT ? null : theValue);
   this._jv_IdentityHashMap_IdentityHashMapEntryInit();
   this.iKey = theKey;
   this.elementData = elementData;
}

var jv_IdentityHashMap_IdentityHashMapEntry_c = sc_newInnerClass("java.util.IdentityHashMap.IdentityHashMapEntry", jv_IdentityHashMap_IdentityHashMapEntry, jv_IdentityHashMap, jv_MapEntry, null);

jv_IdentityHashMap_IdentityHashMapEntry_c.equals = function (object)  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.equals.apply(this, arguments);
   }
   if (this === object) {
      return true;
   }
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var entry = (object);
      return(this.key === entry.getKey()) && (this.value === entry.getValue());
   }
   return false;
};
jv_IdentityHashMap_IdentityHashMapEntry_c.toString = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.toString.apply(this, arguments);
   }
   return this.key + "=" + this.value;
};
jv_IdentityHashMap_IdentityHashMapEntry_c.hashCode = function ()  {
   if (this.hasOwnProperty("$protoName")) {
      return jv_Class_c.hashCode.apply(this, arguments);
   }
   return jv_System_c.identityHashCode(this.key) ^ jv_System_c.identityHashCode(this.value);
};
jv_IdentityHashMap_IdentityHashMapEntry_c.clone = function ()  {
   return jv_MapEntry_c.clone.call(this);
};
jv_IdentityHashMap_IdentityHashMapEntry_c.setValue = function (object)  {
   var index = sc_clInit(jv_IdentityHashMap_c).findIndex(this.iKey, this.elementData);
   if (this.elementData[index] === this.key) {
      this.elementData[index + 1] = object;
   }
   return jv_MapEntry_c.setValue.call(this, object);
};

jv_IdentityHashMap_IdentityHashMapEntry_c._jv_IdentityHashMap_IdentityHashMapEntryInit = function() {
};

// Generated JS from Java: java.util.IdentityHashMap.IdentityHashMapIterator -----
function jv_IdentityHashMap_IdentityHashMapIterator(value, hm) {
   this.position = 0;
   this.lastPosition = 0;
   this.associatedMap = null;
   this.expectedModCount = 0;
   this.type = null;
   this.canRemove = false;

   jv_Object.call(this);
   this._jv_IdentityHashMap_IdentityHashMapIteratorInit();
   this.associatedMap = hm;
   this.type = value;
   this.expectedModCount = hm.modCount;
}

var jv_IdentityHashMap_IdentityHashMapIterator_c = sc_newInnerClass("java.util.IdentityHashMap.IdentityHashMapIterator", jv_IdentityHashMap_IdentityHashMapIterator, jv_IdentityHashMap, jv_Object, [jv_Iterator]);

jv_IdentityHashMap_IdentityHashMapIterator_c.hasNext = function ()  {
   while (this.position < this.associatedMap.elementData.length) {
      if (this.associatedMap.elementData[this.position] === null) {
         this.position += 2;
      }
      else {
         return true;
      }
   }
   return false;
};
jv_IdentityHashMap_IdentityHashMapIterator_c.checkConcurrentMod = function ()  {
   if (this.expectedModCount !== this.associatedMap.modCount) {
      throw new jv_ConcurrentModificationException();
   }
};
jv_IdentityHashMap_IdentityHashMapIterator_c.next = function ()  {
   this.checkConcurrentMod();
   if (!this.hasNext()) {
      throw new jv_NoSuchElementException();
   }
   var result = this.associatedMap.getEntry(this.position);
   this.lastPosition = this.position;
   this.position += 2;
   this.canRemove = true;
   return this.type.get(result);
};
jv_IdentityHashMap_IdentityHashMapIterator_c.remove = function ()  {
   this.checkConcurrentMod();
   if (!this.canRemove) {
      throw new jv_IllegalStateException();
   }
   this.canRemove = false;
   this.associatedMap.remove(this.associatedMap.elementData[this.lastPosition]);
   this.position = this.lastPosition;
   this.expectedModCount++;
};

jv_IdentityHashMap_IdentityHashMapIterator_c._jv_IdentityHashMap_IdentityHashMapIteratorInit = function() {
   this.position = 0;
         ;
   this.lastPosition = 0;
         ;
   this.canRemove = false;
         ;
};

// Generated JS from Java: java.util.IdentityHashMap.IdentityHashMapEntrySet -----
function jv_IdentityHashMap_IdentityHashMapEntrySet(hm) {
   this.associatedMap = null;

   jv_AbstractSet.call(this);
   this._jv_IdentityHashMap_IdentityHashMapEntrySetInit();
   this.associatedMap = hm;
}

var jv_IdentityHashMap_IdentityHashMapEntrySet_c = sc_newInnerClass("java.util.IdentityHashMap.IdentityHashMapEntrySet", jv_IdentityHashMap_IdentityHashMapEntrySet, jv_IdentityHashMap, jv_AbstractSet, null);

jv_IdentityHashMap_IdentityHashMapEntrySet_c.clear = function ()  {
   this.associatedMap.clear();
};
jv_IdentityHashMap_IdentityHashMapEntrySet_c.contains = function (object)  {
   if (sc_instanceOf(object, jv_Map_Entry)) {
      var entry = this.associatedMap.getEntry(((object)).getKey());
      return entry !== null && entry.equals(object);
   }
   return false;
};
jv_IdentityHashMap_IdentityHashMapEntrySet_c.iterator = function ()  {
   return new jv_IdentityHashMap_IdentityHashMapIterator(new jv_IdentityHashMap_IdentityHashMapEntrySet___Anon1(this),
              this.associatedMap);
};
jv_IdentityHashMap_IdentityHashMapEntrySet_c.remove = function (object)  {
   if (this.contains(object)) {
      this.associatedMap.remove(((object)).getKey());
      return true;
   }
   return false;
};
jv_IdentityHashMap_IdentityHashMapEntrySet_c.size = function ()  {
   return this.associatedMap._size;
};
jv_IdentityHashMap_IdentityHashMapEntrySet_c.hashMap = function ()  {
   return this.associatedMap;
};

jv_IdentityHashMap_IdentityHashMapEntrySet_c._jv_IdentityHashMap_IdentityHashMapEntrySetInit = function() {
};

// Generated JS from Java: java.util.IdentityHashMap.IdentityHashMapEntrySet.__Anon1 -----
function jv_IdentityHashMap_IdentityHashMapEntrySet___Anon1(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_Object.call(this);
}

var jv_IdentityHashMap_IdentityHashMapEntrySet___Anon1_c = sc_newInnerClass("java.util.IdentityHashMap.IdentityHashMapEntrySet.__Anon1", jv_IdentityHashMap_IdentityHashMapEntrySet___Anon1, jv_IdentityHashMap_IdentityHashMapEntrySet, jv_Object, [jv_MapEntry_Type]);

jv_IdentityHashMap_IdentityHashMapEntrySet___Anon1_c.get = function (entry)  {
   return entry;
};


// Generated JS from Java: java.util.IdentityHashMap.__Anon1 -----
function jv_IdentityHashMap___Anon1(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractSet.call(this);
}

var jv_IdentityHashMap___Anon1_c = sc_newInnerClass("java.util.IdentityHashMap.__Anon1", jv_IdentityHashMap___Anon1, jv_IdentityHashMap, jv_AbstractSet, null);

jv_IdentityHashMap___Anon1_c.clear = function ()  {
   this._outer1.clear();
};
jv_IdentityHashMap___Anon1_c.contains = function (object)  {
   return this._outer1.containsKey(object);
};
jv_IdentityHashMap___Anon1_c.iterator = function ()  {
   return new jv_IdentityHashMap_IdentityHashMapIterator(new jv_IdentityHashMap___Anon1___Anon1(this), this._outer1);
};
jv_IdentityHashMap___Anon1_c.remove = function (key)  {
   if (this._outer1.containsKey(key)) {
      this._outer1.remove(key);
      return true;
   }
   return false;
};
jv_IdentityHashMap___Anon1_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.IdentityHashMap.__Anon1.__Anon1 -----
function jv_IdentityHashMap___Anon1___Anon1(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_Object.call(this);
}

var jv_IdentityHashMap___Anon1___Anon1_c = sc_newInnerClass("java.util.IdentityHashMap.__Anon1.__Anon1", jv_IdentityHashMap___Anon1___Anon1, jv_IdentityHashMap___Anon1, jv_Object, [jv_MapEntry_Type]);

jv_IdentityHashMap___Anon1___Anon1_c.get = function (entry)  {
   return entry.key;
};


// Generated JS from Java: java.util.IdentityHashMap.__Anon1.__Anon2 -----
function jv_IdentityHashMap___Anon1___Anon2(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_Object.call(this);
}

var jv_IdentityHashMap___Anon1___Anon2_c = sc_newInnerClass("java.util.IdentityHashMap.__Anon1.__Anon2", jv_IdentityHashMap___Anon1___Anon2, jv_IdentityHashMap___Anon1, jv_Object, [jv_MapEntry_Type]);

jv_IdentityHashMap___Anon1___Anon2_c.get = function (entry)  {
   return entry.key;
};


// Generated JS from Java: java.util.IdentityHashMap.__Anon2 -----
function jv_IdentityHashMap___Anon2(_outer) {

   this._outer1 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_AbstractCollection.call(this);
}

var jv_IdentityHashMap___Anon2_c = sc_newInnerClass("java.util.IdentityHashMap.__Anon2", jv_IdentityHashMap___Anon2, jv_IdentityHashMap, jv_AbstractCollection, null);

jv_IdentityHashMap___Anon2_c.clear = function ()  {
   this._outer1.clear();
};
jv_IdentityHashMap___Anon2_c.contains = function (object)  {
   return this._outer1.containsValue(object);
};
jv_IdentityHashMap___Anon2_c.iterator = function ()  {
   return new jv_IdentityHashMap_IdentityHashMapIterator(new jv_IdentityHashMap___Anon2___Anon1(this), this._outer1);
};
jv_IdentityHashMap___Anon2_c.remove = function (object)  {
   var it = this.iterator();
   while (it.hasNext()) {
      if (object === it.next()) {
         it.remove();
         return true;
      }
   }
   return false;
};
jv_IdentityHashMap___Anon2_c.size = function ()  {
   return this._outer1.size();
};


// Generated JS from Java: java.util.IdentityHashMap.__Anon2.__Anon1 -----
function jv_IdentityHashMap___Anon2___Anon1(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_Object.call(this);
}

var jv_IdentityHashMap___Anon2___Anon1_c = sc_newInnerClass("java.util.IdentityHashMap.__Anon2.__Anon1", jv_IdentityHashMap___Anon2___Anon1, jv_IdentityHashMap___Anon2, jv_Object, [jv_MapEntry_Type]);

jv_IdentityHashMap___Anon2___Anon1_c.get = function (entry)  {
   return entry.value;
};


// Generated JS from Java: java.util.IdentityHashMap.__Anon2.__Anon2 -----
function jv_IdentityHashMap___Anon2___Anon2(_outer) {

   this._outer2 = _outer;
   if (this.outer === undefined) this.outer = _outer;
   jv_Object.call(this);
}

var jv_IdentityHashMap___Anon2___Anon2_c = sc_newInnerClass("java.util.IdentityHashMap.__Anon2.__Anon2", jv_IdentityHashMap___Anon2___Anon2, jv_IdentityHashMap___Anon2, jv_Object, [jv_MapEntry_Type]);

jv_IdentityHashMap___Anon2___Anon2_c.get = function (entry)  {
   return entry.value;
};


//# sourceMappingURL=jvsys.js.map
