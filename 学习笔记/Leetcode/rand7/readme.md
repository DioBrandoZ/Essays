## rand7
Q:
rand7方法可以获取【1，7】的整数
通过rand7来获取rand10

A:
1、通过 (rand7() - 1) * 7 获取 【0，7，14，21，28，35，42】的整数
2、通过rand7() 获取 【1，2，3，4，5，6，7】
两者相加，可以获取到【1，49】的整数

舍弃掉大于40的数字，将题目变成【1，40】取【1，10】