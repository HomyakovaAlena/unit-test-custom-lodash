// const merge = require('../object');

/**
 * Util function: checks if object includes provided pair "key, value".
 *
 * @param {Array} arr: The array to query
 * @param {string | number | undefined} key: The key to query
 * @param {string | number | boolean | undefined} value: The value to query
 * @return {boolean} Returns boolean if object includes provided pair "key, value"
 *
 * @example
 * const obj = { 'user': 'barney',  'active': false };
 * inObject(obj, 'user', 'barney')
 *  => true
 *
 * inObject(obj, 'user', 'smith')
 *  => false
 */

const inObject = (obj, key, value) => {
  if ((Object.hasOwn(obj, key) && obj[key] === value)) return true;
  return false;
};

/**
 * Util function: checks if object is empty.
 *
 * @param {Object} obj: The object to query
 * @return {boolean} Returns boolean if object empty or not
 *
 * @example
 * const obj = { 'user': 'barney',  'active': false };
 * isEmpty(obj)
 *  => false
 *
 * isEmpty({})
 *  => true
 */

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Util function: checks if passed argument is object.
 *
 * @param {*} obj: The parameter to check
 * @return {boolean} Returns boolean if passed argument is object or not
 *
 * @example
 * const obj = { 'user': 'barney',  'active': false };
 * isObject(obj)
 *  => true
 *
 * isObject('a')
 *  => false
 */

function isObject(obj) {
  return obj && obj.constructor === Object;
}

module.exports = {
  inObject,
  isEmpty,
  isObject,
};
