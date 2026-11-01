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
  const allReviewsUrl = data?.mapsUri ?? viewReviewsUrl;
  const rating = data?.rating ?? reviewsSummary.rating;
  const count = data?.count ?? reviewsSummary.count;
  const reviews: GooglePlaceReview[] = data?.reviews.length
    ? data.reviews
    : fallbackReviews.map((r) => ({ ...r, rating: 5, date: '' }));

  return (
    <section className="section section--bg" id="reviews">
      <div className="container">
        <div className="section__head section__head--split">
          <div>
            <span className="eyebrow eyebrow--accent">Відгуки клієнтів</span>
            <h2>{stats.projects}+ виконаних проєктів у Києві</h2>
          </div>
          <a
            className="reviews__summary"
            href={allReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Stars rating={rating} /> <strong>{rating.toFixed(1)}</strong> на
            Google · {count} {plural(count, ['відгук', 'відгуки', 'відгуків'])}{' '}
            →
          </a>
        </div>

        {reviews.length > 0 && (
          <div className="reviews__track">
            {reviews.map((r, i) => (
              <article className="review-card" key={i}>
                <div className="review-card__head">
                  <div className="review-card__avatar">
                    <Avatar author={r.author} src={r.avatar} />
                  </div>
                  <div>
                    <div className="review-card__name">
                      {r.authorUri ? (
                        <a
                          href={r.authorUri}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {r.author}
                        </a>
                      ) : (
                        r.author
                      )}
                    </div>
                    {r.date && (
                      <div className="review-card__date">{r.date}</div>
                    )}
                  </div>
                </div>
                <Stars rating={r.rating} />
                <p className="review-card__text">{r.text}</p>
              </article>
            ))}
          </div>
        )}

        <div className="reviews__cta">
          <a
            className="btn"
            href={allReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Усі відгуки на Google →
          </a>
          <a
            className="btn btn--ghost"
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Залишити відгук
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
