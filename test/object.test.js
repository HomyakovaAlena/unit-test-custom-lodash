const object = require('../src/object');

describe('Object.merge', () => {
  test('Return if merge function exist', () => {
    expect(object.merge).toBeDefined();
  });
  test('Check if function merge works for empty objects', () => {
    expect(object.merge({}, {})).toEqual({});
  });
  test('Check if function merge works when no sources parametres provided', () => {
    expect(object.merge({})).toEqual({});
  });
  const obj = {
    a: [{ b: 2 }, { d: 4 }],
  };
  const copyObj = {
    a: [{ b: 2 }, { d: 4 }],
  };
  const other = {
    a: [{ c: 3 }, { e: 5 }],
  };
  const oneMore = {
    b: [{ f: 7 }, { g: 8 }],
  };
  test('Check if function merge works in base case scenario', () => {
    expect(object.merge(obj, other)).toEqual({
      a: [
        { b: 2, c: 3 },
        { d: 4, e: 5 },
      ],
    });
  });
  test('Check if function merge mutates initial object', () => {
    expect(obj).not.toEqual(copyObj);
  });
  test('Check if function merge works in case several sources passed', () => {
    expect(
      object.merge(
        {
          a: [{ b: 2 }, { d: 4 }],
        },
        other,
        oneMore,
      ),
    ).toEqual({
      a: [
        { b: 2, c: 3 },
        { d: 4, e: 5 },
      ],
      b: [{ f: 7 }, { g: 8 }],
    });
  });
});

describe('Object.omit', () => {
  test('Return if omit function exist', () => {
    expect(object.omit).toBeDefined();
  });
  test('Check if function omit works for empty objects', () => {
    expect(object.omit({}, 'a')).toEqual({});
  });
  test('Check if function omit works when no pathes parameteres provided', () => {
    expect(object.omit({ a: 2 })).toEqual({ a: 2 });
  });
  const obj = { a: 1, b: '2', c: 3 };
  test('Check if function omit works in base case scenario (path is string)', () => {
    expect(object.omit(obj, 'a')).toEqual({ b: '2', c: 3 });
  });
  test('Check if function omit works in base case scenario (path is several strings)', () => {
    expect(object.omit(obj, 'a', 'b')).toEqual({ c: 3 });
  });
  test('Check if function omit works in base case scenario (path is array of strings)', () => {
    expect(object.omit(obj, ['a', 'c'])).toEqual({ b: '2' });
  });
});

describe('Object.omitBy', () => {
  test('Return if omitBy function exist', () => {
    expect(object.omitBy).toBeDefined();
  });
  const isNumber = (x) => typeof x === 'number';
  const isString = (x) => typeof x === 'string';
  test('Check if function omitBy works for empty objects', () => {
    expect(object.omitBy({}, isNumber)).toEqual({});
  });
  test('Check if function omitBy works when no func argument provided', () => {
    expect(object.omitBy({ a: 2 })).toEqual({ a: 2 });
  });
  const obj = { a: 1, b: '2', c: 3 };
  test('Check if function omitBy works in base case scenario', () => {
    expect(object.omitBy(obj, isNumber)).toEqual({ b: '2' });
  });
  test('Check if function omitBy works in base case scenario (opposite function)', () => {
    expect(object.omitBy(obj, isString)).toEqual({ a: 1, c: 3 });
  });
});

describe('Object.pick', () => {
  test('Return if pick function exist', () => {
    expect(object.pick).toBeDefined();
  });
  test('Check if function pick works for empty objects', () => {
    expect(object.pick({}, 'a')).toEqual({});
  });
  test('Check if function pick works when no pathes parameteres provided', () => {
    expect(object.pick({ a: 2 })).toEqual({});
  });
  const obj = { a: 1, b: '2', c: 3 };
  test('Check if function pick works in base case scenario (path is string)', () => {
    expect(object.pick(obj, 'a')).toEqual({ a: 1 });
  });
  test('Check if function pick works in base case scenario (path is several strings)', () => {
    expect(object.pick(obj, 'a', 'b')).toEqual({ a: 1, b: '2' });
  });
  test('Check if function pick works in base case scenario (path is array of strings)', () => {
    expect(object.pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });
});

describe('Object.pickBy', () => {
  test('Return if pickBy function exist', () => {
    expect(object.pickBy).toBeDefined();
  });
  const isNumber = (x) => typeof x === 'number';
  const isString = (x) => typeof x === 'string';
  test('Check if function pickBy works for empty objects', () => {
    expect(object.pickBy({}, isNumber)).toEqual({});
  });
  test('Check if function pickBy works when no func argument provided', () => {
    expect(object.pickBy({ a: 2 })).toEqual({});
  });
  const obj = { a: 1, b: '2', c: 3 };
  test('Check if function pickBy works in base case scenario', () => {
    expect(object.pickBy(obj, isNumber)).toEqual({ a: 1, c: 3 });
  });
  test('Check if function pickBy works in base case scenario (opposite function)', () => {
    expect(object.pickBy(obj, isString)).toEqual({ b: '2' });
  });
});

describe('Object.toPairs', () => {
  test('Return if toPairs function exist', () => {
    expect(object.toPairs).toBeDefined();
  });
  function Foo() {
    this.a = 1;
    this.b = 2;
  }
  Foo[2] = 'a';
  Foo.prototype.c = 3;
  const map = new Map();
  map.set('1', 'str1')
    .set('a', 'num1')
    .set(true, 'bool1');
  const set = new Set(['апельсин', 'яблоко', 'банан']);
  function Bar() {}
  Bar[2] = 'a';
  Bar.prototype.c = 3;
  test('Check if function toPairs works for empty objects', () => {
    expect(object.toPairs({})).toEqual([]);
  });
  test('Check if function toPairs works for objects with no own enumerable string properties', () => {
    expect(object.toPairs(new Bar())).toEqual([]);
  });
  test('Check if function toPairs works in base case scenario', () => {
    expect(object.toPairs(new Foo())).toEqual([['a', 1], ['b', 2]]);
  });
  test('Check if function toPairs works with Maps', () => {
    expect(object.toPairs(map)).toEqual([map.entries()]);
  });
  test('Check if function toPairs works with Sets', () => {
    expect(object.toPairs(set)).toEqual([set.entries()]);
  });
});
