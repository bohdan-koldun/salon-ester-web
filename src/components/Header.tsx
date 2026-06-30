import React, { useEffect, useState } from 'react';
import { site, contacts } from '../lib/config';
import { track } from '../lib/tracking';

interface Props {
  onCallback: () => void;
}

const navLinks = [
  { href: '#services', label: 'Послуги' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '#contacts', label: 'Контакти' },
];

const Header: React.FC<Props> = ({ onCallback }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="#top" className="logo" aria-label={site.name}>
          <span className="logo__name">{site.name}</span>
          <span className="logo__tag">{site.tagline}</span>
        </a>

        <nav className="header__nav">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <a
            href={`tel:${contacts.phone1Tel}`}
            className="header__phone"
            onClick={() => track('phone_click', { source: 'header' })}
          >
            {contacts.phone1}
          </a>
          <button className="btn header__cta" onClick={onCallback}>
            Замовити дзвінок
          </button>

          <div className="header__icons-mobile">
            <a
              href={`tel:${contacts.phone1Tel}`}
              className="icon-btn"
              aria-label="Зателефонувати"
              onClick={() => track('phone_click', { source: 'header_mobile' })}
            >
              📞
            </a>
            <button
              className="icon-btn burger"
              aria-label="Меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      <div className={`drawer${menuOpen ? ' drawer--open' : ''}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
        <button
          className="btn"
          style={{ marginTop: 16 }}
          onClick={() => {
            closeMenu();
            onCallback();
          }}
        >
          Замовити дзвінок
        </button>
      </div>
    </header>
  );
};

export default Header;
