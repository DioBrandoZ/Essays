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