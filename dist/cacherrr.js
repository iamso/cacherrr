/*!
 * cacherrr - version 0.2.1
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
     * @param  {Number} [expire]  - time for cache to expire
     * @param  {Object} [exclude] - array of paths to be excluded from caching
     * @return {Object}           - a Cacherrr instance
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

          // if path is empty
          if (path === undefined) {
            error = new Error('no path provided');
          }
          // if path is excluded
          else if (_this.exclude.indexOf(path) > -1) {
              error = new Error(path + ' is excluded from caching');
            }
            // if entry doesn't exist
            else if (!entry) {
                error = new Error(path + ' is not cached yet');
              }
              // if cache is expired
              else if (entry.expires < Date.now()) {
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

        var expire = arguments.length <= 2 || arguments[2] === undefined ? this.expire : arguments[2];

        return new Promise(function (resolve, reject) {
          var now = Date.now();
          var error = void 0;

          // if path is empty
          if (path === undefined) {
            error = new Error('no path provided');
          }
          // if data is empty
          else if (!data) {
              error = new Error('no data provided');
            }
            // if path is excluded
            else if (_this2.exclude.indexOf(path) > -1) {
                error = new Error(path + ' is excluded from caching');
              }

          // reject promise if error
          if (error) {
            reject(error);
          }
          // otherwise cache path and resolve with cached data
          else {
              _this2.entries[path] = {
                timestamp: now,
                expires: now + expire,
                data: data
              };
              resolve(data);
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