import { tv } from 'tailwind-variants';

export const logoVariants = tv({
  base: 'inline-flex items-center',
  variants: {
    size: {
      sm: 'h-4 text-sm gap-x-0.5',
      md: 'h-6 text-lg gap-x-1',
      lg: 'h-8 text-xl gap-x-2',
      xl: 'h-10 text-3xl gap-x-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
