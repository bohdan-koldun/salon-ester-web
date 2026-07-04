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
    subtitle="Залиште контакти — дизайнер прорахує вартість та підготує ескіз"
    buttonLabel="Хочу ескіз"
  />
);

export default ExitIntentPopup;
