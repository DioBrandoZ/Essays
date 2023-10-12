/**
 * @param {number[]} nums
 * @return {number}
 */
var findTheArrayConcVal = function(nums) {
  const fn = () => {
    if (nums.length === 1) return nums.pop();
    let l = nums.shift();
    let r = nums.pop();
    return +`${l}${r}`
  }

  if (!nums.length) return 0

  let ret = 0
  while(nums.length) {
    ret += fn()
  }

  return ret
};