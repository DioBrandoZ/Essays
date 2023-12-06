# filter

## grayscale
将图像转换为灰度图。值为 100% 则完全转为灰度图像，若为初始值 0% 则图像无变化。值在 0% 到 100% 之间，则是该效果的线性乘数。
```
filter: grayscale(100%)
```

## blur
将高斯模糊应用于输入图像。
```
filter: blur(5px);
```

## opacity
应用透明度。值为 0% 则使图像完全透明，值为 100% 则图像无变化。
```
filter: opacity(50%);
```

## drop-shadow
使用 <shadow> 参数沿图像的轮廓生成阴影效果。阴影语法类似于 <box-shadow>（在 CSS 背景和边框模块中定义），但不允许使用 inset 关键字以及 spread 参数。
与所有 filter 属性值一样，任何在 drop-shadow() 后的滤镜同样会应用在阴影上。
```
filter: drop-shadow(16px 16px 10px black);
```

## brightness
调整图像的亮度。值为 0% 将创建全黑图像；值为 100% 会使输入保持不变，其他值是该效果的线性乘数。如果值大于 100% 将使图像更加明亮。
```
filter: brightness(2);
```

## contrast
调整输入图像的对比度。值是 0% 将使图像变灰；值是 100%，则无影响；若值超过 100% 将增强对比度。
```
filter: contrast(200%);
```


