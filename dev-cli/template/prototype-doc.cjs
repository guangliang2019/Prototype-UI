const FileManager = require('../utils/file.cjs');

const defaultOptions = {
  name: '',
  type: 'prototype',
  examples: [],
};

const prototypeDocCodeFactory = (options) => {
  const { name, examples } = { ...defaultOptions, ...options };

  if (name === undefined) throw new Error('Component name is required');
  if (typeof name !== 'string') throw new Error('Component name must be a string');
  if (!Array.isArray(examples)) throw new Error('Parts must be an string array');

  const prototype = (str) => `prototype-${str}`;
  const bigCamel = (str) =>
    str.split('-').reduce((prev, curr) => prev + curr.charAt(0).toUpperCase() + curr.slice(1), '');
  const title = (str) =>
    str.split(' ').reduce((prev, curr) => prev + curr.charAt(0).toUpperCase() + curr.slice(1), '');

  const indexCode = `import './${name}';
`;
  const rootCode = `import { Doc, DocComponent } from '@/www/components/doc-component';
  ${examples.length > 0 ? '\n' + examples.map((item) => `import './${item}';`).join('\n') : ''}
import '@/components/prototype/${name}';

export default class ${bigCamel(name)}Doc extends DocComponent {
  protected _doc: Doc = {
    id: '${prototype(name)}',
    title: '${bigCamel(name)}',
    desc: 'Describe ${bigCamel(name)}',
    route: ['Prototype', '${bigCamel(name)}'],
    links: [],
    sections: [
      {
        title: '',
        contents: [
          ${
            examples.length > 0
              ? examples
                  .map(
                    (item) => `{
              type: 'code',
              key: '',
              content: '${item}',
            }`
                  )
                  .join(',\n')
              : ''
          }
        ],
      },
    ],
  };
}

customElements.define('${name}-doc', ${bigCamel(name)}Doc);
`;

  const exampleCode = examples.map(
    (example) => `
import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class ${bigCamel(example)} extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center' }, [
      h('div', { class: 'text-2xl' }, ['Hello, ${title(name)}!']),
    ]);
  };
}

customElements.define('${example}', ${bigCamel(example)});
`
  );

  const prototypeDocsCode = generatePrototypeDocsCode(
    name,
    FileManager.getFileContent('src/www/app/components/prototype/prototype-docs.ts')
  );

  const docsRouteCode = FileManager.getFileContent('src/www/router/index.json');
  const docsRoute = JSON.parse(docsRouteCode);

  let groupName = '';

  switch (options.type) {
    case 'prototype':
      groupName = 'Prototype UI';
      break;
    case 'shadcn':
      groupName = 'Shadcn UI';
      break;
    case 'common':
      groupName = 'Common Components';
      break;
  }

  docsRoute[groupName].push({
    title: title(name),
    value: options.type + '-' + name,
    href: `/${options.type}/${name}`,
  });

  const routeCode = JSON.stringify(docsRoute, null, 2);

  return {
    indexCode,
    rootCode,
    exampleCode,
    prototypeDocsCode,
    routeCode,
  };
};

module.exports = prototypeDocCodeFactory;

function generatePrototypeDocsCode(componentName, existingCode) {
  // 通过正则表达式匹配已有的 import 部分
  const importPattern = /import\s+['"][^'"]+['"];?/g;

  // 通过正则匹配已有的组件，动态生成新的 import 部分
  const imports = existingCode.match(importPattern) || [];

  // 确保不会重复添加已有的组件
  const newImport = `import './${componentName}';`;
  if (!imports.includes(newImport)) {
    imports.push(newImport);
  }

  // 将 kebab case 转为 PascalCase
  const capitalize = (str) => str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
  const pascalCaseName = capitalize(componentName);

  // 自动生成 appendChild 部分
  const appendChildren = imports.map((importStatement) => {
    const match = importStatement.match(/'([^']+)'/);
    if (match) {
      const component = match[1];
      return `fragment.appendChild(h('${component.slice(2)}-doc'));`;
    }
    return '';
  });

  const code = `// 该文件是 dev-cli 自动生成的，请勿手动修改
// 如需添加新的文档，请运行 npm run dev-cli 

${imports.join('\n')}
import { h } from '@/www/utils/dom';

export default class PrototypeDoc extends HTMLElement {
  connectedCallback() {
    this._setup();
  }

  private _setup() {
    const fragment = document.createDocumentFragment();

    ${appendChildren.join('\n\t\t')}

    this.appendChild(fragment);
    this.className = 'w-full';
  }
}

customElements.define('prototype-docs', PrototypeDoc);
`;

  return code;
}
