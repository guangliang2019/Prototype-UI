/**
 * Vue 平台特有的接口定义
 */

/**
 * Vue 属性管理器接口
 * 用于管理 Vue 平台特有的属性操作
 */
export interface VueAttributeManager {
  /**
   * 设置属性
   * @param attr 属性名
   * @param value 属性值
   */
  setAttribute(attr: string, value: any): void;

  /**
   * 移除属性
   * @param attr 属性名
   */
  removeAttribute(attr: string): void;

  // todo: 先放着，可能会根据需要修改
  /**
   * 监听属性变化
   * @param name 属性名
   * @param callback 回调函数
   */
  watch(name: string, callback: (newValue: any, oldValue: any) => void): void;

  /**
   * 获取被观察的属性列表
   */
  getObservedAttributes(): string[];

  /**
   * 处理属性变化
   * @param name 属性名
   * @param newValue 新值
   * @param oldValue 旧值
   */
  handleChange(name: string, newValue: any, oldValue: any): void;

  /**
   * 销毁管理器
   */
  destroy(): void;
}