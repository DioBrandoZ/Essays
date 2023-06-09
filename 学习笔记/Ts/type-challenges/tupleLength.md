```ts
// T extends readonly any[] 保证有lenth属性
type Length<T extends readonly any[]> = T['length']
```
