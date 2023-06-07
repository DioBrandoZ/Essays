```ts
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K
}

T[number] // 获取元组的联合类型
T['length'] // 获取元组的长度

type A = ['a', 'b', 'c']
type C = A['length'] // 3
type B = A[number] // "a" | "b" | "c"
```