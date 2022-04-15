new 申请内存, 创建对象,当调用new时，后台会隐式执行new Object()创建对象。所以，通过new创建的字符串、数字是引用类型，而是非值类型。 

const zzq = new Person('zzq')
1，创建了一个对象
2，将对象的 __proto__指向 Person 的 prototype
3，让F的this指向对象，执行Preson函数体
4，判断函数的返回，如果是基本类型（string\number\boolean\undefined\null），则返回this（js中函数无返回等于返回 undefined）; 如果是引用类型，则返回返回值
```js
const mynew = function () {
  //创建一个新的对象
  const newObj = {}
  //弹出函数的第一个参数：构造函数,剩下参数就是构造函数需要的参数
  const constructor = [].shift.call(arguments)
  const res = constructor.apply(newObj, arguments)
  newObj.__proto__ = constructor.prototype
  return typeof res === 'object' ? res : newObj // 应该是判断是否为引用类型，而不是object，因为null的typeof也是object
}
```
