import { PrototypeForm } from '@/prototype/form';
import { Div, h } from '@/utils/dom';
import { HIGHLIGHT_RULE } from '@/utils/regex';
import { DocCode, HighlightRule } from '@/www/components/doc-component';

export default class FormBasic extends DocCode {
  protected _code = `<prototype-form>
  <prototype-form-item key="email">
    <prototype-form-label>Email</prototype-form-label>
    <prototype-input type="text" />
  </prototype-form-item>
  <prototype-form-item key="password">
    <prototype-form-label>Password</prototype-form-label>
    <prototype-input type="password" />
  </prototype-form-item>
  <prototype-form-submit>
    <prototype-button>Submit</prototype-button>
  </prototype-form-submit>
</prototype-form>`;

  protected _highlightRules: HighlightRule[] = [
    HIGHLIGHT_RULE.prototypeTagName,
    HIGHLIGHT_RULE.upperCamelCase,
  ];

  protected _preview = () => {
    const userSelect = h('shadcn-select', { 'default-value': 'User 2' }, [
      h('shadcn-select-trigger', {}, [h('shadcn-select-value', {})]),
      h(
        'shadcn-select-content',
        {
          class: 'flex flex-col items-center justify-center',
        },
        [
          h('shadcn-select-item', { value: 'User 1' }, ['User 1']),
          h('shadcn-select-item', { value: 'User 2' }, ['User 2']),
          h('shadcn-select-item', { value: 'User 3' }, ['User 3']),
        ]
      ),
    ]);
    const passwordSelect = h('shadcn-select', { 'default-value': 'Password 2' }, [
      h('shadcn-select-trigger', { class: 'w-[240px]' }, [h('shadcn-select-value', {})]),
      h(
        'shadcn-select-content',
        {
          class: 'flex flex-col items-center justify-center',
        },
        [
          h('shadcn-select-item', { value: 'Password 1' }, ['Password 1']),
          h('shadcn-select-item', { value: 'Password 2' }, ['Password 2']),
          h('shadcn-select-item', { value: 'Password 3' }, ['Password 3']),
        ]
      ),
    ]);

    const form = h('prototype-form', {}, [
      h('prototype-form-item', { key: 'email', class: 'mt-2' }, [
        h('prototype-form-label', {}, ['Email']),
        userSelect,
      ]),
      h('prototype-form-item', { key: 'password', class: 'mt-2' }, [
        h('prototype-form-label', {}, ['Password']),
        h('div', {}, [passwordSelect]),
      ]),
      h('prototype-form-submit', {}, [
        h('shadcn-button', { class: 'mt-4', variant: 'primary' }, ['Submit']),
      ]),
    ]) as PrototypeForm<{ email: string; password: string }>;

    form.validators = {
      same: (data) => {
        if (data.email === 'User 2' && data.password === 'Password 2') {
          return true;
        }
        if (data.email === 'User 1' && data.password === 'Password 1') {
          return true;
        }
        if (data.email === 'User 3' && data.password === 'Password 3') {
          return true;
        }
        return false;
      },
    };

    return Div({ class: 'flex flex-col items-center justify-center' }, [form]);
  };
}

customElements.define('form-basic', FormBasic);
