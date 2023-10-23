/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
/**
    思路：就是将版本号按照'.'进行分割，然后依次比较数组里的每个值
    eg：1.0.1 ==> ['1','0','1']
 */
var compareVersion = function(version1, version2) {
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')

  while(arr1.length && arr2.length){
    const n1 = Number(arr1.shift())
    const n2 = Number(arr2.shift())

    if(n1 < n2) return -1
    if(n1 > n2) return 1
  }
  if(arr1.length){
    // arr2 数组已经为空
    return arr1.every(item => Number(item) == 0) ? 0 : 1
  }
  if(arr2.length){
    return arr2.every(item => Number(item) == 0) ? 0 : -1
  }
  return 0
};