/*
  思路：以国王为中心，向八个方向发射光线，遇到皇后则停止，否则继续
*/
function queensAttacktheKing(queens: number[][], king: number[]): number[][] {
  const result: number[][] = [];
  const queensMap: Map<string, boolean> = new Map();
  for (const queen of queens) {
    queensMap.set(queen.toString(), true);
  }
  const directions: number[][] = [
    [0, 1], [0, -1], [1, 0], [-1, 0],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  for (const direction of directions) {
    let [x, y] = king;
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      x += direction[0];
      y += direction[1];
      if (queensMap.has([x, y].toString())) {
        result.push([x, y]);
        break;
      }
    }
  }
  return result;
};