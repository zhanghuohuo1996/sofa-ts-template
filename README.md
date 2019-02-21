# sofa-ts-template

sofa-template typescript版本；

## 开发手册

1、变量命名使用驼峰式

```javascript
export interface Props extends FormComponentProps {
  entityModal: {
    type?: string;
    data?: {
      role_id?: string | number; // 经常性的，后端会使用下划线式的数据结构，这种是否需要修复？
      name?: string;
      content?: string;
    };
    show?: boolean;
  };
```
