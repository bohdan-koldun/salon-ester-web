// Допоміжні функції для скролу до форми та передачі контексту в неї.

export const PREFILL_EVENT = 'ester:prefill-form';

export interface FormPrefill {
  service?: string; // значення select
  message?: string; // додатковий текст у коментар
}

/**
 * Прокрутка до основної форми (#form) з опційним заповненням select/коментаря.
 */
export function scrollToForm(prefill?: FormPrefill) {
  if (typeof window === 'undefined') return;
  if (prefill) {
    window.dispatchEvent(
      new CustomEvent<FormPrefill>(PREFILL_EVENT, { detail: prefill })
    );
  }
  const el = document.getElementById('form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
