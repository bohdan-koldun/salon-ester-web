import React from 'react';

// Спільні head-теги для всіх сторінок: шрифти, фавіконки, manifest.
// Сторінко-специфічні title/description/OG/JSON-LD задаються окремо (Seo.tsx, BlogSeo.tsx).
const SiteHead: React.FC = () => (
  <>
    <html lang="uk" />

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
  </>
);

export default SiteHead;
