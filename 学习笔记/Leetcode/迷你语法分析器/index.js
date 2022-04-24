/**
 * @param {string} s
 * @return {NestedInteger}
 * 输入：s = "[123,[456,[789]]]",
 * 输出：[123,[456,[789]]]
*/
var deserialize = function(s) {
  if (s[0] !== '[') return Number(s)
  const ret = []
  const stack = ['[']
  let curNum = ''

  const pushArr = (arr, deep) => {
    if (deep === 1) {
      arr.push([])
      curNum = ''
      return
    }
    pushArr(arr[arr.length - 1], deep - 1)
  }

  const pushNum = (arr, deep) => {
    if (!curNum) return
    if (deep === 1) {
      arr.push(Number(curNum))
      curNum = ''
      return
    }
    pushNum(arr[arr.length - 1], deep - 1)
  }

  s.split('').forEach((c, i) => {
    // 第一个[已经初始化了
    if (i === 0) return
    if (c === '[') {
      pushArr(ret, stack.length)
      return stack.push(c)
    }
    if (c === ']') {
      pushNum(ret, stack.length)
      return stack.pop()
    }
    if (c === ',') {
      return pushNum(ret, stack.length)
    }
    curNum = curNum + c
  })

  return ret
};