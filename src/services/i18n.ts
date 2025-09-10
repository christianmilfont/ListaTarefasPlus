import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import pt from '../locales/PT.json';
import en from '../locales/EN.json';

i18n.use(initReactI18next).init({
  lng: Localization.getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    pt: { translation: pt }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
