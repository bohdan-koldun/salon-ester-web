export interface LeadPayload {
  name: string;
  phone: string;
  message?: string;
  form: string; // «Основна форма» | «Замовити дзвінок»
  url?: string;
  company?: string; // honeypot
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}
