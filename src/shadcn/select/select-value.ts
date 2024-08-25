import { PrototypeSelectValue } from '@/prototype/select';

export default class ShadcnSelectValue extends PrototypeSelectValue {
  renderValue: (value: string) => HTMLElement = (value: string) => {
    const span = document.createElement('span');
    span.style.fontSize = '30px';
    span.textContent = value;
    return span;
  };
}

customElements.define('shadcn-select-value', ShadcnSelectValue);
