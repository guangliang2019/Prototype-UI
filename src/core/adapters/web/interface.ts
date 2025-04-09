/**
 * Web 平台特有的接口定义
 */

/**
 * Web 属性管理器接口
 * 用于管理 Web 平台特有的属性操作
 */
export interface WebAttributeManager {
  /**
   * 设置属性
   */
  setAttribute(attr: string, value: string | number | boolean): void;

  /**
   * 移除属性
   */
  removeAttribute(attr: string): void;

  /**
   * 监听属性变化
   */
  watch(name: string, callback: (oldValue: any, newValue: any) => void): void;

  /**
   * 获取被观察的属性列表
   */
  getObservedAttributes(): string[];

  /**
   * 处理属性变化
   */
  handleChange(name: string, oldValue: any, newValue: any): void;

  /**
   * 销毁管理器
   */
  destroy(): void;
}
