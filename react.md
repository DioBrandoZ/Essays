# CPU瓶颈
浏览器一般刷新频率为60hz，16.6ms刷新一次 （JS脚本执行 -----  样式布局 ----- 样式绘制）

GUI渲染线程与JS线程是互斥的

当JS执行时间过长时，没时间样式布局绘制样式，就会掉帧卡顿

react解决方法是在每一帧的时间中，预留一部分时间（一般5ms）用来执行js，如果这次没执行完，就下一帧继续执行，保证有足够的时间样式布局样式绘制，减少掉帧卡顿的可能。

所以，解决CPU瓶颈的关键是实现**时间切片**，而时间切片的关键是：将同步的更新变为可中断的异步更新。

# 老的React(15)架构
可以分为两层：

Reconciler（协调器）—— 负责找出变化的组件

Renderer（渲染器）—— 负责将变化的组件渲染到页面上

在React中可以通过this.setState、this.forceUpdate、ReactDOM.render等API触发更新。

每当有更新发生时，Reconciler会做如下工作：

JSX =》虚拟DOM
diff 虚拟DOM
通知Renderer将变化的虚拟DOM渲染到页面上

## React15架构的缺点
在Reconciler中，mount的组件会调用mountComponent，update的组件会调用updateComponent。这两个方法都会递归更新子组件。

## 递归更新的缺点
由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。

# 新的React(16)架构
相较于React15，React16架构中新增了Scheduler（调度器）：

Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler

Reconciler（协调器） 更新工作从递归变成可中断的循环，每次循环都会调用shouldYield判断当前是否有剩余时间。

Renderer（渲染器）—— 负责将变化的组件渲染到页面上

整个Scheduler与Reconciler的工作都在内存中进行。协调器和渲染器不再交替进行，只有当所有组件都完成协调工作，才会统一交给渲染器

## 总结
React16采用新的Reconciler。

Reconciler内部采用了Fiber的架构。

# Fiber架构
Fiber，虚拟DOM在React中的正式称呼。中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

React Fiber可以理解为：React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

其中每个任务更新单元为React Element对应的Fiber节点。