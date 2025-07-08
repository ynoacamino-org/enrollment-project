import { cn } from '@/modules/core/lib/utils';
import { Button } from '@/modules/core/ui/button';
import React from 'react';
import type { buttonVariants } from '@/modules/core/lib/button';
import type { VariantProps } from 'tailwind-variants';

function Link({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<'a'> & VariantProps<typeof buttonVariants>) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn('text-sm font-medium py-1', className)}
    >
      <a {...props}>{children}</a>
    </Button>
  );
}

export { Link };
