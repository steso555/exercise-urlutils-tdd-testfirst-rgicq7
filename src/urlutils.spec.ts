import { pairs, params, parseParams } from './urlutils';

describe('urlutils', () => {
  describe('pairs', () => {
    
    it('should return the object keys as pair arrays', () => {
      expect(pairs({ foo: 'bar' })).toEqual(
        [['foo', 'bar']]
        );
    });

    it('should return the object with more than one key as pair arrays', () => {
      expect(pairs({ name: 'Alex', age: 35 })).toEqual(
        [['name', 'Alex'], ['age', 35]]
        );
    });

    it('bad input values produce sensible results', () => {
      expect(pairs({ name: '', age: 35 })).toEqual([['name', ''], ['age', 35]]);
    });
  });

  describe('params', () => {
    it('should return url params string from input object', () => {
      expect(params({ foo: 42, bar: 82, loop: '' })).toEqual(
        'foo=42&bar=82&loop='
      );
    });

    it('should handled bad input values (NaN, undefined)', () => {
      expect(params({ foo: NaN, bar: 82, loop: undefined })).toEqual('bar=82');
    });

    it('should handled empty values', () => {
      expect(params({})).toEqual('');
    });

    it('should handled correctly different types', () => {
      expect(params({ foo: ['x', 'y'] })).toEqual('foo=x&foo=y');
    });

    it('should handled bad input values (null)', () => {
      expect(params({ foo: [null, 'y'] })).toEqual('foo=y');
    });

    it('should handled bad input values (null, NaN)', () => {
      expect(params({ foo: [null, NaN] })).toEqual('');
    });
  });

  describe('parseParams', () => {

    it('should return object of parameters from the passed query string', () => {
      expect(parseParams('foo=42&baz=66&baz=54&maz=')).toEqual(
        { foo: '42', baz: ['66', '54'], maz: '' }
        );
    });

    it('should return object with array of all repeated keys', () => {
      expect(parseParams('baz=47&baz=94&baz=108')).toEqual(
        { baz: ['47', '94', '108'] }
        );
    });

    it('should return object of parameters from the passed EncodeURI query string', () => {
      expect(parseParams('b%3Dr=B%C3%A4r')).toEqual(
        { 'b=r': 'Bär' }
        );
    });
  });
});
