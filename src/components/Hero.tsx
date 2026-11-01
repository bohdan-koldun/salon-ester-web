import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { stats, pricing, reviewsSummary } from '../lib/config';
import { useLeadForm } from '../lib/useLeadForm';
import { useGooglePlace } from '../lib/useGooglePlace';
import { plural } from '../lib/plural';
import MessengerLinks from './MessengerLinks';
import { LockIcon } from './icons';

const Hero: React.FC = () => {
  const place = useGooglePlace();
  const rating = place?.rating ?? reviewsSummary.rating;
  const count = place?.count ?? reviewsSummary.count;

  const form = useLeadForm({ formName: 'Hero: дізнатись вартість' });

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <StaticImage
          src="../images/hero.png"
          alt="Інтер'єр зі шторами на замовлення"
          layout="fullWidth"
          loading="eager"
          placeholder="blurred"
          formats={['auto', 'webp']}
          quality={75}
          style={{ height: '100%' }}
        />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <a href="#reviews" className="hero__rating">
            <span className="hero__stars" aria-hidden="true">
              ★★★★★
            </span>
            <span>
              <strong>{rating.toFixed(1)}</strong> · {count}{' '}
              {plural(count, ['відгук', 'відгуки', 'відгуків'])} на Google
            </span>
          </a>
          <h1>Штори на замовлення в Києві</h1>
          <p className="hero__sub">
            Виїзд дизайнера, індивідуальний проєкт, пошив та монтаж під ключ.
            Ціну знаєте ще до замовлення.
          </p>
          {pricing.items.length > 0 && (
            <ul className="hero__prices">
              {pricing.items.map((item) => (
                <li className="hero__price" key={item.label}>
                  <span className="hero__price-label">{item.label}</span>
                  <span className="hero__price-value">
                    {item.price}
                    <small> / {item.unitShort}</small>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="hero__micro">
            Понад {stats.years} років досвіду · {stats.projects}+ виконаних
            проєктів · власний цех
          </p>
        </div>

        <div className="hero__card">
          {form.status === 'done' ? (
            <div className="hero__done">
              <div className="form-success__icon">✓</div>
              <h2>Дякуємо!</h2>
              <p>
                Передзвонимо найближчим часом, уточнимо розміри й порахуємо
                проєкт.
              </p>
            </div>
          ) : (
            <form className="form" onSubmit={form.submit} noValidate>
              <h2>Дізнайтесь вартість ваших штор</h2>
              <p className="hero__card-text">
                Залиште номер — передзвонимо, уточнимо розміри й порахуємо
                проєкт. Без зобов'язань.
              </p>
              <div className="field">
                <label htmlFor="hero-phone">Телефон</label>
                <input
                  id="hero-phone"
                  type="tel"
                  placeholder="+380 __ ___ __ __"
                  value={form.phone}
                  onChange={(e) => form.onPhoneChange(e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  required
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
                  {form.errorKind === 'validation'
                    ? 'Перевірте номер телефону та спробуйте ще раз.'
                    : 'Не вдалося надіслати заявку. Напишіть нам у месенджер нижче.'}
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

              <div className="or-line">або напишіть нам</div>
              <MessengerLinks source="hero" />

              <p className="form__note">
                <LockIcon /> Номер не передаємо третім особам
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
