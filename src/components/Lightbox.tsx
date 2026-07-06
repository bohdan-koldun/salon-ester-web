import React, { useEffect, useRef } from 'react';
import { GatsbyImage, type IGatsbyImageData } from 'gatsby-plugin-image';

interface Props {
  images: IGatsbyImageData[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 40;

const Lightbox: React.FC<Props> = ({ images, index, onClose, onNavigate }) => {
  const count = images.length;
  const prev = () => onNavigate((index - 1 + count) % count);
  const next = () => onNavigate((index + 1) % count);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) prev();
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) next();
    touchDeltaX.current = 0;
  };

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
    <div
      className="lightbox"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Закрити">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 6 9 12 15 18" />
          </svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Lightbox;
