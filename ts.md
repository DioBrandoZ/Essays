ts是js的超集，增加了静态类型、类、模块、接口和类型注解

执行环境层面：浏览器引擎和Node.js都能够直接运行JavaScript，但无法直接运行TypeScript。
时序层面：TypeScript被真正执行前，会通过编译转换生成JavaScript，之后才能被解释执行。

值空间和类型空间
在 TS 中，存在两个空间：值空间和类型空间。值空间用于存放会被编译成 JS 的实体内容，而类型空间用于存放各种类型信息，且这些信息会在编译后被完全擦除。两个空间彼此联系，但又互不影响。

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