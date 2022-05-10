## webpack 起源
早期 Webpack 刚出来的时候，是为了解决低版本浏览器不支持 ESM 模块化的问题，将各个分散的 JavaScript 模块合并成一个文件，同时将多个 JavaScript 脚本文件合并成一个文件，减少 HTTP 请求的数量，有助于提升页面首次访问的速度。后期 Webpack 乘胜追击，引入了 Loader、Plugin 机制，提供了各种构建相关的能力（babel转义、css合并、代码压缩），取代了同期的 Browserify、Gulp。
如今，HTTP/2 的盛行，HTTP/3 也即将发行，再加上 5G 网络的商用，减少 HTTP 请求数量起到的作用已经微乎其微，而且新版的浏览器基本已经支持了 ESM

## Bundleless
Bundleless 和传统的构建工具相比，最大的特点就是不用将业务代码打包

## vite的优势
利用浏览器内置 ES Module 的支持(script 标签加上属性 type="module" 即可)，浏览器直接向 dev server 逐个请求各个模块，而不需要提前把所有文件打包。

借助 esbuild 超快的编译速度把第三方库进行预构建，一方面将零散的文件打到一起，减少网络请求，另一方面全面转换为 ESM 模块语法，以适配浏览器内置的 ESM 支持。

## 做法
1、启动时，内部开启一个dev server，用于拦截页面的脚本文件
2、访问vite服务时，默认返回index.html
3、处理js文件，html 文件会请求 /src/main.js， vite 服务在返回 js 文件的时候，会使用 rewrite 方法对 js 文件内容进行一次替换。
```js
- import { createApp } from 'vue'
+ import { createApp } from '/__modules/vue'
import App from './App.vue'

createApp(App).mount('#app')
```
4、处理npm模块，请求的文件如果是 /__modules/ 开头的话，表明是一个 npm 模块，vite 会使用 resolveModule 方法进行处理。
```js
// fetch /__modules/vue
if (pathname.startsWith('/__modules/')) {
  // 返回 import 的模块文件
  return resolveModule(pathname.replace('/__modules/', ''), cwd, res)
}

// 精简了部分代码，如果想看完整版建议去 github
// https://github.com/vitejs/vite/blob/a4f093a0c3/src/server/moduleResolver.ts
import path from 'path'
import resolve from 'resolve-from'
import { sendJSStream } from './utils'
import { ServerResponse } from 'http'

export function resolveModule(id: string, cwd: string, res: ServerResponse) {
  let modulePath: string
  modulePath = resolve(cwd, 'node_modules'， `${id}/package.json`)
  if (id === 'vue') {
    // 如果是 vue 模块，返回 vue.runtime.esm-browser.js
    modulePath = path.join(
      path.dirname(modulePath),
      'dist/vue.runtime.esm-browser.js'
    )
  } else {
    // 通过 package.json 文件，找到需要返回的 js 文件
    const pkg = require(modulePath)
    modulePath = path.join(path.dirname(modulePath), pkg.module || pkg.main)
  }

  sendJSStream(res, modulePath)
}
```
5、处理.vue文件
经过解析，.vue文件会被拆分为script、style、template三部分。template中的内容会被解析成render方法

## 热更新
1、通过webSocket来实现热更新通信
2、接收到文件变化消息后，利用了 timestamp 刷新缓存重新执行的方法来达到更新的目的
