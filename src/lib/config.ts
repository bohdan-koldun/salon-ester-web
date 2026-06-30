// config.ts — єдине місце для всіх даних від клієнта.
// Заповніть реальними значеннями перед запуском у продакшн.

export const site = {
  name: 'Естер',
  tagline: 'салон штор',
  domain: 'salon-ester.com.ua',
  url: 'https://salon-ester.com.ua',
};

// Числа для текстів
export const stats = {
  years: 12, // «Понад X років досвіду»
  projects: 800, // «N+ виконаних проєктів»
  sewingDays: 14, // «Термін — від X днів»
};

// Контактні дані
export const contacts = {
  phone1: '+380 67 123 45 67',
  phone2: '+380 50 123 45 67',
  // tel: формат — лише цифри та +
  phone1Tel: '+380671234567',
  phone2Tel: '+380501234567',
  address: 'м. Київ, вул. Прикладна, 1',
  schedule: 'Пн–Пт 10:00–19:00 · Сб–Нд 11:00–17:00',
  email: 'info@salon-ester.com.ua',
  viber: 'viber://chat?number=%2B380671234567',
  telegram: 'https://t.me/salon_ester',
  // Google Maps embed: вставте координати/адресу салону
  mapEmbed:
    'https://www.google.com/maps?q=%D0%9A%D0%B8%D1%97%D0%B2&output=embed',
};

// Акція
export const promo = {
  text: 'Безкоштовний пошив тюлю при замовленні штор від 3 вікон',
  date: '31 серпня 2026',
};

// Google
export const google = {
  mapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY ?? '',
  placeId: process.env.GATSBY_GOOGLE_PLACE_ID ?? '',
  gaId: process.env.GATSBY_GA_ID ?? '',
};

export const writeReviewUrl = google.placeId
  ? `https://search.google.com/local/writereview?placeid=${google.placeId}`
  : 'https://www.google.com/maps';

// Послуги — використовуються у Services та select формі
export interface Service {
  key: string;
  title: string;
  desc: string;
  image: string; // ім'я файлу у src/images/services/
}

export const services: Service[] = [
  {
    key: 'curtains',
    title: 'Штори та ламбрекени',
    desc: "Індивідуальний пошив будь-якої складності під ваш стиль та інтер'єр.",
    image: 'service-curtains.jpg',
  },
  {
    key: 'roller',
    title: 'Рулонні штори',
    desc: 'Практичне рішення для кухні, офісу чи балкона. Захист від сонця та стиль.',
    image: 'service-roller.jpg',
  },
  {
    key: 'roman',
    title: 'Римські штори',
    desc: 'Елегантні тканинні панелі з рівними складками. Ідеально для невеликих вікон.',
    image: 'service-roman.jpg',
  },
  {
    key: 'blinds',
    title: 'Жалюзі',
    desc: 'Дерев’яні та алюмінієві. Довговічні, прості в догляді.',
    image: 'service-blinds.jpg',
  },
  {
    key: 'cornices',
    title: 'Карнизи та монтаж',
    desc: 'Підбір, доставка та встановлення. Металеві, дерев’яні, профільні.',
    image: 'service-cornices.jpg',
  },
  {
    key: 'textile',
    title: 'Текстиль для дому',
    desc: 'Покривала, подушки, скатертини, чохли — в єдиному стилі зі шторами.',
    image: 'service-textile.jpg',
  },
];

// Галерея — імена файлів у src/images/gallery/ (6–9 фото)
export const gallery: string[] = [
  'work-1.jpg',
  'work-2.jpg',
  'work-3.jpg',
  'work-4.jpg',
  'work-5.jpg',
  'work-6.jpg',
  'work-7.jpg',
  'work-8.jpg',
  'work-9.jpg',
];

// Опції select у формах (включно з «Інше»)
export const serviceOptions = [
  'Штори та ламбрекени',
  'Рулонні штори',
  'Римські штори',
  'Жалюзі',
  'Карнизи та монтаж',
  'Текстиль',
  'Інше',
];
