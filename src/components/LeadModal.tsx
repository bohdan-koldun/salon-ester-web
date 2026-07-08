import React, { useEffect, useState } from 'react';
import { useLeadForm } from '../lib/useLeadForm';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';

interface Props {
  open: boolean;
  onClose: () => void;
  formName: string;
  title: string;
  subtitle?: string;
  buttonLabel: string;
  footnote?: string;
  buildMessage?: () => string;
  /** Наперед заповнений текст поля «Коментар». Якщо заданий — поле показується. */
  defaultComment?: string;
  /** Явно показати поле «Коментар» (навіть порожнім). */
  withComment?: boolean;
}

const LeadModal: React.FC<Props> = ({
  open,
  onClose,
  formName,
  title,
  subtitle,
  buttonLabel,
  footnote,
  buildMessage,
  defaultComment,
  withComment,
}) => {
  const showComment = withComment ?? Boolean(defaultComment);
  const [comment, setComment] = useState(defaultComment ?? '');
  const form = useLeadForm({
    formName,
    buildMessage: showComment ? () => comment : buildMessage,
  });

  // Esc для закриття + блокування скролу body
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Закрити">
          ×
        </button>

        {form.status === 'done' ? (
          <div style={{ textAlign: 'center' }}>
            <div className="form-success__icon">✓</div>
            <h3>Дякуємо{form.name ? `, ${form.name}` : ''}!</h3>
            <p className="modal__sub">
              Ми звʼяжемося з вами найближчим часом.
            </p>
          </div>
        ) : (
          <>
            <h3>{title}</h3>
            {subtitle && <p className="modal__sub">{subtitle}</p>}

            <form className="form" onSubmit={form.submit} noValidate>
              <div className="field">
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  value={form.name}
                  onChange={(e) => form.setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <input
                  type="tel"
                  placeholder="+380"
                  value={form.phone}
                  onChange={(e) => form.onPhoneChange(e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              {showComment && (
                <div className="field">
                  <textarea
                    placeholder="Коментар"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

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
                  {form.errorKind === 'validation'
                    ? 'Перевірте номер телефону та спробуйте ще раз.'
                    : 'Не вдалося надіслати заявку. Зателефонуйте нам або спробуйте пізніше.'}
                </div>
              )}

              <button
                type="submit"
                className="btn btn--block"
                disabled={form.status === 'sending'}
              >
                {form.status === 'sending' ? 'Надсилаємо…' : buttonLabel}
              </button>
            </form>

            {footnote && <p className="modal__footnote">{footnote}</p>}

            <div className="modal__direct">
              <div className="modal__direct-label">
                або зв'яжіться напряму:
              </div>
              <div className="modal__direct-links">
                <a
                  href={`tel:${contacts.phoneTel}`}
                  className="modal__direct-phone"
                  onClick={() => track('phone_click', { source: 'popup' })}
                >
                  {contacts.phone}
                </a>
                <a
                  href={contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track('messenger_click', { channel: 'telegram' })
                  }
                >
                  Telegram
                </a>
                <a
                  href={contacts.viber}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('messenger_click', { channel: 'viber' })}
                >
                  Viber
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
