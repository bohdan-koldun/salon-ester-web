import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { site, contacts } from '../lib/config';
import { track } from '../lib/tracking';
import { canDial } from '../lib/device';
import { useIsOpen } from '../lib/useIsOpen';
import { PhoneIcon, MenuIcon, CloseIcon } from './icons';

interface Props {
  onCallback: () => void;
}

// Абсолютні шляхи (не просто «#hash»), щоб посилання коректно вели на головну
// й туди ж скролили, навіть якщо клік стався зі сторінки блогу.
const navLinks = [
  { href: '/#services', label: 'Послуги' },
  { href: '/#gallery', label: 'Галерея' },
  { href: '/#reviews', label: 'Відгуки' },
  { href: '/#form', label: 'Ціни' },
  { href: '/blog/', label: 'Блог' },
  { href: '/#contacts', label: 'Контакти' },
];

const Header: React.FC<Props> = ({ onCallback }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isOpen = useIsOpen();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Відкрите меню: блокуємо скрол сторінки під ним, Esc — закрити
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('no-scroll');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // На десктопі tel: нічого не робить — відкриваємо попап «Замовити дзвінок».
  // На телефоні лишаємо нативний дзвінок.
  const handlePhone = (source: string) => (e: React.MouseEvent) => {
    track('phone_click', { source });
    if (!canDial()) {
      e.preventDefault();
      onCallback();
    }
  };

  const status = (
    <span className={`status${isOpen ? ' status--open' : ''}`}>
      {contacts.scheduleShort}
    </span>
  );

  return (
    <header
      className={`header${scrolled ? ' header--scrolled' : ''}${
        menuOpen ? ' header--menu-open' : ''
      }`}
    >
      <div className="header__inner">
        <Link to="/#top" className="logo" aria-label={site.name}>
          <span className="logo__name">{site.name}</span>
          <span className="logo__tag">{site.tagline}</span>
          <span className="logo__status">{status}</span>
        </Link>

        <nav className="header__nav">
          {navLinks.map((l) => (
            <Link key={l.href} to={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header__right">
          <div className="header__contact">
            <a
              href={`tel:${contacts.phoneTel}`}
              className="header__phone"
              onClick={handlePhone('header')}
            >
              {contacts.phone}
            </a>
            {status}
          </div>
          <button className="btn header__cta" onClick={onCallback}>
            Замовити дзвінок
          </button>

          <div className="header__icons-mobile">
            <a
              href={`tel:${contacts.phoneTel}`}
              className="icon-btn icon-btn--phone"
              aria-label="Зателефонувати"
              onClick={handlePhone('header_mobile')}
            >
              <PhoneIcon size={22} />
            </a>
            <button
              className="icon-btn burger"
              aria-label="Меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`drawer${menuOpen ? ' drawer--open' : ''}`}>
        {navLinks.map((l) => (
          <Link key={l.href} to={l.href} onClick={closeMenu}>
            {l.label}
          </Link>
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
