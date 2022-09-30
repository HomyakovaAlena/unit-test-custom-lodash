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
