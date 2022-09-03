function sc_logError(str) {
   if (window.sc_errorCount === undefined)
      window.sc_errorCount = 0;
   window.sc_errorCount++;
   if (window.sc_errorCountListener != undefined)
      window.sc_errorCountListener();
   var pstr = sc_logPrefix() + str;
   console.error(pstr);
   sc_rlog(pstr);
}

function sc_rlog(str) {
   if (sc_PTypeUtil_c && sc_PTypeUtil_c.testMode) {
      var log = window.sc_consoleLog;
      if (log === undefined)
         window.sc_consoleLog = log = [str];
      else
         log.push(str);
   }
}

function sc_log(str) {
   var pstr = sc_logPrefix() + str;
   sc_rlog(pstr);
   console.log(pstr);
}

function sc_getConsoleLog() {
    if (window.sc_consoleLog)
       return window.sc_consoleLog.join("\n");
   return "<empty js console>";
}

// So we can track javascript system errors using the same status symbol
window.onerror = function (errorMsg, url, lineNumber) {
   sc_logError(errorMsg + " at: " + url + ":" + lineNumber);
}

var sc$classTable = {};
var sc$liveDynamicTypes = true;

var sc$nextid = 1;
function sc_id(obj) {
   if (!sc_hasProp(obj, "sc$id"))
      obj.sc$id = sc$nextid++;
   return obj.sc$id;
}

function sc_hasProp(obj, prop) {
   if (obj.hasOwnProperty)
      return obj.hasOwnProperty(prop);
   return obj[prop] !== undefined;
}

function sc_newObj(typeName, newConstr, extendsClass, implArr) {
   return sc_newInnerObj(typeName, newConstr, null, extendsClass, implArr);
}

function sc_newInnerObj(typeName, newConstr, outerClass, extendsClass, implArr) {
   var proto = sc_newInnerClass(typeName, newConstr, outerClass, extendsClass, implArr);
   proto.$objectType = true;
   return proto;
}

function sc_newClass(typeName, newConstr, extendsClass, implArr) {
   return sc_newInnerClass(typeName, newConstr, null, extendsClass, implArr);
}

function sc_newInnerClass(typeName, newConstr, outerClass, extendsClass, implArr) {
   if (sc$classTable[typeName])
      sc_log("Warning: class: " + typeName + " already defined in another js file - May need @JSSettings to specify a shared jsModuleFile for this type.");

   function $clProto() {};

   if (newConstr === undefined || newConstr == null) {
      console.log("No constructor for: " + typeName);  
      newConstr = new $clProto();
   }

   newConstr.$typeName = typeName;
   sc$classTable[typeName] = newConstr;
   if (extendsClass) {
      if (extendsClass.$typeName == null)
         console.log("Class: " + typeName + " initialized before its extends class: " + extendsClass);

      // TODO: replace this here and above with Object.create and get rid of $clProto
      //newConstr.prototype = Object.create(extendsClass.prototype);
      $clProto.prototype = extendsClass.prototype;
      newConstr.prototype = new $clProto();
      if (sc$liveDynamicTypes) {
         var subClasses = extendsClass.$subClasses;
         if (subClasses === undefined)
             subClasses = extendsClass.$subClasses = [];
         subClasses.push(newConstr);
      }
   }
   var newProto = newConstr.prototype;
   newProto.$protoName = typeName;

   if (implArr) {
      newConstr.$implements = implArr;
      var key;
      var newProto = newConstr.prototype;

      for (var i = 0; i < implArr.length; i++) {
         var impl = implArr[i];
         var implProto = impl.prototype;
         for (key in implProto) {
            if (key == "$extends" || key == "prototype" || key == "constructor" || key == "$protoName" || key == "$outerClass" || key == "_clInit"
                /* || key == "equals" || key == "getClass" || key == "getName" || key == "hashCode" */) // TODO: right now generated interfaces inherit from jv_Object and probably should not so these methods come through
               continue;
            if (!newProto.hasOwnProperty(key) && !newConstr.hasOwnProperty(key))
               newProto[key] = implProto[key];
         }
      }
   }

   newConstr.$extendsClass = extendsClass;
   if (outerClass != null)
      newProto.$outerClass = outerClass.prototype;
   newProto.constructor = newConstr;
   return newProto;
}

function sc_initArrayInt(arrayClass, ndim, arr) {
   arr._class = arrayClass;
   arr._ndim = ndim;
   //arr.hashCode = jv_Object_c.hashCode;
   //arr.equals = jv_Object_c.equals;
}

// Called with variable number of dim args at the end like: sc_initArray(String_c, [["a","b"], ["c", "d"], ["e", "f"]], 3, 2) for a [3][2] array
function sc_initArray(arrayClass, ndim, arr) {
   sc_initArrayInt(arrayClass, ndim - 1, arr);
   return arr;
}

// Called like sc_newArray(arrayClass, dim0Len, ... dimNLen)
function sc_newArray(arrayClass) {
   return sc_initArrDim(null, arrayClass, arguments, 0);
}

// Note that dim is 0 based - so a 1D array has dim = 0 (as per logic in BinaryExpression, JSTypeParameters, and NewExpression)
function sc_initArrDim(array, arrayClass, args, dim) {
   var len = Math.floor(args[1 + dim]);  // skipping original arrayClass arg - len converted to an int just in case it needs to be...
   var ndim = args.length - 2 - dim;
   if (dim == 0) {
      var res = new Array(len);
      sc_initArrayInt(arrayClass, ndim, res);
      array = res;
      for (var j = 0; j < len; j++) {
         if (arrayClass == Number_c)
            array[j] = 0;
         else
            array[j] = null; 
      }
   }
   else if (ndim > 0) {
      for (var i = 0; i < len; i++) {
         array[i] = sc_initArrDim(array, arrayClass, args, ++dim);
      }
   }
   return array;
}

function sc_isAssignableFrom(srcClass, dstClass) {
   if (srcClass.hasOwnProperty("$protoName") && srcClass.constructor)
      srcClass = srcClass.constructor;
   if (dstClass.hasOwnProperty("$protoName") && dstClass.constructor)
      dstClass = dstClass.constructor;
      
   if (srcClass === jv_Object)
      return true;
   if (srcClass === dstClass)
      return true;
   do {
      if (srcClass.$typeName === dstClass.$typeName) {
         return true;
      }
      var impls = dstClass.$implements;
      if (impls) {
         for (var i=0; i < impls.length; i++) {
            var impl = impls[i];
            if (sc_isAssignableFrom(srcClass, impl))
               return true;
         }
      }
      dstClass = dstClass.$extendsClass; 
   } while (dstClass);
   return false;
}

function sc_paramType(srcObj, dstClass) {
   if (srcObj == null)
      return true;
   else 
      return sc_instanceOf(srcObj, dstClass);
}

function sc_instanceOf(srcObj, dstClass) {
   if (srcObj == null)
      return false;

   return sc_isAssignableFrom(dstClass, srcObj.constructor);
}

// TODO: right now ndim is 0 based - so a 1D array is ndim = 0
function sc_arrayInstanceOf(srcObj, dstClass, ndim) {
   return srcObj != null && srcObj._class != null && srcObj._ndim == ndim && sc_isAssignableFrom(dstClass, srcObj._class.constructor);
}

function sc_arrayParamType(srcObj, dstClass, ndim) {
   return srcObj == null || sc_arrayInstanceOf(srcObj, dstClass, ndim);
}

function sc_instanceOfChar(srcObj, type) {
   return srcObj != null && srcObj.constructor == String && srcObj.length == 1;
}

function sc_charParamType(srcObj, type) {
   return srcObj == null || sc_instanceOfChar(srcObj, type);
}

function sc_instanceOfClass(obj, dstClass) {
  return obj != null && (obj.hasOwnProperty("$protoName") || obj.hasOwnProperty("$typeName"));
}

function sc_clInit(c) {
   if (c._clInit != null)
      c._clInit();
   return c;
}

// support either JS Array or List
function sc_length(arr) {
   if (arr === null || arr === undefined)
      return 0;
   if (arr.length)
      return arr.length;
   if (arr.size)
      return arr.size();
   console.log("invalid array");
   return -1;
}

function sc_arrayValue(arr, ix) {
   if (arr.get)
      return arr.get(ix);
   return arr[ix];
}

// Cross browser add and remove event facilities (from John Resig) via the quirksmode.org competition
function sc_addEventListener( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}
function sc_removeEventListener( obj, type, fn ) {
  if ( obj.detachEvent ) {
    obj.detachEvent( 'on'+type, obj[type+fn] );
    obj[type+fn] = null;
  } else
    obj.removeEventListener( type, fn, false );
}

// Returns an event listener which calls the supplied function with (event, arg)
function sc_newEventArgListener(fn, arg) {
   return function(event) {
      var _arg = arg;
      var _fn = fn;
      _fn(event, _arg);
   }
}

function sc_methodCallback(thisObj, method) {
    return function() {
      var _this = thisObj;
      method.call(_this);
   };
}

function sc_methodArgCallback(thisObj, method, arg) {
    return function() {
      var _this = thisObj;
      var _arg = arg;
      method.call(_this, _arg);
   };
}

var sc_runLaterMethods = [];
var sc_clientInitMethods = [];

function sc_runRunLaterMethods() {
   while (sc_runLaterMethods.length > 0) {
      var toRunLater = sc_runLaterMethods.slice(0);
      sc_runLaterMethods = [];
      for (var i = 0; i < toRunLater.length; i++) {
         var rlm = toRunLater[i];
         try {
            rlm.method.call(rlm.thisObj);
         }
         catch (e) {
            console.error("Exception: " + e + " in run later method: " + rlm + " stack:" + e.stack);
         }
      }
   }
   sc_runLaterScheduled = false;
}

// Set this to true when you need to pause runLaters - e.g. wait till you are about to do the next UI refresh.
var sc_runLaterScheduled = false;
var sc_evCt = 0;

function sc_addRunLaterMethod(thisObj, method, priority) {
   var i;
   var len = sc_runLaterMethods.length;
   if (len == 0 && !sc_runLaterScheduled) {
      setTimeout(sc_runRunLaterMethods, 1);
      sc_runLaterScheduled = true;
   }
   for (i = 0; i < len; i++) {
      if (priority > sc_runLaterMethods[i].priority)
         break;
   }
   var newEnt = {thisObj:thisObj, method: method, priority:priority, id:sc_evCt++};
   if (i == len)
      sc_runLaterMethods.push(newEnt);
   else
      sc_runLaterMethods.splice(i, 0, newEnt);
   return newEnt;
}

function sc_removeRunLaterMethod(ent) {
  for (var i = 0; i < sc_runLaterMethods.length; i++) {
     if (sc_runLaterMethods[i].id === ent.id) {
        sc_runLaterMethods.splice(i, 1);
        return true;
     }
  }
  return false;
}

function sc_hasPendingJobs() {
   return sc_runLaterMethods.length > 0;
}

function sc_addScheduledJob(thisObj, method, timeInMillis, repeat) {
   var f = repeat ? setInterval : setTimeout;
   return f(sc_methodCallback(thisObj, method),timeInMillis);
}

function sc_cancelScheduledJob(h, repeat) {
   if (repeat)
      clearInterval(h);
   else
      clearTimeout(h);
}

function sc_addLoadMethodListener(thisObj, method) {
   if (document.readyState === "complete" ) {
      console.log("readyState already at complete for addLoadMethodListener");
      sc_addScheduledJob(thisObj, method, 1);
   }
   else if (document.addEventListener) {
      window.addEventListener("load", sc_methodCallback(thisObj, method), false);
   } 
   else {
      window.attachEvent("onload", sc_methodCallback(thisObj, method));
   }
}

function sc_addClientInitJob(thisObj, method) {
   sc_clientInitMethods.push({thisObj:thisObj, method:method});
}

function sc_runClientInitJobs() {
   while (sc_clientInitMethods.length > 0) {
      var toRun = sc_clientInitMethods.slice(0);
      sc_clientInitMethods = [];
      for (var i = 0; i < toRun.length; i++) {
         var rm = toRun[i];
         try {
            rm.method.call(rm.thisObj);
         }
         catch (e) {
            console.error("Exception: " + e + " in client init method: " + rm + " stack:" + e.stack);
         }
      }
   }
}

// When the last argument is an array, Java will make that be the varArgs so this function simulates that rule at runtime
function sc_vararg(args, ix) {
   if (ix >= args.length) // No parameters at all in the varargs slot
      return [];
   
   var arg = args[ix];

   // Treating last arg as null as the same as no arguments. don't return [null] as with the slice call
   if (ix == args.length - 1 && (arg === null || arg.constructor === Array))
      return arg;
   return Array.prototype.slice.call(args, ix);
}

// Java does charToInt automatically but for JS this call is inserted by the code-generator
function sc_charToInt(cs) {
   // Assert cs.length == 1 
   return cs.charCodeAt(0);
}

// Registers alias for type names replaced on the server with 'replaceType'
function sc_addTypeAliases(type, list) {
   var thisConstr = sc$classTable[type.$protoName];
   for (var i = 0; i < list.length; i++)
      sc$classTable[list[i]] = thisConstr;
}

function sc_addTypeAlias(fromName, toName) {
   sc$classTable[toName] = sc$classTable[fromName];
}

function sc_noMeth(name) {
   throw new Error("Invalid method call to: " + name);
}

sc$startTime = new Date().getTime();

function sc_logPrefix() {
   if (typeof sc_testVerifyMode !== "undefined" && sc_testVerifyMode)
      return "";
   return sc_getTimeDelta(sc$startTime, new Date().getTime());
}

function sc_getTimeDelta(startTime, now) {
   if (startTime == 0)
      return "<server not yet started!>";
   var sb = new Array()
   var elapsed = now - startTime;
   sb.push("+");
   var remainder = false;
   if (elapsed > 60*60*1000) {
      var hrs = Math.trunc(elapsed / (60*60*1000));
      elapsed -= hrs * 60*60*1000;
      if (hrs < 10)
         sb.push("0");
      sb.push(hrs);
      sb.push(":");
      remainder = true;
   }
   if (elapsed > 60*1000 || remainder) {
      var mins = Math.trunc(elapsed / (60*1000));
      elapsed -= mins * 60*1000;
      if (mins < 10)
         sb.push("0");
      sb.push(mins);
      sb.push(":");
   }
   if (elapsed > 1000 || remainder) {
      var secs = Math.trunc(elapsed / 1000);
      elapsed -= secs * 1000;
      if (secs < 10)
         sb.push("0");
      sb.push(secs);
      sb.push(".");
   }
   if (elapsed > 1000) // TODO: remove this - diagnostics only
      console.error("bad time in sc_getTimeDelta");
   if (elapsed < 10)
      sb.push("00");
   else if (elapsed < 100)
      sb.push("0");
   sb.push(Math.trunc(elapsed));
   sb.push(":");
   return sb.join("");
}
