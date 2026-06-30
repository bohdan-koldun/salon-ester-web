import React from 'react';
import LeadModal from './LeadModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CallbackPopup: React.FC<Props> = ({ open, onClose }) => (
  <LeadModal
    open={open}
    onClose={onClose}
    formName="Замовити дзвінок"
    title="Замовити дзвінок"
    buttonLabel="Передзвоніть мені"
    footnote="Зателефонуємо вам найближчим часом"
  />
);

export default CallbackPopup;
