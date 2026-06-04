function camelize(str) {
  let splitedStr = str.split('-');
  let result = splitedStr.map((firstStr, index) => {
    if (index === 0) {
      return firstStr;
    }
    // return `${firstStr[0].toUpperCase()}${firstStr.slice(1)}`;
    return firstStr[0].toUpperCase() + firstStr.slice(1);
  });
  return result.join('');
}
