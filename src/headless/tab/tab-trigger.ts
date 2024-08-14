import { useContext } from '../../common/context-provider';
import { TabContext, TabTrigerProps } from './interface';

export default class HeadlessTabTrigger extends HTMLElement implements TabTrigerProps {
  private _value = '';

  get value(): string {
    return this._value;
  }
  connectedCallback() {
    this._value = this.getAttribute('value') || '';
    this._render();
  }

  private _render() {
    const consumer = useContext<TabContext>('headless-tab', this);
    this.addEventListener('click', () => {
      consumer.contextValue.changeTab(this._value);
    });
  }
}

customElements.define('headless-tab-trigger', HeadlessTabTrigger);
