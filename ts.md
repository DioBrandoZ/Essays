
ts是js的超集，增加了静态类型、类、模块、接口和类型注解

执行环境层面：浏览器引擎和Node.js都能够直接运行JavaScript，但无法直接运行TypeScript。
时序层面：TypeScript被真正执行前，会通过编译转换生成JavaScript，之后才能被解释执行。


1、循环依赖 & 类型空间
js不允许循环依赖，如A、B两个模块，不应该互相import对方，但是在ts中，可能存在A import B，同时B又需要 import A作为类型声明。
这时就可以使用import type { A } from './A'
因为在ts中分为类型空间和值空间，类型空间用来存储代码中的类型信息，如type、interface、enmu、class等，在运行时会移除，后者则存放代码中的值，运行时也会保留。而import type则是引用类型空间的值，所以不会存在循环依赖。

在 TS 中，存在两个空间：值空间和类型空间。值空间用于存放会被编译成 JS 的实体内容，而类型空间用于存放各种类型信息，且这些信息会在编译后被完全擦除。两个空间彼此联系，但又互不影响。

2、类型空间 & 类型变量
```
// 使用泛型标注的加法函数，这里的 Type 就是一个类型变量
function add<Type>(a: Type, b: Type): Type {
  return a + b;
}

add(1, 2) // 返回值类型可被推断为 number
add('a', 'b') // 返回值类型可被推断为 string

add(1, 'b') // 形参类型不匹配，报错
```






interface和type
1. 定义基本类型别名
type可以定义基本类型别名, 但是interface无法定义,如：

type userName = string
type stuNo = number
...
2. 声明联合类型
type可以声明联合类型, 例如：

type Student = {stuNo: number} | {classId: number}
3. 声明元组
type可以声明 元组类型：

type Data = [number, string];
以上都是 type能做到， 而interface做不到的， 接下来聊聊type做不到的

4. 声明合并
如果你多次声明一个同名的接口，TypeScript 会将它们合并到一个声明中，并将它们视为一个接口。这称为声明合并， 例如：

interface Person { name: string }
interface Person { age: number }

let user: Person = {
    name: "Tolu",
    age: 0,
};
