export { default as Router } from './router';
export type { RouteChange } from './router';

export const docsRoute: Record<string, { title: string; value: string; href: string }[]> = {
  'Getting Started': [
    {
      title: 'Introduction',
      value: 'docs-introduction',
      href: '/docs/introduction',
    },
  ],
  'Shadcn UI': [
    {
      title: 'Button',
      value: 'shadcn-button',
      href: '/shadcn/button',
    },
    {
      title: 'Tabs',
      value: 'shadcn-tabs',
      href: '/shadcn/tabs',
    },
    {
      title: 'Select',
      value: 'shadcn-select',
      href: '/shadcn/select',
    },
    {
      title: 'Input',
      value: 'shadcn-input',
      href: '/shadcn/input',
    },
    {
      title: 'Scroll Area',
      value: 'shadcn-scroll-area',
      href: '/shadcn/scroll-area',
    },
  ],
  'Prototype UI': [
    {
      title: 'Tabs',
      value: 'prototype-tabs',
      href: '/prototype/tabs',
    },
    {
      title: 'Transition',
      value: 'prototype-transition',
      href: '/prototype/transition',
    },
    {
      title: 'Form',
      value: 'prototype-form',
      href: '/prototype/form',
    },
    {
      title: 'Radio Group',
      value: 'prototype-radio-group',
      href: '/prototype/radio-group',
    },
    {
      title: 'Select',
      value: 'prototype-select',
      href: '/prototype/select',
    },
    {
      title: 'Resizable',
      value: 'prototype-resizable',
      href: '/prototype/resizable',
    },
    {
      title: 'Scroll Area',
      value: 'prototype-scroll-area',
      href: '/prototype/scroll-area',
    },
  ],
};
