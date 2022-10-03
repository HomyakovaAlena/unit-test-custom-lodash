const utils = require('./utils/utils');

/**
 * This method is like _.assign except that it recursively merges own
 * and inherited enumerable string keyed properties of source objects into the destination object.
 * Source properties that resolve to undefined are skipped if a destination value exists.
 * Array and plain object properties are merged recursively.
 * Other objects and value types are overridden by assignment.
 * Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * Note: This method mutates object.
 *
 * @param obj (Object): The destination object.
 * @param [sources] (...Object): The source objects.
 * @return (Object): Returns object.
 *
 * @example
 * const object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * const other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * merge(object, other);
 *  => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 *
 */
function merge(target, ...sources) {
  // eslint-disable-next-line no-restricted-syntax
  for (const source of sources) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(source)) {
      // eslint-disable-next-line no-param-reassign
      if (!Object.hasOwn(target, key) || typeof source[key] !== 'object') target[key] = source[key];
      else merge(target[key], source[key]);
    }
  }
  return target;
}

/**
 * The opposite of _.pick;
 * this method creates an object composed of the own
 * and inherited enumerable property paths of object that are not omitted.
 *
 * @param obj (Object): The source object.
 * @param [paths] (...(string|string[])): The property paths to omit.
 * @return (Object): Returns the new object.
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * omit(object, ['a', 'c']);
 *  => { 'b': '2' }
 *
 */
function omit(obj, ...pathes) {
  if (!utils.isObject(obj)) return {};
  const result = {};
  const pathArray = [...pathes];
  Object.keys(obj).forEach((key) => {
    if (!pathArray.includes(key) && !pathArray.flat().includes(key)) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * The opposite of _.pickBy; this method creates an object
 * composed of the own and inherited enumerable string keyed properties of object
 * that predicate doesn't return truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param obj (Object): The source object.
 * @param func (Function): The function invoked per property.
 * @return (Object): Returns the new object.
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * const isNumber = (x) => x === Number(x);
 * omitBy(object, isNumber);
 *  => { 'b': '2' }
 *
 */
function omitBy(obj, func) {
  if (!utils.isObject(obj)) return {};
  if (!func || !utils.isObject(obj)) return obj;
  const result = {};
  Object.entries(obj).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    if (!func(value)) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Creates an object composed of the picked object properties.
 *
 * @param obj (Object): The source object.
 * @param [paths] (...(string | string[])): The property paths to pick.
 * @return (Object): Returns the new object.
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * pick(object, ['a', 'c']);
 *  => { 'a': 1, 'c': 3 }
 *
 */
function pick(obj, ...pathes) {
  const result = {};
  const pathArray = [...pathes];
  Object.keys(obj).forEach((key) => {
    if (pathArray.includes(key) || pathArray.flat().includes(key)) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Creates an object composed of the object properties predicate returns truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param obj (Object): The source object.
 * @param func (Function): The function invoked per property.
 * @return (Object): Returns the new object.
 *
 * @example
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * const isNumber = (x) => x === Number(x);
 *
 * pickBy(object, isNumber);
 *  => { 'a': 1, 'c': 3 }
 *
 */
function pickBy(obj, func) {
  const result = {};
  if (!func || !utils.isObject(obj)) return {};
  Object.entries(obj).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    if (func(value)) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Creates an array of own enumerable string keyed-value pairs for object.
 * If object is a map or set, its entries are returned.
 *
 * @param obj (Object): The source object.
 * @return (Array): Returns the key-value pairs.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 * Foo.prototype.c = 3;
 * toPairs(new Foo);
 *  => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 *
 */
function toPairs(obj) {
  if (obj instanceof Set || obj instanceof Map) return [obj.entries()];
  const result = [];
  Object.keys(obj).forEach((key) => {
    if (typeof key === 'string') {
      result.push([key, obj[key]]);
    }
  });
  return result;
}

module.exports = {
  merge,
  omit,
  omitBy,
  pick,
  pickBy,
  toPairs,
};
