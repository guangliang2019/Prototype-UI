import { ContextProvider } from '@/common';
import { DialogContext, DialogProps } from './interface';

export default class PrototypeDialog extends ContextProvider<DialogContext> implements DialogProps {
  protected _key = 'prototype-dialog';

  /**
   * 是否显示弹窗, 该属性为响应式属性
   */
  private _visible: boolean = false;
  // prettier-ignore
  get visible() { return this._visible; }
  set visible(value) {
    if (value === this._visible) return;
    this._visible = value;
    if (this._visible) {
      this._show();
      this.setAttribute('visible', '');
    } else {
      this._close();
      this.removeAttribute('visible');
    }
  }

  // prettier-ignore
  private _show = () => { throw new Error('PrototypeDialog: _show 未初始化'); };
  // prettier-ignore
  private _close = () => { throw new Error('PrototypeDialog: _close 未初始化'); };
  // prettier-ignore
  get show() { return () => (this.visible = true); }
  // prettier-ignore
  get close() { return () => (this.visible = false); }

  connectedCallback() {
    super.connectedCallback();
    this.visible = this.getAttribute('visible') !== null;
    this.setContext({
      visible: this.visible,
    });
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const mapping: Record<string, any> = {
      'visible': () => {
        this.visible = newValue !== null;
        this.visible && oldValue !== newValue ? this.show() : this.close();
      },
    };

    mapping[name]?.();
  }
}
