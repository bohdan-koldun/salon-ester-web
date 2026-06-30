import React from 'react';
import LeadModal from './LeadModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ExitIntentPopup: React.FC<Props> = ({ open, onClose }) => (
  <LeadModal
    open={open}
    onClose={onClose}
    formName="Exit-intent"
    title="Зачекайте!"
    subtitle="Отримайте безкоштовну консультацію дизайнера + ескіз у подарунок"
    buttonLabel="Хочу ескіз"
  />
);

export default ExitIntentPopup;
