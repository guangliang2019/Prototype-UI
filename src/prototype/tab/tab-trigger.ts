import { PrototypeTabContext, TabTriggerProps } from './interface';
import { Trigger } from '../../common/trigger';
import { binarySearch } from '@/www/utils/search';
import { compareDOM } from '@/www/utils/dom';

export default class PrototypeTabTrigger
  extends Trigger<PrototypeTabContext>
  implements TabTriggerProps
{
  protected _consumerKeys = new Set(['prototype-tab'] as const);
  private _value = '';

  get value(): string {
    return this._value;
  }

  private _handlePrototypeTabContextChange = (context: PrototypeTabContext['prototype-tab']) => {
    if (context.tabValue === this._value) {
      this.tabIndex = 0;
      this.setAttribute('data-selected', '');
    } else {
      this.tabIndex = -1;
      this.removeAttribute('data-selected');
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.style.cursor = 'pointer';
    this._value = this.getAttribute('value') || '';
    const context = this._contextValues['prototype-tab'];
    const insertIndex = binarySearch(context.tabRefs, this, compareDOM);
    context.tabRefs.splice(insertIndex, 0, this);
    context.tabs.splice(insertIndex, 0, this._value);

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown as EventListener);

    this.addContextListener('prototype-tab', this._handlePrototypeTabContextChange);

    // 初始化默认选中状态
    if (this._value === this.contextValues['prototype-tab'].defaultValue) {
      this.contextValues['prototype-tab'].changeTab(this._value);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown as EventListener);

    this.removeContextListener('prototype-tab', this._handlePrototypeTabContextChange);

    const context = this._contextValues['prototype-tab'];
    const removeIndex = binarySearch(context.tabRefs, this, compareDOM);

    context.tabs.splice(removeIndex, 1);
    context.tabRefs.splice(removeIndex, 1);
  }

  private _handleClick = () => this._contextValues['prototype-tab'].changeTab(this._value);
  private _handleKeydown = (event: KeyboardEvent) => {
    const context = this._contextValues['prototype-tab'];
    const currentIndex = context.tabs.indexOf(this._value);
    const nextIndex = (currentIndex + 1) % context.tabs.length;
    const prevIndex = (currentIndex - 1 + context.tabs.length) % context.tabs.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      context.changeTab(context.tabs[nextIndex], true);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      context.changeTab(context.tabs[prevIndex], true);
    }
  };
}

customElements.define('prototype-tab-trigger', PrototypeTabTrigger);
