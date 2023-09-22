// 给你一个整数 money ，表示你总共有的钱数（单位为美元）和另一个整数 children ，表示你要将钱分配给多少个儿童。

// 你需要按照如下规则分配：

// 所有的钱都必须被分配。
// 每个儿童至少获得 1 美元。
// 没有人获得 4 美元。
// 请你按照上述规则分配金钱，并返回 最多 有多少个儿童获得 恰好 8 美元。如果没有任何分配方案，返回 -1 。

 

// 示例 1：

// 输入：money = 20, children = 3
// 输出：1
// 解释：
// 最多获得 8 美元的儿童数为 1 。一种分配方案为：
// - 给第一个儿童分配 8 美元。
// - 给第二个儿童分配 9 美元。
// - 给第三个儿童分配 3 美元。
// 没有分配方案能让获得 8 美元的儿童数超过 1 。
// 示例 2：

// 输入：money = 16, children = 2
// 输出：2
// 解释：每个儿童都可以获得 8 美元。

// 1 <= money <= 200
// 2 <= children <= 30

/**
 * @param {number} money
 * @param {number} children
 * @return {number}
 */
var distMoney = function(money, children) {
  if (money < children || (money === 4 && children === 1)) return -1
  const arr = new Array(children).fill(1)
  let restMoney = money - children

  // 循环每个小孩
  for (let i = 0; i < children; i++) {
    // 没钱就终止
    if (restMoney === 0) break
    // 有钱且超过七元
    if (restMoney >= 7) {
      // 不是最后一个小孩，给他满上八元
      if (i !== children - 1) {
        arr[i] += 7
        restMoney -= 7
      } else {
        // 最后一个小孩，全给他
        arr[i] += restMoney
        restMoney = 0
      }
    } else if (restMoney === 3) {
      // 刚好剩三元，本人发两元
      arr[i] += 2
      restMoney -= 2
      // 如果本人是最后一个，给第一个人发一元
      if (i === children - 1) {
        arr[0] += 1
        restMoney -= 1
      }
    } else {
      // 剩余的钱小于7元，又不为三元，全给此人
      arr[i] += restMoney
      restMoney = 0
    }
  }

  return arr.reduce((prev, cur) => (cur === 8 ? prev + 1 : prev), 0)
};


// 贪心算法
var distMoney = function(money, children) {
  if (money < children) {
      return -1;
  }
  money -= children
  let cnt = Math.min(Math.floor(money / 7), children);
  money -= cnt * 7;
  children -= cnt;
  if ((children == 0 && money > 0) || (children == 1 && money == 3)) {
      cnt -= 1;
  }
  return cnt;
};
