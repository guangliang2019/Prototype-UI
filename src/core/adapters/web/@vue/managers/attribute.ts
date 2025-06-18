import { InteractionManager } from './interaction-manager';
import { VueAttributeManager } from './interface';
import { 
  INTERACTIVE_ATTRIBUTES, 
  ARIA_STATE_ATTRIBUTES, 
  ARIA_CONTEXT_ATTRIBUTES
} from './types';
export const VueAttributeManagerImpl = (element: HTMLElement, targetElement: HTMLElement): VueAttributeManager => {
    // 存储被观察的属性和回调
    const callbacks = new Map<string, Set<(newValue: any, oldValue: any) => void>>();
    let attributeObserver: MutationObserver | null = null;
    let styleObserver: MutationObserver | null = null;
    let _interactionManager = InteractionManager(element, targetElement);
    // 设置属性观察器
    const setupAttributeObserver = () => {
      attributeObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes') {
            const attr = mutation.attributeName;
            const newValue = element.getAttribute(attr as string);
            const oldValue = mutation.oldValue;
            handleChange(attr as string, newValue, oldValue);

            if(INTERACTIVE_ATTRIBUTES.includes(attr as any) || ARIA_STATE_ATTRIBUTES.includes(attr as any)) {
              syncAttribute(attr as string);
            }
            else if(ARIA_CONTEXT_ATTRIBUTES.includes(attr as any) && !targetElement.hasAttribute(attr as any)) {
              syncAttribute(attr as string);
            }

          }
        }
      });
    };

    const syncAttribute = (attr: string) => {
      const value = element.getAttribute(attr);
      if(value === null) {
        targetElement.removeAttribute(attr);
      } else {
        targetElement.setAttribute(attr, value);
      }
    };
    // 设置样式观察器
    const setupStyleObserver = () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const newValue = element.getAttribute('style');
                    const oldValue = mutation.oldValue;
                    handleChange('style', newValue, oldValue);
                }
            });
        });

        observer.observe(element, {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true
        });

        return observer;
    };


    setupAttributeObserver();
    setupStyleObserver();
    
    const handleChange = (name: string, newValue: any, oldValue: any) => {
        callbacks.get(name)?.forEach(callback => callback(newValue, oldValue));
    };


    return {
        setAttribute: (attr: string, value: any) => {
            if (element instanceof HTMLElement) {
                element.setAttribute(attr, String(value));
            }
        },

        removeAttribute: (attr: string) => {
            if (element instanceof HTMLElement) {
                element.removeAttribute(attr);
            }
        },

        watch: (name: string, callback: (newValue: any, oldValue: any) => void) => {
            if (!callbacks.has(name)) {
                callbacks.set(name, new Set());
            }
            callbacks.get(name)!.add(callback);
        },

        getObservedAttributes: ():string[] => {
            return Array.from(callbacks.keys());
        },

        handleChange: handleChange,
        destroy: () => {
            attributeObserver?.disconnect();
            styleObserver?.disconnect();
            attributeObserver = null;
            styleObserver = null;
        },
        // todo
        // focus: () => {
        //   _interactionManager.focus();
        // },
        // blur: () => {
        //   _interactionManager.blur();
        // },
        // click: () => {
        //   _interactionManager.click();
        // },
        
    };
};