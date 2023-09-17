import i18next from 'i18next';
import enInfo from './locales/en/info.json';

export const defaultNS = 'enInfo';

await i18next.init({
  fallbackLng: 'en',
  defaultNS,
  resources: {
    en: {
      ns1: enInfo,
    },
  },
});

export {default} from 'i18next';
