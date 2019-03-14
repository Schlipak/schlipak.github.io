import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en';
import fr from './locales/fr';

i18n.use(LanguageDetector).init({
  resources: { en, fr },
  fallbackLng: 'en',
  debug: true,

  ns: ['translations'],
  defaultNS: 'translations',

  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },

  react: { wait: true },
});

export default i18n;
