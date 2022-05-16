// 给一个 random7 函数，它可以随机返回【1-7】，据此实现一个random10函数
const random10 = () => {
  const num = random7() + random7() // [2, 14]
  return Math.round(((num - 1) / 13) * 10)
}

var rand10 = function() {
    var row, col, idx;
    do {
        row = rand7();
        col = rand7();
        idx = col + (row - 1) * 7;
    } while (idx > 40);
    return 1 + (idx - 1) % 10;
};