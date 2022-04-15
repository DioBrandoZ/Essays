# 使用别名
1.安装 react-app-rewired 
```
npm install -S react-app-rewired
```
2.将package.json文件中的脚本替换成
```
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-app-rewired eject"
}
```
3.创建config-overrides.js
```
const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, 'src'),
    },
  };

  return config;
};
```
4.创建tsconfig.paths.json文件
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    }
  }
}
```
5.配置tsconfig.json文件
```
{
  "extends": "./tsconfig.paths.json",
  ...
}
```
[参考出处](https://www.pipipi.net/5423.html)
