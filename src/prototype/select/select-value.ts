import { ContextConsumer } from '@/common';
import { PrototypeSelectContext, SelectValueProps } from './interface';

export default class PrototypeSelectValue<T extends PrototypeSelectContext = PrototypeSelectContext>
  extends ContextConsumer<T>
  implements SelectValueProps
{
  protected _consumerKeys =(['prototype-select']);

  protected _content: HTMLElement = document.createElement('span');

  renderValue: (value: string) => HTMLElement = (value) => {
    const span = document.createElement('span');
    span.textContent = value;
    return span;
  };

  private _handlePrototypeSelectContextChange = (
    _: T['prototype-select'],
    keys: (keyof T['prototype-select'])[]
  ) => {
    if (keys.includes('value')) this._render();
  };

  connectedCallback() {
    super.connectedCallback();
    this._contextValues['prototype-select'].valueRef = this;
    this._render();
    this.addContextListener('prototype-select', this._handlePrototypeSelectContextChange);
  }

  disconnectedCallback() {
    this.removeContextListener('prototype-select', this._handlePrototypeSelectContextChange);
  }

  protected _render() {
    if (this.firstChild) this.removeChild(this._content);
    const contextValue = this._contextValues['prototype-select'];
    this._content = this.renderValue(contextValue.value);
    this.appendChild(this._content);
  }
}

customElements.define('prototype-select-value', PrototypeSelectValue);
