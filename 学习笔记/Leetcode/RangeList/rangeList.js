/**
  * 暴力解法
*/
class RangeList {
  constructor() {
    // number[]
    this.arr = []

    /**
     * 获取[left, right)的整数数组
     * @param {number} left 
     * @param {number} right 
     * @returns {numer[]}
     */
    this.getRangeArr = (left, right) => {
      return Array.from({ length: right - left }, (_, i) => left + i);
    }
  }

  /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
  */
  add(range) {
    // 获取[left, right)的整数数组，与原有数据合并排序再去重
    const rangeArr = this.getRangeArr(...range)
    const arrTemp = this.arr.concat(rangeArr).sort((a, b) => a - b)
    this.arr = Array.from(new Set(arrTemp))
  }

  /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
  */
  remove(range) {
    // 获取[left, right)的整数数组，将原有数据中与之重复的数据过滤
    const rangeArr = this.getRangeArr(...range)
    this.arr = this.arr.filter(num => !rangeArr.includes(num))
  }

  /**
    * Prints out the list of ranges in the range list
  */
  print() {
    console.log(this.arr.join('、'))
  }
}


/**
  * 合并边界
*/
class RangeList {
  constructor() {
    // range数组
    // number[][]
    this.ranges = []

    /**
      * 获取[left, right)的整数数组
      * @param {number} left 
      * @param {number} right 
      * @returns {numer[]}
    */
    this.getRangeArr = (left, right) => {
      return Array.from({ length: right - left }, (_, i) => left + i);
    }
  }

  /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
  */
  add(range) {
    // 当前ranges为空的话，直接推进range
    if (!this.ranges.length) {
      return this.ranges.push(range)
    }

    const [left, right] = range
    const rangesTemp = []
    let addLeft = left
    let addRight = right

    // 遍历当前存放的所有range
    this.ranges.forEach((r) => {
      const [rLeft, rRight] = r
      
      // 本次add操作不会合并的range，直接push
      if (rRight < left || rLeft > right) {
        return rangesTemp.push(r)
      }

      // 求出会合并成一个的range的左右边界值
      addLeft = Math.min(rLeft, left)
      addRight = Math.max(rRight, right)
    })

    rangesTemp.push([addLeft, addRight])
    
    this.ranges = [...rangesTemp]
  }

  /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
  */
  remove(range) {
    if (!this.ranges.length) {
      return
    }

    const [left, right] = range
    const rangesTemp = []
    let addLeft = Number.MAX_SAFE_INTEGER // 所有可能合并的range的最小值
    let addRight = Number.MIN_SAFE_INTEGER // 所有可能合并的range的最大值

    this.ranges.forEach((r) => {
      const [rLeft, rRight] = r
      // 不可能合并的range，直接push
      if (rRight < left || rLeft > right) {
        return rangesTemp.push(r)
      }

      // 扩展range的左右边界
      addLeft = Math.min(addLeft, rLeft)
      addRight = Math.max(addRight, rRight)
    })

    if (addLeft < left) {
      rangesTemp.push([addLeft, left])
    }

    if (addRight > right) {
      rangesTemp.push([right, addRight])
    }
    
    this.ranges = [...rangesTemp]
  }

  /**
    * Prints out the list of ranges in the range list
  */
  print() {
    const str = this.ranges
      .sort((rangeA, rangeB) => rangeA[0] - rangeB[0]) // 将每个range排序
      .map(range => this.getRangeArr(...range).join('、')) // range内部拼接
      .join('、') // 拼接range

    console.log(str)
  }
}