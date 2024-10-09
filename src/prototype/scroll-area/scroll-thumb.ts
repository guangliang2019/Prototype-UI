import { ContextConsumer } from '@/common';
import {
  DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS,
  PrototypeScrollAreaContext,
  PrototypeScrollRailContext,
} from './interface';
import { MotionScrollContext } from '@/motion';

export default class PrototypeScrollThumb extends ContextConsumer<
  PrototypeScrollAreaContext & PrototypeScrollRailContext
> {
  protected _consumerKeys = new Set([
    'prototype-scroll-area',
    'motion-scroll',
    'prototype-scroll-rail',
  ]);
  private _direction: PrototypeScrollRailContext['direction'] =
    DEFAULT_PROTOTYPE_SCROLL_RAIL_PROPS['direction'];

  connectedCallback() {
    super.connectedCallback();
    if (this._contextValues['prototype-scroll-rail'] === undefined) {
      console.error('ScrollThumb should be a child of ScrollRail');
      return;
    }
    this.style.cursor = 'pointer';
    this.style.position = 'absolute';
    this._contextValues['prototype-scroll-rail'].thumbRef = this;
    this._direction = this._contextValues['prototype-scroll-rail'].direction;

    this._handleScroll(this._contextValues['motion-scroll']);
    this.addContextListener('motion-scroll', this._handleScroll);
  }

  disconnectedCallback() {
    this.removeContextListener('motion-scroll', this._handleScroll);
  }

  private _handleScroll = (
    context: MotionScrollContext['motion-scroll'],
    changedKeys: (keyof MotionScrollContext)[] = []
  ) => {
    switch (this._direction) {
      case 'horizontal':
        if (this.style.willChange === '') this.style.willChange = 'left right width';
        if (changedKeys.includes('scrollX') || this.style.left === '') {
          this.style.left = `${context.scrollX / context.contentWidth}px`;
        }
        if (
          changedKeys.includes('viewportWidth') ||
          changedKeys.includes('contentWidth') ||
          this.style.width === ''
        ) {
          this.style.width = `${context.viewportWidth / context.contentWidth}px`;
        }
        break;
      case 'vertical':
        if (this.style.willChange === '') this.style.willChange = 'top bottom height';
        if (changedKeys.includes('scrollY') || this.style.top === '') {
          this.style.top = `${
            (context.scrollY / context.contentHeight) * context.viewportHeight
          }px`;
        }

        if (
          changedKeys.includes('viewportHeight') ||
          changedKeys.includes('contentHeight') ||
          this.style.height === ''
        ) {
          this.style.height = `${
            (context.viewportHeight / context.contentHeight) * context.viewportHeight
          }px`;
        }
        break;
    }
  };
}

customElements.define('prototype-scroll-thumb', PrototypeScrollThumb);
