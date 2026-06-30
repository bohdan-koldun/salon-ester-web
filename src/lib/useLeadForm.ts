import { useState, type FormEvent } from 'react';
import { submitLead } from './leads/submitLead';
import { maskPhone, isValidPhone } from './phone';

interface UseLeadFormArgs {
  formName: string; // «Основна форма» | «Замовити дзвінок» | «Exit-intent»
  buildMessage?: () => string;
}

export function useLeadForm({ formName, buildMessage }: UseLeadFormArgs) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>(
    'idle'
  );

  const onPhoneChange = (v: string) => setPhone(maskPhone(v));

  const reset = () => {
    setName('');
    setPhone('');
    setStatus('idle');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!isValidPhone(phone)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const res = await submitLead({
      name,
      phone,
      message: buildMessage ? buildMessage() : '',
      form: formName,
      company,
    });
    setStatus(res.ok ? 'done' : 'error');
  };

  return {
    name,
    setName,
    phone,
    onPhoneChange,
    company,
    setCompany,
    status,
    submit,
    reset,
  };
}
