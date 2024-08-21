import { ButtonProps } from '@/prototype/button';

export interface ShacnButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  iconOnly?: boolean;
}

export const SHADCN_BUTTON_DEFAULT_PROPS: ShacnButtonProps = {
  variant: 'secondary',
  iconOnly: false,
  disabled: false,
  autoFocus: false,
  onClick: () => {},
};
