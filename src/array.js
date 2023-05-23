const utils = require('./utils/utils');

/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param arr {Array}: The array to process
 * @param [size = 1]{number}: The length of each chunk
 * @return {Array}: Returns the new array of chunks.
 *
 * @example
 * chunk(['a', 'b', 'c', 'd'], 2);
 *   => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3);
 * => [['a', 'b', 'c'], ['d']]
 */
function chunk(arr, size = 1) {
  const { length } = arr;
  if (!Array.isArray(arr) || !length || size < 1) {
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
 * @param arr{Array}: The array to compact.
 * @return {Array}: Returns the new array of filtered values.
 *
 * @example
 * compact([0, 1, false, 2, '', 3]);
 *  => [1, 2, 3]
 *
 */
function compact(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.filter((item) => item);
}

/**
 * Creates a slice of array with n elements dropped from the beginning.
 *
 * @param arr {Array}: The array to query
 * @param [num = 1]{number}: The number of elements to drop.
 * @return {Array}: Returns the slice of array.
 *
 * @example
 * drop([1, 2, 3]);
 *  => [2, 3]
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
  if (!Array.isArray(arr)) return [];
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
 * @param arr {Array}: The array to query
 * @param predicate {Function | Array | string}: The predicate applied per iteration.
 * @return {Array}: Returns the slice of array.
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
  if (!arr || !Array.isArray(arr) || !arr.length) return [];
  if (!predicate) return arr;
  if (Array.isArray(predicate)) {
    return utils.isInvalidPredicateArray(predicate)
      ? []
      : arr.slice(
        arr.findIndex((element) => !utils.inObject(element, predicate[0], predicate[1])),
        arr.length,
      );
  }
  switch (typeof predicate) {
    case 'string': return arr.slice(
      arr.findIndex((element) => Object.hasOwn(element, predicate)),
      arr.length,
    );
    case 'object': return arr.slice(
      arr.findIndex((element) => Object.entries(predicate)
        .some((entry) => !utils.inObject(element, entry[0], entry[1]))),
      arr.length,
    );
    case 'function': return arr.slice(
      arr.findIndex((item) => !predicate(item)),
      arr.length,
    );
    default: return arr;
  }
}

/**
 * Creates a slice of array with n elements taken from the beginning.
 *
 * @param arr {Array}: The array to query
 * @param n {number}: The number of elements to take.
 * @return {Array}: Returns the slice of array.
 *
 * @example
 * take([1, 2, 3]);
 *  => [1]
 *
 * take([1, 2, 3], 2);
 *  => [1, 2]
 *
 * take([1, 2, 3], 5);
 *  => [1, 2, 3]
 *
 * take([1, 2, 3], 0);
 *  => []
 */
function take(array, n = 1) {
  if (!array || !Array.isArray(array) || !array.length) return [];
  return array.slice(0, n);
}

/**
 * Iterates over elements of collection,
 * returning an array of all elements predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * Note: this method returns a new array.
 *
 * @param collection {Array | Object}: The collection to iterate over.
 * @param predicate {Function | Array | string}: The predicate applied per iteration.
 * @return {Array}: Returns the new filtered array.
 *
 * @example
 * const users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * filter(users, function(o) { return !o.active; });
 *  => objects for ['fred']
 *
 * filter(users, { 'age': 36, 'active': true });
 *  => objects for ['barney']
 *
 * filter(users, ['active', false]);
 *  => objects for ['fred']
 *
 * filter(users, 'active');
 *  => objects for ['barney']
 *
 */
function filter(collection, predicate) {
  if (Array.isArray(collection) && collection.length === 0) return [];
  if (utils.isEmptyObject(collection)) return [];
  const collectionToFilter = Array.isArray(collection) ? collection : Object.values(collection);
  if (!predicate) return collectionToFilter;

  if (Array.isArray(predicate)) {
    return utils.isInvalidPredicateArray(predicate)
      ? [] : collectionToFilter.filter((element) => utils
        .inObject(element, predicate[0], predicate[1]));
  }

  switch (typeof predicate) {
    case 'string': return collectionToFilter.filter((element) => Object.hasOwn(element, predicate));
    case 'object': return collectionToFilter.filter((element) => Object.entries(predicate)
      .every((entry) => utils.inObject(element, entry[0], entry[1])));
    case 'function': return collectionToFilter.filter((element) => predicate(element));
    default: return [];
  }
}

/**
 * Iterates over elements of collection, returning the first element predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index|key, collection).
 *
 * @param collection {Array | Object}: The collection to iterate over.
 * @param predicate {Function | Array | string}: The predicate applied per iteration.
 * @param [n=0]{number}: The index to search from.
 * @return {*} Returns the matched element, else undefined.
 *
 * @example
 * const users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true },
 * ];
 *
 * find(users, function(o) { return o.age < 40; });
 *  => object for 'barney'
 *
 * find(users, { 'age': 1, 'active': true });
 *  => object for 'pebbles'
 *
 * find(users, ['active', false]);
 *  => object for 'fred'
 *
 * find(users, 'active');
 *  => object for 'barney'
 *
 */
function find(collection, predicate, n = 0) {
  if (Array.isArray(collection) && collection.length === 0) return undefined;
  if (utils.isEmptyObject(collection)) return undefined;
  if (!predicate) return undefined;
  const length = Array.isArray(collection) ? collection.length : Object.keys(collection).length;
  if (n > length) return undefined;
  const collectionToFilter = Array.isArray(collection) ? collection : Object.values(collection);

  if (Array.isArray(predicate)) {
    return utils.isInvalidPredicateArray(predicate)
      ? undefined : collectionToFilter.slice(n, collectionToFilter.length).find((element) => utils
        .inObject(element, predicate[0], predicate[1]));
  }

  switch (typeof predicate) {
    case 'string': return collectionToFilter
      .slice(n, collectionToFilter.length)
      .find((element) => Object.hasOwn(element, predicate));
    case 'object': return collectionToFilter
      .slice(n, collectionToFilter.length)
      .find((element) => Object.entries(predicate)
        .every((entry) => utils.inObject(element, entry[0], entry[1])));
    case 'function': return collectionToFilter
      .slice(n, collectionToFilter.length)
      .find((element) => predicate(element));
    default: return undefined;
  }
}

/**
 * Checks if value is in collection.
 * If collection is a string, it's checked for a substring of value,
 * otherwise SameValueZero is used for equality comparisons.
 * If fromIndex is negative, it's used as the offset from the end of collection.
 *
 * @param collection {Array|Object|string}: The collection to inspect.
 * @param value {*}: The value to search for.
 * @param [fromIndex=0] {number}: The index to search from.
 * @return (boolean): Returns true if value is found, else false.
 *
 * @example
 *
 * includes([1, 2, 3], 1);
 *  => true
 *
 * includes([1, 2, 3], 1, 2);
 *  => false
 *
 * includes({ 'a': 1, 'b': 2 }, 1);
 *  => true
 *
 * includes('abcd', 'bc');
 *  => true
 *
 */
function includes(collection, value, fromIndex = 0) {
  if ((Array.isArray(collection) || typeof collection === 'string')
    && (collection.length === 0)) return false;
  if (utils.isEmptyObject(collection)) return false;
  if (!value) return false;
  const length = (Array.isArray(collection) || typeof collection === 'string')
    ? collection.length
    : Object.keys(collection).length;
  if (Math.abs(fromIndex) > length) return false;
  const collectionToFilter = (Array.isArray(collection) || typeof collection === 'string')
    ? collection
    : Object.values(collection);

  return fromIndex >= 0 ? collectionToFilter.includes(value, fromIndex)
    : collectionToFilter.includes(value, length + fromIndex);
}

/**
 * Creates an array of values by running each element in collection thru iteratee.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 *
 * @param collection {Array|Object}: The collection to iterate over.
 * @param func {Function | string}: Function/property applied per iteration.
 * @return (Array): Returns the new mapped array.
 *
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * map([4, 8], square);
 *  => [16, 64]
 *
 * map({ 'a': 4, 'b': 8 }, square);
 *  => [16, 64] (iteration order is not guaranteed)
 *
 * const users = [
 *    { 'user': 'barney' },
 *    { 'user': 'fred' }
 * ];
 *
 * map(users, 'user');
 *  => ['barney', 'fred']
 *
 */
function map(collection, func) {
  if ((Array.isArray(collection)) && (collection.length === 0)) return [];
  if (utils.isEmptyObject(collection)) return [];
  if (!func || (typeof func !== 'function' && typeof func !== 'string')) return [];
  const collectionToApply = (Array.isArray(collection)) ? collection
    : Object.values(collection);

  return typeof func === 'string' ? collectionToApply
    .map((element) => element[func]) : collectionToApply.map(func);
}

/**
 * Creates an array of grouped elements,
 * the first of which contains the first elements of the given arrays,
 * the second of which contains the second elements of the given arrays, and so on.
 *
 * @param [arrays] (...Array): The arrays to process.
 * @return (Array): Returns the new array of grouped elements.
 *
 * @example
 *
 * zip(['a', 'b'], [1, 2], [true, false]);
 *  => [['a', 1, true], ['b', 2, false]]
 *
 */
function zip(...arrays) {
  if (!arrays || arrays.length === 0) return [];
  const filteredForArrays = arrays.filter((item) => Array.isArray(item));
  if (!filteredForArrays.length) return [];
  if (filteredForArrays.every((item) => item.length < 1)) return [];
  let flag = true;
  const result = [];
  let count = 0;
  while (flag) {
    const ind = count;
    result.push(filteredForArrays.map((item) => item[ind]));
    if (filteredForArrays.some((item) => item.length - 1 > ind)) {
      count += 1;
    } else {
      flag = false;
    }
  }
  return result;
}

module.exports = {
  chunk,
  compact,
  drop,
  dropWhile,
  take,
  filter,
  find,
  includes,
  map,
  zip,
};
