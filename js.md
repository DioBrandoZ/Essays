- bind call apply区别
  - 三者都可以改变函数的this对象指向。
  - 三者第一个参数都是this要指向的对象，如果如果没有这个参数或参数为undefined或null，则默认指向全局window。
  - 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入。
  - bind 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数便于稍后调用； apply, call则是立即调用

String.fromCharCode(65) => A
'A'.charCodeAt(0) => 65