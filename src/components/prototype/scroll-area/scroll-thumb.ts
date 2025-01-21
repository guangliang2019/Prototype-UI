import { ContextConsumer } from '@/components/common';
import {
  DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS,
  PrototypeScrollAreaContext,
  PrototypeScrollRailContext,
} from './interface';

export default class PrototypeScrollThumb<
  T extends PrototypeScrollAreaContext & PrototypeScrollRailContext = PrototypeScrollAreaContext &
    PrototypeScrollRailContext,
> extends ContextConsumer<T> {
  protected _consumerKeys = ['prototype-scroll-area', 'motion-scroll', 'prototype-scroll-rail'];
  private _direction: PrototypeScrollRailContext['direction'] =
    DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS['direction'];

  private _scale = -1;

  private _handleScroll = (
    context: T['motion-scroll'],
    changedKeys: (keyof T['motion-scroll'])[] = []
  ) => {
    switch (this._direction) {
      case 'horizontal':
        if (this._scale === -1) this._scale = context.viewportWidth / context.contentWidth;
        if (this.style.willChange === '') this.style.willChange = 'left right width';
        if (changedKeys.includes('scrollX') || this.style.left === '') {
          this.style.left = `${this._scale * context.scrollX}px`;
        }
        if (
          changedKeys.includes('viewportWidth') ||
          changedKeys.includes('contentWidth') ||
          this.style.width === ''
        ) {
          this._scale = context.viewportWidth / context.contentWidth;
          this.style.width = `${this._scale * context.viewportWidth}px`;
          this.style.left = `${this._scale * context.scrollX}px`;
        }
        break;
      case 'vertical':
        if (this._scale === -1) this._scale = context.viewportHeight / context.contentHeight;
        if (this.style.willChange === '') this.style.willChange = 'top bottom height';
        if (changedKeys.includes('scrollY') || this.style.top === '') {
          this.style.top = `${this._scale * context.scrollY}px`;
        }
        if (
          changedKeys.includes('viewportHeight') ||
          changedKeys.includes('contentHeight') ||
          this.style.height === ''
        ) {
          this._scale = context.viewportHeight / context.contentHeight;
          this.style.height = `${this._scale * context.viewportHeight}px`;
          this.style.top = `${this._scale * context.scrollY}px`;
        }
        break;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this.style.cursor = 'pointer';
    this.style.position = 'absolute';
    this._direction = this._contextValues['prototype-scroll-rail'].direction;

    this._handleScroll(this._contextValues['motion-scroll']);
    
    this.addContextListener('motion-scroll', this._handleScroll);
    this.addEventListener('mousedown', this._startDragging);
    document.addEventListener('mousemove', this._onDrag);
    document.addEventListener('mouseup', this._stopDragging);
  }

  disconnectedCallback() {
    this.removeContextListener('motion-scroll', this._handleScroll);
    this.removeEventListener('mousedown', this._startDragging);
    document.removeEventListener('mousemove', this._onDrag);
    document.removeEventListener('mouseup', this._stopDragging);
  }

  private _isDragging = false;
  private _initialMousePosition = 0;
  private _initialScrollPosition = 0;

  private _startDragging = (event: MouseEvent) => {
    this._isDragging = true;
    this._initialMousePosition = this._direction === 'horizontal' ? event.clientX : event.clientY;
    this._initialScrollPosition =
      this._direction === 'horizontal'
        ? this._contextValues['motion-scroll'].scrollX
        : this._contextValues['motion-scroll'].scrollY;
  };

  private _onDrag = (event: MouseEvent) => {
    if (!this._isDragging) return;

    const currentMousePosition = this._direction === 'horizontal' ? event.clientX : event.clientY;
    const delta = currentMousePosition - this._initialMousePosition;
    if (delta === 0) return;

    switch (this._direction) {
      case 'horizontal':
        this._contextValues['motion-scroll'].scrollTo(
          this._initialScrollPosition + delta / this._scale,
          this._contextValues['motion-scroll'].scrollY
        );
        break;
      case 'vertical':
        this._contextValues['motion-scroll'].scrollTo(
          this._contextValues['motion-scroll'].scrollX,
          this._initialScrollPosition + delta / this._scale
        );
        break;
    }

    this._handleScroll(this._contextValues['motion-scroll']);
  };

  private _stopDragging = () => {
    this._isDragging = false;
  };
}

customElements.define('prototype-scroll-thumb', PrototypeScrollThumb);
