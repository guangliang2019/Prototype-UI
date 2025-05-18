import { StateManager, State } from '@/core/interface';
import { ref, Ref } from 'vue';

export const createStateManager = (): StateManager => {
  // 存储所有状态
  const states = new Map<string, Ref<any>>();
  // 存储公开状态（用于 getStates）
  const publicStates = new Map<string, any>();
  let _currentAttribute: string | undefined;
  let _currentStateType: unknown;
  let stateIndex = 0;


  
  return {
    useState: <T>(): State<T> => {
      const state ={};
      return state as State<T>;
    },

    getStates: () => {
      return Object.fromEntries(publicStates);
    },

    clear: () => {
      states.clear();
      publicStates.clear();
    }
  };
};
