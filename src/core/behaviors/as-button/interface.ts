import { State } from '@/core/interface';

export interface ButtonProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 点击事件处理器 */
  onClick?: (event?: MouseEvent | KeyboardEvent) => void;
}

export interface ButtonState {
  /** 是否处于悬停状态 */
  hover: State<boolean>;
  /** 是否处于聚焦状态 */
  focus: State<boolean>;
  /** 是否显示聚焦轮廓 */
  focusVisible: State<boolean>;
  /** 是否处于激活状态 */
  active: State<boolean>;
}

export interface ButtonExposes {
  /** 聚焦按钮 */
  focus(): void;
  /** 失焦按钮 */
  blur(): void;
  /** 点击按钮 */
  click(): void;
}

export const DEFAULT_BUTTON_PROPS: ButtonProps = {
  disabled: false,
  autoFocus: false,
  onClick: () => {},
};