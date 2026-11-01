import React from 'react';
import { trustItems, type TrustItem } from '../lib/config';
import { MapPinIcon, ScissorsIcon, RulerIcon, ToolIcon } from './icons';

const ICONS: Record<TrustItem['icon'], typeof MapPinIcon> = {
  pin: MapPinIcon,
  scissors: ScissorsIcon,
  ruler: RulerIcon,
  tool: ToolIcon,
};

const Trust: React.FC = () => (
  <section className="trust" aria-label="Наші переваги">
    <div className="trust__inner">
      {trustItems.map((it) => {
        const Icon = ICONS[it.icon];
        return (
          <div className="trust__item" key={it.title}>
            <span className="trust__icon">
              <Icon size={24} />
            </span>
            <span>
              <strong className="trust__title">{it.title}</strong>
              <span className="trust__text">{it.text}</span>
            </span>
          </div>
        );
      })}
    </div>
  </section>
);

export default Trust;
