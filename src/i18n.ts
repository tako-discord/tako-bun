import i18next from 'i18next';
import deErrors from './locales/de/errors.json';
import deInfo from './locales/de/info.json';
import deSecret from './locales/de/secret.json';
import deUtility from './locales/de/utility.json';
import enErrors from './locales/en/errors.json';
import enInfo from './locales/en/info.json';
import enSecret from './locales/en/secret.json';
import enUtility from './locales/en/utility.json';
import hrInfo from './locales/hr/info.json';

export const defaultNS = 'enInfo';

await i18next.init({
	fallbackLng: 'en',
	defaultNS,
	resources: {
		en: {
			errors: enErrors,
			info: enInfo,
			secret: enSecret,
			utility: enUtility,
		},
		de: {
			errors: deErrors,
			info: deInfo,
			secret: deSecret,
			utility: deUtility,
		},
		hr: {
			info: hrInfo,
		},
	},
});

export { default } from 'i18next';
