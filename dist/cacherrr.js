/*!
 * cacherrr - version 0.1.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.Cacherrr = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  /**
   * Cacherrr class
   */

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Cacherrr = function () {

    /**
     * Cacherrr constructor
     * @param  {Number} expire  - time for cache to expire
     * @param  {Object} exclude - array of paths to be excluded from caching
     * @return {Object}         - a Cacherrr instance
     */
    function Cacherrr() {
      var expire = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var exclude = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      _classCallCheck(this, Cacherrr);

      // time for cache to expire
      this.expire = expire;
      // array of paths to be excluded from caching
      this.exclude = exclude;
      // cache entries
      this.entries = {};
    }

    /**
     * get cached data for a given path
     * @param  {String} path - path
     * @return {Promise}     - a promise
     */


    _createClass(Cacherrr, [{
      key: 'get',
      value: function get(path) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var entry = _this.entries[path];
          var error = void 0;
          // if path is excluded
          if (_this.exclude.indexOf(path) > -1) {
            error = new Error(path + ' is excluded from caching');
          }
          // if entry exists
          else if (!entry) {
              error = new Error(path + ' is not cached yet');
            }
            // if cache is expired
            else if (entry.timestamp + _this.expire < +new Date()) {
                error = new Error('cache for ' + path + ' is expired');
              }

          // reject promise if error
          if (error) {
            delete _this.entries[path];
            reject(error);
          }
          // otherwise resolve with cached data
          else {
              resolve(entry.data);
            }
        });
      }
    }, {
      key: 'set',
      value: function set(path, data) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          // if path is not excluded, create entry and resolve with cached data
          if (_this2.exclude.indexOf(path) < 0) {
            _this2.entries[path] = {
              timestamp: +new Date(),
              data: data
            };
            resolve(data);
          }
          // otherwise reject promise
          else {
              reject(new Error(path + ' is not cached yet'));
            }
        });
      }
    }, {
      key: 'clear',
      value: function clear(path) {
        delete this.entries[path];
        return Promise.resolve();
      }
    }, {
      key: 'clearAll',
      value: function clearAll() {
        this.entries = [];
        return Promise.resolve();
      }
    }]);

    return Cacherrr;
  }();

  exports.default = Cacherrr;
  module.exports = exports['default'];
});