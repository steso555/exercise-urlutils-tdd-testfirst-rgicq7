import { pairs, params } from './urlutils';

describe('urlutils', () => {
  describe('pairs', () => {
    it('should return the object keys as pair arrays', () => {
      // Expect the result of pairs() to be equal to a value
      expect(pairs({ foo: "bar" })).toEqual([["foo", "bar"]]);
    });
    // mehr als ein key
    it('should return the object with more than one key as pair arrays', ()=>{
      expect(pairs({name: "Alex", age: 35})).toEqual([["name","Alex"],["age",35]])
    });
    // Write more sensible tests.
    // For example, ensure bad input values produce sensible
    // results.
  });



  describe('params', () => {
    // Write sensible tests.
    it('should return url params string from input object', () => {
      // { "foo": 42, "bar": 82 } => "foo=42&bar=82"
      expect(params({ "foo": 42, "bar": 82 })).toEqual("foo=42&bar=82")
    });
    // Ensure the values are URL encoded and different types
    // are handled correctly (property "foo" with the array
    // value ["x", "y"] may result in "foo=x&foo=y").
    it('should handled correctly different types', () => {
      // { 'foo':['x','y'] } => "foo=x&foo=y"
      // { 'foo':[NaN,'y'] } => "foo=x&foo=y"
      expect(params({'foo':['x','y']})).toEqual("foo=x&foo=y")
    });
    
    it('should handled bad input values', () => {
      // { 'foo':[NaN,'y'] } => "foo=y"
      expect(params({'foo':[null,'y']})).toEqual("foo=y")
    });
  });

});