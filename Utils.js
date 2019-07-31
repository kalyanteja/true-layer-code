module.exports.extractNumber = (str) => {
    return str
        ? str.replace(/[^0-9]/g, '')
        : "";
}

module.exports.limitTo256Chars = (str) => {
    return str ? str.slice(0, 256) : '';
}

module.exports.isValidUri = (uri) => {
    try {
      new URL(uri);
      return true;
    } catch (err) {
      return false;  
    }
}