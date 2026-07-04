import React from 'react';
import { fabrics } from '../lib/config';
import { scrollToForm } from '../lib/scroll';

const Fabrics: React.FC = () => (
  <section className="section section--alt" id="fabrics">
    <div className="container">
      <div className="section__head">
        <h2>Фактури тканин</h2>
        <p>
          Працюємо з перевіреними тканинами під будь-яку задачу — від щільного
          блекауту до легкої вуалі.
        </p>
      </div>

      <div className="fabrics-grid">
        {fabrics.map((f) => (
          <button
            className="fabric-card"
            key={f.key}
            onClick={() => scrollToForm({ message: `Цікавить тканина: ${f.title}` })}
          >
            <span className="fabric-card__bar" aria-hidden="true" />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <span className="link-cta">Підібрати →</span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default Fabrics;
