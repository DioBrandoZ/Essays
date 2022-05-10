const twoSum = (arr, target) => {
  for(let i = 0; i < arr.length; i++) {
    const num = target - arr[i]
    const idx = arr.slice(i+1).indexOf(num)
    if (idx !== -1) return [i, idx + i + 1]
  }
}

const twoSumMap = (arr, target) => {
  const arrMap = new Map()

  for(let i = 0; i < arr.length; i++) {
    const num = target - arr[i]
    if (arrMap.has(num)) return [arrMap.get(num), i]
    arrMap.set(arr[i], i)
  }
}