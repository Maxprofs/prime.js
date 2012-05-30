/*
 * Copyright (c) 2012, Inversoft Inc., All Rights Reserved
 */
var Prime = Prime || {};
Prime.Ajax = Prime.Ajax || {};

/**
 * Makes a new AJAX request.
 *
 * @param {String} [url] The URL to call. This can be left out for sub-classing but should otherwise be provided.
 * @constructor
 */
Prime.Ajax.Request = function(url) {
  this.init(url);
};

Prime.Ajax.Request.prototype = {
  init: function(url) {
    this.xhr = new XMLHttpRequest();
    this.async = true;
    this.body = null;
    this.contentType = null;
    this.context = this;
    this.errorHandler = this.onError;
    this.loadingHandler = this.onLoading;
    this.method = 'GET';
    this.openHandler = this.onOpen;
    this.password = null;
    this.sendHandler = this.onSend;
    this.successHandler = this.onSuccess;
    this.unsetHandler = this.onUnset;
    this.url = url;
    this.username = null;
  },

  /**
   * Changes the URL to call.
   *
   * @param {String} url The new URL to call.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  forURL: function(url) {
    this.url = url;
    return this;
  },

  /**
   * Invokes the AJAX request. If the URL is not set, this throws an exception.
   *
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  go: function() {
    if (!this.url) {
      throw 'No URL set for AJAX request';
    }

    if (this.async) {
      this.xhr.onreadystatechange = Prime.Utils.proxy(this, this.handler);
    }

    console.log(this.url);

    this.xhr.open(this.method, this.url, this.async, this.username, this.password);

    if (this.contentType) {
      this.xhr.setRequestHeader('Content-Type', this.contentType);
    }

    if (this.body) {
      this.xhr.setRequestHeader('Content-Length', this.body.length);
    }

    this.xhr.send(this.body);

    return this;
  },

  /**
   * Default handler for the "completed" state and an HTTP response status of anything but 2xx. Sub-classes can override
   * this handler or you can pass in a handler function to the {@link #withUnsetHandler}.
   *
   * @param {XMLHttpRequest} xhr The XMLHttpRequest object.
   */
  onError: function(xhr) {
  },

  /**
   * Default handler for the "loading" state. Sub-classes can override this handler or you can pass in a handler function
   * to the {@link #withLoadingHandler}.
   *
   * @param {XMLHttpRequest} xhr The XMLHttpRequest object.
   */
  onLoading: function(xhr) {
  },

  /**
   * Default handler for the "open" state. Sub-classes can override this handler or you can pass in a handler function
   * to the {@link #withOpenHandler}.
   *
   * @param {XMLHttpRequest} xhr The XMLHttpRequest object.
   */
  onOpen: function(xhr) {
  },

  /**
   * Default handler for the "send" state. Sub-classes can override this handler or you can pass in a handler function
   * to the {@link #withSendHandler}.
   *
   * @param {XMLHttpRequest} xhr The XMLHttpRequest object.
   */
  onSend: function(xhr) {
  },

  /**
   * Default handler for the "complete" state and an HTTP response status of 2xx. Sub-classes can override this handler
   * or you can pass in a handler function to the {@link #withUnsetHandler}.
   *
   * @param {XMLHttpRequest} xhr The XMLHttpRequest object.
   */
  onSuccess: function(xhr) {
  },

  /**
   * Default handler for the "unset" state. Sub-classes can override this handler or you can pass in a handler function
   * to the {@link #withUnsetHandler}.
   *
   * @param {XMLHttpRequest} xhr The XMLHttpRequest object.
   */
  onUnset: function(xhr) {
  },

  /**
   * Sets the method used to make the AJAX request.
   *
   * @param {String} method The HTTP method.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  usingMethod: function(method) {
    this.method = method;
    return this;
  },

  /**
   * Sets the request body for the request.
   *
   * @param {String} body The request body.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withBody: function(body) {
    this.body = body;
    return this;
  },

  /**
   * Sets the content type for the request.
   *
   * @param {String} contentType The contentType.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withContentType: function(contentType) {
    this.contentType = contentType;
    return this;
  },

  /**
   * Sets the context for the AJAX handler functions. The object set here will be the "this" reference inside the handler
   * functions.
   *
   * @param {Object} context The context object.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withContext: function(context) {
    this.context = context;
    return this;
  },

  /**
   * Sets the data object for the request. The object is converted to post data and the content-type is set to
   * x-www-form-urlencoded.
   *
   * @param {Object} data The data object.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withData: function(data) {
    for (var prop in data) {
      if (data.hasOwnProperty(prop)) {
        if (this.body) {
          this.body += '&' + encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]);
        } else {
          this.body = encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]);
        }
      }
    }

    this.contentType = 'x-www-form-urlencoded';
    return this;
  },

  /**
   * Sets the handler to invoke when the state of the AJAX request is "complete" and the HTTP status in the response is
   * not 2xx.
   *
   * @param {Function} func The handler function.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withErrorHandler: function(func) {
    this.errorHandler = func;
    return this;
  },

  /**
   * Sets the handler to invoke when the state of the AJAX request is "loading".
   *
   * @param {Function} func The handler function.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withLoadingHandler: function(func) {
    this.loadingHandler = func;
    return this;
  },

  /**
   * Sets the handler to invoke when the state of the AJAX request is "open".
   *
   * @param {Function} func The handler function.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withOpenHandler: function(func) {
    this.openHandler = func;
    return this;
  },

  /**
   * Sets the handler to invoke when the state of the AJAX request is "send".
   *
   * @param {Function} func The handler function.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withSendHandler: function(func) {
    this.sendHandler = func;
    return this;
  },

  /**
   * Sets the handler to invoke when the state of the AJAX request is "complete" and the HTTP status in the response is
   * 2xx.
   *
   * @param {Function} func The handler function.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withSuccessHandler: function(func) {
    this.successHandler = func;
    return this;
  },

  /**
   * Sets the handler to invoke when the state of the AJAX request is "unset".
   *
   * @param {Function} func The handler function.
   * @return {Prime.Ajax.Request} This Prime.Ajax.Request.
   */
  withUnsetHandler: function(func) {
    this.unsetHandler = func;
    return this;
  },

  /**
   * @private
   */
  handler: function() {
    if (this.xhr.readyState === 0) {
      this.unsetHandler.call(this.context, this.xhr);
    } else if (this.xhr.readyState === 1) {
      this.openHandler.call(this.context, this.xhr);
    } else if (this.xhr.readyState === 2) {
      this.sendHandler.call(this.context, this.xhr);
    } else if (this.xhr.readyState === 3) {
      this.loadingHandler.call(this.context, this.xhr);
    } else if (this.xhr.readyState === 4) {
      if (this.xhr.status >= 200 && this.xhr.status <= 299) {
        this.successHandler.call(this.context, this.xhr);
      } else {
        this.errorHandler.call(this.context, this.xhr);
      }
    }
  }
};