import React from 'react';
import { site } from '../lib/config';
import type { BlogPost } from '../lib/blog';
import SiteHead from './SiteHead';

interface Props {
  post: BlogPost;
}

const BlogSeo: React.FC<Props> = ({ post }) => {
  const url = `${site.url}/blog/${post.slug}/`;
  const ogImage = `${site.url}/og-image.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.seoTitle,
        description: post.seoDescription,
        url,
        inLanguage: 'uk-UA',
        publisher: { '@id': `${site.url}/#organization` },
        mainEntityOfPage: url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Головна', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Блог', item: `${site.url}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHead />
      <title>{post.seoTitle}</title>
      <meta name="description" content={post.seoDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Салон штор «Естер»" />
      <meta property="og:title" content={post.seoTitle} />
      <meta property="og:description" content={post.seoDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="uk_UA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.seoTitle} />
      <meta name="twitter:description" content={post.seoDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
};

export default BlogSeo;
