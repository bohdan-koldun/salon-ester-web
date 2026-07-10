import { useState, type FormEvent } from 'react';
import { submitLead } from './leads/submitLead';
import { maskPhone, isValidPhone } from './phone';

interface UseLeadFormArgs {
  formName: string; // «Основна форма» | «Замовити дзвінок»
  buildMessage?: () => string;
}

export function useLeadForm({ formName, buildMessage }: UseLeadFormArgs) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>(
    'idle'
  );
  // 'validation' — некоректний телефон; 'server' — не вдалося доставити заявку.
  const [errorKind, setErrorKind] = useState<'validation' | 'server' | null>(
    null
  );

  const onPhoneChange = (v: string) => setPhone(maskPhone(v));

  const reset = () => {
    setName('');
    setPhone('');
    setStatus('idle');
    setErrorKind(null);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!isValidPhone(phone)) {
      setErrorKind('validation');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setErrorKind(null);
    const res = await submitLead({
      name,
      phone,
      message: buildMessage ? buildMessage() : '',
      form: formName,
      company,
    });
    if (res.ok) {
      setStatus('done');
    } else {
      setErrorKind('server');
      setStatus('error');
    }
  };

  return {
    name,
    setName,
    phone,
    onPhoneChange,
    company,
    setCompany,
    status,
    errorKind,
    submit,
    reset,
  };
}
