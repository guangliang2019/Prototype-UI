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
export interface PropsOptions<T extends object> {
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
