const array = require('../src/array');

describe('Array.chunk', () => {
  test('Return if chunk function exist', () => {
    expect(array.chunk).toBeDefined();
  });
  test('Chunk an array of 4 string values with the length of 2', () => {
    expect(array.chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
  test('Chunk an array of 4 string values with the length of 3', () => {
    expect(array.chunk(['a', 'b', 'c', 'd'], 3)).toEqual([
      ['a', 'b', 'c'],
      ['d'],
    ]);
  });
  test('Chunk an array of 10 numbers with the length of 2', () => {
    expect(array.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ]);
  });
  test('Chunk an array of arrays', () => {
    expect(array.chunk([[1], [2], [3, 4], [5, 6], [7, 8]], 3)).toEqual([
      [[1], [2], [3, 4]],
      [
        [5, 6],
        [7, 8],
      ],
    ]);
  });
  test('Chunk an empty array', () => {
    expect(array.chunk([], 2)).toEqual([]);
  });
  test('Chunk an array with "size" parameter equal to 0', () => {
    expect(array.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0)).toEqual([]);
  });
  test('Chunk an array with "size" parameter of float number', () => {
    expect(array.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1.5)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
    ]);
  });
  test('Chunk an array with undefined "size" parameter', () => {
    expect(array.chunk([1, 2, 3, 4, 5])).toEqual([[1], [2], [3], [4], [5]]);
  });
});

describe('Array.compact', () => {
  test('Return if compact function exist', () => {
    expect(array.compact).toBeDefined();
  });
  test('Compact an array of number values and falsy values (false, 0, "")', () => {
    expect(array.compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });
  test('Compact an array of 4 string values and falsy values (false, null, 0, -0, "", undefined, and NaN)', () => {
    expect(
      array.compact([
        'a',
        null,
        'b',
        false,
        'c',
        0,
        '',
        'd',
        undefined,
        -0,
        NaN,
      ]),
    ).toEqual(['a', 'b', 'c', 'd']);
  });
  test('Compact an emty array ', () => {
    expect(array.compact([])).toEqual([]);
  });
  test('Compact an array containing only falsy values', () => {
    expect(array.compact([0, '', null, undefined, NaN])).toEqual([]);
  });
  test('Compact an array containing only truthy values', () => {
    expect(array.compact([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  test('Compact an array containing emty array, empty object and falsy values', () => {
    expect(array.compact([Infinity, {}, [], -0, false])).toEqual([
      Infinity,
      {},
      [],
    ]);
  });
});

describe('Array.drop', () => {
  test('Return if drop function exist', () => {
    expect(array.drop).toBeDefined();
  });
  test('Drops an array with no parameter num provided', () => {
    expect(array.drop([1, 2, 3])).toEqual([2, 3]);
  });
  test('Drops an array with parameter num provided (base scenario)', () => {
    expect(array.drop([1, 2, 3], 2)).toEqual([3]);
  });
  test('Drops an array with parameter num greater than the length of array', () => {
    expect(array.drop([1, 2, 3], 5)).toEqual([]);
  });
  test('Drops an array with parameter num equal to 0', () => {
    expect(array.drop([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });
  test('Drops an empty array with any parameter num provided', () => {
    expect(array.drop([], 3)).toEqual([]);
  });
});

describe('Array.dropWhile', () => {
  test('Return if dropWhile function exist', () => {
    expect(array.dropWhile).toBeDefined();
  });
  test('Drops an array with no pedicate parameter provided', () => {
    expect(array.dropWhile([1, 2, 3])).toEqual([1, 2, 3]);
  });
  const users = [
    { user: 'barney', active: false },
    { user: 'fred', active: false },
    { user: 'pebbles', active: true },
    { user: 'maggie', active: true },
  ];
  test('Drops an array if parameter predicate provided with function', () => {
    expect(array.dropWhile(users, (o) => !o.active)).toEqual([
      { user: 'pebbles', active: true },
      { user: 'maggie', active: true },
    ]);
  });
  test('Drops an array if parameter predicate provided with object (analog `_.matches` iteratee shorthand.`', () => {
    expect(array.dropWhile(users, { user: 'barney', active: false })).toEqual([
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
      { user: 'maggie', active: true },
    ]);
  });
  test('Drops an array if parameter predicate provided with array (analog `_.matchesProperty` iteratee shorthand.`)', () => {
    expect(array.dropWhile(users, ['active', false])).toEqual([
      { user: 'pebbles', active: true },
      { user: 'maggie', active: true },
    ]);
  });
  test('Drops an array if parameter predicate provided with property (analog `_.property` iteratee shorthand.`)', () => {
    expect(array.dropWhile(users, 'active')).toEqual([
      { user: 'barney', active: false },
      { user: 'fred', active: false },
      { user: 'pebbles', active: true },
      { user: 'maggie', active: true },
    ]);
  });
});

describe('Array.take', () => {
  test('Return if take function exist', () => {
    expect(array.take).toBeDefined();
  });
  test('Creates a slice of array with parameter n not defined', () => {
    expect(array.take([1, 2, 3])).toEqual([1]);
  });
  test('Creates a slice of array with parameter n = 2', () => {
    expect(array.take([1, 2, 3], 2)).toEqual([1, 2]);
  });
  test('Creates a slice of array with parameter n = 5', () => {
    expect(array.take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });
  test('Creates a slice of array with parameter n equal to 0', () => {
    expect(array.take([1, 2, 3], 0)).toEqual([]);
  });
  test('Creates a slice of empty array with parameter n equal to 5', () => {
    expect(array.take([], 5)).toEqual([]);
  });
});

describe('Array.filter', () => {
  test('Return if filter function exist', () => {
    expect(array.filter).toBeDefined();
  });
  test('Check if function filter works for empty collections (array)', () => {
    expect(array.filter({}, (o) => !o.active)).toEqual([]);
  });
  test('Check if function filter works for empty collections (object)', () => {
    expect(array.filter([], (o) => !o.active)).toEqual([]);
  });
  const users = [
    { user: 'barney', age: 36, active: true },
    { user: 'fred', age: 40, active: false },
  ];
  const usersObj = {
    user1: { user: 'barney', age: 36, active: true },
    user2: { user: 'fred', age: 40, active: true },
  };
  test('Check if function filter works with no predicate argument provided (collection is array)', () => {
    expect(array.filter(users)).toEqual(users);
  });
  test('Check if function filter works with no predicate argument provided (collection is object)', () => {
    expect(array.filter(usersObj)).toEqual([
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: true },
    ]);
  });
  test('Filters an array if parameter predicate provided with function', () => {
    expect(array.filter(users, (o) => !o.active)).toEqual([
      { user: 'fred', age: 40, active: false },
    ]);
  });
  test('Filters an array if parameter predicate provided with object (analog `_.matches` iteratee shorthand.`', () => {
    expect(array.filter(users, { age: 36, active: true })).toEqual([
      { user: 'barney', age: 36, active: true },
    ]);
  });
  test('Filters an array if parameter predicate provided with array (analog `_.matchesProperty` iteratee shorthand.`)', () => {
    expect(array.filter(users, ['active', false])).toEqual([
      { user: 'fred', age: 40, active: false },
    ]);
  });
  test('Filters an object if parameter predicate provided with array (analog `_.matchesProperty` iteratee shorthand.`)', () => {
    expect(array.filter(usersObj, ['age', 40])).toEqual([
      { user: 'fred', age: 40, active: true },
    ]);
  });
  test('Filters an array if parameter predicate provided with property (analog `_.property` iteratee shorthand.`)', () => {
    expect(array.filter(users, 'active')).toEqual([
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
    ]);
  });
});

describe('Array.find', () => {
  test('Return if find function exist', () => {
    expect(array.find).toBeDefined();
  });
  test('Check if function find works for empty collections (array)', () => {
    expect(array.find([], (o) => o.age < 40)).toBeUndefined();
  });
  test('Check if function find works for empty collections (object)', () => {
    expect(array.find({}, (o) => o.age < 40)).toBeUndefined();
  });
  const users = [
    { user: 'barney', age: 36, active: true },
    { user: 'fred', age: 40, active: false },
    { user: 'pebbles', age: 1, active: true },
  ];
  const usersObj = {
    user1: { user: 'barney', age: 36, active: true },
    user2: { user: 'fred', age: 40, active: false },
    user3: { user: 'pebbles', age: 1, active: true },
  };
  test('Check if function find works with no predicate argument provided (collection is array)', () => {
    expect(array.find(users)).toBeUndefined();
  });
  test('Check if function find works with no predicate argument provided (collection is object)', () => {
    expect(array.find(usersObj)).toBeUndefined();
  });
  test('Finds element in the array if parameter predicate provided with function', () => {
    expect(array.find(users, (o) => o.age < 40)).toEqual({
      user: 'barney',
      age: 36,
      active: true,
    });
  });
  test('Finds element in the array if parameter predicate provided with object (analog `_.matches` iteratee shorthand.`', () => {
    expect(array.find(users, { age: 1, active: true })).toEqual({
      user: 'pebbles',
      age: 1,
      active: true,
    });
  });
  test('Finds element in the array if parameter predicate provided with array (analog `_.matchesProperty` iteratee shorthand.`)', () => {
    expect(array.find(users, ['active', false])).toEqual({
      user: 'fred',
      age: 40,
      active: false,
    });
  });
  test('Finds element in the array if parameter predicate provided with property (analog `_.property` iteratee shorthand.`)', () => {
    expect(array.find(users, 'active')).toEqual({
      user: 'barney',
      age: 36,
      active: true,
    });
  });
  test('Finds element in the object if parameter predicate provided with function', () => {
    expect(array.find(usersObj, (o) => o.age < 40)).toEqual({
      user: 'barney',
      age: 36,
      active: true,
    });
  });
  test('Finds element in the object if parameter predicate provided with object (analog `_.matches` iteratee shorthand.`', () => {
    expect(array.find(usersObj, { age: 1, active: true })).toEqual({
      user: 'pebbles',
      age: 1,
      active: true,
    });
  });
  test('Finds element in the object if parameter predicate provided with array (analog `_.matchesProperty` iteratee shorthand.`)', () => {
    expect(array.find(usersObj, ['active', false])).toEqual({
      user: 'fred',
      age: 40,
      active: false,
    });
  });
  test('Finds element in the object if parameter predicate provided with property (analog `_.property` iteratee shorthand.`)', () => {
    expect(array.find(usersObj, 'active')).toEqual({
      user: 'barney',
      age: 36,
      active: true,
    });
  });
  test('Finds element in the array if parameter predicate provided with function and n parameter exceeds the length of array', () => {
    expect(array.find(users, (o) => o.age < 40, 5)).toBeUndefined();
  });
  test('Finds element in the array if parameter predicate provided with function and n = 1', () => {
    expect(array.find(users, (o) => o.age < 40, 1)).toEqual({
      user: 'pebbles',
      age: 1,
      active: true,
    });
  });
});

describe('Array.includes', () => {
  test('Return if includes function exist', () => {
    expect(array.includes).toBeDefined();
  });
  test('Check if function includes works for empty collections (array)', () => {
    expect(array.includes({}, 1)).toBeFalsy();
  });
  test('Check if function includes works for empty collections (object)', () => {
    expect(array.includes([], 1)).toBeFalsy();
  });
  test('Check if function includes works for empty collections (string)', () => {
    expect(array.includes('', 'a')).toBeFalsy();
  });
  const arr = [0, 1, 2, 3, 4, 5];
  const obj = {
    a: 1,
    b: 2,
    c: 3,
  };
  const str = 'barney';
  test('Check if function includes works with |fromIndex| more than collection length', () => {
    expect(array.includes(arr, 1, 5)).toBeFalsy();
  });
  test('Check if function includes works with |fromIndex| more than collection length', () => {
    expect(array.includes(obj, 1, 5)).toBeFalsy();
  });
  test('Check if function includes works with |fromIndex| more () than collection length', () => {
    expect(array.includes(str, 'b', -15)).toBeFalsy();
  });
  test('Check if function includes works with no value argument provided (collection is array)', () => {
    expect(array.includes(arr)).toBeFalsy();
  });
  test('Check if function includes works with no predicate argument provided (collection is object)', () => {
    expect(array.includes(obj)).toBeFalsy();
  });
  test('Check if function includes works with no predicate argument provided (collection is string)', () => {
    expect(array.includes(str)).toBeFalsy();
  });
  test('Check if function includes works in base case scenario (collection is array, truthy)', () => {
    expect(array.includes(arr, 1)).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is object, truthy)', () => {
    expect(array.includes(obj, 2)).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is string, truthy)', () => {
    expect(array.includes(str, 'a')).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is array, falsey)', () => {
    expect(array.includes(arr, 10)).toBeFalsy();
  });
  test('Check if function includes works in base case scenario (collection is object, falsey)', () => {
    expect(array.includes(obj, 5)).toBeFalsy();
  });
  test('Check if function includes works in base case scenario (collection is string, falsey)', () => {
    expect(array.includes(str, 'd')).toBeFalsy();
  });
  test('Check if function includes works in base case scenario (collection is array, truthy, from index !=0)', () => {
    expect(array.includes(arr, 3, 1)).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is object, truthy, from index !=0)', () => {
    expect(array.includes(obj, 2, 1)).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is string, falsey, from index !=0)', () => {
    expect(array.includes(str, 'a', 2)).toBeFalsy();
  });
  test('Check if function includes works in base case scenario (collection is array, truthy, fromIndex <0)', () => {
    expect(array.includes(arr, 5, -4)).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is object, truthy, fromIndex <0)', () => {
    expect(array.includes(obj, 2, -2)).toBeTruthy();
  });
  test('Check if function includes works in base case scenario (collection is string, falsey, fromIndex <0)', () => {
    expect(array.includes(str, 'a', -2)).toBeFalsy();
  });
});

describe('Array.map', () => {
  test('Return if map function exist', () => {
    expect(array.map).toBeDefined();
  });
  function square(n) {
    return n * n;
  }
  const users = [{ user: 'barney' }, { user: 'fred' }];
  test('Check if function map works for empty collections (array)', () => {
    expect(array.map([], square)).toEqual([]);
  });
  test('Check if function map works for empty collections (object)', () => {
    expect(array.map({}, square)).toEqual([]);
  });
  test('Check if function map works with no func argument provided (collection is array)', () => {
    expect(array.map([4, 8])).toEqual([]);
  });
  test('Check if function map works with no predicate argument provided (collection is object)', () => {
    expect(array.map(users)).toEqual([]);
  });
  test('Check if function map works in base case scenario (collection is array, func is function)', () => {
    expect(array.map([4, 8], square)).toEqual([16, 64]);
  });
  test('Check if function map works in base case scenario (collection is object, func is function)', () => {
    expect(array.map({ a: 4, b: 8 }, square)).toEqual([16, 64]);
  });
  test('Check if function map works in base case scenario (collection is array, func is property)', () => {
    expect(array.map(users, 'user')).toEqual(['barney', 'fred']);
  });
  test('Check if function map works in scenario: collection is array, func is property not available in object', () => {
    expect(array.map(users, 'type')).toEqual([]);
  });
  test('Check if function map works in scenario: collection is array, func is property not available in array', () => {
    expect(array.map([4, 8], 'user')).toEqual([]);
  });
});

describe('Array.zip', () => {
  test('Return if zip function exist', () => {
    expect(array.zip).toBeDefined();
  });
  test('Check if function zip works for empty arrays', () => {
    expect(array.zip([])).toEqual([]);
  });
  test('Check if function zip works in base case scenario', () => {
    expect(array.zip(['a', 'b'], [1, 2], [true, false])).toEqual([['a', 1, true], ['b', 2, false]]);
  });
  test('Check if function zip works in case of different length of arrays passed', () => {
    expect(array.zip(['a', 'b'], [1, 2, 3], [true, false])).toEqual([['a', 1, true], ['b', 2, false], [undefined, 3, undefined]]);
  });
  test('Check if function zip works in case of 1 array passed', () => {
    expect(array.zip(['a', 'b', 'c'])).toEqual([['a'], ['b'], ['c']]);
  });
  test('Check if function zip works in case no arguments passed', () => {
    expect(array.zip()).toEqual([]);
  });
  test('Check if function zip works in case type of all arguments passed are not arrays', () => {
    expect(array.zip('a', 'b')).toEqual([]);
  });
  test('Check if function zip works in case type of (some) arguments passed are not arrays', () => {
    expect(array.zip([1, 2], 'a', 1)).toEqual([[1], [2]]);
  });
});
