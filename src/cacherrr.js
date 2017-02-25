'use strict';

/**
 * Cacherrr class
 */
export default class Cacherrr {

  /**
   * Cacherrr constructor
   * @param  {Number} [expire]  - time for cache to expire
   * @param  {Object} [exclude] - array of paths to be excluded from caching
   * @return {Object}           - a Cacherrr instance
   */
  constructor(expire = 0, exclude = []) {
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
  get(path) {
    return new Promise((resolve, reject) => {
      const entry = this.entries[path];
      let error;
      // if path is excluded
      if (this.exclude.indexOf(path) > -1) {
        error = new Error(`${path} is excluded from caching`);
      }
      // if entry exists
      else if (!entry) {
        error = new Error(`${path} is not cached yet`);
      }
      // if cache is expired
      else if (entry.expires < +new Date()) {
        error = new Error(`cache for ${path} is expired`);
      }

      // reject promise if error
      if (error) {
        delete this.entries[path];
        reject(error);
      }
      // otherwise resolve with cached data
      else {
        resolve(entry.data);
      }
    });
  }

  /**
   * set cached data for a given path
   * @param  {String} path     - path
   * @param  {Object} data     - data to be cached
   * @param  {Object} [expire] - override expire time
   * @return {Promise}         - a promise
   */
  set(path, data, expire = this.expire) {
    return new Promise((resolve, reject) => {
      // if path is not excluded, create entry and resolve with cached data
      if (this.exclude.indexOf(path) < 0) {
        let now = +new Date();
        this.entries[path] = {
          timestamp: now,
          expires: now + expire,
          data: data,
        }
        resolve(data);
      }
      // otherwise reject promise
      else {
        reject(new Error(`${path} is not cached yet`));
      }
    });
  }

  /**
   * clear cached data for a given path
   * @param  {String} path - path
   * @return {Promise}     - a promise
   */
  clear(path) {
    delete this.entries[path];
    return Promise.resolve();
  }

  /**
   * clear all cached data
   * @return {Promise} - a promise
   */
  clearAll() {
    this.entries = [];
    return Promise.resolve();
  }
}
