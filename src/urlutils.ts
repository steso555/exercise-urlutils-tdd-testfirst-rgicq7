export function pairs(object) {
  // Return array of arrays of key and value pairs
  // { "fookey": "foovalue", ... } => [["fookey", "foovalue"], ...]
  var arr = [];
  for (var key in object) {
    arr.push([key, object[key]]);
  }

  return arr;
}
export function params(obj) {
  // Return url params string from input object
  // { "foo": 42, "bar": 82 } => "foo=42&bar=82"
  // { 'foo':['x','y'] } => "foo=x&foo=y"

  function keyValueString(keyAndValue) {
    let key = keyAndValue[0];
    console.log('key= ', key);
    let value = keyAndValue[1];
    let encodedValue = encodeURIComponent(value);
    let encodedKey = encodeURIComponent(key);

    if (Array.isArray(value)) {
      let urlParams = value
      .filter(el => el !== null  &&  !(isNaN(el) && typeof el == 'number') && el !== undefined)
        .map(encodedValue => key + '=' + encodedValue)
        .join('&');
      //console.log(urlParams);

      return urlParams;
    }
    //console.log(`${encodedKey}=${encodedValue}`);
    return `${encodedKey}=${encodedValue}`;
  }

  let urlParams = Object.entries(obj)
    .filter(keyAndValue => keyAndValue[1] !== null  &&  !(isNaN(keyAndValue[1]) && typeof keyAndValue[1] == 'number') && keyAndValue[1] !== undefined)
    .map(keyValueString)
    .join('&');
  //console.log(urlParams);
  return urlParams;
}

// Use pairs(), you may use Array.prototype.map()
// Avoid for/while loops here
