import { track } from '../tracking';
import type { LeadPayload, SubmitResult } from './types';

const ENDPOINT = '/lead.php';

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const url =
    payload.url ?? (typeof window !== 'undefined' ? window.location.href : '');

  const body = new URLSearchParams({
    name: payload.name,
    phone: payload.phone,
    message: payload.message ?? '',
    form: payload.form,
    url,
    company: payload.company ?? '', // honeypot — завжди порожнє
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const data = (await res.json().catch(() => ({ ok: res.ok }))) as SubmitResult;
    const ok = Boolean(data?.ok ?? res.ok);
    if (ok) {
      track('lead_submit', { label: payload.form, form: payload.form });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('ester:lead'));
      }
    }
    return { ok };
  } catch {
    return { ok: false };
  }
}
