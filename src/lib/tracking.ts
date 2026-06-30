declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
  if (event === 'lead_submit') {
    window.fbq?.('track', 'Lead', params);
  }
}

export {};
