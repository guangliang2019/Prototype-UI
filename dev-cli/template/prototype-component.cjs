// 这个文件用于生成 prototype 组件的代码
// 代码的模版夹杂在 factory 方法内，并未完全抽出
const FileManager = require('../utils/file.cjs');

const defaultOptions = {
  name: '',
  parts: [],
};

const prototypeComponentCodeFactory = (options) => {
  const { name, parts } = { ...defaultOptions, ...options };

  if (name === undefined) throw new Error('Component name is required');
  if (typeof name !== 'string') throw new Error('Component name must be a string');
  if (!Array.isArray(parts)) throw new Error('Parts must be an string array');

  const prototype = (str) => `prototype-${str}`;
  const bigCamel = (str) =>
    str.split('-').reduce((prev, curr) => prev + curr.charAt(0).toUpperCase() + curr.slice(1), '');

  const indexCode = `export { default as ${bigCamel(prototype(name))} } from './${name}';
${parts.length > 0 ? parts.map((part) => `export { default as ${bigCamel(prototype(part))} } from './${part}'`).join('\n') : ''}
  `;

  const interfaceCode = `import ${bigCamel(prototype(name))} from './${name}';

export interface ${bigCamel(name)}Props {}

${parts.length > 0 ? parts.map((part) => `export interface ${bigCamel(part)}Props {}`).join('\n\n') : ''}

export interface ${bigCamel(prototype(name))}Context extends Record<string, Object> {
  '${prototype(name)}': {
    rootRef: ${bigCamel(prototype(name))}<any>;
  };
}
`;

  const rootCode = `import { ContextProvider } from '@/components/common';
import { ${bigCamel(prototype(name))}Context, ${bigCamel(name)}Props } from './interface';

export default class ${bigCamel(prototype(name))}<
    T extends Record<string, Object> & ${bigCamel(prototype(name))}Context = ${bigCamel(prototype(name))}Context,
  >
  extends ContextProvider<T> implements ${bigCamel(name)}Props
{
  protected _providerKeys = ['${prototype(name)}'];
  protected _consumerKeys = [];

  connectedCallback() {
    super.connectedCallback();

    this.setContext('${prototype(name)}', {
      rootRef: this,
    } as Partial<${bigCamel(prototype(name))}Context['${prototype(name)}']>);
  }
}

customElements.define('${prototype(name)}', ${bigCamel(prototype(name))});
`;

  const partCode = parts.map(
    (
      part
    ) => `import { ${bigCamel(prototype(name))}Context, ${bigCamel(part)}Props } from './interface';
import { ContextConsumer } from '@/components/common';

export const handleContextChangeSymbol = Symbol('${prototype(name)}');

export default class ${bigCamel(prototype(part))}<T extends ${bigCamel(prototype(name))}Context = ${bigCamel(prototype(name))}Context>
  extends ContextConsumer<T> implements ${bigCamel(part)}Props
{
  protected _consumerKeys = ['${prototype(name)}'];

  protected [handleContextChangeSymbol] = () => {};

  connectedCallback() {
    super.connectedCallback();
    this.addContextListener('${prototype(name)}', this[handleContextChangeSymbol]);
  }

  disconnectedCallback() {
    this.removeContextListener('${prototype(name)}', this[handleContextChangeSymbol]);

    // ContextConsumer 没有 disconnectedCallback，但是其他的 common 组件会有
    // 如果你的组件更改继承了 Trigger、Overlay 等其他 Consumer 组件，那么你需要在这里调用 super.disconnectedCallback();

    // super.disconnectedCallback();
  }
}

customElements.define('${prototype(part)}', ${bigCamel(prototype(part))});
`
  );

  const typeIndexCode = `${FileManager.getFileContent('src/components/prototype/index.ts')}export { ${bigCamel(prototype(name))}${parts.map((part) => ', ' + bigCamel(prototype(part)))} } from './${name}';\n`;

  return {
    indexCode,
    interfaceCode,
    rootCode,
    partCode,
    typeIndexCode,
  };
};

module.exports = prototypeComponentCodeFactory;
