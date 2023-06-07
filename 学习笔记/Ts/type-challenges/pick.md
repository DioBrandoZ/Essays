```ts
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}
```

extends, 多重继承 & 判断
```ts
interface T3 extends T1,T2 {
  age: number
}

// 如果A2能赋给A1，则表达式为真
type A = A2 extends A1 ? string : number


// 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。
type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'>  // A3的类型是 string | number
// never是所有类型的子类型
type A1 = never extends 'x' ? string : number; // string
type P<T> = T extends 'x' ? string : number;
// never 被认为是空的联合类型，按照分配律计算，没有传入参数，所以结果也是never
type A2 = P<never> // never

// 使用[]将泛型参数括起来，可以阻断类型分配
type P<T> = [T] extends ['x'] ? string : number;
type A1 = P<'x' | 'y'> // number
type A2 = P<never> // string
```


keyof, 取interface的key转换为联合类型
in，将联合类型的值转换为数组

```ts
function getValue<T extends Object, K extends keyof T>(o: T, key: K): T[K]{
  return o[key]
}
const obj1 = { name: '张三', age: 18 }
const values = getValue(obj1, 'name')
```