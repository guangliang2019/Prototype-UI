import { ContextConsumer } from '@/common';
import { OverlayContext, OverlayProps, ShowOverlayEventDetail } from './interface';

export default class PrototypeOverlay
  extends ContextConsumer<OverlayContext>
  implements OverlayProps
{
  protected _key = 'prototype-overlay';
  protected _content?: HTMLElement;
  protected _target?: HTMLElement;
  protected _closestRelative: HTMLElement = this;

  target?: string = undefined;
  overlayKey: string = '__default__';
  unmount: boolean = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.target = this.getAttribute('target') ?? undefined;
    this.style.position = 'relative';

    // Overlay 默认以自己的位置作为目标插入位置，如果有 target 则以 target 为准
    this._target = this.target ? document.querySelector(this.target) || document.body : this;
    // 找到 target 最近的 relative 父元素
    this._closestRelative = this.findClosestRelative(this._target);

    // TODO: autoShow
  }

  // Overlay 本身位置与编写位置相同，但是 content 会在实际渲染时「投放」到目标位置
  show(content: HTMLElement, className?: string) {
    this._content = content;
    this._content.style.position = 'absolute';
    this._content.className = className ?? '';
    this._closestRelative.appendChild(this._content);
    console.log(this.target, document.body.querySelector(this.target!), 'target');
    console.log(this._closestRelative, 'closestRelative');

    const overlayShowEvent = new CustomEvent<ShowOverlayEventDetail>('overlay-show', {
      bubbles: true,
      composed: true,
      detail: {
        overlayKey: this.overlayKey,
        overlay: this,
      },
    });
    this.setAttribute('data-show', '');
    this.dispatchEvent(overlayShowEvent);
  }

  close() {
    this.removeAttribute('data-show');
    this._closestRelative.removeChild(this._content!);
  }

  // 根据给定 DOM 寻找最近的 relative 父元素
  private findClosestRelative(element: HTMLElement): HTMLElement {
    let currentElement = element;
    while (currentElement && currentElement !== document.body) {
      const style = window.getComputedStyle(currentElement);
      if (style.position === 'relative' || style.position === 'absolute') {
        return currentElement;
      }
      currentElement = currentElement.parentElement!;
    }
    return document.body; // Fallback to the body if no positioned parent is found
  }
}

customElements.define('prototype-overlay', PrototypeOverlay);
