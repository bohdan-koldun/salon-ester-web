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
  phone: '+38 097 240 23 03', // як показуємо на сайті
  // tel: формат — лише цифри та +
  phoneTel: '+380972402303',
  address: 'м. Київ, проспект Степана Бандери, 34а, гіпермаркет меблів MARGO',
  schedule: 'Пн–Пт 10:00–19:00 · Сб–Нд 10:00–19:00',
  scheduleShort: 'Щодня 10:00–19:00',
  // Робочі години (за Києвом) — для індикатора «зараз працюємо» у хедері
  openHours: { from: 10, to: 19 },
  email: 'info@estershtory.kyiv.ua',
  viber: 'viber://chat?number=%2B380972402303',
  telegram: 'https://t.me/+380972402303',
  whatsapp: 'https://wa.me/380972402303',
  instagram: 'https://www.instagram.com/liudmilakoldun_0972402303/',
  // Кнопка «Прокласти маршрут»
  mapsRoute: `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`,
  // Google Maps embed: вставте координати/адресу салону
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65312.33145699416!2d30.485653529010673!3d50.50986447804213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf007145cff1%3A0xa5249350f032d0c0!2z0KHQsNC70L7QvSDRiNGC0L7RgCDCq9CV0YHRgtC10YDCuw!5e1!3m2!1sen!2sua!4v1783113479781!5m2!1sen!2sua',
};

// Ціни — прозорий розрахунок вартості
export interface PriceItem {
  label: string; // назва позиції
  price: string; // ціна «від»
  unit: string; // одиниця виміру (повна форма — у секції цін)
  unitShort: string; // скорочена одиниця для hero, напр. «м.п.»
}

export const currentYear = new Date().getFullYear();

export const pricing = {
  // Орієнтовні стартові ціни «від» (чипи в hero). Фінальна вартість рахується індивідуально після заміру.
  items: [
    { label: 'Тюль', price: 'від 450 грн', unit: 'за пог. метр', unitShort: 'м.п.' },
    { label: 'Штори', price: 'від 675 грн', unit: 'за пог. метр', unitShort: 'м.п.' },
  ] as PriceItem[],
};

// Смуга довіри під hero
export interface TrustItem {
  icon: 'pin' | 'scissors' | 'ruler' | 'tool';
  title: string;
  text: string;
}

export const trustItems: TrustItem[] = [
  { icon: 'pin', title: 'Салон у MARGO', text: 'пр. Степана Бандери, 34а' },
  {
    icon: 'scissors',
    title: 'Власний цех',
    text: 'шиємо самі, без посередників',
  },
  { icon: 'ruler', title: 'Виїзд на замір', text: 'зі зразками тканин' },
  { icon: 'tool', title: 'Монтаж під ключ', text: 'карнизи, навішування' },
];

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
  short: string; // коротка назва — варіант у квізі «Що хочете замовити?»
  desc: string;
  image: string; // ім'я файлу у src/images/services/
  price?: string; // ціна «від» на картці (необов'язково)
}

export const services: Service[] = [
  {
    key: 'curtains',
    title: 'Класичні штори',
    short: 'Класичні штори',
    desc: "Індивідуальний пошив будь-якої складності під ваш стиль та інтер'єр.",
    image: 'service-curtains.png',
    price: 'від 675 грн/м.п.',
  },
  {
    key: 'roman',
    title: 'Римські штори',
    short: 'Римські',
    desc: 'Елегантні тканинні панелі з рівними складками. Ідеально для невеликих вікон.',
    image: 'service-roman.png',
  },
  {
    key: 'roller',
    title: 'Рулонні штори',
    short: 'Рулонні',
    desc: 'Практичне рішення для кухні, офісу чи балкона. Захист від сонця та стиль.',
    image: 'service-roller.png',
  },
  {
    key: 'pleat',
    title: 'Штори плісе',
    short: 'Плісе',
    desc: 'Компактна система зі складками-гармошкою. Точно під розмір вікна, без провисань.',
    image: 'service-pleat.png',
  },
  {
    key: 'eyelet',
    title: 'Штори на люверсах',
    short: 'На люверсах',
    desc: 'М’які рівні хвилі та легке ковзання по карнизу. Сучасний мінімалістичний вигляд.',
    image: 'service-eyelet.png',
  },
  {
    key: 'roller-outdoor',
    title: 'Зовнішні ролети',
    short: 'Зовнішні ролети',
    desc: 'Захист вікна ззовні від сонця, вітру та сторонніх очей. Стійкі до негоди.',
    image: 'service-roller-outdoor.png',
  },
  {
    key: 'blinds',
    title: 'Жалюзі',
    short: 'Жалюзі',
    desc: 'Дерев’яні та алюмінієві. Довговічні, прості в догляді.',
    image: 'service-blinds.png',
  },
  {
    key: 'textile',
    title: 'Текстиль для дому',
    short: 'Текстиль',
    desc: 'Покривала, подушки, скатертини, чохли — в єдиному стилі зі шторами.',
    image: 'service-textile.png',
  },
  {
    key: 'cornices',
    title: 'Карнизи та монтаж',
    short: 'Карнизи, монтаж',
    desc: 'Підбір, доставка та встановлення. Металеві, дерев’яні, профільні.',
    image: 'service-cornices.png',
  },
];

// Тканини — фактури, з якими працюємо
export interface Fabric {
  key: string;
  title: string;
  desc: string;
  image: string; // ім'я файлу у src/images/fabrics/
}

export const fabrics: Fabric[] = [
  {
    key: 'curtains-blackout',
    title: 'Штори блекаут',
    desc: 'Щільна тканина, що повністю не пропускає світло. Ідеальна для спальні та дитячої.',
    image: 'curtains-blackout.png',
  },
  {
    key: 'curtains-linen',
    title: 'Штори льон',
    desc: 'Натуральна тканина з живою фактурою. Природний вигляд і повітропроникність.',
    image: 'curtains-linen.png',
  },
  {
    key: 'curtains-microvelour',
    title: 'Штори мікровелюр',
    desc: 'Тонкий м’який ворс, приємний на дотик. Гарно драпірується та тримає форму.',
    image: 'curtains-microvelour.png',
  },
  {
    key: 'curtains-velor',
    title: 'Штори велюр',
    desc: 'Щільна ворсиста тканина з насиченим кольором. Затишок і гарна звукоізоляція.',
    image: 'curtains-velor.png',
  },
  {
    key: 'curtains-velvet',
    title: 'Штори оксамит',
    desc: 'Розкішна оксамитова поверхня з глибиною кольору. Благородний вигляд і звукоізоляція.',
    image: 'curtains-velvet.png',
  },
  {
    key: 'curtains-and-tulle-classic',
    title: 'Штори та тюль з класичним візерунком',
    desc: 'Готове поєднання штор і тюлю з елегантним класичним візерунком для вітальні та спальні.',
    image: 'curtains-and-tulle-with-a-classic-pattern.png',
  },
  {
    key: 'tulle-linen',
    title: 'Тюль льон',
    desc: 'Легкий напівпрозорий тюль із фактурою льону. М’яко розсіює світло й додає затишку.',
    image: 'tulle-linen.png',
  },
  {
    key: 'tulle-crepe-veil',
    title: 'Тюль креп-вуаль',
    desc: 'Тонка повітряна тканина. Наповнює кімнату м’яким розсіяним світлом.',
    image: 'tulle-crepe-veil.png',
  },
  {
    key: 'tulle-mesh',
    title: 'Тюль сітка',
    desc: 'Легка сітчаста тканина. Максимум повітря та світла в інтер’єрі.',
    image: 'tulle-mesh.png',
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

// Відгуки на випадок, коли Google Places API недоступний (немає ключа/placeId).
// Копіюйте ЛИШЕ реальні відгуки з профілю Google — дослівно, з іменем автора.
export interface StaticReview {
  author: string;
  text: string;
}

export const fallbackReviews: StaticReview[] = [];

// Квіз «Розрахунок за 3 кроки» (основна форма #form).
export const quiz = {
  // «Що хочете замовити?» — ті самі послуги (короткі назви) + тюль; можна кілька
  products: [
    services[0].short,
    'Тюль',
    ...services.slice(1).map((s) => s.short),
  ],
  notSure: 'Ще не знаю', // виключний варіант: знімає решту
  rooms: ['Вітальня', 'Спальня', 'Дитяча', 'Кухня', 'Офіс', 'Інше'],
  windows: ['1', '2', '3', '4+'],
  channels: ['Дзвінок', 'Viber', 'Telegram'],
  nextSteps: [
    'Передзвонимо в робочий час',
    'Узгодимо виїзд на замір або візит у салон',
    'Назвемо точну вартість до пошиву',
  ],
};
