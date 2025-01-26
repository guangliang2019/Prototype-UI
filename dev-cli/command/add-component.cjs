const EXCLUDE_COMPONENT_TYPES = ['common', 'lucide', 'motion'];
const { default: inquirer } = require('inquirer');
const FileManager = require('../utils/file.cjs');

const addComponent = async () => {
  const types = FileManager.getCurrentLevelContents('src/components').filter(
    (type) => !EXCLUDE_COMPONENT_TYPES.includes(type)
  );
  const { action: targetType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '要添加的组件类别',
      choices: types,
    },
  ]);
  const { action: componentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'action',
      message: '输入组件名称, 单词之间用 - 连接, 例如: select 或 scroll-area： \n',
      choices: types,
    },
  ]);
  const { action: componentPartsRaw } = await inquirer.prompt([
    {
      type: 'input',
      name: 'action',
      message:
        '输入子组件名称，以空格分割，单词之间用 - 连接，例如: select-item select-trigger, 不需要或待定请跳过：\n',
      choices: types,
    },
  ]);
  const componentParts = componentPartsRaw.split(' ').filter((part) => part);
  const { action: confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'action',
      message: `将会创建如下结构，请确认文件名是否正确：

src/components/${targetType}/${componentName}
  index.ts               // 入口文件
  interface.ts           // 类型声明
  ${componentName}.ts${componentParts.length > 0 ? '\n' + componentParts.map((part) => `  ${part}.ts`).join('\n') : ''}

是否创建？`,
      choices: types,
    },
  ]);

  if (confirm) {
    const codeFactory = require('../template/prototype.cjs');
    const codes = codeFactory({
      name: componentName,
      parts: componentParts ?? [],
    });

    console.info('正在生成索引文件...');
    FileManager.createFile({
      filename: 'index.ts',
      dir: `src/components/${targetType}/${componentName}`,
      content: codes.indexCode,
    });

    console.info('正在生成类型声明文件...');
    FileManager.createFile({
      filename: 'interface.ts',
      dir: `src/components/${targetType}/${componentName}`,
      content: codes.interfaceCode,
    });

    console.info('正在生成主组件文件...');
    FileManager.createFile({
      filename: `${componentName}.ts`,
      dir: `src/components/${targetType}/${componentName}`,
      content: codes.rootCode,
    });

    console.info('正在生成子组件文件...');
    componentParts.forEach((part, i) => {
      FileManager.createFile({
        filename: `${part}.ts`,
        dir: `src/components/${targetType}/${componentName}`,
        content: codes.partCode[i],
      });
    });

    console.info('组件创建成功！');
  } else {
    console.info('取消创建组件');
    process.exit(0);
  }
};

module.exports = addComponent;
