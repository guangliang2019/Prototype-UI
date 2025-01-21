import { PrototypeSelectContext, SelectItemProps } from './interface';
import { PrototypeButton } from '../button';
import { binarySearch } from '@/www/utils/search';
import { compareDOM } from '@/www/utils/dom';

export default class PrototypeSelectItem<T extends PrototypeSelectContext = PrototypeSelectContext>
  extends PrototypeButton<T>
  implements SelectItemProps
{
  protected _consumerKeys = ['prototype-select'];
  private _value = '';
  get value(): string {
    return this._value;
  }

  private _handleSelectItemMouseEnter = () => {
    this.focus();
  };
  private _handleSelectItemMouseLeave = () => {
    this.blur();
  };
  private _handlePrototypeSelectContextChange = (
    context: PrototypeSelectContext['prototype-select']
  ) => {
    if (this.value === context.value) {
      this.setAttribute('data-selected', '');
    } else {
      this.removeAttribute('data-selected');
    }
  };

  private _handleKeydown = (event: KeyboardEvent) => {
    const context = this._contextValues['prototype-select'];
    const currentIndex = context.items.indexOf(this._value);
    const nextIndex = (currentIndex + 1) % context.items.length;
    const prevIndex = (currentIndex - 1 + context.items.length) % context.items.length;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      context.itemsRefs[nextIndex].focus();
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      context.itemsRefs[prevIndex].focus();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      context.changeValue(this._value, true);
    }

    if (event.key === 'Tab') {
      context.close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = -1;
    const context = this._contextValues['prototype-select'];

    this._value = this.getAttribute('value') || '';
    if (context.defaultValue === this.value) this.setAttribute('data-selected', '');

    const insertIndex = binarySearch(context.itemsRefs, this, compareDOM);
    context.itemsRefs.splice(insertIndex, 0, this);
    context.items.splice(insertIndex, 0, this._value);
    // Event Listeners
    this.addEventListener('mouseenter', this._handleSelectItemMouseEnter);
    this.addEventListener('mouseleave', this._handleSelectItemMouseLeave);

    this.addEventListener('keydown', this._handleKeydown as EventListener);

    // Context Listeners
    this.addContextListener('prototype-select', this._handlePrototypeSelectContextChange);

    this.onClick = () => {
      context.changeValue(this.value, true);
    };
  }

  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._handleSelectItemMouseEnter);
    this.removeEventListener('mouseleave', this._handleSelectItemMouseLeave);

    this.removeEventListener('keydown', this._handleKeydown as EventListener);

    this.removeContextListener('prototype-select', this._handlePrototypeSelectContextChange);

    const context = this._contextValues['prototype-select'];

    const removeIndex = binarySearch(context.itemsRefs, this, compareDOM);
    context.items.splice(removeIndex, 1);
    context.itemsRefs.splice(removeIndex, 1);

    super.disconnectedCallback();
  }
}

customElements.define('prototype-select-item', PrototypeSelectItem);
