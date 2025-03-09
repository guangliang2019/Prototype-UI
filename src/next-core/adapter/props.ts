import { PropType } from './interface';

/**
 * 可以被序列化到 attribute 的类型
 */
export type SerializablePropType = string | number | boolean;

/**
 * Props 的序列化规则
 */
export interface SerializationRule {
  /**
   * 是否同步到 attribute
   */
  reflectToAttribute?: boolean;

  /**
   * 自定义序列化函数
   */
  serialize?: (value: any) => string | null;

  /**
   * 自定义反序列化函数
   */
  deserialize?: (value: string) => any;
}

/**
 * Props 的配置选项
 */
export interface PropsOptions<T extends Record<string, PropType>> {
  /**
   * 默认值
   */
  defaultProps?: Partial<T>;

  /**
   * 序列化规则
   */
  serialization?: {
    [K in keyof T]?: SerializationRule;
  };
}

/**
 * Props 管理器接口
 */
export interface PropsManager<T extends Record<string, PropType> = any> {
  /**
   * 获取当前的 props
   */
  getProps(): T;

  /**
   * 更新 props
   * @param props 要更新的 props
   */
  setProps(props: Partial<T>): void;

  /**
   * 序列化 prop 到 attribute
   * @param name prop 名称
   * @param value prop 值
   */
  serializeToAttribute(name: keyof T, value: T[keyof T]): string | null;

  /**
   * 从 attribute 反序列化到 prop
   * @param name attribute 名称
   * @param value attribute 值
   */
  deserializeFromAttribute(name: string, value: string): any;

  /**
   * 监听 props 变化
   * @param callback 变化回调
   * @returns 取消监听的函数
   */
  onPropsChange(callback: (props: T) => void): () => void;
}

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
