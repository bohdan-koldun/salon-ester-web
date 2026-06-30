import React, { useEffect, useState } from 'react';
import { google, writeReviewUrl } from '../lib/config';

interface Review {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

interface ReviewsData {
  rating: number;
  count: number;
  reviews: Review[];
}

const CACHE_KEY = 'ester_reviews_v1';
const TTL = 24 * 60 * 60 * 1000;

function readCache(): ReviewsData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: ReviewsData };
    if (Date.now() - parsed.ts > TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: ReviewsData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* ignore */
  }
}

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="stars" aria-label={`${rating} з 5`}>
    {'★'.repeat(Math.round(rating)).padEnd(5, '☆')}
  </span>
);

const Reviews: React.FC = () => {
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setData(cached);
      return;
    }
    if (!google.mapsApiKey || !google.placeId) return;

    const url = `https://places.googleapis.com/v1/places/${google.placeId}?languageCode=uk`;
    fetch(url, {
      headers: {
        'X-Goog-Api-Key': google.mapsApiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const reviews: Review[] = (json.reviews ?? []).map((rev: any) => ({
          author: rev.authorAttribution?.displayName ?? 'Клієнт',
          avatar: rev.authorAttribution?.photoUri,
          rating: rev.rating ?? 5,
          text: rev.text?.text ?? rev.originalText?.text ?? '',
          date: rev.relativePublishTimeDescription ?? '',
        }));
        const result: ReviewsData = {
          rating: json.rating ?? 5,
          count: json.userRatingCount ?? reviews.length,
          reviews,
        };
        setData(result);
        writeCache(result);
      })
      .catch(() => {
        /* fallback нижче */
      });
  }, []);

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
                      {r.avatar ? (
                        <img src={r.avatar} alt={r.author} loading="lazy" />
                      ) : (
                        r.author.charAt(0)
                      )}
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
