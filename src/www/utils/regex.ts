import { HighlightRule } from '@/www/components/doc-component';

type MatchResult = {
  text: string;
  className: string; // 使用 null 标记没有被任何正则匹配的部分
};

export function splitByHighlightRules(input: string, rules: HighlightRule[]): MatchResult[] {
  let results: MatchResult[] = [];
  let currentIndex = 0;

  while (currentIndex < input.length) {
    let earliestMatch = {
      index: Infinity,
      endIndex: Infinity,
      regexIndex: -1,
      matchText: '',
    };

    // 找到最早的匹配结果
    rules.forEach((rule, i) => {
      let localIndex = input.substring(currentIndex).search(rule.regex);
      if (localIndex !== -1) {
        localIndex += currentIndex; // 转换为原始字符串中的索引
        const matchResult = input.substring(localIndex).match(rule.regex);
        if (matchResult) {
          // 确保 matchResult 非空
          const matchLength = matchResult[0].length;
          if (localIndex < earliestMatch.index) {
            earliestMatch = {
              index: localIndex,
              endIndex: localIndex + matchLength,
              regexIndex: i,
              matchText: input.substring(localIndex, localIndex + matchLength),
            };
          }
        }
      }
    });

    // 检查是否有未匹配的间隙
    if (currentIndex < earliestMatch.index) {
      results.push({ text: input.slice(currentIndex, earliestMatch.index), className: '' });
    }

    // 添加找到的最早匹配结果
    if (earliestMatch.regexIndex !== -1) {
      results.push({
        text: earliestMatch.matchText,
        className: rules[earliestMatch.regexIndex].className,
      });
      currentIndex = earliestMatch.endIndex; // 更新当前索引
    } else {
      // 如果没有匹配，退出循环
      break;
    }
  }

  return results;
}

export const HIGHLIGHT_RULE = {
  htmlTagName: {
    regex: /\b(div|span|a|p|ul|ol|li|h[1-6]|br|hr|input|form|script)\b(?=[^>]*>)/,
    className: 'html-tag-name',
  } as HighlightRule,
  shadcnTagName: {
    regex: /\b(shadcn-[a-z0-9-]*)\b/,
    className: 'custom-html-tag-name',
  } as HighlightRule,
  prototypeTagName: {
    regex: /\b(prototype-[a-z0-9-]*)\b/,
    className: 'custom-html-tag-name',
  } as HighlightRule,
  upperCamelCase: {
    regex: /\b[A-Z][a-z]+(?:[A-Z][a-z]+)*\b/,
    className: 'upper-camel-case',
  },
} as const;
