import { Div, h } from '@/www/utils/dom';
import { DocCode } from '@/www/components/doc-component';
import '@/components/shadcn';
import { HighlightRule } from '@/www/components/doc-component';

export default class ShadcnTabsBasic extends DocCode {
  protected _code = 'Code component is in development';
  protected _highlightRules: HighlightRule[] = [];

  protected _preview = () => {
    const tabs = h('shadcn-tabs', { class: 'w-full', 'default-value': 'account' }, [
      h('shadcn-tabs-list', { class: 'w-full' }, [
        h('shadcn-tabs-trigger', { value: 'account' }, ['Account']),
        h('shadcn-tabs-trigger', { value: 'password' }, ['Password']),
      ]),
      h('shadcn-tabs-content', { value: 'account' }, [
        h('div', { class: 'rounded-xl border bg-card text-card-foreground shadow mt-2' }, [
          h('div', { class: 'flex flex-col space-y-1.5 p-6' }, [
            h('h3', { class: 'font-semibold leading-none tracking-tight' }, ['Account']),
            h('p', { class: 'text-sm text-muted-foreground' }, [
              "Make changes to your account here. Click save when you're done.",
            ]),
          ]),
        ]),
      ]),
      h('shadcn-tabs-content', { value: 'password' }, [
        h('div', { class: 'rounded-xl border bg-card text-card-foreground shadow mt-2' }, [
          h('div', { class: 'flex flex-col space-y-1.5 p-6' }, [
            h('h3', { class: 'font-semibold leading-none tracking-tight' }, ['Password']),
            h('p', { class: 'text-sm text-muted-foreground' }, [
              "Change your password here. After saving, you'll be logged out.",
            ]),
          ]),
        ]),
      ]),
    ]);
    return Div({ class: 'flex flex-col items-center justify-center w-[400px]' }, [tabs]);
  };
}

customElements.define('shadcn-tabs-basic', ShadcnTabsBasic);
