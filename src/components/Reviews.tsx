import React, { useState } from 'react';
import { writeReviewUrl } from '../lib/config';
import { useGooglePlace } from '../lib/useGooglePlace';

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="stars" aria-label={`${rating} з 5`}>
    {'★'.repeat(Math.round(rating)).padEnd(5, '☆')}
  </span>
);

const Avatar: React.FC<{ author: string; src?: string }> = ({
  author,
  src,
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <>{author.charAt(0)}</>;
  }

  return (
    <img
      src={src}
      alt={author}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
};

const Reviews: React.FC = () => {
  const data = useGooglePlace();

  return (
    <section className="section section--alt" id="reviews">
      <div className="container">
        <div className="section__head">
          <h2>Що кажуть наші клієнти</h2>
        </div>

        {data && data.reviews.length > 0 ? (
          <>
            <p className="reviews__summary">
              <Stars rating={data.rating} />{' '}
              <strong>{data.rating.toFixed(1)}</strong> — {data.count} відгуків
              на Google
            </p>

            <div className="reviews__track">
              {data.reviews.map((r, i) => (
                <article className="review-card" key={i}>
                  <div className="review-card__head">
                    <div className="review-card__avatar">
                      <Avatar author={r.author} src={r.avatar} />
                    </div>
                    <div>
                      <div className="review-card__name">{r.author}</div>
                      <div className="review-card__date">{r.date}</div>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                  <p className="review-card__text">{r.text}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="reviews__summary">
            Перегляньте відгуки наших клієнтів на Google.
          </p>
        )}

        <div className="reviews__cta">
          <a
            className="btn btn--ghost"
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Залишити відгук на Google →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
