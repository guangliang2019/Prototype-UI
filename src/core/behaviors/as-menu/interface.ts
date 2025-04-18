import { createContext } from '@/core/adapters/web/context-center';
import { ButtonProps } from '../as-button';
import { ShortcutInput } from '@/core/utils/shortcut';

export interface MenuProps {
  disabled?: boolean;
}

export interface MenuItemProps extends ButtonProps {
  shortcut?: ShortcutInput;
  onShortcut?: (e: KeyboardEvent) => void;
}

export interface MenuShortcutProps {
  renderShortcut: (shortcut: string) => HTMLElement;
}

export interface MenuContextType {
  itemsRef: HTMLElement[];
  onShortcutMap: Map<string, (e: KeyboardEvent) => void>;
}

export interface MenuItemContextType {
  shortcutRef: HTMLElement;
  updateRef: (key: 'shortcutRef', value: HTMLElement) => void;
  shortcut?: ShortcutInput;
  onShortcut?: () => void;
}

export const MenuContext = createContext<MenuContextType>('menu');
export const MenuItemContext = createContext<MenuItemContextType>('menu-item');
