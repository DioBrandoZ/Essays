// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
// 示例 1：
// 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
// 输出：[1,2,3,6,9,8,7,4,5]

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  let ret = [];

  const rotate = (m) => {
    const row = m.length;
    const col = m[0].length;
    const ret = new Array(col).fill(0).map(() => new Array(row).fill(0));
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        ret [i][j] = m[j][col - i - 1];
      }
    }
    return ret;
  }

  let m = matrix;

  while (m.length > 1) {
    ret = [...ret, ...m[0]];
    m = rotate(m.slice(1));
  }

  return [...ret, ...m[0]];
};

