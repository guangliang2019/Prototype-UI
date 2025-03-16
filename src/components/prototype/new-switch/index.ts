import { definePrototype } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { asSwitch, asSwitchThumb } from '@/core/components/switch';

export const PrototypeSwitch = WebComponentAdapter(definePrototype(asSwitch));


// 注册自定义元素
customElements.define('prototype-new-switch', PrototypeSwitch);

// 导出组件以便在代码中使用
export default PrototypeSwitch; 
