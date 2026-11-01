import React from 'react';
import type { HeadFC } from 'gatsby';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Trust from '../components/Trust';
import Services from '../components/Services';
import Fabrics from '../components/Fabrics';
import Process from '../components/Process';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Faq from '../components/Faq';
import LeadForm from '../components/LeadForm';
import Contacts from '../components/Contacts';
import Seo from '../components/Seo';

const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <Trust />
    <Reviews />
    <Services />
    <Fabrics />
    <Gallery />
    <Process />
    <LeadForm />
    <Faq />
    <Contacts />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => <Seo />;
