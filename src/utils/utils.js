/**
 * Util function: checks if object includes provided pair "key, value".
 *
 * @param arr {Array}: The array to query
 * @param key {*}: The key to query
 * @param value {*}: The value to query
 * @return {boolean}: Returns boolean if object includes provided pair "key, value"
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
 * Util function: checks if passed argument is object.
 *
 * @param obj {*}: The parameter to check
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

/**
 * Util function: checks if object is empty.
 *
 * @param obj {Object}: The object to query
 * @return {boolean}: Returns boolean if object empty or not
 *
 * @example
 * const obj = { 'user': 'barney',  'active': false };
 * isEmptyObject(obj)
 *  => false
 *
 * isEmptyObject({})
 *  => true
 */
function isEmptyObject(obj) {
  return isObject(obj) ? Object.keys(obj).length === 0 : false;
}

/**
 * Util function: checks if valid predicate array provided.
 *
 * @param predicate {Array}: The Array to check
 * @return {boolean}: Returns boolean if passed predicate array is valid
 *
 * @example
 * const predicate = ['user', 'barney'];
 * isInvalidPredicateArray(predicate)
 *  => true
 *
 * isInvalidPredicateArray([])
 *  => false
 *
 * isInvalidPredicateArray(['user', 'barney', 'sam'])
 *  => false
 */
function isInvalidPredicateArray(predicate) {
  return predicate.length > 2 || predicate.length < 1;
}

module.exports = {
  inObject,
  isObject,
  isEmptyObject,
  isInvalidPredicateArray,
};
