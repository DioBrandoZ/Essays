/**
 * @param {number} length
 * @param {number} width
 * @param {number} height
 * @param {number} mass
 * @return {string}
 */
var categorizeBox = function(length, width, height, mass) {
  const volume = length * width * height
  const isBulky = [length, width, height].some(i => i > 104) || volume > 109


};
