import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class ScrollAreaBasic extends DocCode {
  protected _code = 'TODO: 补全示例对应的实际代码';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    return Div({ class: 'flex flex-col items-center justify-center relative' }, [
      h('prototype-scroll-area', { class: 'h-60 w-96 overflow-y-scroll' }, [
        h('prototype-scroll-content', { class: 'flex flex-col gap-4' }, [
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['1']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['2']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['3']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['4']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['5']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['6']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['7']),
          h('div', { class: 'h-20 w-full bg-primary opacity-10 text-primary' }, ['8']),
        ]),
        h('prototype-scroll-bar', { class: 'absolute h-60 w-4 opacity-10 z-10 top-0 right-0' }, [
          h('prototype-scroll-thumb', {
            class: 'absolute w-4 bg-white z-11 right-0',
            style:
              'transform: translateY(calc(var(--scroll-thumb-vertical-offset) * 1px)); height: calc(var(--scroll-thumb-vertical-ratio) * 100%)',
          }),
        ]),
      ]),
    ]);
  };
}

customElements.define('scroll-area-basic', ScrollAreaBasic);
