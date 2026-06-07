function getMinMax(str) {
  let arr = str.split(' ');
  let numbers = arr.filter(item => !isNaN(parseFloat(item)) && isFinite(item)).map(Number);
  let min = Math.min(...numbers);
  let max = Math.max(...numbers);
  let result = {min, max};
  return result;
}
