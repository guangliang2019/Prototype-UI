import { ComponentPublicInstance, defineComponent, onMounted, onUnmounted } from 'vue';
import { Context, Prototype } from '@/core';
import { PrototypeSetupResult } from '@/core/interface';
type Constructor<T> = new (...args: any[]) => T;
import type { PrototypeAPI, State, UpdateContext } from '@/core/interface';


type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void

type VueInstance<T extends HTMLElement> = T ;

export interface VueComponentStatic {
  readonly observedAttributes: string[];
}

export type VueConstructor<T extends HTMLElement> = Constructor<VueInstance<T>> & VueComponentStatic;

/**
 * 
 * Vue 适配器
 * 将组件原型转换为 Vue 
 */
export const VueAdapter = <Props extends {}, Exposes extends {} ={}>(
  prototype: Prototype<Props, Exposes>
): VueConstructor<HTMLElement> => {
  const Constructor = defineComponent({
    name: prototype.name,
    setup(Constructor) {
      let _exposes: Exposes = {} as Exposes;
      const createHooks  = () : PrototypeAPI<Props, Exposes> => {
        return {
         expose: {
          define: () => {},
          get: (key) => { _exposes[key] }
         },
         lifecycle: {

         },
         props: {
           
         },
         state: {
           
         },
         context: {
           
         },
         role: {

         },
         view: {

         }, 

        };
      }
      const setup = prototype.setup(createHooks) ?? (() => {});

      onMounted(() => {
        if(){

        }
      });
  
      onUnmounted(() => {
        
      });
  
      return {};
    }
  })
  
  return Constructor as unknown as VueConstructor<HTMLElement>;
  

}