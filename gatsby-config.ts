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
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Салон штор «Естер»',
        short_name: 'Естер',
        start_url: '/',
        background_color: '#FAFAF7',
        theme_color: '#5B6B4A',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'images', path: './src/images/' },
    },
  ],
};

export default config;
