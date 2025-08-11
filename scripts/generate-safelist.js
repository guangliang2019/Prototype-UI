import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * 匹配 tailwind 和常见自定义 kebab-case className，包括复杂状态前缀（如 data-[leave]:scale-95）
 * 支持如下格式：
 * - bg-primary
 * - hover:bg-primary/90
 * - focus-visible:ring-1
 * - data-[open]:scale-100
 * - data-[leave]:data-[closed]:scale-95
 * - px-4 py-2
 * - rounded-md
 */

const RESERVED_KEYWORDS = new Set([
  'if','else','return','super','const','let','var','function','true','false','null','undefined','import','export','this','type','setup','view','states','state','props','value','case','break','switch','void','name','string','watch','update','get','set','from','style','handle','join','length','forEach'
]);

function filterValidClass(cls) {
  if (!cls) return false;
  if (cls.length < 2 || cls.length > 50) return false;
  if (/^\d+$/.test(cls)) return false; // 纯数字
  if (/^[-_]+$/.test(cls)) return false; // 纯符号
  if (RESERVED_KEYWORDS.has(cls)) return false;
  if (/^[A-Z][a-zA-Z0-9_]+$/.test(cls)) return false; // PascalCase
  if (/^[\[\]"]+$/.test(cls)) return false; // 单独括号引号
  if (cls.startsWith('-') && !/^-?\d+(\.\d+)?(px|rem|em|%)?$/.test(cls)) return false; // -xxx 不是合法 tailwind
  if (cls.startsWith('[') && !cls.endsWith(']')) return false; // [xxx 不是合法 tailwind
  if (cls.includes('/') && !/^[a-z-]+\/[a-z0-9\-]+$/.test(cls)) return false; // 除合法分数/斜线外，其它包含斜线的通常不是class
  if (!/[-_:.\[\]]/.test(cls)) return false; // 没有常见 tailwind 分隔符（纯单词）
  // 允许 aria-、data-、before:、after:、hover:、focus:、peer 等
  if (!/^([a-z0-9]+([-_:.\[\]]|$)|aria-|data-|before:|after:|hover:|focus:|peer|file:)/.test(cls)) return false;
  // 强过滤特殊变量片段（自定义补充）
  if (cls.startsWith('_') || cls.includes('SHADCN_') || cls.includes('originalCls') || cls.includes('computedClass')) return false;
  // 新增单例右括号/拼接遗留过滤
  if (/^[a-z0-9\-]*\]$/.test(cls) && !cls.includes('[')) return false; // 没有配对左括号
  if (cls === ']' || cls === '-]' || cls === ':]') return false; // 单纯右括号
  // 可按需添加其它规则
  return true;
}

const TAILWIND_CLASS_REGEX = /(?:(?:[a-z0-9\-]+\:)*[a-z0-9_\[\]\-\/]+)+/gi;

// 允许的文件扩展名
const FILE_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx', '.astro', '.vue', '.svelte', '.html',
];

const COMPONENTS_DIR = path.join(process.cwd(), 'src/components/shadcn');
const OUT_PATH = path.join(process.cwd(), 'scripts/safelist.json');

function getAllFiles(dir, exts) {
  return glob.sync(`${dir}/**/*`, { nodir: true })
    .filter(f => exts.includes(path.extname(f)));
}

function extractClasses(fileContent) {
  // 只匹配 className/class/class:、:class=、class=、以及字符串数组/模板字符串中的内容
  // 允许中间出现 []/{} ()，最大兼容模板写法
  const ALL_CLASSES = [];
  // 匹配 className/class=/"..." 等字符串字面量里的内容
  const CLASS_ATTR_REGEX = /class(Name)?\s*=\s*["'`{]([^"'`}]+)["'`}]?/g;

  let match;
  while ((match = CLASS_ATTR_REGEX.exec(fileContent)) !== null) {
    ALL_CLASSES.push(match[2]);
  }

  // 也尝试直接扫描全部 kebab-case class（例如模板拼接、映射表里的）
  // 不捕获非 class 属性字符串里的内容以免误报
  let extraMatches = fileContent.match(TAILWIND_CLASS_REGEX);
  if (extraMatches) {
    ALL_CLASSES.push(...extraMatches);
  }

   // 去重与过滤
   const result = [];
   ALL_CLASSES.forEach(clsStr => {
     if (!clsStr) return;
     clsStr.split(/[\s\n\t]+/g).forEach(c => {
       if (filterValidClass(c)) result.push(c);
     });
   });

  return result;
}

function main() {
  const files = getAllFiles(COMPONENTS_DIR, FILE_EXTENSIONS);
  const safelistSet = new Set();

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const classes = extractClasses(content);
    classes.forEach(cls => safelistSet.add(cls));
  });

  // 按字母排序输出
  const safelist = Array.from(safelistSet).sort();
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(safelist, null, 2));
  console.log(`✔️  Safelist generated: ${OUT_PATH}  (${safelist.length} classes)`);
}

main();
