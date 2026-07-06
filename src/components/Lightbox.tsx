import React, { useEffect } from 'react';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

interface Props {
  images: IGatsbyImageData[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox: React.FC<Props> = ({ images, index, onClose, onNavigate }) => {
  const count = images.length;
  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  const image = images[index];
  if (!image) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox__close" onClick={onClose} aria-label="Закрити">
        ×
      </button>
      {count > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Попереднє"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          ‹
        </button>
      )}
      <div
        className="lightbox__img"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <GatsbyImage image={image} alt={`Робота ${index + 1}`} style={{ width: '100%', height: '100%' }} />
      </div>
      {count > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          aria-label="Наступне"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          ›
        </button>
      )}
    </div>
  );
};

export default Lightbox;
