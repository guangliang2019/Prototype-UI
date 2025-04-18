import { PrototypeAPI } from '@/core/interface';
import { MenuContext, MenuProps } from './interface';
import { parseShortcut, matchShortcut } from '@/core/utils/shortcut';

const asMenu = (p: PrototypeAPI<MenuProps>) => {
  const onShortcutMap: Map<string, () => void> = new Map();
  p.props.define({
    disabled: false,
  });

  p.context.provide(MenuContext, () => {
    return {
      itemsRef: [],
      onShortcutMap: onShortcutMap,
    };
  });

  p.event.on('keydown', (e: KeyboardEvent) => {
    if (p.props.get().disabled) return;

    for (const [shortcutString, callback] of onShortcutMap.entries()) {
      const shortcut = parseShortcut(shortcutString);
      if (matchShortcut(e, shortcut)) {
        e.preventDefault();
        callback();
        break;
      }
    }
  });
};

export default asMenu;
