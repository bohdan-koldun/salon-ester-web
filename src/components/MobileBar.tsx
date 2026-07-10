import React from 'react';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';
import { scrollToForm } from '../lib/scroll';
import { canDial } from '../lib/device';
import { PhoneIcon, SendIcon } from './icons';

interface Props {
  onCallback: () => void;
}

const MobileBar: React.FC<Props> = ({ onCallback }) => {
  const handlePhone = (e: React.MouseEvent) => {
    track('phone_click', { source: 'mobile_bar' });
    if (!canDial()) {
      e.preventDefault();
      onCallback();
    }
  };

  return (
    <div className="mobile-bar">
      <a
        href={`tel:${contacts.phoneTel}`}
        className="mobile-bar__call"
        onClick={handlePhone}
      >
        <PhoneIcon size={17} />
        Зателефонувати
      </a>
      <button
        className="mobile-bar__lead"
        onClick={() => scrollToForm(undefined, 'mobile_bar')}
      >
        <SendIcon size={17} />
        Залишити заявку
      </button>
    </div>
  );
};

export default MobileBar;
