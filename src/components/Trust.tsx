import React from 'react';
import { stats } from '../lib/config';
import { MapPinIcon, ScissorsIcon, AwardIcon, ToolIcon } from './icons';

const Trust: React.FC = () => {
  const items = [
    { icon: <MapPinIcon size={22} />, label: 'Виїзд на замір' },
    { icon: <ScissorsIcon size={22} />, label: 'Власний цех пошиву' },
    { icon: <AwardIcon size={22} />, label: `${stats.years}+ років досвіду` },
    { icon: <ToolIcon size={22} />, label: 'Монтаж під ключ' },
  ];

  return (
    <section className="trust" aria-label="Наші переваги">
      <div className="trust__inner">
        {items.map((it) => (
          <div className="trust__item" key={it.label}>
            <span className="trust__icon">{it.icon}</span>
            <span className="trust__label">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trust;
