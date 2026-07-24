import React from 'react';
import { pricing } from '../lib/config';
import { scrollToForm } from '../lib/scroll';

const Pricing: React.FC = () => (
  <section className="section pricing" id="pricing">
    <div className="container">
      {pricing.badge && <span className="pricing__badge">{pricing.badge}</span>}
      <h2>{pricing.title}</h2>
      <p className="pricing__text">{pricing.text}</p>
      {pricing.items.length > 0 && (
        <>
          <ul className="pricing__list">
            {pricing.items.map((item) => (
              <li className="pricing__item" key={item.label}>
                <span className="pricing__item-label">{item.label}</span>
                <span className="pricing__item-price">{item.price}</span>
                <span className="pricing__item-unit">{item.unit}</span>
              </li>
            ))}
          </ul>
          <p className="pricing__note">{pricing.itemsNote}</p>
        </>
      )}
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
