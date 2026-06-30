# Салон штор «Естер» — лендінг

Лендінг для генерації лідів. Gatsby 5 + React 18 + TypeScript. Бекенд форм — `lead.php` (Telegram + email). Хостинг — Hosting Ukraine (FTP), деплой через GitHub Actions.

## Запуск локально

```bash
npm install
npm run develop      # http://localhost:8000
npm run build        # збірка у public/
npm run serve        # прев'ю продакшн-збірки
npm run typecheck    # перевірка типів
```

## Що заповнити перед продакшеном

### 1. Дані клієнта → `src/lib/config.ts`
Усі тексти, контакти, акція, послуги, статистика — в одному файлі. Замініть значення-заглушки (телефони, адреса, графік, роки досвіду, термін пошиву, текст акції, Viber/Telegram, embed карти).

### 2. Зображення (замінити заглушки)
- `src/images/hero.jpg` — hero-фон (≥1920×1080)
- `src/images/services/*.jpg` — 6 фото послуг (≥800×600), імена з `config.ts`
- `src/images/gallery/work-*.jpg` — 6–9 робіт (квадратні), імена з `config.ts`
- `src/images/icon.png` — іконка PWA (512×512)
- `static/og-image.jpg` — превʼю для соцмереж (1200×630)

### 3. Змінні оточення (build-time, `GATSBY_*`)
Передаються через GitHub Secrets у workflow:
- `GATSBY_GA_ID` — Google Analytics 4 (G-XXXX)
- `GATSBY_GOOGLE_MAPS_API_KEY` — Places API (New) для відгуків
- `GATSBY_GOOGLE_PLACE_ID` — Place ID салону

Без ключів блок відгуків показує фолбек-кнопку на Google.

### 4. GitHub Secrets (Settings → Environments → `Deploy env`)
`FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
`LEAD_TELEGRAM_CHAT_ID`, `LEAD_EMAIL`, `GATSBY_GA_ID`, `GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACE_ID`.

## Бекенд форм

`static/lead.php` копіюється у `public/lead.php` при build → доступний як `https://salon-ester.com.ua/lead.php`.
Секрети (`bot_token`, `chat_id`, `lead_email`) — у `tg-secrets.php` **на рівень вище `www`** (генерується workflow при деплої, поза git).

## Деплой

Push у `master` (або ручний запуск) → GitHub Actions: `npm ci` → `npm run build` →
заливка `public/` у `www` через FTP (`lftp mirror`). Нотифікації про статус — у Telegram.

## Структура

- `src/components/` — секції та елементи UI
- `src/lib/` — конфіг, відправка лідів, трекінг, хуки (exit-intent, форма, маска телефону)
- `src/styles/` — `global.css` (CSS-змінні, спільні класи), `fonts.css`
- `static/` — `lead.php`, `robots.txt`, `og-image.jpg`
