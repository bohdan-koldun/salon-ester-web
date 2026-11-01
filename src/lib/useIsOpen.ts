import { useEffect, useState } from 'react';
import { contacts } from './config';

// Година за Києвом — незалежно від часового поясу відвідувача.
function kyivHour(): number {
  const h = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hourCycle: 'h23',
    timeZone: 'Europe/Kyiv',
  }).format(new Date());
  return Number(h);
}

/**
 * Чи працює салон зараз. До гідрації (SSR) — null, щоб не було розбіжності розмітки.
 */
export function useIsOpen(): boolean | null {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const h = kyivHour();
      setOpen(h >= contacts.openHours.from && h < contacts.openHours.to);
    };
    check();
    const id = window.setInterval(check, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return open;
}
