import { ContextProvider } from '@/common';
import { MotionScrollContext } from './interface';
import './style.css';

export default class MotionScroll extends ContextProvider<MotionScrollContext> {
  protected _providerKeys = new Set(['motion-scroll']);

  private _resizeObserver: ResizeObserver;

  constructor() {
    super();
    // 初始化 ResizeObserver 来监听尺寸变化
    this._resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log(
          `Size changed for ${entry.target.className}: ${entry.contentRect.width}px x ${entry.contentRect.height}px`
        );
      }
    });
  }

  connectedCallback() {
    // 开始观察尺寸变化
    this._resizeObserver.observe(this);
    if (this.firstChild) {
      this._resizeObserver.observe(this.firstChild as Element);
    }
    // 监听滚动事件
    this.addEventListener('scroll', this.logScroll);
  }

  disconnectedCallback() {
    // 清理工作
    this._resizeObserver.disconnect();
    this.removeEventListener('scroll', this.logScroll);
  }

  logScroll = (event: Event) => {
    const target = event.target as Element;
    console.log(`Scrolled to ${target.scrollTop}`);
  };
}

customElements.define('motion-scroll', MotionScroll);
