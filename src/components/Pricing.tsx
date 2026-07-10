import React from 'react';
import { pricing } from '../lib/config';
import { scrollToForm } from '../lib/scroll';

const Pricing: React.FC = () => (
  <section className="section pricing" id="pricing">
    <div className="container">
      <h2>{pricing.title}</h2>
      <p className="pricing__text">{pricing.text}</p>
      <div className="pricing__cta">
        <button
          className="btn btn--light"
          onClick={() => scrollToForm(undefined, 'pricing')}
        >
          Розрахувати вартість
        </button>
      </div>
    </div>
  </section>
);

export default Pricing;
