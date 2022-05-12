const getNum = (arr, target, ret) => {
  const m = arr.length
  const n = arr[0].length

  if (target % 2 === 0) {
    for (let i = m - 1; i >= 0; i--) {
      if (target - i >= 0 && target - i < n) ret.push(arr[i][target - i])
    }
  } else {
    for (let i = 0; i < m; i++) {
      if (target - i >= 0 && target - i < n) ret.push(arr[i][target - i])
    }
  }
}

/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function(mat) {
  const m = mat.length
  const n = mat[0].length
  const ret = []

  for (let i = 0; i < m + n - 1; i++) {
    getNum(mat, i, ret)
  }

  return ret
};