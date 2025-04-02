import { ButtonProps } from '@/next-core/behaviors/as-button';

export interface ShadcnButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  iconOnly?: boolean;
}

export const SHADCN_BUTTON_DEFAULT_PROPS: ShadcnButtonProps = {
  variant: 'secondary',
  iconOnly: false,
  disabled: false,
  autoFocus: false,
  onClick: () => {},
};
