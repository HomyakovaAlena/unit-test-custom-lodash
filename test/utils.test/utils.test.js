const utils = require('../../src/utils/utils');

describe('utils.inObject', () => {
  test('Return if inObject function exist', () => {
    expect(utils.inObject).toBeDefined();
  });

  const obj = { user: 'barney', active: false };
  const key = 'user';
  const value = 'barney';

  test('Returns base case scenario check if pair (key, value) in object', () => {
    expect(utils.inObject(obj, key, value)).toBeTruthy();
  });
  test('Returns base case scenario check if pair (key, value) NOT in object', () => {
    expect(utils.inObject(obj, key, 'smith')).toBeFalsy();
  });
  test('Returns edge case check if pair (key, value) in empty object', () => {
    expect(utils.inObject({}, key, value)).toBeFalsy();
  });
  test('Returns edge case check if pair (key, value) in object and value not provided', () => {
    expect(utils.inObject({}, key)).toBeFalsy();
  });
  test('Returns edge case check if pair (key, value) in object and key not provided', () => {
    expect(utils.inObject({}, undefined, value)).toBeFalsy();
  });
});

describe('utils.isObject', () => {
  test('Return if isObject function exist', () => {
    expect(utils.isObject).toBeDefined();
  });

  const obj = { user: 'barney', active: false };
  const map = new Map();
  const set = new Set();
  const arr = [1, 2, 3];

  test('Returns if function works for object', () => {
    expect(utils.isObject(obj)).toBeTruthy();
  });
  test('Returns if function works for non-object (number case)', () => {
    expect(utils.isObject(2)).toBeFalsy();
  });
  test('Returns if function works for non-object (string case)', () => {
    expect(utils.isObject('1')).toBeFalsy();
  });
  test('Returns if function works for non-object (array case)', () => {
    expect(utils.isObject(arr)).toBeFalsy();
  });
  test('Returns if function works for non-object (map case)', () => {
    expect(utils.isObject(map)).toBeFalsy();
  });
  test('Returns if function works for non-object (set case)', () => {
    expect(utils.isObject(set)).toBeFalsy();
  });
  test('Returns if function works when no arguments provided', () => {
    expect(utils.isObject()).toBeFalsy();
  });
});

describe('utils.isEmptyObject', () => {
  test('Return if isEmptyObject function exist', () => {
    expect(utils.isEmptyObject).toBeDefined();
  });

  const obj = { user: 'barney', active: false };
  const obj2 = { user: 'barney' };
  const map = new Map();

  test('Returns if function works for empty object', () => {
    expect(utils.isEmptyObject({})).toBeTruthy();
  });
  test('Returns if function works for non-empty object (2 keys)', () => {
    expect(utils.isEmptyObject(obj)).toBeFalsy();
  });
  test('Returns if function works for non-empty object (1 key)', () => {
    expect(utils.isEmptyObject(obj2)).toBeFalsy();
  });
  test('Returns if function works for non-objects', () => {
    expect(utils.isEmptyObject(map)).toBeFalsy();
  });
});

describe('utils.isInvalidPredicateArray', () => {
  test('Return if isInvalidPredicateArray function exist', () => {
    expect(utils.isInvalidPredicateArray).toBeDefined();
  });

  const arr1 = ['user', 'barney'];
  const arr2 = ['user', 'barney', 'sam'];
  const arr3 = [];

  test('Returns if function works for empty array', () => {
    expect(utils.isInvalidPredicateArray(arr3)).toBeTruthy();
  });
  test('Returns if function works for valid arrays', () => {
    expect(utils.isInvalidPredicateArray(arr1)).toBeFalsy();
  });
  test('Returns if function works for arrays with greater length', () => {
    expect(utils.isInvalidPredicateArray(arr2)).toBeTruthy();
  });
});
