import { definePrototype } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { asSwitch, asSwitchThumb } from '@/core/components/switch';

export const PrototypeSwitch = WebComponentAdapter(definePrototype(asSwitch));
export const PrototypeSwitchThumb = WebComponentAdapter(definePrototype(asSwitchThumb));


customElements.define('prototype-new-switch', PrototypeSwitch);
customElements.define('prototype-new-switch-thumb', PrototypeSwitchThumb);

export default PrototypeSwitch; 
