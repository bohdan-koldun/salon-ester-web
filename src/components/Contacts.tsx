import React from 'react';
import { contacts } from '../lib/config';
import { track } from '../lib/tracking';
import { scrollToForm } from '../lib/scroll';
import { useGooglePlace } from '../lib/useGooglePlace';
import MessengerLinks from './MessengerLinks';

const Contacts: React.FC = () => {
  const place = useGooglePlace();
  const hours = place?.hours?.length ? place.hours : null;

  return (
    <section className="section section--alt" id="contacts">
      <div className="container contacts__grid">
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
          <h2>Приходьте обрати тканину наживо</h2>
          <p className="contacts__lead">
            Салон у гіпермаркеті меблів MARGO — можна потримати тканини в руках
            і одразу отримати розрахунок.
          </p>
          <p>
            <strong>{contacts.address}</strong>
          </p>
          <p>
            <a
              className="contacts__phone"
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
            <p className="muted">{contacts.scheduleShort}</p>
          )}

          <div className="contacts__cta">
            <a
              className="btn"
              href={contacts.mapsRoute}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('route_click', { source: 'contacts' })}
            >
              Прокласти маршрут
            </a>
            <button
              className="btn btn--ghost"
              onClick={() =>
                scrollToForm(
                  { message: 'Хочу записатися на візит у салон' },
                  'contacts_visit'
                )
              }
            >
              Записатися на візит
            </button>
          </div>

          <MessengerLinks
            source="contacts"
            channels={['viber', 'telegram', 'whatsapp', 'instagram']}
          />
        </div>
      </div>
    </section>
  );
};

export default Contacts;
