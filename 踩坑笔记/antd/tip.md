## datePicker 中文

```ts
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

···
<ConfigProvider locale={zhCN}>
  {token && (
    <Authorized authority={authorized as IAuthorityType} noMatch={noMatch}>
    {children}
    </Authorized>
  )}
</ConfigProvider>
···

```


## 覆盖antd样式
```css
.select { // Select组件上className传入的样式
  :global { // 嵌套这一层，'ant-select-selection-item'内部样式名不会在打包时被自动追加唯一序列号
    .ant-select-selection-item { // 内部样式名
      padding-right: 0 !important;
    }
  }
}

```

