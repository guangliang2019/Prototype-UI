const { default: inquirer } = require('inquirer');
const addComponent = require('./command/add-component.cjs');
const addDoc = require('./command/add-doc.cjs');
// 定义可执行的命令
const commands = ['添加组件', '添加文档', '查看说明'];

async function main() {
  // 获取用户输入的命令
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: '请选择要执行的操作：',
      choices: commands,
    },
  ]);

  switch (action) {
    case '添加组件':
      addComponent();
      break;
    case '添加文档':
      addDoc();
      break;

    case '查看说明':
      // TODO: 实现查看说明的逻辑
      console.log('显示说明...');
      break;

    default:
      console.log('无效的操作');
  }
}

// 处理基础命令
const args = process.argv.slice(2);
if (args.length === 0) {
  main();
} else {
  console.log('暂时还不支持更多的命令');
  main();
}

module.exports = main; // 如果需要将 main 函数导出用于其他文件
