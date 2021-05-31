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
  // Use pairs(), you may use Array.prototype.map()
  // Avoid for/while loops here
  function keyValueString(keyAndValue) {
    let key = keyAndValue[0];
    //console.log('key= ', key);
    let value = keyAndValue[1];
    let encodedValue = encodeURIComponent(value);
    let encodedKey = encodeURIComponent(key);

    if (Array.isArray(value)) {
      let urlParams = value
        .filter(
          el =>
            el !== null &&
            !(isNaN(el) && typeof el == 'number') &&
            el !== undefined
        )
        .map(encodedValue => key + '=' + encodedValue)
        .join('&');
      return urlParams;
    }
    //console.log(`${decodeKey}=${decodeValue}`);
    return `${encodedKey}=${encodedValue}`;
  }

  let urlParams = Object.entries(obj)
    .filter(([key, value]) => value !== null && !(isNaN(Number(value)) && typeof value == 'number') && value !== undefined)
    .map(keyValueString)
    .join('&');
  //console.log(urlParams);
  return urlParams;
}

export function parseParams(str) {
  //console.log(str);
  function splitPaar(keyValuePair) {
    //console.log("2",keyValuePair)
    let splitkeyValuePairsArr = keyValuePair.split('=');
    //console.log('split[]:', splitkeyValuePairsArr);
    let decodeUri = splitkeyValuePairsArr.map(decodeURIComponent);
    //console.log("Test: ", decodeUri)
    return decodeUri;
  }

  //1. Split(str) in paairs of keys and values
  let keyValuePairs = str.split('&');
  //console.log('keyValue: ', keyValuePairs);
  let keyValuePairSplit = keyValuePairs.map(splitPaar);
  console.log('1: ', keyValuePairSplit);

  let obj = Object.fromEntries(keyValuePairSplit);
  console.log('final: ', obj);
  return obj;
}
