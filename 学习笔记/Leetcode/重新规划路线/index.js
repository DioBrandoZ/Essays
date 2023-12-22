var minReorder = function(n, connections) {
  const e = new Array(n).fill(0).map(() => new Array());
  for (const edge of connections) {
      e[edge[0]].push([edge[1], 1]);
      e[edge[1]].push([edge[0], 0]);
  }

  const dfs = function(x, parent) {
      let res = 0;
      for (const edge of e[x]) {
          if (edge[0] == parent) {
              continue;
          }
          res += edge[1] + dfs(edge[0], x);
      }
      return res;
  }
  return dfs(0, -1, e);
};
