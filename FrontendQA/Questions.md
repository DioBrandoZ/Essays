```js
new Promise((res, rej) => {
  rej('err')
}).then(() => {
  console.log('1')
}, () => {
  console.log('2')
}).then(() => {
  console.log('3')
}, () => {
  console.log('4')
})

// 事件队列
const fn1 = () => new Promise((res) => {
  console.log(0)
  setTimeout(() => {
    console.log(1)
    res()
  })
})

const fn2 = async () => {
  await fn1()
  console.log(2)
}

console.log(3)

setTimeout(() => {
  console.log(4)
})

new Promise((res) => {
  console.log(5)
  res()
  console.log(6)
}).then(() => {
  fn2()
  console.log(7)
}).then(() => {
  console.log(8)
})

356078412


// 封装请求函数timeout 
/**
 * 输入请求和最长等待时间 返回 超过请求时间未响应则返回 timeout，否则返回请求结果
 * @param {Promise} request
 * @param {number} time
 */
const fn = (request, time) => {

}

// 追击问题
/**
 * 输入当前时间，返回时针和分针下次相遇需要的时间
 * @param {string} time '15:00'
 * @param {number} 
 */
const fn = (time) => {
  
}

```

实习学到的东西，遇到的问题，解决方式
技术上的高光时刻

