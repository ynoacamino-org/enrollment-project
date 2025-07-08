import { cn } from '@/modules/core/lib/utils';
import Logo from '@/assets/logo.svg?react';
import { logoVariants } from '@/modules/core/lib/logo';
import type { VariantProps } from 'tailwind-variants';

interface LogoExtendedProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

function LogoExtended({ size, className }: LogoExtendedProps) {
  return (
    <div className={cn(logoVariants({ size }), className)}>
      <Logo className="h-full" />
      <span className="font-semibold">Tuitions</span>
    </div>
  );
}

export { LogoExtended };
