const utils = require('./utils/utils');

/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param {Array} arr: The array to process
 * @param [size = 1]{number} size: The length of each chunk
 * @return {Array}: Returns the new array of chunks.
 *
 * @example
 *   chunk(['a', 'b', 'c', 'd'], 2);
 *   => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3);
 * => [['a', 'b', 'c'], ['d']]
 */
function chunk(arr, size = 1) {
  const { length } = arr;
  if (!length || size < 1) {
    return [];
  }
  const sizeCorrected = Math.round(size);
  const chunkedArray = [];
  arr.forEach((item) => {
    const last = chunkedArray[chunkedArray.length - 1];
    if (!last || last.length === sizeCorrected) {
      chunkedArray.push([item]);
    } else {
      last.push(item);
    }
  });
  return chunkedArray;
}

/**
 * Creates an array with all falsey values removed.
 * The values false, null, 0, "", undefined, and NaN are falsey.
 *
 * @param {Array} arr: The array to compact.
 * @return {Array}: Returns the new array of filtered values.
 *
 * @example
 *   compact([0, 1, false, 2, '', 3]);
 *   => [1, 2, 3]
 *
 */
function compact(arr) {
  return arr.filter((item) => item);
}

/**
 * Creates a slice of array with n elements dropped from the beginning.
 *
 * @param {Array} arr: The array to query
 * @param [n=1]{number} num: The number of elements to drop.
 * @return {Array} Returns the slice of array.
 *
 * @example
 *  drop([1, 2, 3]);
 *    => [2, 3]
 *
 * drop([1, 2, 3], 2);
 *  => [3]
 *
 * drop([1, 2, 3], 5);
 *  => []
 *
 * drop([1, 2, 3], 0);
 *  => [1, 2, 3]
 */
function drop(arr, num = 1) {
  const { length } = arr;
  if (num === 0) return arr;
  if (num >= length || !length) return [];
  return arr.slice(num, arr.length);
}

/**
 * Creates a slice of array excluding elements dropped from the beginning.
 * Elements are dropped until predicate returns falsey.
 * The predicate is invoked with three arguments: (value, index, array).
 *
 * @param {Array} arr: The array to query
 * @param {Function | Array | string} predicate: The predicate applied per iteration.
 * @return {Array} Returns the slice of array.
 *
 * @example
 * const users = [
 * { 'user': 'barney',  'active': false },
 * { 'user': 'fred',    'active': false },
 * { 'user': 'pebbles', 'active': true }
 * ];
 * dropWhile(users, function(o) { return !o.active; });
 *  => objects for ['pebbles']
 *
 * dropWhile(users, { 'user': 'barney', 'active': false });
 *  => objects for ['fred', 'pebbles']
 *
 * dropWhile(users, ['active', false]);
 *  => objects for ['pebbles']
 *
 * dropWhile(users, 'active');
 *  => objects for ['barney', 'fred', 'pebbles']
 */
function dropWhile(arr, predicate) {
  if (!arr || !arr.length) return [];
  if (!predicate) return arr;
  if (Array.isArray(predicate)) {
    return predicate.length > 2 || predicate.length === 0
      ? []
      : arr.slice(
        arr.findIndex((element) => !utils.inObject(element, predicate[0], predicate[1])),
        arr.length,
      );
  }
  if (typeof predicate === 'string') {
    return arr.slice(
      arr.findIndex((element) => Object.hasOwn(element, predicate)),
      arr.length,
    );
  }
  if (typeof predicate === 'object') {
    return arr.slice(
      arr.findIndex((element) => Object.entries(predicate)
        .some((entry) => !utils.inObject(element, entry[0], entry[1]))),
      arr.length,
    );
  }
  if (typeof predicate === 'function') {
    return arr.slice(
      arr.findIndex((item) => !predicate(item)),
      arr.length,
    );
  }
  return arr;
}

module.exports = {
  chunk,
  compact,
  drop,
  dropWhile,
};
