/**
 * @param {number} n
 * @return {number}
*/
var binaryGap = function(n) {
  const str = n.toString(2)
  
  // 少于两个1，返回0
  if (str.split('').filter(c => c === '1').length < 2) return 0
  let ret = 0
  let prevIndex = str.indexOf('1')

  for (let i = prevIndex + 1; i < str.length; i++) {
    if (str[i] === '1') {
      ret = Math.max(i - prevIndex, ret)
      prevIndex = i
    }
  }

  return ret
};