# 事情经过
需求在提测，为了不让自己闲着，所以想给项目部署一个rancher测试服。
项目目前线上为rancher + cdn，测试服则是放在了物理机上。
搭建过程很顺利，新建服务树、申请域名、新建rancher机器，稍微修改了一下.gitlab-ci.yml文件，代码推上gitlab后ci也全都成功了。

# 问题描述
但是页面却白屏，控制台报错
```
Uncaught SyntaxError: Unexpected token '<'
```
查看network，发现打包的资源都正确请求了并成功了（状态码200且文件名正确）。
去gitlab上把产物下到本地，能正常打开
将产物上传到物理机，也能正常运行

# 问题原因
在项目的Dockerfile中执行的命令是
```
COPY ./build/index.html /usr/share/nginx/html
```
因为线上服务的静态资源都传到cdn了，所以只将打包产物的index.html文件注入到了容器中
测试环境没有走cdn，又没将 ./build/static 注入到容器中,所以取不到想要的js文件等资源
但是又因为nginx配置文件中写了
```
location / {
  try_files $uri $uri/ /index.html;
}
```
找不到的资源都会返回index.html，所以请求返回的状态码是200而不是404
但又因为请求的是js，返回的是html文件，所以报错
```
Uncaught SyntaxError: Unexpected token '<'
```

# 解决方法
查了好久没查到如何在dockerfile中条件判断copy...
暂时先不管，全部复制
```
COPY ./build /usr/share/nginx/html
```