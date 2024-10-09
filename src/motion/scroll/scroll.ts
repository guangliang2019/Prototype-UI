import { ContextProvider } from '@/common';
import { MotionScrollContext } from './interface';
import './style.css';

export default class MotionScroll<
  ProvideContextType extends Record<string, Object> & MotionScrollContext = MotionScrollContext,
  ConsumeContextType extends Record<string, Object> = Record<string, Object>
> extends ContextProvider<ProvideContextType, ConsumeContextType> {
  protected _providerKeys = new Set(['motion-scroll']);

  private _resizeObserver: ResizeObserver;
  private _contentRef: HTMLElement | undefined;

  constructor() {
    super();
    // 初始化 ResizeObserver 来监听尺寸变化
    this._resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === this) {
          this.setContext('motion-scroll', {
            viewportHeight: entry.contentRect.height,
            viewportWidth: entry.contentRect.width,
          } as Partial<ProvideContextType['motion-scroll']>);
        }
        if (entry.target === this._contentRef) {
          this.setContext('motion-scroll', {
            contentHeight: entry.contentRect.height,
            contentWidth: entry.contentRect.width,
          } as Partial<ProvideContextType['motion-scroll']>);
        }
      }
    });
  }

  get contentRef(): HTMLElement | undefined {
    return this._contentRef;
  }

  set contentRef(value: HTMLElement | undefined) {
    if (this._contentRef !== value) {
      if (this._contentRef) {
        this._resizeObserver.unobserve(this._contentRef);
      }
      this._contentRef = value;
      if (value) {
        this._resizeObserver.observe(value);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver.observe(this);
    if (this.firstChild) {
      this.contentRef = this.firstChild as HTMLElement;
    }
    this.addEventListener('scroll', this._handleScroll);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    if (this._contentRef) {
      this._contentRef.removeEventListener('scroll', this._handleScroll);
    }
    super.disconnectedCallback();
  }

  private _handleScroll = (event: Event) => {
    const target = event.target as Element;
    this.setContext('motion-scroll', {
      scrollY: target.scrollTop,
      scrollX: target.scrollLeft,
    } as Partial<ProvideContextType['motion-scroll']>);
  };
}

customElements.define('motion-scroll', MotionScroll);
