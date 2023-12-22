/**
 * @param {number[]} runes
 * @return {number}
 */
var runeReserve = function(runes) {
  runes.sort((a, b) => a - b);
  let ret = 1;
  let curSum = 1;

  runes.forEach((rune, i) => {
    if (i === 0) return;
    if (rune - runes[i - 1] <= 1) {
      curSum += 1;
      ret = Math.max(ret, curSum);
    } else {
      curSum = 1;
    }
  })

  return ret;
};

