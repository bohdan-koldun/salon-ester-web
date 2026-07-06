import React, { useState } from 'react';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';
import { gallery } from '../lib/config';
import { useImageMap, useLargeImageMap } from '../lib/useImages';
import { scrollToForm } from '../lib/scroll';
import Lightbox from './Lightbox';

const Gallery: React.FC = () => {
  const images = useImageMap();
  const largeImages = useLargeImageMap();
  const [active, setActive] = useState<number | null>(null);

  const items: IGatsbyImageData[] = gallery
    .map((file) => images[`gallery/${file}`])
    .filter(Boolean) as IGatsbyImageData[];

  const largeItems: IGatsbyImageData[] = gallery
    .map((file) => largeImages[`gallery/${file}`])
    .filter(Boolean) as IGatsbyImageData[];

  if (items.length === 0) return null;

  return (
    <section className="section section--alt" id="gallery">
      <div className="container">
        <div className="section__head">
          <h2>Наші роботи</h2>
        </div>

        <div className="gallery-grid">
          {items.map((img, i) => (
            <button
              className="gallery-item"
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Відкрити роботу ${i + 1}`}
            >
              <GatsbyImage image={img} alt={`Робота ${i + 1}`} />
            </button>
          ))}
        </div>

        <div className="gallery__cta">
          <button className="btn" onClick={() => scrollToForm()}>
            Хочу так само — замовити консультацію
          </button>
        </div>
      </div>

      {active !== null && (
        <Lightbox
          images={largeItems}
          index={active}
          onClose={() => setActive(null)}
          onNavigate={setActive}
        />
      )}
    </section>
  );
};

export default Gallery;
