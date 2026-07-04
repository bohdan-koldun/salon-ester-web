import { useEffect, useState } from 'react';
import { google } from './config';

export interface GooglePlaceReview {
  author: string;
  authorUri?: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface GooglePlaceData {
  rating: number;
  count: number;
  reviews: GooglePlaceReview[];
  hours: string[];
  mapsUri?: string;
}

const CACHE_KEY = 'ester_google_place_v2';
const TTL = 24 * 60 * 60 * 1000;

function readCache(): GooglePlaceData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { ts: number; data: GooglePlaceData };
    if (Date.now() - parsed.ts > TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: GooglePlaceData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* ignore */
  }
}

let inflight: Promise<GooglePlaceData | null> | null = null;

function fetchPlace(): Promise<GooglePlaceData | null> {
  if (!google.mapsApiKey || !google.placeId) return Promise.resolve(null);
  if (inflight) return inflight;

  const url = `https://places.googleapis.com/v1/places/${google.placeId}?languageCode=uk`;
  inflight = fetch(url, {
    headers: {
      'X-Goog-Api-Key': google.mapsApiKey,
      'X-Goog-FieldMask':
        'rating,userRatingCount,reviews,regularOpeningHours.weekdayDescriptions,googleMapsUri',
    },
  })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((json) => {
      const reviews: GooglePlaceReview[] = (json.reviews ?? []).map(
        (rev: any) => ({
          author: rev.authorAttribution?.displayName ?? 'Клієнт',
          authorUri: rev.authorAttribution?.uri,
          avatar: rev.authorAttribution?.photoUri
            ? `${rev.authorAttribution.photoUri.split('=')[0]}=s100`
            : undefined,
          rating: rev.rating ?? 5,
          text: rev.text?.text ?? rev.originalText?.text ?? '',
          date: rev.relativePublishTimeDescription ?? '',
        }),
      );
      const result: GooglePlaceData = {
        rating: json.rating ?? 5,
        count: json.userRatingCount ?? reviews.length,
        reviews,
        hours: json.regularOpeningHours?.weekdayDescriptions ?? [],
        mapsUri: json.googleMapsUri,
      };
      writeCache(result);
      return result;
    })
    .catch(() => null)
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function useGooglePlace(): GooglePlaceData | null {
  const [data, setData] = useState<GooglePlaceData | null>(null);

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setData(cached);
      return;
    }
    fetchPlace().then((result) => {
      if (result) setData(result);
    });
  }, []);

  return data;
}
