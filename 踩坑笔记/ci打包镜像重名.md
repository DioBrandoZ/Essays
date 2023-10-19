现象描述：
feat分支提交代码后，合并到master分支，push并上线，紧接着又将feat分支合并到dev分支，push并部署测试服
结果master分支上线后是测试环境

原因：
在build-docker环节打出来的镜像是根据commit的哈希值来取名的
这两个CI是同一个commit，哈希值相同，test的build在prod之后，覆盖了prod的同名镜像
又因为prod要刷cdn，等待了一段时间，所以prod部署时用的是被test覆盖之后的镜像
最终导致测试环境上到线上

总结 & 改进：
1、使用tag触发上线任务，用tag的版本号打镜像
2、得严格遵守流程，新建分支提mr
3、上线后仔细自测，考虑在测试环境加一些明显的标识和线上环境区分开来
