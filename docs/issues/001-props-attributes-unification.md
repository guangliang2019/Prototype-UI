# Props 与 Attributes 的统一性思考

## 背景

在实现 WebComponent 适配器时，我们发现了 props 和 attributes 之间存在的特殊关系：

1. WebComponent 同时支持 props 和 attributes 两种方式来传递数据
2. 在声明式使用时（HTML），attributes 是主要的数据传递方式
3. 在命令式使用时（JS），props 是更自然的数据传递方式

## 问题

这种双重性带来了一些思考：

1. props 和 attributes 是否需要完全分离？
2. 是否可能统一这两种数据传递方式？
3. 其他渲染适配器（如纯 JS 渲染）是否也应该考虑类似的统一？

## 待解决的问题

1. **数据流向**
   - props -> attributes 的同步
   - attributes -> props 的同步
   - 是否需要双向同步

2. **类型安全**
   - attributes 只支持字符串
   - props 支持任意 JS 值
   - 类型转换的处理

3. **性能考虑**
   - 同步过程的性能开销
   - 是否需要批量更新
   - 是否需要防抖/节流

## 后续计划

1. 完成纯 JS 渲染适配器的实现
2. 对比不同适配器中数据传递的模式
3. 寻找可能的统一方案
4. 评估统一方案的可行性和必要性

## 相关代码

- `src/next-core/adapter/props.ts`
- `src/next-core/adapter/web-component/managers/props.ts`

## 备注

这个问题暂时搁置，将在完成纯 JS 渲染适配器后重新评估。主要原因是：
1. WebComponent 的这种双重性可能是一个特例
2. 不应该从特例出发设计通用接口
3. 需要更多适配器的实现经验来找到真正的共性 