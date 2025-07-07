import { Badge } from '@/modules/core/ui/badge';
import { parseTime } from '@/modules/dashboard/core/lib/utils';
import { useEffect, useState } from 'react';

export default function Timer({ endDate }: { endDate: number }) {
  const [{ remaining, isEnded }, setTime] = useState({
    remaining: '00:00:00',
    isEnded: false,
  });

  useEffect(() => {
    const now = Date.now();
    const diff = endDate - now;

    if (diff <= 0)
      return () => setTime({ remaining: '00:00:00', isEnded: true });

    const updateTimer = () => {
      const now = Date.now();
      const diff = endDate - now;

      if (diff <= 0) {
        setTime({ remaining: '00:00:00', isEnded: true });
        return;
      }
      setTime({ remaining: parseTime(diff), isEnded: false });
    };

    const intervalId = setInterval(updateTimer, 1000); // luego cada segundo
    updateTimer(); // actualizar inmediatamente al montar
    return () => clearInterval(intervalId); // limpiar al desmontar
  }, [endDate]);

  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl py-2">
      {!isEnded && <b className="text-sm">Faltan</b>}
      <Badge>{isEnded ? '¡Ya inició!' : remaining}</Badge>
    </div>
  );
}
