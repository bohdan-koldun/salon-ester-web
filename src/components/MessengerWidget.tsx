import React, { useState } from 'react';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';

const MessengerWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="messenger">
      <div className={`messenger__list${open ? ' messenger__list--open' : ''}`}>
        <a
          href={contacts.viber}
          className="messenger__item messenger__item--viber"
          aria-label="Viber"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('messenger_click', { channel: 'viber' })}
        >
          V
        </a>
        <a
          href={contacts.telegram}
          className="messenger__item messenger__item--telegram"
          aria-label="Telegram"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('messenger_click', { channel: 'telegram' })}
        >
          T
        </a>
      </div>
      <button
        className="messenger__toggle"
        aria-label="Месенджери"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '×' : '💬'}
      </button>
    </div>
  );
};

export default MessengerWidget;
