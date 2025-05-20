import { LifecycleManager } from '@/core/interface';

export const createVueLifecycleManager = (): LifecycleManager => {
  const _callbacks = new Map<string, Set<() => void>>();
  const _triggeredTypes = new Set<string>();

  return {
    add: (type: string, callback: () => void) => {
      if (!_callbacks.has(type)) {
        _callbacks.set(type, new Set());
      }
      _callbacks.get(type)!.add(callback);
    },
    trigger: (type: string) => {
      _triggeredTypes.add(type);
      _callbacks.get(type)?.forEach((callback) => callback());
    },
    clear: (type: string) => {
      if (type) {
        _callbacks.get(type)?.clear();
        _triggeredTypes.delete(type);
      } else {
        _callbacks.clear();
        _triggeredTypes.clear();
      }
    },
    hasTriggered: (type: string) => {
      return _triggeredTypes.has(type);
    },
  };
};
