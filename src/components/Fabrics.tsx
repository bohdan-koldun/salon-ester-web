import React, { useState } from 'react';
import { fabrics } from '../lib/config';
import LeadModal from './LeadModal';

const Fabrics: React.FC = () => {
  const [activeFabric, setActiveFabric] = useState<string | null>(null);

  return (
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
              onClick={() => setActiveFabric(f.title)}
              aria-label={`Підібрати тканину: ${f.title}`}
            >
              <span className="fabric-card__bar" aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className="link-cta" aria-hidden="true">
                Підібрати →
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeFabric && (
        <LeadModal
          key={activeFabric}
          open
          onClose={() => setActiveFabric(null)}
          formName={`Тканина: ${activeFabric}`}
          title="Підібрати тканину"
          subtitle={activeFabric}
          buttonLabel="Отримати підбір"
          footnote="Зателефонуємо й уточнимо деталі найближчим часом"
          defaultComment={`Цікавить тканина: ${activeFabric}`}
        />
      )}
    </section>
  );
};

export default Fabrics;
