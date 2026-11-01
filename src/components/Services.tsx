import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { services } from '../lib/config';
import { useImageMap } from '../lib/useImages';
import { track } from '../lib/tracking';
import { scrollToForm } from '../lib/scroll';

const Services: React.FC = () => {
  const images = useImageMap();

  return (
    <section className="section section--alt" id="services">
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
                onClick={() => {
                  track('service_click', { service: s.title });
                  // Квіз сам обере відповідний тип виробу
                  scrollToForm({ service: s.title }, 'service_card');
                }}
                aria-label={`Розрахувати вартість: ${s.title}`}
              >
                <div className="service-card__img">
                  {img && <GatsbyImage image={img} alt={s.title} />}
                </div>
                <div className="service-card__body">
                  <div className="service-card__head">
                    <h3>{s.title}</h3>
                    {s.price && (
                      <span className="service-card__price">{s.price}</span>
                    )}
                  </div>
                  <p>{s.desc}</p>
                  <span
                    className="btn btn--ghost service-card__cta"
                    aria-hidden="true"
                  >
                    Розрахувати вартість
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
