import { pairs, params } from './urlutils';

describe('urlutils', () => {
  describe('pairs', () => {
    it('should return the object keys as pair arrays', () => {
      // Expect the result of pairs() to be equal to a value
      expect(pairs({ foo: "bar" })).toEqual([["foo", "bar"]]);
    });
    // More than a key
    it('should return the object with more than one key as pair arrays', ()=>{
      expect(pairs({name: "Alex", age: 35})).toEqual([["name","Alex"],["age",35]])
    });
    // Write more sensible tests.
    // For example, ensure bad input values produce sensible
    // results.
    it('bad input values produce sensible results', ()=>{
      expect(pairs({name: "", age: 35})).toEqual([["name",""],["age",35]])
    });
  });

  describe('params', () => {
    // Write sensible tests.
    it('should return url params string from input object', () => {
      // { "foo": 42, "bar": 82 } => "foo=42&bar=82"
      expect(params({ "foo": 42, "bar": 82, "loop": "" })).toEqual("foo=42&bar=82&loop=")
    });
    it('should handled bad input values (NaN)', () => {
      // { "foo": NaN, "bar": 82, "loop": undefined } => "bar=82"
      expect(params({ "foo": NaN, "bar": 82, "loop": undefined })).toEqual("bar=82")
    });
    it('should handled empty values', () => {
      // { } => ""
      expect(params({ })).toEqual("")
    });
    // Ensure the values are URL encoded and different types
    // are handled correctly
    it('should handled correctly different types', () => {
      // { 'foo':['x','y'] } => "foo=x&foo=y"
      expect(params({'foo':['x','y']})).toEqual("foo=x&foo=y")
    });
    
    it('should handled bad input values (null)', () => {
      // { 'foo':[null,'y'] } => "foo=y"
      expect(params({'foo':[null,'y']})).toEqual("foo=y")
    });

    it('should handled bad input values (null, NaN)', () => {
      // { 'foo':[null,NaN] } => ""
      expect(params({'foo':[null,NaN]})).toEqual("")
    });

    // Return object of parameters from the passed query string
    // IN: "foo=42&b%2Cr=B%C3%A4r&baz=47&baz=94&maz="
    // OUT: { "foo": "42", "b,r": "Bär", baz: ["47", "94"], maz: "" }
    // URL-decode keys and values
    it('should return object of parameters from the passed query string', () => {
      // "foo=42&b%2Cr=B%C3%A4r&baz=47&baz=94&maz=" => { "foo": "42", "b,r": "Bär", baz: ["47", "94"], maz: "" }
      expect(params("foo=42&b%2Cr=B%C3%A4r&baz=47&baz=94&maz=")).toEqual('"foo": "42", "b,r": "Bär", baz: ["47", "94"], maz: ""')
    });

  });

});