import React from 'react';
import { site, contacts, currentYear } from '../lib/config';
import { track } from '../lib/tracking';

const Footer: React.FC = () => (
  <footer className="footer">
    © {currentYear} Салон штор «{site.name}»&nbsp; · &nbsp;Київ&nbsp; · &nbsp;
    <a
      href={`tel:${contacts.phoneTel}`}
      onClick={() => track('phone_click', { source: 'footer' })}
    >
      {contacts.phone}
    </a>
  </footer>
);

export default Footer;
