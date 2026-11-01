import React from 'react';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';
import { ViberIcon, TelegramIcon, WhatsappIcon, InstagramIcon } from './icons';

type Channel = 'viber' | 'telegram' | 'whatsapp' | 'instagram';

const CHANNELS: Record<
  Channel,
  { label: string; href: string; Icon: typeof ViberIcon }
> = {
  viber: { label: 'Viber', href: contacts.viber, Icon: ViberIcon },
  telegram: { label: 'Telegram', href: contacts.telegram, Icon: TelegramIcon },
  whatsapp: { label: 'WhatsApp', href: contacts.whatsapp, Icon: WhatsappIcon },
  instagram: {
    label: 'Instagram',
    href: contacts.instagram,
    Icon: InstagramIcon,
  },
};

interface Props {
  source: string; // для трекінгу: звідки клікнули
  channels?: Channel[];
}

// Ряд кнопок-месенджерів із брендовими іконками.
const MessengerLinks: React.FC<Props> = ({
  source,
  channels = ['viber', 'telegram', 'whatsapp'],
}) => (
  <div className={`msg-links msg-links--${channels.length}`}>
    {channels.map((ch) => {
      const { label, href, Icon } = CHANNELS[ch];
      return (
        <a
          key={ch}
          className={`msg-links__item msg-links__item--${ch}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('messenger_click', { channel: ch, source })}
        >
          <Icon size={18} />
          {label}
        </a>
      );
    })}
  </div>
);

export default MessengerLinks;
