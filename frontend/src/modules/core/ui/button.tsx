import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/modules/core/lib/utils';
import { buttonVariants } from '@/modules/core/lib/button';
import type { VariantProps } from 'tailwind-variants';
import type { ComponentProps } from 'react';

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
