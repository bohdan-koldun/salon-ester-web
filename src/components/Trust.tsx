import React from 'react';
import { stats } from '../lib/config';
import { CheckIcon } from './icons';

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
            <CheckIcon size={20} className="trust__icon" />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trust;
