import React from 'react';
import type { HeadFC } from 'gatsby';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Services from '../components/Services';
import Process from '../components/Process';
import Gallery from '../components/Gallery';
import Promo from '../components/Promo';
import Reviews from '../components/Reviews';
import LeadForm from '../components/LeadForm';
import Contacts from '../components/Contacts';
import Divider from '../components/Divider';
import Seo from '../components/Seo';

const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <Trust />
    <Services />
    <Process />
    <Gallery />
    <Promo />
    <Reviews />
    <Divider />
    <LeadForm />
    <Contacts />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => <Seo />;
