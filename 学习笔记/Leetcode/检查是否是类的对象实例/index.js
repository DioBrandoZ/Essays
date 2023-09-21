// 请你编写一个函数，检查给定的值是否是给定类或超类的实例。
// 可以传递给函数的数据类型没有限制。例如，值或类可能是  undefined 。

// 本题要求在instanceof的基础上支持基本类型，那么使用Object(obj)即可将基本类型转为引用类型
var checkIfInstanceOf = function (obj, classFunction) {
  if (obj === null || obj === undefined || !(classFunction instanceof Function))
    return false;
  return Object(obj) instanceof classFunction;
};

// 迭代实现instanceof
/** 迭代 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (
    obj === null ||
    obj === undefined ||
    classFunction === null ||
    classFunction === undefined
  )
    return false;
  while (obj.__proto__ && obj.__proto__ != classFunction.prototype)
    obj = obj.__proto__;
  return obj.__proto__ === classFunction.prototype;
};
