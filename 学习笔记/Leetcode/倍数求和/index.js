/**
 * @param {number} n
 * @return {number}
 */
var sumOfMultiples = function(n) {
  let ret = 0
  const nums = [3, 5, 7]
  for (let i = 1; i <= n; i++) {
    if (nums.some(num => i % num === 0)) {
      ret += i
    }
  }
  return ret
};