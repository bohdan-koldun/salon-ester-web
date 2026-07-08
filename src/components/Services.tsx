import React, { useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { services } from '../lib/config';
import { useImageMap } from '../lib/useImages';
import LeadModal from './LeadModal';

const Services: React.FC = () => {
  const images = useImageMap();
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <section className="section section--bg" id="services">
      <div className="container">
        <div className="section__head">
          <h2>Що ми робимо</h2>
        </div>

        <div className="services-grid">
          {services.map((s) => {
            const img = images[`services/${s.image}`];
            return (
              <button
                type="button"
                className="service-card"
                key={s.key}
                onClick={() => setActiveService(s.title)}
                aria-label={`Розрахувати вартість: ${s.title}`}
              >
                <div className="service-card__img">
                  {img && <GatsbyImage image={img} alt={s.title} />}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="link-cta" aria-hidden="true">
                  Дізнатись вартість →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeService && (
        <LeadModal
          key={activeService}
          open
          onClose={() => setActiveService(null)}
          formName={`Послуга: ${activeService}`}
          title="Розрахувати вартість"
          subtitle={activeService}
          buttonLabel="Отримати розрахунок"
          footnote="Зателефонуємо й уточнимо деталі найближчим часом"
          defaultComment={`Цікавить послуга: ${activeService}`}
        />
      )}
    </section>
  );
};

export default Services;
