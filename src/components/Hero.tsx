import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { stats, pricing } from '../lib/config';
import { scrollToForm } from '../lib/scroll';

const Hero: React.FC = () => (
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
        {pricing.badge && <span className="hero__badge">{pricing.badge}</span>}
        <h1>Штори на замовлення в Києві</h1>
        <p className="hero__sub">
          Виїзд дизайнера, індивідуальний проєкт, пошив та монтаж під ключ.
        </p>
        {pricing.items.length > 0 && (
          <p className="hero__prices">
            {pricing.items.map((item) => (
              <span className="hero__price" key={item.label}>
                {item.label} <strong>{item.price}</strong>/{item.unitShort}
              </span>
            ))}
          </p>
        )}
        <button
          className="btn hero__cta"
          onClick={() => scrollToForm(undefined, 'hero')}
        >
          Розрахувати вартість
        </button>
        <p className="hero__micro">
          Понад {stats.years} років досвіду · {stats.projects}+ виконаних
          проєктів
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
