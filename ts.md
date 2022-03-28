1、循环依赖 & 类型空间
js不允许循环依赖，如A、B两个模块，不应该互相import对方，但是在ts中，可能存在A import B，同时B又需要 import A作为类型声明。
这时就可以使用import type { A } from './A'
因为在ts中分为类型空间和值空间，类型空间用来存储代码中的类型信息，如type、interface、enmu、class等，在运行时会移除，后者则存放代码中的值，运行时也会保留。而import type则是引用类型空间的值，所以不会存在循环依赖。

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