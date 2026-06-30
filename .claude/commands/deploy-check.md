---
description: Перевірка готовності до деплою (типи + продакшн-збірка + саніті-чеки)
allowed-tools: Bash(npm run typecheck), Bash(npm run build), Bash(grep:*), Bash(ls:*)
---

Перевір, що проєкт готовий до деплою на Hosting Ukraine. Виконай по черзі й коротко відзвітуй по кожному пункту (✅/❌):

1. `npm run typecheck` — без помилок типів.
2. `npm run build` — збірка проходить.
3. Переконайся, що у `public/` є: `lead.php`, `robots.txt`, `og-image.jpg`, `sitemap-index.xml`, `index.html`.
4. У `public/index.html` присутні: `lang="uk"`, `<title>`, og-теги, JSON-LD `LocalBusiness`, секції `id="form"`, `id="services"`, `id="gallery"`, `id="contacts"` (використовуй `grep -a`).
5. Переконайся, що `tg-secrets.php` НЕ потрапив у git і не лежить у `public/`.

Якщо щось ❌ — поясни причину й запропонуй фікс. Не коміть і не пушай нічого без явного прохання.
