const config = {
	dev: true,
	guilds: {
		main: '884046271176912917',
		dev: '884046271176912917',
	},
	devs: ['751092600890458203', '429303151598895106'],
	colors: {
		primary: 0x299ba3,
		accent: 0x5bd79d,
		green: 0x40b056,
		yellow: 0xf0e34c,
		red: 0xea4d4d,
	},
	emojis: {
		ping: '🏓',
		success: '<:checkmark:1165419676285800498>',
		error: '<:cross:1165419679133737030>',
		pagination: {
			first: '⏮️',
			previous: '◀️',
			next: '▶️',
			last: '⏭️',
		},
	} as const,
	apis: {
		urban: 'https://unofficialurbandictionaryapi.com/api',
	},
};

export default config;
