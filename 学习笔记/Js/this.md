# this的指向
哪个对象调用函数，函数里面的 this 指向哪个对象

this的几种模式：

1、方法调用模式下，this 总是指向调用它所在方法的对象，this 的指向与所在方法的调用位置有关，而与方法的声明位置无关（箭头函数特殊）；

2、函数调用下，this 指向 window ,调用方法没有明确对象的时候，this 指向 window，如 setTimeout、匿名函数等；

3、构造函数调用模式下，this 指向被构造的对象；

4、apply,call,bind 调用模式下，this 指向第一个参数；
call、apply、bind是Function.prototype下的方法，
call和apply会立即执行函数，bind不会立即执行函数，而是返回一个新的函数，需要手动调用；
call和apply的区别在于传参的方式不同，call是一个一个传参，apply是传一个数组；
```js
const fn = () => {}
const that = this // 此时this指向window

fn.call(that, 1, 2, 3)
fn.apply(that, [1, 2, 3])
const fn2 = fn.bind(that, 1, 2, 3)
```

5、箭头函数，在声明的时候绑定this，而非取决于调用位置；

6、严格模式下，如果 this 没有被执行环境（execution context）定义，那 this是 为undefined；


[this面试题合集](https://juejin.cn/post/6844904083707396109)
## 例题1
```js
var a = 10; // 创建变量时，将变量绑定在window上
function foo () {
  console.log(this.a) // 模式2，this指向window
}
foo(); // 10

// 等同如下代码
window.a = 10;
function foo() {
  console.log(this.a)
}
window.foo();
```


## 例题2
```js
"use strict";
var a = 10;
function foo () {
  console.log('this1', this) // undefined
  console.log(window.a) // 10
  console.log(this.a) // 报错 Uncaught TypeError: Cannot read property 'a' of undefined
}
console.log(window.foo) // f foo() {...}
console.log('this2', this) // window
foo();

// 模式6，严格模式下，未指定执行环境的函数内的this为undefined
```


## 例题3
```js
let a = 10
const b = 20

function foo () {
  console.log(this.a) // undefined
  console.log(this.b) // undefined
}
foo();
console.log(window.a) // undefined

// let和const的变量不会绑定到window上
```


## 例题4
```js
var a = 1
function foo () {
  var a = 2
  console.log(this) // window
  console.log(this.a) // 1
}

foo()
```


## 例题5
```js
function foo () {
  console.log(this.a)
};
var obj = { a: 1, foo };
var a = 2;
var foo2 = obj.foo;
var obj2 = { a: 3, foo2: obj.foo }

obj.foo(); // 1
foo2(); // 2
obj2.foo2(); // 3
```


## 例题6
```js
function foo () {
  console.log(this.a)
}
function doFoo (fn) {
  console.log(this)
  fn()
}
var obj = { a: 1, foo }
var a = 2
doFoo(obj.foo)

// 将obj.foo当成参数传递到doFoo函数中，obj.foo()函数内的this发生了改变，指向了window
// window
// 2
```


## 例题7
```js
var obj1 = {
  a: 1
}
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a)
  },
  foo2: function () {
    setTimeout(function () {
      console.log(this)
      console.log(this.a)
    }.call(obj1), 0)
  }
}
var a = 3
obj2.foo1() // 2
obj2.foo2() // obj1 1
```


## 例题
```js
var obj1 = {
  a: 1
}
var obj2 = {
  a: 2,
  foo1: function () {
    console.log(this.a)
  },
  foo2: function () {
    function inner () {
      console.log(this)
      console.log(this.a)
    }
    inner()
  }
}
var a = 3
obj2.foo1() // 2
obj2.foo2() // window 3
```


## 例题
```js
function foo () {
  console.log(this.a)
}
var obj = { a: 1 }
var a = 2

foo() // 2
foo.call(obj) // 1
foo().call(obj) // 2  Uncaught TypeError: Cannot read property 'call' of undefined
```


## 例题
```js
function foo () {
  console.log(this.a)
  return function () {
    console.log(this.a)
  }
}
var obj = { a: 1 }
var a = 2

foo() // 2
foo.call(obj) // 1
foo().call(obj) // 2 1
```


## 例题
```js
function foo (item) {
  console.log(item, this.a)
}
var obj = {
  a: 'obj'
}
var a = 'window'
var arr = [1, 2, 3]

// arr.forEach(foo, obj)
// arr.map(foo, obj)
arr.filter(function (i) {
  console.log(i, this.a)
  return i > 2
}, obj) // 第二个参数绑定this

// 1 obj
// 2 obj
// 3 obj
```


## 例题
```js
function Person (name) {
  this.name = name
}
var name = 'window'
var person1 = new Person('zzq')
console.log(person1.name) // zzq
```


## 例题
```js
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = function () {
    return function () {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
person1.foo1()
person1.foo2()()
```


## 例题
```js
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
  this.foo2 = function () {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
  this.foo3 = () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
  this.foo4 = () => {
    console.log(this.name)
    return () => {
      console.log(this.name)
    }
  }
}
var person1 = new Person('person1')
person1.foo1()()
// person1
// window
person1.foo2()()
// person1
// person1
person1.foo3()()
// person1
// window
person1.foo4()()
// person1
// person1
```

```js
var name = 'window'
function Person (name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}
var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // window
person1.obj.foo1.call(person2)() // window
person1.obj.foo1().call(person2) // person2

person1.obj.foo2()() // obj
person1.obj.foo2.call(person2)() // person2
person1.obj.foo2().call(person2) // obj
```