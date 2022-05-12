### 重排(回流)和重绘  
flow: 生成布局(flow)，浏览器在屏幕上“画”出渲染树中的所有节点 
paint: 将布局绘制(paint)在屏幕上，显示出整个页面。
reflow，页面布局发生改变，
repaint，重新绘制图像  
但重排一定会导致重绘。 

### 事件模型  
dom0：直接html上onclick = "function() {}" 违反html和js分离原则  
dom1：js中div1.onclick = function() {} 同一事件只能定义一个监听函数，后面的会覆盖前面的  
dom2：addEventListener、removeEventListener、dispatchEvent 
事件代理，由于事件会冒泡，所以可以在父节点同一代理  
stopPropagation 只会阻止事件传播，不会阻止当前节点其他监听函数执行，如果想要彻底阻止这个事件的传播，不再触发后面所有click的监听函数，可以使用stopImmediatePropagation方法  
当Event.cancelable属性为true时，调用Event.preventDefault()就可以取消这个事件，阻止浏览器对该事件的默认行为。  

### 减少白屏时间  
cdn、不要使用内联js，会阻塞html解析、js文件位置、优化图片，修饰类图片使用background-image  

### 内存回收机制  
```js
// 引用计数垃圾收集：如果没有对象引用到它，就回收  
// “这个对象”分配给 a 变量
var a = {
  a: 1,
  b: 2,
}
// b 引用“这个对象”
var b = a; 
a = 1; // 现在，“这个对象”的原始引用 a 被 b 替换了，但是b还引用了，所以没回收
b = undefined; // 现在没有任何东西引用了该对象，回收


// 标记清除法
// 当变量进入执行环境（作用域）时标记为“进入环境”，退出时标记为“退出环境”，回收退出环境的变量
```
垃圾回收: 将内存中不再使用的数据进行清理，释放出内存空间。V8 将内存分成 新生代空间 和 老生代空间。
新生代空间: 用于存活较短的对象
又分成两个空间: from 空间 与 to 空间
Scavenge GC算法: 当 from 空间被占满时，启动 GC 算法
存活的对象从 from space 转移到 to space
清空 from space
from space 与 to space 互换
完成一次新生代GC
老生代空间: 用于存活时间较长的对象
从 新生代空间 转移到 老生代空间 的条件
经历过一次以上 Scavenge GC 的对象
当 to space 体积超过25%
标记清除算法: 标记存活的对象，未被标记的则被释放
增量标记: 小模块标记，在代码执行间隙执，GC 会影响性能
并发标记(最新技术): 不阻塞 js 执行
压缩算法: 将内存中清除后导致的碎片化对象往内存堆的一端移动，解决 内存的碎片化

### 内存泄漏的可能原因
意外的全局变量: 无法被回收
定时器: 未被正确关闭，导致所引用的外部变量无法被释放
事件监听: 没有正确销毁 (低版本浏览器可能出现)
闭包: 会导致父级中的变量无法被释放
dom 引用: dom 元素被删除时，内存中的引用未被正确清空

可用 chrome 中的 timeline 进行内存标记，可视化查看内存的变化情况，找出异常点。


### localstorage、sessionstorage、cookie的区别
- 相同点是都是保存在浏览器端、且同源的
- cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下
- 存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大
- 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭
- 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localstorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的
- webStorage(webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage)支持事件通知机制，可以将数据更新的通知发送给监听者

### data-*
data-* 全局属性 是一类被称为自定义数据属性的属性

* 可以使用遵循 xml 名称生产规则 的任何名称来被替换，并具有以下限制：
该名称不能以xml开头，无论这些字母是大写还是小写；
该名称不能包含任何分号 (U+003A)；
该名称不能包含 A 至 Z 的大写字母

```html
<div id='test' data-name="zzq" data-age="24" ></div>
```
```js
const testDom = document.getElementById('test')
testDom.dataset // {name: 'zzq', age: '24'}
```

## box-sizing
默认content-box，width和height是content的宽高
box-siziing：content+padding+border =》 解决了height: 100%滚动条的问题


## getBoundingClientRect
getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
getBoundingClientRect是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）

该函数返回一个Object对象，该对象有6个属性：top,left,right,bottom,width,height

width、height是元素自身的宽高
top和bottom是元素上下边到视窗**上**边的距离
left和right是元素左右边到视窗**左**边的距离


```js
function isElementInViewport(el) {
  //获取元素是否在可视区域
  var rect = el.getBoundingClientRect();
  const { top, left, bottom, right } = rect

  const wh = (window.innerHeight || document.documentElement.clientHeight)
  const ww = (window.innerWidth || document.documentElement.clientWidth)

  return !(bottom < 0 || top > wh || right < 0 || left > ww)
}
```


## 封装select
renderItem