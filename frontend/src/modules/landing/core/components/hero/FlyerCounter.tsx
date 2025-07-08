import { cn } from '@/modules/core/lib/utils';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

interface FlyerProps {
  until: number;
  exp: string;
  className?: string;
}

export default function FlyerCounter({ until, exp, className }: FlyerProps) {
  const rawValue = useMotionValue<number>(0);
  const [display, setDisplay] = useState(0);
  const value = useSpring(rawValue, {
    damping: 100,
    stiffness: 80,
  });
  useEffect(() => {
    rawValue.set(until);
    value.on('change', (v) => {
      setDisplay(Math.floor(v));
    });
  }, [rawValue, value]);
  return (
    <div
      className={cn(
        'bg-black/50 rounded-lg grid place-content-center place-items-center gap-y-2 text-white',
        className,
      )}
    >
      <motion.span className="text-6xl">{display}</motion.span>
      <span className="text-2xl">{exp}</span>
    </div>
  );
}
