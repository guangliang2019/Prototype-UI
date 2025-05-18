import { PropsManager, PropsOptions, SerializationRule } from '@/core/interface';
import { getCurrentInstance, watch } from 'vue';
import { camelToKebab, kebabToCamel } from '@/core/utils/naming';


export const createPropsManager = <T extends object>(options: PropsOptions<T> = {}): PropsManager<T> => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('[VuePropsManager] getCurrentInstance() must be called inside setup().');
  }
  const vueProps = instance.props as T;

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
    // issue: 这里在原型是如何触发呢？以及在什么情况下会触发
    onPropsChange: (callback: (props: T) => void) => {
      // 直接使用 Vue 的 watch，Vue 会自动处理清理工作
      watch(
        () => ({ ...vueProps }),
        (newVal) => callback(newVal as T),
        { deep: true, immediate: true }
      );
      // 返回一个空函数以满足接口要求
      return () => {};
    },
    defineProps: (defaultProps: T) => {
      // TODO: 这个的defaultProps 转成vue的props的类型定义， 由TS -> JS
      //defineProps(defaultProps);
    }
  };
};
