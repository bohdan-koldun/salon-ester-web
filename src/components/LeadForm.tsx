import React, { useEffect, useState } from 'react';
import { quiz, services, viewReviewsUrl } from '../lib/config';
import { useLeadForm } from '../lib/useLeadForm';
import { track } from '../lib/tracking';
import { PREFILL_EVENT, type FormPrefill } from '../lib/scroll';
import { LockIcon } from './icons';

const PRODUCT_OPTIONS = [...quiz.products, quiz.notSure];

// Коротка назва з квізу → повна назва послуги (для тексту заявки)
const fullName = (short: string) =>
  services.find((s) => s.short === short)?.title ?? short;

interface ChipsProps {
  options: string[];
  selected: string[];
  onPick: (v: string) => void;
  grid?: boolean;
}

// Набір кнопок-варіантів; вибрані — aria-pressed.
const Chips: React.FC<ChipsProps> = ({ options, selected, onPick, grid }) => (
  <div className={grid ? 'chips chips--grid' : 'chips'}>
    {options.map((o) => (
      <button
        key={o}
        type="button"
        className="chip"
        aria-pressed={selected.includes(o)}
        onClick={() => onPick(o)}
      >
        {o}
      </button>
    ))}
  </div>
);

const STEP_TITLES = ['Що потрібно?', 'Розміри', 'Куди надіслати?'];

const LeadForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  // Нічого не обрано наперед і нічого не обов'язково: мета — контакт, деталі уточнимо
  const [products, setProducts] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [windows, setWindows] = useState(quiz.windows[0]);
  const [noSizes, setNoSizes] = useState(false);
  const [sizesError, setSizesError] = useState(false);
  const [channel, setChannel] = useState(quiz.channels[0]);
  const [comment, setComment] = useState('');

  const sizes = noSizes ? 'потрібен замір' : `${width}×${height} см`;
  // У порядку варіантів, а не кліків
  const picked = PRODUCT_OPTIONS.filter((o) => products.includes(o));
  const pickedRooms = quiz.rooms.filter((o) => rooms.includes(o));
  const choice = [picked.join(', '), pickedRooms.join(', ')]
    .filter(Boolean)
    .join(' · ');

  // «Ще не знаю» виключний: знімає решту, а будь-який інший варіант знімає його
  const toggleProduct = (o: string) =>
    setProducts((cur) => {
      if (cur.includes(o)) return cur.filter((x) => x !== o);
      if (o === quiz.notSure) return [o];
      return [...cur.filter((x) => x !== quiz.notSure), o];
    });

  const toggleRoom = (o: string) =>
    setRooms((cur) =>
      cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]
    );

  const form = useLeadForm({
    formName: 'Квіз: розрахунок вартості',
    buildMessage: () =>
      [
        `Що: ${picked.map(fullName).join(', ') || 'не вказано'}`,
        `Кімнати: ${pickedRooms.join(', ') || 'не вказано'}`,
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
      const matched = services.find((s) => s.title === detail.service)?.short;
      if (matched) setProducts([matched]);
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
    track('quiz_step', {
      step: '2',
      product: picked.join(', '),
      room: pickedRooms.join(', '),
    });
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
                порахуємо ваш проєкт.
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
                    Ваш вибір:{' '}
                    <strong>{choice || 'уточнимо по телефону'}</strong>
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
                    <legend>
                      Що хочете замовити?{' '}
                      <span className="quiz__legend-note">можна кілька</span>
                    </legend>
                    <Chips
                      grid
                      options={PRODUCT_OPTIONS}
                      selected={products}
                      onPick={toggleProduct}
                    />
                  </fieldset>
                  <fieldset className="quiz__group">
                    <legend>
                      Для яких кімнат?{' '}
                      <span className="quiz__legend-note">можна кілька</span>
                    </legend>
                    <Chips
                      options={quiz.rooms}
                      selected={rooms}
                      onPick={toggleRoom}
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
                      Можна приблизно й одного вікна — решту уточнимо на замірі.
                      Ширина — довжина карниза (або вікна), висота — від карниза
                      до підлоги.
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
                    <legend>Скільки вікон загалом?</legend>
                    <Chips
                      options={quiz.windows}
                      selected={[windows]}
                      onPick={setWindows}
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
                      selected={[channel]}
                      onPick={setChannel}
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
