declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const CONTACT_ENDPOINT = '/lead.php';
// Канали, клік по яких означає «може зараз написати/подзвонити». Instagram не сповіщаємо.
const HOT_CHANNELS = ['viber', 'telegram', 'whatsapp'];
// Не спамити: один канал — не частіше ніж раз на 60 с у межах сесії сторінки.
const lastNotified = new Map<string, number>();

function notifyContactClick(channel: string, source?: string) {
  const now = Date.now();
  const prev = lastNotified.get(channel);
  if (prev && now - prev < 60_000) return;
  lastNotified.set(channel, now);

  const body = new URLSearchParams({
    type: 'click',
    channel,
    source: source ?? '',
    url: window.location.pathname + window.location.search + window.location.hash,
  }).toString();

  // sendBeacon переживає перехід у дзвонилку/застосунок месенджера, на відміну від fetch.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], {
        type: 'application/x-www-form-urlencoded',
      });
      navigator.sendBeacon(CONTACT_ENDPOINT, blob);
      return;
    }
  } catch {
    /* впадемо у fetch нижче */
  }

  void fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function track(event: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
  if (event === 'lead_submit') {
    window.fbq?.('track', 'Lead', params);
  }

  // «Гарячий» клік по контакту → миттєве сповіщення в Telegram.
  if (event === 'phone_click') {
    notifyContactClick('phone', params?.source);
  } else if (
    event === 'messenger_click' &&
    params?.channel &&
    HOT_CHANNELS.includes(params.channel)
  ) {
    notifyContactClick(params.channel, params.source);
  }
}

export {};
