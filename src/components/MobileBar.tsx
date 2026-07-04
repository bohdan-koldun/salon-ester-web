import React from 'react';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';
import { scrollToForm } from '../lib/scroll';
import { PhoneIcon, SendIcon } from './icons';

const MobileBar: React.FC = () => (
  <div className="mobile-bar">
    <a
      href={`tel:${contacts.phoneTel}`}
      className="mobile-bar__call"
      onClick={() => track('phone_click', { source: 'mobile_bar' })}
    >
      <PhoneIcon size={17} />
      Зателефонувати
    </a>
    <button className="mobile-bar__lead" onClick={() => scrollToForm()}>
      <SendIcon size={17} />
      Залишити заявку
    </button>
  </div>
);

export default MobileBar;
