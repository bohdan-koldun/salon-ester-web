import React from 'react';
import type { HeadFC } from 'gatsby';
import Layout from '../../components/Layout';
import BlogList from '../../components/BlogList';
import SiteHead from '../../components/SiteHead';
import { site } from '../../lib/config';

const BlogIndexPage: React.FC = () => (
  <Layout>
    <BlogList />
  </Layout>
);

export default BlogIndexPage;

const title = 'Блог про штори — Салон штор «Естер»';
const description =
  'Гайди про тканини та системи штор: блекаут, мікровелюр, дімаут, римські та рулонні штори. Порадимо, яке рішення обрати для вашого інтер\'єру.';

export const Head: HeadFC = () => (
  <>
    <SiteHead />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${site.url}/blog/`} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Салон штор «Естер»" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${site.url}/blog/`} />
    <meta property="og:locale" content="uk_UA" />
  </>
);
