// 在一个公司里有 N 名员工。这其中有些人有合作关系，有些则没有。他们的合作关系具有传递性。如果已知 A 和 B 有过合作，B 和 C 也有过合作，那么我们可以认为 A 和 C 也有间接的合作关系。所谓的合作圈，就是所有间接或直接合作过的员工集合。

// 输入格式:
// 给定一个 N * N 的矩阵 M（程序实际接收的输入是字符串，参见下面的输入样例），表示公司中员工之间的合作关系。如果 M[i][j] = 1，表示已知第 i 个和第 j 个员工有过间接或直接的合作，否则为没有合作过。

// 输出格式:
// 你需要输出所有员工中的已知的合作圈总数。

const findCircleNum = (M) => {
  let  circleNum = 0
  const visited = []

  const dfs = (i) => {
    visited.push(i)
    const relatives = M[i]
    for (let idx = 0; idx < relatives.length; idx++) {
      if (relatives[idx] === 1 && !visited.includes(idx)) {
        dfs(idx)
      }
    }
  }

  M.forEach((_, i) => {
    if (!visited.includes(i)) {
      circleNum += 1
      dfs(i)
    }
  });

  return circleNum
}
