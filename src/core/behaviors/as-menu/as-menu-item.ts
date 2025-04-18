import { PrototypeAPI } from '@/core/interface';
import { MenuContext, MenuItemContext, MenuItemContextType, MenuItemProps } from './interface';
import { asButton } from '../as-button';
import { formatShortcut, parseShortcut } from '@/core/utils/shortcut';

const asMenuItem = (p: PrototypeAPI<MenuItemProps>) => {
  p.context.provide(MenuItemContext, (updateContext) => {
    const context: MenuItemContextType = {
      shortcut: p.props.get().shortcut,
      shortcutRef: null as unknown as HTMLElement,
      updateRef: (name, ref) => {
        const originalRef = context[name];
        updateContext({
          [name]: ref,
        });
        if (originalRef) originalRef.remove();
      },
    };
    return context;
  });

  p.context.watch(MenuContext);

  p.lifecycle.onMounted(() => {
    const props = p.props.get();
    const menuContext = p.context.get(MenuContext);
    if (props.shortcut) {
      menuContext.onShortcutMap.set(
        formatShortcut(parseShortcut(props.shortcut)),
        props.onShortcut ?? props.onClick ?? (() => {})
      );
    }
  });
};

export default asMenuItem;
