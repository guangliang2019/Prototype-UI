import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component/interface';

class DocPDSL extends DocComponent {
  protected _doc: Doc = {
    title: 'PDSL',
    id: 'docs-pdsl',
    desc: 'Prototype DSL - 一个用于编写跨框架组件逻辑的领域特定语言',
    route: ['Docs', 'pdsl'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 什么是 PDSL？
PDSL (Prototype DSL) 是一个专门用于编写跨框架组件逻辑的领域特定语言。它不是一个新的前端框架，而是一个帮助你抽象和复用组件核心逻辑的工具。

在当今的前端生态中，我们有 React、Vue、Angular 等优秀的框架，每个框架都有其独特的组件编写方式。但很多时候，我们会在不同框架中重复编写相似的组件逻辑。PDSL 就是为了解决这个问题而生的。`,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### PDSL 的设计理念
- **专注于逻辑抽象**：PDSL 只关注组件的核心逻辑，不涉及具体的渲染实现
- **跨框架复用**：通过适配器模式，PDSL 编写的逻辑可以在不同框架中使用
- **轻量级**：不引入额外的运行时开销，保持简单和高效
- **渐进式**：可以逐步将现有组件迁移到 PDSL`,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 使用场景
PDSL 最适合用于：

- **编写可复用组件**：当你的组件需要在多个框架中使用时
- **抽象通用逻辑**：当你发现自己在不同框架中重复编写相似的交互逻辑时
- **创建设计系统**：当你需要一套可以在不同框架中保持一致的组件库时

\`\`\`typescript
// 使用 PDSL 编写组件逻辑
const Tabs = definePrototype((p) => {
  // 只关注核心逻辑
  watchContext(p, 'tabs');
  return () => {
    // 渲染逻辑
  };
});
\`\`\``,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 避免的使用场景
PDSL 不是用来：

- **编写整个应用**：这不是一个完整的应用开发框架
- **实现框架功能**：路由、状态管理等框架层面的功能应该使用框架原生方案
- **处理业务逻辑**：业务逻辑应该放在应用层，而不是组件层

\`\`\`typescript
// ❌ 不好的使用方式：用 PDSL 写整个应用
const App = definePrototype((p) => {
  // 路由逻辑
  // 状态管理
  // 页面布局
  // ... 太多框架层面的逻辑
});
\`\`\``,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 最佳实践
1. **保持逻辑纯粹**：只关注组件的核心逻辑，不涉及框架特性
2. **渐进式迁移**：可以逐步将现有组件迁移到 PDSL
3. **合理抽象**：只抽象真正需要复用的逻辑
4. **保持简单**：避免过度设计，保持 PDSL 的轻量级特性

\`\`\`typescript
// ✅ 好的实践：专注于组件逻辑
const Select = definePrototype((p) => {
  // 只处理选择器的核心逻辑
  watchContext(p, 'select');
  return () => {
    // 只处理渲染
  };
});
\`\`\``,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 未来展望
- 支持更多框架的适配器
- 提供更丰富的组件原型
- 改进开发工具支持
- 完善类型系统

我们相信，PDSL 可以帮助开发者更好地复用组件逻辑，减少重复工作，提高开发效率。`,
          },
        ],
      },
    ],
  };
}

customElements.define('doc-pdsl', DocPDSL);
