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
  function keyValueString(keyAndValue) {
    let key = keyAndValue[0];
    let value = keyAndValue[1];
    let encodedValue = encodeURIComponent(value);
    let encodedKey = encodeURIComponent(key);

    if (Array.isArray(value)) {
      let filterArray = el =>
        el !== null &&
        !(isNaN(el) && typeof el == 'number') &&
        el !== undefined;

      let urlParams = value
        .filter(filterArray)
        .map(encodedValue => key + '=' + encodedValue)
        .join('&');

      return urlParams;
    }

    return `${encodedKey}=${encodedValue}`;
  }

  let filterObj = ([key, value]) =>
    value !== null &&
    !(isNaN(value) && typeof value === 'number') &&
    value !== undefined;

  let urlParams = Object.entries(obj)
    .filter(filterObj)
    .map(keyValueString)
    .join('&');

  return urlParams;
}

export function parseParams(str) {
  function splitPaar(keyValuePair) {
    let splitkeyValuePairsArr = keyValuePair.split('=');
    let decodeUri = splitkeyValuePairsArr.map(decodeURIComponent);

    return decodeUri;
  }

  //1. Split(str) in paairs of keys and values
  let obj = {};
  let keyValuePairs = str.split('&');
  let keyValuePairSplit = keyValuePairs.map(splitPaar);

  for (let i = 0; i < keyValuePairSplit.length; i++) {
    const [key, value] = keyValuePairSplit[i];
    if (!obj[key]) {
      obj[key] = value;
    } else {
      let temp = obj[key];
      if (Array.isArray(temp)) {
        temp.push(value);
      } else {
        let arr = [];
        arr.push(temp);
        arr.push(value);
        obj[key] = arr;
      }
    }
  }
  console.log('final: ', obj);

  return obj;
}
