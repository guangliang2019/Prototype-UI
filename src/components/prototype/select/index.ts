import { definePrototype } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import {
  asSelect,
  asSelectContent,
  asSelectItem,
  asSelectTrigger,
  asSelectValue,
} from '@/core/components/select';

export const PrototypeSelect = WebComponentAdapter(definePrototype(asSelect));
export const PrototypeSelectTrigger = WebComponentAdapter(definePrototype(asSelectTrigger));
export const PrototypeSelectContent = WebComponentAdapter(definePrototype(asSelectContent));
export const PrototypeSelectItem = WebComponentAdapter(definePrototype(asSelectItem));
export const PrototypeSelectValue = WebComponentAdapter(definePrototype(asSelectValue));

customElements.define('prototype-select', PrototypeSelect);
customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
customElements.define('prototype-select-content', PrototypeSelectContent);
customElements.define('prototype-select-item', PrototypeSelectItem);
customElements.define('prototype-select-value', PrototypeSelectValue);