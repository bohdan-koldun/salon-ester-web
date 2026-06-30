# CLAUDE.md — Салон штор «Естер»

Лендінг для генерації лідів. Gatsby 5 + React 18 + TypeScript. Бекенд форм — `lead.php` (Telegram + email). Хостинг Hosting Ukraine (FTP), деплой через GitHub Actions. Мова сайту — українська. Mobile-first.

## Команди

```bash
npm run develop      # дев-сервер http://localhost:8000
npm run build        # продакшн-збірка у public/
npm run serve        # прев'ю продакшн-збірки
npm run typecheck    # tsc --noEmit — запускай перед завершенням задачі
npm run clean        # gatsby clean (за дивних помилок кешу)
```

Після змін у TS/TSX завжди ганяй `npm run typecheck`. Для перевірки реального рендеру — `npm run build` (SSR ловить помилки, яких немає в dev).

## Архітектура

- **Єдине джерело даних клієнта — [src/lib/config.ts](src/lib/config.ts).** Тексти, контакти, послуги, акція, статистика, галерея. Не хардкодь ці значення в компонентах — додавай/читай із config.
- **Секції збираються в [src/pages/index.tsx](src/pages/index.tsx)** у порядку: Hero → Trust → Services → Process → Gallery → Promo → Reviews → Divider → LeadForm → Contacts.
- **Зображення динамічні**: [src/lib/useImages.ts](src/lib/useImages.ts) будує мапу `relativePath → GatsbyImageData`. Послуги шукаються за `services/<file>`, галерея — за `gallery/<file>`. Імена файлів задаються в config. Hero використовує `StaticImage` (літеральний шлях).
- **Логіка форм спільна**: [src/lib/useLeadForm.ts](src/lib/useLeadForm.ts) (стан + сабміт) і [src/components/LeadModal.tsx](src/components/LeadModal.tsx) (UI попапів). Основна форма — [LeadForm.tsx](src/components/LeadForm.tsx). Усі форми шлють на `/lead.php` через [submitLead.ts](src/lib/leads/submitLead.ts).
- **Скрол до форми з контекстом**: `scrollToForm({ service, message })` із [src/lib/scroll.ts](src/lib/scroll.ts) кидає подію, яку слухає LeadForm і заповнює select/коментар.
- **Стилі — звичайний global CSS** ([src/styles/global.css](src/styles/global.css)) з CSS-змінними та спільними класами (`.btn`, `.section`, `.container`, `.field`…). Без Tailwind/CSS-in-JS/CSS Modules.

## Конвенції

- Усі тексти UI — українською. Лапки «...», апостроф у `Ім'я` тощо.
- Кольори/шрифти/відступи — лише через CSS-змінні з `:root` (`--c-accent`, `--f-display`…). Не вводь нові хардкоднуті кольори.
- Нову секцію роби окремим компонентом у `src/components/`, обгортай у `<section className="section section--bg|--alt">` (чергуй фони), додавай у `index.tsx`.
- CTA ведуть або до `#form` (`scrollToForm`), або відкривають попап. Кожен елемент працює на лід.
- Трекінг подій — через `track()` із [src/lib/tracking.ts](src/lib/tracking.ts): `lead_submit`, `phone_click`, `messenger_click`.
- Honeypot-поле `company` має бути в кожній формі (клас `.honeypot`, `tabIndex={-1}`).

## Чого НЕ робити

- Не комітити `tg-secrets.php`, `.env*`, `public/`, `node_modules/` (вже в `.gitignore`).
- Не класти секрети у `config.ts` чи в код — лише через `GATSBY_*` env / GitHub Secrets.
- Не редагувати `static/lead.php` без потреби — це продакшн-бекенд лідів.
- Не комітити без явного прохання користувача.

## Заглушки (замінити перед продакшеном)

Дані в `config.ts` і зображення в `src/images/` (hero, services/*, gallery/*) — заглушки. Реальні значення та чек-лист — у [README.md](README.md).
