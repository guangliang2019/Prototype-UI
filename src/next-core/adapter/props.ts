import { PropsOptions, PropType, SerializationRule } from '../interface';

/**
 * 创建 Props 配置
 */
export function defineProps<T extends Record<string, PropType>>(
  options: PropsOptions<T> = {}
): PropsOptions<T> {
  return options;
}

/**
 * 默认的序列化规则
 */
export const defaultSerializationRules: Required<SerializationRule> = {
  reflectToAttribute: false,
  serialize: (value: any) => {
    if (typeof value === 'boolean') {
      // 布尔值为 true 时设置空字符串，为 false 时移除属性
      return value ? '' : null;
    }
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    return null;
  },
  deserialize: (value: string) => {
    // 1. 对于布尔类型，属性存在就是 true（无论值是什么）
    if (value === null) return false; // 属性不存在
    if (typeof value === 'string') {
      // 2. 尝试解析数字
      if (/^-?\d+$/.test(value)) return parseInt(value, 10);
      if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value);
    }
    // 3. 其他情况返回原始字符串
    return value;
  },
};
