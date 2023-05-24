### webpack中的顺序问题
bugfix: https://github.com/jhlywa/chess.js/issues/208

在webpack配置中禁用AMD，但是与顺序相关，这条规则在rules[1].oneOf中的位置需要靠前，否则会无效。
因为oneOf规则匹配时，只使用第一个匹配规则。
如果先匹配到了其他的规则，就会提前退出，不会执行到禁用AMD。
之前完全没考虑到这方面。

rules中的use的执行顺序是反的
如果想要优先执行某个loader，但又不想把它提到后面，可以使用enforce。
enforce可选值为
```js
'pre' // 优先处理
'normal' // 默认
'inline' // 其次
'post' // 最后
```
使用方法
```js
{
  test: /\.js$/,
  excluede: /node_modules/,
  loader: 'eslint-loader',
  enforce: 'pre',
}
```
