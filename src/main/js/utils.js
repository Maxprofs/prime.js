/*
 * Copyright (c) 2012, Inversoft Inc., All Rights Reserved
 */
var Prime = Prime || {};
Prime.Utils = Prime.Utils || {};

Prime.Utils = {
  spaceRegex: /\s+/,
  typeRegex: /^\[object\s(.*)\]$/,

  /**
   * Attempts to invoke a function iteratively in the background a specific number of times within a specific duration.
   * This might not complete in the specified duration. The functions passed in should be short functions that return as
   * quickly as possible. If you are using long functions, use the recursive setTimeout trick by-hand instance.
   *
   * @param {Number} totalDuration The duration in milliseconds.
   * @param {Number} timesToCall The number of times to call the function.
   * @param {Function} stepFunction The step function to call each iteration.
   * @param {Function} [endFunction] The function to invoke at the end.
   * @param {Object} [context] The context for the function calls (sets the 'this' parameter).
   */
  callIteratively: function(totalDuration, timesToCall, stepFunction, endFunction, context) {
//    console.log("Iter");
    var theContext = (arguments.length < 5) ? this : context;
    var step = totalDuration / timesToCall;
    var count = 0;
    var id = setInterval(function() {
      count++;
      var last = (count >= timesToCall);
      stepFunction.call(theContext, last);
      if (last) {
        clearInterval(id);

        if (typeof endFunction !== 'undefined' && endFunction !== null) {
          endFunction.call(theContext);
        }
      }
    }, step - 1);
  },

  /**
   * Parses JSON.
   *
   * @param {String} json The JSON.
   * @return {Object} The JSON data as an object.
   */
  parseJSON: function(json) {
    return JSON.parse(json);
  },

  /**
   * Proxies calls to a function through an anonymous function and sets the "this" variable to the object given.
   *
   * @param {Function} func The function to call.
   * @param {Object} context The "this" variable when the function is called.
   * @return {Function} An anonymous function.
   */
  proxy: function(func, context) {
    return function() {
      func.apply(context, arguments);
    }
  },

  type: function(object) {
    return Object.prototype.toString(object).match(Prime.Utils.typeRegex)[1];
  }
};
