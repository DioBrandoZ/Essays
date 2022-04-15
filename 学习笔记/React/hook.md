## react hook
react按顺序来区分不同的 hook

当 react 重新渲染时，会生成一个新的 fiber 树，而这里会根据之前已经生成的 FiberNode ，拿到之前的 hook ，再复制一份到新的 FiberNode 上，生成一个新的 hooks 链表。

而这个 hook 是怎么拿的？是去遍历 hooks 链表拿的，所以每次都会按顺序拿下一个 hook ，然后复制到新的 FiberNode 上。可以理解为这个 updateWorkInProgressHook 每次都会按顺序返回下一个 hook 。

拿到这个 hook 之后再根据我们 setState 的值或者其他的一些东西去更新 hook 对象上的属性。这一步也就是 updateMemo 干的事情。

## setState是同步还是异步 
在 react 18 版本之前 
setState本身不是异步的，但是如果setState的时候react正处于更新状态，当前更新会被暂存，等上一次更新执行后执行，这个过程给人一种异步的假象。  
在 React 合成事件中是异步的

在 hooks 中是异步的

其他情况皆是同步的，例如：原生事件、setTimeout、Promise 等

在 react 18 版本之后 都会批量更新 ？


