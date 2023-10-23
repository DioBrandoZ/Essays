/**
 * @param {string[]} details
 * @return {number}
 */
var countSeniors = function(details) {
  const arr = details.map(str => +str.slice(11, 13))
  return arr.filter(num => num > 60).length
};
