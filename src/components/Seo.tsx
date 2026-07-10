import React from 'react';
import {
  site,
  contacts,
  geo,
  reviewsSummary,
  services,
  faq,
  google,
} from '../lib/config';

const title = 'Штори на замовлення в Києві — Салон штор «Естер»';
const description =
  'Пошив штор на замовлення в Києві. Виїзд дизайнера, індивідуальний проєкт, власний цех пошиву.';

const orgId = `${site.url}/#organization`;
const businessId = `${site.url}/#localbusiness`;
const websiteId = `${site.url}/#website`;
const logo = `${site.url}/favicons/android-chrome-512x512.png`;
const ogImage = `${site.url}/og-image.png`;

// Лінк на профіль у Google Maps (зв'язує сайт із Business Profile у видачі).
const googleMapsUrl = google.placeId
  ? `https://www.google.com/maps/place/?q=place_id:${google.placeId}`
  : undefined;

const sameAs = [googleMapsUrl].filter(Boolean) as string[];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'Салон штор «Естер»',
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: logo,
      },
      image: ogImage,
      email: contacts.email,
      telephone: contacts.phone,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: site.url,
      name: title,
      inLanguage: 'uk-UA',
      publisher: { '@id': orgId },
    },
    {
      '@type': ['LocalBusiness', 'HomeGoodsStore'],
      '@id': businessId,
      name: 'Салон штор «Естер»',
      description,
      url: site.url,
      telephone: contacts.phone,
      email: contacts.email,
      image: ogImage,
      logo,
      priceRange: '$$',
      currenciesAccepted: 'UAH',
      parentOrganization: { '@id': orgId },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'проспект Степана Бандери, 34а',
        addressLocality: 'Київ',
        postalCode: '04073',
        addressCountry: 'UA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.lat,
        longitude: geo.lng,
      },
      areaServed: {
        '@type': 'City',
        name: 'Київ',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '10:00',
          closes: '19:00',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewsSummary.rating,
        reviewCount: reviewsSummary.count,
        bestRating: 5,
        worstRating: 1,
      },
      ...(sameAs.length ? { sameAs } : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Послуги салону штор «Естер»',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            description: s.desc,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Головна',
          item: `${site.url}/`,
        },
      ],
    },
  ],
};

const Seo: React.FC = () => (
  <>
    <html lang="uk" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${site.url}/`} />

    {/* Шрифти: preconnect + stylesheet у <head> замість @import (швидший рендер, менше FOUT) */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
    />

    <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon-48x48.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <meta name="theme-color" content="#5B6B4A" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Салон штор «Естер»" />
    <meta
      property="og:title"
      content="Штори на замовлення в Києві — Салон штор «Естер»"
    />
    <meta
      property="og:description"
      content="Виїзд дизайнера. Пошив штор, рулонних, римських. Монтаж під ключ."
    />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={`${site.url}/`} />
    <meta property="og:locale" content="uk_UA" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta
      name="twitter:description"
      content="Виїзд дизайнера. Пошив штор, рулонних, римських. Монтаж під ключ."
    />
    <meta name="twitter:image" content={ogImage} />

    <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
  </>
);

export default Seo;
