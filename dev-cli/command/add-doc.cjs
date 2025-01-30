const EXCLUDE_COMPONENT_TYPES = ['lucide'];
const { default: inquirer } = require('inquirer');
const FileManager = require('../utils/file.cjs');

const addDoc = async () => {
  const types = FileManager.getCurrentLevelContents('src/components').filter(
    (type) => !EXCLUDE_COMPONENT_TYPES.includes(type)
  );

  const { action: docType } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '选择要添加的文档的组件类型：',
    choices: types,
  });

  const componentsHasDocs = FileManager.getCurrentLevelContents(
    'src/www/app/components/' + docType
  );

  const components = FileManager.getCurrentLevelContents('src/components/' + docType).filter(
    (item) => !componentsHasDocs.includes(item)
  );

  const { action: componentName } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '以下是还没有文档的组件，要选哪个？',
    choices: components,
  });

  const { action: exampleNamesRaw } = await inquirer.prompt({
    type: 'input',
    name: 'action',
    message: `除了默认示例 ${componentName}-basic，文档还需要哪些示例？以空格分隔：`,
  });

  const exampleNames = exampleNamesRaw
    .trim()
    .split(' ')
    .filter((item) => item !== '');

  const { action: confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'action',
    message: `即将创建并添加如下结构，请确认文件名是否正确：

/src/www/app/components/${docType}/${componentName}
  index.ts
  ${componentName}.ts
  ${componentName}-basic.ts${exampleNames.length > 0 ? '\n' + exampleNames.map((item) => `  ${item}.ts`).join('\n') : ''}

确认添加吗？`,
  });

  exampleNames.unshift(`${componentName}-basic`);

  if (confirm && docType === 'prototype') {
    // TODO: 添加文档
    const codeFactory = require('../template/prototype-doc.cjs');
    const codes = codeFactory({
      name: componentName,
      examples: exampleNames,
      type: 'prototype',
    });

    console.info('正在生成索引文件...');
    FileManager.createFile({
      filename: 'index.ts',
      dir: `src/www/app/components/${docType}/${componentName}`,
      content: codes.indexCode,
    });

    console.info('正在生成组件根文档...');
    FileManager.createFile({
      filename: `${componentName}.ts`,
      dir: `src/www/app/components/${docType}/${componentName}`,
      content: codes.rootCode,
    });

    console.info('正在生成示例文档...');
    exampleNames.forEach((name, i) => {
      FileManager.createFile({
        filename: `${name}.ts`,
        dir: `src/www/app/components/${docType}/${componentName}`,
        content: codes.exampleCode[i],
      });
    });

    console.info('正在修改 prototype 类别路由');
    FileManager.updateFile({
      filename: 'prototype-docs.ts',
      dir: 'src/www/app/components/prototype',
      content: codes.prototypeDocsCode,
    });

    console.info('正在修改文档站路由');
    FileManager.updateFile({
      filename: 'index.json',
      dir: 'src/www/router',
      content: codes.routeCode,
    });

    console.info('文档添加完成');
  }
};

module.exports = addDoc;
