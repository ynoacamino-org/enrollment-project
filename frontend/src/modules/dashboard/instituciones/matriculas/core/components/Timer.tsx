import { useEffect, useState } from 'react';

export default function Timer({ endDate }: { endDate: number }) {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const diff = endDate - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(intervalId);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formatted = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0'),
      ].join(':');

      setTimeLeft(formatted);
    };

    updateTimer(); // actualizar inmediatamente al montar
    const intervalId = setInterval(updateTimer, 1000); // luego cada segundo

    return () => clearInterval(intervalId); // limpiar al desmontar
  }, [endDate]);

  return <span>{timeLeft}</span>;
}
