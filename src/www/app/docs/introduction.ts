import { DocComponent } from '@/www/components/doc-component';
import { Doc } from '@/www/components/doc-component/interface';

class DocIntroduction extends DocComponent {
  protected _doc: Doc = {
    title: 'Introduction',
    id: 'docs-introduction',
    desc: 'The web component version of Headless UI & Shadcn/ui. Still in progress.',
    route: ['Docs', 'introduction'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 这是什么？
            此项目的名称为 [Prototype UI](https://github.com/guangliang2019/Prototype-UI), 正在开发中, 欢迎你的贡献。

            这是一个使用 Web Component 搭建的无渲染 UI 库, 简单来说, 它包含了所有的 UI 交互逻辑, 但唯独不包括样式, 它可以被塑造为任何你希望的样子。并且由于实现方案是 Web Component, 所以它可以在任何 Web 框架中使用，那怕是纯 HTML。
            
            你可以认为这是 [Radix UI](https://www.radix-ui.com/) 或者 [Headless UI](https://headlessui.com/) 的 Web Component 版本。
            `,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 如何使用
            有两种安装方式，一种是直接通过\`script\`标签引入，另一种是借由 NPM CLI 工具安装, 其中后者会把项目源码连带注释直接写到你的项目里。后者是受到 [shadcn/ui](https://ui.shadcn.com) 的启发。
            `,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 特性
            - 按需安装, 小到极致
            - 完全的键盘交互支持
            - 提供流行的 UI 库样式, 支持样式完全自定制
            - 不使用 Shadow DOM, 无样式隔离
            - 无 XSS 漏洞
            `,
          },
        ],
      },
      {
        title: '',
        contents: [
          {
            type: 'markdown',
            key: '',
            content: `### 欢迎共建
            - [Github](https://github.com/guangliang2019/Prototype-UI)
            `,
          },
        ],
      },
    ],
  };
}

customElements.define('doc-introduction', DocIntroduction);
