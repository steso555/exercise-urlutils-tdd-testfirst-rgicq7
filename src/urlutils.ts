export function pairs(object) {
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
      let urlParams = value
        .filter(value => !isFalsy(value))
        .map(encodedValue => key + '=' + encodedValue)
        .join('&');

      return urlParams;
    }

    return `${encodedKey}=${encodedValue}`;
  }

  function isFalsy(value) {
    return (
      value === null ||
      (isNaN(value) && typeof value === 'number') ||
      value === undefined
    );
  }

  let urlParams = Object.entries(obj)
    .filter(([key_, value]) => !isFalsy(value))
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

  let keyValuePairs = str.split('&');
  let keyValuePairSplit = keyValuePairs.map(splitPaar);
  
  const reducer = (obj, paar) => {
    const [key, value] = paar;
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
    return obj;
  }
  return keyValuePairSplit.reduce(reducer, {});
}