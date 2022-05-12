/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function() {
  const getSum = () => (rand7() - 1) * 7 + rand7() // 1-49
  let sum = getSum()
  while(sum > 40) {
    sum = getSum()
  }
  return Math.ceil(sum / 4)
};