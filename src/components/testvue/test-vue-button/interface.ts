import { ButtonProps } from '@/core/behaviors/as-button';

export interface TestButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  iconOnly?: boolean;
}

export const TEST_BUTTON_DEFAULT_PROPS: TestButtonProps = {
  variant: 'secondary',
  iconOnly: false,
  disabled: false,
  autoFocus: false,
  onClick: () => {},
};
