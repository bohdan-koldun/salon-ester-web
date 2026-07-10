import React from 'react';
import { site, contacts } from '../lib/config';
import { track } from '../lib/tracking';
import { useGooglePlace } from '../lib/useGooglePlace';
import {
  ViberIcon,
  TelegramIcon,
  WhatsappIcon,
  InstagramIcon,
} from './icons';

const Contacts: React.FC = () => {
  const place = useGooglePlace();
  const hours = place?.hours?.length ? place.hours : null;

  return (
    <section className="section section--bg" id="contacts">
      <div className="container">
        <div className="section__head">
          <h2>Контакти</h2>
        </div>

        <div className="contacts__grid">
          <div className="contacts__map">
            <iframe
              title="Карта — салон штор Естер"
              src={contacts.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="contacts__info">
            <h3>Салон штор «{site.name}»</h3>
            <p>{contacts.address}</p>
            <p>
              <a
                href={`tel:${contacts.phoneTel}`}
                onClick={() => track('phone_click', { source: 'contacts' })}
              >
                {contacts.phone}
              </a>
            </p>

            {hours ? (
              <ul className="muted contacts__hours">
                {hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="muted">Графік: {contacts.schedule}</p>
            )}

            <div className="contacts__messengers">
              <a
                className="btn btn--ghost"
                href={contacts.viber}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('messenger_click', { channel: 'viber' })}
              >
                <ViberIcon size={18} />
                Viber
              </a>
              <a
                className="btn btn--ghost"
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('messenger_click', { channel: 'telegram' })
                }
              >
                <TelegramIcon size={18} />
                Telegram
              </a>
              <a
                className="btn btn--ghost"
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('messenger_click', { channel: 'whatsapp' })
                }
              >
                <WhatsappIcon size={18} />
                WhatsApp
              </a>
              <a
                className="btn btn--ghost"
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track('messenger_click', { channel: 'instagram' })
                }
              >
                <InstagramIcon size={18} />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
