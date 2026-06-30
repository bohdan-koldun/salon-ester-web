import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ester_exit_shown';
const MOBILE_DELAY = 45000;

interface Options {
  enabled?: boolean; // вимкнути, якщо форма вже відправлена
}

/**
 * Exit-intent хук.
 * Desktop — спрацьовує на mouseleave вгору за межі вікна.
 * Mobile — за таймером (45с).
 * Показується один раз на сесію (localStorage).
 */
export function useExitIntent({ enabled = true }: Options = {}): [boolean, () => void] {
  const [triggered, setTriggered] = useState(false);

  const dismiss = () => setTriggered(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      try {
        window.localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setTriggered(true);
      cleanup();
    };

    const isTouch =
      window.matchMedia?.('(hover: none)').matches ||
      'ontouchstart' in window;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };

    if (isTouch) {
      timer = setTimeout(fire, MOBILE_DELAY);
    } else {
      document.documentElement.addEventListener('mouseleave', onMouseLeave);
    }

    return cleanup;
  }, [enabled]);

  return [triggered, dismiss];
}
