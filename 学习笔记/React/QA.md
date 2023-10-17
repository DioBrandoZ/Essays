Q:key的作用是什么
A:在react进行diff对比新旧虚拟dom输时，会将key作为组件的id，用来匹配虚拟dom。如果原有的id不存在了，就销毁组件，如果存在，则认为是同一个组件，只是属性发生了变化，就更新组件。如果没有设置key，则会默认将index作为id。

```js
const arr = ['a', 'b', 'c', 'd']

const renderInput = () => (
  <>
    {arr.map((item, index) => (
      <div>
        标题{item}： <input key={index} value={item} />
      </div>
    ))}
  </>
)
```
上述组件如果没有key的话，打乱arr的顺序，会发现input前的标题的顺序跟随arr的顺序，但是input的值却没有发生改变。
原因就是没有key时，默认将index作为id，react会认为两次的组件顺序是一样的，只是属性发生了变化，所以只更新了属性item，没有更新组件的顺序，所以input的value没变。

Q:类组件中setState第二个参数的作用
第二个参数接收一个回调函数，会在状态更新完成后被调用，在这个回调函数中可以获取到setState的最新的值

Q:refs的作用是什么
可以用来获取组件或DOM元素的实例，从而可以直接操作这些实例

Q:在类组件与hooks中，应该在哪个阶段发送请求
componentDidmount和useEffect(() => {}, [])

Q:事件处理逻辑

Q:什么时候用函数组件，什么时候用类组件
不需要使用生命周期方法，state 或 Refs 等类组件特有功能时，使用函数组件

Q:函数组件和类组件的本质区别
函数组件没有内部状态（state）或生命周期方法

Q:diff算法

Q:虚拟dom

