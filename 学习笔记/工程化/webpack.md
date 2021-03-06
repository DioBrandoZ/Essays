## webpack
前端构建工具，基于入口，自动递归查找所有需要用的模块，用不同的loader加载不同的资源，用plugin来扩展功能

### loader
webpack只能理解js和json，loader帮助webpack理解其他类型的文件，将他们转换成有效的模块
在module=》rules中，test判断文件，use使用loader
常见的loader：raw，加载txt文件、 css，加载css文件、 style，将css文件插入到js中、 eslint、 image

### plugin
扩展webpack的功能，监听webpack广播的事件，然后调用webpack的api来改变输出
常见的plugin：uglify、define、

### 工作流程
初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
确定入口：根据配置中的 entry 找出所有的入口文件；
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

### 热更新
watch模式，监听文件变化后，打包修改的文件，替换资源
不刷新浏览器，自动将改变了的新模块替换旧模块

### uglify优化DEC
Dead Code 一般具有以下几个特征
•代码不会被执行，不可到达
•代码执行的结果不会被用到
•代码只会影响死变量（只写不读）

### tree-shaking
消除无用的js代码，原理依赖于es6的模块特性

### es6 module
只能作为模块顶层语句出现，模块名是字符串常量，模块的绑定是不可变的。
依赖关系是确定的，可以进行可靠的静态分析，这是tree-shaking的基础。

### 优化
dll: 将复用性较高的第三方模块打包到动态链接库中，后续构建不需要重新打包动态库，只需要打包业务代码就行
Externals：不将某些包进行打包，而是通过CDN链接进行引入
