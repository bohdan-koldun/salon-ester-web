import React, { useEffect, useState } from 'react';
import { serviceOptions, writeReviewUrl } from '../lib/config';
import { useLeadForm } from '../lib/useLeadForm';
import { PREFILL_EVENT, type FormPrefill } from '../lib/scroll';

const LeadForm: React.FC = () => {
  const [service, setService] = useState('');
  const [comment, setComment] = useState('');

  const form = useLeadForm({
    formName: 'Основна форма',
    buildMessage: () => [service, comment].filter(Boolean).join('. '),
  });

  // Реагуємо на «Дізнатись вартість» / «Підібрати тканину»
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<FormPrefill>).detail;
      if (!detail) return;
      if (detail.service) setService(detail.service);
      if (detail.message) {
        setComment((c) => (c ? c : detail.message ?? ''));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  return (
    <section className="section lead" id="form">
      <div className="container lead__grid">
        {form.status === 'done' ? (
          <div className="form-success">
            <div className="form-success__icon">✓</div>
            <h3>Дякуємо, {form.name || 'друже'}!</h3>
            <p>Ми звʼяжемося з вами найближчим часом.</p>
            <div className="form-success__divider">Були у нас раніше?</div>
            <a
              className="btn btn--ghost"
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Залишити відгук на Google →
            </a>
          </div>
        ) : (
          <>
            <div className="section__head">
              <h2>Розрахуйте вартість ваших штор</h2>
              <p>
                Залиште контакт — ми зателефонуємо та допоможемо підібрати
                рішення під ваш інтер'єр та бюджет.
              </p>
            </div>

            <form className="form" onSubmit={form.submit} noValidate>
              <div className="field">
                <label htmlFor="lf-name">Ім'я</label>
                <input
                  id="lf-name"
                  type="text"
                  placeholder="Ваше ім'я"
                  value={form.name}
                  onChange={(e) => form.setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="lf-phone">Телефон</label>
                <input
                  id="lf-phone"
                  type="tel"
                  placeholder="+380"
                  value={form.phone}
                  onChange={(e) => form.onPhoneChange(e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="lf-service">Послуга</label>
                <select
                  id="lf-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">Оберіть послугу</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="lf-comment">Коментар</label>
                <textarea
                  id="lf-comment"
                  placeholder="Опишіть ваше завдання (необов'язково)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* honeypot */}
              <input
                className="honeypot"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => form.setCompany(e.target.value)}
                aria-hidden="true"
              />

              {form.status === 'error' && (
                <div className="form__error">
                  Перевірте номер телефону та спробуйте ще раз.
                </div>
              )}

              <button
                type="submit"
                className="btn btn--block"
                disabled={form.status === 'sending'}
              >
                {form.status === 'sending'
                  ? 'Надсилаємо…'
                  : 'Розрахувати вартість'}
              </button>

              <p className="form__note">
                🔒 Ваші дані захищені і не передаються третім особам
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default LeadForm;
