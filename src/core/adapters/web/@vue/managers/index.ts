import { Component } from '@/core/interface';
import { createPropsManager } from './props';
import { createStateManager } from './state';
import { createEventManager } from './event';
import { createContextManager } from './context';
import { createRenderManager } from './render';
import { createLifecycleManager } from './lifecycle';

export const createManagers = (): Component => {
  return {
    props: createPropsManager(),
    state: createStateManager(),
    event: createEventManager(),
    context: createContextManager(),
    render: createRenderManager(),
    lifecycle: createLifecycleManager(),
  };
}; 