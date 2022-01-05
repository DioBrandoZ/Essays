## 测试的意义
项目的说明书以及自检程序。指出了项目应该具备哪些功能，避免在项目日渐庞大后，后人修改项目时错漏已有逻辑。

## 技术选型
因为要测试自定义hook，所以选用了react官方推荐的@testing-library/react-hooks 和 Jest

## 编写单元测试Demo经过
安装Jest
```
yarn add --dev jest
```

初始化Jest配置
```
jest --init
```

安装babel
```
yarn add --dev babel-jest @babel/core @babel/preset-env
```

新建babel.config.js文件配置与当前Node版本兼容的Babel
```
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

修改.eslintrc.js，支持jest的全局变量
```
env: {
  jest: true
}
```

安装@testing-library/react-hooks，测试自定义hook
```
yarn add -D @testing-library/react-hooks
```

修改jest配置文件，支持别名
```
moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
```

修改jest配置文件，babel处理单元测试时需要用到的库
```
transformIgnorePatterns: [
  '/node_modules/(?!(chessops)/)',
],
```

[react-testing-library 文档](https://testing-library.com/docs/react-testing-library/intro)

[Jest 文档](https://jestjs.io/zh-Hans/)