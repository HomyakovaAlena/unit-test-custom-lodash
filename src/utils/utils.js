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

module.exports = {
  inObject,
  isEmpty,
};
