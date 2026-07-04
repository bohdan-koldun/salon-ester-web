import React from 'react';
import { site, contacts } from '../lib/config';

const title = 'Штори на замовлення в Києві — Салон штор «Естер»';
const description =
  'Пошив штор на замовлення в Києві. Виїзд дизайнера, індивідуальний проєкт, власний цех пошиву.';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Салон штор «Естер»',
  description,
  url: site.url,
  telephone: contacts.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contacts.address,
    addressLocality: 'Київ',
    addressCountry: 'UA',
  },
  image: `${site.url}/og-image.jpg`,
  priceRange: '$$',
};

const Seo: React.FC = () => (
  <>
    <html lang="uk" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${site.url}/`} />

    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content="Штори на замовлення в Києві — Салон штор «Естер»"
    />
    <meta
      property="og:description"
      content="Виїзд дизайнера. Пошив штор, рулонних, римських. Монтаж під ключ."
    />
    <meta property="og:image" content={`${site.url}/og-image.jpg`} />
    <meta property="og:url" content={site.url} />
    <meta property="og:locale" content="uk_UA" />

    <meta name="twitter:card" content="summary_large_image" />

    <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
  </>
);

export default Seo;
