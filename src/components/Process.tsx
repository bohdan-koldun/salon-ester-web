import React from 'react';
import { scrollToForm } from '../lib/scroll';

const Process: React.FC = () => {
  const steps = [
    {
      title: 'Заявка',
      text: 'Залишаєте заявку — і ми передзвонимо вам, щоб узгодити деталі.',
    },
    {
      title: 'Дизайнер',
      text: 'Виїзд дизайнера: замір, підбір тканин, ескіз на місці.',
    },
    {
      title: 'Пошив',
      text: 'Виготовляємо у власному цеху з якісних тканин.',
    },
    {
      title: 'Монтаж',
      text: 'Привозимо, встановлюємо карнизи, навішуємо штори. Готово.',
    },
  ];

  return (
    <section className="section section--bg" id="process">
      <div className="container">
        <div className="section__head">
          <h2>Від заявки до готових штор — 4 кроки</h2>
        </div>

        <div className="process">
          {steps.map((s) => (
            <div className="process__step" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <div className="process__cta">
          <button
            className="btn"
            onClick={() => scrollToForm(undefined, 'process')}
          >
            Починається із заявки →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
