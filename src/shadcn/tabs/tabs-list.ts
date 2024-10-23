import { ContextConsumer } from '@/common';

export default class ShadcnTabsList extends ContextConsumer<Record<string, Object>> {
  protected _consumerKeys = ['prototype-tabs'];
  // 用户添加的 class 属性
  private _class = '';
  // 组件自身的 class 属性
  private _computedClass = '';
  connectedCallback() {
    super.connectedCallback();
    this._class = this.className || '';

    this._setup();
  }

  private _setup() {
    this._computedClass =
      'h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2';

    this.className = [this._computedClass, this._class].join(' ').trimEnd();
  }
}

customElements.define('shadcn-tabs-list', ShadcnTabsList);
