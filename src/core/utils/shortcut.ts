export interface ShortcutKey {
  modifiers: {
    shift?: boolean;
    ctrl?: boolean;
    alt?: boolean;
    meta?: boolean;
  };
  key: string;
}

export type ShortcutInput = string | ShortcutKey;

// 将字符串格式的快捷键转换为 ShortcutKey 对象
export const parseShortcut = (input: ShortcutInput): ShortcutKey => {
  if (typeof input === 'object') return input;

  const parts = input.split('+').map((part) => part.trim().toLowerCase());
  const key = parts.pop() || '';
  const modifiers = {
    shift: parts.includes('shift'),
    ctrl: parts.includes('ctrl'),
    alt: parts.includes('alt'),
    meta: parts.includes('meta'),
  };

  return { modifiers, key };
};

// 将 ShortcutKey 对象转换为标准化的字符串格式
export const formatShortcut = (shortcut: ShortcutKey): string => {
  const parts: string[] = [];
  if (shortcut.modifiers.shift) parts.push('Shift');
  if (shortcut.modifiers.ctrl) parts.push('Ctrl');
  if (shortcut.modifiers.alt) parts.push('Alt');
  if (shortcut.modifiers.meta) parts.push('Meta');
  parts.push(shortcut.key.toUpperCase());
  return parts.join('+');
};

// 检查键盘事件是否匹配快捷键
export const matchShortcut = (event: KeyboardEvent, shortcut: ShortcutInput): boolean => {
  const currentPlatform = getPlatform();
  // 先将快捷键标准化为当前平台的等效快捷键
  const normalizedShortcut = normalizeShortcut(shortcut, currentPlatform);
  const { modifiers, key } = normalizedShortcut;

  // 特殊按键的映射（统一为小写）
  const specialKeyMap: Record<string, string> = {
    return: 'enter',
    esc: 'escape',
    ' ': 'space',
    arrowup: 'up',
    arrowdown: 'down',
    arrowleft: 'left',
    arrowright: 'right',
  };

  // 统一按键名称
  const normalizedEventKey = specialKeyMap[event.key.toLowerCase()] || event.key.toLowerCase();
  const normalizedShortcutKey = specialKeyMap[key.toLowerCase()] || key.toLowerCase();

  return (
    normalizedEventKey === normalizedShortcutKey &&
    Boolean(event.shiftKey) === Boolean(modifiers.shift) &&
    Boolean(event.ctrlKey) === Boolean(modifiers.ctrl) &&
    Boolean(event.altKey) === Boolean(modifiers.alt) &&
    Boolean(event.metaKey) === Boolean(modifiers.meta)
  );
};

// 定义支持的操作系统类型
export type Platform = 'mac' | 'windows' | 'linux' | 'other';

// 获取当前操作系统平台
export const getPlatform = (): Platform => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes('mac')) return 'mac';
  if (userAgent.includes('win')) return 'windows';
  if (userAgent.includes('linux')) return 'linux';
  return 'other';
};

// Mac 平台的特殊按键符号
const MAC_KEY_SYMBOLS: Record<string, string> = {
  meta: '⌘',
  shift: '⇧',
  alt: '⌥',
  ctrl: '⌃',
  enter: '⏎',
  escape: '⎋',
  backspace: '⌫',
  delete: '⌦',
  tab: '⇥',
  capslock: '⇪',
  space: '␣',
  arrowup: '↑',
  arrowdown: '↓',
  arrowleft: '←',
  arrowright: '→',
};

// Windows/Linux 平台的按键文本
const GENERIC_KEY_SYMBOLS: Record<string, string> = {
  meta: 'Win',
  shift: 'Shift',
  alt: 'Alt',
  ctrl: 'Ctrl',
  enter: 'Enter',
  escape: 'Esc',
  backspace: 'Backspace',
  delete: 'Del',
  tab: 'Tab',
  capslock: 'Caps',
  space: 'Space',
  arrowup: '↑',
  arrowdown: '↓',
  arrowleft: '←',
  arrowright: '→',
};

// 将标准快捷键字符串转换为当前平台适用的显示风格
export const formatShortcutToSymbols = (input: ShortcutInput, platform?: Platform): string => {
  const currentPlatform = platform || getPlatform();
  const shortcut = typeof input === 'string' ? parseShortcut(input) : input;
  const parts: string[] = [];
  const symbols = currentPlatform === 'mac' ? MAC_KEY_SYMBOLS : GENERIC_KEY_SYMBOLS;
  
  if (currentPlatform === 'mac') {
    // Mac 平台的修饰键顺序：^ ⌥ ⇧ ⌘
    if (shortcut.modifiers.ctrl) parts.push(symbols.ctrl);
    if (shortcut.modifiers.alt) parts.push(symbols.alt);
    if (shortcut.modifiers.shift) parts.push(symbols.shift);
    if (shortcut.modifiers.meta) parts.push(symbols.meta);
  } else {
    // Windows/Linux 平台的修饰键顺序：Ctrl + Alt + Shift + Win
    if (shortcut.modifiers.ctrl) parts.push(symbols.ctrl);
    if (shortcut.modifiers.alt) parts.push(symbols.alt);
    if (shortcut.modifiers.shift) parts.push(symbols.shift);
    if (shortcut.modifiers.meta) parts.push(symbols.meta);
  }

  // 处理主键
  const lowercaseKey = shortcut.key.toLowerCase();
  const symbol = symbols[lowercaseKey];
  parts.push(symbol || shortcut.key.toUpperCase());

  // Mac 使用紧凑格式，其他平台使用 + 号分隔
  return parts.join(currentPlatform === 'mac' ? '' : ' + ');
};

// 智能转换快捷键，在不同平台间映射等效快捷键
export const normalizeShortcut = (input: ShortcutInput, platform?: Platform): ShortcutKey => {
  const shortcut = typeof input === 'string' ? parseShortcut(input) : input;
  const currentPlatform = platform || getPlatform();
  
  // 如果是 Windows/Linux 平台，将 Command/Meta 快捷键转换为 Ctrl
  if (currentPlatform !== 'mac' && shortcut.modifiers.meta) {
    return {
      modifiers: {
        ...shortcut.modifiers,
        meta: false,
        ctrl: true
      },
      key: shortcut.key
    };
  }
  
  return shortcut;
};
