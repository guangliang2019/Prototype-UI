export function optimizeTailwindClasses(classString: string) {
  const classes = classString.split(' ');
  const classMap: Record<string, string> = {};

  classes.forEach((cls) => {
    // 支持整数和小数（如 3.5）
    const match = cls.match(/^(\w+-)(\d+(?:\.\d+)?)/);
    if (match) {
      const [_, prefix, value] = match;
      classMap[prefix] = `${prefix}${value}`;
    } else {
      classMap[cls] = cls;
    }
  });

  return Object.values(classMap).join(' ');
}
