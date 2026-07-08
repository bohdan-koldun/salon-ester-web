import React from 'react';
import { faq } from '../lib/config';

const Faq: React.FC = () => (
  <section className="section section--bg" id="faq">
    <div className="container">
      <div className="section__head">
        <h2>Часті запитання</h2>
        <p>Відповіді на те, що найчастіше запитують перед замовленням.</p>
      </div>

      <div className="faq">
        {faq.map((item, i) => (
          <details className="faq__item" key={i}>
            <summary className="faq__q">
              <span>{item.q}</span>
              <span className="faq__icon" aria-hidden="true" />
            </summary>
            <p className="faq__a">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
