import React from 'react';
import { site } from '../lib/config';

const Footer: React.FC = () => (
  <footer className="footer">
    © 2026 Салон штор «{site.name}»&nbsp; · &nbsp;Київ&nbsp; · &nbsp;
    {site.domain}
  </footer>
);

export default Footer;
