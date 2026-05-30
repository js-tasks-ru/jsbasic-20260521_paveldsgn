function ucFirst(str) {
  if (!str) return str;
  let fisrtStr = str[0].toUpperCase();
  let slicedStr = str.slice(1);
  return `${fisrtStr}${slicedStr}`;
}
