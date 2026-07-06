import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Штори на замовлення в Києві — Салон штор «Естер»',
    description:
      'Пошив штор на замовлення в Києві. Безкоштовний виїзд дизайнера, індивідуальний проєкт, власний цех пошиву. Від заміру до монтажу — від 14 днів.',
    siteUrl: 'https://salon-ester.com.ua',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: './src/images/' },
    },
  ],
};

export default config;
