// import { PrototypeScrollThumb } from '@/components/prototype/scroll-area';
// import { optimizeTailwindClasses } from '@/www/utils/tailwind';

// export default class ShadcnScrollBar extends PrototypeScrollThumb {
//   // 用户添加的 class 属性
//   private _class = '';
//   // 组件自身的 class 属性
//   private _computedClass = '';

//   connectedCallback() {
//     super.connectedCallback();
//     this._setup();
//   }

//   private _setup() {
//     // prettier-ignore
//     const sizeCls = `${this._contextValues["prototype-scroll-rail"].direction === 'vertical' ? 'w-full' : 'h-full'}`;
//     const otherCls = 'rounded-full bg-border';
//     this._computedClass = [sizeCls, otherCls].join(' ').trimEnd();

//     this.className = optimizeTailwindClasses(
//       [this._computedClass, this._class].join(' ').trimEnd()
//     );
//   }
// }

// customElements.define('shadcn-scroll-thumb', ShadcnScrollBar);
