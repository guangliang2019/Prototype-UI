import { PropsManager, PropsOptions, SerializationRule } from '@/core/interface';
import { ComponentInternalInstance, getCurrentInstance, watch } from 'vue';
import { camelToKebab, kebabToCamel } from '@/core/utils/naming';


export const createPropsManager = <T extends object>(element:ComponentInternalInstance, options: PropsOptions<T> = {}): PropsManager<T> => {
  const instance = element;
  if (!instance) {
    throw new Error('[VuePropsManager] getCurrentInstance() must be called inside setup().');
  }
  const vueProps = instance.props as T;

  // 添加一个 Set 来存储回调函数
  const changeCallbacks = new Set<(props: T) => void>();


  return {
    getProps: () => vueProps,
    setProps: (_props: Partial<T>) => {
      // Vue 的 props 是只读的，不能直接修改
      console.warn('[VuePropsManager] Props are read-only in Vue');
    },
    serializeToAttribute: () => {
      throw new Error('[VuePropsManager] not should serializeToAttribute in Vue');
    },
    deserializeFromAttribute: () => {
      throw new Error('[VuePropsManager] not should deserializeFromAttribute in Vue');
    },
    // 这里应该跟webComponent的一样 
    onPropsChange: (callback: (props: T) => void) => {
      changeCallbacks.add(callback);
      return () => changeCallbacks.delete(callback);
    },
    defineProps: (defaultProps: T) => {
      //  这个的defaultProps 转成vue的props的类型定义， 由TS -> JS
      // todo 需要这个这个吗 缺少required属性 缺少validator支持 缺少多类型支持

      const vueProps = Object.entries(defaultProps).reduce((acc, [key, value]) => {
        const type = Object.prototype.toString.call(value).slice(8, -1);
        acc[key] = {
          type: type === 'Date' ? Date :
                 type === 'Array' ? Array :
                 type === 'String' ? String :
                 type === 'Number' ? Number :
                 type === 'Boolean' ? Boolean :
                 type === 'Function' ? Function :
                 Object,
          default: type === 'Object' || type === 'Array' ? () => value : value
        };
        return acc;
      }, {} as Record<string, any>);
      
      return vueProps;
    }
  };
};
