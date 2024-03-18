const config = {
	// With this enabled, the bot will sync all commands only to the dev guild, to prevent rate limiting
	dev: true,
	guilds: {
		main: '884046271176912917',
		dev: '884046271176912917',
	},
	// These people have access to the secret category (sync etc.)
	devs: ['751092600890458203', '429303151598895106'],
	colors: {
		primary: 0x299ba3,
		accent: 0x5bd79d,
		green: 0x40b056,
		yellow: 0xf0e34c,
		red: 0xea4d4d,
	},
	// This will be used for creating issues using the feedback command
	linear: {
		team: 'Bot Devs',
		label: 'Feedback',
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
		lingva: 'https://tl.tako-bot.com/api/v1',
		deepl: {
			free: 'https://api-free.deepl.com/v2',
			pro: 'https://api.deepl.com/v2',
		},
	},
	links: {
		support: {
			link: 'https://discord.gg/vHhE78Fu6v',
			masked: '[Support Server](https://discord.gg/vHhE78Fu6v)'
		},
		donate: {
			link: 'https://opencollective.com/tako',
			masked: '[OpenCollective](https://opencollective.com/tako)'
		},
		translate: {
			link: 'https://translate.tako-bot.com',
			masked: '[Crowdin](https://translate.tako-bot.com)'
		},
	},
	badges: [
		{ name: "alpha_tester", emoji: '🧪', role: '969306314981376071' },
		{ name: "translator", emoji: '🌐', role: '980904580286140426' },
		{ name: "donator", emoji: '💖', role: '969286409200468028' },
		{ name: "core_developer", emoji:'🛠️', role: '969285824107642990' }
	]
};

export default config;
