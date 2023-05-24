## [ts使用指南手册](http://www.patrickzhong.com/TypeScript/zh/tutorials/typescript-in-5-minutes.html)

### 类
在构造函数的参数上使用public等同于创建了同名的成员变量

```
class Student {
    fullName: string;
    // 此处等于创建了同名的成员变量，firstName、middleInitial、lastName
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);
```