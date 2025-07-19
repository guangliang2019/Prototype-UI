export type {
  PrototypeScrollAreaContext,
  PrototypeScrollAreaProps,
  PrototypeScrollRailContext,
  PrototypeScrollRailProps,
} from './interface';

import { definePrototype, WebComponentAdapter } from '@/core';
import './style.css';
import asScrollArea from '@/core/behaviors/as-scroll-area/as-scroll-area';
import asScrollThumb from '@/core/behaviors/as-scroll-area/as-scroll-thumb';
import asScrollContent from '@/core/behaviors/as-scroll-area/as-scroll-content';
import asScrollBar from '@/core/behaviors/as-scroll-area/as-scroll-bar';

export const PrototypeScrollArea = WebComponentAdapter(
  definePrototype({
    name: 'prototype-scroll-area',
    setup: (p) => {
      asScrollArea(p);
    },
  })
);

export const PrototypeScrollContent = WebComponentAdapter(
  definePrototype({
    name: 'prototype-scroll-content',
    setup: (p) => {
      asScrollContent(p);
    },
  })
);

export const PrototypeScrollBar = WebComponentAdapter(
  definePrototype({
    name: 'prototype-scroll-bar',
    setup: (p) => {
      asScrollBar(p);
    },
  })
);

export const PrototypeScrollThumb = WebComponentAdapter(
  definePrototype({
    name: 'prototype-scroll-thumb',
    setup: (p) => {
      asScrollThumb(p);
    },
  })
);
