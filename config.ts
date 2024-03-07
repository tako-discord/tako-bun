const config = {
	// With this enabled, the bot will sync all commands only to the dev guild, to prevent rate limiting
	dev: true,
	guilds: {
		main: '884046271176912917',
		dev: '884046271176912917',
	},
	supportServer: 'https://discord.gg/vHhE78Fu6v',
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
	badges: [
		{ name: "alpha_tester", emoji: '🧪', },
		{ name: "translator", emoji: '🌐' },
		{ name: "donator", emoji: '💖' },
		{ name: "core_developer", emoji:'🛠️', role: '911955855048585218' }
	]
};

export default config;
