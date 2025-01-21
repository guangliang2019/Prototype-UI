import { ContextProvider } from '@/components/common';
import { PrototypeSelectContext, PrototypeSelectProps } from './interface';
import PrototypeSelectItem from './select-item';
import { PrototypeFormItemContext } from '../form/interface';

export default class PrototypeSelect<
    T extends Record<string, Object> & PrototypeSelectContext = PrototypeSelectContext,
  >
  extends ContextProvider<T, PrototypeFormItemContext>
  implements PrototypeSelectProps
{
  protected _providerKeys = ['prototype-select'];
  protected _consumerKeys = ['prototype-form-item'];
  private _defaultValue: string = '';

  get defaultValue(): string {
    return this._defaultValue;
  }

  private _index: number = -1;
  private _value: string = '';
  private _items: string[] = [];
  private _selecting: boolean = false;
  private _itemRefs: PrototypeSelectItem<any>[] = [];

  constructor() {
    super();
    const defaultContext: Partial<PrototypeSelectContext['prototype-select']> = {
      items: [],
    };

    this.setContext('prototype-select', defaultContext);
  }

  private _handleFormAction = () => {
    if (this._contextValues['prototype-form-item']) {
      this._contextValues['prototype-form-item'].changeFormItemValue(this._value);
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._defaultValue = this.getAttribute('default-value') || '';
    this._value = this._defaultValue;
    this.setAttribute('data-state', 'close');
    this._handleFormAction();

    this.setContext('prototype-select', {
      defaultValue: this._defaultValue,
      index: this._index,
      value: this._value,
      items: this._items,
      selecting: this._selecting,
      changeValue: (value, focus = false) => {
        this._value = value;
        this._index = this._items.indexOf(value);

        this.setContext('prototype-select', {
          index: this._index,
          value: this._value,
        } as Partial<PrototypeSelectContext['prototype-select']>);
        this._handleFormAction();
        if (focus) {
          this._provideValues['prototype-select'].focus();
        }
        this._provideValues['prototype-select'].close();
      },
      itemsRefs: this._itemRefs,
      rootRef: this,
    } as Partial<PrototypeSelectContext['prototype-select']>);
  }
}

customElements.define('prototype-select', PrototypeSelect);
