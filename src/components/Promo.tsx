import React from 'react';
import { promo } from '../lib/config';
import { scrollToForm } from '../lib/scroll';

const Promo: React.FC = () => (
  <section className="section promo" id="promo">
    <div className="container">
      <h2>{promo.text}</h2>
      <p className="promo__date">Діє до {promo.date}</p>
      <div className="promo__cta">
        <button
          className="btn btn--light"
          onClick={() => scrollToForm({ message: `Акція: ${promo.text}` })}
        >
          Скористатися акцією
        </button>
      </div>
    </div>
  </section>
);

export default Promo;
