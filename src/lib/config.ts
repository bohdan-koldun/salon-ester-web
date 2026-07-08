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

// Геолокація салону — для карт і structured data.
// Уточніть точні координати за вашою міткою в Google Maps.
export const geo = {
  lat: 50.48693,
  lng: 30.51985,
};

// Підсумок відгуків Google — для розмітки aggregateRating.
// ВАЖЛИВО: синхронізуйте з реальним профілем (має збігатися з тим, що на сайті).
export const reviewsSummary = {
  rating: 5.0,
  count: 9,
};

// Контактні дані
export const contacts = {
  phone: '+380972402303',
  // tel: формат — лише цифри та +
  phoneTel: '+380972402303',
  address: 'м. Київ, проспект Степана Бандери, 34а, гіпермаркет меблів MARGO',
  schedule: 'Пн–Пт 10:00–19:00 · Сб–Нд 10:00–19:00',
  email: 'ester.77@ukr.net',
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
    title: 'Класичні штори',
    desc: "Індивідуальний пошив будь-якої складності під ваш стиль та інтер'єр.",
    image: 'service-curtains.png',
  },
  {
    key: 'roman',
    title: 'Римські штори',
    desc: 'Елегантні тканинні панелі з рівними складками. Ідеально для невеликих вікон.',
    image: 'service-roman.png',
  },
  {
    key: 'roller',
    title: 'Рулонні штори',
    desc: 'Практичне рішення для кухні, офісу чи балкона. Захист від сонця та стиль.',
    image: 'service-roller.png',
  },
  {
    key: 'pleat',
    title: 'Штори плісе',
    desc: 'Компактна система зі складками-гармошкою. Точно під розмір вікна, без провисань.',
    image: 'service-pleat.png',
  },
  {
    key: 'eyelet',
    title: 'Штори на люверсах',
    desc: 'М’які рівні хвилі та легке ковзання по карнизу. Сучасний мінімалістичний вигляд.',
    image: 'service-eyelet.png',
  },
  {
    key: 'roller-outdoor',
    title: 'Зовнішні ролети',
    desc: 'Захист вікна ззовні від сонця, вітру та сторонніх очей. Стійкі до негоди.',
    image: 'service-roller-outdoor.png',
  },
  {
    key: 'blinds',
    title: 'Жалюзі',
    desc: 'Дерев’яні та алюмінієві. Довговічні, прості в догляді.',
    image: 'service-blinds.png',
  },
  {
    key: 'textile',
    title: 'Текстиль для дому',
    desc: 'Покривала, подушки, скатертини, чохли — в єдиному стилі зі шторами.',
    image: 'service-textile.png',
  },
  {
    key: 'cornices',
    title: 'Карнизи та монтаж',
    desc: 'Підбір, доставка та встановлення. Металеві, дерев’яні, профільні.',
    image: 'service-cornices.png',
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
  'work-1.png',
  'work-2.png',
  'work-3.png',
  'work-4.png',
  'work-5.png',
  'work-6.png',
  'work-7.png',
  'work-8.png',
  'work-9.png',
];

// Питання-відповіді — секція FAQ + розмітка FAQPage.
// Текст тут має збігатися з тим, що бачить користувач на сторінці.
export interface Faq {
  q: string;
  a: string;
}

export const faq: Faq[] = [
  {
    q: 'Скільки коштує пошив штор на замовлення?',
    a: 'Вартість залежить від тканини, розміру вікна та складності моделі. Ми рахуємо проєкт чесно й детально ще до замовлення — без прихованих доплат. Залиште заявку, і ми зробимо прорахунок під ваш бюджет.',
  },
  {
    q: 'Скільки часу займає пошив і монтаж?',
    a: 'Залежно від складності проєкту та завантаженості цеху - від декількох днів до декількох тижнів. Точний термін ми називаємо після заміру та затвердження проєкту.',
  },
  {
    q: 'Ви робите замір і встановлення «під ключ»?',
    a: 'Так. Ми беремо на себе весь цикл: замір, пошив у власному цеху, підбір і доставку карнизів та професійний монтаж. Вам не потрібно шукати окремих майстрів.',
  },
  {
    q: 'З якими тканинами ви працюєте?',
    a: 'Блекаут, льон, креп, вуаль, оксамит та інші фактури. Підбираємо матеріал під призначення кімнати — від щільного світлонепроникного блекауту для спальні до легкої вуалі для вітальні.',
  },
  {
    q: 'Де ви знаходитесь?',
    a: `${contacts.address}. ${contacts.schedule}.`,
  },
];

// Опції select у формах (включно з «Інше»)
export const serviceOptions = [
  'Класичні штори',
  'Римські штори',
  'Рулонні штори',
  'Штори плісе',
  'Штори на люверсах',
  'Зовнішні ролети',
  'Жалюзі',
  'Текстиль',
  'Карнизи та монтаж',
  'Інше',
];
