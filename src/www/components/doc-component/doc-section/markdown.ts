import { h } from '@/www/utils/dom';

export default function markdown(str: string) {
  const content = h('div', {}, compileBlocks(str));
  return content;
}

const styles = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
  h3: 'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
  code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
};

const trim = (str: string) => str?.replace(/(^\s*)|(\s*$)/g, '');

function compileBlocks(str: string) {
  const blocks = str
    .split('\n')
    .map(trim)
    .filter((str) => str);
  let currUl: string[] = [];
  const compileBlock = (str: string, i: number) => {
    if (str.indexOf('### ') === 0) return h('h3', { class: styles.h3 }, [str.slice(4)]);
    // 二级标题 h2
    if (str.indexOf('## ') === 0) return h('h2', { class: styles.h2 }, [str.slice(3)]);
    // 一级标题 h1
    if (str.indexOf('# ') === 0) return h('h1', { class: styles.h1 }, [str.slice(2)]);
    // 无序列表 ul
    if (str.indexOf('- ') === 0) {
      currUl.push(str.slice(2));
      if (currUl.length > 0 && blocks[i + 1]?.indexOf('- ') !== 0) {
        const ulContent = currUl.slice(0);
        const ul = h(
          'ul',
          { class: styles.ul },
          ulContent.map((item) => h('li', {}, [compileInline(item)]))
        );
        currUl = [];
        return ul;
      }
      return new DocumentFragment();
    }
    // 段落 p
    return h('p', { class: styles.p }, [compileInline(str.slice(0))]);
  };

  return blocks.map((str, i) => compileBlock(str, i));
}

/**
 * Compiles markdown content into HTML, only for one paragraph or one line of text
 * @param content markdown content
 * @returns HTML Fragment containing the markdown content
 */
function compileInline(content: string) {
  const fragment = document.createDocumentFragment();
  const curr = {
    jump: false,
    text: '',
    special: '',
  };
  const clearSpecial = () => {
    curr.text += curr.special;
    curr.special = '';
  };
  for (const char of content) {
    if (curr.jump) {
      curr.text += char;
      curr.jump = false;
      continue;
    }
    switch (char) {
      case '\\':
        curr.jump = true;
        break;
      case '[':
        curr.special += char;
        break;
      case ')':
        curr.special += char;
        if (curr.special?.[0] !== '[') clearSpecial();
        if (curr.special.includes('](')) {
          fragment.appendChild(h('span', {}, [curr.text]));
          const [title, url] = curr.special.slice(1, -1).split('](');
          fragment.appendChild(h('a', { href: url, target: '_blank' }, [title]));
          curr.text = '';
          curr.special = '';
        } else clearSpecial();
        break;
      case '`':
        if (curr.special?.[0] !== '`') {
          clearSpecial();
          curr.special += char;
        } else {
          curr.special += char;
          fragment.appendChild(h('span', {}, [curr.text]));
          fragment.appendChild(h('code', { class: styles.code }, [curr.special.slice(1, -1)]));
          curr.text = '';
          curr.special = '';
        }
        break;
      default:
        if (curr.special?.[0] === '[' || curr.special?.[0] === '`') curr.special += char;
        else curr.text += char;
        break;
    }
  }
  if (curr.special) clearSpecial();
  if (curr.text) fragment.appendChild(h('span', {}, [curr.text]));
  return fragment;
}
