const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { JSDOM } = require('jsdom');

// SVG 文件所在的目录路径
const svgDirectory = './icons';
// 组件输出目录
const outputDirectory = './output';

function kebabToPascalCase(str) {
  return (
    str
      // 将字符串按破折号分割成数组
      .split('-')
      // 将数组中每个元素（单词）的首字母大写
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      // 将处理后的单词数组合并成一个字符串
      .join('')
  );
}

function svgToWebComponent(svgString, componentName, originalName) {
  const dom = new JSDOM(svgString, { contentType: 'image/svg+xml' });
  const svgElement = dom.window.document.documentElement;
  const countMap = new Map();

  let classString = `export default class ${componentName} extends HTMLElement {
  connectedCallback() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('lucide ${originalName}');
    ${Array.from(svgElement.attributes)
      .map((attr) => `svg.setAttribute('${attr.name}', '${attr.value}');`)
      .join('\n      ')}
    ${Array.from(svgElement.children)
      .map((element) => {
        const elementType = element.tagName.toLowerCase();
        const count = countMap.get(elementType) || 0;
        countMap.set(elementType, count + 1);
        const elementVar = `${elementType}${count + 1}`;
        return `
    const ${elementVar} = document.createElementNS('http://www.w3.org/2000/svg', '${
      element.tagName
    }');
    ${Array.from(element.attributes)
      .map((attr) => `${elementVar}.setAttribute('${attr.name}', '${attr.value}');`)
      .join('\n        ')}
    svg.appendChild(${elementVar});
        `;
      })
      .join('')}
      this.appendChild(svg);
    }
  }
  customElements.define('lucide-${originalName}', ${componentName});
  `;
  return classString;
}

async function generateComponents() {
  try {
    const files = await readdir(svgDirectory);
    const svgFiles = files.filter((file) => path.extname(file) === '.svg');

    for (let file of svgFiles) {
      const filePath = path.join(svgDirectory, file);
      const svgContent = await readFile(filePath, 'utf8');
      const originalName = path.basename(file, '.svg');
      const componentName = kebabToPascalCase('lucide-' + originalName);
      const componentCode = svgToWebComponent(svgContent, componentName, originalName);

      const componentFilePath = path.join(outputDirectory, `${originalName}.ts`);
      await writeFile(componentFilePath, componentCode);
      console.log('Generated:', componentFilePath);
    }
  } catch (error) {
    console.error('Error generating components:', error);
  }
}

generateComponents();
