import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBar from './MobileBar';
import MessengerWidget from './MessengerWidget';
import CallbackPopup from './CallbackPopup';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <span id="top" />
      <Header onCallback={() => setCallbackOpen(true)} />
      <main>{children}</main>
      <Footer />

      <MobileBar onCallback={() => setCallbackOpen(true)} />
      <MessengerWidget />

      <CallbackPopup
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </>
  );
};

export default Layout;
