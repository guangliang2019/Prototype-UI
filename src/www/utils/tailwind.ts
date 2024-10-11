
export function optimizeTailwindClasses(classString: string) {
  const classes = classString.split(' ');
  const classMap: Record<string, string> = {};

  classes.forEach((cls) => {
    // 提取类名中的前缀和数值，例如：px-4 -> ['px-', '4']
    const match = cls.match(/^(\w+-)(\d+)/);
    if (match) {
      const [_, prefix, value] = match;
      // 以前缀为键，始终更新为最新的类
      classMap[prefix] = `${prefix}${value}`;
    } else {
      // 对于不符合上述模式的类，直接保留
      classMap[cls] = cls;
    }
  });

  // 将所有处理后的类名组合成一个字符串返回
  return Object.values(classMap).join(' ');
}
