import { Div, h } from '@/www/utils/dom';
import { DocCode, HighlightRule } from '@/www/components/doc-component';
import { ShadcnScrollArea } from '@/shadcn';

export default class ShadcnScrollAreaBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const scrollArea = h(
      'shadcn-scroll-area',
      { class: 'h-60 w-96 overflow-y-scroll flex flex-col gap-4' },
      [
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['1']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['2']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['3']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['4']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['5']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['6']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['7']),
        h('div', { class: 'h-20 w-full bg-primary opacity-5 text-primary' }, ['8']),
      ]
    ) as ShadcnScrollArea;

    scrollArea.scrollContentRef.setAttribute('class', 'flex flex-col gap-4');

    return Div({ class: 'flex flex-col items-center justify-center relative' }, [scrollArea]);
  };
}

customElements.define('shadcn-scroll-area-basic', ShadcnScrollAreaBasic);
