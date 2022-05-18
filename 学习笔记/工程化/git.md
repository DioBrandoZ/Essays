1、记住密码
git config credential.helper store

2、首次运行项目时执行,加载submodule
git submodule update --init --recursive

# svn
svn st | grep '^\?' | tr '^\?' ' ' | sed 's/[ ]*//' | sed 's/[ ]/\\ /g' | xargs svn add
svn commit -m 'change link'
svn可以直接拉空目录， svn co https://xxx --depth=empty
svn up latest.yml


nvm use 12

npm link ../xxx/node_modules/react

npm link @kechess/chessboard