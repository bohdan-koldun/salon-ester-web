import './src/styles/fonts.css';
import './src/styles/global.css';

export const onClientEntry = () => {
  const gaId = process.env.GATSBY_GA_ID;
  if (!gaId) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId);
};
