// config.ts — єдине місце для всіх даних від клієнта.
// Заповніть реальними значеннями перед запуском у продакшн.

export const site = {
  name: 'Естер',
  tagline: 'салон штор',
  domain: 'estershtory.kyiv.ua',
  url: 'https://estershtory.kyiv.ua',
};

// Числа для текстів
export const stats = {
  years: 20, // «Понад X років досвіду»
  projects: 800, // «N+ виконаних проєктів»
};

// Контактні дані
export const contacts = {
  phone: '+380972402303',
  // tel: формат — лише цифри та +
  phoneTel: '+380972402303',
  address: 'м. Київ, проспект Степана Бандери, 34а, гіпермаркет меблів MARGO',
  schedule: 'Пн–Пт 10:00–19:00 · Сб–Нд 10:00–19:00',
  email: 'info@salon-ester.com.ua',
  viber: 'viber://chat?number=%2B380972402303',
  telegram: 'https://t.me/+380972402303',
  // Google Maps embed: вставте координати/адресу салону
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65312.33145699416!2d30.485653529010673!3d50.50986447804213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf007145cff1%3A0xa5249350f032d0c0!2z0KHQsNC70L7QvSDRiNGC0L7RgCDCq9CV0YHRgtC10YDCuw!5e1!3m2!1sen!2sua!4v1783113479781!5m2!1sen!2sua',
};

// Ціни — прозорий розрахунок вартості
export const pricing = {
  title: 'Прозорий розрахунок вартості',
  text: 'Порахуємо ваш проєкт чесно й детально — за розмірами, тканинами та роботою. Ви знаєте ціну ще до замовлення, без прихованих доплат. Залиште заявку — і ми підберемо рішення під ваш бюджет.',
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

// Перегляд усіх відгуків на Google
export const viewReviewsUrl = google.placeId
  ? `https://search.google.com/local/reviews?placeid=${google.placeId}`
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
    image: 'service-curtains.png',
  },
  {
    key: 'roller',
    title: 'Рулонні штори',
    desc: 'Практичне рішення для кухні, офісу чи балкона. Захист від сонця та стиль.',
    image: 'service-roller.png',
  },
  {
    key: 'roman',
    title: 'Римські штори',
    desc: 'Елегантні тканинні панелі з рівними складками. Ідеально для невеликих вікон.',
    image: 'service-roman.png',
  },
  {
    key: 'blinds',
    title: 'Жалюзі',
    desc: 'Дерев’яні та алюмінієві. Довговічні, прості в догляді.',
    image: 'service-blinds.png',
  },
  {
    key: 'cornices',
    title: 'Карнизи та монтаж',
    desc: 'Підбір, доставка та встановлення. Металеві, дерев’яні, профільні.',
    image: 'service-cornices.png',
  },
  {
    key: 'textile',
    title: 'Текстиль для дому',
    desc: 'Покривала, подушки, скатертини, чохли — в єдиному стилі зі шторами.',
    image: 'service-textile.png',
  },
];

// Тканини — фактури, з якими працюємо
export interface Fabric {
  key: string;
  title: string;
  desc: string;
}

export const fabrics: Fabric[] = [
  {
    key: 'blackout',
    title: 'Блекаут',
    desc: 'Щільна тканина, що не пропускає світло. Ідеальна для спальні та дитячої.',
  },
  {
    key: 'linen',
    title: 'Льон',
    desc: 'Натуральний матеріал з живою фактурою. Природний вигляд і повітропроникність.',
  },
  {
    key: 'crepe',
    title: 'Креп',
    desc: 'Щільне плетіння з легким рельєфом. Гарно тримає форму та драпірування.',
  },
  {
    key: 'voile',
    title: 'Вуаль',
    desc: 'Легка напівпрозора тканина. М’яко розсіює світло й наповнює кімнату повітрям.',
  },
  {
    key: 'velvet',
    title: 'Оксамит',
    desc: 'Оксамитова поверхня з глибиною кольору. Розкіш, затишок і чудова звукоізоляція.',
  },
];

// Галерея — імена файлів у src/images/gallery/ (6–9 фото)
export const gallery: string[] = [
  'work-1.jpg',
  'work-2.jpg',
  'work-3.png',
  'work-4.jpg',
  'work-5.jpg',
  'work-6.jpg',
  'work-7.png',
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
