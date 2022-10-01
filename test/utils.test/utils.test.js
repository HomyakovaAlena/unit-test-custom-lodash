const utils = require('../../src/utils/utils');

describe('utils.inObject', () => {
  test('Return if inObject function exist', () => {
    expect(utils.inObject).toBeDefined();
  });

  const obj = { user: 'barney', active: false };
  const key = 'user';
  const value = 'barney';

  test('Returns base scenario check if pair (key, value) in object', () => {
    expect(utils.inObject(obj, key, value)).toBeTruthy();
  });
  test('Returns base scenario check if pair (key, value) NOT in object', () => {
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

describe('utils.isEmpty', () => {
  test('Return if isEmpty function exist', () => {
    expect(utils.isEmpty).toBeDefined();
  });

  const obj = { user: 'barney', active: false };

  test('Returns if function works for empty object', () => {
    expect(utils.isEmpty({})).toBeTruthy();
  });
  test('Returns if function works for non-empty object', () => {
    expect(utils.isEmpty(obj)).toBeFalsy();
  });
});
