import { PrototypeAPI, RendererAPI } from '@/core/interface';
import { MenuItemContext, MenuShortcutProps } from './interface';
import { formatShortcutToSymbols } from '@/core/utils/shortcut';

const asMenuShortcut = (
  p: PrototypeAPI<MenuShortcutProps>
): {
  render: (renderer: RendererAPI) => Element;
} => {
  p.context.watch(MenuItemContext);

  p.lifecycle.onMounted(() => {
    const { updateRef, shortcutRef } = p.context.get(MenuItemContext);
    const element = p.view.getElement();
    if (element !== shortcutRef) updateRef('shortcutRef', p.view.getElement());
  });

  return {
    render: (renderer) => {
      const context = p.context.get(MenuItemContext);
      const h = renderer.createElement;
      return h('span', {}, [formatShortcutToSymbols(context.shortcut ?? '')]);
    },
  };
};

export default asMenuShortcut;
