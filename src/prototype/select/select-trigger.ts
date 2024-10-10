import { PrototypeSelectContext } from './interface';
import { Trigger } from '../../common/trigger';

export default class PrototypeSelectTrigger<
  T extends PrototypeSelectContext = PrototypeSelectContext
> extends Trigger<T> {
  protected _consumerKeys =(['prototype-select']);

  private _handleMouseDown = (event: MouseEvent): void => {
    const context = this._contextValues['prototype-select'];
    context.width = this.offsetWidth;

    // Check if the click is on the trigger or its children
    if (event.target instanceof Node && this.contains(event.target)) {
      if (document.activeElement === this) {
        context.selecting ? context.close() : context.open();

        this._focusSelectedItem(context);
      }
    } else if (context.selecting) {
      // If the click is outside and the select is open, close it
      context.close();
    }
  };

  private _handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleFocus();
    }
  };

  private _handleFocus = (): void => {
    const context = this._contextValues['prototype-select'];
    context.width = this.offsetWidth;
    context.selecting ? context.close() : context.open();

    this._focusSelectedItem(context);
  };

  private _focusSelectedItem(context: PrototypeSelectContext['prototype-select']): void {
    const index = context.items.indexOf(context.value);
    if (index !== -1 && Array.isArray(context.itemsRefs) && context.itemsRefs.length > index) {
      requestAnimationFrame(() => {
        const itemToFocus = context.itemsRefs[index];
        if (itemToFocus && typeof itemToFocus.focus === 'function') {
          itemToFocus.focus();
        } else {
          console.warn(`Failed to focus item at index ${index}. Item may not be properly initialized.`);
        }
      });
    } else {
      // -1 index appears when no item is selected, add this message for better debugging 
      console.debug(`Invalid index ${index} or itemsRefs not properly initialized.`);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const context = this._contextValues['prototype-select'];
    context.triggerRef = this;
    context.focus = this.focus.bind(this);

    this.addEventListener('mousedown', this._handleMouseDown as EventListener);
    this.addEventListener('focus', this._handleFocus);

    this.addEventListener('keydown', this._handleKeydown as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this._handleMouseDown as EventListener);
    this.removeEventListener('focus', this._handleFocus);
    this.removeEventListener('keydown', this._handleKeydown as EventListener);
  }
}

customElements.define('prototype-select-trigger', PrototypeSelectTrigger);
