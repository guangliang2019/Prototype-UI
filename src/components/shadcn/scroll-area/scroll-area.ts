// import { PrototypeScrollArea } from '@/components/prototype/scroll-area';
// import { ShadcnScrollAreaContext } from './interface';
// import './scroll-bar';

// export default class ShadcnScrollArea extends PrototypeScrollArea<ShadcnScrollAreaContext> {
//   protected _providerKeys = ['prototype-scroll-area', 'motion-scroll', 'shadcn-scroll-area'];

//   private _scrollContentRef = document.createElement('prototype-scroll-content');
//   get scrollContentRef() {
//     return this._scrollContentRef;
//   }
//   private _horizontalScrollBarRef = document.createElement('shadcn-scroll-bar');
//   private _verticalScrollBarRef = document.createElement('shadcn-scroll-bar');

//   private _mutationObserver: MutationObserver;

//   constructor() {
//     super();
//     this._mutationObserver = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//           if (this._scrollContentRef && node !== this._scrollContentRef) {
//             if (node === this._horizontalScrollBarRef || node === this._verticalScrollBarRef)
//               return;
//             // 将新添加的子节点移动到目标位置
//             this._scrollContentRef.appendChild(node);
//           }
//         });
//       });
//     });
//   }

//   connectedCallback() {
//     super.connectedCallback();
//     this.contentRef = this._scrollContentRef;
//     this.setContext('shadcn-scroll-area', {
//       verticalScrollBarRef: this._verticalScrollBarRef,
//       horizontalScrollBarRef: this._horizontalScrollBarRef,

//       updateRef: (name, ref) => {
//         this[`_${name}`] = ref;
//         this.setContext('shadcn-select', { [name]: ref });
//       },
//     });
//     this._mutationObserver.observe(this, { childList: true });

//     Array.from(this.childNodes).forEach((node) => {
//       if (this._scrollContentRef && node !== this._scrollContentRef) {
//         this._scrollContentRef.appendChild(node);
//       }
//     });

//     this._setup();
//   }

//   disconnectedCallback() {
//     this._mutationObserver.disconnect();
//     super.disconnectedCallback();
//   }

//   private _setup() {
//     this.style.overflow = 'scroll';
//     if (!this.contains(this._scrollContentRef)) this.appendChild(this._scrollContentRef);

//     if (!this.contains(this._provideValues['shadcn-scroll-area'].horizontalScrollBarRef)) {
//       this._provideValues['shadcn-scroll-area'].horizontalScrollBarRef.setAttribute(
//         'direction',
//         'horizontal'
//       );
//       this.appendChild(this._provideValues['shadcn-scroll-area'].horizontalScrollBarRef);
//     }

//     if (!this.contains(this._provideValues['shadcn-scroll-area'].verticalScrollBarRef)) {
//       this._provideValues['shadcn-scroll-area'].verticalScrollBarRef.setAttribute(
//         'direction',
//         'vertical'
//       );
//       this.appendChild(this._provideValues['shadcn-scroll-area'].verticalScrollBarRef);
//     }
//   }
// }

// customElements.define('shadcn-scroll-area', ShadcnScrollArea);
