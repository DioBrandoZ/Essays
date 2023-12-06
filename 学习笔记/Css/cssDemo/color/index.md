## 变量 $
变量以美元符号开头，赋值方法与 CSS 属性的写法一样
```scss
$width: 20px;

.box {
  width: $width; // 20px
}

// 变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 !global 声明：

.foo {
  $width: 40px !global;
  width: $width; // 40px
}

.bar {
  width: $width; // 40px
}
```

## 数据类型
SassScript 支持 6 种主要的数据类型：
```scss
// 数字，1, 2, 13, 10px
$number = 1;

// 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
$string = foo;

// 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
$color = blue;

// 布尔型，true, false
$flag = true;

// 空值，null
$var = null;

// 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
$list = 1.5em 1em 0 2em;

// maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)
$map = (
  key1: value1,
  key2: value2
);
```

## @for
这个指令包含两种格式：@for $var from <start> through <end>
或者 @for $var from <start> to <end>
区别在于 through 与 to 的含义：
当使用 through 时，条件范围包含 <start> 与 <end> 的值，
而使用 to 时条件范围只包含 <start> 的值不包含 <end> 的值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```
// 编译为
```css
.item-1 {  width: 2em; }
.item-2 { width: 4em; }
.item-3 { width: 6em; }
```

## @each
@each 指令的格式是 $var in <list>, $var 可以是任何变量名，比如 $length 或者 $name，而 <list> 是一连串的值，也就是值列表。

@each 将变量 $var 作用于值列表中的每一个项目，然后输出结果，例如：

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```
编译成
```css
.puma-icon {
  background-image: url('/images/puma.png'); }
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); }
.egret-icon {
  background-image: url('/images/egret.png'); }
.salamander-icon {
  background-image: url('/images/salamander.png'); }
```

## &
& 用在嵌套的scss代码里，来引用父元素的选择器
```scss
a {
  color: blue;
  &:hover { color: red; } // a:hover
}
```

## @mixin
混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class。
```scss
@mixin large-text {
  font-size: 20px;
  color: #ff0000;
}

.page-title {
  @include large-text;
  margin-top: 10px;
}
```

## 参数
参数用于给混合指令中的样式设定变量，并且赋值使用。
在定义混合指令的时候，通过逗号分隔，将参数写进圆括号里。
引用指令时，按照参数的顺序，再将所赋的值对应写进括号

```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
  }
}
p { @include sexy-border(blue, 20px); }
```

## 向混合样式中导入内容
在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 @content 标志的地方
```scss
@mixin apply-to-ie6-only {
  html {
    @content;
  }
}
@include apply-to-ie6-only {
  .logo {
    background-image: url('xxx');
  }
}

// 编译成

html .logo {
  background-image: url('xxx');
}
```

## 函数指令
Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：

```scss
$width1: 40px;
$width2: 10px;

@function getwidth($n) {
  @return $n * $width1 + ($n - 1) * $width2;
}

#sidebar { width: getwidth(5); }

// 编译成

#sidebar { width: 240px; }
```

