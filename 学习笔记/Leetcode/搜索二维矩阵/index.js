/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length
  const n = matrix[0].length
  for (let i = 0; i < m; i++) {
    // 该行第一个数比targe大，直接return false
    if (matrix[i][0] > target) return false
    // 该行最后一个数比targe小，查找下一行
    if (matrix[i][n -1] < target) continue;
    return matrix[i].includes(target)
  }
  return false
};
