import { EventCommands } from '@/core/interface/event';
import { EventManager } from '@/core/interface';
import { EventHandler, EventOptions } from '@/core/interface';
import { InteractiveAttribute, AriaStateAttribute } from '@/core/interface/event';

interface EventAction {
  setAttribute: (attr: string, value: string | number | boolean) => void;
  removeAttribute: (attr: string) => void;
  focus: () => void;
  blur: () => void;
  click: () => void;
  onGlobal: <T=any>(eventName: string, handler: EventHandler<T>, options?: EventOptions) => void;
  offGlobal: <T=any>(eventName: string, handler: EventHandler<T>) => void;
  onceGlobal: <T=any>(eventName: string, handler: EventHandler<T>) => void;
  clearGlobal: () => void;
}

// todo 延迟初始化？

export const createEventComment = (eventManager:EventManager & EventAction): EventCommands => {
  const MAX_PRIORITY = 1;
  let focusPriority: number = -1;

  // 将我们的优先级映射到 tabIndex
  const mapPriorityToTabIndex = (priority: number): number => {
    // 负数直接映射到 -1
    if (priority < 0) return -1;

    // 0 映射到 0
    if (priority === 0) return 0;

    // 将 0-1 映射到 0,1-infinity
    return Math.ceil(MAX_PRIORITY / priority);
  }



  return {
    // TODO: 基本的交互方式
    focus: {
      setPriority: (priority: number): void => {
        const tabIndex = mapPriorityToTabIndex(priority);
        eventManager.setAttribute('tabindex', String(tabIndex));
        eventManager.setAttribute('focusable', String(priority >= 0));
        focusPriority = priority;
      },
      getPriority: (): number => {
        return focusPriority;
      },
      set: (focus: boolean): void => {
        if (focus) {
          eventManager.focus();
        } else {
          eventManager.blur();
        }
      }
    },


    // blur: (): void => {
    //   eventManager.blur();
    // },

    click: () => {
      eventManager.click();
    },

      /**
   * 属性命令
   */
    setAttribute: (attr: InteractiveAttribute | AriaStateAttribute, value: string | number | boolean): void => {
      eventManager.setAttribute(attr, value);
    },
    removeAttribute: (attr: InteractiveAttribute | AriaStateAttribute): void => {
      eventManager.removeAttribute(attr);
    },  

    

  /**
   * 事件命令
   */
  on: <T>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void => {
    eventManager.on(eventName, handler, options);
  },

  off: <T>(eventName: string, handler: EventHandler<T>): void => {
    eventManager.off(eventName, handler);
  },


  once: <T>(eventName: string, handler: EventHandler<T>): void => {
    eventManager.once(eventName, handler);
  },

  emit: <T>(eventName: string, detail: T): void => {
    eventManager.emit(eventName, detail);
  },


  /**
   * 清理命令
   */
  clearAll:()=>{
    eventManager.clearAll();
  },

  onGlobal: <T>(eventName: string, handler: EventHandler<T>, options?: EventOptions): void => {
    eventManager.onGlobal(eventName, handler, options);
  },

  offGlobal: <T>(eventName: string, handler: EventHandler<T>): void => {
    eventManager.offGlobal(eventName, handler);
  },

  onceGlobal: <T>(eventName: string, handler: EventHandler<T>): void => {
    eventManager.onceGlobal(eventName, handler);
  },

  clearGlobal:()=>{
    eventManager.clearGlobal();
  }

  };
}; 