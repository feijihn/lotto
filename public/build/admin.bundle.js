webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(952);
	module.exports = __webpack_require__(476);


/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Routing environment.
	 *
	 * It specifies how routers read its state from DOM and synchronise it back.
	 */
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	var DummyEnvironment      = __webpack_require__(1054);
	var Environment           = __webpack_require__(149);
	
	/**
	 * Mixin for routes to keep attached to an environment.
	 *
	 * This mixin assumes the environment is passed via props.
	 */
	var Mixin = {
	
	  componentDidMount: function() {
	    this.getEnvironment().register(this);
	  },
	
	  componentWillUnmount: function() {
	    this.getEnvironment().unregister(this);
	  }
	};
	
	var PathnameEnvironment;
	var HashEnvironment;
	
	var pathnameEnvironment;
	var hashEnvironment;
	var defaultEnvironment;
	var dummyEnvironment;
	
	if (canUseDOM) {
	
	  PathnameEnvironment = __webpack_require__(1055);
	  HashEnvironment     = __webpack_require__(426);
	
	  pathnameEnvironment = new PathnameEnvironment();
	  hashEnvironment     = new HashEnvironment();
	  defaultEnvironment  = (window.history !== undefined &&
	                         window.history.pushState !== undefined) ?
	                        pathnameEnvironment :
	                        hashEnvironment;
	
	} else {
	
	  dummyEnvironment    = new DummyEnvironment();
	  pathnameEnvironment = dummyEnvironment;
	  hashEnvironment     = dummyEnvironment;
	  defaultEnvironment  = dummyEnvironment;
	
	}
	
	module.exports = {
	  pathnameEnvironment: pathnameEnvironment,
	  hashEnvironment: hashEnvironment,
	  defaultEnvironment: defaultEnvironment,
	  dummyEnvironment: dummyEnvironment,
	
	  Environment: Environment,
	  PathnameEnvironment: PathnameEnvironment,
	  HashEnvironment: HashEnvironment,
	
	  Mixin: Mixin
	};


/***/ },

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// batchedUpdates is now exposed in 0.12
	var batchedUpdates = __webpack_require__(9).unstable_batchedUpdates || __webpack_require__(1).batchedUpdates;
	
	/**
	 * Base abstract class for a routing environment.
	 *
	 * @private
	 */
	function Environment() {
	  this.routers = [];
	  this.path = this.getPath();
	}
	
	/**
	 * Notify routers about the change.
	 *
	 * @param {Object} navigation
	 * @param {Function} cb
	 */
	Environment.prototype.notify = function notify(navigation, cb) {
	  var latch = this.routers.length;
	
	  if (latch === 0) {
	    return cb && cb();
	  }
	
	  function callback() {
	    latch -= 1;
	    if (cb && latch === 0) {
	      cb();
	    }
	  }
	
	  batchedUpdates(function() {
	    for (var i = 0, len = this.routers.length; i < len; i++) {
	      this.routers[i].setPath(this.path, navigation, callback);
	    }
	  }.bind(this));
	};
	
	Environment.prototype.makeHref = function makeHref(path) {
	  return path;
	};
	
	Environment.prototype.navigate = function navigate(path, navigation, cb) {
	  return this.setPath(path, navigation, cb);
	};
	
	Environment.prototype.setPath = function(path, navigation, cb) {
	  // Support (path, cb) arity.
	  if (typeof navigation === 'function' && cb === undefined) {
	    cb = navigation;
	    navigation = {};
	  }
	  // Support (path) arity.
	  if (!navigation) navigation = {};
	
	  if (!navigation.isPopState) {
	    if (navigation.replace) {
	      this.replaceState(path, navigation);
	    } else {
	      this.pushState(path, navigation);
	    }
	  }
	  this.path = path;
	  this.notify(navigation, cb);
	};
	
	/**
	 * Register router with an environment.
	 */
	Environment.prototype.register = function register(router) {
	  if (this.routers.length === 0) {
	    this.start();
	  }
	
	  if (router.getParentRouter === undefined || !router.getParentRouter()) {
	    this.routers.push(router);
	  }
	};
	
	/**
	 * Unregister router from an environment.
	 */
	Environment.prototype.unregister = function unregister(router) {
	  if (this.routers.indexOf(router) > -1) {
	    this.routers.splice(this.routers.indexOf(router), 1);
	  }
	
	  if (this.routers.length === 0) {
	    this.stop();
	  }
	};
	
	module.exports = Environment;


/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React       = __webpack_require__(1);
	var Environment = __webpack_require__(115);
	
	
	/**
	 * NavigatableMixin
	 *
	 * A mixin for a component which operates in context of a router and can
	 * navigate to a different route using `navigate(path, navigation, cb)` method.
	 */
	var NavigatableMixin = {
	
	  contextTypes: {
	    router: React.PropTypes.any
	  },
	
	  /**
	   * @private
	   */
	  _getNavigable: function() {
	    return this.context.router || Environment.defaultEnvironment;
	  },
	
	  getPath: function() {
	    return this._getNavigable().getPath();
	  },
	
	  navigate: function(path, navigation, cb) {
	    return this._getNavigable().navigate(path, navigation, cb);
	  },
	
	  makeHref: function(path) {
	    return this._getNavigable().makeHref(path);
	  }
	};
	
	module.exports = NavigatableMixin;


/***/ },

/***/ 424:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(1);
	var assign = Object.assign || __webpack_require__(17);
	
	
	/**
	 * Mixin for routers which implements the simplest rendering strategy.
	 */
	var RouteRenderingMixin = {
	
	  // Props passed at the `childProps` key are passed to all handlers.
	  getChildProps: function() {
	    var childProps = this.props.childProps || {};
	    // Merge up from parents, with inner props taking priority.
	    var parent = this.getParentRouter();
	    if (parent) {
	      childProps = assign({}, parent.getChildProps(), childProps);
	    }
	    return childProps;
	  },
	
	  renderRouteHandler: function(props) {
	    if (!this.state.match.route) {
	      throw new Error("React-router-component: No route matched! Did you define a NotFound route?");
	    }
	    var handler = this.state.handler;
	    var matchProps = this.state.matchProps;
	
	    props = assign({ref: this.state.match.route.ref}, this.getChildProps(), props, matchProps);
	    // If we were passed an element, we need to clone it before passing it along.
	    if (React.isValidElement(handler)) {
	      // Be sure to keep the props that were already set on the handler.
	      // Otherwise, a handler like <div className="foo">bar</div> would have its className lost.
	      return React.cloneElement(handler, assign(props, handler.props));
	    }
	    return React.createElement(handler, props);
	  }
	
	};
	
	module.exports = RouteRenderingMixin;


/***/ },

/***/ 425:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React         = __webpack_require__(1);
	var invariant     = __webpack_require__(427);
	var assign        = Object.assign || __webpack_require__(17);
	var matchRoutes   = __webpack_require__(1056);
	var Environment   = __webpack_require__(115);
	
	var RouterMixin = {
	  mixins: [Environment.Mixin],
	
	  propTypes: {
	    path: React.PropTypes.string,
	    contextual: React.PropTypes.bool,
	    onBeforeNavigation: React.PropTypes.func,
	    onNavigation: React.PropTypes.func,
	    urlPatternOptions: React.PropTypes.oneOfType([
	      React.PropTypes.arrayOf(React.PropTypes.string),
	      React.PropTypes.object
	    ])
	  },
	
	  childContextTypes: {
	    router: React.PropTypes.any
	  },
	
	  getChildContext: function() {
	    return {
	      router: this
	    };
	  },
	
	  contextTypes: {
	    router: React.PropTypes.any
	  },
	
	  getInitialState: function() {
	    return this.getRouterState(this.props);
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var nextState = this.getRouterState(nextProps);
	    this.delegateSetRoutingState(nextState);
	  },
	
	  getRouterState: function(props) {
	    var path;
	    var prefix;
	
	    var parent = props.contextual && this.getParentRouter();
	
	    if (parent) {
	
	      var parentMatch = parent.getMatch();
	
	      invariant(
	        props.path ||
	        isString(parentMatch.unmatchedPath) ||
	        parentMatch.matchedPath === parentMatch.path,
	        "contextual router has nothing to match on: %s", parentMatch.unmatchedPath
	      );
	
	      path = props.path || parentMatch.unmatchedPath || '/';
	      prefix = parent.state.prefix + parentMatch.matchedPath;
	    } else {
	
	      path = props.path || this.getEnvironment().getPath();
	
	      invariant(
	        isString(path),
	        ("router operate in environment which cannot provide path, " +
	         "pass it a path prop; or probably you want to make it contextual")
	      );
	
	      prefix = '';
	    }
	
	    if (path[0] !== '/') {
	      path = '/' + path;
	    }
	
	    var match = matchRoutes(this.getRoutes(props), path, this.getURLPatternOptions());
	
	    return {
	      match: match,
	      matchProps: match.getProps(),
	      handler: match.getHandler(),
	      prefix: prefix,
	      navigation: {}
	    };
	  },
	
	  getEnvironment: function() {
	    if (this.props.environment) {
	      return this.props.environment;
	    }
	    if (this.props.hash) {
	      return Environment.hashEnvironment;
	    }
	    if (this.props.contextual && this.context.router) {
	      return this.context.router.getEnvironment();
	    }
	    return Environment.defaultEnvironment;
	  },
	
	  /**
	   * Return parent router or undefined.
	   */
	  getParentRouter: function() {
	    var current = this.context.router;
	    var environment = this.getEnvironment();
	
	    if (current) {
	      if (current.getEnvironment() === environment) {
	        return current;
	      }
	    }
	  },
	
	  /**
	   * Return current match.
	   */
	  getMatch: function() {
	    return this.state.match;
	  },
	
	  getURLPatternOptions: function() {
	    var parent = this.getParentRouter();
	    var parentOptions = parent && parent.getURLPatternOptions();
	    // Check existence so we don't return an empty object if there are no options.
	    if (parentOptions) {
	      return assign({}, this.props.urlPatternOptions, parentOptions);
	    }
	    return this.props.urlPatternOptions;
	  },
	
	  /**
	   * Make href scoped for the current router.
	   */
	  makeHref: function(href) {
	    return join(this.state.prefix, href);
	  },
	
	  /**
	   * Navigate to a path
	   *
	   * @param {String} path
	   * @param {Function} navigation
	   * @param {Callback} cb
	   */
	  navigate: function(path, navigation, cb) {
	    path = join(this.state.prefix, path);
	    this.getEnvironment().setPath(path, navigation, cb);
	  },
	
	  /**
	   * Set new path.
	   *
	   * This function is called by environment.
	   *
	   * @private
	   *
	   * @param {String} path
	   * @param {Function} navigation
	   * @param {Callback} cb
	   */
	  setPath: function(path, navigation, cb) {
	    var match = matchRoutes(this.getRoutes(this.props), path, this.getURLPatternOptions());
	
	    var state = {
	      match: match,
	      matchProps: match.getProps(),
	      handler: match.getHandler(),
	      prefix: this.state.prefix,
	      navigation: navigation
	    };
	
	    assign(navigation, {match: match});
	
	    if (this.props.onBeforeNavigation &&
	        this.props.onBeforeNavigation(path, navigation) === false) {
	      return;
	    }
	
	    if (navigation.onBeforeNavigation &&
	        navigation.onBeforeNavigation(path, navigation) === false) {
	      return;
	    }
	
	    this.delegateSetRoutingState(state, function() {
	      if (this.props.onNavigation) {
	        this.props.onNavigation(path, navigation);
	      }
	      cb();
	    }.bind(this));
	  },
	
	  /**
	   * Return the current path
	   */
	  getPath: function () {
	    return this.state.match.path;
	  },
	
	  /**
	   * Try to delegate state update to a setRoutingState method (might be provided
	   * by router itself) or use replaceState.
	   */
	  delegateSetRoutingState: function(state, cb) {
	    if (this.setRoutingState) {
	      this.setRoutingState(state, cb);
	    } else {
	      this.setState(state, cb);
	    }
	  }
	
	};
	
	function join(a, b) {
	  return (a + b).replace(/\/\//g, '/');
	}
	
	function isString(o) {
	  return Object.prototype.toString.call(o) === '[object String]';
	}
	
	module.exports = RouterMixin;


/***/ },

/***/ 426:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Environment = __webpack_require__(149);
	
	/**
	 * Routing environment which routes by `location.hash`.
	 */
	function HashEnvironment() {
	  this.onHashChange = this.onHashChange.bind(this);
	  Environment.call(this);
	}
	
	HashEnvironment.prototype = Object.create(Environment.prototype);
	HashEnvironment.prototype.constructor = HashEnvironment;
	
	HashEnvironment.prototype.getPath = function() {
	  return window.location.hash.slice(1) || '/';
	};
	
	HashEnvironment.prototype.pushState = function(path, navigation) {
	  window.location.hash = path;
	};
	
	HashEnvironment.prototype.replaceState = function(path, navigation) {
	  var href = window.location.href.replace(/(javascript:|#).*$/, '');
	  window.location.replace(href + '#' + path);
	};
	
	HashEnvironment.prototype.start = function() {
	  if (window.addEventListener) {
	    window.addEventListener('hashchange', this.onHashChange);
	  } else {
	    window.attachEvent('onhashchange', this.onHashChange);
	  }
	};
	
	HashEnvironment.prototype.stop = function() {
	  if (window.removeEventListener) {
	    window.removeEventListener('hashchange', this.onHashChange);
	  } else {
	    window.detachEvent('onhashchange', this.onHashChange);
	  }
	};
	
	HashEnvironment.prototype.onHashChange = function() {
	  var path = this.getPath();
	
	  if (this.path !== path) {
	    this.setPath(path, {isPopState: true});
	  }
	};
	
	module.exports = HashEnvironment;


/***/ },

/***/ 427:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var __ENV__ = ("development"); // env lookup is slow in Node
	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (__ENV__ !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },

/***/ 428:
/***/ function(module, exports) {

	// Load modules
	
	
	// Declare internals
	
	var internals = {};
	internals.hexTable = new Array(256);
	for (var h = 0; h < 256; ++h) {
	    internals.hexTable[h] = '%' + ((h < 16 ? '0' : '') + h.toString(16)).toUpperCase();
	}
	
	
	exports.arrayToObject = function (source, options) {
	
	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {
	
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	
	exports.merge = function (target, source, options) {
	
	    if (!source) {
	        return target;
	    }
	
	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        }
	        else if (typeof target === 'object') {
	            target[source] = true;
	        }
	        else {
	            target = [target, source];
	        }
	
	        return target;
	    }
	
	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }
	
	    if (Array.isArray(target) &&
	        !Array.isArray(source)) {
	
	        target = exports.arrayToObject(target, options);
	    }
	
	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];
	
	        if (!Object.prototype.hasOwnProperty.call(target, key)) {
	            target[key] = value;
	        }
	        else {
	            target[key] = exports.merge(target[key], value, options);
	        }
	    }
	
	    return target;
	};
	
	
	exports.decode = function (str) {
	
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	exports.encode = function (str) {
	
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }
	
	    if (typeof str !== 'string') {
	        str = '' + str;
	    }
	
	    var out = '';
	    for (var i = 0, il = str.length; i < il; ++i) {
	        var c = str.charCodeAt(i);
	
	        if (c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A)) { // A-Z
	
	            out += str[i];
	            continue;
	        }
	
	        if (c < 0x80) {
	            out += internals.hexTable[c];
	            continue;
	        }
	
	        if (c < 0x800) {
	            out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }
	
	        if (c < 0xD800 || c >= 0xE000) {
	            out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }
	
	        ++i;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
	        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	    }
	
	    return out;
	};
	
	exports.compact = function (obj, refs) {
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return obj;
	    }
	
	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }
	
	    return obj;
	};
	
	
	exports.isRegExp = function (obj) {
	
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	
	exports.isBuffer = function (obj) {
	
	    if (obj === null ||
	        typeof obj === 'undefined') {
	
	        return false;
	    }
	
	    return !!(obj.constructor &&
	              obj.constructor.isBuffer &&
	              obj.constructor.isBuffer(obj));
	};


/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.10.0
	var slice = [].slice;
	
	(function(root, factory) {
	  if (('function' === "function") && (__webpack_require__(1196) != null)) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined" && exports !== null) {
	    return module.exports = factory();
	  } else {
	    return root.UrlPattern = factory();
	  }
	})(this, function() {
	  var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
	  escapeForRegex = function(string) {
	    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	  };
	  concatMap = function(array, f) {
	    var i, length, results;
	    results = [];
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      results = results.concat(f(array[i]));
	    }
	    return results;
	  };
	  stringConcatMap = function(array, f) {
	    var i, length, result;
	    result = '';
	    i = -1;
	    length = array.length;
	    while (++i < length) {
	      result += f(array[i]);
	    }
	    return result;
	  };
	  regexGroupCount = function(regex) {
	    return (new RegExp(regex.toString() + '|')).exec('').length - 1;
	  };
	  keysAndValuesToObject = function(keys, values) {
	    var i, key, length, object, value;
	    object = {};
	    i = -1;
	    length = keys.length;
	    while (++i < length) {
	      key = keys[i];
	      value = values[i];
	      if (value == null) {
	        continue;
	      }
	      if (object[key] != null) {
	        if (!Array.isArray(object[key])) {
	          object[key] = [object[key]];
	        }
	        object[key].push(value);
	      } else {
	        object[key] = value;
	      }
	    }
	    return object;
	  };
	  P = {};
	  P.Result = function(value, rest) {
	    this.value = value;
	    this.rest = rest;
	  };
	  P.Tagged = function(tag, value) {
	    this.tag = tag;
	    this.value = value;
	  };
	  P.tag = function(tag, parser) {
	    return function(input) {
	      var result, tagged;
	      result = parser(input);
	      if (result == null) {
	        return;
	      }
	      tagged = new P.Tagged(tag, result.value);
	      return new P.Result(tagged, result.rest);
	    };
	  };
	  P.regex = function(regex) {
	    return function(input) {
	      var matches, result;
	      matches = regex.exec(input);
	      if (matches == null) {
	        return;
	      }
	      result = matches[0];
	      return new P.Result(result, input.slice(result.length));
	    };
	  };
	  P.sequence = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, rest, result, values;
	      i = -1;
	      length = parsers.length;
	      values = [];
	      rest = input;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(rest);
	        if (result == null) {
	          return;
	        }
	        values.push(result.value);
	        rest = result.rest;
	      }
	      return new P.Result(values, rest);
	    };
	  };
	  P.pick = function() {
	    var indexes, parsers;
	    indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return function(input) {
	      var array, result;
	      result = P.sequence.apply(P, parsers)(input);
	      if (result == null) {
	        return;
	      }
	      array = result.value;
	      result.value = array[indexes];
	      return result;
	    };
	  };
	  P.string = function(string) {
	    var length;
	    length = string.length;
	    return function(input) {
	      if (input.slice(0, length) === string) {
	        return new P.Result(string, input.slice(length));
	      }
	    };
	  };
	  P.lazy = function(fn) {
	    var cached;
	    cached = null;
	    return function(input) {
	      if (cached == null) {
	        cached = fn();
	      }
	      return cached(input);
	    };
	  };
	  P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
	    var endResult, parserResult, rest, results;
	    rest = input;
	    results = stringResult ? '' : [];
	    while (true) {
	      if (end != null) {
	        endResult = end(rest);
	        if (endResult != null) {
	          break;
	        }
	      }
	      parserResult = parser(rest);
	      if (parserResult == null) {
	        break;
	      }
	      if (stringResult) {
	        results += parserResult.value;
	      } else {
	        results.push(parserResult.value);
	      }
	      rest = parserResult.rest;
	    }
	    if (atLeastOneResultRequired && results.length === 0) {
	      return;
	    }
	    return new P.Result(results, rest);
	  };
	  P.many1 = function(parser) {
	    return function(input) {
	      return P.baseMany(parser, null, false, true, input);
	    };
	  };
	  P.concatMany1Till = function(parser, end) {
	    return function(input) {
	      return P.baseMany(parser, end, true, true, input);
	    };
	  };
	  P.firstChoice = function() {
	    var parsers;
	    parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return function(input) {
	      var i, length, parser, result;
	      i = -1;
	      length = parsers.length;
	      while (++i < length) {
	        parser = parsers[i];
	        result = parser(input);
	        if (result != null) {
	          return result;
	        }
	      }
	    };
	  };
	  newParser = function(options) {
	    var U;
	    U = {};
	    U.wildcard = P.tag('wildcard', P.string(options.wildcardChar));
	    U.optional = P.tag('optional', P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
	      return U.pattern;
	    }), P.string(options.optionalSegmentEndChar)));
	    U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
	    U.named = P.tag('named', P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
	      return U.name;
	    })));
	    U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
	    U["static"] = P.tag('static', P.concatMany1Till(P.firstChoice(P.lazy(function() {
	      return U.escapedChar;
	    }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
	    U.token = P.lazy(function() {
	      return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
	    });
	    U.pattern = P.many1(P.lazy(function() {
	      return U.token;
	    }));
	    return U;
	  };
	  defaultOptions = {
	    escapeChar: '\\',
	    segmentNameStartChar: ':',
	    segmentValueCharset: 'a-zA-Z0-9-_~ %',
	    segmentNameCharset: 'a-zA-Z0-9',
	    optionalSegmentStartChar: '(',
	    optionalSegmentEndChar: ')',
	    wildcardChar: '*'
	  };
	  baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return baseAstNodeToRegexString(node, segmentValueCharset);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return '(.*?)';
	      case 'named':
	        return "([" + segmentValueCharset + "]+)";
	      case 'static':
	        return escapeForRegex(astNode.value);
	      case 'optional':
	        return '(?:' + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ')?';
	    }
	  };
	  astNodeToRegexString = function(astNode, segmentValueCharset) {
	    if (segmentValueCharset == null) {
	      segmentValueCharset = defaultOptions.segmentValueCharset;
	    }
	    return '^' + baseAstNodeToRegexString(astNode, segmentValueCharset) + '$';
	  };
	  astNodeToNames = function(astNode) {
	    if (Array.isArray(astNode)) {
	      return concatMap(astNode, astNodeToNames);
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return ['_'];
	      case 'named':
	        return [astNode.value];
	      case 'static':
	        return [];
	      case 'optional':
	        return astNodeToNames(astNode.value);
	    }
	  };
	  getParam = function(params, key, nextIndexes, sideEffects) {
	    var index, maxIndex, result, value;
	    if (sideEffects == null) {
	      sideEffects = false;
	    }
	    value = params[key];
	    if (value == null) {
	      if (sideEffects) {
	        throw new Error("no values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    index = nextIndexes[key] || 0;
	    maxIndex = Array.isArray(value) ? value.length - 1 : 0;
	    if (index > maxIndex) {
	      if (sideEffects) {
	        throw new Error("too few values provided for key `" + key + "`");
	      } else {
	        return;
	      }
	    }
	    result = Array.isArray(value) ? value[index] : value;
	    if (sideEffects) {
	      nextIndexes[key] = index + 1;
	    }
	    return result;
	  };
	  astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
	    var i, length;
	    if (Array.isArray(astNode)) {
	      i = -1;
	      length = astNode.length;
	      while (++i < length) {
	        if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, false) != null;
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, false) != null;
	      case 'static':
	        return false;
	      case 'optional':
	        return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
	    }
	  };
	  stringify = function(astNode, params, nextIndexes) {
	    if (Array.isArray(astNode)) {
	      return stringConcatMap(astNode, function(node) {
	        return stringify(node, params, nextIndexes);
	      });
	    }
	    switch (astNode.tag) {
	      case 'wildcard':
	        return getParam(params, '_', nextIndexes, true);
	      case 'named':
	        return getParam(params, astNode.value, nextIndexes, true);
	      case 'static':
	        return astNode.value;
	      case 'optional':
	        if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
	          return stringify(astNode.value, params, nextIndexes);
	        } else {
	          return '';
	        }
	    }
	  };
	  UrlPattern = function(arg1, arg2) {
	    var groupCount, options, parsed, parser, withoutWhitespace;
	    if (arg1 instanceof UrlPattern) {
	      this.isRegex = arg1.isRegex;
	      this.regex = arg1.regex;
	      this.ast = arg1.ast;
	      this.names = arg1.names;
	      return;
	    }
	    this.isRegex = arg1 instanceof RegExp;
	    if (!(('string' === typeof arg1) || this.isRegex)) {
	      throw new TypeError('argument must be a regex or a string');
	    }
	    if (this.isRegex) {
	      this.regex = arg1;
	      if (arg2 != null) {
	        if (!Array.isArray(arg2)) {
	          throw new Error('if first argument is a regex the second argument may be an array of group names but you provided something else');
	        }
	        groupCount = regexGroupCount(this.regex);
	        if (arg2.length !== groupCount) {
	          throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
	        }
	        this.names = arg2;
	      }
	      return;
	    }
	    if (arg1 === '') {
	      throw new Error('argument must not be the empty string');
	    }
	    withoutWhitespace = arg1.replace(/\s+/g, '');
	    if (withoutWhitespace !== arg1) {
	      throw new Error('argument must not contain whitespace');
	    }
	    options = {
	      escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
	      segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
	      segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
	      segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
	      optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
	      optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
	      wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
	    };
	    parser = newParser(options);
	    parsed = parser.pattern(arg1);
	    if (parsed == null) {
	      throw new Error("couldn't parse pattern");
	    }
	    if (parsed.rest !== '') {
	      throw new Error("could only partially parse pattern");
	    }
	    this.ast = parsed.value;
	    this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
	    this.names = astNodeToNames(this.ast);
	  };
	  UrlPattern.prototype.match = function(url) {
	    var groups, match;
	    match = this.regex.exec(url);
	    if (match == null) {
	      return null;
	    }
	    groups = match.slice(1);
	    if (this.names) {
	      return keysAndValuesToObject(this.names, groups);
	    } else {
	      return groups;
	    }
	  };
	  UrlPattern.prototype.stringify = function(params) {
	    if (params == null) {
	      params = {};
	    }
	    if (this.isRegex) {
	      throw new Error("can't stringify patterns generated from a regex");
	    }
	    if (params !== Object(params)) {
	      throw new Error("argument must be an object or undefined");
	    }
	    return stringify(this.ast, params, {});
	  };
	  UrlPattern.escapeForRegex = escapeForRegex;
	  UrlPattern.concatMap = concatMap;
	  UrlPattern.stringConcatMap = stringConcatMap;
	  UrlPattern.regexGroupCount = regexGroupCount;
	  UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
	  UrlPattern.P = P;
	  UrlPattern.newParser = newParser;
	  UrlPattern.defaultOptions = defaultOptions;
	  UrlPattern.astNodeToRegexString = astNodeToRegexString;
	  UrlPattern.astNodeToNames = astNodeToNames;
	  UrlPattern.getParam = getParam;
	  UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
	  UrlPattern.stringify = stringify;
	  return UrlPattern;
	});


/***/ },

/***/ 944:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchProducts = fetchProducts;
	exports.fetchRounds = fetchRounds;
	exports.fetchContent = fetchContent;
	
	var _jquery = __webpack_require__(127);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function recieveContent(data) {
	  return {
	    type: 'RECIEVE_CONTENT',
	    content: data
	  };
	}
	
	function recieveProducts(data) {
	  return {
	    type: 'RECIEVE_PRODUCTS',
	    products: data,
	    category: 'products'
	  };
	}
	
	function recieveRounds(data) {
	  return {
	    type: 'RECIEVE_ROUNDS',
	    rounds: data,
	    category: 'rounds'
	  };
	}
	
	function fetchProducts() {
	  return function (dispatch) {
	    var _this = this;
	
	    return _jquery2.default.ajax({
	      url: '/products',
	      dataType: 'json',
	      success: function success(data) {
	        dispatch(recieveProducts(data));
	      },
	      error: function error(xhr, status, err) {
	        console.error(_this.props.url, status, err.toString());
	      }
	    });
	  };
	}
	
	function fetchRounds() {
	  return function (dispatch) {
	    var _this2 = this;
	
	    return _jquery2.default.ajax({
	      url: '/rounds',
	      dataType: 'json',
	      data: {
	        options: {
	          all: true
	        }
	      },
	      success: function success(data) {
	        dispatch(recieveRounds(data));
	      },
	      error: function error(xhr, status, err) {
	        console.error(_this2.props.url, status, err.toString());
	      }
	    });
	  };
	}
	
	function fetchContent() {
	  return function (dispatch) {
	    var _this3 = this;
	
	    return _jquery2.default.ajax({
	      url: '/content',
	      dataType: 'json',
	      success: function success(data) {
	        dispatch(recieveContent(data));
	      },
	      error: function error(xhr, status, err) {
	        console.error(_this3.props.url, status, err.toString());
	      }
	    });
	  };
	}
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "actions.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 945:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Index = function (_React$Component) {
	  _inherits(Index, _React$Component);
	
	  function Index() {
	    _classCallCheck(this, Index);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
	  }
	
	  _createClass(Index, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          'This is Admin Panel'
	        )
	      );
	    }
	  }]);
	
	  return Index;
	}(_react2.default.Component);
	
	exports.default = Index;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 946:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _materialUi = __webpack_require__(29);
	
	var _colors = __webpack_require__(85);
	
	var Colors = _interopRequireWildcard(_colors);
	
	var _reactBootstrap = __webpack_require__(215);
	
	var _Router = __webpack_require__(950);
	
	var _Router2 = _interopRequireDefault(_Router);
	
	var _lightBaseTheme = __webpack_require__(208);
	
	var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);
	
	var _getMuiTheme = __webpack_require__(369);
	
	var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
	
	var _reactTapEventPlugin = __webpack_require__(241);
	
	var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	(0, _reactTapEventPlugin2.default)();
	
	var Main = function (_React$Component) {
	  _inherits(Main, _React$Component);
	
	  function Main(props) {
	    _classCallCheck(this, Main);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Main).call(this, props));
	
	    _this.getChildContext = function () {
	      return {
	        muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default),
	        store: _this.props.state,
	        fetchRounds: _this.props.fetchRounds,
	        fetchProducts: _this.props.fetchProducts
	      };
	    };
	
	    _this.handleClick = function (value) {
	      _this.setState({
	        category: value
	      });
	    };
	
	    _this.props.fetchProducts();
	    _this.props.fetchRounds();
	    _this.props.fetchContent();
	    return _this;
	  }
	
	  _createClass(Main, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'adminPanel' },
	        _react2.default.createElement(
	          _reactBootstrap.Grid,
	          { fluid: true },
	          _react2.default.createElement(
	            _reactBootstrap.Row,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { lg: 2, style: { paddingTop: 50, height: '100vh' } },
	              _react2.default.createElement(
	                _materialUi.Menu,
	                { style: { float: 'left', position: 'relative' } },
	                _react2.default.createElement(
	                  'a',
	                  { href: '#/panel-products' },
	                  _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Продукты' })
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: '#/panel-rounds' },
	                  _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Розыгрыши' })
	                ),
	                _react2.default.createElement(
	                  'a',
	                  { href: '#/panel-pages' },
	                  _react2.default.createElement(_materialUi.MenuItem, { primaryText: 'Контент' })
	                )
	              )
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { lg: 10 },
	              _react2.default.createElement(_Router2.default, null)
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return Main;
	}(_react2.default.Component);
	
	exports.default = Main;
	
	
	Main.childContextTypes = {
	  muiTheme: _react2.default.PropTypes.object,
	  store: _react2.default.PropTypes.object,
	  fetchProducts: _react2.default.PropTypes.func,
	  fetchRounds: _react2.default.PropTypes.func
	};
	
	_react2.default.Component.contextTypes = {
	  muiTheme: _react2.default.PropTypes.object,
	  store: _react2.default.PropTypes.object,
	  fetchProducts: _react2.default.PropTypes.func,
	  fetchRounds: _react2.default.PropTypes.func
	};
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Main.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 947:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pages = function (_React$Component) {
	  _inherits(Pages, _React$Component);
	
	  function Pages() {
	    _classCallCheck(this, Pages);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pages).apply(this, arguments));
	  }
	
	  _createClass(Pages, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'panel-pages' },
	        _react2.default.createElement(
	          'h1',
	          { className: 'text-center' },
	          'Редактирование контента'
	        ),
	        _react2.default.createElement(
	          'form',
	          { action: '/modify-content', method: 'post' },
	          _react2.default.createElement(
	            'h2',
	            { className: 'text-center' },
	            'Верхний блок'
	          ),
	          _react2.default.createElement('textarea', { rows: '5', cols: '120', name: 'introText', defaultValue: this.context.store.content ? this.context.store.content[0].text : '' }),
	          _react2.default.createElement(
	            'h2',
	            { className: 'text-center' },
	            'Нижний блок '
	          ),
	          _react2.default.createElement('textarea', { rows: '5', cols: '120', name: 'securityText', defaultValue: this.context.store.content ? this.context.store.content[1].text : '' }),
	          _react2.default.createElement('input', { type: 'submit', value: 'Изменить', className: 'btn btn-lg btn-primary' }),
	          _react2.default.createElement(
	            'div',
	            { className: 'help' },
	            _react2.default.createElement(
	              'h3',
	              null,
	              'Справка'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              'Внутри тэга <h1> - заголовок.',
	              _react2.default.createElement('br', null),
	              'Внутри тэга <p> - текст.',
	              _react2.default.createElement('br', null),
	              'Тэг <br/> - перевод строки.'
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return Pages;
	}(_react2.default.Component);
	
	exports.default = Pages;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Pages.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 948:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _materialUi = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Products = function (_React$Component) {
	  _inherits(Products, _React$Component);
	
	  function Products() {
	    _classCallCheck(this, Products);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Products).apply(this, arguments));
	  }
	
	  _createClass(Products, [{
	    key: 'render',
	    value: function render() {
	      var products = this.context.store.products.map(function (prod) {
	        return _react2.default.createElement(
	          _materialUi.TableRow,
	          null,
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            prod._id
	          ),
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            prod.name
	          ),
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            prod.price
	          ),
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            prod.description
	          )
	        );
	      });
	      return _react2.default.createElement(
	        'div',
	        { className: 'adminPanel' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Products'
	        ),
	        _react2.default.createElement(
	          _materialUi.Table,
	          null,
	          _react2.default.createElement(
	            _materialUi.TableHeader,
	            null,
	            _react2.default.createElement(
	              _materialUi.TableRow,
	              null,
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'ID'
	              ),
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'Name'
	              ),
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'Price'
	              ),
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'Description'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _materialUi.TableBody,
	            null,
	            products
	          )
	        ),
	        _react2.default.createElement(
	          'form',
	          { action: '/addproduct', method: 'post' },
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Название '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'name' }),
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Цена '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'price' }),
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Описание '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'description' }),
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Ссылка на изображение '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'imagelink' }),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn btn-warning btn-lg', bsSize: 'small', type: 'submit' },
	            ' Добавить '
	          )
	        )
	      );
	    }
	  }]);
	
	  return Products;
	}(_react2.default.Component);
	
	exports.default = Products;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Products.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 949:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _materialUi = __webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rounds = function (_React$Component) {
	  _inherits(Rounds, _React$Component);
	
	  function Rounds() {
	    _classCallCheck(this, Rounds);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Rounds).apply(this, arguments));
	  }
	
	  _createClass(Rounds, [{
	    key: 'render',
	    value: function render() {
	      var rounds = this.context.store.rounds.map(function (rnd) {
	        return _react2.default.createElement(
	          _materialUi.TableRow,
	          null,
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            rnd._id
	          ),
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            rnd.product_id
	          ),
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            rnd.startTime
	          ),
	          _react2.default.createElement(
	            _materialUi.TableRowColumn,
	            null,
	            rnd.description
	          )
	        );
	      });
	      return _react2.default.createElement(
	        'div',
	        { className: 'adminPanel' },
	        _react2.default.createElement(
	          'h1',
	          null,
	          'Rounds'
	        ),
	        _react2.default.createElement(
	          _materialUi.Table,
	          null,
	          _react2.default.createElement(
	            _materialUi.TableHeader,
	            null,
	            _react2.default.createElement(
	              _materialUi.TableRow,
	              null,
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'ID'
	              ),
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'Assoc. Product'
	              ),
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'Start Date'
	              ),
	              _react2.default.createElement(
	                _materialUi.TableHeaderColumn,
	                null,
	                'Description'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            _materialUi.TableBody,
	            null,
	            rounds
	          )
	        ),
	        _react2.default.createElement(
	          'form',
	          { action: '/addround', method: 'post' },
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Продукт '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'prodId' }),
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Описание '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'description' }),
	          _react2.default.createElement(
	            'label',
	            null,
	            ' Ссылка на изображение '
	          ),
	          _react2.default.createElement('input', { className: 'form-control', type: 'text', name: 'imagelink' }),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn btn-warning btn-lg', bsSize: 'small', type: 'submit' },
	            ' Добавить '
	          )
	        )
	      );
	    }
	  }]);
	
	  return Rounds;
	}(_react2.default.Component);
	
	exports.default = Rounds;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Rounds.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 950:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Index = __webpack_require__(945);
	
	var _Index2 = _interopRequireDefault(_Index);
	
	var _Products = __webpack_require__(948);
	
	var _Products2 = _interopRequireDefault(_Products);
	
	var _Rounds = __webpack_require__(949);
	
	var _Rounds2 = _interopRequireDefault(_Rounds);
	
	var _Pages = __webpack_require__(947);
	
	var _Pages2 = _interopRequireDefault(_Pages);
	
	var _reactRouterComponent = __webpack_require__(1049);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Router = function (_React$Component) {
	  _inherits(Router, _React$Component);
	
	  function Router() {
	    _classCallCheck(this, Router);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Router).apply(this, arguments));
	  }
	
	  _createClass(Router, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactRouterComponent.Locations,
	        { hash: true, className: 'panelRouterContainer' },
	        _react2.default.createElement(_reactRouterComponent.Location, { path: '/', handler: _react2.default.createElement(_Index2.default, null) }),
	        _react2.default.createElement(_reactRouterComponent.Location, { path: '/panel-products', handler: _react2.default.createElement(_Products2.default, null) }),
	        _react2.default.createElement(_reactRouterComponent.Location, { path: '/panel-rounds', handler: _react2.default.createElement(_Rounds2.default, null) }),
	        _react2.default.createElement(_reactRouterComponent.Location, { path: '/panel-pages', handler: _react2.default.createElement(_Pages2.default, null) })
	      );
	    }
	  }]);
	
	  return Router;
	}(_react2.default.Component);
	
	exports.default = Router;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Router.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 951:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reactRedux = __webpack_require__(26);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Main = __webpack_require__(946);
	
	var _Main2 = _interopRequireDefault(_Main);
	
	var _actions = __webpack_require__(944);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    state: state
	  };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    fetchProducts: function fetchProducts() {
	      dispatch((0, _actions.fetchProducts)());
	    },
	    fetchRounds: function fetchRounds() {
	      dispatch((0, _actions.fetchRounds)());
	    },
	    fetchContent: function fetchContent() {
	      dispatch((0, _actions.fetchContent)());
	    }
	  };
	};
	
	var AppContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Main2.default);
	
	exports.default = AppContainer;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "container.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 952:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(9);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(26);
	
	var _reduxThunk = __webpack_require__(469);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _redux = __webpack_require__(51);
	
	var _reducers = __webpack_require__(953);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _container = __webpack_require__(951);
	
	var _container2 = _interopRequireDefault(_container);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	
	_reactDom2.default.render(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(_container2.default, null)
	), document.getElementById('container'));
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 953:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(12), RootInstanceProvider = __webpack_require__(13), ReactMount = __webpack_require__(11), React = __webpack_require__(1); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var initialState = {
	  products: [],
	  rounds: [],
	  content: undefined
	};
	
	function App() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];
	
	  switch (action.type) {
	    case 'RECIEVE_PRODUCTS':
	      return Object.assign({}, state, {
	        products: action.products
	      });
	    case 'RECIEVE_ROUNDS':
	      return Object.assign({}, state, {
	        rounds: action.rounds
	      });
	    case 'RECIEVE_CONTENT':
	      return Object.assign({}, state, {
	        content: action.content
	      });
	    default:
	      return state;
	  }
	}
	
	exports.default = App;
	
	/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(14); if (makeExportsHot(module, __webpack_require__(1))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "reducers.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },

/***/ 1049:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Router                    = __webpack_require__(1053);
	var Route                     = __webpack_require__(1052);
	var Link                      = __webpack_require__(1051);
	
	var RouterMixin               = __webpack_require__(425);
	var RouteRenderingMixin       = __webpack_require__(424);
	
	var NavigatableMixin          = __webpack_require__(423);
	
	var environment               = __webpack_require__(115);
	
	var CaptureClicks             = __webpack_require__(1050);
	
	var URLPattern                = __webpack_require__(475);
	
	var exportsObject = {
	  Locations: Router.Locations,
	  Pages: Router.Pages,
	
	  Location: Route.Route,
	  Page: Route.Route,
	  NotFound: Route.NotFound,
	
	  Link: Link,
	
	  environment: environment,
	
	  RouterMixin: RouterMixin,
	  RouteRenderingMixin: RouteRenderingMixin,
	
	  NavigatableMixin: NavigatableMixin,
	  CaptureClicks: CaptureClicks
	};
	
	module.exports = exportsObject;


/***/ },

/***/ 1050:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React       = __webpack_require__(1);
	var urllite     = __webpack_require__(1193);
	var Environment = __webpack_require__(115);
	var HashEnvironment = __webpack_require__(426);
	var assign      = Object.assign || __webpack_require__(17);
	
	/**
	 * A container component which captures <a> clicks and, if there's a matching
	 * route defined, routes them.
	 */
	var CaptureClicks = React.createClass({
	  displayName: 'CaptureClicks',
	
	  propTypes: {
	    component: React.PropTypes.func.isRequired,
	    environment: React.PropTypes.object
	  },
	
	  getDefaultProps: function() {
	    return {
	      component: React.DOM.div,
	      environment: Environment.defaultEnvironment,
	      gotoURL: function(url) {
	        // We should really just be allowing the event's default action, be we
	        // can't make the decision to do that synchronously.
	        window.location.href = url;
	      }
	    };
	  },
	
	  onClick: function(e) {
	    if (this.props.onClick) {
	      var shouldProceed = this.props.onClick(e);
	      if (shouldProceed === false) return;
	    }
	
	    // Ignore canceled events, modified clicks, and right clicks.
	    if (e.defaultPrevented) {
	      return;
	    }
	
	    if (e.metaKey || e.ctrlKey || e.shiftKey) {
	      return;
	    }
	
	    if (e.button !== 0) {
	      return;
	    }
	
	    // Get the <a> element.
	    var el = e.target;
	    while (el && el.nodeName !== 'A') {
	      el = el.parentNode;
	    }
	
	    // Ignore clicks from non-a elements.
	    if (!el) {
	      return;
	    }
	
	    // Ignore the click if the element has a target.
	    if (el.target && el.target !== '_self') {
	      return;
	    }
	
	    // Ignore the click if it's a download link. (We use this method of
	    // detecting the presence of the attribute for old IE versions.)
	    if (el.attributes.download) {
	      return;
	    }
	
	    // Ignore hash (used often instead of javascript:void(0) in strict CSP envs)
	    if (el.getAttribute('href') === '#' && !(this.props.environment instanceof HashEnvironment)) {
	      return;
	    }
	
	    // Use a regular expression to parse URLs instead of relying on the browser
	    // to do it for us (because IE).
	    var url = urllite(el.href);
	    var windowURL = urllite(window.location.href);
	
	    // Ignore links that don't share a protocol and host with ours.
	    if (url.protocol !== windowURL.protocol || url.host !== windowURL.host) {
	      return;
	    }
	
	    // Ignore 'rel="external"' links.
	    if (el.rel && /(?:^|\s+)external(?:\s+|$)/.test(el.rel)) {
	      return;
	    }
	
	    // Prevent :focus from sticking; preventDefault() stops blur in some browsers
	    el.blur();
	    e.preventDefault();
	
	    // flag if we already found a "not found" case and bailed
	    var bail = false;
	
	    var onBeforeNavigation = function(path, navigation) {
	      if (bail) {
	        return false;
	      } else if (!navigation.match || !navigation.match.match) {
	        bail = true;
	        this.props.gotoURL(el.href);
	        return false;
	      }
	    }.bind(this);
	
	    this.props.environment.navigate(
	      url.pathname + (url.hash.length > 1 ? url.hash : ''),
	      {onBeforeNavigation: onBeforeNavigation},
	      function(err, info) {
	        if (err) {
	          throw err;
	        }
	      });
	  },
	
	  render: function() {
	    var props = assign({}, this.props, {
	      onClick: this.onClick
	    });
	    return this.props.component(props, this.props.children);
	  }
	
	});
	
	module.exports = CaptureClicks;


/***/ },

/***/ 1051:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React             = __webpack_require__(1);
	var NavigatableMixin  = __webpack_require__(423);
	var Environment       = __webpack_require__(115);
	var assign            = Object.assign || __webpack_require__(17);
	
	/**
	 * Link.
	 *
	 * A basic navigatable component which renders into <a> DOM element and handles
	 * onClick event by transitioning onto different route (defined by
	 * this.props.href).
	 */
	var Link = React.createClass({
	  mixins: [NavigatableMixin],
	
	  displayName: 'Link',
	
	  propTypes: {
	    href: React.PropTypes.string.isRequired,
	    global: React.PropTypes.bool,
	    globalHash: React.PropTypes.bool
	  },
	
	  onClick: function(e) {
	    if (this.props.onClick) {
	      this.props.onClick(e);
	    }
	
	    // return if the link target is external
	    if (this.props.href.match(/^([a-z-]+:|\/\/)/)) return;
	
	    // return if the user did a middle-click, right-click, or used a modifier
	    // key (like ctrl-click, meta-click, shift-click, etc.)
	    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
	
	    if (!e.defaultPrevented) {
	      e.preventDefault();
	      this._navigate(this.props.href, function(err) {
	        if (err) {
	          throw err;
	        }
	      });
	    }
	  },
	
	  _navigationParams: function() {
	    var params = {};
	    for (var k in this.props) {
	      if (!this.constructor.propTypes[k]) {
	        params[k] = this.props[k];
	      }
	    }
	    return params;
	  },
	
	  _createHref: function() {
	    return this.props.global ?
	      Environment.defaultEnvironment.makeHref(this.props.href) :
	      this.makeHref(this.props.href);
	  },
	
	  _navigate: function(path, cb) {
	    if (this.props.globalHash) {
	      return Environment.hashEnvironment.navigate(path, cb);
	    }
	
	    if (this.props.global) {
	      return Environment.defaultEnvironment.navigate(path, cb);
	    }
	
	    return this.navigate(path, this._navigationParams(), cb);
	  },
	
	  render: function() {
	    var props = assign({}, this.props, {
	      onClick: this.onClick,
	      href: this._createHref()
	    });
	    return React.DOM.a(props, this.props.children);
	  }
	});
	
	module.exports = Link;


/***/ },

/***/ 1052:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(1);
	
	function createClass(name) {
	  return React.createClass({
	    displayName: name,
	    propTypes: {
	      handler: React.PropTypes.oneOfType([
	        // Can be ReactElement or ReactComponent, unfortunately there is no way to typecheck
	        // ReactComponent (that I know of)
	        React.PropTypes.element,
	        React.PropTypes.func
	      ]),
	      path: name === 'NotFound' ?
	        function(props, propName) {
	          if (props[propName]) throw new Error("Don't pass a `path` to NotFound.");
	        }
	        : React.PropTypes.oneOfType([
	            React.PropTypes.string,
	            React.PropTypes.instanceOf(RegExp)
	          ]).isRequired,
	      urlPatternOptions: React.PropTypes.oneOfType([
	        React.PropTypes.arrayOf(React.PropTypes.string),
	        React.PropTypes.object
	      ])
	    },
	    getDefaultProps: function() {
	      if (name === 'NotFound') {
	        return {path: null};
	      }
	      return {};
	    },
	    render: function() {
	      throw new Error(name + " is not meant to be directly rendered.");
	    }
	  });
	}
	
	module.exports = {
	  /**
	   * Regular route descriptor.
	   *
	   * @param {Object} spec
	   */
	  Route: createClass('Route'),
	  /**
	   * Catch all route descriptor.
	   *
	   * @param {Object} spec
	   */
	  NotFound: createClass('NotFound')
	};


/***/ },

/***/ 1053:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React                     = __webpack_require__(1);
	var RouterMixin               = __webpack_require__(425);
	var RouteRenderingMixin       = __webpack_require__(424);
	var assign                    = Object.assign || __webpack_require__(17);
	
	/**
	 * Create a new router class
	 *
	 * @param {String} name
	 * @param {ReactComponent} component
	 */
	function createRouter(name, component) {
	
	  return React.createClass({
	
	    mixins: [RouterMixin, RouteRenderingMixin],
	
	    displayName: name,
	
	    getRoutes: function(props) {
	      return props.children;
	    },
	
	    getDefaultProps: function() {
	      return {
	        component: component
	      };
	    },
	
	    render: function() {
	      // Render the Route's handler.
	      var handler = this.renderRouteHandler(this.props.childProps);
	
	      if (!this.props.component) {
	        return handler;
	      } else {
	        // Pass all props except this component to the Router (containing div/body) and the children,
	        // which are swapped out by the route handler.
	        var props = assign({}, this.props);
	        delete props.component;
	        delete props.children;
	        delete props.childProps;
	        return React.createElement(this.props.component, props, handler);
	      }
	    }
	  });
	}
	
	module.exports = {
	  createRouter: createRouter,
	  Locations: createRouter('Locations', 'div'),
	  Pages: createRouter('Pages', 'body')
	};


/***/ },

/***/ 1054:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Environment   = __webpack_require__(149);
	var emptyFunction = function() {};
	
	/**
	 * Dummy routing environment which provides no path.
	 *
	 * Should be used on server or in WebWorker.
	 */
	function DummyEnvironment() {
	  Environment.call(this);
	}
	
	DummyEnvironment.prototype = Object.create(Environment.prototype);
	DummyEnvironment.prototype.constructor = DummyEnvironment;
	
	DummyEnvironment.prototype.getPath = function() { return null; };
	
	DummyEnvironment.prototype.setPath = function(path, navigation, cb) {
	  // Support old (path, cb) arity
	  if (typeof navigation === 'function' && cb === undefined) {
	    cb = navigation;
	    navigation = {};
	  }
	  this.path = path;
	  cb();
	};
	
	DummyEnvironment.prototype.start = emptyFunction;
	
	DummyEnvironment.prototype.stop = emptyFunction;
	
	module.exports = DummyEnvironment;


/***/ },

/***/ 1055:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Environment = __webpack_require__(149);
	
	/**
	 * Routing environment which routes by `location.pathname`.
	 */
	function PathnameEnvironment() {
	  this.onPopState = this.onPopState.bind(this);
	  this.useHistoryApi = !!(window.history &&
	                          window.history.pushState &&
	                          window.history.replaceState);
	  Environment.call(this);
	}
	
	PathnameEnvironment.prototype = Object.create(Environment.prototype);
	PathnameEnvironment.prototype.constructor = PathnameEnvironment;
	
	PathnameEnvironment.prototype.getPath = function() {
	  return window.location.pathname + window.location.search;
	};
	
	PathnameEnvironment.prototype.pushState = function(path, navigation) {
	  if (this.useHistoryApi) {
	    window.history.pushState({}, '', path);
	  } else {
	    window.location.pathname = path;
	  }
	};
	
	PathnameEnvironment.prototype.replaceState = function(path, navigation) {
	  if (this.useHistoryApi) {
	    window.history.replaceState({}, '', path);
	  } else {
	    window.location.pathname = path;
	  }
	};
	
	PathnameEnvironment.prototype.start = function() {
	  if (this.useHistoryApi && window.addEventListener) {
	    window.addEventListener('popstate', this.onPopState);
	  }
	};
	
	PathnameEnvironment.prototype.stop = function() {
	  if (this.useHistoryApi && window.removeEventListener) {
	    window.removeEventListener('popstate', this.onPopState);
	  }
	};
	
	PathnameEnvironment.prototype.onPopState = function(e) {
	  var path = window.location.pathname;
	
	  if (this.path !== path) {
	    this.setPath(path, {isPopState: true});
	  }
	};
	
	module.exports = PathnameEnvironment;


/***/ },

/***/ 1056:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var URLPattern = __webpack_require__(475);
	var invariant = __webpack_require__(427);
	var warning = __webpack_require__(1057);
	var React = __webpack_require__(1);
	var assign = Object.assign || __webpack_require__(17);
	var qs = __webpack_require__(1058);
	
	var patternCache = {};
	
	/**
	 * Match routes against a path
	 *
	 * @param {Array.<Route>}  routes                  Available Routes.
	 * @param {String}         path                    Path to match.
	 * @param {[Object|Array]} routerURLPatternOptions URLPattern options from parent router (and its parent and so on).
	 */
	function matchRoutes(routes, path, routerURLPatternOptions) {
	  var match, page, notFound, queryObj, urlPatternOptions;
	
	  if (!Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  path = path.split('?');
	  var pathToMatch = path[0];
	  var queryString = path[1];
	  if (queryString) {
	    queryObj = qs.parse(queryString);
	  }
	
	  for (var i = 0, len = routes.length; i < len; i++) {
	    var current = routes[i];
	    // Simply skip null or undefined to allow ternaries in route definitions
	    if (!current) continue;
	
	    invariant(
	      current.props.handler !== undefined && current.props.path !== undefined,
	      "Router should contain either Route or NotFound components as routes");
	
	    if (current.props.path) {
	      // Allow passing compiler options to url-pattern, see
	      // https://github.com/snd/url-pattern#customize-the-pattern-syntax
	      // Note that this blows up if you provide an empty object on a regex path
	      urlPatternOptions = null;
	      if (Array.isArray(current.props.urlPatternOptions) || current.props.path instanceof RegExp) {
	        // If an array is passed, it takes precedence - assumed these are regexp keys
	        urlPatternOptions = current.props.urlPatternOptions;
	      } else if (routerURLPatternOptions || current.props.urlPatternOptions) {
	        urlPatternOptions = assign({}, routerURLPatternOptions, current.props.urlPatternOptions);
	      }
	
	      // matchKeys is deprecated
	      // FIXME remove this block in next minor version
	      if(current.props.matchKeys) {
	        urlPatternOptions = current.props.matchKeys;
	        warning(false,
	          '`matchKeys` is deprecated; please use the prop `urlPatternOptions` instead. See the CHANGELOG for details.');
	      }
	
	      var cacheKey = current.props.path + (urlPatternOptions ? JSON.stringify(urlPatternOptions) : '');
	
	      var pattern = patternCache[cacheKey];
	      if (!pattern) {
	        pattern = patternCache[cacheKey] = new URLPattern(current.props.path, urlPatternOptions);
	      }
	
	      if (!page) {
	        match = pattern.match(pathToMatch);
	        if (match) {
	          page = current;
	        }
	
	        // Backcompat fix in 0.27: regexes in url-pattern no longer return {_: matches}
	        if (match && current.props.path instanceof RegExp && !match._ && Array.isArray(match)) {
	          match = {_: match};
	        }
	
	        // Backcompat fix; url-pattern removed the array wrapper on wildcards
	        if (match && match._ && !Array.isArray(match._)) {
	          match._ = [match._];
	        }
	
	      }
	    }
	    if (!notFound && current.props.path === null) {
	      notFound = current;
	    }
	  }
	
	  return new Match(
	    pathToMatch,
	    page ? page : notFound ? notFound : null,
	    match,
	    queryObj
	  );
	}
	
	/**
	 * Match object
	 *
	 * @private
	 */
	function Match(path, route, match, query) {
	  this.path = path;
	  this.route = route;
	  this.match = match;
	  this.query = query;
	
	  this.unmatchedPath = this.match && this.match._ ?
	    this.match._[0] :
	    null;
	
	  this.matchedPath = this.unmatchedPath ?
	    this.path.substring(0, this.path.length - this.unmatchedPath.length) :
	    this.path;
	}
	
	var EMPTY_OBJECT = {}; // Maintains reference equality, useful for SCU
	Object.freeze && Object.freeze(EMPTY_OBJECT);
	Match.prototype.getProps = function() {
	  if (!this.route) {
	    throw new Error("React-router-component: No route matched! Did you define a NotFound route?");
	  }
	  var props = assign({}, this.route.props, this.match);
	  // Querystring is assigned as _query.
	  props._query = this.query || EMPTY_OBJECT;
	
	  // Delete props that shouldn't be passed to the handler.
	  delete props.pattern;
	  delete props.path;
	  delete props.handler;
	
	  return props;
	}
	
	Match.prototype.getHandler = function() {
	  if (!this.route) return undefined;
	
	  return this.route.props.handler;
	};
	
	module.exports = matchRoutes;


/***/ },

/***/ 1057:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule warning
	 */
	
	"use strict";
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function(){};
	
	if (true) {
	  warning = function(condition, format ) {var args=Array.prototype.slice.call(arguments,2);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      /*eslint no-console:0*/
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}
	
	module.exports = warning;


/***/ },

/***/ 1058:
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Stringify = __webpack_require__(1060);
	var Parse = __webpack_require__(1059);
	
	
	// Declare internals
	
	var internals = {};
	
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },

/***/ 1059:
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(428);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false,
	    allowDots: false
	};
	
	
	internals.parseValues = function (str, options) {
	
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	
	            if (options.strictNullHandling) {
	                obj[Utils.decode(part)] = null;
	            }
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));
	
	            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseObject = function (chain, val, options) {
	
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            indexString === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays &&
	             index <= options.arrayLimit)) {
	
	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseKeys = function (key, val, options) {
	
	    if (!key) {
	        return;
	    }
	
	    // Transform dot notation to bracket notation
	
	    if (options.allowDots) {
	        key = key.replace(/\.([^\.\[]+)/g, '[$1]');
	    }
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1])) {
	
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }
	
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	
	        ++i;
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return internals.parseObject(keys, val, options);
	};
	
	
	module.exports = function (str, options) {
	
	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : internals.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : internals.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : internals.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	
	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {
	
	        return options.plainObjects ? Object.create(null) : {};
	    }
	
	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }
	
	    return Utils.compact(obj);
	};


/***/ },

/***/ 1060:
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(428);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function (prefix, key) {
	
	            return prefix + '[]';
	        },
	        indices: function (prefix, key) {
	
	            return prefix + '[' + key + ']';
	        },
	        repeat: function (prefix, key) {
	
	            return prefix;
	        }
	    },
	    strictNullHandling: false,
	    skipNulls: false,
	    encode: true
	};
	
	
	internals.stringify = function (obj, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort) {
	
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    }
	    else if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        if (strictNullHandling) {
	            return encode ? Utils.encode(prefix) : prefix;
	        }
	
	        obj = '';
	    }
	
	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {
	
	        if (encode) {
	            return [Utils.encode(prefix) + '=' + Utils.encode(obj)];
	        }
	        return [prefix + '=' + obj];
	    }
	
	    var values = [];
	
	    if (typeof obj === 'undefined') {
	        return values;
	    }
	
	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }
	
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	
	        if (skipNulls &&
	            obj[key] === null) {
	
	            continue;
	        }
	
	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encode, filter));
	        }
	        else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, skipNulls, encode, filter));
	        }
	    }
	
	    return values;
	};
	
	
	module.exports = function (obj, options) {
	
	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : internals.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : internals.encode;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var objKeys;
	    var filter;
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    }
	    else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }
	
	    var keys = [];
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return '';
	    }
	
	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    }
	    else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    }
	    else {
	        arrayFormat = 'indices';
	    }
	
	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];
	
	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }
	
	    if (sort) {
	        objKeys.sort(sort);
	    }
	
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	
	        if (skipNulls &&
	            obj[key] === null) {
	
	            continue;
	        }
	
	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode, filter, sort));
	    }
	
	    return keys.join(delimiter);
	};


/***/ },

/***/ 1193:
/***/ function(module, exports) {

	(function() {
	  var URL, URL_PATTERN, defaults, urllite,
	    __hasProp = {}.hasOwnProperty;
	
	  URL_PATTERN = /^(?:(?:([^:\/?\#]+:)\/+|(\/\/))(?:([a-z0-9-\._~%]+)(?::([a-z0-9-\._~%]+))?@)?(([a-z0-9-\._~%!$&'()*+,;=]+)(?::([0-9]+))?)?)?([^?\#]*?)(\?[^\#]*)?(\#.*)?$/;
	
	  urllite = function(raw, opts) {
	    return urllite.URL.parse(raw, opts);
	  };
	
	  urllite.URL = URL = (function() {
	    function URL(props) {
	      var k, v, _ref;
	      for (k in defaults) {
	        if (!__hasProp.call(defaults, k)) continue;
	        v = defaults[k];
	        this[k] = (_ref = props[k]) != null ? _ref : v;
	      }
	      this.host || (this.host = this.hostname && this.port ? "" + this.hostname + ":" + this.port : this.hostname ? this.hostname : '');
	      this.origin || (this.origin = this.protocol ? "" + this.protocol + "//" + this.host : '');
	      this.isAbsolutePathRelative = !this.host && this.pathname.charAt(0) === '/';
	      this.isPathRelative = !this.host && this.pathname.charAt(0) !== '/';
	      this.isRelative = this.isSchemeRelative || this.isAbsolutePathRelative || this.isPathRelative;
	      this.isAbsolute = !this.isRelative;
	    }
	
	    URL.parse = function(raw) {
	      var m, pathname, protocol;
	      m = raw.toString().match(URL_PATTERN);
	      pathname = m[8] || '';
	      protocol = m[1];
	      return new urllite.URL({
	        protocol: protocol,
	        username: m[3],
	        password: m[4],
	        hostname: m[6],
	        port: m[7],
	        pathname: protocol && pathname.charAt(0) !== '/' ? "/" + pathname : pathname,
	        search: m[9],
	        hash: m[10],
	        isSchemeRelative: m[2] != null
	      });
	    };
	
	    return URL;
	
	  })();
	
	  defaults = {
	    protocol: '',
	    username: '',
	    password: '',
	    host: '',
	    hostname: '',
	    port: '',
	    pathname: '',
	    search: '',
	    hash: '',
	    origin: '',
	    isSchemeRelative: false
	  };
	
	  module.exports = urllite;
	
	}).call(this);


/***/ },

/***/ 1196:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }

});
//# sourceMappingURL=admin.bundle.js.map