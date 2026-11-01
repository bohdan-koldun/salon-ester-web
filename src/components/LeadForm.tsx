import React, { useEffect, useState } from 'react';
import { quiz, viewReviewsUrl } from '../lib/config';
import { useLeadForm } from '../lib/useLeadForm';
import { track } from '../lib/tracking';
import { PREFILL_EVENT, type FormPrefill } from '../lib/scroll';
import { LockIcon } from './icons';

// Варіант квізу, якому відповідає назва послуги з scrollToForm.
function productForService(service: string) {
  return quiz.products.find((p) => p.services.includes(service))?.label;
}

interface ChipsProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  grid?: boolean;
}

// Набір кнопок-варіантів із одним вибраним (aria-pressed).
const Chips: React.FC<ChipsProps> = ({ options, value, onChange, grid }) => (
  <div className={grid ? 'chips chips--grid' : 'chips'}>
    {options.map((o) => (
      <button
        key={o}
        type="button"
        className="chip"
        aria-pressed={value === o}
        onClick={() => onChange(o)}
      >
        {o}
      </button>
    ))}
  </div>
);

const STEP_TITLES = ['Що потрібно?', 'Розміри', 'Куди надіслати?'];
const NOT_SURE = quiz.products[quiz.products.length - 1].label; // «Ще не знаю»

const LeadForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [product, setProduct] = useState(quiz.products[0].label);
  const [room, setRoom] = useState(quiz.rooms[0]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [windows, setWindows] = useState(quiz.windows[0]);
  const [noSizes, setNoSizes] = useState(false);
  const [sizesError, setSizesError] = useState(false);
  const [channel, setChannel] = useState(quiz.channels[0]);
  const [comment, setComment] = useState('');

  const sizes = noSizes ? 'потрібен замір' : `${width}×${height} см`;

  const form = useLeadForm({
    formName: 'Квіз: розрахунок вартості',
    buildMessage: () =>
      [
        `Що: ${product}`,
        `Кімната: ${room}`,
        `Розміри: ${sizes}`,
        `Вікон: ${windows}`,
        `Зв'язок: ${channel}`,
        comment,
      ]
        .filter(Boolean)
        .join('. '),
  });

  // Реагуємо на «Дізнатись вартість» / «Підібрати тканину»
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<FormPrefill>).detail;
      if (!detail) return;
      const matched = detail.service && productForService(detail.service);
      // Послуга без відповідника (карнизи, текстиль) → «Ще не знаю» + назва в коментар
      if (detail.service) setProduct(matched || NOT_SURE);
      setComment(
        [
          !matched && detail.service ? `Послуга: ${detail.service}` : '',
          detail.message ?? '',
        ]
          .filter(Boolean)
          .join('. ')
      );
      setStep(1);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const goSizes = () => {
    track('quiz_step', { step: '2', product, room });
    setStep(2);
  };

  const goContacts = () => {
    if (!noSizes && !(Number(width) > 0 && Number(height) > 0)) {
      setSizesError(true);
      return;
    }
    setSizesError(false);
    track('quiz_step', { step: '3', sizes: noSizes ? 'measure' : 'given' });
    setStep(3);
  };

  // Лише цифри, до 4 знаків (см)
  const onSize = (set: (v: string) => void) => (v: string) =>
    set(v.replace(/\D/g, '').slice(0, 4));

  return (
    <section className="section lead" id="form">
      <div className="container lead__grid">
        <div className="lead__intro">
          <span className="eyebrow eyebrow--accent">Розрахунок за 3 кроки</span>
          <h2>Розрахуйте вартість ваших штор</h2>
          <p>
            Оберіть, що потрібно, вкажіть розміри й залиште номер. Порахуємо
            рішення під ваш інтер'єр і бюджет — ціну знаєте ще до замовлення,
            без прихованих доплат.
          </p>
          <ol className="lead__steps">
            {quiz.nextSteps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        <div className="lead__card">
          {form.status === 'done' ? (
            <div className="form-success">
              <div className="form-success__icon">✓</div>
              <h3>Дякуємо!</h3>
              <p>
                Зв'яжемося з вами ({channel.toLowerCase()}) найближчим часом і
                порахуємо {product.toLowerCase()} для кімнати «{room}».
              </p>
              <div className="form-success__divider">Були у нас раніше?</div>
              <a
                className="btn btn--ghost"
                href={viewReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Відгуки на Google →
              </a>
            </div>
          ) : (
            <form className="form quiz" onSubmit={form.submit} noValidate>
              <div className="quiz__progress">
                <span>Крок {step} з 3</span>
                <span>{STEP_TITLES[step - 1]}</span>
              </div>
              <div className="quiz__bar" aria-hidden="true">
                <span style={{ width: `${(step / 3) * 100}%` }} />
              </div>

              {step > 1 && (
                <div className="quiz__summary">
                  <span>
                    Ваш вибір: <strong>{product}</strong> · {room}
                    {step === 3 && ` · ${sizes}`}
                  </span>
                  <button
                    type="button"
                    className="quiz__back"
                    onClick={() => setStep(step === 3 ? 2 : 1)}
                  >
                    Змінити
                  </button>
                </div>
              )}

              {step === 1 ? (
                <>
                  <fieldset className="quiz__group">
                    <legend>Що хочете замовити?</legend>
                    <Chips
                      grid
                      options={quiz.products.map((p) => p.label)}
                      value={product}
                      onChange={setProduct}
                    />
                  </fieldset>
                  <fieldset className="quiz__group">
                    <legend>Для якої кімнати?</legend>
                    <Chips
                      options={quiz.rooms}
                      value={room}
                      onChange={setRoom}
                    />
                  </fieldset>
                  <button
                    type="button"
                    className="btn btn--block btn--lg"
                    onClick={goSizes}
                  >
                    Далі — розміри →
                  </button>
                </>
              ) : step === 2 ? (
                <>
                  <fieldset className="quiz__group">
                    <legend>Розміри вікна, см</legend>
                    <p className="quiz__hint">
                      Можна приблизно. Ширина — довжина карниза (або вікна),
                      висота — від карниза до підлоги.
                    </p>
                    <div className="quiz__sizes">
                      <div className="field">
                        <label htmlFor="lf-width">Ширина</label>
                        <input
                          id="lf-width"
                          type="text"
                          inputMode="numeric"
                          placeholder="напр. 300"
                          value={width}
                          disabled={noSizes}
                          onChange={(e) => onSize(setWidth)(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="lf-height">Висота</label>
                        <input
                          id="lf-height"
                          type="text"
                          inputMode="numeric"
                          placeholder="напр. 260"
                          value={height}
                          disabled={noSizes}
                          onChange={(e) => onSize(setHeight)(e.target.value)}
                        />
                      </div>
                    </div>
                    <label className="quiz__check">
                      <input
                        type="checkbox"
                        checked={noSizes}
                        onChange={(e) => {
                          setNoSizes(e.target.checked);
                          setSizesError(false);
                        }}
                      />
                      Не знаю розмірів — потрібен замір
                    </label>
                  </fieldset>

                  <fieldset className="quiz__group">
                    <legend>Скільки вікон?</legend>
                    <Chips
                      options={quiz.windows}
                      value={windows}
                      onChange={setWindows}
                    />
                  </fieldset>

                  {sizesError && (
                    <div className="form__error">
                      Вкажіть ширину й висоту або позначте, що потрібен замір.
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn--block btn--lg"
                    onClick={goContacts}
                  >
                    Далі — останній крок →
                  </button>
                </>
              ) : (
                <>
                  <div className="field">
                    <label htmlFor="lf-phone">Ваш телефон</label>
                    <input
                      id="lf-phone"
                      type="tel"
                      placeholder="+380 __ ___ __ __"
                      value={form.phone}
                      onChange={(e) => form.onPhoneChange(e.target.value)}
                      inputMode="tel"
                      autoComplete="tel"
                      required
                    />
                  </div>

                  <fieldset className="quiz__group">
                    <legend>Як зручніше отримати розрахунок?</legend>
                    <Chips
                      grid
                      options={quiz.channels}
                      value={channel}
                      onChange={setChannel}
                    />
                  </fieldset>

                  {comment && (
                    <div className="field">
                      <label htmlFor="lf-comment">Коментар</label>
                      <textarea
                        id="lf-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={2}
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
                    className="btn btn--block btn--lg"
                    disabled={form.status === 'sending'}
                  >
                    {form.status === 'sending'
                      ? 'Надсилаємо…'
                      : 'Отримати розрахунок'}
                  </button>

                  <p className="form__note">
                    <LockIcon /> Номер не передаємо третім особам
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
