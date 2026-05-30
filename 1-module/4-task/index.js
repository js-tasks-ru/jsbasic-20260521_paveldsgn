function checkSpam(str) {
  let lowerString = str.toLowerCase();
  if (lowerString.includes('1xbet') || lowerString.includes('xxx')) {
    return true;
  } else {
    return false;
  }
}
