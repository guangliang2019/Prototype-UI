import { h } from '@/www/utils/dom';

// 样式定义
const styles = {
  a: 'font-medium text-primary underline underline-offset-4',
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
  h3: 'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
  h6: 'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
  ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
  code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  codeBlock: 'relative rounded font-mono text-sm',
  pre: 'mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-100 dark:bg-zinc-900 py-4 px-4',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  hr: 'my-4 md:my-8',
  table: 'my-6 w-full overflow-hidden',
  th: 'border px-4 py-2 text-left font-medium [&[align=center]]:text-center [&[align=right]]:text-right',
  td: 'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
};

// 工具函数
const trim = (str: string) => str?.replace(/(^\s*)|(\s*$)/g, '');
const isBlank = (str: string) => !str || /^\s*$/.test(str);

// 块级元素类型
type BlockType = 'paragraph' | 'heading' | 'list' | 'code' | 'blockquote' | 'hr' | 'table';

// 块级元素状态
interface BlockState {
  type: BlockType;
  content: string[];
  indent: number;
  listType?: 'ul' | 'ol';
  listMarker?: string;
}

// 行内元素类型
type InlineType = 'text' | 'link' | 'code' | 'strong' | 'em' | 'del';

// 行内元素状态
interface InlineState {
  type: InlineType;
  content: string;
  start: number;
  end: number;
}

export default function markdown(str: string) {
  const content = h('div', {}, parseBlocks(str));
  return content;
}

function parseBlocks(str: string) {
  const lines = str.split('\n');
  const blocks: HTMLElement[] = [];
  let currentBlock: BlockState | null = null;
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmedLine = trim(line);

    // 处理代码块
    if (/^```\w*$/.test(trimmedLine)) {
      if (!inCodeBlock) {
        // 开始新的代码块
        if (currentBlock) {
          blocks.push(processBlock(currentBlock));
        }
        currentBlock = {
          type: 'code',
          content: [trimmedLine],
          indent: getIndentLevel(line),
        };
        inCodeBlock = true;
      } else {
        // 结束当前代码块
        if (currentBlock) {
          currentBlock.content.push(trimmedLine);
          blocks.push(processBlock(currentBlock));
          currentBlock = null;
        }
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      // 在代码块中，直接添加行
      if (currentBlock) {
        currentBlock.content.push(line);
      }
      continue;
    }

    // 检测其他块级元素类型
    const blockType = detectBlockType(trimmedLine);

    if (blockType && blockType !== 'code') {
      // 如果当前块存在，先处理它
      if (currentBlock) {
        blocks.push(processBlock(currentBlock));
      }

      // 创建新块
      currentBlock = {
        type: blockType,
        content: [line],
        indent: getIndentLevel(line),
      };

      // 特殊处理列表
      if (blockType === 'list') {
        const match = line.match(/^(\s*)([-*+]|\d+\.)\s+/);
        if (match) {
          currentBlock.indent = match[1].length;
          currentBlock.listType = /^\d+\./.test(match[2]) ? 'ol' : 'ul';
          currentBlock.listMarker = match[2];
        }
      }
    } else if (currentBlock) {
      // 继续当前块
      currentBlock.content.push(line);
    }
  }

  // 处理最后一个块
  if (currentBlock) {
    blocks.push(processBlock(currentBlock));
  }

  return blocks;
}

function detectBlockType(line: string): BlockType | null {
  const trimmedLine = trim(line);
  if (/^#{1,6}\s/.test(trimmedLine)) return 'heading';
  if (/^[-*+]\s/.test(trimmedLine) || /^\d+\.\s/.test(trimmedLine)) return 'list';
  if (/^```\w*$/.test(trimmedLine)) return 'code';
  if (/^>\s/.test(trimmedLine)) return 'blockquote';
  if (/^[-*_]{3,}$/.test(trimmedLine)) return 'hr';
  if (/^\|/.test(trimmedLine)) return 'table';
  return 'paragraph';
}

function getIndentLevel(line: string): number {
  const match = line.match(/^\s*/);
  return match ? match[0].length : 0;
}

function processBlock(block: BlockState): HTMLElement {
  switch (block.type) {
    case 'heading':
      return processHeading(block);
    case 'list':
      return processList(block);
    case 'code':
      return processCode(block);
    case 'blockquote':
      return processBlockquote(block);
    case 'hr':
      return h('hr', { class: styles.hr });
    case 'table':
      return processTable(block);
    default:
      return processParagraph(block);
  }
}

function processHeading(block: BlockState): HTMLElement {
  const content = trim(block.content[0]);
  const match = content.match(/^(#{1,6})\s/);
  if (!match) return h('p', { class: styles.p }, [parseInline(content)]);

  const level = match[1].length;
  const text = content.slice(match[0].length);
  const tag = `h${Math.min(level, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return h(tag, { class: styles[tag] }, [parseInline(text)]);
}

function processList(block: BlockState): HTMLElement {
  const items = block.content.map((line) => {
    const text = line.replace(/^\s*[-*+]\s+|\d+\.\s+/, '');
    return h('li', {}, [parseInline(text)]);
  });
  return h(block.listType || 'ul', { class: styles[block.listType || 'ul'] }, items);
}

function processCode(block: BlockState): HTMLElement {
  const content = block.content.slice(1, -1).join('\n');
  const codeElement = h('code', { class: styles.codeBlock }, []);
  codeElement.textContent = content;
  return h('pre', { class: styles.pre }, [codeElement]);
}

function processBlockquote(block: BlockState): HTMLElement {
  const content = block.content.map((line) => line.replace(/^>\s*/, '')).join('\n');
  return h('blockquote', { class: styles.blockquote }, [parseInline(content)]);
}

function processTable(block: BlockState): HTMLElement {
  const rows = block.content.map((line) => {
    const cells = line
      .split('|')
      .map((cell) => trim(cell))
      .filter((cell) => cell);
    return cells;
  });

  const thead = h('thead', {}, [
    h(
      'tr',
      {},
      rows[0].map((cell) => h('th', { class: styles.th }, [parseInline(cell)]))
    ),
  ]);

  const tbody = h(
    'tbody',
    {},
    rows.slice(1).map((row) =>
      h(
        'tr',
        {},
        row.map((cell) => h('td', { class: styles.td }, [parseInline(cell)]))
      )
    )
  );

  return h('table', { class: styles.table }, [thead, tbody]);
}

function processParagraph(block: BlockState): HTMLElement {
  const content = block.content.join('\n');
  return h('p', { class: styles.p }, [parseInline(content)]);
}

function parseInline(content: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  let currentText = '';
  let currentState: InlineState | null = null;
  let i = 0;

  while (i < content.length) {
    const char = content[i];

    // 处理转义字符
    if (char === '\\') {
      currentText += content[++i];
      i++;
      continue;
    }

    // 处理行内元素
    if (!currentState) {
      if (char === '[') {
        // 如果当前有文本，先添加文本节点
        if (currentText) {
          fragment.appendChild(h('span', {}, [currentText]));
          currentText = '';
        }
        currentState = { type: 'link', content: '', start: i, end: -1 };
      } else if (char === '`') {
        // 如果当前有文本，先添加文本节点
        if (currentText) {
          fragment.appendChild(h('span', {}, [currentText]));
          currentText = '';
        }
        currentState = { type: 'code', content: '', start: i, end: -1 };
      } else if (char === '*' || char === '_') {
        if (content[i + 1] === char) {
          // 如果当前有文本，先添加文本节点
          if (currentText) {
            fragment.appendChild(h('span', {}, [currentText]));
            currentText = '';
          }
          currentState = { type: 'strong', content: '', start: i, end: -1 };
          i++;
        } else {
          // 如果当前有文本，先添加文本节点
          if (currentText) {
            fragment.appendChild(h('span', {}, [currentText]));
            currentText = '';
          }
          currentState = { type: 'em', content: '', start: i, end: -1 };
        }
      } else if (char === '~' && content[i + 1] === '~') {
        // 如果当前有文本，先添加文本节点
        if (currentText) {
          fragment.appendChild(h('span', {}, [currentText]));
          currentText = '';
        }
        currentState = { type: 'del', content: '', start: i, end: -1 };
        i++;
      } else {
        currentText += char;
      }
    } else {
      // 处理当前状态
      if (currentState.type === 'link') {
        if (char === ']' && content[i + 1] === '(') {
          const linkText = currentText;
          currentText = '';
          i += 2;
          let url = '';
          while (i < content.length && content[i] !== ')') {
            url += content[i++];
          }
          fragment.appendChild(
            h(
              'a',
              {
                class: styles.a,
                href: url,
                target: '_blank',
              },
              [linkText]
            )
          );
          currentState = null;
        } else {
          currentText += char;
        }
      } else if (currentState.type === 'code') {
        if (char === '`') {
          const codeElement = h('code', { class: styles.code }, []);
          codeElement.textContent = currentText;
          fragment.appendChild(codeElement);
          currentText = '';
          currentState = null;
        } else {
          currentText += char;
        }
      } else if (
        currentState.type === 'strong' ||
        currentState.type === 'em' ||
        currentState.type === 'del'
      ) {
        const endChar =
          currentState.type === 'strong' ? '**' : currentState.type === 'del' ? '~~' : '*';
        if (content.slice(i, i + endChar.length) === endChar) {
          const tag =
            currentState.type === 'strong' ? 'strong' : currentState.type === 'em' ? 'em' : 'del';
          fragment.appendChild(h(tag, {}, [currentText]));
          currentText = '';
          currentState = null;
          i += endChar.length - 1;
        } else {
          currentText += char;
        }
      }
    }
    i++;
  }

  // 处理剩余的文本
  if (currentText) {
    fragment.appendChild(h('span', {}, [currentText]));
  }

  return fragment;
}
