```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

readonly，只读的属性
