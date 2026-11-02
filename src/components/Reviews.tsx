import React, { useState } from 'react';
import {
  writeReviewUrl,
  viewReviewsUrl,
  stats,
  reviewsSummary,
  fallbackReviews,
} from '../lib/config';
import { useGooglePlace, type GooglePlaceReview } from '../lib/useGooglePlace';
import { plural } from '../lib/plural';

// Скільки відгуків видно до «Показати ще»: мобільний і десктоп — 3, планшет (2 колонки) — 4.
// Ті самі числа — у CSS (.review-card:nth-child) і в класах кнопки нижче.
const VISIBLE = { mobile: 3, tablet: 4, desktop: 3 };
// Довші за це тексти обрізаємо й даємо «Читати повністю»
const LONG_TEXT = 220;

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

const ReviewCard: React.FC<{ review: GooglePlaceReview }> = ({ review: r }) => {
  const [open, setOpen] = useState(false);
  const long = r.text.length > LONG_TEXT;

  return (
    <article className="review-card">
      <Stars rating={r.rating} />
      <p
        className={`review-card__text${
          long && !open ? ' review-card__text--clamped' : ''
        }`}
      >
        {r.text}
      </p>
      {long && (
        <button
          type="button"
          className="review-card__more"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Згорнути' : 'Читати повністю'}
        </button>
      )}
      <footer className="review-card__head">
        <div className="review-card__avatar">
          <Avatar author={r.author} src={r.avatar} />
        </div>
        <div>
          <div className="review-card__name">
            {r.authorUri ? (
              <a href={r.authorUri} target="_blank" rel="noopener noreferrer">
                {r.author}
              </a>
            ) : (
              r.author
            )}
          </div>
          <div className="review-card__date">
            {r.date ? `${r.date} · Google` : 'Google'}
          </div>
        </div>
      </footer>
    </article>
  );
};

const Reviews: React.FC = () => {
  const data = useGooglePlace();
  const [showAll, setShowAll] = useState(false);
  const allReviewsUrl = data?.mapsUri ?? viewReviewsUrl;
  const rating = data?.rating ?? reviewsSummary.rating;
  const count = data?.count ?? reviewsSummary.count;
  const reviews: GooglePlaceReview[] = data?.reviews.length
    ? data.reviews
    : fallbackReviews.map((r) => ({ ...r, rating: 5, date: '' }));
  // На яких розмірах екрана є приховані відгуки → там показуємо кнопку
  const moreOn = (Object.keys(VISIBLE) as (keyof typeof VISIBLE)[]).filter(
    (k) => reviews.length > VISIBLE[k]
  );

  return (
    <section className="section section--bg" id="reviews">
      <div className="container">
        <div className="section__head section__head--split">
          <div>
            <span className="eyebrow eyebrow--accent">Відгуки клієнтів</span>
            <h2>{stats.projects}+ виконаних проєктів у Києві</h2>
          </div>
        </div>

        <div
          className={`reviews${reviews.length ? '' : ' reviews--empty'}${
            showAll ? ' reviews--all' : ''
          }`}
        >
          <aside className="reviews__summary">
            <div className="reviews__score">
              <strong>{rating.toFixed(1)}</strong>
              <div>
                <Stars rating={rating} />
                <a
                  className="reviews__count"
                  href={allReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {count} {plural(count, ['відгук', 'відгуки', 'відгуків'])} на
                  Google
                </a>
              </div>
            </div>
            <p className="reviews__note">
              Середня оцінка клієнтів салону на Google Maps.
            </p>
            <div className="reviews__actions">
              <a
                className="btn btn--light"
                href={allReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Усі відгуки на Google →
              </a>
              <a
                className="btn btn--outline-light"
                href={writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Залишити відгук
              </a>
            </div>
          </aside>

          {reviews.length > 0 && (
            <div className="reviews__list">
              {reviews.map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>
          )}

          {moreOn.length > 0 && !showAll && (
            <button
              type="button"
              className={`btn btn--ghost reviews__more ${moreOn
                .map((k) => `reviews__more--${k}`)
                .join(' ')}`}
              onClick={() => setShowAll(true)}
            >
              Показати ще відгуки
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
