import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBar from './MobileBar';
import MessengerWidget from './MessengerWidget';
import CallbackPopup from './CallbackPopup';
import ExitIntentPopup from './ExitIntentPopup';
import { useExitIntent } from '../lib/useExitIntent';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [leadDone, setLeadDone] = useState(false);

  const [exitTriggered, dismissExit] = useExitIntent({ enabled: !leadDone });

  useEffect(() => {
    const onLead = () => setLeadDone(true);
    window.addEventListener('ester:lead', onLead);
    return () => window.removeEventListener('ester:lead', onLead);
  }, []);

  return (
    <>
      <span id="top" />
      <Header onCallback={() => setCallbackOpen(true)} />
      <main>{children}</main>
      <Footer />

      <MobileBar />
      <MessengerWidget />

      <CallbackPopup
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
      <ExitIntentPopup
        open={exitTriggered && !leadDone}
        onClose={dismissExit}
      />
    </>
  );
};

export default Layout;
