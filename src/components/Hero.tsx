import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { stats } from '../lib/config';
import { scrollToForm } from '../lib/scroll';

const Hero: React.FC = () => (
  <section className="hero" id="hero">
    <div className="hero__bg">
      <StaticImage
        src="../images/hero.jpg"
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
        <h1>Штори на замовлення в Києві</h1>
        <p className="hero__sub">
          Безкоштовний виїзд дизайнера, індивідуальний проєкт, пошив та монтаж —
          від {stats.sewingDays} днів.
        </p>
        <button className="btn hero__cta" onClick={() => scrollToForm()}>
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
