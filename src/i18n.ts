import i18next from 'i18next';
import enErrors from './locales/en/errors.json';
import enInfo from './locales/en/info.json';
import enUtility from './locales/en/utility.json';

export const defaultNS = 'enInfo';

await i18next.init({
	fallbackLng: 'en',
	defaultNS,
	resources: {
		en: {
			info: enInfo,
			errors: enErrors,
			utility: enUtility,
		},
	},
});

export { default } from 'i18next';
