import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { services } from '../lib/config';
import { useImageMap } from '../lib/useImages';
import { scrollToForm } from '../lib/scroll';

const Services: React.FC = () => {
  const images = useImageMap();

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
              <article className="service-card" key={s.key}>
                <div className="service-card__img">
                  {img && <GatsbyImage image={img} alt={s.title} />}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button
                  className="link-cta"
                  onClick={() => scrollToForm({ service: s.title })}
                >
                  Дізнатись вартість →
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
