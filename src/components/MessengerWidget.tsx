import React, { useState } from 'react';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';
import {
  ViberIcon,
  TelegramIcon,
  WhatsappIcon,
  InstagramIcon,
  CloseIcon,
} from './icons';

const channels = [
  {
    key: 'viber',
    href: contacts.viber,
    label: 'Viber',
    Icon: ViberIcon,
  },
  {
    key: 'telegram',
    href: contacts.telegram,
    label: 'Telegram',
    Icon: TelegramIcon,
  },
  {
    key: 'whatsapp',
    href: contacts.whatsapp,
    label: 'WhatsApp',
    Icon: WhatsappIcon,
  },
  {
    key: 'instagram',
    href: contacts.instagram,
    label: 'Instagram',
    Icon: InstagramIcon,
  },
] as const;

const MessengerWidget: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="messenger">
      <div className={`messenger__list${open ? ' messenger__list--open' : ''}`}>
        {channels.map(({ key, href, label, Icon }) => (
          <a
            key={key}
            href={href}
            className={`messenger__item messenger__item--${key}`}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('messenger_click', { channel: key })}
          >
            <Icon size={24} />
          </a>
        ))}
      </div>
      <button
        className="messenger__toggle"
        aria-label="Месенджери"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon size={24} /> : <span aria-hidden="true">💬</span>}
      </button>
    </div>
  );
};

export default MessengerWidget;
