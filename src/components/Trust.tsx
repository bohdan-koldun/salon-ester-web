import React from 'react';
import { stats } from '../lib/config';

const Trust: React.FC = () => {
  const items = [
    'Виїзд на замір',
    'Власний цех пошиву',
    `${stats.years}+ років досвіду`,
    'Монтаж під ключ',
  ];

  return (
    <section className="trust" aria-label="Наші переваги">
      <div className="trust__inner">
        {items.map((t) => (
          <div className="trust__item" key={t}>
            {t}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trust;
