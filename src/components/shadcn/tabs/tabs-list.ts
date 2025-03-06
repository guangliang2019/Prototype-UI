import { definePrototype, useConnect } from '@/core';
import { WebComponentAdapter } from '@/core/adapter/web-component';
import { watchContext } from '@/core/context';

const TabsList = definePrototype((p) => {
  watchContext(p, 'tabs');

  let _originalCls = '';

  useConnect(p, () => {
    _originalCls = p.componentRef.className;
  });

  return () => {
    const component = p.componentRef;
    const _computedClass =
      'h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2';
    component.className = [_computedClass, _originalCls].join(' ').trimEnd();

    return null;
  };
});

const ShadcnTabsList = WebComponentAdapter(TabsList);

export default ShadcnTabsList;

customElements.define('shadcn-tabs-list', ShadcnTabsList);
