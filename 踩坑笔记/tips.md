### svn常用命令：
+ 向远端直接添加新目录：
svn mkdir https://xxx.com/abc/xxxxx -m 'xxxxx msg'
意义：向https://xxx.com/abc/ 下创建xxxxx新目录（注意必须有-m参数写一个描述性信息）

+ 拉取远端资源（类似git clone）
svn checkout https://xxxx.com/abc/xxxxx
svn可以直接拉空目录， svn co https://xxxx.com/abc/xxxxx --depth=empty
svn up xxx.js

+ 查看状态 (类似git status)
svn status

+ 添加新更改 （类似git add .）
svn st | grep '^\?' | tr '^\?' ' ' | sed 's/[ ]*//' | sed 's/[ ]/\\ /g' | xargs svn add

+ 提交新更改（类似git commit）
svn commit -m 'xxxxx commit log'

### redux
view -> action -> reducer -> store -> view
三大原则：单一数据源、state只读、纯函数修改

## umi & antd
umi^3 和 antd^4版本，替换moment为dayjs报错，坑
[issues链接](https://github.com/ant-design/ant-design-pro/issues/6063)

## React-Creat-App
css module 无效
将所有的 .css/.lee/.scss 等样式文件都修改成 .module.css/.module.less/.module.scss 等。即可使用 CSS Modules 的方式进行引入使用了。

## declare function type
interface mode {
  fn: () => void
}

## edit hosts
```
sudo vi /etc/hosts
```

## git 简写
```
git config --global alias.co checkout  
git config --global alias.br branch  
git config --global alias.ci commit 
```

## 移动端，覆盖pointer点击样式
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

# 向上管理
定期主动向上级汇报工作，保持联系不要脱节

# 中文输入法
中文输入法会绕过input的onkeydown等事件
可以使用oncompositionstart和oncompositionend事件判断输入状态
