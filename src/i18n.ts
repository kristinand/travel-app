import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from './locales/en.json';
import RU from './locales/ru.json';
import DE from './locales/de.json';

export const resources = {
  en: {
    translation: EN,
  },
  ru: {
    translation: RU,
  },
  de: {
    translation: DE,
  },
};

i18n.use(initReactI18next).init({
  lng: 'ru',
  resources,
});

export default i18n;
